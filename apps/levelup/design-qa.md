# LevelUp V15 — verifica grafica e funzionale

Revisione del 4 novembre 2026. Base: MEMENTO_LEVELUP_V14_VERCEL.zip; l’HTML V14 coincide con quello pubblicato su mementolevelup.vercel.app al momento della verifica.

## Navbar

Integrato il kit navigation di NAV_OVERLAY.zip senza importare i contenuti della pagina Start. Nel browser, il solo link con aria-current="page" è LevelUp. Verificati logo, icone originali, blur, spazi di rispetto e nascondimento della navbar durante l’espansione del player. Il bridge Tide v014 rimane identico all’originale.

## Immagini iniziali

Tutti e sei i visual hanno object-position: 100% 50% e right: 0px. Il precedente centraggio nella box sovradimensionata lasciava un margine interno a destra; su mobile era presente anche un offset negativo dell’8%. Entrambi sono corretti. Il ritaglio della card con angoli tagliati è mantenuto. Ispezionate le viste desktop, tablet e mobile.

## Esperienze

Ordine: Memento Food, Pizzeria Via Roma, Memento Elite, IceCream, Auren, Fashion, MementoSL, Knives, ProductVis, VisualRef, TechRef. Nessuna esperienza preesistente è stata rimossa.

Food è caricato immediatamente durante l’inizializzazione. Verifica browser al primo viewport, prima dello scroll: un solo iframe con URL https://mementofood.vercel.app/ e stato loaded=true. La scelta di Via Roma aggiorna titolo, categorie, thumbnail, iframe e contesto del link Start. Il player Via Roma è stato visualizzato; espansione e chiusura mantengono un solo iframe caricato.

La nuova thumbnail è generata, con luce ambra e fondo scuro coerenti con le altre cover. Fornite versioni WebP 1536×1024 e 640×427. Le categorie sono “Menù interattivo” e “Vetrina digitale”.

Il controllo HTTP ha restituito 200 e HTML per tutte le 11 esperienze e per Start, senza header X-Frame-Options o CSP frame-ancestors bloccanti rilevati. Questo controllo non certifica tutte le funzioni interne delle applicazioni esterne.

## Confronti e responsive

Tutti i range iniziano a 0 e mostrano il soggetto con materiali e finiture. Il limite sinistro è comune ai tre controlli e indipendente dalle diverse scale dei soggetti. I range sono stati provati con Home ed End, raggiungendo 0 e 100 senza alterare gli altri confronti.

Ispezione browser diretta desktop a 1363×936 e viewport incorporati di controllo mobile 390×844, tablet 768×1024 e desktop 1440×1000 / 1920×1080. Il pannello di verifica ridimensiona graficamente i viewport grandi per poterli ispezionare; possono comparire differenze subpixel nei rettangoli misurati. Nel controllo finale desktop da 1920 px, gli assi delle tre barre differiscono di meno di 0,03 px. Nessun overflow orizzontale del documento dopo l’assestamento responsive.

## Build e regressioni

12 test automatici: contratti dei contenuti, ordine completo e URL V15, bootstrap navbar unico con LevelUp attivo, dipendenze del kit nella build, poster Food e avvio immediato, risorse locali, contatto, integrità Tide, geometria carousel, cambi rapidi di selezione e recupero del player. Il controllo negativo degli asset verifica che una risorsa rimossa faccia fallire la validazione.

Il pacchetto include sorgenti, documentazione, test, configurazione Vercel e dist. Esclude il pannello temporaneo di QA, screenshot del browser, cache e file intermedi.

## Limiti

Il controllo responsive usa viewport browser e non sostituisce una prova sui device fisici o nel browser Instagram. Il precaricamento anticipa l’avvio di Food; rete, risorse e inizializzazione delle applicazioni esterne determinano il tempo per renderle interattive.


## V16 — Ready to start (2026-11-04)

- Sezione `100svh`, padding incluso: 390 × 844, 768 × 1024, 1440 × 1000, 1920 × 1080 e landscape 844 × 390. Margini laterali: 20 / 90 / 90 / 100 / 90 px; nessun overflow orizzontale. Il browser di anteprima può arrotondare di 1 px le viewport scalate.
- Tab: 700 px di altezza a 390 × 844; 844 px a 768 × 1024; 820 px a 1440 × 1000; 900 px a 1920 × 1080. Logo e dock restano separati dal titolo.
- Stato iniziale `idle` / `running=false`; dopo ingresso nella viewport `ready` / `running=true`; dopo ritorno in alto `running=false`.
- Selezionando Via Roma, il link Start conserva `experience=viaroma` e il testo dell’idea. Navigazione effettiva verificata verso `/start?from=levelup`; ritorno tramite Indietro ripristina la CTA attiva.
- Interazione del puntatore verificata nel fallback tipografico (`--type-glow:0.900`).
- Il browser locale di QA non espone WebGL: verificati il fallback visibile, il layout e il ciclo di vita. Sul deploy VisualFX fornito il renderer originale risulta `webgl`, `webglError=0`. La distribuzione integrata è identica byte per byte al pacchetto sorgente fornito. Questo non è un benchmark delle prestazioni GPU dell’integrazione: la misura finale resta da fare sui device reali.
- Test automatici: build, risoluzione riferimenti del modulo cinematico, controllo negativo della dipendenza `camera.js`, test V15 conservati.
