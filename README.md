# PromptPilot

SaaS qui transforme une idée vague en prompt ultra détaillé, optimisé pour l'IA choisie (ChatGPT, Claude, Cursor, Midjourney, Sora, etc.).

## Stack

- **Next.js 16** (App Router) + TypeScript
- **Tailwind CSS 4** + composants style shadcn/ui
- **Supabase** — Auth + PostgreSQL + RLS
- **OpenAI API** — Génération de prompts (`gpt-4o-mini`)
- **Stripe** — Abonnements Pro / Creator
- **Zod** + React Hook Form — Validation

## Démarrage rapide

```bash
cd promptpilot
npm install
cp .env.example .env.local
# Remplir .env.local (voir ci-dessous)
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000).

## Configuration

### 1. Supabase

1. Créer un projet sur [supabase.com](https://supabase.com).
2. **SQL Editor** → exécuter le fichier `supabase/schema.sql`.
3. **Authentication** → activer Email provider.
4. **Settings → API** → copier :
   - `Project URL` → `NEXT_PUBLIC_SUPABASE_URL`
   - `anon public` → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `service_role` → `SUPABASE_SERVICE_ROLE_KEY` (webhook Stripe uniquement, jamais côté client)
5. **Authentication → URL Configuration** :
   - Site URL : `http://localhost:3000`
   - Redirect URLs : `http://localhost:3000/auth/callback`

### 2. OpenAI

1. Créer une clé sur [platform.openai.com](https://platform.openai.com/api-keys).
2. `OPENAI_API_KEY=sk-...`

### 3. Stripe

1. Créer un compte [stripe.com](https://stripe.com) (mode Test).
2. **Products** → créer 2 abonnements récurrents :
   - Pro — 9€/mois → copier le **Price ID** → `NEXT_PUBLIC_STRIPE_PRO_PRICE_ID`
   - Creator — 19€/mois → **Price ID** → `NEXT_PUBLIC_STRIPE_CREATOR_PRICE_ID`
3. **Developers → API keys** → `STRIPE_SECRET_KEY`
4. Webhook local (Stripe CLI) :

```bash
stripe listen --forward-to localhost:3000/api/stripe/webhook
```

Copier le signing secret → `STRIPE_WEBHOOK_SECRET`

5. Activer le **Customer Portal** dans Stripe Dashboard → Settings → Billing → Customer portal.

### 4. App URL

```
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## Pages

| Route | Description |
|-------|-------------|
| `/` | Landing page |
| `/login`, `/signup` | Auth Supabase |
| `/dashboard` | Tableau de bord |
| `/generate` | Générateur de prompts |
| `/history` | Historique |
| `/history/[id]` | Détail prompt |
| `/favorites` | Favoris |
| `/templates` | Templates premium |
| `/pricing` | Tarifs + checkout |
| `/settings` | Paramètres |
| `/settings/billing` | Portail Stripe |

## API Routes

- `POST /api/generate-prompt` — Génération OpenAI + sauvegarde
- `POST /api/stripe/checkout` — Session Checkout
- `POST /api/stripe/webhook` — Mise à jour plan
- `POST /api/stripe/portal` — Customer Portal
- `PATCH /api/prompts/[id]/favorite` — Toggle favori

## Plans

| Plan | Prix | Prompts/jour |
|------|------|----------------|
| Free | 0€ | 3 |
| Pro | 9€/mois | Illimité |
| Creator | 19€/mois | Illimité + variantes avancées |

## Structure

```
src/
├── app/           # Routes App Router
├── components/    # UI, landing, generate, history…
├── hooks/
├── lib/           # Supabase, OpenAI, Stripe, validations
├── types/
supabase/
└── schema.sql
```

## Scripts

```bash
npm run dev      # Développement
npm run build    # Build production
npm run start    # Production
npm run lint     # ESLint
npm run hooks    # Activer push auto après chaque git commit
npm run ship     # git add + commit + push (message: npm run ship -- "mon message")
```

### Push GitHub à chaque modification

1. Une fois : `npm run hooks` (push automatique après chaque `git commit`)
2. Ou en une commande : `npm run ship` ou `npm run ship -- "description des changements"`

```bash
git add -A && git commit -m "fix: navbar"   # → push auto si hooks activés
```

## TODO restants

- [ ] Suppression de compte (GDPR) avec cascade Supabase
- [ ] Préférence de langue modifiable dans settings
- [ ] Brand voice (plan Creator)
- [ ] Exports PDF/JSON des prompts
- [ ] Rate limiting API (Upstash)
- [ ] Tests E2E (Playwright)
- [ ] Email transactionnels (Resend)
- [ ] OAuth Google/GitHub

## Licence

Projet privé — PromptPilot © 2026
