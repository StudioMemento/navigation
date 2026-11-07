# Memento NAV — R6 / VFX polish

Slider verticale aggiornato sulla tavola «Amber doorway level-up navigation», con il linguaggio interattivo Start R4. Le cinque immagini originali, Inter e la navbar overlay V12 sono conservati.

## Avvio e Vercel

Progetto statico, senza dipendenze di runtime o build. In Vercel selezionare **Other**, nessun build command, output directory **dist**. Il `vercel.json` incluso configura l'output. Per lavorare in locale servire `dist/` con un server HTTP. Controlli: `npm test`.

## Struttura

- Viewport completo e ciclo Studio → Services → Projects → LevelUp → Start.
- Su desktop largo, card 2.1:1 alta il 60.5% del viewport, entro l'88% della larghezza disponibile. A 1997 × 787 la card misura circa 1000 × 476 CSS px.
- Padding laterale e inferiore pari al 6% della larghezza della card. Inter 200, titolo grande e spaziatura distribuita.
- Anteprime adiacenti sopra/sotto, inclinate verso l'utente, monocrome e sfocate. Chevron sottili sopra le anteprime. Due tagli diagonali alto-sinistra / basso-destra.
- Mobile: card larga fino al 90% del viewport, proporzione verticale e limiti di altezza; navbar e hit area restano utilizzabili.

## Interazioni

Rotella e trackpad, drag verticale, swipe verticale, chevron, frecce della tastiera, Page Up/Down, Home/End. Click sulla card centrale apre subito la pagina; click su un'anteprima la porta al centro. I link mantengono apertura tramite modificatori e tasto centrale. La navbar conserva i collegamenti diretti del kit originale.

La card è neutra a riposo. Hover, contatto touch o focus sulla card centrale ripristinano colore e luce dell'immagine originale. Il campo di prossimità attiva bordi e reticoli, ma non colora automaticamente le card vicine.

Fondo, superficie e glifi hanno topologie indipendenti. Il bordo reagisce localmente; non rimane un angolo caldo permanente. L'etichetta mantiene il testo HTML pieno, con microfacce ed edge ritagliati nei glifi e propagazione locale. La foto e il pannello non si deformano.

Loading e attraversamento del viewport costruiscono/scompongono il contenuto usando celle deterministiche. La costruzione dipende dalla posizione dello slider e si inverte sulle stesse celle. Touch up emette un impulso sui grafi; pointercancel non emette un secondo impulso. Massimo 64 triangolini desktop e 24 mobile, con emissione legata al movimento. Un solo RAF coordina la pagina.

`prefers-reduced-motion` disattiva movimento del reticolo, particelle, impulso e maschere animate. Rimangono contenuto e navigazione. Il fallback senza JavaScript espone i cinque collegamenti. Il campo non intercetta input né impedisce pinch zoom.

## File

`dist/src/model.mjs`: proporzioni/proiezione/gesti. `geometry.mjs`: topologie e sagoma. `field.mjs`: fondo e particelle. `card-fx.mjs`: superficie, testo, colore e reveal. `vfx-config.mjs`: parametri. `config.mjs`: contenuti e URL. `dist/navigation/`: kit overlay originale.

Diagnostica locale: `/?qa` e `/?qa&motion=reduce`. La pagina di verifica sotto `scripts/qa-check.html` può essere copiata temporaneamente nella root servita. Non è parte dell'interfaccia pubblica.

Le misurazioni e i limiti della verifica sono in `QA.md`.

## R6 — correzioni dal deploy

- Risolto il colore non valido che rendeva nera la typo al primo hover debole. Testo pieno avorio, microfacce più discrete, propagazione finita e locale.
- Dimensioni della card e posizioni delle frecce rispettano le hit area reali di logo/dock, con almeno 12 px di separazione nei formati verificati, anche con safe area.
- Hint leggibile sopra il blur; nascosto quando non ha spazio sufficiente.
- Focus mouse separato dal focus tastiera per evitare colore bloccato dopo un trascinamento.
- Ripristino dell’ultima sezione nella sessione, deep link e bridge parent/iframe con origini verificate.

**Integrazione Framer necessaria:** aggiungere il blocco completo di `docs/framer-nav-bridge.html` nella home, Custom Code → End of body, e pubblicare la home. Questo completa il supporto degli URL esterni `/#start`, la sincronizzazione del parent e il titolo accessibile dell’iframe già esistente. Non creare un secondo iframe. Senza il blocco, il child ripristina l’ultima sezione visitata nella sessione ma non può leggere il frammento cross-origin del parent. Dettagli in `docs/ROUTE_RESTORE.md`.
