# Export Vercel — MEMENTO TIDE v009

Data: 28 ottobre 2026, Europe/Rome.

## Cosa è stato costruito

Landing statica TIDE utilizzabile come navigazione tra le sei sculture, con geometria della famiglia v007 e montagne v008. Il controller usa nel browser i parametri analitici delle rotte v008 per overview, focus, discesa e ritorno Services; non applica una seconda conversione degli assi. Le card fog riprendono i parametri v008. Acqua, ripple, riflessione e raccordi HTML restano compiti espliciti del runtime.

Services mantiene il catalogo locale e il ciclo nel lago. Projects, Studio, Level Up e Start aprono le pagine reali in una nuova scheda, conservando la landing nella scheda originale. Studio usa esattamente `https://mementostudio.vercel.app/`, indicato dall'utente. Memento è l'ancora del lago. Nessun nuovo contenuto editoriale, simbolo o decorazione è stato inventato.

Il server del precedente campione non è richiesto da Vercel. La build genera HTML/CSS/JavaScript Services statici e include i media prima remoti. Le cinque destinazioni hanno collegamenti diretti anche in caso di WebGL o JavaScript non disponibile.

## File salvati

- Cartella distribuibile: `deploy/vercel_v009/`, con `vercel.json`, `package.json`, `README.md` e `public/`.
- Configurazione collegamenti: `public/data/navigation.json`.
- Rotte runtime: `public/data/world-routes.json` e `public/src/world-routes.js`.
- Catalogo: `public/services/`, originali in `source/services/`, provenienza/licenze in `licenses/`.
- Verifiche: `reports/build.json`, `static_server_tests.json`, `navigation_state_regression.json`, `world_routes_parity.json`, `navigation_audit.json`, `code_review.md` e `browser/`.
- Il pacchetto ZIP viene congelato con `scripts/package.py`; manifest e rapporto esterno riportano dimensioni, SHA-256 e verifica CRC di tutti i membri.

I `.blend`, i precedenti ZIP e il frontend originale in `web/` sono preservati. Nessun sito è stato pubblicato o modificato durante questo export.

## Prova visiva e conteggi

- Sei sculture e cinque destinazioni; sette GLB nel pacchetto (tre asset famiglia desktop, tre mobile, un ambiente v008 condiviso), sempre ottimizzati.
- 173 media Services locali, 5.086.545 byte, tutti registrati per URL e SHA-256. Font Inter e relativa licenza inclusi.
- 171 rotte pubbliche, 201 definizioni comprese quelle interne, 79.561 byte di dati analitici. Confronto di 3.417 campioni contro Python: PASS; errore massimo posizione/target circa 1,34×10⁻¹³ m.
- Build: 252 controlli statici PASS nella verifica iniziale del pacchetto; il rapporto `build.json` indica il conteggio finale.
- Sette regressioni sul controller effettivo in Node e due test del server statico: PASS. Le regressioni verificano gestione dello scroll nella cronologia, ingresso ritardato, reverse parziale e chiusura del loop; non sostituiscono una prova WebGL.
- Browser desktop: sei focus verificati, Services READY con 30 schede, scorrimento nativo fino alla fine e ritorno a OVERVIEW con contatore loop incrementato. Zero errori e warning nei campioni registrati.
- Back/Forward Projects–Studio verificato nel browser. Apertura effettiva di Studio in nuova scheda e corrispondenza URL/titolo registrate; il rapporto dei collegamenti verifica HTTP 200 per tutte le cinque destinazioni.
- Services aperto da solo: filtro Fisico attivo e documento non inert, senza errori osservati.
- Portrait 390×844: caricati i GLB con texture mobile, quattro richieste GLB iniziali, tre card fog, zero errori/warning al boot; loop Services completo con ritorno al lago, PASS. Non è una prova su hardware mobile.
- Ultrawide 3440×1440: overview, quattro asset GLB caricati, zero errori/warning al boot; loop Services completo e ritorno a OVERVIEW con scroll zero, PASS.
- Verifica finale Back/Forward nel catalogo Services: Back restituisce FOCUSED con scroll zero; Forward ripristina CONTENT. Il browser ha evidenziato un problema di ripristino automatico dello scroll che i primi test Node non rilevavano. La correzione esplicita `history.scrollRestoration='manual'` è stata verificata nel browser; la prova fallita precedente resta conservata e identificata come diagnostica.
- Il riepilogo `browser_verification.json` registra 19 controlli PASS, con lo SHA-256 finale dell'app. I loop Services sono stati eseguiti nei tre formati; non equivalgono a una certificazione di tutti i dispositivi e tutte le interazioni.

I JSON e gli screenshot in `reports/browser/` definiscono esattamente la copertura delle prove finali. Le verifiche online riguardano raggiungibilità e navigazione; nessuna form è stata inviata e nessuna applicazione esterna è stata modificata.

## Divergenze dal master

Il payload iniziale osservato è 13,315 MiB desktop e 11,921 MiB portrait. I budget iniziali del master (10 MiB desktop, 6 MiB mobile) **non sono rispettati**. L'export mantiene le texture realistiche e gli asset verificati; non dichiara un'ottimizzazione ulteriore che non è stata eseguita.

Quattro destinazioni sono pagine esterne aperte in nuova scheda; solo Services possiede in questa consegna il ciclo HTML locale completo. La dissolvenza DOM è smorzata nel tempo e non è identica a ogni frame al proxy di maschera Blender. Bloom e DOF non sono abilitati.

## Limiti ancora aperti

Pubblicazione e comportamento sul dominio Vercel effettivo: **non verificato**. Safari/iOS, telefoni fisici, GPU target, obiettivi FPS, stress prolungato, tutti gli scenari di interruzione/cambio formato e interazioni complete delle pagine esterne: **non verificato**. La copertura opaca e l'assenza di landmark in tutti i frame della dissolvenza non sono certificate dai campioni raccolti.

La QA Blender originale v008 resta valida nei suoi limiti: glTF Validator e parità raw/optimized superati; criterio stretto sulle normali ricostruite al reimport Blender non superato, massimo 0,294°. Questa anomalia non è occultata e i GLB originali non sono stati alterati durante l'export.

## Prossimo passo concreto

Estrarre lo ZIP e importare la cartella che contiene `vercel.json` su Vercel, con Framework Other e Output Directory `public`. La build è già impostata. Verificare quindi il dominio di anteprima e il loop Services sul dominio effettivo; la pubblicazione in produzione rimane una successiva azione esplicita. Per raggiungere i budget del master serve un passaggio dedicato sui pesi iniziali di HDR, texture e moduli, mantenendo il confronto visivo.
