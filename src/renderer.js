import * as THREE from '../vendor/three.module.js';
import { GLTFLoader } from '../vendor/GLTFLoader.js';
import { createDioramaStage } from './diorama.js';

/** One renderer for the visible world only. No idle render loop and no hidden models. */
export class DioramaRenderer {
  constructor(container, interactionSurface, world) {
    this.container = container;
    this.surface = interactionSurface;
    this.world = world;
    this.frame = 0;
    this.rotation = 0;
    this.targetRotation = 0;
    try {
      const canvas = container.querySelector('canvas');
      // Probe before Three creates a context to keep fallback browsers quiet.
      const context = canvas.getContext('webgl2', { alpha: true, antialias: true, powerPreference: 'low-power' });
      if (!context) return;
      this.renderer = new THREE.WebGLRenderer({ canvas, context, alpha: true, antialias: true });
      this.renderer.setClearColor(0, 0);
      this.renderer.outputColorSpace = THREE.SRGBColorSpace;
      this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
      this.renderer.toneMappingExposure = 1.15;
      this.renderer.setPixelRatio(Math.min(devicePixelRatio, 1.5));
      this.resizeObserver = new ResizeObserver(() => this.resize());
      this.resizeObserver.observe(container);
      this.onPointer = event => {
        if (event.pointerType !== 'mouse') return;
        const rect = this.surface.getBoundingClientRect();
        this.targetRotation = ((event.clientX - rect.left) / rect.width - .5) * .10;
        this.requestDraw();
      };
      this.onLeave = () => { this.targetRotation = 0; this.requestDraw(); };
      this.onVisibility = () => {
        if (document.hidden) { cancelAnimationFrame(this.frame); this.frame = 0; }
        else this.requestDraw();
      };
      this.onContextLost = event => { event.preventDefault(); this.lost = true; container.classList.remove('is-rendered'); };
      this.onContextRestored = () => { this.lost = false; this.resize(); };
      interactionSurface.addEventListener('pointermove', this.onPointer, { passive: true });
      interactionSurface.addEventListener('pointerleave', this.onLeave);
      document.addEventListener('visibilitychange', this.onVisibility);
      canvas.addEventListener('webglcontextlost', this.onContextLost);
      canvas.addEventListener('webglcontextrestored', this.onContextRestored);
      new GLTFLoader().load(`./models/${world.id}-mobile.glb`, gltf => {
        if (this.disposed) { this.release(gltf.scene); return; }
        this.stage = createDioramaStage(THREE, gltf.scene, world);
        this.resize();
        container.classList.add('is-rendered');
      }, undefined, () => { container.classList.remove('is-rendered'); });
    } catch { container.classList.remove('is-rendered'); }
  }

  resize() {
    if (!this.renderer || this.disposed) return;
    this.renderer.setSize(this.container.clientWidth, this.container.clientHeight, false);
    this.requestDraw();
  }

  requestDraw() {
    if (!this.frame && !this.disposed && !document.hidden && !this.lost) this.frame = requestAnimationFrame(() => this.draw());
  }

  draw() {
    this.frame = 0;
    if (!this.stage || this.disposed || this.lost) return;
    this.rotation += (this.targetRotation - this.rotation) * .12;
    this.stage.root.rotation.y = this.world.yaw + this.rotation;
    this.renderer.render(this.stage.scene, this.stage.camera);
    if (Math.abs(this.targetRotation - this.rotation) > .0002) this.requestDraw();
  }

  release(root) {
    const textures = new Set();
    const geometries = new Set();
    const materials = new Set();
    root.traverse(object => {
      if (object.geometry) geometries.add(object.geometry);
      for (const material of [].concat(object.material || [])) materials.add(material);
    });
    for (const material of materials) {
      for (const value of Object.values(material)) if (value?.isTexture) textures.add(value);
      material.dispose();
    }
    geometries.forEach(geometry => geometry.dispose());
    textures.forEach(texture => { texture.image?.close?.(); texture.dispose(); });
  }

  dispose() {
    this.disposed = true;
    cancelAnimationFrame(this.frame);
    this.resizeObserver?.disconnect();
    this.surface.removeEventListener('pointermove', this.onPointer);
    this.surface.removeEventListener('pointerleave', this.onLeave);
    document.removeEventListener('visibilitychange', this.onVisibility);
    const canvas = this.container.querySelector('canvas');
    canvas.removeEventListener('webglcontextlost', this.onContextLost);
    canvas.removeEventListener('webglcontextrestored', this.onContextRestored);
    if (this.stage) this.release(this.stage.root);
    this.renderer?.dispose();
    this.renderer?.forceContextLoss();
  }
}
