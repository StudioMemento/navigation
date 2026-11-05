# Verifica Hub fullscreen V3

5 novembre 2026. Build statica verificata in Chrome desktop con viewport responsive in iframe.

## Controlli automatici

- `npm run check`: riferimenti locali, sintassi moduli, asset wide/small/portrait, cinque cover distinte e corrispondenza fra destinazioni dello slider e della navbar.
- `npm test`: tre test passati su loop, selezione da URL e destinazioni canoniche con contesto filtrato.
- `npm run build`: directory statica completa, comprensiva di navbar e asset locali.
- ZIP estratto in una directory nuova: controlli, test e build ripetuti con esito positivo.

## Controlli nel browser

| Viewport | Nessun overflow | Titolo dentro la tab | Chevron separato dal dock |
|---|---|---|---|
| 1363 × 936 | Sì | Sì | Sì |
| 390 × 844 | Sì | Sì | Sì |
| 360 × 800 | Sì | Sì | Sì |
| 768 × 1024 | Sì | Sì | Sì |
| 1024 × 768 | Sì | Sì | Sì |
| 844 × 390 | Sì | Sì | Sì |
| 2048 × 803 | Sì | Sì | Sì |
| 2560 × 1080 | Sì | Sì | Sì |

- Tutte e cinque le selezioni: titolo, tavola e chevron condividono la destinazione corretta; navbar attiva coerente.
- Immagini wide e portrait caricate; inquadrature dedicate e soggetto principale contenuto per intero.
- Frecce, tastiera e trascinamento del puntatore verificati. Drag nel viewport mobile senza apertura accidentale.
- Ingresso reale da titolo e tavola attiva verso Services.
- Ingresso reale dal chevron dell’hub incorporato verso Services nella finestra superiore.
- Ingresso reale da Start nella navbar dell’hub incorporato verso Start nella finestra superiore.
- Indietro: selezione Services recuperata, uscita azzerata e hub di nuovo interattivo.

## Limiti

La verifica responsive usa viewport del browser, non dispositivi fisici. Lo swipe touch usa gli stessi Pointer Events del trascinamento ed è predisposto nel codice; non è stato provato su hardware touch. Non sono stati misurati FPS su telefono né eseguiti test Safari/Firefox. La modalità movimento ridotto è gestita nel CSS e nella navigazione, ma non è stata simulata nel browser di verifica.

La dissolvenza riguarda l’uscita dall’hub. Il caricamento delle pagine di destinazione dipende dai rispettivi progetti. Nessun nuovo deploy pubblico è incluso nella consegna ZIP.
