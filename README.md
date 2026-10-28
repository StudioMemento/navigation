# MEMENTO TIDE — v011

Cinque tavole di regia accompagnano questa iterazione. Il dettaglio di art direction, asset, camera e integrazione è in `REGIA.md`. Le tavole sono concept generati, non screenshot della demo.

## Modifiche

- Cinque stazioni su un pentagono regolare, 72° tra ogni coppia consecutiva.
- Camera a 24 cm dall'acqua, stage quasi sommersi: top a 2,5 cm.
- HDRI Belfast Sunset allegato, calibrazione più scura, pedane satinate, fog e riflessi più leggibili.
- Nessun logo, navbar, contatore, freccia, CTA o toolbar. Resta solo il titolo della sezione sotto lo stage.
- Drag/swipe e selezione da Framer. Click su titolo/scultura oppure ↓/Invio per entrare.
- Entrata con camera verso il basso. Loop finale con pagina che esce verso l'alto e scena che risale dal basso. Nessun fade opaco.
- Bridge completo per rilevare il vero fondo delle pagine remote e inoltrare Escape. **Da inserire e distribuire nei cinque siti esterni**: istruzioni in `REGIA.md` e installer in `integration/`.

## Vercel e prova locale

Framework: Other. Build: `npm run build`. Output: `public`. Node 22+. `vercel.json` contiene la configurazione. Librerie già incluse: nessun download npm necessario.

```bash
npm test
npm run build
npm start
```

Aprire `http://127.0.0.1:8770/`. Usare un server HTTP, non `file://`.

I link esterni restano in `public/data/navigation.json`. Memento apre Studio; le altre tappe aprono Services, Projects, Levelup e Start. Le pagine non sono copiate nel pacchetto.

Questa consegna è un pacchetto sorgente, non un deploy. La resa realtime non va confusa con le tavole. Verifiche e limiti sono in `reports/verification.json`.
