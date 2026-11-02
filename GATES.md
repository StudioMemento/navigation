# Verifiche della ripresa — 2 novembre 2026

Base recuperata: `/workspace/scratch/24e10a883b5f/memento_live_v2`.
Copia di consegna: `/workspace/scratch/b8da63ca3b9e/memento_live_v2`.

- [x] G1 · Cinque destinazioni remote; nessuna copia locale delle pagine. `node scripts/verify-package.mjs`: PACKAGE VERIFIED. `world.glb` e `scene.json` conservano gli SHA-256 della base. Risorse pubbliche: 1.211 → 32; byte: 61.026.468 → 17.377.991 (−71,5%).
- [x] G2 · 13 test automatici passati sui sorgenti recuperati: routing, contesto CTA, validazione messaggi, iframe unico, compatibilità legacy e movimento. Build della copia di consegna passata; sintassi moduli verificata. Nessun codice applicativo modificato durante la ripresa.
- [ ] G3 · Resa navbar desktop/mobile, focus e assenza di duplicazioni: controllo visuale del nuovo build ancora da eseguire.
- [ ] G4 · Flusso sulle cinque pagine reali: carica/leggi/CTA/ritorno, cronologia, form e demo. Ancora da verificare in preview con il kit installato nei child. I test isolati non certificano l'integrazione live.
- [x] G5 · Prompt 3D separato, ZIP Vercel, kit navbar, istruzioni di installazione e rapporto di ripresa inclusi. Struttura degli archivi verificata prima della consegna.

## Blocco della preview

Progetto Vercel letto: `mementonav`, ID `prj_PknpuQYIJjGLrDfD8kTKtd6hLp8P`, team `team_i3FLB01EQajblQsRMdB6bBAr`. Il deploy di produzione osservato era `dpl_Cc11SxRNcyDrn1a4Njunvv4paXth`, commit `60673de6f776ed32adda23dd7b1909f473bf1e9e`. Non è la V2 qui consegnata.

Un primo tentativo di richiesta preview è stato respinto per parametro API non valido; non ha creato un deploy. La successiva richiesta con i sorgenti V2 è stata rifiutata dal controllo automatico dell'autorizzazione prima dell'esecuzione: chiedeva consenso esplicito al caricamento di codice e asset verso questo progetto. Nessuna pubblicazione V2 confermata, nessuna modifica DNS o a Framer. Nessun tentativo tramite canali alternativi.

## Ripartenza concreta

Autorizzare l'upload della versione consegnata nel progetto Vercel indicato, creare una preview e completare G3/G4. La produzione e il dominio non sono stati modificati. Le cinque applicazioni devono ricevere il kit per chiudere il flusso cross-origin.
