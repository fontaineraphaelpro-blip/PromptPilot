"use client";

import { MessageSquare, Cpu, Copy } from "lucide-react";
import { FadeIn } from "@/components/motion/fade-in";
import { motion } from "framer-motion";

const steps = [
  {
    icon: MessageSquare,
    title: "Décris ton idée",
    description: "Une phrase suffit. PromptPilot comprend ton intention et ton contexte.",
  },
  {
    icon: Cpu,
    title: "Choisis ton IA",
    description: "ChatGPT, Claude, Cursor, Midjourney, Sora… chaque prompt est adapté à l'outil.",
  },
  {
    icon: Copy,
    title: "Copie ton prompt",
    description: "Prompt structuré + variantes court, détaillé et expert. Prêt à coller.",
  },
];

export function HowItWorks() {
  return (
    <section id="how" className="relative px-4 py-28 sm:px-6">
      <div className="w-full max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-10">
        <FadeIn className="text-center">
          <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground mb-4">
            Workflow
          </p>
          <h2 className="text-3xl font-bold sm:text-5xl tracking-tight">
            Comment ça marche
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground text-lg">
            Trois étapes. Zéro friction. Un prompt expert à chaque fois.
          </p>
        </FadeIn>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {steps.map((step, i) => (
            <FadeIn key={step.title} delay={i * 0.12}>
              <motion.div
                className="gradient-border hover-lift relative rounded-2xl p-8 h-full"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <span className="font-mono text-xs text-muted-foreground">
                  0{i + 1}
                </span>
                <step.icon className="mb-6 mt-4 h-10 w-10 text-foreground" strokeWidth={1.5} />
                <h3 className="font-semibold text-xl">{step.title}</h3>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
