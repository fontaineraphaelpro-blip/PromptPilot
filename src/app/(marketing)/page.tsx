import Link from "next/link";
import { HeroSection } from "@/components/landing/hero-section";
import { HowItWorks } from "@/components/landing/how-it-works";
import { PricingSection } from "@/components/landing/pricing-section";
import { FaqSection } from "@/components/landing/faq-section";
import { TARGET_AIS, TASK_TYPES } from "@/lib/constants";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

export default function HomePage() {
  return (
    <>
      <HeroSection />

      <section className="px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-center text-2xl font-bold">IA compatibles</h2>
          <div className="mt-8 flex flex-wrap justify-center gap-2">
            {TARGET_AIS.map((ai) => (
              <span
                key={ai}
                className="rounded-full border border-border bg-card px-4 py-2 text-sm font-medium shadow-sm"
              >
                {ai}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 bg-muted/30">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-center text-2xl font-bold">Cas d&apos;usage</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {TASK_TYPES.filter((t) => t !== "Autre").map((use) => (
              <Card key={use}>
                <CardContent className="p-4 text-center font-medium">{use}</CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <HowItWorks />

      <section id="examples" className="px-4 py-20 sm:px-6">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-center text-3xl font-bold">Avant / Après</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <Card className="border-destructive/20">
              <CardContent className="p-6">
                <p className="text-xs font-semibold uppercase text-muted-foreground mb-2">Avant</p>
                <p className="text-lg">&quot;Fais-moi une app de fitness&quot;</p>
              </CardContent>
            </Card>
            <Card className="border-primary/30 ring-1 ring-primary/10">
              <CardContent className="p-6">
                <p className="text-xs font-semibold uppercase text-primary mb-2">Après — Cursor</p>
                <p className="text-sm text-muted-foreground line-clamp-6">
                  Crée une application fitness Next.js 14 avec : onboarding utilisateur, dashboard
                  entraînements, suivi calories, authentification mock, design minimal premium,
                  composants réutilisables shadcn/ui. Architecture App Router, TypeScript strict.
                  Procède étape par étape : setup → auth → dashboard → features.
                </p>
              </CardContent>
            </Card>
          </div>
          <p className="mt-6 text-center">
            <Link href="/signup" className="inline-flex items-center gap-1 text-primary font-medium hover:underline">
              Essayer avec ton idée <ArrowRight className="h-4 w-4" />
            </Link>
          </p>
        </div>
      </section>

      <PricingSection />
      <FaqSection />
    </>
  );
}
