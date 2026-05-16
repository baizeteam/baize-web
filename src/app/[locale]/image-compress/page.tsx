import Introduce from "@/components/Common/Introduce";
import PageInfo from "@/components/Common/PageInfo";
import ImageCompressWrapper from "@/components/ImageCompress/ImageCompressWrapper";
import Link from "next/link";
import { baseUrl, gitHubUrl } from "@/utils/textHelper";
import { useTranslations } from "next-intl";
import { getMessages } from "next-intl/server";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const messages = await getMessages({ locale });
  const t = (key: string) => {
    const keys = key.split(".");
    let val: any = messages;
    for (const k of keys) {
      val = val?.[k];
    }
    return val || key;
  };

  return {
    title: t("imageCompress.title"),
    description: t("imageCompress.desc"),
    alternates: { canonical: `/${locale}/image-compress` },
    openGraph: {
      title: `${t("imageCompress.title")} - ${t("common.siteName")}`,
      description: t("imageCompress.desc"),
      url: `${baseUrl}/${locale}/image-compress`,
      siteName: t("common.siteName"),
      images: [
        {
          url: "/images/logo/icon.png",
          width: 600,
          height: 600,
          alt: `${t("common.siteName")} Logo`,
        },
      ],
      locale: locale === "zh" ? "zh_CN" : "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${t("imageCompress.title")} - ${t("common.siteName")}`,
      description: t("imageCompress.desc"),
      images: ["/images/logo/icon.png"],
    },
  };
}

const ImageCompressPage = () => {
  const t = useTranslations("imageCompress");

  const introduceList = [
    {
      title: t("free"),
      description: t("freeDesc"),
    },
    {
      title: t("highPerformance"),
      description: t("highPerformanceDesc"),
    },
    {
      title: t("npm"),
      description: (
        <Link
          href={`${gitHubUrl}/baize-package/blob/master/packages/baize-compress-image/README.md`}
          target="_blank"
          className="text-primary hover:text-primary/80 transition-colors duration-200"
        >
          {t("npmLinkText")}
        </Link>
      ),
    },
  ];

  return (
    <>
      <PageInfo title={t("title")} description={t("desc")} />
      <ImageCompressWrapper />
      <Introduce introduceList={introduceList} />
    </>
  );
};

export default ImageCompressPage;
