"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useCopy } from "@/hooks/use-copy";
import {
  Copy,
  Check,
  Star,
  Save,
  RefreshCw,
  Lightbulb,
  Lock,
} from "lucide-react";
import type { GeneratePromptResult } from "@/types";
import type { Plan } from "@/lib/constants";
import { hasAdvancedVariants, canUseFavorites } from "@/lib/plans";
import { toastUpgradeRequired } from "@/lib/upgrade-toast";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface PromptResultCardProps {
  result: GeneratePromptResult & { id?: string };
  plan?: Plan;
  isFavorite?: boolean;
  onSave?: () => Promise<void>;
  onToggleFavorite?: () => Promise<void>;
  onRegenerate?: () => void;
  onReset: () => void;
}

export function PromptResultCard({
  result,
  plan = "free",
  isFavorite = false,
  onSave,
  onToggleFavorite,
  onRegenerate,
  onReset,
}: PromptResultCardProps) {
  const { copy, copied } = useCopy();
  const [activeTab, setActiveTab] = useState("main");
  const [saving, setSaving] = useState(false);

  const expertUnlocked = hasAdvancedVariants(plan);
  const favoritesAllowed = canUseFavorites(plan);

  const variants: Record<string, string> = {
    main: result.generated_prompt,
    short: result.short_variant,
    detailed: result.detailed_variant,
    expert: result.expert_variant,
  };

  async function handleCopy() {
    if (activeTab === "expert" && !expertUnlocked) {
      toastUpgradeRequired(
        "La variante Expert est réservée au plan Creator (19€/mois).",
        "creator"
      );
      return;
    }
    const text = variants[activeTab] ?? result.generated_prompt;
    const ok = await copy(text);
    if (ok) toast.success("Copié !");
    else toast.error("Impossible de copier");
  }

  async function handleSave() {
    if (!onSave) return;
    setSaving(true);
    try {
      await onSave();
      toast.success("Prompt sauvegardé");
    } catch {
      toast.error("Erreur lors de la sauvegarde");
    } finally {
      setSaving(false);
    }
  }

  return (
    <Card className="border-primary/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Check className="h-5 w-5 text-primary" />
          Prompt optimisé
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="flex flex-wrap h-auto gap-1">
            <TabsTrigger value="main">Principal</TabsTrigger>
            <TabsTrigger value="short">Court</TabsTrigger>
            <TabsTrigger value="detailed">Détaillé</TabsTrigger>
            <TabsTrigger value="expert" className="gap-1.5">
              Expert
              {!expertUnlocked && <Lock className="h-3 w-3 opacity-60" />}
            </TabsTrigger>
          </TabsList>
          {Object.entries(variants).map(([key, text]) => {
            const isExpertLocked = key === "expert" && !expertUnlocked;
            return (
              <TabsContent key={key} value={key}>
                <div className="relative">
                  <pre
                    className={cn(
                      "max-h-96 overflow-auto rounded-lg bg-muted p-4 text-sm whitespace-pre-wrap font-mono",
                      isExpertLocked && "blur-[5px] select-none pointer-events-none"
                    )}
                    aria-hidden={isExpertLocked}
                  >
                    {text}
                  </pre>
                  {isExpertLocked && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 rounded-lg bg-gradient-to-b from-black/10 via-black/60 to-black/90 px-4 text-center">
                      <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/10">
                        <Lock className="h-4 w-4" />
                      </span>
                      <p className="text-sm font-medium">Variante Expert</p>
                      <p className="text-xs text-muted-foreground max-w-[260px]">
                        Version avancée pour workflows pro. Disponible avec le plan Creator (19€/mois).
                      </p>
                      <Button size="sm" asChild>
                        <Link href="/pricing?plan=creator">Passer au Creator</Link>
                      </Button>
                    </div>
                  )}
                </div>
              </TabsContent>
            );
          })}
        </Tabs>

        {result.ai_tips && (
          <div className="rounded-lg border border-border bg-muted/50 p-4">
            <p className="flex items-center gap-2 text-sm font-medium mb-2">
              <Lightbulb className="h-4 w-4 text-primary" />
              Conseils pour l&apos;IA
            </p>
            <p className="text-sm text-muted-foreground whitespace-pre-wrap">
              {result.ai_tips}
            </p>
          </div>
        )}

        <div className="flex flex-wrap gap-2">
          <Button onClick={handleCopy} variant="default">
            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            {copied ? "Copié !" : "Copier"}
          </Button>
          {onSave && !result.id && (
            <Button variant="secondary" onClick={handleSave} disabled={saving}>
              <Save className="h-4 w-4" />
              Sauvegarder
            </Button>
          )}
          {result.id && onToggleFavorite && (
            <Button variant="outline" onClick={onToggleFavorite}>
              <Star className={`h-4 w-4 ${isFavorite ? "fill-primary text-primary" : ""}`} />
              {favoritesAllowed
                ? isFavorite
                  ? "Retirer favori"
                  : "Favori"
                : "Ajouter aux favoris"}
            </Button>
          )}
          {onRegenerate && (
            <Button variant="outline" onClick={onRegenerate}>
              <RefreshCw className="h-4 w-4" />
              Nouvelle variante
            </Button>
          )}
          <Button variant="ghost" onClick={onReset}>
            Recommencer
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
