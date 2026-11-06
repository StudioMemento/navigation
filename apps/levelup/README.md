# Memento LevelUp · V18 — Navbar, blur e logo

Pacchetto completo per Vercel con la base precedente al VFX PASS e l’overlay V12 fornito in `O V E R L A Y(2).zip`. Include sorgenti, asset locali, font Inter e build pronta in `dist/`. Non richiede dipendenze npm o variabili d’ambiente.

## Contenuto

- Navbar con LevelUp attivo, logo Memento e blur progressivo superiore e inferiore. La cartella `navigation/` è identica al kit allegato, nei sorgenti e nella build.
- Un solo bootstrap `navigation/bootstrap.js?v=12.0.0`, con `data-memento-page="levelup"` e hub `https://mementostudio.it`.
- Logo e navbar mantengono misure, colori, proporzioni, safe area e comportamento responsive del kit. L’overlay viene nascosto durante la demo espansa.
- Base pre-VFX ripristinata: caroselli, copy, immagini, confronti, sequenza delle esperienze e player conservati. Nessun modulo, preload, CSS o evento del VFX PASS V17.
- Ready to start cinematico della V16, in una sezione alta `100svh` con padding incluso, caricamento vicino alla viewport e fallback statico.

## Provenienza della base

La V16 non era disponibile come ZIP separato: il suo archivio era stato aggiornato alla V17. La base funzionale V16 è stata ricostruita dai sorgenti V15 e dall’integrazione Ready to start documentata nella V17. La distribuzione cinematic originale è stata recuperata da `MEMENTO_READY_TO_START_CINEMATIC_V1_VERCEL(1).zip` e confrontata byte per byte. È stato rimosso anche l’evento VFX aggiunto successivamente al modulo della tipografia.

## Aggiornamento su Vercel

Usare il contenuto dello ZIP come root del progetto. Sostituire il pacchetto precedente per evitare di mantenere file residui del VFX PASS. `package.json` e `vercel.json` si trovano già nella root.

| Impostazione | Valore |
| --- | --- |
| Framework | Other |
| Build command | `npm run build` |
| Output directory | `dist` |
| Install command | Vuoto |
| Node.js | 20 o successivo |

La cartella `dist/` è già compilata. I file JavaScript, MJS e CSS vengono rivalidati; i moduli della navbar usano la versione esplicita del kit.

## Sviluppo e verifica

```sh
npm run dev
npm run build
npm test
```

Il server locale usa la porta 4173. Eseguire la build prima dei test. I 13 test verificano contenuti, sequenza, player, caroselli, navigazione, CTA e integrità delle risorse; comprendono controlli negativi su asset mancanti. Il comando `npm run check:links` resta disponibile per controllare i deploy esterni dalla propria rete.

Risultati e limiti della verifica corrente in `design-qa.md`. La consegna è uno ZIP: non aggiorna automaticamente il deploy pubblico.

## File da aggiornare in futuro

- `public/navigation/`: kit navbar completo.
- `public/ready-to-start/`: distribuzione cinematic indipendente.
- `src/ready-to-start.js` e `src/ready-to-start.css`: adattatore e layout della CTA.
- `src/content.js`: contenuti ed esperienze.

Procedura di sostituzione del modulo cinematic in `READY_TO_START.md`.
