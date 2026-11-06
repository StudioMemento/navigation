# Verifica R4 — 6 novembre 2026

## Esito

Integrazione eseguita sulla NAV verticale R3. Le cinque scene e i link originali sono conservati; navbar, blur e logo provengono dal kit V12 allegato. Non è stato aggiornato il progetto Vercel esistente.

## Controlli automatici

- Sei configurazioni di viewport per proporzioni, angoli prospettici, proiezione e inversa.
- Navigazione ciclica, sezione più vicina, snap e cancel del drag.
- Mesh a densità variabile, area coperta pari a 1, triangoli non degeneri, edge unici e vicinato simmetrico.
- Campi confinati in [0,1], distribuzione non circolare, visibilità continua, loading monotono e spaziale.
- Stesse maschere per 61 posizioni attraversate in avanti e al contrario.
- Propagazione touch lungo un grafo, emissione diretta verso l’esterno, pool limitato e particelle completamente scadute.
- Sintassi dei moduli, cinque destinazioni, asset locali e font; una sola istanza mountNav, rimozione del vecchio logo/dock, fallback e cleanup.
- Controlli negativi inclusi per angoli invertiti, asset mancanti, campo uniforme, falsa propagazione radiale e reveal non spaziale.

## Verifica visiva e interattiva

Browser: Chrome della sessione cloud. Layout verificati direttamente a 1363 × 937 e tramite iframe responsive a 390 × 844 e 320 × 568 CSS px, DPR del browser cloud. Questi ultimi sono viewport simulati, non telefoni fisici.

- Desktop: cinque immagini decodificate, una navbar; logo e icone allineati. Card centrale nitida, tagli alto-sinistra e basso-destra, prospettiva preservata.
- Loading fermato al 50%: celle del contenuto realmente assenti; immagine e lettere ricostruite dal basso-sinistra. Maschera rimossa nello stato completo.
- Mobile: scrollWidth corrisponde a 390/320 px; nessun overflow orizzontale. Logo largo 320 px a viewport 390; 280 px con margini di 20 px a viewport 320.
- Prossimità: il bordo sinistro vicino al puntatore risponde, il perimetro lontano rimane neutro, immagini e testo restano leggibili.
- Tastiera: freccia giù porta Studio a Services; stato aria-current della navbar aggiornato alla medesima sezione.
- Touch sintetico sul documento reale: down attiva il campo, up produce un impulso, cancel rimuove il contatto senza produrre un impulso aggiuntivo. Esito harness: TOUCH_CANCEL_PASS.
- Drag verticale nativo con mouse: Services → Projects, senza apertura accidentale della pagina.
- Movimento ridotto verificato attraverso il percorso di debug che usa il medesimo flag del media query: navigazione attiva, maschera centrale none, particelle e impulsi a zero.
- Errori applicativi non osservati. La console contiene un messaggio proveniente dall’estensione del browser cloud, esterno alla NAV.

## Prestazioni e limiti

I campioni del callback RAF dopo il caching a riposo sono circa 1.75–3.2 ms nei viewport mobile simulati; durante un passaggio è stato osservato un campione medio di 5.3 ms. Sono misure CPU del callback e non includono il costo GPU/compositing del blur. Il browser cloud ha consegnato circa 1 RAF/s durante parte della prova; questo ambiente non consente di certificare la fluidità a 60 fps.

Non sono stati verificati Safari, Firefox, GPU o telefoni fisici. Non è stata prodotta una registrazione video. Verificare maschere SVG, blur nativo e pinch zoom sui dispositivi finali prima della pubblicazione definitiva. Il progetto usa Canvas2D e non il renderer WebGL proposto come percorso consigliato dal brief; gli asset HTML rimangono originali e accessibili.

L’integrazione riguarda la NAV: non aggiunge VFX nei documenti esterni delle pagine Services, Projects, LevelUp o Start. Se Framer contiene già un secondo logo/navbar/blur, rimuoverlo dal contenitore per evitare la duplicazione: un iframe non può modificare il DOM del documento padre di un’altra origine.
