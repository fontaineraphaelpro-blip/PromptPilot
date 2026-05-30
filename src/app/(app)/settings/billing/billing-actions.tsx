"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Loader2, ExternalLink } from "lucide-react";
import { toast } from "sonner";

interface BillingActionsProps {
  hasSubscription: boolean;
}

export function BillingActions({ hasSubscription }: BillingActionsProps) {
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
    <div className="flex flex-wrap gap-3">
      {hasSubscription && (
        <Button onClick={openPortal} disabled={loading}>
          {loading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <ExternalLink className="h-4 w-4" />
          )}
          Gérer l&apos;abonnement
        </Button>
      )}
      <Button variant="outline" asChild>
        <Link href="/pricing">Voir les plans</Link>
      </Button>
    </div>
  );
}
