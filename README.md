# Sito Memento

Il progetto Vercel `mementonav` pubblica la Home e le pagine di [mementostudio.it](https://mementostudio.it/). Il sito integra le versioni delle cinque sezioni indicate in `scripts/sections.lock.json`.

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
4. Nella repo navigation aggiorna il commit della sezione in `scripts/sections.lock.json` su un branch. La preview include pagine, immagini e codice di quelle versioni. Dopo la verifica puoi unire il branch per pubblicare il sito. Il rollback del deploy ripristina insieme i file delle sei pagine.

## Dove si regolano gli effetti

- `src/vfx/config.mjs` controlla palette, tempi, effetti al tocco e al puntatore di Home, Servizi, Portfolio, LevelUp e Start. `VFX.runtime` regola il riposo del loop (`idle`, 1 s) e la cadenza dell’hover fermo (`calmFps`, 30); `VFX.quality` i profili e il budget di pixel.
- `src/vfx/policy.mjs` decide per ogni visita se gli effetti partono: `?vfx=off`, Save-Data e dispositivi sotto i 2 GB mostrano la pagina HTML.
- `scripts/scene-head.mjs` segue la navigazione nativa. `scripts/scene-material.mjs` scompone la pagina in celle che formano il sigillo Memento e ricompone la successiva dal reticolato (R16).
- Hover con il mouse: `VFX.pointer.wave`. Luce del cursore sulle foto: `PHOTO_SPOT` in `src/surfaces/shaders.ts` e `src/shaders.js`.
- `public/navigation/` contiene la navbar comune. Le pagine usano un fondo nero uniforme.
- Studio 3D usa lo stesso menu e la stessa transizione. La scena e i controlli 3D si modificano nella repo Studio.

## Avvio e build

Il progetto usa Node 22.12 o successivo della serie 22. `npm ci`, `npm test` e `npm run build` verificano e compilano i sorgenti. `npm run dev` avvia la Home in Vite. Dopo la build, `npm run preview` serve tutte e sei le pagine.

La build scarica i commit pubblici delle cinque repo, compila le sezioni e adatta l’HTML con `scripts/native-page.mjs`. La CDN serve direttamente pagine e asset. La build si interrompe se manca una revisione o se una sezione fallisce. La Home disegna subito foto e titoli HTML con la prospettiva del carosello; il renderer degli effetti li sostituisce quando è pronto. `?lab` apre la regia.

## Riferimento visivo della Home

Le cinque stazioni seguono l’ordine Studio, Servizi, Portfolio, LevelUp e Start. Le note di design sono in `docs/dna/`.

## Navigazione e rendering

I link avviano subito la richiesta HTML. Dove sono disponibili le transizioni fra documenti, l’icona ambra accompagna il passaggio. All’apertura diretta, con movimento ridotto o con colori forzati, il browser mostra la pagina direttamente. I moduli della sezione collegano i controlli durante il cambio pagina. La prima schermata usa il contenuto HTML e le fotografie della build. Studio 3D mostra la vista esterna mentre prepara il primo frame del modello.

Dalla R15 la Home e le pagine Start, Servizi, Portfolio e LevelUp hanno di nuovo gli effetti della START V28, senza sfondo. La pagina HTML compare per prima e resta il fallback: il renderer si scarica dopo il primo paint, nasce nel primo momento libero del browser, compila gli shader e poi prende il posto delle superfici. Disegna solo quando qualcosa cambia (puntatore, tocco, scroll, caricamento di un’immagine) e un secondo dopo l’ultimo cambiamento si ferma: a riposo la GPU non lavora. `?vfx=off` mostra la pagina HTML, `?vfx=low|medium|high` blocca un profilo, `?vfxdebug` espone `window.__vfx` con le metriche (`renders`, `sleeps`, `wakes`, `running`). Con grafica software, movimento ridotto (pagine) o colori forzati resta la pagina HTML. Le esperienze 3D e le demo interattive hanno renderer propri.

Le note delle release precedenti e i riferimenti artistici sono in `docs/`.

## Archivio delle release

### R16

- **Hover desktop come la catena dei telefoni.** Onde che corrono nelle celle della card dall'ingresso del cursore e mentre si muove, solo nella superficie sotto il mouse.
- **Foto nei loro colori in hover**, con una luce morbida intorno al cursore; niente gradazione ambra, bloom e lampade ridotti.
- **Cambio pagina dal reticolato.** L'interfaccia si scompone dal punto toccato, i frammenti formano il sigillo; il sigillo si rompe e la pagina nuova si compone cella per cella (560 + 700 ms). Dettagli in `docs/R16_NOTES.md`.

### R15

- **Effetti della START V28 sulla navigazione ottimizzata, senza sfondo.** Home (carosello) e pagine native tornano a usare i due renderer esistenti; nessuno sfondo, nessun secondo contesto WebGL. Dettagli e verifica in `docs/R15_NOTES.md`.
- **Riposo vero.** Il loop disegna solo quando qualcosa cambia e si ferma dopo 1 s (prima la pagina disegnava a 30 fps anche a riposo, a 60 fps con il mouse sulla finestra). Hover fermo a 30 fps.
- **Presa in carico morbida.** Download dopo il primo paint, creazione nel primo momento libero, shader compilati prima di sostituire l’HTML (in parallelo dove la GPU lo consente).
- **Budget di pixel per profilo**, MSAA rilasciato quando il profilo scende, nessun picco di velocità del puntatore al risveglio.

### R13

- **Titoli di Projects e LevelUp.** Nella R12 il renderer dipingeva solo i titoli delle tab sullo schermo all'avvio (Studio, Services, Start) e poi smetteva di controllare: Projects e LevelUp restavano con il titolo DOM, senza hover, range, reticolo né glow. Ora tutti e cinque i titoli vengono preparati, uno per frame, dalla tab più vicina.
- **Sfondo della START.** Ghost Fibers con il preset della V27 (cinque layer, `#ef4444` / `#f97316`, grana 0), su un canvas proprio dietro alle tab: al massimo 30 disegni al secondo, DPR 1, risoluzione adattiva, caricato come chunk separato 350 ms dopo il primo paint. Il blur del 20% alto e basso vale anche per le fibre. `?bkg=0` lo spegne (verifiche, confronto).
- **Grade pulito.** Niente grana né dithering animato; il canvas delle tab è trasparente sopra lo sfondo, con pannelli neri opachi.
- **Tocco (V26–V27).** Un contatto percorre le celle esistenti di tab e titoli per brevi rami, con arrivi sfalsati in base alla distanza dal dito. Accende il bordo dove le celle lo raggiungono, porta i titoli raggiunti al gradiente ambra con le loro celle luminose e qualche scintilla, poi si spegne. Un dito fermo non alimenta l'hover; rilascio e scroll nativo non duplicano né cancellano il contatto. Senza WebGL i titoli raggiunti si scaldano per un attimo.
- **Telefono e tablet.** Scene a colori anche a riposo (WebGL e fallback). Profili `medium`/`low` senza tagli a bloom, particelle o celle; MSAA ×2 solo su `high`. Loop delle tab limitato a 60 render al secondo sugli schermi ad alta frequenza. Icone della dock da 4–8 kB (`*-nav.webp`, come nel kit 12.1.0) al posto dei thumb da 0,4–0,75 MB. Blur del fallback con le maschere direzionali della V26.
- **Primo paint.** La navigazione DOM è visibile subito; l'engine la sostituisce quando è pronto e costruisce le tab per celle.

### R12

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
