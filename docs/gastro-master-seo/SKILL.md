---
name: gastro-master-seo
description: >
  Zentraler SEO-, GEO- und Verlinkungsskill für gastro-master.de — vereint interne Verlinkung,
  SEO/GEO-Optimierung und Wettbewerbsanalyse in einem Skill mit automatischer Agent-Auswahl.
  Nutze diesen Skill IMMER wenn der User irgendetwas im Zusammenhang mit gastro-master.de tut:
  Seiten erstellen, Texte schreiben, Links setzen, SEO prüfen, Content optimieren, Keywords einbauen,
  Schema-Markup ergänzen, Wettbewerber analysieren, URL-Struktur planen, oder Content-Gaps finden.
  Trigger-Begriffe: "SEO", "GEO", "interne Verlinkung", "internal linking", "Anchor-Text",
  "Keywords", "Schema", "Meta", "Sichtbarkeit", "Rankings", "Content", "Wettbewerber",
  "Kassensystem", "Bestellsystem", "Lieferdienst", "neue Seite", "Seite erstellen",
  "Seite optimieren", "Link-Audit", "Link-Map", "Content-Gap", "Keyword-Cluster",
  "Linkbroker", "URL-Struktur", "Ratgeber", "Vergleichsseite".
  Auch triggern wenn der User eine Gastro Master Seite baut, bearbeitet, oder reviewt,
  ohne explizit "SEO" zu sagen — denn jede Seite muss SEO/GEO-optimiert sein.
---

# Gastro Master SEO — Zentraler Optimierungs-Skill

Dieser Skill ist die zentrale Steuerung für alle SEO-, GEO- und Verlinkungsaufgaben auf gastro-master.de. Er kennt die vollständige Seitenarchitektur, alle Keyword-Cluster, die Linkbroker-Strategie und die GEO-Best-Practices.

## Wie dieser Skill funktioniert

Dieser Skill arbeitet als **Orchestrator**. Er analysiert die Aufgabe und entscheidet automatisch, welche Agenten (Sub-Skills) benötigt werden. Nicht jede Aufgabe braucht alle Agenten — der Skill wählt den effizientesten Pfad.

---

## Agent-Routing: Welcher Agent wann?

Lies die Aufgabe und entscheide anhand dieser Matrix, welche Agenten du brauchst:

### Agent 1: 🔗 Interner Linking-Agent
**Wann aktivieren:**
- User erstellt eine neue Seite oder überarbeitet eine bestehende
- User sagt "Links setzen", "verlinken", "Verlinkung prüfen", "Link-Audit"
- Eine Seite wird fertiggestellt und braucht kontextuelle Links
- Nach jeder Content-Erstellung als Abschluss-Check

**Was er tut:**
- Liest `references/link-map.md` für Keyword→URL→Anchor-Zuordnungen
- Analysiert bestehende Links auf der Seite
- Setzt kontextuelle interne Links nach den 10 Verlinkungsregeln
- Erstellt Verlinkungstabelle und Link-Bilanz
- Prüft die Kreuzverlinkungs-Matrix

### Agent 2: 📊 SEO/GEO-Optimierungs-Agent
**Wann aktivieren:**
- User erstellt neue Seite (immer! — jede Seite muss optimiert sein)
- User sagt "SEO prüfen", "GEO optimieren", "Meta anpassen", "Schema ergänzen"
- Content wird geschrieben und braucht Keyword-Integration
- FAQ-Fragen werden erstellt (Schema-Markup, Quellenangaben)
- Technischer SEO-Check gewünscht

**Was er tut:**
- Liest `references/seo-geo-rules.md` für alle Optimierungsregeln
- Prüft und erstellt Meta Title + Description
- Prüft Heading-Hierarchie (H1→H2→H3)
- Erstellt/prüft Schema-Markup (FAQPage, BreadcrumbList, HowTo, etc.)
- Integriert Keywords aus den Keyword-Clustern (siehe `references/site-architecture.md`)
- Prüft GEO-Tauglichkeit (Zitierfähigkeit, Quellenangaben, Definitionsblöcke)
- Prüft Sprachprofil C Konformität

### Agent 3: 🏆 Wettbewerbs- und Content-Gap-Agent
**Wann aktivieren:**
- User fragt "Was fehlt noch?", "Welche Seiten brauchen wir?", "Content-Gap"
- User plant neue Seiten oder Bereiche (z.B. /wissen/, /vergleiche/)
- User will Wettbewerber analysieren
- Strategische Planung von Content-Roadmaps

**Was er tut:**
- Nutzt `/competitor-alternatives` für Wettbewerberanalyse
- Nutzt `/deep-research` für Branchendaten und Trend-Recherche
- Identifiziert fehlende Seiten basierend auf der Soll-Architektur
- Findet Keyword-Gaps durch Vergleich mit Wettbewerbern
- Schlägt neue FAQ-Fragen, Ratgeber-Artikel oder Vergleichsseiten vor

---

## Automatische Agent-Auswahl — Entscheidungsbaum

```
Aufgabe empfangen
    │
    ├── Neue Seite erstellen?
    │   └── Agent 2 (SEO/GEO) + Agent 1 (Links) nacheinander
    │       Optional: Agent 3 wenn User unsicher ist welche Seite
    │
    ├── Bestehende Seite überarbeiten?
    │   └── Agent 2 (SEO/GEO) prüfen → Agent 1 (Links) aktualisieren
    │
    ├── Links setzen / prüfen?
    │   └── Nur Agent 1 (Links)
    │
    ├── SEO/GEO Audit einer Seite?
    │   └── Nur Agent 2 (SEO/GEO)
    │
    ├── "Was fehlt?" / Content-Gap / Strategie?
    │   └── Agent 3 (Wettbewerb) → dann Agent 2 für Empfehlungen
    │
    ├── FAQ-Fragen erstellen?
    │   └── Agent 2 (Schema + GEO) + Agent 1 (Links in Antworten)
    │
    ├── Kompletter Website-Audit?
    │   └── Alle 3 Agenten: Agent 3 → Agent 2 → Agent 1
    │
    └── Unklar?
        └── Frage den User: "Soll ich Links setzen, SEO prüfen, oder Content-Gaps finden?"
```

---

## Referenz-Dateien

Lade die Referenz-Dateien nur wenn der jeweilige Agent sie braucht:

| Datei | Wann laden | Inhalt |
|-------|-----------|--------|
| `references/site-architecture.md` | Immer bei Seitenerstellung, Agent 2+3 | Vollständige URL-Struktur, Keyword-Cluster, Seitenpriorität |
| `references/link-map.md` | Bei Agent 1 (Verlinkung) | Keyword→URL→Anchor-Zuordnungen, Verlinkungsregeln, Kreuzmatrix |
| `references/seo-geo-rules.md` | Bei Agent 2 (SEO/GEO) | SEO-Checkliste, GEO-Taktiken, Schema-Templates, Meta-Regeln |

---

## Die 3 unverrückbaren Grundregeln

Egal welcher Agent aktiv ist — diese 3 Regeln gelten IMMER:

### Regel 1: Sprachprofil C
- **Du-Ansprache** (konsequent, nie Sie)
- **10-20 Wörter pro Satz**
- **Fachbegriffe mit Erklärung** (z.B. „TSE (Technische Sicherheitseinrichtung)")
- **Sprachniveau B1-B2** — verständlich, aber nicht banal

### Regel 2: Verbotene Inhalte
- **Epit Pay** ist LIVE und INTEGRIERT — nie „kommt bald", „White-Label" oder „Adyen"
- **Wettbewerber-Namen** werden nie verlinkt (orderbird, ready2order, Lightspeed, SIDES, etc.)
- **Lieferando** darf namentlich genannt werden (§6 UWG), wird aber nie verlinkt
- **Preise korrekt:** Webshop = 79 €/Monat (mit Bestellsystem), Webpage = 49 €/Monat (ohne)

### Regel 3: Kein Kollateralschaden
- Nie bestehende funktionale Elemente zerstören (Akkordeon, Suchfeld, Navigation, etc.)
- Nie CSS/JS ändern die andere Seitenelemente beeinflussen
- Bei Unsicherheit: erst zeigen, dann umsetzen
- Immer eine Zusammenfassung der Änderungen als Tabelle liefern

---

## Sub-Skills die aufgerufen werden können

Dieser Skill kann bei Bedarf folgende Sub-Skills aufrufen:

| Sub-Skill | Wann |
|-----------|------|
| `/brainstorm` | Bei Content-Planung, neue Seiten, Strategie |
| `/deep-research` | Bei Branchendaten, Statistiken, GEO-Research |
| `/competitor-alternatives` | Bei Wettbewerbsanalyse, Content-Gaps |
| `/seo-geo` | Bei technischem SEO-Audit |
| `/gastro-master-sprache` | Bei Textprüfung auf Sprachprofil C |
| `/ui-ux-pro-max` | Bei Layout/Design-Fragen |

**Nicht jede Aufgabe braucht Sub-Skills.** Für einfache Verlinkung oder Meta-Tags reicht der Skill selbst. Sub-Skills nur aktivieren wenn die Aufgabe es erfordert (Research, Brainstorming, tiefe Analyse).

---

## Quick-Reference: Trust-Bar

Auf jeder Seite konsistent einsetzen:
- **700+ Betriebe** vertrauen Gastro Master
- **5,0 ★** Kundenbewertung
- **TSE-konform** (§146a AO)
- **Persönlicher Support**

---

## Output-Standards

Jeder Agent liefert am Ende seine spezifische Dokumentation:

**Agent 1 (Links):** Verlinkungstabelle + Link-Bilanz
**Agent 2 (SEO/GEO):** SEO-Checkliste (grün/gelb/rot) + Schema-Code
**Agent 3 (Wettbewerb):** Content-Gap-Matrix + Empfehlungen mit Priorität

Bei kombinierten Aufgaben: Gesamtzusammenfassung als Tabelle mit allen Änderungen.
