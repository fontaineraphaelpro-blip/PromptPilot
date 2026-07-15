"use client";

import Link from "next/link";
import { FadeIn } from "@/components/motion/fade-in";
import { Button } from "@/components/ui/button";
import { Check, X, Minus } from "lucide-react";
import { PLAN_COMPARISON_ROWS } from "@/lib/product-value";
import type { PaidPlan } from "@/lib/plans";
import { PLAN_PRICES } from "@/lib/plans";
import { cn } from "@/lib/utils";

function CellValue({ value }: { value: boolean | string }) {
  if (value === true) {
    return (
      <span className="inline-flex items-center justify-center text-emerald-400">
        <Check className="h-4 w-4" aria-label="Inclus" />
      </span>
    );
  }
  if (value === false) {
    return (
      <span className="inline-flex items-center justify-center text-muted-foreground/50">
        <X className="h-4 w-4" aria-label="Non inclus" />
      </span>
    );
  }
  return <span className="text-xs sm:text-sm text-muted-foreground">{value}</span>;
}

interface PlanComparisonTableProps {
  onSelectPlan?: (plan: PaidPlan) => void;
  showCta?: boolean;
}

export function PlanComparisonTable({
  onSelectPlan,
  showCta = true,
}: PlanComparisonTableProps) {
  return (
    <FadeIn>
      <div className="mt-16 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02]">
        <div className="overflow-x-auto overscroll-x-contain">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead>
              <tr className="border-b border-white/10">
                <th className="p-4 font-medium text-muted-foreground w-[28%]">Fonctionnalité</th>
                <th className="p-4 font-semibold text-center w-[18%]">Free</th>
                <th className="p-4 font-semibold text-center w-[18%]">Starter</th>
                <th className="p-4 font-semibold text-center w-[18%] bg-white/[0.04]">
                  Pro
                  <span className="block text-[10px] font-normal text-primary mt-0.5">
                    {PLAN_PRICES.plus.label}
                  </span>
                </th>
                <th className="p-4 font-semibold text-center w-[18%]">Creator</th>
              </tr>
            </thead>
            <tbody>
              {PLAN_COMPARISON_ROWS.map((row) => (
                <tr key={row.feature} className="border-b border-white/5 last:border-0">
                  <td className="p-4">
                    <span className="font-medium">{row.feature}</span>
                    {row.hint && (
                      <span className="block text-xs text-muted-foreground mt-0.5">
                        {row.hint}
                      </span>
                    )}
                  </td>
                  <td className="p-4 text-center">
                    <CellValue value={row.free} />
                  </td>
                  <td className="p-4 text-center">
                    <CellValue value={row.starter} />
                  </td>
                  <td className={cn("p-4 text-center bg-white/[0.02]")}>
                    <CellValue value={row.plus} />
                  </td>
                  <td className="p-4 text-center">
                    <CellValue value={row.creator} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {showCta && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 p-4 border-t border-white/10">
            <Button size="sm" variant="outline" asChild>
              <Link href="/signup">Free</Link>
            </Button>
            {onSelectPlan ? (
              <Button size="sm" variant="outline" onClick={() => onSelectPlan("starter")}>
                Starter
              </Button>
            ) : (
              <Button size="sm" variant="outline" asChild>
                <Link href="/pricing?plan=starter">Starter</Link>
              </Button>
            )}
            {onSelectPlan ? (
              <Button size="sm" onClick={() => onSelectPlan("plus")}>
                Pro
              </Button>
            ) : (
              <Button size="sm" asChild>
                <Link href="/pricing?plan=pro">Pro</Link>
              </Button>
            )}
            {onSelectPlan ? (
              <Button size="sm" variant="outline" onClick={() => onSelectPlan("creator")}>
                Creator
              </Button>
            ) : (
              <Button size="sm" variant="outline" asChild>
                <Link href="/pricing?plan=creator">Creator</Link>
              </Button>
            )}
          </div>
        )}
      </div>
      <p className="mt-3 text-center text-xs text-muted-foreground hidden sm:block">
        <Minus className="inline h-3 w-3 mr-1 opacity-0" />
        Pro inclut Expert. Creator ajoute workflows et volume illimité.
      </p>
    </FadeIn>
  );
}
