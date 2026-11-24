# R18 — card, titoli di Servizi, hover, scrollbar, slider di LevelUp, cambio pagina, fondo #090909

## Richiesta (24 novembre 2026)

1. Servizi: la sfumatura delle card è troppo netta. Deve essere graduale, coprire buona parte dell'immagine, senza banding.
2. I testi delle card devono avere l'effetto dei titoli della pagina Start.
3. L'hover sulle tab è gradevole ma quasi invisibile: un po' più forte.
4. I titoli delle categorie (Web design, 3D design, Video, Visual, Design, Branding) vanno avvicinati alle slide: a pieno schermo, guardando la slide, il titolo finisce nella fascia di scroll e viene scomposto.
5. Su ogni pagina con lo scroll, un indicatore personalizzato al posto di quello del browser: sottile, arancione Memento sfumato.
6. LevelUp: gli slider neutro/brandizzato partono già al centro, così si capisce che vanno trascinati.
7. Cambio pagina: al posto dell'icona Memento si compone il nome della pagina in tipografia; il logotipo e la navbar restano sempre visibili, cambia solo il contenuto.
8. Fondo `#090909`.

## 1. Sfumatura delle card (repo servizi)

La maschera orizzontale della foto era lineare a due stop, da trasparente al 54% della foto. Dove la rampa parte (il bordo sinistro della foto) e dove finisce si vedeva uno spigolo. Inoltre il canvas degli effetti esce a 8 bit senza dithering: sui neri profondi la rampa si legge a gradini.

- `--photo-mask`: curva a S (smootherstep) su sei stop, il massimo che l'engine legge, fino al 66% della foto. La curva parte e arriva piatta, quindi non c'è uno spigolo né all'inizio né alla fine.
- La copia sfocata della foto (`.mobile-title-veil img`) sfuma con la stessa maschera, nel DOM e nell'engine (`maskA` nel velo).
- Grade finale (pagine e Home): dithering fisso sotto un livello a 8 bit. Il pattern è lo stesso a ogni fotogramma, quindi niente grana e niente sfarfallio. Il nero puro resta nero.

## 2. Titoli delle card con il materiale dei titoli (navigation + servizi)

I titoli delle tavole (`.slide-title`, `.bundle-title`, `.item-master-title`) sono superfici `data-vfx="title"` dentro la card. L'engine le collega alla card che le contiene:

- si muovono con la trasformazione 3D del carosello (`followHost`), seguono opacità, focus, ritaglio e dissolvenza laterale della card e sono disegnate subito sopra di lei;
- la card non le dipinge più nel suo inchiostro;
- con il puntatore in qualsiasi punto della card il titolo prende il gradiente ambra. Vicino alle lettere si accendono range, reticolo interno, bordo, glow e scintille, come sui titoli di Start. Le onde dell'hover restano della card;
- il titolo viene letto con il paint DOM della card attivo, come la card stessa. Finché la sua superficie non è pronta, il titolo resta visibile nel DOM.

Vale anche per le tavole dei popup. LevelUp e Portfolio non sono cambiati: per portarlo anche lì basta `data-vfx="title"` sui titoli delle loro card.

## 3. Hover più forte

`HOVER_CELLS` 1,6 nei due renderer: facce e cuciture delle celle accese dalle onde, prima 1. Sopra le foto le celle sono attenuate meno: 50% invece di 70%. Onde un po' più forti e più frequenti: `VFX.pointer.wave` a ogni 120 px (prima 150), guadagno 1,2 / 1 (prima 1 / 0,78). Vale per le tab della Home e per le card delle pagine, che dalla R16 condividono lo stesso hover.

## 4. Titoli delle categorie più bassi (servizi)

Le maiuscole finivano 0,336 em sopra il bordo del box (line box e padding sotto la linea di base), più 20–48 px di margine. Ora quello spazio viene recuperato: tra le lettere e la slide restano 12–24 px. Con la slide alla stessa altezza dello screenshot (pieno schermo, 2576 × 1012), il titolo esce dalla fascia alta di scroll ed è leggibile per intero.

## 5. Indicatore di scroll (navigation)

`public/memento-ui/scrollbar.mjs`, montato da `site.mjs` su tutte le pagine native. Lo scroll del browser e le guide di Servizi e LevelUp sono nascosti. Il nuovo indicatore è un pollice sottile in sovrimpressione, senza gutter, ambra `#FF7950` sfumato dall'alto. In hover, durante lo scroll e durante il trascinamento si allarga e si accende. Funziona con trascinamento, clic sulla guida, tastiera (frecce, PagSu/PagGiù, Home/Fine) e ha ruolo `scrollbar`. Su touch è solo un segnale e non intercetta il dito. Le aree interne che scorrono usano una scrollbar nativa sottile ambra.

## 6. Slider di LevelUp (repo mementolevelup)

I tre confronti partono da `value="50"`: la linea divisoria è al centro.

## 7. Cambio pagina (navigation)

- **Nome della pagina.** Al posto del sigillo, il nome della pagina che si apre (STUDIO, SERVICES, PROJECTS, LEVELUP, START; HOME per la Home). È composto in Inter 300, con le maiuscole spaziate come i titoli della Home, il gradiente ambra dei titoli, il glow e un reticolo fine dentro le lettere. Lasciando la pagina, le schegge volano sulle lettere e le lettere si compongono da sinistra a destra. All'arrivo si rompono nello stesso ordine e le schegge escono verso la pagina nuova. Anche le celle della GPU volano verso la riga del nome, non più verso un punto.
- **Navigazione sempre visibile.** Il livello della transizione sta sotto la navbar (z-index 999 contro 1000). Wordmark e dock non partecipano più all'uscita. Fra i due documenti la navbar è un gruppo della view transition sopra il materiale: resta quella vecchia finché la pagina nuova non si apre, poi passa a quella nuova, cioè la stessa barra con la nuova stazione accesa.
- **Font.** La pagina in arrivo può non avere ancora Inter. Il suo materiale sostituisce l'ultimo fotogramma della pagina vecchia solo quando il nome è composto nel suo font (`data-mm-name`, al massimo 900 ms).
- **Fondo.** Il nero di copertura è `#090909` (`weave.ground`).

## 8. Fondo #090909

`--memento-ground` in `site.css` per tutte le pagine native, che vince sui fondi delle singole pagine. Sulla Home è `--ink` in `src/style.css`, più il `theme-color`. Card, pannelli e tab restano neri: si staccano appena dal fondo. Il blur progressivo della navbar sulle pagine usa un solo livello mascherato. Su `#090909` può arrotondare di un livello (1/255) dentro la maschera, e alla verifica non si vede.

## Build locale con sezioni non pubblicate

`MEMENTO_SECTIONS=/percorso/cloni npm run build` prende le sezioni da cloni locali (stessi nomi delle repo GitHub) invece che da GitHub. Su Vercel la variabile non c'è e non cambia nulla.

## Verifica del 24 novembre 2026

- `npm test`: 65 test superati (60 + 5 della R18). Servizi: 9 test superati. LevelUp: 20 test superati, dopo la build.
- `npm run build` con le sezioni locali: riuscita.
- Chrome headless con renderer software (SwiftShader), `?vfx=high`:
  - Servizi a 2576 × 1012 (zoom 75%, come lo screenshot): titolo VISUAL integro con la slide nella stessa posizione; sfumatura senza spigolo e senza gradini anche con contrasto ×6; titolo della card con gradiente a riposo, ambra con glow e reticolo in hover vicino alle lettere.
  - Servizi a 390 × 844 touch, con effetti e senza (`?vfx=off`): stesso impaginato.
  - LevelUp: i tre slider a 50, indicatore di scroll visibile, guida vecchia nascosta, fondo `rgb(9, 9, 9)`. Portfolio e Start sul nuovo fondo.
  - Cambio pagina Servizi → Start (video e fotogrammi): navbar e wordmark visibili per tutto il tempo, START composto e poi rotto lettera per lettera, pagina nuova composta dal reticolato.

## Non verificato

- **GPU reali, Safari e Firefox.** Senza view transition fra documenti (Firefox, Safari meno recente) il cambio pagina resta quello normale del browser. Si comporta così da sempre.
- **Velocità reale.** Con il renderer software i fotogrammi sono pochi: tempi e fluidità di onde e transizione vanno guardati sul dispositivo.
- **Studio 3D in locale.** Il caricamento del modello fallisce anche sulla build di `main` in questo ambiente, quindi la causa è l'ambiente e non questa release.
