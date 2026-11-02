# MEMENTONAV — Carbone / Ambra · Vercel V1

Pacchetto del 2 novembre 2026, ricavato da `MEMENTO_CARBONE_AMBRA_WEB_PREVIEW_V1.zip`.

**Destinazione: progetto Vercel esistente `mementonav`, dominio `mementonav.vercel.app`.**

Lo ZIP contiene il progetto pronto da costruire su Vercel. La sua preparazione non modifica il deploy attualmente online.

## Aggiornare il progetto esistente

1. Estrarre lo ZIP. `package.json`, `package-lock.json`, `vercel.json` e `public/` si trovano direttamente alla radice.
2. Sostituire i file applicativi del progetto `mementonav` con questa consegna, mantenendo l'eventuale cartella `.git` e il collegamento Vercel del proprio repository. È una sostituzione del progetto applicativo: vecchie configurazioni, route o file `api/` non appartenenti a questa consegna non devono restare attivi accidentalmente.
3. Usare la cartella che contiene `vercel.json` come Root Directory. Se si usa una sottocartella del repository, impostarla nel progetto Vercel.
4. Eseguire il deploy nel progetto esistente, così resta associato a `mementonav.vercel.app`.

Impostazioni già dichiarate in `vercel.json`:

| Impostazione | Valore |
|---|---|
| Framework | Other (`framework: null`) |
| Install Command | `npm ci --ignore-scripts --no-audit --no-fund` |
| Build Command | `npm run build` |
| Output Directory | `dist` |
| Node.js | 24.x |
| Variabili ambiente obbligatorie | Nessuna |

Il progetto Vercel esistente risultava impostato su Vite al momento della preparazione. Il `vercel.json` incluso sovrascrive il preset per questa consegna statica: non occorre aggiungere Vite o avviare un server Node su Vercel.

Se si usa la CLI Vercel dalla cartella estratta, collegare il progetto esistente con `vercel link --project mementonav`, poi usare il normale flusso preview/produzione del proprio account. Non creare un nuovo progetto se si vuole mantenere il dominio attuale. Il pacchetto non contiene token o configurazioni di autenticazione.

## Verifica locale

```bash
npm ci --ignore-scripts
npm test
npm run build
npm start
```

Aprire `http://127.0.0.1:8782/`. In un secondo terminale, `npm run test:http` controlla gli indirizzi principali, i file 3D, il decoder e le risposte per risorse assenti. `npm run dev` serve direttamente `public/` durante le modifiche.

## Cosa contiene

- Mondo 3D Carbone / Ambra derivato dalla V2, con geometrie, gerarchie, materiali, camere e tracce di movimento della preview.
- Navigazione tra Memento, Services, Projects, LevelUp e Start tramite pulsanti, tastiera, clic sulle torri e gesto orizzontale.
- Ingresso nelle quattro pagine integrate e ritorno lungo il percorso inverso.
- Libreria Three.js 0.180.0, decoder Draco, HDR, font e media disponibili localmente.
- Diagnostica opzionale con `/?qa=1`, invisibile durante l'uso normale.
- Build che copia e verifica i file già inclusi; non esegue Blender, non raccoglie nuove pagine dal web e non dipende da directory del computer originale.

Le route `/services/`, `/projects/`, `/levelup/` e `/start/` aprono il mondo con la sezione corretta. Le pagine effettive restano sotto `/catalog/` e `/pages/` per essere incorporate dalla stessa origine. Le route dei media restano distinte: un asset mancante restituisce 404, non l'HTML della home.

## Modifiche rispetto alla preview ricevuta

- Configurazione Vercel e build autonoma in `dist/`.
- Gestione dei collegamenti diretti e degli slash finali.
- Header per tipi dei file e rivalidazione della cache, adatti a file non rinominati a ogni release.
- Titolo e descrizione della home aggiornati; diciture PREVIEW sostituite da Memento nell'interfaccia principale.
- Pacchetto privato separato dall'output pubblico: documenti, test e metadati di consegna restano fuori da `dist/`.

Geometrie, animazioni, visual delle quattro pagine e contenuti non sono stati ridisegnati in questa conversione.

## Versioni delle pagine integrate

Questa consegna conserva le copie ricevute da Codex. Non sincronizza automaticamente le pagine con gli altri deploy.

| Pagina | Provenienza dichiarata nella preview |
|---|---|
| Services | Copia locale TIDE del 26 ottobre 2026 |
| Projects | Snapshot di `mementoportfolio.vercel.app` del 1 novembre 2026 |
| LevelUp | Snapshot di `mementolevelup.vercel.app` del 1 novembre 2026 |
| Start | Snapshot di `mementostart.vercel.app` del 1 novembre 2026 |

Aggiornamenti pubblicati dopo queste copie non sono compresi automaticamente. La versione Services incorporata non viene presentata come Master Visual DNA V40. Per aggiornarla serve integrare esplicitamente la relativa consegna e verificare nuovamente il collegamento tra pagina e mondo.

Demo esterne, mappe, video e collegamenti di contatto mantengono le destinazioni della preview e possono richiedere Internet. Non è stato aggiunto un backend per ricevere messaggi.

## Ambito e limiti

- La conversione conserva le interazioni della preview. Scroll verticale continuo, look-around libero/limitato e altri effetti non già implementati restano sviluppi separati.
- Le prestazioni della precedente preview e le differenze rispetto a Cycles sono documentate in `docs/VERIFICHE_ORIGINALI.md`: sono misure storiche, non nuovi test del deploy.
- La preparazione di questo ZIP non certifica 60 fps su telefoni reali o prestazioni della CDN. Le verifiche di questa consegna sono in `docs/VERIFICHE_VERCEL.md`.
- Il dominio tecnico conserva `noindex, nofollow` dalla preview, anche per le copie delle pagine. Prima di usare il pacchetto come sito ufficiale sul dominio pubblico, rivedere indicizzazione, canonical e metadati.

Documentazione di configurazione: <https://vercel.com/docs/project-configuration/vercel-json>.
