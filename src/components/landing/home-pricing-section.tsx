"use client";

import { PricingSection } from "@/components/landing/pricing-section";
import { usePlanCheckout } from "@/hooks/use-plan-checkout";

export function HomePricingSection() {
  const { handleCheckout, sessionLoading } = usePlanCheckout();

  return (
    <PricingSection
      onSelectPlan={handleCheckout}
      checkoutLoading={sessionLoading ? "session" : null}
    />
  );
}
