-- Commerce : crédits packs, Expert one-shot, workflows
ALTER TABLE "profiles" ADD COLUMN IF NOT EXISTS "prompt_credits" INTEGER NOT NULL DEFAULT 0;
ALTER TABLE "profiles" ADD COLUMN IF NOT EXISTS "workflow_unlocked" BOOLEAN NOT NULL DEFAULT false;
ALTER TABLE "prompts" ADD COLUMN IF NOT EXISTS "expert_unlocked" BOOLEAN NOT NULL DEFAULT false;
