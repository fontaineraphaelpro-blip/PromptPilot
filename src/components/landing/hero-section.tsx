"use client";

import Link from "next/link";
import { ScrollLink } from "@/components/navigation/scroll-link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { GridBackground } from "./grid-background";
import { FadeInHero } from "@/components/motion/fade-in";
import { MARKETING_CONTAINER } from "@/lib/layout-width";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { FREE_DAILY_LIMIT } from "@/lib/constants";

export function HeroSection() {
  return (
    <section className="relative w-full min-h-[min(85vh,900px)] flex items-center overflow-hidden pb-16 pt-16 sm:pb-24 sm:pt-20">
      <GridBackground />
      <div className="scan-line pointer-events-none absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />

      <div className={cn(MARKETING_CONTAINER, "relative z-10 text-center")}>
        <FadeInHero delay={0}>
          <motion.div
            className="mb-6 sm:mb-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm backdrop-blur-md"
            whileHover={{ scale: 1.02, borderColor: "rgba(255,255,255,0.25)" }}
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-40" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-white pulse-dot" />
            </span>
            <span className="text-muted-foreground">Prompt engineering</span>
            <span className="text-foreground font-medium">automatisé par IA</span>
          </motion.div>
        </FadeInHero>

        <FadeInHero delay={0.1}>
          <h1 className="text-[1.65rem] font-bold tracking-tight sm:text-5xl md:text-6xl xl:text-7xl leading-[1.12] sm:leading-[1.08] px-1">
            Transforme ton idée en{" "}
            <span className="gradient-text">prompt parfait</span>
            <br className="hidden sm:block" />
            <span className="text-muted-foreground font-normal text-lg sm:text-5xl xl:text-6xl block sm:inline mt-1 sm:mt-0">
              pour n&apos;importe quelle IA
            </span>
          </h1>
        </FadeInHero>

        <FadeInHero delay={0.2}>
          <p className="mx-auto mt-6 sm:mt-8 max-w-2xl text-base text-muted-foreground sm:text-xl leading-relaxed px-2">
            Décris ton idée. Reçois un brief expert scoré, avec preview et 4 variantes —
            adapté à ChatGPT, Claude, Midjourney, Cursor… en moins de 30 secondes.
          </p>
        </FadeInHero>

        <FadeInHero delay={0.35}>
          <div className="mt-8 sm:mt-12 flex flex-col items-stretch sm:items-center justify-center gap-3 sm:flex-row sm:gap-4 w-full max-w-md sm:max-w-none mx-auto px-2 sm:px-0">
            <Button size="lg" className="group w-full sm:w-auto sm:min-w-[240px]" asChild>
              <ScrollLink section="funnel">
                Tester gratuitement
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </ScrollLink>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="w-full sm:w-auto sm:min-w-[180px] border-white/20"
              asChild
            >
              <Link href="/signup">Créer un compte free</Link>
            </Button>
          </div>
          <p className="mt-4 text-xs text-muted-foreground px-4">
            {FREE_DAILY_LIMIT} prompts/jour offerts · sans carte · upgrade Pro plus tard si tu veux
          </p>
        </FadeInHero>

        <FadeInHero delay={0.5}>
          <div className="mt-12 sm:mt-16 grid grid-cols-3 gap-3 sm:gap-6 max-w-lg mx-auto text-center px-2">
            {[
              { value: "12+", label: "IA supportées" },
              { value: "100", label: "Score max" },
              { value: "4", label: "Variantes" },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="text-xl sm:text-3xl font-bold">{stat.value}</p>
                <p className="text-[10px] sm:text-xs text-muted-foreground mt-1 leading-tight">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </FadeInHero>
      </div>
    </section>
  );
}
