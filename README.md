# MEMENTO TIDE — landing Vercel v009

La cartella contiene la landing navigabile TIDE: sei sculture della famiglia v007, montagne del mondo v008, acqua e riflessione web, regia v008 adattata al browser e collegamenti alle pagine Memento. Tutti i file necessari a mostrare lago e catalogo Services sono inclusi, comprese librerie, HDR, font e 173 media del catalogo.

## Pubblicazione su Vercel

1. Estrai lo ZIP in una cartella e apri quella che contiene `vercel.json` e `package.json`.
2. Importa la cartella in un repository Git e collega il repository a Vercel, oppure apri il terminale nella cartella ed esegui `npx vercel`.
3. Se Vercel chiede le impostazioni: Framework **Other**, Build Command **npm run build**, Output Directory **public**. Sono già dichiarate in `vercel.json`; non servono variabili segrete o servizi backend.
4. Controlla l'anteprima generata da Vercel. Per pubblicarla come produzione dalla CLI: `npx vercel --prod`.

Questo export non pubblica automaticamente un sito. Vercel riceve una cartella estratta o un repository; lo ZIP è il pacchetto di consegna. La build usa Node 22 o successivo e le sole librerie standard di Node; Three.js e meshoptimizer sono già inclusi, quindi non richiede un'installazione npm.

Riferimenti ufficiali consultati: [configurazione progetto](https://vercel.com/docs/project-configuration/vercel-json), [deploy da CLI](https://vercel.com/docs/cli/deploy).

## Navigazione

Seleziona una scultura per portarla in primo piano. **Esplora** apre la sezione; **Torna al lago** o Escape riporta alla vista generale. Memento è l'ancora della navigazione, senza una pagina inventata.

| Scultura | Destinazione | Comportamento |
|---|---|---|
| Memento | `/` | Navigazione del lago |
| Services | `/services/` e https://mementoservizi.vercel.app/ | Catalogo locale nel loop TIDE; link pubblico di riserva |
| Projects | https://mementoportfolio.vercel.app/ | Nuova scheda |
| Studio | https://mementostudio.vercel.app/ | Nuova scheda; URL indicato dall'utente |
| Level Up | https://mementolevelup.vercel.app/ | Nuova scheda |
| Start | https://mementostart.vercel.app/ | Nuova scheda |

La pagina Services si apre anche direttamente su `/services/`. Il loop comprende discesa, catalogo, ritorno alla vista generale oltre la banda finale e ritorno con Escape. Le altre quattro pagine restano applicazioni esterne: la landing rimane aperta nella scheda originale. Non sono presentate come cinque integrazioni iframe complete.

I collegamenti sono raccolti in `public/data/navigation.json`. Per cambiarli, aggiorna anche i redirect in `vercel.json` e i link di riserva/noscript in `public/index.html`. La build controlla la corrispondenza tra navigation e redirect. Sono disponibili `/projects`, `/studio`, `/levelup`, `/start` e `/memento` come alias HTTP.

## Anteprima locale

```sh
npm run build
npm test
npm start
```

Apri http://127.0.0.1:8770/. Non aprire `index.html` direttamente con doppio clic: moduli e asset richiedono HTTP. `TIDE_PORT` permette di cambiare la porta dell'anteprima. L'anteprima serve esclusivamente `public/`, senza esporre file di lavoro o licenze private.

Per verifiche ripetibili: `?qa=1` espone la diagnostica in pagina e `?still=1` ferma l'animazione ambientale; `?textures=mobile` seleziona i GLB con texture mobile. L'export usa sempre GLB ottimizzati; non include varianti raw né sorgenti Blender.

## Contenuto e limiti

- `public/`: soli file pubblicati; nessuna dipendenza da directory esterne.
- `source/services/`: copia originale del catalogo e relativa provenienza, utilizzata dalla build per gli adattamenti statici.
- `scripts/`: build, anteprima, verifiche e utilità di consegna.
- `licenses/`: licenze e manifest di provenienza; le licenze dei moduli e del font sono incluse anche nei rispettivi percorsi pubblici.
- `reports/`: verifiche puntuali del pacchetto, dei collegamenti e della conversione delle rotte. Le verifiche browser si riferiscono agli scenari registrati, non a tutti i dispositivi.

Le rotte analitiche v008 conservano la conversione Web Y-up e i parametri di regia, con verifica numerica contro i campioni Python. Acqua, riflessione, ripple, fog e transizione HTML sono effetti del runtime; non sono effetti esportati automaticamente dal GLB. Bloom e DOF non sono abilitati.

La pubblicazione effettiva su Vercel, Safari/iOS, dispositivi mobili fisici, prestazioni sui dispositivi target e interazioni complete delle quattro applicazioni esterne rimangono **non verificato**. Non viene dichiarato un obiettivo FPS raggiunto. Il caricamento iniziale osservato è **13,315 MiB sul browser desktop** e **11,921 MiB nel formato portrait 390×844**: i budget del master, rispettivamente **10 MiB e 6 MiB, non sono rispettati**. Le misure comprendono GLB, HDR, moduli e dati prima del preload Services, secondo la diagnostica del browser. Il portrait è una viewport del browser desktop, non un telefono fisico. Le verifiche registrate nel pacchetto riportano i dettagli.

La QA Blender v008 resta distinta da quella del browser: Validator e parità delle mesh ottimizzate sono superati, mentre il criterio stretto sulle normali ricostruite da Blender al reimport non era superato (massimo 0,294°). L'export web conserva gli stessi GLB verificati, senza correzioni nascoste dei file originali.
