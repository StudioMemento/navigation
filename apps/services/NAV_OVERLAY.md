# Servizi V42 — integrazione overlay V12

## Implementazione

- Base: `MEMENTO_SERVIZI_V41_VFX_PASS_VERCEL.zip`.
- Overlay: cartella `navigation/` del file allegato `NAV_OVERLAY.zip`, copiata senza modifiche (21 file).
- Un solo bootstrap V12 prima della chiusura del body, con `data-memento-page="services"` e hub `https://mementostudio.it`.
- Logo originale, cinque icone, Services attivo in ambra. Dock da 320 px, box da 40 px, target da 48 × 48 px; a 320 px il rail si riduce a 280 px.
- Blur del kit su fasce del 20% superiore e inferiore: otto livelli per lato, fino a 7 px, senza velatura nera aggiuntiva.
- Spazio di sicurezza iniziale/finale fluido e safe area; skip link sopra l'overlay.
- Build statica con inclusione esplicita di `navigation/`; configurazione Vercel conservata.
- I file originali in `src/` e `assets/` sono identici alla V41: nessuna modifica a copy, fotografie, caroselli, VFX o gestione popup.

## Collegamenti

| Elemento | Destinazione |
| --- | --- |
| Logotipo | `https://mementostudio.it/` |
| Memento | `https://mementostudio.it/studio` |
| Services | `https://mementostudio.it/services` |
| Projects | `https://mementostudio.it/projects` |
| LevelUp | `https://mementostudio.it/levelup` |
| Start | `https://mementostudio.it/start` |

## Verifica del 6 novembre 2026

| Controllo | Risultato |
| --- | --- |
| `npm test` | 9/9 superati |
| `npm run build` | Superato, overlay incluso in `dist/` |
| Sintassi moduli e riferimenti locali del kit | Superati |
| Confronto kit allegato | 21/21 file identici |
| Confronto `src/` e `assets/` con V41 | 531/531 file identici |
| Desktop Chromium 1363 × 936 | Un overlay nel body, Services attivo, 16 livelli blur, nessun overflow |
| Layout iframe a 320, 375, 390, 768 e 1024 px | Logo/dock centrati, target 48 × 48 px, nessun overflow orizzontale |
| Mobile 390 × 844, CTA finale | CTA termina a circa 675 px, dock inizia a 785 px: spazio disponibile 110 px |
| Popup bundle | Apertura, passaggio a “I servizi inclusi” e chiusura verificati |
| Tastiera navbar | ArrowRight da Services porta il focus a Projects; Services resta attivo |
| Embed senza host | Fallback locale visibile, link con target `_top` |
| Handshake host di prova | READY V2/kit 12.0.0 ricevuto; child in modalità hosted, navbar locale nascosta |

La verifica del bridge usa una fixture locale con origine autorizzata dedicata alla prova; il bootstrap di produzione conserva l'hub pubblico. Le fixture non sono incluse nella build o nello ZIP. Non è stato modificato o pubblicato il progetto dell'hub.

Verifica mobile eseguita con viewport iframe Chromium; nessuna certificazione su hardware iOS/Android, Safari o delle prestazioni a 60 fps. La sessione cloud rallenta le animazioni in background; la conclusione delle transizioni è stata verificata separatamente. Nessun errore applicativo osservato; presenti messaggi dell'estensione browser estranei al sito.

## Pubblicazione

Estrarre lo ZIP nella root del progetto Servizi. Vercel usa `npm run build` e pubblica `dist/`. Non serve installare dipendenze runtime. Questa consegna aggiorna il pacchetto, senza modificare il deployment pubblico.

Nel sistema 3D con bridge compatibile la navbar visibile appartiene al parent: per aggiornare anche quel progetto utilizzare la stessa cartella `navigation/` nel suo sistema di navigazione. In Framer senza handshake, evitare un secondo overlay esterno sovrapposto a quello integrato.
