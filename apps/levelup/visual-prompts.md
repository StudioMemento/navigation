# LevelUp V12 — direzione delle immagini

Asset originali creati con OpenAI imagegen e ottimizzati in WebP. Le indicazioni seguenti descrivono la direzione usata; non sono una trascrizione dei singoli prompt.

## Domini

Direzione comune: composizione cinematografica astratta, nero su nero, superfici di grafite dai contorni incompleti che si dissolvono in particelle. Bagliore ambra controllato dall’alto a destra, nessun oggetto commerciale riconoscibile, nessun testo o logo. Soggetto sulla destra e spazio nero a sinistra per titoli e copy HTML. Una famiglia coerente di immagini, con una struttura distinta per ogni dominio.

| Dominio | Interpretazione | File |
| --- | --- | --- |
| WEB | Piani sospesi e flussi che suggeriscono connessioni | `web.webp` |
| 3D | Volume irregolare che emerge da una nube particellare | `3d.webp` |
| VIDEO | Membrane e scie consecutive che suggeriscono movimento | `video.webp` |
| VISUAL | Superfici ottiche frammentate attraversate dalla luce | `visual.webp` |
| DESIGN | Pieghe e piani in formazione | `design.webp` |
| BRANDING | Forme intrecciate che convergono in un insieme | `branding.webp` |

Percorso: `public/assets/v12/`. Ogni immagine ha una variante `-640.webp` per schermi piccoli, oltre alla versione larga da 1536 px.

## Confronti neutro/brandizzato

Tre scene panoramiche 3:1, soggetti raggruppati a destra e fondo nero che sfuma verso sinistra. Prima viene creata la versione con materiali e identità; la stessa immagine viene poi modificata per ottenere un modello neutro grigio, preservando inquadratura, contorni e disposizione.

- **Prodotto:** flacone AUREN e confezione, vetro ambrato e finiture scure; versione neutra senza etichetta o materiali finali.
- **Identità:** shopper, scatola, biglietti e smartphone coordinati; versione neutra con identica composizione.
- **Collezione:** poltrona in pelle calda e tablet con catalogo; versione neutra grigia, con schermo senza identità.

File: `product-before/after.webp`, `brand-before/after.webp`, `collection-before/after.webp`, tutti a 1800×600 px. Il ritaglio e il confronto sono realizzati nel browser, senza deformare le immagini.
