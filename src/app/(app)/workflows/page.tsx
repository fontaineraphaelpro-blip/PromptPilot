import Link from "next/link";
import { getAuthUser } from "@/lib/auth";
import { getOrCreateProfile } from "@/lib/profile";
import { WORKFLOW_PACKS } from "@/lib/workflows/packs";
import { hasAdvancedVariants } from "@/lib/plans";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Lock } from "lucide-react";
import { WorkflowPackClient } from "./workflow-pack-client";

export default async function WorkflowsPage() {
  const user = await getAuthUser();
  if (!user) return null;

  const profile = await getOrCreateProfile(user.id, user.email);
  const unlocked = hasAdvancedVariants(profile.plan);

  return (
    <div className="mx-auto w-full min-w-0 max-w-4xl space-y-8">
      <div>
        <h1 className="text-2xl font-bold">Workflows Creator</h1>
        <p className="text-muted-foreground mt-1">
          Packs de 5–10 prompts enchaînés par métier — lance un workflow complet en 1 clic.
        </p>
      </div>

      {!unlocked && (
        <Card className="border-primary/30 bg-primary/5 min-w-0 overflow-hidden">
          <CardContent className="py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 min-w-0">
            <p className="text-sm flex items-center gap-2 min-w-0 break-words">
              <Lock className="h-4 w-4" />
              Workflows réservés au plan Creator (19€/mois)
            </p>
            <Button size="sm" asChild>
              <Link href="/pricing?plan=creator">Passer au Creator</Link>
            </Button>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-6">
        {WORKFLOW_PACKS.map((pack) => (
          <Card key={pack.id} className="glass-card min-w-0 overflow-hidden">
            <CardHeader className="min-w-0">
              <div className="flex items-start justify-between gap-2 min-w-0">
                <CardTitle className="min-w-0 break-words pr-2">{pack.title}</CardTitle>
                <Badge variant="outline" className="shrink-0">
                  Creator
                </Badge>
              </div>
              <CardDescription className="break-words">
                {pack.description} · {pack.duration} · {pack.profession}
              </CardDescription>
            </CardHeader>
            <CardContent className="min-w-0">
              <WorkflowPackClient pack={pack} unlocked={unlocked} />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
