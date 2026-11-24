# Verifica LevelUp V20 · 16 novembre 2026

## Ambito

Testi, tavole, VFX, sfondo, reazione touch e migliorie mobile di START V27 applicati a LevelUp V19. Contenuti, caroselli, demo, confronti, step e Ready to start invariati.

## Controlli eseguiti

- **Motore VFX**: typecheck, 51 test in 7 file. Coperti: onda touch (percorsi sparsi, arrivi sfalsati, esaurimento, frame lento, superfici distanti, pool limitato, listener passivo) e board trasformate e ritagliate dal carosello. Coperti anche scroll nativo, invalidazione mirata, resize della sola altezza, navbar sulla viewport visibile, struttura e proiezione.
- **Pagina**: build `LEVELUP_BUILD_OK`, 20 test superati, 66 risorse locali risolte, 5 sezioni. Controllati bundle navbar e primo paint, modulo Framer con CORS, chunk di motore e sfondo, assenza di GSAP e di grana.
- **Chrome headless con WebGL2 software** (ANGLE/SwiftShader), sfondo escluso per lasciare il renderer agli effetti.
  - **Desktop 1440 × 900**: 27/27 superfici pronte, `vfx-live`, nessun errore. Canvas con margine di 128 px, sempre allineato al DOM dall'alto al fondo. Hover ambra sulle board e foto monocrome a riposo, come in V19. Con la demo espansa il motore si ferma e riparte alla chiusura.
  - **Mobile 390 × 844 touch**: foto a colori a riposo; le board laterali restano grigie come nel DOM.
  - **Un tocco**: l'onda raggiunge 5 superfici. Accende prima il titolo vicino e poi quello successivo; edge glow fino a 0,95. Tutto spento dopo circa 2,5 s, senza cerchi.
  - **Resize**: cambio della sola altezza (844 → 744 → 844) con 0 nuove rasterizzazioni.
  - **Scroll**: a 1500 px il canvas è traslato di 1373 px (scroll − margine).
- **Sfondo + effetti, mobile**: entrambi disegnati, ordine corretto (fibre dietro, superfici sopra, navbar in cima). Nel renderer software la combinazione è lentissima: l'ingresso degli effetti ha richiesto 154 s. Il dato non è indicativo di un telefono.
- **Senza WebGL**: `vfx-off`, pagina DOM completa e navbar visibile. Il tocco scalda in sequenza i titoli raggiunti, poi si spegne.
- **Embed** in iframe di un'altra origine.
  - Embed semplice: superficie opaca, sfondo, navbar subito visibile, link `_top`.
  - Con `?mementoEmbed=1`: trasparente, senza sfondo. Senza un vero hub il kit mostra comunque la propria navbar dopo 1,2 s, come START.

## Non verificato o limite noto

- **Prestazioni reali**: nessuna misura su GPU o telefoni. La pagina ha due contesti WebGL (sfondo ed effetti, come START) più gli iframe delle demo. Lo sfondo ha un tetto di 30 render/s, non un framerate garantito.
- **Safari e Firefox**: non provati, comprese barre native e inerzia iOS sul dispositivo.
- **Correttivo Framer**: è l'adattamento del modulo verificato in START V27, ma non è stato provato sulla pagina pubblica `/levelup`, che da qui non è raggiungibile. Va usato solo se quella pagina incorpora LevelUp con un embed URL.
- **Superficie in embed**: come in START, la trasparenza dipende da `?mementoEmbed=1` (parametro dell'hub). In V19 qualsiasi iframe era trasparente. Un host Tide che incorpora LevelUp senza quel parametro ora riceve fondo nero e fibre.
- **VisualFX, demo e Ready to start**: domini esterni non raggiungibili da questo ambiente, quindi non resi nel test (invariati rispetto alla V19).
