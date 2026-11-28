"""Bake the StudioWeb cutaway with Cycles, then export its lighted, mobile-ready atlas meshes.

Run under Blender 4.3+, passing the source FBX, supplied screen assets and original role JSON.
All authored surface/lighting nodes are evaluated offline. Export uses display-referred sRGB
so neither ambient lights nor a second tone mapping pass should be applied by the web viewer.
"""
import argparse
from pathlib import Path
import hashlib
import json
import math
import os
import struct
import sys
import time
import bpy
import numpy as np
from mathutils import Vector
from PIL import Image

HERE=Path(__file__).resolve().parent
sys.path.insert(0,str(HERE))
from bake_atlas import assign_atlas_uv, inside_shell, visible_batches


def args_for_blender():
    p=argparse.ArgumentParser(description=__doc__)
    p.add_argument('--fbx',type=Path,required=True)
    p.add_argument('--roles',type=Path,required=True)
    p.add_argument('--screens',type=Path,required=True)
    p.add_argument('--out',type=Path,required=True)
    p.add_argument('--cache',type=Path,required=True)
    p.add_argument('--resolution',type=int,default=2048)
    p.add_argument('--samples',type=int,default=80)
    p.add_argument('--exposure',type=float,default=0)
    p.add_argument('--review',action='store_true',help='Render the authored source as a comparison.')
    p.add_argument('--prototype',action='store_true',help='Diagnostic, deliberately uses neutral stand-in materials; never publish its outputs.')
    p.add_argument('--reuse-radiance',action='store_true',help='Regrade a completed EXR bake with identical materials, UV and lamps.')
    return p.parse_args(sys.argv[sys.argv.index('--')+1:])


def select(items):
    bpy.ops.object.select_all(action='DESELECT')
    for ob in items:ob.select_set(True)
    bpy.context.view_layer.objects.active=items[0]


def make_camera():
    data=bpy.data.cameras.new('Studio orthographic camera');data.type='ORTHO';data.ortho_scale=10.05
    ob=bpy.data.objects.new('Studio orthographic camera',data);bpy.context.collection.objects.link(ob)
    ob.location=(9,-11,8.16)
    ob.rotation_euler=(Vector((0,.48,1.28))-ob.location).to_track_quat('-Z','Y').to_euler()
    bpy.context.scene.camera=ob
    return ob


def setup_source(args):
    bpy.ops.wm.read_factory_settings(use_empty=True)
    bpy.ops.import_scene.fbx(filepath=str(args.fbx),use_anim=False)
    objects=list(bpy.context.scene.objects)
    for ob in objects:
        ob.hide_set(False);ob.hide_render=False;ob.hide_viewport=False
        if ob.type=='MESH' and ob.data.users>1:ob.data=ob.data.copy()
    scene=bpy.context.scene
    scene.render.engine='CYCLES';scene.cycles.device='CPU';scene.cycles.samples=args.samples
    scene.cycles.use_denoising=False;scene.cycles.use_preview_denoising=False
    scene.cycles.use_adaptive_sampling=True;scene.cycles.adaptive_threshold=.025;scene.cycles.adaptive_min_samples=min(36,args.samples)
    scene.cycles.max_bounces=5;scene.cycles.diffuse_bounces=3;scene.cycles.glossy_bounces=2;scene.cycles.transmission_bounces=2
    scene.cycles.transparent_max_bounces=4;scene.cycles.sample_clamp_indirect=3.0
    scene.render.film_transparent=True
    scene.view_settings.view_transform='AgX';scene.view_settings.look='AgX - Medium High Contrast';scene.view_settings.exposure=args.exposure
    scene.render.image_settings.color_mode='RGBA';scene.render.image_settings.color_depth='8'
    scene.world=bpy.data.worlds.new('Studio world');scene.world.use_nodes=True
    if args.prototype:
        for ob in objects:
            if ob.type!='MESH':continue
            m=bpy.data.materials.new(ob.name);m.use_nodes=True
            p=m.node_tree.nodes.get('Principled BSDF');p.inputs['Base Color'].default_value=(.24,.24,.24,1);p.inputs['Roughness'].default_value=.65
            ob.data.materials.clear();ob.data.materials.append(m)
        world=scene.world.node_tree.nodes['Background'];world.inputs['Color'].default_value=(.14,.16,.22,1);world.inputs['Strength'].default_value=.4
        light_data=bpy.data.lights.new('Prototype key','AREA');light_data.energy=230;light_data.shape='DISK';light_data.size=1.6
        lamp=bpy.data.objects.new('Prototype key',light_data);bpy.context.collection.objects.link(lamp);lamp.location=(2,-3,3);lamp.rotation_euler=(Vector((0,0,0))-lamp.location).to_track_quat('-Z','Y').to_euler()
        light_report={};surface_report={}
    else:
        # Allows the authoring kit and bake scripts to live in separate folders.
        if (args.screens.parent/'surface_materials.py').is_file():
            sys.path.insert(0,str(args.screens.parent))
        from surface_materials import apply_materials
        from studio_lighting import build_lighting
        surface_report=apply_materials(objects,args.screens,args.roles)
        light_report=build_lighting(objects)
    batches=visible_batches(objects)
    # The roof/front and its attached trim are authored as interior-only geometry.
    # The ceiling LEDs keep their real photometric positions in the local-light rig.
    for ob in objects:
        if inside_shell(ob) and ob.type=='MESH':
            ob.hide_render=True;ob.hide_set(True)
    scene.view_settings.exposure=args.exposure
    bpy.context.view_layer.update()
    return scene,batches,surface_report,light_report


def make_batches(groups,args):
    joined={}
    for group,objects in groups.items():
        # Pack for the production atlas; this mapping stays identical for review bakes.
        assign_atlas_uv(objects,group,args.cache,2048)
        select(objects)
        if len(objects)>1:bpy.ops.object.join()
        ob=bpy.context.view_layer.objects.active
        # Preserve its world placement independently of the original FBX parent.
        world=ob.matrix_world.copy();ob.parent=None;ob.matrix_world=world
        # FBX normals are Y-up in the centimetre object frame. Box projection
        # uses local normals to choose a plane; our PBR coordinates are world
        # metres. Applying the transform makes floors sample XY, walls XZ/YZ.
        select([ob]);bpy.ops.object.transform_apply(location=True,rotation=True,scale=True)
        assert np.allclose(np.array(ob.matrix_world),np.eye(4),atol=1.e-5)
        ob.name='StudioWeb '+group
        ob.data.name=ob.name
        joined[group]=ob
    bpy.context.view_layer.update()
    return joined


def target_nodes(mesh,image):
    for material in list(dict.fromkeys(mesh.data.materials)):
        if not material:continue
        assert material.use_nodes,material.name
        nodes=material.node_tree.nodes
        node=nodes.get('UV bake output target') or nodes.new('ShaderNodeTexImage')
        node.name='UV bake output target';node.image=image;node.select=True;nodes.active=node


def render_preview(scene,path,ortho=10.05,width=1280,height=850):
    original=(scene.cycles.samples,scene.render.resolution_x,scene.render.resolution_y,scene.render.filepath)
    scene.camera.data.ortho_scale=ortho
    scene.render.resolution_x=width;scene.render.resolution_y=height;scene.render.resolution_percentage=100
    scene.render.image_settings.file_format='PNG';scene.render.image_settings.color_mode='RGBA';scene.render.image_settings.color_depth='8'
    scene.render.filepath=str(path);bpy.ops.render.render(write_still=True)
    scene.cycles.samples,scene.render.resolution_x,scene.render.resolution_y,scene.render.filepath=original


def new_bake_image(group,n):
    image=bpy.data.images.new('Radiance '+group,n,n,alpha=True,float_buffer=True)
    image.colorspace_settings.name='Linear Rec.709';image.alpha_mode='STRAIGHT'
    return image


def write_lighted_texture(image, scene, path, group, production, guides=None):
    """Store the graded radiance for display. Extend mip borders beyond actual UV islands."""
    from scipy.ndimage import distance_transform_edt
    w,h=image.size
    pixels=np.empty(w*h*4,dtype=np.float32);image.pixels.foreach_get(pixels);pixels=pixels.reshape(h,w,4)
    valid=pixels[:,:,3]>.01
    coverage=float(valid.mean())
    assert np.any(valid),f'Empty baked UV map: {group}'
    assert np.percentile(pixels[:,:,:3][valid],92)>.001,f'Dark/empty bake: {group}'
    if guides:
        from bake_filter import denoise_radiance
        denoise_radiance(pixels,valid,*guides)
    # Extend colors through empty texels before mip generation. This does not
    # blur adjacent charts or introduce a black line around their boundaries.
    if np.any(~valid):
        iy,ix=distance_transform_edt(~valid,return_distances=False,return_indices=True)
        pixels[~valid,:3]=pixels[iy[~valid],ix[~valid],:3]
    pixels[:,:,3]=1
    image.pixels.foreach_set(np.ascontiguousarray(pixels).reshape(-1));image.update()
    scene.render.image_settings.file_format='PNG';scene.render.image_settings.color_depth='8';scene.render.image_settings.color_mode='RGB'
    scene.render.dither_intensity=.65
    tmp=path.with_suffix('.png');image.save_render(str(tmp),scene=scene)
    packed=Image.open(tmp).convert('RGB');packed.save(path,'WEBP',quality=94 if production else 90,method=6)
    tmp.unlink()
    return {'size':[w,h],'coveredWithDilation':round(coverage,4),'gradedTexture':path.name,'bytes':path.stat().st_size}


def bake_page(scene,group,obj,args):
    version='v7-world-receivers'
    full_exr=args.cache/f'radiance-{version}-{group}-{args.resolution}-{args.samples}{"-standin" if args.prototype else ""}.exr'
    started=time.monotonic()
    if args.reuse_radiance and full_exr.is_file():
        image=bpy.data.images.load(str(full_exr),check_existing=False)
        image.alpha_mode='STRAIGHT'
    else:
        image=new_bake_image(group,args.resolution)
        target_nodes(obj,image);select([obj])
        # Combined includes the colored diffuse BRDF, local direct irradiance,
        # indirect response and mesh emissions, plus the material's broad specular lobe.
        scene.render.bake.use_clear=True;scene.render.bake.use_selected_to_active=False
        scene.render.bake.margin_type='EXTEND';scene.render.bake.margin=max(1,round(3*args.resolution/2048))
        uv_layer='UV_Bake'
        print('BAKING',group,args.resolution,args.samples,flush=True)
        result=bpy.ops.object.bake(type='COMBINED',uv_layer=uv_layer,pass_filter={'DIRECT','INDIRECT','DIFFUSE','GLOSSY','TRANSMISSION','EMIT'},target='IMAGE_TEXTURES')
        assert 'FINISHED' in result,result
        image.file_format='OPEN_EXR';image.filepath_raw=str(full_exr);image.save()
    guides=None
    if not args.prototype and args.resolution>=1024:
        from bake_filter import bake_guides
        guides=bake_guides(scene,obj,args.cache,group,args.resolution,args.reuse_radiance,target_nodes,select)
    path=args.cache/f'{group}-{args.resolution}.webp'
    metrics=write_lighted_texture(image,scene,path,group,not args.prototype,guides)
    bpy.data.images.remove(image)
    metrics['seconds']=round(time.monotonic()-started,1)
    print('BAKED',group,metrics,flush=True)
    return path,metrics


def unlit(name,image,uv_name):
    material=bpy.data.materials.new(name);material.use_nodes=True
    nodes=material.node_tree.nodes;nodes.clear();links=material.node_tree.links
    out=nodes.new('ShaderNodeOutputMaterial');emission=nodes.new('ShaderNodeEmission');tex=nodes.new('ShaderNodeTexImage');uv=nodes.new('ShaderNodeUVMap')
    tex.image=image;tex.interpolation='Linear';tex.extension='EXTEND';uv.uv_map=uv_name
    links.new(uv.outputs['UV'],tex.inputs['Vector']);links.new(tex.outputs['Color'],emission.inputs['Color']);links.new(emission.outputs['Emission'],out.inputs['Surface'])
    return material


def replace_baked_materials(joined,paths,screens):
    screen_mats={}
    for group,obj in joined.items():
        view=bpy.data.images.load(str(paths[group]),check_existing=False);view.colorspace_settings.name='sRGB'
        mat=unlit('Baked | '+group,view,'UV_Bake')
        previous=list(obj.data.materials);starts=np.empty(len(obj.data.polygons),dtype=np.int32);obj.data.polygons.foreach_get('material_index',starts)
        targets=[mat];remap=[]
        for m in previous:
            kind=m.get('studio_screen') if m else None
            if kind:
                if kind not in screen_mats:
                    image=bpy.data.images.load(str(screens/(kind+'.webp')),check_existing=True);image.colorspace_settings.name='sRGB'
                    screen_mats[kind]=unlit('Display | '+kind,image,'UV_Display')
                mapped=screen_mats[kind]
                if mapped not in targets:targets.append(mapped)
                remap.append(targets.index(mapped))
            else:remap.append(0)
        obj.data.materials.clear()
        for m in targets:obj.data.materials.append(m)
        obj.data.polygons.foreach_set('material_index',np.array(remap,dtype=np.int32)[starts]);obj.data.update()


def write_unlit_glb(joined,paths,screen_dir,out):
    """One indexed primitive per atlas or display type. Each has one UV channel.

    Export only web attributes in world space. Keep the two portrait surfaces
    and curved ultrawides identifiable as distinct authored display panels via
    the five continuous islands and a shared texture per orientation.
    """
    from collections import defaultdict
    root={'asset':{'version':'2.0','generator':'StudioWeb / Blender Cycles'},'extensionsUsed':['KHR_materials_unlit','EXT_texture_webp'],'extensionsRequired':['EXT_texture_webp'],'scenes':[{'nodes':[]}],'scene':0,'nodes':[],'meshes':[],'materials':[],'textures':[],'images':[],'samplers':[{'magFilter':9729,'minFilter':9987,'wrapS':33071,'wrapT':33071}],'buffers':[],'bufferViews':[],'accessors':[]}
    blob=bytearray()
    def pack_bin(data,target=None):
        blob.extend(b'\0'*(-len(blob)%4));offset=len(blob);blob.extend(data);view={'buffer':0,'byteOffset':offset,'byteLength':len(data)}
        if target:view['target']=target
        idx=len(root['bufferViews']);root['bufferViews'].append(view);return idx
    def accessor(data,kind,component_type,target,bounds=False,normalized=False):
        count=len(data);view=pack_bin(np.ascontiguousarray(data).tobytes(),target);acc={'bufferView':view,'componentType':component_type,'count':count,'type':kind}
        if normalized:acc['normalized']=True
        if bounds:acc.update(min=data.min(axis=0).tolist(),max=data.max(axis=0).tolist())
        idx=len(root['accessors']);root['accessors'].append(acc);return idx
    image_ids={}; specs={}
    display_nodes=[]
    for group,ob in joined.items():
        mesh=ob.data;mesh.calc_loop_triangles(); triangles=mesh.loop_triangles
        polygons=np.empty(len(triangles),dtype='i4');triangles.foreach_get('polygon_index',polygons)
        tri_loops=np.empty(len(triangles)*3,dtype='i4');triangles.foreach_get('loops',tri_loops);tri_loops=tri_loops.reshape(-1,3)
        slot=np.empty(len(mesh.polygons),dtype='i4');mesh.polygons.foreach_get('material_index',slot)
        lidx=np.empty(len(mesh.loops),dtype='i4');mesh.loops.foreach_get('vertex_index',lidx)
        vertices=np.empty(len(mesh.vertices)*3,dtype='f4');mesh.vertices.foreach_get('co',vertices)
        mat=np.asarray(ob.matrix_world,dtype='f4');verts=vertices.reshape(-1,3)@mat[:3,:3].T+mat[:3,3]
        verts=verts[:,[0,2,1]];verts[:,2]*=-1
        # The Blender-to-glTF map above preserves winding. A reflected source
        # object requires its own winding flip, since we now apply its transform.
        if np.linalg.det(mat[:3,:3])<0:tri_loops=tri_loops[:,[0,2,1]]
        for mat_index,material in enumerate(mesh.materials):
            selected=slot[polygons]==mat_index
            if not np.any(selected):continue
            display=material.name.startswith('Display | ')
            if display:
                key=material.name.split(' | ',1)[1];path=screen_dir/(key+'.webp');uv_name='UV_Display';display_nodes.append({'kind':key,'triangles':int(selected.sum())})
            else:key=group;path=paths[group];uv_name='UV_Bake'
            if key not in image_ids:
                material_idx=len(root['materials']);image_ids[key]=material_idx
                root['images'].append({'name':key,'bufferView':pack_bin(path.read_bytes()),'mimeType':'image/webp'})
                root['textures'].append({'sampler':0,'extensions':{'EXT_texture_webp':{'source':material_idx}}})
                root['materials'].append({'name':material.name,'extensions':{'KHR_materials_unlit':{}},'pbrMetallicRoughness':{'baseColorTexture':{'index':material_idx},'metallicFactor':0,'roughnessFactor':1},'doubleSided':True,'extras':{'role':'display' if display else 'baked','display':key if display else None}})
            material_idx=image_ids[key]
            uv=np.empty(len(mesh.loops)*2,dtype='f4');mesh.uv_layers[uv_name].data.foreach_get('uv',uv);uv=uv.reshape(-1,2)
            loops=tri_loops[selected].ravel();p=verts[lidx[loops]].astype('<f4');t=uv[loops].copy();t[:,1]=1-t[:,1]
            p[np.abs(p)<1.e-7]=0
            # Collapse duplicate UV-chart vertices after normal-independent shading.
            packed=np.empty((len(loops),5),dtype='<f4');packed[:,:3]=p;packed[:,3:]=t
            unique,rev=np.unique(packed.view(np.dtype((np.void,20))).ravel(),return_inverse=True)
            unique=unique.view('<f4').reshape(-1,5);reverse=np.ravel(rev)
            q=np.rint(np.clip(unique[:,3:],0,1)*65535).astype('<u2')
            ixdt='<u2' if len(unique)<=65535 else '<u4';ic=5123 if ixdt=='<u2' else 5125
            pos=accessor(unique[:,:3],'VEC3',5126,34962,bounds=True);uvi=accessor(q,'VEC2',5123,34962,normalized=True);ind=accessor(reverse.astype(ixdt),'SCALAR',ic,34963)
            prim={'attributes':{'POSITION':pos,'TEXCOORD_0':uvi},'indices':ind,'material':material_idx}
            mesh_index=len(root['meshes']);root['meshes'].append({'name':material.name,'primitives':[prim]});node_idx=len(root['nodes']);root['nodes'].append({'name':material.name,'mesh':mesh_index});root['scenes'][0]['nodes'].append(node_idx)
            specs[material.name]={'triangles':len(loops)//3,'vertices':len(unique),'texture':key,'bounds':[unique[:,:3].min(axis=0).tolist(),unique[:,:3].max(axis=0).tolist()]}
    root['buffers']=[{'byteLength':len(blob)}];blob.extend(b'\0'*(-len(blob)%4));doc=json.dumps(root,separators=(',',':'),ensure_ascii=False).encode('utf-8');doc+=b' '*(-len(doc)%4)
    out.write_bytes(struct.pack('<III',0x46546c67,2,28+len(doc)+len(blob))+struct.pack('<I4s',len(doc),b'JSON')+doc+struct.pack('<I4s',len(blob),b'BIN\0')+blob)
    return specs


def main():
    args=args_for_blender();args.out.mkdir(parents=True,exist_ok=True)
    # Any change to the mesh, its materials, calibrated rig, swatches or bake code
    # must invalidate the radiance cache. Exposure can still be graded afterwards.
    materials_source=args.screens.parent/'surface_materials.py'
    if not materials_source.is_file():materials_source=HERE/'surface_materials.py'
    recipe=[args.fbx,args.roles,materials_source,*[HERE/n for n in ('bake_studio.py','bake_atlas.py','bake_filter.py','display_bounce.py','studio_lighting.py')],*sorted(p for p in args.screens.rglob('*') if p.is_file())]
    signature=hashlib.sha256()
    for path in recipe:signature.update(path.name.encode());signature.update(hashlib.sha256(path.read_bytes()).digest())
    args.cache=args.cache/signature.hexdigest()[:16];args.cache.mkdir(parents=True,exist_ok=True)
    start=time.monotonic();scene,groups,surfaces,lighting=setup_source(args)
    make_camera()
    source_lists={name:[o.name for o in objects] for name,objects in groups.items()}
    joined=make_batches(groups,args);paths={};maps={}
    if not args.prototype:
        from display_bounce import add_display_bounce
        lighting['exhibition']=add_display_bounce(joined['architecture'])
    if args.review:
        old=scene.cycles.samples;scene.cycles.samples=min(16,old);scene.cycles.use_denoising=False
        render_preview(scene,args.out/'source-reference.png',width=900,height=598);scene.cycles.samples=old
    for group,obj in joined.items():paths[group],maps[group]=bake_page(scene,group,obj,args)
    replace_baked_materials(joined,paths,args.screens)
    out=args.out/'studio-unpacked.glb';spec=write_unlit_glb(joined,paths,args.screens,out)
    # OpenGL/Three will decode baked textures from sRGB and write them back once.
    # The corresponding Blender preview uses Standard to avoid a second grade.
    scene.view_settings.view_transform='Standard';scene.view_settings.look='None';scene.view_settings.exposure=0;scene.view_settings.gamma=1
    scene.cycles.samples=5;scene.cycles.use_denoising=False;scene.cycles.max_bounces=1
    poster=args.out/'studio-poster.png';render_preview(scene,poster)
    poster_web=args.out/'studio-poster.webp';Image.open(poster).save(poster_web,'WEBP',quality=92,method=6,alpha_quality=100)
    report={'sourceSha256':hashlib.sha256(args.fbx.read_bytes()).hexdigest(),'recipeSha256':signature.hexdigest(),'prototype':args.prototype,'primaryUV':'UV_Bake','atlas':maps,
            'renderer':{'engine':'Blender Cycles CPU','samples':args.samples,'bounces':5,'components':['direct','indirect','diffuse','glossy','transmission','emissions'],'displayTransform':'AgX - Medium High Contrast','exposureEV':args.exposure,'webColorSpace':'sRGB · KHR_materials_unlit · display-referred'},
            'geometry':spec,'batches':source_lists,'triangles':sum(s['triangles'] for s in spec.values()),'primitives':len(spec),'glbRawBytes':out.stat().st_size,
            'poster':{'dimensions':[1280,850],'alpha':True,'orthoWidth':10.05,'cameraBlender':[9,-11,8.16],'targetBlender':[0,.48,1.28],'bytes':poster_web.stat().st_size},
            'lighting':lighting,'materials':surfaces,'seconds':round(time.monotonic()-start,1)}
    (args.out/'bake-report.json').write_text(json.dumps(report,indent=2,ensure_ascii=False,default=str));print('STUDIO_BAKE_FINISHED',report['triangles'],report['seconds'],flush=True)


if __name__=='__main__':main()
