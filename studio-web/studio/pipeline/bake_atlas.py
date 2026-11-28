"""Generate and cache a single unique lightmap UV set per batch in world units.

Charts are unwrapped together, then transferred to the original FBX loop order.
This preserves the material authoring file, display UVs and authored object frames.
"""
from pathlib import Path
import math
import time
import bpy
import numpy as np


def inside_shell(obj):
    p = obj
    while p:
        if p.name.upper() == 'BACKFACE_REVEAL' or str(p.get('studio_group', '')).upper() == 'BACKFACE_REVEAL' or str(p.get('zone', '')).upper() == 'BACKFACE_REVEAL':
            return True
        p = p.parent
    return False


def atlas_name(obj):
    name = obj.name.upper()
    if 'SVGMESH1' in name or 'FONDAMENTA' in name:
        return 'architecture'
    if 'POSTAZIONE' in name or name.startswith('PC_') or name in {'POLYSURFACE19', 'POLYSURFACE25', 'POLYSURFACE26','POLYSURFACE35','LED_PS5','LED_TV','LED_WORKSTATION','LED_SCRIVANIE','LUCI_CASSE'} or 'ZONA_PROGETTAZIONE' in name or name in {'POLYSURFACE5','POLYSURFACE6','POLYSURFACE8','TELO_SHELF','TYPO_LED','LUCE_SOFTBOX_PROGETTAZIONE','LUCE_LAMPADA_PROGETTAZIONE'}:
        return 'atelier'
    return 'lounge'


def world_vertices(obj):
    raw = np.empty(len(obj.data.vertices)*3, dtype='f4')
    obj.data.vertices.foreach_get('co', raw)
    mat = np.asarray(obj.matrix_world, dtype='f4')
    return np.ascontiguousarray(raw.reshape(-1,3) @ mat[:3,:3].T + mat[:3,3])


def assign_atlas_uv(batch, group, cache, resolution):
    ordered = sorted(batch, key=lambda x:x.name)
    counts = [len(obj.data.loops) for obj in ordered]
    key = f'{group}-unwrap-5-{resolution}.npz'
    cache = Path(cache) / key if cache else None
    if cache and cache.is_file():
        data = np.load(cache, allow_pickle=False)
        if [o.name for o in ordered] == list(data['names']) and list(data['counts']) == counts:
            coords = data['uvs']
            apply_cached(ordered, counts, coords)
            return
    start=time.monotonic()
    positions=[]
    faces=[]
    offset=0
    for obj in ordered:
        v = world_vertices(obj)
        positions.extend(v.tolist())
        faces.extend([tuple(int(i) + offset for i in p.vertices) for p in obj.data.polygons])
        offset+=len(v)
    proxy=bpy.data.meshes.new('UV unwrap')
    proxy.from_pydata(positions,[],faces)
    proxy.update()
    assert len(proxy.loops)==sum(counts)
    tmp=bpy.data.objects.new('UV unwrap',proxy)
    bpy.context.collection.objects.link(tmp)
    bpy.ops.object.select_all(action='DESELECT');tmp.select_set(True);bpy.context.view_layer.objects.active=tmp
    proxy.uv_layers.new(name='Atlas')
    bpy.ops.object.mode_set(mode='EDIT');bpy.ops.mesh.select_all(action='SELECT')
    # Smart projection groups coplanar faces into charts; angular joints split
    # where a baked shade discontinuity is optically inexpensive.
    bpy.ops.uv.smart_project(angle_limit=math.radians(69), island_margin=0.0,correct_aspect=False,scale_to_bounds=False)
    # Axis aligned chart boxes guarantee that independent islands never overlap.
    # 'FRACTION' is measured in final UV space, matching the bake dilation.
    bpy.ops.uv.select_all(action='SELECT')
    bpy.ops.uv.pack_islands(rotate=True,rotate_method='CARDINAL',scale=True,shape_method='AABB',margin_method='FRACTION',margin=3.0/resolution)
    bpy.ops.object.mode_set(mode='OBJECT')
    coords=np.empty(len(proxy.loops)*2,dtype='f4');proxy.uv_layers.active.data.foreach_get('uv',coords)
    coords=coords.reshape(-1,2)
    assert np.isfinite(coords).all()
    # Smart projection alone would leave charts touching at exactly 0 and 1.
    assert coords.min()>.8/resolution and coords.max()<1-.8/resolution, (group,coords.min(),coords.max())
    bpy.data.objects.remove(tmp,do_unlink=True);bpy.data.meshes.remove(proxy)
    if cache:
        cache.parent.mkdir(parents=True,exist_ok=True)
        np.savez_compressed(cache,uvs=coords,names=np.array([o.name for o in ordered]),counts=np.array(counts))
    apply_cached(ordered,counts,coords)
    print('UNWRAPPED',group, len(ordered),sum(counts),'loops',round(time.monotonic()-start,1),'sec',flush=True)


def apply_cached(ordered,counts,coords):
    offset=0
    for obj,count in zip(ordered,counts):
        layer=obj.data.uv_layers.get('UV_Bake') or obj.data.uv_layers.new(name='UV_Bake')
        layer.data.foreach_set('uv',np.ascontiguousarray(coords[offset:offset+count].reshape(-1)))
        obj.data.uv_layers.active=layer
        layer.active_render=True
        offset+=count


def visible_batches(objects):
    groups={key:[] for key in ('architecture','atelier','lounge')}
    for obj in objects:
        if obj.type=='MESH' and not inside_shell(obj):groups[atlas_name(obj)].append(obj)
    return groups


if __name__=='__main__':
    import sys
    args=sys.argv[sys.argv.index('--')+1:]
    bpy.ops.wm.read_factory_settings(use_empty=True)
    bpy.ops.import_scene.fbx(filepath=args[0],use_anim=False)
    batches=visible_batches(list(bpy.context.scene.objects))
    for group,batch in batches.items():
        assign_atlas_uv(batch,group,args[1],2048)
