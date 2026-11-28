# Superfici di StudioWeb

`prepare_surfaces.py <cartella-foto> <cartella-asset>` prepara le immagini `screens/` dai tre file nominati e salva in `screens/swatches/` i campioni fotografici usati da Cycles. Il codice tratta le foto dello studio in sola lettura. Le mappe di dettaglio rimuovono l'illuminazione larga della fotografia e vengono proiettate in metri, così le ombre della foto non si sommano a quelle della scena. Le stampe del bar conservano i tre soggetti originali.

Dopo l'import dell'FBX, `apply_materials(list(bpy.context.scene.objects), screen_dir, roles_path)` assegna i materiali fisici. Richiede Blender 4.3 e il file `surface-roles.json` relativo a `STUDIO_WEB.fbx`. Gli schermi usano `UV_Display` e le facce originali verificate, distinte dalla cornice. Gli altri materiali non dipendono dalle UV della lightmap. Il dict di ritorno contiene assegnazioni per mesh e conteggio dei pannelli.

Per le finiture fotografiche sono usate la pittura di `DSC06700`, il tessuto e il tappeto di `DSC06712`, il gres e il marmo di `DSC06694`. I tessuti, i metalli, le piante e i diffusori hanno ciascuno riflettanza, rugosità ed emissione proprie. I valori sono una ricostruzione visiva dalle fotografie. Lo spessore delle fughe e le finiture delle zone nascoste sono stimati.

Il set sorgente è interamente WebP. I cinque campioni fisici e le tre stampe sono lossless. Le immagini dei monitor vengono ricavate in un solo passaggio dagli originali PNG e codificate in WebP qualità 95.
