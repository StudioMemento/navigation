"""StudioWeb, photographic practical lights for the original STUDIO_WEB.fbx.

Call build_lighting(list(bpy.context.scene.objects)) after importing the FBX, before
removing the architectural cutaway. Cycles uses these lights for the offline bake.
Distances are in imported world metres. Light.energy is radiant power in Blender
watts, not the electrical rating of a fixture. Photometric values are estimates.
"""
from collections import defaultdict
from math import atan2, radians

import bpy
from mathutils import Matrix, Vector


COLLECTION = 'StudioWeb | bake lights'
GENERATOR = 'StudioWeb / physical rig v1'


def _blackbody(kelvin):
    """Approximate Planckian-locus xy -> scene-linear Rec.709, normalized to peak 1."""
    t = max(1667.0, min(25000.0, float(kelvin)))
    if t <= 4000:
        x = -.2661239e9 / t**3 - .2343580e6 / t**2 + .8776956e3 / t + .179910
    else:
        x = -3.0258469e9 / t**3 + 2.1070379e6 / t**2 + .2226347e3 / t + .240390
    if t <= 2222:
        y = -1.1063814*x**3 - 1.34811020*x*x + 2.18555832*x - .20219683
    elif t <= 4000:
        y = -.9549476*x**3 - 1.37418593*x*x + 2.09137015*x - .16748867
    else:
        y = 3.081758*x**3 - 5.8733867*x*x + 3.75112997*x - .37001483
    X, Z = x/y, (1-x-y)/y
    rgb = (3.2404542*X - 1.5371385 - .4985314*Z,
           -.9692660*X + 1.8760108 + .0415560*Z,
           .0556434*X - .2040259 + 1.0572252*Z)
    peak = max(rgb)
    return tuple(max(0.0, v/peak) for v in rgb)


def _vertices(obj):
    return [obj.matrix_world @ v.co for v in obj.data.vertices]


def _bounds(points):
    lower = Vector(tuple(min(p[i] for p in points) for i in range(3)))
    upper = Vector(tuple(max(p[i] for p in points) for i in range(3)))
    return lower, upper, (lower + upper) * .5, upper - lower


def _components(obj):
    """Connected mesh components after welding only coincident UV-seam positions."""
    points = _vertices(obj)
    parents = list(range(len(points)))
    def root(i):
        while i != parents[i]:
            parents[i] = parents[parents[i]]
            i = parents[i]
        return i
    by_position = {}
    for i, p in enumerate(points):
        key = tuple(round(n, 5) for n in p)
        if key in by_position:
            parents[root(i)] = root(by_position[key])
        by_position[key] = i
    for edge in obj.data.edges:
        a, b = edge.vertices
        parents[root(a)] = root(b)
    groups = defaultdict(list)
    for i, p in enumerate(points):
        groups[root(i)].append(p)
    return sorted(groups.values(), key=lambda g: tuple(_bounds(g)[2]))


def _flat_normal(obj):
    transform = obj.matrix_world.to_3x3().inverted().transposed()
    return (transform @ max(obj.data.polygons, key=lambda p: p.area).normal).normalized()


def _rdp(points, tolerance):
    """Coalesce the two close rails of a curved extrusion into short line emitters."""
    if len(points) < 3:
        return points
    start, end = points[0], points[-1]
    segment = end - start
    index = 0
    error = 0
    for i in range(1, len(points)-1):
        delta = points[i] - start
        t = min(1.0, max(0.0, delta.dot(segment)/max(segment.length_squared, 1.e-12)))
        distance = (delta-segment*t).length
        if distance > error:
            index, error = i, distance
    if error <= tolerance:
        return [start, end]
    return _rdp(points[:index+1], tolerance)[:-1] + _rdp(points[index:], tolerance)


def _orient(light, direction, width_axis=(1, 0, 0)):
    # Blender emits along local -Z; preserve the physical extrusion's long axis.
    z = -Vector(direction).normalized()
    x = Vector(width_axis)
    x -= z * x.dot(z)
    if x.length_squared < 1.e-8:
        x = z.orthogonal()
    x.normalize()
    y = z.cross(x).normalized()
    light.rotation_euler = Matrix((x, y, z)).transposed().to_euler()


class _Rig:
    def __init__(self):
        scene = bpy.context.scene
        collection = bpy.data.collections.get(COLLECTION)
        if collection is None:
            collection = bpy.data.collections.new(COLLECTION)
            scene.collection.children.link(collection)
        for ob in list(collection.objects):
            if ob.get('generator') == GENERATOR:
                data = ob.data
                bpy.data.objects.remove(ob, do_unlink=True)
                if data.users == 0:
                    bpy.data.lights.remove(data)
        self.collection = collection
        self.entries = []

    def area(self, source, label, position, direction, width, height, watts, kelvin,
             *, width_axis=(1,0,0), rgb=None, spread=165):
        data = bpy.data.lights.new(label, 'AREA')
        data.energy = watts
        data.color = rgb if rgb is not None else _blackbody(kelvin)
        data.shape = 'DISK' if height is None else 'RECTANGLE'
        data.size = width
        if height is not None:
            data.size_y = height
        data.spread = radians(spread)
        light = bpy.data.objects.new(label, data)
        self.collection.objects.link(light)
        light.location = position
        _orient(light, direction, width_axis)
        light['generator'] = GENERATOR
        light['fbx_source'] = source
        if kelvin is not None:
            light['estimated_CCT_K'] = kelvin
        self.entries.append({
            'source':source, 'light':label, 'distribution':data.shape.lower(),
            'position_m':[round(v,5) for v in position],
            'direction':[round(v,5) for v in Vector(direction).normalized()],
            'width_m':round(width,5), 'height_m':None if height is None else round(height,5),
            'power_W':round(watts,4), 'estimated_CCT_K':kelvin,
            'linear_RGB':[round(float(c),4) for c in data.color], 'spread_degrees':spread
        })

    def radial(self, source, label, position, radius, watts, kelvin,
               *, direction=None, angle=None, softness=.5):
        kind = 'POINT' if direction is None else 'SPOT'
        data = bpy.data.lights.new(label, kind)
        data.energy = watts
        data.color = _blackbody(kelvin)
        data.shadow_soft_size = radius
        data.use_soft_falloff = True
        light = bpy.data.objects.new(label, data)
        self.collection.objects.link(light)
        light.location = position
        if direction is not None:
            _orient(light, direction)
            data.spot_size = radians(angle)
            data.spot_blend = softness
        light['generator'] = GENERATOR
        light['fbx_source'] = source
        light['estimated_CCT_K'] = kelvin
        self.entries.append({
            'source':source, 'light':label, 'distribution':kind.lower(),
            'position_m':[round(v,5) for v in position],
            'direction':None if direction is None else [round(v,5) for v in Vector(direction).normalized()],
            'width_m':round(2*radius,5), 'height_m':None,
            'power_W':watts, 'estimated_CCT_K':kelvin,
            'linear_RGB':[round(float(c),4) for c in data.color],
            'spread_degrees':360 if angle is None else angle})


def build_lighting(objects):
    supplied = list(objects.values()) if hasattr(objects, 'values') else list(objects)
    meshes = {ob.name:ob for ob in supplied if ob.type == 'MESH'}
    existing = [ob.name for ob in supplied if ob.type == 'LIGHT' and ob.get('generator') != GENERATOR]
    bpy.context.view_layer.update()
    rig = _Rig()
    def bounds(name):
        return _bounds(_vertices(meshes[name]))
    area = rig.area

    # The FBX holds two mesh objects, each actually containing three disc downlights.
    for name, cct, energy in [('LUCI_CEILING_SX',3275,6.8), ('LUCI_CEILING_DX',3700,5.6)]:
        for i, part in enumerate(_components(meshes[name]), 1):
            lo, hi, c, d = _bounds(part)
            area(name, f'Ceiling / {name[-2:]} {i}', c + Vector((0,0,-.004)),
                 (0,0,-1), max(d.x,d.y), None, energy, cct, spread=125)

    # The softbox has a slightly tilted octagonal diffuser, measured on the FBX.
    name = 'LUCE_SOFTBOX_PROGETTAZIONE'
    lo, hi, c, d = bounds(name)
    normal = _flat_normal(meshes[name])
    area(name, 'Design / octagonal softbox', c + normal*.006, normal,
         .5*(d.x+d.y), None, 25.0, 4650, spread=112)

    # The little four-faced design light is an illuminated fabric column.
    name = 'LUCE_LAMPADA_PROGETTAZIONE'
    lo, hi, c, d = bounds(name)
    for label, direction, power in [('desk',(1,0,0),4.3),('coffee',(0,-1,0),3.7),('shelf',(0,1,0),2.0)]:
        v = Vector(direction)
        area(name, 'Design / linen '+label, c+v*(d.x*.5+.005), v,
             d.x*.90, d.z*.89, power, 3150, width_axis=v.cross(Vector((0,0,1))))

    # Use the open top and bottom of the real tapered shade. Emission on its fabric
    # supplies the side transmission. Area source geometry remains outside the cover.
    name = 'LUCE_LAMPADA_SALOTTO'
    lo, hi, c, d = bounds(name)
    area(name, 'Lounge / shade uplight', (c.x,c.y,hi.z+.003), (0,0,1), d.x*.79, None, 11.,2790,spread=142)
    area(name, 'Lounge / shade downlight',(c.x,c.y,lo.z-.003), (0,0,-1), d.x*.90, None, 16.,2790,spread=145)
    side = Vector((-.76,.65,0)).normalized()
    area(name, 'Lounge / linen diffusion', c+side*(d.x*.50+.003), side,
         d.x*.74, d.z*.86, 5.0, 2925, width_axis=(side.y,-side.x,0))

    # Compact floor uplighter tilts toward the lounge wall. The two authored faces
    # have a common normal; use that direction rather than guessing a cone angle.
    name = 'LUCE_FARETTO'
    lo, hi, c, d = bounds(name)
    n = _flat_normal(meshes[name])
    rig.radial(name, 'Lounge / floor spot', c+n*.009, min(d.x,d.y)*.37, 2.6, 3000,
               direction=n, angle=76, softness=.57)
    name = 'LAMPADA_SALE'
    lo, hi, c, d = bounds(name)
    # The finite-radius source matches the outer, diffusing crystal. The front
    # and rear lobes supplement its flattened sides after geometry batching.
    rig.radial(name, 'Bar / diffused salt crystal', c, max(d)*.53, 2.8, 1930)
    for label, boundary, sign, power in [('room',hi.y,1,1.4), ('wall',lo.y,-1,.88)]:
        area(name, 'Bar / salt '+label,(c.x,boundary+sign*.003,c.z),(0,sign,-.25),
             d.x*.80,d.z*.76,power,1900)

    # The four-metre workstation LED turns the corner. Use both actual legs of
    # the extrusion. One lobe grazes the wall and a second illuminates the floor.
    name = 'LED_WORKSTATION'; lo, hi, c, d = bounds(name)
    y, x, z = hi.y-.007, hi.x-.004, hi.z+.014
    area(name,'Workstations / floor wash',(c.x,y-.012,z),(0,-.80,-.22),d.x,.016,3.8*d.x,2450)
    area(name,'Workstations / skirting',(c.x,y-.022,z+.005),(0,.22,.93),d.x,.014,2.1*d.x,2500)
    area(name,'Workstations / return',(x-.016,c.y,z),(-1,0,-.22),d.y,.014,3.1*d.y,2450,width_axis=(0,1,0))
    name = 'LED_SCRIVANIE'
    for i, part in enumerate(_components(meshes[name]),1):
        lo, hi, c, d = _bounds(part)
        area(name,f'Workstations / desk cove {i}',(c.x,hi.y+.004,hi.z+.004),(0,.39,.86),
             d.x,.014,5.7*d.x,3060)

    # Follow the lounge wall's curved LED from the actual mesh vertices. Rays
    # travel into the room and fall across the floor, avoiding unattached hotspots.
    name = 'LED_SALOTTO'; points = _vertices(meshes[name]); lo, hi, c, d = _bounds(points)
    top = [v for v in points if abs(v.z-hi.z)<.001]
    pole = Vector((c.x+.39,c.y+.44,hi.z))
    top.sort(key=lambda v: atan2(v.y-pole.y, v.x-pole.x))
    path = _rdp(top,.026)
    for i, (start,end) in enumerate(zip(path,path[1:]),1):
        line = end-start
        if line.length < .065:
            continue
        v = Vector((-line.y,line.x,0)).normalized()
        origin = (start+end)*.5 + v*.010 + Vector((0,0,.014))
        area(name,f'Lounge / curved skirting {i}',origin,v+Vector((0,0,-.18)),
             line.length,.013,1.55*line.length,2475,width_axis=line)

    # Edge-mounted TV bias lights. The authored rear mesh falls inside the panel
    # body along Y. Shift the sample outward to the casing's rear edge so its rays
    # can reach the wall. Copper and muted indigo follow the supplied wallpaper.
    name = 'LED_TV'; lo, hi, c, d = bounds(name)
    _, housing_hi, _, _ = bounds('POSTAZIONE_PS5_TV55 TV_55')
    back_y = max(c.y, housing_hi.y + .002)
    orange=(1.0,.102,.017); violet=(.20,.12,.63)
    for label, sign, tint, energy in [('copper',-1,orange,2.75),('indigo',1,violet,2.25)]:
        area(name,'TV / '+label+' side',(c.x+sign*(d.x*.5+.003),back_y,c.z),
             (sign*.93,.37,0),d.z*.90,.014,energy,None,width_axis=(0,0,1),rgb=tint)
        area(name,'TV / '+label+' crown',(c.x+d.x*.24*sign,back_y,hi.z+.004),
             (0,.41,.92),d.x*.48,.014,energy*.56,None,rgb=tint)

    name = 'TYPO_LED'; lo,hi,c,d = bounds(name)
    area(name,'Shelves / Good Vibes front',(hi.x+.005,c.y,c.z),(1,0,-.13),
         d.y,d.z,.54,4450,width_axis=(0,1,0))
    area(name,'Shelves / Good Vibes return',(lo.x-.004,c.y,c.z),(-1,0,.12),
         d.y*.94,d.z*.83,.36,4550,width_axis=(0,1,0))

    # The left tower glows amber. The right white enclosure and fans are cool.
    for name, cct, power in [('PC_NURU',2150,2.2),('PC_GIAN',7600,3.1)]:
        lo,hi,c,d = bounds(name)
        area(name,'Hardware / '+name,(c.x,lo.y-.002,c.z),(.03,-1,-.30),
             d.x*.80,d.z*.77,power,cct)

    # Low-output pilot LEDs: treat the PS5 logo and each physically separated
    # loudspeaker pair as small diffuse apertures rather than a room-filling lamp.
    name='LED_PS5'; lo,hi,c,d = bounds(name)
    area(name,'Hardware / console indicator',(c.x,lo.y-.002,c.z),(0,-1,0),
         d.x,d.z,.008,6900)
    name='LUCI_CASSE'
    groups = _components(meshes[name]); parts = [_bounds(g) for g in groups]
    for i, center_x in enumerate(sorted(set(round(part[2].x,2) for part in parts)),1):
        members = [p for p in parts if abs(p[2].x-center_x)<.015]
        lo,hi,c,d = _bounds([v for part in members for v in part[:2]])
        area(name,f'Hardware / speaker indicator {i}',(c.x,lo.y-.001,c.z),(0,-1,-.16),
             d.x,d.z,.018,6000)

    # Exterior light entering through the two x-facing entrance panes is cool
    # and broad. Put each source just inside its pane to preserve daylight even
    # in a full architectural bake with the glazed door or blind in place.
    name = 'VETRO_PORTA'
    for i, part in enumerate(_components(meshes[name]),1):
        lo,hi,c,d = _bounds(part)
        area(name,f'Entrance / daylight {i}',(lo.x-.012,c.y,c.z+.10),(-1,-.09,-.22),
             d.y*.94,d.z*.88,51.0*d.y*d.z,7100,width_axis=(0,1,0))

    scene = bpy.context.scene
    world = bpy.data.worlds.get('StudioWeb / diffuse room fill') or bpy.data.worlds.new('StudioWeb / diffuse room fill')
    world.use_nodes = True
    bg = world.node_tree.nodes.get('Background') or world.node_tree.nodes.new('ShaderNodeBackground')
    out = world.node_tree.nodes.get('World Output') or world.node_tree.nodes.new('ShaderNodeOutputWorld')
    if not out.inputs['Surface'].is_linked:
        world.node_tree.links.new(bg.outputs['Background'],out.inputs['Surface'])
    bg.inputs['Color'].default_value=(.82,.875,1.,1.)
    bg.inputs['Strength'].default_value=.16
    scene.world = world
    return {'native_fbx_lights':existing, 'method':'Cycles area, finite-radius point and soft spot sources at imported physical fixture geometry; source geometry in Blender world metres',
            'photometry':'Estimated optical wattage, beam spreads and approximate colour temperatures from studio photographs. TV RGB bias is artist-matched in scene-linear Rec.709.',
            'falloff':'Cycles inverse-square integration over each emitting aperture',
            'world':{'linear_RGB':[.82,.875,1.0], 'strength':.16},
            'light_count':len(rig.entries), 'lights':rig.entries}
