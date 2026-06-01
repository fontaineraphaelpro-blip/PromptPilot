import type { MetadataRoute } from "next";
import { getAllPublicPaths } from "@/lib/seo";
import { getAppUrl } from "@/lib/env";

/** URLs basées sur NEXT_PUBLIC_APP_URL au runtime (pas localhost au build). */
export const dynamic = "force-dynamic";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getAppUrl();

  return getAllPublicPaths().map((path) => ({
    url: path === "" ? `${base}/` : `${base}${path}`,
    lastModified: new Date(),
    changeFrequency:
      path === "" || path.startsWith("/blog") ? ("weekly" as const) : ("monthly" as const),
    priority: path === "" ? 1 : path.startsWith("/blog/") ? 0.8 : 0.7,
  }));
}
