"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Loader2 } from "lucide-react";
import { FadeIn } from "@/components/motion/fade-in";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const plans = [
  {
    id: "free" as const,
    name: "Free",
    price: "0€",
    description: "Pour découvrir PromptPilot",
    features: ["3 prompts gratuits/jour", "30 derniers prompts en historique", "Templates gratuits"],
    cta: "Commencer gratuitement",
    href: "/signup",
    highlighted: false,
  },
  {
    id: "pro" as const,
    name: "Pro",
    price: "9€",
    period: "/mois",
    description: "Pour les créateurs réguliers",
    features: ["Prompts illimités", "Historique complet", "Favoris", "Templates premium"],
    cta: "Passer au Pro",
    href: "/pricing?plan=pro",
    highlighted: true,
  },
  {
    id: "creator" as const,
    name: "Creator",
    price: "19€",
    period: "/mois",
    description: "Pour les power users",
    features: ["Tout Pro inclus", "Variantes expert", "Tous les templates", "Support prioritaire"],
    cta: "Passer au Creator",
    href: "/pricing?plan=creator",
    highlighted: false,
  },
];

interface PricingSectionProps {
  onSelectPlan?: (plan: "pro" | "creator") => void;
  checkoutLoading?: string | null;
}

export function PricingSection({ onSelectPlan, checkoutLoading }: PricingSectionProps) {
  return (
    <section id="pricing" className="relative px-4 py-28 sm:px-6 border-t border-border/60">
      <div className="absolute inset-0 bg-gradient-radial-top opacity-50 pointer-events-none" />
      <div className="relative mx-auto max-w-6xl">
        <FadeIn className="text-center">
          <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground mb-4">
            Pricing
          </p>
          <h2 className="text-3xl font-bold sm:text-5xl tracking-tight">Tarifs simples</h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground text-lg">
            Commence gratuitement. Scale quand tu en as besoin.
          </p>
        </FadeIn>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {plans.map((plan, i) => (
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
                      {"period" in plan && plan.period && (
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
                        onClick={() => onSelectPlan(plan.id)}
                        disabled={!!checkoutLoading}
                      >
                        {checkoutLoading === plan.id && (
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
      </div>
    </section>
  );
}
