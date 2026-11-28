import modelUrl from '../../studio/model/studio-web.glb?url';
import { OrbitPose } from '../scene/pose.mjs';
import { bindGestures } from '../scene/gestures.js';
import { DURATION, sweepHeight } from '../scene/timing.mjs';

// A WebGL-free entry point. Geometry decoding and drawing stay off the UI thread.
// Keep one frame in flight; on a slower device only the latest camera pose is drawn.
export function createSoftwareViewer(stage, canvas, field, callbacks) {
  const context = canvas.getContext('2d', { alpha: true });
  if (!context || typeof OffscreenCanvas === 'undefined' || typeof Worker === 'undefined')
    throw Error('Rendering non disponibile');
  const worker = new Worker(new URL('./raster.worker.js', import.meta.url), { type: 'module' });
  const controller = new AbortController(),
    pose = new OrbitPose(),
    still = matchMedia('(prefers-reduced-motion: reduce)');
  const coarse = matchMedia('(pointer:coarse)').matches;
  const accent = document.createElement('canvas');
  accent.className = 'contact-light';
  accent.width = accent.height = 152;
  stage.append(accent);
  const edgeCanvas = accent.getContext('2d');
  let phase = 'preparing',
    disposed = false,
    ready = false,
    elapsed = 0,
    last = 0,
    raf = 0,
    dirty = true,
    busy = false;
  let goalFrame = 0,
    lastComplete = 0,
    edges = null,
    releaseAt = null,
    lastPulse = -10000,
    hold = 0,
    bottomPulse = false;
  let frameStart = 0,
    averageRender = 0;
  const change = (value) => {
    phase = value;
    callbacks.phase(value);
  };
  function wake() {
    if (!raf && !disposed && !document.hidden) raf = requestAnimationFrame(tick);
  }
  function resize() {
    const r = stage.getBoundingClientRect();
    pose.resize(r.width, r.height);
    dirty = true;
    edges = null;
    wake();
  }
  function sendPulse(x, y, power, reach) {
    if (still.matches) return;
    const r = stage.getBoundingClientRect();
    field?.impulse(r.left + x, r.top + y, { power, reach });
  }
  function glow(x, y, tap, anywhere = false) {
    if (!edges || phase !== 'ready' || still.matches) return;
    let best = anywhere ? Infinity : (tap ? 70 : 32) ** 2,
      hit = -1;
    for (let i = 0; i < edges.length; i += 2) {
      const dx = edges[i] * pose.width - x,
        dy = edges[i + 1] * pose.height - y,
        d = dx * dx + dy * dy;
      if (d < best) {
        best = d;
        hit = i;
      }
    }
    if (hit < 0) {
      accent.style.opacity = 0;
      if (tap) sendPulse(x, y, 0.44, 210);
      return;
    }
    const px = edges[hit] * pose.width,
      py = edges[hit + 1] * pose.height;
    accent.style.transform = `translate(${px - 76}px,${py - 76}px)`;
    edgeCanvas.clearRect(0, 0, 152, 152);
    for (let i = 0; i < edges.length; i += 2) {
      const dx = edges[i] * pose.width - px,
        dy = edges[i + 1] * pose.height - py,
        d = dx * dx + dy * dy;
      if (d > 4400) continue;
      edgeCanvas.fillStyle = `rgba(255,136,82,${0.8 * (1 - Math.sqrt(d) / 67)})`;
      edgeCanvas.beginPath();
      edgeCanvas.arc(76 + dx, 76 + dy, 1.25, 0, Math.PI * 2);
      edgeCanvas.fill();
    }
    accent.style.opacity = tap ? '1' : String(Math.max(0.12, 1 - Math.sqrt(best) / 42));
    if (tap || performance.now() - lastPulse > 650) {
      sendPulse(px, py, tap ? 0.73 : 0.45, tap ? 330 : 190);
      lastPulse = performance.now();
    }
    if (tap) {
      clearTimeout(hold);
      hold = setTimeout(() => {
        accent.style.opacity = 0;
      }, 420);
    }
  }
  function play() {
    if (!ready) return;
    elapsed = still.matches ? DURATION : 0;
    bottomPulse = false;
    edges = null;
    accent.style.opacity = 0;
    change(still.matches ? 'ready' : 'intro');
    dirty = true;
    wake();
  }
  function finish() {
    elapsed = DURATION;
    change('ready');
    dirty = true;
    wake();
  }
  function tick(now) {
    raf = 0;
    if (disposed || document.hidden || !ready) return;
    const dt = last ? Math.min(0.075, (now - last) / 1000) : 1 / 60;
    last = now;
    const moving = pose.step(dt, still.matches);
    if (phase === 'intro') {
      elapsed = Math.min(DURATION, elapsed + dt);
      if (!bottomPulse && elapsed / DURATION > 0.16) {
        bottomPulse = true;
        sendPulse(pose.width * 0.5, pose.height * 0.65, 0.6, 350);
      }
      if (elapsed >= DURATION) finish();
    }
    const settled = !moving && phase === 'ready';
    if (moving || !settled) dirty = true;
    if (!busy && (dirty || (settled && !lastComplete))) {
      const nominal = Math.min(devicePixelRatio || 1, coarse ? 1.5 : 1.75);
      const budget = settled
        ? 2480000
        : averageRender > 40
          ? 620000
          : averageRender > 23
            ? 920000
            : 1500000;
      const scale = Math.min(nominal, Math.sqrt(budget / (pose.width * pose.height)));
      const width = Math.max(2, Math.round(pose.width * scale)),
        height = Math.max(2, Math.round(pose.height * scale));
      const progress = elapsed / DURATION;
      worker.postMessage({
        type: 'draw',
        id: ++goalFrame,
        width,
        height,
        right: pose.right,
        up: pose.up,
        forward: pose.forward,
        half: pose.halfHeight,
        sweep: settled || phase === 'ready' ? 8 : sweepHeight(progress),
        progress,
        settled,
      });
      dirty = false;
      busy = true;
      frameStart = now;
      lastComplete = settled ? goalFrame : 0;
    }
    if (moving || phase === 'intro' || dirty) wake();
    else last = 0;
  }
  function fail(error) {
    if (disposed) return;
    console.error('StudioWeb:', error);
    ready = false;
    worker.terminate();
    change('fallback');
  }
  worker.onmessage = ({ data }) => {
    if (disposed) {
      data.image?.close();
      return;
    }
    if (data.type === 'error') {
      fail(data.message);
      return;
    }
    if (data.type === 'ready') {
      ready = true;
      play();
      return;
    }
    busy = false;
    const cost = Math.min(150, performance.now() - frameStart);
    averageRender = averageRender ? 0.78 * averageRender + 0.22 * cost : cost;
    if (canvas.width !== data.image.width || canvas.height !== data.image.height) {
      canvas.width = data.image.width;
      canvas.height = data.image.height;
    }
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.drawImage(data.image, 0, 0);
    data.image.close();
    if (data.edges) {
      edges = data.edges;
      if (releaseAt) {
        glow(releaseAt.x, releaseAt.y, true, true);
        releaseAt = null;
      }
    }
    if (dirty || phase === 'intro' || !lastComplete) wake();
  };
  worker.onerror = (event) => fail(event.message);
  function changed() {
    dirty = true;
    lastComplete = 0;
    accent.style.opacity = 0;
    callbacks.view(pose.goal.zoom);
    wake();
  }
  const actions = {
    enabled: () => ready,
    rotate: (az, el) => {
      pose.rotate(az, el);
      changed();
    },
    zoom: (f) => {
      pose.magnify(f);
      changed();
    },
    reset: () => {
      pose.reset();
      changed();
    },
    hover: (x, y) => glow(x, y, false),
    leave: () => {
      accent.style.opacity = 0;
    },
    release: (x, y, dragged) => {
      if (dragged) {
        releaseAt = { x, y };
        dirty = true;
        wake();
      } else glow(x, y, true);
    },
  };
  const unbind = bindGestures(stage, actions);
  const observer = new ResizeObserver(resize);
  observer.observe(stage);
  resize();
  const signal = controller.signal;
  document.addEventListener(
    'visibilitychange',
    () => {
      last = 0;
      if (!document.hidden) {
        dirty = true;
        wake();
      }
    },
    { signal },
  );
  still.addEventListener(
    'change',
    () => {
      if (still.matches && phase === 'intro') finish();
    },
    { signal },
  );
  fetch(modelUrl, { signal })
    .then((r) => {
      if (!r.ok) throw Error(`Modello ${r.status}`);
      return r.arrayBuffer();
    })
    .then((buffer) => {
      if (!disposed) worker.postMessage({ type: 'init', buffer, reduced: still.matches }, [buffer]);
    })
    .catch((e) => {
      if (e.name !== 'AbortError') fail(e);
    });
  return {
    zoom: actions.zoom,
    reset: actions.reset,
    replay: () => (phase === 'intro' ? finish() : play()),
    dispose() {
      disposed = true;
      controller.abort();
      worker.terminate();
      observer.disconnect();
      unbind();
      cancelAnimationFrame(raf);
      clearTimeout(hold);
      accent.remove();
    },
  };
}
