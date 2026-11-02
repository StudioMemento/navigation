# Memento LevelUp · V12

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

## Modifiche V12

- Sei nuove composizioni astratte per WEB, 3D, VIDEO, VISUAL, DESIGN e BRANDING: superfici incomplete, particelle, nero/grafite e luce ambra dall’alto a destra. Ogni card apre il dominio corrispondente su Servizi.
- Carousel delle esperienze con grande card centrale, card laterali in prospettiva e sfumature ai bordi. Selezione tramite trascinamento, punti o tastiera; demo interattiva sotto il carousel.
- Tre esempi raccolti in un unico viewport desktop. Ogni fascia integra titolo, copy e confronto neutro/brandizzato, con sfumatura nera da sinistra. Le sei immagini di confronto sono state rigenerate come coppie panoramiche.
- Copy rivisti e prima fase su due righe: “Capiamo” / “il tuo obiettivo.”
- Layout mobile con margini di 20 px sui telefoni piccoli; confronti compatti e controllo indipendente dei tre cursori.

## Collegamenti Servizi

| Dominio | Destinazione |
| --- | --- |
| WEB | https://mementoservizi.vercel.app/#web |
| 3D | https://mementoservizi.vercel.app/#3d |
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
- `public/assets/v12/`: sei visual di dominio e tre coppie neutro/brandizzato.
- `design-qa.md`: verifiche e limiti.
- `visual-prompts.md`: direzione delle immagini generate.

Le immagini astratte e i confronti sono illustrazioni generate per la pagina. Nello ZIP sono incluse le versioni WebP ottimizzate. La licenza delle icone Lucide è in `public/assets/icons/LICENSE-lucide`.
