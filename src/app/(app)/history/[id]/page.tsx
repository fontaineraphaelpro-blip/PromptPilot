import { notFound } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { PromptDetailClient } from "@/components/history/prompt-detail-client";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import type { PromptRecord } from "@/types";

export default async function HistoryDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  const { data: prompt } = await supabase
    .from("prompts")
    .select("*")
    .eq("id", id)
    .eq("user_id", user.id)
    .maybeSingle();

  if (!prompt) notFound();

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <Button variant="ghost" size="sm" asChild>
        <Link href="/history">
          <ArrowLeft className="h-4 w-4" />
          Retour
        </Link>
      </Button>
      <div>
        <h1 className="text-xl font-bold line-clamp-2">
          {(prompt as PromptRecord).original_idea}
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          {(prompt as PromptRecord).target_ai} · {(prompt as PromptRecord).task_type}
        </p>
      </div>
      <PromptDetailClient prompt={prompt as PromptRecord} />
    </div>
  );
}
