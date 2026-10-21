# Memento Portfolio — pacchetto Vercel

Ultima versione polish del 21 ottobre 2026. Include 23 progetti, copertine landscape 16:9, catalogo responsive e slideshow in loop.

## Pubblicazione

1. Estrai lo ZIP in una cartella.
2. La cartella principale deve contenere `vercel.json` e `dist/`.
3. Carica il contenuto in un repository Git e importalo in Vercel, oppure usa la CLI dalla cartella estratta.

La configurazione è già inclusa:

| Impostazione | Valore |
| --- | --- |
| Root Directory | Cartella che contiene `vercel.json` |
| Framework Preset | Other |
| Build Command | Vuoto |
| Install Command | Vuoto |
| Output Directory | dist |

Non sono richieste variabili ambiente, dipendenze npm o compilazione.

### CLI

Con Node.js e npm disponibili, apri un terminale nella cartella estratta:

```sh
npx vercel
```

Per aggiornare il portfolio esistente, collega il progetto Vercel corrispondente durante la configurazione. Il comando crea un'anteprima; dopo averla verificata, pubblica in produzione con:

```sh
npx vercel --prod
```

### Anteprima locale

Con Python 3 disponibile, dalla cartella estratta:

```sh
python3 -m http.server 8000 --directory dist
```

Apri http://localhost:8000. Il doppio clic su `index.html` non è sufficiente: il catalogo carica i dati con `fetch` e richiede HTTP.

## Contenuto

- `dist/`: sito completo con HTML, CSS, JavaScript, dati, immagini e font locali.
- `vercel.json`: configurazione per il deploy statico.
- `README.md`: architettura, navigazione e verifiche della versione.
- `docs/`: provenienza degli asset e prompt delle copertine.

Gli indirizzi del catalogo e dei progetti usano il frammento URL (`/#catalogo`, `/#slideshow/auren`): non richiedono regole di riscrittura. Le demo esterne restano accessibili tramite i loro URL; questo pacchetto include il portfolio e i suoi asset locali.

Sorgente: commit `cd5d900f50d8bc84c47fa39b26397468b5de7622`.

Riferimenti Vercel:
- https://vercel.com/docs/project-configuration/vercel-json
- https://vercel.com/docs/builds/configure-a-build
- https://vercel.com/docs/cli/deploy
