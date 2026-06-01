import { FREE_DAILY_LIMIT } from "@/lib/constants";

export const LANDING_FAQS = [
  {
    q: "Quelles IA sont supportées ?",
    a: "ChatGPT, Claude, Gemini, Midjourney, DALL·E, Runway, Sora, Veo, Lovable, Bolt, Cursor et Replit.",
  },
  {
    q: "Combien de prompts gratuits par jour ?",
    a: `Le plan Free inclut ${FREE_DAILY_LIMIT} générations par jour. Pro : 200/jour. Creator : illimité.`,
  },
  {
    q: "Quelle différence entre Pro (9€) et Creator (19€) ?",
    a: "Pro : score /100, preview, templates premium, favoris — idéal si tu génères souvent. Creator : variante Expert, workflows métier et illimité.",
  },
  {
    q: "En quoi PromptExpert est différent de ChatGPT ?",
    a: "ChatGPT répond à ta question. PromptExpert produit le prompt structuré à coller : adapté à 12+ IA, scoré /100, avec preview et 4 variantes.",
  },
  {
    q: "Garantie qualité si le score est bas ?",
    a: "Si ton prompt est scoré sous 70/100, tu peux regénérer gratuitement une fois pour améliorer le résultat.",
  },
  {
    q: "Puis-je annuler mon abonnement ?",
    a: "Oui, à tout moment via le portail Stripe dans Paramètres > Facturation.",
  },
] as const;
