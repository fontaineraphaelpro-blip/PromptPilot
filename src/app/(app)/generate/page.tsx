"use client";

import { useState } from "react";
import { PromptGeneratorForm } from "@/components/generate/prompt-generator-form";
import { PromptResultCard } from "@/components/generate/prompt-result-card";
import type { GeneratePromptFormValues } from "@/lib/validations/prompt";
import type { GeneratePromptResult } from "@/types";
import { toast } from "sonner";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function GeneratePage() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<(GeneratePromptResult & { id?: string }) | null>(null);
  const [lastInput, setLastInput] = useState<GeneratePromptFormValues | null>(null);

  async function handleSubmit(data: GeneratePromptFormValues) {
    setIsLoading(true);
    setLastInput(data);
    try {
      const res = await fetch("/api/generate-prompt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();

      if (!res.ok) {
        if (res.status === 429) {
          toast.error(json.message ?? "Limite quotidienne atteinte");
          return;
        }
        throw new Error(json.error ?? "Erreur de génération");
      }

      setResult(json);
      toast.success("Prompt généré avec succès !");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Erreur inconnue");
    } finally {
      setIsLoading(false);
    }
  }

  async function handleRegenerate() {
    if (lastInput) await handleSubmit(lastInput);
  }

  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <div>
        <h1 className="text-2xl font-bold">Générateur de prompts</h1>
        <p className="text-muted-foreground mt-1">
          Transforme ton idée en prompt expert optimisé pour l&apos;IA choisie.
        </p>
      </div>

      {!result ? (
        <PromptGeneratorForm onSubmit={handleSubmit} isLoading={isLoading} />
      ) : (
        <PromptResultCard
          result={result}
          onRegenerate={handleRegenerate}
          onReset={() => {
            setResult(null);
            setLastInput(null);
          }}
        />
      )}

      {isLoading && (
        <Card>
          <CardContent className="py-8 text-center text-muted-foreground">
            Génération en cours avec OpenAI… Cela peut prendre 10-30 secondes.
          </CardContent>
        </Card>
      )}

      <p className="text-center text-xs text-muted-foreground">
        Besoin de plus de prompts ?{" "}
        <Link href="/pricing">
          <Button variant="link" className="h-auto p-0 text-xs">
            Passer au Pro
          </Button>
        </Link>
      </p>
    </div>
  );
}
