# Memento Navigation R25.2

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

Il foglio `public/site.css` definisce i margini responsive. Il logo e le icone sono in `templates/navigation.mjs` e `templates/nav-icons.mjs`. La geometria vettoriale delle lettere è in `templates/glyphs.svg`. I colori tipografici, il bordo luminoso, il campo laterale di glifi e la sfocatura progressiva sono in `public/visuals.css`. Ogni sezione ha un proprio foglio per griglie, schede e controlli. Le slide di Services usano un formato 16:9 su tutti i breakpoint. Su telefono i servizi di ciascun bundle si possono espandere sotto il carosello.

Le fotografie, le illustrazioni e i modelli 3D fanno parte dei contenuti.

Per lavorare in locale con Node 22 o 24, esegui `npm run dev` e apri `http://localhost:5173/`. Dopo una modifica, `npm run build` rigenera le pagine statiche. I link di dettaglio della R25 sono reindirizzati alle corrispondenti schede interattive.
