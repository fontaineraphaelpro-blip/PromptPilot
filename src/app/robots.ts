import type { MetadataRoute } from "next";
import { getAppUrl } from "@/lib/env";

export const dynamic = "force-dynamic";

export default function robots(): MetadataRoute.Robots {
  const base = getAppUrl();
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/dashboard",
        "/generate",
        "/history",
        "/favorites",
        "/templates",
        "/settings",
        "/workflows",
        "/api/",
      ],
    },
    sitemap: `${base}/sitemap.xml`,
  };
}
