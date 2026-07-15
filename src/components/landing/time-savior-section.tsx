"use client";

import Link from "next/link";
import { ScrollLink } from "@/components/navigation/scroll-link";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/motion/fade-in";
import { ArrowRight, Clock, Sparkles, X } from "lucide-react";
import { TIME_WITH, TIME_WITHOUT } from "@/lib/value-offer";

export function TimeSaviorSection() {
  return (
    <section
      id="temps"
      className="relative px-4 py-24 sm:px-6 border-t border-border/60 scroll-mt-20"
    >
      <div className="absolute inset-0 bg-gradient-radial-top opacity-40 pointer-events-none" />
      <div className="relative w-full max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-10">
        <FadeIn className="text-center max-w-3xl mx-auto">
          <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground mb-4">
            Ton temps, enfin rendu
          </p>
          <h2 className="text-3xl font-bold sm:text-5xl tracking-tight text-balance">
            Arrête de briquer des prompts.{" "}
            <span className="gradient-text">Récupère tes soirées.</span>
          </h2>
          <p className="mt-4 text-muted-foreground text-base sm:text-lg leading-relaxed">
            Sans structure, tu perds 45 à 90 minutes par idée — allers-retours, frustration,
            livrable moyen. Avec PromptPilot : un brief expert en ~30 secondes. C’est ça, le
            sauveur de temps.
          </p>
        </FadeIn>

        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          <FadeIn>
            <div className="h-full rounded-3xl border border-red-500/20 bg-red-500/[0.06] p-6 sm:p-8">
              <div className="inline-flex items-center gap-2 rounded-full border border-red-500/25 bg-red-500/10 px-3 py-1 text-xs font-medium text-red-200/90">
                <X className="h-3.5 w-3.5" />
                Sans PromptPilot
              </div>
              <p className="mt-4 text-2xl font-bold tracking-tight">45–90 min perdues</p>
              <p className="mt-1 text-sm text-muted-foreground">par idée que tu veux vraiment bien faire</p>
              <ul className="mt-8 space-y-5">
                {TIME_WITHOUT.map((step) => (
                  <li key={step.label} className="flex gap-4">
                    <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-red-500/20 bg-black/20 text-xs font-mono text-red-200/80">
                      <Clock className="h-3.5 w-3.5" />
                    </span>
                    <div>
                      <p className="font-medium text-sm sm:text-base">
                        {step.label}{" "}
                        <span className="text-muted-foreground font-normal">· {step.time}</span>
                      </p>
                      <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
                        {step.pain}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
              <p className="mt-8 text-sm font-medium text-red-100/80 border-t border-red-500/15 pt-5">
                Résultat : tu avances moins. Tu doutes. Tu y retournes demain.
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="h-full rounded-3xl border border-emerald-500/25 bg-emerald-500/[0.07] p-6 sm:p-8 shadow-[0_0_60px_-24px_rgba(16,185,129,0.45)]">
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/15 px-3 py-1 text-xs font-medium text-emerald-100">
                <Sparkles className="h-3.5 w-3.5" />
                Avec PromptPilot
              </div>
              <p className="mt-4 text-2xl font-bold tracking-tight">~30 secondes</p>
              <p className="mt-1 text-sm text-muted-foreground">
                idée → brief scoré → coller → livrer
              </p>
              <ul className="mt-8 space-y-5">
                {TIME_WITH.map((step) => (
                  <li key={step.label} className="flex gap-4">
                    <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-emerald-500/25 bg-emerald-500/10 text-emerald-300">
                      <Sparkles className="h-3.5 w-3.5" />
                    </span>
                    <div>
                      <p className="font-medium text-sm sm:text-base">
                        {step.label}{" "}
                        <span className="text-emerald-200/70 font-normal">· {step.time}</span>
                      </p>
                      <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
                        {step.gain}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
              <p className="mt-8 text-sm font-medium text-emerald-100 border-t border-emerald-500/20 pt-5">
                Résultat : tu livrés. Tu as l’air pro. Il te reste de l’énergie.
              </p>
            </div>
          </FadeIn>
        </div>

        <FadeIn delay={0.2}>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Button size="lg" className="group w-full sm:w-auto" asChild>
              <ScrollLink section="funnel">
                Récupérer mon temps — gratuit
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </ScrollLink>
            </Button>
            <Button size="lg" variant="outline" className="w-full sm:w-auto" asChild>
              <Link href="/signup">Créer mon compte</Link>
            </Button>
          </div>
          <p className="mt-4 text-center text-xs text-muted-foreground">
            Un brief = 30 à 60 min rendues. Pro à 9€/mois se rembourse au 2ᵉ.
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
