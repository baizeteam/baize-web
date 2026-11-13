"use client";
import React from "react";
import { InboxOutlined } from "@ant-design/icons";
import { Upload } from "antd";
import type { UploadProps } from "antd";
import { useTranslations } from "next-intl";

const { Dragger } = Upload;

interface UploadAreaProps {
  onFilesAdded: (files: File[]) => void;
}

export default function UploadArea({ onFilesAdded }: UploadAreaProps) {
  const t = useTranslations("imageCompressUI");

  // 一次多选时 beforeUpload 会对每张回调；只在最后一张时整批提交，避免 100 次 setState
  const beforeUpload: UploadProps["beforeUpload"] = (file, fileList) => {
    if (file.uid === fileList[fileList.length - 1]?.uid) {
      onFilesAdded(fileList as unknown as File[]);
    }
    return Upload.LIST_IGNORE;
  };

  return (
    <div className="mb-8">
      <Dragger
        showUploadList={false}
        fileList={[]}
        accept="image/jpg,image/jpeg,image/webp,image/png,image/svg+xml,image/gif"
        beforeUpload={beforeUpload}
        multiple
      >
        <p className="ant-upload-drag-icon">
          <InboxOutlined className="text-4xl text-blue-500" />
        </p>
        <p className="ant-upload-text text-lg font-semibold">
          {t("dragText")}
        </p>
        <p className="ant-upload-hint text-gray-500">{t("dragHint")}</p>
      </Dragger>
    </div>
  );
}
