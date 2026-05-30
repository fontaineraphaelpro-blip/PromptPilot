import type { MetadataRoute } from "next";
import { getAllPublicPaths } from "@/lib/seo";
import { getAppUrl } from "@/lib/env";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getAppUrl();

  return getAllPublicPaths().map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
    changeFrequency:
      path === "" || path.startsWith("/blog") ? "weekly" : "monthly",
    priority: path === "" ? 1 : path.startsWith("/blog/") ? 0.8 : 0.7,
  }));
}
