"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Flame } from "lucide-react";
import { FadeIn } from "@/components/motion/fade-in";
import { FREE_DAILY_LIMIT } from "@/lib/constants";
import { MARKETING_CONTAINER } from "@/lib/layout-width";

export function FinalCtaSection() {
  return (
    <section className="py-24 w-full">
      <FadeIn className={MARKETING_CONTAINER}>
        <div className="mx-auto max-w-4xl rounded-3xl border border-white/20 bg-gradient-to-b from-white/10 to-transparent p-10 sm:p-14 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <p className="inline-flex items-center gap-2 text-xs uppercase tracking-wider text-amber-200/90 mb-6">
            <Flame className="h-4 w-4" />
            {FREE_DAILY_LIMIT} prompts gratuits — aujourd&apos;hui seulement
          </p>
          <h2 className="text-3xl font-bold sm:text-4xl tracking-tight relative">
            Ne laisse pas ton idée dans ta tête
          </h2>
          <p className="mt-4 text-muted-foreground text-lg max-w-xl mx-auto relative">
            Rejoins les créateurs qui transforment une phrase en prompt expert en moins d&apos;une
            minute.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center relative">
            <Button size="lg" className="group min-w-[240px]" asChild>
              <Link href="/pricing?plan=pro">
                Passer au Pro — 9€/mois
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="min-w-[200px]" asChild>
              <Link href="/#funnel">Essayer gratuitement</Link>
            </Button>
          </div>
        </div>
      </FadeIn>
    </section>
  );
}
