# QA R7 — Ambra V2 / 7 novembre 2026

## Controlli automatici

`npm test` supera i contratti per geometria e proiezione, VFX, asset, regressione typo/NaN, route/bridge, campo Ambra V2 e cleanup. La geometria copre sette viewport, inclusi portrait e landscape, e inset estesi: i bordi interni delle preview entrano nella proiezione della card centrale mantenendo profondità negativa. I controlli verificano anche la separazione delle hit area.

## Risultati nel browser di anteprima

- Composizione desktop e mobile osservata: preview dietro la card attiva, contatto ombreggiato, chevron sottili e nessun invito allo scroll. Le fotografie inattive non hanno un filtro blur; il kit navbar V12 mantiene il proprio overlay.
- Gate `IMAGE_80_100_PASS`: card attiva a riposo `grayscale(0.2) brightness(0.96)`, hover `grayscale(0) brightness(1.06)`, uscita nuovamente `grayscale(0.2) brightness(0.96)`. Entrambe le preview: `grayscale(1) brightness(0.82)`.
- Hover sul bordo: reticolo e glow locali, nessuna accensione uniforme della cornice. Hover sulla scritta: accento ambra locale nei glifi, riempimento chiaro e leggibilità conservati.
- Sequenza di movimento sulla scritta: emissione effettiva osservata dal contatore, picco di 7 particelle nella sessione cloud; non è un target di densità o un benchmark.
- 320 × 568: 12 px liberi tra logo/freccia e freccia/dock, nessun overflow, hint assente. Il layout della card resta leggibile.
- `TOUCH_CANCEL_PASS`: eventi Pointer simulati, un impulso al rilascio e nessuno aggiuntivo su cancel; pulizia di contatto e particelle.
- Modalità reduced motion: passaggio LevelUp → Start operativo, foto caricate 5/5, maschera della card attiva `none`, una sola navbar, nessuna particella o impulso residuo.

## Limiti

Il browser cloud rallenta l'animazione a circa 1 fps e non permette un giudizio affidabile sulla fluidità reale. La resa temporale dei triangolini e lo swipe vanno confermati su hardware desktop/mobile; i test Pointer simulati non sostituiscono questa verifica. I valori nel markdown Ambra V2 sono calibrazioni di implementazione, non misure ricavate dai concept.

Il bridge Framer è coperto dai test di messaggi/origini/source/request ID. La verifica del parent di produzione resta separata dal pacchetto child: `docs/framer-nav-bridge.html` contiene l'integrazione da installare nella home. Questa consegna non certifica un aggiornamento del dominio di produzione.
