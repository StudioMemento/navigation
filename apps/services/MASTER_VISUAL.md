# Memento — base visiva V37

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

## Layout responsive V37

- Fino a 500 px rimane il riferimento mobile di 320 px, centrato come il
  logo e la navbar Framer. Sotto 320 px il contenuto rispetta il viewport.
- Oltre 500 px la larghezza cresce senza salti: `100vw - 180px`, fino a
  1720 px. Titoli, catalogo, slider di pagina e CTA condividono quei bordi.
  Il gutter deriva da questa larghezza e rispetta le safe area.
- Il rapporto delle card è 1:1 fino a 768 px. Tra 768 e 1024 px cambia
  continuamente fino a 2:1; oltre 1024 px rimane 2:1. Lo stesso valore
  governa altezza dello stage e card, senza affidarsi solo ad aspect-ratio.
- `catalogo-responsive.js` misura il viewport del documento/iframe e
  pubblica `--layout-wide` (0–1) e `--board-ratio` (1–2). Le misure non
  dipendono dallo schermo fisico né dal viewport ridotto dal pinch zoom.
- Il popup mantiene il limite desktop da 840 a 1280 px e si riduce quando
  serve a rientrare in larghezza o altezza. Restano 144 px, più safe area,
  per chiusura, ritorno al bundle e dots. La card conserva il suo rapporto.
- Padding, copy e titoli dipendono dalla larghezza effettiva della card.
  Il testo usa il flusso del layout su ogni dispositivo; i contenuti lunghi
  scorrono all'interno, senza sovrapporre copy, titolo e CTA.
- Le foto seguono le sorgenti 3:2 e toccano il bordo inferiore. Sul layout
  quadrato non vengono ingrandite per riempire una finestra più verticale.
  Sul 2:1 rimane il piccolo crop verticale necessario a riempire il frame.
- Il blending superiore diventa gradualmente laterale quando la card si
  allarga. Non usare `object-fit: contain` in un riquadro isolato interno.
- Il gradient blur occupa una fascia inferiore da 128 a 260 px, proporzionata
  al titolo. La foto resta leggibile sopra questa fascia; sul desktop la
  protezione è più leggera. Foto e copia sfocata condividono crop e posizione.
- La griglia passa da 2 a 5 colonne quando le tessere hanno spazio sufficiente.
  Le sezioni con pochi elementi mantengono la stessa dimensione delle tessere.
- Le trasformazioni del carosello interpolano la stessa progressione: nessun
  cambio improvviso di prospettiva o distanza delle card a 768 px.
- Caricare `catalogo-responsive.js` nel head e `catalogo-responsive.css`
  dopo tutti gli stili precedenti. Questo file è il riferimento per il layout;
  non aggiungere nuovi override tablet/portrait ai vecchi fogli V24–V36.

## Dettagli mobile V36

- Il body non viene riposizionato all'apertura del popup. Il wrapper conserva
  l'altezza del documento e congela il catalogo nella posizione corrente.
- Il blur di 16 px si applica a una superficie ritagliata al viewport,
  evitando una texture estesa quanto l'intera pagina. Il dialogo rimane
  all'esterno di questa superficie, nel top layer nativo del browser.
- Dialogo e fondale compaiono senza animazioni di opacità su ogni formato.
  Il fondale scurisce la pagina; il catalogo è sfocato esplicitamente anche
  negli iframe trasparenti. Gli slider di sfondo restano in pausa.
- Il gradient blur dei titoli usa una copia in cache della foto con blur
  di 10 px, maschera progressiva e sfumatura al nero verso il bordo basso.
  Foto e sfocatura condividono crop e ancoraggio; il testo rimane sopra.
  Lo strato decorativo è escluso dall'accessibilità e attenuato su desktop.
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

V37: resize in Chromium da 320 a 2048 px con dettaglio aperto, portrait e
landscape; campioni a un pixel di distanza attorno ai vecchi breakpoint.
Controllati card, controlli, immagini e titoli. Catalogo, categorie e CTA
verificati a 13 larghezze. Tutte le 200 tavole di servizi e bundle controllate
a 320 e 820 px, con accesso ai contenuti che richiedono scroll interno.
Screenshot mobile/tablet/desktop controllati visivamente. Build statica,
sintassi JavaScript, risorse e ZIP verificati. Nessuna certificazione su
Safari/WebKit, hardware iPhone fisico o Framer in produzione.

Il prompt e la modalità di generazione dello sparkle sono in
`SPARKLE_GENERATION.md` nel repository.
