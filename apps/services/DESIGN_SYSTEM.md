# Regole visive e responsabilità

## Identità

- Fondo standalone `#0b0c0d`; superficie iframe trasparente.
- Card slideshow nere, non trasparenti. Griglia con dissolvenza inferiore propria.
- Testi Inter variabile. Titoli da avorio ad ambra; descrizioni neutre, senza introdurre nuovi colori.
- Angoli diagonali opposti e cornice da 1 px tramite poligono. Nessun bordo arrotondato sulle card.
- Fotografie approvate, ancorate in basso. Non sostituire la maschera con rettangoli `contain` visibili.

## Una sola geometria

`--page-content` allinea catalogo, categorie e CTA. `--slide-width` definisce il fronte della card. `--board-ratio` passa continuamente da 1 a 2; `--photo-width` e `--photo-height` ne derivano. Il dialogo limita la larghezza anche in funzione dell’altezza disponibile.

I breakpoint residui cambiano composizione di filtri, spazi accessori e CTA, non ricostruiscono dimensioni indipendenti delle tavole. Un nuovo problema va risolto nella regola proprietaria, non con una nuova coda di override.

## Livelli della card

1. Fondo nero.
2. Fotografia e maschera superiore/laterale.
3. Copia sfocata della fotografia, mascherata nella zona del titolo.
4. Descrizione, titolo e CTA.
5. Cornice smussata.

La sfumatura del titolo deve seguire la stessa fotografia, dimensione e posizione. La sua opacità diminuisce gradualmente verso desktop. Il gradiente del testo deve coprire il testo effettivo e lasciare spazio a discendenti e accenti.

## Interazioni

Il carosello gestisce soltanto movimenti orizzontali intenzionali. Scroll verticale e pinch zoom restano nativi. Non aggiungere transizioni CSS ai transform delle card: l’animazione ha un solo proprietario JavaScript. Il focus e il contenuto interattivo appartengono alla tavola attiva.

Il popup usa il top layer nativo di `dialog`. Il catalogo viene congelato in una superficie grande quanto il viewport; il documento conserva la sua altezza. Non fissare il `body`, non animare l’opacità del dialogo e non affidare il blur interno esclusivamente a `backdrop-filter`.

Start mantiene la scultura, la chevron e la luce sul perimetro. Hover e focus cambiano colore/materiale, senza spostare il testo o ingrandire le fotografie.

## Regola di manutenzione

Contenuti in `content.js`, markup in `render.js`, stile in `styles.css`, stato nei controller. Le funzioni di rendering ricevono dati e restituiscono markup; non modificano gli oggetti ricevuti. Aggiungere una nuova variante richiede un caso esplicito nello schema e nel componente, non una correzione successiva al rendering.
