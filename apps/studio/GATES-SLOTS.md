# Gates: Studio cinematic slots

OWNS: dist/**, scripts/**, docs/**, README.md, GATES-SLOTS.md

Scope: Replace the Studio controls with three random slots; port all 22 Atlas shaders plus new styles, 34 lighting setups, cinematic object views, animated displays, pure black background and no visible copy. Preserve the V4 model, original isometric start, unrelated Sites and external link destinations. Publish the same Studio and deliver a validated Vercel ZIP.

- [x] G1: All Atlas styles and new variants are reachable; random bags avoid adjacent repeats and cover every item; all 34 lighting rigs have distinct parameters.
  CHECK: node scripts/verify-slots.mjs catalog
  EXPECT: SLOT_CATALOG_OK
  EVIDENCE: automatic-evidence=v1; definition-sha256=693a0c7cc3ac23150fde9e1eab5a5e92622f573fb452cfb4a0ffc62b634fcc39; exit=0; EXPECT=matched; output-sha256=11453e9bdd48c8ced65a86a59b749cd5b314e545a65927d776a56de598c0e192; output-bytes=119; shell=/bin/sh; cwd=/workspace/scratch/638ccd230941/studio-slots; path=0defe1af09d6/13 entries

- [x] G2: Icon-only controls have no panels; floating emitter disks and environment are removed; screens animate with shader palettes; model and link scope remain intact.
  CHECK: node scripts/verify-slots.mjs integration
  EXPECT: SLOT_INTEGRATION_OK
  EVIDENCE: automatic-evidence=v1; definition-sha256=c20da63e55d7a1108b0a4353b78a4ccf92a059243f023f065e1553c6a29967b1; exit=0; EXPECT=matched; output-sha256=0dcb25911867913109d0dba5a0aa4d4204667e38f7356d1435bf1b1bf381fb39; output-bytes=150; shell=/bin/sh; cwd=/workspace/scratch/638ccd230941/studio-slots; path=0defe1af09d6/13 entries

- [x] G3: Cinematic camera paths stay navigable and transitions can be interrupted; exterior projection fits supported sizes.
  CHECK: node scripts/verify-slots.mjs navigation
  EXPECT: SLOT_NAVIGATION_OK
  EVIDENCE: automatic-evidence=v1; definition-sha256=8cd75ebe73a67195ce06befde2185f2c98091b5e54860990d2fc45df5d071dd6; exit=0; EXPECT=matched; output-sha256=04070c1d60def64cb1f8a461c39e0a38eb095d1d2197deb8a14ee56cec55ac50; output-bytes=1106; shell=/bin/sh; cwd=/workspace/scratch/638ccd230941/studio-slots; path=0defe1af09d6/13 entries

- [ ] G4: Browser review confirms all shader modes compile and the controls, 34 lights, cinematic framing, displays and black background work on desktop and mobile.
  EVIDENCE: Browser revision 0b1d292b: 28/28 shader slots, 34/34 lighting slots and 20/20 camera slots reached, screenshots acquired, no WebGL errors. Final responsive DOM at 390x844: no horizontal overflow; three 60x60 targets; no visible copy. Browser tab disappeared during loading, then the connected browser stopped responding. Final mobile render and post-optimization visual regression remain unverified.

- [x] G5: Same Studio publication succeeds and matching Vercel ZIP is CRC checked, persisted and linked.
  EVIDENCE: Published cc86cc141f5e0e274912ee5679cbaf39dd4f3a71 to the same owner-private Studio. Vercel ZIP: 25,019,212 bytes, 52 files, CRC passed, every dist file byte-matches published source. SHA256 e02d95a4d14d7ce4ef48c2457be36c5c8949c3694e131ad1e1ca2d0d51be2d8a. Saved successfully as Library file libfile_83733561c0f48191bc2a7064f798f340 version 4; returned byte count matches.
