# MEMENTO TIDE — v012

Fix visivo e navigazione verticale. La camera resta a 24 cm dall’acqua, le cinque stazioni formano un pentagono e l’unica UI interna persistente è il titolo della sezione.

- Acqua increspata, riflessi filtrati, foschia riflessa, montagne abbassate.
- Grafite con roughness variabile, luce radente calda, pedane scure e sottili.
- Resolve HDR con AgX, halation contenuta, vignetta e dithering.
- Drag/swipe orizzontale: selezione circolare della sezione.
- Scroll in basso o gesto verticale: discesa della camera e ingresso nell’iframe, senza fade opaco.
- Arrivo al fondo: la pagina resta leggibile. Un nuovo gesto in basso completa il loop verso lo stesso stage.
- Studio rispetta le quattro scene interne; Levelup scorre le dieci esperienze fino all’ultima; Projects usa il suo #viewport; Start protegge il form aperto.

## Verifica e rilascio

30 test automatici e build statica. Resa controllata in Chrome con WebGL 2 e RTX 3070 Ti; il rapporto in `reports/verification.json` distingue la verifica delle preview dalle prove live ancora da eseguire. Touch nativo su telefono non verificato.

Preview visiva: https://mementonav-6o1ye0tsn-studio-memento-s-projects.vercel.app/

La produzione NON è stata aggiornata: il rilascio Vercel richiede autorizzazione esplicita. La connessione GitHub rifiuta la scrittura dei repository. Le pagine remote live non contengono ancora questo bridge: nella preview principale il loop finale dipende dal loro aggiornamento.

## Avvio

Framework Other, build `npm run build`, output `public`, Node 22+. Dipendenze già incluse.

```bash
npm test
npm run build
npm start
```

Aprire http://127.0.0.1:8770/. Le pagine restano URL esterni in `public/data/navigation.json`; non sono copiate nel progetto.

## Integrare le cinque pagine

L’installer modifica esclusivamente il tag script e copia il bridge accanto a index.html. Conserva un backup. Eseguire sui repository locali e ridistribuire con il workflow esistente:

```bash
python integration/install-bridge.py --profile studio /repo/mementostudio/index.html
python integration/install-bridge.py --profile services /repo/servizi/index.html
python integration/install-bridge.py --profile projects /repo/Portfolio/index.html
python integration/install-bridge.py --profile levelup /repo/mementolevelup/dist/index.html
python integration/install-bridge.py --profile start /repo/mementostart/index.html
```

Nelle pagine standalone il bridge è inattivo. Non legge né invia dati dei form. Il helper Framer rimane `integration/framer-controls.js`.
