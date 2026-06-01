import Script from "next/script";

export function SiteAnalytics() {
  const plausibleDomain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN?.trim();
  const crispId = process.env.NEXT_PUBLIC_CRISP_WEBSITE_ID?.trim();

  return (
    <>
      {plausibleDomain && (
        <Script
          defer
          data-domain={plausibleDomain}
          src="https://plausible.io/js/script.js"
          strategy="afterInteractive"
        />
      )}
      {crispId && (
        <Script id="crisp-chat" strategy="afterInteractive">
          {`
            window.$crisp=[];window.CRISP_WEBSITE_ID="${crispId}";
            (function(){var d=document,s=d.createElement("script");
            s.src="https://client.crisp.chat/l.js";s.async=1;
            d.getElementsByTagName("head")[0].appendChild(s);})();
          `}
        </Script>
      )}
    </>
  );
}
