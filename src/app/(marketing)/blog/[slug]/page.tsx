import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArticlePage } from "@/components/seo/article-page";
import { getArticleBySlug, SEO_ARTICLES } from "@/lib/seo";
import { buildPageMetadata } from "@/lib/seo/metadata";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return SEO_ARTICLES.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return {};
  return buildPageMetadata({
    title: article.title,
    description: article.description,
    path: `/blog/${article.slug}`,
    keywords: article.keywords,
    type: "article",
    publishedAt: article.publishedAt,
  });
}

export default async function BlogArticlePage({ params }: Props) {
  const { slug } = await params;
  if (!getArticleBySlug(slug)) notFound();

  return (
    <ArticlePage
      slug={slug}
      backHref="/blog"
      backLabel="Tous les articles"
      canonicalPrefix="/blog"
    />
  );
}
