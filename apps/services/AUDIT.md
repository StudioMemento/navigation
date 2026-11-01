# Verifica Servizi V40

1 novembre 2026. Base: sorgenti V39 e screenshot del feedback. Interventi nei componenti esistenti; nessun nuovo stylesheet, nessuna dipendenza di produzione aggiunta.

## Correzioni e direzione visiva

| Richiesta | Intervento |
| --- | --- |
| Selezione blu di testi e immagini nei popup | Riprodotto il difetto: in Chromium, il dialogo nativo impostava `user-select: text` e prevaleva sul valore ereditato dal body. Applicato `user-select: none` esplicitamente anche ai dialoghi. Asset non trascinabili. Campi e anteprima della richiesta mantengono selezione e copia native. |
| “Servizi di design.” con gradiente ambra | Applicato lo stesso gradiente avorio/ambra dei titoli, con spazio per le estremità dei caratteri. |
| Nomi dei servizi bianchi, sfumati su hover | Nomi bianchi nel catalogo e nella lista bundle; il gradiente emerge in hover e focus-visible. Le fotografie del catalogo mantengono il comportamento bianco e nero → colore. |
| Solo la slide attiva a colori | Grayscale sull’intera card inattiva, inclusi cornice, immagini e velo sfocato. La saturazione della card attiva segue il valore di posizione già prodotto dal carosello, senza un secondo motore di animazione. |
| Tavola dei servizi inclusi più curata | Visual del bundle sfumato a destra, lista verticale a sinistra, miniature quadrate con angoli tagliati e indicazioni discrete dei link. Margini coerenti con le altre tavole; su mobile il visual arretra per lasciare leggibile la lista. |

Il catalogo canonico e tutti i 521 asset sono identici alla V39. La nuova tavola riusa la copertina approvata del bundle e conserva tutti i servizi, ruoli e note di ambito.

## Verifiche eseguite

- Cinque test Node di integrità superati e build statica completata. I 532 file pubblicati corrispondono byte per byte ai sorgenti previsti dalla allowlist.
- Responsive: 14 viewport, 34 misure adiacenti ai breakpoint e 13 larghezze di pagina per griglia, titoli e allineamenti.
- 400 verifiche delle tavole: tutti i 50 elementi a 320 e 820 px, quattro tavole ciascuno.
- 72 verifiche delle liste: sei bundle in 12 viewport da 320 a 2048 px. Nessuno scroll parassita; miniature quadrate; righe verticali con target minimo di 44 px.
- Ingombro laterale verificato lungo 12 animazioni, rispetto alla maschera e alla sezione contenitrice.
- Stati colore verificati nei sette caroselli della pagina e in otto tavole popup. Le card inattive sono rimaste monocromatiche in ogni fotogramma campionato dell’animazione di servizio.
- Titolo del catalogo e nomi dei servizi verificati in idle, hover e focus da tastiera.
- Riprodotto Seleziona tutto nella V39: 356 caratteri selezionati nella tavola bundle. In V40, nessuna selezione nel popup con Ctrl+A, doppio clic o trascinamento, sia standalone sia dentro iframe.
- Pressione touch prolungata e navigazione touch bundle → servizio → ritorno verificate con emulazione Chromium.
- Selezione/modifica nei campi e selezione completa della bozza email restano operative; nessuna email inviata.
- Superati anche iframe resize, blur, ripristino scroll, tap, drag, focus, Escape, backdrop, hash legacy, filtri, reduced motion e forced colors.
- Nessun errore JavaScript rilevato. Ispezionate le catture del catalogo e delle liste mobile, tablet e desktop, inclusi visual di sfondo e stati delle card laterali.

La selezione è gestita da CSS, così i comandi nativi di editing restano disponibili nelle aree modificabili. Non vengono intercettati Ctrl+A, zoom o altri comandi da tastiera.

## Limiti

Verifiche eseguite in Chromium 153, con fixture iframe ed emulazione touch. Safari, dispositivi iPhone/iPad reali e il documento Framer di produzione non sono stati verificati. Lo scroll nativo resta un fallback per viewport particolarmente bassi o testo ingrandito, per evitare contenuti irraggiungibili.

`VALIDATION.json` contiene il riepilogo. `npm test` e `npm run test:browser` riproducono i controlli. Risultati e catture sono generati in `test-results/`, escluso dalla build e dal pacchetto.
