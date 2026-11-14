# Verifica LevelUp V19 · 14 novembre 2026

## Ambito

VFX della pagina START V23 applicati a LevelUp; Ready to start sostituito dall'incorporamento di https://visualfx.vercel.app/; sfondo nero vero, nessuna scena di sfondo. Contenuti, caroselli, demo, confronti e navbar della V18 invariati.

## Controlli eseguiti

- Motore VFX: typecheck e 29 test (catena, struttura, proiezione e inversione delle board trasformate, gradienti delle ombre e delle maschere).
- Pagina: build `LEVELUP_BUILD_OK`, 18 test superati, 66 risorse locali risolte, 5 sezioni. Controlli negativi: chunk del motore mancante, wrapper che non incorpora più VisualFX, asset mancante.
- Chrome headless (WebGL2 via SwiftShader), 1440 × 900 e 390 × 844 touch: 27 superfici registrate e pronte, `vfx-live` attivo, nessun errore in console. Titoli monocromi, board dei caroselli disegnate in prospettiva come nel DOM, hover ambra su board, confronti e step, linea del confronto e maniglia DOM, frammentazione allo scroll.
- Senza WebGL: `vfx-off`, pagina DOM completa.
- Ready to start (VisualFX servito da una copia locale nel test, perché questo ambiente non raggiunge visualfx.vercel.app): card allineata alla tab con i tagli; click sull'effetto → navigazione rifiutata dalla policy → Start nella finestra principale con `experience=elite` dopo aver scelto Memento Elite; Tab → anello ambra sul contorno, Invio → Start; Indietro dopo entrambi → effetto di nuovo pronto.
- Demo espansa e richiusa: il motore si ferma e riparte, il focus torna al pulsante.

## Non verificato o limite noto

- **Prestazioni reali**: solo renderer software (pochi fps), nessuna misura su GPU o telefoni. La pagina ha più superfici di START (27, di cui 17 board di carosello); le board nascoste del carosello non vengono disegnate.
- **Safari e Firefox**: non provati. In particolare il rifiuto della navigazione interna a VisualFX: se un browser non lo applicasse, Start si caricherebbe per un istante nella tab prima di aprirsi nella finestra principale.
- **LevelUp dentro l'iframe di Framer**: la navigazione `_top` dopo il click nell'effetto si basa sull'attivazione dell'utente propagata ai frame antenati; non provato in un iframe reale.
- **VisualFX pubblicato**: la pagina live non era raggiungibile da qui; è stata confrontata la struttura (link a Start senza target, titolo, meta) ma non resa in browser.
- **Sfocatura della navbar** nel renderer software appare irregolare in basso: è un artefatto noto dell'ambiente (vedi README di START V23).
