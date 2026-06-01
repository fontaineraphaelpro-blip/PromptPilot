/**
 * ID de mesure GA4 (public).
 * Dans GA4 → Flux de données, l’URL du site doit être exactement :
 * https://www.promptpilot.fr (avec https et www).
 */
/** ID fixe fourni par Google — évite un mauvais ID dans les variables Railway. */
export const GA_MEASUREMENT_ID = "G-ML5QFPTM8H";

export function getGoogleAnalyticsInlineScript(measurementId: string): string {
  return `
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', '${measurementId}');
  `.trim();
}
