# R11 — direzione e verifica

## Osservazioni sul deploy del 7 novembre 2026

Analizzato mementostudio.it in Chrome: la home incorpora mementonav.vercel.app in un iframe. Nel rendering R10 le immagini illuminavano anche il perimetro, l'hover aveva una tinta tendente all'oro e il glow degli angoli risultava disomogeneo. I sorgenti R10 usavano canvas 2D per gli effetti, con file JavaScript statici e senza pipeline Vite.

## Immagini originali recuperate

| Scena | Fotografia di partenza | Elementi mantenuti |
|---|---|---|
| Studio | 15124.jpg | Due postazioni, schermi, cassettiere, tavolino centrale, due sedute |
| Services | 15126.jpg | Tavolo creativo, softbox, scaffale, sedia e sgabello |
| Projects | 15126.jpg, 15134.jpg | Atelier e sviluppo progettuale, reinterpretati come tre tavole e prototipi |
| LevelUp | 15129.jpg, 15124.jpg | Specchio verticale trasformato in portale, studio sullo sfondo |
| Start | 15132.jpg | Due poltrone, tavolino circolare, lampada a treppiede |

I render sono interpretazioni low poly dello studio; Projects e LevelUp sono estensioni concettuali. Master generati con lo strumento integrato, formato 1536 × 1024, senza testi/UI. La prima variante Projects, troppo simile a Studio, è stata scartata.

## Confini dell'intervento

La revisione riguarda il NAV e i suoi cinque asset. Le pagine di destinazione mantengono i rispettivi contenuti. La preview R11 è separata dalla home pubblica. Il deploy sul progetto NAV esistente non viene eseguito da questo pacchetto.

## Verifica del 7 novembre 2026

- Build di produzione Vite riuscita. Sei test automatici superati: continuità del loop, convergenza della molla, annullamento swipe, geometrie responsive, precedenza hash/referrer/sessione e validazione del bridge iframe.
- Chrome collegato: rendering WebGL attivo a 1440 × 900 e 390 × 844. Controllate le cinque scene, il trascinamento verticale, il ritorno Start → Studio, navbar e caricamento delle cinque texture.
- Regia: apertura mobile, azzeramento del bloom e ripristino verificati. Risolta la sovrapposizione del pulsante al logo.
- Tastiera: Home → Studio, End → Start. Modalità `?motion=reduce`: apertura diretta della sezione Projects e nessuna inclinazione al movimento del puntatore.
- Fallback senza WebGL verificato nella sessione cloud, incluso passaggio Studio → Services.
- Risolti nel controllo visivo: import relativo della navbar nella build, reticolo a riposo troppo evidente e duplicazioni del bordo nel kernel bloom. Il blur superiore/inferiore usa un passaggio Gaussian separabile nel renderer; la navbar mantiene il blur CSS solo come fallback.

Le dimensioni mobile sono state verificate in Chrome con viewport ridotto: non equivalgono a un collaudo su iPhone o Android fisici. Il contatore FPS della sessione controllata risente del throttling del browser e non costituisce un benchmark. Nessuna garanzia di 60 fps universali; il DPR viene ridotto automaticamente quando necessario.
