# Memento — Noir Hub V07

Homepage di navigazione basata su Memento_Noir_V06_Vercel. Il modello GLB,
le texture, gli shader, le particelle, il fondale e i profili di qualità
originali sono conservati. Le sei scene riusano ancora il modello V06.

## Percorso

- Swipe/trascinamento orizzontale, frecce oppure indicatori: seleziona un mondo.
- Tap sul diorama centrale, sul titolo o su Entra: apre la pagina verso il basso.
- Scroll verticale verso il basso o swipe verso l'alto sulla home: entra nella sezione.
- Home è l'introduzione: Esplora apre l'indice delle destinazioni.
- Home nella barra delle pagine: risale al carosello sulla selezione precedente.
- Indice: accesso diretto a tutte le destinazioni, anche dall'interno delle pagine.
- Tastiera: frecce sinistra/destra cambiano mondo, freccia giù entra,
  Escape ritorna alla home quando il focus è nella cornice della pagina.
- Pausa e ispezione ravvicinata restano disponibili quando il 3D è attivo.

## Destinazioni

| Pagina | Collegamento | Stato |
|---|---|---|
| Servizi | `#/servizi` | Embed live di https://mementoservizi.vercel.app/ |
| Portfolio | `#/portfolio` | Embed live di https://mementoportfolio.vercel.app/ |
| Studio | `#/studio` | Segnaposto, tour da sviluppare |
| Level Up | `#/level-up` | Segnaposto, percorso campagne da sviluppare |
| Start | `#/start` | Segnaposto, contatti/modulo da sviluppare |

`#/home/servizi` mostra la home con Servizi selezionato; `#/servizi` apre
subito la pagina. Le vecchie selezioni `#progetti` e `#contatti` funzionano
come alias di Portfolio e Start. Per le campagne usare, ad esempio,
`/?utm_source=instagram&utm_campaign=launch#/level-up`: i parametri della
query vengono conservati. Non sono stati aggiunti tracker né raccolta lead.

Configurazione centrale: `src/destinations.js`. Per collegare una pagina
futura, sostituire `kind: 'draft'` con `kind: 'embed'` e assegnare il suo `url`.

## Prestazioni e limiti dell'integrazione

Si monta soltanto l'iframe attivo. Il rendering della home si ferma mentre
una pagina è aperta; tornando alla home l'iframe viene rimosso. Un accesso
diretto a una pagina rimanda il download del 3D al primo ritorno alla home.
Il fallback statico mantiene attivi menu e collegamenti.

Servizi e Portfolio sono siti esterni, caricati nei loro iframe. I loro
contenuti, scroll, modali e player rimangono quelli delle versioni pubblicate.
La barra superiore appartiene alla home e resta sempre disponibile. I CTA
interni dei siti esterni non sono intercettati: per collegarli a Start/Level Up
della home servirà aggiornare quei siti o introdurre un bridge concordato.
La cornice non può misurare lo scroll di un iframe cross-origin: per risalire
si usa Home, senza intercettare lo scroll interno.

Ogni embed ha caricamento, recupero dopo attesa e link esterno sempre
accessibile. L'evento iframe load non certifica il contenuto di una pagina
cross-origin: il link esterno resta disponibile anche in caso di blocchi
successivi del provider. La pagina host non forza autoplay audio.

## Pubblicazione su Vercel

Il progetto conserva Vite, npm e la configurazione Vercel originale.
Root Directory: cartella con `package.json`. Install: `npm ci`.
Build: `npm run build`. Output: `dist`.
Non servono variabili d'ambiente, database o chiavi API per questa versione.

```sh
npm ci
npm run build
npm run preview
```

Aprire tramite un server HTTP/HTTPS, non direttamente come file locale.
Per il solo preview gestito è autorizzato l'host `terminal.local`.

## Verifica

Build di produzione riuscita. Verificate le rotte pagina/home, i vecchi
alias, gli URL non validi, lo swipe ciclico/cancellato nel modello di
navigazione e la conservazione della query delle campagne.

La verifica visiva usa un browser senza WebGPU/WebGL2: è quindi controllabile
il fallback, non il rendering GPU né il frame rate dei dispositivi reali.
La geometria e il codice degli shader restano quelli della V06.

Verifica browser completata sul fallback desktop e su viewport 390 × 844:
entrambi gli embed caricati, apertura/ritorno, cambio sezione, indice, pagine
provvisorie, navigazione da tastiera e tasto Indietro del browser. Le transizioni
bloccano gli input finché sono realmente concluse. Il test a viewport ridotto
non sostituisce una prova touch e GPU su telefono reale.
