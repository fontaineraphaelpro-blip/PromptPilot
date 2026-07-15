"use client";

import { MessageSquare, Cpu, Copy } from "lucide-react";
import { FadeIn } from "@/components/motion/fade-in";

const steps = [
  {
    icon: MessageSquare,
    title: "Décris ton idée",
    description:
      "Une phrase suffit. PromptPilot structure le rôle, le contexte et les contraintes — comme un brief consultant.",
  },
  {
    icon: Cpu,
    title: "Choisis ton IA",
    description:
      "ChatGPT, Claude, Cursor, Midjourney, Sora… chaque brief est adapté au vocabulaire de l'outil.",
  },
  {
    icon: Copy,
    title: "Copie ton brief scoré",
    description:
      "Score /100, preview, 4 variantes. Tu sais si c'est prêt avant de coller — zéro allers-retours inutiles.",
  },
];

export function HowItWorks() {
  return (
    <section id="how" className="relative px-4 py-28 sm:px-6 scroll-mt-20 sm:scroll-mt-24">
      <div className="w-full max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-10">
        <FadeIn className="text-center">
          <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground mb-4">
            Workflow
          </p>
          <h2 className="text-3xl font-bold sm:text-5xl tracking-tight">
            Comment ça marche
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground text-lg">
            Trois étapes. 30 secondes. Un brief expert scoré — 30 à 60 min économisées.
          </p>
        </FadeIn>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {steps.map((step, i) => (
            <FadeIn key={step.title} delay={i * 0.12}>
              <div className="gradient-border hover-lift relative rounded-2xl p-8 h-full">
                <span className="font-mono text-xs text-muted-foreground">
                  0{i + 1}
                </span>
                <step.icon className="mb-6 mt-4 h-10 w-10 text-foreground" strokeWidth={1.5} />
                <h3 className="font-semibold text-xl">{step.title}</h3>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
