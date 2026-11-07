# Verifica NAV R5

7 novembre 2026.

## Controlli automatici

- Proiezione e inversa, ordine delle cinque sezioni, loop, drag/snap e dimensioni su sette viewport: 1997×787, 2560×1080, 1440×900, 834×1194, 390×844, 844×390, 320×568.
- Confronto con la tavola a 1997×787: card ~1000×476; padding 6% sui tre lati del titolo; preview con bordo esterno più vicino alla camera e margine interno di 8–10 px.
- Topologia stabile, triangolazione senza edge duplicati, copertura, campo irregolare, impulso lungo adiacenze, pool limitato, reveal monotono e 61 stati di proiezione/reverse.
- A 1000×476: 345 vertici per la superficie della card; 165 per il fondo a 1997×787. La lunghezza media degli edge periferici della card è inferiore a quella interna.
- Parsing di tutti i moduli, asset originali completi, cinque destinazioni preservate, configurazione Vercel, singolo mount della navbar e singolo RAF nell'app.

## Browser

Chrome remoto, controlli tramite interfaccia reale e pagina interna di verifica.

- Layout desktop 1363×936 circa e mobile via iframe 390×844 e 320×568: immagini caricate 5/5; larghezza del documento uguale al viewport; card principale completamente rivelata; un solo overlay.
- Hover reale sul titolo: foto a colori, micro-reticolo limitato ai glifi, anteprime neutre.
- Test degli eventi immagine: `IMAGE_GATE_PASS`, con passaggio color → neutral.
- Test sintetico touch down/up/cancel: `TOUCH_CANCEL_PASS`; un impulso al rilascio, nessun impulso aggiuntivo sul cancel, stato di contatto liberato. I grafi locali ricevono impulsi separati.
- Drag verticale reale: LevelUp → Start. Rotella reale: Start → Studio, con ciclo completo.
- JavaScript disabilitato via iframe sandbox: visibili tutti e cinque i link di fallback.
- Reduced motion: maschere rimosse, zero particelle/impulsi; chevron e tastiera portano a Services e Start. Verifica tramite override diagnostico, non tramite impostazione del sistema operativo.

## Limiti

Il browser remoto ha eseguito il RAF con cadenza fortemente ridotta durante la prova; non costituisce un benchmark a 60 fps. Il codice usa tempo trascorso reale per le transizioni e limita il passo delle particelle. Il target di 60 fps rimane da misurare sui dispositivi reali.

Il test touch sintetico verifica il ciclo degli eventi; non sostituisce un test su hardware iOS/Android. Safari non è stato verificato. Nessuna nuova immagine generata. Il deploy Vercel esistente non è stato sovrascritto.
