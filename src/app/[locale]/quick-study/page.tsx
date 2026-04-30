import React from "react";
import PageInfo from "@/components/Common/PageInfo";
import GithubLink from "@/components/Common/GithubLink";
import { gitHubUrl } from "@/utils/textHelper";
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
    title: t("quickStudy.title"),
    description: t("quickStudy.desc"),
    alternates: { canonical: `/${locale}/quick-study` },
  };
}

export default function QuickStudy() {
  const t = useTranslations("quickStudy");

  return (
    <div>
      <PageInfo title={t("title")} description={t("desc")} />
      <GithubLink href={`${gitHubUrl}/baize-quick-study`} />
    </div>
  );
}
