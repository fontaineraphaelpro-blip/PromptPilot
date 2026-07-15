"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Sparkles, Check, ArrowRight } from "lucide-react";
import { PLAN_PRICES } from "@/lib/plans";
import { PLUS_MONTHLY_LIMIT } from "@/lib/constants";
import { isAppUpgradeMode } from "@/lib/sales-mode";
import { startCheckout } from "@/lib/start-checkout";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const PRO_HIGHLIGHTS = [
  `${PLUS_MONTHLY_LIMIT} briefs / mois`,
  "Variante Expert à chaque génération",
  "Templates premium & favoris",
  "Regénération si score < 70",
] as const;

interface FreePlanUpgradeBannerProps {
  remaining?: number | null;
}

export function FreePlanUpgradeBanner({ remaining }: FreePlanUpgradeBannerProps) {
  const { data: session } = useSession();
  const router = useRouter();

  if (!isAppUpgradeMode()) return null;

  const lowQuota = typeof remaining === "number" && remaining <= 2;

  function goPro() {
    startCheckout("plus", session, () => {
      router.push("/login?redirect=/pricing&plan=pro");
    });
  }

  return (
    <Card className="border-amber-500/25 bg-gradient-to-r from-amber-500/10 via-transparent to-transparent">
      <CardContent className="py-5 sm:py-6 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-black">
          <Sparkles className="h-5 w-5" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-base sm:text-lg">
            {lowQuota
              ? `Plus que ${remaining} brief${remaining === 1 ? "" : "s"} — passe Pro avant de bloquer`
              : "Tu as vu la qualité — Pro verrouille ce niveau au quotidien"}
          </p>
          <p className="text-sm text-muted-foreground mt-1">
            Un brief Expert = 30 à 60 min gagnées. Pro à {PLAN_PRICES.plus.label} —
            annulation en 1 clic.
          </p>
          <ul className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs text-muted-foreground">
            {PRO_HIGHLIGHTS.map((item) => (
              <li key={item} className="flex items-center gap-1.5">
                <Check className="h-3.5 w-3.5 shrink-0 text-emerald-400" />
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-col gap-2 w-full sm:w-auto shrink-0">
          <Button className="w-full sm:min-w-[200px]" onClick={goPro}>
            Passer Pro — {PLAN_PRICES.plus.label}
            <ArrowRight className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" asChild className="w-full">
            <Link href="/pricing?plan=pro">Comparer les plans</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
