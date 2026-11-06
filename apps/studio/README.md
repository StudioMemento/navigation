# Memento / Studio — Cinematic Slots + Navbar Overlay

Esperienza isolata dello Studio 3D. Gli altri siti Memento e le destinazioni dei link sono invariati.

## Vercel

Il sito compilato è in `dist/`. Estrarre lo ZIP, scegliere preset **Other**, output **dist**, installazione e build disabilitate come nel `vercel.json` incluso. Nessuna chiave o variabile d'ambiente. Per sviluppo: `npm ci`, `node scripts/build.mjs`, poi un server statico su `dist/`.

## Navbar, logo e blur — V12

Integrato il kit `O V E R L A Y(4).zip`: wordmark superiore, navbar inferiore con Studio attivo e blur progressivo trasparente sui bordi superiore e inferiore. I link puntano alle sei destinazioni canoniche `https://mementostudio.it/`, `/studio`, `/services`, `/projects`, `/levelup`, `/start`.

Il vecchio logo in alto a sinistra è rimosso. I comandi Camera / Lighting / Shader rimangono sopra la navbar e nitidi; su mobile le azioni in alto restano sotto il wordmark. Il joystick ha spazio dedicato. La scena continua a occupare l'intera viewport. Il bootstrap è unico e conserva il bridge del kit: un contenitore compatibile può nascondere l'overlay del figlio. Escape chiude prima focus/vista interna dello Studio.

Dettagli e limiti della verifica: `docs/NAV_OVERLAY.md`.

## Interazione

Tre pulsanti, da sinistra: **Camera → Lighting → Shader**. Ogni clic estrae direttamente una scelta casuale da un mazzo mescolato, senza tendine e senza ripetizioni consecutive. Tutti gli elementi compaiono prima del rimescolamento. L'ultima richiesta prevale sui clic ravvicinati.

- 20 composizioni: isometria iniziale, postazioni, salotto, libreria, caffè, softbox e dettagli. Percorsi sulla griglia navigabile, transizioni e profondità di campo moderata.
- 34 setup dal riferimento, definiti in `dist/studio/light-presets.js`.
- I 22 shader Atlas e 6 nuove varianti: Copper etching, Cyanotype, Iridescent porcelain, Halftone noir, Brushed titanium, Silver relief.
- Cinque display con animazioni procedurali, composizioni e fasi diverse, palette coerente con lo shader ed emissione luminosa.
- Fondo nero puro. Nessuna atmosfera, piano di appoggio o disco luminoso artificiale aggiunto. La luce del softbox usa la geometria originale.
- UI a icone senza testi visibili; etichette accessibili e annunci per screen reader. Pausa e preferenze di movimento ridotto.

Trascina per esplorare, doppio clic/tocco per il fuoco, freccia indietro o Escape per tornare all'isometria. Scroll, WASD/frecce con canvas a fuoco e joystick touch mantengono l'esplorazione manuale. Clic sulle sorgenti fisiche per accenderle/spegnerle.

## Modello e rendering

V4 invariato: 92 oggetti logici, 99 primitive, 363.607 triangoli desktop / 260.031 mobile. Conservati AO, normal map PC/Dyson, parti separate e coordinate. Inquadratura iniziale ortografica.

Materiali con uniformi condivise e pipeline stabile nei cambi shader. Voxel istanziati in una draw call; point cloud di 48.000/24.000 campioni prima del controllo densità. Un solo shadow caster, aggiornato durante i cambi rig e il movimento della luce. DPR adattivo 1–1,65 desktop / 1–1,25 mobile, MSAA 4/2. Un pass Atlas, fuoco solo quando necessario. Asset caricati in parallelo, frame loop sospeso a scheda nascosta. Le prestazioni dipendono da GPU, viewport e stile; non è garantito un frame rate fisso.

## Atlas

`dist/studio/atlas/` contiene i sorgenti originali del catalogo e dei GLSL. `atlas-adapter.js` porta le equazioni e i postprocess sul modello Studio, con illuminazione reale, AO e normal map. Voxel e Point cloud sono campionati dalla scena effettiva. La maschera del postprocess conserva il nero esterno. Graphite usa pressione 1, tratteggio 0,49 e grana 0,2, con emissione display abilitata. È un adattamento dello shading a un modello diverso, non una replica pixel per pixel della workstation Atlas.

## Verifiche

- `node scripts/verify-slots.mjs catalog`
- `node scripts/verify-slots.mjs integration`
- `node scripts/verify-slots.mjs navigation`
- `node scripts/verify-model-v4.mjs`

La verifica integrazione usa le impronte degli asset incluse nello ZIP; non richiede la cronologia Git. Audit: `docs/SLOTS_AUDIT.md`. Provenienza shader: `docs/atlas-provenance.json`.
