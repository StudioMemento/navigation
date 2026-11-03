# LevelUp V14 — verifica grafica e funzionale

Revisione del 3 novembre 2026 sulla base V13. Sorgenti e build statica pronti per Vercel.

## Immagini

Generate e ispezionate sei composizioni che uniscono materia astratta e richiami di dominio. L’interfaccia web mantiene griglia e margini; il 3D integra wireframe e vertici; video include framing e timeline; fotografia richiama ottica, diaframma ed esposizione; design include registro e strumenti editoriali; branding richiama il segno Memento esistente, coordinato e confezione.

I confronti sono nuove scene di cuffie, packaging da caffetteria con pagina mobile, e arredo con catalogo digitale. Non contengono marchi o loghi inventati. Ogni variante di base è generata usando la corrispondente scena finale come riferimento, conservando composizione e inquadratura. Dodici asset WebP da 1280×1280 px, ciascuno con variante da 640×640 px. Rimosse dal pacchetto le immagini V13 sostituite.

## Categorie e ordine

Nel DOM del browser sono state lette tutte le dieci liste: due voci singolari per esperienza e un trattino per ciascuna voce, in alto a sinistra. La sequenza è Fashion, Elite, Memento Food, Auren, IceCream, MementoSL, Knives, ProductVis, TechRef, VisualRef. Le coppie complete sono riportate nel README.

Selezionare MementoSL aggiorna il titolo del player, il poster e l’URL a `https://mementosl.vercel.app/`. TechRef usa `https://techref.vercel.app/` senza percorso o hash mobile: nel browser si è aperta la navigazione iniziale con le categorie GPU, CPU, RAM, SSD, Mobile, Display e le altre aree.

## Sincronizzazione del player

La scelta esplicita avvia il caricamento prima della conclusione dell’animazione. Nella misura browser a 1280 px, il clic su “Prova IceCream” è stato registrato a 15491,8 ms e il nuovo iframe a 15495,0 ms: 3,2 ms tra scelta e montaggio. Il carousel risultava ancora in movimento e il mount conteneva una sola istanza.

Questo numero misura l’avvio della navigazione nell’ambiente di verifica, non il completamento del caricamento della demo esterna. Il player conserva il controllo degli eventi obsoleti, la deduplicazione e il recupero da timeout. Il nuovo test usa selezioni lontane, scelte rapide, avanzamento e rilascio di swipe: la destinazione parte subito e i passaggi intermedi non cambiano l’iframe.

Espansione IceCream in dialog e chiusura verificate: una sola istanza prima e dopo, dialog chiuso e focus restituito a “Espandi IceCream”.

## Responsive e confronti

Verificati viewport incorporati da 320, 390, 768, 1024, 1280 e 1363 px, alti 900 px. Dopo l’aggiornamento del layout, `scrollWidth` e `clientWidth` del documento coincidono a tutte e sei le larghezze. Ispezionate le viste mobili, tablet e desktop: soggetti contenuti nei frame e nessun bordo rettangolare delle immagini esposto.

A 320 px la card Fashion mantiene le due categorie sopra il titolo, con circa 31 px tra fondo della lista e inizio del titolo. Nei confronti i titoli restano in alto a sinistra, il copy in basso a sinistra; a 768 px i quattro inset misurati sono tutti 20 px. A 1280×900 px titolo e tre confronti entrano nello stesso viewport. Tutte le sei immagini dei confronti e le sei immagini di servizio sono risultate caricate durante il controllo.

Range verificati con Home ed End: il primo passa da 0 a 100, gli altri due rimangono a 50. I chevron hanno opacità 0 a riposo e 1 al focus, con background trasparente e bordo da 0 px. Gli acapi prima di “il suo valore”, “Lo stesso carattere” e “anche prima di” sono conservati.

## Build e regressioni

`npm run build` e `npm test` completati con esito positivo. Nove test coprono risorse, identità e categorie, collegamenti, contatto, bridge Tide, geometria del carousel e player. Il controllo negativo rimuove una risorsa da una copia temporanea della build e verifica che l’assenza venga rilevata. Il bridge Tide v014 mantiene il suo hash originale.

Lo ZIP include sorgenti, documentazione, test, configurazione Vercel e output `dist/`. Esclude il pannello temporaneo di QA, i PNG originali e i file intermedi.

## Limiti

Il controllo browser usa viewport incorporati e non sostituisce una prova su dispositivi iOS o browser Instagram fisici. La verifica riguarda la landing, la selezione delle demo e il dialog di espansione; non certifica tutte le funzionalità interne delle dieci applicazioni esterne, il fullscreen nativo o il loro rendering GPU. Le demo possono richiedere ulteriore tempo per scaricare asset e inizializzare il proprio player.
