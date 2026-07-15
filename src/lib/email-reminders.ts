import { sendEmail } from "@/lib/email";
import { getAppUrl } from "@/lib/env";
import { APP_NAME, FREE_LIFETIME_LIMIT } from "@/lib/constants";

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
    subject: `Quota gratuit épuisé — ${APP_NAME}`,
    html: `
      <p>Vous avez utilisé vos ${FREE_LIFETIME_LIMIT} générations gratuites.</p>
      <p><a href="${appUrl}/pricing?plan=pro"><strong>Passer Pro (19€/mois)</strong></a> — Expert inclus à chaque brief, annulation en 1 clic.</p>
      <p style="color:#888;font-size:14px">Sinon : <a href="${appUrl}/pricing#credits">un pack de crédits</a> pour un besoin ponctuel.</p>
    `,
  });
}
