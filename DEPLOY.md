# Mise en production PromptPilot — Railway

## Pourquoi la base ne se créait pas ?

Sur Railway, ces causes sont fréquentes :

1. **Pas de service PostgreSQL** dans le projet (seulement l’app Next.js).
2. **`DATABASE_URL` non liée** au service web.
3. **`prisma` en devDependencies** → absent en production, `prisma db push` échoue.
4. **`releaseCommand` silencieux** → le déploiement continue même si la DB échoue.

**Correction appliquée :** au chaque démarrage, `scripts/start-production.mjs` exécute `prisma db push` puis lance Next.js.

---

## Étape 1 — Créer PostgreSQL sur Railway

1. Ouvre ton **projet** Railway (pas seulement le repo GitHub).
2. Clique **+ New** → **Database** → **PostgreSQL**.
3. Attends que le service Postgres soit **Active** (vert).

Tu dois avoir **2 services** dans le projet :
- `PromptPilot` (ton app web)
- `Postgres` (ou `PostgreSQL`)

---

## Étape 2 — Lier DATABASE_URL à l’app web

1. Clique sur le service **PromptPilot** (Next.js), pas sur Postgres.
2. Onglet **Variables**.
3. **+ New Variable** → **Add Reference** (ou « Reference Variable »).
4. Choisis le service **Postgres** → variable **`DATABASE_URL`**.
5. **Deploy** / redéploie le service web.

Tu dois voir dans les variables du service web :

```
DATABASE_URL = ${{Postgres.DATABASE_URL}}
```

(syntaxe peut varier selon l’UI Railway)

**Ne colle pas** une URL vide à la main si tu peux utiliser la référence.

---

## Étape 3 — Autres variables obligatoires

| Variable | Exemple |
|----------|---------|
| `AUTH_SECRET` | généré avec `openssl rand -base64 32` |
| `AUTH_URL` | `https://ton-app.up.railway.app` |
| `NEXT_PUBLIC_APP_URL` | même URL |
| `OPENAI_API_KEY` | `sk-...` |

---

## Dépannage — logs que tu vois

### `next start --hostname 0.0.0.0` (sans `[promptpilot]`)

Railway lance une **ancienne** commande ou une commande personnalisée.

1. Service web → **Settings** → **Start Command** → vide ou :
   ```
   node scripts/start-production.mjs
   ```
2. **Redeploy** après un push du dernier code GitHub.

Logs corrects :

```
[promptpilot] Synchronisation du schéma PostgreSQL…
[promptpilot] Démarrage Next.js…
```

### `[auth][error] MissingSecret`

Ajoute **`AUTH_SECRET`** (min. 16 caractères) dans les variables du **service web** :

```bash
openssl rand -base64 32
```

Puis `AUTH_URL` et `NEXT_PUBLIC_APP_URL` = l’URL publique Railway (`https://….up.railway.app`).

### `Environment variable not found: DATABASE_URL`

Le service web n’a pas accès à Postgres → étape 2 ci-dessous.

---

## Étape 4 — Vérifier les logs au déploiement

Dans **Deployments** → dernier deploy → **View logs**, tu dois voir :

```
[promptpilot] Synchronisation du schéma PostgreSQL…
[promptpilot] Démarrage Next.js…
```

Si tu vois :

```
ERREUR: DATABASE_URL manquante
```

→ retour à l’étape 2 (lier Postgres).

---

## Étape 5 — Tester

1. `https://TON-URL/api/health`  
   Réponse attendue : `{"status":"ok","database":"ok"}`

2. Inscription sur `/signup` — si ça marche, les tables `users`, `profiles` existent.

---

## Erreur `user_id` text vs `uuid`

Si les logs affichent `foreign key constraint ... incompatible types: text and uuid` :

1. Le correctif automatique supprime les tables `profiles`, `prompts`, `daily_usage` puis recrée le schéma (les **comptes users** sont conservés).
2. Redéploie après le dernier push GitHub.

En dernier recours : Railway → Postgres → **Reset database** (efface tout), puis redéploie.

---

## Créer la DB manuellement (optionnel)

Dans **Postgres** → **Data** → **Connect** → copie `DATABASE_URL`, puis en local :

```bash
cd promptpilot
# Colle DATABASE_URL dans .env.local
npm run db:setup
```

---

## Stripe

- Webhook : `https://TON-URL/api/stripe/webhook`
- Événements : `checkout.session.completed`, `customer.subscription.updated`, `customer.subscription.deleted`
