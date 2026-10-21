# Memento V4 — bozza per Vercel

Una base funzionante che conserva diorami, immagini e contenuti del progetto originale e uniforma navigazione, griglie, dettagli e contatti.

## Avvio

Serve Node.js 20 o superiore. Non ci sono pacchetti da installare.

```sh
npm run dev
```

Il server locale usa la porta 4173. Non aprire `index.html` direttamente dal filesystem: i moduli JavaScript e i JSON richiedono HTTP.

```sh
npm test
npm run check
npm run build
```

La build statica è in `dist/`. `npm run check` controlla tutti gli asset referenziati dai contenuti; `npm test` verifica percorsi, filtri, progetti, varianti e generazione della bozza email.

## Prova su Vercel

1. Estrai lo ZIP e usa la cartella `MEMENTO_V4_PREVIEW` come root del progetto.
2. Carica questa cartella in un repository Git e importalo come nuovo progetto Vercel, oppure usa il normale flusso Vercel CLI dalla root.
3. Impostazioni: **Framework: Other**, **Build Command: `npm run build`**, **Output Directory: `dist`**. Non serve un comando di installazione né una variabile d’ambiente.
4. Le stesse impostazioni sono già presenti in `vercel.json`.

Non ci sono rewrite globali: le route usano hash, per esempio `/#/portfolio/auren`. I link diretti e il tasto Indietro funzionano anche sull’hosting statico.

Questa versione è una preview: `noindex` è impostato nell’HTML e negli header Vercel. Il progetto live esistente non è stato modificato o pubblicato da questo lavoro.

## Cosa include

- Sei mondi con i diorami originali: Home, Studio, Servizi, Portfolio, Level Up e Start.
- 43 servizi, 6 percorsi completi e tutte le informazioni di dettaglio del catalogo.
- 23 progetti, tutte le gallerie e le varianti di HyperKnife e Coricama.
- Nove demo con anteprima incorporata, apertura esterna e contatto contestuale.
- Studio originale esplorabile in 3D, caricato solo quando richiesto.
- Email, WhatsApp, telefono e Instagram; form con validazione e bozza modificabile.

## Le tre tipologie

| Tipo | Ruolo | Componente |
| --- | --- | --- |
| Mondo | Introduce una sezione con titolo, diorama e una CTA | `src/world.js` |
| Raccolta | Aiuta a scegliere tra categorie, servizi, progetti o demo | `src/collections.js` |
| Dettaglio | Dà spazio a immagini, informazioni e azione successiva | `src/focus.js`, `src/contact.js` |

Le decisioni su spaziatura, tipografia, colori e comportamento sono in `docs/LINEE_GUIDA_VISUAL.md`.

## Dove modificare

- `src/styles.css`: token e tre famiglie di layout; breakpoint a 760 e 1100 px.
- `src/config.js`: diorami, testi introduttivi, etichette e contatti.
- `content/catalog.json`: servizi, categorie e percorsi.
- `content/projects.json`: progetti, immagini e varianti.
- `content/experiences.json`: demo e destinazioni originali.
- `src/router.js`: URL e memoria della posizione di lettura.
- `src/renderer.js`: enhancement WebGL, disegno su richiesta e rilascio delle risorse.
- `src/ui.js`: componenti condivisi, filtri e escaping dei contenuti.
- `sockets/studio/`: modulo 3D originale isolato; `portal.css` lo raccorda alla nuova interfaccia.

Il sito principale non incorpora più cinque siti separati. Servizi, portfolio, Level Up e contatti sono interfacce native della stessa applicazione. Solo le demo esterne e lo spazio Studio usano iframe.

## Limiti della bozza

- Il form **prepara una email** e apre il client dell’utente; non invia dal server. La bozza vive in memoria nella scheda e si perde al ricaricamento. Per l’invio diretto occorre collegare un servizio email e configurare i dati del progetto.
- Le nove demo dipendono dai siti originali. Il collegamento esterno resta disponibile quando una destinazione non consente l’incorporamento. I comandi e i contenuti interni di quei siti non sono stati riscritti.
- Il browser usato per il test non offre WebGL hardware: il fallback dei diorami è verificato, mentre movimento e qualità del rendering GLB vanno provati su un dispositivo con accelerazione grafica. IceCream è stata verificata nel suo fallback con cambio gusto funzionante. Lo Studio conserva anche il renderer software originale, verificato in questo ambiente; la fotografia interviene se fallisce anche quest’ultimo.
- Questa build non include analytics, invii di messaggi o servizi esterni nuovi.

I controlli svolti e i relativi limiti sono in `design-qa.md`.
