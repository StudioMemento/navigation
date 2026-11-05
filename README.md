# Memento — Hub fullscreen V3

Header a cinque scene: tab attiva ampia, titolo spaziato all’interno in basso, frecce laterali e chevron d’ingresso. Navbar overlay V12 integrata, con logo superiore e dock inferiore.

## Novità V3

- Cinque ambienti: studio operativo, atelier, galleria, percorso ascendente e spazio d’incontro.
- Cinque composizioni verticali dedicate per mantenere i soggetti interi su mobile e tablet portrait.
- Immagine principale contenuta per intero e fondale sfocato coordinato.
- Titolo all’interno della tab, con padding relativo e spaziatura a tutta larghezza.
- Frecce laterali, trascinamento, trackpad orizzontale e loop sulle cinque sezioni.
- Collegamenti coerenti su tavola, titolo, chevron e navbar; ripristino con Indietro.

## Navigazione

Clicca una tavola laterale per selezionarla. Clicca la tavola attiva, il titolo o il chevron per aprire la pagina nella finestra superiore, anche quando l’hub è incorporato. La navbar apre direttamente la destinazione scelta; il logo porta alla home.

Frecce sinistra/destra e Home/End selezionano; Invio sul carosello apre. I link nativi supportano nuova scheda, tasto centrale e menu contestuale. Uscita di 380 ms; con movimento ridotto la navigazione è immediata. Nessun autoplay.

| Tavola | Destinazione |
|---|---|
| Studio | https://mementostudio.it/studio |
| Services | https://mementostudio.it/services |
| Projects | https://mementostudio.it/projects |
| LevelUp | https://mementostudio.it/levelup |
| Start | https://mementostudio.it/start |

Gli hash `/#studio`, `/#services`, `/#projects`, `/#levelup`, `/#start` selezionano la tavola. Restano compatibili gli hash precedenti e i percorsi `/services`, ecc. Nessun iframe interno: le destinazioni restano progetti esterni.

## Vercel

Estrai il contenuto dello ZIP alla root del repository di `mementonav`. Il pacchetto contiene direttamente `package.json`, `index.html` e `vercel.json`, senza cartella contenitore.

| Impostazione | Valore |
|---|---|
| Root Directory | Root del repository: lascia vuoto; rimuovi l’eventuale vecchio valore `hub` |
| Framework Preset | Other |
| Build Command | `npm run build` |
| Output Directory | `dist` |
| Node | 24.x |

La configurazione è già in `vercel.json`. Non servono dipendenze npm né variabili d’ambiente. L’esportazione non modifica il deployment pubblico.

## Sorgenti

- `src/app.mjs`: selezione, gesture, tastiera, uscita e ripristino.
- `src/config.mjs`: scene, URL e tempi.
- `src/fx.mjs`: titolo SVG, gradiente ambra e reticolo locale su testo e bordi.
- `src/styles.css`: layout responsive e composizione delle immagini.
- `navigation/`: navbar overlay con asset locali.
- `assets/`: Inter locale e WebP wide, ridotte e portrait.
- `originals/`: dieci PNG delle scene generate, esclusi dalla build pubblica.
- `docs/VERIFICA.md`: controlli effettuati e limiti della verifica.

Le scene sono immagini raster; la profondità dello slider usa trasformazioni CSS. Il reticolo conserva la forma dei caratteri ed è aggiornato solo quando necessario.

## Verifica locale

```sh
npm run check
npm test
npm run build
npm run dev
```

Preview su `http://localhost:5173`; banco responsive su `http://localhost:5173/scripts/qa.html`. La build pubblica include solo `index.html`, `src/`, `assets/` e `navigation/`.
