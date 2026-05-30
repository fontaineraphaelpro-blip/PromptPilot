"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  generatePromptSchema,
  type GeneratePromptFormValues,
} from "@/lib/validations/prompt";
import {
  LANGUAGES,
  TARGET_AIS,
  TASK_TYPES,
  TONES,
} from "@/lib/constants";
import type { Plan } from "@/lib/constants";
import {
  canUseAdvancedGeneratorOptions,
  canUseExpertDetailLevel,
  getAllowedDetailLevels,
} from "@/lib/generate-plan-guard";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { SelectField } from "@/components/ui/select-field";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Wand2, Loader2, Lock } from "lucide-react";
import { toastUpgradeRequired } from "@/lib/upgrade-toast";

interface PromptGeneratorFormProps {
  onSubmit: (data: GeneratePromptFormValues) => Promise<void>;
  isLoading: boolean;
  disabled?: boolean;
  defaultValues?: Partial<GeneratePromptFormValues>;
  plan?: Plan;
}

function getDefaultDetailLevel(plan: Plan = "free"): GeneratePromptFormValues["detailLevel"] {
  return canUseExpertDetailLevel(plan) ? "Expert" : "Détaillé";
}

const baseFormValues = {
  userIdea: "",
  targetAI: "Cursor" as const,
  taskType: "Développement" as const,
  tone: "Professionnel" as const,
  language: "Français" as const,
  includeConstraints: true,
  includeExamples: false,
  includeOutputFormat: true,
  includeQualityChecklist: false,
  includeErrorsToAvoid: false,
};

export function PromptGeneratorForm({
  onSubmit,
  isLoading,
  disabled = false,
  defaultValues,
  plan = "free",
}: PromptGeneratorFormProps) {
  const advancedAllowed = canUseAdvancedGeneratorOptions(plan);
  const allowedDetailLevels = getAllowedDetailLevels(plan);

  const defaultFormValues: GeneratePromptFormValues = {
    ...baseFormValues,
    detailLevel: getDefaultDetailLevel(plan),
  };

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<GeneratePromptFormValues>({
    resolver: zodResolver(generatePromptSchema),
    defaultValues: { ...defaultFormValues, ...defaultValues },
  });

  const values = watch();

  function fillExample() {
    setValue(
      "userIdea",
      "Je veux créer une app pour aider les freelances à gérer leurs clients"
    );
    setValue("targetAI", "Cursor");
    setValue("taskType", "Développement");
    setValue("detailLevel", getDefaultDetailLevel(plan));
  }

  function handleDetailLevelChange(value: string) {
    if (value === "Expert" && !canUseExpertDetailLevel(plan)) {
      toastUpgradeRequired(
        "Le niveau Expert est réservé au plan Creator (19€/mois).",
        "creator"
      );
      return;
    }
    setValue("detailLevel", value as GeneratePromptFormValues["detailLevel"]);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Nouveau prompt</CardTitle>
          <Button type="button" variant="ghost" size="sm" onClick={fillExample}>
            Exemple
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="userIdea">Décris ce que tu veux faire</Label>
            <Textarea
              id="userIdea"
              placeholder="Ex : Je veux créer une landing page pour une application de fitness IA"
              {...register("userIdea")}
            />
            {errors.userIdea && (
              <p className="text-sm text-destructive">{errors.userIdea.message}</p>
            )}
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <SelectField
              label="IA cible"
              id="targetAI"
              value={values.targetAI}
              onChange={(v) => setValue("targetAI", v as GeneratePromptFormValues["targetAI"])}
              options={TARGET_AIS}
            />
            <SelectField
              label="Type de tâche"
              id="taskType"
              value={values.taskType}
              onChange={(v) => setValue("taskType", v as GeneratePromptFormValues["taskType"])}
              options={TASK_TYPES}
            />
            <div className="space-y-1.5">
              <SelectField
                label="Niveau de détail"
                id="detailLevel"
                value={values.detailLevel}
                onChange={handleDetailLevelChange}
                options={[...allowedDetailLevels]}
              />
              {!canUseExpertDetailLevel(plan) && (
                <p className="text-[11px] text-muted-foreground flex items-center gap-1">
                  <Lock className="h-3 w-3" />
                  Niveau Expert — plan Creator
                </p>
              )}
            </div>
            <SelectField
              label="Ton / style"
              id="tone"
              value={values.tone}
              onChange={(v) => setValue("tone", v as GeneratePromptFormValues["tone"])}
              options={TONES}
            />
            <SelectField
              label="Langue du prompt"
              id="language"
              value={values.language}
              onChange={(v) => setValue("language", v as GeneratePromptFormValues["language"])}
              options={LANGUAGES}
            />
          </div>
        </CardContent>
      </Card>

      <Card className={!advancedAllowed ? "border-white/15" : undefined}>
        <CardHeader>
          <div className="flex items-center justify-between gap-2">
            <CardTitle className="text-base">Options avancées</CardTitle>
            {!advancedAllowed && <Badge variant="outline">Pro</Badge>}
          </div>
          {!advancedAllowed && (
            <CardDescription>
              Exemples, checklist qualité et erreurs à éviter — inclus dans le plan Pro.
            </CardDescription>
          )}
        </CardHeader>
        <CardContent className="relative">
          <div
            className={
              !advancedAllowed
                ? "grid gap-3 sm:grid-cols-2 opacity-50 pointer-events-none select-none"
                : "grid gap-3 sm:grid-cols-2"
            }
          >
            {(
              [
                ["includeConstraints", "Inclure des contraintes"],
                ["includeExamples", "Inclure des exemples"],
                ["includeOutputFormat", "Inclure un format de sortie"],
                ["includeQualityChecklist", "Inclure une checklist qualité"],
                ["includeErrorsToAvoid", "Inclure les erreurs à éviter"],
              ] as const
            ).map(([key, label]) => (
              <label key={key} className="flex items-center gap-2 text-sm cursor-pointer">
                <Checkbox
                  checked={values[key]}
                  onCheckedChange={(c) => setValue(key, c === true)}
                  disabled={!advancedAllowed}
                />
                {label}
              </label>
            ))}
          </div>
          {!advancedAllowed && (
            <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 rounded-lg border border-white/10 bg-black/40 p-4">
              <p className="text-sm text-muted-foreground">
                Débloque toutes les options avancées avec le plan Pro.
              </p>
              <Button size="sm" variant="outline" asChild>
                <Link href="/pricing?plan=pro">Passer au Pro — 9€/mois</Link>
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      <Button type="submit" size="lg" className="w-full sm:w-auto" disabled={isLoading || disabled}>
        {isLoading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Génération en cours…
          </>
        ) : (
          <>
            <Wand2 className="h-4 w-4" />
            Générer le prompt
          </>
        )}
      </Button>
    </form>
  );
}
