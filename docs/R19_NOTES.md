# R19 — una sola repo per tutto il sito

## Richiesta

Compattare il sito in un'unica repository, se ha senso. Fin qui navigation scaricava le cinque pagine dalle loro repo ai commit di `scripts/sections.lock.json`. Ogni modifica a una pagina richiedeva tre passaggi: commit nella repo della pagina, hash copiato nel lock, preview. In più c'erano copie del motore effetti e della navbar che il sito scavalcava.

## Cosa cambia

1. **Le pagine sono in `apps/`**, con la loro storia: ogni repo è stata riscritta nella sua sottocartella (`git filter-repo --to-subdirectory-filter`) e unita a navigation. I commit originali sono ancora consultabili con `git log -- apps/<pagina>`.

   | Cartella | Repo d'origine | Commit importato |
   | --- | --- | --- |
   | `apps/studio` | mementostudio | `e4b447c` (pubblicato) |
   | `apps/services` | servizi | `5dca26e` (R18) |
   | `apps/projects` | Portfolio | `938220d` (pubblicato) |
   | `apps/levelup` | mementolevelup | `f6fa994` (R18) |
   | `apps/start` | mementostart | `5782a3d` (pubblicato) |

2. **Build dalle cartelle.** `scripts/sections.mjs`, che prende il posto di `section-releases.mjs`, compila ogni pagina da una copia della sua cartella, con i comandi di prima. `sections.lock.json` non c'è più. Anche le tre patch applicate in build non ci sono più: le modifiche di services, studio e levelup sono nel loro codice. `data-memento-release` porta il commit del sito: `VERCEL_GIT_COMMIT_SHA` su Vercel, altrimenti `git rev-parse HEAD`.

3. **Niente copie doppie nelle pagine.** È stato tolto solo ciò che il sito scartava (`prune` di `native-page.mjs`) o scavalcava (import map):
   - motori effetti propri: `vfx/` e la sua build (`public/vfx`, `site/vfx`) in services, levelup e projects; in Start il motore autonomo (`src/vfx/engine` e moduli) e lo sfondo Ghost Fibers (`src/background`). Le pagine ora importano direttamente `/memento-ui/effects.mjs`, quindi l'import map di `native-page.mjs` non serve più;
   - navbar proprie: le copie del kit (`navigation/`, `public/navigation`, `site/navigation`, `dist/navigation`), i bundle e gli script che le generavano (`build-navigation.mjs`), il markup di primo paint nell'`index.html`;
   - bootstrap e ponti per Framer o per un host: `bootstrap.js`, `tide-child-bridge.js`, `memento-services-host.js`, i `FRAMER_*_FIX.html`, i `vercel.json` delle pagine, il dev server autonomo di LevelUp e la verifica di preservazione di Start;
   - Start non dipende più da `three` e `delaunator`.

   I test delle pagine che controllavano quei file sono stati tolti o riscritti: ora verificano che la pagina usi gli effetti del sito e non ne abbia una copia. Start ha un test del registro delle superfici al posto di quelli del motore.

4. **Test di tutte le pagine dalla radice:** `npm run test:apps`, oppure `npm run test:apps services` per una sola, e `npm run test:all` per sito e pagine insieme.

## Cosa non cambia

- Il progetto Vercel `mementonav`, il dominio e `vercel.json` della radice. La build non scarica più nulla da GitHub, quindi è più veloce e non dipende dalla rete.
- Il sito pubblicato. Confronto file per file con la build R18:
  - con le sole pagine importate, prima della pulizia: identico, a parte `data-memento-release`;
  - dopo la pulizia: spariscono le cartelle `navigation/` e `vfx/`, i bootstrap e i ponti nelle pagine, e in Start il motore autonomo e lo sfondo, che il sito non caricava;
  - negli `index.html` spariscono solo l'import map e le righe vuote dei tag che il sito già toglieva;
  - in services, levelup e projects l'unica riga di codice cambiata è l'import degli effetti; in Start cambia il bundle senza il motore autonomo.

## Le pagine da sole

Gli indirizzi autonomi (mementoservizi.vercel.app e simili) restano all'ultimo deploy delle vecchie repo. Non si aggiornano più, e le pagine non si possono più pubblicare da sole: senza il sito non hanno né navbar né effetti. Se servono, una pagina si prova con `npm run build` e `npm run preview` dalla radice.

## Dopo il merge

- Su GitHub archiviare le cinque repo separate (Settings → Archive) e, su Vercel, mettere in pausa o eliminare i loro progetti autonomi, se ci sono ancora.
- In GitHub Desktop basta clonare navigation: le altre repo non servono più.

## Verifica del 24 novembre 2026

- `npm test`: 65 test superati. `npm run test:apps`: studio (catalogo, integrazione, isometria, navigazione), services (8), projects (verifica V43 e pacchetto), levelup (15 più la verifica degli asset), start (1). Tutti superati.
- `npm run build`: riuscita, senza rete verso GitHub.
- Chrome headless con renderer software, `?vfx=high`: le sei pagine si caricano con una sola navbar ciascuna. Su Services, Projects, LevelUp e Start gli effetti sono attivi, sempre dal motore condiviso, e c'è l'indicatore di scroll. Il cambio pagina Projects → Services compone SERVICES con la navbar sempre visibile.
- Studio non carica il modello 3D in questo ambiente, esattamente come la build di `main`: dipende dall'ambiente, non da questa release.
