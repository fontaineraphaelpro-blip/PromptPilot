import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Check } from "lucide-react";

const plans = [
  {
    name: "Free",
    price: "0€",
    description: "Pour découvrir PromptPilot",
    features: ["3 prompts gratuits/jour", "Historique limité", "Quelques templates gratuits"],
    cta: "Commencer gratuitement",
    href: "/signup",
    highlighted: false,
  },
  {
    name: "Pro",
    price: "9€/mois",
    description: "Pour les créateurs réguliers",
    features: [
      "Prompts illimités",
      "Historique complet",
      "Favoris",
      "Templates premium",
    ],
    cta: "Passer au Pro",
    href: "/pricing?plan=pro",
    highlighted: true,
  },
  {
    name: "Creator",
    price: "19€/mois",
    description: "Pour les power users",
    features: [
      "Tout Pro inclus",
      "Variantes avancées vidéo/image/app",
      "Brand voice",
      "Exports futurs",
    ],
    cta: "Passer au Creator",
    href: "/pricing?plan=creator",
    highlighted: false,
  },
];

export function PricingSection() {
  return (
    <section id="pricing" className="px-4 py-20 sm:px-6 bg-muted/30">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-center text-3xl font-bold">Tarifs simples</h2>
        <p className="mx-auto mt-3 max-w-xl text-center text-muted-foreground">
          Commence gratuitement, upgrade quand tu en as besoin.
        </p>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {plans.map((plan) => (
            <Card
              key={plan.name}
              className={plan.highlighted ? "border-primary shadow-lg ring-1 ring-primary/20" : ""}
            >
              <CardHeader>
                <CardTitle>{plan.name}</CardTitle>
                <CardDescription>{plan.description}</CardDescription>
                <p className="text-3xl font-bold mt-2">{plan.price}</p>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm">
                      <Check className="h-4 w-4 shrink-0 text-primary mt-0.5" />
                      {f}
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button
                  className="w-full"
                  variant={plan.highlighted ? "default" : "outline"}
                  asChild
                >
                  <Link href={plan.href}>{plan.cta}</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
