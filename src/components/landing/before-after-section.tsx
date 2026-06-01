"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { FadeIn } from "@/components/motion/fade-in";
import { Button } from "@/components/ui/button";
import { ArrowDown, ArrowRight, Sparkles, X, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { MARKETING_CONTAINER } from "@/lib/layout-width";

const SHOWCASES = [
  {
    id: "linkedin",
    label: "LinkedIn B2B",
    targetAI: "ChatGPT",
    idea: "Posts LinkedIn pour mon SaaS",
    before: "Écris-moi des posts LinkedIn pour mon app",
    beforeScore: 32,
    beforeIssues: ["Pas de rôle", "Pas de format", "Trop vague"],
    after: `RÔLE : Expert LinkedIn B2B SaaS.

CONTEXTE : Lancement produit productivité IA, cible fondateurs PME.

TÂCHE : Rédiger 5 posts sur 2 semaines.

FORMAT : Hook question + 3 bullets + CTA soft démo.
Contraintes : 150-200 mots, français, zéro jargon vide.`,
    afterScore: 88,
  },
  {
    id: "landing",
    label: "Landing SaaS",
    targetAI: "ChatGPT",
    idea: "Landing page app fitness",
    before: "Fais une landing pour mon app fitness",
    beforeScore: 28,
    beforeIssues: ["Une seule phrase", "Aucune structure", "Pas de CTA"],
    after: `RÔLE : Copywriter conversion spécialisé fitness.

CONTEXTE : App suivi calories + workouts, cible 25-40 ans débutants.

TÂCHE : Copy landing complète.

STRUCTURE : Hero (promesse + CTA) · 3 bénéfices · preuve sociale · FAQ · CTA final.
Ton motivant, FR, mobile-first.`,
    afterScore: 91,
  },
  {
    id: "cursor",
    label: "Dev Cursor",
    targetAI: "Cursor",
    idea: "Feature auth sur mon app Next.js",
    before: "Ajoute l'auth à mon app",
    beforeScore: 35,
    beforeIssues: ["Pas de stack", "Pas de critères", "Pas de fichiers"],
    after: `CONTEXTE : Next.js 14 App Router, TypeScript, Prisma, NextAuth déjà en place.

TÂCHE : Ajouter login email + Google, protéger /dashboard.

CONTRAINTES : Ne pas casser l'existant · liste des fichiers modifiés · étapes numérotées.

CRITÈRES : Session persistante, redirect si non connecté.`,
    afterScore: 92,
  },
] as const;

export function BeforeAfterSection() {
  const [active, setActive] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!mounted) return;
    const t = window.setInterval(() => {
      setActive((i) => (i + 1) % SHOWCASES.length);
    }, 6000);
    return () => window.clearInterval(t);
  }, [mounted]);

  const item = SHOWCASES[active];
  const gain = item.afterScore - item.beforeScore;

  return (
    <section id="examples" className="relative py-20 sm:py-28 border-t border-border/60 w-full">
      <div className={MARKETING_CONTAINER}>
        <FadeIn className="text-center mb-10 sm:mb-12">
          <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground mb-4">
            Avant / Après
          </p>
          <h2 className="text-3xl font-bold sm:text-4xl lg:text-5xl tracking-tight">
            Prompt vague →{" "}
            <span className="gradient-text">prompt expert</span>
          </h2>
          <p className="mt-4 text-muted-foreground text-sm sm:text-lg max-w-2xl mx-auto">
            Même idée, résultat IA incomparable : structure, contraintes et score /100 — en un clic
            avec PromptPilot.
          </p>
        </FadeIn>

        {/* Tabs */}
        <FadeIn delay={0.05} className="flex flex-wrap justify-center gap-2 mb-8">
          {SHOWCASES.map((ex, i) => (
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

        {/* Comparaison */}
        <FadeIn delay={0.1}>
          <div
            key={item.id}
            className="relative rounded-2xl border border-white/10 bg-black/40 p-4 sm:p-6 lg:p-8"
          >
            <p className="text-center text-sm text-muted-foreground mb-6">
              Idée : <span className="text-foreground font-medium">{item.idea}</span>
              <span className="mx-2 text-white/20">·</span>
              <span className="text-white/70">{item.targetAI}</span>
            </p>

            <div className="grid gap-4 lg:grid-cols-[1fr_auto_1fr] lg:gap-6 items-stretch">
              {/* AVANT */}
              <div className="relative rounded-xl border border-red-500/25 bg-red-950/20 p-4 sm:p-5 flex flex-col min-h-[220px]">
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-red-500/40 bg-red-500/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-red-300">
                    <X className="h-3 w-3" />
                    Prompt vague
                  </span>
                  <span className="text-lg font-bold tabular-nums text-red-400">
                    {item.beforeScore}
                    <span className="text-xs font-normal text-red-400/70">/100</span>
                  </span>
                </div>
                <p className="text-sm text-muted-foreground line-through decoration-red-400/50 mb-4">
                  {item.before}
                </p>
                <ul className="mt-auto space-y-1.5">
                  {item.beforeIssues.map((issue) => (
                    <li
                      key={issue}
                      className="flex items-center gap-2 text-[11px] text-red-300/80"
                    >
                      <X className="h-3 w-3 shrink-0" />
                      {issue}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Flèche centrale */}
              <div className="flex items-center justify-center py-2 lg:py-0 lg:flex-col gap-2">
                <div className="hidden lg:flex h-12 w-12 items-center justify-center rounded-full bg-white text-black shadow-lg shadow-white/10">
                  <Sparkles className="h-5 w-5" />
                </div>
                <div className="flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-3 py-1.5">
                  <ArrowDown className="h-4 w-4 lg:hidden text-white" />
                  <ArrowRight className="h-4 w-4 hidden lg:block text-white" />
                  <span className="text-xs font-semibold whitespace-nowrap">
                    +{gain} pts
                  </span>
                </div>
              </div>

              {/* APRÈS */}
              <div className="relative rounded-xl border border-emerald-500/35 bg-emerald-950/15 p-4 sm:p-5 flex flex-col min-h-[220px] shadow-[0_0_40px_-12px_rgba(74,222,128,0.35)]">
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/40 bg-emerald-500/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-emerald-300">
                    <Check className="h-3 w-3" />
                    Prompt expert
                  </span>
                  <span className="text-lg font-bold tabular-nums text-emerald-400">
                    {item.afterScore}
                    <span className="text-xs font-normal text-emerald-400/70">/100</span>
                  </span>
                </div>
                <pre className="text-[11px] sm:text-xs leading-relaxed whitespace-pre-wrap font-sans text-foreground/85 flex-1 overflow-y-auto max-h-[180px]">
                  {item.after}
                </pre>
                <p className="mt-3 text-[10px] text-emerald-400/90 font-medium">
                  Prêt à coller dans {item.targetAI}
                </p>
              </div>
            </div>

            {/* Barre de progression auto */}
            <div className="mt-6 flex justify-center gap-1.5">
              {SHOWCASES.map((_, i) => (
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
          <Button asChild size="lg" className="w-full sm:w-auto">
            <Link href="/#funnel">
              Transformer mon idée
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="w-full sm:w-auto border-white/20">
            <Link href="/improve">J&apos;ai déjà un prompt raté</Link>
          </Button>
        </FadeIn>
      </div>
    </section>
  );
}
