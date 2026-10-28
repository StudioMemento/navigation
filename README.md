# MEMENTO TIDE — v010

Demo di navigazione 3D pronta per Vercel. Questa revisione lavora su avvio, selezione, interazioni, passaggio alle pagine e fog. I modelli e il mondo vengono dal pacchetto v009; la direzione visiva finale è ancora da sviluppare.

## Cosa cambia

- Avvio direttamente sulla scultura Memento, con camera bassa e inquadratura focus responsive. Nessun volo iniziale dall'overview alta.
- Cinque tappe: Memento → Services → Projects → Levelup → Start → Memento. La sesta tappa Studio viene nascosta perché Memento apre già quella pagina.
- Drag orizzontale continuo sulla scena e sul selettore; swipe con Pointer Events, inerzia limitata e aggancio alla sezione. Un drag non attiva accidentalmente un click.
- Frecce laterali, selettore inferiore, rotella/trackpad e tastiera. I click rapidi possono aggiornare la destinazione durante il movimento.
- Click sulla scultura selezionata o su “Esplora”: inclinazione progressiva della camera verso l'acqua e scorrimento verticale della pagina dal basso. Nessun overlay opaco, opacity tween o fade tra scena e pagina.
- Ritorno al lago con percorso inverso e ripristino della stessa sezione. Supporto a cronologia, deep link e movimento ridotto.
- Fog di distanza e banchi di foschia nello spazio 3D. Nessuna immagine generata e nessuna sostituzione dei modelli.
- Rendering della scena sospeso quando l'embed copre il viewport.

## Pagine collegate

| Scultura | Destinazione iframe e link diretto |
| --- | --- |
| Memento | https://mementostudio.vercel.app/ |
| Services | https://mementoservizi.vercel.app/ |
| Projects | https://mementoportfolio.vercel.app/ |
| Levelup | https://mementolevelup.vercel.app/ |
| Start | https://mementostart.vercel.app/ |

Le pagine restano esterne: nessun contenuto del catalogo, asset delle pagine o HTML remoto viene copiato nel progetto. Il solo font Inter è locale. Un solo iframe viene mantenuto, con scroll nativo della pagina originale. “Apri pagina ↗” resta disponibile nella barra dell'embed.

Configurazione centralizzata: `public/data/navigation.json`. Aggiornare anche `vercel.json` quando cambia una destinazione.

## Utilizzo

- Trascina a sinistra: sezione successiva. A destra: precedente. Funziona anche sul selettore inferiore.
- Scroll: cambia sezione; dopo Start riparte da Memento.
- Click su un nome/icona nel selettore: seleziona quella sezione.
- Click sulla scultura selezionata o “Esplora”: apre la pagina collegata nell'embed.
- Tastiera: ←/→ cambia; ↓ apre; Invio/Spazio sulla scena apre; Home/End va alla prima/ultima sezione.
- “Torna al lago”: chiude l'embed. Escape funziona mentre il focus è nella pagina contenitore; gli eventi tastiera dentro iframe esterni non attraversano l'origine.
- `/#services` seleziona Services; `/#services-content` apre direttamente la sua pagina. Stesso schema per le altre tappe.
- `/services`, `/projects`, `/levelup`, `/start`, `/memento`, `/studio`: redirect diretti alle destinazioni esterne.

## Vercel

Estrarre lo ZIP e caricare/importare la cartella che contiene `package.json` e `vercel.json`.

- Framework Preset: **Other**.
- Build Command: **npm run build**.
- Output Directory: **public**.
- Install Command: configurato in `vercel.json`; non occorrono dipendenze npm.
- Node.js: **22 o successiva**.

Three.js e Meshopt sono inclusi in `public/vendor`, con licenze e hash originali. Il build valida i file, i modelli, gli import e i link; non scarica né ricostruisce le pagine esterne.

In locale:

```bash
npm test
npm run build
npm start
```

Aprire `http://127.0.0.1:8770/`. Non aprire `index.html` con `file://`: moduli, dati e modelli richiedono un server HTTP. `npm run dev -- --host 0.0.0.0 --port 4173` supporta un server di anteprima su porta esplicita.

## Verifica e limiti di questa iterazione

- Test automatici del controller reale, della continuità della camera, dei gesti, delle destinazioni, del ritorno, della cronologia e del server statico: superati. Vedi `reports/tests.txt` e `reports/build.json`.
- Tutte e cinque le destinazioni hanno risposto HTTP 200 senza `X-Frame-Options` o `Content-Security-Policy` nella verifica del 28 ottobre 2026.
- In browser è stato provato un harness UI separato con lo stesso controller e renderer simulato: drag reale, embed esterni Services e Projects, ritorno da Services. Il codice QA temporaneo non è incluso nell'output pubblico.
- Il browser di prova dichiara WebGL disabilitato (`GL_RENDERER = Disabled`): resa visiva 3D, fog su GPU, FPS e swipe su dispositivo mobile reale non sono stati verificati. Le pose di focus e gli asset sono quelli esistenti; i calcoli del nuovo movimento sono coperti dai test.
- Non è stato eseguito un deploy Vercel.

Il ritorno automatico al fondo delle pagine esterne non viene simulato con un'altezza fissa: il contenitore non può leggere lo scroll di documenti cross-origin. In questa demo il ritorno è esplicito tramite la barra. Il parent accetta già un eventuale bridge `postMessage` con `channel: 'memento:tide'`, `version: 1`, `stageId` e `sessionId` corrispondenti; `END` o `ESCAPE` avviano il ritorno. Quel bridge richiederebbe una modifica separata alle pagine remote. Il loro normale funzionamento nell'iframe non dipende dal bridge.
