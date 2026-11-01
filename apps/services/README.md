# Memento Servizi — V39

Correzioni dei bundle e rifiniture del catalogo sulla base unificata V38.

## Novità V39

- Bundle: servizi inclusi in un elenco verticale semantico, miniature quadrate e dimensioni legate all’altezza disponibile. Il suggerimento introduttivo resta disponibile ai lettori di schermo; la lista e la nota di ambito sono visibili.
- Caroselli: lo spazio della maschera deriva dalla proiezione 3D effettiva lungo tutta la transizione. La stessa funzione determina posa e ingombro delle card laterali.
- Catalogo: fotografie in bianco e nero, a colori durante hover e focus da tastiera. Titoli e cornici conservano il trattamento originale.
- Selezione e menu contestuale disattivati nei contenuti della pagina. Campi modificabili e anteprima della richiesta conservano selezione e strumenti di modifica.

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
| `src/app.js` | Montaggio della pagina e filtro Digitale/Fisico. |
| `bootstrap.js` | Superficie trasparente in iframe, handshake con il parent e proporzioni prima del primo paint e regola del menu contestuale. |
| `styles.css` | Fondamenti, card, caroselli, pagina, dialoghi, CTA e accessibilità. |
| `memento-services-host.js` | Helper opzionale da caricare nel documento che ospita l’iframe. |

Per aggiungere un servizio, aggiungi un oggetto a `catalogue.services`, collegalo a una categoria tramite `services` e, se serve, a `featured`. Ogni servizio ha quattro tavole. Per un bundle, usa `covers` e una tavola `components` con gli stessi ID. Esegui `npm test`: segnala riferimenti mancanti, duplicati e immagini assenti.

Non aggiungere nuovi file `polish-vXX.css` e non modificare i dati dopo il caricamento. Correggi la regola nel componente che ne è responsabile. Le scritture al DOM servono solo a mostrare lo stato locale dell’interfaccia; non riscrivono il catalogo.

## Responsive e immagini

La larghezza del contenuto parte da 320 px sui telefoni e cresce fino a 1720 px, mantenendo i margini condivisi. Tra 768 e 1024 px `bootstrap.js` interpola il rapporto delle card da 1:1 a 2:1. CSS e motore del carosello leggono le stesse variabili `--layout-wide` e `--board-ratio`.

La fotografia rimane ancorata in basso a destra. Una maschera continua passa dalla sfumatura superiore a quella laterale; la protezione del titolo segue lo stesso ritaglio. Nei popup la dimensione è limitata anche dall’altezza disponibile. Le liste dei bundle sono dimensionate per rientrare nella card alle misure ordinarie. Lo scroll nativo resta un fallback per viewport particolarmente bassi o testo ingrandito: nessun contenuto viene troncato per nasconderlo.

I nomi `v28`, `v29` e `v34` negli asset identificano fotografie già approvate, non fogli di patch. Le immagini originali sono conservate byte per byte. `media.js` costruisce gli URL delle varianti esistenti; i test verificano ogni variante.

## Embed

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

La suite avvia un server su loopback e controlla proporzioni, overflow, breakpoint adiacenti, tutte le tavole a 320 e 820 px, iframe, scroll, tap, drag, focus, tastiera, filtri, hash e bozza email. La suite dedicata ai bundle verifica inoltre miniature quadrate, elenco verticale, assenza di scroll parassita, ingombro delle card durante la rotazione, grayscale/hover/focus e selezione nei campi. I risultati vengono scritti in `test-results/`, escluso dalla build. In un ambiente con browser già installato sono supportate le variabili `PLAYWRIGHT_MODULE` e `CHROMIUM_EXECUTABLE`.

Leggi `AUDIT.md` per risultati e limiti della verifica, `DESIGN_SYSTEM.md` per le regole visive.
