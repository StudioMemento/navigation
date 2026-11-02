# Memento — Prompt Codex per allineare gli asset 3D al concept

Usare insieme a `MEMENTO_CODEX_STATO_E_DIREZIONE_V1.md`, alla scena Blender più recente e all'atlante di reference. L'hub V2, la navbar e il bridge sono un lavoro distinto: questa richiesta riguarda la direzione visiva e gli asset.

---

Prosegui dal progetto Memento esistente. Prima di modificare, identifica la revisione locale più recente e conserva le modifiche non presenti negli ZIP. Usa come base il Blender effettivo, non ricostruire la scena a partire da screenshot o GLB ottimizzati. Se la base più recente è ancora `CONSEGNA_MEMENTO/source/MEMENTO_CARBONE_AMBRA.blend`, salva una copia `MEMENTO_CARBONE_AMBRA_EVOLUZIONE_V2.blend` e lavora su quella.

Leggi prima `MEMENTO_CODEX_STATO_E_DIREZIONE_V1.md`: riconcilia la consegna Blender e `MEMENTO_ASSET_6_VISTE_V1.zip`. Le sei viste generate sono reference concettuali e possono essere incoerenti; risolvi le forme su una sola geometria reale. Non trasformare automaticamente tutti i 25 asset di riferimento in nuove mesh.

Obiettivo: portare l'ambiente esistente verso il concept carbone/grafite, monoliti e torri alieni, icone sospese, tagli netti e pochi highlight ambra. Mantieni il tramonto concordato. Evita superfici troppo argentate e nebbia grigia uniforme che copre l'icona attiva.

## Priorità per contenere lavoro e consumo

1. Inventario breve: sorgente, scene, gerarchie, materiali, camere, risorse e problemi effettivi. Conserva `WORLD_ROOT`, `STG_01_ROOT` … `STG_05_ROOT`, anchor delle icone, corone e dipendenze valide. Non rinominare in massa.
2. Un solo stage pilota: Memento. Correggi composizione, massa carbone, luce, fusto e titolo; confronta desktop, mobile e ultrawide prima di propagare.
3. Propaga soltanto le correzioni necessarie alle altre quattro stazioni, mantenendo la loro identità.
4. Rifinisci ambiente e transizioni; esporta solo gli asset modificati e i mondi finali necessari.

Non rifare da zero il sito, la navbar, il routing o le cinque pagine per completare questo lavoro. Non incorporare copie locali dei contenuti nell'hub: la V2 usa i cinque embed live.

## Geometria e composizione

- Un mondo coerente con cinque stazioni ferme. La camera si muove; non spostare gli stage per simulare prospettive incompatibili.
- Mantieni corona funzionale e parti superiori valide. Il fusto deve leggere come torre continua e scendere abbastanza da non rivelare una punta durante la discesa. Estendi la geometria inferiore senza stirare la root, l'icona o la corona.
- D10 funzionale e D12 di ingombro sono quote con ruoli diversi: nessuna scala globale automatica ×1,2.
- Icona attiva dominante e sospesa; due stazioni intermedie e due lontane leggibili tramite prospettiva reale. Ricalibra camera e framing insieme, nei tre formati.
- Memento: master derivato dall'SVG originale, tagli e vuoti preservati. Services: tre fasce intrecciate con passaggi coerenti. Projects: cartella. LevelUp: solo il segno più. Start: sparkle principale con satellite.
- Titoli MEMENTO / SERVICES / PROJECTS / LEVELUP / START come geometrie separate nel mondo, sotto la corona e davanti alla parte alta del fusto, rivolte verso il centro della scena. Non billboard e non targhe incollate sulla corazza.
- Regola del rombo nel viewport della scena: centro `(W/2,H/2)`, entrambe le diagonali `0,87 × min(W,H)`. Dichiara gli offset ottici dei tre chevron. Se il sito riserva spazio alla navbar, usa come riferimento le dimensioni effettive del canvas, senza confonderle con quelle dell'intera finestra.

## Luce, materiali e movimento

- Masse carbone/grafite, ambra selettiva nei tagli e nei punti d'interazione. Bianco leggibile per controlli e tipografia secondo il documento di direzione.
- Nebbia a strati con profondità e densità diverse; foreground mobile, silhouette leggibili, transizione nel buio. Evita una cornice uniforme e l'effetto fiocchi di neve.
- Dust fine nell'ambiente, accenti emissivi moderati. Particelle delle icone carbone in idle, movimento curl noise positivo/negativo; ambra locale dove avviene l'interazione. Distingui ciò che viene esportato da ciò che richiede shader runtime.
- Mantieni pivot e movimenti idle delle icone; Start e satellite sotto la stessa root. Controlla gli ingombri durante l'intera animazione.
- Camera morbida in orbita e discesa/risalita, senza snap. Conserva e verifica le traiettorie esistenti prima di cambiarle.

## Export e prestazioni

Il Blender è il master. I GLB dei singoli stage possono già contenere le icone: non caricare icona autonoma e stage insieme creando duplicati. Non sommare mondo completo e tutti gli stage. Le icone autonome H10 richiedono trasformazioni esplicite; non assumere la scala della scena.

Conserva coerenza di decoder Draco e texture WebP. I GLB precedenti non contenevano clip `animations`: se servono clip runtime, esportale esplicitamente e verifica con una reimportazione. Non dichiarare che il movimento Blender è automaticamente incluso nel GLB.

Misura peso, draw call, frame time e memoria sui dispositivi dichiarati. L'obiettivo è mobile fluido, ma non promettere 60 fps da numero di triangoli o sola build.

## Consegna verificabile

- Nuova revisione Blender e manifest con hash del sorgente.
- Cinque pose × tre formati = 15 confronti dalla stessa revisione.
- Sei viste ortografiche reali per ogni asset aggiornato previsto, generate dalla stessa mesh con assi e scala dichiarati.
- Controllo di occlusioni lungo orbite e discese, includendo frustum e look-around consentito.
- Export aggiornati, verifica dopo reimportazione, elenco sintetico delle differenze e limiti ancora aperti.

Procedi sulle modifiche reversibili comprese nel brief. Se manca un asset o una capability Blender, indica esattamente cosa manca; non sostituire un'esecuzione reale con render concettuali dichiarati come modello finito.
