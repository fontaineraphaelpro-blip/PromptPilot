import Link from "next/link";
import { getAuthUser } from "@/lib/auth";
import { getOrCreateProfile } from "@/lib/profile";
import { checkUsageLimit } from "@/lib/usage";
import {
  PLAN_LABELS,
  getPlanBadgeVariant,
  getPlanFeaturesSummary,
  PLAN_PRICES,
} from "@/lib/plans";
import { CREDIT_PACKS } from "@/lib/commerce-products";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Coins } from "lucide-react";
import { BillingActions } from "./billing-actions";

export default async function BillingPage() {
  const user = await getAuthUser();
  if (!user) return null;

  const profile = await getOrCreateProfile(user.id, user.email);
  const usage = await checkUsageLimit(user.id, profile.plan);
  const credits = profile.prompt_credits ?? usage.credits ?? 0;

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <Button variant="ghost" size="sm" asChild>
        <Link href="/settings">
          <ArrowLeft className="h-4 w-4" />
          Paramètres
        </Link>
      </Button>
      <div>
        <h1 className="text-2xl font-bold">Facturation</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Ton plan, tes crédits — tout au même endroit.
        </p>
      </div>

      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            Plan actuel
            <Badge variant={getPlanBadgeVariant(profile.plan)}>
              {PLAN_LABELS[profile.plan]}
            </Badge>
          </CardTitle>
          <CardDescription>{getPlanFeaturesSummary(profile.plan)}</CardDescription>
        </CardHeader>
        <CardContent>
          {profile.stripe_customer_id ? (
            <p className="text-sm text-muted-foreground mb-4">
              Abonnement géré via Stripe. Tu peux changer de carte ou annuler depuis le portail.
            </p>
          ) : (
            <p className="text-sm text-muted-foreground mb-4">
              Pas d&apos;abonnement actif. Starter ({PLAN_PRICES.starter.label}), Pro (
              {PLAN_PRICES.plus.label}) ou un pack de crédits — selon ton rythme.
            </p>
          )}
          <BillingActions hasSubscription={!!profile.stripe_customer_id} />
        </CardContent>
      </Card>

      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Coins className="h-4 w-4" />
            Crédits
          </CardTitle>
          <CardDescription>
            {credits > 0
              ? `${credits} crédit${credits > 1 ? "s" : ""} disponible${credits > 1 ? "s" : ""} — utilisable${credits > 1 ? "s" : ""} dès que ton quota plan est épuisé.`
              : "Aucun crédit pour l’instant. Utile si tu génères ponctuellement."}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid gap-2 sm:grid-cols-3">
            {CREDIT_PACKS.map((pack) => (
              <Button key={pack.id} variant="outline" className="h-auto py-3 flex-col" asChild>
                <Link href={`/pricing#credits`}>
                  <span className="font-medium">{pack.title}</span>
                  <span className="text-xs text-muted-foreground">{pack.label}</span>
                </Link>
              </Button>
            ))}
          </div>
          <Button variant="link" className="h-auto p-0 text-xs" asChild>
            <Link href="/pricing">Voir tous les tarifs</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
