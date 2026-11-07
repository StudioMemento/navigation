# Memento NAV — R9 / Campo Latente

Slider verticale calibrato su `Slider_nav proportions_(1).png` per struttura e chevron. R9 rivede il fondo sulla tavola **01 / Campo Latente — Ambra V2**, assottiglia il bordo luminoso e riduce il lavoro durante avvio, ridimensionamento e navigazione. Restano le cinque immagini originali, Inter, i collegamenti e la navbar overlay V12; le sue fasce di blur sono state ridotte.

Le modifiche sono documentate in [MEMENTO_NAV_R9_CHANGELOG.md](docs/MEMENTO_NAV_R9_CHANGELOG.md). Restano disponibili lo [storico R8](docs/MEMENTO_NAV_R8_CHANGELOG.md) e il [riferimento Ambra V2](docs/MEMENTO_NAV_VFX_AMBRA_V2_R7.md). Le tavole guidano la calibrazione e non richiedono nuovi asset o una replica pixel-perfect.

**Questo pacchetto non è stato pubblicato: il sito in produzione resta invariato.** Gli esiti effettivi delle verifiche e i limiti sono riportati in [QA.md](QA.md).

## Avvio e Vercel

Progetto statico, senza dipendenze di runtime o build. In Vercel selezionare **Other**, nessun build command, output directory **dist**. Il `vercel.json` incluso configura l’output. Per lavorare in locale servire `dist/` con un server HTTP. Eseguire `npm test` per i controlli automatici; gli esiti e i limiti della verifica visiva sono documentati separatamente in [QA.md](QA.md).

## Struttura

- Viewport completo e ciclo Studio → Services → Projects → LevelUp → Start.
- Su desktop largo, card 2:1 con altezza obiettivo del 60% del viewport e larghezza entro l’88% del viewport. Le aree effettive di logo, dock e controlli possono ridurla.
- Padding laterale e inferiore pari al 6% della larghezza della card. Inter 300, titolo grande e spaziatura distribuita.
- Anteprime sopra/sotto inclinate e leggermente coperte dalla card attiva: sovrapposizione del 4% dell’altezza, limitata a 12–24 CSS px, con morbida ombra di contatto. Fotografie inattive sempre in bianco e nero, senza blur aggiuntivo; il blur della navbar overlay resta nel proprio livello.
- Chevron più presenti con grafica larga al massimo 62 CSS px, reticolo locale e bagliore esterno, area interattiva separata e spazio riservato rispetto a logo/dock. Due tagli diagonali alto-sinistra / basso-destra sulla card.
- Mobile: card larga fino al 90% del viewport, rapporto adattato all’orientamento e limiti di altezza. Le aree interattive dei chevron hanno altezza 54–58 CSS px, ridotta a 48 sui viewport bassi.
- Eliminata la scritta “SCORRI PER ESPLORARE” e il suo spazio dedicato.

## Interazioni

Rotella e trackpad, drag verticale, swipe verticale, chevron, frecce della tastiera, Page Up/Down, Home/End. Click sulla card centrale apre subito la pagina; click su un'anteprima la porta al centro. I link mantengono apertura tramite modificatori e tasto centrale. La navbar conserva i collegamenti diretti del kit originale.

La card attiva conserva l’80% del colore originale a riposo e raggiunge il 100% con hover, contatto touch o focus tastiera. Durante lo scorrimento, il livello a colori sfuma sopra una versione in bianco e nero della stessa immagine: lo slider modifica l’opacità, evitando di ricalcolare il filtro di saturazione a ogni variazione di posizione. Le preview inattive restano in bianco e nero anche se il campo raggiunge i loro bordi.

Il fondo alterna cluster più densi e zone aperte, con facce appena ombreggiate, piccoli nodi chiari e un movimento lento in quiete. La prossimità concentra la luce ambra su pochi vertici; il gradiente percorre gli spigoli già presenti e sfuma sulle facce con intensità diverse. Il movimento accentua la risposta locale e i frammenti triangolari; all’uscita la luce decade gradualmente. La topologia rimane stabile durante il movimento e viene scalata al ridimensionamento.

Fondo, superficie e glifi hanno topologie indipendenti. Sulle card un solo tratto sottile segue il perimetro; il bagliore viene ritagliato all’esterno della sagoma, compresi i due tagli diagonali. Il bordo vicino riceve più luce e il centro della card mantiene una risposta attenuata. La foto e il pannello non si deformano.

La tipografia mantiene il testo HTML pieno e Inter 300, con reticolo di microfacce, edge glow e propagazione ritagliati nei glifi. I piccoli triangoli accompagnano il movimento e l’esplorazione di bordo e testo; l’emissione si esaurisce quando il pointer si ferma. All’uscita il fondo torna neutro e la card attiva ritorna al proprio 80% di colore.

Loading e attraversamento del viewport costruiscono/scompongono il contenuto usando gli stessi triangoli del reticolo hover, con intensità ambra diverse per faccia e bordi deduplicati. Le maschere vengono create quando servono e aggiornate solo quando cambiano. La costruzione dipende dalla posizione dello slider e si inverte sulle stesse celle. Touch up emette un impulso sui grafi; pointercancel non emette un secondo impulso. Il pool condiviso ha capacità di 96 triangolini desktop e 36 mobile: è un limite, non una quantità da mantenere visibile. Un solo RAF coordina la pagina. La navbar si aggiorna all’input; lo slider mantiene la velocità corrente quando la destinazione cambia. Gli input rapidi possono cambiare destinazione durante la transizione, con una coda limitata a due slide rispetto alla posizione corrente.

`prefers-reduced-motion` disattiva movimento del reticolo, particelle, impulso e maschere animate. Rimangono contenuto e navigazione. Il fallback senza JavaScript espone i cinque collegamenti. Il campo non intercetta input né impedisce pinch zoom.

## File

I moduli sono in `dist/src/`: `model.mjs` gestisce proporzioni, proiezione e movimento; `geometry.mjs` topologie delle card e sagoma; `bg-geometry.mjs` le topologie precalcolate del fondo; `field.mjs` fondo e particelle; `card-fx.mjs` superficie, testo, colore e reveal; `chevron-fx.mjs` reticolo e glow delle frecce; `vfx-core.mjs` le primitive condivise; `vfx-config.mjs` la calibrazione; `config.mjs` contenuti e URL. `dist/navigation/` contiene il kit overlay, con quattro fasce di blur per bordo in R9.

Diagnostica locale: `/?qa` e `/?qa&motion=reduce`. La pagina di verifica sotto `scripts/qa-check.html` può essere copiata temporaneamente nella root servita. Non è parte dell'interfaccia pubblica.

I numeri del renderer sono parametri di calibrazione, non misure ricavate dalle tavole o garanzie di prestazione. [QA.md](QA.md) distingue controlli automatici, riscontri nel browser e limiti residui.

## Avvio e ridimensionamento

La topologia normalizzata delle card viene condivisa e conservata in cache; il fondo usa grafi precalcolati per le diverse proporzioni. Le misure di testo e chevron, gli aloni dei glifi e gli sprite di luce vengono preparati al cambio di layout e riutilizzati durante l’animazione.

Il resize aggiorna prima il layout CSS, accorpa gli eventi in un frame e rimanda la ricostruzione degli effetti a 120 ms dall’ultimo evento. Nel frattempo nasconde i vecchi canvas delle card e rimuove la maschera per mantenere leggibile il contenuto. Le card visibili vengono preparate per prime; quelle distanti vengono preparate in un momento libero, con priorità immediata se entrano in vista.

L’immagine centrale ha priorità di caricamento e decodifica; le immagini distanti vengono decodificate successivamente. Le varianti responsive usano la larghezza effettiva della card. Ogni canvas del fondo è limitato a circa 2 milioni di pixel; ciascun canvas principale della card, compreso quello con margine per il glow, a 1,5 milioni. Il DPR massimo resta 1,5 su desktop e 1,25 su mobile e può scendere per rispettare questi limiti.

Il confronto CPU della sola geometria in Node è riportato nel [changelog R9](docs/MEMENTO_NAV_R9_CHANGELOG.md). Non misura FPS, compositing, rete o fluidità del browser.

## Integrazione e continuità della navigazione

Il focus mouse rimane separato dal focus tastiera per evitare colore bloccato dopo un trascinamento. Il testo conserva il riempimento avorio e il controllo dei colori non finiti che impedisce il precedente annerimento al primo hover debole. Il layout calcola lo spazio disponibile dalle hit area reali della navbar.

Sono presenti ripristino dell’ultima sezione nella sessione, deep link e bridge parent/iframe con origini verificate.

**Integrazione Framer:** se il bridge non è già presente, aggiungere il blocco completo di [framer-nav-bridge.html](docs/framer-nav-bridge.html) nella home, Custom Code → End of body, e pubblicare la home quando si distribuisce l’aggiornamento. Questo completa il supporto degli URL esterni `/#start`, la sincronizzazione del parent e il titolo accessibile dell’iframe già esistente. Non creare un secondo iframe o duplicare il bridge. Senza il blocco, il child ripristina l’ultima sezione visitata nella sessione ma non può leggere il frammento cross-origin del parent. Dettagli in [ROUTE_RESTORE.md](docs/ROUTE_RESTORE.md). Il pacchetto R9 conserva questo supporto; non ha modificato né pubblicato la home Framer.
