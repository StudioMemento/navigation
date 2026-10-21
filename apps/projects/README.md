# Memento Portfolio

Portfolio con ingresso diretto nel **Catalogo** e apertura dei progetti nello **Slideshow continuo**. 23 progetti, copertine dedicate e gallerie originali.

## Sorgente

- `dist/index.html`: catalogo, viewport del progetto e dialogo media nativo.
- `dist/styles.css`: token Memento, layout responsive e transizioni.
- `dist/app.js`: routing, filtri, ricerca, coverflow, capitoli e media.
- `dist/loop-scroll.js`: ciclo di scroll e indicatore di avanzamento.
- `dist/projects.json`: unico archivio dei progetti per entrambe le viste.
- `dist/assets/`: font locale, thumbnail e immagini ottimizzate.
- `docs/ASSET_SOURCES.json`: provenienza dei contenuti recuperati.
- `docs/COVER_MANIFEST.json`: sorgenti, prompt e provenienza delle 23 nuove copertine.

HTML, CSS e JavaScript nativi. Nessuna dipendenza frontend o compilazione. Servire `dist/` attraverso un server HTTP. I dati vengono caricati con `fetch`, quindi l'apertura tramite `file://` non è supportata.

## Navigazione

- `/` e `/#catalogo`: griglia; filtri e ricerca si aprono dalle icone.
- `/#slideshow/auren`: coverflow, dot, titolo, apertura del progetto e galleria nello stesso percorso.
- I vecchi link `/#progetto/<id>` vengono ricondotti allo slideshow.
- “Tutti i progetti” torna al catalogo conservando ricerca, scroll e focus. Un link diretto torna al catalogo iniziale.
- “Esplora progetto” porta al contenuto originale, identificato da “Dettaglio progetto”. Dopo la galleria, una pausa visiva con “Altri progetti” precede il ritorno al selettore.
- Frecce, trascinamento e swipe cambiano il progetto nel coverflow, anche fra ultimo e primo.
- L’indicatore laterale è trascinabile e utilizzabile da tastiera; le frecce collegano selettore, galleria e nuovo giro.
- Escape chiude il media aperto oppure torna al catalogo. I dialoghi media gestiscono il focus nativamente.
- I media si attivano su richiesta e vengono scaricati dal DOM alla chiusura.

## Loop

Tre cicli di identica altezza mantengono il normale scroll del browser. Il ciclo centrale è quello accessibile; le copie visive sono escluse dall’albero di accessibilità e dall’ordine di tabulazione. Al confine il viewport viene riposizionato su pixel equivalenti, senza intercettare wheel o scroll touch. Lo stato di galleria e capitolo viene sincronizzato nelle tre copie.

Il browser non mostra la scrollbar; il range laterale rappresenta la posizione nel singolo giro e riparte da zero al passaggio. `ResizeObserver` ricalcola le dimensioni dopo resize e cambio progetto. Il confine tollera l’arrotondamento del browser a mezzo pixel. Le preferenze di movimento ridotto disattivano transizioni e scroll animati.

## Dati e integrazione

Ogni progetto ha un ID stabile, cover, hero, categorie e galleria. `variants` raggruppa i capitoli dello stesso progetto. `experience` è facoltativo: se manca non appare un pulsante inattivo. Le due viste leggono gli stessi dati e usano lo stesso renderer.

Il catalogo usa quattro colonne su desktop, tre su tablet e due su mobile. Su mobile tutte le tessere sono quadrate. Su desktop il campo `layout` alterna tessere square, wide su due colonne e tall su due righe. Nome e chevron diagonale compaiono solo al passaggio del mouse o al focus da tastiera; non sono forzati sul primo item o sui dispositivi touch.

Le copertine sono master landscape 16:9 con ambienti continui da bordo a bordo e soggetti centrali. La versione WebP 1600 × 900 serve l’apertura; la thumbnail 960 × 540 serve catalogo e coverflow. `object-fit: cover` riempie ogni frame senza fasce aggiunte o limiti di ingrandimento. Il mobile applica un crop centrale square. Le composizioni destinate alle tessere alte sono state predisposte per un crop più stretto. Le immagini originali di galleria vengono mostrate intere.

I titoli progetto usano una sola regola tipografica: Inter 300, tracking 0,055 em, kerning normale, centratura e dimensione comune per breakpoint. Nessun ridimensionamento in funzione del numero di lettere. Le distanze dal blocco dei dot e dall’immagine dipendono da token CSS condivisi. Il gap dopo la galleria è di 48 svh su desktop e 42 svh su mobile, entro limiti minimi e massimi.

I link alle demo sono quelli recuperati dai progetti. Le demo esterne possono cambiare indipendentemente da questo portfolio. Le destinazioni Sites si aprono in una nuova scheda; le demo Vercel si attivano in un frame con link esterno sempre disponibile. La disponibilità HTTP non certifica tutte le interazioni WebGL di ogni demo.

## Provenienza

Le 23 copertine sono composizioni generate a partire dalle immagini dei rispettivi progetti. La revisione landscape usa le copertine square precedenti come riferimento per identità e atmosfera. Sono interpretazioni editoriali, non nuovi render tecnici o fotografie documentarie. I prompt, le reference e le eventuali correzioni sono registrati in `docs/COVER_MANIFEST.json`; la provenienza precedente è conservata in `docs/COVER_MANIFEST_SQUARE_V1.json`. Le tavole originali dei progetti sono conservate nelle gallerie. Le demo utilizzano asset delle loro sorgenti e fotogrammi delle registrazioni fornite dall'utente. Nessun modello o film è simulato con un'immagine.

Il catalogo include tutti i gruppi di lavoro recuperati nei quattro archivi `project zip` e le undici demo identificate. Le diverse versioni dello stesso progetto sono organizzate in capitoli, evitando copie del medesimo item.

## Verifica del polish

Controllati nel browser il layout desktop e i viewport 390 × 844 e 320 × 640. In questa revisione: frame riempiti da immagini 16:9; tessere mobile esattamente square senza etichette persistenti; dimensione, tracking, centratura e distanze identiche dei titoli Auren/HyperKnife; titolo lungo HyperKnife Print senza overflow; accesso al dettaglio, lightbox, navigazione delle immagini, nuovo gap e ritorno al checkpoint con cue a 0%. Nessun errore applicativo nella console durante la prova. Nella precedente revisione erano già stati verificati ritorno al catalogo con ricerca conservata, wrap ultimo/primo, scroll inverso e cambio capitolo. Controllate sintassi JavaScript, originali di galleria e presenza degli asset locali. La verifica mobile riguarda il layout responsive nel browser, non dispositivi fisici.
