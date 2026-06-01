import { GA_MEASUREMENT_ID, getGoogleAnalyticsInlineScript } from "@/lib/analytics/ga";

/**
 * Snippet Google officiel dans <head> (détecté par l’assistant de configuration GA).
 * Ne pas charger en afterInteractive : l’outil Google ne voit pas la balise.
 */
export function GoogleAnalytics() {
  return (
    <>
      <script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
      />
      <script
        dangerouslySetInnerHTML={{
          __html: getGoogleAnalyticsInlineScript(GA_MEASUREMENT_ID),
        }}
      />
    </>
  );
}
