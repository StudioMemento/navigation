# LevelUp V10 — verifica grafica e funzionale

Revisione del 2 novembre 2026. Riferimenti: le nove immagini e le correzioni dell’ultimo messaggio, base V09 e geometria del Master Visual DNA V40. Nessun deploy eseguito.

## Risultato visivo

- Titolo iniziale immediatamente sopra la card attiva; spazio geometrico fra i box del titolo e della card di 6,5–11,8 px nei viewport misurati. La normale metrica del font aggiunge spazio visivo rispetto ai glifi.
- Copy in alto a sinistra e titoli in basso a sinistra. La sfumatura ambra usa ora la larghezza del titolo, non quella dell’intero contenitore.
- Portfolio allineato al wrapper V40: a 1363 px, strip e player da x=90 a x=1273. Card 270,08 × 151,91 px, rapporto 16:9, stessa altezza della versione precedente. Nome/link in basso, categoria in alto, icona Lucide Maximize in alto a destra.
- Tre confronti a tutta larghezza, in verticale. A 1363 px ogni tavola misura 1183 × 591,5 px; a 390 px misura 320 × 320 px. Coppie originali registrate, senza ritaglio del soggetto. Fade laterale e verticale per fondere le immagini col fondo e mantenere leggibili i testi.
- Chevron trasparenti, senza box: invisibili a riposo, visibili su hover/focus/interazione. Da tastiera i cursori hanno prodotto 0 / 100 / 50; un trascinamento reale ha portato il primo a 76 lasciando gli altri invariati.
- STEP 1 / STEP 2 / STEP 3: opacità calcolata 0.25, font-weight 300. Nessuna sovrapposizione con il copy.

## Responsive e trasparenza

Misurati 320×740, 390×844, 768×1024, 1024×768, 1363×844, 1920×1080 e 844×390. Nessun overflow orizzontale della pagina o dei titoli. Strip esperienze e tavole Vision corrispondono alla larghezza del contenuto in tutti i casi. Copy e titolo delle tavole non si sovrappongono.

Il viewport basso mantiene il minimo intenzionale di 680 px della sezione esperienze. HTML, body e sezioni dell’embed risultano rgba(0,0,0,0), verificati anche sullo sfondo a scacchi. Le card hanno fondo proprio. Il bridge Tide v014 è intatto; un selettore di blocco esplicito impedisce al bridge di navigare durante l’espansione.

## Player e controlli

- Una sola istanza iframe alla volta; nessun caricamento sulle selezioni attraversate durante il movimento. Conferma della selezione solo a fine animazione.
- Test Memento Food: 1 iframe creato / 1 evento load prima e dopo apertura/chiusura del dialog. La scelta English resta attiva. Sequenza rapida Fashion → IceCream → Food: contatori ancora 1 / 1.
- Il fallback dialog conserva il suo nodo nella posizione originale. Nessun append/reparent del player, nessun backdrop blur o filtro su un antenato del frame. Il ritaglio statico dei due angoli appartiene al frame stesso; il bordo è una decorazione separata.
- X ed Escape chiudono il dialog; focus e posizione della pagina sono ripristinati. Il nome Memento Food apre effettivamente https://mementofood.vercel.app/ in una nuova scheda.
- Nessuna alternanza del loader o ricarica osservata durante il test stabile. Le animazioni interne delle demo non sono controllabili da questa landing.
- Test automatico del player: selezioni duplicate, callback obsoleti, caricamento tardivo dopo timeout e retry esplicito. Quattro ulteriori contratti verificano demo, contatto, asset mancanti con controllo negativo e hash del bridge.

## Build e confezionamento

Build e cinque test automatici superati. Verifica delle risorse locali, inclusi gli SVG usati dal codice. Dieci demo e Start controllati tramite gli alias pubblici: HTML 200, nessun header di blocco frame rilevato per le demo. ZIP verificato tramite estrazione, nuova build e confronto degli hash dei file dist.

I file di QA, le schermate e i file temporanei non sono inclusi nel deploy. Il pacchetto comprende sorgenti, WebP, font locale, licenza dell’icona, configurazione Vercel e build pronta.

## Limiti della verifica

Il browser di collaudo non dispone di WebGL e usa il dialog al posto del fullscreen nativo. ProductVis mostra il suo fallback dichiarato. Il fullscreen nativo, GPU reali, Safari iOS e Instagram su telefoni fisici restano da verificare su quei dispositivi. Non si dichiara eliminato un eventuale difetto interno di un’applicazione esterna. Le coppie di immagini sono render illustrativi visivamente allineati, non prove CAD o risultati commerciali.
