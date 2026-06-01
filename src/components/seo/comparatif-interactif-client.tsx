"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { computePromptScore } from "@/lib/prompt-score";
import { PromptScoreDisplay } from "@/components/generate/prompt-score-display";
import { ArrowRight } from "lucide-react";

const SAMPLE_EXPERT = `Rôle : copywriter B2B SaaS senior.
Contexte : relance après démo sans réponse, prospect = directeur marketing.
Objectif : email ≤120 mots, ton courtois, CTA créneau 20 min.
Contraintes : pas de jargon, 1 CTA clair, objet + préheader inclus.
Format : Objet / Préheader / Corps / PS optionnel. Langue : français.`;

export function ComparatifInteractifClient() {
  const [manual, setManual] = useState("Écris-moi un email de relance pour mon SaaS");
  const [expert, setExpert] = useState(SAMPLE_EXPERT);

  const manualScore = useMemo(
    () =>
      computePromptScore(manual, "ChatGPT", {
        userIdea: manual,
        targetAI: "ChatGPT",
        taskType: "Marketing",
        detailLevel: "Rapide",
        tone: "Professionnel",
        language: "Français",
        includeConstraints: false,
        includeExamples: false,
        includeOutputFormat: false,
        includeQualityChecklist: false,
        includeErrorsToAvoid: false,
      }),
    [manual]
  );

  const expertScore = useMemo(
    () =>
      computePromptScore(expert, "ChatGPT", {
        userIdea: expert,
        targetAI: "ChatGPT",
        taskType: "Marketing",
        detailLevel: "Expert",
        tone: "Professionnel",
        language: "Français",
        includeConstraints: true,
        includeExamples: false,
        includeOutputFormat: true,
        includeQualityChecklist: true,
        includeErrorsToAvoid: true,
      }),
    [expert]
  );

  const diff = expertScore.total - manualScore.total;

  return (
    <div className="space-y-8">
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-3">
          <p className="text-sm font-medium text-muted-foreground">Ton prompt manuel</p>
          <Textarea
            value={manual}
            onChange={(e) => setManual(e.target.value)}
            rows={8}
            className="font-mono text-sm"
          />
          <PromptScoreDisplay score={manualScore.total} breakdown={manualScore.breakdown} compact />
        </div>
        <div className="space-y-3">
          <p className="text-sm font-medium">Prompt structuré PromptExpert</p>
          <Textarea
            value={expert}
            onChange={(e) => setExpert(e.target.value)}
            rows={8}
            className="font-mono text-sm"
          />
          <PromptScoreDisplay score={expertScore.total} breakdown={expertScore.breakdown} compact />
        </div>
      </div>

      <div className="rounded-xl border border-primary/30 bg-primary/5 p-6 text-center">
        <p className="text-2xl font-bold">
          +{Math.max(diff, 0)} points
        </p>
        <p className="text-sm text-muted-foreground mt-1">
          de qualité mesurable avec un prompt structuré pour la même tâche
        </p>
        <Button className="mt-4" asChild>
          <Link href="/signup">
            Générer mon prompt expert
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>
    </div>
  );
}
