import { FREE_LIFETIME_LIMIT } from "@/lib/constants";

export const LANDING_FAQS = [
  {
    q: "Quelles IA sont supportées ?",
    a: "ChatGPT, Claude, Gemini, Midjourney, DALL·E, Runway, Sora, Veo, Lovable, Bolt, Cursor et Replit.",
  },
  {
    q: "Combien de prompts gratuits ?",
    a: `Le plan Free inclut ${FREE_LIFETIME_LIMIT} générations offertes pour tester la qualité. Pro : 200/jour. Creator : illimité.`,
  },
  {
    q: "Quelle différence entre Pro (9€) et Creator (19€) ?",
    a: "Pro : score /100, preview, templates premium, favoris — idéal si tu génères souvent. Creator : variante Expert, workflows métier et illimité.",
  },
  {
    q: "En quoi PromptPilot est différent de ChatGPT ?",
    a: "ChatGPT répond à ta question. PromptPilot produit le brief à coller : adapté à 12+ IA, scoré /100, avec preview et 4 variantes. Un brief expert = 30 à 60 min gagnées — Pro à 9€/mois rentabilisé dès la 2ᵉ génération.",
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
