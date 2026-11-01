# Memento LevelUp · V09

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

- **Cosa ti rende speciale?** Cinque titoli che iniziano con “Avere”, in alto a sinistra. Copy breve in basso a sinistra; nessun pulsante nelle tavole.
- **Prova le nostre esperienze!** Titolo adattato al padding, coverflow in rapporto 3:1 e un’unica demo caricata. “Apri” ed “Espandi” sono in basso a destra nella slide attiva. Eliminato il recap sopra l’embed.
- **Immagina applicato al tuo brand!** Tre coppie di render neutri, con lo stesso soggetto e inquadratura, e tre cursori indipendenti. Nessun badge Concept/Oggi/Domani. Su telefono le card scorrono orizzontalmente.
- **Basta un’idea!** I tre step richiesti, con copy in alto a sinistra, numero in alto a destra, titolo in basso a sinistra e nuove sculture in carbonio nella metà destra. La disposizione delle immagini risolve l’indicazione finale ambigua senza sovrapporre i testi.
- **Ready to start?** Conservata la grande card verso la pagina contatti, con luce sul bordo al passaggio del puntatore.

## Master Visual DNA

La geometria segue il Master V40: `min(1720px, 100vw, max(320px, 100vw - 180px))`, safe area e allineamento condiviso tra titoli, card frontale, embed e griglie. Le tavole introduttive passano continuamente da quadrate a 2:1 fra 768 e 1024 px. Restano frame con tagli opposti, gradienti del master, foto sfumate, Inter e carousel senza autoplay.

Il selettore delle esperienze è un’eccezione intenzionale: rapporto cinematico 3:1. Titolo, slide, punti ed embed occupano `100svh`, con un minimo di 680 px per mantenere usabile la demo su schermi molto bassi. Nessuno scroll verticale forzato. Sui telefoni i titoli lunghi vanno su due righe.

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

La demo si carica quando il blocco si avvicina allo schermo. Il cambio di slide sostituisce l’unico iframe dopo una breve stabilizzazione, evitando più scene 3D attive insieme. Il codice gestisce ritardo/errore con Riprova e Apri la demo. Le demo restano applicazioni esterne: aggiornamenti e requisiti GPU appartengono ai rispettivi deployment.

## Contatto e fullscreen

La card finale porta a `https://mementostudio.it/start`. Se è stata esplorata una demo, il link conserva `experience` e `idea` nella query string. Questo prepara il contesto ma **non garantisce la precompilazione**: la pagina Start deve leggere e utilizzare quei parametri.

Espandi prova il fullscreen nativo quando consentito. In alternativa apre un dialog accessibile, chiudibile con X, Escape o clic sullo sfondo, ripristinando focus e scroll. Nel fallback il browser può ricaricare l’iframe quando viene spostato; lo stato interno di una demo esterna non è controllabile dalla landing.

## Verifica e limiti

Build e test locali superati. Controllati gli alias delle dieci demo e Start: risposte HTML 200 e nessun header di blocco dell’embed rilevato al momento della verifica. Verificati layout desktop/mobile, cambio demo, link contestuale, slider da tastiera e trascinamento, espansione in dialog e ripristino del focus. Dettagli in `design-qa.md`.

Il browser cloud non dispone di WebGL: ProductVis mostra il proprio fallback statico. Non sono stati eseguiti test su GPU, Safari iOS o browser Instagram su telefoni fisici. Prima della campagna, resta utile una verifica su quei dispositivi reali.

## File principali

- `src/content.js`: copy, step, immagini e demo.
- `src/app.js`: rendering e interazioni.
- `src/carousel.js`: gesti orizzontali e animazione del master.
- `bootstrap.js`: geometria e superficie embedded.
- `styles.css`: stile completo, senza override accumulati.
- `public/assets/`: tutte le risorse locali usate dal progetto.
- `vercel.json`: configurazione del deploy.

Le immagini di confronto e degli step sono visual illustrativi generati per questa pagina; non rappresentano risultati commerciali o casi cliente documentati. Nello ZIP sono incluse le versioni WebP ottimizzate, non i file temporanei o le schermate interne di collaudo.
