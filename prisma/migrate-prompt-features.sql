-- Migration additive v1.4 — sans supprimer de données
-- Exécutée automatiquement si prisma db push échoue sur Railway

ALTER TABLE "prompts" ADD COLUMN IF NOT EXISTS "tags" TEXT[] NOT NULL DEFAULT '{}';
ALTER TABLE "prompts" ADD COLUMN IF NOT EXISTS "prompt_score" INTEGER;
ALTER TABLE "prompts" ADD COLUMN IF NOT EXISTS "score_breakdown" JSONB;
ALTER TABLE "prompts" ADD COLUMN IF NOT EXISTS "preview_summary" TEXT NOT NULL DEFAULT '';
ALTER TABLE "prompts" ADD COLUMN IF NOT EXISTS "preview_questions" TEXT[] NOT NULL DEFAULT '{}';
ALTER TABLE "prompts" ADD COLUMN IF NOT EXISTS "share_token" TEXT;
ALTER TABLE "prompts" ADD COLUMN IF NOT EXISTS "share_enabled" BOOLEAN NOT NULL DEFAULT false;

-- Contrainte unique (NULL autorisé plusieurs fois en PostgreSQL)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'prompts_share_token_key'
  ) THEN
    ALTER TABLE "prompts" ADD CONSTRAINT "prompts_share_token_key" UNIQUE ("share_token");
  END IF;
END $$;

CREATE INDEX IF NOT EXISTS "prompts_share_token_idx" ON "prompts"("share_token");
