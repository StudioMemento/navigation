# Ready to start — incorporamento VisualFX (V19)

## Come funziona

La tab incorpora la pagina pubblicata **https://visualfx.vercel.app/**: nessuna copia locale dell'effetto. Ogni aggiornamento pubblicato su VisualFX compare in LevelUp senza ridistribuire LevelUp.

Livelli, dal basso:

1. **CTA semplice** (`#contact-link`): link a Start con `target="_top"`, cornice e titolo "READY TO START?" come l'effetto, su nero. È il bersaglio della tastiera e il fallback (caricamento, niente JavaScript, effetto che non risponde entro 15 s). Il suo `href` segue l'esperienza selezionata.
2. **Effetto** (`#start-frame`): iframe di `ready-to-start/embed.html`, caricato entro 360 px dalla viewport (o al focus del link). Compare quando la pagina di VisualFX ha caricato.
3. **Anello di focus**: quando il link ha il focus da tastiera, il contorno dell'effetto diventa ambra sopra l'iframe.

## Perché un wrapper (`public/ready-to-start/embed.html`)

Il link di VisualFX punta a `https://mementostudio.it/start` senza `target`: da solo aprirebbe Start dentro la tab. Il wrapper carica VisualFX con la policy `frame-src https://visualfx.vercel.app`, quindi quella navigazione viene rifiutata. Il wrapper la riconosce (evento `securitypolicyviolation`, o un secondo documento nel frame) e lo comunica a LevelUp (`postMessage`, stessa origine), che apre Start nella finestra principale con `contactUrl(esperienza selezionata)`. La policy è solo nel wrapper: le demo del portfolio non sono limitate.

Il wrapper allinea la card di VisualFX alla tab: la pagina pubblicata disegna la card 8 px dentro la sua viewport, quindi l'iframe interno è 16 px più grande e ritagliato sul contorno della card (tagli del 3,5 % × 4,375 %, come il suo `viewBox` 1000 × 800).

Tornando indietro dal browser (cache di pagina), l'effetto viene ricaricato.

## Se VisualFX cambia

- **Markup o grafica**: nessuna modifica in LevelUp.
- **Margine della card** (oggi 8 px) o **forma del contorno**: aggiornare `iframe` in `embed.html` e il percorso SVG di `.start-embed__outline` / `.start-embed__focus` in `index.html`.
- **Il CTA apre Start da solo con `target="_top"`**: funziona comunque (il sandbox consente la navigazione con attivazione dell'utente), ma senza il contesto dell'esperienza.
- **Nuovo dominio**: aggiornare `src` e la policy `frame-src` in `embed.html` (la verifica di build lo controlla).

## Dimensioni

La sezione usa `100svh` con i padding inclusi; la tab riempie il resto. Margini laterali dalle variabili condivise `--safe-left` / `--safe-right`; con la navbar standalone restano liberi almeno 64 px sopra e 80 px sotto. Mentre una demo è espansa l'effetto è nascosto.

## Verifica dopo il deploy

A 390, 768 e 1440 px: l'effetto allineato alla tab, il click (o tap) apre Start nella finestra principale con `experience=` dell'esperienza scelta, Tab raggiunge il link con l'anello ambra, Indietro riporta l'effetto. Da provare anche con LevelUp ospitato nell'iframe di Framer e su Safari iOS (vedi `design-qa.md`).
