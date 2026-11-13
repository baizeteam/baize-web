"use client";
import React, { useEffect, useState } from "react";
import { Modal } from "antd";
import { useTranslations } from "next-intl";
import { ImageItem } from "./types";

interface CompareModalProps {
  imageItem: ImageItem | null;
  open: boolean;
  onClose: () => void;
}

function formatFileSize(bytes: number): string {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
}

export default function CompareModal({
  imageItem,
  open,
  onClose,
}: CompareModalProps) {
  const t = useTranslations("imageCompressUI");
  const [originalUrl, setOriginalUrl] = useState("");
  const [compressedUrl, setCompressedUrl] = useState("");

  useEffect(() => {
    if (!open || !imageItem?.compressedFile) {
      setOriginalUrl("");
      setCompressedUrl("");
      return;
    }

    const nextOriginal = URL.createObjectURL(imageItem.originalFile);
    const nextCompressed = URL.createObjectURL(imageItem.compressedFile);
    setOriginalUrl(nextOriginal);
    setCompressedUrl(nextCompressed);

    return () => {
      URL.revokeObjectURL(nextOriginal);
      URL.revokeObjectURL(nextCompressed);
    };
  }, [open, imageItem]);

  return (
    <Modal
      title={imageItem ? `${t("compare")} - ${imageItem.originalFile.name}` : t("compare")}
      open={open}
      onCancel={onClose}
      footer={null}
      width={920}
      destroyOnHidden
      centered
    >
      {imageItem?.compressedFile && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <div className="mb-2 flex items-center justify-between text-sm">
                <span className="font-medium text-gray-700 dark:text-gray-200">
                  {t("compareOriginal")}
                </span>
                <span className="text-gray-500 dark:text-gray-400">
                  {formatFileSize(imageItem.originalSize)}
                </span>
              </div>
              <div className="flex min-h-64 items-center justify-center overflow-hidden rounded-lg border bg-gray-50 dark:border-gray-700 dark:bg-gray-900">
                {originalUrl && (
                  <img
                    src={originalUrl}
                    alt={t("compareOriginal")}
                    className="max-h-96 max-w-full object-contain"
                  />
                )}
              </div>
            </div>

            <div>
              <div className="mb-2 flex items-center justify-between text-sm">
                <span className="font-medium text-gray-700 dark:text-gray-200">
                  {t("compareCompressed")}
                </span>
                <span className="text-gray-500 dark:text-gray-400">
                  {formatFileSize(imageItem.compressedSize || 0)}
                </span>
              </div>
              <div className="flex min-h-64 items-center justify-center overflow-hidden rounded-lg border bg-gray-50 dark:border-gray-700 dark:bg-gray-900">
                {compressedUrl && (
                  <img
                    src={compressedUrl}
                    alt={t("compareCompressed")}
                    className="max-h-96 max-w-full object-contain"
                  />
                )}
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-4 rounded-lg bg-gray-50 px-4 py-3 text-sm dark:bg-gray-800">
            <span className="text-gray-600 dark:text-gray-300">
              {t("quality")}:{" "}
              <span className="font-medium dark:text-gray-100">
                {imageItem.quality ?? "-"}%
              </span>
            </span>
            <span className="text-gray-600 dark:text-gray-300">
              {t("compressRate")}:{" "}
              <span className="font-medium text-green-600 dark:text-green-400">
                {imageItem.compressRate?.toFixed(1)}%
              </span>
            </span>
            <span className="text-gray-600 dark:text-gray-300">
              {t("compressTime")}:{" "}
              <span className="font-medium dark:text-gray-100">
                {imageItem.compressTime}ms
              </span>
            </span>
          </div>
        </div>
      )}
    </Modal>
  );
}
