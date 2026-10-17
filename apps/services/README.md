# Memento — Servizi Slideshow / Vercel

Export del 17 ottobre 2026 della versione pubblicata:
https://memento-servizi-slideshow.memento-studio.chatgpt.site/

Catalogo V8, versione Sites 2. Commit sorgente:
`90cf309806c40ed4b1df0e8e98e9f46cbf0f1f33`.

HTML, CSS, JavaScript, immagini, font e icone sono gli stessi del commit pubblicato. Le aggiunte riguardano il confezionamento e la configurazione di build per Vercel.

## Deploy con GitHub Desktop e Vercel

1. Estrai lo ZIP in una cartella.
2. Copia **il contenuto** nella radice del repository: `package.json`, `vercel.json`, `public/` e `scripts/` devono trovarsi allo stesso livello. Mantieni la cartella `.git` del tuo repository. Per un repository già usato, rimuovi i vecchi file dell'app prima di copiare l'export, così non rimangono configurazioni di altri framework.
3. Esegui commit e push con GitHub Desktop.
4. Importa il repository in Vercel, oppure attendi il deploy del progetto già collegato.
5. Root Directory: radice del repository (`./`). Il file `vercel.json` imposta il resto.

| Impostazione | Valore |
| --- | --- |
| Framework Preset | Other |
| Build Command | `npm run build` |
| Output Directory | `dist` |
| Install Command | Saltato; nessuna dipendenza da installare |
| Environment Variables | Nessuna |

Se Vercel mostra una vecchia Root Directory, ripristina la radice. Non impostarla su `public` o `dist`.

Riferimento configurazione: https://vercel.com/docs/project-configuration/vercel-json

## File da modificare

- `public/index.html`: struttura della pagina e dialog.
- `public/catalogo.css`: layout, responsive e motion.
- `public/catalogo.js`: interfaccia, schede, ricerca e LevelUp.
- `public/catalogo-carousel.js`: slideshow e navigazione.
- `public/catalogo-data.js`: servizi, bundle e contenuti del catalogo.
- `public/catalogo-editorial.js`: testi delle schede, tempistiche e pianificazione.
- `public/assets/`: tutte le immagini, il font Inter e le icone Phosphor, con licenze.
- `docs/ASSET_FONTI.json`: provenienza degli asset.
- `docs/VERSIONE.json`: versione sorgente e impronte SHA-256 dei file pubblici.

La build copia `public/` in `dist/`, senza trasformare i file. `dist/` viene generata a ogni build ed è esclusa dal repository.

## Build locale

Con Node.js 22 o successivo, dalla radice:

```bash
npm run build
```

Non occorre eseguire `npm install`. Per un'anteprima locale, se Python è disponibile:

```bash
python -m http.server 8080 --directory dist
```

Apri http://localhost:8080/.

## Funzionamento della versione esportata

Bundle in apertura, categorie WEB → 3D → VIDEO → VISUAL → BRANDING → R&D, 44 servizi (30 digitali e 14 fisici), 6 bundle con tre tavole ciascuno, filtri e schede di dettaglio. La navigazione interna usa hash come `#servizio/sito` e `#bundle/b-lancio` e non richiede rewrite server.

LevelUp prepara una bozza per `info@mementostudio.it` e offre la copia del testo. L'invio avviene nell'app email dell'utente; il sito non raccoglie richieste su un server. Header e footer globali restano gestiti dall'eventuale pagina Framer che incorpora il catalogo.

## Verifica dell'export

Superata la suite DOM della versione sorgente: 44 schede, 6 bundle, filtri, ricerca, navigazione, slideshow, LevelUp e riferimenti agli asset. Eseguita la build del pacchetto estratto e confrontati byte per byte i file pubblici con il commit sorgente.

La verifica DOM non sostituisce una prova visiva desktop/mobile o touch reale. In questa esportazione non è stato effettuato un deploy su un account Vercel.
