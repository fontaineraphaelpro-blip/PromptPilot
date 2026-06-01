import { APP_NAME } from "@/lib/constants";
import { getAppUrl } from "@/lib/env";
import { LANDING_FAQS } from "@/lib/faq-data";
import { FaqJsonLd } from "@/components/seo/json-ld";

export function HomeSeoJsonLd() {
  const url = getAppUrl();
  const software = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: APP_NAME,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
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
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(software) }}
      />
      <FaqJsonLd items={LANDING_FAQS.map((f) => ({ question: f.q, answer: f.a }))} />
    </>
  );
}
