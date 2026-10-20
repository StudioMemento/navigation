# Memento — Noir · V06

Questa è la versione 6 ripristinata: diorami cubici, fondale 2.5D sfumato,
shader PBR ambrato, particelle e navigazione a swipe. Tutte le sezioni riusano
il modello originale TEST 01. Le voci mantengono la selezione e l’ispezione
presenti nella demo; non sono state aggiunte pagine di destinazione.

## Pubblicazione su Vercel

1. Estrai lo ZIP e apri la cartella `Memento_Noir_V06_Vercel`.
2. Carica il contenuto in un tuo repository Git e importalo in Vercel.
3. Imposta come Root Directory la cartella che contiene `package.json`.
   `vercel.json` configura già Vite, `npm ci`, `npm run build` e output `dist`.
4. Pubblica. Non servono variabili d’ambiente, database o chiavi API.

In alternativa, dalla cartella del progetto con la CLI Vercel installata:

```sh
vercel
```

Per pubblicare successivamente in produzione:

```sh
vercel --prod
```

Riferimento ufficiale: https://vercel.com/docs/frameworks/frontend/vite

## Verifica locale

```sh
npm ci
npm run build
npm run preview
```

Apri l’indirizzo mostrato dal comando `preview`. Usa un server locale:
l’apertura diretta di `index.html` come file non carica correttamente il 3D.
Su Vercel il sito usa HTTPS. Node 22 o 24 è adatto a questo progetto.

## Contenuto

- `src/`: codice originale della versione 6, invariato.
- `public/`: GLB ottimizzati desktop/mobile, texture, font e immagini fallback.
- `dist/`: build statica già generata e verificata; Vercel la rigenera dai sorgenti.
- `vercel.json`: configurazione del deploy.
- `VERSIONE.txt`: versione e commit di origine.

WebGPU con fallback WebGL2 e anteprima statica quando il 3D non è disponibile.
Le ottimizzazioni mobile, la pausa e il movimento ridotto restano quelli della
versione ripristinata. Il pacchetto non certifica 60 fps su tutti i dispositivi.

## Controlli eseguiti

Installazione pulita delle dipendenze e build di produzione completate.
Sorgenti e asset applicativi verificati identici alla versione 6.
Modelli, texture e immagini presenti nella build e nello ZIP.
Questa consegna non pubblica automaticamente un progetto su Vercel.
