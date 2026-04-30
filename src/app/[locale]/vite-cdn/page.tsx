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
    title: t("viteCdn.title"),
    description: t("viteCdn.desc"),
    alternates: { canonical: `/${locale}/vite-cdn` },
  };
}

export default function ViteCdn() {
  const t = useTranslations("viteCdn");

  return (
    <div>
      <PageInfo title={t("title")} description={t("desc")} />
      <GithubLink
        href={`${gitHubUrl}/baize-package/blob/master/packages/vite-add-cdn-script/README.md`}
      />
    </div>
  );
}
