"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { PromptGeneratorForm } from "@/components/generate/prompt-generator-form";
import { PromptResultCard } from "@/components/generate/prompt-result-card";
import type { GeneratePromptFormValues } from "@/lib/validations/prompt";
import type { GeneratePromptResult } from "@/types";
import { TARGET_AIS, type Plan, type TargetAI } from "@/lib/constants";
import { canUseFavorites, PLAN_PRICES } from "@/lib/plans";
import { canUseExpertDetailLevel } from "@/lib/generate-plan-guard";
import { getFunnelDraft } from "@/lib/conversion/funnel-storage";
import { getTemplatePrefill } from "@/lib/conversion/template-prefill";
import { getAdaptPrefill } from "@/lib/conversion/adapt-prefill";
import { toast } from "sonner";
import { toastUpgradeRequired } from "@/lib/upgrade-toast";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, Sparkles } from "lucide-react";
import { UpgradeValuePanel } from "@/components/conversion/upgrade-value-panel";

interface GenerateClientProps {
  plan: Plan;
  usage: {
    allowed: boolean;
    used: number;
    limit: number | null;
    remaining: number | null;
    period?: "lifetime" | "monthly" | null;
    credits?: number;
  };
  openaiReady: boolean;
}

export function GenerateClient({ plan, usage, openaiReady }: GenerateClientProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<
    (GeneratePromptResult & { id?: string; guarantee_regen_available?: boolean }) | null
  >(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [lastInput, setLastInput] = useState<GeneratePromptFormValues | null>(null);
  const [funnelReady, setFunnelReady] = useState(false);

  const prefillDefaults = useMemo(() => {
    const adapt = getAdaptPrefill();
    if (adapt) {
      const ai = (TARGET_AIS as readonly string[]).includes(adapt.targetAI)
        ? (adapt.targetAI as TargetAI)
        : "ChatGPT";
      return {
        userIdea: adapt.userIdea,
        targetAI: ai,
      } satisfies Partial<GeneratePromptFormValues>;
    }
    const template = getTemplatePrefill();
    if (template) {
      const ai = (TARGET_AIS as readonly string[]).includes(template.targetAI)
        ? (template.targetAI as TargetAI)
        : "ChatGPT";
      return {
        userIdea: template.userIdea,
        targetAI: ai,
        ...(canUseExpertDetailLevel(plan) ? { detailLevel: "Expert" as const } : {}),
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
  }, [funnelReady, plan]);

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

  async function handleSubmit(
    data: GeneratePromptFormValues,
    opts?: { guaranteeRegen?: boolean; parentPromptId?: string }
  ) {
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
        body: JSON.stringify({
          ...data,
          guaranteeRegen: opts?.guaranteeRegen,
          parentPromptId: opts?.parentPromptId,
        }),
      });
      const json = await res.json();

      if (!res.ok) {
        if (res.status === 401) {
          toast.error("Session expirée — reconnecte-toi");
          window.location.href = "/login?redirect=/generate";
          return;
        }
        if (res.status === 429) {
          toastUpgradeRequired(
            json.message ?? "Quota atteint — un pack de crédits ou Pro peut t’aider.",
            "plus"
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

  async function handleGuaranteeRegen() {
    if (!lastInput || !result?.id) return;
    await handleSubmit(lastInput, {
      guaranteeRegen: true,
      parentPromptId: result.id,
    });
    toast.success("Regénération gratuite (garantie score < 70)");
  }

  async function toggleFavorite() {
    if (!result?.id) return;

    if (!canUseFavorites(plan)) {
      toastUpgradeRequired(
        `Les favoris sont inclus dans Pro (${PLAN_PRICES.plus.label}).`,
        "plus"
      );
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
      toastUpgradeRequired(
        `Les favoris sont inclus dans Pro (${PLAN_PRICES.plus.label}).`,
        "plus"
      );
      return;
    }

    toast.error("Impossible de mettre à jour le favori");
  }

  const credits = usage.credits ?? 0;
  const atLimit = !usage.allowed && credits === 0;
  const canGenerate = usage.allowed || credits > 0;

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-primary" />
            Nouveau brief
          </h1>
          <p className="text-muted-foreground mt-1">
            Une idée, une IA — un brief scoré prêt à coller.
          </p>
        </div>
        <div className="flex flex-wrap gap-2 shrink-0">
          {usage.limit !== null && (
            <Badge variant={atLimit && credits === 0 ? "outline" : "default"}>
              {usage.used}/{usage.limit}{" "}
              {usage.period === "lifetime"
                ? "offerts"
                : usage.period === "monthly"
                  ? "ce mois"
                  : "briefs"}
            </Badge>
          )}
          {credits > 0 && (
            <Badge variant="outline" className="border-emerald-500/30 text-emerald-100">
              {credits} crédit{credits > 1 ? "s" : ""}
            </Badge>
          )}
          {usage.limit === null && (
            <Badge variant="pro">Illimité</Badge>
          )}
        </div>
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
              {plan === "free"
                ? `Tes essais offerts sont terminés. Pro (${PLAN_PRICES.plus.label}) — Expert + workflows, prêt en 1 clic.`
                : plan === "starter"
                  ? `Quota Starter atteint. Passe Pro (${PLAN_PRICES.plus.label}) pour Expert + workflows, ou un pack de crédits.`
                  : `Quota mensuel atteint. Un pack de crédits pour prolonger sans changer de plan.`}
            </p>
            <div className="flex flex-col sm:flex-row gap-2 shrink-0">
              <Button size="sm" asChild>
                <Link
                  href={plan === "plus" ? "/pricing#credits" : "/pricing?plan=pro"}
                >
                  {plan === "plus"
                    ? "Pack crédits"
                    : `Passer Pro — ${PLAN_PRICES.plus.label}`}
                </Link>
              </Button>
              {plan !== "plus" && (
                <Button size="sm" variant="outline" asChild>
                  <Link href="/pricing#credits">Pack crédits</Link>
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {!result ? (
        <PromptGeneratorForm
          onSubmit={handleSubmit}
          isLoading={isLoading}
          disabled={!canGenerate || !openaiReady}
          defaultValues={prefillDefaults}
          plan={plan}
        />
      ) : (
        <>
          <PromptResultCard
            result={{
              ...result,
              original_idea: lastInput?.userIdea,
              target_ai: lastInput?.targetAI,
            }}
            plan={plan}
            isFavorite={isFavorite}
            onToggleFavorite={result.id ? toggleFavorite : undefined}
            onRegenerate={handleRegenerate}
            onGuaranteeRegen={
              result.guarantee_regen_available ? handleGuaranteeRegen : undefined
            }
            onReset={() => {
              setResult(null);
              setLastInput(null);
              setIsFavorite(false);
            }}
          />
          {(plan === "free" || plan === "starter") &&
            (result.prompt_score ?? 0) >= 70 && (
              <UpgradeValuePanel
                plan={plan}
                promptScore={result.prompt_score ?? undefined}
              />
            )}
        </>
      )}

      {plan === "free" && !atLimit && !result && (
        <Card className="border-white/10 bg-white/[0.02]">
          <CardContent className="py-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <p className="text-xs text-muted-foreground">
              {credits > 0
                ? `Tu génères aussi avec tes crédits · ${credits} restant${credits > 1 ? "s" : ""}`
                : (usage.remaining ?? 0) <= 2
                  ? `Plus que ${usage.remaining ?? 0} brief${(usage.remaining ?? 0) !== 1 ? "s" : ""} — Pro avant de bloquer`
                  : `Free · ${usage.remaining ?? 0} brief${(usage.remaining ?? 0) !== 1 ? "s" : ""} offert${(usage.remaining ?? 0) !== 1 ? "s" : ""}`}
            </p>
            <Button size="sm" asChild>
              <Link href="/pricing?plan=pro">
                Pro — {PLAN_PRICES.plus.label}
              </Link>
            </Button>
          </CardContent>
        </Card>
      )}
      {plan === "starter" && !result && (
        <p className="text-center text-xs text-muted-foreground">
          Starter · Expert à l&apos;unité, ou inclus avec{" "}
          <Link href="/pricing?plan=pro" className="text-primary hover:underline">
            Pro ({PLAN_PRICES.plus.label})
          </Link>
        </p>
      )}
      {plan === "plus" && !result && (
        <p className="text-center text-xs text-muted-foreground">
          Pro · Expert + workflows inclus ·{" "}
          <Link href="/workflows" className="text-primary hover:underline">
            Voir les workflows
          </Link>
        </p>
      )}
    </div>
  );
}
