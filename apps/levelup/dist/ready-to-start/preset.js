// Versioned art direction and physical constants. All distances are CSS pixels.
export const PRESET = Object.freeze({
  seed: 20261102, balanced:24000, high:24000, mobile:12000, low:10000, background:8000, mobileBackground:3500,
  dpr:1.25, mobileDpr:1, fixedStep:1/120, maxSubsteps:4,
  restitution:.38, friction:.12, speedLimit:2.5,
  pointerSmooth:.045, tiltSmooth:.22, releaseDecay:1.65, heatDecay:1.8,
  returnSpring:38, freeSpring:.7, dampingRatio:.8, freeDrag:1.4,
  radius:.12, radialForce:1.2, vortex:1.8, impulse:1.18,
  idleCurl:.0032, edgeOpacity:.27, frameFlashDuration:.145,
  smallRatio:.326, smallX:.69342, smallY:-.67791,
  amber:[1,.475,.314], carbon:[.075,.09,.098], graphite:[.447,.47,.463],
});
