/**
 * Single Source of Truth for the Gastro Master Organization entity.
 * Used by JSON-LD <script> blocks across all page templates.
 *
 * @id system: stable URIs so other schema nodes can reference these by ID
 *   instead of duplicating the data.
 */

export const SITE_URL = "https://gastro-master.de" as const;

export const ORG_ID = `${SITE_URL}/#organization` as const;
export const WEBSITE_ID = `${SITE_URL}/#website` as const;

/**
 * Site-weite Google-Bewertung (5,0 Sterne bei 131 Bewertungen). Single Source
 * für client-seitige Product-Schemas, damit sie NICHT vom Prerenderer-Wert
 * (REVIEW_META aus google-reviews.json) abweichen — abweichende aggregateRating
 * mit gleicher @id löst in GSC „mehrere zusammengefasste Bewertungen" aus.
 * Bei Wertänderung: hier UND public/data/google-reviews.json (meta) anpassen.
 */
export const SITE_AGGREGATE_RATING = {
  "@type": "AggregateRating",
  ratingValue: "5",
  reviewCount: "131",
  bestRating: "5",
  worstRating: "1",
} as const;

/**
 * Merchant-Listing-Felder für digitale SaaS-Produkte (GSC Batch 2, orange).
 * Software wird nicht physisch geliefert und nicht klassisch zurückgegeben —
 * `MerchantReturnNotPermitted` + kostenlose 0-Tage-„Lieferung" (0 €) nach
 * DE/AT/CH ist der Google-empfohlene, valide Weg. `doesNotShip` NICHT setzen:
 * es widerspricht shippingRate/deliveryTime und löste in GSC Batch 5 „ungültiger
 * Wert in shippingRate/deliveryTime" aus. `shippingDestination` ist Pflichtfeld.
 * In jeden preisbehafteten Product-Offer spreizen.
 * Muss mit DIGITAL_MERCHANT_OFFER_FIELDS im Prerenderer identisch bleiben.
 */
export const DIGITAL_MERCHANT_OFFER_FIELDS = {
  hasMerchantReturnPolicy: {
    "@type": "MerchantReturnPolicy",
    applicableCountry: ["DE", "AT", "CH"],
    returnPolicyCategory: "https://schema.org/MerchantReturnNotPermitted",
  },
  shippingDetails: {
    "@type": "OfferShippingDetails",
    shippingRate: { "@type": "MonetaryAmount", value: "0", currency: "EUR" },
    shippingDestination: [
      { "@type": "DefinedRegion", addressCountry: "DE" },
      { "@type": "DefinedRegion", addressCountry: "AT" },
      { "@type": "DefinedRegion", addressCountry: "CH" },
    ],
    deliveryTime: {
      "@type": "ShippingDeliveryTime",
      handlingTime: { "@type": "QuantitativeValue", minValue: 0, maxValue: 0, unitCode: "DAY" },
      transitTime: { "@type": "QuantitativeValue", minValue: 0, maxValue: 0, unitCode: "DAY" },
    },
  },
} as const;

/**
 * LinkedIn profiles sourced from public/locales/de/ueber-uns.json (team.founders[]).
 * Echte Mitgründer: René Ebert + Sanjaya Pattiyage.
 * Salvatore Anzaldi ist Mitarbeiter (Marketing/SEO), nicht Founder — siehe STAFF.
 */
export const FOUNDERS = {
  sanjayaPattiyage: {
    name: "Sanjaya Pattiyage",
    linkedin: "https://www.linkedin.com/in/sanjaya-pattiyage/",
    role: "Mitgründer & Chef-Entwickler",
  },
  reneEbert: {
    name: "René Ebert",
    linkedin: "https://www.linkedin.com/in/rene-ebert/",
    role: "Mitgründer & CEO",
  },
} as const;

/**
 * Mitarbeitende-Profile (kein Founder-Status, aber legitime Person-Nodes
 * im @graph für Author-Bylines, knowsAbout, etc.).
 */
export const STAFF = {
  salvatoreAnzaldi: {
    name: "Salvatore Anzaldi",
    linkedin: "https://www.linkedin.com/in/salvatore-a-a42711208/",
    role: "Marketing & SEO Operations",
  },
} as const;

/**
 * Public company social profiles (sameAs).
 * Only company-level profiles (Facebook Business, Instagram Business, etc.).
 * Personal founder profiles are used separately in Person schema nodes (not in Organization.sameAs).
 * TODO: Add LinkedIn company-page URL, Google Business listing, Trustpilot profile
 * (currently omitted to avoid hallucinated URLs — add when URLs are confirmed).
 */
export const ORG_SAME_AS = [
  "https://www.facebook.com/gastromasterde",
  "https://www.instagram.com/gastromasterde",
] as const;

export const ORG_NODE = {
  "@type": "Organization",
  "@id": ORG_ID,
  name: "Gastro Master",
  // Rechtsträger laut Impressum: "Gastro Master" ist die Marke, die
  // Epit Global GmbH die juristische Person (GEO-Audit-Fix 2026-07-16).
  legalName: "Epit Global GmbH",
  url: SITE_URL,
  logo: `${SITE_URL}/logo-gastro-master.png`,
  foundingDate: "2021",
  founder: [
    { "@type": "Person", "@id": `${SITE_URL}/#person-rene-ebert`, name: "René Ebert", sameAs: [FOUNDERS.reneEbert.linkedin] },
    { "@type": "Person", "@id": `${SITE_URL}/#person-sanjaya-pattiyage`, name: "Sanjaya Pattiyage", sameAs: [FOUNDERS.sanjayaPattiyage.linkedin] },
  ],
  description:
    "Kassensystem, eigene Lieferservice-App, Webshop und Webseite für deutsche Restaurants. Provisionsfreie Direktbestellungen, monatlich kündbar.",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Herzbergstr. 9",
    postalCode: "61250",
    addressLocality: "Usingen",
    addressRegion: "Hessen",
    addressCountry: "DE",
  },
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer support",
    areaServed: ["DE", "AT", "CH"],
    availableLanguage: ["de", "en", "it", "ru", "fa", "si"],
  },
  numberOfEmployees: { "@type": "QuantitativeValue", value: "30+" },
  areaServed: { "@type": "Country", name: "Deutschland" },
  knowsAbout: [
    "Restaurant-Bestellsysteme",
    "Lieferdienst-Aufbau",
    "DACH-Gastronomie-Tech",
    "Foodcost-Optimierung",
    "Restaurant-Operations",
    "Lieferando-Alternative",
    "Eigene Bestell-App",
    "Restaurant-Marketing",
    "TSE-Kassensysteme",
    "Provisionsfreie Direktbestellungen",
  ],
  sameAs: ORG_SAME_AS,
} as const;

export const WEBSITE_NODE = {
  "@type": "WebSite",
  "@id": WEBSITE_ID,
  url: SITE_URL,
  name: "Gastro Master",
  inLanguage: "de-DE",
  publisher: { "@id": ORG_ID },
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${SITE_URL}/blog?q={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
} as const;

/** Build a JSON-LD graph payload with Org + WebSite + optional extra nodes. */
export function buildOrgGraph(extraNodes: object[] = []) {
  return {
    "@context": "https://schema.org",
    "@graph": [ORG_NODE, WEBSITE_NODE, ...extraNodes],
  };
}
