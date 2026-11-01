# Memento — base visiva V36

Servizi rimane il riferimento per le prossime pagine. Questo rilascio aggiorna
la pagina Servizi; non modifica automaticamente Framer Nav o altre pagine.

## Fotografie e superfici

- Tavole slider/popup nere opache, con cornice continua e due angoli tagliati.
- Su desktop la fotografia raggiunge i bordi superiore, inferiore e destro.
  Il blending resta solo sul lato sinistro, per la leggibilità del testo.
- Su mobile le foto occupano tutta la larghezza e sono ancorate in basso,
  con `object-position: center bottom` e sfumatura superiore al nero.
  Un secondo strato sfocato e progressivamente scurito protegge il titolo.
- Solo le miniature del catalogo mantengono la dissolvenza inferiore.
- La maschera alpha si applica al viewport di ciascuno slider, inclusi i popup.
  Il fade termina prima della tavola centrale; nessuna velatura nera esterna.
- Pagina trasparente negli iframe e scrollbar sovrapposta senza fascia opaca.

## Mobile V35

- Breakpoint: fino a 767 px. Logo e navbar Framer misurano 320 px e sono
  centrati; titoli, catalogo, card attive e CTA condividono quei bordi.
- Un solo token `--mobile-content-width: 320px` definisce il riferimento.
  Il gutter è `max(0px, (100vw - 320px) / 2)`, con safe area del dispositivo.
- Slider servizi, bundle e popup sono 1:1. L'altezza dello stage è uguale
  alla larghezza della card; la sola proprietà `aspect-ratio` non basta.
- Padding interno delle slide: 20 px. Copy 14 px, titoli cover 32 px.
  La tipografia resta proporzionata alla card anche sui telefoni più larghi.
- Le immagini cover coprono il 78% inferiore della card, senza margine sotto.
  Il fade superiore è verticale e termina al 52% dell'immagine.
- Nei popup il testo usa il flusso del layout: le schede più ricche scorrono
  verticalmente dentro la cornice quadrata senza sovrapporre copy e titolo.
- In landscape basso il popup quadrato si riduce per lasciare visibili
  chiusura e dots. Le versioni desktop mantengono il layout precedente.
- `catalogo-mobile-v35.css` precede `catalogo-mobile-v36.css`.

## Dettagli mobile V36

- Il body non viene riposizionato all'apertura del popup. Il wrapper conserva
  l'altezza del documento e congela il catalogo nella posizione corrente.
- Il blur di 16 px si applica a una superficie ritagliata al viewport,
  evitando una texture estesa quanto l'intera pagina. Il dialogo rimane
  all'esterno di questa superficie, nel top layer nativo del browser.
- Su mobile dialogo e fondale compaiono senza animazioni di opacità.
  Il fondale scurisce la pagina; il catalogo è sfocato esplicitamente anche
  negli iframe trasparenti. Gli slider di sfondo restano in pausa.
- Il gradient blur dei titoli usa una copia in cache della foto con blur
  di 10 px, maschera progressiva e sfumatura al nero verso il bordo basso.
  Foto e sfocatura condividono crop e ancoraggio; il testo rimane sopra.
  Lo strato decorativo è escluso dall'accessibilità e nascosto su desktop.
- La posizione torna immediatamente al punto di partenza alla chiusura.
  Il percorso bundle/servizio conserva lo stesso blocco dello scroll.

## Ready to start?

Il testo usa la R maiuscola, tracking `.012em` e corpo responsive. Il link
occupa l'intera tavola e conserva la destinazione `https://mementostudio.it/start`
con `target="_top"`. Non aggiungere controlli annidati nel link.

Componenti da riusare, una volta per pagina:

- markup `#start-link` e `#start-heading` da `index.html`;
- `memento-start.css`, caricato dopo gli stili di base;
- `assets/icons/sparkle-sculpture-v34.webp`;
- il renderer della cornice in `memento-visuals.js`.

Lo sparkle è una nuova immagine raster con trasparenza, generata con Imagegen
e ottimizzata in WebP con alpha. Il materiale è monocromatico a riposo
(`grayscale(1) brightness(.8)`) e passa alla versione ambra su hover/focus.
Il testo e la freccia cambiano colore senza traslazioni o ingrandimenti.

Il riflesso del puntatore è disegnato esclusivamente da due path SVG con
`fill="none"`: un tratto sottile e uno morbido di pochi pixel. La proiezione
sceglie il segmento più vicino e interpola lungo il perimetro, senza attraversare
la superficie. Non aggiungere un gradiente radiale sul piano della scheda.

Ambra `#dfad6b`; testo a riposo `#f0ede7`; piano CTA `#07090a`.
Transizioni cromatiche 650–750 ms; easing `cubic-bezier(.22,1,.36,1)`.
Nessun ciclo continuo in idle, particella, deriva o parallasse.

`memento-visuals.js` contiene anche la scrollbar di Servizi. Per pagine con
un proprio scroll controller, riusare solo il renderer della cornice.

## Accessibilità e verifica

Focus visibile, decorazioni escluse dal nome accessibile e testo HTML.
Il movimento ridotto disabilita l'inseguimento animato; il touch non attiva
la luce del puntatore. In colori forzati tornano i colori di sistema.

V35: riferimento del logo/navbar misurato sul sito Framer a 320, 360, 390,
500, 600 e 767 px. V36: apertura, cambio slide e chiusura di Menu digitale,
Foto prodotti e Sito web in Chromium a 320x740, 390x844, 500x870, 667x375
e 1440x1000; i formati 390 e 500 px usano un iframe trasparente di prova.
Verificati posizione dello scroll, blur, rapporto 1:1 e percorso bundle >
servizio > bundle. Screenshot mobile controllati visivamente. Build statica,
sintassi JavaScript, risorse e ZIP verificati. Nessuna certificazione su
Safari/WebKit, hardware iPhone fisico o Framer in produzione.

Il prompt e la modalità di generazione dello sparkle sono in
`SPARKLE_GENERATION.md` nel repository.
