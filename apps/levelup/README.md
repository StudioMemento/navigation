# Memento LevelUp · V20 — effetti, sfondo, touch e mobile di START V27

Pacchetto completo per Vercel, sulla base della V19 (contenuti, caroselli, demo, confronti, step e Ready to start invariati). Include sorgenti, asset locali, font Inter, il motore VFX e lo sfondo già compilati e la build pronta in `dist/`. Il deploy non richiede dipendenze npm né variabili d'ambiente.

## Cosa cambia rispetto alla V19

1. **Motore VFX allineato a START V27.** Stesse costanti, stesso materiale; restano le estensioni LevelUp (board 3D dei caroselli, ritaglio e sfumatura laterale, focus, confronto prima/dopo).
   - **Testi**: al tocco il titolo riprende il gradiente ambra con celle luminose e brevi emissioni, poi torna monocromo. Senza WebGL lo stesso tocco scalda brevemente i titoli nel DOM.
   - **Tavole**: le celle vicine al bordo alimentano il vero edge glow, anche al tocco.
   - **Grana**: rimossa, sia dagli effetti sia dallo sfondo.
2. **Reazione touch (START V27).** Ogni tocco avvia un'onda che percorre il reticolato esistente e raggiunge le superfici vicine con tempi diversi, a rami brevi e irregolari. La maggior parte delle cellule resta spenta e non viene disegnato alcun cerchio. Le singole cellule si spengono in circa 450–700 ms.
   - Sulle board del carosello l'onda segue la loro trasformazione 3D e si ferma ai bordi del carosello.
   - Lo scroll nativo (pointercancel) non interrompe l'onda già partita. Il dito fermo non alimenta l'hover.
   - Limiti: quattro tocchi in memoria, 96 cellule per superficie e tocco. Le superfici fuori viewport non riproducono impulsi vecchi.
3. **Sfondo Ghost Fibers di START.** Preset rosso/ambra a cinque layer, senza grana. Ha un budget separato: al massimo 30 render/s, DPR 1 e risoluzione adattiva. Parte 350 ms dopo il contenuto, si ferma mentre una demo è espansa e si rimonta dopo una perdita del contesto. Non viene montato quando un host compatibile (`?mementoEmbed=1`) possiede la superficie.
4. **Migliorie mobile.**
   - Canvas degli effetti ancorato al documento e mosso dallo scroll nativo (inerzia iOS compresa), con margine sopra e sotto. Durante lo scorrimento non resta indietro rispetto al DOM.
   - Se cambia solo l'altezza della viewport (barre del browser), vengono ridimensionati i buffer senza ridisegnare testi e board. Viene ridipinta solo la superficie che cambia: per esempio un titolo riadattato.
   - Foto a colori a riposo sui dispositivi touch. Le board laterali mantengono il grigio del DOM legato al focus. Desktop invariato: monocromo a riposo, ambra in hover.
   - Contenuto e navbar visibili subito: niente velo nero di avvio. Il DOM resta visibile finché ogni superficie non è pronta sulla GPU (`[data-vfx-ready]`).
   - Superfici fuori viewport sospese. Ciclo `requestAnimationFrame` limitato a 60 Hz e fermo con scheda nascosta o host Tide non visibile. GSAP e ScrollTrigger eliminati: il motore pesa 619 kB invece di 733 kB.
   - Nessun contesto WebGL di prova per rilevare il supporto: un contesto in meno sui telefoni.
5. **Navbar kit 12.1.0 di START.**
   - Già presente nel primo paint (shadow DOM dichiarativo, un solo bundle `navigation/levelup.bundle.js` con le icone incorporate).
   - Altezza legata alla viewport visibile, sfocatura con maschere direzionali e listener passivi fuori dall'host.
   - Navbar visibile subito anche negli embed semplici. Viene nascosta solo con un host compatibile, che la disegna lui.
6. **Correttivo Framer facoltativo** (`FRAMER_LEVELUP_FIX.html`): lo stesso della pagina Start, applicato a `/levelup` e all'iframe di `mementolevelup.vercel.app`. Vedi sotto.

## Aggiornamento su Vercel

Usare il contenuto dello ZIP come root del progetto, sostituendo il pacchetto precedente.

| Impostazione | Valore |
| --- | --- |
| Framework | Other |
| Build command | `npm run build` |
| Output directory | `dist` |
| Install command | Vuoto |
| Node.js | 20 o successivo |

La build rigenera il bundle della navbar e il markup del primo paint in `index.html` a partire da `public/navigation/`, poi copia tutto in `dist/`.

### Framer (solo se serve)

Se la pagina Framer `/levelup` incorpora `https://mementolevelup.vercel.app/` con un embed URL in un contenitore 100vh, come la pagina Start, sul telefono logo e dock possono uscire dalla viewport in momenti diversi. In quel caso:

1. Completa il deploy della V20 su Vercel.
2. In **Framer → pagina LevelUp → Custom Code → End of body** incolla la riga di `FRAMER_LEVELUP_FIX.html`, poi pubblica.

Il modulo agisce solo sul percorso `/levelup` e sull'iframe di `mementolevelup.vercel.app`; altrove non fa nulla. Non va inserito dentro l'iframe. Se LevelUp arriva nella pagina attraverso l'hub/Tide e non con un embed URL, questo passaggio non serve.

## Superfici VFX

| Superficie | Tipo | Note |
| --- | --- | --- |
| I quattro titoli di sezione | `title` | Gradiente monocromo a riposo, ambra in hover e al tocco. Dopo il fit del font viene ridipinto solo quel titolo |
| Board dei domini e del portfolio | `card` | Disegnate con la stessa trasformazione 3D del carosello, ritagliate e sfumate dal carosello, attenuate con `--slide-focus` |
| Card "Immaginalo per il tuo brand" | `card` | Prima/dopo diviso dal range; la linea è del motore, la maniglia resta DOM (`data-vfx-dom`) |
| Card degli step | `card` | Maschera dell'immagine letta dal CSS |

Restano DOM: demo con iframe, punti dei caroselli, navbar, scrollbar e Ready to start, che è una pagina a sé. Con *reduced motion* l'onda touch è spenta e lo sfondo è statico. Con *forced colors* o senza WebGL2 resta la pagina DOM. Un errore o la perdita del contesto tolgono `vfx-live` e riportano il DOM. Il motore si ferma mentre una demo è espansa.

## Sviluppo e verifica

```sh
npm run dev      # http://localhost:4173
npm run build
npm test         # 20 test + verifica delle risorse di dist/
```

Il motore e lo sfondo sono in `vfx/` (TypeScript), già compilati in `public/vfx/`. Vanno ricompilati solo se si modificano:

```sh
cd vfx
npm install
npm test         # 51 test: onda touch, board trasformate, scroll, resize, navbar, struttura
npm run build    # → ../public/vfx/
```

`?vfxdebug` espone il motore in console (`window.__vfx`, con `metrics`). `?vfx=high|medium|low` fissa un profilo di qualità per i confronti; non usarlo nel deploy finale.

## File da aggiornare in futuro

- `vfx/src/`: motore VFX. Va sincronizzato con START quando cambia il DNA VFX. Le estensioni LevelUp sono marcate `LevelUp` nel codice e in `projective.ts`; `touch.ts` accetta anche il posizionamento delle board trasformate.
- `vfx/src/background/`: Ghost Fibers (React Bits, licenza in `docs/ReactBits-LICENSE.md`) senza React; preset in `preset.ts`.
- `src/vfx.css`: stato a riposo, regole `vfx-live`, livello del canvas, sfondo.
- `public/navigation/`: kit navbar 12.1.0. `scripts/build-navigation.mjs` genera bundle e primo paint.
- `public/ready-to-start/embed.html` e `src/ready-to-start.js`: incorporamento di VisualFX (vedi `READY_TO_START.md`).
- `src/content.js`: contenuti ed esperienze.

Verifica e limiti noti in `design-qa.md`. La consegna è uno ZIP: non aggiorna automaticamente il deploy pubblico.
