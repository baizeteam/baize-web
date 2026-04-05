import React from "react";
import BaizeToolboxInfo from "@/components/BaizeToolbox/BaizeToolboxInfo";
import Introduce from "@/components/Common/Introduce";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "白泽工具箱",
  description:
    "白泽工具箱是一款功能强大的多媒体工具，为用户提供了多种多样的多媒体处理功能。无论您是需要对音视频转码、提取音频/视频/字幕、文字转语音(TTS)、屏幕录制、截图，还是对音视频图片进行压缩，这个工具都能轻松实现。",
  alternates: { canonical: "/quick-study" },
  keywords:
    "白泽工具箱, 多媒体处理工具, 音视频转码软件, 视频剪辑, 文字转语音, 屏幕录制软件, 截图工具, 音视频图片压缩",
};

export default function BaizeToolBox() {
  const introduceList = [
    {
      title: "免费",
      description: "下载安装后即可免费使用",
    },
    {
      title: "多功能",
      description: (
        <>
          <ul>
            <li>音视频转码</li>
            <li>提取音频/视频/字幕</li>
            <li>文字转语音(TTS)</li>
            <li>屏幕录制、截图</li>
            <li>压缩音视频和图片</li>
          </ul>
        </>
      ),
    },
  ];
  return (
    <div>
      <BaizeToolboxInfo
        title={metadata.title}
        description={metadata.description}
      />
      <Introduce introduceList={introduceList} />
    </div>
  );
}
