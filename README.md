# PromptPilot

SaaS qui transforme une idée vague en prompt ultra détaillé, optimisé pour l'IA choisie (ChatGPT, Claude, Cursor, Midjourney, Sora, etc.).

## Stack

- **Next.js 16** (App Router) + TypeScript
- **Tailwind CSS 4** + composants style shadcn/ui
- **Railway PostgreSQL** — Base de données + utilisateurs (Prisma)
- **NextAuth** — Authentification email / mot de passe (JWT)
- **OpenAI API** — Génération de prompts (`gpt-4o-mini`)
- **Stripe** — Abonnements Pro / Creator
- **Zod** + React Hook Form — Validation

Guide de mise en production : voir **[DEPLOY.md](./DEPLOY.md)**.

## Démarrage rapide

```bash
cd promptpilot
npm install
cp .env.example .env.local
# Remplir .env.local (voir ci-dessous)
npm run db:push
npm run db:seed
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000).

## Configuration

### 1. Base de données Railway (PostgreSQL)

1. Sur [railway.app](https://railway.app) → **+ New** → **Database** → **PostgreSQL**.
2. Lie `DATABASE_URL` au service web (Add Reference).
3. En local : copie `DATABASE_URL` dans `.env.local`.

```bash
npm run db:push   # crée les tables (users, profiles, prompts…)
npm run db:seed   # templates initiaux
```

Au déploiement, `railway.toml` exécute `prisma db push` + seed automatiquement.

### 2. Authentification (NextAuth)

```bash
openssl rand -base64 32
```

```
AUTH_SECRET=...
AUTH_URL=https://ton-app.up.railway.app
NEXT_PUBLIC_APP_URL=https://ton-app.up.railway.app
```

### 3. OpenAI

`OPENAI_API_KEY=sk-...` sur [platform.openai.com](https://platform.openai.com/api-keys)

### 4. Stripe

- Abonnements Pro (9€) et Creator (19€) → Price IDs
- `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`
- Webhook : `https://TON-URL/api/stripe/webhook`

### 5. Variables Railway (récap)

| Variable | Obligatoire |
|----------|-------------|
| `DATABASE_URL` | ✅ |
| `AUTH_SECRET` | ✅ |
| `AUTH_URL` | ✅ (URL publique Railway) |
| `NEXT_PUBLIC_APP_URL` | ✅ |
| `OPENAI_API_KEY` | ✅ |
| `STRIPE_*` | Pour les paiements |

## Pages

| Route | Description |
|-------|-------------|
| `/` | Landing page |
| `/login`, `/signup` | Auth email / mot de passe |
| `/dashboard` | Tableau de bord |
| `/generate` | Générateur de prompts |
| `/history` | Historique |
| `/favorites` | Favoris |
| `/templates` | Templates premium |
| `/pricing` | Tarifs + checkout |
| `/settings` | Paramètres |

## API Routes

- `POST /api/auth/register` — Inscription
- `GET/POST /api/auth/[...nextauth]` — Sessions NextAuth
- `POST /api/generate-prompt` — Génération OpenAI
- `POST /api/stripe/checkout` — Checkout
- `POST /api/stripe/webhook` — Webhook plan
- `PATCH /api/prompts/[id]/favorite` — Favori
- `DELETE /api/prompts/[id]` — Suppression

## Scripts

```bash
npm run dev
npm run build
npm run db:push
npm run db:seed
npm run ship    # commit + push GitHub
```

## Migration depuis Supabase

Si tu avais des comptes Supabase : les utilisateurs doivent **se réinscrire** (mots de passe stockés sur Railway PostgreSQL maintenant).

## Licence

PromptPilot © 2026
