# Memento Studio — Isometric / Vercel

Pacchetto completo della versione aggiornata dello studio 3D, esportato il 5 novembre 2026.

## Deploy su Vercel

1. Estrai lo ZIP.
2. Carica il contenuto della cartella in un repository e importalo in Vercel, oppure esegui `vercel` dalla cartella estratta con la CLI di Vercel.
3. Usa come Root Directory la cartella che contiene `vercel.json` e `package.json`.

La configurazione è già inclusa:

| Impostazione | Valore |
| --- | --- |
| Framework Preset | Other |
| Install Command | `npm ci --include=dev` |
| Build Command | `npm run build` |
| Output Directory | `dist` |

Non sono richieste variabili d'ambiente. Il pacchetto contiene tutti gli asset utilizzati a runtime.

## Contenuto

- Camera esterna ortografica con inquadratura isometrica ispirata al riferimento.
- Passaggio fluido alla camera interna, ingresso, uscita e rientro.
- Fuoco sugli oggetti con bokeh e ritorno alla vista precedente.
- 15 Shader FX, luci collegate agli interruttori e giorno/notte.
- Inquadratura e comandi adattati al mobile.
- Modelli desktop e mobile, particelle, voxel e font locali.

I sorgenti modificabili sono `dist/main.js`, `dist/studio/*.js`, `dist/style.css` e `dist/index.html`.
`dist/app.bundle.js` è il bundle già compilato; dopo ogni modifica JavaScript, rigeneralo con:

```sh
npm ci --include=dev
npm run build
```

Gli asset `.gz` vengono decompressi dall'applicazione. La configurazione inclusa mantiene questo comportamento; non aggiungere un header HTTP `Content-Encoding: gzip` a questi file.

Le licenze delle librerie distribuite e del font si trovano in `licenses/`.

Riferimento configurazione: https://vercel.com/docs/project-configuration/vercel-json
