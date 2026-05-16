"use client";
import React from "react";
import { DownloadOutlined, CloudDownloadOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { useTranslations } from "next-intl";
import { ImageItem } from "./types";

interface ImageListProps {
  imageList: ImageItem[];
  onDownload: (imageItem: ImageItem) => void;
  onRetry: (imageItem: ImageItem) => void;
  onBatchDownload: () => void;
}

function formatFileSize(bytes: number): string {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
}

function getStatusColor(status: string) {
  switch (status) {
    case "completed":
      return "text-green-600";
    case "compressing":
      return "text-blue-600";
    case "error":
      return "text-red-600";
    default:
      return "text-gray-600";
  }
}

function getStatusBadgeClass(status: string) {
  switch (status) {
    case "completed":
      return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
    case "compressing":
      return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
    case "error":
      return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200";
  }
}

export default function ImageList({
  imageList,
  onDownload,
  onRetry,
  onBatchDownload,
}: ImageListProps) {
  const t = useTranslations("imageCompressUI");

  const getStatusText = (status: string) => {
    switch (status) {
      case "completed":
        return t("statusCompleted");
      case "compressing":
        return t("statusCompressing");
      case "error":
        return t("statusFailed");
      default:
        return t("statusCompressing");
    }
  };

  return (
    <>
      {/* 操作按钮 */}
      <div className="mb-6 flex items-center justify-between">
        <div className="text-gray-600 dark:text-gray-300">
          {t("totalImages", { count: imageList.length })}
        </div>
        {imageList.some((img) => img.status === "completed") && (
          <Button
            type="primary"
            icon={<CloudDownloadOutlined />}
            onClick={onBatchDownload}
          >
            {t("batchDownload")}
          </Button>
        )}
      </div>

      {/* 图片列表 */}
      <div className="space-y-4">
        {imageList.map((imageItem) => (
          <div
            key={imageItem.id}
            className="rounded-lg border bg-white p-6 shadow-md dark:border-gray-700 dark:bg-gray-800"
          >
            <div className="flex items-start space-x-4">
              {/* 图片预览 */}
              <div className="flex-shrink-0">
                <img
                  src={URL.createObjectURL(imageItem.originalFile)}
                  alt={imageItem.originalFile.name}
                  className="h-24 w-24 rounded-lg border object-cover"
                />
              </div>

              {/* 图片信息 */}
              <div className="min-w-0 flex-1">
                <div className="mb-2 flex items-center justify-between">
                  <h3 className="truncate text-lg font-medium text-gray-900 dark:text-gray-100">
                    {imageItem.originalFile.name}
                  </h3>
                  <div className="flex items-center space-x-2">
                    <span
                      className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-semibold ${getStatusColor(imageItem.status)} ${getStatusBadgeClass(imageItem.status)}`}
                    >
                      {imageItem.status === "compressing" && (
                        <div className="mr-2 h-3 w-3 animate-spin rounded-full border-2 border-current border-t-transparent"></div>
                      )}
                      {getStatusText(imageItem.status)}
                    </span>
                  </div>
                </div>

                {/* 文件信息 */}
                <div className="mb-4 grid grid-cols-2 gap-4 md:grid-cols-4">
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {t("originalSize")}
                    </p>
                    <p className="font-medium dark:text-gray-200">
                      {formatFileSize(imageItem.originalSize)}
                    </p>
                  </div>
                  {imageItem.compressedSize && (
                    <>
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {t("compressedSize")}
                        </p>
                        <p className="font-medium dark:text-gray-200">
                          {formatFileSize(imageItem.compressedSize)}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {t("compressRate")}
                        </p>
                        <p className="font-medium text-green-600 dark:text-green-400">
                          {imageItem.compressRate?.toFixed(1)}%
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {t("compressTime")}
                        </p>
                        <p className="font-medium dark:text-gray-200">
                          {imageItem.compressTime}ms
                        </p>
                      </div>
                    </>
                  )}
                </div>

                {/* 操作按钮 */}
                <div className="flex items-center space-x-3">
                  {imageItem.status === "completed" &&
                    imageItem.compressedFile && (
                      <Button
                        type="primary"
                        icon={<DownloadOutlined />}
                        onClick={() => onDownload(imageItem)}
                      >
                        {t("downloadCompressed")}
                      </Button>
                    )}

                  {imageItem.status === "error" && (
                    <Button onClick={() => onRetry(imageItem)}>
                      {t("retry")}
                    </Button>
                  )}
                </div>

                {/* 错误信息 */}
                {imageItem.error && (
                  <p className="mt-2 text-sm text-red-500 dark:text-red-400">
                    {imageItem.error}
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 统计信息 */}
      <div className="mt-8 rounded-lg bg-gray-50 p-6 dark:bg-gray-800">
        <h3 className="mb-4 text-lg font-medium text-gray-900 dark:text-gray-100">
          {t("compressStats")}
        </h3>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              {imageList.length}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {t("totalCount")}
            </p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-green-600 dark:text-green-400">
              {imageList.filter((img) => img.status === "completed").length}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {t("completed")}
            </p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
              {imageList.filter((img) => img.status === "pending").length}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {t("compressing")}
            </p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-red-600 dark:text-red-400">
              {imageList.filter((img) => img.status === "error").length}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {t("failed")}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
