# Memento — Servizi V22

Catalogo completo per Vercel, aggiornato il 19 ottobre 2026.
WEB e 3D sono compatti e centrati; gli altri titoli rimangono edge to edge.
Include bundle e popup aggiornati e catalogo con immagini square.

## Pubblicazione su Vercel

1. Estrai lo ZIP nella root del repository: `package.json`, `vercel.json`, `public/` e `scripts/` devono stare allo stesso livello. Per aggiornare un repository esistente, sostituisci i file corrispondenti conservando la cartella `.git`.
2. Esegui commit e push sul repository collegato a Vercel, oppure importa un nuovo repository su Vercel.
3. Framework Preset: **Other**. Root Directory: la cartella che contiene `package.json`. La configurazione inclusa imposta Build Command `npm run build` e Output Directory `dist`.

Il build copia `public/` in `dist/`. Non richiede dipendenze, variabili ambiente o servizi backend. Font, icone e immagini sono inclusi. I collegamenti ai dettagli usano hash e non richiedono regole di riscrittura.

## Verifica locale

```sh
npm ci
npm run build
python3 -m http.server 8080 --directory dist
```

Apri `http://localhost:8080`.
Per modificare il sito, intervieni nei file di `public/` e ripeti il build.
Il modulo LevelUp prepara una bozza nella propria app email; l'invio rimane manuale.
