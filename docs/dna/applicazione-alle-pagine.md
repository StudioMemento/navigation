# Applicazione alle pagine

Ogni pagina usa **lo stesso engine, le stesse costanti e la stessa materia**. Da una pagina all'altra cambiano solo la **scena** (come è piegato il foglio di grafite) e le **sorgenti** (dove nasce l'energia). Se una pagina ha bisogno di un comportamento nuovo, prima si aggiunge qui, con la sua ragione, poi si scrive il codice.

## Cosa resta identico ovunque

- Palette, scala delle celle, reazione a catena, tre livelli di saturazione, luce del bordo, incandescenza dei testi.
- Fasce 15/70/15, caricamento in sei fasi, deriva allo stop.
- Nessuno sfondo: pagina e pannelli in nero vero (`#000`), vedi `sfondo.md`.
- Prima e ultima schermata composte secondo `struttura-e-scroll.md`.

## Cosa può cambiare: la scena

Il foglio di grafite si può piegare in modi diversi. Le tavole ne esplorano diversi: membrana, dune di carbone, incisioni, pieghe geodetiche, superficie a sella, scaglie, riflesso radente. Ogni pagina ne sceglie **uno**, con la stessa materia e la stessa luce.

| Pagina | Scena proposta | Sorgente proposta | Perché |
| --- | --- | --- | --- |
| **START** (fatta, V23) | nessuna scena: nero vero, la materia vive solo sulle superfici | nessuna (la mappa è Google Maps incorporato) | il contatto in primo piano, senza distrazioni |
| **Servizi** | pieghe geodetiche o superficie a sella: il foglio si piega dietro la griglia dei servizi | la card del servizio in hover | i servizi come facce dello stesso solido |
| **Portfolio** | scaglie sospese ai margini, più rade, perché i lavori sono immagini piene | il progetto aperto | la materia incornicia, non compete con le immagini |
| **Levelup** | portale: il foglio si apre in una soglia luminosa al centro | la soglia | è un passaggio di livello |
| **Navigation** (fatta, R12) | nessuna scena: nero vero; le cinque scene dello studio sono le immagini delle tab | nessuna: luce sugli spigoli al passaggio (il tratto di bordo da cui la tab arriva in lettura) | è il corridoio tra le pagine |

Queste scelte sono proposte. Il criterio per scegliere è che la forma della scena dica cosa fa la pagina.

## Navigation: adattamenti (R12)

Stesso engine, stesse costanti, stessa materia della START. La navigation cambia solo il quadro: ogni superficie vive su una tab, e ogni tab è un piano in prospettiva in un carosello. Le regole qui sotto sono scritte prima del codice, come chiede questa sezione.

1. **Le tab sono piani.** Celle, bordo, titolo e immagine vivono nei px della tab, posati sul piano; l'antialias legge le derivate dello schermo, quindi il contorno resta di un pixel con qualsiasi inclinazione.
2. **Le scene mostrano i propri colori in hover** (come la mappa, `ownColour`): sono già illuminate nella palette della casa, carbone e ambra. Quiete in bianco e nero, base attiva all'80% di saturazione su tutta la tab, range al 100% solo nelle celle raggiunte.
3. **Il titolo è della tab.** La tab è il link, quindi la superficie: il puntatore sulla tab porta il titolo in base attiva. Il range resta fatto di celle, allungato lungo la frase.
4. **Fasce 15/70/15 nel carosello.** Le secondarie stanno nelle fasce: la sezione successiva arriva già frammentata dal basso, la precedente esce dall'alto; allo stop del carosello le celle in uscita derivano e svaniscono. Non c'è inizio o fine documento, quindi le due fasce sono sempre aperte (chiuse con reduced motion). La tab in lettura sta sempre nella fascia centrale (verificato da 360 × 640 a 1920 × 1080).
5. **Le secondarie sono vicine, mai in base attiva.** Sotto il puntatore o nel raggio rispondono al 25% dal lato più vicino: bordo per segmenti, celle, un calore appena percettibile.
6. **Passaggio.** La tab che arriva in lettura accende il tratto di bordo da cui arriva (0,55, decade con il bordo) e poche celle lì vicino. È l'unica sorgente della navigation e nasce dal gesto che ha cambiato sezione.
7. **Budget d'ambra al caricamento.** Una tab della navigation ha circa 3,5 volte le celle di una card START: la quota di celle che si accendono entrando è scalata sulle celle, così ogni tab ha le stesse scintille di una card; un quarto sulle secondarie.
8. **Le luci delle scene** (lampade, schermi, portale: maschere disegnate per ogni immagine) entrano solo nel bloom e solo con la base attiva. A riposo il bloom non c'è.
9. **Riposo vero.** Tre secondi dopo l'ultima reazione il loop delle tab si ferma: in un iframe sempre aperto sulla home non si consuma GPU per nulla (lo sfondo, dalla R13, ha il proprio loop a 30 disegni al secondo).
10. **Il blur progressivo della navigation** (20% alto e basso) è composto nel grade, sul nero vero, come nella R11: niente otto livelli CSS sopra il canvas, niente bande.

## Navigation: allineamento alla START V24–V27 (R13)

La START ha cambiato quattro cose dopo la V23; la navigation le adotta con le stesse costanti.

1. **Sfondo.** Ghost Fibers (React Bits) con il preset della START: cinque layer, rosso/ambra, nessuna grana. Canvas e contesto propri, al massimo 30 disegni al secondo, DPR 1, risoluzione adattiva; montato poco dopo il primo paint, come la START. Il canvas delle tab è trasparente sopra di esso: i pannelli restano neri e opachi. Nella navigation il blur del 20% alto e basso vale anche per le fibre, composto nel loro shader di uscita (non con livelli CSS).
2. **Niente grana né dithering animato** nel grade (V25). I profili più bassi cambiano solo la risoluzione: bloom, particelle e scala delle celle restano (V24). MSAA ×2 solo sul profilo alto; il bordo delle tab è già antialiasato negli shader.
3. **Telefono e tablet** (`hover: none`, `pointer: coarse` o larghezza fino a 767 px): le scene sono a colori anche a riposo (V25). Un dito fermo non alimenta l'hover. Ogni tocco è un solo contatto che percorre le celle esistenti di tab e titoli per brevi rami, arriva con la distanza dal dito, accende il bordo dal lato dove le celle lo raggiungono e si spegne in circa mezzo secondo per cella; i titoli raggiunti prendono il gradiente ambra (V26–V27). Massimo quattro contatti in memoria, 96 celle per superficie e contatto.
4. **Primo paint.** La navigazione DOM è visibile subito; quando l'engine è pronto prende il posto del DOM e costruisce le tab per celle (V24).

Nella navigation le superfici sono piani in prospettiva: il contatto è pianificato con la posizione sullo schermo di ogni cella proiettata dal piano, e il punto toccato riportato nei px della tab.

## Come si fa una pagina nuova

1. Si parte dal progetto START (stessa cartella `src/vfx/`).
2. Si registrano le superfici: `useSurface('title')` per i titoli, `useSurface('card', opzioni)` per card e pannelli (vedi `codice.md`).
3. Si sceglie la scena: una nuova funzione di geometria accanto a `buildArch`, con gli stessi attributi per vertice (normale, cresta, energia).
4. Si definiscono le sorgenti, se servono, con l'opzione `source` della superficie.
5. Si verifica la checklist in `codice.md`.

## Continuità tra le pagine

Quando il sito passerà da Framer a Vercel diretto, il cambio pagina potrà diventare un movimento di camera dentro lo stesso spazio. È una proposta, non ancora implementata.
