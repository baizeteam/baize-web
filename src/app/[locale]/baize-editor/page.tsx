import PageInfo from "@/components/Common/PageInfo";
import Introduce from "@/components/Common/Introduce";
import GithubLink from "@/components/Common/GithubLink";
import BaizeEditor from "@/components/BaizeEditor";
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
    title: t("baizeEditor.title"),
    description: t("baizeEditor.desc"),
    alternates: { canonical: `/${locale}/baize-editor` },
    openGraph: {
      title: `${t("baizeEditor.title")} - ${t("common.siteName")}`,
      description: t("baizeEditor.desc"),
      url: `${baseUrl}/${locale}/baize-editor`,
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
      title: `${t("baizeEditor.title")} - ${t("common.siteName")}`,
      description: t("baizeEditor.desc"),
      images: ["/images/logo/icon.png"],
    },
  };
}

const BaizeEditorPage = () => {
  const t = useTranslations("baizeEditor");

  const introduceList = [
    {
      title: t("realtime"),
      description: t("realtimeDesc"),
    },
    {
      title: t("richEditor"),
      description: t("richEditorDesc"),
    },
    {
      title: t("freeOpen"),
      description: t("freeOpenDesc"),
    },
  ];

  return (
    <>
      <PageInfo title={t("title")} description={t("desc")} />
      <GithubLink href={`${gitHubUrl}/baize-editor`} />
      <BaizeEditor />
      <Introduce introduceList={introduceList} />
    </>
  );
};

export default BaizeEditorPage;
