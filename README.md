# Memento Navigation R25.5

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

Il foglio `public/site.css` definisce i margini responsive. Il logo e le icone sono in `templates/navigation.mjs` e `templates/nav-icons.mjs`. La geometria vettoriale delle lettere è in `templates/glyphs.svg`. `public/visuals.css` definisce le sfumature del testo, i due livelli di blur per bordo e lo sfondo dei dialoghi. `public/js/effects/glyph-field.mjs` anima i glifi vettoriali su un canvas. `surfaces.mjs` gestisce puntatore, tocco e tastiera. `type-light.mjs` accende il testo nativo con una luce locale e una trama fissa. `edge-light.mjs` conserva la luce lungo i 96 segmenti di ogni contorno attivo e sottrae la sagoma delle card prima di mostrare il bagliore esterno. `templates/facet-texture.mjs` genera la trama dei titoli durante la build. Con movimento ridotto il campo e le facce tipografiche restano statici. Ogni sezione ha un proprio foglio per griglie, schede e controlli. Le slide di Services usano un formato 16:9 su tutti i breakpoint. Su telefono i servizi di ciascun bundle si possono espandere sotto il carosello.

Le fotografie, le illustrazioni e i modelli 3D fanno parte dei contenuti.

Per lavorare in locale con Node 22 o 24, esegui `npm run dev` e apri `http://localhost:5173/`. Dopo una modifica, `npm run build` rigenera le pagine statiche. I link di dettaglio della R25 sono reindirizzati alle corrispondenti schede interattive.
