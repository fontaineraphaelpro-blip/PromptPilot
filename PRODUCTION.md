# Checklist production PromptPilot

## Variables Railway obligatoires

| Variable | Description |
|----------|-------------|
| `DATABASE_URL` | PostgreSQL (référence Railway) |
| `AUTH_SECRET` | `openssl rand -base64 32` |
| `AUTH_URL` | URL publique de l'app |
| `NEXT_PUBLIC_APP_URL` | **https://www.promptpilot.fr** (domaine affiché aux utilisateurs) |
| `AUTH_URL` | Idem |

## Google Search Console

1. Propriété : `https://www.promptpilot.fr/`
2. Sitemap : `https://www.promptpilot.fr/sitemap.xml`
3. Vérifier `https://www.promptpilot.fr/robots.txt` → ligne `Sitemap:` doit pointer vers **www.promptpilot.fr**, pas Railway
4. Après changement d’URL sur Railway → **redéployer** (sitemap généré au runtime)
| `OPENAI_API_KEY` | Clé OpenAI + budget/plafond activé |

## Upgrade Pro (app)

`NEXT_PUBLIC_SALES_MODE` (défaut actif) : bannière upgrade sur le **dashboard** pour les comptes Free. La home pousse l’inscription gratuite, pas le checkout Pro.

Désactiver les prompts upgrade in-app : `NEXT_PUBLIC_SALES_MODE=false`.

Sans `NEXT_PUBLIC_STRIPE_*_PRICE_ID`, une bannière admin s’affiche en haut du site marketing.

## Paiements Stripe

1. Créer produits Pro (9€/mois) et Creator (19€/mois)
2. Configurer `NEXT_PUBLIC_STRIPE_PRO_PRICE_ID` et `NEXT_PUBLIC_STRIPE_CREATOR_PRICE_ID`
3. Webhook : `https://VOTRE-URL/api/stripe/webhook`  
   Événements : `checkout.session.completed`, `customer.subscription.updated`, `customer.subscription.deleted`
4. (Optionnel) Tarifs annuels : `NEXT_PUBLIC_STRIPE_*_PRICE_ID_YEARLY`

## Emails (recommandé)

1. Compte [Resend](https://resend.com) + domaine vérifié
2. `RESEND_API_KEY` + `EMAIL_FROM` + `SUPPORT_EMAIL`

Sans Resend : reset password et bienvenue ne partent pas (logs console uniquement).

## Analytics & support (optionnel)

- `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` — stats visites
- `NEXT_PUBLIC_CRISP_WEBSITE_ID` — chat support

## Avant lancement

- [ ] Test : inscription → génération → paiement Pro → plan actif
- [ ] Test : reset mot de passe (avec Resend)
- [ ] Test : suppression compte (Paramètres)
- [ ] `SUPPORT_EMAIL` = votre vraie adresse
- [ ] Pages `/contact`, `/privacy`, `/terms` relues

## Tests automatisés

```bash
npm install
npm run build
npm run test:e2e   # nécessite app sur :3000 ou CI avec PLAYWRIGHT_BASE_URL
```
