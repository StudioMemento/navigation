# Memento Portfolio — V43

Aggiornamento della V42 Struttura, 17 novembre 2026. Due interventi:

1. Effetti visivi, sfondo, reazione al tocco e ottimizzazioni mobile di START V27, come già portati su LevelUp V20.
2. Nuova struttura della pagina progetto, pronta per integrare i lavori.

## 1 · Effetti e mobile di START V27

- **Motore VFX START V27.** Stesse costanti e stesso materiale di LevelUp V20. Titoli monocromi a riposo, ambra in hover e al tocco. Tavole con edge glow e frammentazione nelle bande di scroll. Nessuna grana.
  - **Superfici**: titoli "Progetti." e "Archivio.", titolo del progetto e VISION. Tavole: card del catalogo/archivio, board del selettore (disegnate con la loro trasformazione e ritagliate dal selettore), gallery ed Experience.
- **Sfondo Ghost Fibers** (preset START, 5 layer, senza grana). Ha un budget separato: max 30 render/s, DPR 1. Parte 350 ms dopo il contenuto e si ferma mentre un'esperienza è a schermo intero.
- **Onda touch**: ogni tocco percorre il reticolato e raggiunge le superfici vicine, senza cerchi. Senza WebGL i titoli raggiunti si scaldano per un attimo.
- **Mobile**
  - La pagina usa lo scroll nativo del documento, al posto del contenitore interno `#viewport`: inerzia iOS e barre del browser gestite dal sistema.
  - Il canvas segue lo scroll nativo, con margine sopra e sotto.
  - Sui dispositivi touch le foto sono a colori a riposo. Desktop: monocromo a riposo, colori in hover.
- **Navbar kit 12.1.0**: già presente nel primo paint, con un bundle unico (`navigation/portfolio.bundle.js`). Icone da 4–7 kB invece dei thumbnail da 450–750 kB. Altezza legata alla viewport visibile.
- **Superficie embed come START**
  - Pagina da sola o embed semplice: fondo nero opaco con le fibre e navbar propria.
  - Con `?mementoEmbed=1` (host compatibile): trasparente, senza sfondo.
- **Estensione del motore (marcata `Portfolio`).** Nuova opzione `data-vfx-colour`: la foto resta a colori anche a riposo su desktop. È usata dalla gallery e dalla board attiva del selettore, che altrimenti sarebbero grigie. Il resto del motore è invariato; sorgenti in `vfx/` (51 test).
- **Fallback**: nessun velo di avvio. Senza WebGL2, con forced colors o con un errore resta la pagina DOM completa.

## 2 · Struttura del progetto

| Rif. | Modifica |
| --- | --- |
| IMG1 | Titolo del progetto centrato, su una o due righe (variante centrata sotto). |
| IMG2 | **Gallery sistemata e collegata ai dati.** Mostra le immagini reali del progetto, ha cornice nella proporzione prevalente (tra 5:4 e 16:9, 4:3 su mobile) e immagini intere (contain). Stage e miniature stanno sempre tra wordmark e dock. Miniature vere, frecce avanti/indietro, swipe, tastiera e trackpad orizzontale. |
| IMG3 | **Experience**: sito (iframe), video (YouTube/Vimeo o file) o modello 3D (model-viewer). Prima del tocco "Avvia" non si carica nulla. Pulsanti **Apri** (nuova scheda) e **Espandi** (schermo intero, overlay su iOS). Già collegate le 12 esperienze presenti in `projects.json`; negli altri progetti resta lo slot EXP / VIDEO / 3D. |
| IMG4 | **VISION + breve copy**: titolo VISION e un testo breve. Finché il copy non è scritto, compare un segnaposto tra parentesi. |
| IMG5 | **Process rimosso.** |
| IMG6–7 | **Archivio a fine progetto**: il catalogo stesso, con le stesse card e gli stessi filtri, scende in fondo alla pagina. La card del progetto aperto è segnata "In visione". Un clic riporta in cima e il selettore si allinea; con un filtro attivo, il selettore usa quei progetti. |
| IMG8 | **Rimosso lo slider/scroll cue custom.** Restano scroll nativo, Home/End e tastiera. |

Il selettore in alto mantiene la geometria V42 ma ora è animato frame per frame (stesso movimento di LevelUp), così il motore disegna le board nella stessa posizione del DOM. Con 4 progetti o meno non va in loop.

## Integrare i lavori (`site/projects.json`)

Campi opzionali per progetto. Se mancano, valgono i default indicati.

```json
{
  "id": "auren",
  "gallery": [
    { "type": "image", "src": "assets/auren-01.webp", "thumb": "assets/auren-01-thumb.webp", "alt": "Il flacone" }
  ],
  "experience": { "type": "web", "url": "https://…" },
  "vision": { "copy": "Una o due frasi sulla visione del progetto." }
}
```

- **gallery**: se manca, la gallery usa le immagini dei `modules` (render, sketch, print…). Se sono meno di due, usa anche l'overview. La cover non viene ripetuta, perché è già nel selettore.
- **experience**: un oggetto, oppure `false` per togliere la sezione.
  - `type: "web"` richiede `url` (oppure `embed` se l'URL da incorporare è diverso).
  - `type: "video"` richiede `embed` (YouTube/Vimeo) oppure `src` (`.mp4`/`.webm` in `assets/`).
  - `type: "model"` richiede `src` (`.glb` in `assets/`).
  - Opzionali: `poster` (default: la cover), `title`, `ratio` (es. `"16/9"`).
- **vision**: `{ "copy": "…" }` sostituisce il segnaposto; `false` toglie la sezione.
- Le nuove immagini vanno in `site/assets/`. Le varianti responsive in `images.json` sono facoltative: senza, viene servito l'originale.

`npm run verify` controlla dati, asset e struttura prima del deploy.

## Vercel

Estrai lo ZIP; la Root Directory è la cartella con `package.json` e `vercel.json`. Impostazioni invariate rispetto alla V42:

| Impostazione | Valore |
| --- | --- |
| Framework Preset | Other |
| Build Command | `node release/build.mjs` |
| Install Command | `node --version` |
| Output Directory | `dist` |

La build rigenera bundle e primo paint della navbar da `site/navigation/`, poi copia `site/` in `dist/`. Non servono dipendenze npm né variabili d'ambiente. `node release/verify-package.mjs` controlla i riferimenti dopo la build.

Il motore VFX è già compilato in `site/vfx/`. Va ricompilato solo se modifichi `vfx/src/`: `cd vfx && npm install && npm test && npm run build`. Per il debug: `?vfxdebug` espone il motore in console; `?vfx=high|medium|low` forza un profilo di qualità (non usarlo nel deploy).

## Verifica e limiti

Dettagli in `VERIFICA_V43.json`.

- **Verificato in Chromium**: 320, 390, 768, 1024, 1363, 1440 e 1920 px.
  - Nessun overflow orizzontale; titolo centrato a ogni larghezza; gallery e miniature dentro la viewport utile.
  - Motore live con 59 superfici pronte; onda touch su mobile; hover desktop; nessun errore della pagina.
  - Flussi provati: selettore, gallery, Experience con schermo intero, archivio con filtro, Esc, indietro/avanti.
- **Limite del renderer software (SwiftShader)**: sfondo ed effetti insieme sono lentissimi e il contenuto può non comparire nello screenshot. LevelUp V20 riporta lo stesso. Separatamente, sfondo + DOM ed effetti + DOM sono corretti.
- **Non provato**: GPU reali, telefoni fisici, Safari e Firefox. Non ho potuto caricare i siti delle esperienze esterne da qui: se un sito blocca l'iframe, resta il pulsante **Apri** in nuova scheda.
- **Contenuti**: nessun copy inventato. Vision mostra un segnaposto finché non scrivi il testo.

Lo ZIP non pubblica automaticamente: è pronto per il progetto Vercel esistente.
