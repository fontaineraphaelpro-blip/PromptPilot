import Link from "next/link";
import { getAuthUser } from "@/lib/auth";
import { getOrCreateProfile } from "@/lib/profile";
import { PLAN_LABELS, getPlanBadgeVariant, getPlanFeaturesSummary } from "@/lib/plans";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CreditCard, Trash2 } from "lucide-react";

export default async function SettingsPage() {
  const user = await getAuthUser();
  if (!user) return null;

  const profile = await getOrCreateProfile(user.id, user.email);

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <h1 className="text-2xl font-bold">Paramètres</h1>

      <Card>
        <CardHeader>
          <CardTitle>Compte</CardTitle>
          <CardDescription>Informations de votre profil</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <p className="text-sm text-muted-foreground">Email</p>
            <p className="font-medium">{profile.email}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Plan actuel</p>
            <Badge variant={getPlanBadgeVariant(profile.plan)} className="mt-1">
              {PLAN_LABELS[profile.plan]}
            </Badge>
            <p className="text-xs text-muted-foreground mt-2">
              {getPlanFeaturesSummary(profile.plan)}
            </p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Langue préférée</p>
            <p className="font-medium">{profile.preferred_language ?? "Français"}</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Abonnement</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-3">
          <Button asChild variant="outline">
            <Link href="/settings/billing">
              <CreditCard className="h-4 w-4" />
              Gérer la facturation
            </Link>
          </Button>
          {profile.plan === "free" && (
            <Button asChild>
              <Link href="/pricing">Passer au Pro</Link>
            </Button>
          )}
          {profile.plan === "pro" && (
            <Button asChild variant="outline">
              <Link href="/pricing?plan=creator">Passer au Creator</Link>
            </Button>
          )}
        </CardContent>
      </Card>

      <Card className="border-destructive/20">
        <CardHeader>
          <CardTitle className="text-destructive text-base">Zone danger</CardTitle>
          <CardDescription>
            Suppression de compte — fonctionnalité à venir (TODO)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button variant="destructive" size="sm" disabled>
            <Trash2 className="h-4 w-4" />
            Supprimer mon compte
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
