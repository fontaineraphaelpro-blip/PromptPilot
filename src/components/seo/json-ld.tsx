import { APP_NAME } from "@/lib/constants";
import { getBrandLogoUrl } from "@/lib/brand/logo-url";
import { getAppUrl } from "@/lib/env";

interface ArticleJsonLdProps {
  title: string;
  description: string;
  path: string;
  publishedAt: string;
  updatedAt: string;
  keywords?: string[];
  wordCount?: number;
  imageUrl?: string;
  faqs?: { question: string; answer: string }[];
}

export function ArticleJsonLd({
  title,
  description,
  path,
  publishedAt,
  updatedAt,
  keywords,
  wordCount,
  imageUrl,
  faqs,
}: ArticleJsonLdProps) {
  const base = getAppUrl();
  const url = `${base}${path}`;
  const image = imageUrl ?? `${base}/opengraph-image`;

  const blogPosting = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    description,
    image: [image],
    datePublished: publishedAt,
    dateModified: updatedAt,
    author: {
      "@type": "Organization",
      name: APP_NAME,
      url: base,
    },
    publisher: {
      "@type": "Organization",
      name: APP_NAME,
      url: base,
      logo: {
        "@type": "ImageObject",
        url: getBrandLogoUrl(),
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
    url,
    inLanguage: "fr-FR",
    isAccessibleForFree: true,
    ...(keywords?.length ? { keywords: keywords.join(", ") } : {}),
    ...(wordCount ? { wordCount } : {}),
  };

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Accueil",
        item: base,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blog",
        item: `${base}/blog`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: title,
        item: url,
      },
    ],
  };

  const graph: object[] = [blogPosting, breadcrumb];

  if (faqs && faqs.length >= 2) {
    graph.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqs.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.answer,
        },
      })),
    });
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph.length === 1 ? graph[0] : graph) }}
    />
  );
}

interface FaqJsonLdProps {
  items: { question: string; answer: string }[];
}

export function FaqJsonLd({ items }: FaqJsonLdProps) {
  const data = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
