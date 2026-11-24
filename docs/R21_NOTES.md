# R21: sfondo sul viewport, transizione nel linguaggio delle card, un solo arancione, padding forzato, niente freeze

## Richiesta

1. Sfondo: la sfumatura deve cominciare gradualmente nel margine ed entrare leggermente oltre il padding. Click ed easter egg devono propagarsi su tutto il viewport con un impulso casuale che si spegne dopo la cresta e torna all'idle, senza effetto "disco".
2. Il nome della pagina nella transizione non deve essere sgranato.
3. La transizione deve avere lo stesso linguaggio delle card. Si parte dalla scomposizione del contenuto dentro il padding, che compone il nome; poi la nuova UI si compone allo stesso modo.
4. Forzare il padding per valutarlo: 10-80-10 telefono, 15-70-15 tablet, 20-60-20 desktop, 30-40-30 ultrawide. Gli slider di Services e LevelUp devono restare edge to edge.
5–6. Un solo arancione, `#FF7950`, con una variante light per highlight e UI.
7. A volte, cambiando scheda o pagina, il disegno della scena si interrompe e resta tutto fermo.

Consegna: deploy su GitHub (push su `main`, Vercel si aggiorna da solo) e uno ZIP del sorgente da conservare.

## Cosa cambia

### 7. Niente più scena congelata

Il motore effetti delle pagine (`src/surfaces/engine.ts`) teneva l'id di un `requestAnimationFrame` chiesto prima che la pagina fosse congelata (scheda in background) o messa nella cache back/forward. Quel fotogramma poteva non arrivare mai. `wake()` vedeva l'id e credeva il loop vivo, così la scena restava sull'ultimo fotogramma, per esempio a metà scomposizione.

- **Motore delle pagine.** Una richiesta vecchia più di un secondo senza fotogrammi viene annullata e rifatta. Il loop lascia il fotogramma su `pagehide` e `freeze` e riparte su `pageshow`, `resume`, `focus` e `visibilitychange`.
- **Stessa regola altrove.** Vale anche per la Home (`src/main.js`), per lo sfondo di lettere e per l'animazione del cambio pagina.

### 5–6. Un solo arancione

| Token | Colore | Uso |
| --- | --- | --- |
| `--memento-accent` | `#FF7950` | puntini attivi, bordi, linee di focus, icone, tab attive, energia |
| variante light | `#FFAF96` | etichette (BUNDLE DI SERVIZI), testi in hover, focus ring, highlight |

- **Gialli e ori sostituiti.** I gialli e gli ori rimasti dalla costruzione delle pagine sono sostituiti (`#f2a10a`, `#dfad6b`, `#c98b42`, `#ecc089`, `#ffcb72`…). Riguarda Services, Start, LevelUp, Projects, navbar, icone, scrollbar e shell.
- **Energia del motore.** La scala ambra (`VFX.color.amber`) è ora fatta di toni di `#FF7950`: deep `#6F3523`, mid `#D16342`, hot `#FF7C55`, core `#FFBAA5`. Il range dei titoli (`titleHot`) non è più giallo. Il reticolo nei titoli e la scia degli shader usano la variante light.
- **Gradiente dei titoli.** Va dal crema a `#FF7950` (`#ffece7 → #ffd4c7 → #ffa88e → #ff7950 → #d66643`). Ogni tappa ha la luminosità di quella di prima, quindi i titoli a riposo (grigi) restano identici.
- **Verifica.** Un test controlla che nessun colore caldo dei file del sito abbia una tinta diversa da `#FF7950`.

### 4. Padding forzato sul contenuto (da valutare)

- **Colonna di contenuto.** In `site.css` la variabile `--mm-pad` vale 10/15/20/30% secondo le stesse fasce di `padding.mjs`. Le pagine prendono `--content-width: calc(100vw - 200vw * var(--mm-pad))`, compresi Start (`.content-width`) e la card della Home (`layout()` in `src/model.mjs`). La colonna di Start su ultrawide della R20 è tolta.
- **Slider edge to edge.** Il bordo degli slider sfumava su quasi tutto il margine laterale (43% dello spazio attorno alla slide), e con il contenuto stretto le slide vicine sparivano. Ora sfuma solo al bordo dello schermo: `min(…, clamp(36px, 6vw, 140px))`. In Services e LevelUp le vicine tornano a toccare i bordi del viewport. Il portfolio di LevelUp porta le vicine al bordo dello schermo, non più al bordo del contenuto.
- **Rollback.** Basta togliere il blocco "R21" in fondo a `site.css` e la riga `pad` in `layout()`.

### 1. Sfondo di lettere

- **Sfumatura a cavallo del padding.** È piena fino al 40% del margine, sfuma con una smootherstep e sparisce al 130% del margine, quindi un po' dentro il contenuto (`LETTERS.fade`, `fieldMask`). Il colore è `#FF7950`; le celle accese usano la variante light.
- **Campo su tutto il viewport.** A riposo si vede solo nei margini.
- **Impulso.** Un click (o un tap) e ogni parola decriptata mandano un impulso su tutto il viewport (`LETTERS.wave`).
  - Ogni cella che raggiunge sale a un'intensità casuale e poi si spegne con un suo tempo, tra 0,38 e 0,7 s.
  - Il fronte è strappato da un rumore lento e le celle accese sono rade, quindi non è mai un disco.
  - Sopra il contenuto l'impulso arriva al 45% dell'intensità; durante il cambio pagina resta nei margini.
- **Easter egg.** L'onda locale è sostituita dall'impulso, che parte dalla parola e indica dove è successo.

### 2–3. Transizione nel linguaggio delle card

`scripts/scene-material.mjs` è riscritto secondo il DNA (`docs/dna`).

- **Rete.** Una rete irregolare di triangoli di misure miste: lattice esagonale molto spostato, ogni quadrilatero diviso sulla diagonale più corta, alcune celle divise in quattro. Prende il posto del reticolo regolare.
- **Uscita.**
  - L'ambra corre a catena solo negli spigoli delle celle sopra il contenuto tra i margini, più densa sopra l'interfaccia, e si spegne. Il fronte è strappato come quello dello sfondo.
  - Dove passa la catena il contenuto si rompe in schegge di ossidiana: faccia grafite, spigolo acceso che si raffredda in volo.
  - Le schegge atterrano sulle faccette del nome, che si compone faccetta per faccetta dove atterrano, con un lampo della cresta.
- **Arrivo.** Il nome si rompe faccetta per faccetta. Le sue schegge volano verso la nuova interfaccia e le celle sopra di essa si aprono, con la catena negli spigoli.
- **Nome nitido.**
  - Lo sprite è disegnato alla risoluzione piena dello schermo (fino a 3×, prima al massimo 1,5×) e posato pixel su pixel, senza ridimensionamenti durante la composizione.
  - Le faccette sono grandi (12% del corpo, mai sotto 9 px) con toni morbidi; il reticolo è un filo di un pixel. È la materia di un titolo in hover: crema in alto, `#FF7950` alla base, luce sul bordo, alone. Prima la grana veniva da faccette di 3 px e dal canvas a risoluzione ridotta.

## Verifica

- **Test.** `npm test` passa con 75 test, compresi i nuovi `tests/r21.test.mjs`; `npm run test:apps` passa con tutte le pagine; `npm run build` va a buon fine.
- **Sandbox: Chrome con SwiftShader**, motore attivo con `?vfx=high`.
  - Padding a 390×844, 1024×768, 1440×900 e 2560×1080; slider edge to edge su Services e LevelUp.
  - Impulso del click e dell'easter egg.
  - Transizioni Start → Services (desktop) e Start → Projects (telefono).
  - Ritorno indietro con il motore che riparte.
- **Dopo il deploy:** controllo in produzione con GPU vera.
