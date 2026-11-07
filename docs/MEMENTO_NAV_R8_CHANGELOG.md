# Memento NAV R8 — 7 novembre 2026

Revisione della R7 dopo l’analisi in Chrome di `https://mementostudio.it/` e del suo iframe `https://mementonav.vercel.app/`.

| Punto | Modifica |
| --- | --- |
| 1 — Background | Triangolazione più densa e adattata ai pixel del viewport. Shading carbone per faccia, gradiente ambra locale, idle lieve e deformazione più evidente vicino al cursore. 428 facce a 1200×800, 914 a 1920×1080. Limiti 580 vertici desktop e 240 mobile. |
| 2 — Titoli | Inter 200 → 300, stessa misura usata dal fit e dalle maschere. Edge glow sul contorno dei glifi e alone ambra locale più intenso. |
| 3 — Chevron | Larghezza massima 54 → 62px, stroke SVG .85 → 1.18. Microfacce triangolari lungo i due bracci, edge glow e bagliore esterno. |
| 4 — Tab | Tre passaggi di luce sul bordo reale: bloom morbido, bordo ambra e nucleo caldo. Margine canvas esterno 32px. |
| 5 — Slide e navbar | Stato attivo aggiornato all’input, senza attendere l’assestamento. Spring analitica interrompibile che conserva la velocità. Input rapidi e rotella continua non vengono bloccati dalla transizione. Crossfade icone 80ms. |
| 6 — Appear/disappear | Reveal, hover e uscita condividono gli stessi ID dei triangoli. Nessun secondo reticolo sovrapposto; intensità irregolare e picchi locali caldi. |
| 7 — Angolo alto sinistro | Pulizia del canvas in coordinate fisiche e ripristino assoluto della trasformazione ad ogni frame. Impedisce residui e copie traslate del perimetro. |

Il trail contiene soltanto frammenti triangolari. Sono conservati asset, destinazioni, overlay, bridge Framer, ripristino della sezione, navigazione da tastiera e supporto reduced motion.

## Consegna

Progetto statico pronto per Vercel: preset **Other**, nessuna build, output **dist**. Questa revisione è un pacchetto da pubblicare; il dominio di produzione non è stato aggiornato durante la lavorazione. Il bridge Framer già presente va conservato.

## Verifica

Eseguire `npm test`. Gli esiti e i limiti della verifica browser sono riportati in `QA.md`. `scripts/qa-r8.html` è una pagina di test da copiare temporaneamente in `dist/`: espone dimensioni desktop/mobile, hover simulato, reveal e sequenza rapida di slide. Non è inclusa nell’interfaccia pubblica.
