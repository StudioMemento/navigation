# LevelUp V12 — verifica grafica e funzionale

Revisione del 2 novembre 2026, sulla base V11 e sulle schermate fornite nella richiesta. Pacchetto locale pronto per Vercel; nessun deploy effettuato.

## Immagini e collegamenti

Sei nuovi visual originali, tutti con composizione astratta in grafite, particelle e luce ambra dall’alto a destra. Titoli e copy rimangono testo HTML. Esportazioni WebP da 1536 e 640 px.

Aperti i sei deep link sulla pagina Servizi: ogni hash seleziona il titolo corretto WEB, 3D, VIDEO, VISUAL, DESIGN o BRANDING. Destinazioni raccolte nel README e in `src/content.js`.

## Carousel esperienze

A 1363 px la card centrale misura circa 518×291 px; le card laterali si riducono e ruotano con continuità. Verificato il trascinamento da ProductVis a IceCream e l’aggiornamento della demo selezionata. Espansione IceCream in dialog e chiusura riuscite: una sola istanza iframe presente, focus ripristinato su “Espandi IceCream”.

La geometria viene campionata dai test automatici su larghezze da 320 a 2200 px e posizioni intermedie, verificando continuità della copertura e predominanza della card centrale.

## Confronti in un viewport

A 1363×936 px, titolo e tre fasce sono visibili insieme. Ogni fascia misura circa 1183×227 px e contiene testo, immagine e cursore in un solo frame. Tutte le sei immagini panoramiche risultano caricate, a 1800×600 px.

Verificati Home, End e freccia destra: i range cambiano indipendentemente. Su viewport da 390 px, il trascinamento del primo cursore da 50 a 85 lascia gli altri due a 50. Il controllo opera nella zona immagine e il gradiente nero mantiene leggibile il testo.

## Responsive e testi

Misurati i layout a 320, 390, 768, 1024 e 1280 px di larghezza, oltre alla vista desktop a 1363 px. Nessun overflow orizzontale e nessun copy tagliato nei confronti. Margini laterali da 20 px a 320 e 390 px.

Il primo titolo degli step mantiene la separazione “Capiamo” / “il tuo obiettivo.” a tutte le larghezze campionate. Su telefono il blocco confronti può richiedere un breve scorrimento verticale per conservare leggibilità e dimensioni utili del cursore.

## Verifica del pacchetto

`npm run build` e `npm test` controllano build statica, risorse locali, font, struttura della pagina, bridge, link dei domini, contesto Start e gestione del player. Lo ZIP contiene sorgenti e output `dist/`; esclude schermate, file temporanei di QA e dipendenze npm.

## Limiti

Il browser di verifica non dispone di WebGL: ProductVis mostra il proprio fallback statico. Le interazioni interne delle dieci applicazioni esterne, il fullscreen nativo e il rendering GPU su dispositivi fisici non sono stati certificati in questa revisione. Il controllo responsive usa viewport del browser; non sostituisce un test su Safari iOS o browser Instagram fisici.
