# QA R8 — 7 novembre 2026

## Analisi produzione

Ispezionati in Chrome il dominio mementostudio.it e il suo iframe mementonav.vercel.app. Il child R7 aggiorna la navbar al termine dello spring; la R8 aggiorna il target e la navbar insieme all’input. Il dominio pubblico non è stato modificato durante questa lavorazione.

## Controlli automatici

`npm test`: tutti i nove script passano. Copertura: proporzioni e margini su sette viewport; mesh e proiezione; asset; colori e maschere della tipografia; ripristino route e bridge; particelle; retargeting rapido e rotella continua; densità e animazione del fondo; reticolo unico e pulizia del canvas bordo.

La regressione del canvas esercita 80 frame sull’angolo con trasformazioni traslate appositamente introdotte: la pulizia ripristina ogni volta il perimetro reale. Controllo aggiuntivo su Canvas raster reale: 80 immagini del bordo identiche nonostante la trasformazione inquinata.

## Verifica browser della R8

- Composizione osservata a 1200×800 e iframe mobile 390×844: titoli a peso 300, nessun overflow nella card, chevron e dock separati.
- Hover prolungato nell’angolo alto sinistro: bordo luminoso unico, senza copie traslate o linee ripetute come nello screenshot segnalato.
- Hover mobile su testo e chevron: luce ambra locale, contorni e alone esterno visibili; testo HTML conservato.
- Reveal fermato al 55%: ricostruzione per facce triangolari, fronti ambra con intensità differenziata.
- Dieci selezioni consecutive richieste a intervalli di 60ms: stato della navbar e sezione selezionata coincidono dopo ciascuna selezione; risultato PASS su tutte le dieci verifiche. Il browser può rallentare i timer.
- Reduced motion: Studio → Services operativo, navbar Services, tutte le cinque foto decodificate, maschera della card attiva `none`.
- Nessun errore applicativo osservato. Il browser cloud ha emesso un errore interno alla propria estensione, estraneo ai moduli del sito.

## Limiti

Il browser cloud limita l’animazione osservata a circa 1 fps: non consente di certificare 60fps o la sensazione temporale su hardware reale. Lo spring è verificato numericamente e la sincronizzazione è verificata nel browser; fluidità finale e swipe fisico vanno confermati sul dispositivo dopo il deploy. La prova a 390px è un iframe responsivo, non uno smartphone fisico.

Il pacchetto contiene il child aggiornato e il bridge già esistente; nessuna modifica o nuova pubblicazione del parent Framer è stata eseguita.
