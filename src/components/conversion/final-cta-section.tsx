"use client";

import Link from "next/link";
import { ScrollLink } from "@/components/navigation/scroll-link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import { FadeIn } from "@/components/motion/fade-in";
import { FREE_LIFETIME_LIMIT } from "@/lib/constants";
import { MARKETING_CONTAINER } from "@/lib/layout-width";

export function FinalCtaSection() {
  return (
    <section className="py-16 sm:py-24 w-full">
      <FadeIn className={MARKETING_CONTAINER}>
        <div className="mx-auto max-w-4xl rounded-3xl border border-white/20 bg-gradient-to-b from-white/10 to-transparent p-8 sm:p-14 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <p className="inline-flex items-center gap-2 text-xs uppercase tracking-wider text-emerald-200/90 mb-6">
            <Sparkles className="h-4 w-4" />
            {FREE_LIFETIME_LIMIT} briefs offerts · sans carte · risque zéro
          </p>
          <h2 className="text-2xl font-bold sm:text-4xl tracking-tight relative px-2 text-balance">
            Ce soir, tu peux récupérer 45 minutes — ou les reperdre sur ChatGPT
          </h2>
          <p className="mt-4 text-muted-foreground text-base sm:text-lg max-w-xl mx-auto relative px-2">
            PromptPilot est le raccourci : idée → brief scoré /100 → coller → livrer. Les gens qui
            avancent ne perdent plus leur temps à réécrire des prompts. Ils génèrent.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center relative px-4 sm:px-0">
            <Button size="lg" className="group w-full sm:min-w-[260px]" asChild>
              <Link href="/signup">
                Je récupère mon temps — gratuit
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="w-full sm:min-w-[200px]" asChild>
              <ScrollLink section="roi">Calculer mon ROI</ScrollLink>
            </Button>
          </div>
        </div>
      </FadeIn>
    </section>
  );
}
