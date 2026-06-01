import type { Metadata } from "next";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PROMPT_IA_PAGES } from "@/lib/seo";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { FadeIn } from "@/components/motion/fade-in";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = buildPageMetadata({
  title: "Prompts par IA — ChatGPT, Claude, Cursor, Midjourney, Sora",
  description:
    "Pages dédiées pour générer des prompts optimisés par outil IA : exemples, conseils et générateur PromptExpert.",
  path: "/prompts-ia",
  keywords: ["prompts IA", "prompt par outil", "générateur prompt"],
});

export default function PromptsIaHubPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
      <FadeIn className="max-w-2xl">
        <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground mb-4">
          Prompts par IA
        </p>
        <h1 className="text-3xl font-bold sm:text-5xl tracking-tight">
          Un prompt calibré pour chaque intelligence artificielle
        </h1>
        <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
          ChatGPT, Claude, Cursor, Midjourney, Gemini ou Sora — chaque moteur exige une
          formulation différente. Choisis ton IA et génère un prompt expert.
        </p>
      </FadeIn>

      <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {PROMPT_IA_PAGES.map((page, i) => (
          <FadeIn key={page.slug} delay={i * 0.05}>
            <Link href={`/prompts-ia/${page.slug}`} className="block h-full group">
              <Card className="glass-card hover-lift h-full">
                <CardHeader>
                  <CardTitle className="text-2xl">{page.aiName}</CardTitle>
                  <CardDescription className="line-clamp-2">{page.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <span className="inline-flex items-center gap-1 text-sm text-muted-foreground group-hover:gap-2 transition-all">
                    Voir le guide <ArrowRight className="h-4 w-4" />
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
