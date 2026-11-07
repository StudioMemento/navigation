# Memento NAV — R7 / Ambra V2

Slider verticale calibrato su `Slider_nav proportions_(1).png` per struttura e chevron, con gli effetti delle sei tavole neutre Ambra V2. Le cinque immagini originali, Inter e la navbar overlay V12 sono conservati. Le regole NAV aggiornano il master Start R4: card attiva a colori già a riposo, preview nitide in bianco e nero, sovrapposizione e luce locale più leggibili.

La specifica aggiornata, la precedenza dei riferimenti e i criteri di accettazione sono in [MEMENTO_NAV_VFX_AMBRA_V2_R7.md](docs/MEMENTO_NAV_VFX_AMBRA_V2_R7.md). Le tavole guidano la calibrazione e non richiedono nuovi asset o una replica pixel-perfect.

## Avvio e Vercel

Progetto statico, senza dipendenze di runtime o build. In Vercel selezionare **Other**, nessun build command, output directory **dist**. Il `vercel.json` incluso configura l’output. Per lavorare in locale servire `dist/` con un server HTTP. Eseguire `npm test` per i controlli automatici; gli esiti e i limiti della verifica visiva sono documentati separatamente in [QA.md](QA.md).

## Struttura

- Viewport completo e ciclo Studio → Services → Projects → LevelUp → Start.
- Su desktop largo, card 2:1 con altezza obiettivo del 60% del viewport e larghezza entro l’88% del viewport. Le aree effettive di logo, dock e controlli possono ridurla.
- Padding laterale e inferiore pari al 6% della larghezza della card. Inter 200, titolo grande e spaziatura distribuita.
- Anteprime sopra/sotto inclinate e leggermente coperte dalla card attiva: sovrapposizione del 4% dell’altezza, limitata a 12–24 CSS px, con morbida ombra di contatto. Fotografie inattive sempre in bianco e nero, senza blur aggiuntivo; il blur della navbar overlay resta nel proprio livello.
- Chevron sottili con grafica larga al massimo 54 CSS px, area interattiva separata e spazio riservato rispetto a logo/dock. Due tagli diagonali alto-sinistra / basso-destra sulla card.
- Mobile: card larga fino al 90% del viewport, rapporto adattato all’orientamento e limiti di altezza. Le aree interattive dei chevron hanno altezza 48–52 CSS px, ridotta a 44 sui viewport bassi.
- Eliminata la scritta “SCORRI PER ESPLORARE” e il suo spazio dedicato.

## Interazioni

Rotella e trackpad, drag verticale, swipe verticale, chevron, frecce della tastiera, Page Up/Down, Home/End. Click sulla card centrale apre subito la pagina; click su un'anteprima la porta al centro. I link mantengono apertura tramite modificatori e tasto centrale. La navbar conserva i collegamenti diretti del kit originale.

La card attiva conserva l’80% del colore originale a riposo e raggiunge il 100% con hover, contatto touch o focus tastiera. Questo trattamento riguarda il colore, non l’opacità dell’immagine. Le preview inattive restano in bianco e nero anche se il campo raggiunge i loro bordi.

Il campo di esplorazione usa ambra calda e un range non uniforme: bordi, facce e vertici rispondono localmente senza un disco luminoso riconoscibile. Fondo, superficie e glifi hanno topologie indipendenti. Il bordo vicino riceve più luce; il centro della card mantiene una risposta attenuata. La foto e il pannello non si deformano.

La tipografia mantiene il testo HTML pieno e Inter 200, con reticolo di microfacce, edge glow e propagazione ritagliati nei glifi. I piccoli triangoli accompagnano il movimento e l’esplorazione di bordo e testo; l’emissione si esaurisce quando il pointer si ferma. All’uscita il fondo torna neutro e la card attiva ritorna al proprio 80% di colore.

Loading e attraversamento del viewport costruiscono/scompongono il contenuto usando celle deterministiche. La costruzione dipende dalla posizione dello slider e si inverte sulle stesse celle. Touch up emette un impulso sui grafi; pointercancel non emette un secondo impulso. Il pool condiviso ha capacità di 96 triangolini desktop e 36 mobile: è un limite, non una quantità da mantenere visibile. Un solo RAF coordina la pagina.

`prefers-reduced-motion` disattiva movimento del reticolo, particelle, impulso e maschere animate. Rimangono contenuto e navigazione. Il fallback senza JavaScript espone i cinque collegamenti. Il campo non intercetta input né impedisce pinch zoom.

## File

I moduli sono in `dist/src/`: `model.mjs` gestisce proporzioni e proiezione; `geometry.mjs` topologie e sagoma; `field.mjs` fondo e particelle; `card-fx.mjs` superficie, testo, colore e reveal; `vfx-core.mjs` le primitive condivise; `vfx-config.mjs` la calibrazione; `config.mjs` contenuti e URL. `dist/navigation/` contiene il kit overlay originale.

Diagnostica locale: `/?qa` e `/?qa&motion=reduce`. La pagina di verifica sotto `scripts/qa-check.html` può essere copiata temporaneamente nella root servita. Non è parte dell'interfaccia pubblica.

I numeri del renderer sono parametri di calibrazione, non misure ricavate dalle tavole o garanzie di prestazione. [QA.md](QA.md) distingue controlli automatici, riscontri nel browser e limiti residui.

## Integrazione e continuità della navigazione

Il focus mouse rimane separato dal focus tastiera per evitare colore bloccato dopo un trascinamento. Il testo conserva il riempimento avorio e il controllo dei colori non finiti che impedisce il precedente annerimento al primo hover debole. Il layout calcola lo spazio disponibile dalle hit area reali della navbar.

Sono presenti ripristino dell’ultima sezione nella sessione, deep link e bridge parent/iframe con origini verificate.

**Integrazione Framer necessaria:** aggiungere il blocco completo di [framer-nav-bridge.html](docs/framer-nav-bridge.html) nella home, Custom Code → End of body, e pubblicare la home. Questo completa il supporto degli URL esterni `/#start`, la sincronizzazione del parent e il titolo accessibile dell’iframe già esistente. Non creare un secondo iframe. Senza il blocco, il child ripristina l’ultima sezione visitata nella sessione ma non può leggere il frammento cross-origin del parent. Dettagli in [ROUTE_RESTORE.md](docs/ROUTE_RESTORE.md).
