# MEMENTO NAV R3 — Verifiche

Data: 6 novembre 2026. Ambiente: Chrome remoto, desktop Linux. Le dimensioni mobile/tablet sono viewport di iframe di verifica; non sono dispositivi fisici o emulazione touch completa.

## Prove automatiche eseguite

`node scripts/verify.mjs` e `node scripts/verify-artifact.mjs`.

- Formati e cornice minima esterna del 20% su sei viewport.
- Segno della rotazione e bordo esterno più vicino e apparentemente più largo sulle due secondarie.
- Distanza proiettata dell'edge interno maggiore di metà card + 44 px.
- Proiezione/inversione del punto locale su piani inclinati.
- Continuità ciclica, selezione dell'indice più vicino, direzione e annullamento dello snap.
- Triangolazione deterministica: 80 facce, area totale unitaria per la fixture di controllo.
- URL esatti, presenza e intestazioni dei file immagine, icone/font e sintassi dei moduli.
- Presenza strutturale dei gestori di cancel/visibility, decode, fallback e movimento ridotto.
- Controlli negativi: tilt inverso e asset assente vengono respinti.
- WebP responsive + JPEG delle cinque scene: 953.693 byte complessivi.

I controlli strutturali non sostituiscono prove del touch reale o una misura prestazionale su hardware finale.

## Dimensioni osservate

| Viewport | Card | Rapporto | Osservazione |
|---|---:|---:|---|
| 390 × 844 | 234 × 292,5 | 4:5 | Studio e Start: titolo nella superficie, card adiacenti e controlli separati |
| 834 × 1194 | 500,4 × 500,4 | 1:1 | Projects: titolo interamente contenuto, nessun reset della sezione |
| 1440 × 900 | 864 × 432 | 2:1 | Projects/LevelUp/Start: card dominante e navbar sincronizzata |
| 2560 × 1080 | 1296 × 648 | 2:1 | Start: proporzioni e margini conservati |
| 844 × 390 | 468 × 234 | 2:1 | Logo, card, chevron e navbar leggibili; anteprime periferiche ridotte dalla finestra |
| 320 × 568 | 192 × 240 | 4:5 | Solo calcolo automatico, non revisione visiva |

Verificata anche la pagina diretta nel viewport Chrome 1363 × 936.

## Interazioni osservate nel browser

- Selezione tramite navbar di Studio, Projects, LevelUp e Start.
- Chevron e cambio di card; aggiornamento del titolo documento, hash, stato accessibile e icona attiva.
- Rotella verso il basso: Start → Studio, un passaggio per il gesto osservato.
- Drag verso l'alto: LevelUp → Start. Nessuna apertura accidentale della destinazione.
- Click sulla secondaria inferiore: Studio → Services. La card si centra, senza aprire il sito di destinazione.
- Loop Start → Studio osservato; aritmetica del loop inverso verificata automaticamente. Input ArrowUp inviato nel browser; il suo esito finale non è stato isolato prima del successivo aggiornamento.
- Ridimensionamento mobile → tablet → landscape → desktop → ultrawide mantenendo la sezione selezionata.
- Tutte e cinque le immagini risultavano complete e decodificate; corrispondenza Services/card/navbar verificata nel DOM.
- Superfici nitide e opache; campo esterno ai lati. Luce di prossimità e accento locale del bordo visibili.
- La prima implementazione del blur produceva un artefatto di riflessione su Start: rimosso il backdrop-filter e sostituito con una copia della stessa immagine sfocata e mascherata. Nuova schermata verificata senza quell'artefatto.

La costruzione usa clip triangolari distribuite realmente applicate all'intera superficie. La verifica visiva ha controllato gli stati stabili; non è stata acquisita una registrazione ad alta cadenza dell'intera sequenza appear/disappear.

## Prestazioni e limiti aperti

La sessione remota ha restituito cadenze rAF irregolari (campioni 0,1–2,4 fps) e tempi medi dei callback JavaScript fra circa 1 e 12,2 ms. Questi campioni non certificano il target di 60 fps e non includono una misura completa GPU/compositor. Occorre profilare la versione sul browser e hardware finali.

Non eseguiti: Safari/iOS e Chrome/Android su telefoni fisici, pinch reale, swipe con inerzia touch reale, throttle di rete controllato, cache completamente vuota su dispositivo, GPU mobile, toggle OS del movimento ridotto, sospensione/ripresa reale del telefono, apertura finale di tutte le destinazioni esterne. I relativi percorsi sono implementati ma non vanno considerati certificati.

Il bug intermittente mobile storico non è dichiarato risolto su dispositivo. Il caricamento di questa versione è stato verificato per le cinque immagini nel browser remoto.

## Ambito

Nuova NAV separata. Non modificati progetti, sorgenti o impostazioni delle pagine Studio, Services, Projects, LevelUp e Start, né il deploy Vercel attuale.
