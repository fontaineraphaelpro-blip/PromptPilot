/**
 * Templates prompts experts — prêts à copier-coller.
 * Remplace [PLACEHOLDER] par ton contexte avant utilisation.
 */

export type TemplateSeed = {
  title: string;
  category: string;
  targetAi: string;
  description: string;
  content: string;
  isPremium: boolean;
};

export const TEMPLATES: TemplateSeed[] = [
  {
    title: "Landing page SaaS B2B",
    category: "Business",
    targetAi: "ChatGPT",
    description: "Page d'accueil complète : hero, preuves, pricing, FAQ objections",
    isPremium: false,
    content: `Tu es un copywriter B2B SaaS senior (conversion + clarté).

## Contexte
- Produit : [NOM DU SAAS]
- Cible : [PERSONA — ex. fondateurs PME, équipes marketing]
- Problème résolu : [DOULEUR PRINCIPALE]
- Différenciation vs concurrents : [AVANTAGE UNIQUE]
- Preuve sociale disponible : [CHIFFRES, LOGOS, TÉMOIGNAGES — ou « à inventer de façon crédible »]

## Mission
Rédige une landing page complète en français, ton professionnel et direct (pas de buzzwords vides).

## Structure obligatoire
1. Hero : headline (max 12 mots), sous-titre, CTA primaire + secondaire
2. Section problème (3 puces empathiques)
3. Section solution (3 bénéfices mesurables)
4. Comment ça marche (3 étapes)
5. Social proof (témoignage court + métrique)
6. Pricing (3 offres : Free / Pro / Enterprise) avec ancres de valeur
7. FAQ (5 objections : prix, sécurité, courbe d'apprentissage, intégrations, annulation)
8. CTA final

## Contraintes
- Phrases courtes, scannable
- Chaque section : titre H2 + corps
- Pas de emoji
- Inclure 2 variantes de headline en fin de document

## Definition of done
Livrable prêt à coller dans Webflow/Framer. Si une info manque, pose 3 questions max avant d'écrire.`,
  },
  {
    title: "Post LinkedIn thought leadership",
    category: "Marketing",
    targetAi: "Claude",
    description: "Post LinkedIn structuré : hook, story, insight, CTA",
    isPremium: false,
    content: `Tu es un ghostwriter LinkedIn pour dirigeants tech (français, ton expert accessible).

## Contexte
- Auteur : [RÔLE — ex. CEO SaaS IA]
- Sujet : [SUJET — ex. prompt engineering pour équipes]
- Objectif : [NOTORIÉTÉ / LEADS / RECRUTEMENT]
- Audience : [FONDATEURS / MARKETERS / DEVS]

## Mission
Rédige 1 post LinkedIn (150–220 mots) qui génère des commentaires qualifiés.

## Structure
- Ligne 1 : hook (question ou affirmation contrariante)
- Corps : mini-story (situation → tension → insight)
- 3 bullet points actionnables
- CTA doux (question ouverte ou « commente X si… »)

## Contraintes
- Pas de hashtags excessifs (max 3)
- Pas de « Je suis ravi de vous annoncer »
- 1 phrase sur pourquoi ça compte maintenant
- Variante alternative du hook en fin

Si le sujet est trop vague, demande précision sur l'angle avant d'écrire.`,
  },
  {
    title: "Photo produit e-commerce Midjourney",
    category: "Création image",
    targetAi: "Midjourney",
    description: "Packshot premium fond blanc + lifestyle pour fiche produit",
    isPremium: false,
    content: `Professional e-commerce product photography of [PRODUIT — ex. bouteille skincare matte black],
centered composition, pure white seamless background (#FFFFFF),
soft studio key light at 45°, subtle fill, crisp contact shadows,
hyper-realistic materials and labels readable,
commercial catalog style, ultra sharp, 8K detail,
minimal reflection, no props clutter,
shot on 85mm lens, shallow depth of field --ar 1:1 --style raw --v 6

Negative prompt: blurry, distorted text, watermark, hands, messy background, oversaturated, cartoon

Variante lifestyle (à générer séparément) :
Same product [PRODUIT] on marble bathroom shelf, morning natural window light,
premium editorial aesthetic, spa mood, shallow DOF --ar 4:5 --style raw`,
  },
  {
    title: "Thread Twitter/X éducatif",
    category: "Réseaux sociaux",
    targetAi: "ChatGPT",
    description: "Thread 10 tweets : hook, valeur, CTA — format copier-coller",
    isPremium: false,
    content: `Tu es un créateur de contenu Twitter/X spécialisé en threads éducatifs (niche : [NICHE]).

## Mission
Écris un thread de 10 tweets sur : [SUJET].

## Règles par tweet
- Tweet 1 : hook fort + promesse (max 240 caractères)
- Tweets 2–8 : 1 idée = 1 tweet, numéroté 1/10… 8/10
- Tweet 9 : synthèse + erreur commune à éviter
- Tweet 10 : CTA ([LIEN / NEWSLETTER / OUTIL])

## Contraintes
- Français
- Pas de jargon sans explication
- 1 exemple concret minimum au milieu du thread
- Format : « 1/10 [texte] » sur chaque ligne

Livrable : liste prête à publier, une ligne par tweet.`,
  },
  {
    title: "Analyse SWOT actionnable",
    category: "Productivité",
    targetAi: "Gemini",
    description: "SWOT + priorités 30/60/90 jours pour décision rapide",
    isPremium: false,
    content: `Tu es consultant stratégie pour startups early-stage.

## Contexte
- Projet / entreprise : [NOM]
- Marché : [MARCHÉ]
- Stage : [IDÉE / MVP / SCALE]
- Ressources : [ÉQUIPE, BUDGET, DÉLAIS]

## Mission
Produis une analyse SWOT en français puis un plan d'action.

## Format de sortie
### SWOT (tableau markdown)
| Forces | Faiblesses |
| Opportunités | Menaces |

### Insights (5 bullets)
### Top 3 risques + mitigation
### Plan 30/60/90 jours (actions priorisées, owner suggéré, KPI)

## Contraintes
- Être factuel : signaler les hypothèses
- Pas de généralités (« améliorer le marketing » interdit sans tactique)
- Maximum 800 mots

Si données insuffisantes, liste les 5 questions critiques avant analyse.`,
  },
  {
    title: "Composant React + Tailwind (accessible)",
    category: "Développement",
    targetAi: "Cursor",
    description: "Composant UI typé, accessible, documenté — prêt pour shadcn",
    isPremium: false,
    content: `Tu es un dev React/TypeScript senior (accessibilité WCAG 2.1).

## Contexte projet
- Stack : React 19, TypeScript strict, Tailwind CSS 4
- Design system : style shadcn/ui (minimal, dark-friendly)
- Composant à créer : [NOM — ex. PricingCard]

## Mission
Implémente le composant [NOM] avec :
- Props typées exportées
- États : default, hover, disabled, loading
- ARIA labels et navigation clavier
- Responsive mobile-first

## Spécifications fonctionnelles
[DÉCRIRE FONCTIONNALITÉS — ex. titre, prix, liste features, CTA]

## Contraintes
- Un seul fichier si possible, sinon dossier cohérent
- Pas de dépendances non demandées
- Commentaires uniquement sur logique non évidente
- Inclure exemple d'usage en bas du fichier

## Definition of done
- Code compile sans any
- Pas de console.log
- Liste des props documentée en JSDoc

Procède étape par étape : types → structure → styles → a11y → exemple.`,
  },
  {
    title: "Email cold outreach B2B",
    category: "Marketing",
    targetAi: "ChatGPT",
    description: "Séquence 3 emails : accroche, valeur, break-up",
    isPremium: false,
    content: `Tu es expert outbound B2B (emails courts, taux de réponse optimisé).

## Contexte
- Expéditeur : [TON ENTREPRISE + OFFRE]
- Cible : [TITRE PROSPECT — ex. Head of Growth SaaS]
- Problème cible : [DOULEUR]
- Preuve : [CAS CLIENT / MÉTRIQUE]

## Mission
Rédige une séquence de 3 emails (français, tutoiement ou vouvoiement selon : [TU/VOUS]).

### Email 1 — Accroche (max 120 mots)
- Objet : 2 variantes A/B
- Personnalisation ligne 1 basée sur [SIGNAL — ex. levée de fonds, recrutement]
- 1 bénéfice chiffré
- CTA : question ouverte (pas « dispo mardi ? » en email 1)

### Email 2 — Valeur (J+3, max 100 mots)
- Mini étude de cas structure Problem → Action → Result
- CTA : 15 min call

### Email 3 — Break-up (J+7, max 60 mots)
- Ton respectueux, porte ouverte

## Contraintes
- Pas de pièces jointes mentionnées
- Pas de spam words (gratuit, révolutionnaire…)
- Chaque email : préheader suggéré`,
  },
  {
    title: "Script Reels / Short 45s",
    category: "Réseaux sociaux",
    targetAi: "ChatGPT",
    description: "Script voix-off + textes à l'écran + hooks pour TikTok/Reels",
    isPremium: false,
    content: `Tu es scriptwriter short-form (Reels, TikTok, Shorts).

## Contexte
- Marque / créateur : [NOM]
- Sujet : [SUJET — ex. 3 erreurs prompts IA]
- Ton : [DYNAMIQUE / PREMIUM / PÉDAGOGIQUE]
- Durée cible : 45 secondes

## Mission
Écris le script complet.

## Format
| Seconde | Voix-off | Texte à l'écran | Visuel suggéré |
| 0-3 | Hook | Gros titre 3 mots | Face cam / texte animé |
| … | … | … | … |

## Contraintes
- Hook dans les 2 premières secondes
- 1 pattern interrupt à mi-vidéo
- CTA final : [ACTION — follow, lien bio, commentaire]
- Phrases ≤ 14 mots pour voix-off

Ajoute 2 hooks alternatifs en début de document.`,
  },
  {
    title: "Dashboard SaaS Next.js 14 complet",
    category: "Développement",
    targetAi: "Cursor",
    description: "App Router, auth, sidebar, KPIs, tables — plan d'exécution Cursor",
    isPremium: true,
    content: `Tu es architecte logiciel Next.js 14 (App Router) + TypeScript strict.

## Mission
Construire un dashboard SaaS pour : [DESCRIPTION PRODUIT].

## Stack imposée
- Next.js 14 App Router, TypeScript strict
- Tailwind CSS 4 + composants style shadcn/ui
- Auth : [NextAuth credentials mock / Clerk — préciser]
- DB : [Prisma PostgreSQL / mock local]

## Pages MVP
1. /login + /signup
2. /dashboard (KPI cards, graphique placeholder, activité récente)
3. /[resource] liste + détail (table filtrable, pagination)
4. /settings (profil, plan, facturation placeholder)

## Exigences techniques
- Layout avec sidebar responsive (collapse mobile)
- États loading/error avec skeletons
- Composants réutilisables dans /components
- Pas de any, ESLint clean

## Méthode de travail (OBLIGATOIRE)
Procède étape par étape et attend validation implicite entre phases :
Phase 1 : arborescence + types
Phase 2 : layout + navigation
Phase 3 : pages + données mock
Phase 4 : polish UI

## Contraintes
- Ne pas modifier les fichiers hors scope listé sans demander
- Fichiers existants à respecter : [LISTE ou « greenfield »]

Definition of done : npm run build passe, UI cohérente dark/light selon [CHOIX].`,
  },
  {
    title: "Boutique e-commerce Lovable",
    category: "E-commerce",
    targetAi: "Lovable",
    description: "Storefront mobile-first, panier, filtres, checkout UI",
    isPremium: true,
    content: `Build a production-ready e-commerce storefront for [NICHE / MARQUE].

## Brand
- Name: [BRAND]
- Aesthetic: minimal premium, black & white, generous whitespace
- Audience: [TARGET CUSTOMER]

## Core features (MVP)
- Home: hero, featured collection, trust badges
- PLP: product grid, filters (category, price), sort
- PDP: images gallery, variants (size/color), add to cart, reviews section
- Cart drawer + checkout UI (3 steps: shipping, payment mock, confirm)
- Empty states + mobile-first navigation

## Tech preferences
- React + TypeScript + Tailwind
- Reusable components, clean folder structure
- Seed 12 realistic products with names/prices/images placeholder

## UX rules
- Primary CTA always visible on mobile
- Sticky add-to-cart on PDP
- Micro-animations on hover (subtle)

## Deliverable order
1) Wireframe structure 2) Components 3) Pages 4) Polish

Do not add backend payment integration — UI only with mock success state.`,
  },
  {
    title: "Publicité vidéo 15s (Runway)",
    category: "Création vidéo",
    targetAi: "Runway",
    description: "Spot court cinématique produit — mouvement caméra précis",
    isPremium: true,
    content: `Cinematic 15-second commercial for [PRODUCT / BRAND].

Scene 1 (0-5s): Extreme close-up of [PRODUCT DETAIL], slow rack focus, dark premium studio, soft rim light.
Scene 2 (5-10s): Smooth 360° orbit around full product, reflections controlled, black background.
Scene 3 (10-15s): Lifestyle flash — [CONTEXT — hand picking product / unboxing], warm accent light, logo reveal negative space.

Camera: ARRI Alexa look, 24fps, shallow DOF, no jitter.
Lighting: high contrast, gold accent, soft bloom highlights.
Mood: luxury, modern, confident.
Motion: slow, fluid, no chaotic cuts.

Avoid: text overlays, distorted logos, extra limbs, low-res textures.`,
  },
  {
    title: "Scène cinéma Sora 10s",
    category: "Création vidéo",
    targetAi: "Sora",
    description: "Plan-séquence cinématographique avec mouvement caméra détaillé",
    isPremium: true,
    content: `10-second cinematic shot, 24fps film grain, anamorphic lens flare subtle.

Subject: [CHARACTER / OBJECT] in [ENVIRONMENT — ex. rainy Tokyo alley at night].
Action: [PRECISE ACTION — ex. walks toward camera, coat catching wind].
Camera: slow dolly in from wide to medium, eye-level, stabilized.
Lighting: neon reflections on wet pavement, key light from storefront, soft fog atmosphere.
Color grade: teal and orange muted, high dynamic range.
Style: Blade Runner 2049 inspired but photoreal, not illustration.

No dialogue. No on-screen text. Single continuous take feel.`,
  },
  {
    title: "App no-code Bolt — MVP en 1 session",
    category: "No-code",
    targetAi: "Bolt",
    description: "Spécification complète pour générer un MVP SaaS sur Bolt",
    isPremium: true,
    content: `You are building a SaaS MVP on Bolt for: [PRODUCT IDEA].

## Users
- Primary: [USER TYPE]
- Job to be done: [JTBD]

## MVP scope (strict — no feature creep)
1. Auth (email/password mock ok)
2. Onboarding 2 steps
3. Main dashboard with [CORE METRIC]
4. CRUD for [MAIN ENTITY]
5. Settings + logout

## UI
- Dark theme, startup AI aesthetic (black/white, clean typography)
- Mobile responsive
- Empty states with helpful copy in French

## Data model
List entities with fields and relations before coding.

## Process
Step 1: propose schema + routes
Step 2: implement shell layout
Step 3: implement core flow end-to-end
Step 4: polish

Use realistic French microcopy. No lorem ipsum.`,
  },
  {
    title: "Campagne Meta Ads (3 angles)",
    category: "Marketing",
    targetAi: "Claude",
    description: "3 angles créatifs + primary texts + headlines pour Meta",
    isPremium: true,
    content: `Tu es media buyer + copywriter performance (Meta Ads, français).

## Contexte
- Produit : [PRODUIT SaaS / physique]
- Offre : [OFFRE — essai gratuit, -20%, démo]
- Audience : [CIBLE détaillée]
- Landing : [PROMESSE PAGE]

## Mission
Produis 3 angles créatifs distincts (pain / gain / social proof).

Pour chaque angle :
- Nom de l'angle
- Hook vidéo/static (1 phrase)
- Primary text (125 caractères + version 250)
- Headline (5 variantes ≤ 40 caractères)
- Description lien
- CTA recommandé
- Idée visuel (description pour designer ou IA image)

## Contraintes
- Conformité Meta : pas de promesses médicales/financières non sourcées
- Intégrer [MOTS-CLÉS SEO optionnels]
- Tableau récap en fin : angle → KPI à surveiller (CTR, CPL…)

Demande confirmation du budget cible si absent : [BUDGET ou « inconnu »].`,
  },
  {
    title: "Audit code + plan refactor",
    category: "Développement",
    targetAi: "Cursor",
    description: "Revue fichier/dossier avec risques, dette, plan refactor priorisé",
    isPremium: true,
    content: `Tu es staff engineer — code review constructive (TypeScript/React/Next.js).

## Contexte
- Fichier(s) ou dossier : [CHEMINS]
- Objectif business : [MAINTENABILITÉ / PERF / SÉCURITÉ / SHIP FEATURE X]

## Mission
1. Résumer l'intention actuelle du code (5 lignes max)
2. Lister les problèmes par sévérité : 🔴 critique 🟠 majeur 🟡 mineur
3. Pour chaque 🔴/🟠 : extrait concerné + fix recommandé (snippet)
4. Plan refactor en 3 PRs ordonnées (scope minimal par PR)
5. Tests manquants suggérés

## Contraintes
- Ne pas réécrire tout le repo — changements incrémentaux
- Respecter le style existant
- Signaler incertitudes (« à vérifier : … »)

Ne modifie pas le code tant que je n'ai pas validé le plan. Commence par l'analyse seule.`,
  },
  {
    title: "Pitch deck startup (10 slides)",
    category: "Business",
    targetAi: "ChatGPT",
    description: "Structure et copy slide par slide pour investisseurs",
    isPremium: true,
    content: `Tu es advisor startup (pre-seed / seed) — pitch decks qui closent des meetings.

## Contexte startup
- Nom : [STARTUP]
- One-liner : [VALUE PROP]
- Marché : [MARCHÉ + TAM/SAM/SOM si connu]
- Traction : [MÉTRIQUES — users, MRR, croissance]
- Modèle : [PRICING]
- Levée : [MONTANT] pour [USAGE fonds]

## Mission
Rédige le contenu textuel de 10 slides (titre slide + bullets speaker notes).

Slides :
1. Hook / vision
2. Problème (données + émotion)
3. Solution (démo narrative)
4. Pourquoi maintenant
5. Produit (3 features clés)
6. Business model
7. Traction & milestones
8. Go-to-market
9. Équipe (rôles + edge)
10. Ask + contact

## Contraintes
- Bullets ≤ 6 par slide
- Notes speaker : 30–45 sec de parole chacune
- Ton : confiant, factuel, pas hype vide
- Slide « Competition » : 2x2 positioning verbal

Format markdown, prêt pour Gamma/Canva.`,
  },
  {
    title: "UI app mobile FlutterFlow",
    category: "No-code",
    targetAi: "Bolt",
    description: "Spéc UX écrans + composants pour app mobile no-code",
    isPremium: false,
    content: `Tu es product designer + no-code lead (app mobile).

## App
- Concept : [APP — ex. suivi habitudes]
- Users : [PERSONA]
- Plateforme : iOS/Android, style [MINIMAL / COLORFUL]

## Mission
Spécifie l'MVP écran par écran (8 écrans max).

Pour chaque écran :
- Nom route
- Objectif utilisateur
- Composants UI (liste)
- États : empty / loading / error / success
- Copy français (CTA, labels)
- Navigation (d'où → où)

## Livrables additionnels
- Design tokens (couleurs, typo, spacing)
- 5 règles UX non négociables
- Backlog V2 (5 features hors scope)

Format tableau markdown. Pas de code — spec pour builder no-code.`,
  },
  {
    title: "Prompt système agent support client",
    category: "Business",
    targetAi: "Claude",
    description: "System prompt agent IA support SaaS (ton, escalade, limites)",
    isPremium: true,
    content: `Tu rédiges un SYSTEM PROMPT pour un agent support client IA (SaaS B2B).

## Contexte entreprise
- Produit : [SAAS + ce qu'il fait]
- Users types : [PERSONAS]
- Policies : [REMBOURSEMENT, SLA, ESCALADE HUMAIN]
- Ton de marque : [CHALEUREUX PRO / TECHNIQUE]

## Mission
Écris le system prompt complet (2000–3000 tokens) incluant :

1. Rôle et limites (ce que l'agent ne doit jamais faire)
2. Sources de vérité ([docs, FAQ, statut API])
3. Format de réponse (empathie → diagnostic → steps → confirmation)
4. Gestion hors-scope → escalade humaine avec template message
5. 8 exemples few-shot (user → assistant) couvrant : bug, billing, feature request, frustration

## Contraintes
- Français
- Ne jamais inventer de features
- Toujours proposer 1 prochaine étape claire
- Variable [TICKET_ID] pour personnalisation

Livrable : bloc prêt à coller dans API Claude/OpenAI.`,
  },
  {
    title: "Architecture micro SaaS (Replit)",
    category: "Développement",
    targetAi: "Replit",
    description: "API + DB + auth pour micro-SaaS sur Replit",
    isPremium: false,
    content: `You are a senior full-stack engineer building on Replit.

## Product
[DESCRIBE MICRO-SAAS — ex. API wrapper that generates prompts]

## Requirements
- Node.js + Express OR Next.js API routes (choose best for Replit)
- PostgreSQL or SQLite (justify choice for Replit persistence)
- Auth: JWT sessions, bcrypt passwords
- Core endpoints: [LIST]
- Rate limit free tier: [X requests/day]

## Deliverables (in order)
1. File tree explanation
2. Schema SQL / Prisma
3. Implement auth routes
4. Implement core feature routes with validation (zod)
5. README with env vars and deploy steps on Replit

## Quality bar
- Input validation on all routes
- Structured JSON errors
- No secrets in code

Work step by step. After each step, summarize what was done before continuing.`,
  },
];
