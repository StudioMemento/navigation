# Memento Servizi — V13 per Vercel

Versione pubblicata del 18 ottobre 2026.

## Utilizzo

1. Estrai lo ZIP e copia il suo contenuto nella radice del repository del sito.
2. Sostituisci i file della versione precedente. Mantieni la cartella `.git` del tuo repository.
3. Esegui commit e push dal tuo client Git.

Il file `vercel.json` contiene già la configurazione:

- Framework Preset: Other
- Root Directory: radice del repository (campo vuoto)
- Build Command: `npm run build`
- Output Directory: `dist`
- Node.js: 22 o superiore

Non servono dipendenze npm né variabili d’ambiente.

## Contenuto

`public/` contiene tutti gli HTML, CSS, JavaScript, immagini, font e icone locali.
`scripts/build.mjs` genera `dist/` copiando i file pubblici.
`package.json`, `package-lock.json` e `vercel.json` completano il progetto.

Per verificare la build in locale, esegui `npm run build`.
La cartella `dist/` viene generata dalla build e non è duplicata nello ZIP.

## V13

Tipografia proporzionata anche per le parole lunghe; immagini con fade non lineare;
selezione e menu contestuale disabilitati nella UI con link nativi per il tasto centrale;
bundle con nome, copy e mini player allineati e chevron in alto a destra.

Il modulo Level Up prepara una bozza email da inviare nella propria app di posta.
