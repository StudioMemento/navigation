# LevelUp — Visual DNA R1.1

Aggiornamento del 31 ottobre 2026, basato su `Memento_Visual_DNA(1).md` revisione 1.1.

## Aggiornamento su Vercel

1. Estrai lo ZIP.
2. Sostituisci i file del progetto LevelUp con il contenuto estratto: `index.html`, i file CSS/JS, `vercel.json` e la cartella `assets` devono essere alla radice del progetto.
3. Esegui il deploy con il metodo che usi già per `mementolevelup.vercel.app`.

È un sito statico: **Framework Preset: Other**, nessuna installazione e nessun comando di build. La directory di output è `.`. Il file `vercel.json` contiene già questa configurazione. Se nel pannello del progetto esistono vecchi override di build, rimuovili o allineali a questi valori.

Non servono chiavi API, variabili d’ambiente o un backend. Il pacchetto non è stato pubblicato sul sito di produzione.

## Cosa è cambiato

- Area delle tavole all’80%, massimo 1280 × 640 nel ramo desktop; carousel mobile 20–60–20 e rapporti portrait del master.
- Inter Variable locale, pesi e inset del master, titoli con gradiente bianco caldo → ambra.
- Tavole nere, bordo continuo da 1 px e tagli in alto a sinistra / basso a destra.
- Foto desktop al 78%, con una sola dissolvenza a sinistra. Su mobile e tablet portrait: composizione `contain`, senza vignette aggiunte.
- Rampe PCHIP e dithering statico limitato alle transizioni; maschere alpha lossless generate alla dimensione di rendering. Nessun loop di rendering dedicato alle maschere.
- Stesso motore del carousel Servizi: prospettiva, molla, dots, drag, wheel orizzontale, tastiera. Autoplay disattivato; scroll verticale nativo.
- CTA “Ready to start?” con la scultura originale Servizi: monocroma a riposo, ambra con hover/focus e luce sul perimetro.
- CTA collegata a `https://mementostudio.it/start`, con `target="_top"`, come nel master. Il precedente form email interno a LevelUp è sostituito da questo percorso.
- Dieci esperienze, destinazioni e immagini originali conservate. Tutte le fotografie sono WebP in tre risoluzioni; i collegamenti delle card supportano anche l’apertura in nuova scheda.

## Player e integrazione

Il player contiene esperienze interattive reali, non le quattro tavole editoriali di un servizio. Conserva quindi una finestra ampia: 80% del viewport, tetto orizzontale di 1280 px e spazio per i controlli nei viewport bassi. La cornice, il blur da 18 px e la X seguono il linguaggio del master.

Il player si chiude con X, Escape o un click esterno senza trascinamento. Ripristina scroll e focus, gestisce l’hash `#esperienza/id` e rimuove l’iframe alla chiusura. Il collegamento a una nuova scheda resta sempre disponibile anche se una demo non si carica.

Il documento è trasparente quando embedded; lo sfondo standalone è `#0b0c0d`. Il `color-scheme` embedded ammette entrambi gli schemi del contenitore, evitando il fondale opaco automatico del browser.

Il bridge Tide v014 è incluso. Gli attributi della vecchia galleria verticale sono rimossi: in questa versione i bordi del viaggio sono l’inizio e la fine del documento, mentre il carousel resta orizzontale. Le notifiche overlay usano `memento:levelup:surface`.

Il parent attuale applica il blur aggiuntivo della scena soltanto a Services: il pacchetto LevelUp non modifica il codice del parent e non simula quel blur. Handshake e trasparenza sono stati verificati in un contenitore di prova; il ciclo WebGL completo dell’hub live va ricontrollato dopo il deploy.

## Verifiche

Le misure sono state raccolte in Chromium usando viewport di iframe con queste dimensioni CSS. Scarto massimo rilevato sulle quote delle tavole: inferiore a 0,02 px.

| Viewport | X tavola | Larghezza | Altezza | Larghezza CTA |
|---|---:|---:|---:|---:|
| 360 × 800 | 72 | 216 | 263,41 | 296 |
| 390 × 844 | 78 | 234 | 285,36 | 323,69 |
| 820 × 1180 | 82 | 656 | 524,80 | 656 |
| 844 × 390 | 84,41 | 675,19 | 337,59 | 675,19 |
| 1440 × 1000 | 144 | 1152 | 576 | 1152 |
| 1600 × 1000 | 160 | 1280 | 640 | 1280 |
| 1920 × 1080 | 320 | 1280 | 640 | 1280 |

Controllati: font caricato, assenza di overflow orizzontale, tutti i titoli nel formato 360 px, trascinamento mouse reale, eventi touch simulati, card laterali, tastiera, player, Escape/X/click esterno, ritorno del focus, scroll verticale, CTA e alpha sopra un parent animato. Il caricamento reale del player Auren è stato osservato nel browser.

Sono presenti i rami per `prefers-reduced-motion`, `forced-colors` e safe area. La verifica non sostituisce una prova su hardware iOS/Safari, tecnologie assistive o rete mobile lenta; non è una certificazione FPS. I siti delle singole esperienze restano esterni e indipendenti da questo aggiornamento.

## Modifiche future

- `experiences.js`: elenco delle esperienze e collegamenti.
- `style.css`: geometria, tipografia, superfici e player.
- `start.css` / `visuals.js`: CTA e scrollbar.
- `carousel.js`: interazioni del carousel.
- `smooth.js`: gradienti e maschere regolarizzate.
- `app.js`: composizione della pagina e gestione dei player.

Non sono inclusi server locali, script di collaudo o dipendenze da installare.
