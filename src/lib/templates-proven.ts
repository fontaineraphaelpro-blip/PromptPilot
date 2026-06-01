/** Scores moyens indicatifs affichés sur les templates (marketing + confiance) */
export const TEMPLATE_PROVEN_SCORES: Record<string, number> = {
  "Landing page SaaS B2B": 91,
  "Séquence email onboarding": 89,
  "Post LinkedIn thought leadership": 88,
  "Brief logo startup tech": 87,
  "App fitness mobile UI": 90,
  "Prompt Midjourney produit": 92,
  "Spec MVP no-code": 88,
  "Analyse SWOT rapide": 86,
};

export function getTemplateProvenScore(title: string): number | null {
  return TEMPLATE_PROVEN_SCORES[title] ?? 88;
}
