# Memento Navigation R28

Sito statico con home a slider verticale e cinque sezioni. La navbar porta direttamente alle pagine. Il logotipo riapre la home sulla sezione di provenienza.

## Deploy su Vercel

Estrai lo ZIP e usa come radice del progetto la cartella che contiene `vercel.json` e `package.json`. La configurazione inclusa esegue `node scripts/build.mjs` e pubblica `public/`. Il pacchetto contiene anche le pagine già generate e tutte le risorse locali.

## Lavoro sui contenuti

| Area | File principale |
| --- | --- |
| Home e navbar | `templates/home-config.mjs` |
| Titoli e descrizioni delle pagine | `templates/site.json` |
| Studio 3D e inquadrature | `public/studio/studio.js` e `public/studio/lib/shots.js` |
| Servizi, bundle e categorie | `public/services/src/content.js` |
| Progetti e immagini | `public/projects/projects.json` e `public/projects/images.json` |
| LevelUp, demo e confronti | `public/levelup/src/content.js` |
| Start, contatti e FAQ | `templates/start.json` |

Il foglio `public/site.css` definisce i margini responsive. Il logo e le icone sono in `templates/navigation.mjs` e `templates/nav-icons.mjs`. La geometria vettoriale delle lettere è in `templates/glyphs.svg`. `public/visuals.css` definisce le sfumature del testo, i due livelli di blur per bordo, lo sfondo dei dialoghi, il colore delle foto a riposo e in hover e il cancello dell'apertura.

## Effetti: il linguaggio dello sfondo

Lo sfondo di glifi è il DNA visivo del sito. Margini e superfici condividono la stessa griglia di lettere MΞMΞNTO, che è una parete: appartiene al documento e scorre con il contenuto. A riposo il sito è monocromo; l'ambra compare solo dove c'è il cursore. Su telefono il quadrato al centro dello schermo fa da cursore: è a colori e la superficie che ci passa prende lo stato di hover; sopra e sotto il colore si desatura gradualmente.

| File | Ruolo |
| --- | --- |
| `public/js/effects/glyph-tile.mjs` | La tessera della parete a riposo: la build la disegna in SVG, il campo vivo legge le stesse lettere |
| `public/js/effects/glyph-cells.mjs` | La griglia condivisa: finestra viva sulla parete, vita dei glifi (cifratura, decodifica sulla lettera della parete, spegnimento), fronte strappato |
| `public/js/effects/glyph-field.mjs` | I margini: glitch lenti in grigio, scia del cursore in ambra, parola decifrata, fronte al click |
| `public/js/effects/glyph-surfaces.mjs` | Le superfici: solo i glifi del cursore o del dito, mai i glitch della parete; luce consegnata al bordo |
| `public/js/effects/edge-light.mjs` | Il filo di luce sul contorno e il bagliore ampio e morbido (a mezza risoluzione); il cenno sulle superfici vicine, anche dietro la slide attiva |
| `public/js/effects/type-light.mjs` | I titoli: grigi a riposo, caldi dal basso con la superficie in hover, lenti morbide e continue |
| `public/js/effects/surfaces.mjs` | Un solo flusso di input per tutti gli effetti, lo stato `data-mm-hover`, il quadrato di fuoco su telefono |
| `public/js/effects/surface-intro.mjs` | L'apertura: un fronte di glifi grigi parte dal logotipo e scopre le superfici |
| `public/js/effects/deck-pose.mjs` | Gli slider: `deck` (card in prospettiva, vicine dietro e inclinate verso la camera) e `pages` (una card sul padding che cambia pagina in profondità) |
| `public/js/missing.mjs` | La 404: il numero scritto dalla parete |

L'apertura si spegne con `INTRO=false` in `scripts/build.mjs`. `templates/facet-texture.mjs` genera la trama dei titoli durante la build. Con movimento ridotto la parete resta statica e le superfici non mostrano glifi. Ogni sezione ha un proprio foglio per griglie, schede e controlli. Le slide di Services usano un formato 16:9 su tutti i breakpoint. Su telefono i servizi di ciascun bundle si possono espandere sotto il carosello. La galleria del Portfolio ha un palco fisso sul padding: l'immagine si adatta dentro e la stessa immagine, sfocata, riempie lo spazio vuoto.

Le fotografie, le illustrazioni e i modelli 3D fanno parte dei contenuti.

Per lavorare in locale con Node 22 o 24, esegui `npm run dev` e apri `http://localhost:5173/`. Dopo una modifica, `npm run build` rigenera le pagine statiche. I link di dettaglio storici sono reindirizzati alle corrispondenti schede interattive.
