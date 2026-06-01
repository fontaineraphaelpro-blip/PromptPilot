"use client";

import Link from "next/link";
import { ScrollLink } from "@/components/navigation/scroll-link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import { FadeIn } from "@/components/motion/fade-in";
import { FREE_DAILY_LIMIT } from "@/lib/constants";
import { MARKETING_CONTAINER } from "@/lib/layout-width";

export function FinalCtaSection() {
  return (
    <section className="py-16 sm:py-24 w-full">
      <FadeIn className={MARKETING_CONTAINER}>
        <div className="mx-auto max-w-4xl rounded-3xl border border-white/20 bg-gradient-to-b from-white/10 to-transparent p-8 sm:p-14 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <p className="inline-flex items-center gap-2 text-xs uppercase tracking-wider text-emerald-200/90 mb-6">
            <Sparkles className="h-4 w-4" />
            Plan free — {FREE_DAILY_LIMIT} prompts/jour
          </p>
          <h2 className="text-2xl font-bold sm:text-4xl tracking-tight relative px-2">
            Prêt à tester sur ton vrai projet ?
          </h2>
          <p className="mt-4 text-muted-foreground text-base sm:text-lg max-w-xl mx-auto relative px-2">
            Inscris-toi en 30 secondes, génère ton premier brief expert. Tu pourras passer au Pro
            depuis ton dashboard quand tu seras convaincu.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center relative px-4 sm:px-0">
            <Button size="lg" className="group w-full sm:min-w-[240px]" asChild>
              <Link href="/signup">
                Créer mon compte gratuit
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="w-full sm:min-w-[200px]" asChild>
              <ScrollLink section="funnel">Tester sans compte</ScrollLink>
            </Button>
          </div>
        </div>
      </FadeIn>
    </section>
  );
}
