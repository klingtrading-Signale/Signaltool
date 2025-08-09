
# A++ Signal Generator — Modul 3 (Prototype)

Dieses Repository enthält die **Web-Prototyp** des A++ Signal Generators (Modul 3) — inklusive Futures- und Krypto-Analyse sowie Option-Chain PDF-Upload (clientseitig über pdf.js).

## Quickstart für GitHub → Vercel
1. Neues GitHub-Repository erstellen.
2. Dateien aus diesem ZIP hochladen (Inhalt des Packages).
3. In Vercel: New Project → Import Git Repository → wähle dein Repo.
4. Im Vercel-Setup: Build Command leer lassen, Output Directory = `src`.
5. Deploy.
6. Öffne die URL und nutze `src/index_ui.html` (UI läuft clientseitig).

## Hinweise
- PDF-Parsing ist clientseitig; bei abweichenden PDF-Layouts müssen ggf. Anpassungen erfolgen.
- Dies ist ein Prototyp — für Produktion: Auth, serverseitiges Parsing, DB, Tests.
