import type { Metadata } from "next";
import { ContentHub } from "@/components/seo/content-hub";
import { getArticlesByCategory } from "@/lib/seo";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Comparatifs IA — ChatGPT vs Claude, Midjourney vs DALL·E",
  description:
    "Comparatifs objectifs des IA et des stratégies de prompts : ChatGPT, Claude, Midjourney, DALL·E, PromptPilot vs manuel.",
  path: "/comparatif",
  keywords: ["comparatif IA", "ChatGPT vs Claude", "Midjourney vs DALL·E"],
});

export default function ComparatifPage() {
  return (
    <ContentHub
      eyebrow="Comparatifs"
      title="Comparatifs prompts & IA"
      description="Choisissez la bonne IA et le bon format de prompt — analyses honnêtes pour décider sans perdre de temps."
      articles={getArticlesByCategory("comparatif")}
      basePath="/blog"
    />
  );
}
