import ProductPageTemplate from "@/components/product/ProductPageTemplate";
import {
  Globe, Layout, Mail, FileText,
  Shield, Gauge, Link,
} from "lucide-react";

const WebseitePage = () => (
  <ProductPageTemplate
    config={{
      hero: {
        badge: "Webseite",
        headline: "Deine professionelle\nWebseite. Online in Tagen.",
        subline:
          "Modernes Design, eigene Domain und volle Kontrolle – dein erster digitaler Eindruck, der Gäste überzeugt.",
        ctaLabel: "Jetzt kostenlos beraten lassen",
      },
      bento: {
        headline: "Mehr als nur eine Homepage.",
        sub: "Eine vollständige Webpräsenz – ohne Agentur-Budget.",
        tiles: [
          {
            id: "design",
            size: "lg",
            icon: Layout,
            title: "Professionelles Restaurant-Design",
            description:
              "Modernes Layout, das Vertrauen schafft und Besucher in Bestellungen verwandelt. Optimiert für Mobilgeräte und alle Bildschirmgrößen.",
            accent: true,
          },
          {
            id: "domain",
            size: "sm",
            icon: Globe,
            title: "Eigene Domain",
            description:
              "Deine Adresse im Web – z.B. deinrestaurant.de.",
          },
          {
            id: "email",
            size: "sm",
            icon: Mail,
            title: "2 E-Mail-Postfächer",
            description:
              "info@deinrestaurant.de – professionell von Anfang an.",
          },
          {
            id: "subpages",
            size: "lg",
            icon: FileText,
            title: "Unterseiten inklusive",
            description:
              "Speisekarte, Über uns, Kontakt, Impressum – alles voreingestellt. Du fügst deinen Inhalt hinzu, den Rest erledigen wir.",
          },
          {
            id: "dsgvo",
            size: "sm",
            icon: Shield,
            title: "DSGVO-konform",
            description:
              "Impressum und Datenschutz sind voreingestellt und rechtskonform.",
          },
          {
            id: "speed",
            size: "sm",
            icon: Gauge,
            title: "Schnelle Ladezeiten",
            description:
              "Optimiert für Google PageSpeed und alle Geräte.",
          },
          {
            id: "shop",
            size: "sm",
            icon: Link,
            title: "Mit Webshop verknüpfbar",
            description:
              "Webseite und Webshop aus einem Guss – nahtlos verbunden.",
          },
        ],
      },
      cta: {
        headline: "Deine Webseite. Deine Marke.",
        sub: "Lass dich kostenlos beraten – und geh in wenigen Tagen mit deiner professionellen Webseite online.",
        buttonLabel: "Kostenloses Beratungsgespräch",
      },
    }}
  />
);

export default WebseitePage;
