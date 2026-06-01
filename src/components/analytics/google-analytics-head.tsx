/**
 * Snippet Google officiel (gtag.js) — identique à celui fourni par GA4 :
 *
 * <script async src="https://www.googletagmanager.com/gtag/js?id=G-ML5QFPTM8H"></script>
 * <script> window.dataLayer ... gtag('config', 'G-ML5QFPTM8H'); </script>
 */
export function GoogleAnalyticsHead() {
  return (
    <>
      {/* eslint-disable-next-line @next/next/no-sync-scripts */}
      <script async src="https://www.googletagmanager.com/gtag/js?id=G-ML5QFPTM8H" />
      {/* eslint-disable-next-line @next/next/no-sync-scripts */}
      <script
        dangerouslySetInnerHTML={{
          __html: `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-ML5QFPTM8H');`,
        }}
      />
    </>
  );
}
