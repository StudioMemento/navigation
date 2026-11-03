# LevelUp V13 — prompt delle immagini

Dodici asset creati con OpenAI imagegen e ispezionati prima dell’integrazione. L’output effettivo è 1280×1280 px per ogni immagine, anche quando il prompt indicava una risoluzione diversa. I file consegnati sono in `public/assets/v13/`: WebP da 1280 px e varianti `-640.webp` da 640 px.

## Direzione e composizione

Servizi: oggetti riconoscibili in grafite, superfici incomplete, reticoli e particelle, luce ambra controllata dall’alto a destra, sfondo nero. Confronti: oggetti di prodotto, identità e collezione con generosi margini neri; ogni versione con materiali è stata usata come riferimento per l’edit del corrispondente modello grigio. La posizione nel frame e lo zoom si regolano in CSS.

## Prompt usati

### web

```text
Use case: stylized-concept. Create one square 1536x1536 website service image for WEB DESIGN, no text. Premium cinematic black-on-black Memento Design Studio visual. A clearly recognizable slim desktop monitor displaying an elegant website wireframe and one upright smartphone beside it displaying its responsive mobile version. Physically plausible proportions, grounded on a nearly invisible black studio surface. The monitor and phone are sculpted from partially solid dark graphite and incomplete carbon particles, with delicate wireframe edges and curling charcoal dust trails; immediately readable device silhouettes, not abstract sheets. Screens have a subtle monochrome layout with header, picture area, cards, no readable letters. A restrained amber rim light from the upper right illuminates 10 percent of edges; subtle grey detail elsewhere, never bright or orange background. Deep pure black seamless background, no horizon edge. Entire object group centered within the square, occupies about 62 percent of width and 54 percent of height; generous empty black margins, minimum 18 percent on every edge, all devices fully in frame. No humans, no floating props, no typography, no logos, no border, no collage. High-end realistic 3D material detail, clean satisfying silhouette.
```

### 3d

```text
Use case: stylized-concept. Create one square standalone service image, 1:1. Premium Memento Design Studio cinematic black-on-black art direction. The subject is immediately recognizable, made of incomplete dark graphite surfaces, delicate exposed polygon topology and dense curling charcoal particles dissolving from one edge. Restrained warm amber rim lighting from upper right, at most 10 percent accent; charcoal and grey otherwise. Pure seamless black background and black ground, no visible horizon or rectangular light patch. Grounded objects with physically plausible scale, no people. Object group centered and fully visible, taking up no more than 60 percent of canvas width and 55 percent height with ample empty black margins on every edge. Rich microtexture but clean composition, satisfying sculptural detail. No readable letters, no label, no border, no watermark, no collage. Subject for 3D DESIGN: a single clearly three-dimensional subdivided sphere on a compact cubical modeling base. Half the sphere is finished dark graphite and the other half is an exposed silver-grey polygon wireframe with visible vertices. A few wireframe faces dissolve into particles. The sphere and cube together must clearly suggest computer 3D modeling and mesh topology, not a planet.
```

### video

```text
Use case: stylized-concept. Create one square standalone service image, 1:1. Premium Memento Design Studio cinematic black-on-black art direction. The subject is immediately recognizable, made of incomplete dark graphite surfaces, delicate exposed polygon topology and dense curling charcoal particles dissolving from one edge. Restrained warm amber rim lighting from upper right, at most 10 percent accent; charcoal and grey otherwise. Pure seamless black background and black ground, no visible horizon or rectangular light patch. Grounded objects with physically plausible scale, no people. Object group centered and fully visible, taking up no more than 60 percent of canvas width and 55 percent height with ample empty black margins on every edge. Rich microtexture but clean composition, satisfying sculptural detail. No readable letters, no label, no border, no watermark, no collage. Subject for VIDEO: one professional compact cinema camera in three-quarter view with a large lens, a small top monitor, visible top handle and grounded support, recognizable filmmaking equipment. Part of its back shell dissolves into graphite particles. No floating strips, no film reel, no brands.
```

### visual

```text
Use case: stylized-concept. Create one square standalone service image, 1:1. Premium Memento Design Studio cinematic black-on-black art direction. The subject is immediately recognizable, made of incomplete dark graphite surfaces, delicate exposed polygon topology and dense curling charcoal particles dissolving from one edge. Restrained warm amber rim lighting from upper right, at most 10 percent accent; charcoal and grey otherwise. Pure seamless black background and black ground, no visible horizon or rectangular light patch. Grounded objects with physically plausible scale, no people. Object group centered and fully visible, taking up no more than 60 percent of canvas width and 55 percent height with ample empty black margins on every edge. Rich microtexture but clean composition, satisfying sculptural detail. No readable letters, no label, no border, no watermark, no collage. Subject for VISUAL: an elegant studio product-photography setup, one black sculptural perfume bottle placed beside a clearly recognizable compact camera lens and a small angled rectangular light diffusion panel behind it. Three restrained objects maximum, with the panel and part of lens dissolving into fine carbon particles. Clear visual language of lighting, photography and product imagery.
```

### design

```text
Use case: stylized-concept. Create one square standalone service image, 1:1. Premium Memento Design Studio cinematic black-on-black art direction. The subject is immediately recognizable, made of incomplete dark graphite surfaces, delicate exposed polygon topology and dense curling charcoal particles dissolving from one edge. Restrained warm amber rim lighting from upper right, at most 10 percent accent; charcoal and grey otherwise. Pure seamless black background and black ground, no visible horizon or rectangular light patch. Grounded objects with physically plausible scale, no people. Object group centered and fully visible, taking up no more than 60 percent of canvas width and 55 percent height with ample empty black margins on every edge. Rich microtexture but clean composition, satisfying sculptural detail. No readable letters, no label, no border, no watermark, no collage. Subject for DESIGN: a graphite drafting pencil lying across two thick ivory-dark-grey editorial sheets with a clean visual composition of geometric shapes, print crop marks and an orderly typographic grid without legible letters. One edge of the pages breaks into polygon mesh and charcoal dust. A clear graphic-design and print-design subject, no computer.
```

### branding

```text
Use case: stylized-concept. Create one square standalone service image, 1:1. Premium Memento Design Studio cinematic black-on-black art direction. The subject is immediately recognizable, made of incomplete dark graphite surfaces, delicate exposed polygon topology and dense curling charcoal particles dissolving from one edge. Restrained warm amber rim lighting from upper right, at most 10 percent accent; charcoal and grey otherwise. Pure seamless black background and black ground, no visible horizon or rectangular light patch. Grounded objects with physically plausible scale, no people. Object group centered and fully visible, taking up no more than 60 percent of canvas width and 55 percent height with ample empty black margins on every edge. Rich microtexture but clean composition, satisfying sculptural detail. No readable letters, no label, no border, no watermark, no collage. Subject for BRANDING: a coordinated brand identity ensemble with one charcoal shopping bag, one small rigid packaging box and one business card, all showing the same refined embossed geometric monogram made of two interlocking diagonal strokes, no words. Real paper textures; a small part of the bag edge dissolves into carbon dust and wireframe. Clearly brand identity and packaging, restrained amber foil details.
```

### product-after

```text
Use case: product-mockup. Create a square 1:1 premium product render, single standalone image for an interactive before/after website comparison. A beautiful wide rectangular perfume bottle of thick clear amber glass, black cylindrical cap, minimal tiny AUREN lettering in gold, beside its closed matte charcoal rectangular box, both standing on a dark matte surface. Natural realistic physical proportions, front three-quarter camera from slightly above, both items entirely visible. Pure black seamless background everywhere and very wide empty black margins. The complete object group must occupy ONLY the central 54 percent of canvas width and 38 percent of height, centered at x50%, y52%; minimum 22 percent empty black border left and right, minimum 27 percent black above and below. Restrained studio reflections and a warm amber rim from upper right. No bright background glow, no horizon line, no particles, no border, no layout, no captions, no split-screen. Keep empty margins perfectly black for seamless compositing in a responsive frame. High-end cinematic material detail.
```

### product-before

Riferimento dell’edit: `product-after.webp` (originale generato).

```text
Use case: precise-object-edit. Edit this exact square image to produce the matching neutral clay BEFORE version for an image comparison slider. Keep the camera, canvas, every pixel position of object outlines, size, proportions, perspective, empty black margins, ground shadow and object arrangement unchanged. Change ONLY the materials of the bottle, cap and box to neutral medium light grey matte clay. Bottle becomes opaque grey, remove AUREN lettering and all branding. Remove amber color from the objects, keep the same lighting direction with neutral grey highlights. Do not move anything, do not crop, do not zoom, do not add objects. Background remains pure black. Output one square image with exactly the same object framing.
```

### brand-after

```text
Use case: product-mockup. Create one square 1:1 premium brand identity still life for an interactive before/after comparison. A coordinated set: one charcoal shopping bag with two handles at back left, a small warm ivory rigid box front center, a dark business card leaning in front, and an upright smartphone on the right displaying a minimal black and amber brand screen. Same tiny refined circular monogram on all objects, no readable copy. Physically plausible and grounded, front three-quarter camera. Group entirely visible centered, occupies ONLY central 56 percent canvas width and 48 percent height, with minimum 20 percent empty black margin on every edge. Seamless PURE BLACK ground and background with subtle short contact shadows, no visible horizon, no background light patch or rectangular glow. Warm amber studio rim light from upper right, extremely restrained luxurious materials. No particles, no UI overlay, no divider, no captions, no border. Generous black breathing room for responsive right-anchored placement.
```

### brand-before

Riferimento dell’edit: `brand-after.webp` (originale generato).

```text
Use case: precise-object-edit. Edit the exact supplied square image to create a neutral clay BEFORE version for a comparison slider. Change ONLY the surface materials to matte light-medium neutral grey clay, including all packaging, handles, upholstery, metal legs or device casing that are present. Preserve EXACTLY the original camera, silhouette, perspective, pixel positions, dimensions, crop, every object, generous empty black margins and their placement. Remove logos and writing. Device screens become featureless neutral grey. Remove amber color while keeping the same light direction and subtle shading. Do not crop or move anything; do not add or remove objects. Keep the pure black seamless background and contact shadows. Output one square matching image.
```

### collection-after

```text
Use case: product-mockup. Create one square 1:1 premium furniture product render for interactive before/after comparison. One refined low modern lounge armchair upholstered in cognac brown leather with slender black metal arms and legs, and one realistic landscape tablet propped at a low angle to the right of the chair showing a miniature matching chair and a minimal dark product catalogue screen. Natural real dimensions, table-free floor studio, camera front three-quarter from slight elevation. Entire group visible centered, occupies ONLY central 55 percent canvas width and 50 percent height; minimum 21 percent empty pure black margin all around. Seamless pure black ground and background, no wall or horizon edge, no bright light patch, soft restrained contact shadows. Rich leather grain and stitching, amber rim light from upper right, charcoal mood. No extra furniture, no captions, no frame, no split-screen, no people, no particle effects. This needs large black margins for fitting into short responsive cards.
```

### collection-before

Riferimento dell’edit: `collection-after.webp` (originale generato).

```text
Use case: precise-object-edit. Edit the exact supplied square image to create a neutral clay BEFORE version for a comparison slider. Change ONLY the surface materials to matte light-medium neutral grey clay, including all packaging, handles, upholstery, metal legs or device casing that are present. Preserve EXACTLY the original camera, silhouette, perspective, pixel positions, dimensions, crop, every object, generous empty black margins and their placement. Remove logos and writing. Device screens become featureless neutral grey. Remove amber color while keeping the same light direction and subtle shading. Do not crop or move anything; do not add or remove objects. Keep the pure black seamless background and contact shadows. Output one square matching image.
```
