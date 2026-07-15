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
  updatedAt?: string;
}): Metadata {
  const base = getAppUrl();
  const url = `${base}${opts.path}`;

  return {
    title: opts.title,
    description: opts.description,
    keywords: opts.keywords,
    authors: [{ name: APP_NAME }],
    creator: APP_NAME,
    publisher: APP_NAME,
    alternates: { canonical: url },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    openGraph: {
      title: opts.title,
      description: opts.description,
      url,
      siteName: APP_NAME,
      locale: "fr_FR",
      type: opts.type ?? "website",
      images: [{ url: `${base}/opengraph-image`, width: 1200, height: 630, alt: opts.title }],
      ...(opts.publishedAt && { publishedTime: opts.publishedAt }),
      ...(opts.updatedAt && { modifiedTime: opts.updatedAt }),
    },
    twitter: {
      card: "summary_large_image",
      title: opts.title,
      description: opts.description,
      images: [`${base}/opengraph-image`],
    },
  };
}
