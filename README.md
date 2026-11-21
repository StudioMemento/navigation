# Sito Memento

Il progetto Vercel `mementonav` pubblica la Home e le pagine di [mementostudio.it](https://mementostudio.it/). Ogni sezione si aggiorna dalla propria repo GitHub.

| Pagina | Indirizzo sul sito | Repository da clonare in GitHub Desktop |
| --- | --- | --- |
| Home e navigazione | `/` | [StudioMemento/navigation](https://github.com/StudioMemento/navigation) |
| Studio 3D | `/studio/` | [StudioMemento/mementostudio](https://github.com/StudioMemento/mementostudio) |
| Servizi | `/services/` | [StudioMemento/servizi](https://github.com/StudioMemento/servizi) |
| Portfolio | `/projects/` | [StudioMemento/Portfolio](https://github.com/StudioMemento/Portfolio) |
| LevelUp | `/levelup/` | [StudioMemento/mementolevelup](https://github.com/StudioMemento/mementolevelup) |
| Start | `/start/` | [StudioMemento/mementostart](https://github.com/StudioMemento/mementostart) |

## Pubblicare una modifica con GitHub Desktop

1. Apri la repo della pagina e scegli **Fetch origin**, poi **Pull origin** se disponibile.
2. Modifica i sorgenti nella cartella clonata. Se ricevi uno ZIP di aggiornamento, estrai i file indicati nella stessa cartella, al livello di `package.json`.
3. Controlla l’elenco delle modifiche, scegli **Commit to main** e poi **Push origin**.
4. Quando il deployment mostra **Ready** su Vercel, apri la pagina sul dominio pubblico. L’HTML delle sezioni viene conservato per un minuto nella cache di Vercel e può essere servito durante l’aggiornamento.

## Dove si regolano gli effetti

- `src/vfx/config.mjs` controlla palette, tempi, effetti al tocco e al puntatore di Home, Servizi, Portfolio, LevelUp e Start.
- `public/memento-ui/site.css` contiene la transizione fra le pagine e la variante per chi preferisce ridurre il movimento.
- `public/navigation/` contiene la navbar comune. `src/background/` contiene lo sfondo e il suo preset.
- Studio 3D usa lo stesso menu e la stessa transizione. La scena e i controlli 3D si modificano nella repo Studio.

## Avvio e build

Il progetto usa Node 22.12 o successivo della serie 22. `npm ci`, `npm test` e `npm run build` verificano e compilano i sorgenti. `npm run dev` avvia la Home in Vite. Per provare anche le cinque sezioni usa un’anteprima Vercel della repo.

Vercel serve l’HTML della sezione tramite `api/section.js`. Il codice in `scripts/native-page.mjs` prepara i link, la navbar e gli effetti prima che l’HTML arrivi al browser. Le immagini, i modelli 3D e i contenuti restano gestiti dalla repo di ciascuna pagina.

## Riferimento visivo della Home

Le cinque stazioni seguono l’ordine Studio, Servizi, Portfolio, LevelUp e Start. Le note di design sono in `docs/dna/`.

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
