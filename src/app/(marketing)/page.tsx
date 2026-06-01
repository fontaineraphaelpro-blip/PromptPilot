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
import { FadeIn } from "@/components/motion/fade-in";
import { BeforeAfterSection } from "@/components/landing/before-after-section";
import { ValuePropositionSection } from "@/components/landing/value-proposition-section";
import { SocialProofCounter } from "@/components/conversion/social-proof-counter";
export default function HomePage() {
  return (
    <>
      <HeroSection />
      <div className="flex justify-center px-4 -mt-8 mb-4">
        <SocialProofCounter />
      </div>
      <FunnelWizard />
      <SocialProof />
      <ValuePropositionSection />
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
      <BeforeAfterSection />
      <PricingSection />
      <FaqSection />
      <FinalCtaSection />
    </>
  );
}
