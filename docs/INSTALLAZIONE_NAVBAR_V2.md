# Memento — Installazione navbar e bridge V2

Il kit `navigation/` è condiviso tra le cinque applicazioni. Usa moduli JavaScript standard e non richiede React o altre librerie. La navbar è isolata con Shadow DOM per limitare interferenze con gli stili della pagina.

## Installazione locale in ogni applicazione

1. Copiare la cartella `navigation/` nella directory pubblica dell'applicazione, in modo che sia raggiungibile come `/navigation/`.
2. Aggiungere una sola volta il seguente script prima di `</body>`, sostituendo il valore di `data-memento-page` secondo la tabella.
3. Distribuire prima su una preview e verificare i casi elencati sotto.

```html
<script defer src="/navigation/bootstrap.js"
  data-memento-page="services"
  data-memento-hub="https://mementonav.vercel.app"></script>
```

| Applicazione | `data-memento-page` |
|---|---|
| mementostudio.vercel.app | `memento` |
| mementoservizi.vercel.app | `services` |
| mementoportfolio.vercel.app | `projects` |
| mementolevelup.vercel.app | `levelup` |
| mementostart.vercel.app | `start` |

Il dominio nell'attributo `data-memento-hub` è il contenitore che deve governare la navigazione. Dopo la migrazione effettiva potrà diventare `https://mementostudio.it`. Non anticipare quel cambio mentre il dominio continua a usare l'involucro Framer.

In alternativa si può caricare `https://mementonav.vercel.app/navigation/bootstrap.js` mantenendo gli stessi attributi, **solo dopo la pubblicazione del nuovo hub**. La versione attualmente pubblicata non è stata aggiornata da questa consegna. Copiare il kit localmente permette di verificarlo anche prima di quel passaggio.

## Comportamento

- Pagina standalone: navbar visibile e collegamenti verso le route del contenitore.
- Pagina dentro l'hub V2: il bridge nasconde la navbar della pagina; resta quella del contenitore.
- Embed in un contenitore senza handshake: dopo un breve tentativo di connessione viene usata la modalità standalone. Finché sono presenti gli overlay Framer può quindi esserci una doppia navigazione: coordinare la loro rimozione con l'installazione.
- CTA verso le cinque applicazioni: invio della navigazione all'hub, quando connesso.
- Gallery, hash interni, link esterni, download, `mailto:` e gesti modificati da Ctrl/Cmd restano di competenza della pagina.
- Escape senza modale o campo attivo, PageUp al limite superiore e gesti intenzionali ai confini possono richiedere il ritorno al mondo.

Contesto conservato: `from`, `experience`, `idea`, `project`, `service`, `bundle`, `goal`; gli altri parametri non sono propagati. Verificare il contratto effettivo LevelUp → Start prima del rilascio.

## Integrazione con codice esistente

Non aggiungere una seconda navbar nell'applicazione se è già presente questa V2. L'installazione del componente è idempotente.

Inventariare gli adattatori precedenti prima di rimuoverli. Il bridge `memento:tide` può essere usato per compatibilità, ma eventuali vecchi handler che navigano a `_top` o intercettano click/tasti vanno riconciliati sull'applicazione reale. Il kit non modifica automaticamente i cinque repository.

Le pagine con modali devono dichiarare correttamente `dialog[open]` o `aria-modal="true"` solo quando aperte; aggiornare lo stato accessibile quando la modale si chiude. I componenti con gesti propri possono usare `data-memento-gesture-lock` sul contenitore. Non impostarlo sull'intera pagina.

Il protocollo valida origine, finestra mittente, stazione, versione e sessione. Il semplice parametro `mementoEmbed=1` non concede fiducia a un parent.

L'host gestisce gli stati `INIT`, `READY`, `VISIBILITY`, `NAVIGATE`, `RETURN`. Le pagine ricevono anche `data-memento-active`, `window.__TIDE_VISIBLE__` ed evento `memento:overlay-change`. Una demo WebGL interna deve usare il proprio meccanismo di pausa: il kit non può sospendere arbitrariamente renderer o iframe annidati.

## Verifica per ciascuna applicazione

| Prova | Risultato atteso |
|---|---|
| Standalone | Una navbar, cinque nomi accessibili, voce corretta attiva |
| Dentro hub | Una sola navbar visibile, quella dell'hub |
| Dettaglio / gallery / modale | Navigazione interna conservata; Escape chiude prima la modale |
| CTA Start | Stesso contenitore, contesto di progetto/esperienza preservato |
| Form e input | Nessuna uscita involontaria durante scrittura o interazione |
| Ritorno | Stessa stazione, pulsante host sempre disponibile |
| Scroll | Nessuna uscita automatica al solo raggiungimento del fondo |
| Back / Forward / reload | Route e contenuto coerenti, nessun embed ricorsivo |
| Mobile | Icone raggiungibili, contenuti finali non coperti dalla navbar |
| Pagina indisponibile | Ritorno e apertura dell'originale disponibili |

Queste prove sulle cinque pagine pubblicate restano da eseguire; i test automatici del pacchetto verificano il contratto in isolamento.
