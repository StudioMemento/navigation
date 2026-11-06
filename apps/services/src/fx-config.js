// VFX PASS V1 — one configuration point, separate transition/cursor budgets.
export const FX = Object.freeze({
  cursor: { desktopRadius: 260, touchRadius: 130, follow: 70, attack: 120, release: 380 },
  transition: { duration: 1050, handoff: 100, buckets: 6, cell: 25, mobileCell: 22 },
  type: { cell: 11, smallCell: 6, wire: .65, glow: 4, edge: .8 },
  edge: { band: 13, cell: 13, wire: .6, faceRate: .045 },
  particles: { desktop: 120, mobile: 48 },
  dpr: { desktop: 1.5, mobile: 1.25 },
  cacheLimit: 28,
  accent: '#ff7950',
});
