# Regole visive e responsabilità

## Identità

- Fondo nero puro `#000` con lo sfondo Ghost Fibers di START; superficie trasparente e senza sfondo solo con un host compatibile (`?mementoEmbed=1`).
- Card slideshow nere, non trasparenti. Griglia con dissolvenza inferiore propria.
- Testi Inter variabile. Riposo monocromo, come START: titoli con gradiente grigio (chiaro in alto, ombra alla base), cornici neutre. L'ambra arriva solo con l'energia: hover, tocco, focus. Descrizioni neutre, senza introdurre nuovi colori.
- Angoli diagonali opposti e cornice da 1 px tramite poligono. Nessun bordo arrotondato sulle card.
- Fotografie approvate, ancorate in basso. Non sostituire la maschera con rettangoli `contain` visibili.

## Una sola geometria

`--page-content` allinea catalogo, categorie e CTA. `--slide-width` definisce il fronte della card. `--board-ratio` passa continuamente da 1 a 2; `--photo-width` e `--photo-height` ne derivano. Il dialogo limita la larghezza anche in funzione dell’altezza disponibile.

La posa 3D del carosello è definita una sola volta in `Carousel.pose()`. `reserveBleed()` campiona il suo ingombro proiettato al ridimensionamento e riserva spazio nella maschera: evitare padding fissi che taglino le card laterali.

La tavola dei servizi inclusi usa sempre una lista verticale, con un target minimo di 44 px per servizio e miniature quadrate. La scala dei contenuti dipende dall’altezza della tavola, così anche i quattro servizi del bundle Lancio restano visibili su mobile. Il visual riusa la copertina del bundle, sfumata a destra e con opacità ridotta sul formato quadrato. I nomi sono bianchi, con gradiente su hover/focus; le miniature riprendono gli angoli tagliati della card.

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

Nel catalogo il filtro grayscale appartiene solo alla fotografia: hover e focus-visible lo portano a zero. “Servizi di design.” e i titoli di categoria usano il gradiente monocromo di riposo; i nomi sono bianchi a riposo. Reduced motion elimina le transizioni.

Nei caroselli il grayscale appartiene all’intera card, così include cornice, immagine e duplicato sfocato. Le card inattive restano completamente monocromatiche; la card attiva usa `--slide-focus`, già prodotto dal controller, per riacquistare colore avvicinandosi al centro. Non aggiungere una seconda animazione CSS al cambio slide.

La selezione è disattivata esplicitamente su `body` e `dialog`: i dialoghi nativi impostano un proprio valore che può prevalere su quello ereditato dalla pagina. Campi del form e anteprima della richiesta sono esclusi dalla regola. CSS possiede la selezione; il bootstrap gestisce soltanto menu contestuale e trascinamento nativo degli asset. Non intercettare Seleziona tutto, zoom o altri comandi da tastiera: le aree modificabili devono mantenere il comportamento nativo.

Start mantiene la scultura, la chevron e la luce sul perimetro. Hover e focus cambiano colore/materiale, senza spostare il testo o ingrandire le fotografie.

## Effetti (START V27)

Il motore VFX disegna su un canvas dietro il contenuto ogni elemento con `data-vfx`. Si dichiara nel markup, in `render.js` e `index.html`: `title` per i titoli, `card` per tavole, tessere e Start. Le opzioni sono attributi `data-vfx-*`, documentati in `vfx/src/index.ts`. Mentre `html.vfx-live` è attivo, il DOM smette di dipingere ogni superficie pronta (`[data-vfx-ready]`). Restano dipinti dal DOM, sopra il canvas, i sottoalberi `data-vfx-dom`: controlli con stati propri come la freccia delle tessere, la lista dei servizi inclusi e il pulsante finale dei popup.

Il motore legge il DOM a riposo. Non aggiungere a una superficie stili che dipendono da hover o focus senza `:not([data-vfx-measuring])`: una superficie misurata sotto il puntatore deve conservare i colori di riposo. Le maschere PNG vanno descritte al motore con un gradiente equivalente in `--vfx-mask` (foto) o `--vfx-frame-mask` (cornice).

Il popup ha un motore proprio, nel dialogo, perché il top layer sta sopra il canvas della pagina. Si crea alla prima apertura ed è fermo a popup chiuso. Mentre un popup è aperto, il motore della pagina e lo sfondo si fermano e vengono sfocati insieme al catalogo.

Su desktop le fotografie sono monocrome a riposo e ambra in hover; su touch sono a colori, con le tavole laterali grigie come nel DOM. Solo le superfici vicine alla viewport tengono le texture sulla GPU: una nuova sezione non deve caricare immagini più grandi del necessario per la GPU, perché il motore sceglie la variante del `srcset` più vicina alla dimensione disegnata.

## Regola di manutenzione

Contenuti in `content.js`, markup in `render.js`, stile in `styles.css` (gli effetti nella sezione 6), stato nei controller, motore VFX in `vfx/` (ricompilato in `public/vfx/`). Le funzioni di rendering ricevono dati e restituiscono markup; non modificano gli oggetti ricevuti. Aggiungere una nuova variante richiede un caso esplicito nello schema e nel componente, non una correzione successiva al rendering.
