"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { FadeIn } from "@/components/motion/fade-in";
import { cn } from "@/lib/utils";
import { FREE_DAILY_LIMIT } from "@/lib/constants";

const faqs = [
  {
    q: "Quelles IA sont supportées ?",
    a: "ChatGPT, Claude, Gemini, Midjourney, DALL·E, Runway, Sora, Veo, Lovable, Bolt, Cursor et Replit.",
  },
  {
    q: "Combien de prompts gratuits par jour ?",
    a: `Le plan Free inclut ${FREE_DAILY_LIMIT} générations par jour. Pro : 200/jour. Creator : illimité.`,
  },
  {
    q: "Quelle différence entre Pro (9€) et Creator (19€) ?",
    a: "Pro : illimité, score /100, preview, templates premium, favoris, tags et options avancées — idéal si tu génères souvent. Creator : tout Pro + la variante Expert complète (brief production), niveau Expert par défaut et workflows métier (SaaS, LinkedIn, Dev). Choisis Creator si tu veux le prompt le plus long et actionnable à chaque fois.",
  },
  {
    q: "En quoi PromptPilot est différent de ChatGPT ?",
    a: "ChatGPT répond à ta question. PromptPilot produit le prompt structuré à coller dans l'outil de ton choix : adapté à 12+ IA, scoré /100, avec preview et 4 variantes. Tu achètes du prompt engineering, pas une conversation.",
  },
  {
    q: "Mes prompts sont-ils sauvegardés ?",
    a: "Oui, chaque génération est enregistrée dans ton historique. Les favoris sont disponibles à partir du plan Pro.",
  },
  {
    q: "Puis-je annuler mon abonnement ?",
    a: "Oui, à tout moment via le portail Stripe dans Paramètres > Facturation.",
  },
];

export function FaqSection() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="px-4 py-28 sm:px-6 border-t border-border/40">
      <div className="mx-auto max-w-3xl">
        <FadeIn className="text-center">
          <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground mb-4">
            FAQ
          </p>
          <h2 className="text-3xl font-bold sm:text-5xl tracking-tight">
            Questions fréquentes
          </h2>
        </FadeIn>
        <dl className="mt-12 space-y-3">
          {faqs.map(({ q, a }, i) => {
            const isOpen = open === i;
            return (
              <FadeIn key={q} delay={i * 0.08}>
                <div className="glass-card rounded-2xl overflow-hidden">
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="flex w-full items-center justify-between gap-4 p-6 text-left transition-colors hover:bg-white/[0.02]"
                  >
                    <dt className="font-semibold pr-4">{q}</dt>
                    <ChevronDown
                      className={cn(
                        "h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-300",
                        isOpen && "rotate-180"
                      )}
                    />
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.dd
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.21, 0.47, 0.32, 0.98] }}
                        className="overflow-hidden"
                      >
                        <p className="px-6 pb-6 text-sm text-muted-foreground leading-relaxed border-t border-border/40 pt-4">
                          {a}
                        </p>
                      </motion.dd>
                    )}
                  </AnimatePresence>
                </div>
              </FadeIn>
            );
          })}
        </dl>
      </div>
    </section>
  );
}
