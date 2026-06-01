"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { GridBackground } from "./grid-background";
import { FadeInHero } from "@/components/motion/fade-in";
import { motion } from "framer-motion";

export function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden px-4 pb-24 pt-20 sm:px-6">
      <GridBackground />
      <div className="scan-line pointer-events-none absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />

      <div className="relative z-10 mx-auto max-w-5xl w-full text-center">
        <FadeInHero delay={0}>
          <motion.div
            className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm backdrop-blur-md"
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
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl leading-[1.08]">
            Transforme ton idée en{" "}
            <span className="gradient-text">prompt parfait</span>
            <br className="hidden sm:block" />
            <span className="text-muted-foreground font-normal text-3xl sm:text-5xl lg:text-6xl">
              {" "}pour n&apos;importe quelle IA
            </span>
          </h1>
        </FadeInHero>

        <FadeInHero delay={0.2}>
          <p className="mx-auto mt-8 max-w-2xl text-lg text-muted-foreground sm:text-xl leading-relaxed">
            Décris ton idée. Reçois un brief expert scoré, avec preview et 4 variantes —
            adapté à ChatGPT, Claude, Midjourney, Cursor… en moins de 30 secondes.
          </p>
        </FadeInHero>

        <FadeInHero delay={0.35}>
          <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button size="lg" className="group min-w-[240px]" asChild>
              <Link href="/#funnel">
                Commencer — c&apos;est gratuit
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="min-w-[180px] border-white/20" asChild>
              <Link href="/#examples">Voir avant / après</Link>
            </Button>
          </div>
          <p className="mt-4 text-xs text-muted-foreground">
            ↓ Parcours guidé en 3 étapes — sans carte bancaire
          </p>
        </FadeInHero>

        <FadeInHero delay={0.5}>
          <div className="mt-16 grid grid-cols-3 gap-6 max-w-lg mx-auto text-center">
            {[
              { value: "12+", label: "IA supportées" },
              { value: "100", label: "Score qualité max" },
              { value: "4", label: "Variantes / prompt" },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="text-2xl sm:text-3xl font-bold">{stat.value}</p>
                <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </FadeInHero>
      </div>
    </section>
  );
}
