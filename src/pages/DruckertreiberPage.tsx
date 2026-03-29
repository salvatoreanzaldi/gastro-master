import { Link } from "react-router-dom";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";

const DRIVERS = [
  { label: "Gastro Master Drucker",        version: "Windows",   url: "https://gastro-master.de/dd/windows.zip",                                                   ext: ".zip" },
  { label: "Epson TM-T20III",              version: "v6.07",     url: "https://www.winorder.com/download/APD_607R1_T20III.exe",                                     ext: ".exe" },
  { label: "Epson TM-T20II",              version: "v5.13",     url: "https://www.winorder.com/download/APD_513_T20II.exe",                                        ext: ".exe" },
  { label: "Epson TM-T20IV",              version: "v6.10",     url: "https://www.winorder.com/download/APD_610_T20IV.exe",                                        ext: ".exe" },
  { label: "Metapace T-3III",             version: "v1.00",     url: "https://www.winorder.com/download/Metapace_T-3III_Windows_Driver_V1.0.0.exe",                ext: ".exe" },
  { label: "Metapace T-3II",              version: "v1.07",     url: "https://www.winorder.com/download/Metapace_T-3II_WIN_V1.0.7.exe",                           ext: ".exe" },
  { label: "Metapace T-40",               version: "v1.01",     url: "https://www.winorder.com/download/Metapace_T-40_WIN_V1_01.zip",                             ext: ".zip" },
  { label: "Star TSP 143IV",              version: "v3.9.1",    url: "https://www.winorder.com/download/Star_TSP143IV_Windows_Software_V3.9.1_setup.exe",         ext: ".exe" },
  { label: "Star TSP 143II / 143III",     version: "v7.70",     url: "https://www.winorder.com/download/tsp100_V770.EXE",                                         ext: ".exe" },
  { label: "Citizen CT-S4000",            version: "v3.6.1.0",  url: "https://www.winorder.com/download/cts4000_lm_v3000.exe",                                    ext: ".exe" },
  { label: "Citizen CT-S4500",            version: "v3.6.1.0",  url: "https://www.winorder.com/download/cts4500_lm_v3000.exe",                                    ext: ".exe" },
];

const DownloadIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
  </svg>
);

const DruckertreiberPage = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <main className="section-padding pt-28 md:pt-32">
      <div className="container-tight max-w-3xl">

        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
          <Link to="/downloads" className="hover:text-foreground transition-colors">Downloads</Link>
          <span>/</span>
          <span className="text-foreground">Druckertreiber</span>
        </nav>

        <h1 className="text-4xl font-black text-foreground mb-2">Druckertreiber</h1>
        <p className="text-muted-foreground text-sm mb-12">
          Hier können Sie die wichtigsten Druckertreiber herunterladen. Alle Treiber sind für Windows.
        </p>

        <ul className="divide-y divide-primary/20 rounded-2xl overflow-hidden">
          {DRIVERS.map((driver) => (
            <li key={driver.label}>
              <a
                href={driver.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between gap-4 px-5 py-4 bg-primary hover:bg-primary/90 transition-colors"
              >
                <div>
                  <span className="text-sm font-medium text-primary-foreground">{driver.label}</span>
                  <span className="ml-2 text-xs text-primary-foreground/50">{driver.version}</span>
                </div>
                <span className="shrink-0 flex items-center gap-1.5 text-xs font-semibold text-accent">
                  <DownloadIcon />
                  {driver.ext}
                </span>
              </a>
            </li>
          ))}
        </ul>

        <p className="mt-8 text-xs text-muted-foreground">
          Bei Fragen zur Installation stehen wir Mo–Fr 08:00–17:00 Uhr unter{" "}
          <a href="tel:+4960819128913" className="underline hover:text-foreground transition-colors">
            +49 (0) 6081 9128913
          </a>{" "}
          oder{" "}
          <a href="mailto:info@gastro-master.de" className="underline hover:text-foreground transition-colors">
            info@gastro-master.de
          </a>{" "}
          zur Verfügung.
        </p>
      </div>
    </main>
    <Footer />
  </div>
);

export default DruckertreiberPage;
