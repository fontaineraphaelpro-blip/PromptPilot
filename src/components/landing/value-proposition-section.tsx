"use client";

import { FadeIn } from "@/components/motion/fade-in";
import { PRODUCT_DIFFERENTIATORS, ROI_HEADLINE } from "@/lib/product-value";
import {
  Sparkles,
  Gauge,
  Eye,
  Layers,
  FileText,
  Workflow,
} from "lucide-react";

const ICONS = [Sparkles, Gauge, Eye, Layers, FileText, Workflow] as const;

export function ValuePropositionSection() {
  return (
    <section
      id="value"
      className="relative px-4 py-24 sm:px-6 border-t border-border/60"
    >
      <div className="absolute inset-0 bg-gradient-radial-top opacity-40 pointer-events-none" />
      <div className="relative mx-auto max-w-6xl">
        <FadeIn className="text-center">
          <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground mb-4">
            Pourquoi PromptExpert
          </p>
          <h2 className="text-3xl font-bold sm:text-4xl tracking-tight">
            Pas un « meilleur ChatGPT » — un{" "}
            <span className="gradient-text">studio de prompts</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground text-lg leading-relaxed">
            Tu ne paies pas pour poser une question à une IA. Tu paies pour recevoir un brief
            expert, scoré et prêt à coller — adapté à ton outil, en 30 secondes.
          </p>
        </FadeIn>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {PRODUCT_DIFFERENTIATORS.map((item, i) => {
            const Icon = ICONS[i] ?? Sparkles;
            return (
              <FadeIn key={item.title} delay={i * 0.06}>
                <div className="glass-card hover-lift h-full rounded-2xl p-6">
                  <div className="flex items-start justify-between gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/15 bg-white/5">
                      <Icon className="h-5 w-5" />
                    </span>
                    <span className="rounded-full border border-white/15 bg-white/5 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                      {item.badge}
                    </span>
                  </div>
                  <h3 className="mt-4 font-semibold text-lg">{item.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </FadeIn>
            );
          })}
        </div>

        <FadeIn delay={0.35}>
          <p className="mt-12 text-center text-sm sm:text-base text-muted-foreground max-w-3xl mx-auto border border-white/10 rounded-2xl bg-white/[0.03] px-6 py-4">
            <span className="text-foreground font-medium">ROI :</span> {ROI_HEADLINE}
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
