"use client";

import Link from "next/link";
import { ScrollLink } from "@/components/navigation/scroll-link";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/motion/fade-in";
import { ArrowRight, Check, ShieldCheck, Sparkles } from "lucide-react";
import {
  DOUBT_KILLERS,
  DREAM_OUTCOMES,
  PRO_PRICE_HOOK,
  PRO_VALUE_STACK,
  PRO_VALUE_TOTAL_LABEL,
} from "@/lib/value-offer";
import { PLAN_PRICES } from "@/lib/plans";

export function ValueStackSection() {
  return (
    <section
      id="valeur"
      className="relative px-4 py-24 sm:px-6 border-t border-border/60 scroll-mt-20"
    >
      <div className="absolute inset-0 bg-gradient-radial-top opacity-35 pointer-events-none" />
      <div className="relative w-full max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-10 space-y-24">
        {/* Dream outcomes */}
        <div>
          <FadeIn className="text-center max-w-3xl mx-auto">
            <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground mb-4">
              Ce que ça change vraiment
            </p>
            <h2 className="text-3xl font-bold sm:text-4xl tracking-tight text-balance">
              Pas un outil de plus —{" "}
              <span className="gradient-text">ton accélérateur de livrables</span>
            </h2>
            <p className="mt-4 text-muted-foreground text-base sm:text-lg">
              Imagine la semaine où chaque brief d’IA est prêt du premier coup. Voici à quoi
              ressemble cette vie.
            </p>
          </FadeIn>

          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {DREAM_OUTCOMES.map((card, i) => (
              <FadeIn key={card.persona} delay={i * 0.08}>
                <div className="glass-card hover-lift h-full rounded-2xl p-6 sm:p-7">
                  <p className="text-xs font-semibold uppercase tracking-wider text-primary">
                    {card.persona}
                  </p>
                  <h3 className="mt-2 text-lg font-semibold leading-snug">{card.dream}</h3>
                  <ul className="mt-5 space-y-3">
                    {card.lines.map((line) => (
                      <li key={line} className="flex gap-2.5 text-sm text-muted-foreground">
                        <Check className="h-4 w-4 shrink-0 mt-0.5 text-emerald-400" />
                        <span>{line}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>

        {/* Value stack */}
        <div>
          <FadeIn className="text-center max-w-2xl mx-auto">
            <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground mb-4">
              Empilement de valeur
            </p>
            <h2 className="text-3xl font-bold sm:text-4xl tracking-tight">
              Tout ça pour {PLAN_PRICES.plus.label} ?
            </h2>
            <p className="mt-4 text-muted-foreground">
              Compare à ce que tu payerais (ou dépenserais en temps) pour obtenir la même qualité
              ailleurs.
            </p>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="mt-10 mx-auto max-w-2xl rounded-3xl border border-white/15 overflow-hidden">
              <ul className="divide-y divide-white/10">
                {PRO_VALUE_STACK.map((row) => (
                  <li
                    key={row.item}
                    className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-4 px-5 sm:px-6 py-4 bg-white/[0.02]"
                  >
                    <div className="min-w-0">
                      <p className="font-medium text-sm sm:text-base">{row.item}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        vs {row.alternative}
                      </p>
                    </div>
                    <p className="text-sm font-semibold tabular-nums text-emerald-200/90 shrink-0">
                      {row.worth}
                    </p>
                  </li>
                ))}
              </ul>
              <div className="bg-white text-black px-5 sm:px-6 py-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div>
                  <p className="font-bold text-base sm:text-lg">{PRO_VALUE_TOTAL_LABEL}</p>
                  <p className="text-sm text-black/70 mt-0.5">{PRO_PRICE_HOOK}</p>
                </div>
                <Button className="shrink-0 bg-black text-white hover:bg-black/85" asChild>
                  <Link href="/pricing?plan=pro">
                    Passer au Pro
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </FadeIn>
        </div>

        {/* Doubt killers */}
        <div>
          <FadeIn className="text-center max-w-2xl mx-auto">
            <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground mb-4">
              Zéro doute
            </p>
            <h2 className="text-3xl font-bold sm:text-4xl tracking-tight">
              Les objections qu’on entend — et la vérité
            </h2>
          </FadeIn>

          <div className="mt-12 grid gap-4 sm:grid-cols-2">
            {DOUBT_KILLERS.map((item, i) => (
              <FadeIn key={item.title} delay={i * 0.06}>
                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 sm:p-6 h-full">
                  <p className="font-semibold flex items-center gap-2">
                    <ShieldCheck className="h-4 w-4 text-emerald-400 shrink-0" />
                    {item.title}
                  </p>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{item.text}</p>
                </div>
              </FadeIn>
            ))}
          </div>

          <FadeIn delay={0.25}>
            <div className="mt-10 rounded-2xl border border-emerald-500/25 bg-emerald-500/10 p-6 sm:p-8 text-center">
              <Sparkles className="h-6 w-6 mx-auto text-emerald-300" />
              <p className="mt-3 text-lg sm:text-xl font-semibold tracking-tight">
                Garantie qualité : score &lt; 70 → régénération offerte
              </p>
              <p className="mt-2 text-sm text-muted-foreground max-w-xl mx-auto">
                Tu ne restes jamais bloqué avec un brief mediocre. + paiement Stripe, annulation en
                1 clic, {PLAN_PRICES.plus.label} sans engagement long.
              </p>
              <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
                <Button size="lg" className="group" asChild>
                  <ScrollLink section="funnel">
                    Voir la qualité sur mon idée
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </ScrollLink>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/signup">Créer mon compte gratuit</Link>
                </Button>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
