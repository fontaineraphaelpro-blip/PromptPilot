import { z } from "zod";

/** Railway colle parfois l'URL sans https:// — Next.js exige une URL valide au build. */
export function normalizeAppUrl(raw?: string | null): string {
  const value = raw?.trim();
  if (!value) return "http://localhost:3000";
  if (/^https?:\/\//i.test(value)) return value.replace(/\/$/, "");
  return `https://${value.replace(/\/$/, "")}`;
}

const serverSchema = z.object({
  DATABASE_URL: z.string().min(1),
  AUTH_SECRET: z.string().min(16),
  OPENAI_API_KEY: z.string().min(1).optional(),
  STRIPE_SECRET_KEY: z.string().min(1).optional(),
  STRIPE_WEBHOOK_SECRET: z.string().min(1).optional(),
  STRIPE_PRO_PRICE_ID: z.string().optional(),
  STRIPE_CREATOR_PRICE_ID: z.string().optional(),
  NEXT_PUBLIC_APP_URL: z.string().optional(),
  NEXT_PUBLIC_STRIPE_PRO_PRICE_ID: z.string().optional(),
  NEXT_PUBLIC_STRIPE_CREATOR_PRICE_ID: z.string().optional(),
});

export type ServerEnv = z.infer<typeof serverSchema>;

let cached: ServerEnv | null = null;

export function getServerEnv(): ServerEnv {
  if (cached) return cached;
  const parsed = serverSchema.safeParse(process.env);
  if (!parsed.success) {
    const missing = parsed.error.issues.map((i) => i.path.join(".")).join(", ");
    throw new Error(`Variables d'environnement invalides: ${missing}`);
  }
  cached = parsed.data;
  return cached;
}

export function isOpenAIConfigured(): boolean {
  return Boolean(process.env.OPENAI_API_KEY?.trim());
}

export function isStripeConfigured(): boolean {
  return Boolean(
    process.env.STRIPE_SECRET_KEY?.trim() &&
      process.env.NEXT_PUBLIC_STRIPE_PRO_PRICE_ID?.trim()
  );
}

export function getAppUrl(): string {
  return normalizeAppUrl(process.env.NEXT_PUBLIC_APP_URL);
}
