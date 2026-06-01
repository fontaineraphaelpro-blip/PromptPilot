import { sendEmail } from "@/lib/email";
import { getAppUrl } from "@/lib/env";
import { APP_NAME, FREE_DAILY_LIMIT } from "@/lib/constants";

export async function sendDraftReminderEmail(email: string, ideaPreview: string): Promise<void> {
  const appUrl = getAppUrl();
  await sendEmail({
    to: email,
    subject: `Ton idée t'attend sur ${APP_NAME}`,
    html: `
      <p>Tu as une idée en attente sur ${APP_NAME}.</p>
      <p><strong>Aperçu :</strong> ${ideaPreview.slice(0, 200)}</p>
      <p><a href="${appUrl}/generate">Générer mon prompt expert →</a></p>
    `,
  });
}

export async function sendQuotaExhaustedEmail(email: string): Promise<void> {
  const appUrl = getAppUrl();
  await sendEmail({
    to: email,
    subject: `Quota du jour atteint — ${APP_NAME}`,
    html: `
      <p>Vous avez utilisé vos ${FREE_DAILY_LIMIT} générations gratuites aujourd'hui.</p>
      <p><a href="${appUrl}/pricing?plan=pro">Passer au Pro</a> (200/jour) ou revenez demain.</p>
    `,
  });
}
