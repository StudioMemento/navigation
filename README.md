# Memento Navigation · R25 Clean

Base HTML per la revisione dei contenuti. La Home collega Studio, Services, Projects, LevelUp e Start. Ogni servizio, bundle e progetto ha un indirizzo diretto. Le pagine usano la tipografia e i controlli predefiniti del browser.

## Deploy su Vercel

Estrai lo ZIP e usa come radice del progetto la cartella che contiene `vercel.json`. La configurazione esegue `node scripts/build.mjs` e pubblica `public/`. Tutti i file di pubblicazione sono già inclusi nell’archivio. La build usa soltanto i moduli standard di Node.

## Lavorare sul content

| Contenuto | Sorgente |
| --- | --- |
| Home, navigazione, metadati e Studio | `content/site.json` |
| Categorie, bundle e tavole dei servizi | `content/services.json` |
| Portfolio e gallerie | `content/projects.json` |
| Varianti delle immagini del portfolio | `content/project-images.json` |
| Benefit, esperienze, confronti e percorso | `content/levelup.json` |
| Contatti, mappa, FAQ e informative | `content/start.json` |

I template si trovano in `scripts/`, le fotografie e i modelli nelle cartelle `assets/` di `public/`. Modifica i dati o i template e rigenera le pagine con `npm run build`. Mantieni gli ID di servizi, bundle e progetti quando modifichi i testi. Gli ID sono usati anche dai vecchi link condivisi.

Per lavorare in locale, esegui `npm run dev` e apri `http://127.0.0.1:5173/`. I salvataggi in `content/` e `scripts/` rigenerano l’HTML. Ricarica la pagina per vedere le modifiche. `npm run preview` serve la copia già generata e `npm test` controlla pagine, ancore e risorse locali.

## Esperienze e interazioni

Studio mostra una copertina, il collegamento al tour 3D separato e i due GLB originali. Nel portfolio e in LevelUp le demo esterne si aprono su richiesta. I confronti prima/dopo sono fotografie distinte. I filtri, la preparazione dell’email, la preferenza di Google Maps e la compatibilità con i vecchi indirizzi a frammento sono gestiti dai moduli in `public/js/`.
