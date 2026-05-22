# ThumbCraft – KI Thumbnail Generator

Professionelle YouTube-Thumbnails in Sekunden, powered by Claude AI.

## Setup

### 1. Dependencies installieren
```bash
npm install
```

### 2. Umgebungsvariablen setzen
Erstelle eine Datei `.env.local` im Hauptverzeichnis:
```
ANTHROPIC_API_KEY=dein_api_key_hier
```
Deinen API Key bekommst du auf: https://console.anthropic.com

### 3. Lokal starten
```bash
npm run dev
```
Öffne http://localhost:3000

---

## Auf Vercel deployen

1. Code auf GitHub pushen
2. Auf vercel.com mit GitHub verbinden
3. Projekt importieren
4. Unter **Settings → Environment Variables** hinzufügen:
   - `ANTHROPIC_API_KEY` = dein API Key
5. Deploy klicken – fertig!

---

## Monetarisierung (nächste Schritte)

- Stripe einbinden für Abo-Zahlungen
- User-Accounts mit Supabase
- Free Tier: 5 Thumbnails/Monat
- Pro Plan: 7€/Monat – unbegrenzt

## Tech Stack

- **Next.js 14** – React Framework
- **Tailwind CSS** – Styling
- **Claude API** – KI-Titelvorschläge
- **HTML Canvas** – Thumbnail-Rendering
- **Vercel** – Hosting
