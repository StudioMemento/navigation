export interface QualityProfile {
  /** Device pixel ratio cap of the main pass. */
  dpr: number;
  bloom: boolean;
  /** Fraction of the particle pool in use. */
  particles: number;
  /** Multiplier on structural cell size (bigger cells = fewer triangles). */
  cellScale: number;
}

export interface ChainProfile {
  /** Generations a chain reaction may travel before it stops. */
  maxGen: number;
  /** Probability that a lit cell lights a neighbour in a fully conductive zone. */
  spread: number;
  /** Share of energy carried to the next cell. */
  carry: number;
  /** Per-profile timing (s); the shared values apply when omitted. */
  delay?: readonly [number, number];
  release?: readonly [number, number];
  refractory?: readonly [number, number];
  attack?: number;
  /** Multiplier on pointer ignitions. */
  rate?: number;
}

import { VFX } from '../vfx/config.mjs';
export { VFX, hexToRgb, desaturate, titleRamp, gradientRange, pixelRatio } from '../vfx/config.mjs';
export type QualityName = keyof typeof VFX.quality;
