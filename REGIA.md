# MEMENTO / TIDE — Direzione cinematografica 011

Le cinque tavole generate sono concept di resa, non screenshot del renderer WebGL. Definiscono una sola famiglia visiva per Memento, Services, Projects, Levelup e Start. La v011 traduce in codice la disposizione, la camera, le pedane, il rapporto luce/acqua e il percorso di entrata/uscita; l'equivalenza visiva con un render offline richiede ancora lavorazione degli asset e QA su GPU.

## Inquadratura comune

Camera a **24 cm dall'acqua**, senza roll, con leggero sguardo verso l'alto. Il centro della scena è la scultura; l'acqua fa da pavimento e prosegue nel riflesso. Il bordo superiore della pedana emerge di **2,5 cm**. La superficie non deve apparire come un piatto bianco.

- Desktop: FOV verticale 36°, distanza base 8,6 m dallo stage.
- Portrait: FOV verticale 46°, distanza calcolata per conservare nel frame il disco largo 4,4 m.
- Centro delle icone: Y = 1,75 m. Con le dimensioni esistenti, la base è circa 12,5 cm sopra la pedana.
- Titolo: sotto il centro proiettato dello stage, sul tratto scuro dell'acqua; Inter, chiaro, tracking ampio. Unico elemento UI persistente.
- Idle: pochi millimetri di movimento verticale, non una camera galleggiante instabile.
- Look-around: limitato, senza cambiare la composizione del frame.

## Cinque stazioni, nessun vuoto

Pentagono regolare di raggio **16 m**, intervallo costante di **72°**. Icona, disco, luce radente e camera appartengono alla stessa stazione. Rimuovere una sesta icona non basta: vanno ridistribuiti tutti i vertici, come fa `pentagonLayout()`.

| Stazione | Angolo | X, m | Z, m |
| --- | ---: | ---: | ---: |
| Memento | -36° | -9,405 | 12,944 |
| Services | 36° | 9,405 | 12,944 |
| Projects | 108° | 15,217 | -4,944 |
| Levelup | 180° | 0 | -16 |
| Start | 252° | -15,217 | -4,944 |

`public/src/cinematography.js` è il punto unico per layout, altezza camera, fit responsive, pedane, yaw HDRI e trattamento dei materiali. I GLB rimangono separati dalle scelte di regia.

## Le cinque tavole

| Tavola | Lettura della forma | Luce e materiale | Movimento |
| --- | --- | --- | --- |
| MEMENTO | Monogramma angolare, diagonali e vuoti riconoscibili | Grafite lavorata, bevel freddo, ambra lungo una diagonale interna | Arrivo frontale; assestamento lento sul marchio |
| SERVICES | Nodo di fasce intrecciate | Grana fine, roughness variabile, ambra nelle cavità | Arco laterale molto morbido per far leggere il volume |
| PROJECTS | Cartelle sovrapposte, tab ben leggibile | Lastre scure, bordi a strati, accento radente | Tre quarti contenuto per separare i piani |
| LEVELUP | Freccia ascendente con spazio negativo | Facce quasi nere, rim sulla diagonale alta | Camera sempre bassa; la verticalità viene dalla scultura |
| START | Sparkle concavo e piccolo elemento compagno | Silhouette pulita, dettaglio negli spigoli, ambra sottile | Pausa visiva, riflesso leggibile, poco FX |

Le tavole non definiscono quote misurabili o la posizione esatta degli oggetti lontani. La geometria del pentagono è definita dal rig e dalla tabella sopra.

## Materiali, acqua e atmosfera

**Icone.** Grafite/metal scuro con superfici credibili a scala metrica. Conservare i bevel: la luce deve descrivere la forma. Normal microfine, roughness non uniforme e poche abrasioni sui bordi; evitare il contrasto di una texture rocciosa ingrandita. Target da rifinire: metalness 0,7–0,85 e roughness 0,32–0,46. Emissione ambra stretta solo nei canali previsti, senza trasformare tutta l'icona in neon.

**Pedane.** Geometria originale appiattita e abbassata; top a +0,025 m. Materiale nero satinato, roughness 0,66, riflessione ambientale contenuta. Il contatto con l'acqua e il riflesso devono unire il disco alla scena.

**Acqua.** Riflesso planare 1024² desktop / 512² portrait. Due frequenze di normal, ampiezza ridotta rispetto a v010. Distorsione abbastanza piccola da preservare la forma riflessa; increspature del puntatore locali. Il riflesso è parte della composizione, non un effetto decorativo.

**HDRI.** Usare il file allegato `belfast_sunset_puresky_2k.hdr`, conservato senza alterazioni. SHA-256: `273003109ca1cfb798ce6b96e09ac8440f763d0ef0c376bbe77492613540b4a3`. Rotazione iniziale 135°, background intensity 0,012, environment intensity 0,4, esposizione AgX 0,82. Sono punti di partenza per la calibrazione sul dispositivo; HDRI e luce direzionale non devono schiarire le pedane fino al bianco.

**Fog.** Fog esponenziale di distanza più banchi bassi nello spazio 3D. Tre profondità visive: scultura nitida, acqua e foschia intermedia, montagne quasi dissolte nell'atmosfera. Non usare la fog come velo pieno sopra il DOM. La v011 mantiene il mondo esistente e ne riduce la leggibilità lontana; per il look delle tavole le silhouette montuose richiedono ancora una passata dedicata.

**FX.** Nelle tavole: halation sottile, bloom limitato ai picchi, grana quasi impercettibile. La demo non implementa ancora un bloom selettivo o DOF: aggiungerli dopo il bilanciamento di luce e materiali, con verifica mobile. Non sfocare titolo o interfaccia Framer insieme al mondo.

## Regia del viaggio

1. **Selezione**: drag/swipe segue la mano; al rilascio il rig si aggancia al vertice. Gli spostamenti avvengono su un arco del pentagono, senza attraversare le sculture. Durata nominale di un click: circa 0,95 s.
2. **Ingresso**: click/tap sulla scultura o sul titolo, tastiera ↓/Invio o comando OPEN da Framer. Preload dell'URL reale, camera che inclina verso il riflesso e avanza di 0,85 m. Altezza minima sempre positiva. La pagina emerge dal basso mentre la scena esce in alto. Durata nominale 1,85 s. Nessuna dissolvenza opaca.
3. **Contenuto**: pagina esterna nel suo iframe, scroll nativo, nessuna copia locale. Rendering 3D sospeso quando coperto.
4. **Fine pagina**: il bridge rileva il fondo reale dopo un gesto/scroll. La pagina continua verso l'alto; la scena rientra dal basso. La camera risale dal riflesso alla stessa scultura. La navigazione è nuovamente disponibile.
5. **Ritorno anticipato**: Escape o RETURN da Framer inverte il percorso. Il bridge inoltra Escape quando il focus è dentro la pagina esterna.

## Collegamento delle pagine esterne e Framer

Il loop di fine pagina è implementato in entrambi i lati. Il bridge **deve essere incluso e distribuito nelle cinque pagine remote**. Non è stato pubblicato automaticamente nei loro repository o su Vercel. Il contenitore non può leggere direttamente lo scroll cross-origin.

`integration/install-bridge.py` inserisce il bridge inline nelle copie locali dei cinque `index.html`, mantenendo un backup e senza modificare i contenuti. L'inserimento inline evita di dover cambiare build che copiano una lista chiusa di file JS. Dopo l'inserimento, ridistribuire quei cinque siti con il loro normale workflow.

In alternativa copiare `public/tide-child-bridge.js` in ciascun sito e includere `<script src="/tide-child-bridge.js" defer></script>`. Se il sito usa un contenitore di scroll diverso dal documento, aggiungere `data-tide-scroll-root="#selettore"` allo script. Opzionalmente `data-tide-parents="https://origine-del-tide"` restringe gli host consentiti oltre alla verifica del referrer e della finestra parent.

Il bridge invia solo stato dello scroll e comandi di ritorno, mai dati dei form. È inattivo quando la pagina è aperta da sola.

`integration/framer-controls.js` collega i pulsanti della navbar esistente al vero iframe TIDE. Offre `select(slug)`, `open(slug)` e `back()`. Slug: memento, services, projects, levelup, start. Non crea alcun nuovo elemento grafico. Lasciare una referrer policy che includa almeno l'origine, come `strict-origin-when-cross-origin`, per consentire l'handshake.

## Verifica da fare su GPU

Il browser di prova può non fornire WebGL. I test automatici verificano quote, pentagono, continuità camera, loop e bridge; non dimostrano la qualità visiva o gli FPS. Verificare un frame fisso per sezione a 390×844, 1440×900 e ultrawide: nessun taglio della scultura, disco scuro, titolo sotto la base, riflesso distinguibile e transizione senza lampi.
