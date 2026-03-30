import { useState } from "react";
import { ChevronDown } from "lucide-react";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import { useSeoMeta } from "@/hooks/useSeoMeta";

const sections = [
  {
    title: "Kaufvertrag Online Bestellsystem",
    content: (
      <div className="space-y-6 text-muted-foreground leading-relaxed">
        <div>
          <h3 className="text-base font-semibold text-foreground mb-2">Präambel</h3>
          <p>
            Die Parteien schließen einen Kaufvertrag über die Erstellung eines Online-Shops und einer App
            (iOS &amp; Android). Das Angebot richtet sich an den genannten Betreiber. Vertragsgegenstand ist
            die App- und Webshop-Erstellung durch Epit Global GmbH. Der Anbieter pflegt die Produkte gemäß
            der Produktliste ein. Nach Fertigstellung des Projekts kann der Betreiber die Produkte
            selbstständig pflegen. Der Restaurantbetreiber kann optional das Gastro Master Gerät erwerben.
            Über dieses Gerät werden eingehende Bestellungen automatisch ausgedruckt, anstatt per E-Mail
            abgerufen werden zu müssen.
          </p>
        </div>

        <div>
          <h3 className="text-base font-semibold text-foreground mb-2">§ 1 Vertragsparteien</h3>
          <p>
            Ausschließliche Vertragsparteien sind die Epit Global GmbH (nachfolgend „Anbieter") und der im
            Auftragsformular genannte Endkunde (nachfolgend „Kunde").
          </p>
        </div>

        <div>
          <h3 className="text-base font-semibold text-foreground mb-2">§ 2 Vertragsgegenstand</h3>
          <p className="font-medium text-foreground/80 mb-1">(a) App, Webshop</p>
          <p className="mb-3">
            Vertragsgegenstand ist die Einrichtung sowie die zeitlich unbegrenzte Nutzungsrechtsübertragung
            für Android-/iOS-Apps und/oder Webshops gemäß Kaufvertrag. Gegenstand ist der Erwerb eines
            Online-Bestellsystems, das als App(s) in den jeweiligen App-Stores und als Webshop online
            erscheint. Dies umfasst die initiale Befüllung mit anbieterbereitgestellten Inhalten sowie die
            Datenspeicherung aus dem Betrieb. Der Endkunde erhält über eine Internet- oder
            Telekommunikationsverbindung Zugang zur App/zum Webshop. Bei Kauf geht das System in das
            Eigentum des Kunden über. Entscheidet sich der Käufer, sein System auf anderen Servern zu
            speichern, übernimmt er die ausschließliche Haftung für Komplikationen bei der Datenverarbeitung
            oder bei Datenverlust, einschließlich Kundendaten und Bestellhistorie.
          </p>
          <p className="font-medium text-foreground/80 mb-1">(b) Beispieldarstellung</p>
          <p className="mb-3">
            Vor Vertragsschluss hat der Kunde ein Beispiel eines bereits eingerichteten Webshops/einer App
            erhalten. Der Webshop/die Apps des Kunden können diesem Beispiel design- und layoutmäßig
            entsprechen. Gleiches gilt für die beispielhaft dargestellte Homepage, die Produktpräsentationen
            und den Bestellprozess.
          </p>
          <p className="font-medium text-foreground/80 mb-1">(c) Kundenzugang</p>
          <p className="mb-3">
            Der Kunde erhält einen separaten Zugang und kann die Inhalte der App/des Webshops eigenständig
            bearbeiten.
          </p>
          <p className="font-medium text-foreground/80 mb-1">(d) Rechtsdokumente</p>
          <p className="mb-3">
            Der Anbieter stellt Muster-AGB, eine Datenschutzerklärung und ein Impressum zur Verfügung. Der
            Kunde wird ausdrücklich darauf hingewiesen, diese Texte anzupassen und rechtlich prüfen zu
            lassen. Der Anbieter erbringt keine Rechtsberatung.
          </p>
          <p className="font-medium text-foreground/80 mb-1">(e) Inhaltsverantwortung</p>
          <p>
            Der Anbieter übernimmt keine Verantwortung für die Rechtmäßigkeit der Inhalte der App/des
            Webshops. Die alleinige rechtliche Verantwortung liegt ausschließlich beim jeweiligen Kunden.
            Gemäß § 5 Abs. 1 TMG ist im Impressum ausschließlich der Kunde angegeben. Auf besondere
            gesetzliche Bestimmungen für den Lebensmittel- und Getränkeverkauf, insbesondere den
            Jugendschutz, wird ausdrücklich hingewiesen.
          </p>
        </div>

        <div>
          <h3 className="text-base font-semibold text-foreground mb-2">§ 3 Preise / Zahlung</h3>
          <p className="font-medium text-foreground/80 mb-1">(1) Nutzungsgebühren und Kauf</p>
          <p className="mb-3">
            Die monatlichen Nutzungsgebühren für Apps/Webshops sind im Auftragsformular aufgeführt. Durch
            den Kauf entfallen die monatlichen Gebühren. Die Kaufsumme (gemäß vorherigem Angebot) kann in
            maximal 4 Raten bezahlt werden. Vorauszahlung: 25 %. Der Restbetrag wird auf bis zu 4
            monatliche Raten aufgeteilt. Ohne SEPA-Mandat wird die Einrichtung eines Dauerauftrags
            empfohlen.
          </p>
          <p className="font-medium text-foreground/80 mb-1">(2) Einrichtungsgebühren</p>
          <p className="mb-3">
            Die Einrichtungsgebühren werden individuell je nach Umfang des Betriebs vereinbart. Die Einrichtung von Filialen erfolgt
            digital.
          </p>
          <p className="font-medium text-foreground/80 mb-1">(3) Bestellübermittlung</p>
          <p>
            Die Bestellübermittlung erfolgt per E-Mail-Programm. Nach Abschluss erläutert der Anbieter alles
            umfassend.
          </p>
        </div>

        <div>
          <h3 className="text-base font-semibold text-foreground mb-2">§ 4 Nutzungsrechte</h3>
          <p>
            Der Anbieter gewährt dem Kunden zeitlich unbegrenzte, einfache, nicht übertragbare Rechte zur
            Nutzung der Apps/des Webshops im vertragsgemäßen Umfang. Der Kunde kann die Nutzungsrechte
            ohne Zustimmung des Anbieters nicht auf Dritte übertragen.
          </p>
        </div>

        <div>
          <h3 className="text-base font-semibold text-foreground mb-2">§ 5 Mitwirkungspflichten des Kunden</h3>
          <p>
            Der Kunde ist verpflichtet, Softwaremängel dem Anbieter unverzüglich zu melden.
          </p>
        </div>

        <div>
          <h3 className="text-base font-semibold text-foreground mb-2">§ 6 Haftungsbeschränkungen</h3>
          <p className="font-medium text-foreground/80 mb-1">(1) Unbeschränkte Haftung</p>
          <p className="mb-3">
            Der Anbieter haftet unbeschränkt nach den gesetzlichen Vorschriften für Schäden aus der
            Verletzung des Lebens, des Körpers oder der Gesundheit durch vorsätzliche oder fahrlässige
            Pflichtverletzungen sowie durch vorsätzliches oder fahrlässiges Verhalten des Anbieters, seiner
            gesetzlichen Vertreter oder Erfüllungsgehilfen, für das Fehlen oder den Wegfall zugesicherter
            Eigenschaften sowie für Schäden aus vorsätzlichen oder grob fahrlässigen
            Pflichtverletzungen.
          </p>
          <p className="font-medium text-foreground/80 mb-1">(2) Beschränkte Haftung</p>
          <p className="mb-3">
            Für Schäden aus leicht fahrlässigen Verletzungen wesentlicher Pflichten haftet der Anbieter
            beschränkt auf den vertragstypischen, vorhersehbaren Schaden. Wesentliche Pflichten sind solche,
            die die ordnungsgemäße Vertragsdurchführung erst ermöglichen und auf deren Einhaltung der Kunde
            vertrauen darf.
          </p>
          <p className="font-medium text-foreground/80 mb-1">(3) Produkthaftung</p>
          <p>
            Die Vorschriften des Produkthaftungsgesetzes bleiben unberührt.
          </p>
        </div>

        <div>
          <h3 className="text-base font-semibold text-foreground mb-2">§ 7 Support / Updates</h3>
          <p>
            Der Kaufvertrag umfasst einen kostenlosen 6-monatigen Support sowie monatliche Updates.
          </p>
        </div>

        <div>
          <h3 className="text-base font-semibold text-foreground mb-2">§ 8 Datenschutz</h3>
          <p className="font-medium text-foreground/80 mb-1">(a) Verantwortlicher</p>
          <p className="mb-3">
            Im Sinne der DSGVO ist der Anbieter Verantwortlicher.
          </p>
          <p className="font-medium text-foreground/80 mb-1">(b) Erhebung und Verarbeitung personenbezogener Daten</p>
          <p>
            Der Anbieter erhebt und verarbeitet personenbezogene Daten nur, soweit dies zur
            Vertragserfüllung erforderlich ist, eine Einwilligung vorliegt oder berechtigte Interessen dies
            rechtfertigen. Die Verarbeitung personenbezogener Daten des Kunden dient ausschließlich der
            Vertragserfüllung. Hinsichtlich der Verarbeitung personenbezogener Daten von Gästen schließen
            die Parteien einen Auftragsverarbeitungsvertrag.
          </p>
        </div>

        <div>
          <h3 className="text-base font-semibold text-foreground mb-2">§ 10 Sonstige Bestimmungen</h3>
          <p className="font-medium text-foreground/80 mb-1">(1) Schriftformerfordernis</p>
          <p className="mb-3">
            Änderungen dieses Vertrages bedürfen der Schriftform. Das Abweichen vom Schriftformerfordernis
            selbst bedarf der Schriftform. Mündliche Nebenabreden wurden nicht getroffen.
          </p>
          <p className="font-medium text-foreground/80 mb-1">(2) Salvatorische Klausel</p>
          <p className="mb-3">
            Die Unwirksamkeit oder Lückenhaftigkeit einzelner Vertragsbestimmungen berührt nicht die
            Rechtswirksamkeit der übrigen Bestimmungen.
          </p>
          <p className="font-medium text-foreground/80 mb-1">(3) Gerichtsstand</p>
          <p className="mb-3">
            Für alle Streitigkeiten ist der Sitz des Anbieters als Gerichtsstand vereinbart.
          </p>
          <p className="font-medium text-foreground/80 mb-1">(4) Im Kaufpreis enthaltene Leistungen</p>
          <p>
            Im Kaufpreis enthalten sind 2.500 Flyer mit QR-Codes je Filiale.
          </p>
        </div>
      </div>
    ),
  },
  {
    title: "Kaufvertrag Webseite",
    content: (
      <div className="space-y-6 text-muted-foreground leading-relaxed">
        <div>
          <h3 className="text-base font-semibold text-foreground mb-2">§ 1 Vertragsgegenstand</h3>
          <p className="mb-3">
            Vertragsgegenstand ist die Einrichtung sowie die zeitlich unbegrenzte Nutzungsrechtsübertragung
            für eine Website gemäß Kaufvertrag. Der Endkunde erhält über eine Internet- oder
            Telekommunikationsverbindung Zugang zur Website. Bei Kauf geht das System in das Eigentum des
            Kunden über. Entscheidet sich der Käufer, sein System auf anderen Servern zu speichern,
            übernimmt er die ausschließliche Haftung für Komplikationen bei der Datenverarbeitung oder bei
            Datenverlust, einschließlich Kundendaten und Bestellhistorie.
          </p>
        </div>

        <div>
          <h3 className="text-base font-semibold text-foreground mb-2">§ 2 Kundenzugang und Rechtsdokumente</h3>
          <ul className="list-disc list-inside space-y-1">
            <li>Der Kunde erhält einen separaten Zugang und kann die Inhalte der Website eigenständig bearbeiten.</li>
            <li>Der Anbieter stellt Muster-AGB, eine Datenschutzerklärung und ein Impressum zur Verfügung.</li>
            <li>Der Kunde wird ausdrücklich darauf hingewiesen, diese Texte anzupassen und rechtlich prüfen zu lassen.</li>
            <li>Der Anbieter erbringt keine Rechtsberatung.</li>
            <li>Der Anbieter übernimmt keine Verantwortung für die Rechtmäßigkeit der Website-Inhalte.</li>
            <li>Die alleinige rechtliche Verantwortung liegt ausschließlich beim Kunden.</li>
            <li>Gemäß § 5 Abs. 1 TMG ist im Impressum ausschließlich der Kunde angegeben.</li>
          </ul>
        </div>

        <div>
          <h3 className="text-base font-semibold text-foreground mb-2">§ 3 Preise / Zahlung</h3>
          <p>
            Durch den Kauf entfallen die monatlichen Gebühren. Die Kaufsumme (gemäß vorherigem Angebot)
            kann in maximal 5 Raten bezahlt werden.
          </p>
        </div>

        <div>
          <h3 className="text-base font-semibold text-foreground mb-2">§ 4 Rechteübertragung</h3>
          <p>
            Der Anbieter überträgt dem Kunden alle Rechte an der Plattform. Bei fortlaufendem Support für
            monatliche Updates/Wartung erfolgen alle Änderungen mit Zustimmung des Kunden.
          </p>
        </div>

        <div>
          <h3 className="text-base font-semibold text-foreground mb-2">§ 5 Mitwirkungspflichten des Kunden</h3>
          <p>
            Der Kunde ist verpflichtet, Mängel der Website dem Anbieter unverzüglich zu melden.
          </p>
        </div>

        <div>
          <h3 className="text-base font-semibold text-foreground mb-2">§ 6 Haftungsbeschränkungen</h3>
          <p className="font-medium text-foreground/80 mb-1">(1) Unbeschränkte Haftung</p>
          <p className="mb-3">
            Der Anbieter haftet unbeschränkt nach den gesetzlichen Vorschriften für Schäden aus der
            Verletzung des Lebens, des Körpers oder der Gesundheit durch vorsätzliche oder fahrlässige
            Pflichtverletzungen sowie für Schäden aus vorsätzlichen oder grob fahrlässigen Handlungen des
            Anbieters, seiner gesetzlichen Vertreter oder Erfüllungsgehilfen.
          </p>
          <p className="font-medium text-foreground/80 mb-1">(2) Beschränkte Haftung</p>
          <p className="mb-3">
            Für Schäden aus leicht fahrlässigen Verletzungen wesentlicher Pflichten haftet der Anbieter
            beschränkt auf den vertragstypischen, vorhersehbaren Schaden.
          </p>
          <p className="font-medium text-foreground/80 mb-1">(3) Produkthaftung</p>
          <p>
            Die Vorschriften des Produkthaftungsgesetzes bleiben unberührt.
          </p>
        </div>

        <div>
          <h3 className="text-base font-semibold text-foreground mb-2">§ 7 Support / Updates</h3>
          <p>
            Der Kaufvertrag stellt eine abgeschlossene Leistung dar, die keine weitere Beratung erfordert.
            Sollten die Parteien eine fortlaufende Zusammenarbeit vereinbaren, erfolgt diese vergütet und
            vertraglich dokumentiert. Anschließend wird eine monatliche Pauschale für Änderungen
            (Entwicklung) und technischen Support festgelegt.
          </p>
        </div>

        <div>
          <h3 className="text-base font-semibold text-foreground mb-2">§ 8 Datenschutz</h3>
          <p className="font-medium text-foreground/80 mb-1">(a) Verantwortlicher</p>
          <p className="mb-3">Im Sinne der DSGVO ist der Anbieter Verantwortlicher.</p>
          <p className="font-medium text-foreground/80 mb-1">(b) Erhebung und Verarbeitung personenbezogener Daten</p>
          <p>
            Der Anbieter erhebt und verarbeitet personenbezogene Daten nur, soweit dies zur
            Vertragserfüllung erforderlich ist, eine Einwilligung vorliegt oder berechtigte Interessen dies
            rechtfertigen. Die Verarbeitung personenbezogener Daten des Kunden dient ausschließlich der
            Vertragserfüllung.
          </p>
        </div>

        <div>
          <h3 className="text-base font-semibold text-foreground mb-2">§ 9 Sonstige Bestimmungen</h3>
          <p className="font-medium text-foreground/80 mb-1">(1) Schriftformerfordernis</p>
          <p className="mb-3">
            Änderungen bedürfen der Schriftform. Das Abweichen vom Schriftformerfordernis selbst bedarf der
            Schriftform. Mündliche Nebenabreden wurden nicht getroffen.
          </p>
          <p className="font-medium text-foreground/80 mb-1">(2) Salvatorische Klausel</p>
          <p className="mb-3">
            Die Unwirksamkeit einzelner Bestimmungen berührt nicht die Rechtswirksamkeit der übrigen
            Bestimmungen.
          </p>
          <p className="font-medium text-foreground/80 mb-1">(3) Gerichtsstand</p>
          <p>
            Für alle Streitigkeiten ist der Sitz des Anbieters als Gerichtsstand vereinbart.
          </p>
        </div>
      </div>
    ),
  },
  {
    title: "Leasingvertrag Webseite",
    content: (
      <div className="space-y-6 text-muted-foreground leading-relaxed">
        <div>
          <h3 className="text-base font-semibold text-foreground mb-2">Präambel</h3>
          <p>
            Die Parteien schließen einen Leasingvertrag über die Erstellung einer Website. Das Angebot
            richtet sich an den genannten Betreiber. Vertragsgegenstand ist die Website-Erstellung durch
            Epit Global GmbH (nachfolgend „Anbieter"). Der Anbieter pflegt die vom Kunden bereitgestellten
            Inhalte, Bilder und Beschreibungen ein und gewährleistet den laufenden Betrieb der Website.
          </p>
        </div>

        <div>
          <h3 className="text-base font-semibold text-foreground mb-2">§ 1 Vertragsparteien</h3>
          <p>
            Ausschließliche Vertragsparteien sind die Epit Global GmbH (nachfolgend „Anbieter") und der im
            Angebot genannte Kunde (nachfolgend „Kunde").
          </p>
        </div>

        <div>
          <h3 className="text-base font-semibold text-foreground mb-2">§ 2 Vertragsgegenstand</h3>
          <p className="font-medium text-foreground/80 mb-1">(a) Website</p>
          <p className="font-medium text-foreground/80 mb-1">(1) Umfang</p>
          <p className="mb-3">
            Vertragsgegenstand ist die Einrichtung sowie die zeitlich begrenzte Nutzung einer Website gemäß
            Leasingvertrag. Die Mindestlaufzeit der Website beträgt 12 Monate. Anschließend kann der Vertrag
            jederzeit mit einer dreimonatigen Frist zum Monatsende gekündigt werden. Der Endkunde erhält
            über eine Internet- oder Telekommunikationsverbindung Zugang zur Website.
          </p>
          <p className="font-medium text-foreground/80 mb-1">(2) Beispieldarstellung</p>
          <p className="mb-3">
            Vor Vertragsschluss hat der Kunde ein Beispiel einer bereits eingerichteten Website erhalten. Die
            Website des Kunden ähnelt diesem Beispiel, erlaubt jedoch individuelle Design- und
            Layout-Anpassungen. Gleiches gilt für die beispielhaft dargestellte Homepage und die
            Produktpräsentationen.
          </p>
          <p className="font-medium text-foreground/80 mb-1">(3) Kundenzugang</p>
          <p className="mb-3">
            Der Kunde erhält einen separaten Zugang und kann die Inhalte der Website eigenständig
            bearbeiten.
          </p>
          <p className="font-medium text-foreground/80 mb-1">(4) Rechtsdokumente</p>
          <p className="mb-3">
            Der Anbieter stellt Muster-AGB, eine Datenschutzerklärung und ein Impressum zur Verfügung. Der
            Kunde wird ausdrücklich darauf hingewiesen, diese Texte anzupassen und rechtlich prüfen zu
            lassen. Der Anbieter erbringt keine Rechtsberatung.
          </p>
          <p className="font-medium text-foreground/80 mb-1">(5) Inhaltsverantwortung</p>
          <p>
            Der Anbieter übernimmt keine Verantwortung für die Rechtmäßigkeit der Website-Inhalte. Die
            alleinige rechtliche Verantwortung liegt ausschließlich beim Kunden. Gemäß § 5 Abs. 1 TMG ist
            im Impressum ausschließlich der Kunde angegeben.
          </p>
        </div>

        <div>
          <h3 className="text-base font-semibold text-foreground mb-2">§ 3 Preise / Zahlung</h3>
          <p>
            Die monatliche Nutzungsgebühr für die Website ist im Auftragsformular aufgeführt.
          </p>
        </div>

        <div>
          <h3 className="text-base font-semibold text-foreground mb-2">§ 4 Nutzungsrechte</h3>
          <p>
            Der Anbieter gewährt dem Kunden zeitlich begrenzte, einfache, nicht übertragbare Rechte zur
            Nutzung der Website im vertragsgemäßen Umfang.
          </p>
        </div>

        <div>
          <h3 className="text-base font-semibold text-foreground mb-2">§ 5 Mitwirkungspflichten des Kunden</h3>
          <p>
            Der Kunde ist verpflichtet, Softwaremängel dem Anbieter unverzüglich zu melden.
          </p>
        </div>

        <div>
          <h3 className="text-base font-semibold text-foreground mb-2">§ 6 Haftungsbeschränkungen</h3>
          <p className="font-medium text-foreground/80 mb-1">(1) Unbeschränkte Haftung</p>
          <p className="mb-3">
            Der Anbieter haftet unbeschränkt nach den gesetzlichen Vorschriften für Schäden aus der
            Verletzung des Lebens, des Körpers oder der Gesundheit durch vorsätzliche oder fahrlässige
            Pflichtverletzungen sowie für Schäden aus vorsätzlichen oder grob fahrlässigen Handlungen.
          </p>
          <p className="font-medium text-foreground/80 mb-1">(2) Beschränkte Haftung</p>
          <p className="mb-3">
            Für Schäden aus leicht fahrlässigen Verletzungen wesentlicher Pflichten haftet der Anbieter
            beschränkt auf den vertragstypischen, vorhersehbaren Schaden.
          </p>
          <p className="font-medium text-foreground/80 mb-1">(3) Produkthaftung</p>
          <p>Die Vorschriften des Produkthaftungsgesetzes bleiben unberührt.</p>
        </div>

        <div>
          <h3 className="text-base font-semibold text-foreground mb-2">§ 7 Support / Updates</h3>
          <p className="font-medium text-foreground/80 mb-1">(1) Enthaltene Updates</p>
          <p className="mb-3">
            Der Leasingvertrag umfasst kostenlose Updates und Website-Anpassungen. Änderungen erfolgen
            mit vorheriger Zustimmung des Kunden gemäß Vertrag.
          </p>
          <p className="font-medium text-foreground/80 mb-1">(2) Filialintegration</p>
          <p>
            Der Support umfasst die kostenlose Integration weiterer Filialen für den Käufer.
          </p>
        </div>

        <div>
          <h3 className="text-base font-semibold text-foreground mb-2">§ 8 Datenschutz</h3>
          <p className="font-medium text-foreground/80 mb-1">(a) Verantwortlicher</p>
          <p className="mb-3">Im Sinne der DSGVO ist der Anbieter Verantwortlicher.</p>
          <p className="font-medium text-foreground/80 mb-1">(b) Erhebung und Verarbeitung personenbezogener Daten</p>
          <p>
            Der Anbieter erhebt und verarbeitet personenbezogene Daten nur, soweit dies zur
            Vertragserfüllung erforderlich ist, eine Einwilligung vorliegt oder berechtigte Interessen dies
            rechtfertigen. Die Verarbeitung personenbezogener Daten des Kunden dient ausschließlich der
            Vertragserfüllung. Hinsichtlich der Verarbeitung personenbezogener Daten von Gästen schließen
            die Parteien einen Auftragsverarbeitungsvertrag.
          </p>
        </div>

        <div>
          <h3 className="text-base font-semibold text-foreground mb-2">§ 9 Sonstige Bestimmungen</h3>
          <p className="font-medium text-foreground/80 mb-1">(1) Schriftformerfordernis</p>
          <p className="mb-3">
            Änderungen bedürfen der Schriftform. Das Abweichen vom Schriftformerfordernis selbst bedarf der
            Schriftform. Mündliche Nebenabreden wurden nicht getroffen.
          </p>
          <p className="font-medium text-foreground/80 mb-1">(2) Salvatorische Klausel</p>
          <p className="mb-3">
            Die Unwirksamkeit einzelner Bestimmungen berührt nicht die Rechtswirksamkeit der übrigen
            Bestimmungen.
          </p>
          <p className="font-medium text-foreground/80 mb-1">(3) Gerichtsstand</p>
          <p>
            Für alle Streitigkeiten ist der Sitz des Anbieters als Gerichtsstand vereinbart.
          </p>
        </div>
      </div>
    ),
  },
  {
    title: "Leasingvertrag Online Shop & App",
    content: (
      <div className="space-y-6 text-muted-foreground leading-relaxed">
        <div>
          <h3 className="text-base font-semibold text-foreground mb-2">Präambel</h3>
          <p>
            Die Parteien schließen einen Leasingvertrag über die Erstellung eines Ionic-basierten
            App-Systems. Das Angebot richtet sich an den genannten Betreiber. Vertragsgegenstand ist die
            App-System-Erstellung durch Epit Global GmbH (nachfolgend „Anbieter"). Endkunden bestellen
            Produkte des Betreibers über die Apps und sind zur Zahlung verpflichtet. Der Anbieter pflegt die
            vom Kunden bereitgestellten Inhalte, Bilder und Beschreibungen ein und gewährleistet den
            laufenden Betrieb der App. Der Kunde erhält eigenständigen Zugang zur App und kann Inhalte
            (Produkte, Rabatte, Kategorien, Beschreibungen) eigenständig bearbeiten.
          </p>
        </div>

        <div>
          <h3 className="text-base font-semibold text-foreground mb-2">§ 1 Vertragsparteien</h3>
          <p>
            Ausschließliche Vertragsparteien sind die Epit Global GmbH (nachfolgend „Anbieter") und der im
            Angebot genannte Kunde (nachfolgend „Kunde").
          </p>
        </div>

        <div>
          <h3 className="text-base font-semibold text-foreground mb-2">§ 2 Vertragsgegenstand</h3>
          <p className="font-medium text-foreground/80 mb-1">(a) App, Webshop</p>
          <p className="font-medium text-foreground/80 mb-1">(1) Umfang</p>
          <p className="mb-3">
            Vertragsgegenstand ist die Einrichtung sowie die auf 12 Monate befristete Nutzung eines
            Online-Bestellsystems, das als App(s) in den jeweiligen App-Stores und als Webshop online
            erscheint. Dies umfasst die initiale Befüllung mit anbieterbereitgestellten Inhalten sowie die
            Datenspeicherung aus dem Betrieb. Der Endkunde erhält über eine Internet- oder
            Telekommunikationsverbindung Zugang zur App/zum Webshop. Bei Kauf geht das System in das
            Eigentum des Kunden über. Entscheidet sich der Käufer, sein System auf anderen Servern zu
            speichern, übernimmt er die ausschließliche Haftung für Komplikationen bei der Datenverarbeitung
            oder bei Datenverlust.
          </p>
          <p className="font-medium text-foreground/80 mb-1">(2) Beispieldarstellung</p>
          <p className="mb-3">
            Vor Vertragsschluss hat der Kunde ein Beispiel eines bereits eingerichteten Webshops/einer App
            erhalten. Der Webshop/die Apps des Kunden ähneln diesem Beispiel, erlauben jedoch individuelle
            Design- und Layout-Anpassungen.
          </p>
          <p className="font-medium text-foreground/80 mb-1">(3) Kundenzugang</p>
          <p className="mb-3">
            Der Kunde erhält einen separaten Zugang und kann die Inhalte der App/des Webshops eigenständig
            bearbeiten.
          </p>
          <p className="font-medium text-foreground/80 mb-1">(4) Rechtsdokumente</p>
          <p className="mb-3">
            Der Anbieter stellt Muster-AGB, eine Datenschutzerklärung und ein Impressum zur Verfügung. Der
            Kunde wird ausdrücklich darauf hingewiesen, diese Texte anzupassen und rechtlich prüfen zu
            lassen. Der Anbieter erbringt keine Rechtsberatung.
          </p>
          <p className="font-medium text-foreground/80 mb-1">(5) Inhaltsverantwortung</p>
          <p>
            Der Anbieter übernimmt keine Verantwortung für die Rechtmäßigkeit der Inhalte der App/des
            Webshops. Die alleinige rechtliche Verantwortung liegt ausschließlich beim Kunden. Gemäß § 5
            Abs. 1 TMG ist im Impressum ausschließlich der Kunde angegeben.
          </p>
        </div>

        <div>
          <h3 className="text-base font-semibold text-foreground mb-2">§ 3 Preise / Zahlung</h3>
          <p className="font-medium text-foreground/80 mb-1">(1) Gebühren und Konditionen</p>
          <p className="mb-3">
            Die monatlichen Nutzungsgebühren für Apps/Webshops sind im Auftragsformular aufgeführt. Die
            Vertragslaufzeit ist unbefristet mit einer dreimonatigen Kündigungsfrist für beide Parteien. Durch
            den Kauf entfallen die monatlichen Gebühren. Die Kaufsumme (gemäß vorherigem Angebot) kann
            in maximal 4 Raten bezahlt werden. Die vier Raten sind jeweils bis zum dritten Werktag des
            Monats im Voraus auf das Konto des Anbieters zu überweisen. Ohne SEPA-Mandat wird die
            Einrichtung eines Dauerauftrags empfohlen.
          </p>
          <p className="font-medium text-foreground/80 mb-1">(2) Einrichtungsgebühren</p>
          <p>
            Die Einrichtungsgebühren werden individuell je nach Umfang des Betriebs vereinbart. Die Einrichtung von Filialen erfolgt
            digital.
          </p>
        </div>

        <div>
          <h3 className="text-base font-semibold text-foreground mb-2">§ 4 Nutzungsrechte</h3>
          <p>
            Der Anbieter gewährt dem Kunden zeitlich unbegrenzte, einfache, nicht übertragbare Rechte zur
            Nutzung der Apps/des Webshops im vertragsgemäßen Umfang. Der Kunde kann die Nutzungsrechte
            ohne Zustimmung des Anbieters nicht auf Dritte übertragen.
          </p>
        </div>

        <div>
          <h3 className="text-base font-semibold text-foreground mb-2">§ 5 Mitwirkungspflichten des Kunden</h3>
          <p>
            Der Kunde ist verpflichtet, Softwaremängel dem Anbieter unverzüglich zu melden.
          </p>
        </div>

        <div>
          <h3 className="text-base font-semibold text-foreground mb-2">§ 6 Haftungsbeschränkungen</h3>
          <p className="font-medium text-foreground/80 mb-1">(1) Unbeschränkte Haftung</p>
          <p className="mb-3">
            Der Anbieter haftet unbeschränkt nach den gesetzlichen Vorschriften für Schäden aus der
            Verletzung des Lebens, des Körpers oder der Gesundheit durch vorsätzliche oder fahrlässige
            Pflichtverletzungen sowie für Schäden aus vorsätzlichen oder grob fahrlässigen Handlungen.
          </p>
          <p className="font-medium text-foreground/80 mb-1">(2) Beschränkte Haftung</p>
          <p className="mb-3">
            Für Schäden aus leicht fahrlässigen Verletzungen wesentlicher Pflichten haftet der Anbieter
            beschränkt auf den vertragstypischen, vorhersehbaren Schaden.
          </p>
          <p className="font-medium text-foreground/80 mb-1">(3) Produkthaftung</p>
          <p>Die Vorschriften des Produkthaftungsgesetzes bleiben unberührt.</p>
        </div>

        <div>
          <h3 className="text-base font-semibold text-foreground mb-2">§ 7 Datenschutz</h3>
          <p className="font-medium text-foreground/80 mb-1">(a) Verantwortlicher</p>
          <p className="mb-3">Im Sinne der DSGVO ist der Anbieter Verantwortlicher.</p>
          <p className="font-medium text-foreground/80 mb-1">(b) Erhebung und Verarbeitung personenbezogener Daten</p>
          <p>
            Der Anbieter erhebt und verarbeitet personenbezogene Daten nur, soweit dies zur
            Vertragserfüllung erforderlich ist, eine Einwilligung vorliegt oder berechtigte Interessen dies
            rechtfertigen. Die Verarbeitung personenbezogener Daten des Kunden dient ausschließlich der
            Vertragserfüllung. Hinsichtlich der Verarbeitung personenbezogener Daten von Gästen schließen
            die Parteien einen Auftragsverarbeitungsvertrag.
          </p>
        </div>

        <div>
          <h3 className="text-base font-semibold text-foreground mb-2">§ 8 Sonstige Bestimmungen</h3>
          <p className="font-medium text-foreground/80 mb-1">(1) Schriftformerfordernis</p>
          <p className="mb-3">
            Änderungen bedürfen der Schriftform. Das Abweichen vom Schriftformerfordernis selbst bedarf der
            Schriftform. Mündliche Nebenabreden wurden nicht getroffen.
          </p>
          <p className="font-medium text-foreground/80 mb-1">(2) Salvatorische Klausel</p>
          <p className="mb-3">
            Die Unwirksamkeit einzelner Bestimmungen berührt nicht die Rechtswirksamkeit der übrigen
            Bestimmungen.
          </p>
          <p className="font-medium text-foreground/80 mb-1">(3) Gerichtsstand</p>
          <p>
            Für alle Streitigkeiten ist der Sitz des Anbieters als Gerichtsstand vereinbart.
          </p>
        </div>
      </div>
    ),
  },
];

const AccordionItem = ({
  title,
  content,
  isOpen,
  onToggle,
  index,
}: {
  title: string;
  content: React.ReactNode;
  isOpen: boolean;
  onToggle: () => void;
  index: number;
}) => (
  <div className="border border-border rounded-2xl overflow-hidden">
    <button
      onClick={onToggle}
      className="w-full flex items-center justify-between px-6 py-5 text-left bg-background hover:bg-muted/30 transition-colors duration-200"
    >
      <div className="flex items-center gap-3">
        <span className="text-cyan-brand text-xs font-bold uppercase tracking-widest opacity-60 w-4 text-right flex-shrink-0">
          0{index + 1}
        </span>
        <span className="text-foreground font-bold text-base md:text-lg">{title}</span>
      </div>
      <ChevronDown
        className={`w-5 h-5 text-muted-foreground flex-shrink-0 ml-4 transition-transform duration-300 ${
          isOpen ? "rotate-180" : ""
        }`}
      />
    </button>
    {isOpen && (
      <div className="px-6 pb-8 pt-2 border-t border-border bg-background">
        {content}
      </div>
    )}
  </div>
);

const AGB = () => {
  useSeoMeta({
    title: "AGB — Allgemeine Geschäftsbedingungen | Gastro Master",
    description: "Allgemeine Geschäftsbedingungen der Epit Global GmbH / Gastro Master.",
    canonical: "https://gastro-master.de/agb",
  });
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (i: number) => setOpenIndex(openIndex === i ? null : i);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="section-padding pt-44 md:pt-52">
        <div className="container-tight max-w-3xl">
          <h1 className="text-4xl font-black text-foreground mb-2">
            Allgemeine Geschäftsbedingungen
          </h1>
          <p className="text-muted-foreground text-sm mb-12">
            Epit Global GmbH · Herzbergstr. 9 · 61250 Usingen
          </p>

          <div className="space-y-4">
            {sections.map((section, i) => (
              <AccordionItem
                key={section.title}
                index={i}
                title={section.title}
                content={section.content}
                isOpen={openIndex === i}
                onToggle={() => toggle(i)}
              />
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AGB;
