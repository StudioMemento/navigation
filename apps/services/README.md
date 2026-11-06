# Memento Servizi — V42 · Navbar e overlay

Navbar, logo Memento e blur progressivo superiore/inferiore del pacchetto `NAV_OVERLAY.zip` integrati nella pagina Servizi V41. Il kit V12 è copiato integralmente, con Services attivo in ambra, collegamenti canonici, target da 48 px e proporzioni condivise fra desktop e mobile. La build include `navigation/`.

Gli spazi iniziale e finale proteggono il contenuto dal dock e dalle fasce sfocate. Il link per saltare al catalogo resta sopra l'overlay. La navigazione è montata direttamente nel body, fuori dalle superfici filtrate della pagina; i dialoghi nativi mantengono il focus e il livello superiore.

Leggi `NAV_OVERLAY.md` per integrazione, verifiche e comportamento in iframe. I 531 file originali in `src/` e `assets/` sono invariati rispetto alla V41.

## Base V41 · VFX PASS

VFX PASS applicato alla base V40. Interazione di prossimità condivisa, contorni e materia triangolare sui glifi reali, bordo sottile sulle card, materializzazione iniziale e dissoluzione reversibile ai margini del viewport. Contenuti e asset fotografici restano quelli della V40.

Leggi `VFX_PASS.md` per configurazione, verifiche eseguite e limiti. I controlli della precedente V40 descritti più sotto non costituiscono una nuova certificazione browser della V41.

Rifinitura dei popup, degli stati colore e della tavola dei servizi inclusi, sulla base unificata delle versioni precedenti.

## Novità V40

- Selezione disabilitata anche sui `dialog` nativi: trascinamento, doppio clic e Seleziona tutto non evidenziano testi o immagini del dettaglio. La regola CSS sul solo `body` veniva scavalcata dallo stile nativo del popup. I campi e l’anteprima della richiesta conservano le operazioni di modifica e copia.
- “Servizi di design.” usa il gradiente avorio/ambra. I nomi del catalogo sono bianchi in idle e sfumati su hover/focus. Le fotografie mantengono il passaggio bianco e nero → colore.
- Nei caroselli solo la card attiva acquista colore, progressivamente mentre raggiunge il centro. Le card laterali restano interamente monocromatiche, comprese cornici e immagini sfocate.
- La tavola dei servizi inclusi combina elenco verticale, visual del bundle sfumato a destra, miniature con angoli tagliati e indicazioni discrete dei collegamenti. Su mobile il visual arretra per proteggere il testo; il bundle da quattro servizi continua a rientrare nella card quadrata.

## Avvio e pubblicazione

È un sito statico, senza framework e senza dipendenze di produzione. Usa Node.js 20 o successivo per build e test.

```sh
npm test
npm run build
python3 -m http.server 8000 --bind 127.0.0.1 --directory dist
```

Apri `http://127.0.0.1:8000`. I moduli ES devono essere serviti via HTTP; non aprire `index.html` con `file://`.

Su Vercel il file `vercel.json` imposta preset Other, nessuna installazione, comando `npm run build` e cartella `dist`. Il pacchetto contiene i sorgenti: la build genera la directory di pubblicazione. Non pubblicare `tests/` o la documentazione come root del sito.

## Dove modificare il progetto

| File | Responsabilità |
| --- | --- |
| `src/content.js` | Configurazione, 6 categorie, 44 servizi, 6 bundle e relative tavole. Unica fonte dei contenuti, congelata ricorsivamente. |
| `src/media.js` | Convenzioni dei file immagine e varianti responsive. |
| `src/render.js` | Template puri per copertine, griglia, categorie e dettagli. Nessuno stato dell’interfaccia. |
| `src/carousel.js` | Posizione, gesto orizzontale, trackpad, tastiera, animazione e caricamento delle immagini vicine. |
| `src/dialogs.js` | Apertura/chiusura, hash, ritorno al bundle, focus, blocco viewport e bozza email. |
| `src/visuals.js` | Luce perimetrale Start, comparsa dei titoli, indicatore di scroll. |
| `src/vfx.js` | Renderer condiviso, cache dei glifi, maschere triangolari e lifecycle. |
| `src/fx-config.js` | Raggio, durata, smoothing, densità e budget. |
| `src/fx-math.js` | Campo viewport e topologia deterministica. |
| `src/app.js` | Montaggio della pagina e filtro Digitale/Fisico. |
| `bootstrap.js` | Superficie trasparente in iframe, handshake con il parent e proporzioni prima del primo paint e regola del menu contestuale. |
| `navigation/` | Kit V12 originale: navbar, logotipo, blur, asset e bridge con l'hub. |
| `styles.css` | Fondamenti, card, caroselli, pagina, dialoghi, CTA e accessibilità. |
| `memento-services-host.js` | Helper opzionale da caricare nel documento che ospita l’iframe. |

Per aggiungere un servizio, aggiungi un oggetto a `catalogue.services`, collegalo a una categoria tramite `services` e, se serve, a `featured`. Ogni servizio ha quattro tavole. Per un bundle, usa `covers` e una tavola `components` con gli stessi ID. Esegui `npm test`: segnala riferimenti mancanti, duplicati e immagini assenti.

Non aggiungere nuovi file `polish-vXX.css` e non modificare i dati dopo il caricamento. Correggi la regola nel componente che ne è responsabile. Le scritture al DOM servono solo a mostrare lo stato locale dell’interfaccia; non riscrivono il catalogo.

## Responsive e immagini

La larghezza del contenuto parte da 320 px sui telefoni e cresce fino a 1720 px, mantenendo i margini condivisi. Tra 768 e 1024 px `bootstrap.js` interpola il rapporto delle card da 1:1 a 2:1. CSS e motore del carosello leggono le stesse variabili `--layout-wide` e `--board-ratio`.

La fotografia rimane ancorata in basso a destra. Una maschera continua passa dalla sfumatura superiore a quella laterale; la protezione del titolo segue lo stesso ritaglio. Nei popup la dimensione è limitata anche dall’altezza disponibile. Le liste dei bundle sono dimensionate per rientrare nella card alle misure ordinarie. Lo scroll nativo resta un fallback per viewport particolarmente bassi o testo ingrandito: nessun contenuto viene troncato per nasconderlo.

I nomi `v28`, `v29` e `v34` negli asset identificano fotografie già approvate, non fogli di patch. Le immagini originali sono conservate byte per byte. `media.js` costruisce gli URL delle varianti esistenti; i test verificano ogni variante.

## Embed

La navigazione locale è visibile nella pagina autonoma. In un iframe con host compatibile, il messaggio `INIT` del bridge Memento V2 la nasconde e la navigazione resta al parent. Senza handshake, dopo 1,2 secondi appare il kit locale con link nel documento superiore. Gli overlay Framer esterni privi di bridge non vengono rilevati automaticamente: evitare di caricare due navigazioni sulla stessa pagina.

La pagina rileva se si trova in un iframe e lascia trasparente il proprio sfondo. Per il blur del documento ospitante, mantieni l’helper nel parent e marca l’iframe:

```html
<iframe data-memento-services src="https://mementoservizi.vercel.app/" title="Servizi Memento"></iframe>
<script src="memento-services-host.js"></script>
```

L’helper valida origine e finestra del messaggio; non usa `postMessage` con origine `*`. Il blur del catalogo interno è gestito separatamente, su una sola superficie grande quanto il viewport. Il `body` non viene fissato né spostato all’apertura del dialogo.

I link `#servizio/ID`, `#bundle/ID`, `#percorso-ID` e gli alias storici restano supportati. La CTA apre `https://mementostudio.it/start` nel documento superiore. `#levelup` resta disponibile per i vecchi link e prepara soltanto una bozza email: non invia nulla.

## Verifiche riproducibili

`npm test` usa soltanto il test runner di Node. Per le verifiche browser opzionali installa Playwright nell’ambiente di sviluppo:

```sh
npm install --no-save --package-lock=false playwright
npx playwright install chromium
npm run test:browser
```

La suite avvia un server su loopback e controlla proporzioni, overflow, breakpoint adiacenti, tutte le tavole a 320 e 820 px, iframe, scroll, tap, drag, focus, tastiera, filtri, hash e bozza email. La suite degli stati visivi verifica selezione nei popup standalone e iframe, Seleziona tutto, trascinamento, pressione touch prolungata, colori delle card laterali durante le animazioni, stati dei titoli e copia della bozza. La suite dedicata ai bundle verifica inoltre miniature quadrate, elenco verticale, assenza di scroll parassita, ingombro delle card durante la rotazione, grayscale/hover/focus e selezione nei campi. I risultati vengono scritti in `test-results/`, escluso dalla build. In un ambiente con browser già installato sono supportate le variabili `PLAYWRIGHT_MODULE` e `CHROMIUM_EXECUTABLE`.

Leggi `AUDIT.md` per risultati e limiti della verifica, `DESIGN_SYSTEM.md` per le regole visive.
