import ProductPageTemplate from "@/components/product/ProductPageTemplate";
import {
  ShoppingCart, Globe, Zap, Palette,
  CreditCard, Gift, Package,
} from "lucide-react";

const WebshopPage = () => (
  <ProductPageTemplate
    config={{
      hero: {
        badge: "Online Shop",
        headline: "Dein eigener Webshop.\n0% Provision.",
        subline:
          "Verkaufe direkt an deine Gäste – ohne Vermittler, ohne Provision. Deine Domain, dein Design, dein Gewinn.",
        ctaLabel: "Jetzt kostenlos beraten lassen",
      },
      bento: {
        headline: "Alles, was dein Webshop braucht.",
        sub: "Eine komplette Bestelllösung – vollständig in deiner Hand.",
        tiles: [
          {
            id: "provision",
            size: "lg",
            icon: ShoppingCart,
            title: "0% Provision auf jede Bestellung",
            description:
              "Keine Gebühren pro Bestellung, keine versteckten Kosten. Was du verdienst, landet direkt auf deinem Konto – ohne Abzüge.",
            accent: true,
          },
          {
            id: "domain",
            size: "sm",
            icon: Globe,
            title: "Eigene Domain",
            description:
              "Dein Shop unter deiner Adresse – z.B. bestellen.deinrestaurant.de.",
          },
          {
            id: "unlimited",
            size: "sm",
            icon: Zap,
            title: "Unbegrenzte Bestellungen",
            description:
              "Kein Bestelllimit, kein Aufpreis. Wachse ohne Mehrkosten.",
          },
          {
            id: "branding",
            size: "lg",
            icon: Palette,
            title: "100% dein Branding",
            description:
              "Logo, Farben, Bilder – dein Shop sieht aus wie dein Restaurant. Kein \"Powered by\"-Badge, keine Fremd-Werbung.",
          },
          {
            id: "payment",
            size: "sm",
            icon: CreditCard,
            title: "PayPal & Stripe inklusive",
            description:
              "Alle gängigen Zahlungsarten – direkt auf dein Konto.",
          },
          {
            id: "loyalty",
            size: "sm",
            icon: Gift,
            title: "Treuepunkte & Kundenbindung",
            description:
              "Belohne Stammkunden und steigere die Wiederkaufsrate.",
          },
          {
            id: "flyer",
            size: "sm",
            icon: Package,
            title: "Flyer mit QR-Code inklusive",
            description:
              "Bis zu 10.000 Flyer für dein Marketing – fertig gedruckt.",
          },
        ],
      },
      cta: {
        headline: "Starte heute ohne Risiko.",
        sub: "Kein Vertrag, keine Einrichtungsgebühr. Nur dein eigener Webshop – ab dem ersten Tag.",
        buttonLabel: "Kostenloses Beratungsgespräch",
      },
    }}
  />
);

export default WebshopPage;
