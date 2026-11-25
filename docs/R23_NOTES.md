# R23: palette Incandescenza, transizione solo nel contenuto, cambio pagina fluido, mobile caldo a riposo

## Richiesta

1. Nuova palette dalle icone della navbar, solo i colori caldi (niente argento).
2. La transizione non deve essere a tutta pagina: deve avvenire solo nella colonna del contenuto, tra i margini, e alterare solo il contenuto.
3. Lo sfondo deve essere continuo e senza stacchi.
4. Navbar e logotipo sempre visibili.
5. Da mobile la resa è "desaturata": manca l'effetto ambra/arancione che ci si aspettava.
6. La navigazione è laggosa. L'esperienza deve essere fluida: se gli effetti pesano, si trovano compromessi.

## Cosa cambia

### 1. Palette Incandescenza

Presa dal bagliore delle icone della navbar (campionato sulle immagini delle icone). Il metallo delle icone non entra nella palette.

| Ruolo | Colore |
| --- | --- |
| base (`--memento-accent`) | `#FF7D00` |
| light (`--memento-accent-light`): etichette, testi in hover, focus, highlight | `#FFA23D` |
| core (`--memento-accent-core`): nucleo dei bagliori, scintille | `#FFC890` |
| ember (`--memento-accent-ember`): brace accesa | `#C2500A` |
| deep (`--memento-accent-deep`): coda scura dei bagliori | `#7A340A` |

- **Energia del motore** (`VFX.color.amber`): deep → base → light → core.
- **Gradiente dei titoli:** bianco caldo `#ffefdc` → `#ffd9ad` → `#ffb35e` → `#ff840c` → `#e8661a`. Ogni tappa ha la stessa luminosità di prima, così i titoli a riposo restano uguali.
- **Range dei titoli:** `#ffe3c2`, `#ffc890`, `#ffb35e`.
- **Titoli a riposo (desktop):** 30% del gradiente, `#a27b64 → #f6f1eb`.
- **Dove:** pagine, navbar, icone, sfondo di lettere, transizione, shader, token del DNA (`docs/dna/tokens.json`).

### 2. La transizione tocca solo il contenuto

- Il livello della transizione è la colonna tra i margini (`padding.mjs`: 10/15/20/30%). Margini, sfondo di lettere, logotipo e navbar non vengono toccati.
- Della pagina che esce resta solo la colonna (`clip-path` sull'istantanea della transizione). Quello che sta fuori, come gli slider da bordo a bordo, si dissolve con i pezzi della pagina.
- La pagina che entra si mostra da sola appena le celle si aprono (la view transition finisce lì). Le parti fuori dalla colonna compaiono insieme alle celle vicine (`assemble`).

### 3. Sfondo continuo

Durante il cambio pagina lo sfondo sale sopra il materiale della transizione. La pagina nuova lo disegna dal primo fotogramma (R22). La transizione non copre mai i margini, quindi lo sfondo non viene mai nascosto.

### 4. Navbar e logotipo

Restano sopra tutto (z-index 1000; nella view transition sono il gruppo più alto). La transizione non li sfiora.

### 5. Mobile caldo a riposo

Un dispositivo senza hover non vede mai il colore dell'hover, quindi lo tiene a riposo. L'energia resta legata al tocco.

- **Foto:** a colori pieni (`--mm-rest-gray: 0` nel DOM; il motore lo faceva già).
- **Titoli:** con il gradiente caldo intero (`site.css`, `raster.ts`, `title.mjs` per la Home).
- **Etichette delle card:** con la maggior parte del calore dell'hover (`uPhotoColor` nello shader delle superfici).
- **Bagliori:** sono ora arancioni (`#FF7D00`), non più oro.

### 6. Fluidità

La causa principale del lag era il cambio pagina. Disegnava un canvas fotogramma per fotogramma sul thread principale, proprio mentre la pagina nuova caricava script, foto ed effetti: scatti da 100 a 300 ms.

- **Animazioni nel compositor.** Ogni movimento è un insieme di animazioni di sola trasformazione e opacità, passate alla GPU una volta. Proseguono alla frequenza dello schermo anche se il thread principale è occupato.
- **Triangoli senza maschere.** Ogni triangolo è un box disegnato dai suoi bordi e posizionato da una matrice: niente `clip-path`, niente filtri animati.
- **Nome pronto prima del click.** Il nome della pagina si compone al passaggio del mouse sul link, o al tocco sulla navbar. Il click fa solo partire il movimento (prima costava 20–40 ms su desktop e il doppio o il triplo su telefono).
- **Colori letti in anticipo.** I colori delle foto, da cui partono i frammenti, si leggono quando la pagina è inattiva. Prima la lettura costava 80 ms al click.
- **Apertura preparata durante la pausa del nome.** Le celle di apertura si costruiscono mentre il nome è fermo, non nel fotogramma in cui la pagina si apre.
- **Navigazione a nome completo.** Il browser naviga quando il nome è completo, quindi lo scambio dei documenti mostra un nome intero, mai a metà.
- **Tempi più corti:**

  | | prima | ora |
  | --- | --- | --- |
  | uscita | 1000 ms | 520 ms |
  | apertura | 1150 ms | 660 ms |
  | nome fermo | 280 ms | da 140 a 380 ms |

- **La pagina nuova arriva prima.** Script, stili e immagini delle pagine e di `/memento-ui/` e `/navigation/` escono subito dalla cache del browser e vengono ricontrollati in background (`stale-while-revalidate=120` in `vercel.json`). Prima ogni cambio pagina li ricontrollava uno per uno con il server, a catena, prima di mostrare la pagina. Le pagine HTML restano sempre fresche. Dopo un deploy, al massimo una visita entro due minuti usa ancora gli script precedenti.
- **Il nome dopo il primo fotogramma.** All'arrivo il nome si compone dopo il primo fotogramma della pagina nuova (nel frattempo la transizione mostra quello della pagina precedente): lo sfondo riparte subito.
- **Partenza esatta.** Il movimento parte dal momento del click. Prima partiva dall'ultimo fotogramma disegnato, che su una pagina ferma poteva essere vecchio di 200 ms: un terzo dell'uscita andava perso.
- **Meno risoluzione dove si muove.** Pezzi e lampo del nome a non più di 2× (il nome composto resta a piena risoluzione). Lo sfondo di lettere è a 1,5× sui touch.
- **Meno elementi.** 240 celle sugli schermi grandi e 120 sui piccoli; 64 e 36 frammenti.

## File

- `scripts/scene-material.mjs`: materiale della transizione, palette, celle e frammenti nel compositor.
- `scripts/scene-head.mjs`: colonna, nome preparato prima del click, colori letti in anticipo, apertura preparata, navigazione a nome completo.
- `src/vfx/config.mjs`, `public/memento-ui/site.css`, `docs/dna/tokens.json`: palette.
- `src/surfaces/raster.ts`, `src/vfx/title.mjs`, `src/surfaces/shaders.ts`: calore a riposo sui touch.
- `public/memento-ui/letters.mjs`: colore e risoluzione dello sfondo.
- Test: `tests/r23.test.mjs`; aggiornati i controlli delle release precedenti che fissavano i valori della R22.
