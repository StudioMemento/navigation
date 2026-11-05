# Verifica navigazione V5

5 novembre 2026.

## Asset

Il pacchetto `nav.zip` fornito dall’utente contiene 12 PNG: dieci scene uniche (cinque wide, cinque portrait) e due duplicati identici. Tutti i PNG sono conservati, byte per byte. Nessuna immagine generata durante questa revisione. I WebP derivano soltanto da questi file; la mappatura e le impronte SHA-256 sono in `ASSET_MAPPING.json`.

## Controlli automatici

- `npm run check`: superato. Sintassi, import, riferimenti locali, asset, originali e destinazioni della navigazione.
- `npm test`: sei test superati. Loop, URL, contesto dei link, drag in entrambe le direzioni, scroll verticale, tap, trascinamenti brevi e flick.
- `npm run build`: superato. Quindici immagini versionate sotto `assets/scenes-c3f36f79b5c8`; nessun riferimento pubblico alla vecchia cartella `/assets/images/`.
- Integrità ZIP e confronto binario di tutti i 12 PNG con l’allegato originale.

## Browser

La pagina Servizi è stata ispezionata nel Chrome collegato: rapporto della tavola 2:1 desktop e 1:1 mobile. La nuova build è stata verificata in Chrome nell’ambiente di anteprima, anche con viewport in iframe.

| Viewport | Rapporto tavola | Titolo dentro la tavola | Nessun overflow | Chevron proporzionale |
|---|---|---|---|---|
| 1363 × 936 | 2:1 | Sì | Sì | Sì |
| 390 × 844 | 1:1 | Sì | Sì | Sì |
| 360 × 800 | 1:1 | Sì | Sì | Sì |
| 768 × 1024 | 2:1 | Sì | Sì | Sì |
| 1024 × 768 | 2:1 | Sì | Sì | Sì |
| 844 × 390 | 2:1 | Sì | Sì | Sì |
| 2048 × 803 | 2:1 | Sì | Sì | Sì |
| 2560 × 1080 | 2:1 | Sì | Sì | Sì |

- Immagini nuove dello ZIP caricate; varianti portrait nella vista mobile.
- Drag dal titolo: Studio → Services su desktop e mobile, senza apertura accidentale.
- Freccia sinistra: Services → Studio. Freccia destra: Studio → Services.
- Chevron inferiore: navigazione reale dall’hub incorporato a `https://mementostudio.it/services`; Indietro torna alla selezione.
- Test stabilità del titolo: zero modifiche DOM al testo di base durante sette movimenti del puntatore nell’intervallo monitorato. L’overlay luminoso è indipendente dalle lettere di base.
- Rapporto SVG mantenuto, vertice 90°; distanza fra tavola e chevron 20 px desktop, 24 px mobile, 12 px landscape. Nessuna sovrapposizione con il dock.

## Limiti della verifica

Lo swipe touch usa gli stessi Pointer Events del drag e il riconoscitore è coperto dai test; non è stato provato su hardware touch fisico. Non sono stati misurati FPS su telefono né verificati Safari/Firefox o trackpad fisici. Il monitor DOM dimostra la stabilità strutturale del titolo; non costituisce una misura del rendering su ogni GPU.

Questo ZIP è la consegna da caricare nel progetto Vercel; non è stato eseguito un nuovo deploy pubblico.
