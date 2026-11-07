# R6 — Ripristino della sezione e home Framer

La home pubblica incorpora `https://mementonav.vercel.app/` in un iframe. Il frammento della pagina esterna, per esempio `https://mementostudio.it/#start`, non viene passato automaticamente all'iframe. Il codice dello slider non può leggere quel frammento cross-origin.

## Integrazione necessaria nella home

In Framer, applicare il contenuto completo di **framer-nav-bridge.html** al Custom Code della sola home, posizione **End of body**, quindi pubblicare la home. Lo script riusa l'iframe esistente, gli assegna il titolo accessibile `Navigazione Memento` e scambia soltanto le cinque identità di sezione. Non crea overlay o iframe aggiuntivi.

Il bridge controlla origine, finestra sorgente, canale, versione, sessione e sezione. Non accetta URL o comandi arbitrari. Il ritorno `/#start`, i cambi di hash e la cronologia del documento esterno raggiungono così lo slider; i cambi sezione dello slider aggiornano il frammento esterno senza creare una voce di cronologia a ogni scroll.

## Comportamento senza modifica della home

Lo slider conserva la sezione selezionata in `sessionStorage` del proprio dominio, con fallback sicuro quando lo storage è bloccato. Un collegamento esplicito `mementonav.vercel.app/#levelup` mantiene la precedenza. Un referrer attendibile che contiene una sezione può aiutare, ma spesso il browser trasmette soltanto l'origine o l'URL della home.

Questo fallback permette di ritrovare l'ultima sezione nella stessa sessione. **Non equivale alla sincronizzazione del frammento della home:** una prima visita a `mementostudio.it/#start` richiede il bridge Framer. Il titolo dell'iframe deve anch'esso essere impostato dal documento host.

La risposta iniziale del parent non può annullare un'interazione già iniziata nello slider. Dopo il collegamento, una nuova navigazione esplicita del parent resta autorevole. Il fallback non dipende dall'accesso al DOM esterno né da `postMessage('*')`.

## Verifica

`node scripts/verify-route.mjs` verifica priorità dei deep link, storage bloccato, origini/sorgenti/sessioni errate, risposta iniziale tardiva, cronologia del parent, titolo accessibile e cleanup. Esegue anche il codice del frammento Framer distribuito, senza duplicarne l'implementazione nel test.

Per la verifica integrata: aprire la home a `/#start` → deve comparire Start; scegliere LevelUp → il frammento esterno diventa `#levelup`; cambiare il frammento esterno in `#projects` → deve comparire Projects; aprire Start e usare “Continua il viaggio” → torna Start. Verificare anche frecce della cronologia e una sessione con storage disabilitato.
