# Memento Servizi — V44.1 · Effetti, sfondo, touch e mobile di START V27

**V44.1** corregge gli shader che su Windows (Direct3D 11) mandavano in crash la GPU: lampi, schermo bianco, nessun effetto. Dettagli in `VFX_V44.md`.

Pacchetto completo per Vercel, sulla base della V43 (navbar V12 e overlay). Contenuti, caroselli, popup, filtri, hash, bozza email e navbar restano quelli della V43. Al catalogo si aggiungono testi, tavole, VFX, sfondo, reazione touch e migliorie mobile di START V27, cioè lo stesso motore della LevelUp V20. Il motore e lo sfondo sono già compilati in `public/vfx/`: il deploy non richiede dipendenze npm né variabili d'ambiente.

La navbar resta il kit 12.0.0 della V43, con Services attivo in ambra (vedi `NAV_OVERLAY_V43.md`). Leggere `VFX_V44.md` per estensioni, verifica e limiti noti.

## Cosa cambia rispetto alla V43

1. **Motore VFX di START V27.** Un canvas dietro il contenuto disegna ogni superficie registrata con lo stesso materiale: monocromo a riposo, energia ambra portata da una reazione a catena di celle in hover, al tocco e al focus.
   - **Testi**: “Servizi di design.” e i sei titoli di categoria hanno un gradiente monocromo a riposo. In hover e al tocco riprendono il gradiente ambra, con celle luminose dentro le lettere e brevi emissioni, poi tornano monocromi. Senza WebGL lo stesso tocco scalda brevemente i titoli nel DOM.
   - **Tavole**: bundle, servizi dei caroselli, tessere del catalogo, Start e le quattro tavole di ogni popup. In hover la fotografia prende una gradazione ambra della propria luminanza, il reticolo si accende e le celle vicine al bordo alimentano il vero edge glow, anche al tocco. Come in START, la tipografia delle tavole è in un solo colore.
   - **Grana**: assente, sia negli effetti sia nello sfondo.
2. **Reazione touch.** Ogni tocco avvia un'onda che percorre il reticolato esistente e raggiunge le superfici vicine in tempi diversi, a rami brevi e irregolari, senza cerchi. Sulle tavole dei caroselli l'onda segue la loro trasformazione 3D e si ferma ai bordi del carosello. Lo scroll nativo non interrompe un'onda già partita.
3. **Sfondo Ghost Fibers** (preset rosso/ambra a cinque layer). Ha un budget separato: al massimo 30 render/s, DPR 1, risoluzione adattiva. Parte 350 ms dopo il contenuto. Si ferma ed è sfocato con il catalogo mentre un popup è aperto. Non viene montato quando un host compatibile (`?mementoEmbed=1`) possiede la superficie.
4. **Migliorie mobile.**
   - Il canvas è ancorato al documento e mosso dallo scroll nativo, inerzia iOS compresa, con margine sopra e sotto.
   - Un cambio della sola altezza (barre del browser) ridimensiona i buffer senza ridisegnare testi e tavole.
   - Foto a colori a riposo sui dispositivi touch. Le tavole laterali restano grigie come nel DOM.
   - Contenuto e navbar visibili subito, senza velo di avvio: il DOM resta visibile finché una superficie non è pronta sulla GPU.
   - Superfici fuori viewport sospese, ciclo limitato a 60 Hz e fermo con la scheda nascosta. Nessun contesto WebGL di prova.
   - **Solo Servizi**: ogni fotografia va sulla GPU alla risoluzione a cui viene disegnata (su telefono la variante da 640 px invece di quella da 1536). Solo le superfici entro circa una viewport e un quarto dallo schermo vengono preparate. Oltre tre viewport le texture vengono rilasciate e la superficie torna al DOM finché non si riavvicina.
5. **Popup.** Il dialogo nativo sta nel top layer del browser, sopra il canvas della pagina. Per questo ha un secondo motore con un canvas proprio, creato alla prima apertura e fermo a popup chiuso. Mentre un popup è aperto, il motore della pagina si ferma e il suo canvas viene sfocato insieme al catalogo. La lista dei servizi inclusi e il pulsante finale restano DOM, con i loro stati di hover e focus.

## Cosa cambia a vista

- **Riposo monocromo, come START**: titoli con gradiente grigio, cornici neutre. L'ambra arriva solo con l'energia. Sostituisce il gradiente avorio/ambra a riposo introdotto nella V40.
- **Desktop**: con gli effetti attivi, anche la fotografia della tavola attiva è monocroma a riposo e diventa ambra in hover, come in START e LevelUp. Su touch le fotografie sono a colori.
- **Fondo**: nero puro con le fibre (prima `#0b0c0d`).
- **Embed**: trasparenza solo con `?mementoEmbed=1`. Un embed Framer semplice riceve fondo nero e fibre, come START e LevelUp.

## Superfici VFX

| Superficie | Tipo | Note |
| --- | --- | --- |
| “Servizi di design.” e i sei titoli di categoria | `title` | Gradiente monocromo a riposo, ambra in hover e al tocco |
| Tavole dei bundle e dei sei caroselli | `card` | Trasformazione 3D del carosello, ritaglio e dissolvenza laterale, `--slide-focus`, doppia maschera della foto e velo sfocato del titolo |
| Tessere del catalogo | `card` | Maschera inferiore della foto e cornice che sfuma in basso, intera in hover. La freccia resta DOM |
| Start | `card` | Scultura con la sua maschera e opacità. L'edge glow sostituisce la luce perimetrale SVG |
| Tavole dei popup | `card` (motore del dialogo) | Come le tavole dei caroselli. La lista dei servizi inclusi e il pulsante finale restano DOM |

Restano DOM: filtri Digitale/Fisico, punti dei caroselli, navbar, scrollbar, pulsanti dei popup e il modulo LevelUp. Con *reduced motion* l'onda touch è spenta e lo sfondo è statico. Con *forced colors* o senza WebGL2 resta la pagina DOM. Un errore o la perdita del contesto tolgono `vfx-live` e riportano il DOM.

## Avvio e pubblicazione

È un sito statico, senza framework e senza dipendenze di produzione. Usa Node.js 20 o successivo per build e test. La build copia i file dell'allowlist e il motore già compilato (`public/vfx/` → `dist/vfx/`).

```sh
npm test
npm run build
python3 -m http.server 8000 --bind 127.0.0.1 --directory dist
```

Apri `http://127.0.0.1:8000`. I moduli ES devono essere serviti via HTTP; non aprire `index.html` con `file://`.

Su Vercel il file `vercel.json` imposta preset Other, nessuna installazione, comando `npm run build` e cartella `dist`. Il pacchetto contiene i sorgenti: la build genera la directory di pubblicazione. Non pubblicare `tests/`, `vfx/` o la documentazione come root del sito.

| Impostazione | Valore |
| --- | --- |
| Framework | Other |
| Build command | `npm run build` |
| Output directory | `dist` |
| Install command | Vuoto |
| Node.js | 20 o successivo |

`?vfxdebug` espone i motori in console (`window.__vfx` per la pagina, `window.__vfxEngines` per entrambi, con `metrics`). `?vfx=high|medium|low` fissa un profilo di qualità per i confronti; non usarlo nel deploy finale.

## Dove modificare il progetto

| File | Responsabilità |
| --- | --- |
| `src/content.js` | Configurazione, 6 categorie, 44 servizi, 6 bundle e relative tavole. Unica fonte dei contenuti, congelata ricorsivamente. |
| `src/media.js` | Convenzioni dei file immagine e varianti responsive. |
| `src/render.js` | Template puri per copertine, griglia, categorie e dettagli. Nessuno stato dell’interfaccia. |
| `src/carousel.js` | Posizione, gesto orizzontale, trackpad, tastiera, animazione e caricamento delle immagini vicine. |
| `src/dialogs.js` | Apertura/chiusura, hash, ritorno al bundle, focus, blocco viewport e bozza email. |
| `src/visuals.js` | Luce perimetrale Start (fallback DOM), comparsa dei titoli, indicatore di scroll. |
| `src/app.js` | Montaggio della pagina, filtro Digitale/Fisico, motori VFX della pagina e del popup, sfondo. |
| `bootstrap.js` | Superficie opaca o trasparente (`?mementoEmbed=1`), handshake con il parent, proporzioni prima del primo paint e regola del menu contestuale. |
| `styles.css` | Fondamenti, card, caroselli, pagina, dialoghi, CTA, accessibilità e, nella sezione 6, livello VFX e sfondo. |
| `vfx/` | Sorgenti TypeScript del motore VFX (START V27) e dello sfondo Ghost Fibers, con i test. Le estensioni Servizi sono marcate `Servizi` nel codice e raccolte in `servizi.ts`. |
| `public/vfx/` | Motore e sfondo compilati da `vfx/`, pubblicati in `dist/vfx/`. |
| `memento-services-host.js` | Helper opzionale da caricare nel documento che ospita l’iframe. |

Per aggiungere un servizio, aggiungi un oggetto a `catalogue.services`, collegalo a una categoria tramite `services` e, se serve, a `featured`. Ogni servizio ha quattro tavole. Per un bundle, usa `covers` e una tavola `components` con gli stessi ID. Esegui `npm test`: segnala riferimenti mancanti, duplicati e immagini assenti.

Non aggiungere nuovi file `polish-vXX.css` e non modificare i dati dopo il caricamento. Correggi la regola nel componente che ne è responsabile. Le scritture al DOM servono solo a mostrare lo stato locale dell’interfaccia; non riscrivono il catalogo.

## Responsive e immagini

La larghezza del contenuto parte da 320 px sui telefoni e cresce fino a 1720 px, mantenendo i margini condivisi. Tra 768 e 1024 px `bootstrap.js` interpola il rapporto delle card da 1:1 a 2:1. CSS e motore del carosello leggono le stesse variabili `--layout-wide` e `--board-ratio`.

La fotografia rimane ancorata in basso a destra. Una maschera continua passa dalla sfumatura superiore a quella laterale; la protezione del titolo segue lo stesso ritaglio. Nei popup la dimensione è limitata anche dall’altezza disponibile. Le liste dei bundle sono dimensionate per rientrare nella card alle misure ordinarie. Lo scroll nativo resta un fallback per viewport particolarmente bassi o testo ingrandito: nessun contenuto viene troncato per nasconderlo.

I nomi `v28`, `v29` e `v34` negli asset identificano fotografie già approvate, non fogli di patch. Le immagini originali sono conservate byte per byte. `media.js` costruisce gli URL delle varianti esistenti; i test verificano ogni variante.

## Embed

La navbar locale è visibile in standalone. In un iframe con handshake Memento V2 compatibile si nasconde e la navigazione è gestita dal parent. Senza handshake compare dopo 1,2 secondi con destinazioni nel documento superiore. Evitare un secondo overlay esterno Framer privo di bridge sopra quello integrato.

Come START e LevelUp, la pagina è trasparente e senza sfondo proprio solo quando l'host la incorpora con `?mementoEmbed=1`. In ogni altro caso, standalone o embed Framer semplice, è opaca con le proprie fibre. Per il blur del documento ospitante, mantieni l’helper nel parent e marca l’iframe:

```html
<iframe data-memento-services src="https://mementoservizi.vercel.app/" title="Servizi Memento"></iframe>
<script src="memento-services-host.js"></script>
```

L’helper valida origine e finestra del messaggio; non usa `postMessage` con origine `*`. Il blur del catalogo interno è gestito separatamente, su una sola superficie grande quanto il viewport. Il `body` non viene fissato né spostato all’apertura del dialogo.

I link `#servizio/ID`, `#bundle/ID`, `#percorso-ID` e gli alias storici restano supportati. La CTA apre `https://mementostudio.it/start` nel documento superiore. `#levelup` resta disponibile per i vecchi link e prepara soltanto una bozza email: non invia nulla.

## Verifiche riproducibili

`npm test` usa soltanto il test runner di Node (integrità del catalogo e integrazione VFX). Per le verifiche browser opzionali installa Playwright nell’ambiente di sviluppo:

```sh
npm install --no-save --package-lock=false playwright
npx playwright install chromium
npm run test:browser
```

La suite avvia un server su loopback e controlla proporzioni, overflow, breakpoint adiacenti, tutte le tavole a 320 e 820 px, iframe, scroll, tap, drag, focus, tastiera, filtri, hash e bozza email. La suite degli stati visivi verifica selezione nei popup standalone e iframe, Seleziona tutto, trascinamento, pressione touch prolungata, colori delle card laterali durante le animazioni, stati dei titoli e copia della bozza. La suite dedicata ai bundle verifica inoltre miniature quadrate, elenco verticale, assenza di scroll parassita, ingombro delle card durante la rotazione, grayscale/hover/focus e selezione nei campi. I risultati vengono scritti in `test-results/`, escluso dalla build. In un ambiente con browser già installato sono supportate le variabili `PLAYWRIGHT_MODULE` e `CHROMIUM_EXECUTABLE`. Chromium headless ha WebGL2 software, quindi la suite gira con gli effetti attivi; `SERVIZI_DOM=1` disattiva WebGL e verifica la pagina DOM di fallback.

Il motore va ricompilato solo se si modificano i sorgenti in `vfx/`:

```sh
cd vfx
npm install
npm test         # motore, onda touch, tavole trasformate, scroll, maschere, residenza delle texture
npm run build    # → ../public/vfx/
```

Leggi `VFX_V44.md` per la verifica di questa versione, `AUDIT.md` per quella della base V40 e `DESIGN_SYSTEM.md` per le regole visive. Lo sfondo deriva da React Bits: licenza in `docs/ReactBits-LICENSE.md`.
