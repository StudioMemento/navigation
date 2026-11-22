/** Vertical position, camera-space depth, slope and phase of each sheet. */
export const FIBER_LAYERS = Object.freeze([
  { place: [0, 0, 0, 0], gain: 1, tint: 0 },
  { place: [1.9, -4.6, -0.08, 2.4], gain: 0.5, tint: 0.75 },
  { place: [-1.05, 2.0, 0.12, 4.1], gain: 0.55, tint: 0.35 },
  { place: [-2.4, -2.4, 0.045, 6.5], gain: 0.38, tint: 0.65 },
  { place: [2.2, 3.2, -0.09, 8.1], gain: 0.34, tint: 0.2 },
  { place: [0.65, -7.3, 0.10, 10.3], gain: 0.34, tint: 0.8 },
  { place: [-1.65, 4.5, -0.035, 12.2], gain: 0.22, tint: 0.28 },
]);
export const layerCount = value => Math.max(1, Math.min(FIBER_LAYERS.length, Math.round(value) || 1));
