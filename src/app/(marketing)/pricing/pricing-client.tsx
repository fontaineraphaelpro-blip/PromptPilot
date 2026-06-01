"use client";

import { useEffect, useCallback, useRef, useState } from "react";
import { hasAnyYearlyPricing } from "@/lib/stripe";
import { useSearchParams, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { PricingSection } from "@/components/landing/pricing-section";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { startCheckout } from "@/lib/start-checkout";

export function PricingPageClient() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { data: session, status } = useSession();
  const autoCheckoutDone = useRef(false);
  const [billingInterval, setBillingInterval] = useState<"monthly" | "yearly">("monthly");
  const showYearlyToggle = hasAnyYearlyPricing();

  const handleCheckout = useCallback(
    (plan: "pro" | "creator") => {
      if (status === "loading") return;

      startCheckout(
        plan,
        session,
        () => {
          toast.info("Connectez-vous pour vous abonner");
          router.push(`/login?redirect=/pricing&plan=${plan}`);
        },
        billingInterval
      );
    },
    [session, status, router, billingInterval]
  );

  useEffect(() => {
    const plan = searchParams.get("plan");
    if (autoCheckoutDone.current) return;
    if (
      plan &&
      (plan === "pro" || plan === "creator") &&
      session &&
      status === "authenticated"
    ) {
      autoCheckoutDone.current = true;
      handleCheckout(plan);
    }
  }, [searchParams, session, status, handleCheckout]);

  useEffect(() => {
    if (searchParams.get("checkout") === "error") {
      toast.error("Impossible de lancer le paiement. Réessayez ou contactez le support.");
    }
  }, [searchParams]);

  const cancelled = searchParams.get("checkout") === "cancelled";

  return (
    <div className="py-12">
      {cancelled && (
        <p className="text-center text-sm text-muted-foreground mb-4 px-4">
          Paiement annulé. Vous pouvez réessayer quand vous voulez.
        </p>
      )}
      {showYearlyToggle && (
        <div className="flex justify-center gap-2 mb-8 px-4">
          <Button
            type="button"
            variant={billingInterval === "monthly" ? "default" : "outline"}
            size="sm"
            onClick={() => setBillingInterval("monthly")}
          >
            Mensuel
          </Button>
          <Button
            type="button"
            variant={billingInterval === "yearly" ? "default" : "outline"}
            size="sm"
            onClick={() => setBillingInterval("yearly")}
          >
            Annuel (−20 %)
          </Button>
        </div>
      )}
      <PricingSection
        onSelectPlan={handleCheckout}
        checkoutLoading={status === "loading" ? "session" : null}
      />
      <div className="mx-auto max-w-2xl px-4 mt-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Choisir un abonnement</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-3">
            <Button
              onClick={() => handleCheckout("pro")}
              disabled={status === "loading"}
            >
              Pro — 9€/mois
            </Button>
            <Button
              variant="outline"
              onClick={() => handleCheckout("creator")}
              disabled={status === "loading"}
            >
              Creator — 19€/mois
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
