# Memento Navigation R27

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

Lo sfondo di glifi è il DNA visivo del sito. Margini e superfici condividono la stessa griglia di lettere MΞMΞNTO.

| File | Ruolo |
| --- | --- |
| `public/js/effects/glyph-cells.mjs` | La griglia condivisa: celle, cifratura, spegnimento, impulso strappato |
| `public/js/effects/glyph-field.mjs` | I margini: campo a riposo, glitch, scia del cursore, parola decifrata, impulso al click |
| `public/js/effects/glyph-surfaces.mjs` | Le superfici: scia di glifi sotto il puntatore, impulso al tocco su tutte le superfici, luce consegnata al bordo |
| `public/js/effects/edge-light.mjs` | Il filo di luce sul contorno e il suo alone esterno; segue il documento durante lo scroll |
| `public/js/effects/type-light.mjs` | I titoli: gradiente caldo con la superficie in hover, lenti sulle lettere, alone |
| `public/js/effects/surfaces.mjs` | Un solo flusso di input per tutti gli effetti, lo stato `data-mm-hover` e la luce morbida sulla foto |
| `public/js/effects/surface-intro.mjs` | L'apertura: un fronte di glifi parte dal logotipo e scopre le superfici |

L'apertura si spegne con `INTRO=false` in `scripts/build.mjs`. `templates/facet-texture.mjs` genera la trama dei titoli durante la build. Con movimento ridotto il campo e le facce tipografiche restano statici e le superfici non mostrano glifi. Ogni sezione ha un proprio foglio per griglie, schede e controlli. Le slide di Services usano un formato 16:9 su tutti i breakpoint. Su telefono i servizi di ciascun bundle si possono espandere sotto il carosello.

Le fotografie, le illustrazioni e i modelli 3D fanno parte dei contenuti.

Per lavorare in locale con Node 22 o 24, esegui `npm run dev` e apri `http://localhost:5173/`. Dopo una modifica, `npm run build` rigenera le pagine statiche. I link di dettaglio storici sono reindirizzati alle corrispondenti schede interattive.
