import test from 'node:test';
import assert from 'node:assert/strict';
import { Vector3 } from 'three';
import { StudioOrbit, HOME, HALF_ARC, ZOOM } from '../src/scene/orbit.mjs';

const near = (a, b) => assert.ok(Math.abs(a - b) < 1e-8, `${a} vs ${b}`);
test('drag accumulates only 200 degrees on either axis and reverses immediately at its limits', () => {
  const o = new StudioOrbit();
  o.rotate(100, -100);
  near(o.goal.yaw, HOME.yaw + HALF_ARC);
  near(o.goal.elevation, HOME.elevation - HALF_ARC);
  o.rotate(-0.05, 0.02);
  near(o.goal.yaw, HOME.yaw + HALF_ARC - 0.05);
  o.rotate(-100, 100);
  near(o.goal.yaw, HOME.yaw - HALF_ARC);
  near(o.goal.elevation, HOME.elevation + HALF_ARC);
});
test('crossing the zenith keeps the image upright relative to the drag axes', () => {
  const o = new StudioOrbit();
  o.rotate(0, Math.PI / 2 - HOME.elevation - 0.004);
  o.step(1, true);
  const before = new Vector3(0, 1, 0).applyQuaternion(o.camera.quaternion);
  o.rotate(0, 0.008);
  o.step(1, true);
  const after = new Vector3(0, 1, 0).applyQuaternion(o.camera.quaternion);
  assert.ok(after.dot(before) > 0.9999);
  assert.ok(o.camera.isOrthographicCamera);
});
test('pinch, wheel and reset share zoom bounds and the photographic home framing', () => {
  const o = new StudioOrbit();
  o.resize(1280, 850);
  o.magnify(20);
  near(o.goal.zoom, ZOOM.max);
  o.magnify(0.01);
  near(o.goal.zoom, ZOOM.min);
  o.rotate(0.4, -0.35);
  o.step(0.1, true);
  o.reset();
  o.step(0.1, true);
  near(o.camera.right - o.camera.left, 10.05);
  near(o.current.yaw, HOME.yaw);
  near(o.current.elevation, HOME.elevation);
});
