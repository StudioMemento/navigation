# Collegamenti TIDE — esportazione Vercel v009

Verifica del 28 ottobre 2026 (Europe/Rome), con richieste HTTP GET in sola lettura. Tutte le cinque destinazioni dirette rispondono **200 OK**, senza redirect. Questo controllo certifica la raggiungibilità, non il funzionamento completo delle applicazioni esterne.

| Stage | Destinazione | Comportamento previsto |
|---|---|---|
| Memento | Locale | Focus/esplorazione e ritorno alla panoramica; nessun iframe della home |
| Services | https://mementoservizi.vercel.app/ | Ciclo locale esistente, con collegamento reale alla pagina autonoma |
| Projects | https://mementoportfolio.vercel.app/ | Focus e collegamento esplicito alla pagina autonoma |
| Studio | https://mementostudio.vercel.app/ | Focus e collegamento esplicito alla pagina autonoma |
| Level Up | https://mementolevelup.vercel.app/ | Focus e collegamento esplicito alla pagina autonoma |
| Start | https://mementostart.vercel.app/ | Focus e collegamento esplicito alla pagina autonoma |

Studio usa **l'indirizzo indicato dall'utente nella richiesta corrente**, che prevale sulla nota di URL mancante nel master originale. Il vecchio indirizzo Framer `https://mementostudio.it/studio` esiste ma non è la destinazione selezionata. Non sono stati inventati contenuti Studio.

I candidati Vercel delle altre quattro sezioni sono elencati nel master, sezione 8.6, e confermati dagli iframe delle corrispondenti pagine pubbliche `mementostudio.it`. Le cinque risposte non espongono header `Content-Security-Policy` o `X-Frame-Options`; questa osservazione non certifica l'embedding, che non è richiesto per i quattro collegamenti autonomi.

## Verificato

- Cinque richieste GET alle destinazioni finali: 200 OK, URL finale invariato, documento HTML ricevuto.
- Studio: titolo ricevuto `Memento — Studio 3D`, nessun iframe nel documento iniziale.
- Services: titolo ricevuto `Servizi — Memento Design Studio`.
- Projects: titolo ricevuto `Portfolio — Memento`.
- Level Up: titolo ricevuto `Level Up — Memento`.
- Start: titolo ricevuto `Start — Memento Design Studio`.

Le richieste non hanno inviato form, email o messaggi e non hanno modificato alcuna pagina esterna.

## Limiti e regia

Interazione completa con le cinque applicazioni esterne, form, dispositivi fisici e integrazione embedded: **non verificato** da questo audit. I quattro link autonomi mantengono la landing nella scheda corrente; non equivalgono a quattro nuovi cicli di contenuto TIDE.

Il frontend originale gestiva solo il ciclo Services e non eseguiva le rotte cinematografiche v008. Il file di authoring `data/paths_world_v008.json` contiene 171 rotte pubbliche e 30 interne: Bézier con tabella di lunghezza d'arco, easing quintico, direzione di sguardo separata dalla tangente, sei rotazioni delle icone e maschere di entrata/uscita. Per dichiarare tali invarianti nel web serve un campionatore equivalente verificato; il solo nuovo GLB dell'ambiente non le trasferisce. Il JSON completo di audit non va caricato all'avvio: è adatto un derivato compatto delle definizioni esatte.

L'evidenza strutturata è in `navigation_audit.json`. I test del pacchetto e del browser sono separati e devono riferirsi ai file finali effettivamente esportati.
