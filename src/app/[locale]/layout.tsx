import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ScrollToTop from "@/components/ScrollToTop";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { Providers } from "./providers";
import "@/styles/index.css";
import type { Metadata, Viewport } from "next";
import { baseUrl, gitHubUrl } from "@/utils/textHelper";
import { NextIntlClientProvider, useMessages } from "next-intl";
import { getMessages } from "next-intl/server";
import { locales, type Locale } from "@/i18n/config";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
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
    metadataBase: new URL(baseUrl),
    title: {
      default: `${t("common.siteName")} | ${t("nav.baizeToolbox")}`,
      template: `%s | ${t("common.siteName")}`,
    },
    description: t("common.siteDesc"),
    applicationName: "Baize Open Source Team",
    keywords: [
      t("common.siteName"),
      t("nav.baizeToolbox"),
      t("nav.imageCompress"),
      "CDN",
      "Frontend Tools",
      "Open Source",
    ],
    authors: [{ name: "Baize Team", url: gitHubUrl }],
    creator: "Baize Team",
    publisher: "Baize Team",
    alternates: {
      canonical: `/${locale}`,
    },
    openGraph: {
      type: "website",
      locale: locale === "zh" ? "zh_CN" : "en_US",
      url: `/${locale}`,
      siteName: t("common.siteName"),
      title: `${t("common.siteName")} | ${t("nav.baizeToolbox")}`,
      description: t("common.siteDesc"),
      images: [
        {
          url: "/images/logo/icon.png",
          width: 600,
          height: 600,
          alt: t("common.siteName"),
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${t("common.siteName")} | ${t("nav.baizeToolbox")}`,
      description: t("common.siteDesc"),
      images: ["/images/logo/icon.png"],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const messages = await getMessages({ locale });

  return (
    <html suppressHydrationWarning lang={locale}>
      <head />
      <body className={`bg-[#FCFCFC] dark:bg-black`}>
        <AntdRegistry>
          <NextIntlClientProvider locale={locale} messages={messages}>
            <Providers>
              <Header locale={locale as Locale} />
              <div className="min-h-[calc(100vh-48rem)] md:min-h-[calc(100vh-40rem)] lg:min-h-[calc(100vh-27rem)]">
                {children}
              </div>
              <Footer />
              <ScrollToTop />
            </Providers>
          </NextIntlClientProvider>
        </AntdRegistry>
      </body>
    </html>
  );
}
