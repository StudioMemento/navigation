# Memento Level Up — V03 / Vercel

Pacchetto dell’ultima versione pubblicata: slideshow di nove esperienze, card 3D, player embedded adattivo e contatto sempre accessibile.

## Deploy

1. Estrai lo ZIP in una cartella.
2. Importa il contenuto in un repository Git e collegalo a Vercel, selezionando come Root Directory la cartella che contiene `vercel.json`.
3. La configurazione inclusa usa Framework Preset **Other**, nessun comando di installazione o build, Output Directory **dist**.

In alternativa, con Node.js disponibile, apri il terminale nella cartella estratta ed esegui:

```sh
npx vercel --prod
```

Segui le richieste della CLI per accedere e scegliere il progetto.

## Contenuto

- `dist/`: HTML, CSS, JavaScript, immagini e font locali, pronti da servire.
- `vercel.json`: configurazione di pubblicazione.
- `PROGETTO.md`: struttura, demo collegate e note sul funzionamento.

Non servono variabili d’ambiente, database o dipendenze del progetto. Le demo sono incorporate dai rispettivi URL esterni. Il modulo contatto prepara un’email nell’app di posta del visitatore.

## Modifiche

- Copertine, titoli e URL delle demo: `dist/experiences.js`.
- Copy della pagina e modulo: `dist/index.html`.
- Layout e stile: `dist/style.css`.
- Slideshow, player e interazioni: `dist/app.js`.

Sorgente esportata: commit `b29db291c6f98cb3ea19373e470f77c47686493e`.

Configurazione verificata sulla [documentazione ufficiale Vercel](https://vercel.com/docs/project-configuration/vercel-json). Questo pacchetto è pronto per il deploy; non è stato eseguito un deploy Vercel in questa consegna.
