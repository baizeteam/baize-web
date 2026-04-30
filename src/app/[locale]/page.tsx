import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { getMessages } from "next-intl/server";
import { baseUrl, gitHubUrl } from "@/utils/textHelper";
import Script from "next/script";
import { SpeedInsights } from "@vercel/speed-insights/next";

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
    title: `${t("common.siteName")} - ${t("nav.home")}`,
    description: t("common.siteDesc"),
    alternates: { canonical: `/${locale}` },
    openGraph: {
      url: `/${locale}`,
      title: `${t("common.siteName")} - ${t("nav.home")}`,
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
  };
}

export default function Home() {
  const t = useTranslations("home");
  const tCommon = useTranslations("common");

  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="container mx-auto px-4 py-24 lg:py-32">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
            <div className="space-y-8">
              <div className="inline-flex items-center rounded-full bg-blue-100 px-4 py-2 text-sm font-medium text-blue-800 dark:bg-blue-900/30 dark:text-blue-200">
                {t("heroBadge")}
              </div>
              <h1 className="text-4xl leading-tight font-bold text-gray-900 lg:text-6xl dark:text-white">
                {t("heroTitle1")}
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  {t("heroHighlight1")}
                </span>
                <br />
                {t("heroTitle2")}
                <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  {t("heroHighlight2")}
                </span>
              </h1>
              <p className="text-xl leading-relaxed text-gray-600 dark:text-gray-300">
                {t("heroDesc")}
              </p>
              <div className="flex flex-col gap-4 sm:flex-row">
                <Link
                  href="about"
                  className="inline-flex transform items-center rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-4 font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:from-blue-700 hover:to-purple-700 hover:shadow-xl"
                >
                  {tCommon("learnMore")}
                  <svg
                    className="ml-2 h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </Link>
              </div>
            </div>
            <div className="relative flex items-center justify-center">
              <div className="relative z-10">
                <Image
                  src="/images/logo/icon.png"
                  alt={tCommon("siteName")}
                  width={300}
                  height={300}
                  className="rounded-2xl shadow-2xl"
                  priority
                  fetchPriority="high"
                />
              </div>
              <div className="absolute -top-4 -right-4 h-72 w-72 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 opacity-20 blur-3xl"></div>
              <div className="absolute -bottom-4 -left-4 h-72 w-72 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 opacity-20 blur-3xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Tools Section */}
      <section className="bg-white py-20 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold text-gray-900 lg:text-4xl dark:text-white">
              {t("toolsTitle")}
            </h2>
            <p className="mx-auto max-w-2xl text-xl text-gray-600 dark:text-gray-300">
              {t("toolsDesc")}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {/* 图片压缩工具 */}
            <div className="group transform rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-100 p-8 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl dark:from-gray-800 dark:to-gray-700">
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-r from-blue-500 to-indigo-600 transition-transform duration-300 group-hover:scale-110">
                <svg
                  className="h-8 w-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h3 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
                {t("imageCompressTitle")}
              </h3>
              <p className="mb-6 text-gray-600 dark:text-gray-300">
                {t("imageCompressDesc")}
              </p>
              <Link
                href="image-compress"
                className="inline-flex items-center font-semibold text-blue-600 transition-colors duration-300 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
              >
                {tCommon("useNow")}
                <svg
                  className="ml-2 h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </Link>
            </div>

            {/* CDN插件工具 */}
            <div className="group transform rounded-2xl bg-gradient-to-br from-green-50 to-emerald-100 p-8 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl dark:from-gray-800 dark:to-gray-700">
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-r from-green-500 to-emerald-600 transition-transform duration-300 group-hover:scale-110">
                <svg
                  className="h-8 w-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <h3 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
                {t("cdnTitle")}
              </h3>
              <p className="mb-6 text-gray-600 dark:text-gray-300">
                {t("cdnDesc")}
              </p>
              <Link
                href="vite-cdn"
                className="inline-flex items-center font-semibold text-green-600 transition-colors duration-300 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300"
              >
                {tCommon("viewDetails")}
                <svg
                  className="ml-2 h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </Link>
            </div>

            {/* 微前端解决方案 */}
            <div className="group transform rounded-2xl bg-gradient-to-br from-purple-50 to-pink-100 p-8 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl dark:from-gray-800 dark:to-gray-700">
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-r from-purple-500 to-pink-600 transition-transform duration-300 group-hover:scale-110">
                <svg
                  className="h-8 w-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                  />
                </svg>
              </div>
              <h3 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
                {t("microFrontendTitle")}
              </h3>
              <p className="mb-6 text-gray-600 dark:text-gray-300">
                {t("microFrontendDesc")}
              </p>
              <Link
                href="quick-study"
                className="inline-flex items-center font-semibold text-purple-600 transition-colors duration-300 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300"
              >
                {tCommon("learnNow")}
                <svg
                  className="ml-2 h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>
      <SpeedInsights />
    </>
  );
}
