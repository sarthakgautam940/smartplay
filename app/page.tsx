import { HomeSections } from "@/components/marketing/home-sections";
import { MarketingHero } from "@/components/marketing/marketing-hero";
import { PublicShell } from "@/components/marketing/public-shell";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://smartplay.app";

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}#organization`,
      name: "Smartplay",
      url: SITE_URL,
      logo: `${SITE_URL}/icon.svg`,
      description:
        "Youth soccer performance intelligence for athletes 13–19 and the adults around them.",
      sameAs: [],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}#website`,
      url: SITE_URL,
      name: "Smartplay",
      publisher: { "@id": `${SITE_URL}#organization` },
      inLanguage: "en-US",
    },
    {
      "@type": "SoftwareApplication",
      name: "Smartplay Player Membership",
      applicationCategory: "SportsApplication",
      operatingSystem: "Web",
      url: `${SITE_URL}/pricing`,
      offers: {
        "@type": "Offer",
        price: "12",
        priceCurrency: "USD",
        priceSpecification: {
          "@type": "UnitPriceSpecification",
          price: "12",
          priceCurrency: "USD",
          referenceQuantity: {
            "@type": "QuantitativeValue",
            value: 1,
            unitText: "MONTH",
          },
        },
        availability: "https://schema.org/InStock",
      },
      description:
        "One connected place for training, recovery, nutrition, mindset, film, goals, and recruiting profile. 14-day free trial, no card upfront.",
    },
  ],
};

export default function Home() {
  return (
    <PublicShell>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <MarketingHero />
      <HomeSections />
    </PublicShell>
  );
}
