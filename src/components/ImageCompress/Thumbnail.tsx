"use client";
import React, { useEffect, useRef, useState } from "react";
import { runThumbTask } from "./thumbQueue";
import { createThumbBlob } from "./imagePreview";
import { ImageItem } from "./types";

interface ThumbnailProps {
  item: ImageItem;
  className?: string;
}

function resolveThumbSource(item: ImageItem): Blob | File | null {
  if (item.compressedFile) return item.compressedFile;
  if (item.previewBlob) return item.previewBlob;
  if (item.originalFile) return item.originalFile;
  return null;
}

export default function Thumbnail({ item, className }: ThumbnailProps) {
  const [url, setUrl] = useState("");
  const [visible, setVisible] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const source = resolveThumbSource(item);

  useEffect(() => {
    const node = rootRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisible(entry.isIntersecting);
      },
      { rootMargin: "120px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!visible || !source) {
      setUrl((prev) => {
        if (prev) URL.revokeObjectURL(prev);
        return "";
      });
      return;
    }

    let active = true;
    let objectUrl = "";

    runThumbTask(async () => {
      // 已是预览 / 压缩结果时直接挂 URL；原图才做缩小，且失败不回退到原图 URL
      if (source === item.originalFile) {
        const blob = await createThumbBlob(source);
        return blob ? URL.createObjectURL(blob) : "";
      }
      return URL.createObjectURL(source);
    }).then((nextUrl) => {
      if (!active) {
        if (nextUrl) URL.revokeObjectURL(nextUrl);
        return;
      }
      objectUrl = nextUrl;
      setUrl(nextUrl);
    });

    return () => {
      active = false;
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
  }, [visible, source, item.originalFile]);

  return (
    <div ref={rootRef} className={className}>
      {url ? (
        <img
          src={url}
          alt={item.fileName}
          className="h-full w-full rounded-lg object-cover"
          loading="lazy"
          decoding="async"
        />
      ) : (
        <div className="h-full w-full rounded-lg bg-gray-100 dark:bg-gray-700" />
      )}
    </div>
  );
}
