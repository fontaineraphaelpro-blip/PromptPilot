"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  generatePromptSchema,
  type GeneratePromptFormValues,
} from "@/lib/validations/prompt";
import {
  DETAIL_LEVELS,
  LANGUAGES,
  TARGET_AIS,
  TASK_TYPES,
  TONES,
} from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { SelectField } from "@/components/ui/select-field";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Wand2, Loader2 } from "lucide-react";

interface PromptGeneratorFormProps {
  onSubmit: (data: GeneratePromptFormValues) => Promise<void>;
  isLoading: boolean;
  disabled?: boolean;
  defaultValues?: Partial<GeneratePromptFormValues>;
}

const defaultFormValues: GeneratePromptFormValues = {
  userIdea: "",
  targetAI: "Cursor",
  taskType: "Développement",
  detailLevel: "Expert",
  tone: "Professionnel",
  language: "Français",
  includeConstraints: true,
  includeExamples: false,
  includeOutputFormat: true,
  includeQualityChecklist: true,
  includeErrorsToAvoid: true,
};

export function PromptGeneratorForm({
  onSubmit,
  isLoading,
  disabled = false,
  defaultValues,
}: PromptGeneratorFormProps) {
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
    setValue("detailLevel", "Expert");
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
            <SelectField
              label="Niveau de détail"
              id="detailLevel"
              value={values.detailLevel}
              onChange={(v) => setValue("detailLevel", v as GeneratePromptFormValues["detailLevel"])}
              options={DETAIL_LEVELS}
            />
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

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Options avancées</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-3 sm:grid-cols-2">
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
              />
              {label}
            </label>
          ))}
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
