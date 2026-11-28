"""Albedo and normal guided à-trous filtering for lightmapped radiance.

Cycles builds without OIDN still produce clean indirect shadow gradients. The
albedo is demodulated before filtering and restored afterwards, so the weave,
floor grout, veins and surface pigmentation survive at the original resolution.
"""
from pathlib import Path
import bpy
import numpy as np
from scipy.ndimage import median_filter


def bake_guides(scene,obj,cache,group,resolution,reuse,target_nodes,select):
    cached=Path(cache)/f'guides-v7-world-{group}-{resolution}.npz'
    if reuse and cached.is_file():
        data=np.load(cached,allow_pickle=False)
        return data['albedo'],data['normal'],data['chart']
    guides=[]
    samples=scene.cycles.samples
    scene.cycles.samples=1
    try:
        for name,kind,kwargs in [('albedo','DIFFUSE',{'pass_filter':{'COLOR'}}),('normal','NORMAL',{'normal_space':'OBJECT'})]:
            image=bpy.data.images.new('Guide '+group+' '+name,resolution,resolution,alpha=True,float_buffer=True)
            image.colorspace_settings.name='Non-Color'
            target_nodes(obj,image);select([obj])
            bpy.ops.object.bake(type=kind,uv_layer='UV_Bake',target='IMAGE_TEXTURES',**kwargs)
            values=np.empty(resolution*resolution*4,dtype=np.float32);image.pixels.foreach_get(values);values=values.reshape(resolution,resolution,4)[:,:,:3]
            # Quantize the albedo guide in perceptual space to retain charcoal detail.
            if name=='albedo':np.sqrt(np.clip(values,0,1),out=values)
            guides.append(np.uint8(np.rint(np.clip(values,0,1)*255)))
            bpy.data.images.remove(image)
    finally:scene.cycles.samples=samples
    chart=chart_ids(obj.data,resolution)
    np.savez_compressed(cached,albedo=guides[0],normal=guides[1],chart=chart)
    return guides[0],guides[1],chart


def chart_ids(mesh,resolution):
    from scipy.sparse import coo_matrix
    from scipy.sparse.csgraph import connected_components
    from scipy.ndimage import distance_transform_edt
    from PIL import Image,ImageDraw
    count=len(mesh.loops)
    position=np.empty(count,dtype='i4');mesh.loops.foreach_get('vertex_index',position)
    uv=np.empty(count*2,dtype='f4');mesh.uv_layers['UV_Bake'].data.foreach_get('uv',uv);uv=uv.reshape(-1,2)
    key=np.empty((count,3),dtype='i4');key[:,0]=position;key[:,1:]=np.rint(uv*1.e6).astype('i4')
    _,j=np.unique(key.view(np.dtype((np.void,12))).ravel(),return_inverse=True);j=j.ravel()
    mesh.calc_loop_triangles();tris=np.empty(len(mesh.loop_triangles)*3,dtype='i4');mesh.loop_triangles.foreach_get('loops',tris);tris=tris.reshape(-1,3)
    t=j[tris];a=t.ravel();b=np.roll(t,-1,axis=1).ravel();n=int(j.max())+1
    _,labels=connected_components(coo_matrix((np.ones(len(a),dtype=bool),(a,b)),shape=(n,n)).tocsr(),directed=False)
    label=1+labels[t[:,0]];assert label.max()<65535
    pix=np.rint(uv*resolution-.5).astype('i4')[tris].reshape(-1,6).tolist()
    mask=Image.new('I',(resolution,resolution),0);draw=ImageDraw.Draw(mask)
    for vertices,identity in zip(pix,label):draw.polygon(vertices,fill=int(identity))
    chart=np.asarray(mask,dtype='u2');iy,ix=distance_transform_edt(chart==0,return_distances=False,return_indices=True)
    return chart[iy,ix]


def denoise_radiance(pixels,valid,albedo,normal,chart):
    """Filter only compatible, valid receivers; keep dark grouts and light edges."""
    color=np.maximum(pixels[:,:,:3],0)
    diffuse=(albedo.astype('f4')/255)**2 + .045
    # Albedo-independent irradiance preserves photo-derived material details.
    radiance=np.minimum(color/diffuse,8e3)
    guidecolor=albedo.astype('f4')/255
    norm=normal.astype('f4')/255
    # Use the median of a 3x3 neighbourhood for edge detection, not for the
    # output. It does not mistake isolated Monte Carlo noise for a shadow edge.
    brightness=np.log1p(6*(radiance[:,:,0]*.2126+radiance[:,:,1]*.7152+radiance[:,:,2]*.0722))
    level=median_filter(brightness,size=3,mode='nearest')
    h,w=valid.shape
    # Narrow band-pass clamping only removes isolated glossy fireflies; a genuine
    # sharp softbox/LED center has support in both brightness and material guides.
    limit=np.expm1(level+1.55)/6+.07
    luma=(radiance[:,:,0]*.2126+radiance[:,:,1]*.7152+radiance[:,:,2]*.0722)
    radiance*=np.minimum(1,limit/np.maximum(luma,1e-6))[:,:,None]
    for step,range_sigma in [(1,.31),(2,.27),(4,.20)]:
        total=radiance.copy();weights=np.ones((h,w),dtype='f4')
        for dy,dx,kernel in [(0,1,.75),(0,-1,.75),(1,0,.75),(-1,0,.75),(1,1,.44),(1,-1,.44),(-1,1,.44),(-1,-1,.44)]:
            dy*=step;dx*=step
            y0=max(0,-dy);y1=min(h,h-dy);x0=max(0,-dx);x1=min(w,w-dx)
            # Strips keep peak memory moderate even for a four-megapixel atlas.
            for row in range(y0,y1,192):
                end=min(y1,row+192);a=np.s_[row:end,x0:x1];b=np.s_[row+dy:end+dy,x0+dx:x1+dx]
                da=guidecolor[a]-guidecolor[b];dn=norm[a]-norm[b]
                cost=np.einsum('ijk,ijk->ij',da,da)*155 + np.einsum('ijk,ijk->ij',dn,dn)*92
                cost+=((level[a]-level[b])/range_sigma)**2
                weight=kernel*np.exp(-np.minimum(cost,21))*valid[b]*(chart[a]==chart[b])
                total[a]+=radiance[b]*weight[:,:,None];weights[a]+=weight
        radiance=total/weights[:,:,None]
    pixels[:,:,:3]=radiance*diffuse
