# Memento LevelUp · V15

Pacchetto completo per Vercel, basato sulla V14 attualmente pubblicata. Include sorgenti, asset locali, font Inter e build pronta in `dist/`. Non richiede dipendenze npm o variabili d’ambiente.

## Modifiche

- Integrato l’overlay fornito in `NAV_OVERLAY.zip`, con LevelUp attivo. Logo, icone e blur originali del kit sono conservati. Le aree iniziale e finale hanno spazio per l’overlay; durante l’espansione della demo l’overlay viene nascosto.
- Le immagini dei sei domini sono ancorate al margine destro delle tab, anche su mobile. Rimosso lo spostamento laterale negativo mobile e mantenuto il ritaglio degli angoli.
- Memento Food è la prima esperienza e avvia il caricamento appena la pagina viene inizializzata, prima dello scroll verso il portfolio. È mantenuto un solo iframe, senza ricaricarlo al termine dell’animazione o entrando/uscendo dal fullscreen.
- Aggiunta Pizzeria Via Roma come seconda esperienza, con thumbnail generata e categorie “Menù interattivo” e “Vetrina digitale”.
- Tutti i confronti di “Immaginalo per il tuo brand.” iniziano a sinistra, su un asse comune indipendente dallo zoom dei singoli soggetti. Restano utilizzabili con trascinamento e tastiera.

## Ordine delle esperienze

| # | Esperienza | URL |
| --- | --- | --- |
| 1 | Memento Food | https://mementofood.vercel.app/ |
| 2 | Pizzeria Via Roma | https://pizzeriaviaroma.vercel.app/ |
| 3 | Memento Elite | https://mementoelite.vercel.app/ |
| 4 | IceCream | https://mementoicecream.vercel.app/ |
| 5 | Auren | https://mementoauren.vercel.app/ |
| 6 | Fashion | https://mementofashion.vercel.app/ |
| 7 | MementoSL | https://mementosl.vercel.app/ |
| 8 | Knives | https://knives.vercel.app/ |
| 9 | ProductVis | https://productvis.vercel.app/ |
| 10 | VisualRef | https://visualref.vercel.app/ |
| 11 | TechRef | https://techref.vercel.app/ |

Le esperienze già presenti oltre le prime sei sono conservate. TechRef chiude la sequenza. Il contenuto è in `src/content.js`.

## Vercel

Estrarre lo ZIP nella root del progetto, accanto a `package.json` e `vercel.json`.

- Framework: **Other**.
- Build: `npm run build`.
- Output: `dist`.
- Install command: vuoto.
- Node.js: 20 o successivo.

La configurazione è già inclusa. `dist/` contiene anche il kit di navigazione.

## Sviluppo e verifica

```sh
npm run dev
npm run build
npm test
npm run check:links
```

Il server usa la porta 4173. La build rigenera `dist/`; eseguire la build prima dei test. I test coprono player, navigazione, asset, ordine delle esperienze, carousel, contatto e integrità del bridge Tide.

## Integrazione

Il bootstrap della navbar si trova in `public/navigation/` ed è caricato una volta con `data-memento-page="levelup"`. La navigazione punta ai percorsi pubblici `mementostudio.it`. Il bridge supporta l’integrazione nel navigation hub; il bridge Tide v014 della V14 è conservato byte per byte.

La demo usa fullscreen nativo dove disponibile e un dialog come fallback. La rete e le applicazioni incorporate determinano il completamento del caricamento; Food comincia subito, ma non ha un tempo fisso garantito. Il player conserva poster, recupero dopo timeout e collegamento esterno.

Thumbnail Via Roma: `public/assets/heroes/viaroma.webp` e variante `viaroma-640.webp`. Il prompt è in `visual-prompts.md`.
