# Memento Servizi — V24 per Vercel

Aggiornamento del 24 ottobre 2026. Progetto statico HTML/CSS/JavaScript, senza dipendenze runtime, account aggiuntivi o chiavi API. Tutti gli asset sono inclusi.

## Deploy

Estrai questo ZIP. Usa la cartella che contiene `package.json` e `vercel.json` come root del progetto.

- Framework: Other
- Build command: `npm run build`
- Output directory: `dist`
- Install command: impostazione standard (`npm install` o `npm ci`)

La configurazione è già nel file `vercel.json`. Il build copia `public/` in `dist/`; non occorrono Pillow o conversioni immagini durante il deploy. Con la CLI Vercel già configurata, il comando `vercel` avvia il deploy dalla root.

## Novità

- Layout adattivo: 2 colonne fino a 479 px, 3 fino a 767 px, 4 fino a 1099 px, 5 su desktop.
- Swipe e drag orizzontali, lettura verticale libera, pinch zoom nativo; nessuno snap forzato o autoplay.
- Controlli touch di almeno 44×44 px e frecce anche nelle schede servizio e bundle.
- Popup con contenuti scrollabili, safe area, adattamento a schermi bassi e viewport della tastiera; ripristino del punto di lettura.
- WebP in risoluzioni adattive con `srcset` e `sizes`, preload della prima hero, caricamento progressivo e decoding asincrono.
- 112 nuove varianti delle 56 immagini usate. Le miniature da 320 px sono circa il 90% più leggere dei rispettivi originali, che restano disponibili per schermi densi. La riduzione riguarda i singoli file trasferiti; lo ZIP include tutte le risoluzioni.
- Uso GPU limitato alle schede vicine durante il movimento; rispetto di `prefers-reduced-motion`.

Ordine: hero → catalogo Digitale/Fisico → bundle → WEB, 3D, VIDEO, VISUAL, DESIGN, BRANDING → “Ready to start? >”. Conservati i 44 servizi e i sei bundle.

## Contenuti e collegamenti

Modifica i dati in `public/catalogo-data.js` e `public/catalogo-editorial.js`. La CTA punta a `https://mementostart.vercel.app/` (configurazione `MEMENTO_CONFIG.startUrl`) e mantiene `target="_top"`. Il modulo nei dettagli prepara una bozza verso `info@mementostudio.it`: l'invio avviene nella propria app email.

## Verifica

Build locale e integrità dei file/ZIP verificate. Test automatici di catalogo, popup, link, immagini e gesti superati. Verifica responsive in Chromium da 320×568 a 1920×1080, incluso 844×390. Non sono test su hardware iOS/Android o Safari; il tempo di caricamento su rete mobile non è stato misurato.
