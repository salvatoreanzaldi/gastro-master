import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";

const Impressum = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <main className="section-padding pt-36">
      <div className="container-tight max-w-3xl">
        <h1 className="text-4xl font-black text-foreground mb-2">Impressum</h1>
        <p className="text-muted-foreground text-sm mb-12">Angaben gemäß § 5 TMG</p>

        <section className="mb-10">
          <h2 className="text-xl font-bold text-foreground mb-3">Anbieter</h2>
          <p className="text-muted-foreground leading-relaxed">
            [Firmenname / Inhabername]<br />
            [Straße und Hausnummer]<br />
            [PLZ Ort]<br />
            Deutschland
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-bold text-foreground mb-3">Kontakt</h2>
          <p className="text-muted-foreground leading-relaxed">
            Telefon: [Telefonnummer]<br />
            E-Mail: [E-Mail-Adresse]
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-bold text-foreground mb-3">Umsatzsteuer-ID</h2>
          <p className="text-muted-foreground leading-relaxed">
            Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz:<br />
            [USt-IdNr.]
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-bold text-foreground mb-3">Handelsregister</h2>
          <p className="text-muted-foreground leading-relaxed">
            Registergericht: [Amtsgericht]<br />
            Registernummer: [HRB/HRA-Nummer]
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-bold text-foreground mb-3">Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV</h2>
          <p className="text-muted-foreground leading-relaxed">
            [Name]<br />
            [Anschrift wie oben]
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-bold text-foreground mb-3">Streitschlichtung</h2>
          <p className="text-muted-foreground leading-relaxed">
            Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:
            https://ec.europa.eu/consumers/odr/. Unsere E-Mail-Adresse finden Sie oben im Impressum.
            Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer
            Verbraucherschlichtungsstelle teilzunehmen.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-bold text-foreground mb-3">Haftung für Inhalte</h2>
          <p className="text-muted-foreground leading-relaxed">
            Als Diensteanbieter sind wir gemäß § 7 Abs. 1 TMG für eigene Inhalte auf diesen Seiten
            nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als
            Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde
            Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige
            Tätigkeit hinweisen.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-bold text-foreground mb-3">Haftung für Links</h2>
          <p className="text-muted-foreground leading-relaxed">
            Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen
            Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr
            übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder
            Betreiber der Seiten verantwortlich.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-bold text-foreground mb-3">Urheberrecht</h2>
          <p className="text-muted-foreground leading-relaxed">
            Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen
            dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art
            der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen
            Zustimmung des jeweiligen Autors bzw. Erstellers.
          </p>
        </section>
      </div>
    </main>
    <Footer />
  </div>
);

export default Impressum;
