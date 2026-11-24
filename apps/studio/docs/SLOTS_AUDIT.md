# Studio Cinematic Slots — audit

Data: 6 novembre 2026. Perimetro: solo Studio 3D.

## Problemi risolti

| Problema | Intervento |
|---|---|
| Disco scuro sospeso sotto il softbox | Eliminata la geometria emitter aggiunta; emissione sulla superficie originale |
| Menu e troppi testi | Tre azioni casuali dirette, icone e soli annunci accessibili |
| Catalogo shader precedente | 22 stili Atlas portati e 6 estensioni coerenti |
| Illuminazione poco varia | 34 rig con distribuzioni, colori, intensità, proiezioni e movimenti distinti |
| Sfondo granuloso e VFX invadenti | Sfondo RGB 0,0,0; rimossi atmosfera e vecchio effetto Ready |
| Schermi statici | Cinque composizioni emissive procedurali con fase e palette adattive |
| Pochi punti leggibili nella vista generale | 48.000 campioni desktop / 24.000 mobile |
| Voxel nero e display coperti | Colore istanze corretto, esclusione dei monitor dal campo voxel |
| Ricompilazioni durante cambio trasparenza | Pipeline materiale comune, alpha e depth cambiano senza ricompilazione |

## Copertura tecnica

Cataloghi: 28 shader, 34 rig, 20 inquadrature. Test di 16.400 estrazioni senza ripetizioni consecutive, con copertura integrale per ciclo. Verificati parametri effettivi dei rig, ultima richiesta prevalente e collegamento delle uniformi al postprocess.

Navigazione: 361 transizioni interne, interruzioni, ritorno dal fuoco e attraversamento del passaggio in uscita/rientro. Sei rapporti viewport per la proiezione iniziale. GLB desktop/mobile e griglia confrontati con hash della versione precedente. Destinazione del link Memento invariata.

## Controllo visivo

Revisione Chrome del sito Studio: tutti i 28 shader selezionati e acquisiti, 20 inquadrature raggiunte; verificati isometria, softbox, display, caffè, libreria, tastiere e salotto. Nessun errore WebGL durante il ciclo shader. I dettagli dei controlli finali e della consegna sono nel registro `GATES-SLOTS.md` e nella ricevuta di esportazione.

## Compromessi espliciti

I nomi fotografici dei 34 setup sono tradotti in illuminazione dello spazio: Rembrandt/Butterfly/Broad/Short descrivono rapporti e direzioni, senza simulare un volto. Window, Venetian e Dappled usano proiezioni procedurali. Volumetric usa un cono trasparente localizzato, senza nebbia globale. Strobe usa una pulsazione lenta di 2,8 secondi, sospesa con pausa o movimento ridotto.

Glass, chrome e gli altri stili riflettenti usano il linguaggio procedurale Atlas, senza ray tracing. Non sono misurati 60 fps su dispositivi fisici mobile: sono adottati LOD, DPR adattivo, instancing, shader condivisi e rendering condizionale. La verifica responsive nel browser non equivale a una prova su tutti i telefoni.

## Esito finale e limite della verifica

Completato il ciclo desktop di tutti i 34 rig senza errori WebGL. La build finale aggiunge la pipeline trasparente comune, il caricamento parallelo e la densità point cloud maggiore. Tutti i controlli di catalogo, integrazione, navigazione e modello passano sulla build finale. A 390×844 il DOM non presenta overflow, i tre target sono 60×60 e non ci sono testi visibili. La scheda è stata chiusa durante il caricamento e il browser collegato ha smesso di rispondere: il render mobile finale e la regressione visiva dopo questi ultimi ritocchi non sono stati completati. Non vengono dichiarati verificati.
