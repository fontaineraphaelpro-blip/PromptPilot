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
import { HomeSeoJsonLd } from "@/components/landing/home-seo";
import { DemoVideoSection } from "@/components/landing/demo-video-section";
import { HomeScrollHandler } from "@/components/navigation/home-scroll-handler";

export default function HomePage() {
  return (
    <>
      <HomeScrollHandler />
      <HomeSeoJsonLd />
      <HeroSection />
      <div className="flex justify-center px-4 -mt-8 mb-4">
        <SocialProofCounter />
      </div>
      {/* Preuve → produit → action : convaincre avant de demander l'inscription */}
      <BeforeAfterSection />
      <DemoVideoSection />
      <FunnelWizard />
      <SocialProof />
      <ValuePropositionSection />
      <HowItWorks />
      <AIMarquee />

      <section className="py-24 border-t border-border/40 w-full">
        <div className="w-full max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-10">
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

      <PricingSection />
      <FaqSection />
      <FinalCtaSection />
    </>
  );
}
