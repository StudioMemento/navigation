# Memento NAV R12 — VFX DNA

Navigazione Vite + Three.js, derivata dalla R11, con gli effetti sviluppati sulla START V23: stessa materia, stessa energia, stessa luce, stesse costanti. Le cinque scene e l'ordine restano quelli della R11: Studio → Services → Projects → LevelUp → Start → Studio.

Il DNA (regole, palette, tempi) è in `docs/dna/`. La sezione `applicazione-alle-pagine.md` riporta gli adattamenti della navigation, scritti prima del codice come chiede il DNA.

## Avvio e build

Node 22.12+ o 24. Eseguire `npm ci`, `npm run dev`. Per la distribuzione: `npm test`, `npm run build`. Su Vercel: framework Vite, comando `npm run build`, output `dist`. La cartella `dist/` inclusa è anche distribuibile come sito statico.

L'embed su mementostudio.it carica mementonav.vercel.app: per aggiornarlo basta distribuire questa build sul progetto NAV esistente. Tutti i link di destinazione mantengono mementostudio.it e il target `_top`. Il bridge iframe (sezione, altezza del viewport) è invariato.

## Cosa cambia rispetto alla R11

- **Nero vero, nessuno sfondo.** Il reticolo di sfondo con il bagliore ambra che seguiva il puntatore e la scia di triangoli sono stati rimossi: per il DNA sono un disco che segue il cursore e ambra a riposo. Pagina, pannelli e primo paint sono `#000`.
- **Quiete, base attiva, range.** A riposo la scena è in bianco e nero e il titolo ha il gradiente desaturato (luce dall'alto). Con il puntatore sulla tab la scena prende i suoi colori all'80% e il titolo il gradiente ambra con il reticolo dorato. Nelle celle raggiunte la scena va al 100% e il titolo al giallo caldo, con bordo interno, bagliore e un bloom leggero.
- **Energia a reazione a catena.** Una rete di celle irregolari per ogni tab e per ogni titolo; il gesto accende celle sparse, la catena si propaga a zone e si spegne da sola. Le celle restano invisibili a riposo e hanno spigoli a filo sottile.
- **Bordo per segmenti.** 96 tratti che si accendono dal lato più vicino al puntatore, dalle celle accese, dalle schegge che lo attraversano. La tab che arriva in lettura accende il tratto da cui arriva.
- **Titoli dipinti sul piano della tab.** Impaginati come l'`<h2>` del DOM, con campo di distanza dei glifi: luce che segue la sagoma esatta delle lettere, senza cambiarne peso o forma.
- **Fasce 15/70/15 nel carosello.** La sezione successiva arriva già frammentata dal basso, la precedente esce dall'alto; la frammentazione dipende solo dalla posizione ed è monocromatica. Allo stop del carosello le celle in uscita derivano e svaniscono.
- **Caricamento in sei fasi.** Le tab partono nere (`vfx-boot`, massimo 3 s) e si costruiscono per celle in 1,8 s; se l'utente interagisce, il caricamento accelera di 3,2 volte.
- **Schegge e scintille** solo dalle celle accese mentre il puntatore si muove, e durante il caricamento.
- **Grade finale della START:** spalla delle luci, bloom selettivo con striatura anamorfica, vignettatura, grana, aberrazione cromatica verso i bordi, dithering. Il blur progressivo del 20% alto e basso resta composto in WebGL, come nella R11.
- **Palette del DNA** anche in navbar, chevron e focus: ambra di riferimento `#FF7950`, rampa `#9E2208 → #FF5510 → #FF8A1C → #FFCB72`.

## Regia e verifica

- `?lab=1`: otto controlli (raggio del puntatore, bloom, striatura, profondità immagini, luce del bordo, sorgenti delle scene, schegge, grana) e il riepilogo di renderer, profilo e fps. I valori di default sono in `src/settings.js`; colori, tempi e densità sono quelli del DNA (`src/vfx/config.mjs`).
- `?vfx=high|medium|low` blocca un profilo di qualità; altrimenti il profilo scende da solo se i frame superano 30 ms.
- `?motion=reduce` simula reduced motion: niente propagazione, niente fasce, caricamento immediato, hover al 60%, grana ferma.
- `?qa=1` espone `window.__nav` per avanzare il tempo in modo deterministico (screenshot su renderer lenti). Senza il parametro non esiste.

## Rendering

- Un solo contesto WebGL2 e un solo loop. Ogni tab ha tre mesh sullo stesso piano: la struttura monocromatica (pannello, scena, cornice, titolo), l'overlay d'energia della tab, l'overlay del titolo. Il frame si compone in half float con MSAA ×4 e si gradua una volta sola verso lo schermo.
- Il DOM resta la fonte di verità per layout, semantica, focus e click: quando l'engine è pronto aggiunge `html.vfx-live` e il DOM smette di dipingere immagini e titoli già disegnati dal canvas. Errore, perdita del contesto o assenza di WebGL2 riportano subito alla navigazione DOM (scene in bianco e nero, colore in hover, titoli con gradiente).
- Dopo tre secondi senza reazioni il loop si ferma; qualsiasi input lo riprende.

## File

`src/vfx/` contiene i moduli del DNA (configurazione, catena, bordo, rete, struttura, particelle, campo di distanza, puntatore, titoli). `src/shaders.js` e `src/renderer.js` contengono gli shader GLSL ES 3.0 e l'engine. `src/main.js` contiene carosello, input e regia. `public/navigation/` conserva logo e navbar del kit con la palette del DNA. `art/` contiene i cinque master PNG. `public/assets/scenes/` contiene le varianti WebP 768 e 1536. `docs/` contiene note, DNA, prompt e bridge Framer.

Non sono richieste API key o librerie da CDN a runtime.
