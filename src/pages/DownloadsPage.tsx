import { Link } from "react-router-dom";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";

const DOWNLOADS = [
  {
    category: "Windows",
    items: [
      { label: "GM Windows",        url: "https://gastro-master.de/dd/gmwindows13.zip",    ext: ".zip" },
      { label: "GM Windows Client", url: "https://gastro-master.de/dd/GMClientDesktopV1.0.0.zip", ext: ".zip" },
    ],
  },
  {
    category: "Android",
    items: [
      { label: "GM Terminal – Android", url: "https://gastro-master.de/dd/v1.apk",        ext: ".apk" },
      { label: "Fully Single APK",      url: "https://gastro-master.de/dd/full2025.apk",  ext: ".apk" },
      { label: "GM Merchant – Playstore", url: "https://play.google.com/store/apps/details?id=com.epitglobal.gmmerchantnew&hl", ext: null },
    ],
  },
  {
    category: "iOS",
    items: [
      { label: "GM Terminal – iOS",      url: "https://apps.apple.com/us/app/gastro-master-terminal/id6502642590", ext: null },
      { label: "GM Merchant – App Store", url: "https://apps.apple.com/de/app/gm-merchant/id1631565715",           ext: null },
    ],
  },
];

const DownloadIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
  </svg>
);

const ExternalIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
  </svg>
);

const DownloadsPage = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <main className="section-padding pt-28 md:pt-32">
      <div className="container-tight max-w-3xl">
        <h1 className="text-4xl font-black text-foreground mb-2">Downloads</h1>
        <p className="text-muted-foreground text-sm mb-12">
          Alle Gastro Master Apps und Software-Pakete auf einen Blick.
        </p>

        {/* Druckertreiber – prominent card */}
        <div className="mb-10 rounded-2xl border border-primary/20 bg-primary p-6 flex items-center justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-primary-foreground/50 mb-1">Windows</p>
            <h2 className="text-lg font-bold text-primary-foreground">Druckertreiber</h2>
            <p className="text-sm text-primary-foreground/60 mt-1">Treiber für Epson, Star, Metapace, Citizen und weitere POS-Drucker</p>
          </div>
          <Link
            to="/downloads/druckertreiber"
            className="shrink-0 inline-flex items-center gap-2 bg-accent text-accent-foreground text-sm font-semibold px-5 py-2.5 rounded-xl hover:opacity-90 transition-opacity"
          >
            Öffnen
            <svg className="w-4 h-4 text-accent-foreground" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        {/* Download categories */}
        {DOWNLOADS.map((group) => (
          <section key={group.category} className="mb-8">
            <h2 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">{group.category}</h2>
            <ul className="divide-y divide-primary/20 rounded-2xl overflow-hidden">
              {group.items.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between gap-4 px-5 py-4 bg-primary hover:bg-primary/90 transition-colors"
                  >
                    <span className="text-sm font-medium text-primary-foreground">{item.label}</span>
                    <span className="shrink-0 flex items-center gap-1.5 text-xs font-semibold text-accent">
                      {item.ext ? (
                        <>
                          <DownloadIcon />
                          {item.ext}
                        </>
                      ) : (
                        <>
                          <ExternalIcon />
                          Store
                        </>
                      )}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </main>
    <Footer />
  </div>
);

export default DownloadsPage;
