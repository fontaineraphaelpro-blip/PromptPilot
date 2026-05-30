export const APP_NAME = "PromptPilot";

export const TARGET_AIS = [
  "ChatGPT",
  "Claude",
  "Gemini",
  "Midjourney",
  "DALL·E",
  "Runway",
  "Sora",
  "Veo",
  "Lovable",
  "Bolt",
  "Cursor",
  "Replit",
] as const;

export const TASK_TYPES = [
  "Business",
  "Marketing",
  "Vidéo",
  "Image",
  "Développement",
  "No-code",
  "Écriture",
  "Analyse",
  "Autre",
] as const;

export const DETAIL_LEVELS = ["Rapide", "Détaillé", "Expert"] as const;

export const TONES = [
  "Professionnel",
  "Cinématique",
  "Minimaliste",
  "Premium",
  "Fun",
  "Technique",
  "Persuasif",
  "Autre",
] as const;

export const LANGUAGES = ["Français", "Anglais"] as const;

export const PLANS = ["free", "pro", "creator"] as const;

export const FREE_DAILY_LIMIT = 3;
export const FREE_HISTORY_LIMIT = 30;

export const TEMPLATE_CATEGORIES = [
  "Business",
  "Marketing",
  "Création vidéo",
  "Création image",
  "Développement",
  "No-code",
  "E-commerce",
  "Réseaux sociaux",
  "Productivité",
] as const;

export type TargetAI = (typeof TARGET_AIS)[number];
export type TaskType = (typeof TASK_TYPES)[number];
export type DetailLevel = (typeof DETAIL_LEVELS)[number];
export type Tone = (typeof TONES)[number];
export type Language = (typeof LANGUAGES)[number];
export type Plan = (typeof PLANS)[number];

export const AI_CATEGORIES = {
  text: ["ChatGPT", "Claude", "Gemini"] as const,
  image: ["Midjourney", "DALL·E"] as const,
  video: ["Runway", "Sora", "Veo"] as const,
  code: ["Lovable", "Bolt", "Cursor", "Replit"] as const,
};

export function getAICategory(ai: TargetAI): "text" | "image" | "video" | "code" {
  if ((AI_CATEGORIES.text as readonly string[]).includes(ai)) return "text";
  if ((AI_CATEGORIES.image as readonly string[]).includes(ai)) return "image";
  if ((AI_CATEGORIES.video as readonly string[]).includes(ai)) return "video";
  return "code";
}
