# R15 — effetti della START V28 sulla navigazione ottimizzata

## Richiesta

La navigazione ottimizzata pubblicava tutte le pagine su Vercel senza iframe Framer, con il contenuto HTML e senza effetti. Lo sfondo resta tolto. Gli effetti visivi della START V28 vanno riportati sulla navigazione e devono restare leggeri.

## Cosa torna

Il codice degli effetti c'era già: `src/renderer.js` per il carosello della Home e `src/surfaces/` (`/memento-ui/effects.mjs`) per le pagine. Erano spenti nel contenitore Vercel. Il nucleo è lo stesso della START V28: catena, rete, bordo, campo di distanza, particelle, tocco, struttura e input sono identici a `memento-start/src/vfx`.

- **Home.** Il carosello torna disegnato dal renderer: scene in bianco e nero a riposo, ambra in hover, titoli con gradiente, range e reticolo, luce del bordo, schegge, tocco a percorsi e fasce 15/70/15.
- **Start, Servizi, Portfolio, LevelUp.** Le superfici `data-vfx` tornano disegnate dall'engine condiviso, con le stesse regole della START V28 (finestra di dettaglio di Servizi compresa). Studio 3D non cambia.
- **Senza sfondo.** Ghost Fibers non c'è: `mountBackground()` resta vuota, `.start-background` resta nascosto e la pagina usa un solo contesto WebGL.
- **Senza sequenza di caricamento sulle pagine.** La pagina HTML è già sullo schermo e l'engine la sostituisce senza ricostruirla per celle, come nelle sezioni native della R14.

## Ottimizzazioni

| | Prima (R14 con effetti) | R15 |
| --- | --- | --- |
| Pagina a riposo | 30 fotogrammi/s senza fine (lo sfondo girava comunque) | 0: il loop si ferma 1 s dopo l'ultimo cambiamento |
| Mouse sulla finestra, nulla di acceso | 60 fotogrammi/s | nessun fotogramma |
| Hover fermo (respiro lento, impulsi a cursore fermo) | 60 fotogrammi/s | 30 fotogrammi/s (`VFX.runtime.calmFps`) |
| Avvio | download subito, creazione dopo il primo paint | download dopo il primo paint, creazione nel primo momento libero (`requestIdleCallback`, max 0,9 s) |
| Primo fotogramma | compila gli shader e blocca la pagina | shader compilati prima della presa in carico, in parallelo dove la GPU lo consente (`KHR_parallel_shader_compile`) |
| Risoluzione | DPR del profilo | DPR del profilo + budget di pixel (high 8,3 MP, medium 4,2 MP, low 2,4 MP): un 14" resta a DPR 2, un monitor 5K non alloca più 15–20 MP in half float |
| Profilo che scende | MSAA ×2 restava allocato | il buffer multisample viene rilasciato |
| Risveglio | il tratto percorso dal mouse durante la pausa diventava velocità (scintille) | la velocità riparte da zero |
| Visita | sempre | `?vfx=off`, Save-Data e dispositivi sotto i 2 GB: pagina HTML; 2 GB: profilo low |

Cosa sveglia il loop: puntatore, tocco, scroll, resize, focus, apertura di dialog, transizione finita, immagini e testi che arrivano, cambi di layout delle superfici. Durante lo scroll si disegna a ogni fotogramma, come nella START (il contenuto delle superfici è sulla GPU). Allo stop la deriva delle celle in uscita dura come prima (DNA, `struttura-e-scroll.md`), poi il loop dorme.

L'aspetto non cambia: costanti, shader e tempi sono quelli della START V28. Il DNA (`movimento.md`) chiede già che a riposo nulla si muova; senza sfondo questo vale anche per la GPU.

## File

- `src/vfx/policy.mjs` (nuovo): decisione per visita e profilo di partenza.
- `src/vfx/config.mjs`: `VFX.runtime` (`fps`, `calmFps`, `idle`), `pixels` nei profili, `pixelRatio()`, `NAV.idle`/`fps`/`calmFps` dal runtime.
- `src/paint.mjs`: `whenIdle()`.
- `src/surfaces/index.ts`: la policy sostituisce il blocco delle pagine native; download e creazione differiti.
- `src/surfaces/engine.ts`: loop che dorme e `wake()`, cadenza calma, nessun disegno prima della presa in carico, budget di pixel, MSAA, precompilazione, metriche `sleeps`/`wakes` e `running`.
- `src/renderer.js`: profilo dalla policy, budget di pixel, MSAA, precompilazione, `calm`, `settle()`.
- `src/main.js`: il carosello avvia il renderer nel contenitore; il blur CSS della navbar e il feedback HTML lasciano il posto al canvas nel fotogramma in cui va live; cadenza calma; risveglio senza picchi.
- `src/vfx/input.mjs`, `src/surfaces/input.ts`: `settle()`.
- `tests/runtime.test.mjs` (nuovo): policy, profilo di partenza, budget di pixel, riposo, risveglio e controlli sul sorgente.

## Verifica del 23 novembre 2026

- `npm test`: 49 test superati (43 esistenti, 6 nuovi). `npm run build`: riuscita, con le cinque sezioni ai commit di `sections.lock.json`.
- Chrome headless con renderer software (SwiftShader). Per provare il percorso predefinito senza `?vfx=` il nome della GPU è stato simulato come hardware; con il nome reale il sito mostra le pagine HTML, come prima.
  - Home, Start, Servizi, Portfolio e LevelUp vanno live senza parametri, console senza errori.
  - A riposo: 0 fotogrammi/s. Con l'engine precedente, sulla stessa pagina e con lo stesso profilo: 24 fotogrammi/s.
  - Hover, uscita del puntatore, tocco su 390 × 844, scroll: il loop si sveglia, disegna e si riaddormenta. Il profilo è sceso da medium a low per la lentezza del renderer software e il buffer MSAA è stato rilasciato.
  - Finestra di dettaglio di Servizi: l'engine passa alla finestra e torna alla pagina.
  - `?vfx=off`, `?lab=1`, `?motion=reduce`: come previsto.
- Studio 3D: in anteprima locale registra un 404 e un `Failed to fetch` identici sulla build originale; non dipende da questa release.

## Non verificato

- **GPU e telefoni reali.** Il renderer software disegna pochi fotogrammi al secondo: la cadenza a 60/30 e i tempi in millisecondi non sono stati misurati. Vanno provati su un Mac, su un iPhone e su un Android di fascia media (`?vfxdebug` → `__vfx.metrics`).
- **Safari e Firefox**: il riposo del canvas, la compilazione in parallelo (Safari può non averla, e in quel caso compila in un colpo prima della presa in carico) e le barre del browser durante lo scroll.
- **Deploy su Vercel**: non eseguito.
