export const FUNNEL_STORAGE_KEY = "promptexpert_funnel_draft";

export interface FunnelDraft {
  idea: string;
  targetAi: string;
  teaserPrompt: string;
  savedAt: number;
}

export function saveFunnelDraft(draft: Omit<FunnelDraft, "savedAt">) {
  if (typeof window === "undefined") return;
  const payload: FunnelDraft = { ...draft, savedAt: Date.now() };
  sessionStorage.setItem(FUNNEL_STORAGE_KEY, JSON.stringify(payload));
}

export function getFunnelDraft(): FunnelDraft | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = sessionStorage.getItem(FUNNEL_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as FunnelDraft;
    if (!parsed.idea || !parsed.targetAi) return null;
    return parsed;
  } catch {
    return null;
  }
}

export function clearFunnelDraft() {
  if (typeof window === "undefined") return;
  sessionStorage.removeItem(FUNNEL_STORAGE_KEY);
}

export function buildTeaserPrompt(idea: string, targetAi: string): string {
  return `Tu es un expert ${targetAi} senior.

## Contexte
L'utilisateur souhaite : ${idea.trim()}

## Mission
Produis un livrable complet, structuré et immédiatement actionnable pour ${targetAi}.

## Contraintes
- Langue : français
- Format : étapes numérotées + sections claires
- Niveau : expert (détails techniques, garde-fous, critères de qualité)
- Inclure : rôle, contexte, livrables, pièges à éviter

## Définition of done
- [ ] Chaque étape est testable
- [ ] Aucune ambiguïté sur le scope
- [ ] Sortie prête à copier-coller dans ${targetAi}`;
}
