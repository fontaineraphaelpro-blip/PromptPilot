import type { TargetAI } from "@/lib/constants";

export interface DailyPrompt {
  date: string;
  title: string;
  idea: string;
  targetAI: TargetAI;
  taskType: string;
  tip: string;
}

const PROMPT_BANK: Omit<DailyPrompt, "date">[] = [
  {
    title: "Email de relance B2B",
    idea: "Rédige un email de relance après démo sans réponse pour un directeur marketing SaaS",
    targetAI: "ChatGPT",
    taskType: "Marketing",
    tip: "Précise le délai depuis la démo et un CTA unique (créneau 20 min).",
  },
  {
    title: "Feature Next.js",
    idea: "Implémente un système de notifications in-app avec badge et dropdown pour une app SaaS",
    targetAI: "Cursor",
    taskType: "Développement",
    tip: "Demande la structure fichiers + composants + API route.",
  },
  {
    title: "Visuel produit e-commerce",
    idea: "Photo produit premium sur fond blanc, éclairage studio, ombre douce, catalog ready",
    targetAI: "Midjourney",
    taskType: "Image",
    tip: "Ajoute le ratio --ar 1:1 et le style raw pour Midjourney.",
  },
  {
    title: "Analyse concurrentielle",
    idea: "Compare 3 concurrents SaaS de générateur de prompts : forces, faiblesses, pricing, différenciation",
    targetAI: "Claude",
    taskType: "Analyse",
    tip: "Demande un tableau synthétique + recommandations actionnables.",
  },
  {
    title: "Script Reels 30s",
    idea: "Script vidéo 30s pour promouvoir un outil IA — hook, démo, preuve sociale, CTA",
    targetAI: "ChatGPT",
    taskType: "Vidéo",
    tip: "Indique le ton (énergique, pro) et la plateforme cible.",
  },
  {
    title: "Landing page copy",
    idea: "Rédige le hero + 3 bénéfices + FAQ pour une app de productivité IA",
    targetAI: "ChatGPT",
    taskType: "Marketing",
    tip: "Structure en sections avec titres H2 clairs.",
  },
  {
    title: "Prompt système Claude",
    idea: "Crée un system prompt pour un assistant juridique qui résume des contrats sans conseil legal",
    targetAI: "Claude",
    taskType: "Business",
    tip: "Inclus les limites et le format de sortie (risques, clauses, questions).",
  },
];

function dateSeed(dateStr: string): number {
  const [y, m, d] = dateStr.split("-").map(Number);
  return y * 372 + m * 31 + d;
}

export function getDailyPrompt(forDate = new Date()): DailyPrompt {
  const date = forDate.toISOString().slice(0, 10);
  const index = dateSeed(date) % PROMPT_BANK.length;
  return { ...PROMPT_BANK[index], date };
}

export function getRecentDailyPrompts(days = 7): DailyPrompt[] {
  const results: DailyPrompt[] = [];
  const today = new Date();
  for (let i = 0; i < days; i++) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    results.push(getDailyPrompt(d));
  }
  return results;
}
