import type { MetadataRoute } from "next";
import { baseUrl } from "@/utils/textHelper";
import { locales } from "@/i18n/config";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/image-compress",
    "/baize-toolbox",
    "/quick-study",
    "/vite-cdn",
    "/webpack-cdn",
    "/about",
  ];

  const now = new Date();
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    for (const route of routes) {
      entries.push({
        url: `${baseUrl}/${locale}${route}`,
        lastModified: now,
        changeFrequency: "weekly",
        priority: route === "" ? 1 : 0.7,
      });
    }
  }

  return entries;
}
