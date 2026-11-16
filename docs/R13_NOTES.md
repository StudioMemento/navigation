# R13 — allineamento alla START V27

## Richiesta

Applicare al NAV visual, VFX, sfondo, effetti dei testi delle tab e ottimizzazione mobile sviluppati sulla START (V24–V27). Segnalazione: nella R12 i titoli di Projects e LevelUp non avevano gli effetti di hover.

## Bug dei titoli (R12)

Causa: il renderer dipingeva i titoli (texture, campo di distanza, rete di celle) solo per le tab sullo schermo all'avvio (Studio, Services, Start) e, una volta finiti, smetteva di controllare. Projects e LevelUp restavano con il titolo DOM: nessun gradiente ambra, range, reticolo o glow, e la classe `title-ready` non veniva mai aggiunta. Correzione in `src/renderer.js`: tutti e cinque i titoli vengono preparati, uno per frame, dalla tab più vicina. Verificato nel browser: dopo il caricamento tutte e cinque le tab hanno `title-ready`, e con il puntatore sulle tab Studio, Projects e LevelUp il titolo è disegnato dall'engine con il gradiente acceso (calore 0,97).

## Cosa è stato portato dalla START

- **V24** — sfondo Ghost Fibers con budget separato (30 disegni/s, DPR 1, risoluzione adattiva), montato 350 ms dopo il primo paint e caricato come chunk separato; canvas delle superfici trasparente sopra lo sfondo; profili più bassi senza tagli a bloom, particelle e celle; MSAA ×2 solo sul profilo alto; loop limitato a 60 render/s; contenuto DOM visibile al primo paint.
- **V25** — preset a cinque layer rosso/ambra, grana 0 nello sfondo e nel grade (niente dithering animato); scene a colori a riposo sui dispositivi senza hover.
- **V26** — un dito fermo non alimenta l'hover; un solo contatto per tocco, non duplicato da rilascio o `pointercancel`; i testi cambiano colore dell'inchiostro senza duplicarne la copertura; fallback DOM che scalda brevemente i titoli raggiunti; maschere direzionali del blur della navbar.
- **V27** — percorsi connessi lungo le adiacenze del reticolato, con rami brevi e arrivi sfalsati; le celle vicine al bordo alimentano l'edge glow; titoli con gradiente ambra, celle luminose e scintille; acquisizione del contatto al primo frame utile; massimo quattro contatti e 96 celle per superficie e contatto; superfici fuori schermo che non riproducono contatti vecchi.
- **Kit navbar** — icone della dock `*-nav.webp` (4–8 kB) del kit 12.1.0 al posto dei thumb (0,4–0,75 MB). Restano le scelte della navigation: icona della sezione attiva accesa, altezza del viewport calcolata dalla navigation.

## Adattamenti

- **Ghost Fibers senza React.** `src/background/ghost-fibers.mjs` è generato dal componente della V27: stessi shader, loop e budget, dentro una funzione di montaggio. Unica aggiunta: il blur del 20% alto e basso nello shader di uscita, perché nella navigation quel blur è composto in WebGL e non con livelli CSS sopra i canvas.
- **Tocco su piani in prospettiva.** Il contatto viene pianificato con la posizione sullo schermo di ogni cella, proiettata dal piano della tab, e con il punto toccato riportato nei px della tab o del titolo. Le regole di tempi, budget, rami e bordo sono quelle della V27 (`src/vfx/touch.mjs`).
- **Ordine dei livelli.** Sfondo, canvas delle tab, DOM (frecce e anello di focus sopra il canvas), navbar.

## Verifica del 16 novembre 2026

- `npm test`: 29 test superati (21 della R12, 8 portati dalla V27: pianificazione sparsa e connessa, arrivi, decadimento ed edge glow, superfici fuori schermo, primo frame lento e frame perso, tavole vicine prima delle lontane, limite dei contatti e listener passivo, preset dello sfondo e assenza di grana, profili).
- `npm run build`: riuscita. JS principale 629 kB (169 kB gzip), sfondo 29 kB (10 kB gzip) caricato a parte.
- Chrome headless con renderer software (SwiftShader), console senza errori.
  - 1440 × 900: caricamento, riposo con sfondo, hover sui titoli di Studio, Projects e LevelUp.
  - 390 × 844 touch, con e senza sfondo: scene a colori a riposo, tocco reale sul margine. Dopo circa 0,3 s si accendono 32 celle della tab, dopo 0,6 s 70 su 638; il bordo arriva a 0,8, il titolo viene raggiunto (0,7), poi tutto si spegne e il loop torna a riposo.
  - Senza WebGL, 390 × 844: scene a colori, titolo raggiunto dal tocco scaldato per circa 0,3 s, poi di nuovo spento.
  - Frecce sopra il canvas.

## Non verificato

- **GPU e telefono reali.** Il renderer software disegna lo sfondo a pochi fotogrammi al secondo: nessuna misura di fps. Con lo sfondo la pagina ha due contesti WebGL, come la START: il peso su telefoni meno recenti va provato sul dispositivo.
- **Safari e Firefox**, compresi i gesti nativi e le barre del browser dentro l'iframe di mementostudio.it.
- **Velocità reale.** Gli stati sono stati controllati fotogramma per fotogramma con `?qa=1`, non a velocità reale.
- **Correttivo Framer della START.** `framer-start.mjs` riguarda l'embed della pagina Start e non è stato portato. Il NAV riceve già l'altezza dal genitore tramite il proprio bridge; se l'embed della navigation su Framer avesse lo stesso problema dei 100vh, va verificato sul sito.
