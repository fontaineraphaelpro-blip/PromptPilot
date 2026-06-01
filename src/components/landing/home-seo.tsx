import { APP_NAME } from "@/lib/constants";
import { getBrandLogoUrl } from "@/lib/brand/logo-url";
import { getAppUrl } from "@/lib/env";
import { LANDING_FAQS } from "@/lib/faq-data";
import { FaqJsonLd } from "@/components/seo/json-ld";

export function HomeSeoJsonLd() {
  const url = getAppUrl();
  const logo = getBrandLogoUrl();

  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: APP_NAME,
    url,
    logo,
    sameAs: [] as string[],
  };

  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: APP_NAME,
    url,
    publisher: { "@id": `${url}/#organization` },
    inLanguage: "fr-FR",
  };

  const software = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: APP_NAME,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    image: logo,
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "EUR",
    },
    description:
      "Générateur de prompts IA experts pour ChatGPT, Claude, Cursor, Midjourney et plus. Score qualité, preview et variantes.",
    url,
    inLanguage: "fr-FR",
  };

  return (
    <>
      <script
        id="organization-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({ ...organization, "@id": `${url}/#organization` }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(website) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(software) }}
      />
      <FaqJsonLd items={LANDING_FAQS.map((f) => ({ question: f.q, answer: f.a }))} />
    </>
  );
}
