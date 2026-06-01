"use client";

import Link from "next/link";
import { FadeIn } from "@/components/motion/fade-in";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const EXAMPLES = [
  {
    idea: "Je veux des posts LinkedIn pour mon SaaS",
    before: "Écris-moi des posts LinkedIn pour mon app",
    after: `Rôle : expert LinkedIn B2B SaaS.\nContexte : lancement produit productivité IA.\nObjectif : 5 posts sur 2 semaines — hooks, storytelling, CTA démo.\nContraintes : 150-200 mots, ton pro, pas de jargon.\nFormat : titre + corps + hashtags (max 3).`,
    score: 88,
  },
  {
    idea: "Landing page pour une app fitness",
    before: "Fais une landing pour mon app fitness",
    after: `Tu es copywriter conversion.\nCrée le copy d'une landing fitness IA :\n- Hero (promesse + sous-titre + CTA)\n- 3 bénéfices avec icônes\n- Social proof\n- FAQ 5 questions\n- CTA final\nTon : motivant, accessible. Langue : français.`,
    score: 91,
  },
];

export function BeforeAfterSection() {
  return (
    <section id="examples" className="relative px-4 py-24 sm:px-6 border-t border-border/60">
      <div className="mx-auto max-w-5xl">
        <FadeIn className="text-center mb-12">
          <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground mb-4">
            Avant / Après
          </p>
          <h2 className="text-3xl font-bold sm:text-4xl tracking-tight">
            Idée vague → prompt expert en 30 secondes
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            Pas un template générique — un prompt adapté à ton idée et à ton outil IA.
          </p>
        </FadeIn>

        <div className="grid gap-8 md:grid-cols-2">
          {EXAMPLES.map((ex, i) => (
            <FadeIn key={ex.idea} delay={i * 0.1}>
              <div className="glass-card rounded-2xl p-6 space-y-4 h-full">
                <p className="text-sm text-muted-foreground">
                  Idée : <span className="text-foreground">{ex.idea}</span>
                </p>
                <div>
                  <p className="text-xs uppercase tracking-wider text-red-400/80 mb-2">Avant</p>
                  <p className="text-sm line-through text-muted-foreground">{ex.before}</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wider text-green-400/80 mb-2">
                    Après PromptPilot · Score {ex.score}/100
                  </p>
                  <pre className="text-xs whitespace-pre-wrap font-sans text-muted-foreground bg-black/40 rounded-lg p-3 max-h-40 overflow-y-auto">
                    {ex.after}
                  </pre>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn className="text-center mt-10">
          <Button asChild size="lg">
            <Link href="/signup">
              Essayer gratuitement
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </FadeIn>
      </div>
    </section>
  );
}
