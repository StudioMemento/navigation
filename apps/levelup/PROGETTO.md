# Memento — Level Up / V04

Landing statica senza build o dipendenze JavaScript esterne. Servire `dist/` via HTTP. Font Inter e copertine sono locali.

## Navigazione e layout

Una schermata, senza scorrimento della landing: headline allineata a sinistra con la card centrale, slideshow e CTA sempre presenti. `L'hai visto, ora provalo!` resta su una riga. `ready to start?` resta su una riga e termina con un grande chevron destro. Il logo della landing è stato rimosso per l’overlay gestito separatamente.

Nove anteprime con transizioni CSS 3D e card adiacenti in prospettiva. Nessun autoplay. Chevron, dot, swipe orizzontale, frecce destra/sinistra e Home/End selezionano l’esperienza. La card apre la demo al primo click. La selezione viene mantenuta dopo la chiusura. `prefers-reduced-motion` disattiva le transizioni. Il rapporto delle card passa da 2.12:1 su desktop a una composizione quasi quadrata su mobile; la larghezza tiene conto anche dell’altezza disponibile.

Il gradiente del testo tende all’ambra in basso a destra. Il pulsante “Esplora” è ancorato in basso a sinistra con padding simmetrico.

## Player

Il dialog trasparente copre il viewport e intercetta i click esterni. La superficie dell’embed ha `inset: 10%`: margini orizzontali pari al 10% della larghezza e verticali pari al 10% dell’altezza, frame pari all’80% × 80%. Il layout usa unità dinamiche del viewport. I tagli sono in alto a sinistra e in basso a destra.

L’iframe nasce solo quando si apre una demo. Non ci sono toolbar o CTA della landing all’interno del player. La sola X esterna chiude il popup; lo stesso fanno Escape e ogni click fuori dal perimetro visibile, compresi gli angoli tagliati. Un click nell’embed non chiude il popup. La chiusura rimuove l’iframe e restituisce il focus alla card.

## Contatto

`ready to start?` apre il modulo: nome, email e messaggio obbligatori, telefono facoltativo. Il modulo prepara un `mailto:` a info@mementostudio.it nell’app di posta del visitatore; non invia e non conserva dati sul server.

## Destinazioni

| Esperienza | Demo |
|---|---|
| IceCream | https://mementoicecream.vercel.app/?gusto=pistacchio |
| Auren | https://mementoauren.vercel.app/ |
| Elite | https://mementoelite.vercel.app/ |
| Fashion | https://mementofashion.vercel.app/ |
| GAMMA | https://mementosl.vercel.app/ |
| Food | https://mementofood.vercel.app/ |
| Knives | https://knives.vercel.app/ |
| ProductVis | https://productvis.vercel.app/ |
| VisualRef | https://visualref.vercel.app/ |

Le demo esterne mantengono le loro interfacce e politiche di incorporamento. La cover ProductVis conserva i telefoni della campagna; la demo esterna presenta un modello automotive. Le applicazioni esterne non sono state modificate.

## Asset

- IceCream: tavola originale, inquadrata tramite CSS per isolare il prodotto dal testo; titolo in HTML.
- Auren, Elite, Fashion, GAMMA e Food: immagini delle rispettive demo, conservate dalla V03.
- Knives, ProductVis e VisualRef: nuove immagini generate dalle tavole originali, con luce ambra e fondo scuro, senza testo o interfaccia incorporati; ottimizzate in WebP.

## Verifica V04

Controlli nel browser a 1363 × 936, 390 × 844, 375 × 667 e 2560 × 1080: headline su una riga, allineamento alla card, CTA su una riga, nessun overflow della landing e padding simmetrico di “Esplora”. Caricate tutte le nove copertine. Verificate le nuove copertine su desktop e mobile e la selezione tramite dot.

Apertura reale di Auren nel frame, misurato all’80% × 80% con margini del 10% su desktop e mobile. Verificati assenza di barre, X esterna, mantenimento del popup al click interno, chiusura cliccando nell’angolo tagliato, chiusura con X, rimozione dell’iframe e ripristino del focus. Verificati apertura della CTA contatto e chiusura con Escape; nessuna email inviata.

Sintassi JavaScript, riferimenti locali e integrità dello ZIP controllati. La verifica mobile usa viewport del browser, non hardware fisico. Il rendering delle demo esterne dipende dal dispositivo e dal browser.
