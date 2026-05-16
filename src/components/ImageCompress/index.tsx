"use client";
import React, { useEffect, useRef, useState } from "react";
import { ImageCompressor } from "baize-compress-image";
import JSZip from "jszip";
import { useTranslations } from "next-intl";
import { ImageItem } from "./types";
import UploadArea from "./UploadArea";
import ImageList from "./ImageList";

export default function ImageCompress() {
  const t = useTranslations("imageCompressUI");
  const [imageList, setImageList] = useState<ImageItem[]>([]);
  const workerRef = useRef<ImageCompressor>(null);

  useEffect(() => {
    workerRef.current = new ImageCompressor({ workerNum: 8 });
  }, []);

  const handleFilesAdded = (files: File[]) => {
    const newImages: ImageItem[] = files.map((file) => ({
      id: Math.random().toString(36).substr(2, 9),
      originalFile: file,
      originalSize: file.size,
      status: "pending",
    }));

    setImageList((prev) => [...prev, ...newImages]);

    for (const image of newImages) {
      compressImage(image);
    }
  };

  const compressImage = async (imageItem: ImageItem) => {
    try {
      setImageList((prev) =>
        prev.map((img) =>
          img.id === imageItem.id ? { ...img, status: "compressing" } : img,
        ),
      );

      const results = await workerRef.current!.compressImagesWorker(
        [imageItem.originalFile],
        { quality: 0.7 },
      );

      const result = results[0];
      if (result.status === "fulfilled") {
        const { compressInfo, file } = result.value;
        const compressedSize = file.size;
        const compressRate =
          ((imageItem.originalSize - compressedSize) / imageItem.originalSize) *
          100;

        setImageList((prev) =>
          prev.map((img) =>
            img.id === imageItem.id
              ? {
                  ...img,
                  compressedFile: file,
                  compressedSize,
                  compressRate,
                  compressTime: compressInfo.time,
                  status: "completed",
                }
              : img,
          ),
        );
      } else {
        setImageList((prev) =>
          prev.map((img) =>
            img.id === imageItem.id
              ? {
                  ...img,
                  status: "error",
                  error: result.reason?.toString() || t("compressFailedMsg"),
                }
              : img,
          ),
        );
      }
    } catch (error) {
      setImageList((prev) =>
        prev.map((img) =>
          img.id === imageItem.id
            ? {
                ...img,
                status: "error",
                error: error?.toString() || t("compressFailedMsg"),
              }
            : img,
        ),
      );
    }
  };

  const batchDownload = async () => {
    const completed = imageList.filter((img) => img.compressedFile);
    if (completed.length === 0) return;

    const zip = new JSZip();
    const nameCount: Record<string, number> = {};
    for (const img of completed) {
      let fileName = `compressed_${img.originalFile.name}`;
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
      a.download = `compressed_${imageItem.originalFile.name}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  };

  return (
    <div className="container pt-16 md:pt-20 lg:pt-28">
      <div className="mx-auto">
        <UploadArea onFilesAdded={handleFilesAdded} />
        {imageList.length > 0 && (
          <ImageList
            imageList={imageList}
            onDownload={downloadImage}
            onRetry={compressImage}
            onBatchDownload={batchDownload}
          />
        )}
      </div>
    </div>
  );
}
