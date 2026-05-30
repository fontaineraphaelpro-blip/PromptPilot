"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Loader2, ExternalLink } from "lucide-react";
import { toast } from "sonner";

export default function BillingPage() {
  const [loading, setLoading] = useState(false);

  async function openPortal() {
    setLoading(true);
    try {
      const res = await fetch("/api/stripe/portal", { method: "POST" });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        toast.error(data.error ?? "Aucun abonnement actif");
      }
    } catch {
      toast.error("Erreur réseau");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <Button variant="ghost" size="sm" asChild>
        <Link href="/settings">
          <ArrowLeft className="h-4 w-4" />
          Paramètres
        </Link>
      </Button>
      <h1 className="text-2xl font-bold">Facturation</h1>
      <Card>
        <CardHeader>
          <CardTitle>Stripe Customer Portal</CardTitle>
          <CardDescription>
            Gérez votre abonnement, moyens de paiement et factures via Stripe.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button onClick={openPortal} disabled={loading}>
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <ExternalLink className="h-4 w-4" />
            )}
            Ouvrir le portail Stripe
          </Button>
          <Button variant="outline" asChild>
            <Link href="/pricing">Voir les plans</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
