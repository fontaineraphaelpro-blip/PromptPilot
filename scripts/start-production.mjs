/**
 * Au démarrage sur Railway : crée/met à jour les tables puis lance Next.js.
 * Nécessite DATABASE_URL dans les variables d'environnement.
 */
import { spawnSync } from "node:child_process";

function run(cmd, args) {
  console.log(`[promptpilot] ${cmd} ${args.join(" ")}`);
  const result = spawnSync(cmd, args, {
    stdio: "inherit",
    shell: true,
    env: process.env,
  });
  if (result.status !== 0) {
    console.error(`[promptpilot] Échec: ${cmd} (code ${result.status})`);
    process.exit(result.status ?? 1);
  }
}

const missing = [];
if (!process.env.DATABASE_URL?.trim()) missing.push("DATABASE_URL");
if (!process.env.AUTH_SECRET?.trim()) missing.push("AUTH_SECRET");

if (missing.length > 0) {
  console.error(
    "[promptpilot] ERREUR — variables manquantes sur Railway:\n" +
      missing.map((v) => `  • ${v}`).join("\n") +
      "\n\nDATABASE_URL:\n" +
      "  1. + New → Database → PostgreSQL\n" +
      "  2. Service web → Variables → Add Reference → Postgres → DATABASE_URL\n\n" +
      "AUTH_SECRET:\n" +
      "  Génère: openssl rand -base64 32\n" +
      "  Variables → AUTH_SECRET = (colle la valeur)\n\n" +
      "Recommandé aussi:\n" +
      "  AUTH_URL = https://ton-app.up.railway.app\n" +
      "  NEXT_PUBLIC_APP_URL = (même URL)\n"
  );
  process.exit(1);
}

console.log("[promptpilot] Synchronisation du schéma PostgreSQL…");
run("npx", ["prisma", "db", "push", "--skip-generate"]);

console.log("[promptpilot] Seed des templates (si vide)…");
const seed = spawnSync("npx", ["prisma", "db", "seed"], {
  stdio: "inherit",
  shell: true,
  env: process.env,
});
if (seed.status !== 0) {
  console.warn("[promptpilot] Seed ignoré ou déjà fait (non bloquant).");
}

console.log("[promptpilot] Démarrage Next.js…");
run("npx", [
  "next",
  "start",
  "--hostname",
  "0.0.0.0",
  "-p",
  process.env.PORT || "3000",
]);
