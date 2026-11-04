# Verifica — Memento Nav Slider V1

Data: 4 novembre 2026.

## Controlli del pacchetto

- Cinque immagini generate distinte, originali PNG e derivati WebP desktop/mobile.
- Cinque URL pubblici esatti e cinque destinazioni iframe verificate.
- Moduli JavaScript validi, import locali risolti, font e immagini presenti.
- Build statica senza dipendenze npm; originali e documentazione esclusi da `dist`.
- Test della logica: loop, posizionamento, percorsi pubblici/legacy, parametri e ancora, validazione messaggi moderna/legacy con controlli negativi su origine, sorgente, sessione e schema.

## Browser

Chrome cloud, viewport desktop 1363 × 936. Verifiche responsive in viewport iframe da 390 × 844, 360 × 800, 768 × 1024 e 1024 × 768.

- Selezione delle cinque sezioni: titolo, link pubblico e sorgente iframe corrispondono; un iframe attivo alla volta.
- Navigazione con tastiera fino a Start e wrap a Studio; cronologia indietro ripristina la sezione.
- Trascinamento orizzontale nel viewport mobile cambia sezione senza aprire accidentalmente la pagina.
- Mobile 360/390 e tablet 768/1024: nessun overflow orizzontale del documento, icona centrale completa, tipografia dentro i margini.
- Vista estesa: ruolo dialog, gestione focus, chiusura e ripristino dello scroll del documento.
- Il fondo trasparente di Servizi rimane nero nell’host; è stato corretto il disallineamento di color-scheme tra host e iframe.
- Rilevata e corretta la gestione della cronologia sul ritorno alla prima selezione.
- Verifica visiva di glow/mesh sui caratteri e sui bordi vicini; le silhouette rimangono ferme.

## Limiti della verifica

- Le prove a 360/390 px sono emulazione di layout e drag con puntatore, non un test su hardware touch iOS/Android.
- Il browser cloud disabilita WebGL: il rendering 3D interno della pagina Studio non è stato validato qui. Il caricamento della pagina e il suo fallback sono stati osservati; lo slider non dipende da WebGL.
- Non è stato eseguito un benchmark GPU o certificato un frame rate di 60 fps. La mesh è precalcolata e il ciclo degli FX si arresta quando inattivo, ma le prestazioni finali dipendono anche dalle pagine remote.
- Il progetto non è stato pubblicato in produzione. Gli handshake delle pagine con allowlist di origin vanno ricontrollati sul dominio finale dopo il deploy.
- Lo stato di una pagina viene mantenuto quando si espande/chiude la vista, ma viene ricaricato passando a un’altra sezione: scelta intenzionale per evitare cinque scene remote in esecuzione.
