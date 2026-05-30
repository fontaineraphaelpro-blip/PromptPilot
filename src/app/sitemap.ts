import type { MetadataRoute } from "next";
import { getAppUrl } from "@/lib/env";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getAppUrl();
  const routes = ["", "/pricing", "/login", "/signup", "/terms", "/privacy"];

  return routes.map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : 0.7,
  }));
}
