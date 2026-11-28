import kernelUrl from '../../studio/model/raster.wasm?url';
import scanUrl from '../../studio/model/scan.bin?url';
import { readStudio } from './read-glb.js';
import { CENTER } from '../scene/pose.mjs';

let kernel,
  cursor = 65536,
  batches,
  levels,
  viewPtr,
  frameStart,
  color,
  depth,
  width = 0,
  height = 0,
  canvas,
  ctx,
  samples;
function reserve(size) {
  const p = cursor;
  cursor = Math.ceil((cursor + size) / 16) * 16;
  const missing = cursor - kernel.memory.buffer.byteLength;
  if (missing > 0) kernel.memory.grow(Math.ceil(missing / 65536));
  return p;
}
function put(array) {
  const p = reserve(array.byteLength);
  new Uint8Array(kernel.memory.buffer, p, array.byteLength).set(
    new Uint8Array(array.buffer, array.byteOffset, array.byteLength),
  );
  return p;
}
async function mipmap(blob) {
  const bitmap = await createImageBitmap(blob);
  let w = bitmap.width,
    h = bitmap.height;
  const canvas = new OffscreenCanvas(w, h),
    ctx = canvas.getContext('2d', { alpha: false, willReadFrequently: true });
  ctx.drawImage(bitmap, 0, 0);
  bitmap.close();
  const values = [];
  for (;;) {
    values.push(put(ctx.getImageData(0, 0, w, h).data), w, h);
    if (w === 1 && h === 1) break;
    const nextW = Math.max(1, w >> 1),
      nextH = Math.max(1, h >> 1);
    ctx.drawImage(canvas, 0, 0, w, h, 0, 0, nextW, nextH);
    w = nextW;
    h = nextH;
  }
  return { ptr: put(new Uint32Array(values)), count: values.length / 3 };
}
async function init(buffer, reduced) {
  const get = async (url) => {
    const r = await fetch(url);
    if (!r.ok) throw Error(`Asset ${r.status}`);
    return r.arrayBuffer();
  };
  const [wasm, asset, dust] = await Promise.all([
    get(kernelUrl).then((buffer) => WebAssembly.instantiate(buffer, {})),
    readStudio(buffer, CENTER),
    reduced ? Promise.resolve(new ArrayBuffer(0)) : get(scanUrl),
  ]);
  kernel = wasm.instance.exports;
  samples = new Int16Array(dust);
  batches = asset.batches.map(({ world, uv, indices, image }) => ({
    positions: put(world),
    projected: reserve(world.byteLength),
    count: world.length / 4,
    uv: put(uv),
    indices: put(indices),
    indexCount: indices.length,
    image,
  }));
  levels = [];
  for (const image of asset.images) levels.push(await mipmap(image));
  viewPtr = reserve(12 * 4);
  frameStart = cursor;
  self.postMessage({ type: 'ready' });
}
function screenPoint(x, y, z, c) {
  x -= CENTER[0];
  y -= CENTER[1];
  z -= CENTER[2];
  return [
    c[10] + (x * c[0] + y * c[1] + z * c[2]) * c[9],
    c[11] - (x * c[3] + y * c[4] + z * c[5]) * c[9],
    x * c[6] + y * c[7] + z * c[8],
  ];
}
function addFilaments(c, p, sweep) {
  if (p >= 1) return;
  ctx.save();
  ctx.globalCompositeOperation = 'lighter';
  const zbuffer = new Float32Array(kernel.memory.buffer, depth, width * height);
  const origin = screenPoint(-0.06, -0.035, -0.46, c);
  if (p < 0.24) {
    const weight = Math.max(0, Math.sin((Math.PI * p) / 0.24));
    for (let j = 0; j < 68; j++) {
      const r = ((j * 32843) % 7949) / 7949,
        a = j * 2.39996;
      const end = screenPoint(
        -0.06 + Math.cos(a) * r * 1.35,
        r * 2.12,
        -0.46 + Math.sin(a) * r * 1.35,
        c,
      );
      ctx.strokeStyle = `rgba(255,123,76,${weight * (0.11 + 0.18 * r)})`;
      ctx.lineWidth = 0.85;
      ctx.beginPath();
      ctx.moveTo(origin[0], origin[1]);
      ctx.lineTo(origin[0] + (end[0] - origin[0]) * weight, origin[1] + (end[1] - origin[1]) * weight);
      ctx.stroke();
    }
  }
  if (p > 0.1) {
    ctx.fillStyle = '#ffa23d';
    ctx.strokeStyle = '#ff8f24';
    for (let i = 0; i < samples.length; i += 12) {
      const x = samples[i] * 0.001,
        y = samples[i + 1] * 0.001,
        z = samples[i + 2] * 0.001;
      const d = y + 0.096 * Math.hypot((x + 0.06) * 0.93, z + 0.46) - sweep;
      if (Math.abs(d) > 0.32) continue;
      const a = screenPoint(x, y, z, c),
        ix = Math.round(a[0]),
        iy = Math.round(a[1]);
      if (ix < 0 || iy < 0 || ix >= width || iy >= height || a[2] < zbuffer[iy * width + ix] - 0.035)
        continue;
      const gain = Math.max(0, 1 - Math.abs(d) / 0.32);
      ctx.globalAlpha = gain * 0.88;
      ctx.fillRect(a[0], a[1], 1.45, 1.45);
      if (i % 108 === 0) {
        ctx.globalAlpha = gain * 0.38;
        ctx.beginPath();
        ctx.moveTo(a[0], a[1]);
        ctx.lineTo(a[0] + Math.sin(i) * 10 * gain, a[1] - gain * c[9] * 0.37);
        ctx.stroke();
      }
    }
  }
  ctx.restore();
}
function contour(rgba) {
  const pitch = Math.max(2, Math.round(Math.max(width, height) / 280)),
    out = [];
  const inside = (x, y) => rgba[(y * width + x) * 4 + 3] > 100;
  for (let y = pitch; y < height - pitch; y += pitch)
    for (let x = pitch; x < width - pitch; x += pitch) {
      if (
        inside(x, y) &&
        (!inside(x + pitch, y) ||
          !inside(x - pitch, y) ||
          !inside(x, y + pitch) ||
          !inside(x, y - pitch))
      )
        out.push(x / width, y / height);
    }
  return new Float32Array(out);
}
function render(m) {
  if (m.width !== width || m.height !== height) {
    width = m.width;
    height = m.height;
    cursor = frameStart;
    color = reserve(width * height * 4);
    depth = reserve(width * height * 4);
    canvas = new OffscreenCanvas(width, height);
    ctx = canvas.getContext('2d', { alpha: true });
  }
  const c = [...m.right, ...m.up, ...m.forward, height / (2 * m.half), width / 2, height / 2];
  new Float32Array(kernel.memory.buffer, viewPtr, 12).set(c);
  kernel.clearFrame(color, depth, width * height);
  for (const b of batches) {
    kernel.project(b.positions, b.projected, b.count, viewPtr);
    const tex = levels[b.image];
    kernel.drawBatch(
      color,
      depth,
      width,
      height,
      b.projected,
      b.uv,
      b.indices,
      b.indexCount,
      tex.ptr,
      tex.count,
      m.sweep,
    );
  }
  const pixels = new Uint8ClampedArray(kernel.memory.buffer, color, width * height * 4);
  ctx.putImageData(new ImageData(pixels, width, height), 0, 0);
  addFilaments(c, m.progress, m.sweep);
  const image = canvas.transferToImageBitmap(),
    edges = m.settled ? contour(pixels) : null;
  self.postMessage({ type: 'frame', image, edges, id: m.id }, edges ? [image, edges.buffer] : [image]);
}
self.onmessage = async ({ data }) => {
  try {
    if (data.type === 'init') await init(data.buffer, data.reduced);
    else render(data);
  } catch (err) {
    self.postMessage({ type: 'error', message: err.message });
  }
};
