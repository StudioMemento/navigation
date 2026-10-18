# Memento — Catalogo servizi V10

Ottimizzazione mobile del 18 ottobre 2026 sulla V9. HTML, CSS e JavaScript statici, font e immagini locali. Nessuna nuova dipendenza runtime.

## Percorso

1. Hero con sei tavole: WEB, 3D, VIDEO, VISUAL, BRANDING, GRAFICA.
2. Sei sezioni con carousel prospettico indipendente: titolo in alto a sinistra, due righe di copy e chevron in basso a sinistra. Dots bianchi; selezione ambra. Nessun contatore o menu intermedio.
3. Sei bundle a tutta larghezza nel normale scroll verticale.
4. Catalogo con immagini square, 4 colonne desktop e 2 colonne tablet/mobile, switch Digitale / Fisico (Digitale iniziale), ricerca e stato vuoto.
5. Tavola finale “Pronto a fare LEVEL UP?” con modulo di contatto esistente.

## Selezione editoriale

Branding: Branding & restyling, Guida del brand, Packaging design, Merchandising, Insegne & segnaletica, Identità degli spazi.

Grafica: Campagne pubblicitarie, Grafica social, Presentazioni, Design editoriale, Menù & listini, Grafica per eventi.

Escono dal carousel Branding: Creatività pubblicitarie, Template social, Cataloghi & brochure, Presentazione aziendale, Menù & listini, Espositori & fiere (passano alla macro Grafica); Biglietti da visita, Carta intestata, Moduli & strumenti, Gift card & tessere NFC, Gadget & regali aziendali, Shopper & sacchetti, Etichette & cartellini (restano nel catalogo completo Fisico).

Nessun servizio specifico è eliminato: 44 servizi, 30 digitali e 14 fisici. `MEMENTO_SECTIONS.ids` seleziona le tavole; `catalogueIds` conserva la tassonomia completa. Le etichette broad delle tavole non rinominano le schede specifiche.

## Funzioni conservate

Schede servizio con contenuto e stime indicative; rimossa la complessità relativa. Bundle con risultato, componenti e consegna. Apertura dei singoli servizi da un bundle e ritorno. Escape, ripristino focus e blocco scroll dei dialog. Link diretti a servizi/bundle e alias precedenti. Carousel con swipe, trascinamento, tastiera e autoplay lento; movimento ridotto rispettato.

Level Up prepara una bozza email locale a info@mementostudio.it. L’utente conferma l’invio nella propria applicazione email. Non invia messaggi automaticamente e non salva lead su un server.

## Sorgente

- `dist/index.html`: struttura.
- `dist/catalogo-editorial.js`: categorie, selezione delle tavole, copy e stime.
- `dist/catalogo-data.js`: servizi e bundle originali, conservati.
- `dist/catalogo.js`: rendering, filtri, schede e modulo.
- `dist/catalogo-carousel.js`: trascinamento, loop e assestamento.
- `dist/catalogo.css`: layout responsive e dettaglio.

Nel repository Vercel `StudioMemento/servizi`, gli stessi file sono in `public/`; il build esistente li copia in `dist/`. La demo Sites usa direttamente `dist/`.

## Verifica

`npm test` nella copia Sites esegue simulazione DOM, apertura di tutte le 44 schede e dei sei bundle, navigazione, focus, ricerca, filtri, dot, loop, drag e controllo asset. I test DOM non misurano il rendering o i dispositivi touch reali. Stime di lavorazione e visual illustrativi sono quelli del catalogo precedente.

## Mobile e movimento V10

- Margine sinistro condiviso per hero, categorie, copy delle tavole, bundle e modali. Sottotitoli allineati a sinistra su schermi fino a 767 px.
- Catalogo mobile a due colonne; immagini square e titoli sotto, senza doppio rientro. Campi a 16 px per evitare lo zoom automatico iOS.
- Trasferimento della cattura touch gestito senza annullare il gesto quando il browser rilascia la cattura implicita del contenuto.
- Asse orizzontale distinto dallo scroll verticale; tap normale apre la scheda, swipe non apre accidentalmente una scheda.
- Movimento in 2D su mobile, easing sul trascinamento, rilascio criticamente smorzato, riciclo delle tavole solo quando invisibili.
- Autoplay: attesa di 8 secondi in hero / 9 secondi nelle categorie, transizione quintica di 2,6 secondi. Ripresa dopo almeno 12 secondi dall'interazione.
- Autoplay sospeso fuori viewport, in scheda browser nascosta, durante hover/focus/trascinamento e con un dialog aperto. Pulsante pausa/riprendi accanto ai dots. Disattivato con movimento ridotto.
- scripts/carousel-gestures.mjs riproduce il trasferimento della cattura touch e verifica inerzia, tap, scroll verticale, autoplay e pause con un clock deterministico.
