# Verifica Hub fullscreen V2

4 novembre 2026.

- Build statica completata; moduli e riferimenti locali verificati.
- Tre test automatici passati: loop, vecchi link di selezione, destinazioni canoniche e contesto sicuro.
- Browser desktop 1363 × 936: hub e documento esattamente 936 px, nessuno scroll aggiuntivo.
- Viewport 390 × 844, 360 × 800, 768 × 1024 e 1024 × 768: hub pari al viewport, titolo e freccia interamente visibili, nessun overflow orizzontale.
- Tutte e cinque le selezioni: titolo, tavola attiva e chevron puntano allo stesso URL corretto.
- Trascinamento verificato nel viewport mobile: selezione Studio → Services senza apertura involontaria.
- Ingresso reale da titolo, tavola attiva e chevron verificato verso `/services`.
- Chevron verificato anche da hub incorporato: navigazione della finestra superiore a `https://mementostudio.it/services`.
- Indietro nel browser: selezione Services recuperata, uscita azzerata e hub interattivo.
- Nessun iframe o elemento navbar presente nel DOM dell’hub.

La dissolvenza riguarda l’uscita dall’hub. Il caricamento e l’ingresso delle cinque pagine esterne dipendono dai rispettivi progetti. La modalità movimento ridotto è gestita nel CSS e nella navigazione; non è stata simulata nel browser di verifica.
