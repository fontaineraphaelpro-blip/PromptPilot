"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Crown, Zap } from "lucide-react";
import type { Plan } from "@/lib/constants";
import { getUpgradeHighlights } from "@/lib/product-value";
import { PLAN_PRICES } from "@/lib/plans";
import { startCheckout } from "@/lib/start-checkout";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

interface UpgradeValuePanelProps {
  plan: Plan;
  promptScore?: number;
}

export function UpgradeValuePanel({ plan, promptScore }: UpgradeValuePanelProps) {
  const highlights = getUpgradeHighlights(plan);
  const { data: session } = useSession();
  const router = useRouter();

  if (highlights.length === 0) return null;

  const primaryPlan = highlights.some((h) => h.plan === "pro") ? "pro" : "creator";

  function goToCheckout(target: "pro" | "creator") {
    startCheckout(target, session, () => {
      router.push(`/login?redirect=/pricing&plan=${target}`);
    });
  }

  return (
    <Card className="border-primary/25 bg-gradient-to-br from-primary/10 via-transparent to-transparent">
      <CardHeader className="pb-2">
        <CardTitle className="text-base flex items-center gap-2">
          <Crown className="h-4 w-4 text-primary" />
          Passe au niveau supérieur — débloque la vraie valeur
        </CardTitle>
        {typeof promptScore === "number" && promptScore >= 70 && (
          <p className="text-xs text-muted-foreground">
            Ton prompt est déjà scoré {promptScore}/100 — imagine la variante Expert complète
            et des générations illimitées.
          </p>
        )}
      </CardHeader>
      <CardContent className="space-y-4">
        <ul className="grid gap-3 sm:grid-cols-2">
          {highlights.map((item) => (
            <li
              key={item.title}
              className="rounded-lg border border-white/10 bg-white/[0.03] p-3"
            >
              <p className="text-sm font-medium flex items-center gap-1.5">
                <Zap className="h-3.5 w-3.5 text-primary shrink-0" />
                {item.title}
              </p>
              <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                {item.description}
              </p>
            </li>
          ))}
        </ul>
        <div className="flex flex-col sm:flex-row gap-3">
          {primaryPlan === "pro" ? (
            <>
              <Button className="flex-1" onClick={() => goToCheckout("pro")}>
                Pro — {PLAN_PRICES.pro.label}
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button variant="outline" className="flex-1" onClick={() => goToCheckout("creator")}>
                Creator — {PLAN_PRICES.creator.label}
              </Button>
            </>
          ) : (
            <Button className="w-full sm:w-auto" onClick={() => goToCheckout("creator")}>
              Débloquer Creator — {PLAN_PRICES.creator.label}
              <ArrowRight className="h-4 w-4" />
            </Button>
          )}
          <Button variant="ghost" size="sm" className="sm:ml-auto" asChild>
            <Link href="/pricing">Comparer les plans</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
