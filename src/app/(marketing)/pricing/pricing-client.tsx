"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { PricingSection } from "@/components/landing/pricing-section";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

export function PricingPageClient() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState<string | null>(null);
  const autoCheckoutDone = useRef(false);

  const handleCheckout = useCallback(
    async (plan: "pro" | "creator") => {
      if (status === "loading") return;

      if (!session) {
        toast.info("Connectez-vous pour vous abonner");
        router.push(`/login?redirect=/pricing&plan=${plan}`);
        return;
      }

      setLoading(plan);
      try {
        const res = await fetch("/api/stripe/checkout", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ plan }),
        });
        const data = await res.json();
        if (data.url) {
          window.location.href = data.url;
        } else if (res.status === 401) {
          router.push(`/login?redirect=/pricing&plan=${plan}`);
        } else {
          toast.error(data.error ?? "Impossible de lancer le paiement");
        }
      } catch {
        toast.error("Erreur réseau");
      } finally {
        setLoading(null);
      }
    },
    [session, status, router]
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

  const cancelled = searchParams.get("checkout") === "cancelled";

  return (
    <div className="py-12">
      {cancelled && (
        <p className="text-center text-sm text-muted-foreground mb-4 px-4">
          Paiement annulé. Vous pouvez réessayer quand vous voulez.
        </p>
      )}
      <PricingSection onSelectPlan={handleCheckout} checkoutLoading={loading} />
      <div className="mx-auto max-w-2xl px-4 mt-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Choisir un abonnement</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-3">
            <Button
              onClick={() => handleCheckout("pro")}
              disabled={!!loading || status === "loading"}
            >
              {loading === "pro" && <Loader2 className="h-4 w-4 animate-spin" />}
              Pro — 9€/mois
            </Button>
            <Button
              variant="outline"
              onClick={() => handleCheckout("creator")}
              disabled={!!loading || status === "loading"}
            >
              {loading === "creator" && <Loader2 className="h-4 w-4 animate-spin" />}
              Creator — 19€/mois
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
