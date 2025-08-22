import Introduce from "@/components/Common/Introduce";
import PageInfo from "@/components/Common/PageInfo";
import SelectImage from "@/components/ImageCompress/SelectImage";
import Link from "next/link";

const ImageCompress = () => {
  const introduceList = [
    {
      title: "免费",
      description: "网站也好，NPM包也好，全部免费用！",
    },
    {
      title: "高性能",
      description:
        "采用了队列+并发的协同处理，结合高效传输机制，保障系统高性能运行",
    },
    {
      title: "NPM",
      description: (
        <Link
          href={
            "https://github.com/baizeteam/baize-package/blob/master/packages/baize-compress-image/README.md"
          }
          target="_blank"
          className="text-primary hover:text-primary/80 transition-colors duration-200"
        >
          查看使用方式
        </Link>
      ),
    },
  ];

  const pageInfo = {
    title: "图片压缩",
    description:
      "白泽团队开源的专业图片压缩工具，支持JPG、JPEG、WebP、PNG格式，采用队列+并发处理技术，提供高效的批量压缩服务。拖拽上传即可开始压缩，实时显示压缩进度和效果对比。",
  };
  return (
    <>
      <PageInfo title={pageInfo.title} description={pageInfo.description} />
      <SelectImage />
      <Introduce introduceList={introduceList} />
    </>
  );
};

export default ImageCompress;
