import {
  FREE_LIFETIME_LIMIT,
  STARTER_MONTHLY_LIMIT,
  PLUS_MONTHLY_LIMIT,
} from "@/lib/constants";
import { PLAN_PRICES } from "@/lib/plans";

export const LANDING_FAQS = [
  {
    q: "Quelles IA sont supportées ?",
    a: "ChatGPT, Claude, Gemini, Midjourney, DALL·E, Runway, Sora, Veo, Lovable, Bolt, Cursor et Replit.",
  },
  {
    q: "Combien de prompts gratuits ?",
    a: `Le plan Free inclut ${FREE_LIFETIME_LIMIT} générations offertes (Principal + Court). Starter : ${STARTER_MONTHLY_LIMIT}/mois. Pro : ${PLUS_MONTHLY_LIMIT}/mois + Expert. Creator : illimité.`,
  },
  {
    q: `Quelle différence entre Starter (${PLAN_PRICES.starter.amount}€), Pro (${PLAN_PRICES.plus.amount}€) et Creator (${PLAN_PRICES.creator.amount}€) ?`,
    a: `Starter : rythme régulier avec variante Détaillée. Pro : Expert inclus, templates premium et favoris. Creator : workflows métier et volume illimité.`,
  },
  {
    q: "En quoi PromptPilot est différent de ChatGPT ?",
    a: `ChatGPT répond à ta question. PromptPilot produit le brief à coller : adapté à 12+ IA, scoré /100, avec preview et variantes. Un brief expert = 30 à 60 min gagnées — Pro à ${PLAN_PRICES.plus.label} quand tu veux Expert à chaque fois.`,
  },
  {
    q: "Puis-je payer sans abonnement ?",
    a: "Oui : packs de crédits, déblocage Expert à l’unité, ou pack workflows — sans engagement mensuel.",
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
