# Memento — Navigazione V5

Hub fullscreen con slider nelle proporzioni della pagina Servizi: tavole 2:1 su desktop e 1:1 su mobile portrait. La larghezza arriva a 1720 px e si riduce per rispettare lo spazio disponibile nella viewport. Titolo in basso, padding relativo, spaziatura estesa.

## Correzioni

- Chevron sinistra/destra ai lati della tavola attiva, centrati in altezza, con aree cliccabili di almeno 44 px.
- Touch swipe, click-and-drag da immagine o titolo, trackpad orizzontale e tastiera. Riconosciuti sia trascinamenti lunghi sia brevi flick; lo scroll verticale non cambia sezione. Dopo un drag il link non si apre accidentalmente.
- Chevron inferiore grande con vertice a 90°: bracci a ±45°, SVG proporzionale, nessuna deformazione non uniforme.
- Testo di base HTML stabile e overlay SVG separato per glow/reticolo. Il cursore aggiorna soltanto l’overlay; nessuna dissolvenza o ricostruzione ripetuta delle lettere.
- Immagini prese esclusivamente da `nav.zip`. Nessuna nuova immagine generata. Tutti i 12 PNG originali sono conservati in `originals/`; le tavole usano 15 derivati WebP ottimizzati.
- Rimossa la seconda immagine sfocata dietro ogni tavola. Una sola immagine riempie la card con ritaglio `cover`, senza alterarne le proporzioni.
- URL delle scene determinati dal loro contenuto per evitare il riutilizzo di vecchie copie in cache.

## Uso

Le frecce laterali, il trascinamento e lo swipe selezionano le cinque sezioni in loop. Un clic su una tavola laterale la seleziona. Un clic sulla tavola attiva, sul titolo o sul chevron inferiore apre la pagina. La navbar apre direttamente la destinazione scelta. I link supportano anche tasto centrale e nuova scheda.

| Sezione | Destinazione |
|---|---|
| Studio | https://mementostudio.it/studio |
| Services | https://mementostudio.it/services |
| Projects | https://mementostudio.it/projects |
| LevelUp | https://mementostudio.it/levelup |
| Start | https://mementostudio.it/start |

Frecce sinistra/destra, Home/End selezionano. Invio sul carosello apre la sezione. Indietro ripristina la selezione. L’uscita dura 380 ms; con movimento ridotto la navigazione è immediata.

## Aggiornamento Vercel

Estrai lo ZIP e sostituisci i file alla root del repository di `mementonav`.

| Impostazione | Valore |
|---|---|
| Root Directory | Root del repository, campo vuoto |
| Framework Preset | Other |
| Build Command | `npm run build` |
| Output Directory | `dist` |
| Node | 24.x |

La configurazione è già inclusa in `vercel.json`. Non servono dipendenze npm o variabili d’ambiente. L’esportazione non aggiorna automaticamente il deployment pubblico.

## Verifica locale

```sh
npm run check
npm test
npm run build
npm run dev
```

Preview sorgente: `http://localhost:5173`. Verifica responsive e monitor delle modifiche al titolo: `http://localhost:5173/scripts/qa.html`. Per servire la build: `node scripts/serve.mjs --dist --port 5174`.

La build pubblica comprende solo `index.html`, `src/`, `assets/` e `navigation/`. Gli originali e il banco di prova restano esclusi dal deployment.

La provenienza esatta delle immagini è in `docs/ASSET_MAPPING.json`; controlli effettuati e limiti sono in `docs/VERIFICA.md`.
