import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PromptIaPageView } from "@/components/seo/prompt-ia-page";
import { getPromptPageBySlug, PROMPT_IA_PAGES } from "@/lib/seo";
import { buildPageMetadata } from "@/lib/seo/metadata";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return PROMPT_IA_PAGES.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = getPromptPageBySlug(slug);
  if (!page) return {};
  return buildPageMetadata({
    title: page.title,
    description: page.description,
    path: `/prompts-ia/${page.slug}`,
    keywords: page.keywords,
  });
}

export default async function PromptIaSlugPage({ params }: Props) {
  const { slug } = await params;
  if (!getPromptPageBySlug(slug)) notFound();
  return <PromptIaPageView slug={slug} />;
}
