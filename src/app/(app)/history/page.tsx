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
import { hasUnlimitedPrompts } from "@/lib/plans";
import { Button } from "@/components/ui/button";

export default async function HistoryPage() {
  const user = await getAuthUser();
  if (!user) return null;

  const profile = await getOrCreateProfile(user.id, user.email);
  const unlimited = hasUnlimitedPrompts(profile.plan);

  const rows = await prisma.prompt.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: "desc" },
    ...(unlimited ? {} : { take: FREE_HISTORY_LIMIT }),
  });

  const totalCount = await prisma.prompt.count({
    where: { userId: user.id },
  });

  const prompts = rows.map(mapPrompt);
  const truncated = !unlimited && totalCount > FREE_HISTORY_LIMIT;

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <h1 className="text-2xl font-bold">Historique</h1>
      {truncated && (
        <p className="text-sm text-muted-foreground rounded-lg border border-border bg-muted/30 p-4">
          Plan Free : affichage des {FREE_HISTORY_LIMIT} prompts les plus récents sur {totalCount}{" "}
          au total.{" "}
          <Button variant="link" className="h-auto p-0 text-sm" asChild>
            <Link href="/pricing?plan=pro">Passer au Pro</Link>
          </Button>{" "}
          pour l&apos;historique complet.
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
          title="Aucun prompt"
          description="Générez votre premier prompt pour le retrouver ici."
          actionLabel="Créer un prompt"
          actionHref="/generate"
        />
      )}
    </div>
  );
}
