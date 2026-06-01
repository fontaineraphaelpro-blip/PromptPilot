"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Loader2 } from "lucide-react";
import { FadeIn } from "@/components/motion/fade-in";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { PRICING_PLANS } from "@/lib/plans";
import { ROI_HEADLINE } from "@/lib/product-value";
import { PlanComparisonTable } from "@/components/landing/plan-comparison-table";
import { GuaranteeBadge } from "@/components/conversion/guarantee-badge";
import { PaymentTrustRow } from "@/components/conversion/payment-trust-row";

interface PricingSectionProps {
  onSelectPlan?: (plan: "pro" | "creator") => void;
  checkoutLoading?: string | null;
}

export function PricingSection({ onSelectPlan, checkoutLoading }: PricingSectionProps) {
  return (
    <section id="pricing" className="relative px-4 py-28 sm:px-6 border-t border-border/60 scroll-mt-20 sm:scroll-mt-24">
      <div className="absolute inset-0 bg-gradient-radial-top opacity-50 pointer-events-none" />
      <div className="relative w-full max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-10">
        <FadeIn className="text-center">
          <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground mb-4">
            Pricing
          </p>
          <h2 className="text-2xl font-bold sm:text-5xl tracking-tight px-2">
            Commence en free, upgrade quand tu veux
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground text-base sm:text-lg px-2">
            {ROI_HEADLINE} Teste d&apos;abord gratuitement — le Pro se débloque depuis ton
            dashboard.
          </p>
          <div className="mt-6 flex justify-center">
            <GuaranteeBadge />
          </div>
        </FadeIn>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {PRICING_PLANS.map((plan, i) => (
            <FadeIn key={plan.name} delay={i * 0.1}>
              <motion.div
                whileHover={{ y: -6 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
              >
                <Card
                  className={cn(
                    "h-full glass-card overflow-hidden",
                    plan.highlighted &&
                      "border-white/25 shadow-[0_0_60px_-15px_rgba(255,255,255,0.35)]"
                  )}
                >
                  {plan.highlighted && (
                    <div className="bg-white text-black text-center text-xs font-semibold py-1.5 tracking-wide">
                      POPULAIRE
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
                        onClick={() => onSelectPlan(plan.id as "pro" | "creator")}
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
              </motion.div>
            </FadeIn>
          ))}
        </div>

        <PlanComparisonTable onSelectPlan={onSelectPlan} />
        <PaymentTrustRow />
      </div>
    </section>
  );
}
