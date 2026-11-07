# QA R6 — 7 novembre 2026

`npm test`: tutti i contratti passano: geometria/proiezione, VFX, artifact, regressione typo NaN, route/bridge e cleanup.

Verifica visiva nel browser di anteprima: primo hover debole sul bordo e hover diretto sulla scritta mantengono il testo pieno e leggibile; immagine originale a colori. Gate immagine confermato colore → neutro. Pointerup/cancel simulati: un impulso al rilascio, nessuno aggiuntivo al cancel.

320 × 568: misurate separazioni di 12 px logo/freccia e freccia/dock, nessun overflow. Hint nascosto su schermo compatto. I test numerici coprono desktop, tablet, portrait e landscape, incluse insets estese.

Il browser cloud limita i frame a circa 1 fps: non costituisce benchmark di fluidità. Touch verificato con eventi Pointer simulati; resta da provare su hardware mobile.

Il bridge Framer è verificato con messaggi, origini, source e request ID in test; l’installazione sul parent di produzione è separata dal deploy del child.
