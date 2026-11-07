# Memento NAV — R10 / Lowpoly Amber

Navigazione verticale Studio → Services → Projects → LevelUp → Start. La R10 corregge l’ancoraggio mobile della navbar, elimina l’ombra della card attiva e aggiunge gradienti di profondità alle anteprime. Il fondo ha sfumature molto leggere originate dai vertici, densità calibrata e piccoli punti senza bloom.

Sono incluse **sei immagini rigenerate square 1254 × 1254**, con mezzitoni scuri e ambra intenso: cinque già integrate, più una variante della galleria Projects. I master sono in `art/`, con i prompt; le varianti web sono in `dist/assets/scenes/`.

**Pacchetto pronto per Vercel, non pubblicato.**

## Installazione

1. Distribuire il progetto su Vercel con preset **Other**, nessun build command, output **dist**. Il `vercel.json` incluso contiene la configurazione.
2. Nella home Framer sostituire il precedente bridge con il blocco completo di [framer-nav-bridge.html](docs/framer-nav-bridge.html), Custom Code → End of body. Pubblicare la home. Non aggiungere un secondo iframe. L’aggiornamento del bridge serve per tenere la navbar nel viewport visibile anche quando il contenitore Framer è più alto.
3. Eseguire `npm test` per le regressioni. Nessuna dipendenza runtime o build è necessaria. La sola verifica/rigenerazione degli asset usa Python 3 con Pillow.

## Comportamento

- Mobile: card entro l’84% del viewport per mostrare più fondo; padding interno 4,5%. Desktop: rapporto 2:1, larghezza entro l’88%, padding 6%.
- Dock sopra la safe area, con almeno 12 px dal fondo visibile; controlli separati dal logo e dalla navbar.
- Card centrale senza ombra proiettata. Anteprime inclinate con gradiente nero verso il punto di sovrapposizione.
- Card attiva all’80% del colore in quiete, pieno colore in prossimità/focus. Anteprime in bianco e nero.
- Reticolo stabile con idle leggero, risposta ambra locale e frammenti triangolari. Reveal/disappear sulle stesse celle usate dall’hover. Contorno luminoso sottile, esterno alla sagoma.
- Rotella, swipe/drag verticale, chevron e tastiera. Navbar sincronizzata all’input; transizioni con destinazione modificabile durante il movimento.
- `prefers-reduced-motion`, fallback senza JavaScript, pinch zoom, ripristino sessione, deep link e route bridge conservati.

## Prestazioni e verifica

Un ciclo di animazione condiviso, topologie in cache, canvas limitati in pixel, varianti responsive e preparazione differita delle card lontane. Il resize aggiorna prima il CSS e accorpa gli effetti dopo 120 ms. Le immagini nuove non aggiungono librerie runtime.

[QA.md](QA.md) distingue test automatici, verifiche browser e limiti. Non viene promessa una frequenza di 60 fps sulla base del browser remoto.

[Changelog R10](docs/MEMENTO_NAV_R10_CHANGELOG.md). Gli altri documenti di revisione restano come storico: in caso di differenze prevalgono README, changelog e codice R10.

Per la verifica locale servire `dist/` via HTTP. `/?qa` mostra la diagnostica. Copiare temporaneamente `scripts/qa-r10.html` in `dist/` per la matrice di controllo, poi rimuoverla prima della distribuzione.

Per riesportare le immagini dai master: `python3 scripts/export-assets-r10.py`. Non modifica stile o colore: ridimensiona e comprime soltanto.
