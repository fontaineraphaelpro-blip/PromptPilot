/** Offres one-shot — tons sobres, sans survente */
export const CREDIT_PACKS = [
  {
    id: "credits_10" as const,
    credits: 10,
    amountEuros: 4.9,
    label: "4,90€",
    title: "10 briefs",
    description: "Pour tester sur quelques projets concrets",
    highlighted: false,
  },
  {
    id: "credits_30" as const,
    credits: 30,
    amountEuros: 11.9,
    label: "11,90€",
    title: "30 briefs",
    description: "Le rythme d’un freelance ou d’un marketeur",
    highlighted: true,
  },
  {
    id: "credits_100" as const,
    credits: 100,
    amountEuros: 29,
    label: "29€",
    title: "100 briefs",
    description: "Pour une équipe ou une saison chargée",
    highlighted: false,
  },
] as const;

export type CreditPackId = (typeof CREDIT_PACKS)[number]["id"];

export const EXPERT_UNLOCK = {
  id: "expert_unlock" as const,
  amountEuros: 1.29,
  label: "1,29€",
  title: "Débloquer Expert",
  description: "Brief production complet pour ce prompt — une fois, sans abonnement",
};

export const WORKFLOW_PACK_UNLOCK = {
  id: "workflow_pack" as const,
  amountEuros: 4.9,
  label: "4,90€",
  title: "Pack workflows",
  description: "SaaS, LinkedIn, Dev — packs réutilisables, paiement unique",
};

export type OneShotProductId =
  | CreditPackId
  | typeof EXPERT_UNLOCK.id
  | typeof WORKFLOW_PACK_UNLOCK.id;

export function getCreditPack(id: string) {
  return CREDIT_PACKS.find((p) => p.id === id);
}
