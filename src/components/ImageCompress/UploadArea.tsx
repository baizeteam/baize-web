"use client";
import React from "react";
import { InboxOutlined } from "@ant-design/icons";
import { Upload } from "antd";
import { useTranslations } from "next-intl";

const { Dragger } = Upload;

interface UploadAreaProps {
  onFilesAdded: (files: File[]) => void;
}

export default function UploadArea({ onFilesAdded }: UploadAreaProps) {
  const t = useTranslations("imageCompressUI");

  const handleChange = (e: any) => {
    const files = Array.from(e.fileList || [e.file]).map(
      (f: any) => f.originFileObj || f,
    );
    onFilesAdded(files);
  };

  return (
    <div className="mb-8">
      <Dragger
        showUploadList={false}
        accept="image/jpg,image/jpeg,image/webp,image/png,image/svg+xml"
        customRequest={handleChange}
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
