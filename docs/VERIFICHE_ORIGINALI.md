# Memento — verifica della preview web V1

Consegna locale del 01/11/2026. Base: **EVOLUZIONE V2**. Nessuna pubblicazione o modifica al sito live.

## Risultato

Cinque stazioni navigabili nello stesso mondo. Services completa ingresso, catalogo e ritorno sulla traiettoria inversa; Projects, LevelUp e Start sono integrate come pagine locali. Sono conservati filtri, schede, dettagli del portfolio, caroselli, confronto prima/dopo, FAQ e pannelli informativi. I collegamenti tra sezioni risalgono alla torre, percorrono l'orbita ed entrano nella destinazione locale.

## Sorgente e geometria

- SHA-256 del Blender V2: `1c1516cc2be96d53344cf515c8b42802a2ec9b5d7f924ce2ea5f096ea2d39ed3`.
- File nativo letto senza salvarlo; originali e revisioni precedenti conservati.
- **682 nodi**, **625 mesh**, **152.818 triangoli**, nomi e gerarchie conservati. Nessuna fusione, decimazione o spostamento delle torri tra viste.
- Reimportazione GLB in Blender: **625/625 mesh**, nessuna differenza nei conteggi dei triangoli; distanza massima dal vertice sorgente **0,0629 mm**. È il confronto dei vertici valutati, nello spazio mondo e allo stesso fotogramma; non una certificazione dell'identità degli shader.
- Camere desktop/mobile/ultrawide trasferite con posizione, orientamento, ottica e clipping; test numerici sulle **15 pose native**.
- Orbita di 1.201 campioni, discese di 181 campioni a 30 fps; 27 tracce di movimento e 5 tracce di emissione. Transizioni fra stazioni di 3 secondi, ingresso/ritorno di 6 secondi. Le corone e le icone continuano il movimento durante la navigazione.
- Nei telefoni più alti del riferimento 720×1280, il campo orizzontale resta quello del Blender; si amplia il campo verticale. Posizioni e geometrie restano identiche. Questa correzione evita la sovrapposizione tra titolo 3D e freccia.
- HUD derivato dalle sagome native; rombo centrato con diagonali pari a 0,87 del lato corto. Titoli conservati come mesh nel mondo.

## Verifiche dell'interazione

Eseguite nel browser Chromium su Windows: cinque stazioni, ingresso/ritorno delle quattro pagine, Services Digitale 30/Fisico 14 e dettaglio Sito web, Projects filtro Web 11 e dettaglio Auren, LevelUp cambio slide e confronto 49/51%, Start FAQ e pannello Privacy. Assenza di overflow orizzontale e immagini mancanti nelle viste controllate. Le correzioni a cronologia e ridimensionamento sono documentate nei file di verifica.

Desktop 1600×900 e mobile 390×844 sono dimensioni CSS lette dalla pagina, non dedotte dalla schermata. Verifiche aggiuntive a 360×800 e ultrawide 2155×909; la proiezione nativa 2560×1080 è verificata numericamente. Il sistema di cattura IAB può ridimensionare le immagini; per misure e layout fanno fede i dati DOM e i JSON, non i pixel del file JPEG. Il movimento ridotto è verificato con il controllo di prova e nei test della navigazione; il codice legge anche la preferenza di sistema.

**Non eseguiti:** test su un telefono fisico, touch reale, Safari/iOS, Firefox e rete mobile. Le misure in formato mobile usano la stessa GPU desktop. Email, WhatsApp e contatti non sono stati inviati. Non è stata verificata ogni demo online esterna del portfolio.

## Prestazioni misurate

ANGLE (NVIDIA, NVIDIA GeForce RTX 3070 Ti (0x00002207) Direct3D11 vs_5_0 ps_5_0, D3D11). Chromium 156; 8 processori logici e 16 GiB esposti dal browser. HTTP locale, nessuna limitazione artificiale di CPU/rete; server già avviato, cache HTTP no-store, cache del driver GPU non svuotata. Preparazione di materiali e geometrie durante il caricamento iniziale.

Desktop: 1600×900, render a 1,25× (2000×1125). Mobile: 390×844, render a 1×. FPS = fotogrammi / **intera finestra di tempo**, inclusa l'attesa del primo fotogramma. P95 = tempo entro cui termina il 95% dei fotogrammi; picco e conteggio oltre 33,34 ms rendono visibili gli scatti. Le query GPU sono asincrone; il tempo CPU nei JSON misura l'invio del rendering, non tutto il lavoro della pagina.

| Scenario | Durata | FPS medi | P95 fotogramma | Peggiore | Oltre 33 ms | P95 GPU |
|---|---:|---:|---:|---:|---:|---:|
| Desktop · Memento fermo | 12,0 s | 115,5 | 12,0 ms | 338,2 ms | 7 | 9,2 ms |
| Desktop · navigazione | 15,0 s | 116,1 | 11,9 ms | 455,0 ms | 8 | 9,3 ms |
| Desktop · ingresso Services | 6,0 s | 95,8 | 13,2 ms | 479,8 ms | 6 | 8,7 ms |
| Mobile · Services fermo | 12,0 s | 151,9 | 9,7 ms | 64,7 ms | 3 | 5,9 ms |
| Mobile · navigazione | 15,0 s | 79,6 | 21,7 ms | 91,7 ms | 15 | 11,5 ms |
| Mobile · ingresso Services | 6,0 s | 148,0 | 10,1 ms | 126,3 ms | 4 | 5,4 ms |

Il primo mondo visibile nelle sessioni finali è arrivato dopo **1,46 s desktop** e **1,41 s mobile**. Sono ricaricamenti locali, non tempi previsti su Internet. Le risorse iniziali trasferite sono circa **9,44 MB** con Brotli, prima delle pagine; il GLB su disco pesa 7,18 MB.

Quando una pagina è aperta, il rendering del mondo 3D è sospeso. Misura separata della pagina Services (12 secondi, intervalli del browser; non è una misura GPU della scena):

| Pagina | FPS | P95 intervallo | Risorse aggiuntive trasferite |
|---|---:|---:|---:|
| Desktop · pagina Services | 217,7 | 4,3 ms | 1,50 MB |
| Mobile · pagina Services | 226,8 | 4,3 ms | 1,45 MB |

Gli scatti riportati restano osservazioni reali di questa sessione. Prima del riscaldamento iniziale, il primo uso di alcuni materiali produceva attese più lunghe. I JSON in `baseline-before-warmup` sono storico diagnostico: il vecchio strumento escludeva il primo intervallo dal calcolo FPS e **non va usato per le prestazioni finali**. Il test dedicato ora impedisce questa regressione.

## Differenze visive ancora aperte

| Area | Preview web | Differenza rispetto al Blender |
|---|---|---|
| Nuvole e nebbia | Profondità reale, mare di nubi, velo vicino e soffitto con rumore animato; 18 passi desktop/12 mobile | Forme dei banchi più semplici, talvolta piatte; mancano auto-ombreggiatura volumetrica, scattering multiplo e identica distribuzione della polvere. |
| Carbone e metallo | Materiali PBR esportati, HDR originale e luci area | Alcune facce sono più lucide/chiare. Shader procedurali, ombre di contatto e riflessi fra oggetti non equivalgono a Cycles. |
| Illuminazione | Quattro luci globali, otto luci del rig locale interpolate durante l'orbita, luce ambiente | Il rig è una traduzione ottimizzata e calibrata; non vengono calcolate tutte le luci e ombre native. |
| Ambra e glow | Tracce di emissione originali e alone leggero | La diffusione nella nebbia e il bloom sono più semplici del compositing Blender. |
| Colore e bordi | AgX, esposizione −0,6 e contrasto adattato; risoluzione mobile limitata | Il look Medium High Contrast non è una replica OCIO; aliasing e bordi sottili sono più visibili sul formato mobile. |

L'HDR usa l'immagine originale; il nodo World Normal della V2 richiede inversione della latitudine e rotazione differente rispetto al lookup standard del browser. La trasformazione è verificata numericamente. Riferimenti: [Blender — coordinate dello sfondo](https://github.com/blender/blender/blob/main/intern/cycles/kernel/geom/shader_data.h), [proiezione equirettangolare](https://github.com/blender/blender/blob/main/intern/cycles/kernel/camera/projection.h), codice Three r180 incluso nella consegna.

Questa è una preview navigabile e verificata. La corrispondenza geometrica è misurata; **non viene dichiarata parità visiva con Cycles né prestazione certificata su telefoni**. Per avvicinare ulteriormente il render: banchi volumetrici più dettagliati, ombre e riflessi dedicati, antialiasing e verifica su dispositivi reali. Le gerarchie consentono di proseguire senza rimodellare il mondo.

## Provenienza delle pagine e isolamento

Services deriva dalla copia locale del 26 ottobre 2026 già presente nel progetto TIDE. Le altre pagine sono snapshot pubblici del 1 novembre 2026:

- projects: https://mementoportfolio.vercel.app/ · 920 file raccolti, 29,85 MB prima della compressione.
- levelup: https://mementolevelup.vercel.app/ · 30 file raccolti, 3,15 MB prima della compressione.
- start: https://mementostart.vercel.app/ · 34 file raccolti, 1,71 MB prima della compressione.

Originali dei tre snapshot in `source/pages`; manifesti, hash e tentativi di raccolta in `PAGE_SNAPSHOTS.json`. Le voci mancanti del crawler includono espressioni JavaScript scambiate per percorsi e decoder opzionali non usati dai contenuti verificati; non sono tutte richieste effettive della pagina. I derivati responsive non presenti di LevelUp sono stati sostituiti dalle immagini originali locali. Le verifiche del browser registrano separatamente le immagini realmente fallite: nessuna nelle viste controllate.

Le quattro pagine principali non richiedono il sito live per funzionare. Demo esterne, video incorporati del portfolio, Google Maps, social ed email restano destinazioni online esplicite. Le demo LevelUp e la mappa non partono automaticamente. Il server serve soltanto `public` su 127.0.0.1; non espone Blender, snapshot sorgenti, rapporti o credenziali.

## Prove incluse

- `GEOMETRY_REIMPORT.json`, `BLENDER_WEB_EXPORT.json`: geometria e provenienza.
- `TESTS.txt`, `HTTP_CHECKS.json`: test numerici della navigazione/ottica/misura e risposte del server.
- `PERF_*.json`: campioni aggregati, tempi CPU/GPU, risorse, hardware e stato delle pagine.
- `UI_CHECKS.json`, `MOBILE_*_CHECK.json`, `DESKTOP_FIVE_STATIONS.json`, `MOBILE_FIVE_STATIONS.json`, `RESPONSIVE_EXTRA.json`: controlli eseguiti nel browser.
- `screenshots`: scene e pagine, con riferimenti Blender originali in `public/assets/reference`.
