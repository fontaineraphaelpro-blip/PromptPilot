import type { Metadata } from "next";
import { ContentHub } from "@/components/seo/content-hub";
import { SEO_ARTICLES } from "@/lib/seo";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Blog prompt engineering & IA — guides et comparatifs",
  description:
    "Articles, guides et comparatifs sur les prompts ChatGPT, Claude, Cursor, Midjourney et la génération IA. Conseils actionnables pour professionnels.",
  path: "/blog",
  keywords: ["blog prompt IA", "prompt engineering", "guides IA"],
});

export default function BlogPage() {
  return (
    <ContentHub
      eyebrow="Blog"
      title="Blog PromptExpert"
      description="Guides pratiques, comparatifs d'IA et articles pour maîtriser le prompt engineering — contenu rédigé pour une vraie valeur métier."
      articles={SEO_ARTICLES}
      basePath="/blog"
    />
  );
}
