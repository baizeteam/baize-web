"use client";
import dynamic from "next/dynamic";

const ImageCompress = dynamic(() => import("./index"), { ssr: false });

export default function ImageCompressWrapper() {
  return <ImageCompress />;
}
