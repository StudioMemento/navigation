import { MeshoptDecoder } from 'three/addons/libs/meshopt_decoder.module.js';

const types = {
  5120: [1, 'getInt8', 127],
  5121: [1, 'getUint8', 255],
  5122: [2, 'getInt16', 32767],
  5123: [2, 'getUint16', 65535],
  5125: [4, 'getUint32', 4294967295],
  5126: [4, 'getFloat32', 1],
};
const counts = { SCALAR: 1, VEC2: 2, VEC3: 3, VEC4: 4 };
const identity = () => [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
function matrixFor(node) {
  if (node.matrix) return node.matrix;
  const [x, y, z, w] = node.rotation || [0, 0, 0, 1],
    s = node.scale || [1, 1, 1],
    t = node.translation || [0, 0, 0];
  return [
    (1 - 2 * (y * y + z * z)) * s[0],
    2 * (x * y + w * z) * s[0],
    2 * (x * z - w * y) * s[0],
    0,
    2 * (x * y - w * z) * s[1],
    (1 - 2 * (x * x + z * z)) * s[1],
    2 * (y * z + w * x) * s[1],
    0,
    2 * (x * z + w * y) * s[2],
    2 * (y * z - w * x) * s[2],
    (1 - 2 * (x * x + y * y)) * s[2],
    0,
    ...t,
    1,
  ];
}
function multiply(a, b) {
  const r = new Array(16);
  for (let col = 0; col < 4; col++)
    for (let row = 0; row < 4; row++) {
      r[col * 4 + row] =
        a[row] * b[col * 4] +
        a[4 + row] * b[col * 4 + 1] +
        a[8 + row] * b[col * 4 + 2] +
        a[12 + row] * b[col * 4 + 3];
    }
  return r;
}

// A reader for the static baked asset. No secondary geometry or image set is downloaded.
export async function readStudio(buffer, center) {
  const header = new DataView(buffer);
  if (header.getUint32(0, true) !== 0x46546c67) throw Error('Modello GLB non valido');
  const jsonLength = header.getUint32(12, true),
    doc = JSON.parse(new TextDecoder().decode(new Uint8Array(buffer, 20, jsonLength)));
  const binStart = 20 + jsonLength + 8;
  await MeshoptDecoder.ready;
  const views = new Map();
  function view(index) {
    if (views.has(index)) return views.get(index);
    const v = doc.bufferViews[index],
      ext = v.extensions?.EXT_meshopt_compression;
    let data;
    if (ext) {
      data = new Uint8Array(ext.count * ext.byteStride);
      MeshoptDecoder.decodeGltfBuffer(
        data,
        ext.count,
        ext.byteStride,
        new Uint8Array(buffer, binStart + (ext.byteOffset || 0), ext.byteLength),
        ext.mode,
        ext.filter || 'NONE',
      );
    } else data = new Uint8Array(buffer, binStart + (v.byteOffset || 0), v.byteLength);
    views.set(index, data);
    return data;
  }
  function accessor(index, Type) {
    const a = doc.accessors[index],
      src = view(a.bufferView),
      dv = new DataView(src.buffer, src.byteOffset, src.byteLength);
    const [bytes, get, max] = types[a.componentType],
      n = counts[a.type],
      stride = doc.bufferViews[a.bufferView].byteStride || n * bytes;
    const values = new Type(a.count * n),
      start = a.byteOffset || 0;
    for (let i = 0, k = 0; i < a.count; i++)
      for (let j = 0; j < n; j++, k++) {
        const val = dv[get](start + stride * i + bytes * j, true);
        values[k] = a.normalized ? Math.max(-1, val / max) : val;
      }
    return values;
  }
  const batches = [];
  function collect(id, parent) {
    const node = doc.nodes[id],
      m = multiply(parent, matrixFor(node));
    if (node.mesh !== undefined)
      for (const primitive of doc.meshes[node.mesh].primitives) {
        const mat = doc.materials[primitive.material],
          tex = mat.pbrMetallicRoughness.baseColorTexture;
        const pixels = doc.textures[tex.index];
        const image = pixels.extensions?.EXT_texture_webp?.source ?? pixels.source;
        const p = accessor(primitive.attributes.POSITION, Float32Array),
          uv = accessor(primitive.attributes.TEXCOORD_0, Float32Array);
        const world = new Float32Array((p.length / 3) * 4);
        for (let i = 0, j = 0; i < p.length; i += 3, j += 4) {
          const x = p[i],
            y = p[i + 1],
            z = p[i + 2];
          const wx = m[0] * x + m[4] * y + m[8] * z + m[12],
            wy = m[1] * x + m[5] * y + m[9] * z + m[13],
            wz = m[2] * x + m[6] * y + m[10] * z + m[14];
          world[j] = wx - center[0];
          world[j + 1] = wy - center[1];
          world[j + 2] = wz - center[2];
          world[j + 3] =
            wy +
            0.096 * Math.hypot((wx + 0.06) * 0.93, wz + 0.46) +
            0.018 * Math.sin(wx * 3.1 + wz * 2.7) +
            0.008 * Math.sin(wz * 11 - wx * 5);
        }
        batches.push({ world, uv, image, indices: accessor(primitive.indices, Uint32Array) });
      }
    for (const child of node.children || []) collect(child, m);
  }
  for (const node of doc.scenes[doc.scene || 0].nodes) collect(node, identity());
  const images = doc.images.map((img) => new Blob([view(img.bufferView)], { type: img.mimeType }));
  return { batches, images };
}
