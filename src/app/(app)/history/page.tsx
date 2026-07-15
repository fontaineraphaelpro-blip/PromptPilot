import Link from "next/link";
import { getAuthUser } from "@/lib/auth";
import { getOrCreateProfile } from "@/lib/profile";
import { prisma } from "@/lib/db";
import { mapPrompt } from "@/lib/mappers";
import { PromptList } from "@/components/history/prompt-list";
import { ExcellencePromptsBanner } from "@/components/history/excellence-prompts-banner";
import { EmptyState } from "@/components/shared/empty-state";
import { History } from "lucide-react";
import { FREE_HISTORY_LIMIT } from "@/lib/constants";
import { hasFullHistory, PLAN_PRICES } from "@/lib/plans";
import { Button } from "@/components/ui/button";

export default async function HistoryPage() {
  const user = await getAuthUser();
  if (!user) return null;

  const profile = await getOrCreateProfile(user.id, user.email);
  const fullHistory = hasFullHistory(profile.plan);

  const rows = await prisma.prompt.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: "desc" },
    ...(fullHistory ? {} : { take: FREE_HISTORY_LIMIT }),
  });

  const totalCount = await prisma.prompt.count({
    where: { userId: user.id },
  });

  const prompts = rows.map(mapPrompt);
  const truncated = !fullHistory && totalCount > FREE_HISTORY_LIMIT;

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Historique</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Tous tes briefs générés — retrouve, copie, marque en favori.
        </p>
      </div>
      {truncated && (
        <p className="text-sm text-muted-foreground rounded-lg border border-border bg-muted/30 p-4">
          Affichage des {FREE_HISTORY_LIMIT} briefs les plus récents sur {totalCount} au total.{" "}
          <Button variant="link" className="h-auto p-0 text-sm" asChild>
            <Link href="/pricing?plan=pro">Pro ({PLAN_PRICES.plus.label})</Link>
          </Button>{" "}
          débloque l&apos;historique complet.
        </p>
      )}
      {prompts.length > 0 ? (
        <>
          <ExcellencePromptsBanner prompts={prompts} />
          <PromptList prompts={prompts} plan={profile.plan} />
        </>
      ) : (
        <EmptyState
          icon={History}
          title="Aucun brief pour l’instant"
          description="Génère ton premier prompt expert — il apparaîtra ici automatiquement."
          actionLabel="Créer un brief"
          actionHref="/generate"
        />
      )}
    </div>
  );
}
