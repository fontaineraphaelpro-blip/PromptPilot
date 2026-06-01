import { APP_NAME } from "@/lib/constants";
import { getAppUrl } from "@/lib/env";
import { getMailFromAddress, getSupportEmail } from "@/lib/support";

type SendEmailParams = {
  to: string;
  subject: string;
  html: string;
};

export function isEmailConfigured(): boolean {
  return Boolean(process.env.RESEND_API_KEY?.trim());
}

export async function sendEmail({ to, subject, html }: SendEmailParams): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  if (!apiKey) {
    console.warn("[email] RESEND_API_KEY manquant — email non envoyé:", subject, "→", to);
    return false;
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: getMailFromAddress(),
        to: [to],
        subject,
        html,
      }),
    });

    if (!res.ok) {
      const body = await res.text();
      console.error("[email] Resend error:", res.status, body);
      return false;
    }
    return true;
  } catch (error) {
    console.error("[email] send failed:", error);
    return false;
  }
}

export async function sendWelcomeEmail(to: string): Promise<void> {
  const appUrl = getAppUrl();
  await sendEmail({
    to,
    subject: `Bienvenue sur ${APP_NAME}`,
    html: `
      <h1>Bienvenue sur ${APP_NAME}</h1>
      <p>Ton compte est prêt. Génère ton premier prompt expert en 30 secondes.</p>
      <p><a href="${appUrl}/generate">Lancer le générateur</a></p>
      <p>Questions ? Réponds à cet email ou écris-nous : ${getSupportEmail()}</p>
    `,
  });
}

export async function sendPasswordResetEmail(to: string, resetUrl: string): Promise<boolean> {
  return sendEmail({
    to,
    subject: `Réinitialisation de mot de passe — ${APP_NAME}`,
    html: `
      <h1>Réinitialiser ton mot de passe</h1>
      <p>Clique sur le lien ci-dessous (valide 1 heure) :</p>
      <p><a href="${resetUrl}">${resetUrl}</a></p>
      <p>Si tu n'as pas demandé cette réinitialisation, ignore cet email.</p>
      <p>Support : ${getSupportEmail()}</p>
    `,
  });
}
