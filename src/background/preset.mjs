/** Ghost Fibers studio preset. The seven sheets are placed in world space. */
export const START_BACKGROUND = Object.freeze({
  glowColor: '#ef4444', lineColor: '#f97316', secondaryColor: '#f97316',
  gradient: 'depth', layers: 7, waves: 1, twist: 1, volume: 0,
  spread: 2.5, scale: 0.75, rotation: 25, perspective: 0,
  fiberStyle: 'dots', threads: 160, density: 1, thickness: 0.75,
  tips: 0, foldGlow: 3, speed: 0.1, flow: 0, rollSpeed: 0.5,
  depthOfField: 2, focusDepth: 0, particles: 0, sparkle: 0.5,
  glow: 0.5, brightness: 1, vignette: 0, grain: 0,
  hoverEffect: 'focus', mouseStrength: 1, mouseInteraction: true,
  pulseOnClick: true, intro: false, lightMode: false,
});

/** The native site starts on the composed fibres, with the same framing as its stills. */
export const NAV_BACKGROUND = Object.freeze({ ...START_BACKGROUND, dpr: 1, soft: 1 });
