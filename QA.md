# QA R10 — 7 novembre 2026

## Produzione e mobile

Ispezionato il deploy in Chrome a 390 × 844. In questa prova la navbar era visibile: il difetto segnalato non è stato riprodotto, quindi non si attribuisce una causa certa. La R10 copre esplicitamente l’altezza visibile ridotta e l’iframe Framer più alto del viewport. Non è stata pubblicata né è stato modificato il parent di produzione.

## Regressioni

`npm test`: 12 script superati. Copertura: layout/controlli su sette viewport; VFX, reveal e glifi; route/bridge; retargeting e sincronizzazione immediata; topologia stabile del fondo; contorno unico; resize differito; viewport mobile/safe area; sei master e 25 varianti immagine. Controlli negativi verificano che origini estranee, valori non finiti, checksum errati e immagini corrotte vengano rifiutati.

Le nuove verifiche mobile esercitano toolbar, tastiera, pinch zoom, parent con iframe sovradimensionato e pulizia dei listener. Controllano anche l’assenza della sagoma d’ombra e i gradienti opposti delle preview.

Fondo: 100/88/68 vertici nei tre formati; copertura completa senza buchi; densità locale limitata; gradienti cache in quiete; shading radiale sfumato a zero; vertici da 0,9–1,15 px senza bloom. Animazione limitata in ampiezza, risposta locale e ritorno alla quiete verificati.

Asset: sei PNG 1254 × 1254, 20 WebP responsive e cinque fallback JPEG decodificati interamente; checksum e dimensioni verificati. Tutte le varianti scene insieme: 1.494.881 byte. I sei master originali rimangono in art/ e non sono trasferiti dalla pagina durante l’uso.

## Riscontri nell’anteprima browser

- 390 × 844: card larga 327,6 px; dock da y=784 a y=832, interamente entro il viewport.
- Host simulato alto 844 px con spazio visibile 724: layout e dock seguono 724 px; dock da y=664 a y=712, con 12 px di margine.
- 390 × 480: dock da y=420 a y=468; controlli e card restano separati.
- Fondo isolato a 1200 × 800: sfumature neutre tenui, piccoli vertici senza bloom e risposta ambra locale osservati.
- Dieci richieste rapide: selezione card e navbar coincidono a ogni input (10/10). La coda limitata accorpa alcune richieste mentre il browser remoto è rallentato.
- Tutte le cinque immagini risultano decodificate dopo la navigazione; ritaglio desktop 960 × 480 e mobile 327,6 × 409,5 osservati. I sei master sono stati ispezionati singolarmente.
- Resize 390×844 →1000×600 →430×900 →1200×800: centro della card coincidente con il viewport in tutte le misure; ritorno desktop 960×480.
- Reduced motion: Start → LevelUp → Projects → Services operativo, immagini e titoli leggibili senza transizione animata.
- URL immagini versionati R10 per invalidare la cache delle scene precedenti.
- Zero elementi card-shadow; gradiente della card attiva con opacità zero, preview con opacità uno e direzioni opposte.

## Limiti

Il controllo mobile avviene in un iframe responsivo e con simulazione del messaggio del parent, non su Safari/iPhone fisico. Il browser remoto aggiorna lentamente i frame (circa 1 fps nella sessione), quindi non certifica la fluidità percepita o 60 fps sul dispositivo reale. Le regressioni verificano l’accorpamento e il differimento del lavoro; la misura CPU JavaScript non include il costo completo GPU/compositor.

Il bridge Framer incluso deve sostituire il precedente blocco per applicare la correzione dell’altezza visibile cross-origin. Il ZIP non modifica automaticamente il parent.
