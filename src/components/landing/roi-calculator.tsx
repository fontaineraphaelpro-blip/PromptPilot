"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ScrollLink } from "@/components/navigation/scroll-link";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/motion/fade-in";
import { ArrowRight, Calculator } from "lucide-react";
import {
  computeMonthlyRoi,
  DEFAULT_BRIEFS_PER_WEEK,
  DEFAULT_HOURLY_RATE,
  MINUTES_SAVED_AVG,
} from "@/lib/value-offer";
import { PLAN_PRICES } from "@/lib/plans";

export function RoiCalculator() {
  const [briefs, setBriefs] = useState(DEFAULT_BRIEFS_PER_WEEK);
  const [rate, setRate] = useState(DEFAULT_HOURLY_RATE);

  const roi = useMemo(() => computeMonthlyRoi(briefs, rate), [briefs, rate]);
  const monthsOfPro = Math.max(1, Math.floor(roi.eurosAvg / PLAN_PRICES.plus.amount));

  return (
    <section
      id="roi"
      className="relative px-4 py-24 sm:px-6 border-t border-border/60 scroll-mt-20"
    >
      <div className="relative w-full max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-10">
        <FadeIn className="text-center max-w-2xl mx-auto">
          <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground mb-4 inline-flex items-center gap-2 justify-center">
            <Calculator className="h-3.5 w-3.5" />
            Calculateur de temps
          </p>
          <h2 className="text-3xl font-bold sm:text-4xl tracking-tight text-balance">
            Combien d’heures — et d’euros — PromptPilot te rend ?
          </h2>
          <p className="mt-4 text-muted-foreground">
            Ajuste à ton rythme. On part de {MINUTES_SAVED_AVG} min gagnées par brief (moyenne
            basse–haute : 30–60 min).
          </p>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div className="mt-12 mx-auto max-w-3xl rounded-3xl border border-white/15 bg-white/[0.03] p-6 sm:p-10">
            <div className="grid gap-8 sm:grid-cols-2">
              <label className="block">
                <span className="text-sm font-medium">Briefs par semaine</span>
                <div className="mt-3 flex items-center gap-4">
                  <input
                    type="range"
                    min={1}
                    max={20}
                    value={briefs}
                    onChange={(e) => setBriefs(Number(e.target.value))}
                    className="w-full accent-white"
                  />
                  <span className="tabular-nums text-xl font-bold w-8 text-right">{briefs}</span>
                </div>
                <span className="mt-1 block text-xs text-muted-foreground">
                  ≈ {roi.briefsPerMonth} briefs / mois
                </span>
              </label>

              <label className="block">
                <span className="text-sm font-medium">Ta valeur horaire (€)</span>
                <div className="mt-3 flex items-center gap-4">
                  <input
                    type="range"
                    min={25}
                    max={150}
                    step={5}
                    value={rate}
                    onChange={(e) => setRate(Number(e.target.value))}
                    className="w-full accent-white"
                  />
                  <span className="tabular-nums text-xl font-bold w-12 text-right">{rate}€</span>
                </div>
                <span className="mt-1 block text-xs text-muted-foreground">
                  Freelance / salarié : ce que 1 h de ton temps vaut
                </span>
              </label>
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              <div className="rounded-2xl border border-white/10 bg-black/30 p-5 text-center">
                <p className="text-xs uppercase tracking-wider text-muted-foreground">Temps/mois</p>
                <p className="mt-2 text-2xl sm:text-3xl font-bold tabular-nums">
                  {roi.hoursLow}–{roi.hoursHigh}
                  <span className="text-base font-medium text-muted-foreground"> h</span>
                </p>
              </div>
              <div className="rounded-2xl border border-emerald-500/25 bg-emerald-500/10 p-5 text-center sm:col-span-1">
                <p className="text-xs uppercase tracking-wider text-emerald-200/80">Valeur/mois</p>
                <p className="mt-2 text-2xl sm:text-3xl font-bold tabular-nums text-emerald-100">
                  {roi.eurosAvg.toLocaleString("fr-FR")}€
                </p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-black/30 p-5 text-center">
                <p className="text-xs uppercase tracking-wider text-muted-foreground">
                  Pro se rembourse
                </p>
                <p className="mt-2 text-2xl sm:text-3xl font-bold tabular-nums">
                  ~{roi.proBreakEven}
                  <span className="text-base font-medium text-muted-foreground"> brief</span>
                </p>
              </div>
            </div>

            <p className="mt-6 text-center text-sm text-muted-foreground leading-relaxed">
              À ton rythme, {PLAN_PRICES.plus.label} (~{PLAN_PRICES.plus.amount}€) représente environ{" "}
              <strong className="text-foreground">
                {((PLAN_PRICES.plus.amount / Math.max(roi.eurosAvg, 1)) * 100).toFixed(0)}%
              </strong>{" "}
              de la valeur que tu récupères — soit{" "}
              <strong className="text-foreground">
                ~{monthsOfPro}× le prix Pro en valeur temps
              </strong>
              .
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
              <Button size="lg" className="group" asChild>
                <ScrollLink section="funnel">
                  Tester sur mon prochain brief
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </ScrollLink>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/pricing?plan=pro">Voir le plan Pro</Link>
              </Button>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
