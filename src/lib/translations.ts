export type LangCode = 'de' | 'en';

export const translations = {
  de: {
    // ── Navbar ──────────────────────────────────────────────────────────────
    nav: {
      produkte: "Produkte",
      rechner: "Rechner",
      referenzen: "Referenzen",
      preise: "Preise",
      faq: "FAQ",
      cta: "Kostenlose Beratung",
    },

    // ── Hero ─────────────────────────────────────────────────────────────────
    hero: {
      headline: "Hör auf, Provision auf deinen eigenen Umsatz zu zahlen.",
      sub: "Dein eigener Webshop & deine eigene App – damit deine Kunden direkt bei dir bestellen. Ohne Plattform-Provisionen. Mehr Gewinn ab Tag eins.",
      cta: "Kostenlose Beratung",
      trust1: "5,0 Sterne bei Google",
      trust2: "700+ Kunden",
      trust3: "0 % Provision",
    },

    // ── Problem ───────────────────────────────────────────────────────────────
    problem: {
      headline1: "Du arbeitest hart.",
      headline2: "Die Plattform profitiert.",
      sub: "Jede Bestellung über Lieferando, Wolt oder Uber Eats kostet dich bares Geld. Du trägst das Risiko, machst die Arbeit – und ein Großteil deines Gewinns geht an die Plattform.",
      items: [
        "Du zahlst bis zu 30 % Provision – auf deinen eigenen Umsatz.",
        "Deine Kundendaten gehören der Plattform, nicht dir.",
        "Du bist austauschbar – zwischen hunderten anderen Anbietern.",
        "Du hast keine Kontrolle über Preise, Marketing oder Darstellung.",
        "Dein Gewinn schrumpft, während die Plattform wächst.",
      ],
    },

    // ── Solution ──────────────────────────────────────────────────────────────
    solution: {
      badge: "Die Lösung",
      headline1: "Dein eigener Shop.",
      headline2: "Deine eigene App.",
      sub: "Mit Gastro Master bekommst du ein komplettes Bestellsystem unter deiner Marke – mit 0 % Provision auf jede Bestellung.",
      cta: "Kostenlose Beratung",
      features: [
        { title: "Eigener Webshop", text: "Dein Branding, deine Domain, dein Design – vollständig individualisiert." },
        { title: "Eigene App", text: "Native App im App Store & Google Play mit Push-Benachrichtigungen." },
        { title: "Eigene Zahlungsanbindung", text: "PayPal, Stripe, Kartenzahlung – du behältst die Kontrolle über deine Zahlungen." },
        { title: "Deine Marke im Fokus", text: "Kein Plattform-Logo. Deine Kunden bestellen bei dir – nicht bei einer Plattform." },
      ],
    },

    // ── Differentiation ───────────────────────────────────────────────────────
    diff: {
      headline: "Warum Gastro Master?",
      sub: "Wir sind nicht irgendein Software-Anbieter. Wir sind dein Partner – mit echtem Support, Flexibilität und Kontrolle für dich.",
      features: [
        { title: "WhatsApp-Support", text: "Persönlicher Ansprechpartner – keine Ticket-Warteschlange." },
        { title: "Telefonischer Support", text: "Ruf uns an, wann immer du Hilfe brauchst." },
        { title: "Jederzeit kündbar", text: "3 Monate Kündigungsfrist. Kein Langzeit-Lock-in." },
        { title: "Erster Beitrag nach Launch", text: "Du zahlst erst, wenn dein System live ist." },
        { title: "PayPal- & Stripe-Setup", text: "Wir helfen dir bei der kompletten Einrichtung." },
        { title: "Volle Kontrolle", text: "Eigene Zugänge, eigene Daten, eigene Zahlungen." },
      ],
    },

    // ── Positioning ───────────────────────────────────────────────────────────
    positioning: {
      headline1: "Du machst die Arbeit.",
      headline2: "Die Plattform kassiert mit.",
      sub: "Lieferplattformen kosten dich jeden Monat Tausende Euro an Provision. Jede Direktbestellung über deinen eigenen Shop ist bares Geld, das in deiner Kasse bleibt.",
      items: [
        { title: "Die Plattform kassiert mit", text: "Bei jedem Lieferando- oder Wolt-Auftrag verlierst du 15–30 % deines Umsatzes an Provision. Das ist Gewinn, der dir zusteht." },
        { title: "Weniger Marge, gleiche Arbeit", text: "Du kochst, du lieferst, du trägst das Risiko – aber die Plattform verdient an jeder Bestellung mit. Das muss nicht sein." },
        { title: "Direktbestellungen = mehr Gewinn", text: "Jede Bestellung über deinen eigenen Shop bleibt zu 100 % bei dir. Ohne Provision. Ohne Abhängigkeit. Mehr Gewinn pro Bestellung." },
      ],
    },

    // ── Process ───────────────────────────────────────────────────────────────
    process: {
      badge: "So einfach geht's",
      headline: "Unser Ablauf",
      sub: "Vom ersten Gespräch bis zum fertigen System – wir begleiten dich persönlich durch jeden Schritt.",
      cta: "Jetzt Erstgespräch vereinbaren",
      steps: [
        { title: "Kostenloses Erstgespräch", text: "Du meldest dich bei uns – wir lernen dein Restaurant kennen und beraten dich unverbindlich." },
        { title: "Strategieberatung & Planung", text: "Gemeinsam planen wir dein Setup: Webshop, App, Kasse – exakt auf deinen Betrieb zugeschnitten." },
        { title: "Speisekarte & Einrichtung", text: "Du gibst uns deine Speisekarte und Infos – wir kümmern uns um die komplette Einrichtung." },
        { title: "Dein System geht live", text: "Meist in 2–3 Wochen startklar – komplett eingerichtet und einsatzbereit." },
      ],
    },

    // ── Trust ─────────────────────────────────────────────────────────────────
    trust: {
      reviews: "5,0 aus 130 Google-Bewertungen",
      headline: "700+ Gastronomiebetriebe vertrauen uns",
      sub: "Von der Einzelfiliale bis zur Multi-Brand-Kette – Gastro Master ist das Bestellsystem für Gastronomen, die unabhängig sein wollen.",
    },

    // ── References ────────────────────────────────────────────────────────────
    references: {
      badge: "Das sagen unsere Kunden",
      headline: "Echte Ergebnisse von Gastronomen, die den Wechsel gemacht haben.",
      items: [
        { name: "TAKE – The Good Food", type: "Multi-Filiale, Düsseldorf & Mönchengladbach", quote: "Seit wir mit Gastro Master arbeiten, haben wir deutlich mehr Direktbestellungen. Die App und der Webshop laufen einwandfrei – und der persönliche Support ist Gold wert." },
        { name: "Pizzeria Il Sorriso", type: "Einzelfiliale", quote: "Endlich keine Plattform-Provisionen mehr. Die Einrichtung war schnell und unkompliziert. Wir können Gastro Master nur empfehlen." },
        { name: "Kojo Sushi", type: "Premium Delivery", quote: "Unsere Kunden bestellen jetzt direkt über unsere App. Das spart uns jeden Monat bares Geld und wir haben volle Kontrolle über unser Business." },
      ],
    },

    // ── Momentum ──────────────────────────────────────────────────────────────
    momentum: {
      badge: "Seit 2021",
      headline: "5 Jahre Momentum",
      sub: "Vom ersten Kunden bis zum eigenen Zahlungssystem – wir bauen die Zukunft der Gastronomie.",
      outro: "Wir sind zukunftsorientiert, flexibel und bauen Software, die Gastronomen wirklich weiterbringt.",
      outroLabel: "Als Nächstes",
      milestones: [
        { year: "2021", title: "Erster Tag und Gründung", text: "Der Grundstein für eine neue Ära der Gastro-Digitalisierung" },
        { year: "2022", title: "Erste 100 Kunden", text: "Vertrauen aufgebaut – Wort für Wort, Kunde für Kunde" },
        { year: "2023", title: "Gründung der Epit Global GmbH", text: "Strukturen für Wachstum und internationale Skalierung" },
        { year: "2024", title: "Erste 500 Kunden", text: "Ein starkes Netzwerk aus Partnern in der Gastronomie" },
        { year: "2025", title: "Eigenes Kassensystem", text: "Cloud-Kasse, Self-Order, Pick-Up – alles aus einer Hand" },
        { year: "2026", title: "Eigene Zahlungsabwicklung (Epit Pay)", text: "Volle Kontrolle über Zahlungen – unser nächster Meilenstein" },
      ],
    },

    // ── Risk Reversal ─────────────────────────────────────────────────────────
    risk: {
      headline: "Der Wechsel ist einfacher als du denkst",
      sub: "Wir nehmen dir das Risiko ab und begleiten dich persönlich bei jedem Schritt.",
      cta: "Kostenlose Beratung",
      items: [
        { title: "Kein Risiko beim Start", text: "Erster Beitrag erst nach Launch. Du zahlst nichts, solange dein System nicht live ist." },
        { title: "Schneller Go-Live", text: "Wir übernehmen Setup, Design und Einrichtung. Du kannst dich auf dein Geschäft konzentrieren." },
        { title: "Persönliche Begleitung", text: "Von Tag eins an hast du einen persönlichen Ansprechpartner – kein anonymes Ticketsystem." },
      ],
    },

    // ── Switch Offer ──────────────────────────────────────────────────────────
    switchOffer: {
      badge: "Wechselangebot",
      headline: "50 % Rabatt beim Wechsel",
      sub: "Du hast noch ein aktives Abo bei einem anderen Anbieter? Kein Problem – du zahlst bei uns nur die Hälfte, solange dein altes Abo noch läuft.",
      cta: "Angebot sichern",
    },

    // ── Partner ───────────────────────────────────────────────────────────────
    partner: {
      badge: "Integrationen & Infrastruktur",
      headline: "Starke Partner für Zahlung & System",
      sub: "Nahtlos verbunden mit den wichtigsten Zahlungs-, Liefer- und Kassensystemen der Branche.",
    },

    // ── Mockup ────────────────────────────────────────────────────────────────
    mockup: {
      badge: "Live in Action",
      headline: "So sieht deine App aus",
      sub: "Echte Screenshots von TAKE – The Good Food. Multi-Filiale, eigene App, eigener Webshop – powered by Gastro Master.",
      tabs: ["Startseite", "Speisekarte & Bestellung", "Filialübersicht", "Bestellart wählen", "Kundenkonto"],
    },

    // ── PickUp Screen ─────────────────────────────────────────────────────────
    pickup: {
      badge: "Digitales Erlebnis",
      headline1: "Dein Bildschirm.",
      headline2: "Dein Appetitanreger.",
      sub: "Zeige deinen Gästen aktuelle Angebote, Tagesgerichte und Highlights direkt auf dem TV-Monitor. Visuell ansprechend, appetitlich gestaltet und immer aktuell – alles gesteuert über dein Kassensystem.",
      featureTitle: "Pick-Up Screen & digitale Speisekarte",
      features: ["Aufmerksamkeit und Umsatz steigern", "Angebote & Deals visuell hervorheben"],
      cta: "Mehr erfahren",
    },

    // ── Video Testimonials ────────────────────────────────────────────────────
    video: {
      badge: "Kundenstimmen",
      headline: "Was unsere Partner sagen",
      sub: "Echte Gastronomen. Echte Ergebnisse. Echte Empfehlungen.",
      items: [
        { name: "Kojo Sushi", person: "Ha Lim Lee", quote: "In der Zukunft wird immer mehr online bestellt und wir wollen auch dabei sein." },
        { name: "Pizzeria il Sorriso", person: "Marco Greco", quote: "Also der Support ist einfach 1A und den würdest du nirgendwo anders bekommen!" },
        { name: "Nevada Burger & Steak", person: "Milad Ismail", quote: "Ich bekomme bei jeder Bestellung sofort das Geld auf mein Konto. Bei Gastro Master ist alles flexibel." },
        { name: "61 Burger & More", person: "Sven Heinrich", quote: "Man hat hier einen schnellen und guten WhatsApp Support und die Möglichkeit, seinen Betrieb zu strukturieren." },
      ],
    },

    // ── Transaktionsumlage ────────────────────────────────────────────────────
    transaktion: {
      badge: "Optionales Add-on für Shop & App",
      headline: "Mehr Gewinn mit Transaktions-Umlage",
      sub: "Gib Zahlungsgebühren strategisch weiter – und schütze deine Marge. Dein eigenes PayPal- und Stripe-Konto, volle Kontrolle über dein Geld.",
      cta: "Kostenlose Beratung",
      features: [
        "Eigenes PayPal-Geschäftskonto",
        "Eigenes Stripe-Konto",
        "Du behältst volle Kontrolle über das Geld",
        "Gebühren strategisch an Kunden weitergeben",
        "Mehr Zahlungsmethoden ohne Margenverlust",
      ],
      calcBadge: "Gebühren-Rechner",
      calcOrders: "Bestellungen / Monat",
      calcCart: "⌀ Warenkorb",
      calcResult: "Geschätzte monatliche Zahlungsgebühren",
      calcNote: "→ Diese Gebühren kannst du mit der Transaktions-Umlage strategisch weitergeben.",
    },

    // ── Calculator ────────────────────────────────────────────────────────────
    calculator: {
      badge: "Provisionsrechner",
      headline: "So viel kostet dich die Plattform",
      sub: "Berechne, wie viel Gewinn du jeden Monat an Lieferplattformen verlierst.",
      labelOrders: "Bestellungen / Monat",
      labelCart: "⌀ Warenkorb (€)",
      labelCommission: "Provision (%)",
      cardRevenue: "Monatsumsatz",
      cardMonth: "Provision / Monat",
      cardYear: "Provision / Jahr",
      savingsText: "Mit Gastro Master sparst du bis zu",
      savingsSuffix: "pro Jahr – bei 0 % Provision.",
      cta: "Kostenlose Beratung",
    },

    // ── Pricing ───────────────────────────────────────────────────────────────
    pricing: {
      headline: "Vom Einstieg bis zur Komplettlösung.",
      sub: "Klare Pakete. Klare Unterschiede. Wähle das Modell, das zu deinem Betrieb passt.",
      vatNote: "zzgl. MwSt.",
      setupNote: "Alle Preise zzgl. MwSt. Einrichtung einmalig je nach Umfang ab 400 € bis 1.600 € netto. Zahlungsgebühren (PayPal / Stripe) fallen separat an. Hardware und Sonderanforderungen werden individuell besprochen.",
      durationLabel: "Umsetzung",
      ctaPrimary: "Kostenlose Beratung",
      ctaSecondary: "Beratung anfragen",
      showComparison: "Alle Features im Detail vergleichen",
      hideComparison: "Vergleich ausblenden",
      perMonth: "/Monat",
      from: "ab",
      badgePopular: "Beliebteste Wahl",
      onRequest: "Auf Anfrage",
      packageFeatures: {
        beginner: ["Website + Unterseiten", "1 Wunsch-Domain", "2 Postfächer"],
        basic: ["Webshop (provisionsfrei)", "Unbegrenzte Bestellungen", "2.500 Flyer mit QR-Code", "Kundenpunkte-System", "Bis 3 Postfächer"],
        standard: ["Webshop + native App", "Push-Benachrichtigungen", "Unbegrenzte Bestellungen", "5.000 Flyer mit QR-Code", "Bis 4 Postfächer"],
        pro: ["Alles aus Standard", "Cloud-Kasse (TSE-konform)", "Transaktionsumlage inkl.", "10.000 Flyer mit QR-Code", "Bis 5 Postfächer"],
        enterprise: ["Individuelles Design", "Fotograf vor Ort optional", "Cloud-Kasse inkl.", "Transaktionsumlage inkl.", "Rahmenvertrag"],
      },
      plans: [
        { id: "beginner", name: "Beginner", tagline: "Erste Online-Präsenz", price: "49", duration: "7–10 Tage" },
        { id: "basic", name: "Basic", tagline: "Reiner Webshop", price: "79", duration: "10–14 Tage" },
        { id: "standard", name: "Standard", tagline: "Webshop + App", price: "149", duration: "2–3 Wochen", popular: true },
        { id: "pro", name: "Pro", tagline: "Shop + App + Kasse", price: "219", duration: "2–3 Wochen" },
        { id: "enterprise", name: "Enterprise", tagline: "Franchise / Mehr-Standorte", price: "Auf Anfrage", duration: "Nach Projektumfang" },
      ],
    },

    // ── FAQ ───────────────────────────────────────────────────────────────────
    faq: {
      badge: "Häufige Fragen",
      sub: "Offene Fragen? Hier findest du Antworten – oder ruf uns einfach an.",
      items: [
        { q: "Wie schnell kann ich starten?", a: "In der Regel ist dein Shop innerhalb weniger Wochen live. Wir übernehmen Setup, Design und Einrichtung für dich." },
        { q: "Muss ich sofort zahlen?", a: "Nein. Dein erster Beitrag wird erst fällig, wenn dein System live ist. Vorher entstehen keine Kosten." },
        { q: "Unterstützt ihr bei PayPal und Stripe?", a: "Ja, wir helfen dir bei der kompletten Einrichtung deiner Zahlungsanbieter – inklusive Verifizierung." },
        { q: "Wie läuft der Support?", a: "Per WhatsApp, Telefon oder E-Mail. Du hast einen persönlichen Ansprechpartner, kein anonymes Ticketsystem." },
        { q: "Bin ich lange gebunden?", a: "Nein. Du kannst jederzeit mit 3 Monaten Frist kündigen. Kein Langzeit-Lock-in." },
        { q: "Was ist beim Wechsel von einem anderen Anbieter?", a: "Wir machen dir den Wechsel so einfach wie möglich – inklusive 50 % Rabatt, solange dein altes Abo noch läuft." },
        { q: "Kann ich später ein Kassensystem dazunehmen?", a: "Ja, jederzeit. Gastro Master bietet alles aus einer Hand – Shop, App und Kasse." },
      ],
    },

    // ── Contact ───────────────────────────────────────────────────────────────
    contact: {
      headline: "Bereit für mehr Gewinn?",
      sub: "Lass uns in einem kostenlosen Erstgespräch zeigen, wie du mit Gastro Master mehr Direktbestellungen und mehr Gewinn erzielst.",
      trust1: "5,0 Sterne bei Google – 130 Bewertungen",
      trust2: "700+ zufriedene Kunden",
      trust3: "0 % Provision auf eigene Bestellungen",
      labelName: "Dein Name *",
      placeholderName: "Max Mustermann",
      labelBusiness: "Name deiner Gastronomie *",
      placeholderBusiness: "Pizzeria Bella",
      labelZip: "Postleitzahl",
      placeholderZip: "40210",
      labelPhone: "Telefonnummer *",
      placeholderPhone: "0151 12345678",
      labelMessage: "Deine Nachricht an uns",
      placeholderMessage: "Ich möchte gerne...",
      labelInterest: "Ich interessiere mich für:",
      interests: ["Webshop", "App", "Kassensystem", "Website", "Transaktionsumlage"],
      cta: "Kostenlose Beratung anfragen",
      success: "Vielen Dank! Wir melden uns bei dir.",
    },

    // ── Footer ────────────────────────────────────────────────────────────────
    footer: {
      impressum: "Impressum",
      datenschutz: "Datenschutz",
      agb: "AGB",
      kontakt: "Kontakt",
      downloads: "Downloads",
      rights: "Alle Rechte vorbehalten.",
    },

    // ── Sticky CTA ────────────────────────────────────────────────────────────
    sticky: {
      cta: "Kostenlose Beratung",
    },

    // ── Founder / Team ────────────────────────────────────────────────────────
    founder: {
      badge: "Das Team hinter Gastro Master",
      headline1: "Echte Menschen.",
      headline2: "Echte Begleitung.",
      sub: "Kein anonymer Softwareanbieter – sondern ein Team mit 30+ Mitarbeitenden, das dich persönlich begleitet.",
      langTitle: "Beratung auf Augenhöhe. In deiner Sprache.",
      langSub: "Unsere Beratung ist persönlich, direkt und auch sprachlich nah an deinem Alltag. Wir sprechen deine Sprache – damit du dich von Anfang an verstanden fühlst.",
      linkedin: "LinkedIn Profil",
      people: {
        rene: { role: "Gründer & CEO", focus: "Vertrieb & Marketing", bio: "Nach seinem Bachelor in International Business Management entschied er sich für den unternehmerischen Weg. Sein Fokus liegt auf Wachstum, Vertrieb und strategischer Marktentwicklung." },
        sanjaya: { role: "Gründer & CEO", focus: "IT & Technologie", bio: "Langjähriger IT-Spezialist mit Erfahrung in Technologie- und Führungsrollen bei international führenden Unternehmen wie Procter & Gamble. Fokus auf Produkt, Systeme und skalierbare Technologie." },
        salvatore: { role: "Vertriebsleiter", focus: "Kundenberatung", bio: "Mehrjährige Vertriebserfahrung. Zuvor im Verkauf mechanischer Luxusuhren bei einem führenden Online-Anbieter wie CHRONEXT tätig – und weiß, dass jede einzelne Komponente zählt." },
        andrej: { role: "Service Customer Manager", focus: "Kundenbetreuung", bio: "Zuvor in leitenden Positionen im Lebensmitteleinzelhandel tätig, unter anderem bei Rewe. Bringt fundierte Erfahrung in Kundenservice und Betriebsorganisation mit." },
        mohammad: { role: "Vertrieb", focus: "Gastronomie-Expertise", bio: "Ehemaliger Gastronom, der durch seine eigene positive Erfahrung als Kunde den Weg ins Team fand. Er kennt die Herausforderungen der Branche aus erster Hand." },
      },
    },

    // ── Target Groups ─────────────────────────────────────────────────────────
    target: {
      badge: "Für jede Gastronomie",
      headline: "Dein Betrieb. Deine Lösung.",
      sub: "Egal ob Pizzeria, Franchise oder Ghost Kitchen – finde das Modell, das zu dir passt.",
      cta: "Jetzt beraten lassen",
      groups: [
        { id: "lieferdienst", label: "Lieferdienst", content: { title: "Mehr Gewinn pro Lieferung", subtitle: "Dein eigener Bestellkanal – ohne Plattform-Provision", text: "Mit einem eigenen Webshop und einer eigenen App erreichst du deine Kunden direkt. Keine Provisionen, volle Kontrolle über dein Liefergeschäft." } },
        { id: "franchise", label: "Franchise", content: { title: "Ein System für alle Standorte", subtitle: "Zentrale Steuerung, lokale Flexibilität", text: "Verwalte mehrere Filialen über ein einziges Dashboard. Einheitliches Branding, zentrale Speisekarte und individuelle Anpassungen pro Standort." } },
        { id: "ghost", label: "Ghost Kitchen", content: { title: "Maximale Marge ohne Ladenlokal", subtitle: "Delivery-first – ohne Plattformabhängigkeit", text: "Als Ghost Kitchen zählt jeder Cent. Mit deinem eigenen Bestellsystem sparst du dir die hohen Plattform-Provisionen und baust dir eine direkte Kundenbeziehung auf." } },
        { id: "einzelhandel", label: "Einzelhändler", content: { title: "Dein Laden – jetzt auch online", subtitle: "Click & Collect und Direktbestellungen", text: "Biete deinen Kunden ein modernes Online-Bestellerlebnis. Ideal für Feinkost, Metzgereien, Getränkehändler und lokale Spezialitäten." } },
        { id: "baeckerei", label: "Bäckerei", content: { title: "Frisch bestellt, lokal abgeholt", subtitle: "Vorbestellungen und Filialabholung leicht gemacht", text: "Lass deine Kunden Brötchen, Kuchen und Snacks bequem vorbestellen – über deinen eigenen Webshop oder deine App." } },
      ],
      subs: [
        { id: "pizzeria", label: "Pizzeria", content: { title: "Die Nr. 1 im Liefergeschäft", subtitle: "Pizza-Bestellungen direkt über deine App", text: "Pizzerien profitieren am meisten von Direktbestellungen. Spare bis zu 30 % Provision pro Bestellung." } },
        { id: "asiatisch", label: "Asiatisch", content: { title: "Asia-Küche, eigene Bestellungen", subtitle: "Sushi, Wok & mehr – direkt bestellt", text: "Ob Sushi, Pad Thai oder Ramen – mit deinem eigenen Webshop bestellen deine Kunden direkt bei dir." } },
        { id: "indisch", label: "Indisch", content: { title: "Indische Spezialitäten direkt bestellt", subtitle: "Curry, Tandoori & Co. provisionsfrei", text: "Deine Kunden lieben dein Essen – warum sollte eine Plattform daran mitverdienen?" } },
        { id: "burger", label: "Burger & Chicken", content: { title: "Burger & Chicken ohne Provision", subtitle: "Fast-Food-Bestellungen direkt über dich", text: "Burger-Restaurants und Chicken-Shops gehören zu den stärksten Lieferkategorien. Hol dir deine Marge zurück." } },
        { id: "eis", label: "Eis & Dessert", content: { title: "Süße Bestellungen, voller Gewinn", subtitle: "Eis, Waffeln & Desserts direkt liefern", text: "Eisdielen und Dessert-Shops mit Lieferung boomen. Nutze deinen eigenen Webshop für Vorbestellungen." } },
        { id: "baeckerei-sub", label: "Bäckerei", content: { title: "Bäckerei mit Lieferservice", subtitle: "Brötchen, Kuchen & Co. vorbestellen lassen", text: "Lass deine Kunden morgens bequem vorbestellen und liefere frisch – oder biete Click & Collect an." } },
      ],
    },

    // ── POS Section ───────────────────────────────────────────────────────────
    pos: {
      badge: "Eigenständig buchbar",
      headline: "Die Gastro Master Cloud-Kasse",
      sub: "TSE-konforme Kassensoftware für Restaurants, Lieferdienste und Gastronomiebetriebe – auch ohne Webshop oder App buchbar.",
      posTag: "Cloud-Kassensoftware",
      posPrice: "ab 69 € / Monat",
      posVat: "zzgl. MwSt.",
      posCta: "Kassensystem beraten lassen",
      posFeatures: ["TSE-konforme Cloud-Kassensoftware", "Monatlich kündbar", "Läuft auf Windows-Computern", "Cloud-Backoffice & Auswertungen", "Service am Tisch, Lieferung & Abholung", "Persönlicher Support per WhatsApp", "Modular erweiterbar durch Add-ons"],
      addon1Title: "Fahrer-App mit GPS",
      addon1Price: "+10 € / Monat pro Fahrer zzgl. MwSt.",
      addon1Features: ["GPS-Tracking für alle Fahrer", "Transparenz im Lieferbetrieb", "Sinnvoll für Betriebe mit eigenem Lieferdienst"],
      addon2Title: "Bar-System / QR-Code Tischsystem",
      addon2Price: "+50 € / Monat für 5 Tische, +5 € je weiterem Tisch zzgl. MwSt.",
      addon2Features: ["QR-Code-Bestellung am Tisch", "Modernes Inhouse-Erlebnis", "Ideal für Restaurants mit Tischservice"],
      addon3Title: "Self-Ordering & Hardware",
      addon3Price: "Hardware auf Anfrage",
      addon3Features: ["Pick-Up Screen & Küchenmonitor", "Self-Checkout Terminals", "Counter, Freestanding, Outdoor-Varianten", "Software-Funktionalität bereits inklusive"],
      note: "Alle Preise zzgl. MwSt. Hardware und Sonderanforderungen nach Bedarf.",
    },
  },

  // ════════════════════════════════════════════════════════════════════════════
  // ENGLISH — Conversion-optimised copy
  // ════════════════════════════════════════════════════════════════════════════
  en: {
    nav: {
      produkte: "Products",
      rechner: "Calculator",
      referenzen: "Results",
      preise: "Pricing",
      faq: "FAQ",
      cta: "Get Free Consultation",
    },

    hero: {
      headline: "Stop Paying Commission on Your Own Revenue.",
      sub: "Your own branded online shop & app — so customers order directly from you. Zero platform fees. More profit from day one.",
      cta: "Get Free Consultation",
      trust1: "5.0 Stars on Google",
      trust2: "700+ Clients",
      trust3: "0% Commission",
    },

    problem: {
      headline1: "You Do All the Work.",
      headline2: "The Platform Keeps the Profit.",
      sub: "Every order through Deliveroo, Uber Eats, or Just Eat costs you money. You take the risk, do the work — and a huge chunk of your revenue goes straight to the platform.",
      items: [
        "You pay up to 30% commission — on your own revenue.",
        "Your customer data belongs to the platform, not you.",
        "You're just one of thousands of competing listings.",
        "You have zero control over pricing, marketing or visibility.",
        "Your margins shrink while the platform keeps growing.",
      ],
    },

    solution: {
      badge: "The Solution",
      headline1: "Your Own Shop.",
      headline2: "Your Own App.",
      sub: "With Gastro Master you get a complete ordering system under your own brand — with 0% commission on every single order.",
      cta: "Get Free Consultation",
      features: [
        { title: "Your Own Webshop", text: "Your branding, your domain, your design — fully customised to your restaurant." },
        { title: "Your Own App", text: "Native iOS & Android app on the App Store & Google Play with push notifications." },
        { title: "Your Own Payments", text: "PayPal, Stripe, card payments — you stay in full control of your money." },
        { title: "Your Brand, Front & Centre", text: "No platform logo. Customers order from you — not from a marketplace." },
      ],
    },

    diff: {
      headline: "Why Gastro Master?",
      sub: "We're not just another software vendor. We're your dedicated partner — with real support, flexibility and complete control in your hands.",
      features: [
        { title: "WhatsApp Support", text: "A dedicated point of contact — no ticket queues, no waiting." },
        { title: "Phone Support", text: "Call us whenever you need help. A real person answers." },
        { title: "Cancel Anytime", text: "3-month notice period. No long-term lock-in." },
        { title: "Pay Only After Launch", text: "Your first payment isn't due until your system is live." },
        { title: "PayPal & Stripe Setup", text: "We handle the full payment provider setup for you." },
        { title: "Full Control", text: "Your logins, your data, your payments — always." },
      ],
    },

    positioning: {
      headline1: "You Do the Work.",
      headline2: "The Platform Takes a Cut.",
      sub: "Delivery platforms cost you thousands every month in commissions. Every direct order through your own shop is pure profit that stays with you.",
      items: [
        { title: "The Platform Always Takes a Cut", text: "Every Deliveroo or Uber Eats order costs you 15–30% in commission. That's your profit — and you've earned it." },
        { title: "Same Effort, Lower Margins", text: "You cook, you deliver, you take the risk — but the platform profits from every order. It doesn't have to be this way." },
        { title: "Direct Orders = Pure Profit", text: "Every order through your own shop stays 100% with you. No commission. No dependency. More profit per order." },
      ],
    },

    process: {
      badge: "How It Works",
      headline: "Our Process",
      sub: "From your first conversation to a fully live system — we guide you personally through every single step.",
      cta: "Book Your Free Call",
      steps: [
        { title: "Free Strategy Call", text: "Get in touch — we'll learn about your restaurant and give you honest, no-obligation advice." },
        { title: "Strategy & Planning", text: "Together we plan your setup: webshop, app, POS — tailored exactly to your business." },
        { title: "Menu & Setup", text: "Send us your menu and details — we handle the entire setup from start to finish." },
        { title: "Your System Goes Live", text: "Typically live within 2–3 weeks — fully set up and ready to take orders." },
      ],
    },

    trust: {
      reviews: "5.0 from 130 Google Reviews",
      headline: "700+ Restaurants Trust Gastro Master",
      sub: "From single-location independents to multi-brand chains — Gastro Master is the ordering system for restaurants that want to own their success.",
    },

    references: {
      badge: "What Our Clients Say",
      headline: "Real results from restaurants that made the switch.",
      items: [
        { name: "TAKE – The Good Food", type: "Multi-Location, Düsseldorf & Mönchengladbach", quote: "Since switching to Gastro Master, we've seen significantly more direct orders. The app and webshop work flawlessly — and the personal support is worth its weight in gold." },
        { name: "Pizzeria Il Sorriso", type: "Single Location", quote: "Finally — no more platform commissions. Setup was fast and smooth. We can't recommend Gastro Master enough." },
        { name: "Kojo Sushi", type: "Premium Delivery", quote: "Our customers now order directly through our app. It saves us real money every month and we have full control over our business." },
      ],
    },

    momentum: {
      badge: "Since 2021",
      headline: "5 Years of Momentum",
      sub: "From our first client to our own payment system — we're building the future of the restaurant industry.",
      outro: "We're forward-thinking, agile and building software that genuinely moves restaurants forward.",
      outroLabel: "Up Next",
      milestones: [
        { year: "2021", title: "Day One & Founded", text: "Laying the foundation for a new era of restaurant technology" },
        { year: "2022", title: "First 100 Clients", text: "Building trust — one restaurant at a time" },
        { year: "2023", title: "Epit Global GmbH Founded", text: "Structures for growth and international scaling" },
        { year: "2024", title: "First 500 Clients", text: "A strong network of hospitality partners across Germany" },
        { year: "2025", title: "Our Own POS System", text: "Cloud POS, self-order, pick-up screen — all in one platform" },
        { year: "2026", title: "Own Payment Processing (Epit Pay)", text: "Full control over payments — our next major milestone" },
      ],
    },

    risk: {
      headline: "Switching Is Easier Than You Think",
      sub: "We remove all the risk and personally guide you through every step of the process.",
      cta: "Get Free Consultation",
      items: [
        { title: "Zero Risk to Get Started", text: "Your first payment isn't due until your system is live. You pay nothing beforehand." },
        { title: "Fast Go-Live", text: "We handle setup, design and configuration. You stay focused on running your restaurant." },
        { title: "Personal Guidance", text: "From day one you have a dedicated contact — no anonymous ticket system, ever." },
      ],
    },

    switchOffer: {
      badge: "Switch Offer",
      headline: "50% Off When You Switch",
      sub: "Still locked into a contract with another provider? No problem — pay just half price with us while your old subscription runs out.",
      cta: "Claim This Offer",
    },

    partner: {
      badge: "Integrations & Infrastructure",
      headline: "Trusted Partners for Payments & Operations",
      sub: "Seamlessly connected with the most important payment, delivery and POS systems in the industry.",
    },

    mockup: {
      badge: "Live in Action",
      headline: "This Is What Your App Looks Like",
      sub: "Real screenshots from TAKE – The Good Food. Multi-location, branded app, own webshop — powered by Gastro Master.",
      tabs: ["Home Screen", "Menu & Ordering", "Location Overview", "Order Type", "Customer Account"],
    },

    pickup: {
      badge: "Digital Experience",
      headline1: "Your Screen.",
      headline2: "Your Appetite Starter.",
      sub: "Show your guests current offers, daily specials and highlights directly on your TV monitor. Visually compelling, always up to date — all controlled through your POS system.",
      featureTitle: "Pick-Up Screen & Digital Menu",
      features: ["Drive attention and increase revenue", "Visually highlight offers & deals"],
      cta: "Learn More",
    },

    video: {
      badge: "Client Stories",
      headline: "What Our Partners Say",
      sub: "Real restaurateurs. Real results. Real recommendations.",
      items: [
        { name: "Kojo Sushi", person: "Ha Lim Lee", quote: "Online ordering is the future — and we want to be part of it on our own terms." },
        { name: "Pizzeria il Sorriso", person: "Marco Greco", quote: "The support is simply outstanding — you won't find anything like it anywhere else!" },
        { name: "Nevada Burger & Steak", person: "Milad Ismail", quote: "Every order, the money hits my account immediately. With Gastro Master everything is flexible." },
        { name: "61 Burger & More", person: "Sven Heinrich", quote: "Fast, responsive WhatsApp support and all the tools to properly run and structure your business." },
      ],
    },

    transaktion: {
      badge: "Optional Add-on for Shop & App",
      headline: "Protect Your Margins with Transaction Pass-Through",
      sub: "Strategically pass on payment fees to customers — and protect every euro of your margin. Your own PayPal and Stripe account, full control over your money.",
      cta: "Get Free Consultation",
      features: [
        "Your own PayPal Business account",
        "Your own Stripe account",
        "You keep full control over your revenue",
        "Strategically pass payment fees to customers",
        "More payment methods without losing margin",
      ],
      calcBadge: "Fee Calculator",
      calcOrders: "Orders / Month",
      calcCart: "Avg. Basket Value",
      calcResult: "Estimated monthly payment fees",
      calcNote: "→ With the Transaction Pass-Through add-on, you can pass these fees on strategically.",
    },

    calculator: {
      badge: "Commission Calculator",
      headline: "See Exactly What the Platform Is Costing You",
      sub: "Calculate how much profit you're losing to delivery platforms every single month.",
      labelOrders: "Orders / Month",
      labelCart: "Avg. Basket (€)",
      labelCommission: "Commission (%)",
      cardRevenue: "Monthly Revenue",
      cardMonth: "Commission / Month",
      cardYear: "Commission / Year",
      savingsText: "With Gastro Master you save up to",
      savingsSuffix: "per year — at 0% commission.",
      cta: "Get Free Consultation",
    },

    pricing: {
      headline: "From First Steps to Complete Solution.",
      sub: "Clear plans. Clear differences. Choose the model that fits your business.",
      vatNote: "excl. VAT",
      setupNote: "All prices excl. VAT. One-time setup fee from €400–€1,600 net depending on scope. Payment fees (PayPal / Stripe) charged separately. Hardware and special requirements discussed individually.",
      durationLabel: "Go-Live",
      ctaPrimary: "Get Free Consultation",
      ctaSecondary: "Request a Quote",
      showComparison: "Compare All Features in Detail",
      hideComparison: "Hide Comparison",
      perMonth: "/month",
      from: "from",
      badgePopular: "Most Popular",
      onRequest: "Custom Pricing",
      packageFeatures: {
        beginner: ["Website + Sub-pages", "1 Custom Domain", "2 Mailboxes"],
        basic: ["Webshop (commission-free)", "Unlimited Orders", "2,500 Flyers with QR Code", "Customer Loyalty Points", "Up to 3 Mailboxes"],
        standard: ["Webshop + Native App", "Push Notifications", "Unlimited Orders", "5,000 Flyers with QR Code", "Up to 4 Mailboxes"],
        pro: ["Everything in Standard", "Cloud POS (TSE-compliant)", "Transaction Pass-Through incl.", "10,000 Flyers with QR Code", "Up to 5 Mailboxes"],
        enterprise: ["Custom Design", "On-site Photographer Optional", "Cloud POS incl.", "Transaction Pass-Through incl.", "Framework Agreement"],
      },
      plans: [
        { id: "beginner", name: "Beginner", tagline: "Your First Online Presence", price: "49", duration: "7–10 days" },
        { id: "basic", name: "Basic", tagline: "Online Shop Only", price: "79", duration: "10–14 days" },
        { id: "standard", name: "Standard", tagline: "Shop + App", price: "149", duration: "2–3 weeks", popular: true },
        { id: "pro", name: "Pro", tagline: "Shop + App + POS", price: "219", duration: "2–3 weeks" },
        { id: "enterprise", name: "Enterprise", tagline: "Franchise / Multi-Location", price: "Custom", duration: "By project scope" },
      ],
    },

    faq: {
      badge: "Frequently Asked Questions",
      sub: "Still have questions? Find your answers here — or just give us a call.",
      items: [
        { q: "How quickly can I get started?", a: "Your shop is typically live within a few weeks. We handle setup, design and configuration for you." },
        { q: "Do I have to pay upfront?", a: "No. Your first payment isn't due until your system is live. There are no costs beforehand." },
        { q: "Do you help set up PayPal and Stripe?", a: "Yes — we handle the complete setup of your payment providers, including verification." },
        { q: "How does support work?", a: "Via WhatsApp, phone or email. You have a dedicated personal contact — no anonymous ticket system." },
        { q: "Am I locked into a long contract?", a: "No. You can cancel at any time with 3 months' notice. No long-term lock-in." },
        { q: "What if I'm switching from another provider?", a: "We make switching as easy as possible — including 50% off while your old subscription is still running." },
        { q: "Can I add a POS system later?", a: "Yes, at any time. Gastro Master offers everything from one place — shop, app and POS." },
      ],
    },

    contact: {
      headline: "Ready to Unlock More Profit?",
      sub: "Let us show you in a free strategy call how Gastro Master drives more direct orders and puts more money back in your pocket.",
      trust1: "5.0 Stars on Google — 130 Reviews",
      trust2: "700+ Happy Clients",
      trust3: "0% Commission on Direct Orders",
      labelName: "Your Name *",
      placeholderName: "John Smith",
      labelBusiness: "Restaurant Name *",
      placeholderBusiness: "The Golden Fork",
      labelZip: "Postcode",
      placeholderZip: "W1A 1AA",
      labelPhone: "Phone Number *",
      placeholderPhone: "+44 7700 900000",
      labelMessage: "Your Message",
      placeholderMessage: "I'd like to...",
      labelInterest: "I'm interested in:",
      interests: ["Webshop", "App", "POS System", "Website", "Transaction Pass-Through"],
      cta: "Request Free Consultation",
      success: "Thank you! We'll be in touch shortly.",
    },

    footer: {
      impressum: "Imprint",
      datenschutz: "Privacy Policy",
      agb: "Terms & Conditions",
      kontakt: "Contact",
      downloads: "Downloads",
      rights: "All rights reserved.",
    },

    sticky: {
      cta: "Get Free Consultation",
    },

    // ── Founder / Team ────────────────────────────────────────────────────────
    founder: {
      badge: "The Team Behind Gastro Master",
      headline1: "Real People.",
      headline2: "Real Guidance.",
      sub: "Not an anonymous software vendor — a dedicated team of 30+ professionals who support you personally every step of the way.",
      langTitle: "Consulting That Speaks Your Language.",
      langSub: "Our consulting is personal, direct and linguistically close to your everyday life. We speak your language — so you feel understood from day one.",
      linkedin: "LinkedIn Profile",
      people: {
        rene: { role: "Founder & CEO", focus: "Sales & Marketing", bio: "After completing his Bachelor's in International Business Management, he chose the entrepreneurial path. His focus is on growth, sales and strategic market development." },
        sanjaya: { role: "Founder & CEO", focus: "IT & Technology", bio: "Long-standing IT specialist with experience in technology and leadership roles at globally leading companies including Procter & Gamble. Focused on product, systems and scalable technology." },
        salvatore: { role: "Head of Sales", focus: "Client Consulting", bio: "Several years of sales experience. Previously in luxury watch sales at a leading online retailer such as CHRONEXT — and knows that every single detail matters." },
        andrej: { role: "Service Customer Manager", focus: "Client Support", bio: "Previously in management positions in food retail, including at Rewe. Brings solid experience in customer service and operational organisation." },
        mohammad: { role: "Sales", focus: "Hospitality Expertise", bio: "Former restaurateur who found his way onto the team through his own positive experience as a customer. He knows the industry's challenges first-hand." },
      },
    },

    // ── Target Groups ─────────────────────────────────────────────────────────
    target: {
      badge: "For Every Restaurant",
      headline: "Your Business. Your Solution.",
      sub: "Whether it's a pizzeria, franchise or ghost kitchen — find the model that fits your business perfectly.",
      cta: "Get a Consultation",
      groups: [
        { id: "lieferdienst", label: "Delivery Service", content: { title: "More Profit Per Delivery", subtitle: "Your own ordering channel — zero platform commission", text: "With your own webshop and app you reach customers directly. No commissions, full control over your delivery business." } },
        { id: "franchise", label: "Franchise", content: { title: "One System for All Locations", subtitle: "Central control, local flexibility", text: "Manage multiple locations through a single dashboard. Consistent branding, central menu management and individual adjustments per site." } },
        { id: "ghost", label: "Ghost Kitchen", content: { title: "Maximum Margin Without a Storefront", subtitle: "Delivery-first — without platform dependency", text: "As a ghost kitchen, every cent counts. Your own ordering system cuts out high platform commissions and builds direct customer relationships." } },
        { id: "einzelhandel", label: "Retail Shop", content: { title: "Your Shop — Now Online Too", subtitle: "Click & collect and direct orders", text: "Give your customers a modern online ordering experience. Perfect for delis, butchers, drinks retailers and local specialty shops." } },
        { id: "baeckerei", label: "Bakery", content: { title: "Order Fresh, Pick Up Locally", subtitle: "Pre-orders and branch pickup made simple", text: "Let your customers pre-order rolls, cakes and snacks conveniently — through your own webshop or app." } },
      ],
      subs: [
        { id: "pizzeria", label: "Pizzeria", content: { title: "The No. 1 in Delivery", subtitle: "Pizza orders directly through your app", text: "Pizzerias benefit most from direct orders. Save up to 30% commission per order." } },
        { id: "asiatisch", label: "Asian", content: { title: "Asian Food, Your Own Orders", subtitle: "Sushi, wok & more — ordered direct", text: "Whether sushi, pad thai or ramen — with your own webshop customers order directly from you." } },
        { id: "indisch", label: "Indian", content: { title: "Indian Specialities Ordered Direct", subtitle: "Curry, tandoori & more — commission-free", text: "Your customers love your food — why should a platform take a cut?" } },
        { id: "burger", label: "Burger & Chicken", content: { title: "Burger & Chicken Without Commission", subtitle: "Fast-food orders direct through you", text: "Burger restaurants and chicken shops are among the strongest delivery categories. Take back your margin." } },
        { id: "eis", label: "Ice Cream & Desserts", content: { title: "Sweet Orders, Full Profit", subtitle: "Ice cream, waffles & desserts delivered direct", text: "Ice cream parlours and dessert shops with delivery are booming. Use your own webshop for pre-orders." } },
        { id: "baeckerei-sub", label: "Bakery", content: { title: "Bakery With Delivery Service", subtitle: "Let customers pre-order rolls, cakes & more", text: "Let customers conveniently pre-order in the morning and deliver fresh — or offer click & collect." } },
      ],
    },

    // ── POS Section ───────────────────────────────────────────────────────────
    pos: {
      badge: "Available Standalone",
      headline: "The Gastro Master Cloud POS",
      sub: "TSE-compliant POS software for restaurants, delivery services and hospitality businesses — also available without a webshop or app.",
      posTag: "Cloud POS Software",
      posPrice: "from €69 / month",
      posVat: "excl. VAT",
      posCta: "Get POS Consultation",
      posFeatures: ["TSE-compliant cloud POS software", "Cancel monthly", "Runs on Windows computers", "Cloud back-office & reporting", "Table service, delivery & collection", "Personal support via WhatsApp", "Modular extensions via add-ons"],
      addon1Title: "Driver App with GPS",
      addon1Price: "+€10 / month per driver excl. VAT",
      addon1Features: ["GPS tracking for all drivers", "Full transparency in your delivery operation", "Ideal for businesses with their own delivery team"],
      addon2Title: "Bar System / QR Code Table Ordering",
      addon2Price: "+€50 / month for 5 tables, +€5 per additional table excl. VAT",
      addon2Features: ["QR code ordering at the table", "Modern in-house dining experience", "Perfect for restaurants with table service"],
      addon3Title: "Self-Ordering & Hardware",
      addon3Price: "Hardware on request",
      addon3Features: ["Pick-up screen & kitchen display", "Self-checkout terminals", "Counter, freestanding & outdoor variants", "Software functionality already included"],
      note: "All prices excl. VAT. Hardware and special requirements on request.",
    },
  },
} as const;

export type Translations = typeof translations.de;
