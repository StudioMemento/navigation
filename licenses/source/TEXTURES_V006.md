# Texture v006 — provenienza e uso

Data: 27 ottobre 2026. Progetto: MEMENTO TIDE.

Le nuove mappe di grafite, disco e montagne sono opere numeriche originali realizzate localmente per MEMENTO TIDE con seed deterministico **27102026**. Sono destinate all'uso nel progetto, nei render e nei relativi export web. Non incorporano fotografie, scansioni, texture scaricate o pixel delle tavole di riferimento. Per queste nuove texture non sono presenti dipendenze da asset immagine di terze parti né condizioni di licenza di raccolte esterne.

| Famiglia | Origine e trattamento | Registro verificabile |
|---|---|---|
| Grafite | Campi numerici filtrati, micrograna direzionale, variazione di colore e rugosità; mappe PBR baked | [Provenienza metalli](../reports/materials_v006/texture_provenance_metal.json) |
| Disco | Mappe numeriche originali con lavorazione circolare e trattamento della linea d'acqua; atlante colore/ORM e dettaglio normale | [Provenienza metalli](../reports/materials_v006/texture_provenance_metal.json) |
| Montagne | Campi periodici, strati deformati e fratture cellulari irregolari; un set condiviso dalle tre fasce | [Provenienza montagne](../reports/materials_v006/texture_provenance_mountains.json) |
| Derivati mobile | Ridimensionamenti delle mappe del progetto; nessuna fonte aggiuntiva | [Manifest mobile](../reports/materials_v006/mobile/derivatives_manifest.json) |

I registri riportano nomi, dimensioni, hash SHA256 e parametri. Gli hash identificano le revisioni effettivamente usate; non costituiscono da soli una concessione di diritti. La generazione numerica utilizza strumenti software, ma le immagini non derivano da librerie di texture esterne. Non sono incorporate illuminazione, riflessi del cielo o bloom nelle mappe colore.

## HDRI conservato

Il pass v006 conserva l'HDRI **Belfast Sunset (Pure Sky)** di Poly Haven già documentato, con licenza **CC0 1.0**. Fonte, autori, condizioni e hash della copia TIDE sono nel registro [HDRI_SOURCE.md](HDRI_SOURCE.md). Questo asset mantiene la propria provenienza e non viene presentato come texture originale del progetto.

File: `web/environment/belfast_sunset_puresky_2k.hdr`. Le verifiche della fonte primaria registrate nel documento risalgono al 26 ottobre 2026. Nessun nuovo asset esterno viene introdotto dal pass delle texture v006.

Le licenze dei componenti software, del marchio MEMENTO e dei contenuti Services restano quelle già documentate in [GENERATED_ASSETS.md](GENERATED_ASSETS.md) e nei rispettivi manifest. Questo documento riguarda le nuove mappe di superficie, non modifica tali condizioni.
