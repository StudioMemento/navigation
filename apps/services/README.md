# Memento Servizi — V23 per Vercel

Versione del 23 ottobre 2026. Stesso contenuto della versione Sites aggiornata.

## Deploy

1. Estrai lo ZIP.
2. Usa come Root Directory la cartella che contiene `package.json` e `vercel.json`.
3. Framework Preset: **Other**.
4. Build Command: **npm run build**.
5. Output Directory: **dist**.

La configurazione è già presente in `vercel.json`. Se stai aggiornando un progetto esistente, verifica che la Root Directory punti alla cartella del pacchetto e non a `public` o `dist`.

Per verificare il pacchetto localmente:

```sh
npm ci
npm run build
```

Il progetto è statico, senza dipendenze o variabili d'ambiente obbligatorie. `public/` contiene i file sorgente serviti; la build li copia in `dist/`.

## Contenuti

Hero → catalogo Digitale / Fisico → 6 bundle → Web, 3D, Video, Visual, Design, Branding → Ready to start? >.

44 servizi (30 digitali e 14 fisici). Scroll verticale libero, senza snap forzati. Griglia square a 5 colonne desktop e 3 mobile. Immagini, font e icone inclusi localmente.

La CTA finale apre https://mementostart.vercel.app/. Il modulo già presente nei dettagli prepara una bozza email: l'invio avviene nella propria app email.

## Verifica dell'esportazione

Build locale e integrità dello ZIP controllate; asset identici alla versione Sites. Questo archivio non esegue un deploy automatico.

Sorgente: 1edd70dd1aa5071fc03dc8566d91babffb7a1722
