import { APP_NAME } from "@/lib/constants";

const DEFAULT_SUPPORT_EMAIL = "support@promptpilot.app";

export function getSupportEmail(): string {
  return process.env.SUPPORT_EMAIL?.trim() || DEFAULT_SUPPORT_EMAIL;
}

export function getMailFromAddress(): string {
  const from = process.env.EMAIL_FROM?.trim();
  if (from) return from;
  return `${APP_NAME} <onboarding@resend.dev>`;
}
