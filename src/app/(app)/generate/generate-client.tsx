"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { PromptGeneratorForm } from "@/components/generate/prompt-generator-form";
import { PromptResultCard } from "@/components/generate/prompt-result-card";
import type { GeneratePromptFormValues } from "@/lib/validations/prompt";
import type { GeneratePromptResult } from "@/types";
import { TARGET_AIS, type Plan, type TargetAI } from "@/lib/constants";
import { canUseFavorites } from "@/lib/plans";
import { getFunnelDraft } from "@/lib/conversion/funnel-storage";
import { getTemplatePrefill } from "@/lib/conversion/template-prefill";
import { toast } from "sonner";
import { toastUpgradeRequired } from "@/lib/upgrade-toast";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, Sparkles } from "lucide-react";

interface GenerateClientProps {
  plan: Plan;
  usage: {
    allowed: boolean;
    used: number;
    limit: number | null;
    remaining: number | null;
  };
  openaiReady: boolean;
}

export function GenerateClient({ plan, usage, openaiReady }: GenerateClientProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<(GeneratePromptResult & { id?: string }) | null>(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [lastInput, setLastInput] = useState<GeneratePromptFormValues | null>(null);
  const [funnelReady, setFunnelReady] = useState(false);

  const prefillDefaults = useMemo(() => {
    const template = getTemplatePrefill();
    if (template) {
      const ai = (TARGET_AIS as readonly string[]).includes(template.targetAI)
        ? (template.targetAI as TargetAI)
        : "ChatGPT";
      return {
        userIdea: template.userIdea,
        targetAI: ai,
        detailLevel: "Expert" as const,
      } satisfies Partial<GeneratePromptFormValues>;
    }
    const draft = getFunnelDraft();
    if (!draft) return undefined;
    const ai = (TARGET_AIS as readonly string[]).includes(draft.targetAi)
      ? (draft.targetAi as TargetAI)
      : "ChatGPT";
    return {
      userIdea: draft.idea,
      targetAI: ai,
    } satisfies Partial<GeneratePromptFormValues>;
  }, [funnelReady]);

  useEffect(() => {
    const template = getTemplatePrefill();
    if (template) {
      setFunnelReady(true);
      toast.success(`Template « ${template.templateTitle} » chargé — personnalise les [PLACEHOLDER]`, {
        duration: 6000,
      });
      return;
    }
    const draft = getFunnelDraft();
    if (draft) {
      setFunnelReady(true);
      toast.success("Ton idée est prête — lance la génération !", { duration: 5000 });
    }
  }, []);

  async function handleSubmit(data: GeneratePromptFormValues) {
    if (!openaiReady) {
      toast.error("Service temporairement indisponible");
      return;
    }

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
        if (res.status === 401) {
          toast.error("Session expirée — reconnectez-vous");
          window.location.href = "/login?redirect=/generate";
          return;
        }
        if (res.status === 429) {
          toastUpgradeRequired(
            json.message ?? "Limite quotidienne atteinte — passe au Pro pour continuer.",
            "pro"
          );
          return;
        }
        if (res.status === 503) {
          toast.error(json.message ?? "Service indisponible");
          return;
        }
        throw new Error(json.error ?? "Erreur de génération");
      }

      setResult(json);
      setIsFavorite(false);
      toast.success("Prompt généré avec succès !");
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Impossible de générer le prompt"
      );
    } finally {
      setIsLoading(false);
    }
  }

  async function handleRegenerate() {
    if (lastInput) await handleSubmit(lastInput);
  }

  async function toggleFavorite() {
    if (!result?.id) return;

    if (!canUseFavorites(plan)) {
      toastUpgradeRequired("Les favoris sont inclus dans le plan Pro (9€/mois).", "pro");
      return;
    }

    const res = await fetch(`/api/prompts/${result.id}/favorite`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ is_favorite: !isFavorite }),
    });

    if (res.ok) {
      setIsFavorite(!isFavorite);
      toast.success(isFavorite ? "Retiré des favoris" : "Ajouté aux favoris");
      return;
    }

    if (res.status === 403) {
      toastUpgradeRequired("Les favoris sont inclus dans le plan Pro (9€/mois).", "pro");
      return;
    }

    toast.error("Impossible de mettre à jour le favori");
  }

  const atLimit = usage.limit !== null && !usage.allowed;

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-primary" />
            Générateur de prompts
          </h1>
          <p className="text-muted-foreground mt-1">
            Transforme ton idée en prompt expert optimisé pour l&apos;IA choisie.
          </p>
        </div>
        {usage.limit !== null && (
          <Badge variant={atLimit ? "outline" : "default"} className="shrink-0">
            {usage.used}/{usage.limit} prompts aujourd&apos;hui
          </Badge>
        )}
        {usage.limit === null && (
          <Badge variant="pro">Prompts illimités</Badge>
        )}
      </div>

      {!openaiReady && (
        <Card className="border-destructive/30 bg-destructive/5">
          <CardContent className="flex gap-3 py-4">
            <AlertCircle className="h-5 w-5 text-destructive shrink-0" />
            <p className="text-sm">
              Le service de génération n&apos;est pas encore configuré. Réessayez plus tard ou
              contactez le support.
            </p>
          </CardContent>
        </Card>
      )}

      {atLimit && (
        <Card className="border-primary/30 bg-primary/5">
          <CardContent className="py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <p className="text-sm">
              Limite gratuite atteinte pour aujourd&apos;hui. Passez au Pro pour continuer.
            </p>
            <Button size="sm" asChild>
              <Link href="/pricing?plan=pro">Passer au Pro — 9€/mois</Link>
            </Button>
          </CardContent>
        </Card>
      )}

      {!result ? (
        <PromptGeneratorForm
          onSubmit={handleSubmit}
          isLoading={isLoading}
          disabled={atLimit || !openaiReady}
          defaultValues={prefillDefaults}
          plan={plan}
        />
      ) : (
        <PromptResultCard
          result={result}
          plan={plan}
          isFavorite={isFavorite}
          onToggleFavorite={result.id ? toggleFavorite : undefined}
          onRegenerate={handleRegenerate}
          onReset={() => {
            setResult(null);
            setLastInput(null);
            setIsFavorite(false);
          }}
        />
      )}

      {isLoading && (
        <Card>
          <CardContent className="py-8 text-center text-muted-foreground">
            Génération en cours… 10 à 30 secondes en moyenne.
          </CardContent>
        </Card>
      )}

      {plan === "free" && !atLimit && !result && (
        <Card className="border-white/10 bg-white/[0.02]">
          <CardContent className="py-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <p className="text-xs text-muted-foreground">
              Plan Free · {usage.remaining ?? 0} génération(s) restante(s) aujourd&apos;hui
            </p>
            <Button size="sm" variant="outline" asChild>
              <Link href="/pricing?plan=pro">Passer au Pro — 9€/mois</Link>
            </Button>
          </CardContent>
        </Card>
      )}
      {plan === "pro" && (
        <p className="text-center text-xs text-muted-foreground">
          Plan Pro · variante Expert disponible avec{" "}
          <Link href="/pricing?plan=creator" className="text-primary hover:underline">
            Creator (19€/mois)
          </Link>
        </p>
      )}
    </div>
  );
}
