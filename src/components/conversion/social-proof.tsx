"use client";

import { FadeIn } from "@/components/motion/fade-in";
import { Star } from "lucide-react";

const TESTIMONIALS = [
  {
    quote:
      "J'ai remplacé 20 minutes de bidouillage par un prompt Cursor prêt en 30 secondes. Mon MVP est sorti la même semaine.",
    author: "Thomas L.",
    role: "Fondateur SaaS",
  },
  {
    quote:
      "Les variantes Expert m'ont fait gagner un contrat client — mes prompts Midjourney sont enfin cohérents.",
    author: "Sarah M.",
    role: "Directrice créative",
  },
  {
    quote:
      "Onboarding équipe simplifié : tout le monde utilise le même framework de prompts.",
    author: "Karim B.",
    role: "Lead Product",
  },
];

export function SocialProof() {
  return (
    <section className="px-4 py-20 sm:px-6 border-t border-border/40">
      <div className="w-full max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-10">
        <FadeIn className="text-center mb-12">
          <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground mb-4">
            Ils ont converti leur idée
          </p>
          <h2 className="text-2xl font-bold sm:text-3xl tracking-tight">
            Des créateurs qui ne repartent plus les mains vides
          </h2>
        </FadeIn>
        <div className="grid gap-6 md:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <FadeIn key={t.author} delay={i * 0.1}>
              <div className="glass-card rounded-2xl p-6 h-full flex flex-col">
                <div className="flex gap-0.5 mb-4">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <Star key={j} className="h-3.5 w-3.5 fill-white text-white" />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                  &quot;{t.quote}&quot;
                </p>
                <p className="mt-4 text-sm font-medium">{t.author}</p>
                <p className="text-xs text-muted-foreground">{t.role}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
