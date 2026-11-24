# Studio — integrazione overlay V12

Data: 6 novembre 2026.
Base: sorgente Studio `c16a73e5b59324851b9f4d0616baa1d769f9e514`.
Kit: `O V E R L A Y(4).zip`, cartella `MEMENTO_NAVBAR_OVERLAY_V12/navigation/` copiata integralmente e senza modifiche.

## Risultato

- Un solo bootstrap, pagina attiva `memento` e destinazioni canoniche del kit.
- Wordmark superiore e navbar inferiore. Blur: otto filtri per bordo, ciascuna fascia alta il 20% della viewport.
- Rimossa l'ancora del vecchio logo. Tre controlli dello Studio sopra la navbar; azioni e joystick senza sovrapposizioni.
- Controlli dello Studio sopra il livello blur, scena 3D sotto il livello blur. Le fasce non intercettano i puntatori.
- Gestione dei gesti della scena protetta dal ritorno automatico al contenitore. Escape nel focus o nella vista interna resta disponibile al controller originale.
- Nessuna modifica al bundle 3D, ai suoi moduli, ai modelli, ai materiali o ai setup di illuminazione.

## Verifiche eseguite

- 24 verifiche originali del kit superate: destinazioni, bridge, geometria dei loghi, maschere e sintassi.
- Verifica integrazione Studio superata, inclusi gli hash degli asset V4.
- Browser: un solo componente V12, Studio attivo, sei link corretti, nessun logo precedente.
- Navigazione con freccia destra: focus spostato da Studio a Services.
- Layout con HTML/CSS effettivi e interfaccia resa visibile in fixture temporanea: 320 × 568, 390 × 844, 844 × 390, 1440 × 900. Nessuna sovrapposizione tra wordmark, navbar, controlli, azioni e joystick; nessun overflow orizzontale. Target navbar 48 × 48 px. Fascia logo/navbar 280 px a 320 px, 320 px nelle altre misure.
- Blur visivamente presente sopra la griglia di controllo; otto livelli per fascia.

## Limiti

Il browser di verifica ha WebGL disabilitato e non può creare il contesto della scena 3D. La verifica visiva dell'overlay e delle spaziature è stata svolta separatamente dalla scena, utilizzando la stessa interfaccia e una griglia temporanea. Non sono verifiche su dispositivi fisici o Safari. Il renderer e gli asset 3D sono invariati rispetto alla base. Le fixture temporanee non sono incluse nel sito o nello ZIP.

## File di integrazione

`dist/index.html`, `dist/navigation/`, `dist/studio-overlay.css`, `dist/studio-overlay.mjs`. Il controllo di integrazione esistente è aggiornato per la nuova navbar. Nessuna nuova dipendenza.
