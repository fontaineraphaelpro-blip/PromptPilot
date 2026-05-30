-- ⚠️ OBSOLÈTE — La base de données est sur Railway PostgreSQL + Prisma.
-- Voir prisma/schema.prisma et npm run db:push
-- Ce fichier est conservé uniquement comme référence historique.

-- PromptPilot Supabase Schema (legacy)
-- Run in Supabase SQL Editor

-- Profiles
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  plan TEXT NOT NULL DEFAULT 'free' CHECK (plan IN ('free', 'pro', 'creator')),
  stripe_customer_id TEXT,
  stripe_subscription_id TEXT,
  preferred_language TEXT DEFAULT 'Français',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Prompts history
CREATE TABLE IF NOT EXISTS prompts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  original_idea TEXT NOT NULL,
  target_ai TEXT NOT NULL,
  task_type TEXT NOT NULL,
  detail_level TEXT NOT NULL,
  tone TEXT NOT NULL,
  language TEXT NOT NULL DEFAULT 'Français',
  generated_prompt TEXT NOT NULL,
  short_variant TEXT NOT NULL DEFAULT '',
  detailed_variant TEXT NOT NULL DEFAULT '',
  expert_variant TEXT NOT NULL DEFAULT '',
  ai_tips TEXT NOT NULL DEFAULT '',
  is_favorite BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS prompts_user_id_idx ON prompts(user_id);
CREATE INDEX IF NOT EXISTS prompts_created_at_idx ON prompts(created_at DESC);
CREATE INDEX IF NOT EXISTS prompts_is_favorite_idx ON prompts(is_favorite) WHERE is_favorite = TRUE;

-- Daily usage tracking
CREATE TABLE IF NOT EXISTS daily_usage (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  prompt_count INTEGER NOT NULL DEFAULT 0,
  UNIQUE(user_id, date)
);

-- Templates
CREATE TABLE IF NOT EXISTS templates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  target_ai TEXT NOT NULL,
  description TEXT NOT NULL,
  content TEXT NOT NULL,
  is_premium BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (user_id, email)
  VALUES (NEW.id, NEW.email);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Updated_at trigger
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS profiles_updated_at ON profiles;
CREATE TRIGGER profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE prompts ENABLE ROW LEVEL SECURITY;
ALTER TABLE daily_usage ENABLE ROW LEVEL SECURITY;
ALTER TABLE templates ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = user_id);

-- Prompts policies
CREATE POLICY "Users can view own prompts"
  ON prompts FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own prompts"
  ON prompts FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own prompts"
  ON prompts FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own prompts"
  ON prompts FOR DELETE
  USING (auth.uid() = user_id);

-- Daily usage policies
CREATE POLICY "Users can view own usage"
  ON daily_usage FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own usage"
  ON daily_usage FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own usage"
  ON daily_usage FOR UPDATE
  USING (auth.uid() = user_id);

-- Templates: public read
CREATE POLICY "Anyone can read templates"
  ON templates FOR SELECT
  TO authenticated, anon
  USING (true);

-- Seed templates
INSERT INTO templates (title, category, target_ai, description, content, is_premium) VALUES
('Landing page SaaS', 'Business', 'ChatGPT', 'Structure pour une page d''accueil SaaS convaincante', 'Tu es un copywriter SaaS expert. Crée une landing page pour [produit] avec hero, bénéfices, social proof, pricing et CTA.', false),
('Post LinkedIn viral', 'Marketing', 'Claude', 'Post LinkedIn engageant avec hook fort', 'Tu es un expert LinkedIn. Rédige un post sur [sujet] avec hook, storytelling, valeur et CTA. Ton : professionnel mais accessible.', false),
('Prompt Midjourney produit', 'Création image', 'Midjourney', 'Photo produit e-commerce premium', 'Product photography of [produit], studio lighting, white background, 8k, commercial photography --ar 1:1 --v 6', false),
('Vidéo pub 15s', 'Création vidéo', 'Runway', 'Publicité courte cinématique', 'Cinematic 15s ad: [produit], dynamic camera, golden hour, smooth transitions, premium brand feel', true),
('App dashboard Next.js', 'Développement', 'Cursor', 'Application dashboard complète', 'Crée une app Next.js 14 avec App Router: dashboard, auth mock, sidebar, tables, charts. Stack: TypeScript, Tailwind, shadcn/ui. Procède étape par étape.', true),
('Store e-commerce', 'E-commerce', 'Lovable', 'Boutique en ligne moderne', 'Build a modern e-commerce store with product grid, cart, checkout UI, filters. Design: minimal, premium. Mobile-first.', true),
('Thread Twitter', 'Réseaux sociaux', 'ChatGPT', 'Thread éducatif 8 tweets', 'Crée un thread Twitter de 8 tweets sur [sujet]. Hook puissant, une idée par tweet, CTA final.', false),
('Analyse SWOT', 'Productivité', 'Gemini', 'Analyse stratégique rapide', 'Réalise une analyse SWOT détaillée pour [projet/entreprise]. Format tableau, recommandations actionnables.', false),
('Prompt Sora cinéma', 'Création vidéo', 'Sora', 'Scène cinématographique IA', 'Cinematic scene: [description], 24fps film grain, anamorphic lens, dramatic lighting, slow dolly in, 10 seconds', true),
('Composant React', 'Développement', 'Replit', 'Composant UI réutilisable', 'Crée un composant React TypeScript [nom] avec props typées, Tailwind, accessibilité ARIA, Storybook-ready.', false)
ON CONFLICT DO NOTHING;
