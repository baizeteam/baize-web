import React from "react";
import PageInfo from "@/components/Common/PageInfo";
import GithubLink from "@/components/Common/GithubLink";

export default function QuickStudy() {
  const pageInfo = {
    title: "VUE & REACT & 微前端",
    description:
      "基于micro-app微前端框架的React/Vue3学习平台，通过对比学习帮助开发者快速掌握两个框架的核心技术。包含React Hooks、Vue3组合式API、状态管理、路由控制等实践项目，以及微前端架构和Vite插件的开发经验。",
  };
  return (
    <div>
      <PageInfo title={pageInfo.title} description={pageInfo.description} />
      <GithubLink href="https://github.com/baizeteam/baize-quick-study" />
    </div>
  );
}
