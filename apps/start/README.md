> **R19 (24 novembre 2026): questa cartella fa parte del sito Memento** (repo navigation, `apps/start` → mementostudio.it/start/). Si costruisce e si prova dalla radice della repo: `npm run build`, poi `npm run preview`. I test della pagina: `npm run test:apps start`. Motore degli effetti, navbar, sfondo e cambio pagina sono quelli del sito (`src/surfaces`, `public/navigation`, `public/memento-ui`), non più copie locali. Le istruzioni di deploy autonomo, Framer e host più sotto sono storiche.

> **V28 (17 novembre 2026) — bridge 13.** Nucleo di navigazione condiviso con il contenitore Vercel (bundle `navigation/start.bundle.js` rigenerato), `data-memento-layout=overlay` prima del primo paint, `X-Robots-Tag: noindex, indexifembedded`. Contenuti, contatti, VFX e navbar 12.1.0 invariati. Nel contenitore la query di contesto (`from`, `experience`, `idea`) è conservata nell'URL. `framer-start.mjs` e `FRAMER_START_FIX.html` servono solo finché Framer è online. Vedi `docs/PROTOCOLLO.md` del workspace.

# Memento Start — V27

Reazione touch visibile fra le tavole, edge glow collegato al reticolato e testi reattivi. Correzione dell’embed Framer per mantenere logo e navbar nella stessa viewport.

## Installazione

**Servono entrambi i passaggi:** caricare la V27 su Vercel e inserire la riga di `FRAMER_START_FIX.html` nel Custom Code della pagina Start di Framer, in fondo al body. La procedura completa è in `INSTALLAZIONE.md`.

Il sito pubblico verificato il 15 novembre ha la V26 su Vercel ma non carica il correttivo Framer. Il solo aggiornamento di Vercel non può correggere il contenitore esterno, che appartiene a un altro dominio.

## Modifiche

- L’embed viene ancorato all’origine della viewport e dimensionato con l’altezza visibile del browser. Logo e dock appartengono allo stesso overlay: il documento Framer non aggiunge uno scroll esterno.
- Ogni touch programma percorsi connessi lungo le adiacenze del reticolato esistente. La propagazione arriva alle tavole vicine con tempi diversi, si divide in brevi rami e lascia spenta la maggioranza delle cellule. Non viene disegnato un cerchio.
- Le cellule vicine al bordo alimentano ora il vero edge glow usato dal desktop. Questo collegamento mancava nella V26.
- I testi riattivano gradiente ambra, cellule luminose e brevi emissioni entro il budget particellare già esistente. Le singole cellule si spengono in circa 450–700 ms; gli arrivi sono sfalsati.
- Il segnale viene acquisito al primo frame utile. Eliminata la scadenza di 100 ms che poteva scartare l’impulso sui telefoni più lenti.
- Massimo quattro tocchi in memoria e 96 cellule programmate per superficie e tocco. Le superfici fuori viewport non riproducono impulsi vecchi. Non ci sono nuovi canvas o contesti WebGL, né alimentazione continua dell’hover con il dito fermo.
- Numero visibile: `328 545 4661`, su una riga. Il collegamento resta `tel:+393285454661`.
- `Lunedì — Venerdì` è sotto `14:00 — 18:00`, con tipografia e distanza dal bordo coordinate alla riga secondaria dell’indirizzo.

Conservati: asset originali, Ghost Fibers a cinque layer, preset rosso/ambra, grain 0, foto a colori su mobile, interazione desktop, scroll nativo, cache delle superfici e risoluzione adattiva. Il limite di 30 render/s dello sfondo non equivale a un framerate misurato sul telefono.

## Sviluppo

Node.js 22 o 24.

```sh
npm ci
npm run dev
npm test
npm run build
npm run verify:preservation
```

`vercel.json` installa con `npm ci`, compila e pubblica `dist`. Il modulo per Framer ha l’header CORS necessario al caricamento dalla pagina ospitante.

Pagine locali: `/qa.html` e `/qa-embed.html`. La seconda riproduce l’iframe 100vh con una viewport visibile più corta, applica il modulo reale e controlla logo/dock a inizio, metà e fondo pagina, anche al variare dell’altezza.

40 test automatici, build e verifica di preservazione superati. Layout e comportamento dell’embed verificati nel browser. Esiti e limiti in `docs/V27-verifica.md`.

Il browser di prova non dispone di WebGL: resa finale GPU, fluidità e barre native su Brave/Safari richiedono la prova su telefono. I tocchi dentro Google Maps rimangono di competenza dell’iframe Google.

Nessuna modifica è stata pubblicata. Licenze originali in `docs/ReactBits-LICENSE.md`, `docs/Inter-OFL.txt` e `docs/Tabler-LICENSE.txt`. I documenti V23–V26 sono storici; per questa consegna fanno fede questo README, `INSTALLAZIONE.md` e `docs/V27-verifica.md`.
