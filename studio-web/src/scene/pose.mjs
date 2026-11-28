import supportPoints from '../../studio/model/support.json' with { type: 'json' };

// Authoring camera in Web coordinates. The original model is in metres.
export const CENTER = [0, 1.28, -0.48];
const offset = [9, 8.16 - CENTER[1], 11 - CENTER[2]];
export const HOME = Object.freeze({
  yaw: Math.atan2(offset[0], offset[2]),
  elevation: Math.asin(offset[1] / Math.hypot(...offset)),
  zoom: 1,
});
export const HALF_ARC = (100 * Math.PI) / 180;
export const ZOOM = Object.freeze({ min: 0.88, max: 1.16 });
export const POSTER = Object.freeze({ width: 1280, height: 850, worldWidth: 10.05 });
const clamp = (v, min, max) => Math.max(min, Math.min(max, v));
const dot = (a, b) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];

// Both renderers use exactly the same camera, including fit through the poles.
export class OrbitPose {
  constructor() {
    this.current = { ...HOME };
    this.goal = { ...HOME };
    this.support = supportPoints.map((p) => p.map((v, i) => v - CENTER[i]));
    this.width = this.height = 1;
    this.apply();
  }
  resize(width, height) {
    this.width = Math.max(1, width);
    this.height = Math.max(1, height);
    this.apply();
  }
  rotate(yaw, elevation) {
    this.goal.yaw = clamp(this.goal.yaw + yaw, HOME.yaw - HALF_ARC, HOME.yaw + HALF_ARC);
    this.goal.elevation = clamp(
      this.goal.elevation + elevation,
      HOME.elevation - HALF_ARC,
      HOME.elevation + HALF_ARC,
    );
  }
  magnify(factor) {
    this.goal.zoom = clamp(this.goal.zoom * factor, ZOOM.min, ZOOM.max);
  }
  reset() {
    Object.assign(this.goal, HOME);
  }
  step(seconds, immediate = false) {
    const amount = immediate ? 1 : 1 - Math.exp(-14 * Math.min(seconds, 0.1));
    let changed = false;
    for (const key of Object.keys(HOME)) {
      const diff = this.goal[key] - this.current[key];
      if (diff === 0) continue;
      this.current[key] += Math.abs(diff) < 0.00012 ? diff : diff * amount;
      changed = true;
    }
    if (changed) this.apply();
    return changed;
  }
  apply() {
    const { yaw, elevation, zoom } = this.current;
    const sy = Math.sin(yaw),
      cy = Math.cos(yaw),
      se = Math.sin(elevation),
      ce = Math.cos(elevation);
    this.right = [cy, 0, -sy];
    this.up = [-sy * se, ce, -cy * se];
    this.forward = [sy * ce, se, cy * ce];
    const aspect = this.width / this.height;
    const mobileGain = aspect < 0.9 ? 1.15 : 1;
    const homeHeight = Math.max(
      POSTER.worldWidth / (aspect * mobileGain),
      (POSTER.worldWidth * POSTER.height) / POSTER.width,
    );
    let half = homeHeight / (2 * zoom);
    for (const p of this.support)
      half = Math.max(
        half,
        Math.abs(dot(p, this.up)) * 1.035,
        (Math.abs(dot(p, this.right)) * 1.035) / aspect,
      );
    this.halfHeight = half;
  }
}
