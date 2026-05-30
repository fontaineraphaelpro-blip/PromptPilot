"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CheckoutSuccessBanner() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (searchParams.get("checkout") === "success") {
      setVisible(true);
    }
  }, [searchParams]);

  if (!visible) return null;

  function dismiss() {
    setVisible(false);
    router.replace("/dashboard");
  }

  return (
    <Card className="border-primary/30 bg-primary/5 mb-6">
      <CardContent className="flex items-start justify-between gap-4 py-4">
        <div className="flex gap-3">
          <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
          <div>
            <p className="font-medium">Paiement réussi !</p>
            <p className="text-sm text-muted-foreground mt-1">
              Votre abonnement sera activé dans quelques secondes. Profitez de vos prompts
              illimités.
            </p>
          </div>
        </div>
        <Button variant="ghost" size="icon" onClick={dismiss} aria-label="Fermer">
          <X className="h-4 w-4" />
        </Button>
      </CardContent>
    </Card>
  );
}
