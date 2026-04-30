import React from "react";
import BaizeToolboxInfo from "@/components/BaizeToolbox/BaizeToolboxInfo";
import Introduce from "@/components/Common/Introduce";
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
    title: t("toolbox.title"),
    description: t("toolbox.desc"),
    alternates: { canonical: `/${locale}/baize-toolbox` },
    keywords: `${t("toolbox.title")}, multimedia, audio video, TTS, screen recording`,
  };
}

export default async function BaizeToolBox({
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

  const introduceList = [
    {
      title: t("toolbox.free"),
      description: t("toolbox.freeDesc"),
    },
    {
      title: t("toolbox.multiFunc"),
      description: (
        <>
          <ul>
            <li>{t("toolbox.feature1")}</li>
            <li>{t("toolbox.feature2")}</li>
            <li>{t("toolbox.feature3")}</li>
            <li>{t("toolbox.feature4")}</li>
            <li>{t("toolbox.feature5")}</li>
          </ul>
        </>
      ),
    },
  ];

  return (
    <div>
      <BaizeToolboxInfo title={t("toolbox.title")} description={t("toolbox.desc")} locale={locale} />
      <Introduce introduceList={introduceList} />
    </div>
  );
}
