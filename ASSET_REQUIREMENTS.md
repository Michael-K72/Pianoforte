# Pianoforte — Bild- und Modellübergabe

## Bereits integriert
- Zwei eigens erzeugte Klaviermotive als kompakte WebP-Dateien. Sie sind atmosphärische Instrumentstudien, keine dokumentarischen Bilder der Akademie.
- Ein aus Project_piano.ma abgeleiteter, Draco-komprimierter GLB-Flügel: rund 668 KB, 19 Meshes, 266.268 Dreiecke.
- Lokale Schriften mit Lizenzen und lokale Draco-Decoder. Es ist kein externes Schrift- oder 3D-CDN erforderlich.
- Preise am 10. September 2026 vom Auftraggeber bestätigt: CHF 46 / 30 Min., CHF 77 / 45 Min., CHF 570 / 5 × 60 Min.

## Für die endgültige Bildwelt
Diese Dateien sind keine Voraussetzung für die funktionierende Website. Ohne sie stehen an den betreffenden Stellen vollständige redaktionelle Inhalte. Nach dem Ergänzen ist ein neuer Build erforderlich.

### Elena-Porträt
- Pfad: public/images/elena-portrait.webp
- Format: WebP, 1200 × 1600 px, vorzugsweise unter 300 KB.
- Echtes Porträt von Elena; dunkles Klavierstudio, weiches seitliches Licht, natürlicher Ausdruck.
- Herkunft: eigenes Fotoshooting / von Elena freigegebene Aufnahme.
- Die Website erkennt die Datei beim Build und ersetzt die typografische Qualifikationsdarstellung.

### Konzertbilder
- Pfade: public/images/concerts/concert-01.webp, concert-02.webp, concert-03.webp.
- Format: WebP, ca. 1600 × 1067 px, jeweils unter 300 KB.
- Echte Aufnahmen der Schülerkonzerte; veröffentlichungsfähige Rechte/Einwilligungen müssen beim Betreiber vorliegen.
- Die Website erkennt die Dateien beim Build und ergänzt automatisch die Galerie mit Grossansicht.

## 3D-Modell: Grenze der aktuellen Konvertierung
Maya war in der Umgebung nicht installiert. Das Maya-ASCII-Modell wurde in Blender rekonstruiert. Hauptgeometrie, Deckel und Materialzuweisungen sind vorhanden; Teile der Maya-Konstruktionshistorie und Schattierung unterscheiden sich sichtbar. Eine originale Holztextur fehlt. Das Modell ist eine Vorschau aus dem gelieferten Original, kein exakt identischer Maya-Export.

Für die maximale Qualität: aus Maya eine gebackene GLB-, FBX- oder OBJ-Datei samt Texturen exportieren. Deckel, einzelne Tasten und Pedale als getrennte, korrekt pivotierte Objekte erhalten, wenn sie physisch animiert werden sollen. Die jetzige Variante verwendet Kamerafahrten; sie behauptet keine bewegliche Mechanik.

Ziel: etwa 100.000–250.000 Dreiecke, möglichst unter 30 Draw Calls; 1K–2K PBR-Texturen; ca. 1–5 MB inklusive Draco-Geometrie. Enddatei public/models/grand-piano.glb, Y-up, Boden Y=0, Tastatur Richtung +Z, etwa 4 Einheiten Länge. Lokaler Draco-Decoder liegt unter public/draco/. Material piano_cor wird als schwarzer Klarlack dargestellt.

## Nicht hinzugefügt
- Keine erfundenen Porträts, Schülerfotos oder Aufnahmen.
- Kein synthetisches Klavieraudio. Spätere echte Samples können unter public/audio/piano/ ergänzt werden.
- Die vorhandenen sinngemässen Elternstimmen wurden übernommen. Die frühere numerische Google-Bewertung wird bis zur Verifikation weder sichtbar noch in strukturierten Daten ausgegeben.
