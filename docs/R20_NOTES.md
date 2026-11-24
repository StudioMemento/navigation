# R20 — sfondo di lettere, margini, cambio pagina

## Richiesta

- Integrare lo sfondo Letter Glitch di React Bits Background Studio (`preset=pixel`, `glitchColors=f97316`, `baseColor=f97316`, `characters=MEMENTO`, `fontSize=8`, `spacing=0.5`, `density=0.25`, `baseOpacity=0.1`, `speed=0.05`, `cursorRadius=400`, `clickEffect=burst`). Deve avere un fade graduale verticale che parte dal padding, così il contenuto resta leggibile. Al posto dei caratteri vanno le lettere vettoriali del logotipo MEMENTO (`DEV_20_Typo.svg`).
- Easter egg: ogni tanto lo sfondo decripta e compone il logotipo, con un effetto a catena che indica dove è successo.
- Regole di padding: 10-80-10 su mobile, 15-70-15 su tablet, 20-60-20 su desktop, 30-40-30 su ultrawide. Da mobile il riferimento è Start, dove logotipo, padding e navbar coincidono, e l'allineamento va replicato su tutto il sito.
- Durante la transizione il nome della pagina rispetta il padding e ha lo stile dei titoli, già in hover. Anche lo sfondo resta attivo: cambia solo il contenuto.

## Come è stato interpretato

- Il padding è orizzontale: indica i margini a sinistra e a destra. Il "fade verticale" è una sfumatura lungo i bordi verticali del contenuto. Lo sfondo vive nelle due fasce laterali, pieno sul bordo dello schermo e trasparente dove comincia il contenuto.
- Le fasce sono: telefono sotto i 768 px; tablet da 768 a 1279 px; desktop da 1280 px; ultrawide da 1600 px con proporzioni almeno 2.1:1, per esempio 2560×1080 o 3440×1440.
- Sui telefoni tutte le pagine usano la colonna di Start: logotipo, contenuto e navbar sono larghi l'80% dello schermo. Su tablet, desktop e ultrawide la larghezza del contenuto non cambia. Il padding governa solo lo sfondo e il nome durante il cambio pagina.
- Studio è una stanza 3D che riempie lo schermo e copre lo sfondo. Lì le lettere si vedono durante il cambio pagina e poi sfumano sulla stanza in 0,8 s. A quel punto il loop si ferma.

## Cosa cambia

1. **`public/memento-ui/letters.mjs`** contiene lo sfondo.
   - **Glifi.** Le cinque forme del logotipo (M, Ξ, N, T, O) sono tracciati vettoriali su un box unitario. Sono pre-renderizzate in sprite per ogni colore, alla densità dello schermo.
   - **Campo.** È una griglia con passo 12 px (8 px × 1,5 di spacing), solo nelle fasce dei margini. L'occupazione (25%) e la lettera di ogni cella vengono da un hash stabile. Così il campo è identico su ogni pagina della stessa misura e nel cambio pagina non salta nulla.
   - **Glitch e animazione.** Il glitch accende brevi sequenze lungo le righe e le cifra. Il disegno è incrementale: ridipinge solo le celle cambiate, al massimo 30 fotogrammi al secondo. Si ferma quando la scheda è nascosta. Resta fermo con reduced motion, `?vfx=off` e Save-Data, e non appare con forced colors né in stampa.
   - **Cursore e clic.** Il cursore smuove il campo entro 400 px. Il clic (o il tap) apre un anello di accensioni.
   - **Easter egg.** Il primo tentativo arriva tra 7 e 13 s, i successivi ogni 16–30 s. Una fila di celle si cifra per 0,85 s e poi si blocca una lettera alla volta su MΞMΞNTO, che si accende. Da lì un'onda si propaga alle celle vicine e indica il punto. Dopo 1,7 s la parola si cifra di nuovo e torna nel campo. Sui telefoni, dove la fascia è stretta, la parola è verticale.
2. **`public/memento-ui/padding.mjs`** definisce le regole dei margini. La usano lo sfondo e il cambio pagina.
3. **Strato `.mm-letters`.** È scritto in build all'inizio del `<body>` di ogni pagina (`lettersLayer` in `scene-head.mjs`, usato da `native-page.mjs` e dalla Home in `vite.config.js`). È `position:fixed`, `z-index:-1` e senza eventi. Il body delle pagine è trasparente, così il fondo `#090909` resta sull'`html`. Le pagine lo caricano da `site.mjs`, la Home da `index.html`.
4. **Telefono.** `site.css` imposta `--memento-overlay-width:80vw` e `--memento-overlay-gutter:0` per la navbar, `--content-width:80vw` per Services, Projects e LevelUp, e `.content-width` a `80vw` in Start. Nella Home la card è larga l'80% (`layout` in `src/model.mjs`).
5. **Cambio pagina.**
   - **Il nome.** `createMaterial(name, weave, paddingOf)` giustifica le lettere dal margine sinistro a quello destro, misurando l'inchiostro reale di ogni lettera. Il nome è in Inter 300 con gradiente dal crema all'ambra. Dentro le lettere c'è una maculatura di faccette irregolari di misure diverse, crema e pesca in alto, pesca e ambra in basso. All'esterno c'è un alone caldo, senza contorno. È lo stile dei titoli in hover, con riferimento a "LET'S WORK TOGETHER".
   - **Ordine dei livelli.** Durante il cambio lo sfondo sale sopra il materiale (999 contro 998; l'indicatore di scroll è a 997). Tra i due documenti lo sfondo è un gruppo di view transition a sé, `mm-bg`, tra il materiale (2) e la navbar (4). Resta visibile quello uscente finché quello entrante non ha disegnato il primo fotogramma (`data-mm-bg`).
   - **Esclusione.** Lo sfondo non si scompone: è nella lista `artwork` di `scene-head.mjs`.

## Nota tecnica

`contain:strict` sullo strato con `view-transition-name` fa sparire l'intera transizione in Chrome: lo schermo resta tutto `#090909` per la durata della view transition. Lo strato non lo usa, e `tests/r20.test.mjs` lo verifica.

## Verifica

- `npm test` passa con 70 test, `npm run test:apps` con tutte le pagine. `npm run build` è completato.
- Ho controllato in Chrome (SwiftShader) a 390×844, 1024×768, 1440×900, 1600×900, 1920×1000 e 2560×1080:
  - lettere nei margini;
  - colonna all'80% su telefono in Home, Start, Services, Projects e LevelUp;
  - easter egg con l'onda;
  - transizioni Start → Services, Start → Projects (telefono) e Start → Studio, con lo sfondo sempre presente e il nome tra i margini.
