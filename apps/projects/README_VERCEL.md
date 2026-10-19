# Memento Portfolio V03 — Vercel

Pacchetto sorgente della versione pubblicata su Sites il 19 ottobre 2026, con gli allineamenti delle ultime tavole. Commit di origine: d28eb317030dfe84088045ec0e6f7ab79999cc2d.

## Importazione con GitHub Desktop e Vercel

1. Estrai lo ZIP. `package.json`, `vercel.json`, `src` e `public` devono stare nella cartella principale del repository: non dentro una sottocartella aggiuntiva.
2. Copia i file nella cartella del repository dedicato al portfolio e fai commit e push. Se aggiorni un repository esistente, conserva la cartella `.git` e gli eventuali file tuoi non relativi al sito.
3. In Vercel importa quel repository, oppure usa il progetto già collegato a quel repository.
4. Usa Root Directory `.` (la cartella che contiene `package.json`). Le impostazioni seguenti sono già dichiarate nel pacchetto.

| Impostazione | Valore |
| --- | --- |
| Framework Preset | Vite |
| Install Command | `npm ci` |
| Build Command | `npm run build` |
| Output Directory | `dist` |
| Node.js | `24.x` |
| Environment Variables | Nessuna richiesta |

Lo ZIP contiene i sorgenti: viene estratto nel repository, non caricato come singolo archivio nel repository. Vercel ricostruisce il sito dal codice.

## Routing e risorse

`vercel.json` gestisce l'apertura diretta e il refresh di `/progetti/auren` e delle altre schede. Il file `/experience.html` e gli asset restano file statici indipendenti. Se aggiungi nuove famiglie di route, aggiorna le regole di rewrite.

Immagini, font Inter, video demo e codice del viewer 3D sono inclusi. Non servono API key o servizi esterni per i media dimostrativi. I collegamenti email e Memento Servizi rimangono quelli della versione Sites. Le immagini e le informazioni sono placeholder; il film è una demo senza audio e il modello 3D è dimostrativo.

## Avvio locale

Con Node.js 24:

```sh
npm ci
npm run dev
```

Build:

```sh
npm run build
npm run preview
```

## Verifica del pacchetto

Installazione pulita `npm ci` e `npm run build` completate con Node.js 24.19.0. I bundle CSS/JS e la pagina generata coincidono con quelli della versione Sites verificata. Il warning di dimensione riguarda il viewer Three.js caricato su richiesta.

## Verifica dopo il deploy

- Apri la home, filtra il catalogo e apri Auren.
- Apri direttamente `/progetti/auren` e ricarica la pagina.
- Prova frecce e swipe, espansione delle tavole, chiusura e ritorno al catalogo.
- Controlla play/pausa/seek/fullscreen, esperienza incorporata e viewer 3D sui dispositivi reali.

Il meta `noindex,nofollow` è mantenuto per questa fase di prova. Al lancio definitivo, rimuoverlo da `index.html` se il sito deve essere indicizzato.

La versione sorgente è stata verificata in browser su desktop e viewport da 390 e 320 px. Il pacchetto Vercel ha una build statica dedicata; non include dipendenze installate, build generate, credenziali, metadati Sites o tavole di confronto. Nessun deploy Vercel è stato eseguito durante la preparazione dello ZIP.

## Documentazione di riferimento

- https://vercel.com/docs/frameworks/frontend/vite
- https://vercel.com/docs/project-configuration/vercel-json
- https://vercel.com/docs/functions/runtimes/node-js/node-js-versions
