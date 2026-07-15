import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock, List } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ContentBlocks } from "./content-blocks";
import { ArticleJsonLd } from "./json-ld";
import { SeoCta } from "./seo-cta";
import {
  getArticleBySlug,
  SEO_ARTICLES,
  type ContentCategory,
} from "@/lib/seo";
import {
  countWords,
  extractFaqItems,
  getTableOfContents,
} from "@/lib/seo/articles/utils";
import { APP_NAME } from "@/lib/constants";

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

  const toc = getTableOfContents(article.blocks);
  const faqs = extractFaqItems(article.blocks);
  const words = countWords(article.blocks);
  const path = `${canonicalPrefix}/${article.slug}`;

  return (
    <>
      <ArticleJsonLd
        title={article.title}
        description={article.description}
        path={path}
        publishedAt={article.publishedAt}
        updatedAt={article.updatedAt}
        keywords={article.keywords}
        wordCount={words}
        faqs={faqs}
      />
      <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
        <nav aria-label="Fil d'Ariane" className="mb-6 text-xs text-muted-foreground">
          <ol className="flex flex-wrap items-center gap-1.5">
            <li>
              <Link href="/" className="hover:text-foreground transition-colors">
                Accueil
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link href={backHref} className="hover:text-foreground transition-colors">
                {backLabel.includes("articles") || backLabel.includes("Guides")
                  ? backLabel.replace(/^Tous les /, "").replace(/^← /, "")
                  : "Blog"}
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li className="text-foreground/80 line-clamp-1 max-w-[14rem] sm:max-w-xs">
              {article.title}
            </li>
          </ol>
        </nav>

        <Button variant="ghost" size="sm" asChild className="mb-8 -ml-2">
          <Link href={backHref}>
            <ArrowLeft className="h-4 w-4" />
            {backLabel}
          </Link>
        </Button>

        <header>
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
            {CATEGORY_LABELS[article.category]}
          </p>
          <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl text-balance">
            {article.title}
          </h1>
          <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
            {article.description}
          </p>
          <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" />
              {article.readingTimeMin} min de lecture
            </span>
            <span>~{words.toLocaleString("fr-FR")} mots</span>
            <span>
              Publié le{" "}
              {new Date(article.publishedAt).toLocaleDateString("fr-FR", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </span>
            <span>
              Mis à jour le{" "}
              {new Date(article.updatedAt).toLocaleDateString("fr-FR", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </span>
            <span>Par {APP_NAME}</span>
          </div>
        </header>

        {toc.length >= 3 && (
          <nav
            aria-label="Sommaire"
            className="mt-10 rounded-xl border border-white/10 bg-white/[0.03] p-5 sm:p-6"
          >
            <p className="text-sm font-semibold text-foreground inline-flex items-center gap-2">
              <List className="h-4 w-4" />
              Sommaire
            </p>
            <ol className="mt-3 space-y-2 text-sm">
              {toc.map((item, i) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <span className="tabular-nums text-foreground/40 mr-2">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {item.text}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        )}

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
