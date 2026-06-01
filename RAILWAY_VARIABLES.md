# Variables Railway — à faire une seule fois

Le build réussit, mais le **conteneur s’arrête** tant que ces variables ne sont pas sur le **service web** (PromptPilot), pas sur Postgres.

## Étape A — PostgreSQL

1. Ouvre ton **projet** Railway (vue avec plusieurs services).
2. Si tu n’as **pas** de base : **+ Create** → **Database** → **PostgreSQL**.
3. Attends le statut **Active** sur Postgres.

## Étape B — Lier DATABASE_URL

1. Clique sur le service **PromptPilot** (ton app Next.js).
2. Onglet **Variables**.
3. **+ New Variable** → **Add Variable Reference** (ou « Reference »).
4. Service source : **PostgreSQL** (ou le nom de ta base).
5. Variable : **`DATABASE_URL`**.
6. Enregistre.

Tu dois voir une ligne du type :

`DATABASE_URL` = `${{Postgres.DATABASE_URL}}`

## Étape C — AUTH_SECRET

1. Toujours sur **Variables** du service web.
2. **+ New Variable** → nom : `AUTH_SECRET`
3. Valeur : une chaîne aléatoire longue (ex. générée avec Node) :

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

4. Colle le résultat **sans espaces** dans Railway.

## Étape D — URLs publiques

1. Service web → **Settings** → copie l’URL publique (ex. `https://promptpilot-production-xxxx.up.railway.app`).
2. Ajoute ces variables (remplace par **ton** URL) :

| Nom | Valeur |
|-----|--------|
| `AUTH_URL` | `https://www.promptpilot.fr` (domaine custom — avec **https://**) |
| `NEXT_PUBLIC_APP_URL` | **même URL** — utilisée par le sitemap, robots.txt, OG, Stripe |

**Search Console :** la propriété doit être `https://www.promptpilot.fr/` et le sitemap soumis : `https://www.promptpilot.fr/sitemap.xml`. Si ces variables pointent encore vers `*.railway.app`, Google signalera des erreurs d’URL.

Si tu mets seulement `xxx.up.railway.app` sans `https://`, le code corrige au runtime — mais préfère toujours le préfixe complet.

## Étape E — Redéployer

1. **Deployments** → **Redeploy** (ou push Git).
2. Logs attendus :

```
[promptpilot] Synchronisation du schéma PostgreSQL…
[promptpilot] Démarrage Next.js…
```

3. Test : `https://TON-URL/api/health` → `{"status":"ok","database":"ok"}`

## Optionnel

| Variable | Usage |
|----------|--------|
| `OPENAI_API_KEY` | Génération de prompts |
| `STRIPE_SECRET_KEY` | Paiements |
| `STRIPE_WEBHOOK_SECRET` | Webhooks Stripe (obligatoire en prod) |
| `NEXT_PUBLIC_STRIPE_PRO_PRICE_ID` | ID `price_...` **ou** lien `https://buy.stripe.com/...` pour le Pro (9€) |
| `NEXT_PUBLIC_STRIPE_CREATOR_PRICE_ID` | ID `price_...` **ou** Payment Link pour le Creator (19€) |
| `STRIPE_PRO_PRICE_ID` | (Optionnel) Vrai `price_...` si tu utilises des Payment Links — pour les webhooks |
| `STRIPE_CREATOR_PRICE_ID` | (Optionnel) Idem pour Creator |

### Stripe — configuration correcte

**Erreur `No such price: https://buy.stripe.com/...`** : tu as collé un **Payment Link** là où Stripe attend un **Price ID**.

Deux options :

1. **Recommandé** — Stripe Dashboard → **Produits** → ton abonnement → **Tarifs** → copie l’ID `price_...` dans `NEXT_PUBLIC_STRIPE_PRO_PRICE_ID` et `NEXT_PUBLIC_STRIPE_CREATOR_PRICE_ID`.

2. **Payment Links** — tu peux garder `https://buy.stripe.com/...` dans ces variables (le code redirige directement). Ajoute aussi `STRIPE_PRO_PRICE_ID` / `STRIPE_CREATOR_PRICE_ID` avec les vrais `price_...` pour que les webhooks mettent à jour le plan automatiquement.

---

**Erreur fréquente :** variables ajoutées sur **Postgres** au lieu du **service web**. Elles doivent être sur l’app Next.js.
