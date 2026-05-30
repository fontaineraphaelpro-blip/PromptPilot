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
| `AUTH_URL` | `https://promptpilot-production-a994.up.railway.app` (avec **https://**) |
| `NEXT_PUBLIC_APP_URL` | même URL avec **https://** |

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

---

**Erreur fréquente :** variables ajoutées sur **Postgres** au lieu du **service web**. Elles doivent être sur l’app Next.js.
