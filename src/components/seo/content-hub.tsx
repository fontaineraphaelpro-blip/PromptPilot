import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, ArrowRight } from "lucide-react";
import type { ContentCategory, SeoArticle } from "@/lib/seo/types";
import { FadeIn } from "@/components/motion/fade-in";

const CATEGORY_LABELS: Record<ContentCategory, string> = {
  guide: "Guide",
  comparatif: "Comparatif",
  article: "Article",
};

interface ContentHubProps {
  title: string;
  description: string;
  articles: SeoArticle[];
  basePath: string;
  eyebrow?: string;
}

export function ContentHub({
  title,
  description,
  articles,
  basePath,
  eyebrow = "Ressources",
}: ContentHubProps) {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
      <FadeIn className="max-w-2xl">
        <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground mb-4">
          {eyebrow}
        </p>
        <h1 className="text-3xl font-bold sm:text-5xl tracking-tight">{title}</h1>
        <p className="mt-4 text-lg text-muted-foreground leading-relaxed">{description}</p>
      </FadeIn>

      <div className="mt-14 grid gap-6 sm:grid-cols-2">
        {articles.map((article, i) => (
          <FadeIn key={article.slug} delay={i * 0.06}>
            <Link href={`${basePath}/${article.slug}`} className="block h-full group">
              <Card className="glass-card hover-lift h-full">
                <CardHeader>
                  <p className="text-xs uppercase tracking-wider text-muted-foreground">
                    {CATEGORY_LABELS[article.category]}
                  </p>
                  <CardTitle className="text-xl group-hover:text-foreground transition-colors line-clamp-2">
                    {article.title}
                  </CardTitle>
                  <CardDescription className="line-clamp-3">{article.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex items-center justify-between text-xs text-muted-foreground">
                  <span className="inline-flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5" />
                    {article.readingTimeMin} min
                  </span>
                  <span className="inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                    Lire <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </CardContent>
              </Card>
            </Link>
          </FadeIn>
        ))}
      </div>
    </div>
  );
}
