import { VFX } from './config.mjs';

/** Pointer, touch and exits reduced to a position, a presence flag and a filtered speed. No DOM writes here. */
export class PointerField {
  constructor() { this.present = false; this.touch = false; this.x = -9999; this.y = -9999; this.speed = 0; this.dirX = 0; this.dirY = 0; this.still = 0; this.lastX = -9999; this.lastY = -9999; }
  get radius() { return this.touch ? VFX.pointer.touchRadius : VFX.pointer.radius; }
  move(x, y, touch) { this.x = x; this.y = y; this.present = true; this.touch = touch; }
  leave() { this.present = false; }
  cancel() { this.present = false; this.speed = 0; }
  /** R15: the loop slept; the distance the pointer travelled meanwhile is not a flick (no speed spike on waking). */
  settle() { this.speed = 0; this.lastX = this.present ? this.x : -9999; this.lastY = this.y; }
  update(dt) {
    if (this.present) {
      const dx = this.x - this.lastX, dy = this.y - this.lastY, d = Math.hypot(dx, dy);
      const v = this.lastX < -9000 || dt <= 0 ? 0 : d / dt;
      this.speed += (v - this.speed) * (1 - Math.exp(-dt * 14));
      if (d > 0.5) { this.dirX = dx / d; this.dirY = dy / d; this.still = 0; } else this.still += dt;
    } else this.speed *= Math.exp(-dt * 10);
    this.lastX = this.present ? this.x : -9999; this.lastY = this.y;
  }
}
