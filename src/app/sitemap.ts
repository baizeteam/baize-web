import type { MetadataRoute } from "next";
import { baseUrl } from "@/utils/textHelper";

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
  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: route === "" ? 1 : 0.7,
  }));
}
