# QA R9 — 7 novembre 2026

## Produzione e riproduzione del problema

Ispezionati in Chrome `mementostudio.it` e il child `mementonav.vercel.app`. Nel passaggio 390 × 844 → 2048 × 818 il contenitore iframe assumeva già le dimensioni corrette, mentre il rendering manteneva transitoriamente la vecchia dimensione nell’angolo superiore sinistro. Dopo l’assestamento tornava a riempire il viewport. La correzione R9 separa l’adattamento CSS dalla preparazione degli effetti e conserva le topologie.

Il deploy pubblico e il parent Framer non sono stati modificati. Il pacchetto contiene il child da distribuire.

## Controlli automatici

`npm test`: dieci script, tutti superati. Copertura: proporzioni e spazi dei controlli su sette viewport; proiezione e topologie; asset; colore e maschere dei glifi; route/bridge; particelle e reduced motion; retargeting e sincronizzazione; campo a cluster; bordo unico; accorpamento del resize, inizializzazione differita e metriche corrette sulle card nascoste.

Controlli del resize: venti eventi accorpati in un frame CSS e un solo aggiornamento differito degli effetti; nessun lavoro su misure invariate; inizializzazione prioritaria delle tre card visibili. I canvas delle card rispettano il limite di 1,5 milioni di pixel anche a 2560 × 1440, 3840 × 2160 e 5120 × 2880.

Il controllo del bordo esercita 80 frame con trasformazioni traslate introdotte deliberatamente. Il reset assoluto impedisce copie o linee residue. La prova raster del nuovo perimetro rileva un solo picco sul contorno e nessuna linea parallela interna. Un controllo aggiuntivo con decoder raster ha aperto correttamente tutte le 20 immagini WebP responsive.

## Browser R9

- Fondo osservato isolato: due zone dense e centro aperto, facce neutre differenziate, vertici chiari e picchi ambra locali lungo gli spigoli. La luminosità in quiete è stata ricalibrata dopo la prima verifica visiva.
- Layout osservato a 1200 × 800 e in iframe mobile 390 × 844: card centrata, titolo entro il padding, controlli e dock separati.
- Sequenza 390 × 844 → 1000 × 600 → 430 × 900 → 1200 × 800: il centro della card coincide con quello del viewport; al termine la card desktop misura 960 × 480 CSS px e tutti e cinque gli effetti risultano inizializzati. Il browser remoto può ritardare i singoli frame intermedi.
- Dieci richieste consecutive di selezione, programmate ogni 60 ms: navbar e card selezionata coincidono dopo ogni input, PASS 10/10. La coda limitata può accorpare gli input quando il rendering del browser remoto è rallentato.
- Dopo la navigazione tutte le cinque immagini risultano decodificate, con `naturalWidth` 960 nella prova desktop. Il caricamento delle varianti durante un primo giro di test è stato interrotto dall’arresto del server di anteprima condiviso; riavviando l’anteprima il problema non si è ripresentato.
- Hover nell’angolo verificato su desktop e mobile: contorno sottile unico e bagliore esterno locale. Nessun ventaglio di linee traslate.
- Reveal fermato al 55%: dissolvenza sulle stesse facce triangolari dell’hover con intensità differenziate.
- Reduced motion: Services → Projects operativo e maschera attiva `none`.
- Nessun errore dei moduli applicativi nei log osservati; presenti messaggi interni all’estensione del browser, estranei al sito.

## Misure e limiti

Il confronto della sola geometria, sullo stesso processo Node a 1920 × 1080, passa da 766,12 ms a 8,75 ms per la preparazione iniziale di cinque card + fondo. Le chiamate ripetute riusano la topologia: media 856,19 ms R8 e 0,07 ms R9. Numeri e metodologia sono riportati nel changelog.

Il browser remoto osservato aggiorna l’animazione a circa 1–2 fps; questo impedisce di certificare la fluidità percepita o 60 fps su hardware reale. Un campione della R9 assestata riportava CPU media del frame 2,9 ms desktop e 1,3 ms mobile; sono misure locali del codice JavaScript e non includono tutto il costo GPU/compositor. Le preparazioni complete degli effetti restano task più costosi (campioni circa 72–108 ms nel browser remoto), ora differiti rispetto al cambio di layout. La prova mobile usa un iframe responsivo, non un telefono fisico.

Per QA locale copiare temporaneamente `scripts/qa-r9.html` in `dist/`; rimuoverlo prima della pubblicazione. Il pacchetto pubblico non include questa pagina.
