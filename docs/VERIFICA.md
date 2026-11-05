# Verifica Hub fullscreen V4

5 novembre 2026.

## Origine e interventi

Base: MEMENTO_NAV_FULLSCREEN_V3_VERCEL.zip. Il deploy mementonav.vercel.app è stato ispezionato nel Chrome collegato. Il drag iniziato sul titolo non cambiava sezione; il browser mostrava le vecchie cover mentre il pacchetto V3 conteneva i nuovi ambienti.

V4 estende le gesture all’area comune di tavole e titolo, impedisce il clic dopo un trascinamento, gestisce cancellazione/cambio finestra e ingrandisce il chevron inferiore. Le 15 WebP rimangono identiche alla V3; la build le pubblica con un nuovo percorso determinato dal loro contenuto.

## Controlli automatici

- `npm run check`: superato. Sintassi, import, asset, destinazioni dello slider e della navbar.
- `npm test`: 3 test superati su loop, URL di selezione e contesto dei link.
- `npm run build`: superato. 15 immagini sotto `assets/scenes-da227f4fee7c`; nessun riferimento a `/assets/images/` in HTML e applicazione pubblicati.
- Confronto binario delle immagini con il pacchetto V3: 15/15 identiche.
- Archivio ZIP verificato per integrità e struttura alla root.

## Browser

La build finale è stata verificata in Chrome nell’ambiente di anteprima. Il Chrome collegato è stato usato per riprodurre il difetto sul deploy pubblico; non raggiungeva il server locale della build.

| Viewport | Nessun overflow orizzontale | Titolo dentro la tab | Chevron separato dal dock |
|---|---|---|---|
| 1363 × 936 | Sì | Sì | Sì |
| 390 × 844 | Sì | Sì | Sì |
| 360 × 800 | Sì | Sì | Sì |
| 768 × 1024 | Sì | Sì | Sì |
| 1024 × 768 | Sì | Sì | Sì |
| 844 × 390 | Sì | Sì | Sì |
| 2048 × 803 | Sì | Sì | Sì |
| 2560 × 1080 | Sì | Sì | Sì |

- Le cinque immagini wide e portrait vengono caricate dal percorso versionato.
- Drag iniziato sul titolo: Studio → Services su desktop e viewport mobile, senza navigazione accidentale.
- Drag breve: nessun cambio pagina o apertura accidentale.
- Frecce laterali e ciclo delle cinque sezioni verificati.
- Tastiera: End seleziona Start; ArrowRight torna a Studio.
- Tavola, titolo, chevron e voce attiva della navbar concordano su tutte e cinque le destinazioni.
- Clic reale sul titolo Services: apre https://mementostudio.it/services.
- Indietro: conserva Services e ripristina l’interazione.
- Landscape finale: 9 px fra area del chevron e dock, senza sovrapposizione.

## Limiti

I formati responsive sono verificati con viewport in iframe, non su dispositivi fisici. Il drag provato usa il mouse; lo swipe touch condivide i Pointer Events, ma non è stato testato su hardware touch. Trackpad fisico, Safari, Firefox, modalità movimento ridotto e prestazioni su telefono non sono stati verificati in questa sessione.

La consegna è uno ZIP: il deployment pubblico non è stato aggiornato. Per attivare i fix, sostituire i file del repository con il contenuto dello ZIP e lasciare eseguire la build Vercel.
