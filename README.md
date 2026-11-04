# MEMENTO — NAV SLIDER V1

Hub temporaneo per **mementonav.vercel.app**, in attesa della navigazione 3D. Cinque tavole cinematografiche selezionano e caricano le pagine reali di Memento. I contenuti delle pagine rimangono esterni e aggiornabili in modo indipendente.

## Pubblicare su Vercel

1. Estrai lo ZIP e usa **il contenuto della cartella estratta come root del progetto**: `index.html`, `package.json` e `vercel.json` devono trovarsi nella root del repository collegato a `mementonav`.
2. Sostituisci il precedente hub con questi sorgenti. Non annidare questo progetto dentro il vecchio `src` e non mantenere la vecchia configurazione di build.
3. Il file `vercel.json` imposta già:

   | Impostazione | Valore |
   |---|---|
   | Framework Preset | Other |
   | Build Command | `npm run build` |
   | Output Directory | `dist` |
   | Install Command | automatico / `npm install` |
   | Node | 20 o successivo |

4. Se nelle impostazioni Vercel del progetto esistono override del vecchio framework, aggiornali con i valori sopra. Non servono variabili d’ambiente, API key o servizi aggiuntivi.
5. Esegui il deploy nel progetto `mementonav` esistente, così l’indirizzo resta invariato.

La consegna contiene uno ZIP pronto per il deploy; non effettua un deploy in produzione.

## Interazioni

- Drag, swipe orizzontale, frecce, cinque indicatori e dock selezionano la sezione. Loop in entrambe le direzioni.
- Solo la tavola attiva è a colori. Le adiacenti sono in prospettiva e in bianco e nero.
- Il cambio di selezione carica la pagina sotto lo slider. È presente **un solo iframe**, senza copie locali delle pagine né scene nascoste in esecuzione.
- Click sulla tavola centrale o su **Esplora** porta all’anteprima. Lo scroll verticale rimane disponibile.
- **Apri pagina** naviga all’indirizzo pubblico; **Nuova scheda** lo apre separatamente. Il link diretto rimane disponibile anche se l’embed non risponde.
- L’icona di espansione apre una vista estesa nel viewport, senza ricreare l’iframe; chiudi con il controllo in alto. Escape funziona nel documento host e nelle pagine con bridge compatibile.
- Home/End e frecce sinistra/destra operano quando il carosello ha il focus. Invio apre l’anteprima.
- `/#studio`, `/#services`, `/#projects`, `/#levelup`, `/#start` selezionano la tavola; `/studio`, `/services`, `/projects`, `/levelup`, `/start` portano all’anteprima. Restano accettati gli hash legacy `#memento` e `#services-content`.

## Destinazioni

| Tavola | Link pubblico | Contenuto incorporato |
|---|---|---|
| Studio | https://mementostudio.it/studio | https://mementostudio.vercel.app/ |
| Services | https://mementostudio.it/services | https://mementoservizi.vercel.app/ |
| Projects | https://mementostudio.it/projects | https://mementoportfolio.vercel.app/ |
| LevelUp | https://mementostudio.it/levelup | https://mementolevelup.vercel.app/ |
| Start | https://mementostudio.it/start | https://mementostart.vercel.app/ |

Le pagine pubbliche usano già questi contenuti incorporati. Caricarli direttamente evita un ulteriore iframe Framer. Tutti i link per uscire dall’hub mantengono il dominio pubblico richiesto.

## Struttura e aggiornamenti

| File/cartella | Contenuto |
|---|---|
| `src/config.mjs` | Cinque pagine, copy, immagini, destinazioni e tempi |
| `src/app.mjs` | Slider, gesture, history, tastiera e integrazione navbar |
| `src/viewer.mjs` | Caricamento iframe, recovery, vista estesa e bridge |
| `src/fx.mjs` | Tipografia SVG, mesh stabile, campo di prossimità e scia di entrata |
| `src/styles.css` | Layout, responsive, palette, animazioni |
| `navigation/` | Navbar V12 dell’allegato, adattata alla navigazione interna dell’hub |
| `assets/images/` | 5 WebP desktop + 5 WebP ridotti per mobile |
| `originals/` | 5 immagini PNG generate, a piena risoluzione |
| `docs/image-prompts.md` | Prompt finali delle 5 cover |
| `docs/VERIFICA.md` | Verifiche e limiti |

Le immagini originali e i documenti non vengono copiati in `dist`. Il runtime è statico e non ha dipendenze npm. Il font Inter è locale; la sua licenza è in `docs/Inter-OFL.txt`.

## Effetti

Titoli con peso uniforme, tracking distribuito fino ai margini e gradiente unico bianco/avorio → ambra, dall’alto a sinistra verso il basso a destra. Il titolo è testo vettoriale reale, con H1 HTML accessibile. Edge glow, wireframe interno e facce illuminate condividono la stessa sagoma: nessuna deformazione dei caratteri.

Un solo campo di prossimità illumina i caratteri e i perimetri vicini. La mesh non si rigenera durante il movimento. I bordi seguono i tagli in alto a sinistra e in basso a destra. Gli effetti non intercettano input. Quando il cursore si ferma, il rendering si ferma dopo l’assestamento; fuori viewport e in background è sospeso.

La scia triangolare è breve, all’ingresso e al cambio slide; non è un particellare permanente. `prefers-reduced-motion` disattiva scie e transizioni. Per confrontare il risultato senza FX, apri `/?fx=off`.

La navbar mantiene il design dell’archivio allegato: logo superiore, dock inferiore e blur progressivo. I suoi thumbnail sono stati ridimensionati senza cambiare il disegno, per evitare di caricare immagini da 1254 px per icone da 34 px.

## Compatibilità delle pagine

Supporto al protocollo `memento:navigation` V2, con verifica di origine, sorgente iframe e sessione. Se manca il nuovo bridge, viene negoziato il bridge `memento:tide` V1 già presente in Studio/Projects. Il bridge moderno ha priorità; i due sistemi non vengono attivati contemporaneamente.

Le pagine senza bridge rimangono navigabili nell’iframe; i controlli dell’hub e i link diretti funzionano comunque. Il bridge legacy non viene inizializzato su un link con ancora, per non annullare la posizione richiesta. Per i ritorni da fondo pagina non supportati, usa **Slide** o il dock.

Gli FX di questo progetto agiscono sullo slider e sul suo titolo. Gli interni delle pagine cross-origin conservano i propri effetti e componenti: per aggiornarli bisogna intervenire sui rispettivi progetti.

## Sviluppo locale

```sh
npm install
npm run dev
```

Apri `http://localhost:5173`. La porta può essere impostata con `--port` o `PORT`.

```sh
npm run check
npm test
npm run build
```

Le anteprime locali non appartengono agli origin di produzione già autorizzati dai bridge remoti: l’integrazione del nuovo bridge va verificata anche dopo il deploy su `mementonav.vercel.app`. Non sono stati ampliati gli origin consentiti delle pagine remote.
