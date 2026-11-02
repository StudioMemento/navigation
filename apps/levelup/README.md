# Memento LevelUp · V11

Landing con apertura astratta dedicata ai benefici dei sei servizi, portfolio continuo e confronti divisi in due pannelli responsive. Sorgenti HTML/CSS/JavaScript, immagini WebP locali, font Inter locale e build statica già inclusa in `dist/`. Non richiede dipendenze npm, backend o variabili d’ambiente.

## Avvio e build

Dalla cartella estratta, con Node.js 20 o successivo:

```sh
npm run dev
npm run build
npm test
npm run check:links
```

Il server locale usa la porta 4173. `build` rigenera `dist/`; `test` controlla risorse, contesto del contatto e integrità del bridge. `check:links` richiede connessione e controlla le dieci demo e Start.

## Deploy su Vercel

Estrai lo ZIP. Usa la cartella che contiene `package.json` e `vercel.json` come root del progetto/repository. Il file `vercel.json` include già:

| Impostazione | Valore |
| --- | --- |
| Framework Preset | Other (`framework: null`) |
| Build Command | `npm run build` |
| Output Directory | `dist` |
| Install Command | vuoto; nessuna dipendenza |

La configurazione è verificata sulla [documentazione ufficiale di vercel.json](https://vercel.com/docs/project-configuration/vercel-json). Per un progetto esistente, aggiorna i file nella sua root e avvia il normale deploy. Nessun deploy è stato eseguito durante questa consegna.

## Cosa cambia nella V11

- **Apertura:** sei visual astratti originali per Web Design, 3D Design, Video, Visual, Design e Branding. Tutti i titoli iniziano con “Avere”, in alto a sinistra; copy in basso a sinistra. Titoli su una riga da desktop. Tavole più cinematografiche, senza CTA. I prodotti restano nel portfolio e negli esempi applicativi.
- **Portfolio:** sette card visibili sui desktop ampi, comprese le due anteprime esterne che sfumano ai bordi. La fascia riempie il wrapper. Movimento continuo senza l’allontanamento centrale della V10; il riciclo circolare avviene fuori dall’arco visibile. Le card restano 16:9.
- **Vision:** ogni applicazione ha due frame distinti: testo a sinistra e confronto interattivo a destra. Su telefono si impilano. Il cursore agisce solo sulla foto; testo e interazione non si sovrappongono. Chevron senza box su hover, focus e trascinamento.
- **Step:** “Capiamo il tuo obiettivo.”, “Definiamo il progetto.”, “Prepariamo l’offerta.” Titoli in alto a sinistra, copy in basso a sinistra. STEP 1 / 2 / 3 in alto a destra, opacità 25%; sculture in grafite mantenute.
- **Demo:** conservato il player della V10: una sola istanza, caricamento alla conferma della selezione, stessa demo durante l’espansione e la chiusura, nessuna ricreazione se il progetto non cambia.

## Master Visual DNA

La geometria segue il Master V40: `min(1720px, 100vw, max(320px, 100vw - 180px))`, safe area e allineamento condiviso tra titoli, card frontale, embed e griglie. Il rapporto delle tavole introduttive passa da 1,2:1 a 2,7:1 fra 768 e 1024 px. È una variazione intenzionale richiesta per questa apertura cinematografica; struttura e gesti del carousel restano quelli Services. Restano frame con tagli opposti, gradienti del master, foto sfumate, Inter e carousel senza autoplay.

Il selettore delle esperienze usa card 16:9 ad altezza compatta: 18svh, con limiti responsive. Sui desktop molto larghi e bassi, un minimo proporzionato alla larghezza evita vuoti tra le card. A 1363×844 px l’altezza resta 151,9 px come nella V10. Titolo, slide, punti ed embed occupano `100svh`, con un minimo di 680 px per mantenere usabile la demo su schermi molto bassi. Nessuno scroll verticale forzato. Sui telefoni i titoli lunghi vanno su due righe.

In un iframe, `html`, `body` e sezioni sono trasparenti; le card mantengono il proprio fondo. Da solo, il sito usa `#0b0c0d`. Il bridge Tide v014 è preservato byte per byte. L’handshake opzionale `memento:levelup:surface` comunica l’apertura del dialog al parent, verificando origine e mittente.

## Demo aggiornate

La fonte unica per ordine, immagini, categorie e link è `src/content.js`.

| Esperienza | Link |
| --- | --- |
| Fashion | https://mementofashion.vercel.app/ |
| Auren | https://mementoauren.vercel.app/ |
| ProductVis | https://productvis.vercel.app/ |
| IceCream | https://mementoicecream.vercel.app/?gusto=pistacchio |
| Elite | https://mementoelite.vercel.app/ |
| Knives | https://knives.vercel.app/ |
| Memento Food | https://mementofood.vercel.app/ |
| Unfreeze | https://mementosl.vercel.app/ |
| TechRef | https://techref.vercel.app/#/categoria/smartphone?set=selection&order=antutu&platform=iOS |
| VisualRef | https://visualref.vercel.app/ |

La demo si carica quando il blocco si avvicina allo schermo. La selezione conclusa sostituisce l’unico iframe solo se cambia esperienza, evitando più scene 3D attive insieme. Il codice gestisce ritardo/errore con Riprova e Apri la demo. Le demo restano applicazioni esterne: aggiornamenti e requisiti GPU appartengono ai rispettivi deployment.

## Contatto e fullscreen

La card finale porta a `https://mementostudio.it/start`. Se è stata esplorata una demo, il link conserva `experience` e `idea` nella query string. Questo prepara il contesto ma **non garantisce la precompilazione**: la pagina Start deve leggere e utilizzare quei parametri.

Espandi prova il fullscreen nativo quando consentito. In alternativa apre un dialog accessibile, chiudibile con X, Escape o clic sullo sfondo, ripristinando focus e scroll. Il dialog vive nello slot della demo: la sua apertura non riparenta l’iframe. Nel test su Memento Food, apertura/chiusura hanno conservato lo stesso caricamento e la lingua selezionata. Gli aggiornamenti o le animazioni interne delle applicazioni esterne restano gestiti dalle applicazioni stesse.

## Verifica e limiti

Build e test locali superati. Controllati gli alias delle dieci demo e Start: risposte HTML 200 e nessun header di blocco dell’embed rilevato al momento della verifica. Verificati layout desktop/mobile, cambio demo, link contestuale, slider da tastiera e trascinamento, espansione in dialog e ripristino del focus. Dettagli in `design-qa.md`.

Il browser cloud non dispone di WebGL: ProductVis mostra il proprio fallback statico. Non sono stati eseguiti test su GPU, Safari iOS o browser Instagram su telefoni fisici. Prima della campagna, resta utile una verifica su quei dispositivi reali.

## File principali

- `src/content.js`: copy, step, immagini e demo.
- `src/app.js`: rendering e interazioni.
- `src/carousel.js`: gesti orizzontali, animazione del master e conferma della selezione.
- `src/portfolio-geometry.js`: dimensionamento dell’arco e posizioni continue del portfolio.
- `src/player.js`: caricamento unico, deduplicazione e gestione degli eventi asincroni.
- `bootstrap.js`: geometria e superficie embedded.
- `styles.css`: stile completo, senza override accumulati.
- `public/assets/`: tutte le risorse locali usate dal progetto.
- `vercel.json`: configurazione del deploy.
- `visual-prompts.md`: prompt e mappa dei sei nuovi visual originali in `public/assets/v11/`.

L’icona fullscreen è Lucide Maximize, con licenza inclusa in `public/assets/icons/LICENSE-lucide`.

Le illustrazioni astratte, le immagini di confronto e gli step sono visual generati per questa pagina; non rappresentano risultati commerciali o casi cliente documentati. Nello ZIP sono incluse le versioni WebP ottimizzate, non i file temporanei o le schermate interne di collaudo.
