# MEMENTO NAV · V6 VERTICAL

Navigazione verticale circolare: **Studio → Services → Projects → LevelUp → Start → Studio**.

## Interazione

- Desktop: scroll verticale, trackpad, click e drag verticale; tastiera ↑ ↓, PageUp/PageDown, Home/End e spazio.
- Mobile: swipe nativo up/down con scroll snap. Pinch zoom mantenuto.
- Navbar: l’icona ambra indica la sezione attiva. Click/tap su un’icona seleziona la relativa slide.
- Click/tap sulla tab, compreso il titolo, apre la pagina canonica. Ctrl/Cmd/middle-click mantengono il comportamento nativo del link.
- Nessun chevron e nessun indicatore aggiuntivo.

## Layout e immagini

La tab attiva ha **20% di inset su ciascun asse** a tutti i breakpoint: 20% della larghezza a sinistra/destra, 20% dell’altezza sopra/sotto. Occupa quindi 60vw × 60dvh. Logo e dock sono overlay fissi con safe area.

Cinque nuove scene quadrate 1254 × 1254, con primo piano inferiore sfocato, in WebP a 480 / 768 / 1254 px. In portrait l’immagine square resta intera e si fonde nel fondo della tab; su wide si adatta in cover. Titolo ampio nella parte inferiore e sfumatura ambra continua a 135° verso il basso a destra.

## VFX

Un unico canvas condiviso disegna il reticolato monocromatico, più visibile ai margini. Il cursore attiva localmente ambra, bordi e trama interna molto discreta. Il range ha falloff graduale modulato da noise. I glifi mantengono la loro forma; wireframe e glow si applicano anche alle lettere vicine.

Ogni touch genera un impulso irregolare, in espansione e dispersione per circa 1,45 s. Non blocca lo swipe. Reveal/dissolve con reticolato e piccoli frammenti triangolari accompagnano il passaggio delle sezioni e l’uscita dalla nav.

## Performance e accessibilità

- Nessuna dipendenza runtime, nessun framework o CDN.
- Icone del dock ridotte da 2,37 MB a 21,4 KB complessivi; font Inter Latin/Latin-1 a 98 KB.
- Tutte le 15 varianti delle cover: 370,9 KB complessivi; le cinque versioni 768 px: 91,5 KB.
- Immagini responsive, lazy load e priorità alla sezione iniziale/vicine.
- Canvas a risoluzione limitata, 4 impulsi e 72 frammenti massimi; budget inferiore su pointer coarse.
- Disegno sospeso a riposo e quando la pagina è nascosta.
- `prefers-reduced-motion` disattiva propagazione e particelle; forced colors disattiva il campo.
- Focus visibile, link reali, indicazione della sezione per screen reader, fallback senza JavaScript.

## Vercel

Estrarre lo ZIP e usare questa cartella come root del progetto.

- Framework preset: Other
- Build command: `npm run build`
- Output directory: `dist`
- Node: 20 o successivo
- Nessuna variabile d’ambiente

`vercel.json` è già incluso. Il build assegna una directory con hash alle immagini per evitare cover obsolete in cache. I link di destinazione restano su `https://mementostudio.it/studio`, `/services`, `/projects`, `/levelup`, `/start`.

## Verifica locale

```sh
npm test
npm run check
npm run dev
```

La pagina `/scripts/qa.html` del server di sviluppo permette di controllare tre viewport e gli impulsi touch. Il report è in `docs/QA.md`. Le pagine QA non sono incluse nel build pubblico.
