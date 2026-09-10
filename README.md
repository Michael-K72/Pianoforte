# Pianoforte Akademie — Atelier

Weiterentwicklung des gelieferten Next.js-16-Projekts. Die fünf Sprachrouten DE, EN, FR, IT und RU sowie Impressum und Datenschutz bleiben erhalten.

## Starten
npm ci
npm run dev

## Prüfen und bauen
npm run lint
npm run build

Die geprüfte statische Website liegt anschliessend in out/. Sie kann auf Sites, Vercel oder einem anderen statischen Host bereitgestellt werden. Die Stammroute führt nach /de/.

## Umsetzung
- Editorialer Einstieg mit Bildtiefe und nativer Scroll-Parallaxe.
- Bestätigte Preise direkt nach dem Einstieg.
- Unterricht als aufklappbare Übersicht; Philosophie mit sticky Bild und wechselnden Prinzipien.
- Lazy geladener echter GLB-Flügel mit vier scrollabhängigen Kameraperspektiven und Tastatur-bedienbaren Detailwahlen.
- Rendering nur bei nötigen Kameraveränderungen und sichtbarer Szene; begrenzte Pixeldichte.
- Mobil eigene Komposition; reduzierte Bewegung wird respektiert.
- Kontakt ausschliesslich per Telefon und WhatsApp; keine Buchungsformulare.
- Lokal geladene Schriften und Decoder.
- Öffentliche Bild- und Konvertierungsgrenzen: siehe ASSET_REQUIREMENTS.md.

Telefon: +41 77 474 26 40. WhatsApp: dieselbe Nummer.
Die Preise wurden im Auftrag ausdrücklich bestätigt.
Die produktive kanonische Adresse kann über NEXT_PUBLIC_SITE_URL vor dem Build angepasst werden.
