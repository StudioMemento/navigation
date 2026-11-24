# R22: palette Ambra, colore a riposo, superficie controllata, sfondo continuo, transizione piena, stesso ritmo

## Richiesta

1. Palette "Ambra" su tutto il sito.
2. Lo sfondo si blocca durante la transizione e rompe la continuità.
3. La transizione crea un reticolato colorato solo di contorni e un insieme di triangolini colorati. Deve invece essere un solo insieme di triangoli pieni che riprendono l'elemento di partenza, con ombreggiature diverse e un colore in linea con il sito: lo stesso effetto di scomposizione e composizione dello scroll.
4. Il nome della pagina resta fermo più del dovuto e dà un'impressione di attesa: serve lo stesso tempo di transizione per tutte le pagine.
5. Typo e immagini erano pensate senza sfondo. A riposo: immagini con un po' di colore (50%), in hover al 100% con gli effetti; titoli già con un leggero gradiente di colore, in hover gli effetti.
6. Su tutto il sito: niente selezione, niente tasto centrale, niente tasto destro.
7. Freeze e pagine che non caricano.

## Cosa cambia

### 1. Palette Ambra

`#FF7950` resta il colore di base. Schiarendo vira verso l'ambra, come il metallo che si scalda: mai verso il rosa, mai verso il giallo acido.

| Ruolo | Colore |
| --- | --- |
| base (`--memento-accent`) | `#FF7950` |
| light (`--memento-accent-light`): etichette, testi in hover, focus, highlight | `#FFA94D` |
| core: nucleo dei bagliori, scintille, cresta | `#FFD285` |
| deep: coda scura dei bagliori nel motore | `#8C3510` |

- **Energia del motore** (`VFX.color.amber`): deep → base → light → core.
- **Gradiente dei titoli:** va dal crema all'ambra (`#fff0d9 → #ffdb9f → #ffb259 → #ff7950 → #d66643`). La luminosità di ogni tappa resta quella di prima.
- **Range dei titoli:** `#ffe6be`, `#ffd896`, `#ffb259`.
- **Applicazione:** sostituisce la variante rosa della R21 in tutti i file del sito: pagine, navbar, icone, sfondo di lettere, transizione, shader e token del DNA.

### 5. Colore a riposo

- **Foto.** Nel motore (`src/surfaces/shaders.ts`, `src/shaders.js`) una foto a riposo tiene metà del suo colore e l'hover le dà il resto, con gli effetti. Sui dispositivi senza hover resta piena come prima. Le slide vicine dei caroselli restano al 50%. Nel DOM (fallback senza effetti) `grayscale(1)` diventa `grayscale(.5)` ovunque: Services, Projects (anche il coverflow), Start, Home e Ready to start.
- **Titoli.** A riposo tengono il 30% del gradiente ambra (`idle = mix(grigio, ambra, .3)` negli shader). Il gradiente del DOM è la stessa tinta: `#9c7a70 → #ba9285 → #d2bba0 → #e9decc → #f6f1eb`. In hover si attiva il range con gli effetti, come prima.

### 6. Superficie controllata

È in `scene-head`, quindi vale per ogni pagina, Studio compreso.
- **Selezione:** `user-select: none` e niente callout al tocco lungo. Campi di testo e `contenteditable` restano selezionabili e modificabili.
- **Menu contestuale:** il tasto destro non apre più il menu, tranne sui campi.
- **Tasto centrale:** né autoscroll né link aperto in una nuova scheda (`mousedown` e `auxclick` con `button === 1`).
- **Trascinamento:** immagini e link non si trascinano fuori dalla pagina.

La tastiera mantiene tutte le azioni.

### 2. Sfondo continuo

- **Disegno dal primo fotogramma.** Lo sfondo di lettere partiva solo quando i moduli della pagina erano caricati. Fino ad allora la transizione mostrava l'istantanea ferma della pagina precedente, poi saltava. Ora `letters.mjs` è inserito in linea subito dopo il suo strato, in ogni pagina: disegna mentre la pagina viene ancora letta, prima del suo primo fotogramma, e la transizione passa subito a un campo vivo. Un solo campo per pagina (`window.__mementoLetters`); `site.mjs` e la Home non lo caricano più a parte.
- **Meno lavoro durante il cambio pagina.** Su touch l'impulso parte da un tap vero, non da ogni tocco per scorrere, e mai da un link o da un bottone.

### 3. Transizione: triangoli pieni, come lo scroll

- **Via contorni e triangolini.** Spariscono la catena di contorni colorati e i triangolini a contorno.
- **Colori dell'interfaccia.** `sceneOf` (in `scene-head`) legge per ogni elemento dell'interfaccia una griglia 3 × 3 dei suoi colori (le foto) o il gradiente dei titoli (il testo).
- **Frammenti.** Ogni frammento è un triangolo pieno del colore del pezzo da cui si stacca. Ruotando, la sua faccia prende luce in modo diverso, come le celle dello scroll. In volo vira verso il colore di dove atterra: il nome all'uscita, la nuova interfaccia all'arrivo.
- **Copertura in arrivo.** Le celle che si aprono sulla nuova pagina sono ossidiana, ognuna con la sua ombreggiatura (tre toni), e si chiudono nella pagina senza contorni.
- **Bagliore del nome.** Le faccette del nome che si compongono o si rompono hanno un lampo del nucleo ambra, pieno.

### 4. Stesso ritmo su ogni pagina

Il nome composto resta fermo 280 ms (`hold`) e poi la pagina si apre, qualunque cosa stia ancora caricando. Prima aspettava che la pagina fosse pronta (foto decodificate, primo fotogramma degli effetti), fino a 3,4 s su una pagina pesante. Ciò che non è pronto si compone sul posto, mentre le celle si aprono.

### 7. Niente transizioni che restano appese

- **Pagina che non arriva.** Se la prossima pagina non si apre entro 4,5 s (rete lenta), quella attuale torna com'era invece di lasciare il nome su uno schermo vuoto. La navigazione continua e la pagina nuova si apre senza transizione. Prima il limite era 30 s.
- **Motore.** Non resta più in attesa della copertura per sempre: dopo 5 s dalla nascita compone comunque.
- **Lavoro alleggerito.** Dalla R21 i loop ripartono dopo un congelamento. In più ora l'impulso dello sfondo non parte sui tocchi di navigazione, e l'attesa del nome è breve e fissa.

## Verifica

- **Test.** `npm test` passa con 81 test, compresi i nuovi `tests/r22.test.mjs`. `npm run test:apps` passa su tutte le pagine; il test di Services sulla quiete dei titoli è aggiornato alla tinta R22. `npm run build` va a buon fine.
- **Sandbox (Chrome SwiftShader).**
  - Un solo campo per pagina, attivo dal primo fotogramma; guardia di input e `user-select: none` su ogni pagina, Studio compreso. Nessun errore in console.
  - Transizione Services → Start: frammenti pieni nei colori della foto e del testo, nome in ambra, attesa breve, celle di ossidiana in apertura.
- **Dopo il deploy:** controllo in produzione con GPU vera.
