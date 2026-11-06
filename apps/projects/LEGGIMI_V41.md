# Memento Portfolio — V41 Navbar + Overlay

Base: Portfolio Layout V40 del 1 novembre 2026, senza VFX Pass.
Integrazione: kit MEMENTO_NAVBAR_OVERLAY_V12 dello ZIP allegato.

## Cosa contiene

- Logo Memento originale in alto, navbar a cinque icone in basso, Projects attivo.
- Blur progressivo trasparente sul 20% superiore e inferiore della viewport.
- Geometria del kit invariata: fascia 320 px, box 40 px e target 48 px; fascia 280 px sui display da 320 px.
- Spazio per i contenuti e controlli mobile separati dalla navbar.
- Catalogo, 27 progetti, copertine WebP, layout V40 e relativi segnaposto conservati.
- Bridge Tide originale e bridge del kit V12. Il kit si nasconde dopo il collegamento a un contenitore compatibile; in un iframe senza quel protocollo mostra l’overlay dopo il timeout previsto dal kit.

Il dettaglio di ciascun progetto conserva i segnaposto della V40 per Gallery, EXP/Video/3D, Vision e Process.

## Vercel

Estrai lo ZIP e usa la cartella che contiene questo file come Root Directory.
Il file `vercel.json` include la configurazione:

| Impostazione | Valore |
| --- | --- |
| Framework Preset | Other |
| Build Command | `node release/build.mjs` |
| Install Command | `node --version` |
| Output Directory | `dist` |

La build copia `site/` in `dist/`. Tutti gli asset sono inclusi; non servono pacchetti npm, accesso a GitHub, variabili ambiente o download durante la build.

Le destinazioni del kit sono `https://mementostudio.it/` per il logo e `/studio`, `/services`, `/projects`, `/levelup`, `/start` sullo stesso dominio per le icone.

## Verifica

- Confrontati tutti i 929 file della base con il manifesto SHA Git della V40: corrispondenti.
- Superati i 24 controlli originali del kit e la verifica strutturale V40 su tutti i 27 progetti.
- Verifica visuale in Chromium: desktop 1363 × 936; viewport contenute in iframe a 390 × 844 e 320 × 844.
- Controllati apertura progetto, avanzamento, Projects attivo, sei URL e navigazione tastiera nel dock senza interferenza con lo scroll del progetto.
- Nessuna sovrapposizione fra logo e ritorno al catalogo o fra progress bar e dock nelle misure controllate; nessun overflow orizzontale a 320 e 390 px.
- Non eseguiti test su dispositivi fisici o Safari. La verifica tablet è stata interrotta dalla sostituzione dell’anteprima condivisa.

`node release/verify-v40.mjs` ripete i controlli strutturali; `npm run build` produce il sito distribuibile.

## File di integrazione

`site/navigation/` è identica al kit allegato. Le modifiche specifiche del portfolio sono lo snippet in `site/index.html`, `site/portfolio-overlay.css` e due adattamenti in `site/app.js`: offset dei checkpoint e gestione dei tasti già consumati dalla navbar.
