# R17 — cambio pagina dall'interfaccia reale, nessuno scatto all'arrivo, hover vivo, Ready to start

## Richiesta

Dopo il deploy della R16:

1. La transizione parte in ritardo, quando fa già l'esploso, ed è ancora troppo veloce. La scomposizione del reticolato e dell'interfaccia deve partire dall'interfaccia reale, non dai bordi che poi forzano il nero.
2. Finita l'animazione la pagina compare un istante senza effetti, poi uno scatto, poi gli effetti: sembra un errore.
3. In hover sulle card c'è un reticolato statico: deve essere animato e fare la reazione a catena dei telefoni anche su desktop.
4. Senza più iframe (visualfx.vercel.app), su Servizi, Portfolio e LevelUp deve esserci la card "Ready to start" di Servizi. Per ora va riportata e deve funzionare; la grafica si sviluppa dopo.

## 1. Uscita dall'interfaccia reale, più lenta

Perché partiva in ritardo: la R16 lasciava navigare subito il browser. Con la risposta già pronta la pagina vecchia veniva congelata dopo pochi fotogrammi e la nuova riprendeva il movimento solo al suo primo paint. Inoltre l'uscita chiudeva celle nere sopra la pagina, a partire dal punto toccato fino ai bordi.

Ora:

- **La pagina si scompone prima che il browser navighi.** Il clic su un link interno, o una navigazione da script, parte subito sulla pagina viva. Il browser va alla pagina nuova quando il movimento finisce (1000 ms, prima 560 ms). Nel frattempo il documento è già stato richiesto: con le *speculation rules* la navigazione usa la risposta prefetchata, senza una seconda richiesta. Su desktop il prefetch parte già dopo 90 ms di hover su un link, al tocco parte al contatto.
- **Le celle sono quelle vere.** Nel renderer delle pagine e in quello della Home ogni cella di card, foto e titoli si stacca nell'ordine della distanza dal punto toccato. Vola al centro su una traiettoria curva, ruota, si rimpicciolisce, si scalda verso l'ambra e si spegne arrivando sul sigillo (`EXIT` in `src/surfaces/shaders.ts` e `src/shaders.js`, uniform `uExit`).
- **Il resto del DOM segue lo stesso ordine.** Testi, dock, wordmark e foto non disegnati dalla GPU si staccano uno a uno: scendono di opacità, si rimpiccioliscono e si spostano verso il sigillo. Le tempistiche sono le stesse delle celle (`weave.leave`).
- **Il canvas della transizione non copre più la pagina.** Mostra solo le crepe ambra del reticolato sulle celle dell'interfaccia mentre partono e le schegge che formano il sigillo. Il nero compare dietro al sigillo solo quando lo schermo è già vuoto (`weave.veil`, 76–96% del movimento).
- **Fotogrammi lenti.** Se un fotogramma tarda, il movimento avanza di al massimo 50 ms e non resta mai indietro di oltre un quarto rispetto all'orologio. Così non salta in avanti.
- **Cronologia (indietro e avanti).** Il browser va subito; il movimento parte qui e la pagina nuova lo completa più in fretta (al massimo 420 ms) sopra l'ultimo fotogramma della vecchia. Se una navigazione viene annullata, o la pagina torna dalla cache, celle e DOM tornano al loro posto (`memento:scene-reset`).

## 2. Arrivo senza scatto

Perché scattava: i renderer partivano solo dopo la fine della transizione e nel primo momento libero del browser. La pagina restava visibile come HTML finché il renderer non la sostituiva.

Ora:

- Prima del suo primo paint la pagina che arriva segna `data-mm-arrive` (`scene-head`). I renderer partono subito sotto il sigillo, senza aspettare la fine della transizione né il momento libero (`src/paint.mjs`).
- **Il codice degli effetti si scarica con il documento.** Le pagine con effetti hanno `data-mm-effects` e l'elenco dei loro chunk (`data-mm-preload`). `scene-head` li richiede come `modulepreload` se la visita avrà gli effetti: stessa decisione di `vfxPolicy`, più WebGL2.
- **Il sigillo aspetta il primo fotogramma degli effetti** (`html.vfx-live`, evento `memento:effects-live`), al massimo 2,2 s dall'arrivo. Pagine senza effetti, `?vfx=off`, Save-Data, memoria bassa o WebGL2 assente non aspettano. Se un renderer fallisce non c'è attesa (`window.mementoEffects`). Mentre aspetta, il sigillo respira; la fase è presa dall'orologio, così è uguale nei due documenti.
- **La pagina si compone mentre il sigillo si apre.** La sequenza di caricamento (Cellule › Unione › Assestamento › Presente) resta ferma sotto il sigillo e parte all'apertura (`memento:scene-unfold`), in 1,35 s (`VFX.loading.arrive`) mentre il reticolato si apre (1150 ms, prima 700 ms). Nessun fotogramma HTML seguito dalla sostituzione.
- Un renderer pronto solo dopo l'apertura entra senza sequenza, come all'apertura diretta.
- All'apertura diretta di una pagina non cambia nulla: HTML al primo paint, effetti nel primo momento libero.
- La Start ha un renderer proprio: il sigillo ne aspetta comunque il primo fotogramma (`vfx-live`).

## 3. Hover vivo

Il reticolato statico in hover era un termine dello shader dell'overlay: una rete accesa intorno al cursore, sempre uguale. Ora è a zero (`HOVER_LATTICE` in `src/surfaces/shaders.ts` e `src/shaders.js`). Sotto il cursore restano solo le celle che la reazione a catena accende davvero: l'onda d'ingresso, le onde mentre il mouse si muove (`VFX.pointer.wave`, R16) e gli impulsi dell'hover fermo. È lo stesso meccanismo del tocco sui telefoni.

## 4. Ready to start

- **Portfolio**: la card sostituisce il vecchio link del footer (che puntava a mementostart.vercel.app) e porta a `/start/`.
- **LevelUp**: la card sostituisce il riquadro con l'iframe di visualfx.vercel.app. Mantiene `id="contact-link"`, così l'app di LevelUp continua a scrivere la destinazione con l'esperienza scelta (`/start/?from=levelup&…`). Nessun iframe nella pagina, tranne le demo dei progetti.
- **Servizi**: resta la sua card (`#finale`).
- La card è la stessa di Servizi (`scripts/native-page.mjs`, `readyCard`; stile in `public/memento-ui/ready-to-start.css`; foto `public/memento-ui/ready-to-start/sparkle.webp`). Con gli effetti la disegna il renderer (`data-vfx="card"`: celle, foto, luce del bordo, reazione a catena). Senza effetti resta la card HTML, con l'hover CSS di Servizi. La grafica dedicata arriverà in una prossima release.

## File

- `scripts/scene-head.mjs`: uscita rinviata e prefetch, pezzi del DOM, attesa degli effetti, preload, `data-mm-arrive`, chiave `memento.route.handoff.v5`.
- `scripts/scene-material.mjs`: uscita senza copertura (`veil`, `leave`, `crack`), avanzamento limitato sui fotogrammi lenti, sigillo che respira.
- `scripts/native-page.mjs`, `scripts/section-releases.mjs`: card Ready to start, `data-mm-effects`, `data-mm-preload`.
- `scripts/routes.mjs`, `vite.config.js`: `data-mm-effects` sulla Home.
- `src/paint.mjs`: `arriving()`, `announceEffects()`.
- `src/surfaces/engine.ts`, `src/surfaces/index.ts`, `src/renderer.js`, `src/main.js`: uscita, sequenza trattenuta sotto il sigillo, `memento:effects-live`, nessuna pausa durante il cambio pagina.
- `src/surfaces/shaders.ts`, `src/shaders.js`: `EXIT`, `HOVER_LATTICE`.
- `src/vfx/config.mjs`: `VFX.loading.arrive`.
- `public/memento-ui/ready-to-start.css`, `public/memento-ui/ready-to-start/sparkle.webp` (nuovi).
- `tests/r17.test.mjs` (nuovo); `tests/native.test.mjs` e `tests/r16.test.mjs` aggiornati alla nuova navigazione.

## Verifica del 23 novembre 2026

- `npm test`: 60 test superati. `npm run build`: riuscita.
- Chrome headless con renderer software e transizioni fra documenti attive. Catena Home → Servizi → Portfolio → LevelUp → Start → Home su desktop (1280 × 800, clic sul dock) e telefono (390 × 844, tocco). In ogni passaggio la pagina vecchia passa da `gather` a `hold`, la nuova da `hold` a `unfold`. Il sigillo si apre con gli effetti già attivi (`vfx-live`), tranne LevelUp su desktop: nel renderer software supera l'attesa massima di 2,2 s.
- Fotogrammi registrati: le celle di card e foto volano verso il centro, i pezzi del DOM si dissolvono nello stesso ordine, il sigillo si forma sul nero, poi si apre e compone la pagina nuova.
- Indietro e avanti: la pagina torna dalla cache intera e la transizione si chiude.
- Ready to start presente e funzionante su Servizi, Portfolio e LevelUp, sia con gli effetti sia con `?vfx=off`, desktop e telefono. LevelUp mantiene la destinazione con `from=levelup`.
- Console senza errori. Resta il 404 di `favicon.ico` su LevelUp, già presente prima.

## Non verificato

- Fluidità e tempi su GPU reali, iPhone e Android. Il renderer software di prova disegna a 3–6 fotogrammi al secondo durante uscita e composizione, quindi i tempi misurati qui sono più lunghi del reale.
- Safari: ha le transizioni fra documenti ma non le speculation rules; lì il prefetch è un semplice suggerimento al browser. Firefox: nessuna transizione, la pagina cambia direttamente, come prima.
