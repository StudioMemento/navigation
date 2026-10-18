# Verifica V10 — 18 ottobre 2026

- npm test passato: 44 servizi, sei macro categorie, sei bundle, ricerca, filtri, schede, focus, link diretti e modulo email senza invio.
- Regressione gesti passata: perdita della cattura implicita sul figlio, swipe orizzontale, rilascio senza cambio immediato di posizione, assestamento senza rimbalzo, tap e scroll verticale.
- Autoplay verificato con clock deterministico: avvio graduale, pausa/ripresa, stop fuori viewport, sotto dialog e in tab nascosta; movimento ridotto.
- Verificato riciclo invisibile delle tavole al confine del loop.
- Build statica Vercel riuscita. Nessuna nuova dipendenza runtime.
- Preview locale bloccata dall'infrastruttura (/proc); browser remoto non disponibile per timeout. Rendering mobile e touch su dispositivo reale non verificati in questa versione.
- Integrazione Framer non coperta dai test locali.
