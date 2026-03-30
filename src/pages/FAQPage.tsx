import React, { useState, useEffect, useMemo } from "react";
import { useSeoMeta } from "@/hooks/useSeoMeta";
import { motion, AnimatePresence } from "framer-motion";
import {
  HelpCircle, Truck, Store, UtensilsCrossed, Coffee, Building2,
  Monitor, ShoppingCart, Printer, ChevronDown, ArrowRight, Search, X, Phone, Mail, TrendingUp,
} from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";

/* ─── Helpers ────────────────────────────────────────────── */

function renderWithLinks(text: string): React.ReactNode {
  const regex = /\[([^\]]+)\]\(([^)]+)\)/g;
  const parts: React.ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let key = 0;
  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) parts.push(text.slice(lastIndex, match.index));
    parts.push(
      <Link key={key++} to={match[2]} className="text-cyan-brand hover:underline font-medium">
        {match[1]}
      </Link>
    );
    lastIndex = regex.lastIndex;
  }
  if (lastIndex < text.length) parts.push(text.slice(lastIndex));
  return <>{parts}</>;
}

const plainText = (t: string) => t.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1");

/* ─── Types ──────────────────────────────────────────────── */

interface FAQItem { id: string; q: string; a: string; source?: string; sourceHref?: string; }
interface FAQCategory { id: string; label: string; Icon: React.ElementType; items: FAQItem[]; }

/* ─── Data ───────────────────────────────────────────────── */

const FAQ_CATEGORIES: FAQCategory[] = [
  {
    id: "allgemein",
    label: "Allgemein & Einstieg",
    Icon: HelpCircle,
    items: [
      { id: "was-macht-gastro-master", q: "Was macht Gastro Master?", a: "Gastro Master gibt dir dein eigenes digitales System — mit App, Webshop, Kassensystem und Webseite. Du zahlst 0 % Provision und behältst alle Kundendaten. Über 700 Betriebe in Deutschland setzen auf Gastro Master. Schau dir alle [Produkte von Gastro Master](/produkte) an." },
      { id: "unterschied-lieferando", q: "Wie unterscheidet sich Gastro Master von Lieferando & Co.?", a: "Lieferando nimmt 13–30 % Provision auf jede Bestellung — bei Gastro Master zahlst du 0 %. Du bekommst dein eigenes System: eigene App, eigener Webshop, eigenes Branding. Kein Algorithmus entscheidet, ob du sichtbar bist. Den Vergleich findest du auf unserer [Lösungsseite](/loesungen)." },
      { id: "kosten-allgemein", q: "Wie viel kostet die Nutzung von Gastro Master?", a: "Der Webshop kostet ab 49 €/Monat, das Kassensystem ab 69 €/Monat, die Webseite ab 49 €/Monat. Die App wird individuell kalkuliert — ein kurzes Gespräch genügt. Die Einrichtungskosten werden individuell besprochen. Alle Infos auf den [Produktseiten](/produkte)." },
      { id: "mindestvertragslaufzeit", q: "Gibt es eine Mindestvertragslaufzeit?", a: "Es gibt keine langen Laufzeiten — nur eine 3-monatige Kündigungsfrist. Du kannst flexibel kündigen. Bei Fragen erreichst du uns direkt über die [Kontaktseite](/kontakt)." },
      { id: "wie-schnell-live", q: "Wie schnell erhalte ich mein eigenes System?", a: "In der Regel bist du in 2–3 Wochen live. Das gilt für Webshop und App. Das Kassensystem wird individuell eingerichtet. Wir begleiten dich vom ersten Tag an persönlich." },
      { id: "welche-software-restaurant", q: "Welche Software brauche ich für mein Restaurant?", a: "Das hängt von deinem Betrieb ab. Für Online-Bestellungen brauchst du einen [Webshop](/produkte/webshop), für die Abrechnung ein [Kassensystem](/produkte/kassensystem). Beides lässt sich kombinieren. Schau dir unsere [Restaurantlösung](/loesungen/restaurant) an." },
      { id: "kosten-bestellsystem", q: "Was kostet ein digitales Bestellsystem für die Gastronomie?", a: "Ein eigener Webshop kostet ab 49 €/Monat — mit 0 % Provision. Bei Lieferando zahlst du 13–30 % auf jede Bestellung: bei 5.000 € Monatsumsatz sind das bis zu 1.500 € extra. Mehr zur [Lieferdienst-Lösung](/loesungen/lieferdienst)." },
      { id: "fuer-wen-geeignet", q: "Für wen ist Gastro Master geeignet?", a: "Für Restaurants, Cafés, Bäckereien, Lieferdienste und Franchise-Systeme — Neugründung oder bestehender Betrieb. Überblick auf der [Lösungsseite](/loesungen)." },
    ],
  },
  {
    id: "lieferdienst-gruenden",
    label: "Lieferdienst gründen",
    Icon: Truck,
    items: [
      { id: "kosten-gruendung", q: "Was kostet es, einen Lieferdienst zu gründen?", a: "Der größte Kostenblock ist die Technik. Mit Gastro Master bekommst du Webshop und App ohne Provision. Dazu kommen Lebensmittel, Verpackung und ggf. Fahrer. Alle Details zur [Lieferdienst-Gründung](/loesungen/lieferservice-gruenden)." },
      { id: "ohne-restaurant", q: "Brauche ich ein Restaurant, um einen Lieferdienst zu starten?", a: "Nein. Du kannst auch als Ghost Kitchen starten — ohne eigenen Gastraum. Was du brauchst: eine Gewerbeküche, eine Betriebserlaubnis und ein Bestellsystem. Mehr auf der Seite [Lieferdienst gründen](/loesungen/lieferservice-gruenden)." },
      { id: "provision-lieferando", q: "Wie viel Provision nimmt Lieferando?", a: "Lieferando berechnet Restaurants 14 % des Bestellwerts plus 0,69 € je Online-Transaktion (Marketplace-Modell, Stand 2025). Bei 500 Bestellungen à 20 € im Monat macht das rund 1.745 € — nur für die Plattform, jeden Monat. Nutzt du zusätzlich Lieferandos eigenen Fahrdienst, steigt die Provision auf bis zu 30 %. Mit einem eigenen [Webshop](/produkte/webshop) zahlst du 0 %.", source: "Lieferfabrik, Lieferando Gebührenmodell 2024/2025" },
      { id: "lohnt-sich-2026", q: "Lohnt sich ein eigener Lieferdienst 2026?", a: "Ja — wenn du dein eigenes System nutzt. Laut Statista nutzten 2024 über 20 Mio. Deutsche regelmäßig Online-Essensbestellungen. Wer auf ein eigenes System setzt, behält die Marge. Details zur [Lieferdienst-Gründung 2026](/loesungen/lieferservice-gruenden).", source: "Statista, Online Food Delivery Germany 2024" },
      { id: "genehmigungen", q: "Welche Genehmigungen brauche ich für einen Lieferdienst?", a: "Du brauchst eine Gewerbeanmeldung und eine Betriebserlaubnis vom Gesundheitsamt. Bei eigenem Fahrservice kommt eine Transportgenehmigung dazu. Alle Schritte auf der Seite [Lieferdienst gründen](/loesungen/lieferservice-gruenden)." },
    ],
  },
  {
    id: "lieferdienst-erweitern",
    label: "Lieferdienst erweitern",
    Icon: Store,
    items: [
      { id: "lieferservice-anbieten", q: "Wie biete ich einen Lieferservice an?", a: "Du brauchst ein Bestellsystem, das Bestellungen entgegennimmt und an deine Küche weiterleitet. Mit Gastro Master bekommst du einen eigenen [Webshop](/produkte/webshop) und bei Bedarf eine [App](/produkte/app). Kunden bestellen direkt bei dir — ohne Zwischenhändler." },
      { id: "bestellsystem-kosten", q: "Was kostet ein eigenes Bestellsystem?", a: "Der Webshop kostet ab 49 €/Monat — du zahlst 0 % Provision. Bei Lieferando zahlst du 13–30 % auf jede Bestellung. Mehr auf der Seite [Lieferdienst erweitern](/loesungen/lieferdienst)." },
      { id: "lieferando-vs-eigen", q: "Lohnt sich ein eigener Lieferservice statt Lieferando?", a: "Ja — besonders ab einem Monatsumsatz von 3.000 €. Bei 5.000 € Umsatz sparst du bis zu 1.500 € im Monat gegenüber Lieferando. Schau dir den Vergleich auf unserer [Lieferdienstseite](/loesungen/lieferdienst) an." },
      { id: "eigene-app-lieferdienst", q: "Brauche ich eine eigene App für meinen Lieferdienst?", a: "Nicht unbedingt. Ein eigener [Webshop](/produkte/webshop) reicht für viele Betriebe aus. Eine eigene [App](/produkte/app) lohnt sich, wenn du Stammkunden mit Push-Nachrichten binden willst. Wir beraten dich gern kostenlos." },
      { id: "wechsel-von-lieferando", q: "Wie wechsle ich von Lieferando zu einem eigenen Bestellsystem?", a: "Der Umstieg dauert 2–3 Wochen: Wir richten deinen Webshop ein, du kommunizierst den neuen Link an deine Stammkunden — per Aufkleber, E-Mail und Social Media. Speisekarte und Bilder übernehmen wir direkt. Viele Betriebe erhalten erste eigene Bestellungen noch in der ersten Woche. Details auf der [Lieferdienst-Lösung](/loesungen/lieferdienst)." },
    ],
  },
  {
    id: "restaurant-kassensystem",
    label: "Restaurant & Kassensystem",
    Icon: UtensilsCrossed,
    items: [
      { id: "kassensystem-restaurant", q: "Welches Kassensystem brauche ich für mein Restaurant?", a: "Du brauchst ein TSE-konformes Kassensystem — das ist in Deutschland seit 2020 Pflicht. Das Gastro Master [Kassensystem](/produkte/kassensystem) hat Tischverwaltung, Bon-Drucker-Anbindung und TSE eingebaut. Ab 69 €/Monat — mehr auf der [Restaurantlösung](/loesungen/restaurant)." },
      { id: "was-ist-tse", q: "Was ist eine TSE und brauche ich sie?", a: "TSE steht für Technische Sicherheitseinrichtung — seit März 2021 für alle elektronischen Kassensysteme in Deutschland Pflicht (KassenSichV, §146a AO). Neu ab 1. Juli 2025: Alle Kassen müssen zusätzlich über ELSTER beim Finanzamt gemeldet werden. Das Gastro Master [Kassensystem](/produkte/kassensystem) ist TSE-zertifiziert und unterstützt die Meldung.", source: "Kassensicherungsverordnung (KassenSichV), BMF; § 146a Abs. 4 AO, Stand Juli 2025" },
      { id: "kassensystem-kosten", q: "Was kostet ein Kassensystem für die Gastronomie?", a: "Das Gastro Master Kassensystem kostet ab 69 €/Monat — inklusive TSE, Bon-Drucker-Anbindung und persönlichem Support. Details auf der [Kassensystem-Seite](/produkte/kassensystem)." },
      { id: "restaurant-online-sichtbar", q: "Wie mache ich mein Restaurant online sichtbar?", a: "Mit einer eigenen [Webseite](/produkte/webseite) und einem [Online-Bestellshop](/produkte/webshop). Beide Produkte sind auf Google-Sichtbarkeit optimiert. Mehr dazu auf unserer [Restaurantlösung](/loesungen/restaurant)." },
      { id: "kassensystem-pflicht", q: "Muss ich als Gastronom ein Kassensystem haben?", a: "Ja. Seit 2021 schreibt das Finanzamt eine TSE-zertifizierte Kasse vor. Betriebe ohne TSE-Kassensystem riskieren Bußgelder bis zu 25.000 €. Unser [Kassensystem](/produkte/kassensystem) ist TSE-konform und sofort einsatzbereit.", source: "Abgabenordnung §146a; KassenSichV" },
      { id: "kassenmeldepflicht-2025", q: "Was ist die Kassenmeldepflicht 2025 — bin ich betroffen?", a: "Ja. Seit dem 1. Juli 2025 müssen alle Gastronomen mit elektronischen Kassensystemen ihre Kasse beim Finanzamt über ELSTER melden (§ 146a Absatz 4 Abgabenordnung). Bestandskassen mussten bis 31. Juli 2025 gemeldet sein, neue Kassen müssen innerhalb eines Monats nach Kauf gemeldet werden. Das Gastro Master [Kassensystem](/produkte/kassensystem) unterstützt dich dabei — TSE-zertifiziert und meldereif.", source: "Bundesministerium der Finanzen, § 146a Abs. 4 AO; Stand Juli 2025" },
    ],
  },
  {
    id: "cafe-baeckerei",
    label: "Café & Bäckerei",
    Icon: Coffee,
    items: [
      { id: "kassensystem-baeckerei", q: "Welches Kassensystem brauche ich für meine Bäckerei?", a: "Ein TSE-konformes Kassensystem — das ist gesetzlich vorgeschrieben. Das Gastro Master [Kassensystem](/produkte/kassensystem) ist TSE-zertifiziert, schnell in der Abwicklung und kostet ab 69 €/Monat. Mehr auf der [Café & Bäckerei-Lösung](/loesungen/cafe-baeckerei)." },
      { id: "torten-vorbestellung", q: "Kann ich Torten online zur Vorbestellung anbieten?", a: "Ja. Mit dem Gastro Master [Webshop](/produkte/webshop) können Kunden Torten, Catering und andere Produkte online vorbestellen. Du siehst alle Bestellungen zentral — kein Telefon nötig. Details auf der Seite [Café & Bäckerei](/loesungen/cafe-baeckerei)." },
      { id: "kassensystem-cafe", q: "Was kostet ein Kassensystem für Cafés?", a: "Das Gastro Master Kassensystem kostet ab 69 €/Monat — inklusive TSE und persönlichem Support. Alle Details im [Kassensystem-Überblick](/produkte/kassensystem)." },
      { id: "tse-baeckerei", q: "Brauche ich als Bäckerei eine TSE-Kasse?", a: "Ja. Alle Betriebe in Deutschland mit Kassensystem brauchen seit 2020 eine TSE-zertifizierte Kasse — Bäckerei, Café und Restaurant eingeschlossen. Unser [Kassensystem](/produkte/kassensystem) erfüllt alle Anforderungen." },
      { id: "online-bestellungen-cafe", q: "Wie kann ich als Café Online-Bestellungen annehmen?", a: "Mit dem Gastro Master [Webshop](/produkte/webshop). Kunden bestellen online vor, du bereitest alles vor — kein Warten, kein Stress. Für Torten, Frühstückspakete und Catering ideal — mehr in der [Café & Bäckerei-Lösung](/loesungen/cafe-baeckerei)." },
    ],
  },
  {
    id: "franchise",
    label: "Franchise",
    Icon: Building2,
    items: [
      { id: "franchise-aufbauen", q: "Wie baue ich ein Franchise-System in der Gastronomie auf?", a: "Ein Gastro-Franchise braucht einheitliches Branding, standardisierte Prozesse und eine zentrale Technikinfrastruktur. Gastro Master liefert App, Webshop, Kassensystem und Webseite — zentral verwaltet, einheitlich gebrandet. Alle Details auf der [Franchise-Lösung](/loesungen/franchise)." },
      { id: "software-franchise", q: "Welche Software braucht man für ein Gastro-Franchise?", a: "Du brauchst ein System, das alle Standorte mit demselben Bestellsystem, derselben App und demselben Kassensystem betreibt. Gastro Master bietet genau das — zentral verwaltet, 0 % Provision. Zur [Franchise-Seite](/loesungen/franchise)." },
      { id: "kosten-franchise", q: "Was kostet die digitale Infrastruktur für ein Franchise-System?", a: "Der Preis hängt von der Anzahl der Standorte und den gewünschten Produkten ab. Wir erstellen ein individuelles Angebot — schau dir zuerst die [Franchise-Lösung](/loesungen/franchise) an oder schreib uns über die [Kontaktseite](/kontakt)." },
      { id: "mehrere-standorte", q: "Wie manage ich Bestellungen über mehrere Franchise-Standorte?", a: "Mit Gastro Master bekommt jeder Standort sein eigenes System — zentral konfiguriert, lokal betrieben. Alle Bestellungen laufen über dasselbe Backend. Details auf der [Franchise-Seite](/loesungen/franchise)." },
      { id: "eine-app-franchise", q: "Braucht jeder Franchise-Standort eine eigene App?", a: "Nein. Du hast eine App für alle Standorte — Kunden wählen ihren Standort beim Öffnen. Einheitliches Branding, zentrale Verwaltung. Mehr dazu auf der [Franchise-Lösung](/loesungen/franchise)." },
    ],
  },
  {
    id: "produkte-technik",
    label: "Produkte & Technik",
    Icon: Monitor,
    items: [
      { id: "zahlungsmethoden", q: "Welche Zahlungsmethoden werden unterstützt?", a: "Gastro Master unterstützt alle gängigen Zahlungsmethoden: Kreditkarte, EC-Karte, PayPal, Apple Pay und Google Pay. Details auf der [Webshop-Seite](/produkte/webshop)." },
      { id: "eigene-domain", q: "Kann ich meine eigene Domain verwenden?", a: "Ja. Du kannst deine bestehende Domain nutzen oder eine neue einrichten — wir unterstützen dich dabei. Mehr auf der [Webshop-Seite](/produkte/webshop)." },
      { id: "webshop-ohne-app", q: "Kann ich den Webshop ohne die App nutzen?", a: "Ja. [Webshop](/produkte/webshop) und [App](/produkte/app) sind separate Produkte. Viele Betriebe starten mit dem Webshop und fügen die App später hinzu. Beide funktionieren unabhängig voneinander." },
      { id: "seo-webseite", q: "Gibt es Zusatzoptionen für SEO oder eine Webseite?", a: "Ja. Gastro Master bietet eigene [Webseiten](/produkte/webseite) — vom Onepager ab 49 €/Monat bis zur individuellen Umsetzung. Alle Webseiten sind auf Google-Sichtbarkeit optimiert." },
      { id: "mehrere-standorte-technik", q: "Ist das System für mehrere Standorte geeignet?", a: "Ja. Gastro Master funktioniert für einzelne Betriebe und Franchise-Systeme mit vielen Standorten. Zentrale Verwaltung, einheitliches Branding. Details zur [Franchise-Infrastruktur](/loesungen/franchise)." },
      { id: "design-anpassen", q: "Kann ich das Design und die Speisekarte selbst anpassen?", a: "Ja. Speisekarte, Bilder, Preise und Kategorien kannst du selbst anpassen — jederzeit, ohne Technik-Kenntnisse. Dein Branding wird beim Setup eingebaut. Mehr über [Webshop-Anpassungen](/produkte/webshop)." },
      { id: "bilder-gerichte", q: "Können Bilder von Gerichten integriert werden?", a: "Ja. Du kannst für jedes Gericht ein Bild hochladen. Gerichte mit Bildern werden laut Studien bis zu 30 % häufiger bestellt. Details in der [Bestell-App](/produkte/app).", source: "Studie zur visuellen Menügestaltung, 2023" },
      { id: "keine-werbung", q: "Gibt es in meinem Webshop oder der App Werbung von Drittanbietern?", a: "Nein. Dein Webshop und deine App sind werbefrei — kein Fremd-Logo, keine Drittanbieter-Werbung. Du bist der Absender. Das ist der Unterschied zu Lieferando. Mehr auf der [App-Seite](/produkte/app)." },
      { id: "umsatz-pruefen", q: "Wie überprüfe ich meinen Umsatz?", a: "Über dein persönliches Dashboard siehst du alle Bestellungen, Umsätze und Statistiken in Echtzeit. Berichte lassen sich exportieren. Details auf der [Kassensystem-Seite](/produkte/kassensystem)." },
      { id: "epit-pay", q: "Was ist Epit Pay?", a: "Epit Pay ist die eigene Zahlungslösung von Gastro Master — entwickelt speziell für die Gastronomie. Sie verbindet Kasse, Bestellsystem und Zahlungsabwicklung aus einer Hand. Epit Pay ist bereits in alle Gastro Master Produkte integriert. Mehr auf der [Transaktionsumlage-Seite](/produkte/transaktionsumlage)." },
      { id: "transaktionsumlage", q: "Wie funktioniert die Transaktionsumlage?", a: "Die Transaktionsumlage ermöglicht es dir, Zahlungsgebühren auf deine Kunden umzulegen — statt sie selbst zu tragen. Das ist in vielen europäischen Ländern Standard. Individuelle Konditionen besprechen wir im Gespräch. Mehr auf der [Transaktionsumlage-Seite](/produkte/transaktionsumlage)." },
    ],
  },
  {
    id: "bestellung-betrieb",
    label: "Bestellung & Betrieb",
    Icon: ShoppingCart,
    items: [
      { id: "zubereitungszeit", q: "Wie kann ich die Zubereitungszeit bei Bestellungen einstellen?", a: "Im Backend stellst du die Standardzubereitungszeit ein — z.B. 30 Minuten. Kunden sehen die voraussichtliche Lieferzeit direkt beim Bestellen. Details auf der [App-Seite](/produkte/app)." },
      { id: "verlaengerte-zubereitungszeit", q: "Wie wird der Kunde über eine verlängerte Zubereitungszeit informiert?", a: "Per Push-Nachricht in der App und per E-Mail — direkt aus deinem Backend. Kunden bleiben informiert, ohne dass du anrufen musst. Mehr im [App-Überblick](/produkte/app)." },
      { id: "klingelton", q: "Kann ich den Klingelton für Bestellungen anpassen?", a: "Ja. Im Backend stellst du ein, wie du bei neuen Bestellungen benachrichtigt wirst — laut, dezent oder Vibration. Details zur [Bestellsystem-Konfiguration](/produkte/webshop)." },
      { id: "rabattaktionen", q: "Wie kann ich Rabattaktionen einstellen?", a: "Im Backend gibt es eine eigene Rubrik für Rabatte. Du kannst prozentuale Rabatte, Mindestbestellwerte und Zeiträume einstellen. Alle Features der [Gastro-App](/produkte/app)." },
      { id: "coupon-codes", q: "Wie funktionieren die digitalen Coupon-Codes?", a: "Du erstellst Coupon-Codes direkt im Backend — mit festem Betrag oder prozentualem Rabatt. Kunden geben den Code beim Checkout ein. Mehr zum [Bestellsystem](/produkte/webshop)." },
      { id: "push-nachrichten", q: "Können Kunden über die App informiert werden? (Push-Nachrichten)", a: 'Ja. Du kannst Push-Nachrichten direkt aus dem Backend an alle App-Nutzer schicken — z.B. "Heute Sonderangebot!". Das funktioniert auf iOS und Android. Details zur [App und Push-Nachrichten](/produkte/app).' },
      { id: "tagesgerichte", q: "Kann ich spezielle Tagesgerichte in der App anzeigen lassen?", a: "Ja. Du kannst Tagesgerichte, Sonderangebote und saisonale Produkte jederzeit aktivieren oder deaktivieren — ohne Support. Details zu [App-Funktionen](/produkte/app)." },
      { id: "speisekarte-uhrzeiten", q: "Kann ich die Speisekarte nach Uhrzeiten steuern?", a: "Ja. Kategorien und Produkte lassen sich zu bestimmten Uhrzeiten ein- und ausblenden — z.B. Frühstück nur bis 11 Uhr. Mehr im [Online-Bestellsystem](/produkte/webshop)." },
    ],
  },
  {
    id: "bondrucker-hardware",
    label: "Bondrucker & Hardware",
    Icon: Printer,
    items: [
      { id: "drucker-kein-internet", q: "Was passiert, wenn der Drucker nicht mit dem Internet verbunden ist?", a: "Bestellungen werden zwischengespeichert und gedruckt, sobald die Verbindung wieder besteht. Im Notfall siehst du alle Bestellungen am Bildschirm. Details zu [Bondrucker und Kasse](/produkte/kassensystem)." },
      { id: "bluetooth-drucker", q: "Kann ich den Bon-Drucker auch über Bluetooth verbinden?", a: "Ja. Unsere Bondrucker unterstützen WLAN und Bluetooth — ideal für Cafés oder Theken ohne feste Verkabelung. Mehr im [Kassensystem-Bereich](/produkte/kassensystem)." },
      { id: "tagesbericht-drucken", q: "Wie kann ich den Tagesbericht ausdrucken?", a: "Im Backend unter \"Berichte\" druckst du den Tagesbericht auf Knopfdruck — direkt über den angeschlossenen Bondrucker. Details zur [Kassen-Software](/produkte/kassensystem)." },
      { id: "ersatzteile", q: "Was mache ich, wenn ich Ersatzteile benötige?", a: "Meld dich bei unserem Support — wir liefern Ersatzteile in der Regel innerhalb von 1–2 Werktagen. Kontakt über unser [Kontaktformular](/kontakt)." },
      { id: "drucker-ausfall", q: "Was passiert, wenn der Drucker während des Betriebs ausfällt?", a: "Bestellungen siehst du weiterhin am Tablet oder Smartphone und kannst sie bestätigen. Unser Support ist direkt erreichbar. Mehr zur [Bondrucker-Integration](/produkte/kassensystem)." },
    ],
  },
  {
    id: "zahlen-trends",
    label: "Zahlen & Branchentrends",
    Icon: TrendingUp,
    items: [
      { id: "liefermarkt-deutschland-2025", q: "Wie groß ist der Online-Liefermarkt in Deutschland 2025?", a: "Der Online-Liefermarkt in Deutschland wird laut Statista 2025 auf rund 18,75 Milliarden Euro geschätzt — mit einem jährlichen Wachstum von 9,4 % bis 2028. Rund 38,9 % der deutschen Haushalte nutzen Essenslieferungen online. Mit einem eigenen [Bestellsystem](/produkte/webshop) profitierst du direkt vom Marktwachstum — ohne Provision.", source: "Statista, Online Food Delivery Outlook Deutschland 2025", sourceHref: "https://www.statista.com/outlook/emo/online-food-delivery/germany" },
      { id: "lieferando-provision-kalkulation", q: "Was kostet Lieferando Restaurants wirklich pro Monat?", a: "Lieferando berechnet 14 % des Bestellwerts plus 0,69 € je Transaktion. Konkret: Bei 500 Bestellungen à 20 € im Monat zahlst du ca. 1.745 € — jeden Monat. Bei 1.000 Bestellungen sind es bereits ca. 3.490 €. Ein eigener [Webshop](/produkte/webshop) mit integriertem Bestellsystem kostet 79 €/Monat — bei 0 % Provision. Die Differenz kann über 40.000 € pro Jahr betragen.", source: "Lieferando Partnerkonditionen, Stand 2025; eigene Kalkulation", sourceHref: "https://www.lieferando.de/partner" },
      { id: "gastronomiebetriebe-deutschland", q: "Wie viele Gastronomiebetriebe gibt es in Deutschland?", a: "In Deutschland gibt es laut DEHOGA rund 153.545 Restaurants und Bars (Stand 2024). Das gesamte Gastgewerbe umfasst 206.105 Betriebe mit rund 2,2 Millionen Beschäftigten. Der Jahresumsatz der Gastronomie beträgt 64,3 Milliarden Euro — trotzdem liegen die realen Umsätze 2025 noch rund 15 % unter dem Vorkrisenniveau von 2019. Gastro Master unterstützt bereits über 700 dieser Betriebe mit [digitalen Lösungen für die Gastronomie](/loesungen).", source: "DEHOGA Bundesverband; Statistisches Bundesamt, 2025/2026", sourceHref: "https://www.dehoga-bundesverband.de/zahlen-fakten/" },
      { id: "kassenmeldepflicht-fakten", q: "Was ändert sich 2025 für Gastronomen beim Kassensystem?", a: "Zwei wichtige Neuerungen: Erstens gilt seit 1. Juli 2025 die Kassenmeldepflicht — alle Kassen müssen über ELSTER gemeldet werden (§ 146a Abs. 4 AO). Zweitens drohen bei Verstößen gegen KassenSichV und Abgabenordnung Bußgelder bis 25.000 €. Das Gastro Master [Kassensystem](/produkte/kassensystem) ist TSE-zertifiziert, meldereif und gesetzeskonform.", source: "Bundesministerium der Finanzen; § 146a AO; KassenSichV, Stand 2025", sourceHref: "https://www.gesetze-im-internet.de/ao_1977/__146a.html" },
      { id: "digitalisierung-gastronomie-2026", q: "Welche Gastronomie-Trends dominieren 2026?", a: "59 % der Gastronomen wollen laut DEHOGA in Digitalisierung investieren. Online-Bestellungen wachsen mit rund 9,4 % pro Jahr — schneller als jede andere Bestellart. Ghost Kitchens — also Küchen ohne eigenen Gastraum, die ausschließlich für Lieferungen produzieren — werden als kostengünstiges Modell beliebter. Wer jetzt eine eigene [App](/produkte/app) oder einen [Webshop](/produkte/webshop) einführt, ist dem Wettbewerb voraus.", source: "DEHOGA Branchenbericht 2024/2025; Statista, Online Food Delivery Outlook Deutschland 2025", sourceHref: "https://www.dehoga-bundesverband.de/zahlen-fakten/" },
      { id: "eigener-shop-vs-lieferando-vergleich", q: "Was sind die strategischen Vorteile eines eigenen Webshops gegenüber Lieferando?", a: "Die Kosten sprechen für sich (siehe Frage oben) — aber die strategischen Vorteile sind genauso wichtig: Kundendaten gehören dir, nicht der Plattform. Du kannst Stammkunden per E-Mail oder [App](/produkte/app) direkt ansprechen und Remarketing betreiben. Du bestimmst Liefergebiet, Öffnungszeiten und Preise selbst — ohne Preisparitätszwang. Und du bist unabhängig von Algorithmen, die entscheiden, wie sichtbar du bist. Mehr auf der [Lieferdienst-Lösungsseite](/loesungen/lieferdienst).", source: "Lieferando Partnervertrag, Preisparitätsbedingungen 2025", sourceHref: "https://www.lieferando.de/partner" },
    ],
  },
];

/* ─── Schema ─────────────────────────────────────────────── */

const SCHEMA_BREADCRUMB = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Startseite", "item": "https://gastro-master.de/" },
    { "@type": "ListItem", "position": 2, "name": "FAQ", "item": "https://gastro-master.de/faq" },
  ],
};

const SCHEMA_ORGANIZATION = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Gastro Master",
  "url": "https://gastro-master.de",
  "telephone": "+49-6081-9128913",
  "email": "info@gastro-master.de",
  "areaServed": "DE",
  "sameAs": [
    "https://www.instagram.com/gastromasterde",
    "https://www.facebook.com/gastromasterde",
    "https://www.youtube.com/@Gastro-Master",
  ],
};

const SCHEMA_FAQ = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": FAQ_CATEGORIES.flatMap(cat =>
    cat.items.map(item => ({
      "@type": "Question",
      "name": item.q,
      "acceptedAnswer": { "@type": "Answer", "text": plainText(item.a) },
    }))
  ),
};

/* ─── Page ───────────────────────────────────────────────── */

const FAQPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [openItems, setOpenItems] = useState<Set<string>>(new Set());

  useSeoMeta({
    title: "FAQ — Häufige Fragen zu Gastro Master | Gastro Master",
    description: "Häufige Fragen zu Kassensystem (ab 69 €/Mon.), Webshop (0 % Provision), App & Lieferdienst — mit Branchendaten 2025/2026 und Quellenangaben. 700+ Gastronomen vertrauen Gastro Master.",
    canonical: "https://gastro-master.de/faq",
  });

  const toggleItem = (id: string) => {
    setOpenItems(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const filteredResults = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return null;
    const results: { cat: FAQCategory; item: FAQItem }[] = [];
    for (const cat of FAQ_CATEGORIES) {
      for (const item of cat.items) {
        if (plainText(item.q).toLowerCase().includes(q) || plainText(item.a).toLowerCase().includes(q)) {
          results.push({ cat, item });
        }
      }
    }
    return results;
  }, [searchQuery]);

  const totalCount = FAQ_CATEGORIES.reduce((acc, c) => acc + c.items.length, 0);

  return (
    <div className="min-h-screen bg-background">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA_FAQ) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA_BREADCRUMB) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA_ORGANIZATION) }} />
      <Navbar />

      {/* ── HERO ─────────────────────────────────────────────────── */}
      <section className="mesh-gradient relative overflow-hidden px-5 md:px-8 lg:px-16 pt-36 pb-16 md:pt-44 md:pb-20">
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 60% 50% at 50% 60%, rgba(0,125,207,0.10), transparent 70%)" }} />
        <div className="max-w-3xl mx-auto relative z-10 text-center">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="flex items-center justify-center gap-2 text-white/35 text-xs mb-6">
            <Link to="/" className="hover:text-white/60 transition-colors">Startseite</Link>
            <span>›</span>
            <span className="text-white/55">FAQ</span>
          </nav>

          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="inline-flex items-center gap-2 bg-cyan-brand/10 border border-cyan-brand/20 text-cyan-brand text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-6">
              <HelpCircle className="w-3.5 h-3.5" />
              {totalCount} Fragen · {FAQ_CATEGORIES.length} Kategorien
            </div>
            <p className="text-white/35 text-xs mb-4">Letzte Aktualisierung: März 2026</p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-[1.1] mb-4">
              Häufige Fragen zu<br />
              <span className="text-gradient-brand">Gastro Master</span>
            </h1>
            <p className="text-white/65 text-lg leading-relaxed max-w-xl mx-auto mb-8">
              Alles was du wissen musst — übersichtlich in einer Seite. Such dir einfach deine Frage.
            </p>

            {/* Search */}
            <div className="relative max-w-lg mx-auto mb-8">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Frage suchen…"
                className="w-full bg-white/10 border border-white/15 text-white placeholder-white/35 rounded-xl pl-12 pr-12 py-4 text-base focus:outline-none focus:border-cyan-brand/50 focus:bg-white/15 transition-all duration-200"
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery("")} className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition-colors">
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>

            {/* Category quick-jump */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 max-w-2xl mx-auto">
              {FAQ_CATEGORIES.map(cat => (
                <a
                  key={cat.id}
                  href={`#${cat.id}`}
                  onClick={() => setSearchQuery("")}
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-semibold bg-white/8 border border-white/12 text-white/60 hover:bg-white/15 hover:text-white hover:border-white/25 transition-all duration-200 justify-center"
                >
                  <cat.Icon className="w-3 h-3 shrink-0" />
                  {cat.label}
                </a>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── TRUST-BAR ────────────────────────────────────────────── */}
      <section className="bg-[#0A264A] px-5 md:px-8 lg:px-16 py-10 border-b border-white/[0.06]">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { value: "700+",              label: "Gastro-Betriebe vertrauen uns" },
              { value: "5,0 \u2605",        label: "Kundenbewertung auf Google" },
              { value: "TSE-konform",       label: "Alle Systeme zertifiziert" },
              { value: "Persönl. Support",  label: "Kein Bot — echte Menschen" },
            ].map((t, i) => (
              <div key={i} className="text-center">
                <p className="text-2xl font-black text-white mb-1">{t.value}</p>
                <p className="text-white/50 text-xs leading-snug">{t.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTENT ──────────────────────────────────────────────── */}
      <div className="bg-[#f8fafc] dark:bg-[#0f172a] px-5 md:px-8 lg:px-16 py-16 md:py-20">
        <div className="max-w-3xl mx-auto">

          {/* Search Results */}
          {filteredResults !== null ? (
            <div>
              <p className="text-[#0A264A]/50 dark:text-white/40 text-sm mb-6">
                {filteredResults.length === 0
                  ? `Keine Ergebnisse für „${searchQuery}"`
                  : `${filteredResults.length} Ergebnis${filteredResults.length !== 1 ? "se" : ""} für „${searchQuery}"`}
              </p>
              {filteredResults.length === 0 ? (
                <div className="text-center py-16">
                  <p className="text-[#0A264A]/40 dark:text-white/35 text-base mb-4">Keine passende Frage gefunden.</p>
                  <Link to="/kontakt" className="inline-flex items-center gap-2 bg-gradient-amber text-[#0A264A] font-bold px-6 py-3 rounded-xl text-sm hover:scale-[1.02] transition-transform">
                    Direkt fragen <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              ) : (
                <div className="space-y-3">
                  {filteredResults.map(({ cat, item }) => (
                    <FAQItemCard key={item.id} item={item} isOpen={openItems.has(item.id)} onToggle={() => toggleItem(item.id)} categoryLabel={cat.label} />
                  ))}
                </div>
              )}
            </div>
          ) : (
            /* Full Category View */
            <div className="space-y-16">
              {FAQ_CATEGORIES.map((cat, catIdx) => (
                <motion.section
                  key={cat.id}
                  id={cat.id}
                  className="scroll-mt-24"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: catIdx * 0.04 }}
                >
                  {/* Category header */}
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-xl bg-[#0A264A] flex items-center justify-center flex-shrink-0">
                      <cat.Icon className="w-5 h-5 text-cyan-brand" />
                    </div>
                    <div>
                      <h2 className="text-xl md:text-2xl font-black text-[#0A264A] dark:text-white leading-tight">
                        {cat.label}
                      </h2>
                      <span className="text-[#0A264A]/40 dark:text-white/35 text-xs">{cat.items.length} Fragen</span>
                    </div>
                  </div>

                  {/* Questions */}
                  <div className="space-y-2">
                    {cat.items.map(item => (
                      <FAQItemCard key={item.id} item={item} isOpen={openItems.has(item.id)} onToggle={() => toggleItem(item.id)} />
                    ))}
                  </div>
                </motion.section>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ── CTA ──────────────────────────────────────────────────── */}
      <section className="bg-gradient-to-br from-[#061830] via-[#0A264A] to-[#0D3266] px-5 md:px-8 lg:px-16 py-20 md:py-24">
        <div className="max-w-2xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <span className="text-cyan-brand text-xs font-bold uppercase tracking-widest mb-5 block">
              Deine Frage war nicht dabei?
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-white leading-tight mb-4">
              Wir antworten persönlich.
            </h2>
            <p className="text-white/55 text-lg leading-relaxed mb-8 max-w-lg mx-auto">
              Schreib uns — wir melden uns innerhalb eines Werktages. Kostenlos, unverbindlich.
            </p>
            <div className="flex flex-col items-center gap-5">
              <motion.div whileHover={{ scale: 1.03, boxShadow: "0 4px 18px 0px rgba(237,132,0,0.45)" }} whileTap={{ scale: 0.97 }} className="inline-block">
                <Link to="/kontakt" className="bg-gradient-amber text-[#0A264A] font-bold px-8 py-4 rounded-xl text-base inline-flex items-center gap-2 shadow-lg">
                  Kostenlose Beratung anfragen
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </motion.div>
              <div className="flex flex-col items-center gap-3">
                <a href="tel:+4960819128913" className="text-white/75 hover:text-[#ED8400] transition-colors text-base font-medium inline-flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  +49 (0) 6081 9128913
                </a>
                <a href="mailto:info@gastro-master.de" className="text-white/75 hover:text-[#ED8400] transition-colors text-base font-medium inline-flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  info@gastro-master.de
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

/* ─── FAQ Item Card ──────────────────────────────────────── */

interface FAQItemCardProps {
  item: FAQItem;
  isOpen: boolean;
  onToggle: () => void;
  categoryLabel?: string;
}

const FAQItemCard = ({ item, isOpen, onToggle, categoryLabel }: FAQItemCardProps) => (
  <div className="rounded-2xl border border-[#0A264A]/[0.08] dark:border-white/[0.08] bg-white dark:bg-white/[0.04] overflow-hidden">
    {categoryLabel && (
      <div className="px-6 pt-4 pb-0">
        <span className="text-[10px] font-bold uppercase tracking-widest text-[#0A264A]/35 dark:text-white/30">{categoryLabel}</span>
      </div>
    )}
    <h3 className="text-base">
      <button
        className="w-full flex items-center justify-between px-6 py-5 text-left gap-4"
        onClick={onToggle}
        aria-expanded={isOpen}
      >
        <span className="font-bold text-[#0A264A] dark:text-white text-base leading-snug">
          {item.q}
        </span>
        <ChevronDown className={`w-5 h-5 text-[#0A264A]/35 dark:text-white/35 shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
      </button>
    </h3>
    <AnimatePresence initial={false}>
      {isOpen && (
        <motion.div
          initial={{ height: 0 }}
          animate={{ height: "auto" }}
          exit={{ height: 0 }}
          transition={{ duration: 0.28, ease: [0.25, 0.1, 0.25, 1] }}
          style={{ overflow: "hidden" }}
        >
          <div className="px-6 pb-5">
            <p className="text-[#0A264A]/60 dark:text-white/55 text-sm leading-relaxed">
              {renderWithLinks(item.a)}
            </p>
            {item.source && (
              <p className="mt-2 text-[#94A3B8] text-[11px] italic">
                Quelle:{" "}
                {item.sourceHref ? (
                  <a
                    href={item.sourceHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline underline-offset-2 hover:text-cyan-brand transition-colors"
                  >
                    {item.source}
                  </a>
                ) : (
                  item.source
                )}
              </p>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);

export default FAQPage;
