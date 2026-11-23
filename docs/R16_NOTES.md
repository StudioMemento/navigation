# R16 — hover vivo, foto nei loro colori, cambio pagina dal reticolato

## Richiesta

Dopo la R15 su Vercel: da mobile tutto fluido e la reazione a catena piace; da desktop l'hover su una card è statico. Le foto passano dal bianco e nero a una tinta arancione forte: in hover devono tornare ai colori originali (sono già calde), con al massimo una luce leggera nel raggio del cursore, senza effetto disco. Il cambio pagina deve scomporre l'interfaccia per formare il logo, poi il logo si scompone e la nuova interfaccia si compone attraverso il reticolato, un po' più lungo e morbido.

## Hover desktop

Con il mouse l'hover usa la stessa reazione dei telefoni: percorsi connessi che corrono nelle celle della card verso i bordi e accendono il contorno.

- Un'onda parte dal punto in cui il cursore entra in una card o in un titolo; un'altra ogni 150 px percorsi, mai più vicine di 0,3 s (`VFX.pointer.wave`).
- Le onde restano nella superficie sotto il cursore (`scope`): il resto della pagina non si accende. Un tocco continua a raggiungere tutte le superfici visibili, come prima.
- L'onda di ingresso è piena, quelle di movimento al 78%. Sotto continua la catena lenta dell'hover della START.
- Home (carosello) e pagine usano lo stesso meccanismo (`src/vfx/touch.mjs`, `src/surfaces/touch.ts`).

## Foto

- A riposo restano in bianco e nero su desktop (DNA); sui dispositivi senza hover restano a colori, come prima.
- In hover compaiono **i colori originali, interi**: niente più gradazione ambra della luminanza (`ramp`) sulle pagine, niente più saturazione all'80% e luci rinforzate sulla Home.
- Sotto il cursore una luce morbida: il colore schiarito con se stesso (fusione *screen*), così le tinte restano e niente si brucia. Forza e raggio in testa agli shader: `PHOTO_SPOT` (0,5) e `PHOTO_SPOT_R` (210 px sulle pagine, 230 px card sulla Home).
- Il bloom della foto è sceso da 0,4 a 0,04–0,2 (solo vicino al cursore), le lampade delle scene della Home da 0,9 a 0,2. Sopra la foto le celle della reazione sono più leggere e quasi neutre; l'ambra resta sul nero e sul contorno.

## Cambio pagina

Un solo canvas 2D sopra la pagina (`scripts/scene-material.mjs`), funzione pura del progresso: la pagina nuova riparte dallo stesso fotogramma della vecchia (il progresso passa in `sessionStorage`, chiave `memento.route.handoff.v4`).

1. **Uscita (560 ms, prima 260).** Le celle del reticolato si chiudono a partire dal punto toccato o cliccato (tastiera e cronologia: dal centro). Il fronte mostra le sue cuciture in ambra. Le celle sopra l'interfaccia (card, foto, titoli, dock) diventano frammenti che volano al centro, si posano sul sigillo Memento e lo fanno apparire.
2. **Attesa.** Il sigillo resta finché la pagina nuova ha immagine e font pronti (massimo 0,9 s, come prima).
3. **Ingresso (700 ms, prima 260).** Il sigillo si rompe in frammenti che volano verso le superfici della pagina nuova. Le celle si aprono dal centro verso i bordi, e quelle raggiunte da un frammento si aprono al suo arrivo.

Il reticolato è irregolare come quello delle card (22–42 px secondo lo schermo). Ogni cella è una fill separata: un unico tracciato con migliaia di triangoli era dieci volte più lento. Nel renderer software di prova servono 1–6 ms per fotogramma a 1280 × 800. Movimento ridotto e colori forzati: nessuna transizione, come prima. Le regolazioni stanno in `weave` (`scene-material.mjs`) e in `gather`/`unfold` (`scene-head.mjs`).

## File

- `scripts/scene-material.mjs`: transizione a reticolato (`weave`, `createMaterial`).
- `scripts/scene-head.mjs`: durate, punto d'origine, superfici di partenza e d'arrivo, chiave v4.
- `src/vfx/config.mjs`: `VFX.pointer.wave`.
- `src/vfx/touch.mjs`, `src/surfaces/touch.ts`: onde con `scope` e `gain`, reazioni con `owner`.
- `src/surfaces/engine.ts`, `src/renderer.js`: onde di hover con il mouse.
- `src/surfaces/shaders.ts`, `src/shaders.js`: foto nei loro colori, luce del cursore, bloom e lampade ridotti, celle più leggere sulle foto.
- `tests/r16.test.mjs` (nuovo).

## Verifica del 23 novembre 2026

- `npm test`: 53 test superati (4 nuovi). `npm run build`: riuscita.
- Transizione in Chrome headless, con le transizioni fra documenti attive: catena Home → Start → Servizi → Portfolio → LevelUp → Home, sia desktop (1024 × 640, clic sul dock) sia telefono (390 × 844, tocco). Ogni passaggio va da `gather` a `unfold` e si chiude in 1,5–3,5 s, comprese le pagine pesanti sul renderer software. I fotogrammi registrati mostrano uscita, sigillo e ricomposizione.
- Foto: hover sulla Home e su Servizi confrontato con le immagini originali. I colori coincidono, con la luce intorno al cursore; a riposo restano in bianco e nero.
- Hover: con il mouse le onde partono all'ingresso e al movimento, solo nella card sotto il cursore, e accendono il contorno.
- Console senza errori. Resta il 404 di `favicon.ico` su LevelUp, già presente prima.

## Non verificato

- Fluidità e tempi su GPU, iPhone e Android reali: il renderer software di prova va a pochi fotogrammi al secondo.
- Safari e Firefox: dove il browser non ha le transizioni fra documenti la pagina cambia direttamente, come prima.
