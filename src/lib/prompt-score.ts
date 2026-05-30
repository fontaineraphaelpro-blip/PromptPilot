import { getAICategory, type TargetAI } from "@/lib/constants";
import type { GeneratePromptInput } from "@/types";

export interface PromptScoreBreakdown {
  clarity: number;
  constraints: number;
  outputFormat: number;
  aiAdaptation: number;
}

export interface PromptScoreResult {
  total: number;
  breakdown: PromptScoreBreakdown;
  label: string;
}

const CLARITY_MARKERS = [
  /objectif|rôle|contexte|mission|tâche|but/i,
  /tu es|agis comme|en tant que/i,
  /produis|rédige|crée|génère|analyse/i,
];

const CONSTRAINT_MARKERS = [
  /contrainte|limite|maximum|minimum|ne pas|évite|obligatoire|interdit/i,
  /≤|>=|\d+\s*(mots|lignes|caractères|pages|étapes)/i,
];

const OUTPUT_MARKERS = [
  /format|structure|sortie|livrer|output|json|markdown|tableau|liste/i,
  /sections?|titres?|puces|numérot/i,
];

const AI_MARKERS: Record<string, RegExp[]> = {
  text: [/étapes|raisonnement|questions|ton|public|longueur/i],
  image: [/--ar|style|lumière|composition|couleur|ratio|objectif|mm/i],
  video: [/caméra|mouvement|scène|durée|transition|ciné/i],
  code: [/stack|composant|architecture|typescript|next\.js|fichier|dossier/i],
};

function scoreMarkers(text: string, markers: RegExp[], max: number): number {
  const hits = markers.filter((m) => m.test(text)).length;
  return Math.min(max, Math.round((hits / markers.length) * max) + (text.length > 200 ? 2 : 0));
}

export function computePromptScore(
  prompt: string,
  targetAI: TargetAI,
  input: GeneratePromptInput
): PromptScoreResult {
  const text = prompt.trim();
  const category = getAICategory(targetAI);

  let clarity = scoreMarkers(text, CLARITY_MARKERS, 25);
  if (text.length >= 120) clarity = Math.min(25, clarity + 3);
  if (/^\s*$/.test(text)) clarity = 0;

  let constraints = scoreMarkers(text, CONSTRAINT_MARKERS, 25);
  if (input.includeConstraints) constraints = Math.min(25, constraints + 5);

  let outputFormat = scoreMarkers(text, OUTPUT_MARKERS, 25);
  if (input.includeOutputFormat) outputFormat = Math.min(25, outputFormat + 5);

  let aiAdaptation = scoreMarkers(text, AI_MARKERS[category] ?? [], 20);
  if (new RegExp(targetAI.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i").test(text)) {
    aiAdaptation = Math.min(25, aiAdaptation + 5);
  }
  aiAdaptation = Math.min(25, aiAdaptation);

  const breakdown: PromptScoreBreakdown = {
    clarity,
    constraints,
    outputFormat,
    aiAdaptation,
  };

  const total = Math.min(
    100,
    breakdown.clarity + breakdown.constraints + breakdown.outputFormat + breakdown.aiAdaptation
  );

  const label =
    total >= 85
      ? "Excellent"
      : total >= 70
        ? "Solide"
        : total >= 50
          ? "Correct"
          : "À améliorer";

  return { total, breakdown, label };
}

export function qualifiesForScoreGuarantee(score: number | null | undefined): boolean {
  return typeof score === "number" && score < 70;
}
