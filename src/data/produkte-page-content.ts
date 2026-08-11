// Batch 7 Phase 1 — Inhalt der Produkt-Übersicht (/de/produkte) als EINE QUELLE.
//
// Der Text lebte ausschließlich als Konstante in src/pages/ProduktePage.tsx.
// Der Prerenderer kann keine React-Komponente lesen, also stand im rohen HTML
// eine völlig andere (aus PACKAGES gebaute) Kurzfassung: gemessen 1 % Überlappung
// mit dem gerenderten DOM. Jetzt lesen beide Ebenen diese Datei — Muster
// blog-landing-content.ts / blog-hub-content.ts.
//
// Einzige Ausnahme: der Einleitungsabsatz enthält im Client Inline-Links (JSX).
// Er liegt hier als reiner Text (heroP1Text) vor; die Komponente behält ihre
// verlinkte Variante. Der Wortlaut ist identisch, deshalb bleibt das statische
// HTML eine Teilmenge des DOM.

export const PRODUKTE_CONTENT = {
  de: {
    seo: { title: "Gastronomie Software & digitale Lösungen | Gastro Master", desc: "Webshop, App, Kassensystem & Webseite für die Gastronomie – 0 % Provision, keine versteckten Gebühren. Digitale Komplettlösung von Gastro Master. Jetzt beraten lassen." },
    heroBadge: "Gastronomie Software · Digitale Lösungen",
    heroH1a: "Gastronomie Software —",
    heroH1b: "alle Produkte",
    heroP1Text: "Gastro Master bietet digitale Komplettlösungen für die Gastronomie – und darüber hinaus. Vom provisionslosen Online-Bestellshop über eine eigene iOS & Android App bis hin zu professionellen Webseiten und TSE-konformen Kassensystemen. Alle Produkte sind aufeinander abgestimmt und lassen sich flexibel kombinieren.",
    heroP2: "Für Restaurants, Lieferdienste, Cafés, Bäckereien und alle weiteren Branchen.",
    heroCta: "Kostenlose Beratung",
    prodBadge: "Produkte", prodH2: "Digitale Produkte für die Gastronomie", prodSub: "Jedes Produkt funktioniert für sich allein – und entfaltet seine volle Stärke in Kombination.",
    addonBadge: "Erweiterung", addonH2: "Erweiterungen für Webshop und App", addonSub: "Ergänze deinen Webshop oder deine App mit diesen beliebten Add-Ons.",
    kassenBadge: "Kassensystem-Erweiterungen", kassenH2: "Kassen-Add-Ons", kassenSub: "Nur in Kombination mit dem Kassensystem – aktivierbar im laufenden Betrieb. Besonders geeignet für",
    kassenLink: "Lieferdienste mit eigenem Fahrerteam", kassenReq: "Erfordert Kassensystem",
    synBadge: "Kombinationen", synH2: "So arbeiten unsere Produkte zusammen", synSub: "Gastro Master Produkte sind für sich alleine stark – kombiniert entfalten sie ihr volles Potenzial.",
    trustBadge: "Vertrauen", trustH2: "800+ Betriebe vertrauen auf Gastro Master", trustSub: "Über 50 % aller deutschen Restaurants nutzen bereits digitale Kassensysteme – Tendenz steigend.",
    trustQuote: "\u201EAlso der Support ist einfach 1A und den w\u00FCrdest du nirgendwo anders bekommen!\u201C",
    faqBadge: "Häufige Fragen", faqH2: "Deine Fragen zu unseren Produkten", faqSub: "Alles was du wissen musst — bevor du entscheidest.",
    ctaBadge: "Einstieg", ctaH2: "Nicht sicher, welches Produkt", ctaH2b: "zu dir passt?", ctaSub: "In einem kostenlosen Beratungsgespräch analysieren wir gemeinsam deinen Betrieb und empfehlen die passende Kombination – ohne Verpflichtung.", ctaBtn: "Kostenloses Beratungsgespräch anfragen",
    learnMore: "Mehr erfahren",
    topSeller: "Top-Seller Add-On",
    faqItems: [
      { q: "Was ist der Unterschied zwischen Webshop und Webseite bei Gastro Master?", a: "Der [Webshop ab 79 \u20AC/Monat](/produkte/pakete/online-bestellshop) ist ein vollst\u00E4ndiges Online-Bestellsystem \u2014 deine Kunden bestellen direkt, du beh\u00E4ltst 100 % der Einnahmen ohne Provision. Die [professionelle Webseite ab 49 \u20AC/Monat](/produkte/pakete/webseite) ist deine Online-Pr\u00E4senz ohne Bestellfunktion: mit eigener Domain, Galerie, Speisekarte und Kontaktformular." },
      { q: "Wie lange dauert die Einrichtung?", a: "F\u00FCr Webshop und Webseite planen wir 2\u20133 Wochen von Vertragsabschluss bis Go-Live. Das Kassensystem erfordert zus\u00E4tzlich die Hardware-Lieferung. Wir \u00FCbernehmen das komplette Setup f\u00FCr dich. Dein [Online-Bestellshop](/produkte/pakete/online-bestellshop) ist schneller live als du denkst." },
      { q: "Kann ich Webshop, App und Kassensystem kombinieren?", a: "Ja \u2014 alle Gastro Master Produkte sind aufeinander abgestimmt. Bestellungen aus Webshop und App laufen in einem Backend zusammen. Men\u00FC und Preise synchronisieren sich automatisch mit der [Cloud-Kassensoftware](/produkte/pakete/kassensystem)." },
      { q: "Was kostet das Kassensystem?", a: "Das Kassensystem kostet ab 69 \u20AC/Monat (zzgl. MwSt.). Enthalten sind: TSE-konforme Cloud-Kassensoftware, Updates, Cloud-Backoffice und pers\u00F6nlicher Support. Add-Ons wie Fahrer-App und QR-Code Tischsystem sind optional. Alle Infos auf der [Kassensystem-\u00DCbersicht](/produkte/pakete/kassensystem)." },
      { q: "Brauche ich eine TSE?", a: "Ja. Seit 2020 ist eine TSE f\u00FCr alle elektronischen Kassen in Deutschland Pflicht (\u00A7146a AO). Bei Verst\u00F6\u00DFen drohen Bu\u00DFgelder bis 25.000 \u20AC. Die Gastro Master [TSE-Kassenl\u00F6sung](/produkte/pakete/kassensystem) ist von Anfang an gesetzeskonform." },
      { q: "Was ist der Unterschied zwischen App und Webshop?", a: "Der Webshop ist browser-basiert. Die [eigene Bestell-App](/produkte/pakete/bestell-app) erscheint als native iOS- und Android-App im App Store und Google Play. Die App erm\u00F6glicht Push-Benachrichtigungen und bindet Stammkunden dauerhaft." },
      { q: "Welche Zahlungsarten werden unterst\u00FCtzt?", a: "PayPal, Stripe, Kreditkarte (Visa, Mastercard), Apple Pay, Google Pay und Klarna. Mit der [Transaktionsumlage](/produkte/add-ons/transaktionsumlage) gibst du Zahlungsgeb\u00FChren automatisch an deine Kunden weiter." },
      { q: "Welche technischen Voraussetzungen gibt es?", a: "F\u00FCr das Kassensystem ben\u00F6tigst du einen Windows-PC (Windows 10+). Webshop und App laufen vollst\u00E4ndig in der Cloud. Wir \u00FCbernehmen Hosting, Domain und das komplette Setup." },
    ],
    mainProducts: [
      { badge: "Online-Bestellshop", title: "Online Shop", price: "ab 79 €/Monat", desc: "Dein eigener Online-Bestellshop – ohne App, ohne Provision. Kunden bestellen direkt über deine Website, du behältst 100 % des Umsatzes.", benefits: ["0 % Provision", "Eigene Domain & Branding", "PayPal, Kreditkarte & mehr"] },
      { badge: "iOS & Android App", title: "App System", price: "ab 149 €/Monat", desc: "Deine eigene Bestell-App im App Store und Google Play – unter deinem Namen, mit deinem Logo, vollständig provisionsfrei.", benefits: ["iOS & Android", "Push-Benachrichtigungen", "Multi-Standort fähig"] },
      { badge: "Professionelle Webseite", title: "Webseite", price: "ab 49 €/Monat", desc: "Professionelle Online-Präsenz in wenigen Tagen – mit eigener Domain, Galerie, Kontaktformular und DSGVO-konformer Einrichtung. Für alle Branchen.", benefits: ["Eigene Domain inklusive", "DSGVO-konform", "Für alle Branchen"] },
      { badge: "POS-System", title: "Kassensystem", price: "ab 69 €/Monat", desc: "TSE-konformes Kassensystem für die Gastronomie – mit Tischverwaltung, Fahrer-App, Statistiken und nahtloser Integration ins Bestell-System.", benefits: ["TSE-konform (GoBD)", "Tisch- & Lieferverwaltung", "Cloud-basierte Updates"] },
    ],
    addOns: [
      { badge: "Add-On · Top-Seller", title: "Transaktionsumlage", price: "Individuell", desc: "Gib PayPal-, Kreditkarten- und weitere Zahlungsgebühren automatisch und transparent an deine Kunden weiter. Du behältst 100 % deines Nettoumsatzes – rechtssicher, automatisch beim Checkout.", benefits: ["PayPal, Visa, Mastercard", "Apple Pay, Google Pay, Klarna", "Rechtssicher & transparent"] },
      { badge: "Add-On · App & Webshop", title: "QR-Code Flyer", price: "ab 65 € / 2.500 Stück", desc: "Flyer sind das wirksamste Mittel, um Kunden zum Scannen deines QR-Codes zu bewegen. Professionell doppelseitig gedruckte DIN-A6-Flyer mit deinem Branding – ideal als Lieferbeigabe, an der Kasse oder zum Verteilen. Die ersten 2.500 Flyer sind mit jedem Abo kostenfrei inklusive.", benefits: ["Erste 2.500 Flyer kostenlos", "DIN-A6, doppelseitig gedruckt", "Eigenes Branding inklusive"] },
    ],
    kassenAddOns: [
      { badge: "Kassen-Add-On · Lieferdienst", title: "Fahrer-App mit GPS", price: "+10 € / Monat pro Fahrer", desc: "Die Fahrer-App für Gastronomen mit eigenem Lieferdienst: Echtzeit-GPS-Tracking, automatische Routenoptimierung und Dispositionsübersicht direkt im Kassensystem.", benefits: ["Echtzeit-GPS-Tracking für alle Fahrer", "Automatische Routenoptimierung", "Nahtlose Integration ins Kassensystem"] },
      { badge: "Kassen-Add-On · Tischservice", title: "QR-Code Tischsystem", price: "+50 € / 5 Tische, +5 € je weiterem", desc: "Mit dem QR-Code Tischsystem bestellen Gäste direkt am Tisch – ohne Kellner, ohne Wartezeit. Bestellungen landen sofort im Kassensystem.", benefits: ["QR-Code-Bestellung am Tisch", "Direkte Übertragung ins Kassensystem", "Weniger Wartezeit, höhere Tischumschlagrate"] },
      { badge: "Kassen-Add-On · Bildschirme", title: "Bildschirmfunktion", price: "auf Anfrage", desc: "Pick-Up Screen und Küchenmonitor optimieren den Bestellfluss. Der Pick-Up Screen zeigt Abholkunden ihre Bestellnummer an – der Küchenmonitor gibt dem Team jederzeit den aktuellen Bestellstatus.", benefits: ["Pick-Up Screen für Abholkunden", "Küchenmonitor für den Bestellstatus", "Counter, Freestanding & Outdoor verfügbar"] },
    ],
    synergy: [
      { aLabel: "Webshop", bLabel: "Transaktionsumlage", title: "Gebühren automatisch weitergeben", desc: "Zahlungsgebühren (PayPal, Kreditkarte) werden beim Checkout automatisch und transparent an Kunden weitergegeben – du behältst 100 % deines Nettoumsatzes." },
      { aLabel: "App System", bLabel: "Online Shop", title: "Zwei Kanäle, ein Backend", desc: "Bestellungen aus App und Webshop laufen in einem gemeinsamen System zusammen – kein manuelles Abgleichen, keine doppelten Menüpflegungen." },
      { aLabel: "Kassensystem", bLabel: "Webshop & App", title: "Vollständige Synchronisation", desc: "Menü, Preise und Bestellungen synchronisieren sich automatisch zwischen Kasse und Online-Kanälen – in Echtzeit, ohne Schnittstellen-Aufwand." },
    ],
  },
  en: {
    seo: { title: "Restaurant Software & Digital Solutions | Gastro Master", desc: "Online ordering, app, POS system & website for restaurants. 0% commission, no hidden fees. Complete digital solution by Gastro Master." },
    heroBadge: "Restaurant Software · Digital Solutions",
    heroH1a: "Restaurant Software —",
    heroH1b: "all products",
    heroP1Text: "Gastro Master provides complete digital solutions for the restaurant industry and beyond. From a commission-free online ordering system to a branded iOS & Android app, professional websites and TSE-compliant POS systems. All products work seamlessly together.",
    heroP2: "For restaurants, delivery services, cafés, bakeries and all other industries.",
    heroCta: "Free Consultation",
    prodBadge: "Products", prodH2: "Digital Products for Restaurants", prodSub: "Each product works on its own — and reaches full potential when combined.",
    addonBadge: "Extensions", addonH2: "Extensions for Online Shop and App", addonSub: "Enhance your online shop or app with these popular add-ons.",
    kassenBadge: "POS Extensions", kassenH2: "POS Add-Ons", kassenSub: "Only available with the POS system — can be activated at any time. Especially suited for",
    kassenLink: "delivery services with their own drivers", kassenReq: "Requires POS System",
    synBadge: "Combinations", synH2: "How our products work together", synSub: "Gastro Master products are powerful on their own — combined, they unlock their full potential.",
    trustBadge: "Trust", trustH2: "800+ restaurants trust Gastro Master", trustSub: "Over 50% of German restaurants already use digital POS systems — and the trend is growing.",
    trustQuote: "\u201CThe support is simply outstanding — you won't find anything like it anywhere else!\u201D",
    faqBadge: "FAQ", faqH2: "Your questions about our products", faqSub: "Everything you need to know — before you decide.",
    ctaBadge: "Getting Started", ctaH2: "Not sure which product", ctaH2b: "is right for you?", ctaSub: "In a free consultation, we analyze your business together and recommend the right combination — no obligations.", ctaBtn: "Request Free Consultation",
    learnMore: "Learn more",
    topSeller: "Top-Seller Add-On",
    faqItems: [
      { q: "What is the difference between online shop and website?", a: "The [online shop from \u20AC79/month](/produkte/pakete/online-bestellshop) is a full ordering system \u2014 your customers order directly and you keep 100% of revenue with zero commission. The [professional website from \u20AC49/month](/produkte/pakete/webseite) is your online presence without ordering functionality: with custom domain, gallery, menu and contact form." },
      { q: "How long does the setup take?", a: "For the online shop and website, we plan 2\u20133 weeks from contract to go-live. The POS system requires additional hardware delivery. We handle the entire setup for you. Your [online ordering system](/produkte/pakete/online-bestellshop) goes live faster than you think." },
      { q: "Can I combine online shop, app and POS system?", a: "Yes \u2014 all Gastro Master products are designed to work together. Orders from app and online shop come together in one backend. Menu and prices sync automatically with the [cloud POS software](/produkte/pakete/kassensystem)." },
      { q: "How much does the POS system cost?", a: "The POS system starts at \u20AC69/month (excl. VAT). Included: TSE-compliant cloud POS software, updates, cloud back-office and personal support. Add-ons like driver app and QR-code table system are optional. All details on the [POS system page](/produkte/pakete/kassensystem)." },
      { q: "Do I need a TSE (fiscal security device)?", a: "Yes. Since 2020, a TSE is mandatory for all electronic cash registers in Germany (\u00A7146a AO). Fines for non-compliance can reach \u20AC25,000. The Gastro Master [TSE POS solution](/produkte/pakete/kassensystem) is fully compliant from day one." },
      { q: "What is the difference between the app and the online shop?", a: "The online shop is browser-based. The [branded ordering app](/produkte/pakete/bestell-app) appears as a native iOS and Android app on the App Store and Google Play. The app enables push notifications and builds long-term customer loyalty." },
      { q: "Which payment methods are supported?", a: "PayPal, Stripe, credit card (Visa, Mastercard), Apple Pay, Google Pay and Klarna. With the [transaction fee pass-through](/produkte/add-ons/transaktionsumlage) you automatically pass payment fees to your customers." },
      { q: "What are the technical requirements?", a: "For the POS system you need a Windows PC (Windows 10+). Online shop and app run entirely in the cloud. We handle hosting, domain and the complete setup." },
    ],
    mainProducts: [
      { badge: "Online Ordering", title: "Online Shop", price: "from €79/month", desc: "Your own online ordering system — no app required, zero commission. Customers order directly through your website, you keep 100% of revenue.", benefits: ["0% Commission", "Own Domain & Branding", "PayPal, Credit Card & more"] },
      { badge: "iOS & Android App", title: "App System", price: "from €149/month", desc: "Your own branded ordering app on the App Store and Google Play — under your name, with your logo, completely commission-free.", benefits: ["iOS & Android", "Push Notifications", "Multi-Location capable"] },
      { badge: "Professional Website", title: "Website", price: "from €49/month", desc: "Professional online presence in just days — with custom domain, gallery, contact form and GDPR-compliant setup. For all industries.", benefits: ["Custom Domain included", "GDPR-compliant", "For all industries"] },
      { badge: "POS System", title: "POS System", price: "from €69/month", desc: "TSE-compliant POS system for restaurants — with table management, driver app, analytics and seamless integration with your ordering system.", benefits: ["TSE-compliant (GoBD)", "Table & Delivery Management", "Cloud-based Updates"] },
    ],
    addOns: [
      { badge: "Add-On · Top-Seller", title: "Transaction Fee Pass-Through", price: "Individual", desc: "Automatically and transparently pass PayPal, credit card and other payment fees to your customers. You keep 100% of your net revenue — legally compliant, automatic at checkout.", benefits: ["PayPal, Visa, Mastercard", "Apple Pay, Google Pay, Klarna", "Legally compliant & transparent"] },
      { badge: "Add-On · App & Shop", title: "QR-Code Flyer", price: "from €65 / 2,500 pcs", desc: "Flyers are the most effective way to get customers to scan your QR code. Professionally printed double-sided DIN-A6 flyers with your branding — perfect for delivery inserts, at the counter or for distribution. The first 2,500 flyers are free with every subscription.", benefits: ["First 2,500 flyers free", "DIN-A6, double-sided print", "Custom branding included"] },
    ],
    kassenAddOns: [
      { badge: "POS Add-On · Delivery", title: "Driver App with GPS", price: "+€10/month per driver", desc: "The driver app for restaurants with their own delivery service: real-time GPS tracking, automatic route optimization and dispatch overview directly in your POS.", benefits: ["Real-time GPS tracking", "Automatic route optimization", "Seamless POS integration"] },
      { badge: "POS Add-On · Table Service", title: "QR-Code Table System", price: "+€50 / 5 tables, +€5 each additional", desc: "With the QR-code table system, guests order directly at their table — no waiter needed. Orders go straight into your POS system.", benefits: ["QR-code ordering at the table", "Direct transfer to POS", "Less waiting, higher table turnover"] },
      { badge: "POS Add-On · Screens", title: "Screen Functions", price: "on request", desc: "Pick-up screen and kitchen monitor optimize order flow. The pick-up screen shows customers their order number — the kitchen monitor gives your team real-time order status.", benefits: ["Pick-up screen for customers", "Kitchen monitor for order status", "Counter, freestanding & outdoor"] },
    ],
    synergy: [
      { aLabel: "Online Shop", bLabel: "Transaction Fee", title: "Automatically pass on fees", desc: "Payment fees (PayPal, credit card) are automatically and transparently passed to customers at checkout — you keep 100% of your net revenue." },
      { aLabel: "App System", bLabel: "Online Shop", title: "Two channels, one backend", desc: "Orders from app and online shop come together in one system — no manual matching, no duplicate menu management." },
      { aLabel: "POS System", bLabel: "Shop & App", title: "Full synchronization", desc: "Menu, prices and orders sync automatically between POS and online channels — in real-time, without integration effort." },
    ],
  },
};
