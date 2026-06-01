/** Exemples marketing — reflètent la sortie réelle mode « Détaillé » / « Expert » PromptPilot */

export type ExpertShowcase = {
  id: string;
  label: string;
  targetAI: string;
  idea: string;
  before: string;
  beforeScore: number;
  beforeWordCount: number;
  beforeIssues: string[];
  /** Brief principal (mode Détaillé) — ce que l'app affiche comme generated_prompt */
  afterDetailed: string;
  afterScore: number;
  afterWordCount: number;
};

export const LANDING_SAAS_DEMO: ExpertShowcase = {
  id: "landing-demo",
  label: "Landing SaaS",
  targetAI: "ChatGPT",
  idea: "Landing page SaaS B2B qui convertit les visiteurs en essai gratuit",
  before: "Fais une landing pour mon SaaS",
  beforeScore: 26,
  beforeWordCount: 6,
  beforeIssues: ["6 mots", "Aucun persona", "Pas de structure ni CTA"],
  afterScore: 94,
  afterWordCount: 1180,
  afterDetailed: `## Rôle et expertise
Tu es copywriter SaaS B2B senior (10+ ans), spécialiste conversion freemium → essai payant. Tu maîtrises les frameworks PAS, AIDA et la preuve sociale B2B.

## Contexte et données d'entrée
- Produit : PromptPilot — générateur de prompts structurés pour ChatGPT, Claude, Cursor, Midjourney
- Cible : fondateurs / responsables marketing PME (5–50 employés), France, déjà utilisateurs ChatGPT « au feeling »
- Objectif page : inscription essai gratuit 14 jours, sans carte bancaire
- Concurrents implicites : prompts manuels, Notion, templates gratuits
- Preuves dispo : score qualité /100, 4 variantes par idée, 12+ IA supportées

## Mission précise
Rédiger la copy complète d'une landing page one-page, prête à intégrer dans un site Next.js. Livrable : texte section par section, titres H1/H2, micro-copy boutons, FAQ (5 questions).

## Structure obligatoire (dans cet ordre)
1. Hero — promesse outcome en 8–12 mots + sous-titre bénéfice chiffré + CTA primaire « Essayer gratuitement » + micro-preuve (ex. « 2 prompts/jour offerts »)
2. Logos / bandeau confiance (placeholder [LOGO_CLIENT])
3. Problème (3 pains en bullets — temps perdu, prompts vagues, résultats IA moyens)
4. Solution — comment PromptPilot transforme une idée en brief R-C-T-C scoré
5. Démo visuelle — description du split écran idée → prompt expert (pour designer)
6. Bénéfices (3 cartes : gain temps, qualité /100, multi-IA)
7. Comparatif avant/après (tableau 2 colonnes : prompt vague vs expert)
8. Tarifs — ancrage Free / Pro 9€ / Creator 19€, CTA Pro mis en avant
9. FAQ — objections prix, données, annulation Stripe
10. CTA final — urgence douce + garantie regen si score < 70

## Contraintes non négociables
- Langue : français professionnel, tutoiement modéré (cohérent startup)
- Longueur totale : 900–1200 mots de copy visible (hors FAQ réponses courtes)
- Interdit : jargon vide (« révolutionnaire », « disruptif »), promesses santé/finance non vérifiables
- Chaque section : max 120 mots sauf FAQ
- CTA répété 3 fois minimum avec libellés différents

## Format de sortie
Markdown avec ## pour chaque section. Pour chaque bloc hero/CTA : indiquer [H1], [H2], [BUTTON_LABEL]. FAQ en ### Question / réponse 2–4 phrases.

## Critères d'acceptation
- Un visiteur comprend la valeur en < 8 secondes (test headline seul)
- Au moins 2 preuves chiffrées ou factuelles dans la page
- Objections « pourquoi payer si ChatGPT gratuit » traitées explicitement
- Mobile-first : phrases courtes, paragraphes ≤ 3 lignes

## Si informations manquantes
Avant de rédiger, pose-moi MAX 3 questions sur : niche verticale prioritaire, témoignage client disponible, ton de marque (premium vs accessible). Si pas de réponse : assume PME tech FR, ton pro-chaleureux.`,
};

export const MARKETING_SHOWCASES: ExpertShowcase[] = [
  {
    id: "linkedin",
    label: "LinkedIn B2B",
    targetAI: "ChatGPT",
    idea: "Posts LinkedIn pour lancer mon SaaS productivité IA",
    before: "Écris-moi des posts LinkedIn pour mon app",
    beforeScore: 31,
    beforeWordCount: 9,
    beforeIssues: ["9 mots", "Pas de calendrier", "Zéro persona acheteur"],
    afterScore: 92,
    afterWordCount: 1050,
    afterDetailed: `## Rôle et expertise
Tu es ghostwriter LinkedIn B2B, ex-CMO SaaS. Tu écris pour des fondateurs qui vendent à des décideurs PME sans ton « influencer ».

## Contexte
- Produit : SaaS productivité IA (génération prompts experts)
- ICP : fondateurs / head of growth PME 10–80 pers., France & Belgique francophone
- Campagne : lancement v1, objectif démos calendrier + notoriété
- Ton : expert accessible, jamais arrogant, pas d'émojis excessifs (max 1/post)

## Mission
Produire un calendrier éditorial 14 jours (10 posts publiables) + 2 posts « pillar » longs (carrousel outline).

## Format par post (STRICT)
Hook ligne 1 (question ou stat choc) · corps 120–180 mots · 3 bullets actionnables · CTA soft (commentaire ou DM, pas « achetez ») · 3–5 hashtags niche (pas #motivation)

## Angles à couvrir (répartir sur 10 posts)
1. Erreur prompt vague (storytelling)
2. Avant/après brief structuré
3. Mythe « ChatGPT suffit »
4. Coulisses construction produit
5. Témoignage format [TÉMOIGNAGE_CLIENT]
6. Framework R-C-T-C en 5 étapes
7. Cas d'usage Cursor / marketing
8. Objection prix / ROI temps
9. Liste outils stack fondateur
10. Rétrospective semaine 1 lancement

## Contraintes
- Français · pas de clickbait mensonger · mention légale si stats : « source : [à préciser] »
- Varier longueur : 3 posts courts (80 mots), 7 standard

## Critères d'acceptation
Chaque post doit tenir seul sans contexte ; CTA unique ; hook testable A/B (proposer variante B du hook pour posts 1, 5, 10).

## Questions avant production
Quel est le nom exact du produit ? As-tu 1 chiffre d'usage (users, prompts générés) vérifiable ?`,
  },
  LANDING_SAAS_DEMO,
  {
    id: "cursor",
    label: "Dev Cursor",
    targetAI: "Cursor",
    idea: "Ajouter auth Google + email sur mon app Next.js",
    before: "Ajoute l'auth à mon app",
    beforeScore: 34,
    beforeWordCount: 5,
    beforeIssues: ["5 mots", "Stack inconnue", "Pas de critères de done"],
    afterScore: 96,
    afterWordCount: 1320,
    afterDetailed: `## Vision produit
Ajouter authentification email/mot de passe + OAuth Google sur une app Next.js 14 existante, sans régression sur les routes publiques.

## Contexte technique (à respecter)
- Stack : Next.js 14 App Router, TypeScript strict, Prisma ORM, PostgreSQL, NextAuth v5 déjà installé mais non configuré
- Dossiers existants : \`src/app/(marketing)\`, \`src/app/(app)/dashboard\`, \`src/lib/auth.ts\`, \`prisma/schema.prisma\` (modèle User présent)
- Déploiement : Railway, variables AUTH_SECRET, DATABASE_URL en place

## User stories
1. En tant que visiteur, je peux m'inscrire par email + mot de passe (validation Zod, min 8 car.)
2. En tant qu'utilisateur, je peux me connecter via Google OAuth
3. En tant qu'utilisateur non connecté, je suis redirigé vers /login si j'accède à /dashboard ou /generate
4. En tant qu'utilisateur connecté, je vois mon email dans la navbar et je peux me déconnecter

## Ordre d'implémentation (numéroté)
1. Configurer NextAuth providers (Credentials + Google) dans \`src/lib/auth.ts\`
2. Créer routes API \`app/api/auth/[...nextauth]/route.ts\`
3. Pages \`/login\`, \`/signup\` avec formulaires shadcn + messages d'erreur FR
4. Middleware \`middleware.ts\` — protéger matcher \`/dashboard/:path*\`, \`/generate/:path*\`, \`/settings/:path*\`
5. Lier session à \`getAuthUser()\` existant — ne pas dupliquer la logique
6. Tests manuels checklist (voir ci-dessous)

## Fichiers attendus (chemins explicites)
Lister chaque fichier créé/modifié avec une phrase de justification.

## Règles techniques
- Ne pas casser le build \`npm run build\`
- Pas de \`any\` · gestion erreurs OAuth (compte email déjà existant)
- Sessions persistantes 30 jours · CSRF NextAuth par défaut

## Edge cases obligatoires
- Email déjà enregistré via Google puis tentative credentials
- Redirect \`callbackUrl\` après login depuis page protégée
- Déconnexion + accès arrière navigateur

## Critères d'acceptation (Definition of Done)
- [ ] Parcours signup → dashboard < 60 s en local
- [ ] \`npm run build\` passe
- [ ] Aucune route marketing cassée
- [ ] README ou commentaire minimal sur variables Google à ajouter (.env.example)

## Format de réponse Cursor
Plan en 8–12 étapes · puis patches par fichier · pas de refactor hors scope auth.`,
  },
];

/** Lignes affichées progressivement pendant la phase « génération » de la démo */
export function getDemoGeneratingLines(): string[] {
  const text = LANDING_SAAS_DEMO.afterDetailed;
  return text
    .split("\n")
    .filter((l) => l.trim())
    .slice(0, 12);
}

export function countWords(text: string): number {
  return text.trim().split(/\s+/).filter(Boolean).length;
}
