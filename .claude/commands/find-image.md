# find-image

Sucht nach Bilddateien (jpg, jpeg, png, webp) auf dem System anhand eines Namens oder Stichworts und kopiert das beste Ergebnis in den Projekt-Assets-Ordner.

## Verwendung
/find-image <suchbegriff> [zieldateiname]

## Was dieser Skill tut
1. Durchsucht /Users/salvatore (Downloads, Desktop, Dokumente) nach Bilddateien, die dem Suchbegriff entsprechen
2. Zeigt alle Treffer an
3. Wählt die beste Version aus (bevorzugt PNG, bevorzugt Ordner mit Projektbezug)
4. Kopiert sie nach src/assets/<zieldateiname>.png
5. Bestätigt den Kopiervorgang

## Beispiele
- /find-image "Andrej Krutsch" team-andrej-krutsch
- /find-image "logo gastro" logo-neu
- /find-image "hero bild" hero-new

## Implementierung
Führe folgende Schritte aus:
1. `find /Users/salvatore -type f \( -iname "*.jpg" -o -iname "*.jpeg" -o -iname "*.png" -o -iname "*.webp" \) 2>/dev/null | grep -i "<suchbegriff>"`
2. Wähle die beste Datei aus (PNG bevorzugen, projektrelevante Ordner bevorzugen)
3. Kopiere nach `src/assets/<zieldateiname>.png`
4. Bestätige mit Dateiname und Pfad
