import { FREE_LIFETIME_LIMIT } from "@/lib/constants";
import { PLAN_PRICES } from "@/lib/plans";

/** Minutes moyennes gagnées par brief expert (fourchette basse / haute) */
export const MINUTES_SAVED_LOW = 30;
export const MINUTES_SAVED_HIGH = 60;
export const MINUTES_SAVED_AVG = 45;

/** Taux horaire freelances FR par défaut pour le calculateur */
export const DEFAULT_HOURLY_RATE = 60;
export const DEFAULT_BRIEFS_PER_WEEK = 4;

export function computeMonthlyRoi(briefsPerWeek: number, hourlyRate: number) {
  const briefsPerMonth = briefsPerWeek * 4.3;
  const hoursLow = (briefsPerMonth * MINUTES_SAVED_LOW) / 60;
  const hoursHigh = (briefsPerMonth * MINUTES_SAVED_HIGH) / 60;
  const hoursAvg = (briefsPerMonth * MINUTES_SAVED_AVG) / 60;
  const eurosAvg = Math.round(hoursAvg * hourlyRate);
  const proBreakEven = PLAN_PRICES.plus.amount / (hourlyRate * (MINUTES_SAVED_AVG / 60));

  return {
    briefsPerMonth: Math.round(briefsPerMonth),
    hoursLow: Math.round(hoursLow * 10) / 10,
    hoursHigh: Math.round(hoursHigh * 10) / 10,
    hoursAvg: Math.round(hoursAvg * 10) / 10,
    eurosAvg,
    proBreakEven: Math.max(1, Math.ceil(proBreakEven * 10) / 10),
  };
}

export const TIME_WITHOUT = [
  {
    label: "1re version bâclée",
    time: "10–15 min",
    pain: "Tu tapes quelque chose de vague. L’IA te sort du générique.",
  },
  {
    label: "Allers-retours",
    time: "20–30 min",
    pain: "« Plus précis », « moins long », « change le ton »… encore et encore.",
  },
  {
    label: "Réécriture manuelle",
    time: "15–25 min",
    pain: "Tu refais le brief toi-même. Tu aurais pu tout structurer dès le début.",
  },
] as const;

export const TIME_WITH = [
  {
    label: "1 idée en langage clair",
    time: "10 s",
    gain: "Tu décris ce que tu veux, comme à un collègue.",
  },
  {
    label: "Brief scoré + 4 variantes",
    time: "30 s",
    gain: "Structure consultant, preview, score /100 — prêt à coller.",
  },
  {
    label: "Livrable IA du premier coup",
    time: "0 allers-retours",
    gain: "Tu colles. L’IA exécute. Tu passes à autre chose.",
  },
] as const;

export const DREAM_OUTCOMES = [
  {
    persona: "Freelance",
    dream: "Signer plus vite sans travailler dimanche",
    lines: [
      "Proposition commerciale structurée en 30 s au lieu d’1 h",
      "Cold emails qui sonnent humains — et qui obtiennent des réponses",
      "Un brief Cursor qui code la feature, pas un tutorial Wikipedia",
    ],
  },
  {
    persona: "Marketeur",
    dream: "Livrer 3× plus sans sacrifier la qualité",
    lines: [
      "Pages, ads, emails : même niveau, en une fraction du temps",
      "Fini le « contenu générique » que Google et les clients repèrent",
      "Score /100 avant de coller — tu ne gaspilles plus ton budget pubs",
    ],
  },
  {
    persona: "Fondateur",
    dream: "Avancer comme une équipe de 3… seul",
    lines: [
      "Landing, pitch, specs produit : des briefs experts en série",
      "Tu arrêtes de bricoler des prompts à 23 h",
      "Chaque génération = 30–60 min rendues à ton roadmap",
    ],
  },
] as const;

/** Empilement de valeur Pro — pour tuer le doute « c’est trop cher » */
export const PRO_VALUE_STACK = [
  {
    item: "Brief multi-IA structuré (consultant)",
    alternative: "1–2 h de prompt engineering",
    worth: "80–120 €",
  },
  {
    item: "Score /100 + preview avant collage",
    alternative: "Quota GPT / crédits Midjourney gaspillés",
    worth: "20–40 €",
  },
  {
    item: "4 variantes (Court → Détaillé)",
    alternative: "3 itérations manuelles",
    worth: "60–90 €",
  },
  {
    item: "Templates premium + favoris + historique",
    alternative: "Notion + Google Doc bricolés",
    worth: "15–25 €/mois",
  },
  {
    item: "Garantie regen si score < 70",
    alternative: "Tu recommences à zéro",
    worth: "inclus",
  },
] as const;

export const PRO_VALUE_TOTAL_LABEL = "Valeur estimée : 150–250 € / mois d’usage sérieux";
export const PRO_PRICE_HOOK = `${PLAN_PRICES.plus.label} — un rythme pro, sans surenchère`;

export const DOUBT_KILLERS = [
  {
    title: "Pas besoin de 200 prompts",
    text: "Tu n’en fais peut-être que 8 par mois. Chaque brief te rend 30–60 min. Pro (ou Starter) se rentabilise vite.",
  },
  {
    title: "Ce n’est pas « encore un ChatGPT »",
    text: "ChatGPT répond. PromptPilot te donne le brief scoré à coller dans ChatGPT, Claude, Cursor, Midjourney…",
  },
  {
    title: "Tu juges avant de payer",
    text: `${FREE_LIFETIME_LIMIT} briefs offerts sur ton vrai projet. Si la qualité ne te convainc pas, tu ne prends pas Pro. Point.`,
  },
  {
    title: "Risque proche de zéro",
    text: "Stripe sécurisé, annulation en 1 clic, regen gratuite si score < 70. Tu ne payes que si tu produis.",
  },
] as const;
