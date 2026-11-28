"""Build surface samples in metres for the brief light sweep, once, from the FBX."""
from pathlib import Path
import json
import bpy
import numpy as np

root = Path(__file__).resolve().parents[1]
output = root / 'studio' / 'model'
bpy.ops.wm.read_factory_settings(use_empty=True)
bpy.ops.import_scene.fbx(filepath=str(root / 'studio/source/STUDIO_WEB.fbx'), use_anim=False)

def closed_shell(ob):
    while ob:
        if ob.name.upper() == 'BACKFACE_REVEAL':
            return True
        ob = ob.parent
    return False

triangles = []
for ob in bpy.context.scene.objects:
    if ob.type != 'MESH' or closed_shell(ob):
        continue
    mesh = ob.data
    vertices = np.empty(len(mesh.vertices) * 3, dtype=np.float32)
    mesh.vertices.foreach_get('co', vertices)
    transform = np.array(ob.matrix_world, dtype=np.float32)
    vertices = vertices.reshape(-1, 3) @ transform[:3, :3].T + transform[:3, 3]
    vertices = vertices[:, [0, 2, 1]]
    vertices[:, 2] *= -1
    mesh.calc_loop_triangles()
    faces = np.empty(len(mesh.loop_triangles) * 3, dtype=np.int32)
    mesh.loop_triangles.foreach_get('vertices', faces)
    triangles.append(vertices[faces.reshape(-1, 3)])
triangles = np.concatenate(triangles)
areas = np.linalg.norm(np.cross(triangles[:, 1] - triangles[:, 0], triangles[:, 2] - triangles[:, 0]), axis=1)
rng = np.random.default_rng(4137)
faces = triangles[rng.choice(len(areas), 11520, p=areas / areas.sum())]
a = np.sqrt(rng.random((len(faces), 1)))
b = rng.random((len(faces), 1))
samples = (1 - a) * faces[:, 0] + a * ((1 - b) * faces[:, 1] + b * faces[:, 2])
# A fixed 1/1000 m grid eliminates per-vertex floats from the small intro payload.
np.rint(samples * 1000).astype('<i2').tofile(output / 'scan.bin')
vertices = np.unique(triangles.reshape(-1, 3).round(5), axis=0)
extremes = set()
for y in np.linspace(-1, 1, 11):
    radius = np.sqrt(1 - y * y)
    for angle in np.linspace(0, 2 * np.pi, 30, endpoint=False):
        projection = vertices[:, 0] * radius * np.cos(angle) + vertices[:, 1] * y + vertices[:, 2] * radius * np.sin(angle)
        extremes.add(int(projection.argmax()))
(output / 'support.json').write_text(json.dumps(vertices[sorted(extremes)].round(4).astype(float).round(4).tolist(), separators=(',', ':')))
print('Reveal field:', len(faces), 'samples;', len(extremes), 'extremal points')
