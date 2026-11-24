# Memento Portfolio — V44 (bridge 13)

17 novembre 2026. Unico intervento rispetto alla V43 (`LEGGIMI_V43.md`, che resta valido per contenuti, struttura e VFX):

- nucleo di navigazione condiviso con il contenitore Vercel (`site/navigation/core.mjs`, `child.mjs`, generati da `packages/navigation-kit`; bundle `portfolio.bundle.js` rigenerato dalla build);
- `data-memento-layout=overlay` impostato in `bootstrap.js` quando la pagina è nel contenitore;
- `X-Robots-Tag: noindex, indexifembedded` in `vercel.json`.

Nel contenitore lo slideshow `#slideshow/<id>` aggiorna l'URL pubblico (`/projects#slideshow/<id>`), il footer «Ready to start?» apre Start nel sito e la navbar è quella del contenitore. Da sola o in Framer la pagina funziona come la V43. Impostazioni Vercel invariate. Vedi `docs/PROTOCOLLO.md` del workspace.
