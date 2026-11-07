# MEMENTO START — VFX MASTER / R4

**Data:** 7 novembre 2026  
**Pagina di riferimento:** https://mementostudio.it/start  
**Ambito:** background, tab/card, immagini, testi, icone, prossimità, mouse, touch, particelle, loading e scroll.  
**Stato:** specifica consolidata per lo sviluppo. Le anteprime sono concept statici: non attestano codice implementato, animazioni funzionanti o prestazioni misurate.

> Un campo di interazione condiviso governa superfici con geometrie indipendenti. Il fondo è monocromo; la tab possiede un reticolo più fine; testo e icona della tab possiedono micro-reticoli propri. L’ambra nasce dall’interazione. L’immagine della tab attiva si illumina e acquista colore.

## 0. Come usare questo documento

Questa revisione raccoglie il brief iniziale e le correzioni successive della conversazione. Per Start sostituisce le indicazioni incompatibili del precedente **MEMENTO_VFX_CLEAN_HANDOFF_R3.md**.

- **D — Decisione:** requisito visivo o funzionale espresso e consolidato nella conversazione.
- **P — Proposta tecnica:** soluzione di implementazione o valore iniziale da calibrare, senza cambiare la decisione visiva.
- **V — Verifica:** condizione da controllare sul prototipo e sulla pagina integrata.

Ordine di precedenza: ultime correzioni dell’utente → decisioni D di questo documento → contenuti e geometrie reali del progetto → tavole illustrative → parametri P. I valori numerici non sono misurazioni ricavate dalle immagini.

Gli asset e il DOM del progetto sono la fonte dei contenuti. Le imprecisioni delle immagini generate non autorizzano modifiche a email, telefono, copy, icone, proporzioni, mappe, spaziature o navigazione. Non integrare un’immagine della pagina generata come sostituto del sito.

### 0.1 Correzioni che prevalgono sulle versioni precedenti

| Tema | Decisione attuale | Interpretazione superata |
| --- | --- | --- |
| Fondo | Monocromo a riposo; ambra soltanto nel range attivo e nel suo breve decadimento | Nodi e rami ambra distribuiti permanentemente su tutta la pagina |
| Bordi del viewport | Alcuni tratti più percepibili, con addensamenti, grandi celle e vuoti asimmetrici | Due tende laterali simmetriche o una cornice poligonale uniforme |
| Layer delle tab | Reticolo autonomo, molto più fine del fondo, soprattutto vicino al bordo | Grandi triangoli del background che attraversano la card |
| Centro della tab | Hover presente, attenuato ma non azzerato | Centro completamente escluso dall’interazione |
| Testo prioritario | Etichetta/testo **dentro la tab**, ad esempio `info@mementostudio.it` | Usare l’headline sopra la tab come principale dimostrazione del testo reattivo |
| Titoli sopra | Reazione lieve e soltanto se raggiunti dal campo | Accensione forte e automatica di “TOGETHER” quando si entra in una card |
| Icone | Reticolo fine anche nell’icona, con forma riconoscibile | Icona esclusa dall’effetto o trasformata in un bagliore indistinto |
| Immagine | Durante hover/touch attivo si illumina e acquista il colore dell’asset originale | Foto sempre monocroma o semplice reticolo sovrapposto senza risposta dell’immagine |
| Vertici | Piccoli e poco luminosi | Stelle, lens flare, punti bianchi dominanti |
| Geometrie | Si deforma leggermente la membrana | Deformare lettere, immagini, pannelli o hit area |
| Continuità | Stesso input e luce coerente, topologie separate | Una singola triangolazione che passa materialmente fra fondo, card e testo |

## 1. Direzione visiva e invarianti — D

Memento rimane premium, minimale e cinematografico: nero/carbone, tipografia Inter del progetto, immagini scure leggibili, crema/ambra nei token esistenti. La regola 90/10 descrive la gerarchia visiva, non una percentuale obbligatoria di pixel.

1. La struttura è **vertex → edge → face**: punti connessi, segmenti sottili e facce con differenze di shading lievi.
2. Irregolarità simultanea di dimensione, densità, orientamento, disposizione, intensità e dissolvenza. Non basta spostare appena i nodi di una griglia uniforme.
3. La topologia resta stabile. Gli edge seguono i vertici; le facce cambiano shading in relazione alla geometria.
4. Il movimento è minimo, lento e gradevole. Il contenuto non oscilla insieme alla rete.
5. Il range è ampio, non uniforme e sfumato. Non deve apparire un cerchio, un anello, una macchia opaca o il bordo di una maschera.
6. Card con taglio diagonale **alto-sinistra / basso-destra**. Alto-destra e basso-sinistra restano retti.
7. Il glow più leggibile appartiene a un tratto locale del bordo. I nodi non sono la sorgente visiva dominante.
8. Immagine, testo e icona conservano la forma originale. Il testo resta pieno e leggibile.
9. Le particelle sono triangolini minuti, occasionali e di breve durata; non diventano l’effetto principale.
10. A fine interazione la pagina torna gradualmente al suo stato ordinario, senza tremolii o residui caldi bloccati.

Non aggiungere gradienti neri a tutto schermo per nascondere il reticolo. Usare l’alpha delle geometrie e le maschere locali; conservare l’overlay navbar esistente. Il trattamento VFX non deve introdurre banding o modificare il layout.

## 2. Superfici e gerarchia — D

I layer sono **logicamente separati**. Questo non richiede un canvas, un renderer o un loop per ogni layer.

| Superficie | Geometria | Quiete | Nel range |
| --- | --- | --- | --- |
| Background | Rete ampia, rada in alcune zone e addensata in altre | Monocroma e tenue, percepibile in alcuni margini | Ambra locale, lieve deformazione e shading |
| Tab/card | Rete locale indipendente, più fine al perimetro | FX aggiuntivo invisibile; bordo originale conservato | Microcelle al bordo, rete attenuata anche all’interno, edge glow |
| Etichetta nella tab | Micro-reticolo ritagliato nei glifi | Testo originale pieno e pulito | Facce/edge interni, luce ambra, passaggio graduale lungo il testo |
| Icona nella tab | Maschera propria, geometria minuta | Simbolo originale | Reticolo nella forma e luce coerente con il testo |
| Immagine della tab | Asset originale e trattamento colore/luminanza | Stato monocromo/scuro previsto dal progetto | Immagine più luminosa e a colori; overlay fine tenue |
| Titolo esterno | Maschera dei glifi indipendente | Gradiente/colore originale | Effetto secondario e debole, solo entro il range |
| Particelle | Piccoli triangoli emessi dai vertici attivati | Nessuna emissione continua | Repulsione, curl nei due versi e dissolvenza |

**Gerarchia:** contenuto e leggibilità → risposta dell’immagine/testo/icona della tab → glow locale del bordo → reticoli → vertici e particelle.

### 2.1 Occlusione e proprietario del pixel

- Il background è dietro la card e viene escluso dalla sua sagoma. I suoi grandi edge non si vedono sopra la foto.
- La tab usa un seed, vertici, indici e densità propri. Le sue celle non devono allinearsi a quelle del fondo.
- Sul testo e sull’icona si attenua il reticolo generico della tab e si applica quello dedicato; evitare due griglie sovrapposte.
- Il contenuto della tab è ritagliato nella sagoma. Il glow esterno è disegnato fuori dal clip, su un pass dedicato.
- Una sola sorgente input può coinvolgere più superfici e più card vicine con intensità diverse.
- Il campo condiviso non autorizza tutti i target a reagire contemporaneamente alla massima intensità.

## 3. Background — D

### 3.1 Aspetto a riposo

Il reticolo esiste lungo tutta la pagina. La sua presenza neutra è tenue: alcuni tratti periferici si percepiscono, altri quasi scompaiono. Il centro e le aree di lettura sono più quieti. La richiesta di maggiore visibilità ai margini non produce una fascia regolare attorno allo schermo.

Il materiale a riposo è monocromo: carbone, grigi scuri e piccoli punti grigi. Non ci sono punti ambra permanenti nel reticolo. I colori già propri del sito, come il gradiente del titolo o la lampadina FAQ, mantengono la loro identità.

### 3.2 Distribuzione

- Alternare gruppi minuti a celle molto più grandi e aperte.
- Evitare simmetria fra destra e sinistra, ripetizione verticale e cluster equidistanti.
- I vuoti visivi derivano da densità più bassa e alpha quasi nullo; la rete può continuare in modo latente.
- Gli addensamenti possono raggiungere ed essere tagliati dal bordo del viewport.
- La posizione del cursore non rigenera la mesh: modifica energia, colore, alpha e displacement.
- Evitare ragnatele radiali, stelle con tutti gli edge convergenti su un unico punto, texture rocciose e facce argentate troppo evidenti.

### 3.3 Hover e ritorno

Nel range, le parti raggiunte prendono ambra. Fuori dal range restano neutre, salvo il breve decadimento di una risposta appena attraversata. Le facce ricevono meno tinta degli edge. Il fade è irregolare e progressivo.

Il reticolo continua a muoversi pochissimo a riposo; il campo provoca uno spostamento leggero e un ritorno smorzato. Non simulare acqua, gelatina o onde di grande ampiezza.

## 4. Tab: superficie interna e bordo — D

### 4.1 Mesh locale distinta

Ogni tab possiede una mesh propria. Le celle vicino al perimetro sono nettamente più piccole di quelle del background. La fascia densa segue la sagoma reale, inclusi i due tagli diagonali, ma varia in densità e profondità: non è una decorazione uniforme lungo tutto il bordo.

Spostandosi verso il centro, densità visiva e alpha diminuiscono. Rimane una risposta sottile anche sopra l’immagine. Un cursore al centro non deve produrre soltanto un effetto sui bordi lontani.

### 4.2 Edge glow

Il glow si sviluppa sul tratto vicino all’interazione, con tre contributi: linea nitida sottile, alone interno stretto, spill esterno morbido. La posizione del tratto segue la distanza dal cursore al **perimetro reale**, non al bounding box.

La parte lontana del bordo conserva la sua intensità ordinaria. Un angolo opposto non diventa automaticamente incandescente. Se il cursore è fra due tab, i bordi più vicini di entrambe possono reagire.

### 4.3 Protezione del contenuto

Attenuare il reticolo generico sopra immagine, etichetta e icona. L’etichetta e l’icona non sono però escluse: ricevono il proprio micro-reticolo dedicato. Proteggere invece i piccoli testi funzionali che non sono target, le risposte FAQ lunghe, le informazioni legali e i controlli.

Non modificare la hit area, non spostare il pannello, non distorcere la foto e non far cambiare i tagli diagonali durante hover/loading/scroll.

## 5. Testi dentro le tab, icone e titoli — D

### 5.1 Priorità del testo interno

Il caso principale è il testo della tab, per esempio **info@mementostudio.it**, insieme alla piccola icona envelope. L’hover mostra triangoli minuti e facce leggermente diverse **dentro i tratti pieni dei glifi**, con bagliore interno ambra ed edge glow esterno molto sottile.

Devono rimanere invariati font, peso, baseline, kerning, spaziatura, line break, controforme, contenuto e selezione del testo. Vietati lettere vuote, contorni neon al posto del riempimento, crepe, rumore scintillante e reticolo rettangolare dietro la scritta. La semplice colorazione piatta in ambra non soddisfa la richiesta del micro-reticolo.

La maglia non deve attraversare gli spazi fra lettere né riempire le controforme di O, e, a, ecc. Il reticolo deve essere visibile al dettaglio senza compromettere la lettura alla dimensione reale della UI.

### 5.2 Propagazione

L’innesco parte dalla zona di testo più vicina al cursore. Un fronte attraversa gradualmente la catena del testo del target, con picco locale, residuo breve sui caratteri precedenti e anticipo lieve sui successivi. Ogni tratto torna pulito: evitare che l’intera etichetta rimanga arancione e triangolata al massimo.

Per etichette multilinea, seguire l’ordine di lettura e gli a capo reali. La propagazione attraversa la stringa, non disegna edge tra un glifo e l’altro. Limitare il numero di fronti e prevedere un cooldown per evitare retrigger continui.

### 5.3 Icone

L’icona UI conserva sagoma e leggibilità e riceve microcelle entro una maschera propria. Per un’icona envelope outline si può definire una maschera interna della busta per alcune connessioni tenui, mantenendo il tratto originale nitido e senza introdurre un riempimento opaco.

Non usare come maschera il rettangolo contenitore dell’icona. Le eventuali aperture significative del simbolo restano leggibili. Se l’illustrazione contiene a sua volta un simbolo, come la busta sul display del laptop, il trattamento deve rimanere coerente e molto leggero: non trasformarlo in una seconda insegna neon.

### 5.4 Titoli sopra le tab

“LET’S WORK / TOGETHER” e gli altri titoli esterni sono secondari in questa interazione. Reagiscono leggermente **solo quando la loro geometria entra nel range**. Entrare in una card non deve accendere automaticamente tutto il titolo sopra.

Per i titoli esterni applicare un’intensità molto inferiore all’etichetta della card e limitare spazialmente il contributo ai glifi raggiunti. Conservare il gradiente originale. Nessun collegamento automatico a titoli di sezioni lontane. Anche un passaggio diretto sul titolo mantiene una risposta discreta; non recuperare le precedenti anteprime con headline dominante.

## 6. Immagini: luce e colore — D

L’immagine della tab attiva deve effettivamente illuminarsi e acquistare colore, seguendo il riferimento fornito dall’utente: laptop scuro, riflessi ambra/bronzo, simbolo envelope e particelle originali leggibili.

- Usare gli asset originali a colori e il loro stato neutro previsto dal sito.
- Se lo stato B/N deriva da un filtro, interpolare il filtro verso il colore reale; un asset solo grayscale non riacquista cromia abbassando `grayscale`.
- Se esistono asset idle/hover distinti, usare un crossfade perfettamente allineato e ritagliato nello stesso poligono.
- Aggiungere luce con moderazione. Evitare esposizione bruciata, tinta arancione uniforme, bloom pesante e perdita dei dettagli neri.
- La luminosità può seguire il campo localmente; il recupero del colore dell’asset può coinvolgere la tab attiva in modo morbido.
- Le particelle già presenti nell’illustrazione restano parte dell’asset. Non duplicarle con un emitter equivalente.
- Il fine reticolo della card sopra la foto resta trasparente e meno intenso verso il centro.

**Gate di interazione:** la prossimità esterna può attivare bordo e mesh. Il pieno recupero colore/luminosità dell’immagine avviene sulla tab effettivamente in hover/touch o focus. Le card vicine non passano tutte a colori soltanto perché i loro bordi rientrano nel range.

Una mappa esterna o un widget incorporato non è una normale fotografia: preservare funzionamento, legende e controlli, senza tentare di catturare o ricolorare il suo contenuto.

## 7. Matrice degli stati — D

| Situazione | Fondo | Tab, etichetta e icona | Immagine | Titolo esterno |
| --- | --- | --- | --- | --- |
| Quiete | Tenue, monocromo, irregolare | Stato originale; reticolo aggiuntivo assente | Stato idle reale | Stato originale |
| Prossimità esterna | Ambra soltanto nella zona raggiunta | Bordo e parte di mesh nel range; etichetta/icona se raggiunte | Rimane idle | Lieve risposta solo se nel range |
| Hover vicino al bordo | Campo locale, vertici tenui | Maglia fine densa e glow sul tratto vicino | Si illumina e colora | Risposta secondaria |
| Hover al centro | Campo coerente con la posizione | Reticolo interno attenuato ma presente; bordo secondo distanza | Colore e luce leggibili | Nessuna attivazione automatica |
| Hover su etichetta/icona | Campo locale | Micro-reticolo, bagliore ambra, propagazione del testo | Risposta della tab attiva | Lieve, solo nel range |
| Cursore nel gap | Campo condiviso | Reagiscono i bordi vicini di più tab | Non tutte a colori | Solo i glifi raggiunti |
| Cursore fermo | Campo stabile | Nessun flicker; fronte si assesta | Stato hover stabile | Risposta stabile/decadente |
| Uscita | Ritorno neutro progressivo | Mesh e glow decadono | Ritorno a idle | Ritorno al baseline |
| Touch e trascinamento | Equivalente al campo mouse | Segue il dito finché gli eventi arrivano | Risposta locale della tab | Stessa gerarchia |
| Touch up | Impulso breve nel reticolo | Rilascio e decadimento | Ritorno morbido | Nessun flash globale |

## 8. Touch e impulso — D

Touch down attiva la zona; touch move sposta il campo. Non è richiesta sensibilità alla pressione hardware. Al rilascio parte **un solo impulso** che viaggia lungo i legami della rete e svanisce.

L’impulso illumina rami e facce in tempi leggermente diversi. La zona già attraversata si spegne. Non disegnare un cerchio o anelli concentrici. Fondo e superfici locali possono ricevere la stessa energia temporale, ma non vengono cuciti nello stesso grafo.

**P — passaggio fra layer:** calcolare i tempi di arrivo su ciascun grafo locale, usando l’origine dell’interazione proiettata nella superficie e un piccolo ritardo coerente. Innescare soltanto le superfici effettivamente raggiunte; niente propagazione su tutte le card della pagina.

Gestire `pointercancel` senza lasciare hover bloccato e senza generare un falso secondo rilascio. Il browser può cancellare la sequenza pointer quando assume il controllo di un gesto touch [T1, T2].

Preservare scroll, pinch zoom, click, swipe già previsti e link. Il canvas è decorativo, con `pointer-events: none`; non applicare `touch-action: none` globalmente. Non aggiungere un secondo tap obbligatorio per aprire una card. Una navigazione può interrompere l’impulso: non ritardare il link per completare gli FX.

## 9. Particelle: repulsione e curl — D

Piccoli triangolini nascono da alcuni vertici attivati, soprattutto durante spostamento del pointer, loading e fronti di scroll.

- Velocità iniziale verso l’esterno rispetto alla posizione del pointer; un contributo minore può seguire la sua direzione di moto.
- Curl noise con vortici sia positivi sia negativi, seguito da drag e dissolvenza.
- Vita breve, emissione leggera, glow contenuto. Nessuna lunga scia persistente.
- Con pointer fermo l’emissione si esaurisce; il sistema non emette soltanto perché passa il tempo.
- Loading, hover, touch e scroll condividono un budget globale.
- Non interpretare le particelle statiche della foto come nuove particelle del renderer.
- Le particelle sono accessorie: ridurle per prime quando il costo cresce.

**P — dinamica concettuale:**

```text
outward = normalize(vertexPosition - pointerPosition)
velocity = outward * repulsionSpeed + pointerVelocity * smallCarry
velocity += curlPotential(position, time, seed) * dt
velocity *= exp(-drag * dt)
position += velocity * dt
alpha = fadeIn(age) * (1 - normalizedAge)^2
```

Gestire distanza zero con una direzione deterministica, non NaN. Un campo curl 2D può derivare da un potenziale scalare come `(dN/dy, -dN/dx)`. I due versi vengono dal campo/seed, senza cambiare segno casualmente a ogni frame.

## 10. Loading: dal nero all’assestamento — D

La prima apparizione segue una sola costruzione progressiva: **nero → scia → reticolo → facce/contenuto → assestamento → pronto**.

| Fase | Cosa si vede |
| --- | --- |
| Nero | Assenza di contenuto fantasma nella regione che sta entrando |
| Scia | Pochi triangolini e vertici anticipano il fronte |
| Reticolo | Edge e struttura prendono forma progressivamente |
| Reveal | Le facce rivelano porzioni reali dell’immagine e del testo |
| Assestamento | Il contenuto si completa; rete di transizione e particelle decadono |
| Pronto | Contenuto nitido, geometria stabile; restano soltanto le regole di quiete/hover |

Le fasi si sovrappongono. La scia costruisce la rete; non è una decorazione sopra un semplice fade uniforme. Il reveal riguarda davvero la visibilità del contenuto.

**P:** usare una direzione di ingresso stabile, inizialmente basso-sinistra → alto-destra, e ritardi per cella deterministici. La direzione precisa è un parametro, non una nuova decisione estetica vincolante.

Non mantenere la pagina nera nell’attesa dell’intero sito. Se gli FX o gli asset non sono pronti, rendere il DOM normalmente. Se il contenuto è già apparso, saltare l’intro invece di riportarlo al nero. Non riavviare l’intro per resize, cambio orientamento, ritorno a una tab o cronologia. Navbar e controlli persistenti mantengono il comportamento esistente.

## 11. Scroll: uscita e ingresso — D

Scorrendo verso il basso:

- Vicino al bordo superiore utile del viewport, ciò che esce torna reticolo e si scompone progressivamente: la grammatica del loading in reverse.
- Vicino al bordo inferiore utile, ciò che entra si costruisce: scia, rete, facce, contenuto.
- I due fronti possono coesistere nello stesso frame.
- Nella fascia centrale di lettura il contenuto è interamente presente.
- I triangolini accompagnano il fronte con una presenza minima.

Il progresso dipende dalla posizione dello scroll. Fermarsi deve fermare la costruzione/scomposizione del contenuto. Invertire lo scroll deve attraversare **le stesse celle**, con gli stessi seed e lo stesso ordine, senza una nuova animazione casuale.

Per target molto alti calcolare il progresso per cella/porzione, non applicare una singola opacity basata sul centro della card. Nessun blocco dello scroll o sequenza obbligata di scatti.

**P — driver iniziale per una cella**, in coordinate del viewport utile:

```ts
const clamp01 = (v: number) => Math.max(0, Math.min(1, v));
function smooth(a: number, b: number, x: number) {
  const t = clamp01((x - a) / Math.max(b - a, 0.0001));
  return t * t * (3 - 2 * t);
}
function visibilityAtY(
  y: number, top: number, bottom: number,
  bandTop: number, bandBottom: number
) {
  return smooth(top, top + bandTop, y)
    * (1 - smooth(bottom - bandBottom, bottom, y));
}
```

Aggiungere un offset per cella stabile e limitato; per la resa finale usare copertura progressiva anche all’interno delle facce, evitando salti dell’intero triangolo. Il driver rappresenta la visibilità, non sostituisce gli inviluppi sfalsati di scia/edge/facce.

`IntersectionObserver` può preparare/sospendere i target [T7]; il progresso continuo si ricava dalla posizione reale. Salti ad ancore, PageDown o ripristino della cronologia applicano lo stato raggiunto senza riprodurre tutte le particelle saltate.

La reversibilità richiesta riguarda geometria, maschere e contenuto. Le particelle temporali possono esaurirsi e non devono essere riavvolte fisicamente. Un elemento focalizzato da tastiera rimane leggibile.

## 12. Implementazione del campo e delle geometrie — P

### 12.1 Un engine, più superfici

Integrare nello stack del progetto, senza migrazioni di framework. Un solo engine per documento coordina input, clock, layout, mesh, reveal e pool. Nessun listener o RAF autonomo per ogni card o lettera.

L’embed osservato durante l’analisi di Start esponeva il contenuto da `mementostart.vercel.app`. Verificare l’assetto reale nel repository prima dell’integrazione. L’engine va nel documento che contiene i target; non presumere accesso al DOM di un iframe di altra origine. Evitare fondo duplicato nel wrapper e nell’embed. Un eventuale bridge deve limitare origini e messaggi a ciò che serve.

### 12.2 Coordinate

| Spazio | Uso |
| --- | --- |
| CSS px nel viewport del documento | Pointer, prossimità, canvas visibile |
| Coordinate del documento/scroller | Posizioni e seed del fondo stabili durante scroll |
| Coordinate locali della card | Mesh della tab, bordo, clipping |
| Coordinate locali dei glifi/icone | Micro-reticolo e maschere |
| Pixel del framebuffer | Risoluzione del disegno, non unità del range |

Per window: `pDocument = pClient + scrollOffset`. Per uno scroller interno usare origine e offset di quello scroller senza sommare anche quelli di window due volte.

Per card prospettiche o trasformate, utilizzare la trasformazione del componente e il quadrilatero proiettato. Il bounding box da solo non descrive la superficie. Il sistema deve poter essere riusato altrove senza imporre alla pagina Start trasformazioni nuove.

### 12.3 Topologia stabile e scala variabile

Campionamento a distanza minima variabile, modulato da una mappa di densità lenta e deterministica; poi triangolazione. Seed distinti per fondo, card, etichetta e icona. Edge unici e adiacenze riusabili.

La densità locale della card dipende anche dalla distanza dal suo bordo. Le celle vicino al perimetro sono più piccole; quelle interne più ampie e più tenui. Le mesh si preparano al cambio di layout, non su ogni pointermove.

Per pagine lunghe preparare e mantenere in cache soltanto la zona vicina al viewport. Usare nodi di confine condivisi o una suddivisione coerente per evitare cuciture tra chunk. Cambiare qualità non deve creare una nuova mesh sotto il cursore.

### 12.4 Campo irregolare

```text
q = anisotropy * (position - pointer) + stableSpatialWarp(position)
falloff = 1 - smoothstep(innerRadius, outerRadius, length(q))
energy = clamp(falloff^1.4 * slowSpatialGain(position), 0, 1)
```

Usare noise spaziale continuo e seed stabile, con variazione temporale minima. Renderizzare le geometrie che ereditano il campo, non una macchia luminosa che mostra il campo stesso.

Il colore del background interpola dal neutro all’ambra tramite questa energia. Non usare l’energia residua di una card come accensione permanente del fondo. Introdurre easing di attacco e rilascio senza accumulo illimitato.

### 12.5 Movimento

Separare posizione a riposo, piccolo idle e displacement reattivo. Aggiornare edge e shading delle facce dalle stesse posizioni. Limitare lo spostamento rispetto all’edge locale più corto per impedire ribaltamenti.

Il bordo della card e la maschera dei glifi sono ancorati. Nessun displacement della foto o dei contorni tipografici. Per il micro-reticolo di testi piccoli il movimento può essere nullo: la leggibilità prevale.

### 12.6 Poligono e attenuazione della card

Una funzione unica genera sagoma, clip, bordo, collider e maschera. Per larghezza `w`, altezza `h`, taglio `c`, i punti sono:

```text
(c, 0), (w, 0), (w, h-c), (w-c, h), (0, h), (0, c)
```

Per `d` distanza interna dal bordo:

```text
edgeWeight = 1 - smoothstep(0, innerFadeWidth, d)
cardMeshAlpha = energy * maxEdgeAlpha
              * mix(centerMultiplier, 1, edgeWeight)
```

`centerMultiplier = 0.18` significa il 18% del contributo di reticolo del bordo, non un’opacità assoluta del 18% sopra la foto. Facce e reticolo generico sopra etichetta/icona ricevono un’ulteriore riduzione; il loro layer dedicato rimane attivo.

Per il glow trovare il punto più vicino sul perimetro, poi applicare decadimento lungo una distanza d’arco locale e continuità agli angoli. Non illuminare uniformemente tutti i segmenti.

### 12.7 Composizione dei driver

Un solo proprietario controlla la visibilità finale. Loading e scroll non competono scrivendo separatamente `opacity`.

```text
contentVisibility = min(loadVisibility, scrollVisibility)
hoverEnergy = inputField * targetResponse
visibleSurfaceFX = contentVisibility * hoverEnergy
transitionFX = boundedRevealFront(loadProgress, scrollProgress)
```

Il wireframe di transizione può anticipare il contenuto entro la sua fascia attiva. L’hover non deve far riapparire una faccia nascosta. Text, icon e immagine di una card ereditano la visibilità del loro parent. Il limite di luminosità e il budget particelle si applicano dopo la combinazione.

## 13. Rendering, maschere e codice pulito — P

### 13.1 Percorso iniziale

Un renderer WebGL trasparente condiviso può disegnare fondo, superfici locali, glifi/icone, aloni e particelle in pass distinti. Il DOM conserva fotografie, testo semantico, link, pulsanti e controlli. Il canvas rimane sotto overlay di navigazione, modali e focus, senza intercettare input.

Il pass del fondo esclude le sagome delle card; i pass locali usano le rispettive maschere. La separazione dei layer è garantita da geometrie, coordinate e clipping, non dalla moltiplicazione dei canvas.

Raggruppare i draw call, riutilizzare buffer e limitare risoluzione e overdraw degli aloni; sono accorgimenti coerenti con le pratiche WebGL documentate [T6]. Il percorso preciso va adattato al renderer già presente, senza aggiungere una seconda scena completa solo per questi FX.

### 13.2 Testi e icone

Conservare il testo HTML originale. Preparare le maschere dopo che i font e il layout sono pronti; `document.fonts.ready` è un punto di sincronizzazione utile [T4]. Invalidare le maschere su cambio font, dimensione, wrapping, contenuto o layout.

Renderizzare le righe con gli stessi parametri tipografici. Verificare registrazione al pixel con il DOM, shaping, kerning e grafemi; non suddividere il testo visibile in span se cambia la resa. Un bordo doppio o una maschera disallineata non è un compromesso accettabile: mantenere il testo originale finché l’adattatore non è corretto.

Per icone vettoriali riutilizzare i path del componente. Per raster usare solo asset e maschere disponibili, senza inventare la silhouette da un bounding box. Le texture e maschere sono in cache, non ricreate ogni frame.

### 13.3 Reveal del contenuto

Un primo adattatore può usare maschere SVG/CSS triangolari, generate dalla geometria del target e guidate dallo stesso progresso. Specificare la modalità alpha: trasparente nasconde, opaco rivela; un rettangolo nero opaco in modalità alpha non è un “buco” [T5].

Aggiornare soltanto i target in transizione e le celle cambiate. Niente screenshot del DOM, PNG, data URL o letture di pixel per frame. Una volta presente, bypassare la maschera per garantire nitidezza e assenza di seam.

Se il progetto richiede media su texture, caricare gli asset originali e gestire origine/CORS. Non catturare mappe o iframe esterni. Per contenuti non controllabili usare un ingresso leggero del contenitore, mantenendo i controlli accessibili.

### 13.4 Moduli minimi

| Modulo/responsabilità | Compito |
| --- | --- |
| Config e preset | Token, parametri, cap, feature flag |
| Engine/lifecycle | Un clock, render scheduling, cleanup |
| Input e field | Pointer normalizzato, energia, range, cancel |
| Registry/layout | Target, parent, scroller, trasformazioni e invalidazioni |
| Mesh | Seed, densità, indici, edge unici, dinamica |
| Card surface | Clip, attenuazione, glow, gate colore immagine |
| Text/icon surface | Maschere e micro-reticoli dedicati |
| Propagation/impulse | Fronti di testo e propagazione touch |
| Reveal | Loading, scroll, composizione visibilità |
| Particle pool | Emissione, riuso, curl, limiti globali |
| Renderer | Pass, blend, batching e qualità adattiva |

Queste sono responsabilità, non un obbligo di creare molte classi. Preferire funzioni pure per geometria, campi e driver; oggetti di stato limitati per lifecycle e risorse.

### 13.5 Contratto suggerito dei target

```ts
type SurfaceKind = "background" | "card" | "label" | "icon" | "heading";
type RevealMode = "load-scroll" | "scroll" | "inherit" | "none";

interface VfxTarget {
  id: string;                 // stabile, non indice di un array
  kind: SurfaceKind;
  element: HTMLElement | SVGElement;
  parentId?: string;          // label/icon ereditano visibilità della card
  seed: number;               // indipendente per superficie
  reveal: RevealMode;
  responseGain: number;
  centerMultiplier?: number;  // applicabile alla mesh della card
  imageElement?: HTMLImageElement;
  imageActivation?: "hover-touch-focus";
}
interface VfxEngineApi {
  register(target: VfxTarget): () => void;
  invalidateLayout(id?: string): void;
  setEnabled(enabled: boolean): void;
  dispose(): void;
}
```

Il framework registra e rimuove i target al mount/unmount. Evitare aggiornamenti dello stato UI a ogni frame. Nessuna duplicazione di engine, RAF o observer durante mount ripetuti.

### 13.6 Ordine del frame

1. Leggere input/scroll memorizzati e invalidazioni.
2. Aggiornare in batch solo layout necessari e target visibili.
3. Calcolare visibilità e campo; scegliere la tab realmente attiva.
4. Aggiornare dinamica, fronti e particelle.
5. Aggiornare le sole maschere/variabili DOM cambiate.
6. Disegnare pass raggruppati e rilevare il costo.

Separare letture e scritture DOM. Nessuna triangolazione, creazione di materiali o ricerca di tutti i target a ogni pointermove.

## 14. Parametri iniziali da calibrare — P

Tutti i valori sono proposte iniziali in **CSS pixel**, millisecondi e fattori relativi. Non sono soglie approvate tramite benchmark. Valutare il risultato alla dimensione reale della pagina, non soltanto nel dettaglio ingrandito.

### 14.1 Geometria e luce

| Parametro | Desktop iniziale | Mobile iniziale |
| --- | --- | --- |
| Campo, raggio esterno indicativo | 260 px; esplorare 220–360 | 170 px; esplorare 140–220 |
| Variazione spaziale del range | ±20–30%, continua | ±20–30%, continua |
| Background, lato celle nelle zone aperte | 90–240 px, variabile | 65–160 px, variabile |
| Background, celle nei piccoli addensamenti | 20–55 px | 18–45 px |
| Card, celle nella fascia di bordo | 5–14 px, non uniformi | 5–12 px |
| Card, celle interne | 18–55 px, alpha minore | 16–40 px |
| Microcelle nei glifi | 0.08–0.18 em, con LOD | 0.10–0.20 em, con LOD |
| Edge neutri del fondo, alpha indicativo | 0.02–0.08 solo in tratti selezionati | 0.02–0.06 |
| Edge attivi, alpha indicativo | 0.15–0.32 | 0.12–0.26 |
| Tinta facce attive, alpha | 0.01–0.035 | 0.01–0.025 |
| Diametro vertici | 0.6–1.1 px, senza flare | 0.6–1.0 px |
| Intensità vertici vs vecchi concept brillanti | circa 25–35% | circa 25–35% |
| Moltiplicatore centro card | 0.15–0.25; iniziare da 0.18 | 0.10–0.20 |
| Profondità fascia di fade interno | 15–25% del lato corto | 15–25% del lato corto |
| Glow bordo, core / alone | 0.7–1 px / 6–14 px | 0.7–1 px / 5–10 px |
| Gain etichetta/icona | 1 come riferimento relativo | 1 come riferimento relativo |
| Gain titolo esterno nel range | 0.08–0.18 rispetto all’etichetta | 0.06–0.14 |
| Idle vertici | 0.3–1.0 px, periodi 8–16 s | 0.2–0.6 px, periodi 10–18 s |
| Displacement reattivo fondo/card | 2–5 px / 0.5–2 px | 1–3 px / 0.3–1.2 px |
| Clamp relativo displacement | massimo 5–7% dell’edge minimo | massimo 5–7% dell’edge minimo |

Per glifi molto sottili usare il livello di dettaglio adatto: evitare pattern subpixel che sfarfallano. Ridurre linee, mantenere poche facce leggibili e il colore; non ingrossare il font per far posto alla mesh.

Usare i token reali del sito. `#FF7950` è un riferimento di accento Memento già discusso, non un obbligo di sovrascrivere la palette esistente. Calibrare il risultato verso l’ambra/bronzo del riferimento laptop. Il neutro del background non dipende da questo token.

### 14.2 Tempi e particelle

| Parametro | Desktop iniziale | Mobile iniziale |
| --- | --- | --- |
| Attacco / rilascio hover | 120–180 / 450–700 ms | 100–170 / 400–650 ms |
| Passaggio immagine idle → colore | 200–350 ms | 180–300 ms |
| Propagazione etichetta | 450–850 ms | 400–750 ms |
| Cooldown fronte testo | 600–800 ms | 600–800 ms |
| Loading complessivo | 1600–2000 ms | 1200–1600 ms |
| Fasce scroll, altezza utile | 16–20% | 14–18% |
| Impulso touch | 650–1000 ms; massimo 2 vivi | 650–1000 ms; massimo 2 vivi |
| Triangolino, lato | 1.5–3 px | 1.2–2.5 px |
| Vita particella | 250–650 ms | 220–500 ms |
| Velocità iniziale | 25–60 px/s | 20–40 px/s |
| Emissione hover massima | 12/s, legata anche alla distanza percorsa | 6/s |
| Pool totale condiviso | massimo 64 particelle | massimo 24 |

Separare i parametri di linea, faccia, vertice e glow. Non alzare tutti i gain per ottenere più presenza.

## 15. Performance, accessibilità e fallback — P / V

**Obiettivo da misurare:** 60 fps sui dispositivi target. Le tavole non dimostrano questo risultato. Come punto di partenza, desiderare circa 2–4 ms/frame di lavoro FX sul desktop di riferimento, verificando separatamente CPU, GPU e costo complessivo della pagina.

- DPR degli FX inizialmente limitato a 1.5 desktop e 1–1.25 mobile.
- Budget del fondo visibile nell’ordine di poche centinaia di vertici; mesh locali solo per target prossimi/visibili.
- Rendering a risoluzione ridotta degli aloni, senza bloom pesante full-screen.
- Pool preallocati, texture/maschere in cache e cleanup esplicito.
- Qualità adattiva con isteresi: ridurre prima particelle, poi costo del glow/DPR, poi dettaglio secondario. Non rigenerare ogni secondo la topologia.
- Sospendere quando il documento non è visibile e quando il target è fuori campo. Un iframe nascosto dal parent richiede coordinamento della visibilità effettiva.
- Su resume, campionare lo stato attuale senza recuperare simulazioni o particelle arretrate.
- `dispose()` rimuove RAF, listener, observer, maschere e risorse. La pagina torna integralmente leggibile.

Con `prefers-reduced-motion` rilevare la preferenza di movimento ridotto [T3]: disattivare idle, displacement, curl, impulso in viaggio e dissolvenza scroll. Consentire al massimo un cambio locale di colore con breve fade. Contenuto subito leggibile.

Canvas e copie FX sono decorativi, `aria-hidden`, senza focus. Mantenere testo semantico, selezione, link, nome accessibile, contrasto e focus visibile. Su tastiera l’elemento focalizzato viene rivelato e può avere un accento locale statico; non deve essere necessaria una posizione mouse per leggere o attivare il contenuto.

In assenza WebGL, errore font/maschera, perdita del contesto o bootstrap fallito: contenuto completo, hover CSS essenziale se possibile. Non lasciare opacity zero o overlay nero. Nessun fallback deve bloccare un link o un controllo.

## 16. Applicazione alla pagina Start — D / P

| Target reale | Trattamento |
| --- | --- |
| Fondo lungo tutta la pagina | Monocromo, irregolare, ambra locale |
| Due email principali | Tab locale, immagine B/N → colore, etichetta e icona con micro-reticolo |
| Telefono, WhatsApp, Instagram, Fiverr | Stessa grammatica adattata alle dimensioni; nessun ingrandimento degli FX su mobile |
| “LET’S WORK / TOGETHER” | Titolo secondario, lieve risposta solo nel range |
| “SIAMO QUI” | Stesso criterio dei titoli; nessuna accensione remota |
| Card indirizzo e orari | Bordo/superficie/icone coerenti; informazioni sempre leggibili |
| Mappa | Contenuto e controlli originali; eventuale effetto sul contenitore, non sulle tile o sulle etichette della mappa |
| FAQ | Reticolo locale sul pannello; titolo/icona se registrati come target; copy delle risposte protetto; lampadina come asset originale |
| Privacy & legal | Leggibilità e link prioritari; niente dissolvenza mentre focalizzati; FX contenuti/esclusi sul microcopy |
| “CONTINUA IL VIAGGIO!” | Regola titolo; CTA e chevron originali invariati |
| Navbar e logo overlay | Preservare sistema esistente, z-index e accessibilità; evitare FX duplicati |

Le dimensioni, i breakpoint e gli ordini effettivi provengono dal progetto. Non correggere il layout del sito sulla base delle tavole generate, che talvolta hanno allargato le card o alterato testi minuti.

## 17. Piano di sviluppo — P

1. Identificare entry point, scroller, document/iframe responsabile, asset idle/hover ed effetti esistenti da sostituire.
2. Preparare una scena di verifica con il vero fondo, due tab reali, etichetta, icona e titolo superiore. Tutto registrato con ID stabili.
3. Portare a correttezza la quiete monocroma e la distribuzione irregolare, con vertici tenui.
4. Implementare campo condiviso, occlusione del fondo e mesh indipendente delle card; verificare centro e bordo.
5. Implementare luce/colore dell’immagine, micro-reticolo dell’etichetta e dell’icona, risposta debole dei titoli.
6. Aggiungere propagazione testuale, touch/cancel/impulso e particelle con budget unico.
7. Implementare loading e scroll con celle stabili, maschere reali e reverse.
8. Integrare su tutta Start, verificare responsive, reduced motion, fallback e lifecycle.
9. Profilare sui dispositivi dichiarati, correggere i difetti e documentare eventuali differenze residue.

Si tratta di una sequenza di lavoro e verifica, non di una richiesta di nuovi passaggi di approvazione. Non riscrivere il sito per applicare gli FX.

## 18. Criteri di accettazione — V

| ID | Prova | Risultato richiesto |
| --- | --- | --- |
| V01 | Quiete per 10 secondi | Fondo monocromo, vertici tenui, nessuna emissione o ambra permanente |
| V02 | Scorrere lentamente tutta la pagina | Addensamenti e vuoti diversi; nessuna cornice o ripetizione regolare |
| V03 | Cursore sul margine | Ambra solo nel campo, fade irregolare, nessun cerchio visibile |
| V04 | Cursore nel gap fra card | Reazione locale dei bordi vicini; immagini non tutte a colori |
| V05 | Cursore dentro la card | Reticolo interno presente; background grosso escluso dalla sagoma |
| V06 | Confronto fondo/bordo card | Differenza chiara di scala, densità e connettività |
| V07 | Cursore al centro dell’immagine | Effetto più tenue ma non nullo; immagine riconoscibile |
| V08 | Cursore vicino a un bordo | Edge glow sul tratto vicino; lato opposto non acceso allo stesso modo |
| V09 | Hover su etichetta | Triangoli visibili dentro i glifi pieni, ambra, lettura stabile |
| V10 | Hover su icona | Micro-reticolo dentro la forma, simbolo riconoscibile |
| V11 | Hover sulla tab laptop | Asset originale illuminato e a colori come il riferimento utente |
| V12 | Titolo sopra fuori range | Nessuna accensione indotta dalla tab |
| V13 | Titolo appena nel range | Risposta lieve e secondaria, senza headline incandescente |
| V14 | Propagazione testo | Fronte graduale lungo la catena; nessuna deformazione o retrigger continuo |
| V15 | Pointer fermo/uscita | Campo stabile, emitter si esaurisce, ritorno progressivo |
| V16 | Touch down/move/up | Zona segue il dito; un impulso lungo i rami al rilascio |
| V17 | Scroll touch e pointercancel | Gesto nativo libero, niente hover bloccato o impulso duplicato |
| V18 | Loading a progressi intermedi | Scia, rete, facce e contenuto distinguibili; non solo opacity globale |
| V19 | Scroll fermo in fascia | Stato del contenuto fermo; particelle libere di esaurirsi |
| V20 | Scroll avanti/indietro | Stesse celle alla stessa posizione, stesso layout e seed |
| V21 | Uscita sopra + ingresso sotto | Due fronti simultanei; zona centrale leggibile |
| V22 | Salto ad ancora/cronologia | Stato immediatamente coerente, nessun replay arretrato |
| V23 | Angoli in tutti gli stati | Solo alto-sinistra/basso-destra tagliati |
| V24 | Resize/font/orientamento | Maschere allineate, nessun bordo doppio, nessun flash al nero |
| V25 | Tastiera e reduced motion | Contenuti e azioni completi, focus visibile, niente movimento superfluo |
| V26 | Renderer/asset non disponibile | Pagina integra, niente contenuto invisibile |
| V27 | Mappa/FAQ/link | Funzioni originali operative, overlay senza cattura eventi |
| V28 | Mount/unmount e route change | Un solo loop, risorse liberate, nessuna crescita continua di memoria |
| V29 | Confronto con sorgente | Email, telefono, copy, immagini, proporzioni e spaziature corretti |
| V30 | Profilazione su device reali | Risultati riportati con dispositivo/browser; nessuna promessa di fps non misurata |

**Verifiche numeriche utili:** determinismo del seed; edge unici; alpha confinati in [0,1]; clamp di spostamento; reversibilità delle maschere; nessun impulso su cancel; gate immagine separato dalla sola prossimità; zero contributo ambra del fondo fuori dal campo e dal decadimento.

**Verifiche visive necessarie:** stato idle, hover interno, etichetta/icona, titolo fuori/entro range, mobile, loading a metà e scroll reverse. I test numerici non certificano la qualità del glow. Per confronti deterministici congelare idle e particelle in una modalità debug esclusa dal prodotto pubblico.

## 19. Consegna richiesta allo sviluppatore

Codice integrato nel progetto esistente; configurazione unica; asset reali; descrizione breve dei moduli modificati; registrazioni di mouse, touch, loading e scroll; dispositivi/browser e misure effettive; elenco chiaro di fallback o differenze residue.

La pagina deve essere pronta da valutare con tutte le interazioni richieste. Non dichiarare concluso il lavoro se esiste soltanto un background animato e mancano reticolo interno, testo/icona, immagine a colori o transizioni.

## 20. Riferimenti e provenienza

### 20.1 Riferimenti della conversazione

- [Screenshot full page fornito dall’utente — image(6).png](https://chatgpt.com/library?file_id=libfile_fde3_f-1c8db42d7af88191bd027b380ff140c8_473245d80dcc8191965cc5c84c950f55&account_id=personal): contesto e composizione della pagina.
- [Riferimento del reticolo non uniforme](https://chatgpt.com/library?file_id=libfile_fde3_f-cd5f3741042c8191a2becb087823a139_473245d80dcc8191965cc5c84c950f55&account_id=personal): distribuzione irregolare, range e continuità percettiva.
- [Card laptop a colori fornita dall’utente — image(7).png](https://chatgpt.com/library?file_id=libfile_fde3_f-58dfac252a808191807fe9cfe0e20c70_473245d80dcc8191965cc5c84c950f55&account_id=personal): asset e carattere di luce/colore della tab info@mementostudio.it.
- [Handoff R3 precedente](https://chatgpt.com/library?file_id=libfile_fde3_f-29a5e3930ce081918cb23ce4137e404d_473245d80dcc8191965cc5c84c950f55&account_id=personal): base di loading, touch, particelle e scroll. Le correzioni della sezione 0.1 prevalgono.

Le ultime anteprime della conversazione illustrano il trattamento aggiornato. Alcuni dettagli ingranditi enfatizzano il micro-reticolo per renderlo visibile: nel codice va calibrato alla scala reale, mantenendo le regole di questo documento. Non considerare ogni pixel di un mockup generato una specifica di produzione.

### 20.2 Riferimenti tecnici

Consultati il 7 novembre 2026. Documentano primitive della piattaforma; look, architettura proposta e valori numerici rimangono scelte del progetto.

- **[T1]** [MDN — Pointer events](https://developer.mozilla.org/en-US/docs/Web/API/Pointer_events).
- **[T2]** [MDN — touch-action](https://developer.mozilla.org/en-US/docs/Web/CSS/touch-action).
- **[T3]** [MDN — prefers-reduced-motion](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion).
- **[T4]** [MDN — CSS Font Loading API](https://developer.mozilla.org/en-US/docs/Web/API/CSS_Font_Loading_API).
- **[T5]** [MDN — mask-image](https://developer.mozilla.org/en-US/docs/Web/CSS/mask-image).
- **[T6]** [MDN — WebGL best practices](https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API/WebGL_best_practices).
- **[T7]** [MDN — Intersection Observer](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API).

## Appendice A — Brief operativo da passare all’agente

> Integra gli FX Memento nella pagina Start seguendo questo master R4 e preservando asset, contenuti, layout e navigazione reali. Usa un campo input condiviso con geometrie indipendenti: fondo ampio e irregolare; reticolo locale delle tab molto più fine al bordo e tenue ma presente al centro; micro-reticoli dentro etichette e icone. Il fondo è monocromo e prende ambra soltanto nel range. I vertici sono poco luminosi. L’hover della tab deve illuminare e colorare l’immagine originale e attivare testo/icona interni; i titoli sopra rispondono poco e solo se raggiunti. Mantieni i tagli alto-sinistra/basso-destra e un edge glow locale. Non deformare lettere, immagini o pannelli. Implementa mouse/touch, impulso nel grafo al rilascio, piccoli triangoli repulsi con curl nei due versi, loading dal nero per scia/rete/facce e scroll con ingresso/uscita reversibili sulle stesse celle. Un solo engine per documento, maschere stabili, budget condivisi e fallback leggibile. Considera i numeri del master parametri iniziali, misura il risultato e verifica V01–V30. Consegna codice integrato e riscontri reali, non soltanto una tavola o un effetto CSS isolato.

