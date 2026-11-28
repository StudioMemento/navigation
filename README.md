# Memento Navigation R32

Sito statico di mementostudio.it con una home a scorrimento verticale e cinque sezioni. La navbar apre Studio, Services, Projects, Level Up e Start. Il logotipo riporta alla home sulla sezione di provenienza.

## Avvio e pubblicazione

Estrai lo ZIP e usa come radice la cartella che contiene `vercel.json` e `package.json`. Vercel esegue `node scripts/build.mjs` e pubblica `public/`. Il pacchetto include le pagine generate, lo Studio compilato e le risorse locali.

Per lavorare in locale usa Node 22 o 24. `npm run dev` avvia il sito su `http://localhost:5173/`. `npm run build` rigenera le pagine dai template. Dopo modifiche allo Studio 3D, `npm run build:studio` compila lo Studio con Vite e rigenera le pagine.

## Contenuti

| Area | Sorgenti |
| --- | --- |
| Home e navigazione | `templates/home-config.mjs`, `templates/navigation.mjs`, `templates/nav-icons.mjs` |
| Favicon e monogramma del dock | `public/favicon.svg` |
| Titoli e metadati | `templates/site.json` |
| Studio 3D | `studio-web/`, `templates/studio.html` |
| Servizi e bundle | `public/services/src/content.js` |
| Progetti e immagini | `public/projects/projects.json`, `public/projects/images.json` |
| Esperienze e confronti | `public/levelup/src/content.js` |
| Start, contatti e FAQ | `templates/start.json` |

## Navbar e layout

`public/site.css` definisce i margini responsive, `public/visuals.css` il dock e gli effetti condivisi. I cinque simboli vettoriali sono bianchi. La sezione corrente prende l’arancione `#ff7d00`. La piastra misura 40 px su desktop e 38 px su telefono, con un’area interattiva rispettivamente di 46 e 44 px. Il dock rispetta la safe area inferiore. Il blur graduale sopra e sotto il contenuto usa cinque livelli da 1 a 16 px.

## Slider e luce

Services, Projects e Level Up usano `public/js/slider.mjs` per trascinamento, touch, rotella orizzontale, tastiera e selezione. Il trascinamento segue il puntatore al ritmo del rendering. Al rilascio una molla raccorda posizione e velocità. La posa delle card in prospettiva è definita in `public/js/effects/deck-pose.mjs`. La home usa lo stesso stato di movimento per il suo slider verticale.

La faccia ritagliata e il bordo luminoso di una slide condividono la trasformazione e l’ordine di sovrapposizione della card. La faccia opaca copre i bordi posteriori e il bagliore si estende all’esterno del contorno. Durante il gesto la luce si attenua e riprende sulla posizione finale. In Level Up il player carica la demo selezionata quando lo slider si ferma. Il comando di apertura esplicito la carica subito.

| File in `public/js/effects/` | Funzione |
| --- | --- |
| `edge-light.mjs` | Disegna il filo e l’alone sul contorno locale della card |
| `type-light.mjs` | Misura le parole e dosa l’ambra in funzione della distanza del cursore |
| `surface-targets.mjs` | Tiene traccia di superfici e titoli visibili e del ritaglio della faccia |
| `surfaces.mjs` | Coordina puntatore, focus da tastiera, area centrale su touch e finestre di dialogo |
| `glyph-tile.mjs`, `glyph-cells.mjs` | Definiscono la griglia di lettere condivisa |
| `glyph-field.mjs`, `glyph-surfaces.mjs` | Animano i margini e le scie sulle superfici |
| `surface-intro.mjs` | Rivela le superfici all’apertura della pagina |

`templates/facet-texture.mjs` genera la trama dei titoli. `INTRO` in `scripts/build.mjs` controlla il reveal iniziale. Con la preferenza di movimento ridotto la parete resta statica e gli slider passano direttamente alla selezione.

## Studio e Start

Lo Studio isometrico usa il modello GLB con illuminazione precalcolata. I renderer WebGL e WebAssembly condividono modello e comandi di orbita. Il poster copre i dispositivi senza un renderer disponibile. I sorgenti e la procedura di bake sono in `studio-web/` e gli asset compilati in `public/studio/app/`. La configurazione Vercel esclude i sorgenti 3D dal caricamento della build statica.

Start presenta i canali di contatto, le FAQ e la mappa scura. I percorsi storici dei servizi e dei progetti rimandano alle schede interattive corrispondenti.
