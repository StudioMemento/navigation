# Verifica Servizi V39

1 novembre 2026. Base: sorgenti V38 e segnalazioni con screenshot. Questa versione corregge i componenti esistenti: un solo stylesheet, stessi moduli, nessuna dipendenza aggiunta.

## Modifiche

| Problema | Causa | Correzione |
| --- | --- | --- |
| Tab dei servizi inclusi con miniature alte e scroll interno | L’attributo HTML `height` dell’immagine rimaneva attivo; `aspect-ratio` da solo non imponeva la forma quadrata. La griglia poteva creare più colonne. | Altezza automatica e rapporto 1:1 esplicito; lista semantica in una sola colonna. Tipografia, miniature e spazi derivano dall’altezza della card. |
| Elenco della copertina bundle distribuito in colonne | Regola `auto-fit` sul riepilogo del dettaglio | Rimosso l’override: il riepilogo segue l’elenco verticale condiviso. |
| Card laterali tagliate in alto | La maschera del carosello aveva padding fisso, inferiore alla proiezione delle card ruotate | `Carousel.pose()` è la fonte unica della posa. Al ridimensionamento si calcola l’ingombro lungo la transizione e si riserva spazio nella maschera e nell’apertura bundle. |
| Fotografie del catalogo sempre a colori | Nessuno stato grayscale | Grayscale sulle sole fotografie; colore durante hover e focus-visible, con transizione disattivata in reduced motion. |
| Selezione e menu contestuale sui contenuti | Selezione abilitata nel testo e nessuna policy del menu | Regole CSS e listener centrale nel bootstrap. Eccezioni per campi modificabili e anteprima della richiesta. |

La lista conserva nomi, ruoli e nota di ambito. Il suggerimento introduttivo rimane disponibile ai lettori di schermo senza occupare spazio visivo. I link dei servizi e il ritorno al bundle restano funzionanti. Il catalogo canonico e tutti i 521 asset sono identici alla V38.

## Evidenza

- Cinque test Node di integrità superati e build completata. I file pubblicati sono copie esatte dei sorgenti previsti dalla allowlist.
- Responsive: 14 viewport, 34 misure adiacenti ai breakpoint e 13 larghezze per griglia, titoli e allineamenti.
- 400 verifiche delle tavole: tutti i 50 elementi a 320 e 820 px, quattro tavole ciascuno.
- 72 verifiche dedicate alle liste: sei bundle in 12 viewport da 320 a 2048 px. Nessuno scroll verticale o orizzontale anomalo; miniature quadrate; righe verticali con area minima di 44 px.
- Ingombro delle card verificato fotogramma per fotogramma in 12 animazioni, rispetto alla maschera e alla sezione che le contiene.
- Hover e focus da tastiera verificati sia nel catalogo Digitale sia nel comportamento del filtro Fisico; la fotografia torna in bianco e nero all’uscita dallo stato attivo.
- Verificati elenco verticale della copertina, apertura di un servizio incluso, ritorno alla tab del bundle, menu contestuale bloccato sui contenuti e consentito nei campi, assenza di selezione sul titolo e selezione del testo nei campi.
- Iframe: ridimensionamento con popup aperto, blur, scroll e ripristino, tap e trascinamento verificati. Superati anche focus, Escape, backdrop, hash legacy, filtri, bozza email locale, reduced motion e forced colors.
- Nessun errore JavaScript rilevato nelle suite. Ispezionate le catture di liste mobile/tablet/desktop, del catalogo e del carosello su schermo ampio.

I test della V38 consentivano overflow verticale purché il contenuto restasse raggiungibile; non verificavano il rapporto effettivo delle miniature. La suite V39 aggiunge assert specifici per questi due difetti.

## Limiti

Verifiche eseguite in Chromium 153. Safari e dispositivi iPhone/iPad reali non sono stati provati. L’embed usa una fixture locale, non il documento Framer di produzione. Su viewport particolarmente bassi o con testo ingrandito resta disponibile lo scroll nativo come fallback, per mantenere raggiungibili tutti i contenuti.

`VALIDATION.json` contiene il riepilogo della release; `npm test` e `npm run test:browser` riproducono i controlli. I risultati e le catture vengono generati in `test-results/`, escluso dalla build e dal pacchetto.
