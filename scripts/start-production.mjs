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

if (!process.env.DATABASE_URL) {
  console.error(
    "[promptpilot] ERREUR: DATABASE_URL manquante.\n" +
      "Sur Railway: ajoute un service PostgreSQL et lie DATABASE_URL au service web\n" +
      "(Variables → Add Reference → Postgres → DATABASE_URL)."
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
