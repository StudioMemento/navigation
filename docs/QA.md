# Verifica NAV V6

Verifica del 6 novembre 2026, limitata al progetto NAV.

## Risultati

| Controllo | Risultato |
|---|---|
| Icone del dock | Stesse immagini, 160 × 160; totale da 2.372.320 a 21.354 byte |
| Font | Subset Latin/Latin-1, punteggiatura ed euro; da 352.240 a 98.020 byte |
| Build statico e riferimenti alle risorse | Superato; moduli validi, 15 varianti WebP square, URL immagini con hash |
| Test logica | 4 test superati: loop, gesti verticali, protezione click, link/deep-link |
| Desktop 1363 × 936 | Tab 817,8 × 561,6 a x=272,6 / y=187,2: inset 20% |
| Portrait 390 × 844 | Quattro inset 20%; immagine caricata; testo entro la tab; nessun overflow |
| Compact 320 × 568 | Quattro inset 20%; immagine caricata; testo entro la tab; nessun overflow |
| Landscape 844 × 390 | Quattro inset 20%; immagine caricata; testo entro la tab; nessun overflow |
| Scroll desktop | Studio → Services; navbar e hash sincronizzati |
| Selezione dalla navbar | Start selezionato senza lasciare la nav |
| Loop avanti | Start → Studio; hash `#studio`; ricentraggio senza salto visibile |
| Loop indietro e tastiera | Studio → Start con ArrowUp; hash `#start` |
| Drag verticale | Start → Studio; nessuna apertura accidentale |
| Apertura tab e ritorno | Test con destinazione locale: navigazione riuscita, interazione ripristinata con Back |
| Touch sintetico su viewport 390 | 0 pixel ambra idle; 1852 vicino all’origine; 3955 durante propagazione; 0 al termine |
| Propagazione misurata | Raggio medio dei pixel attivi da 81 a 214 px; ritorno completo al monocromatico |
| Revisione visiva | Cover, raccordo portrait, titolo inferiore, reticolato B/N, bordi e testo in prossimità verificati |

## Limiti della verifica

Le viste mobile sono iframe alle dimensioni indicate in Chromium; gli impulsi sono PointerEvent di tipo touch. Lo scroll e il drag sono stati provati anche tramite input del browser. Non è stato eseguito un test su telefono fisico, Safari iOS o hardware Android. Non viene dichiarato un frame rate misurato su tali dispositivi.

L’apertura completa delle pagine esterne non rientra in questa modifica: i loro URL sono verificati contro la V5 e non sono stati cambiati. Nessuna altra pagina Memento è stata modificata.
