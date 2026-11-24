# Portfolio (Projects)

Questa cartella fa parte del sito Memento: repo navigation, `apps/projects`, pubblicata su mementostudio.it/projects/. Dalla R19, 24 novembre 2026.

- **Contenuti:** `site/projects.json` (progetti) e `site/images.json` (immagini); markup e logica in `site/*.js`; stili in `site/styles.css` e `site/vfx.css`.
- **Build:** `release/build.mjs` copia `site/` in `dist/` e pre-renderizza filtri e catalogo. Si lancia dalla radice della repo con `npm run build`, poi `npm run preview`.
- **Test:** `npm run test:apps projects` dalla radice (`release/verify-v43.mjs` e `release/verify-package.mjs`).
- **Cosa arriva dal sito:** motore degli effetti, navbar, sfondo e cambio pagina sono quelli del sito, non copie locali.
- **Storico:** `LEGGIMI_V43.md` e `LEGGIMI_V44.md` descrivono le versioni autonome precedenti.
