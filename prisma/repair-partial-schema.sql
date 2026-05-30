-- Répare un schéma PostgreSQL partiel (user_id en text au lieu de uuid)
DROP TABLE IF EXISTS "daily_usage" CASCADE;
DROP TABLE IF EXISTS "prompts" CASCADE;
DROP TABLE IF EXISTS "profiles" CASCADE;
