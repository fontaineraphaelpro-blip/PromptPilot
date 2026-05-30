import Link from "next/link";
import { getAuthUser } from "@/lib/auth";
import { getOrCreateProfile } from "@/lib/profile";
import { PLAN_LABELS, getPlanBadgeVariant, getPlanFeaturesSummary } from "@/lib/plans";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { BillingActions } from "./billing-actions";

export default async function BillingPage() {
  const user = await getAuthUser();
  if (!user) return null;

  const profile = await getOrCreateProfile(user.id, user.email);

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <Button variant="ghost" size="sm" asChild>
        <Link href="/settings">
          <ArrowLeft className="h-4 w-4" />
          Paramètres
        </Link>
      </Button>
      <h1 className="text-2xl font-bold">Facturation</h1>

      <Card>
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
              Abonnement géré via Stripe. Modifiez votre carte ou annulez depuis le portail.
            </p>
          ) : (
            <p className="text-sm text-muted-foreground mb-4">
              Aucun abonnement actif. Passez au Pro ou Creator pour débloquer tout le potentiel.
            </p>
          )}
          <BillingActions hasSubscription={!!profile.stripe_customer_id} />
        </CardContent>
      </Card>
    </div>
  );
}
