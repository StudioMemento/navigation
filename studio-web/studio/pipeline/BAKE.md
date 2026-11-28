# Ricostruire il modello StudioWeb

La fonte è `STUDIO_WEB.fbx`. Le dimensioni in Blender sono espresse in metri. `surface_materials.py` assegna i materiali alle mesh e alle singole parti, comprese le superfici attive dei cinque display. I campioni fotografici e le tre grafiche degli schermi si trovano in `screens/`. `studio_lighting.py` ricostruisce le sorgenti partendo dalle posizioni e dalle dimensioni delle mesh degli apparecchi. Potenze e temperature sono stime artistiche basate sulle foto dello studio.

La variante isometrica impiega il taglio architettonico già previsto dal modello. Le sorgenti dei due gruppi di lampade a soffitto contribuiscono al bake anche quando la zona di chiusura scompare. Tre grandi superfici luminose esterne schiariscono il lato inferiore della soletta e il retro della maquette. La loro luce diretta è limitata al guscio.

Dalla radice del progetto, con Blender 4.3 con Pillow e SciPy nel Python di Blender e con le dipendenze Node del sito installate, eseguire questi comandi. Impostare `studioweb_screens` sulla cartella che contiene `tv.webp`, `ultrawide.webp`, `vertical.webp` e `swatches/`.

```sh
studioweb_root="$PWD"
studioweb_screens="$studioweb_root/studio/pipeline/screens"
studioweb_build="$(mktemp -d)"
blender -b -t 7 --python-exit-code 1 --python "$studioweb_root/studio/pipeline/bake_studio.py" -- \
  --fbx "$studioweb_root/studio/source/STUDIO_WEB.fbx" \
  --roles "$studioweb_root/studio/source/surface-roles.json" \
  --screens "$studioweb_screens" --cache "$studioweb_build/cache" \
  --out "$studioweb_build/output" --resolution 2048 --samples 80
node studio/pipeline/compress-studio.mjs "$studioweb_build/output/studio-unpacked.glb" \
  "$studioweb_build/output/studio.glb" "$studioweb_build/output/bake-report.json"
```

Il bake di Cycles integra luce diretta, rimbalzi, ombre, riflessi e superfici emissive. Le isole UV hanno margini misurati sui tre atlanti a 2048 px. Il filtro del rumore usa albedo, normali e identificatori delle isole, poi il colore viene esteso nei margini per la generazione delle mipmap. Gli atlanti vengono convertiti da luce lineare a sRGB con AgX e salvati in WebP. Il pacchetto GLB riusa i byte originali delle tre immagini WebP dei display.

Nel viewer usare `GLTFLoader` con `MeshoptDecoder`, uscita sRGB e `NoToneMapping`. Il GLB contiene materiali `KHR_materials_unlit`. Tutta l’illuminazione visibile è già contenuta negli atlanti e rimane stabile durante l’orbita. Per rifare la color correction a sorgenti invariate, `--reuse-radiance` recupera gli EXR di quella ricetta dalla cache.

Dopo la verifica, copiare il GLB finale e il poster in `studio/model/studio-web.glb` e `studio/model/studio.webp`, e il rapporto aggiornato in `studio/quality/bake-report.json`. Se cambia la geometria, rigenerare anche i punti di reveal e d’ingombro con `blender -b --python scripts/sample-reveal.py`.
