import ProductPageTemplate from "@/components/product/ProductPageTemplate";
import {
  TrendingUp, Wallet, CreditCard, Percent,
  CheckCircle2, Banknote, Zap,
} from "lucide-react";

const TransaktionsumlagePage = () => (
  <ProductPageTemplate
    config={{
      hero: {
        badge: "Transaktions-Umlage",
        headline: "Zahlungsgebühren?\nKein Problem mehr.",
        subline:
          "Gib PayPal- und Kreditkartengebühren transparent weiter – und schütze deine Marge, ohne auf Zahlungskomfort zu verzichten.",
        ctaLabel: "Jetzt kostenlos beraten lassen",
      },
      bento: {
        headline: "Deine Marge. Vollständig geschützt.",
        sub: "Mit der Transaktions-Umlage zahlst du keine Gebühren mehr – deine Kunden schon.",
        tiles: [
          {
            id: "paypal",
            size: "lg",
            icon: Wallet,
            title: "Eigenes PayPal Business",
            description:
              "Zahlungen landen direkt auf deinem eigenen PayPal Business-Konto – kein Umweg, kein Zwischenhändler. Du behältst die volle Kontrolle.",
            accent: true,
          },
          {
            id: "stripe",
            size: "sm",
            icon: CreditCard,
            title: "Eigenes Stripe-Konto",
            description:
              "Kreditkarte, Apple Pay und Google Pay – direkt auf dein Konto.",
          },
          {
            id: "umlage",
            size: "sm",
            icon: Percent,
            title: "Transparente Umlage",
            description:
              "Kunden zahlen die Gebühren – du erklärst es klar und professionell.",
          },
          {
            id: "margin",
            size: "lg",
            icon: TrendingUp,
            title: "Marge vollständig erhalten",
            description:
              "Statt Gebühren aus dem Gewinn zu bezahlen, werden sie transparent als separater Posten ausgewiesen. Deine Kalkulation bleibt sauber.",
          },
          {
            id: "methods",
            size: "sm",
            icon: Banknote,
            title: "Alle Zahlungsarten",
            description:
              "PayPal, Visa, Mastercard, Klarna, Apple Pay, Google Pay.",
          },
          {
            id: "transparent",
            size: "sm",
            icon: CheckCircle2,
            title: "Rechtlich einwandfrei",
            description:
              "Die Umlage ist gesetzlich zulässig und klar kommuniziert.",
          },
          {
            id: "setup",
            size: "sm",
            icon: Zap,
            title: "Schnelle Einrichtung",
            description:
              "In wenigen Schritten aktiviert – wir begleiten dich dabei.",
          },
        ],
      },
      cta: {
        headline: "Schluss mit unnötigen Gebühren.",
        sub: "Lass dich kostenlos beraten und erfahre, wie viel du mit der Transaktions-Umlage monatlich sparst.",
        buttonLabel: "Kostenloses Beratungsgespräch",
      },
    }}
  />
);

export default TransaktionsumlagePage;
