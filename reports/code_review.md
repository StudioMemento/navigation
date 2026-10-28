# TIDE Vercel v009 — revisione del controller

Revisione statica di `public/src/app.js`, collegamenti, caricamento asset e uso del campionatore v008. SHA-256 app: `ad0d40e42c6119b874f89bed4beeec5587281f310c7ef798f2ada27d72c41cc9`.

Correzioni verificate:

- Back/Forward fra sculture non aggiunge voci alla cronologia.
- `#services-content` viene riconosciuto da Forward e dal collegamento iniziale; se necessario prima completa il focus Services, quindi apre il documento senza duplicare la cronologia.
- Il controller imposta `history.scrollRestoration='manual'` prima di usare la cronologia. Il browser non deve ripristinare lo scroll del catalogo dopo Back e riaprire involontariamente CONTENT. La regressione Node include l'ordine popstate → ripristino scroll → composizione; la conferma nel browser reale è distinta.
- Services non pronto mantiene la posa d'ingresso a progresso massimo 0,45 anche se lo scroll supera la fascia di ingresso. Il contenuto rimane non interattivo; il timeout conserva i collegamenti diretti.
- Escape da un ingresso parziale percorre al contrario lo stesso tratto, quindi ritorna all'overview.
- L'uscita naturale dal catalogo completa il loop e ripristina lo scroll a zero.
- Le cinque icone del GLB vicini possiedono `role=icon` e `stage_id`; le yaw sono applicate in Web Y-up senza una seconda conversione degli assi.
- Le card fog utilizzano dimensioni, posizioni, opacità e moto dal riferimento v008: sei desktop, tre nel caricamento portrait.

Verifiche eseguite:

- Sette regressioni Node sul controller effettivo, con host DOM/cronologia e campionatore reale: **7/7 PASS**. Rapporto `navigation_state_regression.json`.
- 3.417 campioni analitici e 171 combinazioni pubbliche contro Python v008: **PASS**, massimo scarto posizione/target circa 1,34×10⁻¹³ m. Rapporto `world_routes_parity.json`.
- Parsing JavaScript di app e campionatore: **PASS**.

Limiti della revisione:

- I test Node non verificano il browser, WebGL, lo scroll nativo, il focus accessibile o l'History API reale; usare le prove browser separate.
- La dissolvenza DOM è smorzata nel tempo e non coincide in ogni frame con `maskFog` del riferimento Blender. Questa revisione non certifica copertura opaca esatta o assenza di landmark in tutti i frame del raccordo.
- Il cambio di formato mentre una camera si muove, l'arrivo tardivo di READY dopo scroll profondo e Back ripetuto durante il movimento richiedono prove browser specifiche. Nessuna verifica hardware mobile o promessa di prestazioni.
- Projects, Studio, Level Up e Start sono collegamenti alle pagine reali esterne; non sono cicli iframe locali certificati.

Non sono emersi errori bloccanti aggiuntivi per il caricamento o il collegamento delle pagine nella revisione statica. La validazione browser e del pacchetto rimane distinta.
