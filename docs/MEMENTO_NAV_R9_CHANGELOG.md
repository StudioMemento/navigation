# Memento NAV R9 — Campo Latente

R9 interviene sui tre problemi segnalati dopo R8: fondo distante dalla tavola di riferimento, bordo luminoso troppo spesso e rallentamenti di caricamento, resize e navigazione. Il pacchetto mantiene immagini, contenuti, cinque sezioni e URL. **La produzione non è stata modificata o pubblicata.**

## Fondo: quiete, prossimità, movimento e ritorno

Il riferimento è la tavola **01 / Campo Latente — Ambra V2**. Il nuovo campo usa cluster di triangoli piccoli e zone centrali più aperte, facce con shading discreto e piccoli nodi chiari. La luce ambra parte dai vertici vicini al cursore e segue gli spigoli della geometria; le facce ricevono gradienti diversi in funzione della luce dei vertici.

Il movimento in quiete è lento e limitato. La prossimità accentua localmente il movimento e concentra i picchi luminosi su pochi nodi; il renderer limita a otto i relativi sprite di glow. I frammenti triangolari accompagnano il movimento e decadono quando questo termina. Il ritorno alla quiete attenua la luce gradualmente.

Le topologie del fondo sono precalcolate per viewport largo, verticale e mobile, con rispettivamente 126, 110 e 80 vertici. Il ridimensionamento scala i punti senza ricostruire la triangolazione. La risposta della luce cambia senza modificare le connessioni del grafo.

## Bordo, testo e chevron

Il perimetro della card usa un solo tratto di circa 0,8 CSS px. Il bagliore viene composto con sprite riutilizzabili e ritagliato all’esterno della sagoma: segue anche i tagli diagonali e non aggiunge una seconda linea interna. Il canvas viene pulito in coordinate fisiche e ripristinato con una trasformazione assoluta, per impedire accumuli o copie spostate durante i ridisegni.

La tipografia conserva Inter 300 e il testo HTML avorio. Gli aloni dei singoli glifi vengono rasterizzati quando cambiano le misure, poi riutilizzati; il reticolo e le microfacce restano ritagliati nel testo. Anche i chevron conservano il reticolo e il bagliore, con misure DOM e alone preparati al cambio di layout.

Hover, costruzione e scomparsa delle card continuano a usare le stesse celle triangolari, con variazioni di intensità per faccia e spigolo. Le maschere SVG vengono create solo quando servono, con valori quantizzati e scritture saltate quando il valore non cambia; il percorso a visibilità completa rimuove la maschera.

## Navigazione, immagini e resize

- La navbar segue immediatamente la destinazione richiesta. Lo slider mantiene la velocità quando cambia destinazione e usa una soluzione analitica smorzata; input ripetuti e inversioni non attendono la fine dell’animazione. La coda resta entro due slide dalla posizione corrente.
- Durante il passaggio fra card il livello a colori cambia opacità sopra una versione statica in bianco e nero. Il filtro di saturazione non viene più ricalcolato a ogni posizione dello slider; l’eventuale variazione residua del filtro riguarda l’hover della card attiva.
- L’avvio dà priorità all’immagine attiva; le immagini distanti vengono decodificate durante la preparazione differita o quando entrano in vista. Gli attributi responsive vengono aggiornati alla larghezza misurata della card, arrotondata a blocchi di 64 CSS px.
- Gli eventi di resize vengono accorpati in un frame. Dimensioni e posizioni CSS cambiano subito; la ricostruzione degli effetti avviene dopo 120 ms senza nuovi eventi. Durante questa finestra i vecchi effetti delle card sono nascosti e il contenuto resta visibile senza maschera.
- Gli effetti delle card visibili vengono preparati per primi. Le card distanti vengono preparate successivamente, mantenendole invisibili ma misurabili per ottenere dimensioni corrette dei glifi. Una card che entra in vista ottiene priorità nel task successivo.

## Budget di rendering e cache

La mesh normalizzata delle card è condivisa e conservata in cache: 240 vertici desktop, 180 mobile. Ridimensionare riutilizza questa topologia. Aloni dei glifi, sprite dei bordi e dei nodi, misure dei chevron e informazioni geometriche ripetute vengono riutilizzati; il rendering ordinario evita di ricreare blur canvas per ogni bordo o glifo.

Ogni canvas del fondo ha un budget di circa 2 milioni di pixel. I canvas principali di ciascuna card sono limitati a 1,5 milioni di pixel, includendo il margine del canvas destinato al glow. Il DPR è limitato a 1,5 desktop e 1,25 mobile e può essere ridotto ulteriormente per rispettare il budget. Questo limita le superfici raster sui display grandi senza cambiare le dimensioni CSS.

Le fasce sovrapposte di blur della navbar passano da otto a quattro per bordo, quindi da sedici a otto complessive. Il blur resta trasparente e confinato alle zone superiore e inferiore. Il pool condiviso di particelle resta limitato a 96 elementi desktop e 36 mobile.

## Misure CPU della geometria

Confronto eseguito nello stesso processo Node per il caso 1920 × 1080. La chiamata comprende la preparazione delle cinque mesh delle card e del fondo; i valori dipendono dal runtime e dall’ambiente di prova.

| Operazione | R8 | R9 |
| --- | ---: | ---: |
| Prima preparazione delle cinque mesh delle card | 588,58 ms | 8,25 ms |
| Prima preparazione della mesh del fondo | 177,54 ms | 0,50 ms |
| Media delle chiamate ripetute: cinque card + fondo | 856,19 ms | 0,07 ms |

Queste misure riguardano **solo la CPU per la geometria in Node**. La differenza nelle chiamate ripetute riflette il riuso delle topologie. Non misura FPS, rasterizzazione, compositing, caricamento delle immagini o fluidità del browser. I controlli eseguiti e i riscontri nel browser sono separati in [QA.md](../QA.md).

## Compatibilità e distribuzione

Rimangono deep link, ripristino della sezione nella sessione, bridge parent/iframe con origini verificate, navigazione da tastiera, swipe e supporto a `prefers-reduced-motion`. Restano il fallback senza JavaScript e i collegamenti diretti delle cinque sezioni.

Il supporto Framer è documentato in [ROUTE_RESTORE.md](ROUTE_RESTORE.md), con il blocco [framer-nav-bridge.html](framer-nav-bridge.html). Prima di inserirlo verificare che non sia già presente; non creare un secondo iframe. R9 fornisce i file da distribuire e non aggiorna automaticamente il deploy pubblico o la home Framer.
