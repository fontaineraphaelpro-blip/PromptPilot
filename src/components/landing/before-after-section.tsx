"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { FadeIn } from "@/components/motion/fade-in";
import { Button } from "@/components/ui/button";
import { ArrowDown, ArrowRight, Sparkles, X, Check, FileText } from "lucide-react";
import { cn } from "@/lib/utils";
import { MARKETING_CONTAINER } from "@/lib/layout-width";
import { isSalesMode } from "@/lib/sales-mode";
import { MARKETING_SHOWCASES } from "@/lib/marketing/expert-prompt-showcases";

export function BeforeAfterSection() {
  const [active, setActive] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!mounted) return;
    const t = window.setInterval(() => {
      setActive((i) => (i + 1) % MARKETING_SHOWCASES.length);
    }, 8000);
    return () => window.clearInterval(t);
  }, [mounted]);

  const item = MARKETING_SHOWCASES[active];
  const gain = item.afterScore - item.beforeScore;
  const wordMultiplier = Math.round(item.afterWordCount / Math.max(1, item.beforeWordCount));

  return (
    <section id="examples" className="relative py-20 sm:py-28 border-t border-border/60 w-full">
      <div className={MARKETING_CONTAINER}>
        <FadeIn className="text-center mb-10 sm:mb-12">
          <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground mb-4">
            Avant / Après
          </p>
          <h2 className="text-3xl font-bold sm:text-4xl lg:text-5xl tracking-tight">
            9 mots dans ta tête →{" "}
            <span className="gradient-text">1 000+ mots exploitables</span>
          </h2>
          <p className="mt-4 text-muted-foreground text-sm sm:text-lg max-w-2xl mx-auto">
            À gauche : ce que la plupart des gens collent dans ChatGPT. À droite : le brief exact
            que PromptPilot génère en mode <strong className="text-foreground">Expert · Détaillé</strong>{" "}
            — sections, contraintes, critères d&apos;acceptation.
          </p>
        </FadeIn>

        <FadeIn delay={0.05} className="flex flex-wrap justify-center gap-2 mb-8">
          {MARKETING_SHOWCASES.map((ex, i) => (
            <button
              key={ex.id}
              type="button"
              onClick={() => setActive(i)}
              className={cn(
                "rounded-full px-4 py-2 text-xs sm:text-sm font-medium border transition-all",
                active === i
                  ? "bg-white text-black border-white"
                  : "border-white/15 text-muted-foreground hover:border-white/30 hover:text-foreground"
              )}
            >
              {ex.label}
            </button>
          ))}
        </FadeIn>

        <FadeIn delay={0.1}>
          <div
            key={item.id}
            className="relative rounded-2xl border border-white/10 bg-black/40 p-4 sm:p-6 lg:p-8"
          >
            <p className="text-center text-sm text-muted-foreground mb-6">
              Idée : <span className="text-foreground font-medium">{item.idea}</span>
              <span className="mx-2 text-white/20">·</span>
              <span className="text-white/70">{item.targetAI}</span>
              <span className="mx-2 text-white/20 hidden sm:inline">·</span>
              <span className="hidden sm:inline text-violet-300/90">
                ×{wordMultiplier} plus de contenu structuré
              </span>
            </p>

            <div className="grid gap-4 lg:grid-cols-[minmax(0,0.42fr)_auto_minmax(0,0.58fr)] lg:gap-5 items-stretch">
              {/* AVANT */}
              <div className="relative rounded-xl border border-red-500/30 bg-red-950/25 p-4 sm:p-5 flex flex-col min-h-[200px] lg:min-h-[360px]">
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-red-500/40 bg-red-500/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-red-300">
                    <X className="h-3 w-3" />
                    Ce que tu tapes
                  </span>
                  <div className="text-right">
                    <span className="text-lg font-bold tabular-nums text-red-400 block leading-none">
                      {item.beforeScore}
                      <span className="text-xs font-normal text-red-400/70">/100</span>
                    </span>
                    <span className="text-[10px] text-red-400/80">{item.beforeWordCount} mots</span>
                  </div>
                </div>
                <p className="text-base sm:text-lg text-muted-foreground/90 line-through decoration-red-400/60 mb-4 font-medium">
                  « {item.before} »
                </p>
                <ul className="mt-auto space-y-1.5">
                  {item.beforeIssues.map((issue) => (
                    <li
                      key={issue}
                      className="flex items-center gap-2 text-[11px] text-red-300/90"
                    >
                      <X className="h-3 w-3 shrink-0" />
                      {issue}
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-[10px] text-red-300/70 border-t border-red-500/20 pt-3">
                  Résultat IA typique : générique, incomplet, à retravailler 20 min.
                </p>
              </div>

              {/* Flèche */}
              <div className="flex items-center justify-center py-2 lg:py-0 lg:flex-col gap-2">
                <div className="hidden lg:flex h-12 w-12 items-center justify-center rounded-full bg-white text-black shadow-lg shadow-white/10">
                  <Sparkles className="h-5 w-5" />
                </div>
                <div className="flex flex-col items-center gap-1 rounded-full border border-white/20 bg-white/5 px-3 py-2">
                  <ArrowDown className="h-4 w-4 lg:hidden text-white" />
                  <ArrowRight className="h-4 w-4 hidden lg:block text-white" />
                  <span className="text-xs font-bold whitespace-nowrap text-emerald-400">
                    +{gain} pts
                  </span>
                  <span className="text-[10px] text-muted-foreground whitespace-nowrap">
                    {item.afterWordCount} mots
                  </span>
                </div>
              </div>

              {/* APRÈS */}
              <div className="relative rounded-xl border border-emerald-500/40 bg-emerald-950/20 p-4 sm:p-5 flex flex-col min-h-[280px] lg:min-h-[360px] shadow-[0_0_48px_-12px_rgba(74,222,128,0.4)]">
                <div className="flex items-start justify-between gap-2 mb-3 shrink-0">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/50 bg-emerald-500/15 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-emerald-200">
                    <Check className="h-3 w-3" />
                    Brief PromptPilot
                  </span>
                  <div className="text-right">
                    <span className="text-lg font-bold tabular-nums text-emerald-400 block leading-none">
                      {item.afterScore}
                      <span className="text-xs font-normal text-emerald-400/70">/100</span>
                    </span>
                    <span className="text-[10px] text-emerald-400/90 font-medium">
                      {item.afterWordCount} mots
                    </span>
                  </div>
                </div>
                <p className="text-[10px] font-semibold text-violet-300/95 mb-2 flex items-center gap-1.5 shrink-0">
                  <FileText className="h-3 w-3" />
                  Mode Expert · Détaillé — extrait réel (structure app)
                </p>
                <pre className="text-[10px] sm:text-[11px] leading-relaxed whitespace-pre-wrap font-sans text-foreground/90 flex-1 overflow-y-auto max-h-[min(320px,45vh)] lg:max-h-[300px] pr-1 rounded-lg border border-white/10 bg-black/40 p-3 before-after-prompt-scroll">
                  {item.afterDetailed}
                </pre>
                <p className="mt-3 text-[10px] text-emerald-400/95 font-medium shrink-0">
                  + 3 variantes (Court, Détaillé, Expert) · prêt à coller dans {item.targetAI}
                </p>
              </div>
            </div>

            <div className="mt-6 flex justify-center gap-1.5">
              {MARKETING_SHOWCASES.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  aria-label={`Exemple ${i + 1}`}
                  onClick={() => setActive(i)}
                  className={cn(
                    "h-1.5 rounded-full transition-all duration-300",
                    active === i ? "w-8 bg-white" : "w-2 bg-white/25 hover:bg-white/40"
                  )}
                />
              ))}
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={0.15} className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
          {isSalesMode() ? (
            <>
              <Button asChild size="lg" className="w-full sm:w-auto">
                <Link href="/pricing?plan=pro">
                  Obtenir ce brief — Pro 9€
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="w-full sm:w-auto border-white/20">
                <Link href="/#funnel">Essayer gratuitement</Link>
              </Button>
            </>
          ) : (
            <>
              <Button asChild size="lg" className="w-full sm:w-auto">
                <Link href="/#funnel">
                  Transformer mon idée
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="w-full sm:w-auto border-white/20">
                <Link href="/improve">J&apos;ai déjà un prompt raté</Link>
              </Button>
            </>
          )}
        </FadeIn>
      </div>
    </section>
  );
}
