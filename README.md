# ROWAPA 2027 · Effekte und Gestaltung der Webflow-Seiten

Dieses Repository liefert die Gestaltung (`dist/rowapa.css`) und die Bewegungen (`dist/rowapa.js`) der ROWAPA-Startseite in Webflow.
Alle **Inhalte** (Texte, Bilder, Links, Logos, Werkzeuge, Zitate, FAQ) stehen in Webflow: im Designer oder im CMS.
Hier steckt nur, was Webflow selbst nicht kann: Punktemeer, 3D-Punktfiguren, Zoom in die Themenlinien, Farbfluss, Orbit von ROWAPA Digital.

## Einbindung in Webflow (Seite Home → Einstellungen → Custom Code)

Head:
```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/ROWAPA-Konzepte/rowapa-website@<COMMIT>/dist/rowapa.css">
<script>document.documentElement.classList.add("fluid","sl","dk")</script>
```
Footer (vor `</body>`):
```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/lenis@1.1.13/dist/lenis.min.js"></script>
<script src="https://cdn.jsdelivr.net/gh/ROWAPA-Konzepte/rowapa-website@<COMMIT>/dist/rowapa.js"></script>
```
Statt `<COMMIT>` steht in Webflow die volle Commit-Kennung (40 Zeichen). Neue Fassung: Änderung committen, `npm run build`, pushen und die Kennung in Webflow (Seite Home → Custom Code) ersetzen. So bleibt jede Fassung unveränderlich und ein Zurückwechseln ist jederzeit möglich.

## Was das Team ohne Code einstellen kann

Webflow → Variablen → Sammlung **«ROWAPA Startseite»**:

| Variable | Wirkung | Standard |
|---|---|---|
| Farbe Manganese Black, Great Serpent, Sea Cliff, Plum Perfect, Snowbank, Tiefsee | CI-Farben der ganzen Seite | CI |
| Abstand Abschnitt oben min/max, unten min/max | Luft zwischen den Kapiteln (Handy = min, grosser Bildschirm = max) | 48/70 px, 30/44 px |
| Titel Abschnitt min/max | Grösse aller Kapiteltitel | 2.05 / 3.5 rem |
| Titel Karte gross min/max, Titel Karte klein | Kartentitel (Wege, CAS, Themen-Karte / News, Wissen, Werkzeuge, FAQ) | 1.6 / 2.2 rem, 1.5 rem |
| Seitenbreite max | maximale Inhaltsbreite | 1360 px |
| Scroll Weichheit | 0.08 sehr weich, 0.16 Standard, 1 normales Browser-Scrollen | 0.16 |
| Zoom Laenge Themen | Länge des Zooms in die Themenlinien (1 = grosszügig) | 0.72 |
| Halt ROWAPA Digital | Länge des Halts, 0 = kein Halt | 110 svh |
| Halt Vorgehen | Wie lange «Unser Vorgehen» stehen bleibt, während die vier Phasen durchlaufen, 0 = kein Halt | 150 svh |
| Zitat Wechsel Sekunden, Headerzeile Wechsel Sekunden | Tempo der Wechsel | 6.5 / 3.8 |

Jede Grundfarbe eines Kapitels steuert das Attribut `data-tone` am Abschnitt (white, snow, sea, ink, deep, plum, serpent).
Werte als Attribut am Element gehen den Variablen vor (z. B. `data-zoom="1"` an `#themen`).

## Regeln, damit nichts bricht

- Webflow schreibt Klassennamen klein. Im CSS deshalb nur Kleinbuchstaben verwenden.
- Klassen und IDs nicht umbenennen (z. B. `tsl-t`, `dg-card`, `vg-ds`, `#kontakt`). Neue Klassen dazunehmen ist unproblematisch.
- Symbole: `<span class="ic" data-icon="anchor">`. Erlaubte Namen stehen in `src/icons.js`.
- Ein `div` mit `data-canvas` wird zur Zeichenfläche. Nicht löschen.
- Handy-Menü, Kacheln im Orbit, Beschriftungen der Treppe, Punkte unter den Zitaten und die Handy-Liste der Themen entstehen automatisch aus den Inhalten.

## Entwicklung

```
npm install
npm run build
```
Quellen: `src/*.js`, `src/rowapa.css`. `tools-prune.cjs` war ein einmaliges Werkzeug für die Übernahme aus dem Prototyp.
