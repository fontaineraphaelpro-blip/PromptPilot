import type { MetadataRoute } from "next";
import { getAppUrl } from "@/lib/env";

export default function robots(): MetadataRoute.Robots {
  const base = getAppUrl();
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/dashboard", "/generate", "/history", "/settings", "/api/"],
    },
    sitemap: `${base}/sitemap.xml`,
  };
}
