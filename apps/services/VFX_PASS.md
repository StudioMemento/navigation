# Servizi V41 — VFX PASS

## Risultato

- Un campo di prossimità condiviso attiva tipografia, chevron, filtri e bordi delle card vicine, anche quando il puntatore è nel gutter.
- Tipografia costruita dal font Inter effettivamente caricato: contorno dei glifi, triangoli interni e luce ambra locale. Il testo DOM rimane la fonte leggibile e accessibile.
- Una fascia di 13 px segue i tagli delle card. Nessuna triangolazione permanente sulle fotografie in idle.
- Load diagonale: particelle, struttura triangolare e rivelazione del contenuto reale tramite maschere SVG.
- Scroll reversibile: fascia superiore 2–16%, centro pienamente visibile 16–80%, fascia inferiore 80–100%. La stessa topologia viene riutilizzata nelle due direzioni.
- Estremi del documento, contenuti in focus, selezione e dialoghi aperti mantengono la leggibilità. Nei popup resta la reazione al puntatore, senza dissoluzione allo scroll.
- Un canvas visibile condiviso, superfici di lavoro riutilizzate, bitmap cache limitata, stop del loop quando non serve. Il canvas segue il top layer dei dialoghi nativi.
- Fallback leggibile per reduced motion, forced colors, errore del renderer e watchdog. Supporto del ciclo visibility/pagehide/pageshow e sospensione comunicata da un host affidabile.

## Configurazione

Modificare `src/fx-config.js`.

| Parametro | Valore |
| --- | --- |
| Raggio desktop / touch | 260 / 130 px |
| Smoothing puntatore | 70 ms |
| Attacco / rilascio | 120 / 380 ms |
| Load / handoff dopo input | 1050 / 100 ms |
| Watchdog preparazione / limite | 200 / 1400 ms |
| DPR massimo desktop / mobile | 1.5 / 1.25 |
| Budget particelle desktop / mobile | 120 / 48 |
| Cache target inattivi | espulsi oltre 28 target totali; i target attivi restano disponibili |
| Accento | #FF7950 |

Le superfici di transizione sono aggiornate quando cambiano scroll, layout o intro; il puntatore riusa la composizione già preparata. Non sono presenti dipendenze runtime aggiuntive.

## Verifica riproducibile

`npm test` esegue 9 verifiche: collegamenti/contenuti/asset e integrità del punto di ingresso; campo viewport per superfici alte; estremi del documento e overscroll; sequenza dei materiali; ricostruzione deterministica della topologia. Risultato della V41: **9/9 pass**. `npm run build`: **pass**.

Verifica visuale e geometrica in Chromium, DPR 1, tramite pagina di revisione:

| Viewport | Colonne catalogo | Overflow orizzontale | Canvas VFX |
| --- | --- | --- | --- |
| 1440 px | 5 | assente | 1 |
| 1024 px | 5 | assente | 1 |
| 768 px | 3 | assente | 1 |
| 390 px | 2 | assente | 1 |
| 360 px | 2 | assente | 1 |

Ispezionati: aspetto di base; bordi di card adiacenti nel gutter; rivelazione ai margini; titolo WEB DESIGN; layout mobile 360 px. Il renderer raggiunge lo stato idle. Sulla versione pubblicata verificati apertura, cambio tavola e chiusura del popup Brand online a 390 × 844 px; contenuto senza maschera di dissoluzione e un solo canvas nel top layer.

Controlli facoltativi:

- `?fx=off`: confronto senza VFX.
- `?fx-debug`: statistiche esposte in `data-fx-cpu`; la API `window.MementoVFX.stats()` separa CPU e intervallo fra frame.
- `?fx-frame=0.3`: still diagnostico del load; valori da 0 a 1.
- `tests/vfx-review.html`: harness locale con iframe, breakpoint, fasi del load, lifecycle e confronto 15 secondi. È escluso dalla pubblicazione.
- API: `window.MementoVFX.refresh()`, `.setEnabled(false)`, `.destroy()`.

## Limiti dichiarati

- **Nessuna certificazione 60 fps.** Il confronto browser FX off/on è stato limitato dal throttling in background a circa un frame al secondo in entrambi i casi. Questi numeri non misurano il costo reale dell'effetto. Profilare con tab in primo piano su desktop e smartphone reali.
- Non completati su hardware reale: touch iOS/Android, DPR 3, reduced motion del sistema, VoiceOver/TalkBack, stress prolungato dei popup e BFCache. Il fallback è implementato, ma questi casi non vengono dichiarati collaudati.
- Le sei fasi congelate del load non sono ancora una sequenza di screenshot certificata. La suite browser storica della V40 non è stata rieseguita integralmente sulla V41.
- La materia delle card prospettiche viene proiettata dalla matrice CSS reale, con 24 suddivisioni e ritaglio rispetto alle card davanti. I glifi sono misurati sul piano locale della card. Includere questa proiezione nel profiling su hardware reale.
- La proiezione è memorizzata per trasformazione: il movimento del puntatore riutilizza il bitmap. Dopo questa ultima correzione il motore pubblicato risultava attivo e idle, senza warning/error JS osservati; la cattura screenshot del browser è andata ripetutamente in timeout. **La verifica visiva finale della proiezione e della relativa cache resta incompleta**; non viene sostituita dai test matematici.
- Non viene introdotta una navbar locale; l'overlay del sito ospitante resta indipendente. Nessuna modifica al dominio Vercel è implicata dal pacchetto: è pronto per la normale pubblicazione.

## Embed

Lo scroll interno dell'iframe usa il proprio viewport. Un iframe mosso soltanto dallo scroll del parent rimane leggibile senza inventare un offset interno. L'host può sospendere il renderer con un messaggio `{type: 'memento:vfx:visibility', version: 1, visible: false}` inviato all'origine precisa dell'iframe; il child accetta solo il proprio parent e l'origine verificata dal referrer. Il messaggio inverso `visible: true` riprende il renderer.
