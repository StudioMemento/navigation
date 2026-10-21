# Memento — Level Up / Slideshow

Landing statica senza build o dipendenze JavaScript esterne. Servire `dist/` via HTTP. Font e immagini sono locali.

## Navigazione

Una sola schermata, senza scorrimento della landing. Il layout si adatta al viewport: copy in alto allineato a destra, slideshow centrale, call to action sempre visibile sotto. Il rapporto delle card passa da 2.12:1 su desktop a una composizione quasi quadrata su mobile. La larghezza è calcolata anche sull’altezza disponibile, per mantenere navigazione e contatto nei viewport più bassi.

Nove anteprime, con passaggi CSS 3D e card adiacenti in prospettiva. Nessun autoplay. Chevron, dot, swipe orizzontale, frecce destra/sinistra e Home/End consentono di selezionare un’esperienza. Ogni card visibile apre la propria demo al primo click. La posizione selezionata viene mantenuta alla chiusura. `prefers-reduced-motion` disattiva le transizioni; il focus segue la card quando si naviga da tastiera o si trascina una card focalizzata.

Ordine: IceCream → Auren → Elite → Fashion → GAMMA → Food → Knives → ProductVis → VisualRef. I titoli delle card riprendono le tavole della campagna; IceCream usa la nuova tavola “Entra nel gusto.”. Inter è servito localmente. Il gradiente del testo tende all’ambra in basso a destra.

## Player e contatto

L’iframe viene creato soltanto all’apertura della demo. Il player usa lo spazio disponibile nel viewport, con una toolbar di 44 px per chiusura e apertura esterna e una CTA separata sotto. I controlli della landing non coprono l’interfaccia della demo. Chiudere il player rimuove l’iframe e ripristina il focus. Escape e click sullo sfondo chiudono i dialog.

“Pronto a fare il level up?” apre il modulo dalla landing o dal player. Nome, email e messaggio sono obbligatori, telefono facoltativo. Il modulo prepara un `mailto:` a info@mementostudio.it nell’app di posta del visitatore; non invia e non conserva dati sul server.

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

Le demo esterne mantengono il proprio comportamento e le proprie politiche di incorporamento. La cover ProductVis conserva i telefoni della campagna; la demo esterna attuale presenta un modello automotive. Non sono state modificate le applicazioni esterne.

## Asset

- IceCream: tavola originale fornita dall’utente, convertita in WebP. Il prodotto viene inquadrato con CSS e il titolo è HTML; il bordo della tavola non viene duplicato.
- Auren: `https://mementoauren.vercel.app/assets/hero-clean.avif`, transcodificato in WebP.
- Elite: `https://mementoelite.vercel.app/assets/hero.webp`.
- Fashion: `https://mementofashion.vercel.app/video/jj-city-wide-poster.jpg`.
- GAMMA: `https://mementosl.vercel.app/assets/landing/clothwear-hero-v8.webp`.
- Food: `https://mementofood.vercel.app/assets/menu/velvet-a.webp`.
- Knives, ProductVis e VisualRef: pannelli originali della campagna, rettificati attraverso omografie CSS. Le geometrie rimangono in `panel-geometries.js`.

Il fondale cinematografico della versione precedente è stato rimosso dalla nuova composizione.

## Verifica

Sintassi JavaScript e riferimenti locali controllati. Layout senza overflow verticale verificato nel browser a 1363 × 936, 390 × 844 e 375 × 667. Verificati selezione tramite dot, navigazione circolare, swipe orizzontale, apertura reale di Auren e IceCream, cambio gusto all’interno dell’embed, passaggio player → contatto, validazione dei campi obbligatori, rimozione dell’iframe e ritorno del focus alla card. Il link al gusto pistacchio è stato verificato navigando la demo.

Non si tratta di test su hardware mobile fisico. Il rendering WebGL delle demo esterne dipende dal browser e dal dispositivo; la landing usa CSS 3D e non richiede WebGL.
