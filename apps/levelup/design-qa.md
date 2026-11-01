# LevelUp V09 — design QA

final result: passed

## Source of truth

The user's six screenshots in `/workspace/scratch/d5ef3d47abf8/upload/`, the accompanying five requested corrections, and MEMENTO_MASTER_VISUAL_DNA_V40.md. The screenshots show V08, whose copy, hierarchy, imagery and proportions are explicitly being revised. This is a controlled redesign, not a claim of pixel equality to the old screenshots. V40 supersedes V08's 80%/1280 px wrapper.

## Evidence and normalization

Implementation: browser-rendered local LevelUp V09, dark standalone state. Raw captures are in `/workspace/scratch/d5ef3d47abf8/levelup-v09/qa/` during this working session. Internal screenshots and the QA harness are not part of the deployment ZIP.

- Desktop opening: `desktop-opening-final.jpg`, 1363 × 936 CSS/pixels, density 1.
- Experiences: `desktop-experiences-v1.jpg`, 1363 × 844 iframe, plus 44 px harness toolbar; `mobile-experiences-v1.jpg`, 390 × 844 iframe.
- Vision: `desktop-vision-final.jpg`, 1363 × 844 iframe; `tablet-vision-final.jpg`, 1024 × 768 iframe; `mobile-vision-final.jpg`, 390 × 844 iframe, third comparison focused.
- Steps: `desktop-steps-v1.jpg`, 1363 × 844 iframe.
- Source dimensions: opening 1715 × 1278, experiences 1710 × 1353, Vision 1717 × 1217, steps 1373 × 728, Start imagery 1294 × 612.
- Combined inputs actually opened and inspected: `compare-opening.jpg`, `compare-experiences.jpg`, `compare-vision.jpg`, `compare-steps.jpg`. Toolbar removed from implementation captures; both columns normalized to 800 px width without distortion. Different source and implementation viewport widths/heights are explicitly retained as a limitation: geometry is assessed against V40 and measured DOM bounds, rather than a misleading pixel-diff score.
- Focused comparisons: `compare-vision-focus.jpg` normalizes both product cards to 380 px width; `compare-start-art.jpg` compares the supplied Start artwork against the new carbon sculptures. Pair contact sheets verify corresponding neutral/rendered subjects.
- Final geometry matrix: `geometry-final.json`, 320×740, 390×844, 768×1024, 820×1180, 900×1000, 1024×768, 1363×844, 1600×1000, 1920×1080 and 844×390. All headings fit and no horizontal page overflow. At 844×390 the 680 px minimum deliberately allows ordinary vertical scrolling.

## Comparison history and resolved findings

1. **P1: mobile Vision cards collapsed into three narrow tracks.** Observed in `mobile-vision-v1.jpg` at 390×844. Replaced the narrow grid with a native horizontal flex strip; cards have 86% basis and a 460 px cap. Post-fix: `mobile-vision-final.jpg`; measured mobile width 275 px and total strip width 858 px. All three comparisons are keyboard-reachable; focusing the third scrolls it into view.
2. **P2: images and titles touched at narrow card widths.** Observed in the mobile second pass and at 1024×768. Increased card height and retained natural image aspect at phone/intermediate widths; shortened collection copy. Post-fix: `mobile-vision-final.jpg` and `tablet-vision-final.jpg`, with clear separation of subjects and copy.
3. **Expected deviations:** padding-to-padding headings, top-left opening titles, cinematic 3:1 portfolio, removed embed recap, neutral comparisons and redesigned steps are all requested changes. The comparison references therefore intentionally differ in composition and copy.

## Required fidelity surfaces

- **Typography:** local Inter; master weights, negative tracking and ivory/amber gradients. Four display headings fitted to their own wrapper using font metrics. Long phone headings use two lines. No clipped display text in the final ten-size matrix.
- **Spacing and layout:** shared V40 safe gutters; opening ratio continuously 1:1 to 2:1; opposing cut corners and continuous one-pixel rings. Experiences occupy one normal viewport with no forced scrolling. Measured live embed: about 509 px high at 390×844, 430 px at 1363×844.
- **Colors and tokens:** black cards, #0b0c0d standalone background, original title/frame gradients, amber active dot and monochrome neighbouring slides. Actual embedded HTML/body/section computed backgrounds all verified as rgba(0,0,0,0).
- **Images:** source portfolio/benefit assets retained; three generated material/clay pairs visually registered at 1122×1402; three new carbon sculptures in Start's restrained particulate style. WebP assets checked in browser. No fake SVG illustrations or screenshot substitutes for interactive content.
- **Copy:** five “Avere” benefits; exact new section headings and three step titles; requested deletions applied. Opening copy remains two brief lines. Vision titles are the requested product/brand/collection formulations.

## Interaction checks

- Carousel dots and horizontal navigation select the corresponding content; no autoplay. Visible neighbours load correctly after projection/resize.
- Selecting Auren updates the active portfolio card, the single iframe URL and contact query; only one slide's action group is interactive.
- “Espandi Auren” opens the fallback native dialog; X and Escape both close it, return the panel to `demo-slot`, preserve one iframe and restore focus to “Espandi Auren”. Background/body remains separate from modal treatment.
- All three comparisons respond independently. Keyboard test produced 0 / 100 / 51. A real pointer drag changed product 50→17 while the other values stayed unchanged.
- Mobile keyboard focus brings the third comparison into the horizontal viewport.
- Contact remains reachable without exploring; it links to the existing Start page. It prepares URL context but does not claim Start prefill support.
- Bridge byte hash unchanged. Frame allow/sandbox attributes, loading state and retry/open fallback present.
- Console inspected: no error/warning originating from the local landing URL. Cloud browser extension metadata errors and external WebGL fallback are outside the landing.

## Build and link verification

`npm run build` and `npm test` pass: four contract tests plus 46 local resource references. All ten public demo aliases and Start returned HTML 200; no framing-block header detected for the demos. Fresh ZIP extraction is rebuilt and compared by SHA-256 before delivery.

## Residual limits

Cloud browser has no WebGL, so ProductVis displays its honest static fallback. Hardware rendering, Safari iOS and Instagram's real in-app browser were not tested. Native fullscreen could not be exercised here; the dialog fallback was tested. External demos may reload when reparented for fallback expansion. The generated comparison pairs are visually aligned artistic renders, not a mathematically identical CAD scene.

No actionable P0/P1/P2 finding remains in the delivered landing.
