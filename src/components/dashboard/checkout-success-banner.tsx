"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CheckoutSuccessBanner() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [mode, setMode] = useState<"sub" | "credits" | "oneshot" | null>(null);

  useEffect(() => {
    const checkout = searchParams.get("checkout");
    if (checkout === "success") setMode("sub");
    else if (checkout === "credits") setMode("credits");
    else if (checkout === "oneshot" || checkout === "expert" || checkout === "workflow") {
      setMode("oneshot");
    }
  }, [searchParams]);

  if (!mode) return null;

  function dismiss() {
    setMode(null);
    router.replace("/dashboard");
  }

  const copy =
    mode === "credits"
      ? {
          title: "Pack crédité",
          body: "Tes briefs supplémentaires sont prêts. Tu peux générer tout de suite depuis le générateur.",
        }
      : mode === "oneshot"
        ? {
            title: "Déblocage confirmé",
            body: "C’est bon — retrouve ton contenu débloqué dans ton espace (historique ou workflows).",
          }
        : {
            title: "Paiement réussi",
            body: "Ton plan sera actif sous quelques secondes. Tu peux déjà générer ton prochain brief.",
          };

  return (
    <Card className="border-emerald-500/30 bg-emerald-500/10 mb-2">
      <CardContent className="flex items-start justify-between gap-4 py-4">
        <div className="flex gap-3">
          <Check className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" />
          <div>
            <p className="font-medium">{copy.title}</p>
            <p className="text-sm text-muted-foreground mt-1">{copy.body}</p>
          </div>
        </div>
        <Button variant="ghost" size="icon" onClick={dismiss} aria-label="Fermer">
          <X className="h-4 w-4" />
        </Button>
      </CardContent>
    </Card>
  );
}
