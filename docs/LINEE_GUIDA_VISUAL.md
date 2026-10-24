# Memento — sistema visivo V4

La regola è semplice: il mondo introduce, la raccolta aiuta a scegliere, il dettaglio permette di capire e agire. Cambiano le proporzioni della schermata; identità, comandi e linguaggio rimangono coerenti.

## 1. Mondo

**Quando:** home e introduzione dei sei mondi.

- Una scena occupa il viewport, con altezza minima per evitare collisioni sugli schermi bassi.
- Il nome del mondo è il livello tipografico più ampio. Il diorama originale si sovrappone al titolo.
- La texture di ossidiana resta in queste scene, al 28% di opacità. Non deve competere con paragrafi o dettagli.
- La parte inferiore spiega cosa si trova nella sezione, propone una CTA e rende leggibile la navigazione precedente/successiva.
- Le frecce cambiano mondo; la CTA apre il contenuto. Il monolite non nasconde un’azione diversa da quella scritta.
- La navigazione principale entra direttamente nei contenuti. Non obbliga a passare dal diorama.

**Proporzioni:** titolo 15vw, massimo 270px sui monitor grandi; diorama `min(52vw, 58svh)`. Su mobile il diorama usa `min(90vw, 390px)`. Testo descrittivo 13–14px. Titolo della promessa 24–42px.

## 2. Raccolta

**Quando:** servizi, portfolio, Level Up e presentazione dello Studio.

- Titolo editoriale a sinistra, breve introduzione a destra. Su mobile sono impilati.
- I titoli usano una seconda riga più tenue; niente testo in outline dentro le pagine di lettura.
- Una griglia stabile sostituisce i caroselli che richiedevano più scelte per arrivare allo stesso contenuto.
- Servizi: panoramica iniziale di sei ambiti. Ogni ambito filtra i servizi; “Percorsi completi” apre i sei bundle; “Tutti” espone il catalogo completo.
- Portfolio: categoria e ricerca si combinano. I filtri sono conservati nel link di ritorno dal progetto.
- Level Up: ogni scheda apre direttamente la relativa demo. Il copy spiega che si tratta di esperienze da provare.
- Le card hanno immagine, categoria, titolo e breve descrizione. L’intera card è un link.

**Griglie:** servizi a 3 colonne, 2 sotto 1100px, 1 sotto 760px. Portfolio e demo a 2 colonne, 1 su mobile. Gap orizzontale 24px; verticale 48px desktop e 36px mobile.

**Filtri:** chip con altezza minima 44px su desktop. Su mobile una select nativa conserva tutte le scelte e riduce l’altezza iniziale dei comandi. Le varianti dei progetti rimangono visibili come chip.

**Titoli:** 54–104px desktop, 45–70px mobile; line-height .99; tracking -.065em. Introduzioni 14–15px, line-height 1.7–1.75.

## 3. Dettaglio

**Quando:** servizio, percorso completo, progetto, demo o contatto.

- Un ritorno esplicito è sempre sopra il contenuto, nella stessa posizione.
- Per un servizio: immagine e testo affiancati; su mobile, immagine seguita dal testo.
- La descrizione risponde subito a “cos’è?”. Seguono cosa facciamo, quando serve, da cosa partiamo e cosa ricevi.
- Le quattro informazioni sono leggibili nella pagina: non richiedono quattro slide o popup successivi.
- Per un progetto: titolo e metadati, immagine principale, varianti quando presenti, galleria. Nessuna nuova selezione del progetto dopo l’apertura.
- Per una demo: ritorno, titolo, link esterno e contatto, poi anteprima ampia. Il sito esterno mantiene il suo comportamento.
- Per Start: promessa e canali a sinistra, form a destra; impilamento su mobile. La preparazione del messaggio è distinta dall’invio email.

**Proporzioni:** servizio su colonne 1.2fr / 1fr, gap 32–80px. Titolo 40–72px, testo 16–20px. Informazioni a due colonne, una su mobile. Progetti con titolo 48–112px e media larga. Galleria a due colonne desktop, una mobile.

## Spaziatura

| Livello | Valore | Uso |
| --- | --- | --- |
| Micro | 8px | Separazione tra elementi correlati |
| Piccolo | 16px | Distanze tra etichetta, titolo e testo |
| Base | 24px | Griglia, padding mobile, distanza tra controlli |
| Medio | 32px | Padding dei pannelli e separazioni locali |
| Ampio | 48px | Gap verticale delle card |
| Sezione | 64px | Separazione tra gruppi di contenuti |
| Cambio di capitolo | 96px | Distanza prima della CTA finale |

- Gutter desktop: `clamp(24px, 4.2vw, 80px)`; contenuto massimo 1560px.
- Mobile: 24px; sotto 370px, 18px.
- Header: 96px desktop, 76px mobile.
- Inizio raccolta: 72px sotto l’header desktop; 40px mobile.
- Inizio dettaglio: 28px desktop; 16px mobile.
- Gli spazi liberi servono a separare decisioni. Evitare spacer casuali dentro le singole card.

## Colori, caratteri e immagini

| Token | Valore | Uso |
| --- | --- | --- |
| Fondo | `#0B0C0D` | Superficie principale |
| Pannello | `#121314` | Form e aree di supporto |
| Testo | `#EEEAE3` | Titoli, azioni e testo principale |
| Secondario | `#A3A29E` | Descrizioni e metadati |
| Accento | `#FF9A71` | CTA primarie e stato attivo |
| Accento intenso | `#FF7950` | Riserva per future applicazioni del brand |
| Linea | Bianco al 14% | Separazione, bordi e griglie |

Inter Variable è l’unico carattere dell’interfaccia principale. Peso 300 per il nome del mondo; 400 per titoli e testo; 500 per azioni e micro-etichette. Niente maiuscolo esteso nei paragrafi.

Le immagini, i loghi e i diorami provengono dal materiale fornito. Le icone usano gli asset Phosphor già inclusi. Gli angoli tagliati alto-sinistra / basso-destra riprendono le board originali: taglio 20px desktop, 14px mobile. Nessun nuovo stile illustrativo è stato introdotto.

## Movimento e pacing

- Entrata della pagina: 400ms, spostamento di 10px e dissolvenza.
- Comparsa WebGL sopra il poster: 350ms.
- Hover immagine: 500–650ms; lieve scala 1.025–1.035.
- Feedback dei controlli: 200ms.
- Nessuna attesa obbligatoria prima di accettare un click.
- Nessun cambio di sezione causato dallo scroll. Nessuna espansione automatica durante la lettura.
- Scroll verticale naturale nelle pagine. Le sole navigazioni orizzontali sono scelte esplicite, come varianti e galleria.
- Con `prefers-reduced-motion`, le transizioni sono disattivate e il diorama usa il poster.

## Componenti e manutenzione

`src/ui.js` contiene card, pulsanti, filtri, intestazioni, ritorni e chiusure. Le tre famiglie vivono in file distinti; i JSON conservano il contenuto indipendentemente dal markup.

Il rendering 3D viene caricato solo nelle scene mondo, usa gli asset mobile originali e disegna quando necessario. Nessuna animazione canvas di atmosfera continua in background. Uscendo dalla scena, geometrie, materiali, texture e renderer vengono rilasciati.

La navigazione gestisce focus sul titolo e posizione di lettura. I controlli hanno etichette, focus visibile e target di almeno 44px. Il dialog nativo della galleria gestisce focus, Escape e ripristino al controllo precedente. Queste verifiche non costituiscono una certificazione di accessibilità completa.

## Come valutare la bozza

1. **Comprensione:** dalla home, è chiaro cosa fa Memento e da dove iniziare?
2. **Scelta:** entrando nei servizi, riesci a scegliere un ambito senza conoscere i nomi tecnici?
3. **Dettaglio:** trovi ciò che ricevi e l’azione successiva senza aprire altri popup?
4. **Ritorno:** chiudendo la galleria o tornando al portfolio, ritrovi la tua selezione?
5. **Contatto:** il servizio o l’esperienza che ti interessa arriva nel messaggio?

Le prossime modifiche devono mantenere queste cinque proprietà e partire dai token condivisi.
