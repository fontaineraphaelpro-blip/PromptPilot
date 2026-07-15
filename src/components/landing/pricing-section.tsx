"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Loader2 } from "lucide-react";
import { FadeIn } from "@/components/motion/fade-in";
import { cn } from "@/lib/utils";
import { PRICING_PLANS, PLAN_PRICES, type PaidPlan } from "@/lib/plans";
import { ROI_HEADLINE } from "@/lib/product-value";
import {
  CREDIT_PACKS,
  EXPERT_UNLOCK,
  WORKFLOW_PACK_UNLOCK,
} from "@/lib/commerce-products";
import { GuaranteeBadge } from "@/components/conversion/guarantee-badge";
import { PaymentTrustRow } from "@/components/conversion/payment-trust-row";

interface PricingSectionProps {
  onSelectPlan?: (plan: PaidPlan) => void;
  checkoutLoading?: string | null;
  onSelectCreditPack?: (packId: string) => void;
}

export function PricingSection({
  onSelectPlan,
  checkoutLoading,
  onSelectCreditPack,
}: PricingSectionProps) {
  return (
    <section
      id="pricing"
      className="relative px-4 py-28 sm:px-6 border-t border-border/60 scroll-mt-20 sm:scroll-mt-24"
    >
      <div className="absolute inset-0 bg-gradient-radial-top opacity-50 pointer-events-none" />
      <div className="relative w-full max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-10">
        <FadeIn className="text-center">
          <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground mb-4">
            Tarifs
          </p>
          <h2 className="text-2xl font-bold sm:text-5xl tracking-tight px-2">
            Un rythme clair — Free, Starter, Pro ou Creator
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground text-base sm:text-lg px-2">
            {ROI_HEADLINE} Commence gratuitement, puis choisis ce qui correspond à ton
            usage — sans pression.
          </p>
          <div className="mt-6 flex justify-center">
            <GuaranteeBadge />
          </div>
        </FadeIn>

        <div className="mt-16 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {PRICING_PLANS.map((plan, i) => (
            <FadeIn key={plan.name} delay={i * 0.08}>
              <div className="hover-lift h-full">
                <Card
                  className={cn(
                    "h-full glass-card overflow-hidden",
                    plan.highlighted &&
                      "border-white/25 shadow-[0_0_60px_-15px_rgba(255,255,255,0.35)]"
                  )}
                >
                  {plan.highlighted && (
                    <div className="bg-white text-black text-center text-xs font-semibold py-1.5 tracking-wide">
                      RECOMMANDÉ
                    </div>
                  )}
                  <CardHeader>
                    <CardTitle className="text-2xl">{plan.name}</CardTitle>
                    <CardDescription>{plan.description}</CardDescription>
                    <p className="text-4xl font-bold mt-4 tracking-tight">
                      {plan.price}
                      {plan.period && (
                        <span className="text-base font-normal text-muted-foreground">
                          {plan.period}
                        </span>
                      )}
                    </p>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {plan.features.map((f) => (
                        <li key={f} className="flex items-start gap-3 text-sm">
                          <Check className="h-4 w-4 shrink-0 mt-0.5" />
                          <span className="text-muted-foreground">{f}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter>
                    {plan.id === "free" || !onSelectPlan ? (
                      <Button
                        className="w-full"
                        variant={plan.highlighted ? "default" : "outline"}
                        asChild
                      >
                        <Link href={plan.href}>{plan.cta}</Link>
                      </Button>
                    ) : (
                      <Button
                        className="w-full"
                        variant={plan.highlighted ? "default" : "outline"}
                        onClick={() => onSelectPlan(plan.id as PaidPlan)}
                        disabled={!!checkoutLoading}
                      >
                        {!!checkoutLoading && (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        )}
                        {plan.cta}
                      </Button>
                    )}
                  </CardFooter>
                </Card>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn className="mt-20">
          <div
            id="credits"
            className="scroll-mt-24 rounded-2xl border border-white/10 bg-white/[0.02] px-6 py-10 sm:px-10"
          >
            <div className="text-center max-w-xl mx-auto">
              <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-3">
                Sans abonnement
              </p>
              <h3 className="text-xl sm:text-2xl font-semibold tracking-tight">
                Des crédits quand tu en as besoin
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Pas envie d’un abonnement ? Achète un pack et utilise-le à ton rythme.
              </p>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {CREDIT_PACKS.map((pack) => (
                <div
                  key={pack.id}
                  className={cn(
                    "rounded-xl border border-white/10 px-5 py-5 text-center",
                    pack.highlighted && "border-white/25 bg-white/[0.03]"
                  )}
                >
                  <p className="text-sm font-medium">{pack.title}</p>
                  <p className="mt-2 text-2xl font-semibold tracking-tight">
                    {pack.label}
                  </p>
                  <p className="mt-1.5 text-xs text-muted-foreground">
                    {pack.description}
                  </p>
                  {onSelectCreditPack ? (
                    <Button
                      className="mt-4 w-full"
                      variant="outline"
                      size="sm"
                      onClick={() => onSelectCreditPack(pack.id)}
                      disabled={!!checkoutLoading}
                    >
                      Choisir
                    </Button>
                  ) : (
                    <Button className="mt-4 w-full" variant="outline" size="sm" asChild>
                      <Link href={`/pricing?product=${pack.id}`}>Choisir</Link>
                    </Button>
                  )}
                </div>
              ))}
            </div>

            <p className="mt-8 text-center text-sm text-muted-foreground max-w-lg mx-auto leading-relaxed">
              Variante Expert sur un prompt : {EXPERT_UNLOCK.label} une fois.{" "}
              Packs workflows (SaaS, LinkedIn, Dev) : {WORKFLOW_PACK_UNLOCK.label}{" "}
              — paiement unique. Expert aussi inclus avec Pro à{" "}
              {PLAN_PRICES.plus.label}.
            </p>
          </div>
        </FadeIn>

        <PaymentTrustRow />
      </div>
    </section>
  );
}
