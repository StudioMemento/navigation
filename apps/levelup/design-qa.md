# LevelUp V13 — verifica grafica e funzionale

Revisione del 2 novembre 2026 sulla base V12 e sui cinque punti del polish richiesto. Sorgenti e build statica pronti per Vercel.

## Immagini e servizi

Generate e ispezionate sei composizioni di servizio con oggetti riconoscibili, mantenendo la direzione grafite, particelle e luce ambra. Rigenerate anche le tre coppie di confronto: immagini quadrate da 1280×1280 px, con margini neri ampi e inquadratura coerente tra modello di base e materiali finali. Tutti i dodici asset hanno una variante WebP da 640 px.

Le CTA mostrano WEB DESIGN, 3D DESIGN, VIDEO, VISUAL, DESIGN e BRANDING, con chevron destro. I sei URL e gli hash di dominio già verificati nella V12 sono preservati e controllati dai test. Il titolo della sezione esperienze è “Esplora le esperienze!”.

## Carousel esperienze

A 1363 px la card centrale misura circa 473×237 px, rispetto ai circa 518×291 px precedenti. I bordi esterni delle card immediatamente adiacenti sono a 89,92 e 1273,08 px, allineati ai margini del contenuto da 90 px entro un decimo di pixel. Le card più lontane svaniscono progressivamente.

I test campionano larghezze da 320 a 2200 px e fasi intermedie dello scorrimento, verificando la copertura continua della fascia utile, l’allineamento ai margini e la riduzione della card centrale. La curva di scala è stata corretta dopo avere rilevato uno spazio tra card durante una transizione a larghezza intermedia.

## Confronti e responsive

Controllate viste da 320, 390, 768, 1024, 1280 e 1363 px tramite viewport incorporato nel browser. Nessun overflow orizzontale nel documento della landing. Alle larghezze telefoniche i confronti rimangono leggibili, con margini interni da 20 px; su tablet non si vedono i bordi rettangolari delle immagini.

A 1024 px, le tre card misurano 844×229 px circa: titolo in alto a sinistra e copy in basso a sinistra hanno tutti inset da 21,94 px. Le sei immagini risultano caricate. Titolo e tre confronti entrano insieme nella vista desktop da 900 px di altezza.

Verificati i range con Home/End e frecce: modificare il primo lascia gli altri due a 50. I chevron sono invisibili a riposo e visibili al focus da tastiera, senza background o bordo circolare. Acapi espliciti prima di “il”, “Lo” e “anche prima di”; spazi non separabili tengono insieme le brevi locuzioni.

## Player e controlli automatici

A 1280 px, la selezione IceCream aggiorna l’URL dell’unico iframe. Espansione in dialog e chiusura riuscite: resta una sola istanza e il focus ritorna a “Espandi IceCream”.

`npm run build` e `npm test` verificano risorse locali, font, struttura della pagina, bridge Tide, collegamenti dei domini, contesto Start, geometria del carousel e gestione del player. Il test di risorsa mancante usa un controllo negativo sul visual attivo. Lo ZIP comprende sorgenti e output `dist/`; esclude immagini PNG originali, schermate e file temporanei di QA.

## Limiti della verifica

Il browser di verifica non dispone di WebGL: ProductVis mostra il proprio fallback statico. Le interazioni interne delle dieci applicazioni esterne, il fullscreen nativo e il rendering GPU su dispositivi fisici non sono stati certificati in questa revisione. Il controllo responsive nel browser non sostituisce una prova su Safari iOS o browser Instagram fisici.
