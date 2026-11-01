# Audit Servizi e refactoring V38

Data: 1 novembre 2026. Riferimento: V37, pagina pubblica `https://mementoservizi.vercel.app/` e relativo pacchetto sorgente.

## Esito

La pagina ha un’identità visiva coerente. Il problema principale era la manutenzione: gli stessi elementi ricevevano regole successive da 22 fogli CSS, mentre le informazioni dei servizi erano distribuite tra catalogo, layer editoriale e master. La V38 conserva l’impianto approvato e sostituisce questa stratificazione con componenti e dati canonici.

Non è un restyling. Restano font Inter, nero/avorio/ambra, angoli smussati, titoli in gradiente, stack in prospettiva, card quadrate su mobile, sfumature, blur dei dettagli e CTA Start.

## Percorso osservato

La verifica visiva ha usato nuove catture della pagina pubblica durante questa sessione, non gli screenshot delle versioni precedenti. Sono stati attraversati apertura bundle, servizi inclusi, dettaglio Sito web, filtro Fisico e CTA finale. I controlli responsive della V38 sono stati eseguiti sul codice locale in Chromium.

| Passaggio | Stato | Osservazione e implicazione |
| --- | --- | --- |
| Bundle iniziali | Buono | Promessa, servizi inclusi e titolo creano una gerarchia leggibile. L’immagine e il nero restano coerenti con i servizi. Mantenere questo ingresso per obiettivi. |
| Bundle → servizi inclusi | Buono | Le righe con miniatura, nome e ruolo consentono di approfondire una parte dell’offerta. Un componente condiviso evita differenze tra bundle. |
| Dettaglio del servizio | Buono nei controlli eseguiti | Testo in alto e titolo in basso, quattro tavole e ritorno al bundle. Il gradiente protegge il titolo; blur e scroll lock sono indipendenti dalle animazioni del carosello. |
| Catalogo Digitale/Fisico | Buono, con possibile attrito | Griglia uniforme e selezione evidente. Su mobile i 30 servizi digitali rendono la pagina lunga, prima delle sei sezioni tematiche. Valutare ricerca o indice con dati d’uso, senza inserirli in questo refactoring. |
| Navigazione delle tavole | Da monitorare | I pallini sono discreti e hanno nomi accessibili, ma non spiegano visivamente il contenuto delle tavole prima dell’apertura. È un compromesso dell’impianto attuale. |
| Start finale | Buono | Un’unica destinazione, ampia area cliccabile, risposta a focus/hover. La luce percorre il bordo e la scultura mantiene il trattamento approvato. |

## Problemi tecnici e interventi

| Priorità | Prima | V38 |
| --- | --- | --- |
| Alta | 22 stylesheet, breakpoints e selettori correttivi sovrapposti | Un solo `styles.css`, con una definizione del sistema geometrico e sezioni per componente. Nessun vecchio stylesheet incluso. |
| Alta | Modelli paralleli dei servizi e rendering fallback non raggiunto dai 44 master | Un solo catalogo immutabile; template unico per servizi e bundle. Contenuti verificati rispetto alla V37. |
| Media | Script globali dipendenti dall’ordine di caricamento | Moduli ES con import espliciti; un bootstrap minimo prima del primo paint. Nessun globale dati `MEMENTO_*`. |
| Media | Percorsi di animazione per hero, autoplay e gesti esterni non usati dalla pagina | Motore limitato ai caroselli effettivi. Conservati smorzamento, intent detection e comportamento del trackpad. |
| Media | Asset storici ancora nel pacchetto | Rimosse 50 risorse non referenziate. Conservate tutte le varianti usate e le maschere della griglia. |
| Media | Correzione reduced-motion tramite durate quasi nulle | Transizioni e animazioni effettivamente disattivate quando richiesto. Geometria mai animata dal CSS. |
| Media | Difficile ripetere le verifiche dopo una modifica | Test di integrità e suite browser inclusi, più build con allowlist dei file di produzione. |

## Misure

Dimensioni dei file sorgente UTF-8, non compresse. Il totale JavaScript comprende l’helper opzionale del parent e, nella V38, tutti i moduli. Test, documentazione e duplicato `dist` sono esclusi.

| Misura | V37 | V38 | Riduzione |
| --- | ---: | ---: | ---: |
| Fogli CSS caricati | 22 | 1 | 21 richieste in meno |
| CSS | 175.115 byte | 33.739 byte | 80,7% |
| JavaScript | 245.929 byte | 163.992 byte | 33,3% |
| CSS + JavaScript | 421.044 byte | 197.731 byte | 53,0% |
| Asset disponibili | 571 | 521 | 50 file |
| Peso degli asset | 36.381.656 byte | 29.054.946 byte | 20,1% |

Queste sono riduzioni del codice e del pacchetto. Non sono misure di LCP o di velocità su una rete reale; non è stato prodotto un punteggio Lighthouse.

## Validazione

- Build statica completata; zero dipendenze di produzione.
- 44 servizi, 6 bundle, 6 categorie e 200 tavole preservati.
- Integrità di ID, riferimenti tra bundle e servizi, catalogo senza duplicati, dati congelati e varianti immagini: test Node superati.
- 14 viewport da 320 a 2048 px, incluse viste landscape; 34 misure sui bordi dei breakpoint.
- 13 larghezze della pagina: griglia, titoli, allineamenti, CTA e assenza di overflow orizzontale.
- Tutte le 200 tavole a 320 px e di nuovo a 820 px: 400 controlli di layout. Testo e titolo non si sovrappongono; i contenuti lunghi restano raggiungibili tramite scroll interno.
- Iframe ridimensionato con dettaglio aperto: 820 → 1024 → 768 → 390 px. Blur a 16 px, nessuna animazione di opacità del dialogo, scroll stabile e ripristinato.
- Tap, trascinamento orizzontale, apertura servizio dal bundle e ritorno, Escape, click sullo sfondo, focus restituito al trigger, navigazione da tastiera, filtri e link storici verificati.
- Form legacy: preparazione e modifica della bozza email verificate con dati fittizi; nessuna email inviata.
- Reduced motion e leggibilità di base con forced colors controllati. Nessun errore JavaScript nelle suite eseguite.

Il confronto geometrico con la V37 ha incluso copertina, griglia, titoli di categoria e CTA a 390, 820 e 1440 px: nessuno scostamento superiore a 1 px nei 12 elementi campionati a ciascuna larghezza. Sono state ispezionate le catture dei dettagli e delle sezioni a dimensioni mobile e tablet.

## Limiti e prossimi controlli

Safari su iPhone/iPad reali e l’embed nel documento Framer di produzione non erano disponibili per l’esecuzione locale: è stata usata una fixture iframe. I test Chromium non sostituiscono la prova su questi dispositivi. L’audit non certifica conformità WCAG completa e non include una sessione con screen reader o utenti finali.

La nuova struttura è pronta per modifiche mirate. Per un prossimo passaggio UX, dare precedenza alla navigazione del catalogo lungo e alla comprensione delle tavole; per la pubblicazione, controllare l’embed effettivo e Safari mobile.
