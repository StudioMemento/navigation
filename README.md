# Memento Hub R14 — contenitore Vercel (dalla NAV R13)

## Base di migrazione su Vercel

Questo pacchetto è associato al progetto di prova **mementonav-migrazione-r14** del team StudioMemento. Il sito pubblico e le pagine di Framer utilizzano i loro progetti attuali. [Apri il progetto di prova su Vercel](https://vercel.com/studio-memento-s-projects/mementonav-migrazione-r14)

Per la prima anteprima, una volta attiva la prova Pro o il piano Pro, estraete tutto lo ZIP, compresa la cartella nascosta `.vercel`. Aprite il terminale nella cartella che contiene `package.json`. Con la CLI Vercel autenticata nel team dello studio, eseguite:

```sh
vercel deploy --target=preview
```

La CLI legge la destinazione da `.vercel/project.json`. La configurazione locale è esclusa dai commit Git. La build usa Vite, `npm ci`, `npm run build` e la cartella di output `dist`. Il progetto e il pacchetto richiedono la major 22 di Node, a partire da 22.12.

Per provare anche le quattro pagine aggiornate, aprite l’URL specifico del deployment dell’hub che termina in `-studio-memento-s-projects.vercel.app`. Assegnate le preview di pagina con `memento-src-services`, `memento-src-projects`, `memento-src-levelup` e `memento-src-start`. In assenza di questi parametri l’hub carica le versioni pubblicate delle pagine. Studio usa il deploy esistente. I sorgenti di quest’ultimo sono nel [repository Studio](https://github.com/StudioMemento/mementostudio).

**R14 (17 novembre 2026).** Aperto come documento principale (mementostudio.it, mementonav.vercel.app, preview, locale) il progetto è il **contenitore del sito**: mondo 3D in `/`, sezioni in `/studio`, `/services`, `/projects`, `/levelup`, `/start` caricate dal vivo dalle loro applicazioni, una navbar, un URL e una cronologia. Codice in `src/shell/` (`shell.mjs` stato e transizioni, `frames.mjs` iframe e sessioni, `sources.mjs` app per ambiente), `src/seo.mjs` e `scripts/routes.mjs` (HTML per route, 404, sitemap, robots). Incorporato in un altro sito (la home Framer fino al cambio di dominio) si comporta come la R13 qui sotto. Il renderer (Three.js) è un chunk caricato con il mondo. Build: `npm ci && npm run build` (Vite + `scripts/routes.mjs`), test `npm test` (37). Workspace, protocollo e verifiche: `README.md` e `docs/` alla radice del workspace.

---

# Memento NAV R13 — VFX DNA, START V27

Navigazione Vite + Three.js. La R12 ha portato gli effetti della START V23; la R13 la allinea alla START V27: sfondo Ghost Fibers, grade senza grana, tocco a catena su tab, titoli e bordi, scene a colori a riposo su telefono, ottimizzazioni mobile. Corregge inoltre gli effetti dei titoli di Projects e LevelUp, che nella R12 non si attivavano. Le cinque scene e l'ordine restano quelli della R11: Studio → Services → Projects → LevelUp → Start → Studio.

Il DNA (regole, palette, tempi) è in `docs/dna/`. La sezione `applicazione-alle-pagine.md` riporta gli adattamenti della navigation, scritti prima del codice come chiede il DNA.

## Avvio e build

Node 22.12+ o 24. Eseguire `npm ci`, `npm run dev`. Per la distribuzione: `npm test`, `npm run build`. Su Vercel: framework Vite, comando `npm run build`, output `dist`. La cartella `dist/` inclusa è anche distribuibile come sito statico.

L'embed su mementostudio.it carica mementonav.vercel.app: per aggiornarlo basta distribuire questa build sul progetto NAV esistente. Tutti i link di destinazione mantengono mementostudio.it e il target `_top`. Il bridge iframe (sezione, altezza del viewport) è invariato.

## Cosa cambia nella R13

- **Titoli di Projects e LevelUp.** Nella R12 il renderer dipingeva solo i titoli delle tab sullo schermo all'avvio (Studio, Services, Start) e poi smetteva di controllare: Projects e LevelUp restavano con il titolo DOM, senza hover, range, reticolo né glow. Ora tutti e cinque i titoli vengono preparati, uno per frame, dalla tab più vicina.
- **Sfondo della START.** Ghost Fibers con il preset della V27 (cinque layer, `#ef4444` / `#f97316`, grana 0), su un canvas proprio dietro alle tab: al massimo 30 disegni al secondo, DPR 1, risoluzione adattiva, caricato come chunk separato 350 ms dopo il primo paint. Il blur del 20% alto e basso vale anche per le fibre. `?bkg=0` lo spegne (verifiche, confronto).
- **Grade pulito.** Niente grana né dithering animato; il canvas delle tab è trasparente sopra lo sfondo, con pannelli neri opachi.
- **Tocco (V26–V27).** Un contatto percorre le celle esistenti di tab e titoli per brevi rami, con arrivi sfalsati in base alla distanza dal dito. Accende il bordo dove le celle lo raggiungono, porta i titoli raggiunti al gradiente ambra con le loro celle luminose e qualche scintilla, poi si spegne. Un dito fermo non alimenta l'hover; rilascio e scroll nativo non duplicano né cancellano il contatto. Senza WebGL i titoli raggiunti si scaldano per un attimo.
- **Telefono e tablet.** Scene a colori anche a riposo (WebGL e fallback). Profili `medium`/`low` senza tagli a bloom, particelle o celle; MSAA ×2 solo su `high`. Loop delle tab limitato a 60 render al secondo sugli schermi ad alta frequenza. Icone della dock da 4–8 kB (`*-nav.webp`, come nel kit 12.1.0) al posto dei thumb da 0,4–0,75 MB. Blur del fallback con le maschere direzionali della V26.
- **Primo paint.** La navigazione DOM è visibile subito; l'engine la sostituisce quando è pronto e costruisce le tab per celle.

## Cosa cambiava nella R12 rispetto alla R11

- **Nero vero, nessuno sfondo.** Il reticolo di sfondo con il bagliore ambra che seguiva il puntatore e la scia di triangoli sono stati rimossi: per il DNA sono un disco che segue il cursore e ambra a riposo. Pagina, pannelli e primo paint sono `#000`.
- **Quiete, base attiva, range.** A riposo la scena è in bianco e nero e il titolo ha il gradiente desaturato (luce dall'alto). Con il puntatore sulla tab la scena prende i suoi colori all'80% e il titolo il gradiente ambra con il reticolo dorato. Nelle celle raggiunte la scena va al 100% e il titolo al giallo caldo, con bordo interno, bagliore e un bloom leggero.
- **Energia a reazione a catena.** Una rete di celle irregolari per ogni tab e per ogni titolo; il gesto accende celle sparse, la catena si propaga a zone e si spegne da sola. Le celle restano invisibili a riposo e hanno spigoli a filo sottile.
- **Bordo per segmenti.** 96 tratti che si accendono dal lato più vicino al puntatore, dalle celle accese, dalle schegge che lo attraversano. La tab che arriva in lettura accende il tratto da cui arriva.
- **Titoli dipinti sul piano della tab.** Impaginati come l'`<h2>` del DOM, con campo di distanza dei glifi: luce che segue la sagoma esatta delle lettere, senza cambiarne peso o forma.
- **Fasce 15/70/15 nel carosello.** La sezione successiva arriva già frammentata dal basso, la precedente esce dall'alto; la frammentazione dipende solo dalla posizione ed è monocromatica. Allo stop del carosello le celle in uscita derivano e svaniscono.
- **Caricamento in sei fasi.** Le tab si costruiscono per celle in 1,8 s; se l'utente interagisce, il caricamento accelera di 3,2 volte. (R12: le tab partivano nere; dalla R13 il DOM è visibile al primo paint, come nella START V24.)
- **Schegge e scintille** solo dalle celle accese mentre il puntatore si muove, e durante il caricamento.
- **Grade finale della START:** spalla delle luci, bloom selettivo con striatura anamorfica, vignettatura, grana, aberrazione cromatica verso i bordi, dithering. Il blur progressivo del 20% alto e basso resta composto in WebGL, come nella R11.
- **Palette del DNA** anche in navbar, chevron e focus: ambra di riferimento `#FF7950`, rampa `#9E2208 → #FF5510 → #FF8A1C → #FFCB72`.

## Regia e verifica

- `?lab=1`: sette controlli (raggio del puntatore, bloom, striatura, profondità immagini, luce del bordo, sorgenti delle scene, schegge) e il riepilogo di renderer, profilo e fps. I valori di default sono in `src/settings.js`; colori, tempi e densità sono quelli del DNA (`src/vfx/config.mjs`).
- `?vfx=high|medium|low` blocca un profilo di qualità; altrimenti il profilo scende da solo se i frame superano 30 ms.
- `?motion=reduce` simula reduced motion: niente propagazione né tocco a catena, niente fasce, caricamento immediato, hover al 60%.
- `?bkg=0` spegne lo sfondo.
- `?qa=1` espone `window.__nav` (`advance`, `select`, `pointer`, `touch`) per avanzare il tempo in modo deterministico (screenshot su renderer lenti). Senza il parametro non esiste.

## Rendering

- Due contesti WebGL2, come nella START: lo sfondo con il suo budget, le tab con il loro loop. Ogni tab ha tre mesh sullo stesso piano: la struttura monocromatica (pannello, scena, cornice, titolo), l'overlay d'energia della tab, l'overlay del titolo. Il frame si compone in half float (MSAA ×2 sul profilo alto) e si gradua una volta sola verso lo schermo, trasparente sopra lo sfondo.
- Il DOM resta la fonte di verità per layout, semantica, focus e click: quando l'engine è pronto aggiunge `html.vfx-live` e il DOM smette di dipingere immagini e titoli già disegnati dal canvas. Errore, perdita del contesto o assenza di WebGL2 riportano subito alla navigazione DOM (scene in bianco e nero, colore in hover, titoli con gradiente).
- Dopo tre secondi senza reazioni il loop delle tab si ferma; qualsiasi input lo riprende. Lo sfondo si ferma solo quando la pagina non è visibile.

## File

`src/vfx/` contiene i moduli del DNA (configurazione, catena, tocco, bordo, rete, struttura, particelle, campo di distanza, puntatore, titoli). `src/background/` contiene Ghost Fibers (generato dal componente della V27 come modulo senza React), il preset e il montaggio. `src/shaders.js` e `src/renderer.js` contengono gli shader GLSL ES 3.0 e l'engine. `src/main.js` contiene carosello, input e regia. `public/navigation/` conserva logo e navbar del kit con la palette del DNA. `art/` contiene i cinque master PNG. `public/assets/scenes/` contiene le varianti WebP 768 e 1536. `docs/` contiene note, DNA, prompt e bridge Framer.

Non sono richieste API key o librerie da CDN a runtime. Licenza di Ghost Fibers in `docs/ReactBits-LICENSE.md`.
