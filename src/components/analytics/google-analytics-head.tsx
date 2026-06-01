import { GA_MEASUREMENT_ID, getGoogleAnalyticsInlineScript } from "@/lib/analytics/ga";

/**
 * Balises Google officielles dans <head>.
 * Ne pas utiliser next/script (beforeInteractive) : en prod Next ne met qu’un preload,
 * pas le script gtag.js → l’assistant Google affiche « non détectée ».
 */
export function GoogleAnalyticsHead() {
  return (
    <>
      {/* eslint-disable-next-line @next/next/no-sync-scripts */}
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
