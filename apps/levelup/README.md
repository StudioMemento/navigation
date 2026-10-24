# Memento Level Up — V05 / Vercel

Landing aggiornata per mobile, tablet, desktop e ultrawide. Slideshow di 10 demo, player embedded, immagini WebP responsive e CTA contatto.

## Aggiornare il progetto Vercel

1. Estrai lo ZIP e sostituisci i file del progetto con il contenuto incluso.
2. Mantieni come Root Directory la cartella che contiene `vercel.json`.
3. Framework Preset: **Other**. Nessun comando di installazione o build. Output Directory: **dist**.

Non sono necessarie dipendenze o variabili d’ambiente. Il pacchetto non esegue alcun deploy automatico.

## Novità V05

- Layout specifici per telefono, tablet verticale, landscape e ultrawide; adattamento al cambio di orientamento e all’altezza dinamica del browser.
- Swipe orizzontale e verticale, drag con risposta visiva immediata, soglia adattiva e flick rapido.
- Tap per aprire la demo; uno swipe o un trascinamento interrotto non apre accidentalmente il player. Lo zoom a due dita resta nativo.
- Chevron da 48 px e X da 44 px; navigazione accessibile anche da tastiera.
- Tutte le copertine sono WebP, in tre risoluzioni. Il browser sceglie la variante adatta al viewport e alla densità del display.
- Vengono richieste inizialmente soltanto la card attiva e le due adiacenti. Le altre copertine si caricano durante la navigazione.
- TechRef è distinto da ProductVis: i telefoni aprono direttamente Mobile / iPhone di TechRef; ProductVis usa la copertina del proprio studio 3D e apre il suo URL corretto.
- Tutti i dieci domini demo verificati; ulteriori dettagli in `PROGETTO.md`.

## Specifiche mantenute

Headline `L'hai visto, ora provalo!` su una riga, allineata a sinistra con la card. Nessun logo nella landing. “Esplora” con uguale distanza dal bordo sinistro e inferiore. CTA `ready to start?` su una riga con chevron destro.

Il player occupa l’80% della larghezza e l’80% dell’altezza del viewport, con margini del 10% sui quattro lati. Tagli in alto a sinistra e in basso a destra, sola X esterna, chiusura anche con Escape o click fuori. L’iframe viene rimosso alla chiusura.

## Modifiche future

- `dist/experiences.js`: URL, nomi, titoli e varianti delle copertine (`image`, `srcset`, `width`, `height`).
- `dist/index.html`: copy e modulo contatto.
- `dist/style.css`: layout e stile.
- `dist/app.js`: navigazione, gesti e player.

Il modulo contatto prepara un’email a info@mementostudio.it nell’app di posta dell’utente. Non invia dati a un server.
