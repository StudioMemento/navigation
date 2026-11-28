# StudioWeb (Studio 3D di mementostudio.it)

Variante isometrica dello studio Memento, integrata nella pagina Studio del sito. L’orbita ortografica consente 200° complessivi sia in orizzontale sia in verticale. Lo zoom va dall’88% al 116%. La camera iniziale, il poster e i due renderer usano la stessa inquadratura.

## Build nel sito

Questa cartella vive nella repo del sito. `npm ci` e poi `npm run build` compilano lo Studio con Vite in `../public/studio/app/` (nomi a hash e `manifest.json`); dalla radice del sito `npm run build:studio` fa entrambe le cose e rigenera le pagine. La pagina e i comandi sono in `../templates/studio.html`; `src/studio.js` li collega al visore. Logotipo, navbar e parete di glifi sono quelli del sito: lo Studio importa il campo di glifi da `/js/site.mjs`, che non viene incluso nel bundle. Per lo sviluppo serve Node.js 22.12 o successivo.

```sh
npm ci
npm test
npm run build
```

L’FBX, le texture di lavorazione e gli script Blender sono conservati in `studio/` e non vengono pubblicati.

## Modello e illuminazione

Il modello ottimizzato contiene tre atlanti WebP da 2048 × 2048 e le tre grafiche WebP condivise dai cinque monitor. Materiali, illuminazione diretta e indiretta e ombre sono calcolati prima dell’esportazione. Il browser decodifica un unico GLB meshopt e disegna sei primitive. Per ricreare gli asset si vedano [la procedura di bake](studio/pipeline/BAKE.md) e [le fonti dei materiali](studio/pipeline/SURFACES.md). I dati di verifica sono in `studio/quality/`.

## Interazione

Trascinamento e frecce ruotano il modello. Pizzico, rotella e pulsanti regolano lo zoom. Home ripristina la vista iniziale. Il reveal si può saltare o rivedere e rispetta la preferenza di movimento ridotto. Una volta concluso il movimento, la scena viene ridisegnata al cambiamento della camera. La parete di glifi del sito risponde al contorno visibile dello studio. Nella pagina, l'icona Studio della navbar riporta la vista iniziale.

Il browser sceglie WebGL 2 quando è disponibile. In assenza di WebGL disegna lo stesso GLB in un worker con WebAssembly. Se mancano anche queste capacità, presenta il poster fotografico del modello. Per ricompilare il kernel dopo aver modificato `src/software/raster.ts`, eseguire `npm run build:raster`.
