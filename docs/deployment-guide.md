# Gastro Master — Deployment-Guide & URL-Liste

Stand: April 2026 | 5 Sprachen | 25 Seiten | 125 URLs

---

## 1. Was ist eine Sitemap?

Eine Sitemap ist eine XML-Datei, die Google (und anderen Suchmaschinen) sagt: **"Das sind alle Seiten meiner Website."** Damit Google jede einzelne Seite findet, indexiert und in den Suchergebnissen anzeigt.

Unsere Sitemap liegt nach dem Deployen hier:
**https://gastro-master.de/sitemap.xml**

Sie wird **automatisch** bei jedem Build erstellt — du musst sie nicht manuell pflegen.

---

## 2. Deployment-Checkliste

Vor und nach dem Deployen bitte diese Punkte durchgehen:

### Vor dem Deploy

- [ ] **Build ausfuehren:** `npm run build` — das erstellt den `dist/` Ordner UND die Sitemap automatisch
- [ ] **Pruefen:** Gibt es im `dist/` Ordner eine `sitemap.xml`? (sollte ca. 125 URL-Eintraege haben)
- [ ] **Pruefen:** Gibt es im `dist/` Ordner eine `robots.txt`?

### Nach dem Deploy

- [ ] **Sitemap testen:** https://gastro-master.de/sitemap.xml im Browser oeffnen — es sollte eine XML-Datei mit allen URLs erscheinen
- [ ] **robots.txt testen:** https://gastro-master.de/robots.txt im Browser oeffnen — dort steht der Verweis auf die Sitemap
- [ ] **Stichproben:** Ein paar URLs aus der Liste unten im Browser oeffnen und pruefen, ob die Seite korrekt laedt (auch die Nicht-Deutsch-Versionen)
- [ ] **Sitemap bei Google einreichen** (siehe Abschnitt 4 unten)

### Wichtig: Server-Konfiguration (SPA)

Da die Website eine Single-Page-App (SPA) ist, muss der Server so konfiguriert sein, dass **alle Anfragen auf `index.html` umgeleitet werden** — sonst bekommt man bei direktem Seitenaufruf (z.B. `/de/produkte/webshop`) einen 404-Fehler.

Bei **Netlify** passiert das automatisch.
Bei **Apache** braucht man eine `.htaccess` mit `FallbackResource /index.html`.
Bei **Nginx** braucht man `try_files $uri /index.html;`.

---

## 3. Vollstaendige URL-Liste (125 URLs)

Die Domain ist: **https://gastro-master.de**

### Startseite

| Seite | DE | EN | IT | FA | SI |
|-------|----|----|----|----|-----|
| Startseite | /de/ | /en/ | /it/ | /fa/ | /si/ |

### Produkte (6 Seiten)

| Seite | DE | EN | IT | FA | SI |
|-------|----|----|----|----|-----|
| Produkte (Uebersicht) | /de/produkte | /en/produkte | /it/produkte | /fa/produkte | /si/produkte |
| Online-Bestellshop | /de/produkte/webshop | /en/produkte/webshop | /it/produkte/webshop | /fa/produkte/webshop | /si/produkte/webshop |
| Bestell-App | /de/produkte/app | /en/produkte/app | /it/produkte/app | /fa/produkte/app | /si/produkte/app |
| Webseite | /de/produkte/webseite | /en/produkte/webseite | /it/produkte/webseite | /fa/produkte/webseite | /si/produkte/webseite |
| Kassensystem | /de/produkte/kassensystem | /en/produkte/kassensystem | /it/produkte/kassensystem | /fa/produkte/kassensystem | /si/produkte/kassensystem |
| Transaktionsumlage | /de/produkte/transaktionsumlage | /en/produkte/transaktionsumlage | /it/produkte/transaktionsumlage | /fa/produkte/transaktionsumlage | /si/produkte/transaktionsumlage |

### Loesungen (6 Seiten)

| Seite | DE | EN | IT | FA | SI |
|-------|----|----|----|----|-----|
| Loesungen (Uebersicht) | /de/loesungen | /en/loesungen | /it/loesungen | /fa/loesungen | /si/loesungen |
| Lieferdienst gruenden | /de/loesungen/lieferservice-gruenden | /en/loesungen/lieferservice-gruenden | /it/loesungen/lieferservice-gruenden | /fa/loesungen/lieferservice-gruenden | /si/loesungen/lieferservice-gruenden |
| Franchise | /de/loesungen/franchise | /en/loesungen/franchise | /it/loesungen/franchise | /fa/loesungen/franchise | /si/loesungen/franchise |
| Restaurant | /de/loesungen/restaurant | /en/loesungen/restaurant | /it/loesungen/restaurant | /fa/loesungen/restaurant | /si/loesungen/restaurant |
| Lieferdienst (Bestand) | /de/loesungen/lieferdienst | /en/loesungen/lieferdienst | /it/loesungen/lieferdienst | /fa/loesungen/lieferdienst | /si/loesungen/lieferdienst |
| Cafe & Baeckerei | /de/loesungen/cafe-baeckerei | /en/loesungen/cafe-baeckerei | /it/loesungen/cafe-baeckerei | /fa/loesungen/cafe-baeckerei | /si/loesungen/cafe-baeckerei |
| Ghost Kitchen | /de/loesungen/ghost-kitchen | /en/loesungen/ghost-kitchen | /it/loesungen/ghost-kitchen | /fa/loesungen/ghost-kitchen | /si/loesungen/ghost-kitchen |

### Info-Seiten (4 Seiten)

| Seite | DE | EN | IT | FA | SI |
|-------|----|----|----|----|-----|
| FAQ | /de/faq | /en/faq | /it/faq | /fa/faq | /si/faq |
| Preise | /de/preise | /en/preise | /it/preise | /fa/preise | /si/preise |
| Ueber uns | /de/uber-uns | /en/uber-uns | /it/uber-uns | /fa/uber-uns | /si/uber-uns |
| Kontakt | /de/kontakt | /en/kontakt | /it/kontakt | /fa/kontakt | /si/kontakt |

### Downloads (2 Seiten)

| Seite | DE | EN | IT | FA | SI |
|-------|----|----|----|----|-----|
| Downloads | /de/downloads | /en/downloads | /it/downloads | /fa/downloads | /si/downloads |
| Druckertreiber | /de/downloads/druckertreiber | /en/downloads/druckertreiber | /it/downloads/druckertreiber | /fa/downloads/druckertreiber | /si/downloads/druckertreiber |

### Rechtliches (3 Seiten)

| Seite | DE | EN | IT | FA | SI |
|-------|----|----|----|----|-----|
| Impressum | /de/impressum | /en/impressum | /it/impressum | /fa/impressum | /si/impressum |
| Datenschutz | /de/datenschutz | /en/datenschutz | /it/datenschutz | /fa/datenschutz | /si/datenschutz |
| AGB | /de/agb | /en/agb | /it/agb | /fa/agb | /si/agb |

### Zusammenfassung

| | Anzahl |
|---|--------|
| Seiten | 25 |
| Sprachen | 5 (DE, EN, IT, FA, SI) |
| **URLs gesamt** | **125** |

---

## 4. Google Search Console — Sitemap einreichen

Damit Google alle 125 Seiten kennt, muss die Sitemap einmalig in der Google Search Console eingereicht werden:

1. **Google Search Console oeffnen:** https://search.google.com/search-console
2. Die Property `gastro-master.de` auswaehlen (oder neu anlegen, falls noch nicht vorhanden)
3. Im linken Menue auf **"Sitemaps"** klicken
4. Oben im Feld `https://gastro-master.de/` eingeben: **sitemap.xml**
5. Auf **"Senden"** klicken
6. Google zeigt dann den Status: "Erfolgreich" mit der Anzahl der gefundenen URLs

Das muss nur **einmal** gemacht werden. Google prueft die Sitemap danach regelmaessig automatisch.

**Tipp:** Falls die Seite vorher schon in der Search Console war, kann man unter "URL-Pruefung" einzelne URLs manuell zur Indexierung einreichen, damit sie schneller erscheinen.

---

## 5. Technische Kurzreferenz

| Was | Wo / Befehl |
|-----|-------------|
| Build ausfuehren | `npm run build` |
| Build-Ergebnis | `dist/` Ordner |
| Sitemap | `dist/sitemap.xml` (automatisch generiert) |
| robots.txt | `public/robots.txt` → wird nach `dist/robots.txt` kopiert |
| Sitemap-URL (live) | https://gastro-master.de/sitemap.xml |
| robots.txt (live) | https://gastro-master.de/robots.txt |
| Sprachen | DE, EN, IT, FA (Persisch/RTL), SI (Singhalesisch) |
| Standard-Sprache | Deutsch (Fallback) |
| Route-Konfiguration | `src/config/routes.ts` |
| i18n-Konfiguration | `src/i18n.ts` |
| Uebersetzungs-Dateien | `public/locales/{de,en,it,fa,si}/*.json` |

---

## 6. Hreflang — Was Google ueber die Sprachen wissen muss

Jede Seite hat automatisch sogenannte **hreflang-Tags** im HTML-Code. Diese sagen Google:
"Diese Seite gibt es auch in anderen Sprachen — hier sind die Links."

Das passiert automatisch im Code — es muss nichts manuell konfiguriert werden.

Beispiel fuer die Webshop-Seite:
```
<link rel="alternate" hreflang="de" href="https://gastro-master.de/de/produkte/webshop" />
<link rel="alternate" hreflang="en" href="https://gastro-master.de/en/produkte/webshop" />
<link rel="alternate" hreflang="it" href="https://gastro-master.de/it/produkte/webshop" />
<link rel="alternate" hreflang="fa" href="https://gastro-master.de/fa/produkte/webshop" />
<link rel="alternate" hreflang="si" href="https://gastro-master.de/si/produkte/webshop" />
<link rel="alternate" hreflang="x-default" href="https://gastro-master.de/de/produkte/webshop" />
```

Google nutzt diese Tags, um Nutzern die richtige Sprachversion anzuzeigen.
