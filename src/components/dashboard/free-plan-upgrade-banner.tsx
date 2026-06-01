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
  "Historique complet",
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
            Tu aimes PromptPilot ? Passe au Pro quand tu es prêt
          </p>
          <p className="text-sm text-muted-foreground mt-1">
            Le plan gratuit te laisse tester à ton rythme. Upgrade seulement si tu veux plus de
            volume et les options pro.
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
            <Link href="/pricing?plan=pro">Pro — {PLAN_PRICES.pro.label}</Link>
          </Button>
          <Button variant="ghost" size="sm" asChild className="w-full">
            <Link href="/pricing">Comparer les plans</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
