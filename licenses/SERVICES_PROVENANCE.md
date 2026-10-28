# Services — copia statica per TIDE

Il catalogo HTML/CSS/JavaScript incluso proviene dalla copia pubblica già acquisita il 26 ottobre 2026 da https://mementoservizi.vercel.app/. Gli originali e i relativi hash sono conservati in `source/services/`.

Il 28 ottobre 2026 sono stati acquisiti esclusivamente i 173 file media referenziati dal catalogo: immagini WebP e varianti responsive, icone SVG, dither SVG e InterVariable.woff2. URL, dimensioni e SHA-256 sono in `licenses/services_media_manifest.json`. Non è stata effettuata una scansione ricorsiva del sito. I media non sono stati ritoccati o ricampionati.

`scripts/build.mjs` materializza sotto `public/services/` gli adattamenti già effettuati dal server del campione: percorsi assoluti locali, unità di altezza legate alla viewport del parent e bridge di integrazione. La pagina aperta da sola resta interattiva senza il bridge iframe. Nessuna form o email è stata inviata durante la preparazione.

La copia è distribuita per il progetto MEMENTO richiesto dal titolare del progetto; i contenuti e le immagini di brand restano soggetti ai diritti originali, senza attribuzione di una nuova licenza libera. Il font Inter è soggetto alla SIL Open Font License 1.1 inclusa in `INTER-OFL.txt`. La licenza è stata acquisita dal repository ufficiale https://github.com/rsms/inter/blob/master/LICENSE.txt.

Three.js e meshoptimizer conservano le rispettive licenze MIT in `public/vendor/`. HDR e asset TIDE mantengono le licenze/provenienze in `licenses/source/`.
