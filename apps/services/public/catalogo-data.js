/* MEMENTO — landing → categoria → servizio. Immagini originali dal catalogo. */
const MEMENTO_CONFIG = {
  "version": "2026-10-15.3",
  "email": "info@mementostudio.it",
  "phone": "+393285454661",
  "phoneLabel": "+39 328 5454 661",
  "background": "#0f0f0f"
};
const MEMENTO_FAMILIES = [
  {
    "id": "brand",
    "slug": "branding",
    "label": "Branding",
    "image": "branding",
    "title": "Un’identità che ti somiglia.",
    "summary": "Identità e comunicazione.",
    "hero": "b-identita",
    "sections": [
      {
        "title": "Identità e comunicazione",
        "layout": "brand",
        "ids": [
          "branding",
          "guida-brand",
          "grafiche-pubblicitarie",
          "template-social"
        ]
      }
    ]
  },
  {
    "id": "print",
    "slug": "stampa",
    "label": "Stampa",
    "image": "kit",
    "title": "Il tuo brand prende forma.",
    "summary": "Carta, oggetti e spazi.",
    "hero": "b-apertura",
    "sections": [
      {
        "title": "Presentazioni e cataloghi",
        "layout": "standard",
        "ids": [
          "brochure",
          "presentazione",
          "menu-listini"
        ]
      },
      {
        "title": "Stampati per l’attività",
        "layout": "standard",
        "ids": [
          "biglietti",
          "carta",
          "moduli"
        ]
      },
      {
        "title": "Materiale coordinato",
        "layout": "standard",
        "ids": [
          "merchandising",
          "tessere",
          "gadget"
        ]
      },
      {
        "title": "Packaging",
        "layout": "standard",
        "ids": [
          "scatole",
          "shopper",
          "etichette"
        ]
      },
      {
        "title": "Allestimenti e punto vendita",
        "layout": "standard",
        "ids": [
          "insegne",
          "espositori",
          "grafica-spazi"
        ]
      }
    ]
  },
  {
    "id": "foto",
    "slug": "fotografia",
    "label": "Fotografia",
    "image": "foto-prodotti",
    "title": "Il tuo valore, in primo piano.",
    "summary": "Prodotti, ambienti e atmosfera.",
    "hero": "b-campagna",
    "sections": [
      {
        "title": "Fotografia",
        "layout": "photo",
        "ids": [
          "foto-prodotti",
          "foto-spazi",
          "foto-emozionali",
          "foto-food"
        ]
      }
    ]
  },
  {
    "id": "video",
    "slug": "video",
    "label": "Video",
    "image": "video-lancio",
    "title": "Dai movimento alla tua storia.",
    "summary": "Storie, prodotti e movimento.",
    "hero": "b-lancio",
    "sections": [
      {
        "title": "Video e motion",
        "layout": "video",
        "ids": [
          "video-lancio",
          "video-aziendali",
          "video-esplicativi",
          "motion",
          "logo-animato",
          "video-social",
          "teaser",
          "trailer"
        ]
      }
    ]
  },
  {
    "id": "3d",
    "slug": "3d",
    "label": "3D",
    "image": "modello-3d",
    "title": "Il prodotto, da ogni prospettiva.",
    "summary": "Visualizzazione e interazione.",
    "hero": "b-lancio",
    "sections": [
      {
        "title": "Visualizzazione 3D",
        "layout": "pair",
        "ids": [
          "modello-3d",
          "render-animazione"
        ]
      },
      {
        "title": "Prodotti da esplorare",
        "layout": "pair",
        "ids": [
          "realta-aumentata",
          "configuratore"
        ]
      },
      {
        "title": "Esperienze interattive",
        "layout": "pair",
        "ids": [
          "showroom",
          "esperienza-digitale"
        ]
      }
    ]
  },
  {
    "id": "web",
    "slug": "web",
    "label": "Web",
    "image": "sito",
    "title": "Il tuo prossimo punto di contatto.",
    "summary": "Siti ed esperienze digitali.",
    "hero": "b-online",
    "sections": [
      {
        "title": "La tua presenza online",
        "layout": "pair",
        "ids": [
          "landing",
          "sito"
        ]
      },
      {
        "title": "Cataloghi e vendita online",
        "layout": "pair",
        "ids": [
          "catalogo",
          "ecommerce"
        ]
      },
      {
        "title": "Informazioni a portata di mano",
        "layout": "pair",
        "ids": [
          "vetrina",
          "menu-digitale"
        ]
      }
    ]
  }
];
const MEMENTO_SERVICES = [
  {
    "id": "modello-3d",
    "kind": "service",
    "chapter": "visualizzazione",
    "image": "modello-3d",
    "title": "Modello 3D di prodotto",
    "description": "Una versione digitale fedele a forme, materiali e dettagli del tuo prodotto.",
    "features": [
      "Modellazione da misure e riferimenti",
      "Materiali e texture del prodotto",
      "Asset per immagini, video o interattività"
    ],
    "group": "3d",
    "catalogTitle": "Modello 3D del tuo prodotto",
    "alt": "Modello 3D di prodotto — visual illustrativo Memento",
    "details": {
      "does": "Ricostruiamo il prodotto in digitale, curandone geometria, materiali e dettagli in base ai riferimenti disponibili.",
      "solves": "La necessità di mostrare o utilizzare il prodotto in contenuti digitali senza riprenderlo ogni volta.",
      "needs": "Disegni o misure, fotografie e indicazioni su materiali e finiture.",
      "gets": [
        "Il modello 3D del prodotto",
        "I materiali digitali concordati",
        "I file adatti agli utilizzi previsti"
      ]
    }
  },
  {
    "id": "render-animazione",
    "kind": "service",
    "chapter": "visualizzazione",
    "image": "render-animazione",
    "title": "Render & animazione 3D",
    "description": "Inquadrature, materiali e movimento per mostrare il prodotto al suo meglio.",
    "features": [
      "Direzione di luce e inquadrature",
      "Visual di prodotto o sequenze animate",
      "Formati per i canali concordati"
    ],
    "group": "3d",
    "alt": "Render & animazione 3D — visual illustrativo Memento",
    "details": {
      "does": "Creiamo immagini e animazioni a partire da un modello 3D, scegliendo luce, inquadrature e ambientazione.",
      "solves": "Dettagli, varianti o movimenti difficili da mostrare con una ripresa tradizionale.",
      "needs": "Un modello 3D disponibile o i riferimenti per realizzarlo, insieme alle scene da mostrare.",
      "gets": [
        "Immagini renderizzate e/o sequenze animate concordate",
        "La lavorazione finale dei visual",
        "I file per i canali previsti"
      ]
    }
  },
  {
    "id": "realta-aumentata",
    "kind": "service",
    "chapter": "esplorazione",
    "image": "realta-aumentata",
    "title": "Realtà aumentata",
    "description": "Il tuo prodotto nell’ambiente del cliente, dal telefono o dal tablet.",
    "features": [
      "Preparazione dell’asset per AR",
      "Pagina di accesso all’esperienza",
      "Verifica sui dispositivi compatibili"
    ],
    "group": "3d",
    "alt": "Realtà aumentata — visual illustrativo Memento",
    "details": {
      "does": "Prepariamo un’esperienza che permette di visualizzare il prodotto nell’ambiente del cliente, attraverso un dispositivo compatibile.",
      "solves": "La difficoltà di immaginare ingombri e presenza del prodotto in uno spazio reale.",
      "needs": "Un modello 3D o i riferimenti per crearlo, misure corrette e indicazioni sui dispositivi di destinazione.",
      "gets": [
        "Il prodotto ottimizzato per l’esperienza AR",
        "Una pagina o un accesso dedicato",
        "La verifica sui dispositivi concordati"
      ]
    }
  },
  {
    "id": "configuratore",
    "kind": "service",
    "chapter": "esplorazione",
    "image": "configuratore",
    "title": "Configuratore di prodotto",
    "description": "Colori, materiali e varianti. Il cliente trova la propria combinazione.",
    "features": [
      "Visualizzazione interattiva del prodotto",
      "Selezione delle varianti concordate",
      "Percorso verso una richiesta di contatto"
    ],
    "group": "3d",
    "alt": "Configuratore di prodotto — visual illustrativo Memento",
    "details": {
      "does": "Creiamo un’interfaccia in cui esplorare il prodotto e scegliere tra le varianti disponibili.",
      "solves": "Un’offerta con molte combinazioni che diventa difficile da spiegare con immagini separate.",
      "needs": "Le varianti, le regole di combinazione e i modelli o materiali visivi disponibili.",
      "gets": [
        "Un configuratore interattivo",
        "Le opzioni e le combinazioni concordate",
        "Un percorso verso la richiesta di informazioni"
      ]
    }
  },
  {
    "id": "showroom",
    "kind": "service",
    "chapter": "esperienze",
    "image": "showroom",
    "title": "Showroom interattivo",
    "description": "Uno spazio online per esplorare la tua offerta e scoprirne i dettagli.",
    "features": [
      "Presentazione dei prodotti",
      "Viste e punti di approfondimento",
      "Esperienza adattata a desktop e mobile"
    ],
    "group": "3d",
    "alt": "Showroom interattivo — visual illustrativo Memento",
    "details": {
      "does": "Organizziamo prodotti e contenuti in uno spazio digitale esplorabile, con punti di approfondimento.",
      "solves": "Un’offerta che in una pagina statica perde contesto e relazione tra i prodotti.",
      "needs": "I prodotti da esporre, i contenuti disponibili e il percorso che vuoi far seguire al visitatore.",
      "gets": [
        "Lo showroom digitale navigabile",
        "Le schede e le interazioni concordate",
        "Un’esperienza adattata ai dispositivi previsti"
      ]
    }
  },
  {
    "id": "esperienza-digitale",
    "kind": "service",
    "chapter": "esperienze",
    "image": "esperienza-digitale",
    "title": "Esperienza digitale",
    "description": "Immagini, movimento e interazioni in un percorso che racconta il tuo brand.",
    "features": [
      "Concept e direzione dell’esperienza",
      "Motion e interazioni su misura",
      "Adattamento ai diversi dispositivi"
    ],
    "group": "3d",
    "alt": "Esperienza digitale — visual illustrativo Memento",
    "details": {
      "does": "Progettiamo un percorso online in cui immagini, movimento e interazioni accompagnano il racconto del brand.",
      "solves": "Una storia o un prodotto che richiede un modo più coinvolgente di essere esplorato.",
      "needs": "Il messaggio, i materiali disponibili, il pubblico e l’azione che vuoi proporre al visitatore.",
      "gets": [
        "Il concept e il percorso dell’esperienza",
        "Le interazioni e le animazioni concordate",
        "La realizzazione per i dispositivi previsti"
      ]
    }
  },
  {
    "id": "landing",
    "kind": "service",
    "chapter": "web",
    "image": "landing",
    "title": "Landing page",
    "description": "Una pagina con un obiettivo: far compiere il prossimo passo.",
    "features": [
      "Struttura dedicata all’offerta",
      "Layout desktop e mobile",
      "Percorso di contatto e call to action"
    ],
    "group": "web",
    "alt": "Landing page — visual illustrativo Memento",
    "details": {
      "does": "Concentriamo offerta, informazioni e invito all’azione in una pagina dedicata a un obiettivo preciso.",
      "solves": "Visitatori che arrivano da una campagna e non capiscono subito cosa fare.",
      "needs": "L’offerta, il pubblico, i contenuti disponibili e l’azione che vuoi far compiere.",
      "gets": [
        "La pagina progettata e realizzata",
        "Il layout per desktop e smartphone",
        "Il percorso di contatto concordato"
      ]
    }
  },
  {
    "id": "sito",
    "kind": "service",
    "chapter": "web",
    "image": "sito",
    "title": "Sito web",
    "description": "Il tuo spazio online, costruito attorno a ciò che ti rende riconoscibile.",
    "features": [
      "Architettura delle pagine",
      "Interfaccia e sviluppo responsive",
      "Informazioni e contatti organizzati"
    ],
    "group": "web",
    "alt": "Sito web — visual illustrativo Memento",
    "details": {
      "does": "Organizziamo la tua presenza online in pagine chiare, con contenuti e navigazione costruiti attorno all’attività.",
      "solves": "Informazioni disperse o un sito che non rappresenta più il tuo brand.",
      "needs": "Gli obiettivi, i contenuti esistenti, i contatti e gli accessi al dominio, se già disponibile.",
      "gets": [
        "Le pagine previste dal progetto",
        "Un sito adattato a desktop e smartphone",
        "I contenuti e i percorsi di contatto organizzati"
      ]
    }
  },
  {
    "id": "catalogo",
    "kind": "service",
    "chapter": "vendita",
    "image": "catalogo",
    "title": "Catalogo online",
    "description": "Prodotti e collezioni da sfogliare, confrontare e approfondire.",
    "features": [
      "Schede e categorie prodotto",
      "Filtri per esplorare l’offerta",
      "Richieste di informazioni contestuali"
    ],
    "group": "web",
    "alt": "Catalogo online — visual illustrativo Memento",
    "details": {
      "does": "Raccogliamo l’offerta in categorie e schede consultabili, con strumenti per trovare e approfondire i prodotti.",
      "solves": "File sparsi o cataloghi difficili da esplorare quando l’offerta cresce.",
      "needs": "L’elenco dei prodotti o servizi, le immagini, le caratteristiche e l’organizzazione desiderata.",
      "gets": [
        "Un catalogo online navigabile",
        "Le categorie, le schede e i filtri concordati",
        "Un percorso per chiedere informazioni"
      ]
    }
  },
  {
    "id": "ecommerce",
    "kind": "service",
    "chapter": "vendita",
    "image": "ecommerce",
    "title": "E-commerce & gestionale",
    "description": "Dal catalogo al carrello, fino alla gestione delle vendite online.",
    "features": [
      "Catalogo e schede prodotto",
      "Carrello e percorso di acquisto",
      "Collegamenti gestionali da valutare"
    ],
    "group": "web",
    "alt": "E-commerce & gestionale — visual illustrativo Memento",
    "details": {
      "does": "Progettiamo il percorso dal prodotto all’acquisto e valutiamo i collegamenti con gli strumenti di gestione esistenti.",
      "solves": "Una vendita online poco chiara o separata dai processi operativi dell’attività.",
      "needs": "Catalogo, regole di vendita, spedizioni, pagamenti e informazioni sugli strumenti già utilizzati.",
      "gets": [
        "Il negozio online e le schede prodotto",
        "Il percorso di acquisto configurato",
        "Le integrazioni gestionali concordate"
      ]
    }
  },
  {
    "id": "vetrina",
    "kind": "service",
    "chapter": "menu",
    "image": "vetrina",
    "title": "Vetrina digitale",
    "description": "La tua attività in una pagina essenziale, subito utile a chi ti cerca.",
    "features": [
      "Presentazione dell’attività",
      "Orari, contatti e indicazioni",
      "Layout pensato per lo smartphone"
    ],
    "group": "web",
    "alt": "Vetrina digitale — visual illustrativo Memento",
    "details": {
      "does": "Creiamo una pagina essenziale che raccoglie presentazione, orari, indicazioni e contatti.",
      "solves": "Chi cerca l’attività trova informazioni incomplete o distribuite su canali diversi.",
      "needs": "Una descrizione, le immagini principali, gli orari e i contatti aggiornati.",
      "gets": [
        "La pagina di presentazione",
        "Le informazioni utili organizzate",
        "I collegamenti diretti ai contatti"
      ]
    }
  },
  {
    "id": "menu-digitale",
    "kind": "service",
    "chapter": "menu",
    "image": "menu-digitale",
    "title": "Menù digitale",
    "description": "Piatti, bevande e dettagli da esplorare, direttamente dal proprio telefono.",
    "features": [
      "Categorie e schede del menù",
      "Ingredienti e informazioni fornite",
      "Accesso tramite QR e layout mobile"
    ],
    "group": "web",
    "alt": "Menù digitale — visual illustrativo Memento",
    "details": {
      "does": "Organizziamo piatti e bevande in un menù leggibile da smartphone, accessibile tramite link o QR.",
      "solves": "Un menù difficile da leggere sul telefono o poco pratico da consultare.",
      "needs": "Voci del menù, ingredienti e informazioni verificate dal locale, eventuali foto e categorie.",
      "gets": [
        "Il menù digitale consultabile",
        "Il link e il QR di accesso",
        "La struttura di aggiornamento concordata"
      ]
    }
  },
  {
    "id": "video-aziendali",
    "kind": "service",
    "chapter": "video",
    "image": "video-aziendali",
    "title": "Video aziendali e promozionali",
    "description": "Persone, spazi e lavorazioni per raccontare la tua attività.",
    "features": [
      "Concept e struttura del racconto",
      "Riprese o lavorazione di materiali forniti",
      "Montaggio e formati concordati"
    ],
    "group": "video",
    "alt": "Video aziendali e promozionali — visual illustrativo Memento",
    "catalogTitle": "Video aziendali",
    "details": {
      "does": "Raccontiamo l’attività attraverso persone, ambienti e lavorazioni, con una sequenza di immagini chiara e riconoscibile.",
      "solves": "Una presentazione che non fa percepire come lavori e cosa ti distingue.",
      "needs": "Gli aspetti da raccontare, l’accesso agli spazi e la disponibilità delle persone coinvolte.",
      "gets": [
        "Il video completo montato",
        "La lavorazione visiva e sonora concordata",
        "I file pronti per i canali scelti"
      ]
    }
  },
  {
    "id": "video-esplicativi",
    "kind": "service",
    "chapter": "video",
    "image": "video-esplicativi",
    "title": "Video esplicativi",
    "description": "Rendi comprensibili prodotti, passaggi e funzioni attraverso le immagini.",
    "features": [
      "Struttura del messaggio",
      "Grafica, riprese o animazioni",
      "Montaggio orientato alla chiarezza"
    ],
    "group": "video",
    "alt": "Video esplicativi — visual illustrativo Memento",
    "details": {
      "does": "Mostriamo come funziona un prodotto o un servizio, traducendo i passaggi in immagini, grafica o animazione.",
      "solves": "Funzioni e procedure che richiedono spiegazioni lunghe o vengono fraintese.",
      "needs": "Il processo da spiegare, i passaggi chiave e i materiali tecnici disponibili.",
      "gets": [
        "Un video con una sequenza chiara",
        "Grafica e titoli a supporto della spiegazione",
        "Le esportazioni concordate"
      ]
    }
  },
  {
    "id": "video-social",
    "kind": "service",
    "chapter": "video",
    "image": "video-social",
    "title": "Video social & reel",
    "description": "Contenuti brevi per dare presenza a prodotti, novità e momenti della tua attività.",
    "features": [
      "Idea e struttura del contenuto",
      "Montaggio per il formato verticale",
      "Titoli e adattamenti concordati"
    ],
    "group": "video",
    "alt": "Video social & reel — visual illustrativo Memento",
    "details": {
      "does": "Costruiamo contenuti brevi con un messaggio immediato, pensati per la fruizione da smartphone.",
      "solves": "Riprese sparse o contenuti poco leggibili nei formati social.",
      "needs": "Il messaggio, i canali, eventuali riprese disponibili e le occasioni da raccontare.",
      "gets": [
        "Video montati nei formati concordati",
        "Titoli e adattamenti previsti dal progetto",
        "File pronti per la pubblicazione"
      ]
    }
  },
  {
    "id": "video-lancio",
    "kind": "service",
    "chapter": "motion",
    "image": "video-lancio",
    "title": "Video di lancio",
    "description": "Una presentazione dedicata al tuo nuovo prodotto o alla tua collezione.",
    "features": [
      "Concept e direzione visiva",
      "Produzione delle scene concordate",
      "Montaggio e formati di campagna"
    ],
    "group": "video",
    "alt": "Video di lancio — visual illustrativo Memento",
    "details": {
      "does": "Costruiamo un racconto visivo che presenta la novità e mette a fuoco ciò che la rende interessante.",
      "solves": "Un lancio che mostra il prodotto senza dare al pubblico un motivo per approfondire.",
      "needs": "Il prodotto, i suoi punti distintivi, il pubblico e i canali su cui presenterai il lancio.",
      "gets": [
        "Un video di lancio montato",
        "Titoli ed elementi grafici concordati",
        "Le esportazioni nei formati della campagna"
      ]
    }
  },
  {
    "id": "teaser",
    "kind": "service",
    "chapter": "motion",
    "image": "teaser",
    "title": "Teaser",
    "description": "Una breve anticipazione che accende la curiosità verso ciò che sta per arrivare.",
    "features": [
      "Selezione dei momenti chiave",
      "Ritmo, titoli e costruzione dell’attesa",
      "Adattamenti per i canali scelti"
    ],
    "group": "video",
    "alt": "Teaser — visual illustrativo Memento",
    "catalogTitle": "Teaser & trailer",
    "details": {
      "does": "Selezioniamo pochi elementi del progetto e li montiamo per suggerire la novità senza anticipare tutto.",
      "solves": "L’assenza di un contenuto breve per annunciare un lancio o creare curiosità.",
      "needs": "La novità da annunciare, i materiali disponibili e il messaggio finale da comunicare.",
      "gets": [
        "Un teaser montato",
        "Titoli e chiusura concordati",
        "I file per i canali di diffusione scelti"
      ]
    }
  },
  {
    "id": "motion",
    "kind": "service",
    "chapter": "motion",
    "image": "motion",
    "title": "Loop e motion graphics",
    "description": "Grafica in movimento per dare ritmo e carattere alla tua comunicazione.",
    "features": [
      "Animazione di elementi grafici",
      "Loop e sequenze per schermi",
      "Formati per video, web ed eventi"
    ],
    "group": "video",
    "alt": "Loop e motion graphics — visual illustrativo Memento",
    "details": {
      "does": "Animiamo forme, testi ed elementi grafici. Possiamo creare sequenze in loop o contenuti che accompagnano video e schermi.",
      "solves": "Una comunicazione statica che ha bisogno di ritmo, chiarezza o continuità visiva.",
      "needs": "Gli elementi grafici, il messaggio e i contesti in cui l’animazione verrà mostrata.",
      "gets": [
        "Le sequenze animate concordate",
        "Versioni in loop, se previste",
        "I file nei formati adatti ai canali scelti"
      ]
    }
  },
  {
    "id": "foto-prodotti",
    "kind": "service",
    "chapter": "foto",
    "image": "foto-prodotti",
    "title": "Fotografia di prodotto",
    "description": "Fotografie che rendono leggibili forme, materiali e qualità della tua offerta.",
    "features": [
      "Definizione del set e delle inquadrature",
      "Sessione fotografica concordata",
      "Selezione e lavorazione delle immagini"
    ],
    "group": "foto",
    "catalogTitle": "Prodotti & servizi",
    "alt": "Fotografia di prodotto — visual illustrativo Memento",
    "details": {
      "does": "Fotografiamo il prodotto curando luce, sfondo e inquadrature, così forme, materiali e dettagli si leggono con chiarezza.",
      "solves": "Immagini disomogenee o poco curate che rendono difficile valutare ciò che vendi.",
      "needs": "I prodotti da fotografare, i canali di utilizzo e qualche riferimento dello stile desiderato.",
      "gets": [
        "Una selezione di scatti post-prodotti",
        "Immagini coerenti tra loro",
        "I file nei formati concordati per web o stampa"
      ]
    }
  },
  {
    "id": "foto-spazi",
    "kind": "service",
    "chapter": "foto",
    "image": "foto-spazi",
    "title": "Fotografia di spazi",
    "description": "Interni ed esterni che raccontano atmosfera, dettagli e accoglienza.",
    "features": [
      "Sopralluogo o analisi dei riferimenti",
      "Riprese degli ambienti concordati",
      "Selezione e post-produzione"
    ],
    "group": "foto",
    "catalogTitle": "Spazi & ambienti",
    "alt": "Fotografia di spazi — visual illustrativo Memento",
    "details": {
      "does": "Raccontiamo interni ed esterni con inquadrature che mostrano ambienti, dettagli e atmosfera.",
      "solves": "Uno spazio che dal vivo convince, ma nelle immagini non comunica la stessa esperienza.",
      "needs": "L’accesso agli ambienti, gli spazi da valorizzare e un momento adatto per le riprese.",
      "gets": [
        "Fotografie selezionate e post-prodotte",
        "Viste d’insieme e dettagli concordati",
        "I file per i canali di utilizzo previsti"
      ]
    }
  },
  {
    "id": "foto-emozionali",
    "kind": "service",
    "chapter": "foto",
    "image": "foto-emozionali",
    "title": "Fotografia pubblicitaria",
    "description": "Immagini costruite attorno a un’idea, per dare carattere alla tua comunicazione.",
    "features": [
      "Concept visivo",
      "Composizione e ambientazione",
      "Visual per i canali concordati"
    ],
    "group": "foto",
    "catalogTitle": "Foto emozionali",
    "alt": "Fotografia pubblicitaria — visual illustrativo Memento",
    "details": {
      "does": "Costruiamo una scena attorno al messaggio del brand: luce, materiali e composizione lavorano insieme.",
      "solves": "Immagini generiche che mostrano il prodotto ma non trasmettono il carattere della campagna.",
      "needs": "Il messaggio, il prodotto o soggetto, i riferimenti visivi e i canali della campagna.",
      "gets": [
        "Un concept visivo condiviso",
        "Le immagini di campagna lavorate",
        "Gli adattamenti nei formati concordati"
      ]
    },
    "gallery": [
      "foto-emozionali",
      "foto-creativa"
    ]
  },
  {
    "id": "template-social",
    "kind": "service",
    "chapter": "grafica",
    "image": "template-social",
    "title": "Template social",
    "description": "Modelli coordinati per pubblicare nuovi contenuti con lo stesso stile.",
    "features": [
      "Sistema di layout riutilizzabili",
      "Formati per post e storie",
      "File modificabili nell’ambiente concordato"
    ],
    "group": "brand",
    "alt": "Template social — visual illustrativo Memento",
    "details": {
      "does": "Progettiamo modelli grafici da riutilizzare per post e storie, con spazi chiari per testi e immagini.",
      "solves": "Ogni pubblicazione riparte da zero e il profilo perde coerenza.",
      "needs": "Logo, colori, esempi di contenuto e lo strumento con cui aggiornerai i modelli.",
      "gets": [
        "Una serie di layout coordinati",
        "Modelli modificabili nello strumento concordato",
        "Indicazioni essenziali per usarli"
      ]
    }
  },
  {
    "id": "grafiche-pubblicitarie",
    "kind": "service",
    "chapter": "grafica",
    "image": "grafiche-pubblicitarie",
    "title": "Creatività pubblicitarie",
    "description": "Un messaggio riconoscibile, coordinato nei formati della tua campagna.",
    "features": [
      "Concept grafico e messaggio",
      "Adattamenti per i canali scelti",
      "File finali per pubblicazione o stampa"
    ],
    "group": "brand",
    "catalogTitle": "Grafiche pubblicitarie",
    "alt": "Creatività pubblicitarie — visual illustrativo Memento",
    "details": {
      "does": "Trasformiamo un’offerta o un messaggio in una composizione visiva, poi la adattiamo ai canali scelti.",
      "solves": "Una campagna difficile da capire o frammentata tra social, web e materiali stampati.",
      "needs": "L’obiettivo della campagna, il messaggio, i contenuti disponibili e i canali di pubblicazione.",
      "gets": [
        "Il visual della campagna",
        "Gli adattamenti nei formati concordati",
        "I file pronti per pubblicazione o stampa"
      ]
    }
  },
  {
    "id": "insegne",
    "kind": "service",
    "chapter": "spazi",
    "image": "insegne",
    "title": "Insegne & vetrofanie",
    "description": "Segni e informazioni che fanno riconoscere la tua attività dall’esterno.",
    "features": [
      "Studio grafico delle superfici",
      "Adattamento a misure e supporti",
      "Esecutivi per il fornitore"
    ],
    "group": "print",
    "alt": "Insegne & vetrofanie — visual illustrativo Memento",
    "details": {
      "does": "Disegniamo insegne e vetrofanie per rendere riconoscibile l’attività e comunicare le informazioni essenziali.",
      "solves": "Una presenza esterna poco visibile o non coordinata con il brand.",
      "needs": "Foto dello spazio, misure, logo e vincoli indicati dal fornitore o dal luogo di installazione.",
      "gets": [
        "La proposta grafica sulle superfici",
        "Gli adattamenti alle misure concordate",
        "Gli esecutivi per il fornitore"
      ]
    },
    "gallery": [
      "insegne",
      "vetrofanie"
    ]
  },
  {
    "id": "espositori",
    "kind": "service",
    "chapter": "spazi",
    "image": "espositori",
    "title": "Espositori & fiere",
    "description": "Una presenza coordinata per il tuo punto vendita, stand o evento.",
    "features": [
      "Grafica per pannelli e fondali",
      "Adattamento alle strutture scelte",
      "Esecutivi per la produzione"
    ],
    "group": "print",
    "alt": "Espositori & fiere — visual illustrativo Memento",
    "details": {
      "does": "Progettiamo la grafica di espositori, pannelli e supporti per fiere, eventi e punto vendita.",
      "solves": "Un allestimento frammentato in cui prodotti e messaggi non emergono.",
      "needs": "Obiettivo dell’allestimento, immagini, testi e schede tecniche delle strutture.",
      "gets": [
        "Una grafica coordinata per l’allestimento",
        "Gli adattamenti ai supporti scelti",
        "I file esecutivi per la produzione"
      ]
    }
  },
  {
    "id": "grafica-spazi",
    "kind": "service",
    "chapter": "spazi",
    "image": "grafica-spazi",
    "title": "Grafica per gli spazi",
    "description": "Rivestimenti e indicazioni che portano l’identità del brand negli ambienti.",
    "features": [
      "Concept applicato allo spazio",
      "Grafiche e segnaletica coordinate",
      "File esecutivi sulle misure concordate"
    ],
    "group": "print",
    "alt": "Grafica per gli spazi — visual illustrativo Memento",
    "details": {
      "does": "Portiamo colori, segni e informazioni del brand negli ambienti, con grafiche e segnaletica pensate per lo spazio.",
      "solves": "Ambienti anonimi o percorsi in cui orientarsi non è immediato.",
      "needs": "Foto o planimetrie, misure delle superfici, funzioni degli spazi e identità visiva.",
      "gets": [
        "Un concept grafico per gli ambienti",
        "Le grafiche e la segnaletica concordate",
        "I file sulle misure del fornitore"
      ]
    }
  },
  {
    "id": "branding",
    "kind": "service",
    "chapter": "brand",
    "image": "branding",
    "title": "Branding & restyling",
    "description": "Logo, colori e caratteri per creare o rinnovare la tua identità.",
    "features": [
      "Direzione dell’identità visiva",
      "Marchio, palette e tipografia",
      "File principali per gli usi concordati"
    ],
    "group": "brand",
    "alt": "Branding & restyling — visual illustrativo Memento",
    "details": {
      "does": "Diamo una forma visiva alla tua attività: definiamo il marchio, i colori e i caratteri. Possiamo partire da zero o far evolvere un’identità esistente.",
      "solves": "Un’immagine poco riconoscibile o diversa da un supporto all’altro.",
      "needs": "Il nome, una descrizione dell’attività, il pubblico a cui ti rivolgi e i materiali che usi già.",
      "gets": [
        "Il marchio e le sue versioni concordate",
        "Una palette e una scelta tipografica",
        "I file per le applicazioni previste"
      ]
    }
  },
  {
    "id": "guida-brand",
    "kind": "service",
    "chapter": "brand",
    "image": "guida-brand",
    "title": "Guida del brand",
    "description": "Regole ed esempi per usare la tua identità in modo coerente.",
    "features": [
      "Utilizzo del marchio",
      "Palette e sistema tipografico",
      "Esempi applicativi e file concordati"
    ],
    "group": "brand",
    "alt": "Guida del brand — visual illustrativo Memento",
    "details": {
      "does": "Raccogliamo le regole pratiche per usare logo, colori, caratteri e immagini. Gli esempi mostrano come applicarle nei casi reali.",
      "solves": "Dubbi e incoerenze quando persone o fornitori diversi lavorano sullo stesso brand.",
      "needs": "L’identità visiva e gli esempi dei materiali che vuoi coordinare.",
      "gets": [
        "Una guida digitale consultabile",
        "Indicazioni per usare gli elementi del brand",
        "Esempi di applicazione sui supporti concordati"
      ]
    }
  },
  {
    "id": "presentazione",
    "kind": "service",
    "chapter": "editoria",
    "image": "presentazione",
    "title": "Presentazione aziendale",
    "description": "Una proposta chiara da presentare, inviare e condividere.",
    "features": [
      "Organizzazione dei contenuti",
      "Impaginazione delle slide",
      "Formato digitale concordato"
    ],
    "group": "print",
    "alt": "Presentazione aziendale — visual illustrativo Memento",
    "details": {
      "does": "Costruiamo una presentazione che accompagna il tuo racconto, con una sequenza chiara di messaggi e immagini.",
      "solves": "Slide troppo dense o materiali che non spiegano subito il valore della tua attività.",
      "needs": "I contenuti da presentare, il pubblico e il contesto in cui userai la presentazione.",
      "gets": [
        "Una presentazione coordinata con il brand",
        "Una gerarchia chiara dei contenuti",
        "I file nel formato digitale concordato"
      ]
    }
  },
  {
    "id": "menu-listini",
    "kind": "service",
    "chapter": "editoria",
    "image": "menu-listini",
    "title": "Menù & listini",
    "description": "La tua offerta in un’impaginazione semplice da consultare.",
    "features": [
      "Gerarchia di piatti, servizi e prezzi",
      "Progetto grafico delle pagine",
      "Esecutivi per stampa o consultazione"
    ],
    "group": "print",
    "alt": "Menù & listini — visual illustrativo Memento",
    "details": {
      "does": "Diamo ordine alla tua offerta, con categorie e informazioni facili da trovare e leggere.",
      "solves": "Un menù o un listino affollato, difficile da consultare o poco coerente con il locale.",
      "needs": "L’elenco aggiornato delle voci, le informazioni da riportare e il formato di utilizzo.",
      "gets": [
        "Il progetto grafico del menù o del listino",
        "Le pagine impaginate e verificate sui contenuti forniti",
        "I file per stampa o consultazione digitale"
      ]
    }
  },
  {
    "id": "brochure",
    "kind": "service",
    "chapter": "editoria",
    "image": "brochure",
    "title": "Cataloghi & brochure",
    "description": "Servizi e collezioni in un racconto da sfogliare.",
    "features": [
      "Struttura editoriale",
      "Progetto grafico e impaginazione",
      "File per stampa e digitale"
    ],
    "group": "print",
    "alt": "Cataloghi & brochure — visual illustrativo Memento",
    "details": {
      "does": "Organizziamo testi, immagini e prodotti in un catalogo o una brochure facile da sfogliare.",
      "solves": "Un’offerta ricca ma difficile da presentare in modo ordinato.",
      "needs": "Testi, fotografie, elenco dei prodotti o servizi e indicazioni sul formato desiderato.",
      "gets": [
        "Un impaginato completo",
        "Un PDF per la consultazione digitale",
        "I file esecutivi per la stampa concordata"
      ]
    },
    "gallery": [
      "brochure",
      "brochure-pieghevole"
    ]
  },
  {
    "id": "biglietti",
    "kind": "service",
    "chapter": "stampati",
    "image": "biglietti",
    "title": "Biglietti da visita",
    "description": "Un piccolo formato che lascia un’impressione precisa.",
    "features": [
      "Layout fronte e retro",
      "Adattamento dei contatti",
      "Esecutivi per la stampa"
    ],
    "group": "print",
    "alt": "Biglietti da visita — visual illustrativo Memento",
    "details": {
      "does": "Portiamo identità e contatti in un formato compatto, curando composizione, leggibilità e resa sul supporto.",
      "solves": "Un primo contatto poco riconoscibile o dati difficili da leggere.",
      "needs": "Logo, nomi e contatti da inserire, eventuali preferenze di carta o finitura.",
      "gets": [
        "Il layout fronte e retro",
        "Le personalizzazioni concordate",
        "I file esecutivi per la stampa"
      ]
    }
  },
  {
    "id": "carta",
    "kind": "service",
    "chapter": "stampati",
    "image": "carta",
    "title": "Carta intestata",
    "description": "Documenti e comunicazioni con l’identità del tuo brand.",
    "features": [
      "Layout coordinato",
      "Organizzazione dei dati aziendali",
      "File nei formati concordati"
    ],
    "group": "print",
    "alt": "Carta intestata — visual illustrativo Memento",
    "details": {
      "does": "Progettiamo un’intestazione che rende riconoscibili documenti, lettere e comunicazioni aziendali.",
      "solves": "Documenti informali o non coordinati con l’identità dell’attività.",
      "needs": "Logo, dati aziendali e indicazioni su come crei e stampi i documenti.",
      "gets": [
        "Il layout della carta intestata",
        "La versione digitale concordata",
        "I file per la stampa, se prevista"
      ]
    }
  },
  {
    "id": "moduli",
    "kind": "service",
    "chapter": "stampati",
    "image": "moduli",
    "title": "Moduli & strumenti",
    "description": "Supporti chiari e coordinati per il lavoro di ogni giorno.",
    "features": [
      "Organizzazione delle informazioni",
      "Grafica di moduli e documenti",
      "File per gli utilizzi concordati"
    ],
    "group": "print",
    "alt": "Moduli & strumenti — visual illustrativo Memento",
    "details": {
      "does": "Disegniamo moduli e strumenti operativi con campi ordinati e informazioni facili da compilare.",
      "solves": "Documenti confusi che rallentano il lavoro o fanno dimenticare informazioni utili.",
      "needs": "Un esempio del documento attuale, i campi necessari e il modo in cui viene utilizzato.",
      "gets": [
        "I moduli impaginati",
        "Una struttura di compilazione chiara",
        "I file per gli utilizzi concordati"
      ]
    }
  },
  {
    "id": "merchandising",
    "kind": "service",
    "chapter": "coordinato",
    "image": "merchandising",
    "title": "Merchandising & kit brand",
    "description": "Il tuo marchio su capi e accessori per il team e gli eventi.",
    "features": [
      "Selezione dei supporti con il cliente",
      "Applicazione dell’identità",
      "File per i fornitori concordati"
    ],
    "group": "print",
    "alt": "Merchandising & kit brand — visual illustrativo Memento",
    "details": {
      "does": "Applichiamo il brand a capi, accessori e kit, tenendo conto dei materiali e delle tecniche di personalizzazione.",
      "solves": "Oggetti e abbigliamento del team che non raccontano la stessa identità.",
      "needs": "Il marchio, l’occasione d’uso, i supporti desiderati e le specifiche del fornitore, se già scelto.",
      "gets": [
        "Le proposte grafiche sui supporti",
        "Le applicazioni del marchio concordate",
        "I file pronti per il fornitore"
      ]
    },
    "gallery": [
      "merchandising",
      "kit"
    ]
  },
  {
    "id": "tessere",
    "kind": "service",
    "chapter": "coordinato",
    "image": "tessere",
    "title": "Gift card & tessere NFC",
    "description": "Un contatto da conservare. Un contenuto da aprire con un gesto.",
    "features": [
      "Grafica di card e tessere",
      "Collegamento NFC quando previsto",
      "File esecutivi e verifica del link"
    ],
    "group": "print",
    "alt": "Gift card & tessere NFC — visual illustrativo Memento",
    "details": {
      "does": "Progettiamo card e tessere coordinate. Quando previsto, colleghiamo il supporto NFC a una pagina o a un contenuto digitale.",
      "solves": "Un contatto che si perde o un passaggio poco immediato dal supporto fisico alle informazioni online.",
      "needs": "La funzione della card, i contenuti da mostrare e il link di destinazione per l’eventuale NFC.",
      "gets": [
        "La grafica delle card",
        "I file per la produzione",
        "Il collegamento digitale verificato, se previsto"
      ]
    },
    "gallery": [
      "tessere",
      "gift-card"
    ]
  },
  {
    "id": "gadget",
    "kind": "service",
    "chapter": "coordinato",
    "image": "gadget",
    "title": "Gadget & regali aziendali",
    "description": "Oggetti coordinati che accompagnano il cliente anche dopo l’incontro.",
    "features": [
      "Selezione dei supporti",
      "Applicazione del marchio",
      "Coordinamento grafico della serie"
    ],
    "group": "print",
    "alt": "Gadget & regali aziendali — visual illustrativo Memento",
    "details": {
      "does": "Scegliamo insieme gli oggetti e progettiamo una personalizzazione coerente con il brand e con l’occasione.",
      "solves": "Regali generici che non lasciano un ricordo riconoscibile dell’attività.",
      "needs": "L’occasione, i destinatari, i supporti preferiti e il materiale grafico del brand.",
      "gets": [
        "Una proposta di oggetti e personalizzazione",
        "Le grafiche coordinate",
        "I file per i fornitori concordati"
      ]
    }
  },
  {
    "id": "scatole",
    "kind": "service",
    "chapter": "packaging",
    "image": "scatole",
    "title": "Scatole & confezioni",
    "description": "Presenta e proteggi il prodotto con un’esperienza coerente.",
    "features": [
      "Grafica della confezione",
      "Adattamento alla fustella",
      "File esecutivi per il fornitore"
    ],
    "group": "print",
    "alt": "Scatole & confezioni — visual illustrativo Memento",
    "details": {
      "does": "Progettiamo la grafica della confezione e la adattiamo alla struttura scelta, dentro e fuori.",
      "solves": "Un prodotto curato presentato in un contenitore anonimo o poco chiaro.",
      "needs": "Dimensioni del prodotto, fustella o specifiche della confezione e contenuti da riportare.",
      "gets": [
        "La grafica del packaging",
        "L’impaginazione sulla fustella fornita",
        "I file esecutivi per la produzione"
      ]
    }
  },
  {
    "id": "shopper",
    "kind": "service",
    "chapter": "packaging",
    "image": "shopper",
    "title": "Shopper & sacchetti",
    "description": "Il tuo brand accompagna acquisti, prodotti e regali.",
    "features": [
      "Grafica coordinata",
      "Adattamento ai formati scelti",
      "Esecutivi per la produzione"
    ],
    "group": "print",
    "alt": "Shopper & sacchetti — visual illustrativo Memento",
    "details": {
      "does": "Portiamo il brand su borse, shopper e sacchetti, adattandolo a dimensioni, materiali e stampa.",
      "solves": "Un’esperienza d’acquisto che perde identità nel momento della consegna.",
      "needs": "Logo, supporti scelti, misure e specifiche del produttore.",
      "gets": [
        "La proposta grafica coordinata",
        "Gli adattamenti ai formati concordati",
        "I file esecutivi per la produzione"
      ]
    },
    "gallery": [
      "shopper",
      "bags"
    ]
  },
  {
    "id": "etichette",
    "kind": "service",
    "chapter": "packaging",
    "image": "etichette",
    "title": "Etichette & cartellini",
    "description": "Identità e informazioni di prodotto, curate fino al dettaglio.",
    "features": [
      "Gerarchia dei contenuti",
      "Grafica per le referenze concordate",
      "File nei formati del fornitore"
    ],
    "group": "print",
    "alt": "Etichette & cartellini — visual illustrativo Memento",
    "details": {
      "does": "Organizziamo marchio e informazioni di prodotto su etichette, adesivi e cartellini.",
      "solves": "Prodotti poco riconoscibili o informazioni difficili da leggere.",
      "needs": "Le referenze, i testi da inserire, le misure e i requisiti forniti dal produttore.",
      "gets": [
        "La grafica delle etichette o dei cartellini",
        "Le varianti concordate",
        "I file nel formato richiesto dal fornitore"
      ]
    }
  },
  {
    "id": "trailer",
    "kind": "service",
    "chapter": "motion",
    "group": "video",
    "title": "Trailer",
    "catalogTitle": "Teaser & trailer",
    "description": "Un’anteprima che presenta il tono, la storia e i momenti chiave del tuo progetto.",
    "features": [
      "Selezione e montaggio dei momenti chiave",
      "Titoli e ritmo narrativo",
      "Esportazioni per i canali concordati"
    ],
    "details": {
      "does": "Presentiamo i momenti chiave di un progetto, con un montaggio che ne rende comprensibili tono e contenuto.",
      "solves": "Un progetto ricco che ha bisogno di un’anteprima chiara e coinvolgente.",
      "needs": "I materiali principali, il contesto del progetto e ciò che vuoi anticipare al pubblico.",
      "gets": [
        "Il trailer completo",
        "Titoli e struttura narrativa concordati",
        "Le versioni per i canali scelti"
      ]
    },
    "alt": "Trailer — visual illustrativo Memento",
    "image": "trailer"
  },
  {
    "id": "logo-animato",
    "kind": "service",
    "chapter": "motion",
    "group": "video",
    "title": "Logo animato",
    "catalogTitle": "Motion graphics",
    "description": "Il tuo marchio prende movimento, mantenendo il carattere della tua identità.",
    "features": [
      "Animazione del marchio",
      "Versioni per gli utilizzi concordati",
      "File pronti per video e contenuti digitali"
    ],
    "details": {
      "does": "Progettiamo un movimento coerente con il marchio, da usare in aperture, chiusure e contenuti digitali.",
      "solves": "Un’identità curata nella grafica ma poco riconoscibile nei video.",
      "needs": "Il logo in formato vettoriale, le linee guida del brand e gli utilizzi previsti.",
      "gets": [
        "L’animazione del logo",
        "Le versioni concordate per sfondi e formati",
        "I file pronti da inserire nei tuoi contenuti"
      ]
    },
    "alt": "Logo animato — visual illustrativo Memento",
    "image": "logo-animato"
  },
  {
    "id": "foto-food",
    "kind": "service",
    "chapter": "foto",
    "group": "foto",
    "title": "Fotografia food",
    "catalogTitle": "Prodotti & servizi",
    "description": "Piatti e bevande raccontati attraverso ingredienti, consistenze e atmosfera.",
    "features": [
      "Scelta del set e delle inquadrature",
      "Sessione fotografica concordata",
      "Immagini selezionate e post-prodotte"
    ],
    "details": {
      "does": "Fotografiamo piatti e bevande curando luce, presentazione e dettagli, con uno stile coerente con il locale.",
      "solves": "Un’offerta appetitosa dal vivo che nelle foto perde qualità e personalità.",
      "needs": "I piatti da fotografare, la disponibilità della cucina e indicazioni su menù, sito o social.",
      "gets": [
        "Fotografie selezionate e post-prodotte",
        "Un linguaggio visivo coerente per il menù",
        "I file nei formati concordati"
      ]
    },
    "alt": "Fotografia food — visual illustrativo Memento",
    "image": "foto-food"
  }
];
const MEMENTO_BUNDLES = [
  {
    "id": "b-identita",
    "kind": "bundle",
    "title": "Identità coordinata",
    "eyebrow": "Un’immagine riconoscibile.",
    "description": "Una base visiva solida per presentarti con coerenza, dal primo contatto ai dettagli.",
    "image": "b-identita",
    "features": [
      "Identità visiva",
      "Palette e caratteri",
      "Guida del brand",
      "Asset digitali e cartacei"
    ],
    "covers": [
      "branding",
      "guida-brand"
    ],
    "alt": "Identità coordinata — visual illustrativo Memento",
    "strip": "b-identita-strip",
    "details": {
      "does": "Costruiamo un sistema visivo riconoscibile e lo portiamo sui primi punti di contatto del brand.",
      "solves": "Logo e materiali scollegati tra loro, oppure un’identità da costruire da zero.",
      "needs": "Il nome, il posizionamento dell’attività, i riferimenti e i supporti su cui vuoi applicare l’identità.",
      "gets": [
        "Identità visiva",
        "Palette e caratteri",
        "Guida del brand",
        "Asset digitali e cartacei"
      ]
    }
  },
  {
    "id": "b-online",
    "kind": "bundle",
    "title": "Brand online",
    "eyebrow": "Identità, sito e contenuti.",
    "description": "Brand, sito e contenuti nascono insieme, per costruire una presenza digitale coerente.",
    "image": "b-online",
    "features": [
      "Identità visiva",
      "Sito web",
      "Testi di presentazione",
      "Contenuti per il sito"
    ],
    "covers": [
      "branding",
      "sito"
    ],
    "alt": "Brand online — visual illustrativo Memento",
    "strip": "b-online-strip",
    "details": {
      "does": "Progettiamo insieme identità, sito e contenuti di presentazione. Ogni elemento nasce dalla stessa direzione.",
      "solves": "Un’immagine online frammentata o una presenza digitale ancora da costruire.",
      "needs": "La descrizione dell’attività, gli obiettivi del sito, i materiali esistenti e il dominio, se disponibile.",
      "gets": [
        "Identità visiva",
        "Sito web",
        "Testi di presentazione",
        "Contenuti per il sito"
      ]
    }
  },
  {
    "id": "b-apertura",
    "kind": "bundle",
    "title": "Apertura o rinnovo",
    "eyebrow": "Online e nel tuo spazio.",
    "description": "La tua nuova immagine prende forma online e nello spazio in cui accogli i clienti.",
    "image": "b-apertura",
    "features": [
      "Identità visiva",
      "Stampati per l’attività",
      "Vetrine e segnaletica",
      "Sito e contenuti di presentazione"
    ],
    "covers": [
      "branding",
      "insegne",
      "sito"
    ],
    "alt": "Apertura o rinnovo — visual illustrativo Memento",
    "strip": "b-apertura-strip",
    "details": {
      "does": "Coordiniamo la nuova immagine dell’attività nei materiali, nello spazio e nella presenza online.",
      "solves": "Un’apertura o un rinnovo gestiti con materiali diversi e una comunicazione poco uniforme.",
      "needs": "Il tipo di attività, la data prevista, le foto o le misure degli spazi e i materiali già disponibili.",
      "gets": [
        "Identità visiva",
        "Stampati per l’attività",
        "Vetrine e segnaletica",
        "Sito e contenuti di presentazione"
      ]
    }
  },
  {
    "id": "b-lancio",
    "kind": "bundle",
    "title": "Lancio prodotto",
    "eyebrow": "Una novità da ricordare",
    "description": "Immagini, video e una pagina dedicata. Un’unica direzione per portare il tuo prodotto al pubblico.",
    "image": "b-lancio",
    "features": [
      "Immagine di campagna",
      "Video di lancio",
      "Landing page di lancio",
      "Grafiche per annunci e social"
    ],
    "covers": [
      "foto-emozionali",
      "video-lancio",
      "landing",
      "grafiche-pubblicitarie"
    ],
    "alt": "Lancio prodotto — visual illustrativo Memento",
    "strip": "b-lancio-strip",
    "details": {
      "does": "Costruiamo una presentazione coordinata della novità, dall’immagine principale al video e alla pagina dedicata.",
      "solves": "Contenuti di lancio scollegati che non raccontano lo stesso messaggio.",
      "needs": "Il prodotto, i suoi punti distintivi, il pubblico, i canali e il periodo del lancio.",
      "gets": [
        "Immagine di campagna",
        "Video di lancio",
        "Landing page di lancio",
        "Grafiche per annunci e social"
      ]
    }
  },
  {
    "id": "b-campagna",
    "kind": "bundle",
    "title": "Campagna promozionale",
    "eyebrow": "Un messaggio, su ogni canale.",
    "description": "Dai presenza a un’offerta o a un evento con contenuti che parlano la stessa lingua.",
    "image": "b-campagna",
    "features": [
      "Direzione creativa",
      "Immagine di campagna",
      "Grafiche per social e stampati",
      "Landing page dedicata"
    ],
    "covers": [
      "foto-emozionali",
      "grafiche-pubblicitarie",
      "landing"
    ],
    "alt": "Campagna promozionale — visual illustrativo Memento",
    "strip": "b-campagna-strip",
    "details": {
      "does": "Diamo una direzione visiva alla promozione e la decliniamo sui punti di contatto scelti.",
      "solves": "Un’offerta o un evento che cambia tono e aspetto da un canale all’altro.",
      "needs": "Il messaggio della promozione, il pubblico, le date e i canali che vuoi utilizzare.",
      "gets": [
        "Direzione creativa",
        "Immagine di campagna",
        "Grafiche per social e stampati",
        "Landing page dedicata"
      ]
    }
  },
  {
    "id": "b-social",
    "kind": "bundle",
    "title": "Presenza continuativa",
    "eyebrow": "Al passo con la tua attività.",
    "description": "Contenuti e aggiornamenti che tengono il passo con la tua attività.",
    "image": "b-social",
    "features": [
      "Pianificazione dei contenuti",
      "Grafiche per post e storie",
      "Video brevi e adattamenti",
      "Aggiornamenti social e sito"
    ],
    "covers": [
      "template-social",
      "video-social"
    ],
    "catalogTitle": "Gestione social",
    "alt": "Presenza continuativa — visual illustrativo Memento",
    "strip": "b-social-strip",
    "details": {
      "does": "Pianifichiamo e realizziamo contenuti e aggiornamenti coerenti con la vita dell’attività.",
      "solves": "Canali fermi, pubblicazioni discontinue o contenuti che non seguono più ciò che fai.",
      "needs": "I canali esistenti, le novità da raccontare, i materiali disponibili e una persona di riferimento.",
      "gets": [
        "Pianificazione dei contenuti",
        "Grafiche per post e storie",
        "Video brevi e adattamenti",
        "Aggiornamenti social e sito"
      ]
    }
  }
];
