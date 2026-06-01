import { notFound } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/db";
import { mapPrompt } from "@/lib/mappers";
import { PromptScoreDisplay } from "@/components/generate/prompt-score-display";
import { Button } from "@/components/ui/button";
import { buildPageMetadata } from "@/lib/seo/metadata";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  return buildPageMetadata({
    title: "Prompt partagé — PromptExpert",
    description: "Prompt expert partagé via PromptExpert — lecture seule.",
    path: `/p/${(await params).token}`,
  });
}

export default async function SharedPromptPage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;

  const row = await prisma.prompt.findFirst({
    where: { shareToken: token, shareEnabled: true },
  });

  if (!row) notFound();

  const prompt = mapPrompt(row);

  return (
    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6">
      <p className="text-xs uppercase tracking-wider text-muted-foreground mb-4">
        Prompt partagé · PromptExpert
      </p>
      <h1 className="text-xl font-bold line-clamp-3 mb-2">{prompt.original_idea}</h1>
      <p className="text-sm text-muted-foreground mb-6">
        {prompt.target_ai} · {prompt.task_type}
      </p>

      {prompt.prompt_score != null && (
        <div className="mb-6">
          <PromptScoreDisplay
            score={prompt.prompt_score}
            breakdown={prompt.score_breakdown}
            compact
          />
        </div>
      )}

      {prompt.preview_summary && (
        <p className="text-sm text-muted-foreground mb-6 border-l-2 border-primary pl-3">
          {prompt.preview_summary}
        </p>
      )}

      <pre className="rounded-xl bg-muted p-4 text-sm whitespace-pre-wrap font-mono max-h-[480px] overflow-y-auto">
        {prompt.generated_prompt}
      </pre>

      <div className="mt-8 flex flex-wrap gap-3">
        <Button asChild>
          <Link href="/signup">Créer mon prompt expert</Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/">Découvrir PromptExpert</Link>
        </Button>
      </div>
    </div>
  );
}
