# MEMENTO / VFX — Direzione visiva e handoff R3

**Data:** 6 novembre 2026  
**Consegna:** sette tavole concettuali + specifica di implementazione.  
**Stato:** direzione progettata; codice e prestazioni non ancora implementati o misurati.

## 1. Obiettivo

Costruire una materia digitale continua: vertici minuti, edge sottili e facce triangolari con differenze di shading appena percepibili. La rete respira lentamente, emerge vicino al puntatore e collega fondo, bordi delle card e tipografia. Loading e scroll usano la stessa grammatica: scia → vertici → edge → facce → contenuto → quiete.

La qualità cercata è quella di Memento: nero carbone, immagini cinematografiche leggibili, tipografia ampia, luce ambra localizzata e molto spazio vuoto. La materia deve essere percepita prima di essere osservata come effetto.

### Gerarchia delle indicazioni

1. Richiesta dell’utente e invarianti di questo documento.
2. Geometria, contenuti, asset e comportamenti del sito esistente.
3. Tavole nuove come riferimento percettivo dei diversi stati.
4. Parametri numerici proposti qui, da calibrare nella pagina reale.

Le tavole sono fotogrammi illustrativi, non screenshot di un prototipo funzionante. Copy abbreviato, hamburger, dispositivi e spaziature rappresentati nelle tavole non autorizzano a cambiare navigazione, contenuti o layout del sito. Per lo sviluppo usare gli asset reali del progetto. Eventuali piccole differenze tra fotogrammi generati non vanno tradotte in animazioni.

## 2. Analisi dei riferimenti e del sito

Sono state confrontate le tavole iniziali BACKGROUND, LOADING, INTERACTIONS e SCROLL e le varianti allegate su membrana, touch, card, particelle, tipografia e dissolvenza.

È stata verificata visivamente la versione pubblicata di [Home](https://mementostudio.it/), [Services](https://mementostudio.it/services) e [Start](https://mementostudio.it/start). Home e Services espongono contenuti incorporati da [mementonav.vercel.app](https://mementonav.vercel.app/) e [mementoservizi.vercel.app](https://mementoservizi.vercel.app/). Queste osservazioni descrivono la resa visitata, non un audit del repository.

| Riferimento | Cosa mantenere | Correzione nella nuova direzione |
| --- | --- | --- |
| BACKGROUND iniziale | Continuità tra margini e contenuti; piccoli nodi; fondo carbone | Ridurre la presenza del wireframe, differenziare scala e densità; profondità molto bassa |
| Membrana delle varianti precedenti | Vertici connessi e shading che cambia con la geometria | Evitare rilievi troppo marcati e punti luminosi distribuiti uniformemente |
| LOADING iniziale e varianti | Sei fasi comprensibili, origine nel nero, triangolini di accompagnamento | Rendere il reveal realmente spaziale e per celle; assestamento completamente pulito |
| INTERACTIONS e CARD | Prossimità, bordo vivo, ritorno morbido | Campo condiviso tra card vicine; luce sul tratto di bordo interessato; forte attenuazione interna |
| PARTICELLE | Repulsione e rotazioni in entrambi i versi | Frammenti molto piccoli, poche emissioni, vita breve e nessun accumulo |
| TESTO | Reticolo nei glifi, bagliore interno e glow esterno | Fronte di luce che percorre la frase; sagoma e impaginazione immobili |
| SCROLL | Uscita in alto e ricostruzione in basso | Progressione legata alla posizione, reversibile e senza rigenerare le celle |
| Home attuale | Architetture sfaccettate, fondo scuro, card grandi e titoli spaziati | Gli FX seguono prospettiva e trasformazioni già presenti |
| Services attuale | Catalogo con dispositivi e oggetti, titoli leggibili, immagini prevalentemente neutre | Mostrare il comportamento tra card reali, mantenendo il soggetto libero dalla trama |
| Start attuale | “LET’S WORK / TOGETHER”, accento crema/ambra e immagini contatto | Usare questo contesto per loading e testo, evitando di mescolarlo al catalogo servizi |

### Decisione sulla visibilità a riposo

Il **fondo** conserva una trama neutra quasi impercettibile, necessaria per percepire la materia e il movimento minimo dei vertici. Sulle **card e sui testi** il wireframe aggiuntivo è invisibile a riposo. Si manifesta durante prossimità, touch, loading e scroll; torna poi invisibile. Le facce del fondo non diventano una texture grafica ad alto contrasto.

## 3. Indice delle sette tavole

| Tavola | Sequenza | Aspetto da leggere |
| --- | --- | --- |
| 01 / BACKGROUND | Quiete → prossimità → tensione → ritorno | Gerarchia vertex / edge / face, deformazione contenuta |
| 02 / TOUCH | Contatto → movimento → rilascio → dissipazione | Stesso campo del cursore; impulso che viaggia nella rete |
| 03 / LOADING | Nero → scia → reticolo → reveal → assestamento → pronto | Costruzione progressiva di testo e card contatto |
| 04 / CARD — versione corretta | Quiete → prossimità → hover → rilascio | Due card leggibili; campo condiviso; glow locale; tagli alto-sinistra e basso-destra |
| 05 / PARTICELLE | Innesco → repulsione → curl +/− → dissolvenza | Emitter sui vertici, frammenti minuti, micro-vortici |
| 06 / TESTO | Quiete → innesco → propagazione → ritorno | Fronte progressivo fra caratteri e righe, senza deformazione |
| 07 / SCROLL | Presente → doppio passaggio → continuità → nuovo assetto | Due fronti simultanei ai margini del viewport |

Per la tavola 04 usare l’ultima revisione mostrata: il bordo luminoso in alto a destra forma un angolo retto. Le fotografie nelle tavole servono a valutare leggibilità e luce; non sostituiscono le immagini del sito.

## 4. Invarianti visive

- Reticolo triangolare irregolare per dimensione, densità, orientamento e distribuzione. Niente griglia regolare perturbata appena, triangoli tutti uguali o tiling riconoscibile.
- Connettività stabile: muovere un vertice muove i suoi edge e modifica lo shading delle facce collegate. Non ridisegnare casualmente la rete a ogni frame.
- La forma delle card resta quella del progetto: taglio diagonale in alto a sinistra e in basso a destra; gli altri due angoli restano retti. Unica funzione geometrica condivisa da clip, bordo e glow.
- Deformare solo la membrana. Fotografie, oggetti, lettere, tracking, baseline e hit area restano stabili.
- Range ampio, irregolare e sfumato; nessun disco luminoso, anello, bordo di maschera o blob visibile che insegua il cursore.
- Glow intenso sul piccolo tratto di bordo vicino all’interazione, con spill morbido interno ed esterno. Il resto del perimetro conserva il suo stato ordinario.
- Il centro delle immagini riceve una frazione dell’effetto del bordo. Il copy piccolo rimane protetto.
- Il colore dell’immagine continua a seguire il comportamento già previsto dalla pagina. La prossimità può accendere gli edge senza attivare automaticamente il cambio colore dell’immagine.
- Particelle minute e occasionali; nessuna esplosione, neve, coriandoli, scia permanente o grande frammento tridimensionale.
- Tutti i ritorni sono progressivi. Nessun flicker, reset del layout o salto della mesh quando il puntatore si ferma.

### Colore

Riutilizzare i token attuali per fondo, testi e gradiente crema/ambra. Per la luce reattiva usare come punto di partenza `#FF7950`, con nucleo molto piccolo più chiaro e alone meno saturo. Il 90/10 è una gerarchia percettiva: la luce resta un accento, non una quota obbligatoria di pixel. Le tavole non sono una misura colorimetrica del sito.

## 5. Geometria, coordinate e input condivisi

### Un solo sistema per documento

Un `VfxEngine` gestisce clock, input, layout, campo, mesh e pool di particelle. I target registrano i propri dati; non creano listener e loop autonomi per ogni card o lettera.

L’integrazione deve avvenire nel documento che contiene i contenuti. Un overlay nel contenitore Framer non può leggere liberamente il DOM di iframe di un’altra origine. Ogni pagina incorporata ha quindi una propria istanza del sistema, con le stesse configurazioni. Non duplicare il fondo contemporaneamente nel contenitore e nell’embed. Un eventuale bridge `postMessage` deve usare origini esplicite e payload limitati a ciò che serve; non è necessario per la prima implementazione.

### Spazi di coordinate

| Spazio | Utilizzo |
| --- | --- |
| CSS pixel del viewport del documento | Eventi pointer, bordi visibili, posizione del canvas |
| CSS pixel del documento o scroller effettivo | Campo, celle e seed stabili durante lo scroll |
| Coordinate locali del target | Maschere, distanza dal bordo, clipping dei glifi |
| Pixel del framebuffer | Solo risoluzione di rendering; non influisce sul raggio del cursore |

Rilevare lo scroller reale: window, contenitore o libreria di scroll già presente. Per window, `pDocument = pClient + scrollOffset`; per contenitori usare la loro origine e il loro offset. Non sommare entrambi.

Le card trasformate in prospettiva richiedono la trasformazione locale → viewport già usata dallo slider. Per queste card un semplice bounding box non descrive il quadrilatero visibile: usare la matrice/proiezione del componente e la sua inversa, oppure un adattatore con quadrilatero proiettato. Il campo resta condiviso in viewport, la mesh della card viene campionata e ritagliata nel suo spazio locale.

### Mesh stabile e densità variabile

Generare punti con campionamento irregolare a distanza minima variabile, quindi triangolare. Il seed dipende da pagina, zona e identificatore stabile. Una mappa di densità lenta alterna regioni ampie e gruppi più minuti; la densità aggiuntiva vicino ai bordi e nella tipografia viene preparata al cambio di layout, non durante l’hover.

Ogni vertice conserva posizione a riposo, posizione corrente, velocità e vicini; ogni faccia conserva gli stessi tre ID. Costruire una tabella degli edge unici per non disegnarli due volte. Sulle pagine lunghe preparare zone vicino al viewport con bordi condivisi e cache; evitare di triangolare tutta la pagina a ogni scroll o di creare cuciture fra zone.

Le mesh locali di target trasformati e testo possono avere più dettaglio, ma campionano lo stesso campo di luce. Continuità percettiva non significa sovrapporre due wireframe differenti nello stesso punto: definire quale superficie possiede il pixel e sfumare la transizione.

### Campo non uniforme

Il campo deve restituire intensità scalare e vettore di spostamento. Usare una distanza anisotropa deformata da noise lento, più una modulazione a bassa frequenza. Esempio concettuale:

```text
q = A * (position - pointer) + warp(position, seed)
distance = length(q)
falloff = 1 - smoothstep(innerRadius, outerRadius, distance)
energy = clamp(pow(falloff, 1.4) * irregularGain(position), 0, 1)
```

`A` allunga moderatamente il campo; `warp` e `irregularGain` sono continui, con seed stabile. Non mostrare la distanza o il confine: renderizzare solo le geometrie che ereditano l’energia. Evitare noise temporale rapido che faccia tremare l’alpha. Non usare `Math.random()` nel render loop.

### Movimento

Somma di idle lentissimo e risposta elastica all’interazione. Gli edge seguono i vertici; lo shading usa le normali delle facce aggiornate, con contrasto ridotto. Ritorno smorzato, quasi critico. Clamp dello spostamento anche rispetto al più corto edge locale, così i triangoli non si ribaltano.

Il pannello UI e la foto non subiscono il displacement. La silhouette esterna e la geometria usata dalle maschere di reveal restano ancorate; si muovono soltanto i dettagli interni della membrana.

## 6. Mouse, touch e rilascio

Mouse, penna e touch alimentano lo stesso `InteractionField`. L’handler memorizza solo posizione, tipo, timestamp e stato; il lavoro visivo avviene nel frame successivo.

| Evento | Risposta |
| --- | --- |
| Mouse nel range | Energia locale crescente, elasticità lieve, risposta dei bordi vicini |
| Mouse fermo | Campo stabile; emissione particelle si esaurisce |
| Mouse fuori dal documento / finestra non attiva | Ritorno smorzato; nessun punto luminoso bloccato |
| Touch down | Attivazione locale equivalente al cursore, senza dipendere dalla pressione hardware |
| Touch move | Campo segue il dito finché il browser consegna gli eventi |
| Touch up | Un solo impulso smorzato parte dall’ultima posizione |
| Pointer cancel / gesto scroll acquisito dal browser | Pulizia del contatto, nessun hover bloccato; niente secondo impulso fittizio |

Preservare scroll, pinch zoom e click nativi. Il canvas ha `pointer-events: none`; non applicare `touch-action: none` all’intera pagina e non catturare i pointer soltanto per gli FX. Gestire il primo contatto come fonte principale; altri contatti non moltiplicano le emissioni.

### Impulso nel reticolo

Al rilascio calcolare il costo di propagazione dal vertice vicino al touch attraverso gli edge: lunghezza dell’edge moltiplicata per una variazione deterministica moderata. Una ricerca nel grafo limitata al range produce tempi d’arrivo diversi per ramo. Applicare a ciascun nodo un inviluppo breve e smorzato attorno al proprio tempo d’arrivo; interpolare la risposta sugli edge e assegnare alle facce una quota minore.

Il risultato deve viaggiare lungo percorsi irregolari con interruzioni e attenuazioni, lasciando scura la zona già attraversata. Non disegnare un cerchio o una sinusoide radiale continua. Limitare il numero di impulsi simultanei e cancellare quelli ormai esauriti.

## 7. Card, bordo e leggibilità

Il glow di prossimità si calcola sul perimetro reale, includendo i due tagli diagonali. Trovare il punto più vicino al pointer e diffondere l’intensità lungo una porzione di arco, con decadimento morbido. Le card confinanti rispondono allo stesso campo, anche se il cursore è nello spazio fra loro.

Per l’attenuazione interna usare la distanza dal bordo, non una maschera circolare centrata sulla card:

```text
edgeWeight = 1 - smoothstep(0, innerFadeWidth, distanceInsideBorder)
meshAlpha = fieldEnergy * mix(centerMultiplier, 1, edgeWeight)
```

Con `centerMultiplier = 0.12`, il centro mantiene il 12% dell’intensità del reticolo al bordo: non il 12% di opacità assoluta sopra l’immagine. Facce e bagliore interno hanno un ulteriore fattore riduttivo. Il copy piccolo ha una zona di protezione propria.

Separare tre contributi: linea nitida sul bordo, alone stretto interno, alone esterno più ampio e meno intenso. Il glow viene dalla geometria attivata. Una luce radiale generica sotto il cursore non soddisfa questa direzione.

Non tagliare lo spill esterno con `overflow: hidden`: ritagliare la superficie/immagine nel wrapper interno e renderizzare il bordo e il suo alone su un livello esterno. Il passaggio tra i due livelli deve restare allineato al pixel.

## 8. Particelle: repulsione e curl

Emitter sui vertici attivati. Il mouse è la sorgente di forza, non il punto da cui nasce una scia continua. Emettere in base alla distanza percorsa e all’attivazione di nuovi vertici, con un limite anche per secondo. Non emettere dal solo tempo trascorso con pointer fermo.

```text
outward = normalize(vertexPosition - pointerPosition)
initialVelocity = outward * repulsionSpeed + pointerVelocity * smallCarry
velocity += curl(noiseField, position, time) * curlStrength * dt
velocity *= exp(-drag * dt)
position += velocity * dt
alpha = shortFadeIn(age) * pow(1 - normalizedAge, 2)
```

Il contributo iniziale di repulsione deve rimanere dominante. Campo curl bidimensionale derivato da un potenziale noise: `curl(N) = (dN/dy, -dN/dx)`. Il campo contiene vortici nei due versi; eventuale variazione di verso viene assegnata al seed del frammento, non cambiata casualmente ogni frame.

Un frammento è un triangolino piccolo, con emissione moderata, leggera rotazione e nessuna scia lunga. Usare un pool preallocato. In caso di saturazione scartare nuove particelle secondarie, senza allocare oggetti aggiuntivi. Loading, hover e scroll condividono il budget totale.

## 9. Testo: propagazione senza deformazione

Conservare il testo HTML originale, semantica, selezione, line break e font. Il layer FX è decorativo e ritagliato nella maschera dei glifi. Non trasformare il titolo in una fotografia e non dividere in span ogni carattere se questo altera kerning o impaginazione.

Preparare la maschera dopo il caricamento del font e rifarla quando cambia il layout. Renderizzare righe complete con lo stesso shaping e gli stessi parametri tipografici; verificare l’allineamento con il testo DOM. Usare metriche DOM dei grafemi per assegnare tempi di propagazione, senza modificare il DOM visibile. Se l’allineamento non è affidabile, mantenere il testo pulito finché l’adattatore non è corretto.

All’ingresso nel range parte un fronte dal gruppo di caratteri più vicino. Si propaga in entrambe le direzioni della catena in ordine di lettura, attraversa spazi e a capo e raggiunge gradualmente l’intera frase. Il tratto vicino è più intenso; i caratteri lontani reagiscono dopo e con minore ampiezza. Ogni carattere torna pulito dopo il passaggio: l’intera frase non resta arancione contemporaneamente.

La distanza lungo la catena va misurata sulle metriche del testo, non sul solo indice del carattere. In presenza di due righe, collegare fine e inizio secondo l’ordine di lettura. Limitare a una propagazione dominante per titolo, con cooldown; muovere il cursore dentro lo stesso gruppo non deve accodare decine di onde.

Reticolo interno irregolare, bagliore leggero nella massa, glow esterno ottenuto dalla maschera del contorno. La rete interna può muoversi sotto una maschera ferma; la sagoma dei glifi non si muove. Anche al picco devono restare leggibili e stabili le controforme.

## 10. Loading: una sola costruzione

Usare un progresso continuo e deterministico, non sei animazioni indipendenti. Ogni cella riceve un ritardo spaziale derivato dalla direzione di reveal, dal suo centro e da un noise stabile di piccola ampiezza. La scia anticipa il fronte; i bordi si connettono; le facce rivelano porzioni reali del contenuto.

| Fase | Progresso indicativo | Risultato |
| --- | --- | --- |
| Nero | 0–0.05 | Nessun contenuto fantasma |
| Scia | 0.05–0.20 | Pochi vertici e triangolini guidano il percorso |
| Reticolo | 0.15–0.42 | Edge e silhouette emergono prima della materia |
| Reveal | 0.30–0.78 | Celle adiacenti rivelano contenuto con un fronte irregolare |
| Assestamento | 0.72–0.95 | Materia completa; wireframe e particelle decadono |
| Pronto | 0.95–1 | Contenuto nitido; FX aggiuntivi invisibili a riposo |

Le sovrapposizioni sono intenzionali. Direzione di riferimento: dal basso-sinistra verso alto-destra; prevedere una proprietà per target senza renderla casuale a ogni visita. Un fade uniforme dell’intera card con una rete sovrapposta non equivale al reveal richiesto.

La pagina deve restare utilizzabile se il sistema FX non parte. Preparare l’enhancement prima del primo paint utile, con watchdog che ripristina immediatamente il DOM se il bootstrap fallisce; se il contenuto è già stato mostrato, saltare l’intro senza riportarlo al nero. Non aspettare il caricamento dell’intero sito. Avviare sulle risorse visibili già disponibili; sotto la piega prepara le risorse in prossimità dell’ingresso. Nessuno schermo nero indefinito per un errore del font o di un’immagine.

L’intro avviene al primo ingresso della pagina. Un resize, il ritorno da una tab del browser o il ritorno indietro nella cronologia non devono azzerarla automaticamente.

## 11. Scroll: due fronti, geometria reversibile

Il centro del viewport è la zona di lettura stabile. Una fascia superiore dissolve gli elementi che escono, una fascia inferiore costruisce quelli che entrano. Le due risposte possono essere attive nello stesso frame su target diversi. Lo scroll non viene bloccato o trasformato in una sequenza di scatti.

### Driver geometrico

Definire `top` e `bottom` come limiti utili del viewport, tenendo conto delle UI persistenti. Per ogni cella calcolare la sua posizione effettiva in viewport, inclusi scroller e trasformazioni. Un driver iniziale possibile è:

```ts
// Specifica matematica: lo smoothstep standard ha limiti crescenti.
const clamp01 = (x: number) => Math.max(0, Math.min(1, x));
const smooth = (a: number, b: number, x: number) => {
  const t = clamp01((x - a) / (b - a));
  return t * t * (3 - 2 * t);
};

function cellVisibility(y: number, top: number, bottom: number,
                        bandTop: number, bandBottom: number) {
  return smooth(top, top + bandTop, y)
    * (1 - smooth(bottom - bandBottom, bottom, y));
}
```

Usare un piccolo offset spaziale deterministico per cella e una transizione anche all’interno della faccia per evitare scatti. Le celle che attraversano il bordo devono poter essere parzialmente rivelate; non trattare un elemento molto alto come un’unica opacity basata sul suo centro.

Dal driver ricavare inviluppi distinti per vertici, wireframe, facce e contenuto: all’ingresso i vertici anticipano gli edge e gli edge anticipano il contenuto; durante l’uscita la sequenza si inverte. Nella zona centrale l’alpha del contenuto è 1 e il wireframe di transizione è 0.

L’`IntersectionObserver` serve a preparare e sospendere i target. Il reveal continuo si aggiorna con la posizione reale nel loop, non con soli eventi enter/leave o callback a soglia.

### Reverse, stop e salto

- Invertendo lo scroll si attraversa la stessa funzione con lo stesso seed: le stesse celle si ricompongono, senza rigenerare mesh o ordinamento.
- Fermando lo scroll si ferma il progresso del contenuto. Un’eventuale piccola inerzia del campo non continua a far sparire le card.
- Un salto a un’ancora, PageDown o un ripristino della posizione applica direttamente il nuovo stato. Non riprodurre tutte le emissioni intermedie.
- Gli elementi nell’area di lettura centrale restano completamente visibili. Un target focalizzato da tastiera viene reso subito leggibile, senza dipendere dalla maschera animata.
- Le particelle decorative hanno vita breve e possono spegnersi anche a scroll fermo. La reversibilità obbligatoria riguarda celle, maschere e contenuto; non richiede di riavvolgere la simulazione temporale delle particelle.

### Composizione degli effetti

Loading e scroll non sono due proprietari concorrenti dell’opacity. Calcolare una sola maschera finale per faccia: `visibility = min(loadingVisibility, scrollVisibility)`. Il campo hover non può rendere visibile una cella che questa maschera nasconde. Il filo di transizione e le particelle possono precedere di poco il contenuto, entro la fascia attiva. Budget e luminosità sono limitati dopo la combinazione, non sommati senza limite.

## 12. Rendering e architettura del codice

### Percorso consigliato

Un canvas WebGL trasparente per documento per membrana, face shading, edge, nodi, glow e particelle. Il DOM continua a disegnare fotografie, testo, link e controlli. Il canvas sta sopra le superfici che deve decorare e sotto menu, modali e indicatori di focus. Il pass di fondo esclude le superfici dei target; il pass locale usa la loro maschera e attenuazione. Nessun overlay cattura input.

Il reveal delle immagini deve modificare davvero la visibilità del contenuto DOM. Primo adattatore: maschere SVG triangolari locali riferite dal CSS, generate dalla stessa geometria e guidate dallo stesso progresso. Specificare esplicitamente modalità alpha: area trasparente fuori dalle celle, celle bianche con alpha variabile; un rettangolo nero opaco in una maschera alpha non nasconde nulla. Non creare una PNG o un data URL per ogni frame.

Limitare aggiornamenti delle maschere ai target in transizione e alle celle che cambiano; se il costo supera il budget, usare un adattatore per media renderizzati direttamente da texture nel renderer, mantenendo testo e semantica DOM. Questa sostituzione è una scelta da validare sul prototipo, non una seconda pipeline da implementare subito.

Non acquisire screenshot del DOM per usarli come texture. Le immagini e i video, se portati nel renderer, devono provenire dagli asset originali con gestione corretta di caricamento e CORS. Il reveal di iframe esterni o componenti non controllabili deve usare il fallback, senza fingere accesso al loro contenuto.

Quando un target è completamente presente, rimuovere o bypassare la maschera di reveal: niente seam, tracce triangolari o ricampionamento continuo sulle immagini a riposo. Al ritorno nella fascia di transizione riattivarla con lo stesso stato, senza flash.

### Moduli e responsabilità

| Modulo | Responsabilità unica |
| --- | --- |
| `config.ts` | Token, preset, soglie, limiti e feature flag |
| `engine/VfxEngine.ts` | Lifecycle, un solo RAF, orchestrazione, dispose |
| `input/PointerController.ts` | Input normalizzato, velocità, contatto/cancel |
| `layout/TargetRegistry.ts` | Target, scroller, coordinate, invalidazione layout |
| `layout/TransformAdapter.ts` | Mapping di card trasformate e prospettiche |
| `mesh/MeshBuilder.ts` | Seed, punti, triangoli, edge unici, densità |
| `mesh/MeshDynamics.ts` | Idle, risposta elastica, limiti di deformazione |
| `field/InteractionField.ts` | Range irregolare e campionamento condiviso |
| `field/TouchImpulse.ts` | Propagazione smorzata nel grafo |
| `reveal/RevealController.ts` | Driver loading/scroll e composizione finale |
| `reveal/DomMaskAdapter.ts` | Maschere reali del contenuto, attach/detach |
| `text/TextSurface.ts` | Maschera glifi, metriche e ordine di lettura |
| `text/TextPropagation.ts` | Fronte, ampiezza, cooldown e ritorno |
| `particles/TrianglePool.ts` | Emissione, riuso, lifespan e budget globale |
| `render/VfxRenderer.ts` | Pass, clipping, blend e qualità adattiva |

Adattare i nomi alla struttura del repository. Non introdurre tutte queste classi se un modulo puro risolve la stessa responsabilità: la separazione deve essere funzionale, non burocratica.

### Contratto minimo dei target

```ts
type SurfaceKind = 'card' | 'text' | 'background';

interface VfxTargetConfig {
  id: string;                  // stabile, non l'indice di un array riordinabile
  kind: SurfaceKind;
  element: HTMLElement;
  contentElement?: HTMLElement;
  reveal: 'load-and-scroll' | 'scroll' | 'none';
  centerMultiplier?: number;
  protectText?: boolean;
}

interface VfxEngineApi {
  register(config: VfxTargetConfig): () => void;
  invalidateLayout(targetId?: string): void;
  setEnabled(enabled: boolean): void;
  dispose(): void;
}
```

Il framework esistente registra i target al mount e li rimuove all’unmount. Se il progetto usa React, evitare `setState` a ogni frame e verificare mount/unmount anche in Strict Mode. Riutilizzare dipendenze e versioni già presenti; non migrare React, Three o l’intero stack solo per gli FX.

### Ordine di un frame

1. Leggere input e scroll memorizzati, applicare invalidazioni di layout necessarie.
2. Risolvere target visibili e coordinate, con letture DOM raggruppate.
3. Calcolare driver di reveal e campo condiviso.
4. Aggiornare dinamica mesh, impulsi, propagazione e pool.
5. Aggiornare solo le maschere cambiate; eseguire scritture DOM dopo le letture.
6. Renderizzare pass raggruppati; rilevare il costo e adattare la qualità con isteresi.

Nessuna ricostruzione di geometrie, texture, listener o materiali nel frame loop. Nessun `getBoundingClientRect()` indiscriminato su tutto il catalogo a ogni pointermove.

## 13. Parametri iniziali da calibrare

Valori di progetto in CSS pixel e millisecondi, non misure già validate. Su mobile preservare il carattere dell’effetto riducendo densità e costo; non ingrandire automaticamente glow e triangoli.

| Parametro | Desktop iniziale | Mobile iniziale |
| --- | --- | --- |
| Raggio esterno del campo | 260 px, range 220–360 | 170 px, range 140–220 |
| Variazione spaziale del range | ±20–30% morbida | ±20–30% morbida |
| Idle dei vertici | 0.4–1.4 px; periodi 7–15 s | 0.3–0.8 px; periodi 8–16 s |
| Spostamento da interazione | 3–6 px; massimo 8 | 2–3 px; massimo 4 |
| Limite relativo displacement | ≤7% dell’edge minimo locale | ≤7% dell’edge minimo locale |
| Alpha edge neutro del fondo | 0.02–0.05 | 0.015–0.035 |
| Alpha massimo edge reattivo | 0.22–0.42, solo vicino al pointer | 0.18–0.32 |
| Alpha tinta delle facce | 0.015–0.045 | 0.01–0.03 |
| Spessore edge | 0.55–0.9 px con antialias | 0.6–0.9 px |
| Diametro nodo visibile | 0.8–1.6 px | 0.8–1.3 px |
| Moltiplicatore centro card | 0.12 | 0.08–0.12 |
| Fascia interna di attenuazione | 18–24% del lato corto | 18–24% del lato corto |
| Glow bordo: core / alone | 1 px / 8–18 px | 1 px / 6–12 px |
| Attacco / rilascio hover | 100–160 / 450–700 ms | 100–160 / 400–650 ms |
| Durata impulso touch | — | 650–1000 ms, massimo 2 impulsi |
| Lato dei triangolini | 1.5–3.5 px | 1.2–2.8 px |
| Vita particelle | 250–650 ms | 220–500 ms |
| Velocità iniziale repulsione | 25–65 px/s | 20–45 px/s |
| Pool massimo totale | 80 frammenti | 28 frammenti |
| Emissione hover massima | 18/s, circa 1 ogni 20–35 px percorsi | 8/s, circa 1 ogni 25–45 px |
| Propagazione testo completa | 650–1100 ms | 550–900 ms |
| Cooldown propagazione testo | 700 ms | 700 ms |
| Loading complessivo | 1600–2000 ms | 1200–1600 ms |
| Fasce scroll | 16–20% dell’altezza utile | 14–18% dell’altezza utile |
| DPR massimo del canvas FX | 1.5 | 1–1.25 |

Il picco di luce sul bordo può superare l’alpha degli edge della rete perché è un contributo differente e occupa pochissima area. Non aumentare tutti i valori insieme per far “vedere di più” l’effetto: prima correggere scala, gerarchia e zone di attivazione.

## 14. Performance, accessibilità e fallback

**Obiettivo da verificare:** fluidità a 60 fps sui dispositivi target, senza attribuirla alle tavole statiche. Budget iniziale desiderato degli FX: circa 2–4 ms/frame sul dispositivo di riferimento desktop; definire e registrare anche un dispositivo mobile reale. Non confondere il tempo CPU del RAF con il tempo GPU o la fluidità percepita.

Come punto di partenza, mantenere la mesh di fondo visibile nell’ordine di alcune centinaia di vertici, con dettaglio locale limitato; profilare prima di aumentare. Raggruppare draw call e particelle, riutilizzare buffer, contenere overdraw e area del glow. Non applicare un bloom pesante a schermo intero.

Riduzione progressiva con isteresi: prima meno particelle, poi DPR/risoluzione degli aloni, poi densità secondaria, infine dinamica ridotta. Cambiare qualità quando la scena è quieta o usare una transizione, così non compare un nuovo reticolo sotto il cursore. Non rigenerare continuamente seed o topologia per inseguire ogni variazione di frame time.

Gestire tab nascosta, route change, resize, font caricati, cambio orientamento, uscita del pointer e perdita del contesto WebGL. `dispose()` rimuove RAF, listener, observer, maschere e risorse GPU; il contenuto DOM torna immediatamente visibile.

Con `prefers-reduced-motion`: niente displacement, scie, impulsi mobili o dissolvenza scroll. Contenuto interamente leggibile e al massimo variazione locale di luce con breve fade. Con WebGL o maschere non disponibili: pagina integra e statica, con eventuale hover CSS semplice. La perdita di un effetto non deve diventare perdita del contenuto.

Decorazioni `aria-hidden`, nessun focus sul canvas, link e pulsanti originali intatti. Focus visibile e contenuto focalizzato sempre rivelato; menu, form, modali e piccoli testi funzionali esclusi dalla dissolvenza. Il pinch zoom del dispositivo deve continuare a funzionare.

## 15. Piano di implementazione e verifica

### Sequenza di sviluppo

1. Individuare il documento responsabile degli FX, lo scroller e gli effetti già presenti. Rimuovere o disattivare solo le implementazioni sostituite, senza sommare due sistemi.
2. Preparare una scena di confronto con una porzione di fondo, due card vere e il titolo Start; nessun asset segnaposto nel confronto finale.
3. Approvare in codice la sola quiete: valori neri, trama, nitidezza e geometria dei tagli.
4. Implementare campo condiviso, bordi e attenuazione centrale; aggiungere touch e cancel.
5. Aggiungere pool triangoli e propagazione del testo con budget rigidi.
6. Implementare maschera vera di loading e driver continuo di scroll, verificando il reverse.
7. Integrare sulle pagine reali, profilare, applicare fallback e verificare lo smontaggio.

### Criteri di accettazione

| Verifica | Esito richiesto |
| --- | --- |
| Quiete per 10 secondi | Nessuna emissione persistente; fondo appena presente; immagini e titoli puliti |
| Cursore nello spazio fra due card | Entrambi i bordi più vicini reagiscono con intensità proporzionata |
| Cursore al centro della foto | Soggetto e testo leggibili, trama molto meno evidente che al bordo |
| Cursore sul bordo | Glow nitido locale con spill, perimetro lontano neutro |
| Angoli card | Solo alto-sinistra e basso-destra tagliati; gli altri retti in tutti gli stati |
| Connettività | Vertice, edge e faccia si muovono in relazione; nessun popping o triangolo ribaltato |
| Pointer fermo | Il campo si stabilizza; l’emitter smette di produrre |
| Touch down / move / up | Segue il dito; un impulso al rilascio; ritorno entro il tempo previsto |
| Scroll mobile / pointercancel | Scroll nativo libero; nessun contatto incastrato |
| Propagazione testo | Fronte attraversa la catena e gli a capo; silhouette, spaziatura e contrasto restano stabili |
| Loading fermato a progressi intermedi | Scia, rete e porzioni di contenuto distinguibili; non un semplice fade globale |
| Scroll fermato in fascia | Il contenuto conserva il progresso; le particelle possono esaurirsi |
| Scroll avanti e indietro | Stesse celle e stessa maschera alla stessa posizione, a parità di layout |
| Uscita sopra + ingresso sotto | Entrambi i fronti attivi contemporaneamente; zona centrale pulita |
| Scroll rapido / ancora / cronologia | Nessun replay tardivo; stato coerente con la posizione raggiunta |
| Desktop, tablet e mobile | Assenza di cuciture, overflow e blur sulle immagini a riposo |
| Tastiera, reduced motion e assenza WebGL | Navigazione e contenuti completi |
| Route change / mount ripetuti | Un solo loop per documento; nessuna crescita continua di listener o memoria |

Per la reversibilità usare una modalità debug che congela idle e particelle, mostra ID delle celle e consente di fissare scroll e progresso loading. Il confronto automatico deve misurare la maschera deterministica, non l’intero frame con particelle temporali. La modalità debug resta fuori dal prodotto pubblico.

Verificare almeno Chrome, Firefox e Safari nelle versioni effettivamente target, con particolare attenzione alle maschere SVG e ai font; riportare versioni e dispositivo usati. Per le formule pure sono utili controlli su limiti, continuità, reverse e combinazione dei driver. Le verifiche estetiche richiedono anche confronto visivo con le tavole: un test numerico non certifica la qualità del glow.

### Consegna attesa dallo sviluppatore

Codice integrato, configurazione unica, asset reali, breve nota su moduli modificati, registrazione di hover/touch/loading/scroll e misure su dispositivi dichiarati. Indicare esplicitamente eventuali fallback o differenze residue. Non dichiarare raggiunti i 60 fps senza una misura sul prodotto implementato.

## 16. Riferimenti tecnici consultati

Queste fonti documentano le primitive della piattaforma; architettura, intervalli e look descritti sopra sono scelte di progetto.

- [MDN — Pointer events](https://developer.mozilla.org/en-US/docs/Web/API/Pointer_events): eventi comuni ai dispositivi, cancel e relazione con i gesti nativi.
- [MDN — Intersection Observer](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API): osservazione delle intersezioni; non sostituisce un driver esatto per pixel.
- [MDN — mask-image](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/mask-image): riferimento a maschere SVG e distinzione fra alpha e luminanza.
- [MDN — WebGL best practices](https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API/WebGL_best_practices): raggruppamento dei draw call e contenimento del framebuffer.

## Appendice — Prompt visivi utilizzati

Questa appendice serve a riprodurre la direzione delle tavole. Per implementare il codice valgono le sezioni 1–15, non eventuali dettagli decorativi dei mockup.

### Base comune

```text
Use case: ui-mockup. Redesign the supplied VFX art-direction reference into a NEW, more refined and coherent Memento Design Studio storyboard, not a slight restyling. Landscape 3:2 art board, high resolution. Premium editorial Swiss grid; black #070708 canvas, very generous clean margins, ivory Inter-like type, tiny tracked MEMENTO wordmark top left, small coral divider, title in upper band. Only the short Italian labels explicitly requested. Thin dark grey panel rules, no distracting background graphics outside the panels. Site visual DNA observed: large lightweight sans typography, warm cream-to-amber title accent, near-black photographic cards with only top-left and bottom-right corners chamfered, charcoal architecture and restrained amber light, much empty space. Reactive highlights are warm coral #FF7950 with pale cores, extremely local. Keep >90% of every panel neutral black/charcoal. Subtle continuous triangulated membrane, irregular triangle sizes and density, some large empty cells and small clustered cells, hairline edges, pinprick vertices. Shallow silky shading changes per face, never a mountainous landscape, crumpled paper, glowing net or bright polygon wallpaper. No visible circular spotlight, circular activation radius, concentric rings, scanlines, holograms, oversized fragments or thick neon outlines. Consistent geometry and identical framing across sequence states. This is a visual mood/storyboard concept, not a technical diagram.
```

### Tavola 01

Riferimento allegato: Triangulated membrane in quiet motion(1).png

```text
Board title verbatim: "01 / BACKGROUND". Subtitle: "Vertici, edge, facce."
Redesign as a clean 2-by-2 sequence of 4 equally sized wide close-up panels. No devices or cards: ONLY the same flat, shallow triangulated charcoal membrane in every panel. Mesh should look delicately embedded into the black UI, with varied connectivity, calm aesthetic. Top-left label "01  QUIETE": barely visible irregular edges and microscopic ivory vertices, shallow faceted shading, center almost black. Top-right "02  PROSSIMITÀ": small white cursor slightly right of center; an elongated asymmetric irregular group of nearby vertices and edges emits delicate coral, face tint is much weaker than edge light, fade is irregular and feathered. Bottom-left "03  TENSIONE": cursor moves a small amount; exactly the same topology bends subtly following moved vertices, mild connected shading change, no spikes, no dramatic deformation. Bottom-right "04  RITORNO": cursor gone; the same surface returns nearly to first panel, no persistent orange.
At bottom add a spacious slim detail strip with 3 tiny isolated visual samples and labels: "VERTEX" (one tiny light point), "EDGE" (one hairline connection), "FACE" (one nearly-black triangular tonal plane). Footer sentence: "La luce emerge dalla rete. Il movimento resta minimo."
Important refinement versus input: darker, less faceted relief, fewer bright dots, less orange spread, varied scale, clearer graphic hierarchy.
```

### Tavola 02

Riferimento allegato: Touch impulse across a living mesh(1).png

```text
Board title verbatim: "02 / TOUCH". Subtitle: "Contatto, impulso, quiete."
Four tall portrait mobile viewport panels evenly spaced in one row, identical geometry throughout. Each panel is a stylized webpage crop, NOT hardware phone mockups: small MEMENTO wordmark, white "Servizi di design." heading, two small photographic cards (laptop and black table lamp) in upper middle, the rest charcoal membrane. Use same card shapes and same images in all four. Show membrane subtle around layout and attenuated heavily over image centers.
Panel label under each: "01  CONTATTO", "02  MOVIMENTO", "03  RILASCIO", "04  DISSIPAZIONE".
01: tiny off-white touch marker in lower-left empty margin; small asymmetric patch of coral nodes/edges illuminates nearby.
02: marker has moved gently up and to the right, irregular light follows, deformation is only subtle; keep old location dark.
03: touch marker now absent; light has travelled outward into a few disconnected uneven network branches above and right, inner original contact zone already dark; never draw a circular wave or ring. A few 1–2 pixel triangular sparks, not a shower.
04: nearly neutral black again with faint background network, photos remain legible in all stages.
No pressure-sensitivity graphic, no bright full screen. Footer sentence: "Al rilascio, l’energia percorre gli edge e si spegne."
Redesign reference so behavior is shown inside the real site language, with huge breathing room and much subtler light.
```

### Tavola 03

Riferimento allegato: From black to matter(1).png

```text
Board title verbatim: "03 / LOADING". Subtitle: "Dal nero alla materia."
Six equally sized panels in 3 columns and 2 rows. Same layout and camera in all six: actual Start-style site hero, a centered small MEMENTO wordmark, oversized typography on two lines "LET’S WORK" and "TOGETHER", below it two black photographic contact cards with top-left/bottom-right chamfers: left a dark open envelope, right a charcoal laptop with envelope icon. Small labels "Scrivici" and "Parliamone". Do not use service laptop/vetrina pair under Start heading.
Labels above panels: "01  NERO", "02  SCIA", "03  RETICOLO", "04  REVEAL", "05  ASSESTAMENTO", "06  PRONTO".
01 absolutely pure black inside frame, no ghost content.
02 only a delicate diagonal sparse streak of tiny coral triangles and 5–8 connected vertices starting lower left, no content yet.
03 the streak has assembled a fine irregular triangular scaffold clipped into the letter shapes and card boundaries; actual content only 5–10% visible.
04 a clearly spatial progressive front from bottom left toward upper right: some irregular cells contain fully revealed white/cream letters and photographic fragments, other cells still wireframe, unrevealed region remains black. Show true progressive construction, not merely a uniformly transparent picture.
05 all content almost formed, a few fine residual edges at upper-right reveal front, diminishing glow.
06 completely sharp fully formed website hero, "LET’S WORK" ivory and "TOGETHER" warm cream/amber, clean contact images, no obvious wireframe over content and no particles.
Footer: "La scia costruisce la rete. Le facce rivelano il contenuto."
Large restrained type, stable glyph silhouettes, photoreal images, clean margins, unambiguous six-stage change.
```

### Tavola 04

Riferimento allegato: Grayscale hover with warm edge glow(1).png

```text
Board title: "04 / CARD". Subtitle: "Un campo condiviso, immagini leggibili."
2 by 2 sequence, spacious panels, SAME crop of the Services catalog in each. In every panel small heading "Servizi di design.", under it two horizontal neighboring cards: left "Sito web" with charcoal laptop and photoreal lounge chair on its screen, right "Landing page" with black laptop showing a table lamp. Correct realistic device proportions. Both image areas mostly grayscale with very restrained original amber accents, never orange washed. Cards top-left/bottom-right corner cuts only, thin grey contour. No broad luminous rectangle or expanded warm frame.
Labels: "01  QUIETE", "02  PROSSIMITÀ", "03  HOVER", "04  RILASCIO".
01 quiet near-black background, content completely clean, no visible mesh inside the cards.
02 a tiny white cursor in the narrow gap between the two cards near upper half: irregular sparse network appears across the gap and touches BOTH nearest card edges, finely illuminated nodes, faint uneven face tint. Opposite far edges stay grey. This demonstrates shared proximity before actually entering the card.
03 cursor just inside upper-right edge of left card, strong but thin 1px pale coral hot spot following only 15% of its perimeter around the corner. Tiny realistic soft spill both inward and outward. Glow feathers asymmetrically over nearby external mesh, one or two tiny triangular sparks. Inner mesh almost vanishes towards laptop center (about 12% of the edge mesh opacity), labels are protected and crisp. Right adjacent edge reacts more weakly. Body of the laptop and page retain contrast.
04 cursor leaves to the far right, light and mesh have decayed, restores exact quiet scene.
Footer: "Più energia sul bordo. Reticolo attenuato al centro."
Important redesign: show cross-card continuity and local glow instead of a bright complete frame. Images remain clean, subtle face shading, no circle.
```

### Tavola 05

Riferimento allegato: Particle repulsion and micro-vortices(1).png

```text
Board title: "05 / PARTICELLE". Subtitle: "Repulsione e micro-vortici."
2 by 2 sequence of magnified tiny irregular triangular particle behavior over the SAME shallow charcoal triangulated membrane. This is a close-up detail, extremely clean and sparse, lots of black space, no device photos.
Labels: "01  INNESCO", "02  REPULSIONE", "03  CURL + / −", "04  DISSOLVENZA".
01 tiny white mouse cursor right of a small lit vertex, two neighbouring vertices softly glowing. No particles at rest.
02 cursor has moved rightward a little, just 7 tiny thin triangular fragments newly emitted from lit vertices move AWAY from the cursor, mostly left and diagonally outward. Each fragment tiny with slight glow; never big shattered polygons or fire sparks.
03 the same few triangular fragments travel on two small opposing curved paths, one clockwise, one counterclockwise. Use the fragment orientations and spacing to suggest curves; at most extremely faint short motion wisps, absolutely no visible spirals drawn across the panel. Hot vertices decay.
04 just one almost invisible fragment remains, rest mesh restored. All panels same geometry, faint hairline edges. Vertex positions very subtly displaced, not spikes.
Bottom detail strip: three visual samples of a triangular fragment decreasing in size and luminosity with labels "NASCITA", "DERIVA", "FINE".
Footer: "Emissione leggera. Vita breve. Nessun accumulo."
Much less grain, much less light, finer fragments than supplied reference. Highlight micro scale and lifetime.
```

### Tavola 06

Riferimento allegato: Coral Letterforms with Organic Mesh Glow(1).png

```text
Board title: "06 / TESTO". Subtitle: "La luce attraversa la frase."
Four equal large wide panels in a 2 by 2 grid. Each displays exactly the same Start hero title with identical type, size, tracking, baseline and placement, on two lines: "LET’S WORK" above "TOGETHER". Upper line ivory, bottom line subtle cream-to-amber gradient like mementostudio.it. No cards. Large generous panels with immaculate thin Inter-like typography. Shapes of glyphs MUST be completely unaltered in every panel, no holes, melt, cracks, jitter, displacement, or stroke changes.
Labels: "01  QUIETE", "02  INNESCO", "03  PROPAGAZIONE", "04  RITORNO".
01 perfectly clean solid letterforms.
02 tiny cursor by the R of WORK; irregular fine triangular mesh visible INSIDE the R and its neighboring O,K; restrained glowing coral letter edges and gentle inner warmth, rest title normal.
03 cursor has left but a moving illumination front now crosses the LOWER line at "GET"; earlier letters in LET'S WORK and TO are already mostly restored. Gentle faint residual mesh on other letters conveys a sequential chain, but never light the whole sentence equally at once. Brightest only G,E,T, smoothly decreasing across H,E,R. Mesh consists of genuinely different triangle sizes and orientations, clipped within glyphs, small faceted tone differences within fill. A maximum of three microscopic triangular sparks just outside active letters. Exterior glow is narrow and tasteful. Text remains crisp, solid and legible.
04 restores exact original quiet type and cream gradient, no outline remnant.
Footer: "Mesh nei glifi. Glow sul contorno. Sagoma immobile."
Critical redesign versus reference: actual two-line website hierarchy, travelling front instead of uniform orange sentence; no deformed letter shapes; stronger crispness, refined low energy.
```

### Tavola 07

Riferimento allegato: Scroll-driven card dissolve and reconstruction(1).png

```text
Board title: "07 / SCROLL". Subtitle: "Sopra si dissolve. Sotto prende forma."
Four equally sized PORTRAIT viewport panels side by side with small fixed top and bottom grey viewport borders. A clean catalog excerpt with TWO COLUMNS of chamfered photographic cards moves upward across these four sequential page positions. Same card images, positions relative to document and dimensions throughout; all scroll upward, never swap or morph assets. Neutral black viewport, no fake browser chrome.
Cards row A: laptop "Sito web", phone "Vetrina digitale". Row B: tablet "Catalogo online", black wristwatch "Esperienza digitale". Row C: tablet with lamp "Showroom", phone with chair "Realtà aumentata".
Under panels labels: "01  PRESENTE", "02  DOPPIO PASSAGGIO", "03  CONTINUITÀ", "04  NUOVO ASSETTO".
Panel01: row A complete middle/top, row B only beginning to form from fine wireframe and sparse tiny triangles in bottom 18% viewport band.
Panel02: document has moved UP: upper portions of row A reach top 18% viewport band and progressively become irregular triangular holes showing true black with a thin skeletal wireframe at moving boundary; lower part of row A still complete. Row B now fully photographic in central safe band. Row C begins as subtle wireframe and a few disconnected photo cells at bottom. Show simultaneous top dissolution AND bottom reveal.
Panel03: document moved further UP, row A absent except a few faint fragments exiting top; row B begins dissolution on its upper side at top band; row C more than half revealed from above as it moves upward into viewport. Solid image portions retain shape and contrast. Sparse coral particles only at the moving construction/dissolution boundaries.
Panel04: row B mostly above viewport, row C complete and clean in center. No residual mesh on stable content.
Below panels one understated horizontal footer sentence: "Il gesto controlla il reveal. Invertendo lo scroll, si ricompongono le stesse celle."
At far bottom small note: "Fotogrammi concettuali · stessa geometria in entrata e in uscita"
This is a visual interaction storyboard, not an exact engineering graph. Do not draw giant glow outlines, circular clouds, arbitrary scattered entire photographs. Important: real missing triangular portions along the active boundary, not merely overlaying a complete faded card. Strong clean visibility in central viewport zone.
```

### Correzione finale della tavola 04

Conservare impaginazione, testi, fotografie, cursori e luce. Correggere soltanto i contorni delle otto card interne: tagli diagonali in alto a sinistra e in basso a destra; alto a destra e basso a sinistra a 90°. Nel pannello Hover il glow segue l’angolo retto in alto a destra. Questa revisione sostituisce la prima versione della tavola 04.


