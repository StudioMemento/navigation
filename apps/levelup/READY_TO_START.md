# Ready to start — integrazione V16

## Confini del modulo

`public/ready-to-start/` è la distribuzione originale del pacchetto **MEMENTO_READY_TO_START_CINEMATIC_V1_VERCEL**, copiata senza modifiche. Include la preview autonoma `index.html` per verificare l’effetto isolato. Il riferimento fornito è https://visualfx.vercel.app/.

LevelUp importa direttamente `ReadyToStart` dalla distribuzione; non incorpora un secondo sito. Nessun servizio remoto è necessario per il renderer. La versione pubblicata su VisualFX può evolvere indipendentemente: per aggiornare LevelUp bisogna aggiornare la cartella locale e ridistribuire il pacchetto.

- `index.html`: markup semantico della CTA, collegamento `#contact-link` e fallback statico.
- `src/ready-to-start.js`: caricamento entro 360 px dalla viewport, osservatore di visibilità, coordinamento con demo fullscreen e ciclo BFCache. Usa l’API pubblica `ReadyToStart`, `pause`, `resume`, `destroy` e l’osservatore dell’istanza. Non cambia il motore.
- `src/ready-to-start.css`: altezza e padding, senza modificare scena o direzione artistica.
- `src/app.js`: mantiene la destinazione Start e i parametri dell’esperienza selezionata.

La distribuzione CSS si carica prima di `styles.css`: il font Inter condiviso di LevelUp prevale e viene riutilizzato. Nessun pannello development/review/performance viene montato nella pagina LevelUp.

## Dimensioni

La sezione usa `100svh` per evitare scatti quando cambiano le barre del browser mobile. I padding sono inclusi nella misura; la tab riempie il rettangolo rimanente. I margini laterali derivano dalle variabili condivise `--safe-left` e `--safe-right`: 20 px fino a 500 px, 90 px nei formati intermedi, larghezza massima 1720 px sui monitor grandi. Le safe area del device prevalgono quando necessario.

Lo spazio verticale segue il gutter, tra 20 e 90 px. Con navbar standalone vengono riservati almeno 64 px sopra e 80 px sotto, oltre alle rispettive safe area. Nessuna altezza aggiuntiva viene sommata al viewport.

## Prossimo aggiornamento

1. Sostituire il contenuto di `public/ready-to-start/` con la nuova distribuzione dell’effetto.
2. Se cambia il markup richiesto, aggiornare solo la sezione `#contatto` conservando l’anchor `#contact-link`, il target `_top`, il nome accessibile e l’immagine di fallback.
3. Verificare l’API usata dall’adattatore. Se la nuova versione offre un metodo esplicito per la visibilità del contenitore, usarlo al posto dell’osservatore attuale.
4. Eseguire `npm run build` e `npm test`; verificare la CTA a 390, 768, 1440 e 1920 px, anche in orizzontale, e il ritorno alla pagina tramite Indietro.
5. Distribuire la nuova build su Vercel. Non serve modificare caroselli, contenuti, confronti o navigazione.

## Fallback e prestazioni

Il titolo e il link sono HTML. La composizione SVG statica rimane disponibile se il caricamento o WebGL falliscono. Il modulo rispetta reduced motion e conserva il comportamento touch originale (scroll verticale, interazione orizzontale, tap verso Start). Non vengono dichiarati 60 FPS senza una misura su dispositivi reali.
