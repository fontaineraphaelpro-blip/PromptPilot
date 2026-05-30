import { Suspense } from "react";
import { PricingPageClient } from "./pricing-client";

export default function PricingPage() {
  return (
    <Suspense fallback={<div className="py-12 text-center">Chargement…</div>}>
      <PricingPageClient />
    </Suspense>
  );
}
