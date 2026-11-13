"use client";
import React, { startTransition, useEffect, useRef, useState } from "react";
import { ImageCompressor } from "baize-compress-image";
import { jpegWebp } from "baize-compress-image/plugins/jpeg-webp";
import { png } from "baize-compress-image/plugins/png";
import { svg } from "baize-compress-image/plugins/svg";
import { gif } from "baize-compress-image/plugins/gif";
import { Slider } from "antd";
import JSZip from "jszip";
import { useTranslations } from "next-intl";
import { ImageItem } from "./types";
import UploadArea from "./UploadArea";
import ImageList from "./ImageList";
import { createPreviewBlob } from "./imagePreview";
import { runThumbTask } from "./thumbQueue";

const DEFAULT_QUALITY = 70;
/** 同时压缩的张数；过大时 OffscreenCanvas 解码会把内存打满 */
const MAX_CONCURRENT = 4;

const PLUGIN_MODULE_URLS = [
  new URL(
    "baize-compress-image/plugins/jpeg-webp-compress.js",
    import.meta.url,
  ).href,
  new URL("baize-compress-image/plugins/png-compress.js", import.meta.url).href,
  new URL("baize-compress-image/plugins/svg-compress.js", import.meta.url).href,
  new URL("baize-compress-image/plugins/gif-compress.js", import.meta.url)
    .href,
];

function prefetchPluginModules() {
  for (const url of PLUGIN_MODULE_URLS) {
    void fetch(url).catch(() => {});
  }
}

function createCompressor(quality: number) {
  const q = quality / 100;
  prefetchPluginModules();
  return new ImageCompressor({
    workerNum: MAX_CONCURRENT,
    plugins: [
      jpegWebp({
        quality: q,
        moduleUrl: PLUGIN_MODULE_URLS[0],
      }),
      png({
        quality: q,
        moduleUrl: PLUGIN_MODULE_URLS[1],
      }),
      svg({
        moduleUrl: PLUGIN_MODULE_URLS[2],
      }),
      gif({
        quality: q,
        moduleUrl: PLUGIN_MODULE_URLS[3],
      }),
    ],
  });
}

export default function ImageCompress() {
  const t = useTranslations("imageCompressUI");
  const [imageList, setImageList] = useState<ImageItem[]>([]);
  const [quality, setQuality] = useState(DEFAULT_QUALITY);
  const [appliedQuality, setAppliedQuality] = useState(DEFAULT_QUALITY);
  const workerRef = useRef<ImageCompressor>(null);
  const queueRef = useRef<string[]>([]);
  const activeCountRef = useRef(0);
  const itemsRef = useRef<Map<string, ImageItem>>(new Map());
  const appliedQualityRef = useRef(appliedQuality);
  const tRef = useRef(t);

  appliedQualityRef.current = appliedQuality;
  tRef.current = t;

  useEffect(() => {
    workerRef.current?.cancelAll();
    workerRef.current = createCompressor(appliedQuality);

    return () => {
      workerRef.current?.cancelAll();
      workerRef.current = null;
    };
  }, [appliedQuality]);

  useEffect(() => {
    itemsRef.current = new Map(imageList.map((item) => [item.id, item]));
  }, [imageList]);

  const ensureCompressor = () => {
    if (!workerRef.current) {
      workerRef.current = createCompressor(appliedQualityRef.current);
    }
    return workerRef.current;
  };

  const releaseWorkersIfIdle = () => {
    if (activeCountRef.current === 0 && queueRef.current.length === 0) {
      workerRef.current?.cancelAll();
      workerRef.current = null;
    }
  };

  const updateItem = (id: string, patch: Partial<ImageItem>) => {
    setImageList((prev) =>
      prev.map((img) => (img.id === id ? { ...img, ...patch } : img)),
    );
  };

  const compressOne = async (id: string) => {
    const imageItem = itemsRef.current.get(id);
    if (!imageItem?.originalFile) return;

    const compressor = ensureCompressor();
    const usedQuality = appliedQualityRef.current;
    const originalFile = imageItem.originalFile;
    updateItem(id, { status: "compressing", error: undefined });

    try {
      const results = await compressor.compressImagesWorker([originalFile]);
      const result = results[0];

      if (result.status === "fulfilled") {
        const { compressInfo, file } = result.value;
        // 生成缩小预览后释放原图 File，显著降低完成后的常驻内存
        const previewBlob = await runThumbTask(() =>
          createPreviewBlob(originalFile),
        );

        updateItem(id, {
          compressedFile: file,
          compressedSize: compressInfo.compressedSize,
          compressRate: compressInfo.rate,
          compressTime: compressInfo.time,
          quality: usedQuality,
          previewBlob: previewBlob || undefined,
          originalFile: undefined,
          status: "completed",
          error: undefined,
        });
      } else {
        updateItem(id, {
          status: "error",
          error: result.reason?.toString() || tRef.current("compressFailedMsg"),
        });
      }
    } catch (error) {
      updateItem(id, {
        status: "error",
        error: error?.toString() || tRef.current("compressFailedMsg"),
      });
    }
  };

  const pumpQueue = () => {
    while (
      activeCountRef.current < MAX_CONCURRENT &&
      queueRef.current.length > 0
    ) {
      const id = queueRef.current.shift()!;
      activeCountRef.current += 1;
      void compressOne(id).finally(() => {
        activeCountRef.current -= 1;
        if (
          activeCountRef.current < MAX_CONCURRENT &&
          queueRef.current.length > 0
        ) {
          pumpQueue();
        } else {
          releaseWorkersIfIdle();
        }
      });
    }
  };

  const enqueueCompress = (ids: string[]) => {
    queueRef.current.push(...ids);
    pumpQueue();
  };

  const handleFilesAdded = (files: File[]) => {
    const newImages: ImageItem[] = files.map((file) => ({
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
      fileName: file.name,
      originalFile: file,
      originalSize: file.size,
      status: "pending",
    }));

    for (const image of newImages) {
      itemsRef.current.set(image.id, image);
    }
    enqueueCompress(newImages.map((image) => image.id));
    startTransition(() => {
      setImageList((prev) => [...prev, ...newImages]);
    });
  };

  const handleRetry = (imageItem: ImageItem) => {
    if (!imageItem.originalFile) return;
    updateItem(imageItem.id, {
      status: "pending",
      error: undefined,
      compressedFile: undefined,
      compressedSize: undefined,
      compressRate: undefined,
      compressTime: undefined,
      quality: undefined,
      previewBlob: undefined,
    });
    enqueueCompress([imageItem.id]);
  };

  const handleClear = () => {
    queueRef.current = [];
    activeCountRef.current = 0;
    workerRef.current?.cancelAll();
    workerRef.current = null;
    itemsRef.current.clear();
    setImageList([]);
  };

  const batchDownload = async () => {
    const completed = imageList.filter((img) => img.compressedFile);
    if (completed.length === 0) return;

    const zip = new JSZip();
    const nameCount: Record<string, number> = {};
    for (const img of completed) {
      let fileName = `compressed_${img.fileName}`;
      if (nameCount[fileName]) {
        nameCount[fileName]++;
        const dot = fileName.lastIndexOf(".");
        fileName =
          dot > 0
            ? `${fileName.slice(0, dot)}_${nameCount[fileName]}${fileName.slice(dot)}`
            : `${fileName}_${nameCount[fileName]}`;
      } else {
        nameCount[fileName] = 1;
      }
      zip.file(fileName, img.compressedFile!);
    }

    const blob = await zip.generateAsync({ type: "blob" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "baize_compressed_images.zip";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const downloadImage = (imageItem: ImageItem) => {
    if (imageItem.compressedFile) {
      const url = URL.createObjectURL(imageItem.compressedFile);
      const a = document.createElement("a");
      a.href = url;
      a.download = `compressed_${imageItem.fileName}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  };

  return (
    <div className="container pt-16 md:pt-20 lg:pt-28">
      <div className="mx-auto">
        <div className="mb-6">
          <div className="mb-2 flex items-center justify-between text-sm text-gray-600 dark:text-gray-300">
            <span>{t("quality")}</span>
            <span>{quality}%</span>
          </div>
          <Slider
            min={10}
            max={100}
            step={1}
            value={quality}
            onChange={setQuality}
            onChangeComplete={setAppliedQuality}
            tooltip={{ formatter: (value) => `${value}%` }}
          />
          <p className="mt-1 text-xs text-gray-400 dark:text-gray-500">
            {t("qualityHint")}
          </p>
        </div>
        <UploadArea onFilesAdded={handleFilesAdded} />
        {imageList.length > 0 && (
          <ImageList
            imageList={imageList}
            onDownload={downloadImage}
            onRetry={handleRetry}
            onBatchDownload={batchDownload}
            onClear={handleClear}
          />
        )}
      </div>
    </div>
  );
}
