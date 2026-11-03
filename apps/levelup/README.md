# Memento LevelUp · V14

Landing statica con sei domini di servizio, carousel delle esperienze, tre confronti interattivi e percorso di contatto. Include sorgenti HTML/CSS/JavaScript, asset WebP, font locale e build pronta in `dist/`. Non richiede dipendenze npm, backend o variabili d’ambiente.

## Avvio

Con Node.js 20 o successivo, dalla cartella estratta:

```sh
npm run dev
npm run build
npm test
```

Il server locale usa la porta 4173. La build rigenera `dist/`. I test verificano risorse, link, geometria del carousel, avvio immediato della selezione, player, contesto del contatto e integrità del bridge.

## Pubblicazione su Vercel

Usa come root la cartella contenente `package.json` e `vercel.json`. La configurazione inclusa imposta framework `Other`, comando `npm run build`, output `dist` e nessuna installazione di dipendenze.

## Modifiche V14

- Sei nuovi visual che integrano i richiami del servizio nelle superfici astratte: layout e padding per web, wireframe e vertici per 3D, framing e timeline per video, ottica e triangolo di esposizione per fotografia, registro e strumenti editoriali per design, identità coordinata e confezione per branding. Grafite, particelle, luce ambra e spazio nero mantengono la continuità visiva.
- Due categorie singolari in elenco verticale, con trattini, in alto a sinistra. MementoSL sostituisce il nome Unfreeze; TechRef apre la home.
- La scelta di un’esperienza avvia l’iframe subito, durante l’animazione del carousel. Al rilascio di uno swipe viene caricato il suo obiettivo finale. Le card attraversate dall’animazione non avviano altri embed.
- La prima demo inizia a caricarsi quando il selettore si avvicina al viewport. Rimane un solo iframe; il poster della scelta appare durante l’attesa. La rete e l’avvio interno delle applicazioni esterne continuano a determinarne il tempo di disponibilità.
- Tre nuove coppie per il confronto: cuffie in pelle e metallo, packaging da caffetteria coordinato con una pagina mobile, poltrona e lampada con catalogo digitale. Nessun marchio o logo inventato nei confronti.
- Conservati il carousel compatto, il fade laterale, gli allineamenti, gli acapi e i chevron dei confronti visibili solo su hover o focus.

## Ordine delle esperienze

| Esperienza | Prima categoria | Seconda categoria |
| --- | --- | --- |
| Fashion | Ecommerce | Vetrina digitale |
| Elite | Vetrina digitale | Landing page |
| Memento Food | Vetrina digitale | Menù interattivo |
| Auren | Esperienza digitale | Landing page |
| IceCream | Vetrina digitale | Showroom digitale |
| MementoSL | Vetrina digitale | Showroom digitale |
| Knives | Showroom digitale | Configuratore 3D |
| ProductVis | Player 3D | Configuratore 3D |
| TechRef | Comparatore | Vetrina digitale |
| VisualRef | Editor 3D | DCC |

Contenuti e destinazioni sono definiti in `src/content.js`. Fashion è la selezione iniziale. L’identificativo interno `gamma` è conservato per MementoSL per mantenere compatibili i parametri del contatto.

## Collegamenti Servizi

| Dominio | Destinazione |
| --- | --- |
| WEB DESIGN | https://mementoservizi.vercel.app/#web |
| 3D DESIGN | https://mementoservizi.vercel.app/#3d |
| VIDEO | https://mementoservizi.vercel.app/#video |
| VISUAL | https://mementoservizi.vercel.app/#visual |
| DESIGN | https://mementoservizi.vercel.app/#design |
| BRANDING | https://mementoservizi.vercel.app/#branding |

Il link occupa la card attiva e usa il livello superiore della pagina anche in embed. Le card laterali selezionano prima il dominio; trascinare non attiva il link.

## Player e contatto

Il player mantiene una sola istanza e ignora gli eventi di caricamento delle selezioni superate. L’espansione usa il fullscreen nativo quando disponibile, altrimenti un dialog accessibile. La chiusura restituisce il focus al pulsante di apertura. Un caricamento non completato entro 20 secondi mostra “Riprova” e il collegamento alla demo.

Il contatto apre `https://mementostudio.it/start`. Dopo aver esplorato una demo conserva i parametri `experience` e `idea`; l’eventuale precompilazione richiede che Start li legga. Il bridge Tide v014 è preservato byte per byte. In embed la superficie esterna rimane trasparente.

## File principali

- `src/content.js`: testi, immagini, domini e demo.
- `src/app.js`: composizione della pagina e interazioni.
- `src/carousel.js` e `src/portfolio-geometry.js`: navigazione e geometria dei carousel.
- `src/player.js`: gestione dell’unico iframe.
- `styles.css`: layout e stile responsive.
- `public/assets/v14/`: dodici immagini quadrate da 1280 px e varianti da 640 px.
- `design-qa.md`: verifiche e limiti.
- `visual-prompts.md`: prompt delle immagini generate.

I visual di servizio e i confronti sono immagini generate per la pagina. Nello ZIP sono incluse le versioni WebP ottimizzate. La licenza delle icone Lucide è in `public/assets/icons/LICENSE-lucide`.
