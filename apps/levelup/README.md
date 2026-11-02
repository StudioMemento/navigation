# Memento LevelUp · V10

Landing aggiornata alle correzioni sulle cinque sezioni. Sorgenti HTML/CSS/JavaScript, immagini WebP locali, font Inter locale e build statica già inclusa in `dist/`. Non richiede dipendenze npm, backend o variabili d’ambiente.

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

## Cosa cambia

- **Cosa ti rende speciale?** Titolo subito sopra alla tavola attiva. Titoli delle cinque card in basso a sinistra, con sfumatura ambra; copy in alto a sinistra. Nessuna CTA nelle tavole introduttive.
- **Prova le nostre esperienze!** Carousel entro i padding. Card 16:9, con la stessa altezza della V09. Categoria in alto a sinistra, nome cliccabile in basso a sinistra, icona fullscreen in alto a destra. Nessun pulsante Apri/Espandi separato.
- **Immagina applicato al tuo brand!** Tre tavole a tutta larghezza, impilate verticalmente anche su mobile. Copy in alto, titolo in basso, immagini abbinate con fade per la leggibilità. Chevron senza box, visibili solo con hover, focus da tastiera o interazione touch.
- **Basta un’idea!** STEP 1, STEP 2, STEP 3, peso leggero e opacità 25%. Titoli con sfumatura ambra; immagini e testi mantenuti.
- **Player** Il caricamento parte quando il carousel termina la selezione. Selezionare di nuovo la stessa demo non ricrea l’iframe. Il fullscreen e il dialog usano lo stesso nodo, senza spostarlo nel DOM. Il primo paint è coperto fino al caricamento; eventi obsoleti non possono chiudere il loader della demo corrente.

## Master Visual DNA

La geometria segue il Master V40: `min(1720px, 100vw, max(320px, 100vw - 180px))`, safe area e allineamento condiviso tra titoli, card frontale, embed e griglie. Le tavole introduttive passano continuamente da quadrate a 2:1 fra 768 e 1024 px. Restano frame con tagli opposti, gradienti del master, foto sfumate, Inter e carousel senza autoplay.

Il selettore delle esperienze è un’eccezione intenzionale: rapporto 16:9, ad altezza compatta. Titolo, slide, punti ed embed occupano `100svh`, con un minimo di 680 px per mantenere usabile la demo su schermi molto bassi. Nessuno scroll verticale forzato. Sui telefoni i titoli lunghi vanno su due righe.

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
- `src/player.js`: caricamento unico, deduplicazione e gestione degli eventi asincroni.
- `bootstrap.js`: geometria e superficie embedded.
- `styles.css`: stile completo, senza override accumulati.
- `public/assets/`: tutte le risorse locali usate dal progetto.
- `vercel.json`: configurazione del deploy.

L’icona fullscreen è Lucide Maximize, con licenza inclusa in `public/assets/icons/LICENSE-lucide`.

Le immagini di confronto e degli step sono visual illustrativi generati per questa pagina; non rappresentano risultati commerciali o casi cliente documentati. Nello ZIP sono incluse le versioni WebP ottimizzate, non i file temporanei o le schermate interne di collaudo.
