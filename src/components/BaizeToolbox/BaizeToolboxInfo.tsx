import React from "react";
import { repoUrl, baseParams } from "@/utils/githubHelper";
import PageInfo from "../Common/PageInfo";
import Download from "./download";
import { gitHubUrl } from "@/utils/textHelper";
import { getTranslations } from "next-intl/server";

export const dynamic = "force-dynamic";

export default async function BaizeToolboxInfo({
  title,
  description,
  locale,
}: {
  title: any;
  description: React.ReactNode;
  locale: string;
}) {
  const t = await getTranslations({ locale, namespace: "commonUI" });

  async function init() {
    const [repoInfoRes, repoReleasesRes, contributorsRes] = await Promise.all([
      fetch(repoUrl, baseParams),
      fetch(`${repoUrl}/releases`, baseParams),
      fetch(`${repoUrl}/contributors`, baseParams),
    ]);
    return {
      repoInfo: await repoInfoRes.json(),
      repoReleases: await repoReleasesRes.json(),
      contributors: await contributorsRes.json(),
    };
  }

  const { repoInfo, repoReleases, contributors } = await init();

  return (
    <div className="container">
      <PageInfo title={title} description={description} />

      {/* <AppGithubStatus repoInfo={repoInfo} contributors={contributors} /> */}

      <div className="mt-16 flex items-center justify-center gap-x-6">
        <Download repoReleases={repoReleases} />
        <a
          href={`${gitHubUrl}/baize-toolbox/releases`}
          target="_blank"
          className="text-sm leading-6 font-semibold text-gray-400 hover:text-gray-600"
        >
          {t("viewMoreVersions")} <span aria-hidden="true">→</span>
        </a>
      </div>
    </div>
  );
}
