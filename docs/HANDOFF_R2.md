# MEMENTO NAV — Vertical 3D handoff R2

**Progetto:** Memento — NAV  
**Revisione:** R2 · 6 novembre 2026  
**Obiettivo:** sviluppare la navigazione verticale con card prospettiche, immagini square e VFX coerenti con la direzione Memento.

## 1. Ambito e riferimenti

Intervenire sul progetto NAV di `mementonav.vercel.app`.

Conservare contenuti, identità, icone e destinazioni delle sezioni esistenti. Non modificare le pagine Services, Projects, LevelUp, Start o l’esperienza dello studio 3D.

Riferimenti:

- [Revisione visiva R1 — layout, materiali, background, transizioni e immagini](https://chatgpt.com/library?file_id=libfile_424fc94965b48191afd765fda570e492&account_id=personal).
- [Ultimo riferimento dello slider prospettico](https://chatgpt.com/library?file_id=libfile_ed060614d8188191bbd1b48fedefc815&account_id=personal).

**La correzione prospettica descritta in questo documento prevale sulle rappresentazioni semplificate delle card secondarie nelle tavole R1.**

Ogni tavola governa soltanto il proprio tema:

| Riferimento | Informazioni da trasferire |
|---|---|
| Ultimo screenshot dello slider | Prospettiva, rapporto fra card attiva e secondarie, lettura delle superfici |
| T01–T02 | Proporzioni responsive, margini, gerarchia |
| T03 | Continuità del movimento verticale |
| T04 | Campo esterno e interazioni |
| T05 | Bordo, superficie interna e tipografia |
| T06 | Costruzione e dispersione |

Non trasferire nella NAV le griglie di servizi, il copy commerciale o il numero di card presenti nelle tavole dedicate agli effetti.

## 2. Correzione fondamentale: slider prospettico verticale

Riprodurre il linguaggio dello slider orizzontale allegato, trasportando la disposizione delle card sull’asse verticale.

La composizione deve mostrare:

1. Una card attiva centrale, frontale e dominante.
2. La card precedente sopra.
3. La card successiva sotto.
4. Le secondarie inclinate sull’asse X e rivolte verso l’utente.

Non ruotare l’interfaccia o le immagini di 90°. Cambiano l’asse di disposizione e l’asse di inclinazione delle superfici.

### Verso dell’inclinazione

**Card superiore**

- Il bordo superiore, esterno alla composizione centrale, viene verso l’utente.
- Il bordo inferiore, vicino alla card attiva, rimane arretrato.
- La superficie deve essere leggibile come un piano inclinato.

**Card inferiore**

- Il bordo inferiore, esterno alla composizione centrale, viene verso l’utente.
- Il bordo superiore, vicino alla card attiva, rimane arretrato.

La prospettiva produce secondarie con il lato esterno apparentemente più largo e quello interno più stretto.

Non ottenere questo risultato deformando manualmente un’immagine in un trapezio: immagine, testo, bordo e materiale devono appartenere alla stessa superficie trasformata.

### Card attiva

- Rotazione X e Y nulle a riposo.
- Scala di riferimento 1.
- Immagine nitida.
- Superficie dominante.
- Eventuale risposta al cursore molto contenuta, subordinata alla leggibilità.

Le secondarie conservano le stesse dimensioni geometriche della card attiva. La loro dimensione apparente dipende dalla prospettiva, dalla posizione e dall’occlusione.

Non sostituirle con piccole miniature piatte.

## 3. Geometria e movimento 3D

Usare una prospettiva condivisa, con punto di vista centrato sulla card attiva.

Parametri iniziali da calibrare sul prototipo:

| Elemento | Impostazione iniziale |
|---|---|
| Card centrale | Frontale, rotazione X = 0° |
| Secondaria superiore | Rotazione X circa −38° |
| Secondaria inferiore | Rotazione X circa +38° |
| Inclinazione mobile | Circa 30–36°, mantenendo evidente la profondità |
| Origine superiore | Centro del bordo inferiore |
| Origine inferiore | Centro del bordo superiore |
| Profondità delle cerniere interne | Arretramento iniziale intorno a 0,20 volte l’altezza della card |
| Distanza prospettica | Punto di partenza circa 2,5–3 volte l’altezza della card |

I segni indicati assumono coordinate CSS convenzionali. **Il risultato geometrico descritto nella sezione 2 è il criterio di verifica**, anche se l’architettura scelta richiede segni o trasformazioni differenti.

Durante lo swipe verso l’alto:

- La card attiva sale e si inclina fino alla posizione secondaria superiore.
- La card inferiore avanza, si raddrizza e diventa attiva.
- La successiva si prepara nella posizione inferiore.
- Il movimento inverso deve percorrere la stessa traiettoria.

Posizione, profondità, inclinazione e luminosità devono derivare da un unico progresso continuo della navigazione.

Evitare il cambio discreto di immagine a metà movimento, il riordino visibile dei livelli e gli scatti quando cambia l’indice attivo.

Le secondarie devono restare riconoscibili: più scure dell’attiva, senza diventare rettangoli neri o superfici trasparenti attraversate dal background.

## 4. Layout responsive

Il 20% rimane una **cornice minima esterna alla card attiva**, su tutti i lati.

La card mantiene il proprio rapporto. Quando non riempie tutta l’area disponibile, lo spazio aggiuntivo rimane fuori dalla card.

| Viewport di riferimento | Rapporto card attiva | Dimensione indicativa |
|---|---:|---:|
| Ultrawide 2560 × 1080 | 2:1 | 1296 × 648 px |
| Desktop 1440 × 900 | 2:1 | 864 × 432 px |
| Tablet verticale 834 × 1194 | 1:1 | 500 × 500 px |
| Mobile 390 × 844 | 4:5 | 234 × 293 px |

Le misure sono riferimenti, non dimensioni fisse da applicare a ogni dispositivo.

Per un rapporto `r = larghezza / altezza`, una base di calcolo è:

- Larghezza card = minimo fra 60% della larghezza utile e 60% dell’altezza utile moltiplicata per `r`.
- Altezza card = larghezza card divisa per `r`.

Applicare poi i vincoli delle aree sicure, della navbar e dei controlli.

Le anteprime secondarie possono occupare parte della cornice esterna. Non devono coprire wordmark, navbar o aree di interazione dei chevron.

Gestire separatamente gli schermi bassi in landscape: ridurre l’ingombro della scena e delle anteprime, senza tagliare titolo o controlli.

Il ridimensionamento della viewport e la comparsa della barra del browser non devono riportare la navigazione alla prima sezione.

### Tipografia

- Titolo dentro la card, in basso.
- Inset laterale e inferiore circa 4%, con minimo indicativo di 12 px.
- Inter, peso coerente e tracking ampio.
- Adattare dimensione e tracking alla parola più lunga.
- Tutti i titoli devono rimanere leggibili e contenuti.
- Gradiente 135°, dal bianco caldo verso l’ambra in basso a destra.
- Nessuna deformazione dei glifi prodotta dagli FX.

La proiezione prospettica della card secondaria coinvolge naturalmente anche il testo. Gli effetti tipografici non devono aggiungere distorsioni indipendenti.

### Forma della card

- Taglio diagonale in alto a sinistra e in basso a destra.
- Bordo sottile.
- Materiale carbone.
- Nessuno spessore massiccio o cornice da dispositivo.

## 5. Chevron, navbar e input

### Chevron

Inserire due frecce piccole:

- Up sopra la card attiva.
- Down sotto la card attiva.
- Entrambe centrate orizzontalmente.
- Sempre esterne alla superficie.
- Segno visibile circa 16–20 px.
- Area interattiva almeno 44 × 44 px.

Lasciare un intervallo libero fra card, area cliccabile e anteprima secondaria. Verificare le distanze **dopo la proiezione prospettica**, non soltanto sulle coordinate iniziali.

### Navbar

La navbar rimane il riferimento visivo della sezione attiva:

- Inattive in bianco e nero.
- Attiva con accento ambra.
- Nessuna fila aggiuntiva di dots.
- Aggiornamento coerente con la card che diventa centrale.
- Nessun lampeggio fra due icone durante un trascinamento incompleto.

Nel contesto NAV, selezionare un’icona deve portare alla relativa card. La card attiva apre la destinazione già associata alla sezione. Conservare gli URL reali del progetto, senza ricostruirli da nomi o etichette.

### Navigazione

- Wheel verso il basso e swipe verso l’alto: sezione successiva.
- Wheel verso l’alto e swipe verso il basso: sezione precedente.
- Drag verticale da desktop.
- Chevron up/down.
- Tastiera con frecce su/giù quando il controllo è pertinente.
- Click o tap su una secondaria: portarla al centro.
- Click o tap sulla card attiva: aprire la sezione.

Sequenza circolare:

**STUDIO → SERVICES → PROJECTS → LEVELUP → START → STUDIO**

Non introdurre autoplay.

Durante il drag la scena deve seguire il gesto; al rilascio completa o annulla il passaggio con uno snap morbido.

Gestire l’inerzia della rotella per evitare che un singolo gesto attraversi accidentalmente tutte le sezioni. Evitare blocchi temporali lunghi che rendano l’interfaccia poco reattiva.

Un trascinamento non deve generare anche il click di apertura. Conservare zoom e gesti accessibili del browser.

## 6. Immagini

Utilizzare i cinque master square rigenerati nella revisione R1.

| Sezione | Soggetto | Nome di destinazione proposto |
|---|---|---|
| STUDIO | Due postazioni e architettura sfaccettata | `nav-studio` |
| SERVICES | Atelier, modello e lampada poligonale | `nav-services` |
| PROJECTS | Galleria con tre sculture | `nav-projects` |
| LEVELUP | Scala, portale e anello sospeso | `nav-levelup` |
| START | Due poltrone e spazio di incontro | `nav-start` |

I nomi indicano la convenzione proposta; non attestano file già rinominati.

Usare gli originali delle immagini consegnate, senza ritagliarli dalle tavole o dal PDF.

Caratteristiche da preservare:

- Nero carbone dominante.
- Volumi realmente sfaccettati.
- Triangoli nella geometria.
- Accenti ambra selettivi.
- Parte inferiore morbida e scura per integrare il titolo.
- Nessun testo incorporato nell’immagine.

Preparare dimensioni responsive e formati ottimizzati con fallback compatibile.

L’immagine deve comporre l’intera superficie della card. Eliminare la soluzione “immagine square in alto + grande fascia vuota sotto”.

Il master resta square; il taglio visualizzato cambia con il rapporto della card. Calibrare il punto focale per ciascuna immagine e breakpoint, conservando il soggetto.

Il blur inferiore deve essere progressivo e continuo, senza una fascia orizzontale percepibile.

## 7. Composizione dei livelli

Separare chiaramente:

1. Background globale.
2. Superfici opache delle card.
3. Reticolato locale interno alle card.
4. Immagine e tipografia.
5. Edge glow e particelle locali.
6. Controlli fissi.

**Il background non deve disegnare sopra le card.**

La soluzione preferita è un campo realmente collocato dietro le superfici, con FX interni indipendenti.

Se sono necessarie maschere, devono seguire la sagoma proiettata completa, inclusi tagli diagonali e trasformazioni.

Non escludere un segmento dal background usando soltanto il suo punto medio: segmenti lunghi possono comunque attraversare la card.

Il canvas interno deve essere ritagliato sulla superficie. Il bagliore esterno del bordo può oltrepassarla in modo locale e controllato.

Tenere separato il contenitore che conserva la geometria 3D dagli elementi sui quali vengono applicati clip, filtri e maschere. Verificare che la composizione non appiattisca le secondarie.

## 8. Background continuo

Costruire un reticolo:

- Irregolare.
- Sottile.
- Più presente ai margini.
- Più discreto vicino al contenuto.
- Con profondità e densità variabili.
- In bianco e nero a riposo.
- Ambra soltanto nelle zone attivate.

Evitare una griglia triangolare omogenea che copra tutto lo schermo.

Usare un campionamento non uniforme con zone dense, vuoti e triangoli di dimensioni diverse. La struttura deve rimanere stabile nel tempo: nessuna randomizzazione completa a ogni frame.

### Desktop

La prossimità del cursore attiva gradualmente nodi, collegamenti e piccoli frammenti.

L’attenuazione combina distanza e noise continuo, con distribuzione asimmetrica. Non deve apparire un disco luminoso o un confine circolare del range.

### Mobile

Ogni contatto genera un impulso dal punto di touch:

1. Accensione locale.
2. Propagazione irregolare.
3. Frammentazione.
4. Dispersione.

La propagazione interessa porzioni del reticolo, senza disegnare un anello.

L’effetto si esaurisce dopo il rilascio. Non lasciare un hover persistente.

Durante lo swipe il riconoscimento del gesto ha priorità. Limitare e combinare gli impulsi ravvicinati per evitare accumuli di luminosità.

## 9. Materiale interno ed edge glow

Il reticolato dentro la card è un materiale distinto dal background.

Deve avere:

- Densità variabile.
- Aree vuote.
- Cluster locali.
- Intensità ridotta sopra i soggetti.
- Attenuazione irregolare.
- Movimento lento.

La risposta interna deve essere molto più sottile del bordo.

### Edge glow

Combinare:

- Una linea luminosa sottile sul bordo.
- Un bagliore interno contenuto.
- Un alone esterno morbido e locale.

Il bordo deve risultare percepibile, senza illuminare continuamente l’intero perimetro come un tubo neon.

La prossimità può coinvolgere insieme bordo, superficie e lettere vicine. Condividere il modello di interazione, mantenendo intensità differenti.

Nelle card inclinate, convertire correttamente il punto di interazione nel piano locale della superficie. La sola distanza dal rettangolo non trasformato non è sufficiente.

### Tipografia

L’attivazione locale introduce:

- Bagliore interno.
- Edge glow sui glifi.
- Frammenti di reticolo.
- Pochi triangolini.

Forma, posizione e spaziatura delle lettere restano stabili.

Il range può attraversare più caratteri vicini, con transizione graduale.

## 10. Movimento del reticolo e triangolini

Il reticolato deve continuare a vivere anche dopo l’apparizione, con movimento lieve.

Indicazioni iniziali da calibrare:

| Elemento | Comportamento |
|---|---|
| Nodi | Oscillazioni lente, fasi e frequenze differenti |
| Ampiezza locale | Circa 1–3 px desktop, inferiore su mobile |
| Periodi | Indicativamente 6–12 secondi |
| Triangolini | Piccoli, radi, con dimensioni e orientamenti variabili |
| Traiettorie | Deriva combinata con oscillazioni sinusoidali |
| Vita particelle | Comparsa e dissolvenza morbide |
| Mobile | Meno elementi e minore ampiezza |

Le fasi non devono essere sincronizzate: evitare che tutto il reticolo oscilli insieme.

I triangolini non devono muoversi soltanto in linea retta. Combinare deriva, componente sinusoidale e piccola rotazione.

Le tracce presenti nelle tavole illustrano il movimento. Non vanno trasformate in code luminose permanenti.

Mantenere un seme stabile per evitare flicker e salti fra fotogrammi.

## 11. Appear e disappear

### Appear: costruzione dal nulla

La card deve materializzarsi progressivamente:

1. Emergono pochi nuclei distribuiti.
2. Compaiono collegamenti locali.
3. Piccole facce triangolari diventano visibili.
4. Le aree si uniscono e rivelano l’immagine.
5. Bordo e titolo raggiungono la forma stabile.
6. Rimane il movimento lieve del materiale.

La costruzione avviene in più zone della superficie, con tempi differenziati.

**Escludere tendine, bande orizzontali e overlay che scendono dall’alto.**

L’immagine deve essere già pronta prima di avviare il reveal completo.

Le zone ancora non materializzate possono mostrare l’ambiente retrostante. Sulle facce già costruite, il background rimane occluso.

Durate iniziali indicative:

- Desktop: 650–900 ms.
- Mobile: 450–700 ms.

### Disappear

La superficie perde continuità in alcuni punti; pochi frammenti si separano, si muovono e svaniscono.

Evitare esplosioni, pioggia uniforme di particelle e transizioni che blocchino a lungo la navigazione.

### Relazione con lo slider

Una card già costruita deve scorrere come un oggetto intero.

Non ripetere un’intera costruzione distruttiva a ogni swipe. Distinguere:

- Prima apparizione della scena.
- Materializzazione di elementi non ancora presentati.
- Passaggio fra card già pronte.
- Uscita effettiva dall’esperienza.

## 12. Caricamento immagini e problema mobile

Il bug segnalato dall’utente **non è stato riprodotto sul telefono fisico**.

Nell’audit con viewport mobile di Chrome:

- Le immagini controllate di Studio, Services e Projects risultavano caricate.
- LevelUp era visibile.
- La card misurava circa 234 × 506 px.
- L’immagine nitida occupava circa 234 × 234 px.

Il grande vuoto interno è un problema di composizione osservato. Non dimostra la causa del glitch intermittente.

Durante lo sviluppo distinguere:

- Richiesta di rete fallita.
- File o percorso errato.
- Selezione responsive dell’immagine.
- Decode incompleto.
- Remount della card.
- Maschere o filtri.
- Artefatti di compositing.

Requisiti:

- Preparare card attiva e adiacenti, includendo il passaggio circolare ultima/prima.
- Evitare lazy loading sulla prima immagine necessaria.
- Attendere il decode prima del passaggio alla versione nitida.
- Conservare elementi e chiavi stabili durante lo scorrimento.
- Non ricreare immagini e canvas a ogni variazione dell’indice.
- Usare una miniatura coerente come fallback temporaneo.
- Passare dalla miniatura all’immagine pronta senza flash.
- Gestire errori e retry senza loop di caricamento infinito.
- Non mostrare improvvisamente il background attraverso una card già presente.

Provare cache vuota, rete lenta, swipe rapidi, ritorno alla scheda, rotazione del dispositivo e variazioni della barra indirizzi.

Verificare Safari/iOS e Chrome/Android su dispositivi reali quando disponibili. Dichiarare esplicitamente eventuali verifiche non eseguite.

## 13. Prestazioni e accessibilità

Mantenere lo stack esistente quando permette di ottenere il risultato.

Per questa navigazione, superfici DOM in prospettiva e canvas leggeri sono una base possibile. Non introdurre un ambiente 3D completo soltanto per trasformare tre card.

Indicazioni:

- Un solo coordinamento delle animazioni.
- Nessun aggiornamento dell’intera UI a ogni frame.
- Geometria e buffer riutilizzati.
- Numero di elementi e risoluzione degli FX adattivi.
- Nessuna allocazione massiva nel ciclo di disegno.
- Sospensione delle animazioni quando la pagina è nascosta.
- Solo gli elementi necessari attivi.
- Attenzione ai blur estesi su superfici grandi.

L’obiettivo è avvicinarsi a 60 fps sui dispositivi di riferimento. Va misurato e documentato.

Con movimento ridotto:

- Eliminare oscillazioni e deriva continua.
- Semplificare costruzione e dispersione.
- Usare transizioni brevi e leggibili.
- Conservare navigazione, stato attivo e feedback.

Prevedere focus visibile, nomi accessibili per icone e chevron, contrasto sufficiente e navigazione da tastiera.

Non catturare i comandi della tastiera quando l’utente interagisce con altri controlli pertinenti.

## 14. Ordine di implementazione

1. Verificare struttura del progetto, asset e destinazioni esistenti.
2. Implementare dimensioni responsive e tre superfici prospettiche.
3. Verificare il verso dell’inclinazione rispetto all’ultimo screenshot.
4. Completare navigazione, snap, loop e sincronizzazione navbar.
5. Integrare immagini e caricamento stabile.
6. Separare background, materiale locale e bordi.
7. Integrare hover e impulsi touch.
8. Aggiungere movimento sinusoidale e triangolini.
9. Integrare appear/disappear.
10. Eseguire verifiche visive, funzionali e di prestazioni.

Validare prima geometria e caricamento con gli FX disattivati. Riattivarli progressivamente per individuare eventuali regressioni.

## 15. Criteri di accettazione

- [ ] La card attiva è frontale e dominante.
- [ ] La superiore porta il bordo alto verso l’utente.
- [ ] L’inferiore porta il bordo basso verso l’utente.
- [ ] Le secondarie sono superfici prospettiche riconoscibili.
- [ ] Immagine, titolo, bordo e materiale si muovono insieme.
- [ ] Il passaggio è continuo anche quando si inverte il gesto.
- [ ] Il loop ultima/prima non produce salti.
- [ ] Navbar e card attiva rimangono sincronizzate.
- [ ] I chevron sono piccoli, centrati, esterni e facilmente toccabili.
- [ ] Titoli e controlli non vengono tagliati nei breakpoint verificati.
- [ ] Il titolo è vicino ai margini della card.
- [ ] Non esiste più la grande fascia vuota sotto l’immagine mobile.
- [ ] Le immagini non lampeggiano durante swipe consecutivi.
- [ ] Nessun segmento del background viene disegnato sopra una card presente.
- [ ] Il reticolo interno è irregolare e più sottile del bordo.
- [ ] L’edge glow è visibile e localizzato.
- [ ] Nodi e triangolini hanno movimento lieve e non sincronizzato.
- [ ] Gli impulsi touch si disperdono senza anelli visibili.
- [ ] L’appear costruisce la card da nuclei distribuiti.
- [ ] Nessuna tendina o banda scende dall’alto.
- [ ] La modalità con movimento ridotto resta utilizzabile.
- [ ] I risultati riportano browser e dispositivi realmente testati.
- [ ] Le altre pagine e le destinazioni esistenti restano integre.

**Consegna della fase di sviluppo:** sorgenti aggiornati, anteprima verificabile, riepilogo delle prove eseguite e delle verifiche ancora aperte. Non dichiarare corretto il bug mobile senza evidenza del comportamento sui casi interessati.
