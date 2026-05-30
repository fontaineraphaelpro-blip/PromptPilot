"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { PricingSection } from "@/components/landing/pricing-section";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

export function PricingPageClient() {
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState<string | null>(null);

  async function handleCheckout(plan: "pro" | "creator") {
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
      } else {
        toast.error(data.error ?? "Erreur checkout — connectez-vous d'abord");
      }
    } catch {
      toast.error("Erreur réseau");
    } finally {
      setLoading(null);
    }
  }

  const cancelled = searchParams.get("checkout") === "cancelled";

  return (
    <div className="py-12">
      {cancelled && (
        <p className="text-center text-sm text-muted-foreground mb-4">
          Paiement annulé. Vous pouvez réessayer quand vous voulez.
        </p>
      )}
      <PricingSection />
      <div className="mx-auto max-w-2xl px-4 mt-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">S&apos;abonner maintenant</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-3">
            <Button onClick={() => handleCheckout("pro")} disabled={!!loading}>
              {loading === "pro" && <Loader2 className="h-4 w-4 animate-spin" />}
              Pro — 9€/mois
            </Button>
            <Button
              variant="outline"
              onClick={() => handleCheckout("creator")}
              disabled={!!loading}
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
