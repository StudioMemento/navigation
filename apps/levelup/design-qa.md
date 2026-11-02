# LevelUp V11 — verifica grafica e funzionale

Revisione del 2 novembre 2026, sulla base V10 e sul Master Visual DNA V40. Riferimento: richiesta ef2a5b4a-8c5d-44ee-90ed-abfcc0733668 e cinque schermate allegate. Nessun deploy eseguito.

## Risultato visivo

Sei illustrazioni astratte originali: interfacce per Web Design, volume e reticolo per 3D Design, fotogrammi per Video, prisma e luce per Visual, forma progettata per Design, elementi coordinati per Branding. Palette nero/grafite/ambra, spazio negativo per copy HTML. WebP 1536 e 640 px, senza testo incorporato. Tutti i titoli iniziano con “Avere”.

A 1363×844 px la tavola introduttiva misura 1183×438 px (2,7:1). Titolo in alto a sinistra su una riga, copy in basso a sinistra. Il titolo di sezione resta immediatamente sopra la tavola. Struttura a ventaglio e input del master Services conservati.

Portfolio da x=90 a x=1273 sullo stesso viewport. Card 270,08×151,91 px (16:9); anteprime laterali estese fino ai fade. Eliminato il movimento che apriva un vuoto centrale. Test automatici delle proiezioni su larghezze da 320 a 2200 px, sei altezze e posizioni intermedie. Nel browser, campionati ProductVis→IceCream e il passaggio circolare VisualRef→Fashion: gap interno e margine scoperto entrambi 0 px nei campioni acquisiti. Il browser di collaudo ha frequenza di aggiornamento limitata: la verifica non certifica un frame rate su dispositivi reali.

Ogni Vision è una coppia di box indipendenti. A 1363 px: testo 638,94×496,86 px, foto 522,78×496,86 px, gap 21,28 px. A 390 px: testo 320×210 px, foto 320×304 px, gap verticale 12 px. Le immagini prima/dopo restano registrate e senza deformazioni. I tre range da tastiera hanno prodotto 51%, 0%, 100%; trascinamento reale del primo al 90%, senza modificare gli altri. Chevron senza box, su hover/focus/interazione.

Step con i tre titoli esatti richiesti in alto a sinistra e copy in basso a sinistra. STEP 1 / STEP 2 / STEP 3 in alto a destra, font 300, opacità 0,25. Nessuna collisione fra titolo, indicatore e copy nei viewport controllati.

## Responsive e trasparenza

Misurati in browser 320×740, 390×844, 768×1024, 1024×768, 1363×844, 1920×1080 e 844×390. Nessun overflow orizzontale della pagina o dei titoli; nessuna collisione di titolo/copy nelle sei tavole o nei tre step. Titoli delle sei tavole su una riga da 1024 px. Wrapper del portfolio e delle coppie Vision allineati al padding comune.

La sezione esperienze conserva il minimo intenzionale di 680 px sui viewport bassi. Su mobile Vision passa a una colonna. HTML, body e cinque sezioni risultano rgba(0,0,0,0) in modalità embedded; le card mantengono il proprio fondo. Bridge Tide v014 conservato byte per byte.

## Player e interazioni

La V11 non modifica il modulo del player né la sua espansione. Verifica di integrazione su Food: contatori 5 iframe creati / 5 load prima, durante e dopo l’espansione (includono le selezioni precedenti). Nessuna creazione o load aggiuntivi durante apertura/chiusura; English resta selezionato. Escape chiude il dialog e restituisce il focus a “Espandi Memento Food”.

I test automatici coprono deduplicazione, callback obsoleti, timeout seguito da load tardivo e retry esplicito. I controlli categoria/nome/fullscreen rimangono nella slide attiva. I link pubblici e il contesto verso Start sono mantenuti. Start deve consumare i parametri `experience` e `idea` per un’eventuale precompilazione: la landing da sola non la garantisce.

## Build e confezionamento

Sette test automatici, verifica delle risorse locali e controllo negativo su un asset mancante. Pacchetto con sorgenti, build statica, asset WebP, font locale, licenza icona, configurazione Vercel, documentazione e prompt. Nessuna dipendenza npm o variabile d’ambiente necessaria. Estratto lo ZIP in una cartella pulita, ricostruito e confrontato il manifest SHA-256 di ogni file runtime.

Eseguito `npm run check:links`: le dieci demo e Start rispondono HTML 200; nessun header di blocco frame rilevato sulle demo. Questo controllo distingue risposte HTML e header di blocco dell’embed; non certifica le interazioni interne di ogni applicazione.

## Limiti della verifica

Il browser cloud non dispone di WebGL: ProductVis usa il proprio fallback statico dichiarato. Espansione verificata tramite dialog; fullscreen nativo, GPU reali, Safari iOS e browser Instagram su telefoni fisici restano da provare su quei dispositivi. Le immagini di confronto sono render illustrativi, non prove CAD o risultati commerciali documentati.
