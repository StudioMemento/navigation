# Design QA — LevelUp V08

Date: 2026-11-01

## References and normalization

Source visual truth: approved sequence `exec-afa62400-0811-4573-86cd-fba4de353195.png` (809×1944), hero board `exec-9d62e5d1-56e5-4b47-8ae8-4f9a43cd6618.png` (1650×953), Vision board `exec-a8295dc5-229f-4394-9ead-1855b833832b.png` (1402×1122), CTA board `exec-98d4b9e5-ff5e-49b6-96c3-27b1199fc2b5.png` (1774×887). Original conversation artifacts were inspected from `../generated_images/`. The combined comparisons below include the reference pixels.

Geometry/color authority: `Memento_Visual_DNA(1).md`, revision 1.1. Source implementation/assets: Servizi V40; live LevelUp manifest for production aliases.

Implementation: browser-rendered local page. Standalone viewport 1363×936 CSS px. Combined full-page evidence `qa/page-browser.jpg`: 1363×4862, assembled from seven actual viewport screenshots at CSS 1363×844, scale 1, scroll offsets 0/800/1600/2400/3200/4000/4018. Only the QA host's 44px toolbar and outside canvas were cropped; no UI content was repainted. Native full-page captures sometimes omitted transformed image layers; visible-viewport captures were used to avoid that capture artifact.

`qa/full-comparison.jpg` places the approved sequence and implementation in the same comparison canvas, each normalized to 809px width. The source is an editorial board, not a measured browser capture: its compact vertical spacing and heavy type are not pixel-match targets when they conflict with the explicit Services DNA. No pixel-identical claim is made.

Focused comparison: `qa/vision-comparison.jpg`, source and implemented Vision region normalized to 800px width each. Further readable browser evidence: `qa/levelup-hero-final.jpg`, `qa/portfolio-final.jpg`, `qa/levelup-productvis-expanded.jpg`, `qa/levelup-mobile-contact.jpg`, `qa/levelup-tablet-vision.jpg`, `qa/levelup-alpha-390.jpg`.

State: initial benefit, ProductVis selected, comparison 50/50, idle CTA. Expanded demo evidence uses the external app's actual WebGL-unavailable fallback. Mobile/tablet evidence includes changed selections and a 100% comparison endpoint.

## Findings and iteration history

1. **P1 — Embedded canvas appeared opaque despite transparent CSS.** Observed on the checkerboard parent at 390×844. Global `color-scheme:dark` made the iframe canvas opaque. Limited the dark scheme to standalone and set the embedded scheme to normal. Recaptured checkerboard: root, spacing and carousel edges expose the parent; cards remain black. Evidence: `qa/levelup-alpha-390.jpg`. Resolved.
2. **P2 — Mobile step text lost spaces at hidden editorial line breaks.** Added explicit whitespace after the breaks. Rechecked rendered mobile steps: “Chi sei e cosa hai in mente”, “Capiamo insieme cosa ti serve”, “Hai una proposta”. No clipping or joined words. Resolved.
3. **P2 — Projected neighbouring carousel images could remain unloaded.** Native lazy loading was inconsistent for transformed overflow-masked cards. Warm the visible arc, respecting data-saver mode. Browser verified Fashion, Auren, ProductVis, IceCream and Elite as loaded at the initial portfolio state. `qa/portfolio-final.jpg`. Resolved.
4. **P2 — Side-card captions were partially obscured by the active coverflow card.** Apply the Services slide-focus fade to captions. Final browser state reports opacity 1 for the selected caption and 0 for the four neighbours. Adjacent images remain visible; dots keep accessible project labels. `qa/portfolio-final.jpg` and revised `qa/full-comparison.jpg`. Resolved.
5. **P2 — ProductVis preview was from an older project version.** Replaced it with the current production app's `studio-fallback.webp`, converted once into local WebP sizes. It now shows the same vehicle as the live embed. Resolved.
6. **P3 — Comparison handle at endpoints was half clipped.** Kept the divider at the true split and constrained the handle to the card interior. Resolved in CSS; native range remains 0–100.

The revised full-view and focused comparisons were reopened after the fixes. No actionable P0/P1/P2 finding remains.

## Five fidelity surfaces

| Surface | Result |
| --- | --- |
| Fonts / typography | Local Inter Variable from Services; weights 350/380/420 follow roles, essential thin section type. Heading fits its wrapper with no measured overflow at seven sizes. Editorial line breaks retained with glyph protection. Heavier type in image-generated boards is intentionally superseded by the master. |
| Spacing / layout | Master 80% / max 1280px verified; desktop hero 2:1, mobile 60vw with .74 ratio, tablet portrait 1.25 ratio. Internal padding and TL/BR cuts preserved. The approved sequence is expanded to the Services rhythm. |
| Colors / tokens | Warm white, graphite and amber; opaque black boards, transparent embedded root, own CTA surface. PCHIP color/alpha ramps preserve anchors. No visible gradient bands in inspected captures; display-level dithering cannot be certified on every device. |
| Images / assets | Real Services book/identity/website and CTA sculpture reused. New Vision photography follows product, restaurant/menu/phone and chair/tablet compositions. Copy is HTML, not baked into images. No CSS/SVG approximations of photographic assets. Real live demo UI supersedes illustrative mock controls. |
| Copy / content | All five approved section titles and the simple three steps are present. Opening cards contain no sales buttons. Vision cards are explicitly concepts; no invented client metrics or testimonials. Final whole-card action names the contact destination. |

## Browser verification

- Measured viewport CSS sizes: 360×800, 390×844, 820×1180, 844×390, 1440×1000, 1600×1000, 1920×1080. Exact values: `qa/levelup-viewport-checks.json`.
- Body/root scroll width equals viewport width at all seven sizes. Hero widths: 216, 234, 656, 675.1875, 1152, 1280, 1280px respectively.
- Drag moved hero index 0→1. Keyboard End selected index 4. Dots select benefits and projects; no autoplay.
- Fashion, IceCream and ProductVis selected; panel title/source and contextual CTA URL update. One iframe remains mounted at a time. Actual external UI rendered.
- Expanded ProductVis dialog opens; Escape closes it, returns panel to its slot, restores scroll and focus to Espandi. Cloud browser did not expose native fullscreen; fallback branch was exercised.
- Before/after range supports keyboard End (value 100 and CSS split 100%). Pointer/range semantics are native.
- Mobile long project heading and actions fit the panel. Mobile steps and CTA remain readable. Tablet Vision cards have no title overflow.
- CTA was clicked: it navigated to `https://mementostudio.it/start?from=levelup&experience=icecream&idea=...`; the actual Start iframe displayed contact email, WhatsApp and FAQ. No contact message was sent. Start does not currently consume the parameters.
- Embedded root alpha visually verified; Tide INIT→READY observed in the QA host. Full animated hub journey was not tested or modified.
- Console reviewed: no LevelUp-origin error/warning observed. Repeated metadata errors were from the browser extension URL, not app code.
- Six Node tests passed, including missing-asset negative control, category/URL contracts, parameter encoding, PCHIP bounds/error and unchanged Tide bridge hash. Production local resource resolution passed. Ten demos plus Start returned HTML 200; framing headers recorded in `qa/link-check.json`.

## Accepted extensions / remaining device checks

The opening book and CTA sculpture use the actual Services assets instead of the approximate art in the generated mockups. Project cards display their actual public demos. Inactive captions fade with the original Services focus model. These are intentional decisions to honor the user's request for the Services master and updated experiences.

Reduced-motion and forced-colors paths are implemented; not certified with assistive technology. Mobile sizes were browser viewport tests, not physical phones. Safari/iOS, Instagram in-app browser, GPU-backed 3D interaction, 200% text zoom and a complete live Tide journey remain device/integration checks. In this cloud browser ProductVis reports “WebGL non disponibile”; the static fallback and controls are visible. External demo availability and embedding policies can change after the recorded check.

## Implementation checklist

- [x] Five-section journey, no opening CTA
- [x] Master typography, geometry, alpha and clipped frames
- [x] Real production demos, one loaded embed, expansion and fallback
- [x] Before/after, keyboard, drag and context link
- [x] Revised visual comparisons and responsive measurements
- [x] Build, six tests, local assets and public URL checks

final result: passed
