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
import { useLocale } from "@/components/providers/locale-provider";

export function HeroSection() {
  const { messages: m } = useLocale();

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
            <span className="text-foreground font-medium">{m.hero.badge}</span>
          </motion.div>
        </FadeInHero>

        <FadeInHero delay={0.1}>
          <h1 className="text-[1.65rem] font-bold tracking-tight sm:text-5xl md:text-6xl xl:text-7xl leading-[1.12] sm:leading-[1.08] px-1">
            {m.hero.title1}{" "}
            <span className="gradient-text">{m.hero.titleHighlight}</span>
            <br className="hidden sm:block" />
            <span className="text-muted-foreground font-normal text-lg sm:text-5xl xl:text-6xl block sm:inline mt-1 sm:mt-0">
              {m.hero.title2}
            </span>
          </h1>
        </FadeInHero>

        <FadeInHero delay={0.2}>
          <p className="mx-auto mt-6 sm:mt-8 max-w-2xl text-base text-muted-foreground sm:text-xl leading-relaxed px-2">
            {m.hero.subtitle}
          </p>
        </FadeInHero>

        <FadeInHero delay={0.35}>
          <div className="mt-8 sm:mt-12 flex flex-col items-stretch sm:items-center justify-center gap-3 sm:flex-row sm:gap-4 w-full max-w-md sm:max-w-none mx-auto px-2 sm:px-0">
            <Button size="lg" className="group w-full sm:w-auto sm:min-w-[240px]" asChild>
              <ScrollLink section="funnel">
                {m.hero.ctaTry}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </ScrollLink>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="w-full sm:w-auto sm:min-w-[180px] border-white/20"
              asChild
            >
              <Link href="/signup">{m.hero.ctaSignup}</Link>
            </Button>
          </div>
          <p className="mt-4 text-xs text-muted-foreground px-4">{m.hero.footnote}</p>
        </FadeInHero>

        <FadeInHero delay={0.5}>
          <div className="mt-12 sm:mt-16 grid grid-cols-3 gap-3 sm:gap-6 max-w-lg mx-auto text-center px-2">
            {[
              { value: "12+", label: m.hero.statAis },
              { value: "100", label: m.hero.statScore },
              { value: "4", label: m.hero.statVariants },
            ].map(({ value, label }) => (
              <div key={label}>
                <p className="text-2xl sm:text-3xl font-bold">{value}</p>
                <p className="text-[10px] sm:text-xs text-muted-foreground mt-1">{label}</p>
              </div>
            ))}
          </div>
        </FadeInHero>
      </div>
    </section>
  );
}
