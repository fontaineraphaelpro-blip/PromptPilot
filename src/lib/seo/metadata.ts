import type { Metadata } from "next";
import { APP_NAME } from "@/lib/constants";
import { getAppUrl } from "@/lib/env";

export function buildPageMetadata(opts: {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  type?: "website" | "article";
  publishedAt?: string;
}): Metadata {
  const base = getAppUrl();
  const url = `${base}${opts.path}`;

  return {
    title: opts.title,
    description: opts.description,
    keywords: opts.keywords,
    alternates: { canonical: url },
    openGraph: {
      title: opts.title,
      description: opts.description,
      url,
      siteName: APP_NAME,
      locale: "fr_FR",
      type: opts.type ?? "website",
      images: [{ url: `${base}/opengraph-image`, width: 1200, height: 630, alt: APP_NAME }],
      ...(opts.publishedAt && { publishedTime: opts.publishedAt }),
    },
    twitter: {
      card: "summary_large_image",
      title: opts.title,
      description: opts.description,
      images: [`${base}/opengraph-image`],
    },
  };
}
