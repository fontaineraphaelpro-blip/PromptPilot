# Mise en production PromptPilot — Checklist clients

## Variables Railway (obligatoires)

| Variable | Description |
|----------|-------------|
| `DATABASE_URL` | Référence PostgreSQL Railway |
| `AUTH_SECRET` | `openssl rand -base64 32` |
| `AUTH_URL` | URL publique exacte (ex. `https://xxx.up.railway.app`) |
| `NEXT_PUBLIC_APP_URL` | Même URL que AUTH_URL |
| `OPENAI_API_KEY` | Clé API OpenAI active |
| `STRIPE_SECRET_KEY` | Mode live ou test |
| `STRIPE_WEBHOOK_SECRET` | Webhook → `/api/stripe/webhook` |
| `NEXT_PUBLIC_STRIPE_PRO_PRICE_ID` | Price ID abonnement Pro |
| `NEXT_PUBLIC_STRIPE_CREATOR_PRICE_ID` | Price ID abonnement Creator |

## Stripe

1. Créer produits Pro (9€/mois) et Creator (19€/mois)
2. Webhook : `checkout.session.completed`, `customer.subscription.updated`, `customer.subscription.deleted`
3. Activer Customer Portal

## Après déploiement

1. Vérifier `GET /api/health` → `{ "status": "ok", "database": "ok" }`
2. Créer un compte test sur `/signup`
3. Générer un prompt sur `/generate`
4. Tester checkout Pro (mode test Stripe)

## Parcours client

1. Landing `/` → Inscription `/signup`
2. Dashboard → Générer prompt
3. Historique / Favoris / Templates
4. Upgrade `/pricing?plan=pro`
