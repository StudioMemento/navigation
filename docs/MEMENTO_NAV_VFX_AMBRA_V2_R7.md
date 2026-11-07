# MEMENTO NAV — VFX AMBRA V2 / R7

**Data:** 7 novembre 2026  
**Ambito:** slider NAV, campo di esplorazione, card, tipografia e controlli.  
**Base:** `START_VFX_MASTER_R4.md`; le correzioni NAV e le sei tavole neutre Ambra V2 aggiornano la calibrazione visiva.

**D** indica una decisione richiesta; **P** un valore iniziale proposto da calibrare; **V** una verifica da eseguire. Questo documento descrive il risultato atteso: non certifica implementazione, fedeltà numerica alle immagini o prestazioni misurate.

## 1. Precedenza e cambiamenti rispetto a R4

Ordine di precedenza: ultime istruzioni dell’utente → decisioni NAV di questo documento → contenuti, asset e funzioni reali → tavole di riferimento → parametri P. R4 resta valido per quanto non modificato qui. I suoi target specifici della pagina Start non diventano nuovi contenuti della NAV.

La tavola Photoshop definisce **rapporti strutturali dello slider e dei chevron**. Le sei tavole neutre definiscono **linguaggio e gerarchia degli FX**. Non richiedono nuove fotografie, nuove icone o la sostituzione della tipografia esistente.

| Tema | R4 / situazione da correggere | Decisione NAV R7 — D |
| --- | --- | --- |
| Invito allo scroll | Microcopy presente nello slider | Rimuovere completamente “SCORRI PER ESPLORARE”, compresi spazio e trattamento decorativo dedicati. |
| Profondità | Preview separate da un gap | Le card inattive passano leggermente dietro quella attiva; una morbida ombra di contatto rende leggibile la sovrapposizione. |
| Immagine attiva a riposo | R4 partiva dal monocromo | Colore originale all’80%; immagine opaca e riconoscibile. |
| Immagine attiva in interazione | Recupero del colore | Colore originale al 100% su hover/focus; campo, bordo e particelle mantengono una distribuzione locale irregolare. |
| Preview inattive | Possibile blur aggiuntivo | Bianco e nero in ogni stato; nessun blur applicato alle fotografie. Il blur appartiene alla navbar overlay. |
| Campo e particelle | Presenza R4 molto contenuta | Ambra e triangolini più leggibili alla scala reale, con escursione locale e ritorno pulito; evitare un aumento uniforme di tutti gli effetti. |
| Testo e icona | Micro-reticolo discreto | Reticolo percepibile nella forma, edge glow e propagazione locale; preservare font, peso, spaziatura e leggibilità. |
| Reveal, scroll e touch | Grammatica R4 | Confermata e calibrata sulle tavole V2: costruzione per celle, reversibilità, impulso singolo, emissione che si esaurisce. |

## 2. Riferimenti allegati e loro uso

| Nome esatto del file caricato | Riferimento | Uso e limite |
| --- | --- | --- |
| `image(20261107-145159).png` | Dettaglio del microcopy | Identifica la scritta da eliminare. |
| `image(20261107-145214).png` | Dettaglio fra card e preview | Identifica il gap da sostituire con sovrapposizione e ombra di contatto. |
| `Slider_nav proportions_(1).png` | Photoshop dello slider | Rapporti card/viewport, preview e proporzione dei chevron; non prescrive nuovi asset o nuove dimensioni dei caratteri. |
| `Amber V2_ Cinematic Mesh in Motion-1(1).png` | 01 / Campo latente | Topologia stabile, quiete neutra, prossimità, movimento e ritorno; luce locale irregolare. |
| `Amber V2 interactive surface concept board-2(1).png` | 02 / Superficie e bordo | Mesh proprie della card, centro attenuato, bordo vicino luminoso, risposta nel gap e decadimento. |
| `Amber V2 luminous typography concept board-3(1).png` | 03 / Testo e icona | Microfacce nei glifi, edge glow, propagazione e piccole emissioni; il grassetto del concept non sostituisce Inter della NAV. |
| `Amber V2 Faceted Reveal Board-4(1).png` | 04 / Costruzione | Nero → scia → reticolo → contenuto → assestamento → pronto. |
| `Amber V2 cinematic transition concept board-6(1).png` | 05 / Scroll continuo | Uscita/ingresso, arresto del progresso e ritorno sulle stesse celle. Il numero nel nome del file non è il numero della tavola. |
| `Amber V2_ Touch-Driven Faceted Particles-5(1).png` | 06 / Touch e particelle | Down/move/up, impulso singolo, repulsione e curl, vita breve; nessuna emissione continua da fermo. |
| `Amber doorway level-up navigation(1).png` | Prima direzione dello slider | Contesto visivo precedente; per proporzioni e stati prevalgono il Photoshop e le ultime istruzioni. |
| `MEMENTO_START_VFX_MASTER_R4(1).md`, `MEMENTO_START_VFX_MASTER_R4(3).md` | Master Start R4 | Base concettuale, riportata nel progetto in `START_VFX_MASTER_R4.md`; applicare le differenze NAV indicate sopra. |

Le tavole sono concept statici. Mostrano la direzione della luce e degli stati, non dimostrano animazioni, tempi, quantità di particelle o prestazioni del prodotto.

## 3. Slider, profondità e colore — D

La card attiva occupa il piano anteriore. Le preview superiore e inferiore proseguono dietro i suoi margini; non sembrano tre pannelli separati da bande nere. L’ombra resta corta e morbida, concentrata nella zona di contatto. I tagli della card rimangono alto-sinistra e basso-destra.

I chevron sono sottili, leggibili e proporzionati alla composizione. La loro grafica può ridursi senza restringere l’area interattiva. Navbar, dock e controlli mantengono una zona libera utilizzabile anche su viewport bassi e mobile.

| Stato della fotografia | Colore | Nitidezza e risposta |
| --- | --- | --- |
| Attiva, quiete | 80% del colore originale | Opaca, nitida; nessuna desaturazione completa. |
| Attiva, hover/focus/interazione touch | 100% del colore originale | Esplorazione ambra locale, bordo e tipografia reattivi. |
| Inattiva, anche se raggiunta dal campo | 0%, bianco e nero | Nitida; la prossimità può illuminare un tratto del bordo, non colorare la foto. |

“80%” riguarda il trattamento del colore, **non l’opacità della card**. Il riferimento iniziale è una saturazione relativa di 0,8 sull’asset reale; la valutazione visiva resta necessaria perché fotografie diverse non producono identica intensità percepita. Il colore già contenuto nell’asset non è una particella o un glow del renderer.

## 4. Esplorazione, tipografia e particelle — D

- **Campo:** ambra calda, range ampio ma non uniforme, bordi morbidi e asimmetrici; niente disco o anello riconoscibile. Il movimento rivela zone diverse della stessa rete, senza rigenerare la topologia a ogni passaggio.
- **Gerarchia:** fondo a celle più grandi; reticolo della card più fine e fitto ai bordi; centro attenuato; micro-reticolo proprio di glifi e icone. Le superfici condividono lo stimolo, non una sola griglia sovrapposta ovunque.
- **Occlusione:** il fondo non attraversa la fotografia. L’illuminazione del bordo è più forte vicino al punto esplorato, con lati lontani meno attivi. Evitare una cornice interamente accesa in modo uniforme.
- **Testo:** glifi pieni e leggibili, microfacce ambra visibili dentro la loro forma, luce sui margini e breve propagazione. I vuoti interni restano aperti. Nessuna sostituzione con outline vuoti, riempimenti neri, spessore aggiunto o pattern che si estende nel rettangolo del testo.
- **Scala reale:** mantenere l’attuale Inter 200 e le sue proporzioni. Su tratti sottili adattare il dettaglio per evitare sfarfallio; la visibilità degli FX non si ottiene ingrossando il font. I dettagli ingranditi della tavola 03 sono riferimenti di materia, non misure.
- **Particelle:** triangolini minuti, variazione di dimensione e direzione, repulsione e curl contenuti. Pochi accenti più luminosi accompagnano bordo, glifi e movimento; evitare una scia lunga permanente o un’esplosione sull’intera card.
- **Ritorno:** con pointer fermo l’emissione si esaurisce; all’uscita campo e particelle decadono. Il fondo torna neutro e la card attiva torna al proprio 80%, senza aloni rimasti accesi.

Il 100% di colore della card in hover non implica un glow al massimo su ogni pixel: l’effetto di esplorazione nasce dalle differenze locali di range, luce, densità e risposta.

## 5. Costruzione, scroll e touch — D

La costruzione segue una scia locale che anticipa rete e facce, poi rivela il contenuto originale e si assesta. Non basta applicare un fade globale con triangoli decorativi sopra. Navbar e controlli persistenti mantengono le proprie funzioni; se gli FX non sono disponibili, il contenuto compare normalmente.

Durante lo scroll, uscita e ingresso possono coesistere. Fermare lo scroll ferma il progresso del contenuto; le particelle già emesse possono spegnersi. Invertire il movimento riattraversa le stesse celle, senza nuovi seed casuali. La zona di lettura resta nitida e completa.

Touch down innesca la zona, move la segue, up produce un solo impulso breve lungo i legami raggiunti. Cancel chiude l’interazione senza impulso aggiuntivo. Non ritardare navigazione, swipe o scroll per completare gli FX e non introdurre un secondo tap obbligatorio.

## 6. Calibrazione iniziale — P

Valori proposti per questo passaggio, allineati ai parametri correnti del prototipo: sono scelte di calibrazione, non misure certificate dalle tavole né benchmark. I vincoli responsive e le aree utili dell’overlay prevalgono su un rapporto fisso del desktop.

| Parametro | Target iniziale P |
| --- | --- |
| Card desktop | Rapporto 2:1; altezza circa 60vh, contenuta dalle aree libere effettive. |
| Sovrapposizione delle preview | 4% dell’altezza card, limitata indicativamente a 12–24 CSS px. |
| Chevron | Angolo grafico 90°; larghezza massima 54 CSS px; altezza interattiva 48–52 CSS px, ridotta a 44 CSS px sui viewport bassi. |
| Titolo | Mantenere Inter 200, dimensionamento corrente e padding circa 6%. |
| Luminosità immagine attiva | Fattore circa 0,96 a riposo → 1,06 in interazione, senza bruciare le alte luci. |
| Preview | Luminosità circa 0,82; eventuale velatura di profondità circa 0,14, senza blur. |
| Campo | Raggio nominale 300 CSS px desktop / 190 mobile, con variazione spaziale continua; evitare un contorno circolare percepibile. |
| Attacco / ritorno del campo | Parametri nominali 130 ms / 620 ms; descrivono la calibrazione dell’inviluppo, non una durata di animazione misurata. |
| Pool particelle | Capacità configurata 96 desktop / 36 mobile; limite di disponibilità, non quantità da mantenere sempre visibile. |
| Vita particella | Token di calibrazione 700 ms desktop / 560 mobile; emissioni di durata variabile, senza scia persistente. |

I valori del campo e delle particelle provengono da `dist/src/vfx-config.mjs`. Nella sorgente esaminata, il pool assegna ancora la vita mediante una distribuzione propria di circa 380–740 ms desktop e 304–592 ms mobile: i token 700/560 ms non sono quindi una misura della durata effettiva né risultano direttamente applicati a ogni particella. La verifica deve riferirsi al comportamento del renderer, non alla sola presenza del parametro.

La coppia 80%/100% e il monocromo delle inattive sono decisioni D dell’utente. Gli altri numeri servono a iniziare il confronto sul prototipo. Una maggiore presenza V2 va ottenuta soprattutto con gerarchia e contrasto locale; non assegnare un unico gain massimo a linee, facce, vertici e aloni.

## 7. Criteri di accettazione — V

- [ ] **V01 — Microcopy:** “SCORRI PER ESPLORARE” non compare e non lascia una riga vuota dedicata.
- [ ] **V02 — Profondità:** entrambe le preview entrano leggermente dietro la card attiva; ombra di contatto morbida, nessun gap residuo o pannello davanti all’attiva.
- [ ] **V03 — Proporzioni:** confronto desktop coerente con il Photoshop; chevron sottili e aree cliccabili libere. Mobile e viewport bassi non sacrificano navbar, dock o controlli.
- [ ] **V04 — Colore:** attiva 80% in quiete e 100% in interazione; inattive sempre B/N, anche con il campo vicino. Nessuna variazione dell’opacità usata per simulare il colore.
- [ ] **V05 — Nitidezza:** nessun blur sulle fotografie inattive; il blur della navbar overlay rimane il solo trattamento previsto nella sua area.
- [ ] **V06 — Esplorazione:** hover al centro, su un bordo e fra le card produce risposte diverse e graduali; nessun disco luminoso, contorno di maschera o accensione uniforme di tutti i bordi.
- [ ] **V07 — Tipografia:** alla scala reale si distinguono micro-reticolo e edge glow; testo leggibile, tratti e spaziatura invariati, nessun rettangolo di pattern fuori dai glifi.
- [ ] **V08 — Particelle e uscita:** piccoli triangoli accompagnano il movimento e si esauriscono da fermo; dopo l’uscita nessun residuo ambra sul fondo e ritorno della card attiva al suo stato di quiete.
- [ ] **V09 — Reveal e reverse:** stati intermedi leggibili, arresto del contenuto su stop, stesse celle al ritorno; particelle temporali libere di decadere.
- [ ] **V10 — Touch e tastiera:** un solo impulso al rilascio, nessuno su cancel; swipe, link, focus e navigazione restano operativi senza attese introdotte dagli FX.
- [ ] **V11 — Accessibilità e fallback:** reduced motion offre contenuto subito leggibile e accento locale essenziale; errore del renderer o delle maschere non produce pagina nera o testo invisibile.
- [ ] **V12 — Resize e integrazione:** nessun disallineamento di maschere, bordo doppio o valore colore non finito; verificare font caricati, cambio orientamento, route e visibilità della pagina.

Le verifiche visive richiedono il prototipo a dimensione reale negli stati quiete, centro, bordo, testo, uscita e mobile. I controlli numerici non certificano da soli la qualità del glow. Registrare separatamente ciò che è stato verificato e gli eventuali limiti: nessuna dichiarazione di fps, costo per frame o fedeltà pixel-perfect senza misurazioni pertinenti.
