# Memento Level Up — V04 / Vercel

Pacchetto aggiornato della landing: nove esperienze, slideshow 3D, player embedded e contatto dalla CTA.

## Aggiornamento su Vercel

1. Estrai lo ZIP e sostituisci i file del progetto con quelli inclusi, conservando le impostazioni del tuo progetto Vercel.
2. La Root Directory deve contenere `vercel.json`.
3. Configurazione: Framework Preset **Other**, nessun comando di installazione o build, Output Directory **dist**.

Il pacchetto è statico e pronto da pubblicare: non richiede dipendenze, database o variabili d’ambiente. Le demo vengono caricate dai loro URL esterni.

## Novità V04

- Logo Memento rimosso dalla landing, per il successivo overlay separato.
- `L'hai visto, ora provalo!` su una riga, allineato a sinistra con la card centrale.
- Nuove copertine cinematiche per Knives, ProductVis e VisualRef; blending con il fondo della card.
- “Esplora” in basso a sinistra, con uguale distanza dal bordo sinistro e inferiore.
- `ready to start?` grande, su una riga, con chevron destro.
- Player con margine del **10% della larghezza a destra e sinistra** e del **10% dell’altezza sopra e sotto**: frame centrale pari all’80% del viewport.
- Tagli in alto a sinistra e in basso a destra, sola X esterna, senza barre della landing.
- Chiusura con X, Escape o click ovunque fuori dal frame, compresi gli angoli tagliati.

## File da modificare

- `dist/experiences.js`: titoli, copertine e URL delle demo.
- `dist/index.html`: copy e modulo contatto.
- `dist/style.css`: layout, caratteri, gradienti e responsive.
- `dist/app.js`: slideshow, player e interazioni.
- `PROGETTO.md`: note tecniche e destinazioni.

Il modulo contatto prepara un’email nell’app di posta del visitatore. Non è stato eseguito un deploy Vercel in questa consegna.
