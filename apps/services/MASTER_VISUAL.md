# Memento — base visiva V34

Servizi rimane il riferimento per le prossime pagine. Questo rilascio aggiorna
la pagina Servizi; non modifica automaticamente Framer Nav o altre pagine.

## Fotografie e superfici

- Tavole slider/popup nere opache, con cornice continua e due angoli tagliati.
- Su desktop la fotografia raggiunge i bordi superiore, inferiore e destro.
  Il blending resta solo sul lato sinistro, per la leggibilità del testo.
- In verticale le foto occupano tutta la larghezza, conservando i soggetti
  interi fra copy e titolo. Nessun rientro laterale del contenitore immagine.
- Solo le miniature del catalogo mantengono la dissolvenza inferiore.
- La maschera alpha si applica al viewport di ciascuno slider, inclusi i popup.
  Il fade termina prima della tavola centrale; nessuna velatura nera esterna.
- Pagina trasparente negli iframe e scrollbar sovrapposta senza fascia opaca.

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

Controlli Chromium: nove formati, 1800 tavole popup, 837 elementi di catalogo
e slider, 16 verifiche delle superfici/CTA/scroll. Nessuna collisione rilevata.
Gesti trackpad e touch verificati con eventi simulati; hover verificato anche
visivamente. Il pacchetto non dichiara test su hardware Mac/iPhone fisico.

Il prompt e la modalità di generazione dello sparkle sono in
`SPARKLE_GENERATION.md` nel repository.
