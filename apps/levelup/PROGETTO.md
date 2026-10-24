# Memento Level Up — V05

Versione statica, senza build o librerie JavaScript esterne. Font Inter e copertine locali. Nessun deploy effettuato.

## Layout e interazioni

La landing rimane in un solo viewport. Il titolo e la CTA sono su una riga; titolo, card centrale e box contatto condividono l’allineamento. Le card usano CSS 3D; i tagli sono in alto a sinistra e in basso a destra. La tipografia mantiene il gradiente ambra verso il basso a destra.

Il telefono verticale ha una card più alta quando lo spazio lo consente; tablet verticale e landscape usano proporzioni dedicate. Le dimensioni sono ricalcolate tramite ResizeObserver. La pagina usa unità dinamiche del viewport con fallback e rispetta le safe area laterali e inferiori.

Un solo modello Pointer Events gestisce mouse, touch e penna. Il gesto si attiva dopo 10 px, blocca l’asse dominante, applica una resistenza visiva e avanza di una sola card con swipe sufficientemente ampio o flick veloce. Swipe sinistra/su: successiva; destra/giù: precedente. Il gesto funziona sulla superficie della landing, esclusi i controlli espliciti. La cattura del puntatore evita interruzioni uscendo dalla card. Cancellazione, perdita del focus e secondo dito ripristinano lo stato. I tap sintetici dopo il drag sono soppressi. Lo zoom a due dita rimane disponibile.

Chevron, indicatori e tastiera rimangono disponibili: frecce destra/sinistra, Home/End. Nessun autoplay. `prefers-reduced-motion` riduce animazioni e trascinamento visivo. Non esiste un ciclo di rendering continuo nella landing; requestAnimationFrame è usato soltanto durante il gesto.

## Prestazioni e immagini

Tutte le copertine sono WebP. Ogni immagine dispone di varianti da 480 px, 960 px e risoluzione massima fino a 1600 px, senza ingrandire gli originali più piccoli. I nomi contengono l’hash del contenuto per distinguere gli aggiornamenti. Il registro espone srcset, dimensioni intrinseche e URL; sizes è calcolato dalla dimensione effettiva dell’immagine nella card.

Solo le tre card visibili ricevono inizialmente una sorgente. Le successive vengono caricate all’avvicinarsi; le immagini già scaricate si riusano. La cover attiva ha priorità alta, le adiacenti bassa. Il poster del popup riutilizza la variante già scaricata. La connessione al dominio della demo viene anticipata con focus o hover della card; l’iframe viene creato soltanto al click e distrutto alla chiusura.

Peso delle copertine nella risoluzione massima: 1.258.634 byte per 10 esperienze, contro 1.701.815 byte per le 9 della V04. Nel test a 390 × 844 e densità 1×, le tre copertine iniziali selezionate dal browser totalizzano 71.576 byte; font, HTML, CSS e JS non sono inclusi. Su display ad alta densità il browser può selezionare varianti maggiori.

## Destinazioni

| Card | URL |
|---|---|
| IceCream | https://mementoicecream.vercel.app/?gusto=pistacchio |
| Auren | https://mementoauren.vercel.app/ |
| Memento Elite | https://mementoelite.vercel.app/ |
| Fashion | https://mementofashion.vercel.app/ |
| GAMMA | https://mementosl.vercel.app/ |
| Memento Food | https://mementofood.vercel.app/ |
| Knives | https://knives.vercel.app/ |
| TechRef | https://techref.vercel.app/#/categoria/smartphone?set=selection&order=antutu&platform=iOS |
| ProductVis | https://productvis.vercel.app/ |
| VisualRef | https://visualref.vercel.app/ |

Verifica del 24 ottobre 2026: tutti i dieci domini rispondono HTTP 200, senza redirect, X-Frame-Options o Content-Security-Policy dichiarati nelle risposte osservate. La route Mobile / iPhone di TechRef è stata ottenuta navigando l’app reale. L’assenza di questi header non garantisce che tutte le funzionalità delle app esterne siano supportate da ogni dispositivo.

La cover a quattro telefoni è un’illustrazione editoriale associata a TechRef, non uno screenshot dell’app. ProductVis usa l’immagine pubblica del proprio studio: https://productvis.vercel.app/assets/studio-fallback.webp. Le altre copertine conservano la direzione della V04. Non sono state modificate le applicazioni esterne.

## Player e contatto

Il dialog trasparente occupa il viewport. La superficie dell’esperienza usa inset 10%: frame centrale 80% × 80%, senza toolbar o barra CTA della landing. X esterna da 44 px, Escape e click fuori dal perimetro visibile chiudono il dialog. La chiusura libera l’iframe e ripristina il focus alla card selezionata. Il popup non intercetta i gesti effettuati dentro l’esperienza.

`ready to start?` apre il modulo già presente: nome, email e messaggio obbligatori, telefono facoltativo. Il modulo prepara un mailto a info@mementostudio.it, senza invio o salvataggio sul server.

## Verifica eseguita

Layout controllato nel browser a 320 × 568, 390 × 844, 768 × 1024, 1024 × 768, 844 × 390, 1363 × 936 e 2560 × 1080. Confermati headline e CTA su una riga, allineamenti, padding simmetrico di “Esplora”, contenimento nel viewport e cambio delle dimensioni senza perdita dello stato.

Verificati drag orizzontale, verticale, trascinamento breve annullato senza apertura accidentale, indicatori, apertura degli embed TechRef, ProductVis e Auren, frame all’80% × 80% su mobile, X esterna, chiusura sullo sfondo ed Escape, rimozione dell’iframe e ripristino del focus. Verificato il caricamento iniziale limitato a tre immagini con selezione delle varianti WebP. Controllati sintassi JavaScript, riferimenti degli asset e integrità dello ZIP.

Limiti: le verifiche dei gesti sono state eseguite con input puntatore nel browser di test, non su hardware touch fisico. L’embed ProductVis apre correttamente ma in questo browser WebGL non è disponibile, quindi mostra la propria anteprima statica; il rendering 3D interno va verificato su un dispositivo con WebGL. La landing non richiede WebGL.
