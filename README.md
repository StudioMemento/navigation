# Memento — Hub fullscreen V2

Un solo header alto quanto il viewport: slider, nome della pagina, chevron verso il basso.

## Navigazione

- Trascina o scorri orizzontalmente per scegliere tra le cinque tavole; loop continuo.
- Clicca una tavola laterale per selezionarla.
- Clicca la tavola attiva, il titolo o il chevron per aprire la pagina canonica nella stessa finestra, anche quando l’hub è incorporato.
- Uscita di 380 ms: dissolvenza e lieve movimento verticale. Con movimento ridotto, navigazione immediata.
- Frecce sinistra/destra e Home/End selezionano; Invio apre. Link nativi per nuova scheda, tasto centrale e menu contestuale.
- Indietro nel browser ripristina la selezione senza schermata nera.

## Destinazioni

| Tavola | Pagina |
|---|---|
| Studio | https://mementostudio.it/studio |
| Services | https://mementostudio.it/services |
| Projects | https://mementostudio.it/projects |
| LevelUp | https://mementostudio.it/levelup |
| Start | https://mementostudio.it/start |

Gli hash `/#studio`, `/#services`, `/#projects`, `/#levelup`, `/#start` selezionano la tavola. Compatibili anche gli hash precedenti e i percorsi `/services`, ecc. Il cambio di slide non carica la destinazione: l’apertura avviene al clic. Nessun iframe, navbar, footer, contatore o testo descrittivo nell’hub.

## Vercel

Usare i file dello ZIP alla root del repository del progetto `mementonav`.

| Impostazione | Valore |
|---|---|
| Root Directory | Vuota — root del repository; rimuovere il vecchio `hub` |
| Framework Preset | Other |
| Build Command | `npm run build` |
| Output Directory | `dist` |
| Node | 24.x |

`vercel.json` contiene la configurazione di build. Non servono dipendenze npm o variabili d’ambiente.

## Sorgenti

- `src/app.mjs`: slider, gesture, tastiera e uscita verso le pagine.
- `src/config.mjs`: immagini, URL e tempi.
- `src/fx.mjs`: titolo a tutta larghezza, gradiente ambra e glow locale sul testo e sui bordi.
- `src/styles.css`: layout fullscreen responsive.
- `assets/`: font locale e cinque immagini WebP, con versioni ridotte per mobile.
- `originals/`: PNG delle cinque immagini generate; esclusi dalla build.

L’effetto tipografico conserva la forma dei caratteri. Nessun particellare permanente o scena 3D. Il browser renderizza gli FX solo quando necessario. Le pagine destinazione mantengono il proprio aspetto e i propri tempi di caricamento.

## Verifica locale

```sh
npm run check
npm test
npm run build
npm run dev
```

Preview locale su `http://localhost:5173`. `scripts/qa.html` contiene il solo banco di verifica responsive e non viene pubblicato in `dist`.
