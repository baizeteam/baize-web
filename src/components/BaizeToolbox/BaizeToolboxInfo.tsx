import React from "react";
import { repoUrl, baseParams } from "@/utils/githubHelper";
import { projectInfo } from "@/utils/textHelper";
import PageInfo from "../Common/PageInfo";
import Download from "./download";

export const dynamic = "force-dynamic";

export default async function BaizeToolboxInfo() {
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

  console.log(repoInfo, repoReleases, contributors);

  return (
    <div className="container">
      <PageInfo
        title={projectInfo?.title}
        description={projectInfo?.description}
      />

      {/* <AppGithubStatus repoInfo={repoInfo} contributors={contributors} /> */}

      <div className="mt-16 flex items-center justify-center gap-x-6">
        <Download repoReleases={repoReleases} />
        <a
          href="https://github.com/baizeteam/baize-toolbox/releases"
          target="_blank"
          className="text-sm leading-6 font-semibold text-gray-400 hover:text-gray-600"
        >
          查看更多版本 <span aria-hidden="true">→</span>
        </a>
      </div>
    </div>
  );
}
