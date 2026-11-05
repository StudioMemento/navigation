# Direzione immagini V3

Dieci scene generate: cinque wide e cinque composizioni portrait. Questo documento riassume la direzione artistica; non è una trascrizione letterale dei prompt.

## Linguaggio condiviso

Ambienti architettonici cinematici, superfici sfaccettate low-poly, carbone e grafite, luce ambra controllata, profondità atmosferica e riflessi morbidi. Nessun testo, UI, cornice o watermark. Soggetti interi, spazio di respiro e zona inferiore scura per il titolo sovrapposto.

| File | Scena |
|---|---|
| studio | Due postazioni complete, monitor, sedute e scrivania fra monoliti sfaccettati. |
| services | Atelier con tavolo di lavoro, oggetti geometrici e grande lampada sospesa. |
| projects | Galleria con tre pannelli espositivi e opere geometriche. |
| levelup | Percorso ascendente fra gradoni e portali, con simbolo plus come destinazione visiva. |
| start | Spazio d’incontro con due sedute, tavolino e struttura scultorea luminosa. |

Le versioni verticali ricompongono la stessa idea in formato 2:3 e mantengono l’intero gruppo di soggetti. Non sono semplici crop delle immagini wide.

## File

- `originals/<nome>.png`: wide, 1672 × 941.
- `originals/<nome>-portrait.png`: portrait, 1024 × 1536.
- `assets/images/<nome>.webp`: wide ottimizzata.
- `assets/images/<nome>-small.webp`: wide ridotta a 1000 px di larghezza.
- `assets/images/<nome>-portrait.webp`: portrait ridotta a 1000 × 1500.

I WebP derivano da conversione e ridimensionamento. Nel sito il livello principale usa `object-fit: contain`; una copia sfocata completa lo sfondo della tab. Le immagini portrait vengono selezionate con rapporto del viewport minore o uguale a 1:1.
