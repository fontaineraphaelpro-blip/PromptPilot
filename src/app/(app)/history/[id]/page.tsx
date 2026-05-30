import { notFound } from "next/navigation";
import Link from "next/link";
import { getAuthUser } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { mapPrompt } from "@/lib/mappers";
import { PromptDetailClient } from "@/components/history/prompt-detail-client";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default async function HistoryDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const user = await getAuthUser();
  if (!user) return null;

  const row = await prisma.prompt.findFirst({
    where: { id, userId: user.id },
  });

  if (!row) notFound();

  const prompt = mapPrompt(row);

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <Button variant="ghost" size="sm" asChild>
        <Link href="/history">
          <ArrowLeft className="h-4 w-4" />
          Retour
        </Link>
      </Button>
      <div>
        <h1 className="text-xl font-bold line-clamp-2">{prompt.original_idea}</h1>
        <p className="text-sm text-muted-foreground mt-1">
          {prompt.target_ai} · {prompt.task_type}
        </p>
      </div>
      <PromptDetailClient prompt={prompt} />
    </div>
  );
}
