import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import { useSeoMeta } from "@/hooks/useSeoMeta";

const Impressum = () => {
  useSeoMeta({
    title: "Impressum | Gastro Master",
    description: "Impressum der Gastro Master / Epit Global GmbH gemäß § 5 TMG.",
    canonical: "https://gastro-master.de/impressum",
  });
  return (
  <div className="min-h-screen bg-background">
    <Navbar />
    <main className="section-padding pt-44 md:pt-52">
      <div className="container-tight max-w-3xl">
        <h1 className="text-4xl font-black text-foreground mb-2">Impressum</h1>
        <p className="text-muted-foreground text-sm mb-12">Angaben gemäß § 5 TMG</p>

        <section className="mb-10">
          <h2 className="text-xl font-bold text-foreground mb-3">Anbieter</h2>
          <p className="text-muted-foreground leading-relaxed">
            Epit Global GmbH<br />
            Herzbergstr. 9<br />
            61250 Usingen<br />
            Deutschland
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-bold text-foreground mb-3">Kontakt</h2>
          <p className="text-muted-foreground leading-relaxed">
            Telefon: +49 6081 9128913<br />
            E-Mail: info@epitglobal.de<br />
            Web: www.gastro-master.de
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-bold text-foreground mb-3">Geschäftsführung</h2>
          <p className="text-muted-foreground leading-relaxed">
            Sanjaya Pattiyage<br />
            René Ebert
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-bold text-foreground mb-3">Handelsregister</h2>
          <p className="text-muted-foreground leading-relaxed">
            Registergericht Bad Homburg<br />
            HRB-Nr.: 16336
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-bold text-foreground mb-3">Umsatzsteuer-ID</h2>
          <p className="text-muted-foreground leading-relaxed">
            Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz:<br />
            DE363847623
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-bold text-foreground mb-3">Bankverbindung</h2>
          <p className="text-muted-foreground leading-relaxed">
            Frankfurter Volksbank<br />
            IBAN: DE21 5019 0000 6000 0921 83<br />
            Swift-BIC: FFVBDEFFXXX
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-bold text-foreground mb-3">Haftungsausschluss</h2>

          <h3 className="text-base font-semibold text-foreground mb-2 mt-6">Haftung für Inhalte</h3>
          <p className="text-muted-foreground leading-relaxed">
            Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen. Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden von entsprechenden Rechtsverletzungen werden wir diese Inhalte umgehend entfernen.
          </p>

          <h3 className="text-base font-semibold text-foreground mb-2 mt-6">Haftung für Links</h3>
          <p className="text-muted-foreground leading-relaxed">
            Unser Angebot enthält Links zu externen Webseiten Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich. Die verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße überprüft. Rechtswidrige Inhalte waren zum Zeitpunkt der Verlinkung nicht erkennbar. Eine permanente inhaltliche Kontrolle der verlinkten Seiten ist jedoch ohne konkrete Anhaltspunkte einer Rechtsverletzung nicht zumutbar. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Links umgehend entfernen.
          </p>

          <h3 className="text-base font-semibold text-foreground mb-2 mt-6">Urheberrecht</h3>
          <p className="text-muted-foreground leading-relaxed">
            Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers. Downloads und Kopien dieser Seite sind nur für den privaten, nicht kommerziellen Gebrauch gestattet. Soweit die Inhalte auf dieser Seite nicht vom Betreiber erstellt wurden, werden die Urheberrechte Dritter beachtet. Insbesondere werden Inhalte Dritter als solche gekennzeichnet. Sollten Sie trotzdem auf eine Urheberrechtsverletzung aufmerksam werden, bitten wir um einen entsprechenden Hinweis. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Inhalte umgehend entfernen.
          </p>
        </section>
      </div>
    </main>
    <Footer />
  </div>
);
};

export default Impressum;
