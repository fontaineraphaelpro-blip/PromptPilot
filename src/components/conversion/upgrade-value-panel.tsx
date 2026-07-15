"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Crown, Zap } from "lucide-react";
import type { Plan } from "@/lib/constants";
import { getUpgradeHighlights } from "@/lib/product-value";
import { PLAN_LABELS, PLAN_PRICES, type PaidPlan } from "@/lib/plans";
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

  const primaryPlan: PaidPlan = highlights.some((h) => h.plan === "plus")
    ? "plus"
    : highlights.some((h) => h.plan === "starter")
      ? "starter"
      : "creator";

  function goToCheckout(target: PaidPlan) {
    startCheckout(target, session, () => {
      router.push(`/login?redirect=/pricing&plan=${target === "plus" ? "pro" : target}`);
    });
  }

  return (
    <Card className="border-primary/25 bg-gradient-to-br from-primary/10 via-transparent to-transparent">
      <CardHeader className="pb-2">
        <CardTitle className="text-base flex items-center gap-2">
          <Crown className="h-4 w-4 text-primary" />
          {typeof promptScore === "number" && promptScore >= 70
            ? `Garde ce ${promptScore}/100 avec Pro`
            : "Passe Pro — Expert à chaque brief"}
        </CardTitle>
        {typeof promptScore === "number" && promptScore >= 70 && (
          <p className="text-xs text-muted-foreground">
            Ce niveau est déjà là. Pro ({PLAN_PRICES.plus.label}) le met en série —
            Expert inclus, annulation en 1 clic.
          </p>
        )}
      </CardHeader>
      <CardContent className="space-y-4">
        <ul className="grid gap-3 sm:grid-cols-2">
          {highlights.slice(0, 2).map((item) => (
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
          <Button className="flex-1" onClick={() => goToCheckout(primaryPlan)}>
            Passer {PLAN_LABELS[primaryPlan]} — {PLAN_PRICES[primaryPlan].label}
            <ArrowRight className="h-4 w-4" />
          </Button>
          {primaryPlan !== "creator" && (
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => goToCheckout("creator")}
            >
              Creator — {PLAN_PRICES.creator.label}
            </Button>
          )}
          <Button variant="ghost" size="sm" className="sm:ml-auto" asChild>
            <Link href="/pricing?plan=pro">Voir les tarifs</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
