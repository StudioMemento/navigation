# NAV R10 — Lowpoly Amber / Mobile

- Dock ancorato al viewport visibile, con almeno 12 px dal fondo e rispetto della safe area. Fallback per browser senza svh. Toolbar e tastiera riducono l’altezza usata; il pinch zoom mantiene il comportamento nativo.
- Bridge Framer aggiornato: comunica al child l’altezza effettivamente visibile. Messaggi accettati soltanto dal parent e dalle origini Memento autorizzate. Sostituire il vecchio blocco, senza aggiungere iframe.
- Rimossa la sagoma di ombra proiettata della card attiva. Profondità delle anteprime tramite gradienti neri opposti, interpolati durante lo slide.
- Mobile: card entro l’84% della larghezza (prima 90%), padding interno 4,5% della card (prima 6%). Questa scelta espone più background ai lati.
- Fondo: 100/88/68 vertici secondo formato desktop/portrait/mobile. Sfumature radiali molto leggere ancorate ai vertici, alpha neutro massimo 0,039, ambra massimo 0,056. Nodi piccoli senza bloom; nessun alone largo sugli spigoli. Topologia stabile e gradienti di quiete in cache.
- URL delle scene versionati per evitare che la cache del deploy precedente mostri ancora le vecchie immagini.
- Sei immagini rigenerate square 1254 × 1254. Cinque integrate nelle sezioni; la sesta è una variante Projects. Mezzitoni scuri, lowpoly pulito, ambra intenso, niente blu. Master PNG e prompt in art/; WebP responsive e fallback JPEG in dist/assets/scenes/.

Non pubblicato. Esiti e limiti delle verifiche in ../QA.md.
