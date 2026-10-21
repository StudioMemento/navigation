# Memento — V3 per Vercel

Esportazione della versione 3 pubblicata, completa di sei diorami GLB, asset, font, librerie e cinque moduli integrati: Studio, Servizi, Portfolio, Level Up e Start.

## Pubblicazione

1. Estrai lo ZIP. `index.html` e `vercel.json` devono rimanere nella stessa cartella, alla radice del progetto.
2. Carica il contenuto estratto in un repository Git e importalo in Vercel, oppure usa Vercel CLI dalla cartella estratta.
3. Impostazioni: **Framework Preset: Other**; **Root Directory: cartella contenente index.html**; **Build Command: vuoto**; **Install Command: vuoto**; **Output Directory: .**.

`vercel.json` include già le impostazioni. Non occorrono dipendenze npm, build o variabili ambiente.

Per la CLI, dalla cartella estratta:

```sh
npx vercel
```

Per una pubblicazione in produzione dopo aver verificato l'anteprima:

```sh
npx vercel --prod
```

## Note

- La navigazione usa hash URL. Non aggiungere una riscrittura globale verso index.html: i moduli e le loro risorse devono essere serviti dai rispettivi percorsi.
- I cinque moduli sono copie locali della versione integrata: successive modifiche sui siti Vercel originali non si sincronizzano automaticamente.
- Alcune demo esterne di Level Up rimangono collegate ai rispettivi host.
- Il modulo email prepara una bozza tramite il client di posta; non è presente un backend di invio.
- Per l'anteprima locale usa un server HTTP, ad esempio `python3 -m http.server 8000`, e apri http://localhost:8000. Il doppio clic su index.html non supporta correttamente moduli JavaScript e caricamento GLB.

## Provenienza

Versione sorgente: `1b264ea6f18a402bb22beb19e7160832a8593041`.
I file di produzione sono inclusi senza modifiche; sono aggiunti soltanto configurazione Vercel e questo documento.

Documentazione Vercel: https://vercel.com/docs/builds/configure-a-build e https://vercel.com/docs/project-configuration/vercel-json.
