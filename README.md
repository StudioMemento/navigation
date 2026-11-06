# Memento NAV — R4 VFX + Overlay

Integrazione sulla NAV verticale 3D R3 del VFX pass R3 e del kit navbar/blur/logo V12 allegato. Conserva le cinque scene originali, le proporzioni, la prospettiva e le destinazioni. Nessuna nuova immagine e nessuna dipendenza runtime esterna.

## Vercel

Caricare il contenuto dello ZIP nel repository del progetto NAV. Impostazioni: **Framework Other**, **Output dist**, nessun comando build e nessuna variabile d’ambiente. `vercel.json` è incluso. Non è stato modificato il deploy Vercel esistente.

Per una verifica locale, servire `dist` via HTTP, ad esempio `python3 -m http.server 4173 --directory dist`. I moduli richiedono HTTP, quindi non aprire index.html con doppio click.

## Comportamento

- Rotella, swipe verticale, drag, chevron su/giù e tastiera attraversano le cinque sezioni in loop, con lo snap originale.
- La card secondaria viene portata al centro; la card attiva apre la sua pagina. Ctrl/Cmd-click e click centrale restano nativi.
- La navbar V12 apre direttamente le pagine, come previsto dal kit. Il suo stato attivo segue la card centrale.
- Il logo apre la home. I link puntano a `https://mementostudio.it/` e alle route `/studio`, `/services`, `/projects`, `/levelup`, `/start`.
- Un solo overlay montato sotto body: logo, cinque icone, blur progressivo superiore e inferiore. Nessuna doppia navbar.

## VFX integrati

Fondo triangolato con campionamento irregolare a densità variabile, connettività deterministica e movimento minimo dei vertici. Lo stesso campo di prossimità in coordinate viewport alimenta fondo, bordi e card in prospettiva; l’inversa del modello serve all’input locale.

Il glow percorre soltanto i tratti di bordo vicini al pointer e segue anche i due tagli diagonali. Il reticolo interno scende al 12% dell’intensità verso il centro; il titolo ha un pass separato e ritagliato nei glifi. Immagini, tracking e lettere non vengono deformati. La rete delle card scompare a riposo.

Le particelle minute nascono dai vertici attivati dal movimento, con repulsione, curl, vita breve e un pool condiviso. Il touch attiva il campo durante il contatto e genera un unico impulso al rilascio; la propagazione usa distanze lungo gli edge. Pointer cancel e perdita di focus ripuliscono il contatto senza generare nuovi impulsi.

Loading e passaggi della NAV usano maschere SVG alpha che nascondono realmente celle del contenuto. La progressione di ingresso procede dal basso-sinistra all’alto-destra. Durante il movimento del carosello, le celle ai margini superiore e inferiore seguono la posizione proiettata. Il centro resta completamente leggibile, la maschera viene rimossa quando completa e il wireframe di transizione decade dopo l’arresto. Non viene aggiunto uno scroll verticale alla pagina: gli FX seguono il carosello esistente.

Il renderer mantiene Canvas2D, già usato dalla base statica, e maschere SVG per il DOM. Non richiede WebGL. Un solo requestAnimationFrame coordina il documento; gli FX locali sono memorizzati a riposo, la pagina nascosta sospende il ciclo, dispose rimuove risorse e listener. Movimento ridotto: contenuti completi, nessuna dissolvenza scroll o impulso mobile. La pagina dispone di fallback HTML e watchdog di avvio.

## File principali

| File | Ruolo |
| --- | --- |
| `dist/navigation/` | Kit overlay V12 fornito, con asset e logo originali |
| `dist/src/app.mjs` | Unico loop, eventi pointer/tastiera, slider, lifecycle |
| `dist/src/vfx-config.mjs` | Colori, raggi, budget e timing |
| `dist/src/vfx-core.mjs` | Campo, driver di visibilità, grafo touch e pool |
| `dist/src/geometry.mjs` | Mesh irregolare e contorno condiviso |
| `dist/src/field.mjs` | Membrana di fondo, input smorzato, particelle condivise |
| `dist/src/card-fx.mjs` | Maschere, bordo locale, attenuazione e glifi |
| `dist/src/model.mjs` | Geometria e navigazione originarie |
| `docs/VFX_DIRECTION_R3.md` | Brief VFX allegato |

## Verifica

`npm test` esegue i contratti della navigazione, dei VFX e del pacchetto. Consultare `QA.md` per l’evidenza e i limiti.

La modalità `?qa` abilita un controllo del loading e i dati diagnostici in `#hub[data-qa]`; è disattivata nella normale esperienza. `?qa&motion=reduce` permette di verificare localmente il fallback senza cambiare le preferenze di sistema. `scripts/qa-check.html` è un harness interno: copiarlo temporaneamente in dist soltanto durante le verifiche responsive.
