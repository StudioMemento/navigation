# Memento — Carbone / Ambra · Preview web V1

Preview locale derivata dal Blender **EVOLUZIONE V2**, separata dal sito pubblicato.

## Avvio

Con Node.js installato, aprire questa cartella ed eseguire `node scripts/server.mjs`, oppure aprire **AVVIA_PREVIEW.cmd**. Visitare **http://127.0.0.1:8782/**. Non serve installare dipendenze per vedere la consegna: librerie, decoder, mondo e pagine sono già in `public/`.

Il server ascolta soltanto sul computer locale e serve soltanto `public/`. Non richiede credenziali, non pubblica né modifica il sito live. Per fermare un server avviato dal collegamento, chiudere il relativo terminale.

## Navigazione

- Frecce laterali, nomi delle stazioni, clic sulle torri e trascinamento orizzontale: navigazione tra le cinque stazioni.
- Freccia in basso: ingresso nella sezione. Logo superiore: Memento.
- **Torna alle torri**: percorso inverso fino alla stessa camera.
- Tastiera: frecce sinistra/destra; Tab e Invio sui controlli; Esc per annullare una transizione o uscire dalla pagina quando non è aperto un dialogo.
- Il controllo pausa ferma il movimento dell'ambiente. La preferenza di sistema per movimento ridotto elimina i viaggi della camera.

Le pagine Services, Projects, LevelUp e Start sono copie locali integrate. Le demo online del portfolio/LevelUp, la mappa Google e i collegamenti esterni richiedono Internet; si aprono solo su azione dell'utente. Email e telefono conservano le azioni originali. Non è stato inviato alcun messaggio durante i test.

## Contenuto

- `public/assets/world.glb`: geometria derivata, con nomi e gerarchie conservati.
- `public/assets/scene.json`: camere desktop/mobile/ultrawide, orbita, discese, animazioni e metadati estratti dalla V2.
- `public/catalog/`, `public/pages/`: quattro pagine e risorse locali.
- `public/src/`: navigazione, atmosfera, adattatori e misure.
- `scripts/`: estrazione Blender, confronto della geometria, preparazione e server.
- `reports/`: risultati, misure, schermate e differenze visive ancora aperte.
- `source/pages/`: snapshot originali prima degli adattamenti, con provenienza nei rapporti.

Aprire `/?qa=1` per il pannello di verifica. Le misure riguardano il computer/browser che esegue la preview. Il formato mobile non simula la potenza di un telefono.

Per modificare il codice e ripetere i test: `npm ci --ignore-scripts`, poi `npm test`. L'estrazione Blender è un'operazione separata, legge la V2 senza salvarla. Il file nativo resta nel progetto V2 originale; il suo hash è registrato nei rapporti.

Documentazione tecnica usata: [GLTFLoader](https://threejs.org/docs/pages/GLTFLoader.html), [PerspectiveCamera](https://threejs.org/docs/pages/PerspectiveCamera.html), [PerformanceResourceTiming](https://developer.mozilla.org/en-US/docs/Web/API/PerformanceResourceTiming).
