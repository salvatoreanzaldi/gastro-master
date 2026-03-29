import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";

const RolleVerantwortlicher = () => (
  <p className="border-l-2 border-cyan-brand pl-3 italic text-muted-foreground text-sm mb-4">
    ▸ Epit als Verantwortlicher (Art. 4 Nr. 7 DSGVO)
  </p>
);

const RolleAuftragsverarbeiter = () => (
  <p className="border-l-2 border-amber-500 pl-3 italic text-muted-foreground text-sm mb-4">
    ▸ Im Auftrag des Gastronomie-Betriebs – Epit als Auftragsverarbeiter (Art. 28 DSGVO)
  </p>
);

const ExternLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="text-cyan-brand underline underline-offset-2 hover:opacity-80 transition-opacity"
  >
    {children}
  </a>
);

interface AccordionSectionProps {
  title: string;
  open: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}

const AccordionSection = ({ title, open, onToggle, children }: AccordionSectionProps) => (
  <div className="border-b border-border/50 last:border-b-0">
    <button
      onClick={onToggle}
      className="w-full flex items-center justify-between py-5 text-left group"
    >
      <span className="text-foreground font-semibold text-base pr-4 group-hover:text-cyan-brand transition-colors duration-200">
        {title}
      </span>
      <ChevronDown
        className={`w-5 h-5 text-muted-foreground flex-shrink-0 transition-transform duration-300 ${open ? "rotate-180 text-cyan-brand" : ""}`}
      />
    </button>
    <AnimatePresence initial={false}>
      {open && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.28, ease: "easeInOut" }}
          style={{ overflow: "hidden" }}
        >
          <div className="pb-7 pt-1">{children}</div>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);

const SECTION_COUNT = 30;

const Datenschutz = () => {
  const [openSections, setOpenSections] = useState<Set<number>>(new Set());

  const toggle = (id: number) => {
    setOpenSections((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const allOpen = openSections.size === SECTION_COUNT;

  const toggleAll = () => {
    if (allOpen) {
      setOpenSections(new Set());
    } else {
      setOpenSections(new Set(Array.from({ length: SECTION_COUNT }, (_, i) => i)));
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="section-padding pt-44 md:pt-52">
        <div className="container-tight max-w-3xl">

          <h1 className="text-4xl font-black text-foreground mb-2">Datenschutzerklärung</h1>
          <p className="text-muted-foreground text-sm mb-8">Stand: März 2026</p>

          {/* Alle öffnen / Alle schließen */}
          <div className="flex justify-end mb-6">
            <button
              onClick={toggleAll}
              className="text-sm text-cyan-brand hover:opacity-80 transition-opacity font-medium underline underline-offset-2"
            >
              {allOpen ? "Alle schließen" : "Alle öffnen"}
            </button>
          </div>

          <div className="rounded-xl border border-border/50 overflow-hidden bg-card/30">

            {/* 1. Verantwortlicher */}
            <AccordionSection
              title="1. Verantwortlicher"
              open={openSections.has(0)}
              onToggle={() => toggle(0)}
            >
              <p className="text-muted-foreground leading-relaxed mb-3">
                Verantwortlicher im Sinne der Datenschutz-Grundverordnung (DSGVO) und anderer nationaler
                Datenschutzgesetze sowie sonstiger datenschutzrechtlicher Bestimmungen ist:
              </p>
              <p className="text-muted-foreground leading-relaxed mb-3">
                Epit Global GmbH<br />
                Herzbergstr. 9<br />
                61250 Usingen, Deutschland<br />
                Telefon: +49 6081 9128913<br />
                E-Mail: <ExternLink href="mailto:datenschutz@epitglobal.de">datenschutz@epitglobal.de</ExternLink><br />
                Website: www.gastro-master.de<br />
                Registergericht: Amtsgericht Bad Homburg, HRB-Nr.: 16336<br />
                USt.-IdNr.: DE363847623<br />
                Geschäftsführung: Sanjaya Pattiyage, René Ebert
              </p>
              <p className="text-muted-foreground leading-relaxed mb-3">
                Diese Datenschutzerklärung gilt für alle Apps (Google Android, Apple iOS), Webshops, Websites und
                sonstigen digitalen Dienste, die von Epit Global GmbH unter der Marke „Gastro Master" für eigene
                Zwecke betrieben werden (insbesondere www.gastro-master.de), sowie für die vertragliche Beziehung
                zu unseren Geschäftskunden (Gastronomie-Betriebe).
              </p>

              <h3 className="text-base font-semibold text-foreground mb-2 mt-6">
                Hinweis zur Rollenverteilung – Auftragsverarbeitung für Gastronomie-Plattformen
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-3">
                Epit Global GmbH nimmt je nach Kontext unterschiedliche datenschutzrechtliche Rollen ein. Zur
                besseren Orientierung sind die jeweiligen Abschnitte dieser Erklärung mit einem Rollenlabel versehen:
              </p>
              <div className="pl-3 border-l-2 border-cyan-brand mb-3">
                <p className="text-muted-foreground text-sm leading-relaxed">
                  <strong>▸ Epit als Verantwortlicher (Art. 4 Nr. 7 DSGVO)</strong><br />
                  Gilt für: eigene Website (gastro-master.de), Kontaktformular, Newsletter, WhatsApp-Marketing,
                  Social-Media-Präsenzen, Webanalyse, B2B-Kundenbeziehungen
                  (Geschäftskunden/Gastronomie-Betriebe), Zahlungsabwicklung für eigene Abonnements.
                </p>
              </div>
              <div className="pl-3 border-l-2 border-amber-500 mb-3">
                <p className="text-muted-foreground text-sm leading-relaxed">
                  <strong>▸ Im Auftrag des Gastronomie-Betriebs – Epit als Auftragsverarbeiter (Art. 28 DSGVO)</strong><br />
                  Gilt für: Betrieb von Bestell-Plattformen, Webshops und Kassensystemen im Auftrag von
                  Gastronomie-Betrieben. In diesem Kontext ist der jeweilige Gastronomie-Betrieb Verantwortlicher
                  (Art. 4 Nr. 7 DSGVO) für die Verarbeitung der Endkundendaten. Datenschutzrechtliche Anfragen von
                  Endkunden dieser Plattformen sind direkt an den jeweiligen Gastronomie-Betrieb zu richten.
                </p>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                Die Auftragsverarbeitungsbeziehung zwischen Epit Global GmbH und dem jeweiligen
                Gastronomie-Betrieb ist durch einen Auftragsverarbeitungsvertrag gemäß Art. 28 DSGVO geregelt.
              </p>
            </AccordionSection>

            {/* 2. Datenschutzbeauftragter */}
            <AccordionSection
              title="2. Datenschutzbeauftragter"
              open={openSections.has(1)}
              onToggle={() => toggle(1)}
            >
              <p className="text-muted-foreground leading-relaxed mb-3">
                Wir sind gesetzlich nicht zur Bestellung eines Datenschutzbeauftragten verpflichtet. Für alle Fragen
                zum Datenschutz können Sie sich jederzeit an uns wenden:
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Epit Global GmbH – Datenschutz<br />
                E-Mail: <ExternLink href="mailto:datenschutz@epitglobal.de">datenschutz@epitglobal.de</ExternLink><br />
                Telefon: +49 6081 9128913<br />
                Herzbergstr. 9, 61250 Usingen
              </p>
            </AccordionSection>

            {/* 3. Übersicht der Verarbeitungen */}
            <AccordionSection
              title="3. Übersicht der Verarbeitungen"
              open={openSections.has(2)}
              onToggle={() => toggle(2)}
            >
              <p className="text-muted-foreground leading-relaxed mb-4">
                Wir verarbeiten personenbezogene Daten nur, soweit dies zur Bereitstellung unserer Dienste, zur
                Erfüllung vertraglicher Pflichten, aufgrund Ihrer Einwilligung oder auf Basis berechtigter Interessen
                erforderlich ist.
              </p>

              <h3 className="text-base font-semibold text-foreground mb-2 mt-6">3.1 Arten der verarbeiteten Daten</h3>
              <ul className="list-disc list-inside text-muted-foreground leading-relaxed space-y-1">
                <li>Bestandsdaten (z. B. Name, Adresse, Firmenname)</li>
                <li>Kontaktdaten (z. B. E-Mail-Adresse, Telefonnummer)</li>
                <li>Inhaltsdaten (z. B. Bestellinformationen, Nachrichtentexte, Kommentare)</li>
                <li>Vertragsdaten (z. B. Vertragsgegenstand, Laufzeit, Zahlungsinformationen)</li>
                <li>Nutzungsdaten (z. B. besuchte Seiten, Zugriffszeiten)</li>
                <li>Meta-/Kommunikationsdaten (z. B. Geräteinformationen, IP-Adressen, Browser-Typ)</li>
                <li>Standortdaten (z. B. bei Nutzung von Kartendiensten, nur mit Einwilligung oder zur Vertragsabwicklung)</li>
                <li>Onboarding-Dokumente von Geschäftskunden (z. B. Personalausweis/Pass, Gewerbeanmeldung – nur im B2B-Kontext)</li>
              </ul>

              <h3 className="text-base font-semibold text-foreground mb-2 mt-6">3.2 Zwecke der Verarbeitung</h3>
              <ul className="list-disc list-inside text-muted-foreground leading-relaxed space-y-1">
                <li>Bereitstellung und Betrieb unserer Websites, Apps und Bestell-Plattformen</li>
                <li>Durchführung und Abwicklung von Bestellungen und Verträgen</li>
                <li>Onboarding und Einrichtung von Gastronomie-Kunden-Plattformen</li>
                <li>Kundenkontoverwaltung und Kundenservice</li>
                <li>Versand von Newslettern und Marketing-Mitteilungen (E-Mail, WhatsApp)</li>
                <li>Webanalyse und Optimierung unserer Dienste</li>
                <li>Gewährleistung der IT-Sicherheit und Missbrauchsprävention</li>
                <li>Erfüllung gesetzlicher Aufbewahrungspflichten</li>
              </ul>
            </AccordionSection>

            {/* 4. Rechtsgrundlagen */}
            <AccordionSection
              title="4. Rechtsgrundlagen der Verarbeitung"
              open={openSections.has(3)}
              onToggle={() => toggle(3)}
            >
              <p className="text-muted-foreground leading-relaxed mb-3">
                Wir verarbeiten personenbezogene Daten auf Grundlage der folgenden Rechtsgrundlagen der DSGVO:
              </p>
              <ul className="list-disc list-inside text-muted-foreground leading-relaxed space-y-2">
                <li>
                  <strong>Einwilligung (Art. 6 Abs. 1 lit. a DSGVO):</strong> Die betroffene Person hat ihre Einwilligung
                  in die Verarbeitung erteilt, z. B. für den Newsletter-Versand, WhatsApp-Marketing oder die Nutzung
                  nicht technisch notwendiger Cookies.
                </li>
                <li>
                  <strong>Vertragserfüllung (Art. 6 Abs. 1 lit. b DSGVO):</strong> Die Verarbeitung ist zur Erfüllung
                  eines Vertrages oder zur Durchführung vorvertraglicher Maßnahmen erforderlich, z. B. bei
                  Bestellabwicklung, Onboarding von Geschäftskunden oder Einrichtung von Zahlungskonten.
                </li>
                <li>
                  <strong>Rechtliche Verpflichtung (Art. 6 Abs. 1 lit. c DSGVO):</strong> Die Verarbeitung ist zur
                  Erfüllung einer rechtlichen Verpflichtung erforderlich, z. B. steuer- und handelsrechtliche
                  Aufbewahrungspflichten (§ 147 AO, § 257 HGB).
                </li>
                <li>
                  <strong>Berechtigte Interessen (Art. 6 Abs. 1 lit. f DSGVO):</strong> Die Verarbeitung dient unseren
                  berechtigten Interessen, z. B. IT-Sicherheit, Betriebsstabilität, Missbrauchsprävention oder
                  Direktwerbung per E-Mail für eigene ähnliche Produkte gemäß § 7 Abs. 3 UWG.
                </li>
              </ul>
            </AccordionSection>

            {/* 5. Sicherheitsmaßnahmen */}
            <AccordionSection
              title="5. Sicherheitsmaßnahmen"
              open={openSections.has(4)}
              onToggle={() => toggle(4)}
            >
              <p className="text-muted-foreground leading-relaxed mb-3">
                Wir treffen gemäß Art. 32 DSGVO unter Berücksichtigung des Stands der Technik, der
                Implementierungskosten und der Art, des Umfangs, der Umstände und der Zwecke der Verarbeitung
                geeignete technische und organisatorische Maßnahmen, um ein dem Risiko angemessenes Schutzniveau
                zu gewährleisten. Dazu gehören insbesondere:
              </p>
              <ul className="list-disc list-inside text-muted-foreground leading-relaxed space-y-1">
                <li>SSL-/TLS-Verschlüsselung aller Datenübertragungen zwischen Browser/App und Server</li>
                <li>Regelmäßige Sicherheitsupdates und Patches der Serversysteme</li>
                <li>Zugriffskontrollsysteme mit rollenbasierter Rechtevergabe (Need-to-know-Prinzip)</li>
                <li>IP-Anonymisierung/IP-Masking bei Webanalyse-Diensten</li>
                <li>Pseudonymisierung von Daten, soweit nach dem Verarbeitungszweck möglich</li>
                <li>Regelmäßige Datensicherungen (Backups)</li>
                <li>
                  Auftragsverarbeitungsverträge (AVV) gemäß Art. 28 DSGVO mit allen Dienstleistern, die
                  personenbezogene Daten ausschließlich auf unsere Weisung hin verarbeiten (Auftragsverarbeiter).
                  Zahlungsdienstleister und Plattformbetreiber, die als eigenständige Verantwortliche agieren, sind
                  hiervon nicht erfasst.
                </li>
              </ul>
            </AccordionSection>

            {/* 6. Datenübermittlung an Drittländer */}
            <AccordionSection
              title="6. Datenübermittlung an Drittländer"
              open={openSections.has(5)}
              onToggle={() => toggle(5)}
            >
              <p className="text-muted-foreground leading-relaxed mb-3">
                Im Rahmen unserer Geschäftstätigkeit und der Nutzung von Drittanbieter-Diensten sowie der
                Einbeziehung unserer Entwickler und Mitarbeiter kann es zur Übermittlung personenbezogener Daten
                an Empfänger in Drittländern (außerhalb des Europäischen Wirtschaftsraums, EWR) kommen. Dies
                betrifft insbesondere:
              </p>
              <ul className="list-disc list-inside text-muted-foreground leading-relaxed space-y-2">
                <li>
                  <strong>USA:</strong> Für Datenübermittlungen in die USA stützen wir uns auf den
                  Angemessenheitsbeschluss der Europäischen Kommission vom 10. Juli 2023 zum EU-U.S. Data
                  Privacy Framework (DPF), soweit der jeweilige Empfänger unter dem DPF zertifiziert ist (z. B.
                  Google LLC, Meta Platforms, Inc., Atlassian, Inc.). Für Dienste ohne aktive DPF-Zertifizierung –
                  insbesondere Zoho Corporation (US) – kommen Standardvertragsklauseln (SCCs) gemäß
                  Art. 46 Abs. 2 lit. c DSGVO zum Einsatz.
                </li>
                <li>
                  <strong>Sri Lanka (konzerninterne Übermittlung):</strong> Wir beschäftigen Entwickler und technische
                  Mitarbeiter bei unserer Tochtergesellschaft Epit Global PVT Ltd. in Sri Lanka, die als verbundenes
                  Unternehmen ausschließlich auf Weisung der Epit Global GmbH tätig ist. Für Sri Lanka besteht kein
                  Angemessenheitsbeschluss der Europäischen Kommission. Die konzerninterne Übermittlung
                  personenbezogener Daten erfolgt daher auf Grundlage von Standardvertragsklauseln (SCCs) gemäß
                  Art. 46 Abs. 2 lit. c DSGVO sowie zusätzlicher technischer und organisatorischer Schutzmaßnahmen
                  (z. B. Zugriffsbeschränkungen, Need-to-know-Prinzip). Die Mitarbeiter haben nur Zugriff auf die
                  Daten, die zur Erfüllung ihrer jeweiligen Aufgaben zwingend erforderlich sind.
                </li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-3">
                Sofern in Einzelfällen keine geeigneten Garantien vorliegen, werden Sie gesondert informiert und ggf.
                Ihre Einwilligung eingeholt (Art. 49 DSGVO).
              </p>
            </AccordionSection>

            {/* 7. Speicherdauer */}
            <AccordionSection
              title="7. Speicherdauer und Löschung"
              open={openSections.has(6)}
              onToggle={() => toggle(6)}
            >
              <p className="text-muted-foreground leading-relaxed mb-3">
                Wir speichern personenbezogene Daten nur so lange, wie es für den jeweiligen Verarbeitungszweck
                erforderlich ist oder gesetzliche Aufbewahrungspflichten bestehen. Soweit keine konkreten
                gesetzlichen Fristen vorgegeben sind, richten wir uns nach dem Grundsatz der Datensparsamkeit und
                löschen oder anonymisieren Daten, sobald der Zweck ihrer Verarbeitung entfällt.
              </p>
              <ul className="list-disc list-inside text-muted-foreground leading-relaxed space-y-2">
                <li>
                  <strong>Handels- und steuerrechtliche Aufbewahrungspflichten:</strong> Soweit Daten steuer- oder
                  handelsrechtlichen Aufbewahrungspflichten unterliegen (§ 147 AO, § 257 HGB), werden diese für
                  die gesetzlich vorgeschriebene Dauer von 6 bzw. 10 Jahren aufbewahrt.
                </li>
                <li>
                  <strong>Vertragsdaten:</strong> Für die Dauer des Vertragsverhältnisses und anschließend nach
                  Maßgabe gesetzlicher Aufbewahrungsfristen.
                </li>
                <li>
                  <strong>Marketing-Daten (Newsletter, WhatsApp):</strong> Bis zum Widerruf der Einwilligung bzw.
                  Abmeldung. Nach Abmeldung werden nur noch die Daten aufbewahrt, die zur Erfüllung gesetzlicher
                  Nachweispflichten erforderlich sind.
                </li>
                <li>
                  <strong>Technische Protokolldaten (Server-Logfiles, Sicherheitslogs):</strong> Nur so lange, wie es
                  für Betriebssicherheit und Missbrauchsprävention erforderlich ist. Nach Wegfall des Zwecks werden
                  die Daten gelöscht.
                </li>
                <li>
                  <strong>Onboarding-Dokumente (Ausweis, Gewerbeanmeldung):</strong> Für die Dauer des
                  Vertragsverhältnisses mit dem Gastronomie-Kunden sowie anschließend nach Maßgabe gesetzlicher
                  Aufbewahrungspflichten. Eine Löschung auf Verlangen des Kunden erfolgt, soweit keine gesetzliche
                  Verpflichtung entgegensteht.
                </li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-3">
                Sofern in dieser Datenschutzerklärung keine konkrete Speicherdauer angegeben ist, gilt der
                vorstehende grundsätzliche Rahmen. Das Kriterium für die Bestimmung der Speicherdauer ist in jedem
                Fall der Wegfall des Verarbeitungszwecks oder das Eingreifen gesetzlicher Aufbewahrungsfristen.
              </p>
            </AccordionSection>

            {/* 8. Rechte der betroffenen Personen */}
            <AccordionSection
              title="8. Rechte der betroffenen Personen"
              open={openSections.has(7)}
              onToggle={() => toggle(7)}
            >
              <p className="text-muted-foreground leading-relaxed mb-3">
                Ihnen stehen als betroffene Person folgende Rechte nach der DSGVO zu:
              </p>
              <ul className="list-disc list-inside text-muted-foreground leading-relaxed space-y-2">
                <li>
                  <strong>Auskunftsrecht (Art. 15 DSGVO):</strong> Sie haben das Recht, eine Bestätigung darüber zu
                  verlangen, ob Sie betreffende personenbezogene Daten verarbeitet werden, und auf Auskunft über
                  diese Daten sowie auf weitere Informationen und eine Kopie der Daten.
                </li>
                <li>
                  <strong>Recht auf Berichtigung (Art. 16 DSGVO):</strong> Sie haben das Recht, die Vervollständigung
                  oder Berichtigung Sie betreffender unrichtiger personenbezogener Daten zu verlangen.
                </li>
                <li>
                  <strong>Recht auf Löschung (Art. 17 DSGVO):</strong> Sie haben das Recht, zu verlangen, dass Sie
                  betreffende personenbezogene Daten unverzüglich gelöscht werden, sofern die gesetzlichen
                  Voraussetzungen vorliegen.
                </li>
                <li>
                  <strong>Recht auf Einschränkung (Art. 18 DSGVO):</strong> Sie haben das Recht, die Einschränkung
                  der Verarbeitung Ihrer personenbezogenen Daten zu verlangen.
                </li>
                <li>
                  <strong>Recht auf Datenübertragbarkeit (Art. 20 DSGVO):</strong> Sie haben das Recht, die Sie
                  betreffenden personenbezogenen Daten in einem strukturierten, gängigen und maschinenlesbaren
                  Format zu erhalten und diese Daten einem anderen Verantwortlichen zu übermitteln.
                </li>
                <li>
                  <strong>Widerrufsrecht (Art. 7 Abs. 3 DSGVO):</strong> Sie haben das Recht, erteilte Einwilligungen
                  jederzeit mit Wirkung für die Zukunft zu widerrufen. Die Rechtmäßigkeit der aufgrund der
                  Einwilligung bis zum Widerruf erfolgten Verarbeitung bleibt unberührt.
                </li>
                <li>
                  <strong>Widerspruchsrecht (Art. 21 DSGVO):</strong> Sie haben das Recht, aus Gründen, die sich aus
                  Ihrer besonderen Situation ergeben, jederzeit gegen die Verarbeitung Ihrer Daten auf Grundlage von
                  Art. 6 Abs. 1 lit. e oder f DSGVO Widerspruch einzulegen. Werden Ihre Daten zum Zwecke der
                  Direktwerbung verarbeitet, können Sie jederzeit ohne Angabe von Gründen widersprechen.
                </li>
                <li>
                  <strong>Beschwerderecht (Art. 77 DSGVO):</strong> Sie haben das Recht, sich bei einer
                  Datenschutz-Aufsichtsbehörde zu beschweren, insbesondere in dem Mitgliedstaat Ihres
                  gewöhnlichen Aufenthaltsorts, Ihres Arbeitsplatzes oder des Orts des mutmaßlichen Verstoßes.
                </li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-3">
                Zur Ausübung Ihrer Rechte wenden Sie sich bitte an:{" "}
                <ExternLink href="mailto:datenschutz@epitglobal.de">datenschutz@epitglobal.de</ExternLink>
              </p>
              <p className="text-muted-foreground leading-relaxed mt-3">
                <strong>Hinweis für Endkunden von Gastronomie-Betrieben:</strong> Soweit Sie Ihre Rechte im
                Zusammenhang mit Bestelldaten auf einer Plattform ausüben möchten, die von einem
                Gastronomie-Betrieb betrieben wird, wenden Sie sich bitte direkt an den jeweiligen
                Gastronomie-Betrieb als Verantwortlichen.
              </p>
            </AccordionSection>

            {/* 9. Server-Logfiles */}
            <AccordionSection
              title="9. Server-Logfiles"
              open={openSections.has(8)}
              onToggle={() => toggle(8)}
            >
              <RolleVerantwortlicher />
              <p className="text-muted-foreground leading-relaxed mb-3">
                Bei jedem Zugriff auf unsere Website werden automatisch allgemeine technische Informationen erfasst
                und in Server-Logfiles gespeichert. Diese umfassen:
              </p>
              <ul className="list-disc list-inside text-muted-foreground leading-relaxed space-y-1 mb-3">
                <li>Name und URL der aufgerufenen Seite</li>
                <li>Datum und Uhrzeit des Zugriffs</li>
                <li>Übertragene Datenmenge</li>
                <li>Meldung über erfolgreichen Abruf (HTTP-Statuscode)</li>
                <li>Browser-Typ und -Version</li>
                <li>Betriebssystem des Nutzers</li>
                <li>Referrer-URL (zuvor besuchte Seite)</li>
                <li>IP-Adresse des anfragenden Geräts</li>
                <li>Anfragender Provider</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mb-2">
                Diese Daten dienen ausschließlich der Gewährleistung eines störungsfreien Betriebs, der IT-Sicherheit
                und der Optimierung unserer Website. Eine Zuordnung zu einer bestimmten Person ist uns in der Regel
                nicht möglich und wird nicht angestrebt.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-2">
                <strong>Rechtsgrundlage:</strong> Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an der Sicherheit
                und Funktionsfähigkeit der Website).
              </p>
              <p className="text-muted-foreground leading-relaxed">
                <strong>Speicherdauer:</strong> Die Logfiles werden gelöscht, sobald ihr Zweck erfüllt ist und keine
                Sicherheits- oder Missbrauchsprüfung längere Aufbewahrung erfordert.
              </p>
            </AccordionSection>

            {/* 10. Cookies */}
            <AccordionSection
              title="10. Cookies und Einwilligungsmanagement"
              open={openSections.has(9)}
              onToggle={() => toggle(9)}
            >
              <RolleVerantwortlicher />
              <p className="text-muted-foreground leading-relaxed mb-4">
                Unsere Website und Apps verwenden Cookies und vergleichbare Technologien (z. B. Local Storage,
                Fingerprinting). Cookies sind kleine Textdateien, die auf Ihrem Endgerät gespeichert werden.
              </p>

              <h3 className="text-base font-semibold text-foreground mb-2 mt-6">10.1 Technisch notwendige Cookies</h3>
              <p className="text-muted-foreground leading-relaxed mb-2">
                Diese Cookies sind für den Betrieb der Website/App zwingend erforderlich (z. B. Session-Cookies für
                den Warenkorb, Login-Status). Sie werden ohne Ihre Einwilligung gesetzt.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                <strong>Rechtsgrundlage:</strong> § 25 Abs. 2 Nr. 2 TDDDG i. V. m. Art. 6 Abs. 1 lit. b DSGVO
                (Vertragserfüllung).
              </p>

              <h3 className="text-base font-semibold text-foreground mb-2 mt-6">10.2 Analyse- und Marketing-Cookies</h3>
              <p className="text-muted-foreground leading-relaxed mb-2">
                Cookies, die über die technische Notwendigkeit hinausgehen (z. B. für Webanalyse,
                Reichweitenmessung oder personalisierte Werbung), setzen wir nur mit Ihrer ausdrücklichen
                Einwilligung ein.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-2">
                <strong>Rechtsgrundlage:</strong> § 25 Abs. 1 TDDDG i. V. m. Art. 6 Abs. 1 lit. a DSGVO
                (Einwilligung). Sie können Ihre Einwilligung jederzeit über unser Cookie-Banner oder die
                Cookie-Einstellungen auf unserer Website widerrufen.
              </p>

              <h3 className="text-base font-semibold text-foreground mb-2 mt-6">10.3 Cookie-Verwaltung im Browser</h3>
              <p className="text-muted-foreground leading-relaxed">
                Darüber hinaus können Sie Cookies jederzeit über die Einstellungen Ihres Browsers verwalten,
                einschränken oder löschen. Bitte beachten Sie, dass dies die Funktionalität der Website einschränken
                kann.
              </p>

              <h3 className="text-base font-semibold text-foreground mb-2 mt-6">10.4 Cookiebot – Cookie Consent Management</h3>
              <p className="text-muted-foreground leading-relaxed mb-2">
                Wir setzen den Cookie Consent Manager Cookiebot ein, um Ihre Einwilligung zur Nutzung von Cookies
                und ähnlichen Technologien einzuholen, zu dokumentieren und zu verwalten.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-2">
                <strong>Anbieter:</strong> Cybot A/S, Havnegade 39, 1058 Kopenhagen, Dänemark.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-2">
                Cookiebot protokolliert Ihre Einwilligung (Zeitpunkt, gewählte Cookie-Präferenzen, Seitenaufruf) zu
                Nachweiszwecken gemäß Art. 7 Abs. 1 DSGVO. Die Einwilligungsprotokolle werden auf Servern in der
                EU gespeichert und nach 12 Monaten automatisch gelöscht.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-2">
                <strong>Rechtsgrundlage:</strong> § 25 Abs. 2 Nr. 2 TDDDG i. V. m. Art. 6 Abs. 1 lit. c DSGVO
                (rechtliche Verpflichtung zur Dokumentation der Einwilligung).
              </p>
              <p className="text-muted-foreground leading-relaxed">
                <ExternLink href="https://www.cookiebot.com/de/privacy-policy/">
                  Datenschutzerklärung Cookiebot
                </ExternLink>
              </p>
            </AccordionSection>

            {/* 11. Bestellungen */}
            <AccordionSection
              title="11. Bestellungen und Vertragsabwicklung"
              open={openSections.has(10)}
              onToggle={() => toggle(10)}
            >
              <RolleAuftragsverarbeiter />
              <p className="text-muted-foreground leading-relaxed mb-3">
                Dieser Abschnitt betrifft Bestellungen, die über Plattformen aufgegeben werden, die Epit Global GmbH
                im Auftrag von Gastronomie-Betrieben betreibt. Die Plattform (Webshop, App, Kassensystem) ist eine
                von Epit Global GmbH selbst entwickelte Softwarelösung. Verantwortlicher für die Verarbeitung der
                Endkundendaten ist in diesem Kontext der jeweilige Gastronomie-Betrieb.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-2">
                Bei einer Bestellung können folgende personenbezogene Daten verarbeitet werden:
              </p>
              <ul className="list-disc list-inside text-muted-foreground leading-relaxed space-y-1 mb-3">
                <li>Vor- und Nachname</li>
                <li>Lieferadresse und ggf. Rechnungsadresse</li>
                <li>E-Mail-Adresse und Telefonnummer</li>
                <li>Bestellinhalt, Bestellzeitpunkt</li>
                <li>Zahlungsinformationen (je nach Zahlungsart)</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mb-2">
                Die Bereitstellung dieser Daten ist für den Vertragsschluss mit dem Gastronomie-Betrieb erforderlich.
                Eine Nichtbereitstellung hat zur Folge, dass keine Bestellung aufgegeben werden kann.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-2">
                <strong>Rechtsgrundlage</strong> der Verarbeitung durch den Gastronomie-Betrieb als
                Verantwortlichen: Art. 6 Abs. 1 lit. b DSGVO (Vertragserfüllung).
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Zahlungsdienstleister (Stripe, PayPal, GoCardless) werden bei der Bestellabwicklung als eigenständige
                Verantwortliche gemäß Art. 4 Nr. 7 DSGVO eingebunden und verarbeiten Zahlungsdaten nach ihren
                eigenen Datenschutzbestimmungen. Andere technische Dienstleister, die Daten ausschließlich auf
                Weisung verarbeiten, sind als Auftragsverarbeiter gemäß Art. 28 DSGVO vertraglich gebunden.
              </p>
            </AccordionSection>

            {/* 12. Kundenkonto */}
            <AccordionSection
              title="12. Kundenkonto"
              open={openSections.has(11)}
              onToggle={() => toggle(11)}
            >
              <RolleAuftragsverarbeiter />
              <p className="text-muted-foreground leading-relaxed mb-2">
                Soweit Endkunden auf einer von Epit Global GmbH betriebenen Gastronomie-Plattform ein Kundenkonto
                anlegen, erfolgt dies im Auftrag des jeweiligen Gastronomie-Betriebs als Verantwortlichem. Verarbeitet
                werden Name, E-Mail-Adresse, Adresse und ggf. Telefonnummer zur Vereinfachung zukünftiger
                Bestellungen und zur Kontoverwaltung.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-2">
                <strong>Rechtsgrundlage</strong> (seitens des Gastronomie-Betriebs als Verantwortlicher):
                Art. 6 Abs. 1 lit. b DSGVO (Vertragserfüllung) im Rahmen des Bestellverhältnisses.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Endkunden können die Löschung ihres Kundenkontos jederzeit beim jeweiligen Gastronomie-Betrieb
                verlangen. Gesetzliche Aufbewahrungsfristen bleiben unberührt.
              </p>
            </AccordionSection>

            {/* 13. Kontaktformular */}
            <AccordionSection
              title="13. Kontaktformular und E-Mail-Kontakt"
              open={openSections.has(12)}
              onToggle={() => toggle(12)}
            >
              <RolleVerantwortlicher />
              <p className="text-muted-foreground leading-relaxed mb-2">
                Bei Nutzung unseres Kontaktformulars auf gastro-master.de oder bei direkter E-Mail-Kontaktaufnahme
                erheben wir die von Ihnen mitgeteilten Daten (Name, E-Mail-Adresse, Nachrichteninhalt)
                ausschließlich zum Zweck der Bearbeitung Ihrer Anfrage.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-2">
                <strong>Rechtsgrundlage:</strong> Art. 6 Abs. 1 lit. b DSGVO bei vorvertraglichen oder
                vertragsbezogenen Anfragen; Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an der Beantwortung
                von Anfragen) bei allgemeinen Anfragen ohne Vertragsbezug.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Ihre Daten werden nach abschließender Bearbeitung gelöscht, sofern keine gesetzlichen
                Aufbewahrungspflichten entgegenstehen.
              </p>
            </AccordionSection>

            {/* 14. Newsletter */}
            <AccordionSection
              title="14. Newsletter und E-Mail-Marketing"
              open={openSections.has(13)}
              onToggle={() => toggle(13)}
            >
              <h3 className="text-base font-semibold text-foreground mb-2 mt-4">
                14.1 Newsletter-Versand mit Einwilligung via Zoho Campaigns
              </h3>
              <RolleVerantwortlicher />
              <p className="text-muted-foreground leading-relaxed mb-2">
                Sofern Sie uns Ihre ausdrückliche Einwilligung erteilt haben, nutzen wir Ihre E-Mail-Adresse für den
                Versand von Informationen zu unseren Produkten, Dienstleistungen, Angeboten und Aktionen.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-2">
                <strong>Rechtsgrundlage:</strong> Art. 6 Abs. 1 lit. a DSGVO (Einwilligung).
              </p>
              <p className="text-muted-foreground leading-relaxed mb-2">
                Wir nutzen für den E-Mail-Versand den Dienst Zoho Campaigns (Zoho Corporation B.V., Beneluxlaan
                4B, 3527 HT Utrecht, Niederlande). Zoho Corporation B.V. hat ihren Sitz in der EU; für etwaige
                Transfers an die US-Muttergesellschaft gelten SCCs gemäß Art. 46 DSGVO. Nähere Informationen
                finden Sie unter Abschnitt 20f dieser Datenschutzerklärung.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Sie können Ihre Einwilligung jederzeit widerrufen, z. B. über den Abmeldelink in jeder E-Mail oder
                durch Mitteilung an{" "}
                <ExternLink href="mailto:datenschutz@epitglobal.de">datenschutz@epitglobal.de</ExternLink>.
                Die Rechtmäßigkeit der bis zum Widerruf erfolgten Verarbeitung bleibt unberührt.
              </p>

              <h3 className="text-base font-semibold text-foreground mb-2 mt-6">
                14.2 E-Mail-Werbung für Bestandskunden (§ 7 Abs. 3 UWG)
              </h3>
              <RolleVerantwortlicher />
              <p className="text-muted-foreground leading-relaxed mb-2">
                Sofern wir Ihre E-Mail-Adresse im Zusammenhang mit dem Kauf einer Ware oder Dienstleistung
                erhalten haben, nutzen wir diese gemäß § 7 Abs. 3 UWG für die Direktwerbung für eigene ähnliche
                Waren und Dienstleistungen, sofern Sie der Nutzung nicht widersprochen haben.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-2">
                <strong>Rechtsgrundlage:</strong> Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse) i. V. m.
                § 7 Abs. 3 UWG.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Sie können der Nutzung Ihrer E-Mail-Adresse jederzeit widersprechen. Nutzen Sie hierzu den
                Abmeldelink in der jeweiligen E-Mail oder wenden Sie sich an{" "}
                <ExternLink href="mailto:datenschutz@epitglobal.de">datenschutz@epitglobal.de</ExternLink>.
              </p>

              <h3 className="text-base font-semibold text-foreground mb-2 mt-6">
                14.3 Erfolgsmessung (Newsletter-Tracking)
              </h3>
              <RolleVerantwortlicher />
              <p className="text-muted-foreground leading-relaxed mb-2">
                Unsere Newsletter können sogenannte Zählpixel (Web-Beacons) enthalten, die es uns ermöglichen zu
                erkennen, ob und wann eine E-Mail geöffnet wurde und welche Links angeklickt wurden. Diese Daten
                dienen der statistischen Auswertung und Optimierung unserer Newsletter-Kampagnen.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                <strong>Rechtsgrundlage:</strong> Art. 6 Abs. 1 lit. a DSGVO (Einwilligung im Rahmen der
                Newsletter-Anmeldung). Die Einwilligung kann jederzeit widerrufen werden.
              </p>
            </AccordionSection>

            {/* 15. WhatsApp */}
            <AccordionSection
              title="15. WhatsApp-Newsletter und Marketing via Superchat"
              open={openSections.has(14)}
              onToggle={() => toggle(14)}
            >
              <p className="text-muted-foreground leading-relaxed mb-4">
                Wir bieten Ihnen die Möglichkeit, Marketingnachrichten, Angebote, Aktionen und Informationen über
                den Messaging-Dienst WhatsApp zu erhalten. Der Versand erfolgt über die Plattform Superchat
                (Superchat GmbH, Berlin, Deutschland).
              </p>

              <h3 className="text-base font-semibold text-foreground mb-2 mt-4">15.1 Anmeldung (Keyword-Opt-in)</h3>
              <RolleVerantwortlicher />
              <p className="text-muted-foreground leading-relaxed mb-2">
                Die Anmeldung zu unserem WhatsApp-Newsletter erfolgt per Keyword-Opt-in: Sie senden das
                Anmeldewort <strong>„Anmelden"</strong> an unsere WhatsApp-Business-Nummer{" "}
                <strong>+49 160 92944536</strong>. Mit dem aktiven Versenden dieser Nachricht erklären Sie Ihre
                ausdrückliche Einwilligung zum Empfang von Marketing-Nachrichten über WhatsApp. Sie erhalten
                daraufhin automatisch eine Bestätigungsnachricht, die Sie auch über das Abmeldewort{" "}
                <strong>„Abmelden"</strong> informiert.
              </p>

              <h3 className="text-base font-semibold text-foreground mb-2 mt-6">15.2 Verarbeitete Daten</h3>
              <ul className="list-disc list-inside text-muted-foreground leading-relaxed space-y-1">
                <li>Mobilfunknummer (WhatsApp-Nummer)</li>
                <li>Name (sofern im WhatsApp-Profil hinterlegt und von Superchat erfasst)</li>
                <li>Nachrichteninteraktionen (z. B. gelesen/zugestellt, durch Superchat erfasst)</li>
              </ul>

              <h3 className="text-base font-semibold text-foreground mb-2 mt-6">15.3 Rechtsgrundlage</h3>
              <p className="text-muted-foreground leading-relaxed">
                <strong>Rechtsgrundlage:</strong> Art. 6 Abs. 1 lit. a DSGVO (ausdrückliche Einwilligung). Der
                Empfang von WhatsApp-Marketing-Nachrichten setzt Ihre ausdrückliche Einwilligung voraus, die Sie
                jederzeit widerrufen können.
              </p>

              <h3 className="text-base font-semibold text-foreground mb-2 mt-6">15.4 Auftragsverarbeiter: Superchat</h3>
              <p className="text-muted-foreground leading-relaxed mb-2">
                Superchat GmbH, Berlin, Deutschland, agiert als Auftragsverarbeiter gemäß Art. 28 DSGVO. Ein
                entsprechender Auftragsverarbeitungsvertrag ist abgeschlossen. Superchat nutzt die WhatsApp
                Business API von Meta Platforms Ireland Limited.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                <ExternLink href="https://superchat.de/datenschutz">Datenschutzerklärung Superchat</ExternLink>
              </p>

              <h3 className="text-base font-semibold text-foreground mb-2 mt-6">15.5 Datenübermittlung an Meta (WhatsApp)</h3>
              <p className="text-muted-foreground leading-relaxed mb-2">
                WhatsApp wird von Meta Platforms Ireland Limited (4 Grand Canal Square, Dublin 2, Irland)
                betrieben. Nachrichtenübertragungen erfolgen Ende-zu-Ende-verschlüsselt. Metadaten (z. B.
                Telefonnummer, Zeitstempel) können an Meta Platforms, Inc., 1 Hacker Way, Menlo Park, CA 94025,
                USA, übermittelt werden. Meta Platforms, Inc. ist unter dem EU-U.S. Data Privacy Framework
                zertifiziert; zwischen Meta Platforms Ireland Limited und Meta Platforms, Inc. bestehen
                Standardvertragsklauseln gemäß Art. 46 Abs. 2 lit. c DSGVO.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                <ExternLink href="https://www.whatsapp.com/legal/privacy-policy">
                  Datenschutzerklärung WhatsApp
                </ExternLink>
              </p>

              <h3 className="text-base font-semibold text-foreground mb-2 mt-6">15.6 Widerruf und Abmeldung</h3>
              <p className="text-muted-foreground leading-relaxed">
                Sie können Ihre Einwilligung jederzeit widerrufen, indem Sie das Abmeldewort{" "}
                <strong>„Abmelden"</strong> an unsere WhatsApp-Business-Nummer +49 160 92944536 senden oder
                sich direkt an{" "}
                <ExternLink href="mailto:datenschutz@epitglobal.de">datenschutz@epitglobal.de</ExternLink> wenden.
                Nach Widerruf erhalten Sie keine weiteren Marketing-Nachrichten. Die Rechtmäßigkeit der bis zum
                Widerruf erfolgten Verarbeitung bleibt unberührt.
              </p>
            </AccordionSection>

            {/* 16. Google reCAPTCHA */}
            <AccordionSection
              title="16. Google reCAPTCHA"
              open={openSections.has(15)}
              onToggle={() => toggle(15)}
            >
              <RolleVerantwortlicher />
              <p className="text-muted-foreground leading-relaxed mb-2">
                Wir verwenden den Dienst Google reCAPTCHA, um zu unterscheiden, ob Eingaben durch natürliche
                Personen oder durch automatisierte maschinelle Verarbeitung (Bots) erfolgen.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-2">
                <strong>Anbieter:</strong> Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Irland;
                Muttergesellschaft und DPF-Zertifikat: Google LLC, 1600 Amphitheatre Parkway, Mountain View,
                CA 94043, USA.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-2">
                Dabei werden Ihre IP-Adresse und ggf. weitere Daten über Google Ireland Limited (EU) an Google
                LLC, Mountain View, CA, USA, übertragen. Google LLC ist unter dem EU-U.S. Data Privacy Framework
                zertifiziert.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-2">
                <strong>Rechtsgrundlage:</strong> Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse am Schutz vor
                Missbrauch und Spam) i. V. m. § 25 Abs. 2 Nr. 2 TDDDG.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                <ExternLink href="https://policies.google.com/privacy">Datenschutzerklärung Google</ExternLink>
              </p>
            </AccordionSection>

            {/* 17. Google Analytics */}
            <AccordionSection
              title="17. Google Analytics"
              open={openSections.has(16)}
              onToggle={() => toggle(16)}
            >
              <RolleVerantwortlicher />
              <p className="text-muted-foreground leading-relaxed mb-2">
                Wir setzen Google Analytics ein, einen Webanalysedienst der Google Ireland Limited, Gordon House,
                Barrow Street, Dublin 4, Irland. Google Analytics verwendet Cookies und vergleichbare Technologien,
                die eine Analyse der Benutzung der Website ermöglichen.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-2">
                IP-Anonymisierung ist aktiviert. Ihre IP-Adresse wird innerhalb der EU/EWR gekürzt, bevor sie ggf. an
                Google LLC, Mountain View, CA, USA, übermittelt wird. Google LLC ist unter dem EU-U.S. Data
                Privacy Framework zertifiziert; zwischen Google Ireland Limited und Google LLC bestehen geeignete
                Transfermechanismen gemäß Art. 46 DSGVO.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-2">
                <strong>Rechtsgrundlage:</strong> Art. 6 Abs. 1 lit. a DSGVO (Einwilligung) i. V. m. § 25 Abs. 1
                TDDDG. Die Einwilligung kann jederzeit über das Cookie-Banner widerrufen werden.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Alternativ können Sie die Erfassung durch das Browser-Add-on verhindern:{" "}
                <ExternLink href="https://tools.google.com/dlpage/gaoptout">
                  Google Analytics Opt-out Browser-Add-on
                </ExternLink>
                {" · "}
                <ExternLink href="https://policies.google.com/privacy">Datenschutzerklärung Google</ExternLink>
              </p>
            </AccordionSection>

            {/* 18. Google Maps */}
            <AccordionSection
              title="18. Google Maps – Liefergebietsverwaltung"
              open={openSections.has(17)}
              onToggle={() => toggle(17)}
            >
              <RolleAuftragsverarbeiter />
              <p className="text-muted-foreground leading-relaxed mb-3">
                Wir nutzen die Google Maps API (Programmierschnittstelle) von Google Ireland Limited ausschließlich
                im Rahmen der Liefergebietsverwaltung für unsere Gastronomie-Kunden-Plattformen. Verantwortlich
                für die zugehörigen Verarbeitungsabläufe ist der jeweilige Gastronomie-Betrieb. Die drei möglichen
                Konfigurationen:
              </p>

              <h3 className="text-base font-semibold text-foreground mb-2 mt-4">Option 1 – Liefergebiete nach Postleitzahl</h3>
              <p className="text-muted-foreground leading-relaxed">
                Bei dieser Option werden Liefergebiete rein anhand von Postleitzahlen definiert. Es findet keine
                Übertragung von Daten an Google statt.
              </p>

              <h3 className="text-base font-semibold text-foreground mb-2 mt-4">Option 2 – Liefergebiet nach Radius (Straßenkilometer)</h3>
              <p className="text-muted-foreground leading-relaxed mb-2">
                Bei dieser Option wird die Google Maps API genutzt, um auf Basis des Restaurantstandorts und eines
                Radius das Liefergebiet zu berechnen. Endkunden können ihre Lieferadresse manuell eingeben oder
                die automatische Adresserkennung über Google Maps nutzen. Im letzteren Fall wird die eingegebene
                Adresse zur Adressvalidierung an Google übermittelt.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                <strong>Rechtsgrundlage:</strong> Art. 6 Abs. 1 lit. b DSGVO (Vertragserfüllung – Adressprüfung zur
                Bestellabwicklung) i. V. m. § 25 Abs. 2 Nr. 2 TDDDG.
              </p>

              <h3 className="text-base font-semibold text-foreground mb-2 mt-4">Option 3 – Individuelle Polygonkarten (nur Kassensystem)</h3>
              <p className="text-muted-foreground leading-relaxed mb-2">
                Ausschließlich im Kassensystem können Gastronomie-Kunden Liefergebiete durch das Einzeichnen
                eigener Polygone auf der Google Maps Oberfläche definieren. Diese Funktion wird durch den
                Gastronomie-Kunden im Rahmen der Einrichtung genutzt; dabei werden keine Endkundendaten
                übermittelt.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-2">
                <strong>Rechtsgrundlage:</strong> Art. 6 Abs. 1 lit. b DSGVO (Vertragserfüllung) i. V. m. Art. 6 Abs. 1
                lit. f DSGVO (berechtigtes Interesse an präziser Liefergebietskonfiguration).
              </p>
              <p className="text-muted-foreground leading-relaxed mb-2">
                <strong>Anbieter:</strong> Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Irland.
                DPF-zertifiziertes US-Unternehmen: Google LLC, 1600 Amphitheatre Parkway, Mountain View,
                CA 94043, USA.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                <ExternLink href="https://policies.google.com/privacy">Datenschutzerklärung Google</ExternLink>
              </p>
            </AccordionSection>

            {/* 19. Zahlungsdienstleister */}
            <AccordionSection
              title="19. Zahlungsdienstleister"
              open={openSections.has(18)}
              onToggle={() => toggle(18)}
            >
              <h3 className="text-base font-semibold text-foreground mb-2 mt-4">
                19.1 PayPal – Zahlungsabwicklung und Konto-Unterstützung
              </h3>
              <RolleVerantwortlicher />
              <p className="text-muted-foreground leading-relaxed mb-2">
                Unsere Gastronomie-Kunden haben die Möglichkeit, PayPal als optionale Zahlungsmethode in ihren
                Webshops anzubieten. Die Anbindung von PayPal ist keine Pflichtleistung; die Integration erfolgt
                ausschließlich auf ausdrücklichen Wunsch des Kunden. Hierzu wird ausschließlich ein geschäftliches
                PayPal Business-Konto verwendet.
              </p>
              <ul className="list-disc list-inside text-muted-foreground leading-relaxed space-y-1 mb-3">
                <li><strong>Kein PayPal:</strong> Der Kunde entscheidet sich gegen PayPal – es werden keine PayPal-Daten verarbeitet.</li>
                <li><strong>Bestehendes PayPal Business-Konto:</strong> Der Kunde stellt die erforderlichen API-Zugangsdaten selbst bereit. Epit Global GmbH verarbeitet in diesem Fall keine Identitäts- oder Bankdaten.</li>
                <li><strong>Neues PayPal Business-Konto:</strong> Auf ausdrücklichen Wunsch und im alleinigen Auftrag des Kunden unterstützen wir bei der Einrichtung. Dabei werden vom Kunden bereitgestellte Unternehmensdaten an PayPal übermittelt.</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mb-2">
                PayPal verarbeitet Zahlungsdaten als eigenständiger Verantwortlicher gemäß Art. 4 Nr. 7 DSGVO.
                Epit Global GmbH hat keinen Zugang zu Umsatzmitteln oder Bankkonten der Kunden.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-2">
                <strong>Anbieter und Verantwortlicher für Zahlungsdatenverarbeitung:</strong> PayPal (Europe)
                S.à r.l. et Cie, S.C.A., 22–24 Boulevard Royal, L-2449 Luxemburg.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-2">
                <strong>Rechtsgrundlage</strong> (soweit Epit Global GmbH überhaupt Daten verarbeitet):
                Art. 6 Abs. 1 lit. b DSGVO (Vertragserfüllung bei der Einrichtung auf Kundenwunsch).
              </p>
              <p className="text-muted-foreground leading-relaxed">
                <ExternLink href="https://www.paypal.com/de/webapps/mpp/ua/privacy-full">
                  Datenschutzerklärung PayPal
                </ExternLink>
              </p>

              <h3 className="text-base font-semibold text-foreground mb-2 mt-6">19.2 Weitere Zahlungsarten</h3>
              <p className="text-muted-foreground leading-relaxed">
                Je nach angebotenem Zahlungsverfahren werden Zahlungsdaten an den jeweiligen
                Zahlungsdienstleister übermittelt. Zahlungsdienstleister (insbesondere Stripe, GoCardless, PayPal)
                sind eigenständige Verantwortliche im Sinne des Art. 4 Nr. 7 DSGVO und verarbeiten Daten nach
                Maßgabe ihrer eigenen Datenschutzbestimmungen. Es bestehen keine
                Auftragsverarbeitungsverträge gemäß Art. 28 DSGVO mit Zahlungsdienstleistern, da diese keine
                Daten ausschließlich auf Weisung von Epit Global GmbH verarbeiten.
              </p>
            </AccordionSection>

            {/* 20a. Hosting */}
            <AccordionSection
              title="20a. Hosting und eigene Plattform-Infrastruktur"
              open={openSections.has(19)}
              onToggle={() => toggle(19)}
            >
              <p className="text-muted-foreground leading-relaxed mb-3">
                Epit Global GmbH betreibt für ihre Gastronomie-Kunden eine selbst entwickelte Softwareplattform.
                Jeder Gastronomie-Betrieb erhält eine eigene, technisch separierte Instanz mit dedizierter API und
                eigenem Dashboard, über das der Betrieb seine Bestellungen und Kundendaten einsehen und
                verwalten kann. Diese Infrastruktur wird über All-Inkl.com gehostet.
              </p>
              <RolleVerantwortlicher />
              <p className="text-muted-foreground leading-relaxed mb-3">
                Für unsere eigene Website (gastro-master.de) ist Epit Global GmbH Verantwortlicher. All-Inkl.com –
                Neue Medien Münnich, Hauptstraße 68, 02742 Friedersdorf, Deutschland, agiert als
                Auftragsverarbeiter gemäß Art. 28 DSGVO. Ein entsprechender Auftragsverarbeitungsvertrag ist
                abgeschlossen. Die Server befinden sich ausschließlich in Deutschland; durch das Hosting bei
                All-Inkl.com selbst findet keine Übermittlung in Drittländer statt.
              </p>
              <RolleAuftragsverarbeiter />
              <p className="text-muted-foreground leading-relaxed mb-2">
                Die Bestelldaten und Kundendaten der Endkunden (z. B. Name, Lieferadresse, Bestellhistorie) werden
                in den jeweiligen Datenbanken der Gastronomie-Betriebe auf den All-Inkl-Servern gespeichert. Epit
                Global GmbH verarbeitet diese Endkundendaten ausschließlich im Auftrag des jeweiligen
                Gastronomie-Betriebs als Auftragsverarbeiter gemäß Art. 28 DSGVO. Ein
                Auftragsverarbeitungsvertrag zwischen Epit Global GmbH und dem jeweiligen Gastronomie-Betrieb
                liegt vor.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                <strong>Rechtsgrundlage</strong> (eigener Betrieb der Infrastruktur): Art. 6 Abs. 1 lit. b und f DSGVO
                (Vertragserfüllung und berechtigtes Interesse am sicheren, stabilen Betrieb).
              </p>
            </AccordionSection>

            {/* 20b. Kundendokumente */}
            <AccordionSection
              title="20b. Verarbeitung von Kundendokumenten (Onboarding und Vertragsbasis)"
              open={openSections.has(20)}
              onToggle={() => toggle(20)}
            >
              <RolleVerantwortlicher />
              <p className="text-muted-foreground leading-relaxed mb-3">
                Im Rahmen der Einrichtung und des laufenden Betriebs unserer Plattformen für Geschäftskunden
                (Gastronomie-Betriebe) erheben und verarbeiten wir verschiedene Arten von Dokumenten. Diese
                werden nach ihrer Funktion unterschieden:
              </p>

              <h3 className="text-base font-semibold text-foreground mb-2 mt-4">Identifikations- und Vertragsunterlagen</h3>
              <ul className="list-disc list-inside text-muted-foreground leading-relaxed space-y-1 mb-3">
                <li>Personalausweis oder Pass des Inhabers / Geschäftsführers (zur Identitätsprüfung im Rahmen der Konto-Einrichtung bei Zahlungsdienstleistern wie Stripe sowie als Bestandteil der Vertragsdokumentation)</li>
                <li>Gewerbeanmeldung (als geschäftlicher Nachweis der Unternehmenseigenschaft und Grundlage der Vertragsbeziehung)</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mb-2">
                Diese Unterlagen bilden die Vertragsgrundlage und werden für die Dauer der Geschäftsbeziehung sowie
                nach deren Beendigung im Rahmen der gesetzlichen Aufbewahrungspflichten (§ 147 AO, § 257 HGB)
                gespeichert.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                <strong>Rechtsgrundlage:</strong> Art. 6 Abs. 1 lit. b DSGVO (Vertragserfüllung) und Art. 6 Abs. 1
                lit. c DSGVO (gesetzliche Aufbewahrungspflicht).
              </p>

              <h3 className="text-base font-semibold text-foreground mb-2 mt-4">Einrichtungs- und Betriebsunterlagen</h3>
              <ul className="list-disc list-inside text-muted-foreground leading-relaxed space-y-1 mb-3">
                <li>Logo des Unternehmens (zur Einrichtung und laufenden Darstellung der Plattform, Webshops und Apps)</li>
                <li>Speisekarte inkl. Allergene und Zusatzstoffe (zur Befüllung der Plattform; die Vollständigkeit und Richtigkeit liegt in der Verantwortung des Kunden)</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mb-2">
                Diese Unterlagen werden für die Dauer des Vertragsverhältnisses verarbeitet und nach
                Vertragsbeendigung gelöscht, soweit keine gesetzlichen Gründe entgegenstehen.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-3">
                <strong>Rechtsgrundlage:</strong> Art. 6 Abs. 1 lit. b DSGVO (Vertragserfüllung).
              </p>

              <h3 className="text-base font-semibold text-foreground mb-2 mt-4">Speicherorte und Zugriff</h3>
              <p className="text-muted-foreground leading-relaxed mb-2">
                Die genannten Dokumente werden intern in folgenden Systemen abgelegt:
              </p>
              <ul className="list-disc list-inside text-muted-foreground leading-relaxed space-y-1 mb-3">
                <li>Google Drive (Google Ireland Limited, Dublin, Irland; Datentransfer an Google LLC, Mountain View, CA 94043, USA, DPF-zertifiziert, AVV abgeschlossen)</li>
                <li>Trello (Atlassian, Inc., 350 Bush Street, Floor 13, San Francisco, CA 94104, USA; DPF-zertifiziert, AVV gem. Art. 28 DSGVO abgeschlossen)</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed">
                Zugriff haben ausschließlich Mitarbeiterinnen und Mitarbeiter, die für das jeweilige Onboarding oder
                die Kundenberatung zuständig sind (Need-to-know-Prinzip). Eine Weitergabe an Dritte erfolgt nur im
                Rahmen der Konto-Einrichtung bei Zahlungsdienstleistern und nur soweit dies für die
                Auftragsabwicklung erforderlich ist. Kunden können jederzeit Auskunft über gespeicherte Unterlagen
                verlangen und die Löschung beantragen, soweit keine gesetzliche Aufbewahrungspflicht
                entgegensteht.
              </p>
            </AccordionSection>

            {/* 20c. Stripe */}
            <AccordionSection
              title="20c. Stripe – Zahlungsabwicklung und Konto-Einrichtung"
              open={openSections.has(21)}
              onToggle={() => toggle(21)}
            >
              <RolleVerantwortlicher />
              <p className="text-muted-foreground leading-relaxed mb-2">
                Wir arbeiten mit Stripe als Zahlungsdienstleister und im Rahmen einer Stripe Express Partnerschaft.
                Im Zuge der Kontoeröffnung für unsere Geschäftskunden übermitteln wir auf Kundenwunsch und in
                deren Auftrag Identifikationsdaten (Personalausweis, Gewerbeanmeldung, Bankdaten) an Stripe.
                Stripe agiert als eigenständiger Verantwortlicher für die eigentliche Zahlungsverarbeitung.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-2">
                <strong>Anbieter:</strong> Stripe Payments Europe, Ltd., 1 Grand Canal Street Lower, Grand Canal
                Dock, Dublin, Irland.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-2">
                <strong>Rechtsgrundlage</strong> für die Übermittlung durch Epit: Art. 6 Abs. 1 lit. b DSGVO
                (Vertragserfüllung). Stripe ist unter dem EU-U.S. Data Privacy Framework zertifiziert.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                <ExternLink href="https://stripe.com/de/privacy">Datenschutzerklärung Stripe</ExternLink>
              </p>
            </AccordionSection>

            {/* 20d. GoCardless */}
            <AccordionSection
              title="20d. GoCardless – SEPA-Lastschrift / Abonnements"
              open={openSections.has(22)}
              onToggle={() => toggle(22)}
            >
              <RolleVerantwortlicher />
              <p className="text-muted-foreground leading-relaxed mb-2">
                Für den Einzug von Abonnement-Zahlungen unserer Geschäftskunden per SEPA-Lastschrift nutzen wir
                GoCardless. GoCardless agiert als eigenständiger Verantwortlicher für die Zahlungsabwicklung.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-2">
                <strong>Anbieter:</strong> GoCardless Ltd., Sutton Yard, 65 Goswell Road, London, EC1V 7EN,
                Vereinigtes Königreich. Das Vereinigte Königreich verfügt über einen Angemessenheitsbeschluss der
                Europäischen Kommission gemäß Art. 45 DSGVO (zuletzt bestätigt Dezember 2025). Eine
                Übermittlung personenbezogener Daten an GoCardless ist daher ohne zusätzliche Garantien zulässig.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-2">
                <strong>Verarbeitete Daten:</strong> Name, IBAN, BIC, Adresse des Zahlungspflichtigen.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-2">
                <strong>Rechtsgrundlage:</strong> Art. 6 Abs. 1 lit. b DSGVO (Vertragserfüllung).
              </p>
              <p className="text-muted-foreground leading-relaxed">
                <ExternLink href="https://gocardless.com/de-de/privacy">Datenschutzerklärung GoCardless</ExternLink>
              </p>
            </AccordionSection>

            {/* 20e. Make */}
            <AccordionSection
              title="20e. Prozessautomatisierung – Make"
              open={openSections.has(23)}
              onToggle={() => toggle(23)}
            >
              <RolleVerantwortlicher />
              <p className="text-muted-foreground leading-relaxed mb-2">
                Für die Automatisierung interner Geschäftsprozesse (z. B. Datensynchronisation zwischen Systemen,
                automatisierte Workflows) setzen wir Make (ehemals Integromat) ein.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-2">
                <strong>Anbieter:</strong> Make s.r.o., Jiříčnova 1904/3, Prag 4, Tschechische Republik (EU). Kein
                Drittlandtransfer erforderlich.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-2">
                Verarbeitet werden im Rahmen dieser Automatisierungen ausschließlich intern benötigte
                Geschäftsprozessdaten. Endkundendaten werden in Make nicht dauerhaft gespeichert.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-2">
                <strong>Rechtsgrundlage:</strong> Art. 6 Abs. 1 lit. b und f DSGVO (Vertragserfüllung und berechtigtes
                Interesse an effizienten Geschäftsprozessen).
              </p>
              <p className="text-muted-foreground leading-relaxed">
                <ExternLink href="https://www.make.com/en/privacy-notice">Datenschutzerklärung Make</ExternLink>
              </p>
            </AccordionSection>

            {/* 20f. Zoho */}
            <AccordionSection
              title="20f. Zoho – Unternehmens-Software"
              open={openSections.has(24)}
              onToggle={() => toggle(24)}
            >
              <RolleVerantwortlicher />
              <p className="text-muted-foreground leading-relaxed mb-3">
                Für Kernbereiche unseres Unternehmens setzen wir folgende Produkte der Zoho Corporation B.V.,
                Beneluxlaan 4B, 3527 HT Utrecht, Niederlande ein:
              </p>
              <ul className="list-disc list-inside text-muted-foreground leading-relaxed space-y-1 mb-3">
                <li><strong>Zoho CRM:</strong> Kundenverwaltung und Vertriebssteuerung für unsere B2B-Geschäftskunden.</li>
                <li><strong>Zoho Sign:</strong> Digitale Vertragssignatur.</li>
                <li><strong>Zoho Books / Zoho Billing:</strong> Buchhaltung, Rechnungsstellung und Abonnementverwaltung.</li>
                <li><strong>Zoho Vault:</strong> Passwortverwaltung (kein Zugriff auf Kundendaten).</li>
                <li><strong>Zoho Desk:</strong> Kundensupport-Ticketsystem.</li>
                <li><strong>Zoho Campaigns:</strong> E-Mail-Marketing-Versand (Newsletter).</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mb-2">
                Zoho Corporation B.V. hat ihren Sitz in der Europäischen Union (Niederlande). Für etwaige
                konzerninterne Datentransfers an die US-Muttergesellschaft Zoho Corporation, 4141 Hacienda Drive,
                Pleasanton, CA 94588, USA, setzt Zoho auf Standardvertragsklauseln (SCCs) gemäß Art. 46 Abs. 2
                lit. c DSGVO. Ein Auftragsverarbeitungsvertrag gemäß Art. 28 DSGVO ist abgeschlossen.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-2">
                Verarbeitet werden je nach Anwendung: Kontakt- und Vertragsdaten unserer Geschäftskunden (CRM,
                Support, Vertragssignatur), Rechnungs- und Buchhaltungsdaten sowie E-Mail-Adressen für den
                Newsletter-Versand. Endkundendaten der Gastronomie-Betriebe werden in keinem Zoho-Produkt
                dauerhaft gespeichert, ausgenommen buchführungsrelevante Rechnungsdaten.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-2">
                <strong>Rechtsgrundlage:</strong> Art. 6 Abs. 1 lit. b DSGVO (Vertragserfüllung), Art. 6 Abs. 1 lit. c
                DSGVO (rechtliche Verpflichtung bei Buchhaltungsdaten), Art. 6 Abs. 1 lit. a und f DSGVO
                (Einwilligung und berechtigtes Interesse bei E-Mail-Marketing).
              </p>
              <p className="text-muted-foreground leading-relaxed">
                <ExternLink href="https://www.zoho.com/privacy.html">Datenschutzerklärung Zoho</ExternLink>
              </p>
            </AccordionSection>

            {/* 20g. Projektmanagement */}
            <AccordionSection
              title="20g. Projektmanagement und Dokumentenablage"
              open={openSections.has(25)}
              onToggle={() => toggle(25)}
            >
              <RolleVerantwortlicher />
              <p className="text-muted-foreground leading-relaxed mb-3">
                Zur internen Koordination von Kundenprojekten und zur Ablage von Onboarding-Dokumenten unserer
                Geschäftskunden nutzen wir:
              </p>
              <ul className="list-disc list-inside text-muted-foreground leading-relaxed space-y-2 mb-3">
                <li>
                  <strong>Trello</strong> (Atlassian, Inc., 350 Bush Street, Floor 13, San Francisco, CA 94104, USA):
                  Aufgabenmanagement und Projektverfolgung. Atlassian ist unter dem EU-U.S. Data Privacy
                  Framework zertifiziert. Ein AVV gemäß Art. 28 DSGVO ist abgeschlossen.
                </li>
                <li>
                  <strong>Google Drive</strong> (Google Ireland Limited, Dublin, Irland; Datentransfer an Google LLC,
                  Mountain View, CA, USA, DPF-zertifiziert, AVV abgeschlossen): Dokumentenablage und -freigabe
                  intern sowie im Onboarding-Prozess mit Geschäftskunden.
                </li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mb-2">
                Verarbeitet werden in diesen Systemen projektbezogene Daten sowie die unter Abschnitt 20b
                genannten Onboarding-Dokumente. Der Zugriff ist auf die jeweils zuständigen Mitarbeiter beschränkt
                (Need-to-know-Prinzip).
              </p>
              <p className="text-muted-foreground leading-relaxed">
                <strong>Rechtsgrundlage:</strong> Art. 6 Abs. 1 lit. b und f DSGVO (Vertragserfüllung und berechtigtes
                Interesse an koordinierter Projektabwicklung). Drittlandübermittlung: EU-U.S. Data Privacy Framework.
              </p>
            </AccordionSection>

            {/* 20i. Social Media */}
            <AccordionSection
              title="20i. Social-Media-Präsenzen"
              open={openSections.has(26)}
              onToggle={() => toggle(26)}
            >
              <RolleVerantwortlicher />
              <p className="text-muted-foreground leading-relaxed mb-4">
                Wir unterhalten öffentliche Präsenzen auf folgenden Social-Media-Plattformen:
              </p>

              <h3 className="text-base font-semibold text-foreground mb-2 mt-4">20i.1 WhatsApp-Kanal</h3>
              <p className="text-muted-foreground leading-relaxed mb-2">
                Wir betreiben einen WhatsApp-Kanal, über den wir Abonnenten einseitig über Neuigkeiten informieren.
                Es handelt sich nicht um ein Chat-Tool. Betreiber ist Meta Platforms Ireland Limited (EU); Daten
                können an Meta Platforms, Inc., 1 Hacker Way, Menlo Park, CA 94025, USA, übertragen werden.
                Meta Platforms, Inc. ist unter dem EU-U.S. Data Privacy Framework zertifiziert.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                <ExternLink href="https://www.whatsapp.com/legal/privacy-policy">
                  Datenschutzerklärung WhatsApp/Meta
                </ExternLink>
              </p>

              <h3 className="text-base font-semibold text-foreground mb-2 mt-6">20i.2 Instagram</h3>
              <p className="text-muted-foreground leading-relaxed mb-2">
                Wir unterhalten eine Unternehmensseite auf Instagram (Meta Platforms Ireland Limited, 4 Grand Canal
                Square, Dublin 2, Irland). Daten können an Meta Platforms, Inc., Menlo Park, CA 94025, USA,
                übertragen werden. Meta Platforms, Inc. ist unter dem EU-U.S. Data Privacy Framework zertifiziert.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                <ExternLink href="https://privacycenter.instagram.com/policy">
                  Datenschutzerklärung Instagram/Meta
                </ExternLink>
              </p>

              <h3 className="text-base font-semibold text-foreground mb-2 mt-6">20i.3 Facebook</h3>
              <p className="text-muted-foreground leading-relaxed mb-2">
                Wir unterhalten eine Unternehmensseite auf Facebook (Meta Platforms Ireland Limited). Als gemeinsam
                Verantwortliche gemäß Art. 26 DSGVO haben wir mit Meta eine Vereinbarung über die Verarbeitung
                von Seitenstatistiken (Page Insights) getroffen.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                <ExternLink href="https://www.facebook.com/privacy/policy/">
                  Datenschutzerklärung Facebook/Meta
                </ExternLink>
              </p>

              <h3 className="text-base font-semibold text-foreground mb-2 mt-6">20i.4 YouTube</h3>
              <p className="text-muted-foreground leading-relaxed mb-2">
                Wir unterhalten einen YouTube-Kanal (Google Ireland Limited, Dublin, Irland). Daten können an
                Google LLC, Mountain View, CA 94043, USA, übertragen werden. Google LLC ist unter dem EU-U.S.
                Data Privacy Framework zertifiziert.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-3">
                <ExternLink href="https://policies.google.com/privacy">
                  Datenschutzerklärung Google/YouTube
                </ExternLink>
              </p>
              <p className="text-muted-foreground leading-relaxed">
                <strong>Rechtsgrundlage</strong> für unsere Präsenzen: Art. 6 Abs. 1 lit. f DSGVO (berechtigtes
                Interesse an öffentlicher Kommunikation und Reichweite). Auf die Verarbeitungen der
                Plattformbetreiber für eigene Zwecke haben wir keinen Einfluss.
              </p>
            </AccordionSection>

            {/* 21. Empfänger und Auftragsverarbeiter */}
            <AccordionSection
              title="21. Empfänger und Auftragsverarbeiter"
              open={openSections.has(27)}
              onToggle={() => toggle(27)}
            >
              <p className="text-muted-foreground leading-relaxed mb-3">
                Eine Weitergabe Ihrer personenbezogenen Daten erfolgt ausschließlich im Rahmen der gesetzlichen
                Vorgaben. Die folgende Liste unterscheidet nach Rolle:
              </p>

              <h3 className="text-base font-semibold text-foreground mb-2 mt-4">
                Auftragsverarbeiter gemäß Art. 28 DSGVO
              </h3>
              <p className="text-muted-foreground text-sm mb-2">(verarbeiten Daten ausschließlich auf unsere Weisung)</p>
              <ul className="list-disc list-inside text-muted-foreground leading-relaxed space-y-1 mb-4">
                <li>All-Inkl.com – Neue Medien Münnich, Hauptstraße 68, 02742 Friedersdorf, Deutschland (Hosting)</li>
                <li>Zoho Corporation B.V., Beneluxlaan 4B, 3527 HT Utrecht, Niederlande (CRM, Sign, Books, Billing, Vault, Desk, Campaigns; etwaige US-Transfers über SCCs gem. Art. 46 DSGVO)</li>
                <li>Superchat GmbH, Berlin, Deutschland (WhatsApp-Marketing)</li>
                <li>Cybot A/S, Havnegade 39, 1058 Kopenhagen, Dänemark (Cookiebot – Cookie Consent Management)</li>
                <li>Trello / Atlassian, Inc., 350 Bush Street, Floor 13, San Francisco, CA 94104, USA (Projektmanagement, DPF-zertifiziert)</li>
                <li>Google Drive / Google LLC, 1600 Amphitheatre Parkway, Mountain View, CA 94043, USA (Dokumentenablage, DPF-zertifiziert)</li>
                <li>Make s.r.o., Jiříčnova 1904/3, Prag 4, Tschechische Republik (Prozessautomatisierung)</li>
                <li>Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Irland (reCAPTCHA, Google Analytics, Google Maps API; Datentransfer an Google LLC, Mountain View, CA 94043, USA, DPF-zertifiziert)</li>
              </ul>

              <h3 className="text-base font-semibold text-foreground mb-2 mt-4">
                Eigenständige Verantwortliche gemäß Art. 4 Nr. 7 DSGVO
              </h3>
              <p className="text-muted-foreground text-sm mb-2">(verarbeiten Daten nach eigenen Datenschutzbestimmungen)</p>
              <ul className="list-disc list-inside text-muted-foreground leading-relaxed space-y-1 mb-4">
                <li>Stripe Payments Europe, Ltd., Dublin, Irland (Zahlungsabwicklung, DPF-zertifiziert für US-Transfer)</li>
                <li>GoCardless Ltd., London, Vereinigtes Königreich (SEPA-Lastschrift; UK-Angemessenheitsbeschluss Art. 45 DSGVO)</li>
                <li>PayPal (Europe) S.à r.l. et Cie, S.C.A., Luxemburg (Zahlungsabwicklung, optional)</li>
                <li>Meta Platforms Ireland Limited / Meta Platforms, Inc., Menlo Park, CA 94025, USA (WhatsApp Business API, Instagram, Facebook; DPF-zertifiziert)</li>
                <li>Google Ireland Limited / Google LLC (YouTube; DPF-zertifiziert)</li>
                <li>Behörden und Gerichte (bei gesetzlicher Verpflichtung)</li>
              </ul>

              <h3 className="text-base font-semibold text-foreground mb-2 mt-4">
                Konzerninterne Drittlandübermittlung
              </h3>
              <ul className="list-disc list-inside text-muted-foreground leading-relaxed space-y-1 mb-3">
                <li>Epit Global PVT Ltd., Sri Lanka (Tochtergesellschaft, handelt ausschließlich auf Weisung der Epit Global GmbH; Rechtsgrundlage: SCCs gem. Art. 46 Abs. 2 lit. c DSGVO – näheres siehe Abschnitt 6)</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed">
                Soweit Dienstleister personenbezogene Daten ausschließlich auf unsere Weisung hin verarbeiten
                (Auftragsverarbeiter), schließen wir Auftragsverarbeitungsverträge gemäß Art. 28 DSGVO ab.
              </p>
            </AccordionSection>

            {/* 22. Widerspruchsrecht */}
            <AccordionSection
              title="22. Widerspruchsrecht gemäß Art. 21 DSGVO"
              open={openSections.has(28)}
              onToggle={() => toggle(28)}
            >
              <p className="text-muted-foreground leading-relaxed mb-3">
                Sofern die Verarbeitung Ihrer personenbezogenen Daten auf Art. 6 Abs. 1 lit. f DSGVO (berechtigte
                Interessen) beruht, haben Sie das Recht, aus Gründen, die sich aus Ihrer besonderen Situation
                ergeben, jederzeit Widerspruch gegen die Verarbeitung einzulegen.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-3">
                Werden Ihre personenbezogenen Daten zum Zwecke der Direktwerbung verarbeitet, haben Sie das
                Recht, jederzeit und ohne Angabe von Gründen Widerspruch gegen die Verarbeitung einzulegen. Nach
                Ihrem Widerspruch werden Ihre Daten nicht mehr für Direktwerbungszwecke verarbeitet.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Möchten Sie von Ihrem Widerspruchsrecht Gebrauch machen, genügt eine E-Mail an:{" "}
                <ExternLink href="mailto:datenschutz@epitglobal.de">datenschutz@epitglobal.de</ExternLink>
              </p>
            </AccordionSection>

            {/* 23. Änderung */}
            <AccordionSection
              title="23. Änderung dieser Datenschutzerklärung"
              open={openSections.has(29)}
              onToggle={() => toggle(29)}
            >
              <p className="text-muted-foreground leading-relaxed">
                Wir behalten uns vor, diese Datenschutzerklärung anzupassen, um sie an geänderte Rechtslagen,
                technische Neuerungen oder geänderte Geschäftsprozesse anzupassen. Die aktuelle Fassung ist stets
                auf unserer Website abrufbar. Sofern Änderungen eine erneute Einwilligung erfordern, werden wir Sie
                gesondert darüber informieren.
              </p>
            </AccordionSection>

          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Datenschutz;
