# MEMENTO — Vertical NAV R3

Navigazione realizzata da zero sul brief `MEMENTO_NAV_VERTICAL_3D_HANDOFF_R2`, con i cinque master consegnati. Solo il progetto NAV. HTML, CSS e moduli JavaScript nativi; nessuna dipendenza runtime o chiave API.

## Avvio

Servire la cartella `dist` con un server HTTP. Per esempio, con Python installato:

```sh
python3 -m http.server 4173 --directory dist
```

Aprire `http://localhost:4173`. I moduli ES richiedono HTTP: non aprire `index.html` con doppio click.

## Vercel

Importare il contenuto dello ZIP in un repository o nel progetto Vercel dedicato alla NAV.

- Framework preset: **Other**.
- Root directory: la cartella che contiene questo file e `vercel.json`.
- Build command: vuoto (nessuna build).
- Output directory: **dist**.
- Nessuna variabile d'ambiente.

`vercel.json` contiene già la configurazione. Non è stato eseguito un deploy sul progetto Vercel esistente. La versione verificabile è una nuova anteprima separata.

## Comandi

- Rotella verso il basso / swipe verso l'alto / freccia giù: sezione successiva.
- Drag verticale con mouse o touch; snap al rilascio.
- Chevron esterni, area 44 × 44 px.
- La navbar seleziona la card, la card attiva apre la destinazione.
- Click sulla secondaria: la porta al centro.
- Frecce su/giù, PageUp/PageDown; Home/End selezionano prima/ultima.
- Nella navbar, frecce sinistra/destra spostano il focus.
- Ctrl/Cmd-click e click centrale mantengono il comportamento dei link.
- Loop Studio → Services → Projects → LevelUp → Start → Studio. Nessun autoplay.

## Destinazioni conservate

Verificate nel sorgente del deploy `https://mementonav.vercel.app/src/config.mjs` il 6 novembre 2026.

| Card | URL |
|---|---|
| Studio | https://mementostudio.it/studio |
| Services | https://mementostudio.it/services |
| Projects | https://mementostudio.it/projects |
| LevelUp | https://mementostudio.it/levelup |
| Start | https://mementostudio.it/start |

Il wordmark apre `https://mementostudio.it/`. Le pagine di destinazione non sono incluse né modificate.

## Struttura e regolazioni

- `dist/src/config.mjs`: sezioni, URL e punto focale desktop delle immagini.
- `dist/src/model.mjs`: proporzioni, proiezione/inversa, snap e geometria dello slider.
- `dist/src/app.mjs`: coordinamento animazioni, input, stato, caricamento e uscita.
- `dist/src/geometry.mjs`: triangolazione deterministica riutilizzata dagli FX.
- `dist/src/field.mjs`: campo irregolare esterno, prossimità e impulsi touch.
- `dist/src/card-fx.mjs`: materiale locale, bordi, glifi e costruzione distribuita.
- `dist/src/style.css`: layout, forma, tipografia, focus e riduzione del movimento.
- `dist/assets/scenes`: WebP 96/480/960/1254 px e fallback JPEG.
- `dist/assets`: icone e wordmark esistenti, font Inter locale.

Le card sono cinque nodi DOM permanenti. Titolo, superficie, immagine, materiale e bordi si trasformano insieme; nessuna sostituzione dell'immagine a metà swipe. Le immagini vengono decodificate prima del passaggio nitido, con fallback coerente e un solo tentativo alternativo JPEG.

La scena mantiene un unico progresso continuo. La proiezione delle secondarie porta i bordi esterni verso l'utente. Le anteprime sono ritagliate dolcemente ai limiti della scena; sui viewport molto bassi lo spazio è riservato a card centrale, logo e controlli.

Il campo globale è dietro superfici opache. Il materiale interno è indipendente e ritagliato. Le maschere di costruzione sono triangoli distribuiti della superficie reale. Le card già costruite si spostano intere.

La risoluzione degli FX è limitata; gli FX a riposo delle secondarie sono memorizzati. La pagina nascosta sospende il ciclo. `prefers-reduced-motion` disabilita deriva continua e inclinazioni animate e semplifica i passaggi.

Per una diagnostica locale aprire `/?qa=1`: l'attributo `data-qa` di `#hub` contiene dimensioni, immagini decodificate e campioni prestazionali. Non inserisce pannelli nell'esperienza.

## Verifica

```sh
npm test
```

Leggere `QA.md` per prove, misure e limiti. Il target 60 fps e il comportamento sui telefoni fisici non sono certificati da questa consegna.

## Provenienza asset

Immagini: cinque PNG master square allegati al brief, convertiti in formati web senza nuova generazione. Wordmark, icone e font: asset del deploy Memento esistente. Nessun caricamento di font o immagini da CDN terze durante l'uso.
