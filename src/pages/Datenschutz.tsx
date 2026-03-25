import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";

const Datenschutz = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <main className="section-padding pt-36">
      <div className="container-tight max-w-3xl">
        <h1 className="text-4xl font-black text-foreground mb-2">Datenschutzerklärung</h1>
        <p className="text-muted-foreground text-sm mb-12">Stand: [Datum einsetzen]</p>

        <section className="mb-10">
          <h2 className="text-xl font-bold text-foreground mb-3">1. Verantwortlicher</h2>
          <p className="text-muted-foreground leading-relaxed">
            Verantwortlich für die Datenverarbeitung auf dieser Website ist:<br /><br />
            [Firmenname]<br />
            [Adresse]<br />
            [E-Mail]<br />
            [Telefon]
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-bold text-foreground mb-3">2. Erhebung und Verarbeitung personenbezogener Daten</h2>
          <p className="text-muted-foreground leading-relaxed">
            Wir erheben personenbezogene Daten nur, soweit dies zur Bereitstellung unserer
            Dienstleistungen erforderlich ist oder Sie uns diese freiwillig mitteilen. Dies umfasst
            insbesondere Daten, die Sie uns über Kontaktformulare, E-Mail oder Telefon übermitteln,
            sowie technische Daten, die beim Besuch unserer Website automatisch anfallen
            (z.B. IP-Adresse, Browsertyp, Besuchszeit).
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-bold text-foreground mb-3">3. Zweck der Datenverarbeitung</h2>
          <p className="text-muted-foreground leading-relaxed">
            Die Verarbeitung Ihrer personenbezogenen Daten erfolgt zu folgenden Zwecken:
          </p>
          <ul className="list-disc list-inside text-muted-foreground leading-relaxed mt-2 space-y-1">
            <li>Bearbeitung von Anfragen und Bereitstellung unserer Dienstleistungen</li>
            <li>Verbesserung unseres Webangebots und unserer Dienstleistungen</li>
            <li>Erfüllung gesetzlicher Pflichten</li>
            <li>Kommunikation mit Interessenten und Kunden</li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-bold text-foreground mb-3">4. Rechtsgrundlage</h2>
          <p className="text-muted-foreground leading-relaxed">
            Die Verarbeitung personenbezogener Daten erfolgt auf Grundlage von Art. 6 DSGVO, insbesondere:
          </p>
          <ul className="list-disc list-inside text-muted-foreground leading-relaxed mt-2 space-y-1">
            <li>Art. 6 Abs. 1 lit. a DSGVO (Einwilligung)</li>
            <li>Art. 6 Abs. 1 lit. b DSGVO (Vertragserfüllung)</li>
            <li>Art. 6 Abs. 1 lit. c DSGVO (gesetzliche Verpflichtung)</li>
            <li>Art. 6 Abs. 1 lit. f DSGVO (berechtigte Interessen)</li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-bold text-foreground mb-3">5. Cookies</h2>
          <p className="text-muted-foreground leading-relaxed">
            Unsere Website verwendet Cookies, um die Benutzerfreundlichkeit zu verbessern. Dabei
            handelt es sich um kleine Textdateien, die auf Ihrem Endgerät gespeichert werden. Sie
            können Ihren Browser so einstellen, dass Sie über das Setzen von Cookies informiert
            werden und Cookies nur im Einzelfall erlauben. Das Deaktivieren von Cookies kann die
            Funktionalität dieser Website einschränken.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-bold text-foreground mb-3">6. Hosting und Server-Log-Dateien</h2>
          <p className="text-muted-foreground leading-relaxed">
            Diese Website wird bei [Hosting-Anbieter einsetzen] gehostet. Beim Aufruf unserer Website
            werden automatisch Informationen in sog. Server-Log-Dateien gespeichert, die Ihr Browser
            übermittelt. Dies sind: IP-Adresse, Datum und Uhrzeit der Anfrage, Browsertyp, Betriebssystem
            und referenzierende URL. Diese Daten werden nicht mit anderen Datenquellen zusammengeführt.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-bold text-foreground mb-3">7. Kontaktformular</h2>
          <p className="text-muted-foreground leading-relaxed">
            Wenn Sie uns über das Kontaktformular Anfragen zukommen lassen, werden Ihre Angaben aus
            dem Anfrageformular inklusive der von Ihnen angegebenen Kontaktdaten zwecks Bearbeitung
            der Anfrage und für den Fall von Anschlussfragen bei uns gespeichert. Diese Daten geben
            wir nicht ohne Ihre Einwilligung weiter. Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-bold text-foreground mb-3">8. Ihre Rechte</h2>
          <p className="text-muted-foreground leading-relaxed mb-2">
            Sie haben jederzeit das Recht auf:
          </p>
          <ul className="list-disc list-inside text-muted-foreground leading-relaxed space-y-1">
            <li>Auskunft über Ihre bei uns gespeicherten Daten (Art. 15 DSGVO)</li>
            <li>Berichtigung unrichtiger Daten (Art. 16 DSGVO)</li>
            <li>Löschung Ihrer Daten (Art. 17 DSGVO)</li>
            <li>Einschränkung der Verarbeitung (Art. 18 DSGVO)</li>
            <li>Datenübertragbarkeit (Art. 20 DSGVO)</li>
            <li>Widerspruch gegen die Verarbeitung (Art. 21 DSGVO)</li>
            <li>Widerruf einer erteilten Einwilligung (Art. 7 Abs. 3 DSGVO)</li>
          </ul>
          <p className="text-muted-foreground leading-relaxed mt-3">
            Zur Ausübung Ihrer Rechte wenden Sie sich bitte an: [E-Mail-Adresse].
            Sie haben zudem das Recht, sich bei der zuständigen Datenschutzaufsichtsbehörde zu beschweren.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-bold text-foreground mb-3">9. Datensicherheit</h2>
          <p className="text-muted-foreground leading-relaxed">
            Diese Seite nutzt aus Sicherheitsgründen und zum Schutz der Übertragung vertraulicher
            Inhalte eine SSL- bzw. TLS-Verschlüsselung. Eine verschlüsselte Verbindung erkennen Sie
            daran, dass die Adresszeile des Browsers von „http://" auf „https://" wechselt und an
            dem Schloss-Symbol in Ihrer Browserzeile.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-bold text-foreground mb-3">10. Aktualität und Änderung dieser Datenschutzerklärung</h2>
          <p className="text-muted-foreground leading-relaxed">
            Diese Datenschutzerklärung ist aktuell gültig und hat den Stand [Datum]. Durch die
            Weiterentwicklung unserer Website oder aufgrund geänderter gesetzlicher bzw. behördlicher
            Vorgaben kann es notwendig werden, diese Datenschutzerklärung zu ändern.
          </p>
        </section>
      </div>
    </main>
    <Footer />
  </div>
);

export default Datenschutz;
