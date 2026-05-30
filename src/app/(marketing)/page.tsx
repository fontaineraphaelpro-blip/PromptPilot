import Link from "next/link";
import { HeroSection } from "@/components/landing/hero-section";
import { FunnelWizard } from "@/components/conversion/funnel-wizard";
import { SocialProof } from "@/components/conversion/social-proof";
import { FinalCtaSection } from "@/components/conversion/final-cta-section";
import { AIMarquee } from "@/components/landing/ai-marquee";
import { HowItWorks } from "@/components/landing/how-it-works";
import { PricingSection } from "@/components/landing/pricing-section";
import { FaqSection } from "@/components/landing/faq-section";
import { TASK_TYPES } from "@/lib/constants";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import { FadeIn } from "@/components/motion/fade-in";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <FunnelWizard />
      <SocialProof />
      <AIMarquee />

      <section className="px-4 py-24 sm:px-6 border-t border-border/40">
        <div className="mx-auto max-w-6xl">
          <FadeIn className="text-center">
            <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground mb-4">
              Use cases
            </p>
            <h2 className="text-3xl font-bold sm:text-4xl tracking-tight">
              Pour chaque type de projet
            </h2>
          </FadeIn>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {TASK_TYPES.filter((t) => t !== "Autre").map((use, i) => (
              <FadeIn key={use} delay={i * 0.06}>
                <Card className="glass-card hover-lift h-full">
                  <CardContent className="p-6 text-center font-medium">{use}</CardContent>
                </Card>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <HowItWorks />

      <section id="examples" className="relative px-4 py-28 sm:px-6">
        <div className="absolute inset-0 bg-gradient-radial-top opacity-30 pointer-events-none" />
        <div className="relative mx-auto max-w-4xl">
          <FadeIn className="text-center">
            <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground mb-4">
              Résultat
            </p>
            <h2 className="text-3xl font-bold sm:text-5xl tracking-tight">Avant / Après</h2>
            <p className="mt-4 text-muted-foreground text-lg">
              Une idée vague devient un prompt structuré, prêt à l&apos;emploi.
            </p>
          </FadeIn>
          <div className="mt-14 grid gap-6 md:grid-cols-2">
            <FadeIn delay={0.1}>
              <Card className="glass-card border-white/5 h-full">
                <CardContent className="p-8">
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-4">
                    Avant
                  </p>
                  <p className="text-xl font-medium">&quot;Fais-moi une app de fitness&quot;</p>
                </CardContent>
              </Card>
            </FadeIn>
            <FadeIn delay={0.2}>
              <Card className="glass-card border-white/20 h-full shadow-[0_0_40px_-20px_rgba(255,255,255,0.2)]">
                <CardContent className="p-8">
                  <p className="text-xs font-semibold uppercase tracking-wider text-foreground mb-4">
                    Après — Cursor
                  </p>
                  <p className="text-sm text-muted-foreground leading-relaxed line-clamp-8">
                    Crée une application fitness Next.js 14 avec : onboarding utilisateur, dashboard
                    entraînements, suivi calories, authentification mock, design minimal premium,
                    composants réutilisables shadcn/ui. Architecture App Router, TypeScript strict.
                    Procède étape par étape : setup → auth → dashboard → features.
                  </p>
                </CardContent>
              </Card>
            </FadeIn>
          </div>
          <FadeIn delay={0.3} className="mt-10 text-center">
            <Link
              href="/signup"
              className="inline-flex items-center gap-2 font-medium hover:gap-3 transition-all"
            >
              Essayer avec ton idée <ArrowRight className="h-4 w-4" />
            </Link>
          </FadeIn>
        </div>
      </section>

      <PricingSection />
      <FaqSection />
      <FinalCtaSection />
    </>
  );
}
