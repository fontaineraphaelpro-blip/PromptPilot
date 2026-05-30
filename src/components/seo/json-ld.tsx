import { APP_NAME } from "@/lib/constants";
import { getAppUrl } from "@/lib/env";

interface ArticleJsonLdProps {
  title: string;
  description: string;
  path: string;
  publishedAt: string;
  updatedAt: string;
}

export function ArticleJsonLd({
  title,
  description,
  path,
  publishedAt,
  updatedAt,
}: ArticleJsonLdProps) {
  const url = `${getAppUrl()}${path}`;
  const data = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    datePublished: publishedAt,
    dateModified: updatedAt,
    author: { "@type": "Organization", name: APP_NAME },
    publisher: {
      "@type": "Organization",
      name: APP_NAME,
      url: getAppUrl(),
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    inLanguage: "fr-FR",
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
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
