import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { SeoCta } from "./seo-cta";
import { getPromptPageBySlug, getArticleBySlug } from "@/lib/seo";

interface PromptIaPageViewProps {
  slug: string;
}

export function PromptIaPageView({ slug }: PromptIaPageViewProps) {
  const page = getPromptPageBySlug(slug);
  if (!page) notFound();

  const relatedArticles = page.relatedArticleSlugs
    .map((s) => getArticleBySlug(s))
    .filter(Boolean);

  return (
    <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
      <Button variant="ghost" size="sm" asChild className="mb-8">
        <Link href="/prompts-ia">
          <ArrowLeft className="h-4 w-4" />
          Toutes les IA
        </Link>
      </Button>

      <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
        Prompts {page.aiName}
      </p>
      <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">{page.title}</h1>
      <p className="mt-4 text-lg text-muted-foreground">{page.description}</p>

      <section className="mt-10">
        <h2 className="text-xl font-semibold">Cas d&apos;usage</h2>
        <ul className="mt-4 space-y-2 text-muted-foreground">
          {page.useCases.map((u) => (
            <li key={u} className="flex gap-2">
              <span className="text-foreground">→</span>
              {u}
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-semibold">Conseils pour {page.aiName}</h2>
        <ul className="mt-4 space-y-2 text-muted-foreground list-disc pl-6">
          {page.tips.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
      </section>

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        <Card className="glass-card border-white/5">
          <CardContent className="p-6">
            <p className="text-xs font-semibold uppercase text-muted-foreground mb-2">Avant</p>
            <p className="text-sm italic">&quot;{page.exampleBefore}&quot;</p>
          </CardContent>
        </Card>
        <Card className="glass-card border-white/20">
          <CardContent className="p-6">
            <p className="text-xs font-semibold uppercase mb-2">Après (expert)</p>
            <p className="text-sm text-muted-foreground leading-relaxed">{page.exampleAfter}</p>
          </CardContent>
        </Card>
      </div>

      <SeoCta />

      {relatedArticles.length > 0 && (
        <section className="mt-12">
          <h2 className="text-lg font-semibold">Guides associés</h2>
          <ul className="mt-4 space-y-2">
            {relatedArticles.map((a) =>
              a ? (
                <li key={a.slug}>
                  <Link
                    href={`/blog/${a.slug}`}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    → {a.title}
                  </Link>
                </li>
              ) : null
            )}
          </ul>
        </section>
      )}
    </article>
  );
}
