# R24: i fix dell'audit R23

Parte dall'audit del 25 novembre 2026 (R23, `6aeb301`). Ogni punto qui sotto rimanda al numero dell'audit.

## Cosa cambia

### 1. La pagina compare una volta sola

- Dopo un cambio pagina il motore effetti (WebGL) subentra sul posto: stessa immagine, niente sequenza di caricamento, niente DOM nascosto e poi ricomposto. È la direzione **a** dell'audit.
- Il motore parte quando le celle hanno finito di aprire la pagina, nel primo momento libero. Prima partiva subito sotto la copertura, mentre la pagina nuova faceva il suo avvio e la transizione apriva: tutto sullo stesso thread nello stesso istante.
- La pagina ricorda di essere arrivata con la transizione (`data-mm-arrived`). Motore delle pagine (`engine.ts`) e carosello della Home (`renderer.js`) lo leggono per saltare la sequenza di caricamento.
- La transizione non aspetta più gli effetti (via `effectsOf`).

### 2. Il nome resta fermo solo il necessario

- La pagina nuova è "pronta da mostrare" quando il suo primo elemento è letto e decodificato. Prima si aspettava `DOMContentLoaded`, che aspetta anche i moduli della pagina: su un telefono arrivava a 2,4–3,1 s dal tocco.
- `patience` (380 ms) si conta dal primo fotogramma della pagina nuova, non dal nome composto. `hold` resta 140 ms.

### 3. Il tocco risponde subito su mobile

- **Nomi pronti in anticipo.** Sugli schermi senza hover, dopo il caricamento, i nomi di tutte le pagine della navbar si compongono nei momenti liberi, uno alla volta. Non succede sui telefoni con meno di 3 GB di memoria. Il tocco fa solo partire il movimento.
- **Nome in uscita composto subito.** Senza aspettare un fotogramma (erano circa 160 ms subito dopo il tocco). Solo la pagina in arrivo aspetta il suo primo fotogramma.
- **Un nome preparato non fa parte della pagina** finché un movimento non lo usa. Se nel frattempo cambiano le dimensioni dello schermo, si ricompone.
- **La pagina esce a blocchi:** al massimo 36 contenitori (fino a un quinto dello schermo ciascuno) invece di 140 elementi, ognuno con il suo livello.

### 4. Niente scatti all'apertura e al cambio documento

- **Pagina nuova già disegnata.** Composto il nome, la pagina nuova viene disegnata sotto il velo della colonna invece di restare a opacità 0. All'apertura è già rasterizzata. Fino al nome i suoi primi fotogrammi restano leggeri, così il nome si compone prima.
- **Letture di layout nella pausa.** Si leggono mentre il nome è fermo: le parti fuori dalla colonna (`assemble`) e la scena di apertura (`sceneOf`, dopo il primo fotogramma). Le animazioni restano in pausa e partono con le celle.
- **Prima l'apertura, poi il resto.** Gli effetti e il lavoro della pagina partono un fotogramma dopo l'apertura.
- **Prima visione in ritardo.** Se arriva ad apertura già iniziata, non nasconde più le celle in corso e non blocca a zero le parti fuori dalla colonna.
- **Script esterni con cache.** Il cambio pagina (55 KB, insieme alla guardia di input) e lo sfondo di lettere (23 KB) sono file a sé in `/assets/compiled/`, nominati dal contenuto e in cache per sempre (`immutable`). Prima erano scritti in linea in ogni pagina e ricompilati a ogni cambio pagina, perché il browser tiene il codice compilato solo per gli script scaricati. Restano script classici al loro posto: nella head prima del primo fotogramma, e subito dopo il loro strato. Li scrive la build (`vite.config.js`) e li serve il dev server. Solo il primo caricamento in assoluto fa una richiesta in più.

### 5. Scroll di Servizi

- **Superfici preparate in anticipo.** Nei momenti liberi il motore prepara le superfici entro 2,25 schermi (`RESIDENCY.ahead`), dalla più vicina. Lo scroll le trova pronte e sul fotogramma prepara solo ciò che uno scroll veloce ha superato.
- **Texture caricate subito.** Una foto va sulla GPU quando arriva (`initTexture`), non al primo fotogramma che la disegna.
- **Campi di distanza in un worker** (`sdf.worker.ts`, `OffscreenCanvas`, `ImageBitmap`). Sono le funzioni `le`/`ae`/`ie` e il `getImageData` del profilo. Dove i worker non ci sono, il calcolo resta sul thread come prima.
- **Niente fotogrammi inutili.** Una superficie preparata fuori dallo schermo non chiede un fotogramma.

### 6. L'uscita del motore resta nella colonna

- **Fuori dalla colonna** le celle si spengono sul posto: niente più polvere sui margini, sullo sfondo e sul logotipo.
- **Dentro la colonna** volano due celle su cinque, che si rimpiccioliscono poco: hanno più la scala dei frammenti della transizione. Le altre si spengono sul posto.
- La colonna arriva al motore con l'evento di uscita (`uExitCol` negli shader di entrambi i motori).

### 7. Bug delle richieste 404

`data-vfx-photo` è un selettore e ora viene usato come tale. Sparisce il 404 a `/services/.bundle-visual` e a `/projects/.tile-visual img`. Si leggono solo le foto già caricate: una foto lazy non viene scaricata per questo.

### 8. Peso delle pagine

- **Maschere di Servizi.** Le due maschere PNG (`tile-bottom`, `frame-bottom`) passano da 898 KB e 750 KB a circa 230 byte ciascuna. Sono la stessa sfumatura in 8 × 512 px, stirata dal CSS. L'originale variava solo in verticale, a parte il dithering.
- **Foto sui telefoni a 3×.** LevelUp (hero, step, confronti) e Portfolio (tile, flow, stage, poster) ricevono le foto a circa 2×: lo slot è dichiarato a due terzi della larghezza.
- Mobile, cache vuota, senza effetti, server locale senza compressione:

  | Pagina | R23 | R24 |
  | --- | --- | --- |
  | Servizi | 3,76 MB | 1,95 MB |
  | Portfolio | 3,85 MB | 1,76 MB |
  | LevelUp | 5,27 MB | 2,84 MB |

### 10. Costo a riposo

- **Sfondo di lettere più lento sui touch:** 18 fotogrammi al secondo invece di 30.
- **Sfondo fermo durante lo scroll.** Riparte 180 ms dopo che lo scroll si ferma. Durante il cambio pagina non si ferma mai.
- **Scheda nascosta:** era già gestita.

### 11. Altro

- **Limite di 60 fps.** Il motore non disegna più a 240 fps sugli schermi veloci. Ogni risveglio dentro un fotogramma (hover, texture arrivata) azzerava l'orologio e il fotogramma dopo saltava il limite.
- **Favicon.** Tutte le pagine dichiarano l'icona del sito: sparisce il 404 a `favicon.ico` su Studio. Servizi e Portfolio dichiaravano un'icona vuota.
- **Arrivo senza click.** Un indirizzo scritto nella barra dopo un'altra pagina del sito apre la pagina direttamente. La sequenza di arrivo resta per i cambi pagina del sito e per avanti/indietro.
- **Barra di scroll.** La prima misura usa il layout del browser invece di forzarlo durante l'avvio (85 ms su mobile).

## Verifica

- **Test.** `npm test` passa con 98 test, compresi i nuovi `tests/r24.test.mjs`. `npm run test:apps` passa su tutte le pagine. `npm run build` va a buon fine.
- **Sandbox** (Chrome headless, WebGL software, 2 CPU), stesse transizioni su R23 e R24:
  - **Doppia comparsa.** Su desktop R23 mostra la sequenza di caricamento del motore dopo ogni arrivo, e la colonna va al buio: luminosità da 19 a 8, da 33 a 8, da 15 a 8. R24 non la esegue mai e la colonna resta accesa: 19 → 19, 33 → 31, 15 → 15.
  - **Apertura dal primo fotogramma, desktop:** in media 414 ms contro 534.
  - **Uscita su ultrawide.** A metà uscita R23 ha due nuvole di polvere arancione sui margini, R24 nessuna.
  - **Servizi a riposo.** R24 ha già preparato le 14 superfici tra 1,25 e 2,25 schermi; R23 nessuna.
  - **Errori.** Nessun 404 e nessun errore in console sulle sei pagine, desktop e mobile.
  - **Andata e ritorno.** Dalla Home a Servizi e indietro: il carosello torna intatto.
- **Limiti della sandbox.** Sul profilo mobile (CPU ×4) il thread principale è saturo per tutto il tempo dal primo fotogramma all'apertura, in R23 come in R24. Lì il nome fermo non si misura in modo affidabile e i tempi di scroll sono dominati dal WebGL software. Le misure vere vanno rifatte sul PC con lo script dell'audit (`%TEMP%\memento-audit`) contro il sito pubblicato.

## Il prossimo passo per il mobile

Quello che resta del nome fermo sul telefono è il lavoro nativo delle pagine grandi: parsing, stile e layout di 3.000–6.400 nodi. La leva più forte è `content-visibility: auto` sulle sezioni sotto la piega di LevelUp, Start e Portfolio. Va però provata insieme al motore, che misura anche le superfici fuori dallo schermo.
