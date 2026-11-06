# Verifica LevelUp V18 · 6 novembre 2026

## Ambito

Ripristino della base funzionale pre-VFX (V16) e installazione del kit navbar V12 allegato. Nessun redesign di contenuti, caroselli o CTA.

## Controlli eseguiti

- Build di produzione completata: `LEVELUP_BUILD_OK`.
- Suite del progetto: 13 test superati, nessun fallimento.
- Verifica delle risorse: 65 riferimenti locali risolti e 5 sezioni presenti; dipendenze interne del modulo cinematic verificate ricorsivamente.
- Suite originale del kit navbar: 24 controlli superati, inclusi destinazioni, geometrie SVG, maschere del blur, bridge e sintassi.
- Confronto byte per byte del kit allegato con `public/navigation/` e `dist/navigation/`.
- Confronto byte per byte della CTA con la distribuzione cinematic originale.
- Bootstrap della pagina, carosello, contenuti, player, geometria portfolio e bridge Tide conservati dalla V15.
- Nessun modulo `src/vfx/`, classe `vfx-boot`, preload o evento `memento:vfx-layout` nel pacchetto runtime.
- Un solo bootstrap navbar e un solo meta viewport con `viewport-fit=cover`.
- Configurazione Vercel inclusa; rivalidazione estesa ai moduli `.mjs`.

## Limiti della verifica

Il browser collegato e il browser cloud non hanno potuto raggiungere il server locale della sessione (`ERR_CONNECTION_REFUSED`). Non si dichiara quindi una nuova verifica visiva desktop/mobile, né una misura di FPS. Le proporzioni responsive e il blur sono quelli del kit allegato, conservato integralmente. I deploy delle esperienze esterne non sono stati modificati né nuovamente verificati.

## Verifica consigliata dopo il deploy

Controllare il rendering a 390, 768 e 1440 px: logo superiore, LevelUp acceso, blur ai bordi, caroselli e confronto prima/dopo; aprire e richiudere una demo espansa; raggiungere Ready to start e verificare che la navbar resti fuori dalla tab. Provare inoltre i link del logo e delle cinque sezioni.
