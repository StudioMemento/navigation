# R12 — direzione e verifica

## Richiesta

Applicare al NAV gli effetti sviluppati sulla START (V23, "no background, VFX fix"). La START è l'implementazione di riferimento del DNA "Memento — VFX DNA"; il DNA prevede che la navigation la segua con le stesse regole e le stesse costanti.

## Cosa è stato portato

Dalla START, invariati nelle costanti: reazione a catena sulle celle (`chain`), rete di Delaunay a una sola scala con visibilità per cella (`geometry`), luce del bordo a 96 segmenti (`border`), campo di distanza dei glifi (`sdf`), particelle (scintille dai glifi, schegge dalle tab), puntatore (velocità e quiete), formule della struttura (fasce, caricamento, rumore specchio degli shader), shader di struttura, overlay delle card, overlay dei titoli, bloom selettivo, striatura e grade finale. I test della START sono stati portati su `node:test` (`tests/vfx.test.mjs`).

Adattato al NAV (scritto anche in `docs/dna/applicazione-alle-pagine.md`): le superfici sono piani in prospettiva, le scene mostrano i propri colori in hover, il titolo è della tab, le fasce 15/70/15 valgono per il carosello, le secondarie rispondono come vicine, la tab che arriva accende il bordo da cui arriva, le scintille del caricamento sono scalate sulle celle, le luci delle scene entrano nel bloom solo in hover, il loop si ferma a riposo.

Rimosso dalla R11: reticolo di sfondo e il suo bagliore che seguiva il puntatore, scia di triangoli dal puntatore, luci delle scene animate a riposo, lettere "calde" entro 135 px dal cursore. Sono tutti casi che il DNA esclude: disco che segue il cursore, ambra a riposo, loop decorativi.

## Scelte da confermare

- **Bianco e nero a riposo.** La R11 mostrava la scena attiva all'80% di saturazione anche senza puntatore. Il DNA vuole quiete al 0%: ora la scena si colora solo quando il puntatore è sulla tab (su desktop quasi sempre) o durante un tocco. Su telefono, quindi, la navigazione a riposo è in bianco e nero. Per tornare al colore a riposo basta portare la saturazione di quiete a 0,8 in `CARD_FRAG` (riga `col.rgb=max(...)`); sarebbe una deroga al DNA da scrivere in `applicazione-alle-pagine.md`.
- **Anteprime delle sezioni vicine.** Le secondarie, che stanno nelle fasce alta e bassa, ora si frammentano verso il bordo e allo stop perdono le celle in uscita: si leggono come la sezione che arriva e quella che se ne va, non come immagini intere sfocate.
- **Titolo caldo su tutta la tab.** Il gradiente ambra del titolo si accende con il puntatore ovunque sulla tab, non solo sopra le lettere; il range giallo resta legato alla vicinanza al titolo.

## Verifica del 14 novembre 2026

- `npm test`: 21 test superati (6 della R11, 15 portati dalla START e adattati: fasce, reversibilità, reduced motion, tab attiva nella fascia di lettura su sei viewport, caricamento, catena, rete, bordo, puntatore, particelle, campo di distanza, impaginazione dei titoli, palette).
- `npm run build`: riuscita. JS 620 kB (166 kB gzip), R11 575 kB (147 kB gzip).
- Chrome headless con renderer software (SwiftShader), console senza errori: 1440 × 900, 1280 × 800, 1024 × 640 con `?lab=1`, 390 × 844 touch a DPR 3, 844 × 390 touch. Stati controllati per fotogrammi con `?qa=1`: caricamento, quiete, hover, movimento verso il titolo, range fermo sul titolo, vicinanza dal bordo alto, uscita del puntatore, cambio sezione (tre fotogrammi), arrivo, riposo; trascinamento verticale lento con ritorno; tocco su mobile; `?motion=reduce`; fallback senza WebGL (navigazione DOM, hover e passaggio a Services).

## Non verificato o limite noto

- **Prestazioni reali.** Il renderer software dà 1–3 fps: nessuna misura su GPU o telefoni. Il costo CPU per frame è basso (catena e scrittura dell'energia di una tab grande: 0,15 ms in Node), ma il frame in half float con MSAA ×4 pesa sulla GPU; DPR limitato a 1,65 su desktop e 1,35 su mobile come nella R11, profilo che scende da solo sopra i 30 ms. Su un ridimensionamento le reti delle tab visibili si ricostruiscono (circa 25 ms la struttura, 10 ms per tab), le altre quando arrivano.
- **Safari e Firefox**, in particolare il disegno dei glifi su canvas rispetto al DOM. Il titolo WebGL è impaginato con le misure del canvas, non letto dal DOM: la posizione coincide in Chrome, non l'ho misurata altrove.
- **Iframe su mementostudio.it.** Non verificato nell'embed reale; il bridge non è cambiato.
- **Velocità reale delle transizioni.** Le sequenze in movimento sono state controllate per fotogrammi, non a velocità reale: la frammentazione nelle fasce si vede soprattutto trascinando, perché il carosello arriva in circa 0,3 s.
- **Fallback DOM del titolo.** Il gradiente CSS copre il box dell'`<h2>`, quello WebGL va dalla linea delle maiuscole alla linea di base: in fallback il passaggio di tono cade un po' più in basso.
- **Kit della navbar.** Allineata solo la palette (accento, aloni, icone). Il kit della START è alla 12.1.0 (icone WebP da pochi kB invece dei thumb da 0,4–0,75 MB, markup dichiarativo); l'aggiornamento completo del kit è un passo a parte.
