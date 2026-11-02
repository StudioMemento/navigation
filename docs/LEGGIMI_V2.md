# Memento — Hub con pagine live · V2

Ripresa del 2 novembre 2026, dalla cartella di lavoro `memento_live_v2` rimasta nella sessione precedente. Questa consegna conserva le modifiche successive allo ZIP `MEMENTONAV_CARBONE_AMBRA_V1_VERCEL.zip`.

## Cosa contiene

- Hub indipendente da Framer, con le cinque stazioni e i loro contenuti originali caricati in iframe.
- Navbar condivisa con cinque icone SVG angolari, stato attivo, focus da tastiera e accento ambra. Le icone SVG sono l'adattamento UI; il mondo conserva i GLB esistenti.
- Kit da aggiungere alle cinque applicazioni: navbar standalone e comunicazione con l'hub.
- Prompt per Codex dedicato alla rifinitura degli asset e del mondo 3D.
- Test automatici, controlli di integrità e stato delle verifiche ancora da completare.

## Le cinque fonti

| Stazione | Route nell'hub | Contenuto originale |
|---|---|---|
| Memento | `/studio/` | https://mementostudio.vercel.app/ |
| Services | `/services/` | https://mementoservizi.vercel.app/ |
| Projects | `/projects/` | https://mementoportfolio.vercel.app/ |
| LevelUp | `/levelup/` | https://mementolevelup.vercel.app/ |
| Start | `/start/` | https://mementostart.vercel.app/ |

`/#services` seleziona la stazione nel mondo. `/services/` apre direttamente la pagina. Lo stesso vale per le altre stazioni. L'ingresso Memento è abilitato e carica Studio.

L'hub mantiene una sola pagina remota alla volta. Il mondo viene caricato quando serve e sospende il rendering quando si legge una pagina. Aprire direttamente una route non richiede di caricare prima il mondo 3D. I contenuti delle pagine non sono copiati nel pacchetto: il loro aggiornamento compare al successivo caricamento dall'originale.

## Stato della consegna

Verificati in questa ripresa: build statica, 13 test di navigazione/bridge/movimento, cinque origini remote, assenza delle copie locali, integrità di `world.glb` e `scene.json` rispetto alla base recuperata, sintassi dei moduli e struttura degli ZIP.

Non verificati in questa ripresa: resa visiva del nuovo hub in Chrome, mobile fisico, WebGL/GPU e prestazioni; comportamento completo delle CTA e dei gesti sulle cinque pagine pubblicate dopo l'installazione del kit.

**La V2 non è stata pubblicata.** La creazione dell'anteprima Vercel è stata bloccata dal controllo automatico dell'autorizzazione prima del caricamento. Non è stata eseguita una migrazione del dominio né una modifica al sito Framer.

## Uso del prototipo

Nel mondo, una voce della navbar seleziona la stazione; premendo di nuovo quella attiva si entra nel contenuto. I controlli laterali cambiano stazione; quello inferiore apre la pagina. Sono presenti equivalenti da tastiera, trascinamento orizzontale e gesto verticale di ingresso.

Durante la lettura, la navbar cambia pagina. Premendo la voce attiva oppure «Esplora» si torna allo stage. «Apri pagina» apre l'originale in una nuova scheda. Il ritorno dell'hub funziona anche prima di installare il kit negli embed.

Il kit è necessario per coordinare CTA interne, ritorni e gesti dal fondo pagina. Senza kit, i vecchi link della pagina possono ancora aprire un'altra pagina fuori dall'hub. Non considerare l'integrazione completa dopo il solo cambio dell'URL dell'iframe.

## Preparazione Vercel

Nello ZIP principale, la cartella da usare come progetto è `hub/`: contiene `package.json` e `vercel.json`. Non usare come root la cartella superiore della consegna.

Impostazioni: Framework **Other**, Node **24**, installazione `npm install --ignore-scripts`, build `npm run build`, output `dist`. La build copia solo `hub/public/`; non incorpora i contenuti delle cinque applicazioni.

Per una verifica locale con Node 22 o successivo:

```sh
cd hub
npm run build
npm run dev
```

Il server di sviluppo serve `http://localhost:4173`. Le pagine remote possono rifiutare il bridge da localhost: validare l'integrazione completa su una preview Vercel autorizzata, senza allargare indiscriminatamente le origini ammesse.

Il pacchetto conserva `noindex,nofollow` perché è un prototipo. Prima del passaggio al dominio pubblico verificare metadati, indicizzazione, route, contatti e contenuti definitivi. Il trasferimento del dominio e le modifiche DNS sono una fase separata.

## Sequenza per chiudere il lavoro

1. Creare una preview Vercel di questa versione e verificarne l'accesso.
2. Provare mondo, navbar e ingresso/uscita su desktop, mobile e ultrawide.
3. Integrare il kit in una preview di Services e verificare bundle, dettaglio, chiusura, CTA Start e ritorno alla stessa stazione.
4. Ripetere l'integrazione su Projects, LevelUp, Start e Studio; controllare anche modali, demo e form.
5. Verificare Back/Forward, reload, query di contesto, guasti di rete e assenza di doppie navbar.
6. Solo dopo la verifica del flusso completo, coordinare pubblicazione e rimozione degli overlay Framer.

Il prompt Codex è separato perché l'allineamento dei modelli al concept non deve ricreare o duplicare i contenuti web.
