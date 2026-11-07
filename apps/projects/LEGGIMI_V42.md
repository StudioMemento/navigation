# Memento Portfolio — V42 Struttura

Aggiornamento della V41 con navbar overlay, 7 novembre 2026.

## Modifiche

- Catalogo in bianco e nero. Colore durante hover, focus tastiera e pressione touch.
- Rimossi il ritorno testuale «Tutti i progetti» nel dettaglio e le etichette finali «Continua a esplorare» / «Tutti i progetti».
- Rimossi i dots dai selettori e da Process.
- Scroll cue sottile: grigio a riposo, `#FF7950` durante lo scroll, hover o utilizzo dei controlli. Il controllo avanti si ferma a fine pagina; non ricomincia automaticamente dall’alto.
- Lo stesso selettore apre e chiude il progetto: card centrale, due coppie secondarie entro il padding, coppia esterna in fade. Sette card quando il filtro contiene almeno sette progetti; con meno risultati mostra soltanto quelli disponibili.
- La seconda coppia di card si allinea esattamente ai bordi del contenuto. Le due card esterne sono visibili oltre il padding e sfumano verso i bordi della viewport.
- Titoli misurati sul font Inter realmente caricato, senza deformazioni. Dimensione adattiva, due righe bilanciate per titoli lunghi, supporto a ritorni a capo espliciti e suddivisione dei nomi molto lunghi senza spazi. Altezza del blocco libera; nessun ritaglio.
- Gallery con cinque slot neutri senza testi, numeri o didascalie segnaposto visibili. Thumbnail attiva sempre centrata, navigazione circolare, bordo `#FF7950` attivo e bianco sottile inattivo. Target mobile di almeno 44 px in altezza.
- Vision più bassa: rapporto 2,85:1 su desktop, 2,2:1 su tablet e 1,25:1 su mobile con altezza minima per il testo.
- Process con tavola centrale e anteprime laterali prospettiche, attenuate e selezionabili, nello stile del riferimento Servizi. Navigazione circolare anche da tastiera e trascinamento.

## Contenuti

È un aggiornamento della struttura. Gli slot della gallery restano neutri e senza scritte; Experience, Vision e Process conservano i contenuti di impaginazione della V41. I 27 record, tutte le immagini e il kit navbar originale sono inclusi e invariati. Non vengono introdotti copy o casi studio inventati.

## Interazioni

- Click sulla card laterale: seleziona il progetto. Click sulla card centrale: va alla gallery.
- Trascinamento orizzontale o swipe: naviga i progetti, la gallery, le thumbnail e Process.
- Scroll verticale: scorre il dettaglio senza loop automatico.
- Frecce sinistra/destra: navigano il carosello con focus. Home/End: primo/ultimo elemento del carosello.
- Escape o pulsante indietro del browser: ritorna al catalogo.
- Lo slider in fondo seleziona il nuovo progetto e ne apre l’inizio.
- Le preferenze di movimento ridotto disattivano transizioni e scroll animato.

## Vercel

Estrai lo ZIP. La Root Directory è la cartella con `package.json` e `vercel.json`.

| Impostazione | Valore |
| --- | --- |
| Framework Preset | Other |
| Build Command | `node release/build.mjs` |
| Install Command | `node --version` |
| Output Directory | `dist` |

La build copia `site/` in `dist/`. Non servono dipendenze npm, variabili ambiente o download. `npm run verify` controlla la struttura; `npm run build` genera i file distribuibili. `node release/verify-package.mjs` verifica i riferimenti agli asset dopo la build.

## Verifica

- Controlli strutturali per tutti i 27 progetti e tutti gli stati di gallery e Process.
- Chromium: desktop 1363 × 936; viewport in iframe a 320 × 844, 390 × 844, 768 × 1024 e 1024 × 1024. Nessun overflow orizzontale nelle misure controllate.
- Otto casi tipografici a 320, 390, 768, 1024 e desktop: nomi brevi, titoli lunghi, ritorno a capo esplicito, accenti e nome senza spazi. Nessuna riga oltre il contenitore.
- Verificati hover monocromatico/colore, sette card, allineamento delle secondarie, stato attivo delle thumbnail e ritorno grigio del cue.
- Verificati il passaggio ultima/prima slide della gallery con tastiera e drag, il loop progetti Graphite → Auren, il click sulla laterale di Process e la selezione dal carosello finale.
- Nessun errore della pagina rilevato nei log della verifica. Nessun test su dispositivi fisici o Safari.

Lo ZIP non pubblica automaticamente la pagina: è pronto per il caricamento sul progetto Vercel esistente.
