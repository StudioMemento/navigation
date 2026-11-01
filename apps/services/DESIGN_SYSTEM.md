# Regole visive e responsabilità

## Identità

- Fondo standalone `#0b0c0d`; superficie iframe trasparente.
- Card slideshow nere, non trasparenti. Griglia con dissolvenza inferiore propria.
- Testi Inter variabile. Titoli da avorio ad ambra; descrizioni neutre, senza introdurre nuovi colori.
- Angoli diagonali opposti e cornice da 1 px tramite poligono. Nessun bordo arrotondato sulle card.
- Fotografie approvate, ancorate in basso. Non sostituire la maschera con rettangoli `contain` visibili.

## Una sola geometria

`--page-content` allinea catalogo, categorie e CTA. `--slide-width` definisce il fronte della card. `--board-ratio` passa continuamente da 1 a 2; `--photo-width` e `--photo-height` ne derivano. Il dialogo limita la larghezza anche in funzione dell’altezza disponibile.

La posa 3D del carosello è definita una sola volta in `Carousel.pose()`. `reserveBleed()` campiona il suo ingombro proiettato al ridimensionamento e riserva spazio nella maschera: evitare padding fissi che taglino le card laterali.

La tavola dei servizi inclusi usa sempre una lista verticale, con un target minimo di 44 px per servizio e miniature quadrate. La sua scala dipende dall’altezza della tavola, così anche i quattro servizi del bundle Lancio restano visibili su mobile.

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

Nel catalogo il filtro grayscale appartiene solo alla fotografia: hover e focus-visible lo portano a zero. Reduced motion elimina la transizione. Il testo e la cornice conservano i propri colori.

Selezione e menu contestuale sono disattivati sui contenuti; campi del form e anteprima della richiesta sono esclusi dalla regola. Non intercettare comandi di zoom, tastiera o editing.

Start mantiene la scultura, la chevron e la luce sul perimetro. Hover e focus cambiano colore/materiale, senza spostare il testo o ingrandire le fotografie.

## Regola di manutenzione

Contenuti in `content.js`, markup in `render.js`, stile in `styles.css`, stato nei controller. Le funzioni di rendering ricevono dati e restituiscono markup; non modificano gli oggetti ricevuti. Aggiungere una nuova variante richiede un caso esplicito nello schema e nel componente, non una correzione successiva al rendering.
