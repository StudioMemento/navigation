import { Euler, OrthographicCamera } from 'three';
import { OrbitPose, CENTER } from './pose.mjs';
export { HOME, HALF_ARC, ZOOM, POSTER } from './pose.mjs';

export class StudioOrbit extends OrbitPose {
  constructor() {
    super();
    this.camera = new OrthographicCamera(-1, 1, 1, -1, 0.1, 40);
    this.euler = new Euler(0, 0, 0, 'YXZ');
    this.apply();
  }
  apply() {
    super.apply();
    if (!this.camera) return;
    // Deriving orientation explicitly keeps the image continuous at the zenith.
    this.euler.set(-this.current.elevation, this.current.yaw, 0, 'YXZ');
    this.camera.quaternion.setFromEuler(this.euler);
    this.camera.position.set(
      CENTER[0] + 16 * this.forward[0],
      CENTER[1] + 16 * this.forward[1],
      CENTER[2] + 16 * this.forward[2],
    );
    const halfWidth = (this.halfHeight * this.width) / this.height;
    Object.assign(this.camera, {
      left: -halfWidth,
      right: halfWidth,
      top: this.halfHeight,
      bottom: -this.halfHeight,
    });
    this.camera.updateProjectionMatrix();
    this.camera.updateMatrixWorld();
  }
}
