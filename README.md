# Sito Memento

Il progetto Vercel `mementonav` pubblica la Home e le pagine di [mementostudio.it](https://mementostudio.it/). Dalla R19 tutto il sito sta in questa repository: la Home e la navigazione alla radice, le cinque pagine in `apps/`, ognuna con la sua storia.

| Pagina | Indirizzo sul sito | Cartella |
| --- | --- | --- |
| Home, navigazione, effetti, cambio pagina | `/` | radice (`src/`, `public/`, `scripts/`) |
| Studio 3D | `/studio/` | `apps/studio` |
| Servizi | `/services/` | `apps/services` |
| Portfolio | `/projects/` | `apps/projects` |
| LevelUp | `/levelup/` | `apps/levelup` |
| Start | `/start/` | `apps/start` |

Le repo separate (mementostudio, servizi, Portfolio, mementolevelup, mementostart) restano su GitHub come archivio: non vengono più lette dalla build.

## Pubblicare una modifica con GitHub Desktop

1. Apri la repo navigation, poi **Fetch origin** e **Pull origin**.
2. Crea un branch, modifica i file (della Home o di una pagina in `apps/`). Se ricevi uno ZIP di aggiornamento, estrai la sua cartella sopra la radice della repo.
3. Fai commit e **Publish branch**: Vercel crea la preview di tutto il sito.
4. Se la preview va bene, unisci il branch in `main` per pubblicare. Una modifica che tocca più pagine è un solo commit; il rollback del deploy riporta indietro tutto il sito.

## Dove si regolano gli effetti

- `src/vfx/config.mjs` controlla palette, tempi, effetti al tocco e al puntatore di Home, Servizi, Portfolio, LevelUp e Start. `VFX.runtime` regola il riposo del loop (`idle`, 1 s) e la cadenza dell’hover fermo (`calmFps`, 30); `VFX.quality` i profili e il budget di pixel.
- `src/vfx/policy.mjs` decide per ogni visita se gli effetti partono: `?vfx=off`, Save-Data e dispositivi sotto i 2 GB mostrano la pagina HTML.
- `scripts/scene-head.mjs` guida il cambio pagina: la pagina si scompone dalle sue celle reali prima che il browser navighi verso il documento già prefetchato, e la nuova si compone con gli effetti già attivi (R17). Durate: `exit`, `unfold`; attesa massima degli effetti: `patience`. `scripts/scene-material.mjs` disegna crepe, schegge e il nome della pagina (R18, `names`, `weave.letter`) e apre il reticolato all'arrivo (`weave`). Wordmark e navbar restano sopra la transizione.
- Uscita delle celle negli shader: `EXIT` in `src/surfaces/shaders.ts` e `src/shaders.js`. Reticolato statico in hover: `HOVER_LATTICE` (0 dalla R17).
- Ready to start su Portfolio e LevelUp: `readyCard` in `scripts/native-page.mjs`, stile in `public/memento-ui/ready-to-start.css`.
- Hover con il mouse: `VFX.pointer.wave`; intensità delle celle accese: `HOVER_CELLS` (R18). Luce del cursore sulle foto: `PHOTO_SPOT` in `src/surfaces/shaders.ts` e `src/shaders.js`.
- Sfondo di lettere (R20, R21): `public/memento-ui/letters.mjs`. `LETTERS` contiene dimensione, densità, opacità, velocità, raggio del cursore, sfumatura (`fade`), impulso del click e dell'easter egg (`wave`) ed easter egg (`egg`: primo tentativo tra 7 e 13 s, poi ogni 16–30 s). I margini sono in `public/memento-ui/padding.mjs` (10/15/20/30%) e, per il contenuto, in `--mm-pad` di `site.css` (R21). Studio non ha lo sfondo: è una pagina a sé.
- Colori (R23, palette Incandescenza, dai colori caldi delle icone della navbar): `#FF7D00` (`--memento-accent`), light `#FFA23D` (`--memento-accent-light`), core `#FFC890`, ember `#C2500A`, deep `#7A340A`; energia degli effetti in `VFX.color.amber`. Colore a riposo: foto al 50% (`.5` negli shader), titoli al 30% del gradiente (`--title-gradient` nel DOM). Sui dispositivi senza hover: foto e titoli con il colore dell'hover già a riposo.
- Cambio pagina (R23): solo nella colonna tra i margini, con animazioni nel compositor (`scripts/scene-material.mjs`). Durate in `scripts/scene-head.mjs`: `exit` 520 ms, `unfold` 660 ms, nome fermo da `hold` 140 a `patience` 380 ms.
- `public/navigation/` contiene la navbar comune. Le pagine usano un fondo uniforme `#090909` (`--memento-ground` in `public/memento-ui/site.css`) e lo stesso indicatore di scroll (`public/memento-ui/scrollbar.mjs`).
- Le pagine non hanno motore effetti né navbar propri: usano `/memento-ui/effects.mjs` (da `src/surfaces`) e la navbar di `public/navigation`. Il contenuto di ogni pagina (markup, CSS, caroselli, testi, immagini) si modifica nella sua cartella `apps/`.
- Studio 3D usa lo stesso menu e la stessa transizione. La scena e i controlli 3D si modificano in `apps/studio`.

## Avvio e build

Il progetto usa Node 22.12 o successivo della serie 22. `npm ci` e `npm run build` compilano tutto il sito. `npm run dev` avvia la sola Home in Vite. Dopo la build, `npm run preview` serve tutte e sei le pagine: è il modo di provare una pagina in locale, con navbar ed effetti veri.

`npm test` controlla la Home, la navigazione e gli effetti. `npm run test:apps` esegue i test delle cinque pagine; `npm run test:apps services` ne esegue una sola. `npm run test:all` esegue entrambi.

La build (`scripts/sections.mjs`) compila ogni pagina da una copia della sua cartella, con i comandi di sempre, e ne adatta l'HTML con `scripts/native-page.mjs`. La CDN serve direttamente pagine e asset. La build si interrompe se una pagina fallisce. Ogni pagina porta il commit del sito in `data-memento-release`. La Home disegna subito foto e titoli HTML con la prospettiva del carosello; il renderer degli effetti li sostituisce quando è pronto. `?lab` apre la regia.

## Riferimento visivo della Home

Le cinque stazioni seguono l’ordine Studio, Servizi, Portfolio, LevelUp e Start. Le note di design sono in `docs/dna/`.

## Navigazione e rendering

Dove sono disponibili le transizioni fra documenti, un link interno chiede subito il documento (prefetch) e la pagina si scompone dalle sue celle nel sigillo Memento. Il browser naviga quando il movimento finisce, poi la pagina nuova si compone dal sigillo con gli effetti già attivi. Dettagli in `docs/R17_NOTES.md`. All’apertura diretta, con movimento ridotto o con colori forzati, il browser mostra la pagina direttamente. I moduli della sezione collegano i controlli durante il cambio pagina. La prima schermata usa il contenuto HTML e le fotografie della build. Studio 3D mostra la vista esterna mentre prepara il primo frame del modello.

Dalla R15 la Home e le pagine Start, Servizi, Portfolio e LevelUp hanno di nuovo gli effetti della START V28, senza sfondo. La pagina HTML compare per prima e resta il fallback: il renderer si scarica dopo il primo paint, nasce nel primo momento libero del browser, compila gli shader e poi prende il posto delle superfici. Disegna solo quando qualcosa cambia (puntatore, tocco, scroll, caricamento di un’immagine) e un secondo dopo l’ultimo cambiamento si ferma: a riposo la GPU non lavora. `?vfx=off` mostra la pagina HTML, `?vfx=low|medium|high` blocca un profilo, `?vfxdebug` espone `window.__vfx` con le metriche (`renders`, `sleeps`, `wakes`, `running`). Con grafica software, movimento ridotto (pagine) o colori forzati resta la pagina HTML. Le esperienze 3D e le demo interattive hanno renderer propri.

Le note delle release precedenti e i riferimenti artistici sono in `docs/`.

## Archivio delle release

### R23

- **Palette Incandescenza:** i colori caldi delle icone della navbar, senza argento. Base `#FF7D00`, light `#FFA23D`, core `#FFC890`, ember `#C2500A`, deep `#7A340A`.
- **La transizione tocca solo il contenuto.** Avviene nella colonna tra i margini. Sfondo di lettere, logotipo e navbar restano sempre visibili.
- **Cambio pagina fluido.** Animazioni di sola trasformazione e opacità nel compositor, che non si fermano mentre la pagina nuova si carica. Il nome si compone prima del click e i colori delle foto si leggono in anticipo. Tempi: 520 ms in uscita, 660 ms in apertura.
- **Mobile caldo a riposo.** Senza hover, foto, titoli ed etichette hanno già il colore dell'hover. Dettagli in `docs/R23_NOTES.md`.

### R22

- **Palette Ambra:** base `#FF7950`, light `#FFA94D` e core `#FFD285` su tutto il sito, compresa l'energia del motore.
- **Colore a riposo.** Foto al 50% (100% con gli effetti in hover), titoli con il 30% del gradiente ambra.
- **Superficie controllata.** Niente selezione, menu contestuale, tasto centrale o trascinamento su ogni pagina.
- **Sfondo di lettere** in linea in ogni pagina: è vivo dal primo fotogramma e la transizione non lo ferma più.
- **Cambio pagina.** Triangoli pieni nei colori dell'interfaccia di partenza e di arrivo, ombreggiati mentre ruotano, senza contorni; attesa del nome fissa (280 ms) su ogni pagina.
- **Nessuna transizione appesa.** Se la pagina nuova non arriva entro 4,5 s, torna quella attuale. Dettagli in `docs/R22_NOTES.md`.

### R21

- **Niente scena congelata.** Il motore effetti, la Home, lo sfondo e il cambio pagina chiedono di nuovo un fotogramma perso durante il congelamento della scheda o la cache back/forward.
- **Un solo arancione.** Tutto il sito usa `#FF7950` e la variante light `#FFAF96`, compresa l'energia del motore. I titoli a riposo restano identici.
- **Padding forzato** sul contenuto di tutte le pagine (10/15/20/30%, `--mm-pad` in `site.css`), con gli slider di Services e LevelUp di nuovo edge to edge.
- **Sfondo.** La sfumatura sta a cavallo del padding. Click ed easter egg mandano un impulso casuale su tutto il viewport, che torna in quiete.
- **Cambio pagina.** Usa il linguaggio delle card: catena ambra negli spigoli, schegge di ossidiana, nome composto faccetta per faccetta e nitido. Dettagli in `docs/R21_NOTES.md`.

### R20

- **Sfondo di lettere.** Riprende Letter Glitch di React Bits (preset pixel, `#f97316`, 8 px, densità 0.25, opacità 0.1, velocità 0.05, cursore 400, burst al clic). Al posto dei caratteri usa le lettere vettoriali del logotipo MEMENTO. Sta nei margini della pagina e sfuma fino a sparire dove comincia il contenuto. Ogni tanto il campo decripta MΞMΞNTO, e un'onda parte da lì per mostrare dove è successo.
- **Margini.** Valgono 10-80-10 su telefono, 15-70-15 su tablet e 20-60-20 su desktop (`padding.mjs`). Start fa da riferimento: su telefono logotipo, contenuto e navbar sono larghi l'80% in tutte le pagine; su ultrawide tutte le pagine prendono la sua colonna di 1280 px.
- **Studio** diventa una pagina a sé, da sviluppare su misura: niente sfondo di lettere.
- **Cambio pagina.** Il nome della pagina occupa lo spazio tra i margini, con lo stile dei titoli già in hover. Lo sfondo resta attivo per tutta la transizione: cambia solo il contenuto. Dettagli in `docs/R20_NOTES.md`.

### R19

- **Una sola repo.** Le cinque pagine sono in `apps/`, importate con la loro storia. La build le legge dalle cartelle: niente più `sections.lock.json`, hash da copiare o patch applicate in build.
- **Niente copie doppie.** Le pagine non contengono più un loro motore effetti, la loro navbar, i bootstrap per Framer o gli host: usano solo quelli del sito. Il sito pubblicato è uguale alla R18, tolti i file che non venivano usati. Dettagli in `docs/R19_NOTES.md`.

### R18

- **Card di Servizi.** Sfumatura della foto a curva morbida su gran parte dell'immagine, senza spigoli; dithering fisso nel grade, così i neri non fanno gradini.
- **Titoli delle card con il materiale dei titoli di Start** (`data-vfx="title"` dentro una card): seguono la card nel carosello e si scaldano con il suo hover.
- **Hover più visibile** su tab e card (`HOVER_CELLS`, `VFX.pointer.wave`).
- **Titoli delle categorie** di Servizi attaccati alle slide.
- **Un solo indicatore di scroll** ambra per tutte le pagine (`public/memento-ui/scrollbar.mjs`).
- **Slider di LevelUp** al centro.
- **Cambio pagina**: il nome della pagina che si apre al posto del sigillo; wordmark e navbar sempre visibili.
- **Fondo `#090909`** (`--memento-ground`). Dettagli e verifica in `docs/R18_NOTES.md`.

### R17

- **Cambio pagina dall'interfaccia reale, più lento.** Le celle vere di card, foto e titoli e i pezzi del DOM si staccano dal punto toccato e volano nel sigillo prima che il browser navighi. Il documento è già prefetchato. Uscita 1000 ms, ingresso 1150 ms. Il nero compare solo a schermo vuoto.
- **Nessuno scatto all'arrivo.** Gli effetti della pagina nuova partono sotto il sigillo. Il sigillo aspetta il loro primo fotogramma e la sequenza di caricamento compone la pagina mentre si apre.
- **Hover vivo.** Nessun reticolato statico sotto il cursore: solo la reazione a catena, come al tocco.
- **Ready to start** di Servizi anche su Portfolio e LevelUp, al posto del link del footer e dell'iframe di visualfx.vercel.app. Dettagli e verifica in `docs/R17_NOTES.md`.

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
