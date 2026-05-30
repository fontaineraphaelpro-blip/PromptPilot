import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ContentBlocks } from "./content-blocks";
import { ArticleJsonLd } from "./json-ld";
import { SeoCta } from "./seo-cta";
import {
  getArticleBySlug,
  SEO_ARTICLES,
  type ContentCategory,
} from "@/lib/seo";

const CATEGORY_LABELS: Record<ContentCategory, string> = {
  guide: "Guide",
  comparatif: "Comparatif",
  article: "Article",
};

interface ArticlePageProps {
  slug: string;
  categoryFilter?: ContentCategory;
  backHref: string;
  backLabel: string;
  canonicalPrefix: string;
}

export function ArticlePage({
  slug,
  categoryFilter,
  backHref,
  backLabel,
  canonicalPrefix,
}: ArticlePageProps) {
  const article = getArticleBySlug(slug);
  if (!article) notFound();
  if (categoryFilter && article.category !== categoryFilter) notFound();

  const related = article.relatedSlugs
    .map((s) => SEO_ARTICLES.find((a) => a.slug === s))
    .filter(Boolean);

  return (
    <>
      <ArticleJsonLd
        title={article.title}
        description={article.description}
        path={`${canonicalPrefix}/${article.slug}`}
        publishedAt={article.publishedAt}
        updatedAt={article.updatedAt}
      />
      <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
        <Button variant="ghost" size="sm" asChild className="mb-8">
          <Link href={backHref}>
            <ArrowLeft className="h-4 w-4" />
            {backLabel}
          </Link>
        </Button>

        <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
          {CATEGORY_LABELS[article.category]}
        </p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
          {article.title}
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">{article.description}</p>
        <div className="mt-4 flex flex-wrap gap-4 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" />
            {article.readingTimeMin} min de lecture
          </span>
          <span>
            Mis à jour le{" "}
            {new Date(article.updatedAt).toLocaleDateString("fr-FR", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </span>
        </div>

        <div className="mt-10">
          <ContentBlocks blocks={article.blocks} />
        </div>

        <SeoCta />

        {related.length > 0 && (
          <section className="mt-16 border-t border-border/60 pt-10">
            <h2 className="text-lg font-semibold">À lire ensuite</h2>
            <ul className="mt-4 space-y-3">
              {related.map((r) =>
                r ? (
                  <li key={r.slug}>
                    <Link
                      href={`/blog/${r.slug}`}
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      → {r.title}
                    </Link>
                  </li>
                ) : null
              )}
            </ul>
          </section>
        )}
      </article>
    </>
  );
}
