# Memento LevelUp · V13

Landing statica con sei domini di servizio, carousel delle esperienze, tre confronti interattivi e percorso di contatto. Include sorgenti HTML/CSS/JavaScript, asset WebP, font locale e build pronta in `dist/`. Non richiede dipendenze npm, backend o variabili d’ambiente.

## Avvio

Con Node.js 20 o successivo, dalla cartella estratta:

```sh
npm run dev
npm run build
npm test
```

Il server locale usa la porta 4173. La build rigenera `dist/`. I test verificano risorse, link dei domini, geometria del carousel, caricamento del player, contesto del contatto e integrità del bridge.

## Pubblicazione su Vercel

Usa come root la cartella contenente `package.json` e `vercel.json`. La configurazione inclusa imposta framework `Other`, comando `npm run build`, output `dist` e nessuna installazione di dipendenze. Il pacchetto è pronto da pubblicare; questa consegna non esegue un deploy.

## Modifiche V13

- Sei nuovi visual riconoscibili: dispositivi web, modellazione 3D, videocamera, set fotografico, grafica editoriale e identità coordinata. Mantengono grafite, particelle e luce ambra. Le CTA mostrano WEB DESIGN, 3D DESIGN e gli altri domini con chevron destro.
- Titolo “Esplora le esperienze!”. Carousel più piccolo, bordi esterni delle due card adiacenti allineati ai margini del contenuto e card più lontane progressivamente sfumate. La geometria resta continua anche tra due selezioni.
- Nei tre confronti, titolo in alto e copy in basso condividono lo stesso margine sinistro. Acapi espliciti prima di “il suo valore”, “Lo stesso carattere” e “anche prima di”.
- Rimosse le etichette visibili e il cerchio del cursore. I chevron compaiono al passaggio del puntatore o al focus da tastiera; i tre controlli restano indipendenti.
- Sei nuove immagini di confronto quadrate, con ampio spazio nero, stessa inquadratura per ciascuna coppia e ancoraggio a destra. Zoom e scostamento sono regolabili per card in CSS, senza esporre bordi delle immagini su tablet.

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

Le dieci demo, il loro ordine e i rispettivi URL sono definiti in `src/content.js`. Il player mantiene una sola istanza, aggiornata quando termina una nuova selezione. L’espansione usa il fullscreen nativo quando disponibile, altrimenti un dialog accessibile. La chiusura restituisce il focus al pulsante di apertura.

Il contatto apre `https://mementostudio.it/start`. Dopo aver esplorato una demo, conserva i parametri `experience` e `idea`; l’eventuale precompilazione richiede che Start li legga. Il bridge Tide v014 è preservato byte per byte. In embed la superficie esterna rimane trasparente.

## File principali

- `src/content.js`: testi, immagini, domini e demo.
- `src/app.js`: composizione della pagina e interazioni.
- `src/carousel.js` e `src/portfolio-geometry.js`: navigazione e geometria dei carousel.
- `src/player.js`: gestione dell’unico iframe.
- `styles.css`: layout e stile responsive.
- `public/assets/v13/`: sei visual di dominio e tre coppie modello/materiali, tutti quadrati a 1280 px con varianti da 640 px.
- `design-qa.md`: verifiche e limiti.
- `visual-prompts.md`: direzione delle immagini generate.

I visual di servizio e i confronti sono immagini generate per la pagina. Nello ZIP sono incluse le versioni WebP ottimizzate. La licenza delle icone Lucide è in `public/assets/icons/LICENSE-lucide`.
