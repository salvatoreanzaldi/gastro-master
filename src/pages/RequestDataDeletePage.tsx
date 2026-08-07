import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import { useSeoMeta } from "@/hooks/useSeoMeta";
import ScrollToTopButton from "@/components/ScrollToTopButton";

/**
 * /request-data-delete — Anleitung zur Konto- und Datenlöschung.
 * Bewusst OHNE Sprach-Präfix (stabile URL, z.B. für App-Store-Angaben zur
 * Datenlöschung). DE-only, analog zu den Legal-Pages (Impressum/Datenschutz).
 */
const RequestDataDeletePage = () => {
  useSeoMeta({
    title: "Konto und Daten löschen | Gastro Master",
    description:
      "Anleitung zur Löschung Ihres Gastro Master Benutzerkontos und persönlicher Daten gemäß DSGVO.",
    canonical: "https://gastro-master.de/request-data-delete",
  });

  return (
    <div className="min-h-screen bg-background">
      <ScrollToTopButton />
      <Navbar />
      {/* !pt erzwingt das Top-Padding gegen das `padding`-Shorthand von
          .section-padding (sonst Titel hinter der fixed Navbar). */}
      <main className="section-padding !pt-44 md:!pt-52">
        <div className="container-tight max-w-2xl">
          <h1 className="text-4xl font-black text-foreground mb-6">
            Konto und persönliche Daten löschen
          </h1>

          <p className="text-muted-foreground leading-relaxed mb-4">
            Sie können Ihr Benutzerkonto und die damit verbundenen persönlichen
            Daten jederzeit direkt in Ihrem Profil löschen.
          </p>

          <h2 className="text-lg font-semibold text-foreground mt-6 mb-3">
            Gehen Sie dazu wie folgt vor:
          </h2>

          <ol className="list-decimal pl-6 space-y-2 mb-6 text-muted-foreground leading-relaxed">
            <li>Melden Sie sich in Ihrem Benutzerkonto an.</li>
            <li>Öffnen Sie den Bereich „Profil".</li>
            <li>Klicken Sie auf „Mein Konto und meine Daten löschen".</li>
            <li>Sie erhalten anschließend per E-Mail einen einmalig gültigen Bestätigungscode.</li>
            <li>Geben Sie diesen Code in das dafür vorgesehene Feld ein und bestätigen Sie die Löschung.</li>
            <li>Nach erfolgreicher Bestätigung wird die Löschung Ihres Kontos und Ihrer persönlichen Daten veranlasst.</li>
          </ol>

          <h2 className="text-lg font-semibold text-foreground mt-6 mb-3">
            Probleme bei der Kontolöschung?
          </h2>

          <p className="text-muted-foreground leading-relaxed mb-16">
            Sollten bei der Kontolöschung Probleme auftreten oder sollten Sie
            keinen Zugriff mehr auf Ihr Benutzerkonto haben, kontaktieren Sie
            uns bitte unter{" "}
            <a
              href="mailto:info@epitglobal.de"
              className="text-cyan-brand underline underline-offset-2 hover:opacity-80 transition-opacity"
            >
              info@epitglobal.de
            </a>
            . Wir prüfen Ihre Anfrage und können die Löschung Ihres Kontos
            manuell für Sie durchführen.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default RequestDataDeletePage;
