# Servizi V43 — navbar V12 sulla base precedente al VFX Pass

## Base e integrazione

- Base originale: `MEMENTO_SERVIZI_V40_VERCEL.zip`, versione 6 del file recuperato.
- Kit: cartella `navigation/` del file allegato `NAV_OVERLAY.zip`, 21 file copiati integralmente.
- La V43 non deriva dalla V42: il progetto viene estratto dalla V40 e riceve solo l'integrazione della navbar e gli spazi necessari.
- Un solo bootstrap V12, `data-memento-page="services"`, hub `https://mementostudio.it`.
- Logo superiore, dock inferiore, Services attivo in ambra; collegamenti del kit verso `/`, `/studio`, `/services`, `/projects`, `/levelup`, `/start`.
- Blur superiore e inferiore del kit: 20% del viewport per fascia, otto livelli per lato, raggio massimo 7 px.
- Target da 48 × 48 px, box da 40 px; rail da 320 px che si adatta ai viewport stretti.
- Spazi di sicurezza iniziale/finale, safe area e skip link sopra l'overlay.
- Navbar montata nel body fuori dalle superfici filtrate del catalogo; dialoghi nativi nel top layer.
- Cartella `navigation/` inclusa nell'allowlist di produzione.

## Assenza del VFX Pass

Confrontati 530 file dell'applicazione originale (cartelle `src/`, `assets/`, `bootstrap.js`, `memento-services-host.js`): tutti identici alla V40.

Assenti nei sorgenti e nella build: `src/vfx.js`, `src/fx-config.js`, `src/fx-math.js`, inizializzazione `startVFX`, watchdog `data-fx-boot`, canvas `.memento-fx` e maschere del VFX Pass. Le animazioni originali della V40 non sono state rimosse.

## Verifiche del 6 novembre 2026

- `npm test`: 5/5 superati.
- `npm run build`: superato; moduli e asset navbar inclusi in `dist/`.
- Kit: 21/21 file identici al pacchetto fornito.
- Desktop Chromium 1363 × 936: un solo overlay, Services attivo, 16 livelli di blur e nessun overflow orizzontale.
- Viewport iframe da 320, 390 e 1024 px: logo e dock centrati, target da 48 × 48 px, nessun overflow; API, canvas e bootstrap del VFX Pass assenti in tutti i casi.
- Popup Brand online a 390 px: apertura, cambio alla tavola “I servizi inclusi” e chiusura verificati.

La prova mobile usa viewport iframe Chromium, non hardware iOS/Android. I risultati storici presenti in `AUDIT.md` e `VALIDATION.json` descrivono la base V40; non vengono presentati come nuove verifiche della V43. Le fixture temporanee di controllo non fanno parte dello ZIP o della build finale.

## Vercel e iframe

Estrarre lo ZIP nella root del progetto Servizi. Configurazione esistente: preset Other, `npm run build`, output `dist`, nessuna dipendenza runtime. Questa consegna è il pacchetto da pubblicare; non modifica il deployment pubblico.

Con un host compatibile, il bridge nasconde la navbar del child per evitare duplicazioni. L'overlay visibile in quel caso appartiene al parent. Con un embed Framer privo di handshake compare invece l'overlay locale: non sovrapporre una seconda navbar esterna.
