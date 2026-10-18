/* Editorial layer: indicative planning ranges, separate from the source catalogue. */
const MEMENTO_APP_SERVICE = {
  id: 'app-dedicata', kind: 'service', group: 'web', image: 'app-dedicata', title: 'App dedicata',
  description: 'Uno strumento digitale costruito attorno alle esigenze della tua attività.',
  details: {
    does: 'Progettiamo interfaccia e funzioni di un’applicazione dedicata ai tuoi utenti o al tuo team.',
    solves: 'Processi frammentati e strumenti che non rispondono al modo in cui lavora la tua attività.',
    needs: 'Gli obiettivi, chi userà l’app e le attività da rendere più semplici. Piattaforme e integrazioni si definiscono insieme.',
    gets: ['Il progetto dell’esperienza utente', 'L’interfaccia e le funzioni concordate', 'Un’applicazione sviluppata per il contesto previsto']
  }
};

// [Indicative lead time, relative complexity 1–5, what drives the effort, outcome headline]
const MEMENTO_PLANNING = {
  'sito': ['3–6 settimane', 3, 'Numero di pagine, contenuti e funzioni del sito.', 'Il tuo spazio. La tua identità.'],
  'landing': ['1–3 settimane', 2, 'Contenuti, animazioni e percorso di contatto.', 'Un’offerta. Un prossimo passo.'],
  'catalogo': ['3–6 settimane', 3, 'Volume del catalogo, filtri e gestione delle schede.', 'Tutta la tua offerta, a portata di mano.'],
  'ecommerce': ['6–10 settimane', 4, 'Varianti, pagamenti, spedizioni e integrazioni.', 'Dalla scoperta all’acquisto.'],
  'vetrina': ['1–2 settimane', 1, 'Una pagina essenziale, con contenuti già disponibili.', 'Le informazioni giuste, subito.'],
  'menu-digitale': ['2–4 settimane', 2, 'Numero di voci, lingue e modalità di aggiornamento.', 'Il tuo menù, da esplorare.'],
  'app-dedicata': ['8–16 settimane', 5, 'Flussi, piattaforme e collegamenti con altri sistemi.', 'Il tuo modo di lavorare, in un’app.'],
  'modello-3d': ['1–3 settimane', 3, 'Geometria, materiali e qualità dei riferimenti.', 'Il prodotto, in ogni dettaglio.'],
  'render-animazione': ['2–6 settimane', 4, 'Numero di scene, durata e lavorazione dei materiali.', 'Mostra quello che una foto non può.'],
  'realta-aumentata': ['3–6 settimane', 4, 'Preparazione dei modelli e dispositivi da supportare.', 'Il tuo prodotto, nel loro spazio.'],
  'configuratore': ['6–12 settimane', 5, 'Varianti, regole di combinazione e interazioni.', 'Ogni scelta prende forma.'],
  'showroom': ['5–10 settimane', 4, 'Numero di prodotti, ambienti e punti di interazione.', 'Uno spazio da scoprire.'],
  'esperienza-digitale': ['6–12 settimane', 5, 'Regia, contenuti e sviluppo delle interazioni.', 'Un brand che si vive.'],
  'video-lancio': ['3–6 settimane', 4, 'Riprese, regia, effetti e formati di campagna.', 'La tua novità entra in scena.'],
  'video-aziendali': ['3–5 settimane', 3, 'Location, riprese, interviste e montaggio.', 'Fai vedere chi sei.'],
  'video-esplicativi': ['3–6 settimane', 3, 'Sceneggiatura, grafica e passaggi da spiegare.', 'Ciò che fai, finalmente chiaro.'],
  'motion': ['1–3 settimane', 3, 'Durata, stile e numero di elementi animati.', 'Dai ritmo alla tua identità.'],
  'logo-animato': ['1–2 settimane', 2, 'Tipo di movimento e versioni del marchio.', 'Una firma che prende vita.'],
  'video-social': ['1–2 settimane', 2, 'Numero di contenuti, riprese e adattamenti.', 'Il tuo mondo, in pochi secondi.'],
  'teaser': ['1–2 settimane', 2, 'Disponibilità del girato e lavorazione visiva.', 'Accendi la curiosità.'],
  'trailer': ['2–4 settimane', 3, 'Selezione del materiale, montaggio e suono.', 'Fai venire voglia di vedere il resto.'],
  'foto-prodotti': ['1–2 settimane', 2, 'Numero di prodotti, set e ritocco.', 'Il valore si vede nei dettagli.'],
  'foto-spazi': ['1–2 settimane', 2, 'Location, condizioni di luce e selezione finale.', 'Fai sentire l’atmosfera.'],
  'foto-food': ['1–2 settimane', 2, 'Numero di piatti, styling e allestimento del set.', 'Prima del gusto, lo sguardo.'],
  'foto-emozionali': ['2–4 settimane', 3, 'Concept, scenografia e post-produzione.', 'Un’immagine. Un carattere preciso.'],
  'branding': ['3–6 settimane', 3, 'Ricerca, direzione creativa e sistema di identità.', 'Riconoscibile, ovunque.'],
  'guida-brand': ['2–3 settimane', 2, 'Ampiezza del sistema ed esempi di applicazione.', 'La coerenza diventa un sistema.'],
  'grafiche-pubblicitarie': ['1–2 settimane', 2, 'Concept e numero di formati da adattare.', 'Lo stesso messaggio, su ogni canale.'],
  'template-social': ['1–2 settimane', 1, 'Numero di layout e strumento di modifica.', 'Ogni contenuto parla di te.'],
  'presentazione': ['1–3 settimane', 2, 'Numero di pagine e organizzazione dei contenuti.', 'Una proposta che si fa capire.'],
  'brochure': ['2–4 settimane', 3, 'Pagine, testi, immagini e preparazione alla stampa.', 'Una storia da sfogliare.'],
  'menu-listini': ['1–2 settimane', 2, 'Numero di voci, formati e lingue.', 'La tua offerta, con il giusto ordine.'],
  'biglietti': ['3–5 giorni', 1, 'Formati, nominativi e finiture previste.', 'Un primo incontro che resta.'],
  'carta': ['3–5 giorni', 1, 'Applicazione del brand e formati di utilizzo.', 'La tua identità, anche nei documenti.'],
  'moduli': ['1–2 settimane', 2, 'Campi, varianti e flussi di compilazione.', 'Meno attrito nel lavoro quotidiano.'],
  'merchandising': ['1–3 settimane', 2, 'Supporti e tecniche di personalizzazione.', 'Un team. Una sola identità.'],
  'tessere': ['1–2 settimane', 2, 'Grafica, varianti e collegamento NFC, se previsto.', 'Un piccolo gesto. Un nuovo contatto.'],
  'gadget': ['1–2 settimane', 2, 'Selezione degli oggetti e personalizzazioni.', 'Il tuo brand rimane con loro.'],
  'scatole': ['2–4 settimane', 3, 'Fustella, superfici e varianti di prodotto.', 'L’esperienza comincia da fuori.'],
  'shopper': ['1–2 settimane', 1, 'Formati, materiali e tecnica di stampa.', 'Porta il tuo brand più lontano.'],
  'etichette': ['1–2 settimane', 2, 'Informazioni, misure e varianti da impaginare.', 'Ogni dettaglio parla del prodotto.'],
  'insegne': ['1–3 settimane', 3, 'Misure, superfici e confronto con il fornitore.', 'Fatti riconoscere, da fuori.'],
  'espositori': ['2–4 settimane', 3, 'Numero di supporti e dimensioni dell’allestimento.', 'Il tuo spazio si fa notare.'],
  'grafica-spazi': ['2–4 settimane', 3, 'Superfici, segnaletica e adattamenti alle misure.', 'La tua identità abita lo spazio.']
};

const MEMENTO_SECTIONS = [
  {id: 'web', label: 'WEB', subtitle: 'Siti, strumenti, esperienze.', hero: 'hero-web', ids: ['sito', 'landing', 'ecommerce', 'menu-digitale', 'app-dedicata', 'catalogo', 'vetrina']},
  {id: '3d', label: '3D', subtitle: 'Il prodotto, oltre l’immagine.', hero: 'hero-3d', ids: ['esperienza-digitale', 'configuratore', 'render-animazione', 'showroom', 'realta-aumentata', 'modello-3d']},
  {id: 'video', label: 'VIDEO', subtitle: 'Storie che prendono movimento.', hero: 'hero-video', ids: ['video-lancio', 'video-aziendali', 'video-esplicativi', 'motion', 'logo-animato', 'video-social', 'teaser', 'trailer']},
  {id: 'visual', label: 'VISUAL', subtitle: 'Fotografia. Luce. Carattere.', hero: 'hero-fotografia', ids: ['foto-prodotti', 'foto-spazi', 'foto-food', 'foto-emozionali']},
  {id: 'branding', label: 'BRANDING', subtitle: 'Un’identità. Ogni dettaglio.', hero: 'hero-branding', ids: ['branding', 'guida-brand', 'scatole', 'merchandising', 'insegne', 'grafica-spazi'], catalogueIds: ['branding', 'guida-brand', 'scatole', 'merchandising', 'insegne', 'grafica-spazi', 'biglietti', 'carta', 'tessere', 'gadget', 'shopper', 'etichette']},
  {id: 'grafica', label: 'GRAFICA', subtitle: 'Idee che trovano forma.', hero: 'hero-stampa', ids: ['grafiche-pubblicitarie', 'template-social', 'presentazione', 'brochure', 'menu-listini', 'espositori'], catalogueIds: ['grafiche-pubblicitarie', 'template-social', 'presentazione', 'brochure', 'menu-listini', 'espositori', 'moduli']}
];

// The overview presents broad areas; the complete catalogue retains individual products.
const MEMENTO_SHOWCASE_TITLES = {
  scatole: 'Packaging design', merchandising: 'Merchandising', insegne: 'Insegne & segnaletica',
  'grafica-spazi': 'Identità degli spazi', 'grafiche-pubblicitarie': 'Campagne pubblicitarie',
  'template-social': 'Grafica social', presentazione: 'Presentazioni', brochure: 'Design editoriale', espositori: 'Grafica per eventi'
};
const MEMENTO_SLIDE_COPY = {
  sito: ['Il tuo brand, nel suo spazio.', 'Pagine che invitano a scoprirti.'],
  landing: ['Un’offerta, un obiettivo.', 'Dall’interesse al contatto.'],
  ecommerce: ['Prodotti, carrello e acquisti.', 'Tutto segue il tuo brand.'],
  'menu-digitale': ['Piatti e storie da esplorare.', 'A portata di smartphone.'],
  'app-dedicata': ['Il tuo modo di lavorare.', 'In uno strumento su misura.'],
  catalogo: ['La tua collezione, online.', 'Da sfogliare e approfondire.'],
  vetrina: ['La tua attività, in una pagina.', 'Le informazioni giuste, subito.'],
  'esperienza-digitale': ['Immagini, spazio e interazione.', 'Il tuo brand diventa esperienza.'],
  configuratore: ['Materiali, colori e varianti.', 'Ogni scelta prende forma.'],
  'render-animazione': ['Luce, materia e movimento.', 'Il prodotto come lo immagini.'],
  showroom: ['Uno spazio da esplorare.', 'Ogni prodotto da scoprire.'],
  'realta-aumentata': ['Il tuo prodotto, nel loro spazio.', 'Direttamente dallo smartphone.'],
  'modello-3d': ['Forme, materiali e dettagli.', 'Una nuova dimensione digitale.'],
  'video-lancio': ['La tua novità entra in scena.', 'Un racconto che lascia il segno.'],
  'video-aziendali': ['Persone, luoghi e visione.', 'Fai vedere chi sei.'],
  'video-esplicativi': ['Un processo diventa racconto.', 'Ciò che fai, finalmente chiaro.'],
  motion: ['Grafica che prende movimento.', 'Dai ritmo alla tua identità.'],
  'logo-animato': ['Il carattere del tuo marchio.', 'In una firma che prende vita.'],
  'video-social': ['Il tuo mondo, in pochi secondi.', 'Contenuti pensati per i social.'],
  teaser: ['Un indizio. Un’anticipazione.', 'Accendi la curiosità.'],
  trailer: ['Il ritmo della tua storia.', 'Fai venire voglia di vederla.'],
  'foto-prodotti': ['Forme, texture e materiali.', 'Il valore si vede nei dettagli.'],
  'foto-spazi': ['Interni, esterni e prospettive.', 'Fai sentire l’atmosfera.'],
  'foto-food': ['Ingredienti e consistenze.', 'Prima del gusto, lo sguardo.'],
  'foto-emozionali': ['Un’immagine, un’idea.', 'Il carattere della tua campagna.'],
  branding: ['Segni, colori e caratteri.', 'Riconoscibile, ovunque.'],
  'guida-brand': ['Regole chiare, identità coerente.', 'Un linguaggio da condividere.'],
  scatole: ['Forma e identità del prodotto.', 'L’esperienza comincia da fuori.'],
  merchandising: ['Il brand diventa quotidiano.', 'Capi e accessori coordinati.'],
  insegne: ['Il primo segno della tua attività.', 'Fatti riconoscere, da fuori.'],
  'grafica-spazi': ['Ambienti che parlano di te.', 'L’identità prende spazio.'],
  'grafiche-pubblicitarie': ['Un’idea, ogni formato.', 'Il tuo messaggio si fa vedere.'],
  'template-social': ['Un sistema per i tuoi contenuti.', 'Coerente, anche quando cambia.'],
  presentazione: ['Dai ordine alle tue idee.', 'Una proposta che si fa capire.'],
  brochure: ['Testi e immagini, in equilibrio.', 'Una storia da sfogliare.'],
  'menu-listini': ['Il valore della tua offerta.', 'Chiaro, dalla prima lettura.'],
  espositori: ['Stand, eventi e punti vendita.', 'Una presenza che si fa notare.']
};

const MEMENTO_BUNDLE_EDITORIAL = {
  'b-online': {
    headline: 'Il tuo brand,\npronto online.', time: '6–10 settimane', complexity: 4,
    output: 'Un’identità riconoscibile e un sito che la racconta: testi, immagini e contatti seguono la stessa direzione.',
    roles: {branding: 'Definisce il linguaggio visivo: marchio, colori e caratteri.', sito: 'Trasforma l’identità in pagine, contenuti e percorsi di contatto.'},
    coordination: 'Testi di presentazione e contenuti del sito vengono coordinati con l’identità. Produzioni fotografiche o video aggiuntive si definiscono nel progetto.'
  },
  'b-lancio': {
    headline: 'Una novità\nda ricordare.', time: '5–8 settimane', complexity: 4,
    output: 'Un kit di lancio coordinato: immagine principale, film, pagina dedicata e adattamenti pronti per i canali scelti.',
    roles: {'foto-emozionali': 'Crea l’immagine che identifica il lancio.', 'video-lancio': 'Presenta il prodotto e i suoi punti distintivi.', landing: 'Raccoglie il racconto e guida al prossimo passo.', 'grafiche-pubblicitarie': 'Porta la stessa idea su annunci, social e materiali di campagna.'},
    coordination: 'Concept, messaggi e formati nascono insieme, con una sequenza di produzione condivisa.'
  },
  'b-identita': {
    headline: 'Riconoscibile.\nIn ogni dettaglio.', time: '4–7 settimane', complexity: 3,
    output: 'Un sistema di identità utilizzabile: marchio, palette, caratteri e regole per applicarli con coerenza.',
    roles: {branding: 'Costruisce o rinnova il segno e il linguaggio del brand.', 'guida-brand': 'Raccoglie le regole per mantenere coerenti le applicazioni.'},
    coordination: 'Le prime applicazioni digitali e cartacee si scelgono insieme. Quantità e supporti vengono definiti nel perimetro del bundle.'
  },
  'b-apertura': {
    headline: 'Una nuova\npresenza.', time: '6–10 settimane', complexity: 4,
    output: 'Un’attività coordinata, dal primo sguardo sulla vetrina fino alla visita del sito.',
    roles: {branding: 'Dà una direzione comune all’identità dell’attività.', insegne: 'Rende riconoscibile lo spazio e ne organizza le informazioni.', sito: 'Presenta l’attività e rende semplici contatti e informazioni.'},
    coordination: 'Gli stampati necessari si selezionano sul progetto. Produzione fisica, posa e tempi dei fornitori si pianificano separatamente.'
  },
  'b-campagna': {
    headline: 'Un messaggio.\nOgni canale.', time: '3–6 settimane', complexity: 3,
    output: 'Una campagna visivamente coerente: immagine guida, adattamenti e pagina di destinazione.',
    roles: {'foto-emozionali': 'Dà forma visiva all’idea della campagna.', 'grafiche-pubblicitarie': 'Adatta il messaggio ai formati di pubblicazione e stampa.', landing: 'Approfondisce l’offerta e raccoglie l’interesse.'},
    coordination: 'Una direzione creativa unisce tutti i contenuti. Acquisto degli spazi e gestione degli annunci si concordano a parte.'
  },
  'b-social': {
    headline: 'Una presenza\nche continua.', time: '2–3 settimane di avvio', complexity: 3,
    output: 'Un sistema di contenuti ricorrenti con uno stile riconoscibile e un ritmo concordato.',
    roles: {'template-social': 'Fornisce una base coerente per post, storie e nuove uscite.', 'video-social': 'Racconta prodotti, novità e momenti dell’attività con contenuti brevi.'},
    coordination: 'Pianificazione, quantità, aggiornamenti e frequenza vengono concordati. Dopo l’avvio, il lavoro procede per cicli editoriali.'
  }
};

const MEMENTO_COMPLEXITY = ['Essenziale', 'Mirata', 'Articolata', 'Avanzata', 'Su misura'];
const MEMENTO_ESTIMATE_NOTE = 'Stima indicativa dalla conferma del brief e dalla disponibilità dei materiali. Perimetro, revisioni e calendario si definiscono insieme.';
