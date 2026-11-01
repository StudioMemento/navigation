# Memento LevelUp V08

Landing completa in cinque sezioni, pronta per Vercel. HTML, CSS ed ES modules, senza framework o dipendenze npm da installare. Font e immagini sono locali. Le demo restano le applicazioni pubbliche originali.

## Deploy su Vercel

1. Estrai lo ZIP: `package.json`, `index.html` e `vercel.json` devono essere nella root del progetto.
2. Carica questi file nel repository collegato al progetto Vercel LevelUp, oppure importa un nuovo repository.
3. Imposta **Framework Preset: Other**, **Build Command: npm run build**, **Output Directory: dist**. Lascia vuoto l'Install Command. Non servono variabili d'ambiente.
4. Avvia il deploy. `vercel.json` contiene già build, output e header statici.

È incluso anche `dist/`, già compilato. Per il normale deploy del sorgente Vercel lo rigenera. Non caricare soltanto lo ZIP come un file del sito: va estratto.

Per provarlo in locale, con Node.js 20 o successivo:

```sh
npm run dev
```

Il server mostra l'indirizzo locale. Per validare il pacchetto:

```sh
npm run build
npm test
npm run check:links
```

## Cosa contiene

- **Cosa ti rende speciale?** — titolo che si adatta da padding a padding, cinque benefici senza CTA nelle card; trascinamento, punti e tastiera, senza autoplay.
- **Prova le nostre esperienze** — coverflow con dieci progetti, categoria dentro ogni card, demo reale nel pannello sotto. ProductVis è la selezione iniziale. Viene caricato un solo iframe alla volta, vicino all'area visibile.
- **Immagina applicato al tuo brand.** — tre concept: profumo prima/dopo con cursore, ristorante e identità coordinata, collezione con visualizzazione prodotto.
- **Basta un'idea!** — tre passaggi: ci racconti, ne parliamo, hai una proposta.
- **Ready to start?** — tutta la grande card apre Start, con indicazione esplicita “Vai alla pagina contatti”. Il contatto è disponibile anche subito da tastiera attraverso il collegamento di salto.

## Master visivo e integrazione

La geometria segue **Memento Visual DNA R1.1**: area centrale 80%, massimo 1280 px; card hero desktop 2:1; carousel mobile 20/60/20; gutter mobile da 32 a 52 px. Le proporzioni portrait restano quelle del master. Inter Variable, icone, frame a due angoli tagliati, controller dei carousel e luce perimetrale CTA provengono dal pacchetto Servizi V40. Le quote R1.1 prevalgono sulle diverse larghezze presenti nel codice V40.

I titoli e i frame usano rampe PCHIP in precisione float, campionate in CSS; i test verificano ancoraggi, assenza di overshoot ed errore inferiore a 1/255. Il risultato finale resta affidato al compositing del browser: non viene sovrapposta una grana al testo.

In standalone il fondo è `#0b0c0d`. Dentro un iframe, `html`, `body`, sezioni e stage rimangono trasparenti. Le grandi card sono nere e la CTA ha fondo proprio `#07090a`. La dissolvenza laterale è una maschera alpha, non un pannello nero. Il colore di sistema scuro è applicato soltanto allo standalone per non rendere opaco il canvas embedded.

Non è inclusa una seconda navbar: la navigazione dell'hub rimane nel parent. `tide-child-bridge.js` v014 è conservato senza modifiche. Richiede un iframe con scrolling e un parent che invii il protocollo Tide; il controllo origine/sessione resta attivo. Per consentire l'espansione nativa, il parent può usare `allow="fullscreen"`. È previsto anche un dialog quando il fullscreen non è disponibile.

## Demo aggiornate

| Progetto | Categoria | URL pubblico |
| --- | --- | --- |
| Fashion | Siti web | https://mementofashion.vercel.app/ |
| Auren | Esperienze digitali | https://mementoauren.vercel.app/ |
| ProductVis | Configuratori 3D | https://productvis.vercel.app/ |
| IceCream | Esperienze digitali | https://mementoicecream.vercel.app/?gusto=pistacchio |
| Elite | Siti web | https://mementoelite.vercel.app/ |
| Knives | Configuratori 3D | https://knives.vercel.app/ |
| Memento Food | Siti web | https://mementofood.vercel.app/ |
| Unfreeze | Esperienze digitali | https://mementosl.vercel.app/ |
| TechRef | Siti web | https://techref.vercel.app/#/categoria/smartphone?set=selection&order=antutu&platform=iOS |
| VisualRef | Esperienze digitali | https://visualref.vercel.app/ |

Le categorie sono etichette delle card, coerenti con la scelta del portfolio a slideshow. Tutti i comandi della demo sono nel relativo pannello: espandi/riduci, apertura esterna e fallback di caricamento. Il link esterno resta sempre raggiungibile anche se una demo cambia policy di embedding.

## Modifiche frequenti

- `src/content.js`: benefici, progetti, categorie, immagini, URL e destinazione Start.
- `index.html`: testi delle sezioni, tre concept e step.
- `styles.css`: layout, responsive, trasparenza, frame e stati.
- `scripts/gradients.mjs`: ancoraggi e generazione di `smooth-gradients.css`.
- `public/assets/`: immagini WebP e font. Non sono richiesti URL temporanei per gli asset della landing.

La CTA apre `https://mementostudio.it/start` nel contesto principale e aggiunge `from`, `experience` e `idea` quando una demo è stata selezionata. **La pagina Start attuale mostra contatti email e WhatsApp e non utilizza questi parametri nel proprio iframe. Il contesto resta quindi nell’URL come predisposizione: questo pacchetto non modifica Start e non dichiara una precompilazione funzionante.** Non è presente un modulo di invio su LevelUp.

## Verifiche e limiti

Build statico e test Node superati. Risposte HTML 200 per dieci demo e Start; nessun header di blocco iframe rilevato sulle demo alla data riportata in `qa/link-check.json`.

Verifica in Chrome dei viewport CSS 360×800, 390×844, 820×1180, 844×390, 1440×1000, 1600×1000 e 1920×1080. Nessun overflow orizzontale; controllati wrapper, rapporto hero, titolo e colonne. Browser QA: drag, navigazione da tastiera, selezione delle tre categorie, iframe unico, dialog e Escape, cursore prima/dopo, CTA, trasparenza e handshake Tide READY.

Le dimensioni mobile sono viewport di test, non dispositivi fisici. Rimangono da verificare Safari/iOS e il browser Instagram su telefoni reali. Nel browser cloud ProductVis mostra il proprio fallback “WebGL non disponibile”: i controlli sono raggiungibili, ma la rotazione 3D non è stata certificata su hardware GPU. In un browser senza fullscreen nativo il dialog può ricaricare l'iframe; la selezione del progetto e il ritorno al punto della pagina sono conservati.

Le immagini Vision sono concept illustrativi; non attestano lavori commissionati o risultati commerciali. Le immagini reali dei progetti restano copertine: il contenuto interattivo è sempre la demo originale.
