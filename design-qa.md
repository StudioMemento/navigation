# Design QA — Memento V4

Date: 2026-10-21

**final result: passed**

Scope: approved unification of the existing Memento concept into three layout families. This is an intentional redesign of information architecture and spacing, not a pixel clone of the old iframe layout. The supplied imagery, dioramas, wordmark and Inter font remain the visual reference.

## Visual evidence

- Source visual truth: `https://mementonav.vercel.app/`, fresh capture `/workspace/scratch/memento-v4-reference-final.jpg`.
- Implementation: local browser-rendered preview, `/workspace/scratch/memento-v4-home-final.jpg`.
- Matched home state: Memento world, poster rendering, desktop, 1363 × 936 CSS pixels. Both exported images: 1363 × 936 pixels, 1:1 comparison; no density resampling.
- Full source and implementation images were displayed together in the same comparison input.
- Focused controls comparison: `/workspace/scratch/memento-v4-reference-controls.jpg` and `/workspace/scratch/memento-v4-final-controls.jpg`, both 1363 × 216 pixels, crop x=0/y=720. Compared together to inspect navigation, CTA, labels and text hierarchy.
- Additional rendered evidence: `memento-v4-service.jpg`, `memento-v4-portfolio.jpg`, `memento-v4-project.jpg`, `memento-v4-demo.jpg`, `memento-v4-mobile-home.jpg`, `memento-v4-mobile-collection-final.jpg`, `memento-v4-mobile-detail-320.jpg` under `/workspace/scratch/`.
- Additional scrolling-page captures were exported at 1348 × 926 pixels. These document intentionally redesigned layouts and were not used for pixel-level source-matching claims.
- Responsive testing used the real app inside same-origin development frames at 390 × 844, 320 × 844 and 760 × 844. This verifies CSS layout and interactions, not native mobile Safari/Chrome or device performance. The harness is excluded from the production build and archive.
- Screenshots are session QA evidence, not bundled media assets.

## Findings and fixes

No actionable P0/P1/P2 issues remain in the tested frontend scope.

| Iteration | Finding | Fix | Post-fix evidence |
| --- | --- | --- | --- |
| 1 | P2: supplied arrow icons were black on dark UI | Apply the shared light icon treatment; retain dark arrows on amber buttons | Final home and focused controls capture; service detail capture |
| 1 | P2: initial service view exposed all 43 entries at once | Start with six visual categories; keep complete catalog explicitly available | Browser DOM confirms six categories and 43 accessible services |
| 2 | P2: mobile filter chips occupied three rows before the content | Shared native category selector on mobile, desktop chips retained | `memento-v4-mobile-collection-final.jpg`; selector changes to Web and detail opens |
| 2 | P2: skip link hash conflicted with application routes | Focus and scroll to main without changing route | Event handling reviewed; main focus target exists |
| 2 | P2: return-label wording implied an unfiltered list | Use “Torna ai servizi” / “Torna ai progetti”; preserve selection in URL | Detail at 320px and portfolio return URL with category/search |
| 3 | P2: Studio names overlapped site sections | Use Workstation, Produzione, Tavolo bar, Salotto | Browser interaction changes to “04 / SALOTTO” |
| 3 | P2: Studio printed unsupported-WebGL errors before using software fallback | Probe supported context first, retain original software renderer | DOM reports `data-renderer=software`; zone change works; no new local-origin errors after final patch |

Other intentional changes: text navigation instead of hover-only icons; smaller world title to reserve a clear explanation/CTA area; flat dark reading surfaces; direct service and project pages; no automatic iframe expansion; natural vertical scrolling; explicit mobile category control.

## Required fidelity surfaces

- **Typography:** original Inter Variable, light display world title, regular readable headings, consistent small labels. No generic replacement fonts. Titles wrap without horizontal overflow in tested widths.
- **Spacing/layout:** common gutters, header height, card gaps and focus-grid alignment. World, collection and focus layouts are visually distinct. Detail CTA remains reachable at 320px.
- **Colors/tokens:** obsidian background, ivory type and restrained warm accent. Texture is retained only in worlds. Secondary text and icons remain visible on dark surfaces.
- **Image fidelity:** original brand and project assets retained; no placeholder illustration or generated replacement. High-resolution originals are used in the lightbox. Invalid Via Roma thumbnail reference now points to the valid source image.
- **Copy/content:** all 43 services, 6 bundles, 23 projects and 9 demos represented. Project kinds are retained. Email workflow explicitly prepares a draft; it does not claim server delivery.

## Interactions verified in the browser

- World navigation Home → Studio and return; visible explanatory CTA.
- Services overview → Web filter → Sito web → contextual contact.
- Contact required-field validation; populated local test draft; native browser Back restores entered text.
- Portfolio category Web plus search Auren; opening project retains both filter values in the return link.
- Project lightbox opens, next image changes caption, Escape closes it, return restores category/search URL.
- IceCream embed loads; selecting Caramello changes title to CHARAMELOSO. Parent return and contextual CTA remain available.
- Studio loads with the original software renderer; Salotto zone control updates the visible scene label.
- Mobile menu opens/closes; mobile category selector changes the catalog; service detail opens at 320px.
- Horizontal overflow absent in measured views: 390px world, 375px collection content width, 305px detail content width, 745px intermediate content width. The narrower values account for iframe scrollbars.
- Browser console inspected. Final local application produced no new local-origin errors after the last patch. Earlier errors from the unsupported WebGL attempt and browser extension are recorded separately; the external IceCream page still logs its own unsupported-WebGL fallback messages.

## Build and data verification

- `npm test`: 7 passing tests covering deep links, all service details, all project variants, combined filters, demo entry points, email encoding and escaping.
- `npm run check`: 438 referenced assets checked; 0 missing/empty files.
- `npm run build`: passed; static output generated in `dist/`.
- Vercel configuration included. No Vercel deployment was performed as part of this preview preparation.

## Remaining verification scope

- Hardware GLB rendering, graphics quality and real-device frame rate require a WebGL-capable device. The browser in this session exposes the poster path and Studio software fallback.
- Other external demos retain their original URLs; only IceCream was exercised end to end in this session. Their availability and embedding policies can change independently.
- No server email integration is configured. Mailto content and local validation are verified; no message was sent.
- No Lighthouse/Core Web Vitals score or accessibility certification is claimed.

## Implementation checklist

- [x] Three coherent layout families and shared tokens.
- [x] Source content and original assets included.
- [x] Primary journeys and representative responsive states verified.
- [x] P0/P1/P2 frontend findings corrected and rechecked.
- [x] Static build and Vercel configuration ready.
- [ ] User test on Vercel and a device with hardware graphics acceleration.

## Follow-up polish

P3: optional fine-tuning of the world title/diorama proportions after testing on the target phones. Avoid changing content structure or adding automatic transitions while adjusting this visual balance.
