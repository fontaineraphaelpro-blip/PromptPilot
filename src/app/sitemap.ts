import type { MetadataRoute } from "next";
import { getAllPublicPaths, SEO_ARTICLES } from "@/lib/seo";
import { getAppUrl } from "@/lib/env";

/** URLs basées sur NEXT_PUBLIC_APP_URL au runtime (pas localhost au build). */
export const dynamic = "force-dynamic";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getAppUrl();
  const articleDates = new Map(
    SEO_ARTICLES.map((a) => [a.slug, new Date(a.updatedAt)])
  );

  return getAllPublicPaths().map((path) => {
    let lastModified = new Date();
    let changeFrequency: "weekly" | "monthly" = "monthly";
    let priority = 0.7;

    if (path === "") {
      priority = 1;
      changeFrequency = "weekly";
    } else if (path.startsWith("/blog/")) {
      const slug = path.replace("/blog/", "");
      lastModified = articleDates.get(slug) ?? lastModified;
      changeFrequency = "weekly";
      priority = 0.85;
    } else if (path === "/blog" || path === "/guides" || path === "/prompts-ia") {
      changeFrequency = "weekly";
      priority = 0.8;
    } else if (path.startsWith("/prompts-ia/")) {
      priority = 0.75;
    } else if (path.startsWith("/guides/metier/")) {
      priority = 0.7;
    }

    return {
      url: path === "" ? `${base}/` : `${base}${path}`,
      lastModified,
      changeFrequency,
      priority,
    };
  });
}
