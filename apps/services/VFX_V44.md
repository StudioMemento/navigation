# Servizi V44 — effetti, sfondo, touch e mobile di START V27

## V44.1 — correzione per Windows (Direct3D 11)

Sulla V44 pubblicata, con Chrome su Windows e una RTX 3070 Ti, il programma shader delle tavole non si collegava (`VALIDATE_STATUS false`). Il processo GPU andava in crash e il contesto WebGL veniva perso e ripristinato di continuo: lampi, schermo bianco e pagina DOM senza effetti.

- **Causa**: le estensioni Servizi passavano array uniformi per valore a funzioni con un ciclo (maschere doppie, velo, cornice delle tessere). La traduzione HLSL di ANGLE non riesce a compilarle. SwiftShader e Vulkan, usati nella verifica della V44, le accettavano.
- **Correzione**: la valutazione delle stop è srotolata e legge ogni array uniforme con indici costanti, senza parametri array né cicli. Il risultato è identico: nel confronto dei render la differenza media è sotto 1/255.
- **Verificato sulla GPU dell'utente**, nel browser integrato: gli shader della V44 perdono il contesto in circa 1,3 s, quelli corretti si collegano in 0,3–0,4 s. Si collegano anche tutti gli altri programmi del motore: titoli, particelle, bloom, composizione, grading.
- **Salvaguardia**: se uno shader non si collega o il contesto viene perso due volte, il motore si ferma e resta la pagina DOM (`vfx-off`), senza cicli di lampi. Un nuovo test vieta parametri array nelle funzioni GLSL.


## Base e integrazione

- Base: `MEMENTO_SERVIZI_V43_NAV_OVERLAY_VERCEL.zip`. Contenuti, asset, popup, filtri, hash, bozza email e navbar (kit 12.0.0) invariati.
- Motore: cartella `vfx/` di `MEMENTO_LEVELUP_V20_START27_FX_TOUCH_MOBILE_VERCEL.zip`, cioè START V27 con le stesse costanti e lo stesso materiale. Include le estensioni LevelUp (tavole 3D, ritaglio, focus) e quelle di Servizi elencate sotto.
- Sfondo Ghost Fibers con il preset START (cinque layer, senza grana). Licenza React Bits in `docs/ReactBits-LICENSE.md`.

## Estensioni Servizi del motore

Marcate `Servizi` nel codice; le funzioni pure sono in `vfx/src/servizi.ts` e coperte da test.

1. **Due maschere intersecate sulla fotografia**, orizzontale e verticale, come `--photo-mask`. Valgono anche quando la maschera sta su un antenato, come `.start-art`, con un box distinto da quello dell'immagine.
2. **Velo del titolo su mobile**: la copia sfocata della fotografia viene letta dalla stessa texture, a un livello di mipmap equivalente a `blur(10px)`. Mantiene la sua maschera dal basso, la sua opacità e l'ombra `::after`.
3. **Tessere del catalogo**: le maschere PNG sono descritte al motore da gradienti equivalenti, `--vfx-mask` e `--vfx-frame-mask`, con un errore massimo del 2–4%. La cornice sfuma in basso a riposo ed è intera in hover e focus.
4. **Trattini delle liste** (`li::before`) disegnati come piccole regole del motore, nel loro colore.
5. **Opacità della fotografia**: conta anche l'opacità degli antenati, e `brightness()` vale come opacità sul nero. Nessuna dissolvenza del box dove la foto tocca il bordo della tavola.
6. **Dissolvenza laterale dei caroselli** a S (smoothstep), identica alla maschera CSS.
7. **Residenza delle texture**: le superfici vengono preparate entro 1,25 viewport dallo schermo e rilasciate oltre 3. Ogni fotografia va sulla GPU alla risoluzione a cui viene disegnata (`pickSource`). L'inchiostro sta solo sulla GPU e solo nell'area che contiene testo.
8. **Misura per superficie**: solo il sottoalbero misurato torna ai colori del DOM, non più l'intera pagina. Gli stili hover e focus delle superfici sono sospesi durante la lettura (`[data-vfx-measuring]`), così una superficie misurata sotto il puntatore conserva i colori di riposo.
9. **Un motore per livello**: opzioni `active`, `bands`, `intro` e `offset`. Il popup, nel top layer, ha il proprio motore senza bande di scroll e senza sequenza di caricamento, creato alla prima apertura.
10. **Cambio di larghezza** (rotazione, nuovo filtro): vengono ridipinte subito solo le superfici visibili, le altre progressivamente, partendo dalla più vicina.

## Verifiche del 16 novembre 2026

- **Motore**: typecheck e 57 test in 7 file (58 dalla V44.1). Sono i test di LevelUp V20 senza quello della navbar 12.1.0, che non fa parte di questo pacchetto, più 8 test Servizi: sorgenti `srcset`, maschere doppie, velo, residenza.
- **Pagina**: `npm test` 9/9 (5 della V43 e 4 di integrazione VFX). Build con il motore in `dist/vfx/`.
- **Suite browser della V43** (Chromium 153 headless):
  - DOM di fallback (`SERVIZI_DOM=1`): 6/6 file. Coprono 14 viewport, 34 misure adiacenti ai breakpoint, 400 tavole, embed, interazioni, 72 liste bundle e stati colore.
  - Con il motore attivo (WebGL2 software): `responsive` e `interactions` superati. `content`, `embedded`, `bundle-polish` e `visual-states` non sono stati rieseguiti in questa modalità. Controllano stili del DOM, che con gli effetti attivi non dipinge le superfici, e nel renderer software superano i tempi: `embedded` ha esaurito i 30 s di un tap dentro l'iframe con due contesti software.
- **Scenari in Chrome headless con WebGL2 software** (ANGLE/SwiftShader). Lo sfondo è escluso dove non indicato, per lasciare il renderer agli effetti.
  - **Desktop 1440 × 900**: 81 superfici registrate, 27 preparate all'avvio, tutte quelle visibili pronte, nessun errore.
    - Geometria identica alla V43.
    - Hover: ambra e celle sulla tavola, gradiente ambra sul titolo, edge glow e cornice intera sulla tessera.
    - Trascinamento: le tavole seguono la trasformazione 3D del carosello.
    - Discesa dell'intera pagina: 17–35 superfici residenti e 31–53 texture, con 51 rilasci.
    - Filtro Fisico: 14 tessere registrate e pronte.
  - **Popup**: il motore della pagina si ferma e il suo canvas viene sfocato con il catalogo.
    - Le tavole del popup sono pronte 0,1–0,4 s dopo l'apertura. Vale anche per un servizio aperto dalla lista del bundle, per l'indirizzo diretto (`#bundle/…`) e dentro un iframe.
    - Alla chiusura il motore della pagina riparte.
    - La lista dei servizi inclusi e il pulsante finale restano DOM, con hover e focus propri.
  - **Mobile 390 × 844 touch**: foto a colori a riposo, velo del titolo e trattini come nel DOM. Alla densità nativa il testo è nitido quanto quello del DOM.
    - Un tocco: onda su 9 superfici, edge glow fino a 1,0, tutto spento in circa 2,5 s, senza cerchi.
    - Scroll a 1500 px: canvas traslato di 1373 px (scroll − margine).
    - Cambio della sola altezza (844 → 744 → 844): 0 nuove rasterizzazioni.
    - Cambio di larghezza: solo le superfici visibili subito, le altre progressive.
  - **Sfondo ed effetti insieme, mobile**: fibre dietro, superfici sopra, navbar in cima. L'ingresso degli effetti ha richiesto 133 s nel renderer software: il dato non è indicativo di un telefono.
  - **Senza WebGL**: `vfx-off`, pagina DOM completa e navbar. Il tocco scalda il titolo raggiunto, poi si spegne.
  - **Reduced motion**: motore attivo e statico, 0 render a riposo in 3 s.
  - **Embed in iframe di un'altra origine**: un embed semplice è opaco, con sfondo e navbar. Con `?mementoEmbed=1` è trasparente e senza sfondo. In entrambi i casi il popup ha il suo motore.
- **Corretto durante la verifica**: il testo dei sottoalberi DOM dentro le tavole (pulsante finale, ruoli dei servizi inclusi) ereditava il riempimento trasparente della tavola.

## Non verificato o limite noto

- **Prestazioni reali**: nessuna misura su GPU o telefoni. La pagina usa due contesti WebGL, effetti e sfondo, come START. Il popup ne aggiunge un terzo alla prima apertura; mentre è aperto, il motore della pagina e lo sfondo sono fermi. La prima apertura compila gli shader del motore del popup: fino ad allora le tavole sono dipinte dal DOM.
- **Safari e Firefox**: non provati, comprese barre native e inerzia iOS sul dispositivo.
- **Passaggio DOM → GPU su desktop**: la foto della tavola attiva passa dal colore al monocromo, secondo la regola START. Il passaggio avviene durante la sequenza di caricamento.
- **Superficie in embed**: la trasparenza dipende da `?mementoEmbed=1`. Un host che incorpora Servizi senza quel parametro ora riceve fondo nero e fibre (nella V43 qualsiasi iframe era trasparente).
- **Navbar**: resta il kit 12.0.0 della V43, con Services attivo in ambra. In un iframe senza host compatibile compare dopo 1,2 s. Il kit 12.1.0 di START e LevelUp (primo paint, altezza legata alla viewport visibile) non è incluso.
- **Scroll interno di una tavola del popup** (schermi molto bassi o testo ingrandito): la tavola viene ridipinta a ogni scroll.
- `AUDIT.md` e `VALIDATION.json` descrivono la verifica della base V40 e non sono stati aggiornati.
