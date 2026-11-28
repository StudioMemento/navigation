import modelUrl from '../../studio/model/studio-web.glb?url';
import scanUrl from '../../studio/model/scan.bin?url';
import { NoToneMapping, Scene, SRGBColorSpace, Vector3, WebGLRenderer } from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { MeshoptDecoder } from 'three/addons/libs/meshopt_decoder.module.js';
import { StudioOrbit } from './orbit.mjs';
import { bindGestures } from './gestures.js';
import { DURATION, sweepHeight } from './timing.mjs';
import { StudioComposite } from './composite.js';
import { createFormation, installReveal, revealState } from './reveal.js';

async function getAsset(url, signal) {
  const response = await fetch(url, { signal, credentials: 'same-origin' });
  if (!response.ok) throw Error(`Asset ${url} (${response.status})`);
  return response;
}
function releaseModel(model) {
  const materials = new Set(),
    geometries = new Set(),
    textures = new Set();
  model?.traverse((o) => {
    if (!o.isMesh) return;
    geometries.add(o.geometry);
    for (const material of [].concat(o.material)) materials.add(material);
  });
  for (const material of materials) {
    for (const value of Object.values(material)) if (value?.isTexture) textures.add(value);
    material.dispose();
  }
  for (const geometry of geometries) geometry.dispose();
  for (const texture of textures) {
    texture.dispose();
    texture.source?.data?.close?.();
  }
}

export function createViewer(stage, canvas, field, callbacks, context) {
  const coarse = matchMedia('(pointer:coarse)').matches;
  const still = matchMedia('(prefers-reduced-motion: reduce)');
  const resources = new AbortController();
  const gl = new WebGLRenderer({
    canvas,
    context,
    alpha: true,
    antialias: false,
    premultipliedAlpha: false,
    powerPreference: 'high-performance',
  });
  gl.outputColorSpace = SRGBColorSpace;
  gl.toneMapping = NoToneMapping;
  gl.setClearColor(0, 0);
  const scene = new Scene(),
    orbit = new StudioOrbit(),
    composite = new StudioComposite(gl),
    state = revealState();
  const marker = new Vector3();
  let phase = 'preparing',
    model = null,
    formation = null,
    disposed = false,
    lost = false;
  let frame = 0,
    last = 0,
    elapsed = 0,
    waiting = 0,
    needGeometry = true,
    needMask = false,
    maskTimer = 0;
  let edgeStrength = 0,
    edgeGoal = 0,
    spot = { x: -10000, y: -10000 },
    hover = null,
    releaseAt = null,
    lastPulse = -10000,
    pulseTimer = 0;
  let bottomPulse = false,
    topPulse = false;
  function changePhase(value) {
    phase = value;
    callbacks.phase(value);
  }
  function wake() {
    if (!frame && !disposed && !lost && !document.hidden) frame = requestAnimationFrame(tick);
  }
  function viewChange() {
    composite.revision++;
    edgeGoal = 0;
    hover = null;
    needMask = true;
    callbacks.view(orbit.goal.zoom);
    wake();
  }
  function emit(x, y, power, reach) {
    if (still.matches) return;
    const rect = stage.getBoundingClientRect();
    field?.impulse(x + rect.left, y + rect.top, { power, reach });
  }
  function emitWorld(x, y, z, power, reach) {
    marker.set(x, y, z).project(orbit.camera);
    emit((marker.x + 1) * orbit.width * 0.5, (1 - marker.y) * orbit.height * 0.5, power, reach);
  }
  function edgeHit(x, y, tap = false) {
    if (phase !== 'ready' || still.matches) return;
    const point = composite.closest(x, y, tap ? Infinity : 33);
    if (!point) {
      edgeGoal = 0;
      wake();
      return;
    }
    const wasDark = edgeGoal < 0.06;
    const moved = Math.hypot(point.x - spot.x, point.y - spot.y);
    spot = point;
    edgeGoal = tap ? 0.96 : Math.max(0.15, 1 - point.distance / 38);
    const now = performance.now();
    if (tap || (now - lastPulse > 420 && (wasDark || moved > 18))) {
      emit(point.x, point.y, tap ? 0.73 : 0.45, tap ? 330 : 190);
      lastPulse = now;
    }
    if (tap) {
      clearTimeout(pulseTimer);
      pulseTimer = setTimeout(() => {
        edgeGoal = 0;
        wake();
      }, 390);
    }
    wake();
  }
  function updateEdges() {
    if (disposed || lost || document.hidden || phase !== 'ready' || !needMask || composite.reading)
      return;
    needMask = false;
    composite
      .sampleEdges()
      .then((ok) => {
        if (disposed || lost) return;
        if (!ok) {
          needMask = true;
          wake();
          return;
        }
        if (releaseAt) {
          const p = releaseAt;
          releaseAt = null;
          edgeHit(p.x, p.y, true);
        } else if (hover) edgeHit(hover.x, hover.y);
      })
      .catch(() => {
        /* The image remains interactive on GPUs without async readback. */
      });
  }
  function finish() {
    elapsed = DURATION;
    state.progress.value = 1;
    state.sweep.value = sweepHeight(1);
    state.finished.value = 1;
    if (formation) formation.group.visible = false;
    changePhase('ready');
    needGeometry = true;
    needMask = true;
    wake();
  }
  function play() {
    if (!model || lost) return;
    if (still.matches) {
      finish();
      return;
    }
    elapsed = 0;
    bottomPulse = topPulse = false;
    edgeGoal = edgeStrength = 0;
    state.progress.value = 0;
    state.sweep.value = sweepHeight(0);
    state.finished.value = 0;
    if (formation) formation.group.visible = true;
    changePhase('intro');
    needGeometry = true;
    wake();
  }
  function tick(now) {
    frame = 0;
    if (disposed || document.hidden || lost) return;
    const dt = last ? Math.min(0.075, Math.max(0, (now - last) / 1000)) : 1 / 60;
    last = now;
    const moving = orbit.step(dt, still.matches);
    if (moving) {
      needGeometry = true;
      needMask = true;
      composite.revision++;
    }
    if (phase === 'preparing' && formation && !still.matches) {
      waiting += dt;
      state.progress.value = 0.035 + 0.016 * Math.sin(waiting * 1.35);
      needGeometry = true;
    }
    if (phase === 'intro') {
      elapsed += dt;
      const p = Math.min(1, elapsed / DURATION);
      state.progress.value = p;
      state.sweep.value = sweepHeight(p);
      if (p > 0.16 && !bottomPulse) {
        bottomPulse = true;
        emitWorld(-0.06, 0.02, -0.46, 0.6, 400);
      }
      if (p > 0.79 && !topPulse) {
        topPulse = true;
        emitWorld(-1.35, 2.38, -2.0, 0.38, 260);
      }
      if (p >= 1) finish();
      needGeometry = true;
    }
    const easing = edgeGoal > edgeStrength ? 0.52 : 0.19;
    const delta = edgeGoal - edgeStrength;
    edgeStrength = Math.abs(delta) < 0.008 ? edgeGoal : edgeStrength + delta * easing;
    if (needGeometry) {
      composite.renderModel(scene, orbit.camera);
    }
    if (needGeometry || Math.abs(delta) > 0.001 || edgeGoal > 0)
      composite.present(spot.x, spot.y, edgeStrength);
    needGeometry = false;
    if (
      moving ||
      phase === 'intro' ||
      (phase === 'preparing' && formation && !still.matches) ||
      Math.abs(edgeGoal - edgeStrength) > 0.002
    ) {
      wake();
    } else {
      last = 0;
      if (phase === 'ready' && needMask) {
        clearTimeout(maskTimer);
        maskTimer = setTimeout(updateEdges, 55);
      }
    }
  }
  function resize() {
    const { width: w, height: h } = stage.getBoundingClientRect();
    if (w < 1 || h < 1) return;
    const pixelBudget = coarse ? 1650000 : 2850000;
    const dpr = Math.max(
      0.65,
      Math.min(devicePixelRatio || 1, coarse ? 1.5 : 1.75, Math.sqrt(pixelBudget / (w * h))),
    );
    gl.setPixelRatio(dpr);
    gl.setSize(w, h, false);
    composite.resize(w, h, dpr);
    orbit.resize(w, h);
    if (coarse && dpr >= 1.35) composite.target.samples = Math.min(2, gl.capabilities.maxSamples);
    state.dpr.value = dpr;
    needGeometry = true;
    needMask = true;
    wake();
  }
  async function boot() {
    const signal = resources.signal;
    const loader = new GLTFLoader().setMeshoptDecoder(MeshoptDecoder);
    const modelTask = getAsset(modelUrl, signal)
      .then((r) => r.arrayBuffer())
      .then((b) => loader.parseAsync(b, ''));
    const formationTask = still.matches
      ? Promise.resolve()
      : getAsset(scanUrl, signal)
          .then((r) => r.arrayBuffer())
          .then((b) => {
            if (disposed) return;
            formation = createFormation(new Int16Array(b), state, coarse);
            formation.group.visible = !still.matches;
            scene.add(formation.group);
            wake();
          })
          .catch(() => {});
    const [gltf] = await Promise.all([modelTask, formationTask]);
    if (disposed) {
      releaseModel(gltf.scene);
      return;
    }
    model = gltf.scene;
    const distinct = new Set();
    model.traverse((o) => {
      if (o.isMesh) for (const m of [].concat(o.material)) distinct.add(m);
    });
    for (const m of distinct) {
      if (m.map) m.map.anisotropy = Math.min(4, gl.capabilities.getMaxAnisotropy());
      m.toneMapped = false;
      installReveal(m, state);
      if (m.map) gl.initTexture(m.map);
    }
    scene.add(model);
    // Upload and compile offscreen. The first visible band can then include the entire studio.
    gl.setRenderTarget(composite.target);
    await gl.compileAsync(scene, orbit.camera);
    if (disposed || lost) return;
    gl.setRenderTarget(null);
    composite.renderModel(scene, orbit.camera);
    play();
  }
  const actions = {
    enabled: () => phase === 'ready' || phase === 'intro',
    rotate: (yaw, elevation) => {
      orbit.rotate(yaw, elevation);
      viewChange();
    },
    zoom: (factor) => {
      orbit.magnify(factor);
      viewChange();
    },
    reset: () => {
      orbit.reset();
      viewChange();
    },
    hover: (x, y) => {
      hover = { x, y };
      edgeHit(x, y);
    },
    leave: () => {
      hover = null;
      edgeGoal = 0;
      wake();
    },
    release: (x, y, dragged) => {
      if (dragged) {
        releaseAt = { x, y };
        needMask = true;
        wake();
      } else edgeHit(x, y, true);
    },
  };
  const unbind = bindGestures(stage, actions);
  const observer = new ResizeObserver(resize);
  observer.observe(stage);
  resize();
  const on = (target, type, fn) => target.addEventListener(type, fn, { signal: resources.signal });
  on(document, 'visibilitychange', () => {
    if (document.hidden) {
      cancelAnimationFrame(frame);
      frame = 0;
      last = 0;
      clearTimeout(maskTimer);
    } else {
      needGeometry = true;
      wake();
    }
  });
  on(still, 'change', () => {
    if (still.matches && phase === 'intro') finish();
    else wake();
  });
  on(canvas, 'webglcontextlost', (event) => {
    event.preventDefault();
    lost = true;
    cancelAnimationFrame(frame);
    frame = 0;
    changePhase('lost');
  });
  on(canvas, 'webglcontextrestored', () => {
    if (!disposed) callbacks.retry();
  });
  boot().catch((error) => {
    if (disposed || error.name === 'AbortError') return;
    console.error('StudioWeb:', error);
    changePhase('fallback');
    if (formation) formation.group.visible = false;
    cancelAnimationFrame(frame);
    frame = 0;
  });
  return {
    reset: actions.reset,
    zoom: actions.zoom,
    replay: () => (phase === 'intro' ? finish() : play()),
    dispose() {
      disposed = true;
      resources.abort();
      observer.disconnect();
      unbind();
      cancelAnimationFrame(frame);
      clearTimeout(maskTimer);
      clearTimeout(pulseTimer);
      formation?.dispose();
      releaseModel(model);
      composite.dispose();
      gl.dispose();
    },
  };
}
