import { Suspense } from "react";
import Link from "next/link";
import { getAuthUser } from "@/lib/auth";
import { CheckoutSuccessBanner } from "@/components/dashboard/checkout-success-banner";
import { getOrCreateProfile } from "@/lib/profile";
import { checkUsageLimit } from "@/lib/usage";
import {
  hasUnlimitedPrompts,
  PLAN_LABELS,
  getPlanBadgeVariant,
  hasAdvancedVariants,
  PLAN_PRICES,
} from "@/lib/plans";
import { OnboardingBanner } from "@/components/onboarding/onboarding-banner";
import { FreePlanUpgradeBanner } from "@/components/dashboard/free-plan-upgrade-banner";
import { prisma } from "@/lib/db";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { EmptyState } from "@/components/shared/empty-state";
import { Wand2, History, Star, ArrowRight, Coins } from "lucide-react";

export default async function DashboardPage() {
  const user = await getAuthUser();
  if (!user) return null;

  const profile = await getOrCreateProfile(user.id, user.email ?? "");
  const usage = await checkUsageLimit(user.id, profile.plan);
  const unlimited = hasUnlimitedPrompts(profile.plan);

  const recentRows = await prisma.prompt.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: "desc" },
    take: 5,
    select: {
      id: true,
      originalIdea: true,
      targetAi: true,
      createdAt: true,
    },
  });

  const firstName =
    user.email?.split("@")[0]?.split(".")[0]?.replace(/^\w/, (c) => c.toUpperCase()) ??
    "toi";

  const hasGenerated = recentRows.length > 0;

  return (
    <div className="mx-auto max-w-4xl space-y-8">
      <Suspense fallback={null}>
        <CheckoutSuccessBanner />
      </Suspense>
      <OnboardingBanner />
      {profile.plan === "free" && hasGenerated && (
        <FreePlanUpgradeBanner remaining={usage.remaining} />
      )}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold sm:text-3xl">Bonjour {firstName}</h1>
          <p className="mt-1 text-muted-foreground">
            {hasGenerated
              ? "Prêt pour ton prochain brief expert ?"
              : "Crée ton premier brief — 30 secondes, prêt à coller."}
          </p>
        </div>
        <Button asChild size="lg" className="w-full sm:w-auto shrink-0">
          <Link href="/generate">
            <Wand2 className="h-4 w-4" />
            Nouveau brief
          </Link>
        </Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <Card className="glass-card">
          <CardHeader className="pb-2">
            <CardDescription>Ton plan</CardDescription>
            <CardTitle className="flex items-center gap-2">
              <Badge variant={getPlanBadgeVariant(profile.plan)}>
                {PLAN_LABELS[profile.plan]}
              </Badge>
            </CardTitle>
          </CardHeader>
          {profile.plan === "free" && (
            <CardContent className="pt-0">
              <Button variant="outline" asChild>
                <Link href="/pricing?plan=pro">Voir les options</Link>
              </Button>
            </CardContent>
          )}
        </Card>

        <Card className="glass-card">
          <CardHeader className="pb-2">
            <CardDescription>
              {usage.period === "lifetime"
                ? "Essais gratuits"
                : usage.period === "monthly"
                  ? "Briefs ce mois"
                  : "Usage"}
            </CardDescription>
            <CardTitle>
              {unlimited ? (
                <span>Illimité</span>
              ) : usage.limit !== null ? (
                <span className="tabular-nums">
                  {usage.used} / {usage.limit}
                </span>
              ) : (
                <span className="tabular-nums">{usage.used}</span>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0 space-y-1">
            {!unlimited && usage.limit !== null && (
              <p className="text-xs text-muted-foreground">
                {usage.remaining ?? 0} restant
                {(usage.remaining ?? 0) > 1 ? "s" : ""}
                {usage.period === "monthly" ? " ce mois" : ""}
              </p>
            )}
            {usage.credits > 0 && (
              <p className="text-xs text-emerald-200/90 inline-flex items-center gap-1">
                <Coins className="h-3 w-3" />
                {usage.credits} crédit{usage.credits > 1 ? "s" : ""} pack
              </p>
            )}
          </CardContent>
        </Card>

        <Card className="glass-card border-white/20 bg-white/[0.04]">
          <CardHeader className="pb-2">
            <CardDescription>Raccourci</CardDescription>
          </CardHeader>
          <CardContent className="pt-0 space-y-2">
            <Button asChild className="w-full" variant="default">
              <Link href="/generate">
                <Wand2 className="h-4 w-4" />
                Générer
              </Link>
            </Button>
            <Button asChild className="w-full" variant="ghost" size="sm">
              <Link href="/history">Voir l&apos;historique</Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      {(profile.plan === "free" || profile.plan === "starter") &&
        !hasAdvancedVariants(profile.plan) &&
        hasGenerated && (
          <Card className="border-white/10 bg-white/[0.02]">
            <CardContent className="py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <p className="text-sm text-muted-foreground">
                La variante <strong className="text-foreground">Expert</strong> est incluse avec
                Pro ({PLAN_PRICES.plus.label}) — ou déblocable à l&apos;unité sur un brief.
              </p>
              <Button size="sm" variant="outline" asChild>
                <Link href="/pricing?plan=pro">Découvrir Pro</Link>
              </Button>
            </CardContent>
          </Card>
        )}

      <div className="grid gap-4 sm:grid-cols-2">
        <Link href="/history">
          <Card className="hover-lift cursor-pointer h-full glass-card">
            <CardContent className="flex items-center gap-4 p-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5">
                <History className="h-5 w-5" />
              </div>
              <div>
                <p className="font-semibold">Historique</p>
                <p className="text-sm text-muted-foreground">Tous tes briefs</p>
              </div>
              <ArrowRight className="h-4 w-4 ml-auto text-muted-foreground" />
            </CardContent>
          </Card>
        </Link>
        <Link href="/favorites">
          <Card className="hover-lift cursor-pointer h-full glass-card">
            <CardContent className="flex items-center gap-4 p-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5">
                <Star className="h-5 w-5" />
              </div>
              <div>
                <p className="font-semibold">Favoris</p>
                <p className="text-sm text-muted-foreground">Tes meilleurs prompts</p>
              </div>
              <ArrowRight className="h-4 w-4 ml-auto text-muted-foreground" />
            </CardContent>
          </Card>
        </Link>
      </div>

      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-lg">Récents</h2>
          {hasGenerated && (
            <Button variant="ghost" size="sm" asChild>
              <Link href="/history">Tout voir</Link>
            </Button>
          )}
        </div>
        {hasGenerated ? (
          <ul className="space-y-2">
            {recentRows.map((p) => (
              <li key={p.id}>
                <Link
                  href={`/history/${p.id}`}
                  className="block rounded-xl border border-border/80 bg-card/50 p-4 hover:bg-muted/40 transition-colors"
                >
                  <p className="font-medium line-clamp-1">{p.originalIdea}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {p.targetAi} · {p.createdAt.toLocaleDateString("fr-FR")}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <EmptyState
            icon={Wand2}
            title="Ton espace est prêt"
            description="Décris une idée, choisis ton IA, reçois un brief scoré prêt à coller."
            actionLabel="Générer mon premier brief"
            actionHref="/generate"
          />
        )}
      </div>
    </div>
  );
}
