# MEMENTO — OFFSET / Vercel

Pacchetto statico completo. Nessuna compilazione, installazione di dipendenze o variabile d'ambiente richiesta.

## Pubblicazione

1. Estrarre tutto lo ZIP in una cartella. `index.html` e `vercel.json` devono essere nella sua radice.
2. Caricare questa cartella in un repository e importarlo in Vercel, oppure pubblicare la cartella tramite Vercel CLI.
3. Selezionare la cartella contenente `index.html` come **Root Directory**.
4. Usare **Framework Preset: Other**, **Build Command: vuoto**, **Output Directory: `.`**. `vercel.json` include già questi valori.

Non impostare `dist` come Output Directory: il contenuto di `dist` è già alla radice di questo archivio. Per l'anteprima locale usare un server HTTP statico; aprire `index.html` con `file://` non permette il caricamento dei moduli e del GLB.

## Controlli e link

Restano solo stage 3D, titolo fuori scala con spaziatura più ampia e un grande chevron destro, alto quanto le maiuscole del titolo.

- **Scroll, drag/swipe verticale, frecce o Page Up/Down:** cambiano approdo in loop, anche da Start a Memento e da Memento a Start. Il drag muove la stessa camera durante il gesto; al rilascio completa il passaggio o torna alla sezione se il gesto è breve.
- **Movimento del mouse o drag orizzontale:** guardano attorno, entro ±8° di yaw e ±5° di pitch. Lo sguardo torna al centro durante un cambio di sezione.
- **Chevron destro, titolo o modello attivo:** aprono la pagina corrispondente. Il clic su un altro modello raggiunge prima il suo approdo. Un trascinamento sul titolo non apre il link.
- **Home / End:** raggiungono Memento / Start. Invio sul canvas apre la sezione attiva. La preferenza di sistema per il movimento ridotto elimina le transizioni automatiche.

Il ritorno tra Start e Memento percorre un arco nello stesso ambiente, senza teletrasportare la camera o duplicare le icone.

| Sezione | Link |
| --- | --- |
| MEMENTO | https://mementostudio.it/ |
| SERVICES | https://mementostudio.it/services |
| PROJECTS | https://mementostudio.it/projects |
| LEVELUP | https://mementostudio.it/levelup |
| START | https://mementostudio.it/start |

I collegamenti aprono la pagina nella stessa scheda (`target="_top"`), anche quando lo stage viene incorporato. Se l'iframe usa `sandbox`, deve consentire `allow-top-navigation-by-user-activation` perché il clic possa navigare la pagina contenitore. Non ci sono popup o moduli di raccolta dati interni.

## Asset e resa

La scena Blender revisione 7, le texture PBR, l'ambiente, la fog, il bloom, il font e Three.js sono inclusi. Conservare le cartelle `assets/` e `vendor/` accanto a `index.html`. Le licenze sono incluse nelle rispettive cartelle. La resa completa richiede WebGL; il fallback software mantiene geometrie e navigazione ma semplifica materiali ed effetti.

Verificati nel browser: loop nei due sensi, sguardo limitato, drag sullo stage e sul titolo, apertura dal chevron e ritorno da Start. Controllati layout desktop, mobile 390 px, piccolo 320 px e limiti del layout ultrawide 2560 px. I test di stato verificano anche continuità del percorso, stessa camera, geometrie fisse e rendering fermo a riposo. Il browser di verifica usa il renderer software: la resa WebGL e le prestazioni su dispositivi reali non sono state nuovamente certificate in questa revisione.

Riferimento configurazione: https://vercel.com/docs/project-configuration/vercel-json
