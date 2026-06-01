import { HeroSection } from "@/components/landing/hero-section";
import { FunnelWizard } from "@/components/conversion/funnel-wizard";
import { SocialProof } from "@/components/conversion/social-proof";
import { FinalCtaSection } from "@/components/conversion/final-cta-section";
import { AIMarquee } from "@/components/landing/ai-marquee";
import { HowItWorks } from "@/components/landing/how-it-works";
import { PricingSection } from "@/components/landing/pricing-section";
import { FaqSection } from "@/components/landing/faq-section";
import { HomeUseCases } from "@/components/landing/home-use-cases";
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

      <HomeUseCases />

      <PricingSection />
      <FaqSection />
      <FinalCtaSection />
    </>
  );
}
