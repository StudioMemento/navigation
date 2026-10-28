/* MEMENTO — landing → categoria → servizio. Immagini originali dal catalogo. */
const MEMENTO_CONFIG = {
  "version": "2026-10-27.28",
  "startUrl": "https://mementostudio.it/start",
  "homeUrl": "https://mementostudio.it/",
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
    "image": "modello-3d-v28",
    "title": "Modello 3D del tuo prodotto",
    "description": "Ricostruiamo il tuo prodotto in 3D. Per immagini, video e contenuti interattivi.",
    "features": [
      "Il modello con geometria e dettagli del prodotto.",
      "Materiali e finiture digitali concordati.",
      "I file per immagini, video o interattività."
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
    "image": "render-animazione-v28",
    "title": "Render & animazione 3D",
    "description": "Creiamo immagini e animazioni del prodotto. Per mostrarne materiali, dettagli e movimento.",
    "features": [
      "Le immagini o sequenze animate concordate.",
      "Luce, inquadrature e finitura dei visual.",
      "File nei formati adatti ai canali previsti."
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
    "image": "realta-aumentata-v28",
    "title": "Realtà aumentata",
    "description": "Mostriamo il prodotto nello spazio del cliente. Dal telefono o tablet, sui device compatibili.",
    "features": [
      "Il modello ottimizzato per la visione in AR.",
      "Una pagina o un accesso dedicato al prodotto.",
      "Verifica sui dispositivi scelti per il progetto."
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
    "image": "configuratore-v28",
    "title": "Configuratore di prodotto",
    "description": "Realizziamo un configuratore del tuo prodotto. Per esplorare materiali, colori e varianti.",
    "features": [
      "Un’interfaccia per esplorare il prodotto.",
      "Le opzioni e combinazioni concordate.",
      "Un percorso per richiedere informazioni."
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
    "image": "showroom-v28",
    "title": "Showroom interattivo",
    "description": "Creiamo uno showroom digitale esplorabile. Per presentare i prodotti nel loro contesto.",
    "features": [
      "Uno spazio digitale in cui muoversi.",
      "Schede prodotto e interazioni concordate.",
      "Un’esperienza adatta ai dispositivi previsti."
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
    "image": "esperienza-digitale-v28",
    "title": "Esperienza digitale",
    "description": "Creiamo un percorso online per il tuo brand. Con immagini, movimento e interazioni su misura.",
    "features": [
      "Il concept e il racconto dell’esperienza.",
      "Le animazioni e le interazioni concordate.",
      "La realizzazione per i dispositivi previsti."
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
    "image": "landing-v28",
    "title": "Landing page",
    "description": "Realizziamo una pagina per la tua offerta. Per guidare chi arriva verso il contatto.",
    "features": [
      "Una pagina dedicata alla tua offerta.",
      "Layout per computer e smartphone.",
      "Un invito al contatto chiaro e accessibile."
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
    "image": "sito-v27",
    "title": "Sito web",
    "description": "Progettiamo e realizziamo il tuo sito web. Per mostrare ciò che fai e farti contattare.",
    "features": [
      "Pagine per presentare attività e servizi.",
      "Design per computer, tablet e smartphone.",
      "Percorsi chiari verso i tuoi contatti."
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
    "image": "catalogo-v28",
    "title": "Catalogo online",
    "description": "Realizziamo il catalogo online dei tuoi prodotti. Categorie e schede per esplorare l’offerta.",
    "features": [
      "Il catalogo navigabile dei tuoi prodotti.",
      "Categorie, filtri e schede concordati.",
      "Un percorso per chiedere informazioni."
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
    "image": "ecommerce-v28",
    "title": "E-commerce & gestionale",
    "description": "Realizziamo il tuo negozio online. Dai prodotti al pagamento, in un percorso chiaro.",
    "features": [
      "Catalogo e schede dei tuoi prodotti.",
      "Carrello e percorso di acquisto configurati.",
      "I collegamenti gestionali concordati."
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
    "image": "vetrina-v28",
    "title": "Vetrina digitale",
    "description": "Presentiamo la tua attività in una pagina. Orari, indicazioni e contatti facili da trovare.",
    "features": [
      "Una pagina che presenta la tua attività.",
      "Orari e indicazioni organizzati.",
      "Collegamenti diretti ai tuoi contatti."
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
    "image": "menu-digitale-v28",
    "title": "Menù digitale",
    "description": "Realizziamo il menù online del tuo locale. Piatti e bevande, leggibili dal telefono.",
    "features": [
      "Il menù consultabile da smartphone.",
      "Il link e il QR per accedere al menù.",
      "La struttura di aggiornamento concordata."
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
    "image": "video-aziendali-v28",
    "title": "Video aziendali",
    "description": "Realizziamo video che raccontano la tua attività. Spazi e lavorazioni mostrano come lavori.",
    "features": [
      "Il video completo, selezionato e montato.",
      "La lavorazione visiva e sonora concordata.",
      "I file pronti per i canali che utilizzi."
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
    "image": "video-esplicativi-v28",
    "title": "Video esplicativi",
    "description": "Spieghiamo prodotti e procedure con un video. Passaggi e funzioni diventano più chiari.",
    "features": [
      "Un video con i passaggi in ordine chiaro.",
      "Grafica e titoli che aiutano a capire.",
      "Le esportazioni previste dal progetto."
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
    "image": "video-social-v28",
    "title": "Video social & reel",
    "description": "Creiamo video brevi per i tuoi canali social. Un messaggio leggibile anche da smartphone.",
    "features": [
      "I video montati nei formati concordati.",
      "Titoli e adattamenti previsti dal progetto.",
      "I file finali pronti per la pubblicazione."
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
    "image": "video-lancio-v28",
    "title": "Video di lancio",
    "description": "Presentiamo un prodotto o una collezione in video. Mettiamo in evidenza ciò che li distingue.",
    "features": [
      "Il video di lancio completo e montato.",
      "Titoli ed elementi grafici concordati.",
      "I file nei formati scelti per la campagna."
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
    "image": "teaser-v28",
    "title": "Teaser",
    "description": "Creiamo una breve anteprima del tuo progetto. Mostriamo l’essenziale per accendere curiosità.",
    "features": [
      "Un teaser breve, selezionato e montato.",
      "I titoli e la chiusura concordati.",
      "I file per i canali di diffusione scelti."
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
    "image": "motion-v28",
    "title": "Motion Graphics",
    "description": "Animiamo testi, forme ed elementi grafici. Per dare ritmo a video, schermi e contenuti.",
    "features": [
      "Le sequenze animate previste dal progetto.",
      "Le versioni in loop, quando concordate.",
      "I file nei formati adatti ai tuoi canali."
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
    "image": "foto-prodotti-v28",
    "title": "Foto prodotti e servizi",
    "description": "Fotografiamo prodotti, materiali e dettagli. Per rendere chiaro ciò che proponi.",
    "features": [
      "Scatti selezionati e lavorati con cura.",
      "Una serie coerente per luce e composizione.",
      "File nei formati concordati per web e stampa."
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
    "image": "foto-spazi-v28",
    "title": "Foto di spazi e ambienti",
    "description": "Fotografiamo interni, esterni e dettagli. Per far percepire il carattere dei tuoi spazi.",
    "features": [
      "Fotografie selezionate e post-prodotte.",
      "Viste d’insieme e dettagli degli ambienti.",
      "File pronti per i canali di utilizzo scelti."
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
    "image": "foto-emozionali-v28",
    "title": "Foto emozionali",
    "description": "Creiamo immagini attorno al tuo messaggio. Per dare carattere alla tua campagna.",
    "features": [
      "Un concept visivo condiviso con il brand.",
      "Le immagini della campagna lavorate.",
      "Gli adattamenti nei formati concordati."
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
    "image": "template-social-v28",
    "title": "Template social",
    "description": "Creiamo modelli grafici per post e storie. Per pubblicare contenuti sempre riconoscibili.",
    "features": [
      "Una serie di layout coordinati al brand.",
      "Modelli modificabili nello strumento scelto.",
      "Indicazioni essenziali per utilizzarli."
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
    "image": "grafiche-pubblicitarie-v28",
    "title": "Grafiche pubblicitarie",
    "description": "Progettiamo il visual della tua campagna. Un messaggio chiaro, nei formati che ti servono.",
    "features": [
      "Il visual che presenta la tua offerta.",
      "Gli adattamenti per i canali concordati.",
      "I file pronti per pubblicazione o stampa."
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
    "image": "insegne-v28",
    "title": "Insegne e vetrofanie",
    "description": "Disegniamo insegne e grafiche per le vetrine. Per far riconoscere la tua attività dall’esterno.",
    "features": [
      "La proposta grafica sulle tue superfici.",
      "Gli adattamenti alle misure concordate.",
      "I file esecutivi da consegnare al fornitore."
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
    "image": "espositori-v28",
    "title": "Espositori e fiere",
    "description": "Progettiamo grafiche per pannelli e fondali. Per coordinare il tuo stand e farlo riconoscere.",
    "features": [
      "Una grafica coerente per l’allestimento.",
      "Gli adattamenti ai supporti scelti.",
      "I file esecutivi pronti per la produzione."
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
    "image": "grafica-spazi-v28",
    "title": "Grafica per gli spazi",
    "description": "Progettiamo grafiche e segnaletica d’ambiente. Per dare identità e orientamento ai tuoi spazi.",
    "features": [
      "Un concept grafico per i tuoi ambienti.",
      "Le grafiche e la segnaletica concordate.",
      "File sulle misure richieste dal fornitore."
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
    "image": "branding-v28",
    "title": "Branding & restyling",
    "description": "Progettiamo il marchio e la tua identità visiva. Per rendere riconoscibile la tua attività.",
    "features": [
      "Il marchio e le sue versioni concordate.",
      "Palette e caratteri scelti per il tuo brand.",
      "I file per le applicazioni previste."
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
    "image": "guida-brand-v28",
    "title": "Guida del brand",
    "description": "Raccogliamo le regole visive del tuo brand. Per applicarlo con coerenza su ogni supporto.",
    "features": [
      "Una guida digitale da consultare e condividere.",
      "Le indicazioni per logo, colori e caratteri.",
      "Esempi sui supporti concordati."
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
    "image": "presentazione-v28",
    "title": "Presentazione aziendale",
    "description": "Creiamo slide per attività, progetti e offerte. Per accompagnare il tuo racconto con chiarezza.",
    "features": [
      "Una presentazione coerente con il brand.",
      "Contenuti ordinati in una sequenza chiara.",
      "I file nel formato digitale concordato."
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
    "image": "menu-listini-v28",
    "title": "Menù & listini",
    "description": "Impaginiamo piatti, prodotti, servizi e prezzi. Per trovare subito ciò che la tua attività offre.",
    "features": [
      "Il progetto grafico del menù o listino.",
      "Le pagine con i contenuti forniti e verificati.",
      "I file per stampa o consultazione digitale."
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
    "image": "brochure-v28",
    "title": "Cataloghi & brochure",
    "description": "Impaginiamo prodotti, servizi e collezioni. Per presentare la tua offerta, pagina dopo pagina.",
    "features": [
      "Un impaginato completo di testi e immagini.",
      "Un PDF per la consultazione digitale.",
      "Gli esecutivi per la stampa concordata."
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
    "image": "biglietti-v28",
    "title": "Biglietti da visita",
    "description": "Progettiamo biglietti con nome, ruolo e contatti. Per lasciare un riferimento chiaro e riconoscibile.",
    "features": [
      "Il layout del fronte e del retro.",
      "Le personalizzazioni concordate.",
      "Gli esecutivi pronti per la stampa."
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
    "image": "carta-v28",
    "title": "Carta intestata",
    "description": "Progettiamo l’intestazione dei tuoi documenti. Per rendere riconoscibili lettere e comunicazioni.",
    "features": [
      "Il layout della carta intestata.",
      "La versione digitale concordata.",
      "I file per la stampa, se prevista."
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
    "image": "moduli-v28",
    "title": "Moduli & strumenti",
    "description": "Disegniamo moduli per il lavoro quotidiano. Campi ordinati, informazioni facili da compilare.",
    "features": [
      "I moduli operativi impaginati.",
      "Una struttura di compilazione chiara.",
      "I file per gli utilizzi concordati."
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
    "image": "merchandising-v28",
    "title": "Merchandising & kit brand",
    "description": "Portiamo il tuo brand su capi e accessori. Per coordinare il team, gli eventi e i kit.",
    "features": [
      "Le proposte grafiche sui supporti scelti.",
      "Le applicazioni del marchio concordate.",
      "I file pronti per il tuo fornitore."
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
    "image": "tessere-v28",
    "title": "Gift card & tessere NFC",
    "description": "Disegniamo gift card e tessere coordinate. Con collegamento NFC quando previsto.",
    "features": [
      "La grafica di card e tessere su misura.",
      "I file esecutivi per la produzione.",
      "Il link NFC verificato, se previsto."
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
    "image": "gadget-v28",
    "title": "Gadget & regali aziendali",
    "description": "Personalizziamo oggetti e regali aziendali. Per lasciare un ricordo legato al tuo brand.",
    "features": [
      "Una proposta di oggetti da personalizzare.",
      "Le grafiche coordinate della serie.",
      "I file per i fornitori concordati."
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
    "image": "scatole-v28",
    "title": "Scatole & confezioni",
    "description": "Progettiamo la grafica delle tue confezioni. Per dare identità e chiarezza ai prodotti.",
    "features": [
      "La grafica esterna e interna concordata.",
      "L’impaginazione sulla fustella fornita.",
      "I file esecutivi per la produzione."
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
    "image": "shopper-v28",
    "title": "Shopper & sacchetti",
    "description": "Disegniamo borse e sacchetti con il tuo brand. Per accompagnare acquisti, prodotti e regali.",
    "features": [
      "La proposta grafica coordinata al brand.",
      "Gli adattamenti ai formati concordati.",
      "I file esecutivi per la produzione."
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
    "image": "etichette-v28",
    "title": "Etichette & cartellini",
    "description": "Progettiamo etichette e cartellini coordinati. Per riconoscere il prodotto e leggerne i dettagli.",
    "features": [
      "La grafica di etichette o cartellini.",
      "Le varianti per le referenze concordate.",
      "I file nel formato richiesto dal fornitore."
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
    "description": "Montiamo i momenti chiave del tuo progetto. Un’anteprima che ne racconta tono e contenuto.",
    "features": [
      "Il trailer completo, selezionato e montato.",
      "I titoli e la struttura narrativa concordati.",
      "Le versioni per i canali di diffusione scelti."
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
    "image": "trailer-v28"
  },
  {
    "id": "logo-animato",
    "kind": "service",
    "chapter": "motion",
    "group": "video",
    "title": "Logo animato",
    "catalogTitle": "Motion graphics",
    "description": "Diamo movimento al tuo marchio. Per aperture e chiusure video riconoscibili.",
    "features": [
      "L’animazione realizzata sul tuo marchio.",
      "Le versioni per sfondi e formati concordati.",
      "I file pronti da inserire nei tuoi contenuti."
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
    "image": "logo-animato-v28"
  },
  {
    "id": "foto-food",
    "kind": "service",
    "chapter": "foto",
    "group": "foto",
    "title": "Fotografia food",
    "catalogTitle": "Prodotti & servizi",
    "description": "Fotografiamo i tuoi piatti e le tue bevande. Per mostrare ingredienti, gusto e consistenze.",
    "features": [
      "Fotografie selezionate e post-prodotte.",
      "Uno stile coerente con il tuo locale.",
      "File nei formati concordati per i tuoi canali."
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
    "image": "foto-food-v28"
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
