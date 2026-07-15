import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Sparkles, Check } from "lucide-react";
import { PLAN_PRICES } from "@/lib/plans";
import { isAppUpgradeMode } from "@/lib/sales-mode";

const PRO_HIGHLIGHTS = [
  "200 prompts/jour",
  "Regénération garantie si score < 70",
  "Templates premium & favoris",
  "Rentabilisé dès 2 briefs (~30–60 min chacun)",
] as const;

export function FreePlanUpgradeBanner() {
  if (!isAppUpgradeMode()) return null;

  return (
    <Card className="border-amber-500/25 bg-gradient-to-r from-amber-500/10 via-transparent to-transparent">
      <CardContent className="py-5 sm:py-6 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-black">
          <Sparkles className="h-5 w-5" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-base sm:text-lg">
            Tu as vu la qualité — passe au Pro pour produire sans frein
          </p>
          <p className="text-sm text-muted-foreground mt-1">
            Un brief expert = 30 à 60 min économisées. Pro à {PLAN_PRICES.pro.label} est
            rentabilisé dès la 2ᵉ génération.
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
          <Button asChild className="w-full sm:min-w-[180px]">
            <Link href="/pricing?plan=pro">Passer au Pro — {PLAN_PRICES.pro.label}</Link>
          </Button>
          <Button variant="ghost" size="sm" asChild className="w-full">
            <Link href="/pricing">Comparer les plans</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
