import SectionTitle from "@/components/Common/SectionTitle";
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
    title: t("about.title"),
    description: t("about.desc"),
    alternates: { canonical: `/${locale}/about` },
    openGraph: {
      url: `/${locale}/about`,
      title: t("about.title"),
      description: t("about.desc"),
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

const AboutPage = () => {
  const t = useTranslations("about");
  const tCommon = useTranslations("common");

  return (
    <>
      {/* Hero Section */}
      <section className="pt-16 md:pt-20 lg:pt-28">
        <div className="container">
          <div className="mx-auto max-w-[800px] text-center">
            <SectionTitle
              title={t("title")}
              paragraph={t("desc")}
              center={true}
              mb="60px"
            />
            <div className="mb-8">
              <p className="text-body-color text-lg md:text-xl">
                {t("intro")}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="bg-gray-50 py-16 md:py-20 lg:py-28 dark:bg-gray-900">
        <div className="container">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
            <div className="text-center md:text-left">
              <div className="mb-6">
                <div className="bg-primary/10 mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full md:mx-0">
                  <svg
                    className="text-primary h-8 w-8"
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
                <h3 className="mb-4 text-2xl font-bold text-black dark:text-white">
                  {t("missionTitle")}
                </h3>
                <p className="text-body-color leading-relaxed">
                  {t("missionDesc")}
                </p>
              </div>
            </div>

            <div className="text-center md:text-left">
              <div className="mb-6">
                <div className="bg-primary/10 mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full md:mx-0">
                  <svg
                    className="text-primary h-8 w-8"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                </div>
                <h3 className="mb-4 text-2xl font-bold text-black dark:text-white">
                  {t("visionTitle")}
                </h3>
                <p className="text-body-color leading-relaxed">
                  {t("visionDesc")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Join Us */}
      <section className="py-16 md:py-20 lg:py-28">
        <div className="container">
          <div className="mx-auto max-w-[600px] text-center">
            <SectionTitle
              title={t("joinTitle")}
              paragraph={t("joinDesc")}
              center={true}
              mb="40px"
            />

            <div className="bg-primary/5 border-primary/20 rounded-lg border p-8">
              <h4 className="mb-4 text-xl font-bold text-black dark:text-white">
                {t("howToJoin")}
              </h4>
              <div className="text-body-color space-y-4">
                <p>{t("joinStep1")}</p>
                <p>{t("joinStep2")}</p>
                <p>{t("joinStep3")}</p>
                <p>{t("joinStep4")}</p>
              </div>

              <div className="mt-6">
                <a
                  href={gitHubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-primary hover:bg-primary/90 inline-flex items-center rounded-lg px-6 py-3 text-white transition-colors"
                >
                  <svg
                    className="mr-2 h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                  {tCommon("visitGitHub")}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutPage;
