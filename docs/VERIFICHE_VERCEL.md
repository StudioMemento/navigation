# Verifiche del pacchetto Vercel V1

Data: 2 novembre 2026. Pacchetto destinato al progetto esistente `mementonav`.

## Eseguite su questa consegna

- Integrità dei 2.269 file elencati nel manifesto della preview originale: tutte le dimensioni e le impronte corrispondono.
- Installazione riproducibile con `npm ci --ignore-scripts --no-audit --no-fund`: riuscita, Three.js bloccato alla versione 0.180.0.
- `npm test`: 10 test superati, relativi a camere, proporzioni, orientamento, navigazione, ritorno, movimento ridotto, gerarchie e telemetria.
- `npm run build`: riuscita; 1.211 file pubblici, 61.026.468 byte, 682 nodi sorgenti.
- 98 riferimenti statici locali nei file HTML/CSS verificati: nessun percorso mancante, inclusa la corrispondenza tra maiuscole e minuscole.
- I campi di configurazione utilizzati sono stati validati con le corrispondenti definizioni dello schema ufficiale Vercel. Definizioni sperimentali estranee a questa configurazione, che mescolano versioni dello schema JSON a monte, non sono state incluse nella validazione.
- 25 controlli HTTP sul risultato della build: home, quattro collegamenti diretti, quattro pagine incorporate, JavaScript, modello, dati scena, HDR e decoder. Verificati redirect con slash finale, byte range e 404 per file assenti o non pubblici.
- Browser Chromium headless su Linux: caricati tutti i 682 nodi, nessuna gerarchia mancante; ingresso e ritorno per Services, Projects, LevelUp e Start.
- Layout controllato a 1280 × 720 e 390 × 844 CSS pixel: nessun overflow orizzontale o immagine fallita rilevati nelle pagine visitate.
- Ricaricamento diretto di `/services/`, `/projects/`, `/levelup/` e `/start/`: la sezione corretta si apre dentro il mondo.
- Ciclo Services completo con movimento attivo: discesa, apertura pagina e risalita.
- Nessun errore JavaScript non gestito o risposta HTTP di errore per le risorse richieste dal browser durante il percorso verificato.

Il riepilogo numerico completo di questa sessione è `VERIFICHE_BROWSER.json`.

## Conservazione degli asset

Il confronto dei file pubblici con lo ZIP ricevuto rileva una sola modifica: `public/index.html`, per titolo, descrizione, favicon e diciture dell'interfaccia. GLB, HDR, JSON della scena, script di navigazione, fog e pagine integrate sono byte per byte quelli della preview. Configurazione, build, server di controllo e documentazione sono nuovi file esterni agli asset originali.

SHA-256 del GLB conservato:

`0d0a2a504da0f54722c2244d7a44bd13cb124475b39e3c01827ae5ecb888dd00`

SHA-256 dello ZIP sorgente:

`b549c61cda116c6e906e2eed9d9682730c3fff0163cd5b549358613f979020d5`

## Limiti della verifica

Il browser di controllo usa rendering software e pixel ratio 0,5 per le verifiche funzionali. Questi risultati non misurano fluidità su hardware reale, 60 fps, touch fisico, Safari/iOS o velocità di caricamento dalla CDN. È stata ispezionata una cattura desktop del mondo; la resa grafica resta quella della preview, con le differenze già documentate rispetto al Blender.

I controlli HTTP usano un server locale che applica le route dichiarate nel pacchetto; non sono prove di un deploy remoto. Il sito pubblico non è stato sostituito da questa attività. Dopo il deploy, verificare sul dominio finale i collegamenti diretti e l'ingresso/ritorno delle quattro sezioni.

Le pagine sono le copie originali della preview: Services del 26 ottobre; Projects, LevelUp e Start del 1 novembre. Le evoluzioni successive dei rispettivi progetti non sono state importate automaticamente. Le misure contenute in `VERIFICHE_ORIGINALI.md` restano storico separato.
