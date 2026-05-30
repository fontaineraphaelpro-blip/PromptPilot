import type { Metadata } from "next";
import { ContentHub } from "@/components/seo/content-hub";
import { getArticlesByCategory } from "@/lib/seo";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Guides prompt engineering — méthodes et frameworks",
  description:
    "Guides complets pour écrire des prompts ChatGPT, Claude, Cursor, marketing et vidéo IA. Frameworks et bonnes pratiques.",
  path: "/guides",
  keywords: ["guide prompt", "tutoriel prompt IA", "prompt engineering français"],
});

export default function GuidesPage() {
  return (
    <ContentHub
      eyebrow="Guides"
      title="Guides prompt engineering"
      description="Méthodes pas à pas, frameworks et tutoriels pour produire des prompts experts sur chaque type d'IA."
      articles={getArticlesByCategory("guide")}
      basePath="/blog"
    />
  );
}
