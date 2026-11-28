# Memento Navigation R31

Sito statico di mementostudio.it: una home a slider verticale e cinque sezioni (Studio, Services, Projects, LevelUp, Start). La navbar porta direttamente alle pagine; il logotipo riapre la home sulla sezione di provenienza.

## Deploy su Vercel

Estrai lo ZIP e usa come radice del progetto la cartella che contiene `vercel.json` e `package.json`. Vercel esegue `node scripts/build.mjs` e pubblica `public/`. Il pacchetto contiene già le pagine generate, lo Studio compilato e tutte le risorse locali. La cartella `studio-web/` (sorgenti dello Studio 3D) non viene caricata su Vercel (`.vercelignore`).

## Lavoro in locale

Con Node 22 o 24: `npm run dev` e apri `http://localhost:5173/`. Dopo una modifica a template o contenuti, `npm run build` rigenera le pagine statiche. Dopo una modifica allo Studio 3D, `npm run build:studio` ricompila lo Studio con Vite e rigenera le pagine.

## Dove stanno i contenuti

| Area | File principale |
| --- | --- |
| Home e navbar | `templates/home-config.mjs` |
| Titoli e descrizioni delle pagine | `templates/site.json` |
| Studio 3D (modello, reveal, comandi) | `studio-web/` e `templates/studio.html` |
| Servizi, bundle e categorie | `public/services/src/content.js` |
| Progetti e immagini | `public/projects/projects.json` e `public/projects/images.json` |
| LevelUp, demo e confronti | `public/levelup/src/content.js` |
| Start, contatti e FAQ | `templates/start.json` |

`public/site.css` definisce i margini responsive (`--content-width`), `public/visuals.css` lo strato visivo comune: sfumature dei titoli, blur graduale, navbar, luce dei bordi, parete di glifi, monocromo a riposo. Ogni sezione ha un proprio foglio per griglie, schede e controlli.

## Navbar

Il logo e le icone sono in `templates/navigation.mjs` e `templates/nav-icons.mjs`. Ogni icona è una piastra di vetro satinato (52 px) con il taglio delle card in alto a sinistra e in basso a destra e il simbolo ritagliato. Il vetro è semitrasparente e smerigliato; dove il browser lo consente (Chromium) rifrange anche ciò che sta dietro, piegandolo lungo lo smusso. La mappa di rifrazione è calcolata in build e inserita nella pagina. La pagina attiva prende una luce ambra dal basso, come la piastra sotto il cursore.

## Blur graduale

Sotto il logotipo e sopra la navbar: cinque livelli per lato, ognuno con il doppio del blur del precedente (da 1 a 16 px), ciascuno su una propria fascia con ingresso e uscita graduali. Il blur cresce in modo continuo verso il bordo dello schermo, senza gradini.

## Slider

Un solo motore per tutti gli slider di Services, LevelUp e Projects: `public/js/slider.mjs` (gesti, molla, rotella, tastiera, punti). Le pose sono in `public/js/effects/deck-pose.mjs`: la card attiva di fronte, una vicina per lato inclinata verso la camera e infilata un po' dietro l'attiva. La sovrapposizione si apre solo nella seconda metà del passaggio: a metà movimento le due card si incontrano a filo, così il cambio di quella in primo piano non si vede. La home (`public/js/home.mjs`) ha il suo tamburo verticale con la stessa logica.

## Effetti: il linguaggio dello sfondo

Lo sfondo di glifi è il DNA visivo del sito. Margini e superfici condividono la stessa griglia di lettere MΞMΞNTO, che è una parete: appartiene al documento e scorre con il contenuto. A riposo il sito è monocromo e la parete continua a decodificarsi lentamente; l'ambra compare solo dove c'è il cursore (e sotto l'icona della pagina attiva). Su telefono il quadrato al centro dello schermo fa da cursore.

| File | Ruolo |
| --- | --- |
| `public/js/effects/glyph-tile.mjs` | La tessera della parete a riposo: la build la disegna in SVG, il campo vivo legge le stesse lettere |
| `public/js/effects/glyph-cells.mjs` | La griglia condivisa: finestra viva sulla parete, vita dei glifi, fronte strappato |
| `public/js/effects/glyph-field.mjs` | I margini: decodifica lenta, scia del cursore in ambra, parola decifrata, fronte al click |
| `public/js/effects/glyph-surfaces.mjs` | Le superfici: solo i glifi del cursore o del dito; luce consegnata al bordo |
| `public/js/effects/edge-light.mjs` | Il filo di luce sul contorno e un bagliore intenso e corto (due esponenziali, entro 40 px), solo nello spazio vuoto. Una slide dietro un'altra tiene dietro tutta la sua luce. La luce segue la card mentre lo slider si muove |
| `public/js/effects/type-light.mjs` | I titoli: grigi a riposo, caldi dal basso con la superficie in hover |
| `public/js/effects/surfaces.mjs` | Un solo flusso di input per tutti gli effetti e lo stato `data-mm-hover`, che passa senza interruzioni da una slide alla successiva |
| `public/js/effects/surface-targets.mjs` | Quali superfici prendono luce, il loro contorno sullo schermo e l'ordine in profondità delle slide |
| `public/js/effects/surface-intro.mjs` | L'apertura: un fronte di glifi grigi parte dal logotipo e scopre le superfici |
| `public/js/missing.mjs` | La 404: il numero scritto dalla parete |

L'apertura si spegne con `INTRO=false` in `scripts/build.mjs`. `templates/facet-texture.mjs` genera la trama dei titoli durante la build. Con movimento ridotto la parete resta statica e le superfici non mostrano glifi.

## Studio 3D

`studio-web/` contiene lo Studio isometrico (StudioWeb): modello GLB meshopt con illuminazione già calcolata, reveal, orbita ortografica (200° in orizzontale e in verticale), zoom 88–116%. WebGL 2 dove c'è, altrimenti un worker con WebAssembly, altrimenti il poster. Vite lo compila in `public/studio/app/` con nomi a hash (cache immutabile); `scripts/build.mjs` legge il manifest e scrive `public/studio/index.html`. Lo Studio usa la navbar, il logotipo e la parete di glifi del sito (`/js/site.mjs`): avvicinando il cursore al contorno del modello la parete risponde. Procedura di bake e fonti dei materiali: `studio-web/studio/pipeline/`.

## Start

La mappa di Google è in modalità scura: il riquadro è invertito e le tinte sono riportate al loro colore, così la mappa siede scura sulla pagina.

Le fotografie, le illustrazioni e i modelli 3D fanno parte dei contenuti. I link di dettaglio storici sono reindirizzati alle corrispondenti schede interattive.
