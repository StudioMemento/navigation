"""Photo-matched, metre-scaled surfacing for the unmodified Memento studio FBX.

World projection keeps the small photographic detail tiles independent of the
lightmap unwrap. Only panel artwork and the three real prints need local UVs.
"""
from collections import Counter, defaultdict
import json
from pathlib import Path

import bpy
from mathutils import Vector


def linear(rgb):
    rgb = rgb.lstrip('#')
    s = [int(rgb[i:i+2],16)/255 for i in (0,2,4)]
    return tuple(c/12.92 if c <= .04045 else ((c+.055)/1.055)**2.4 for c in s)+(1.,)


class Surface:
    def __init__(self, label, base, roughness, metallic=0):
        self.mat = bpy.data.materials.new(label)
        self.mat.use_nodes = True
        self.tree = self.mat.node_tree
        self.p = self.tree.nodes.get('Principled BSDF')
        self.mat.diffuse_color = linear(base)
        self.mat['studio_roughness'] = roughness
        self.mat['studio_metallic'] = metallic
        self.p.inputs['Base Color'].default_value = linear(base)
        self.p.inputs['Roughness'].default_value = roughness
        self.p.inputs['Metallic'].default_value = metallic
        self.pos = self.node('ShaderNodeNewGeometry').outputs['Position']

    def node(self, kind):
        return self.tree.nodes.new(kind)

    def connect(self, source, dest):
        self.tree.links.new(source, dest)

    def noise(self, scale, detail=2, vector=None, distortion=0):
        n = self.node('ShaderNodeTexNoise')
        self.connect(vector or self.pos, n.inputs['Vector'])
        n.inputs['Scale'].default_value=scale
        n.inputs['Detail'].default_value=detail
        n.inputs['Distortion'].default_value=distortion
        return n.outputs['Fac']

    def scalepos(self, factor):
        n=self.node('ShaderNodeVectorMath');n.operation='MULTIPLY'
        self.connect(self.pos,n.inputs[0]); n.inputs[1].default_value=factor
        return n.outputs[0]

    def math(self, op, a, b=0):
        n=self.node('ShaderNodeMath');n.operation=op
        for i,v in enumerate((a,b)):
            if isinstance(v,(float,int)):n.inputs[i].default_value=v
            else:self.connect(v,n.inputs[i])
        return n.outputs[0]

    def ramp(self, factor, stops):
        n = self.node('ShaderNodeValToRGB'); r=n.color_ramp
        r.interpolation='EASE'; r.elements.remove(r.elements[1]);
        for i,(t,color) in enumerate(stops):
            el=r.elements[0] if not i else r.elements.new(t)
            el.position=t;el.color=linear(color)
        self.connect(factor,n.inputs['Fac']); return n.outputs['Color']

    def image(self,path,vector=None,box=False,data=False):
        n=self.node('ShaderNodeTexImage');n.image=bpy.data.images.load(str(path),check_existing=True)
        if data:n.image.colorspace_settings.name='Non-Color'
        if box:n.projection='BOX';n.projection_blend=.16
        else:n.extension='EXTEND'
        self.connect(vector or self.pos,n.inputs['Vector'])
        return n.outputs['Color']

    def mix(self,fac,a,b):
        n=self.node('ShaderNodeMixRGB'); self.connect(fac,n.inputs[0]);self.connect(a,n.inputs[1]);
        if isinstance(b,str):n.inputs[2].default_value=linear(b)
        else:self.connect(b,n.inputs[2])
        return n.outputs['Color']

    def bump(self,fac,dist,strength=.22):
        n=self.node('ShaderNodeBump'); n.inputs['Strength'].default_value=strength
        n.inputs['Distance'].default_value=dist
        self.connect(fac,n.inputs['Height']);self.connect(n.outputs[0],self.p.inputs['Normal'])

    def tune(self,fac,strength=.12):
        r=self.mat['studio_roughness']; value=self.math('MULTIPLY',fac,strength)
        self.connect(self.math('ADD',value,r-.5*strength),self.p.inputs['Roughness'])

    def emission(self,color,strength):
        if isinstance(color,str):self.p.inputs['Emission Color'].default_value=linear(color)
        else:self.connect(color,self.p.inputs['Emission Color'])
        self.p.inputs['Emission Strength'].default_value=strength


def build_palette(screen_dir):
    directory=Path(screen_dir); swatches=directory/'swatches'
    result={}

    def constant(key,title,base,roughness,metal=0):
        s=Surface(title,base,roughness,metal);result[key]=s.mat;return s

    def finish(key,title,stops,roughness,source,scale,bump=.00024,metal=0,stretch=None,detail=2):
        s=constant(key,title,stops[len(stops)//2][1],roughness,metal)
        if source:
            pos=s.scalepos((scale,scale,scale)); f=s.image(swatches/(source+'.webp'),pos,box=True,data=True)
        else:
            pos=s.scalepos(stretch) if stretch else s.pos;f=s.noise(scale,detail,pos)
        color=s.ramp(f,stops);s.connect(color,s.p.inputs['Base Color']);s.tune(f)
        if bump:s.bump(f,bump)
        return s,color

    def tones(a,b,c):return [(.05,a),(.5,b),(.94,c)]

    finish('wall','01 · Pittura al carbone',tones('242426','2e2e30','363638'),.88,'wall',2.45,.00019)
    finish('cut','02 · Pietra tagliata',tones('212225','2b2c2e','35383b'),.69,'stone',2.4,.00032)
    s,base=finish('floor','03 · Gres antracite rettificato',tones('44484b','565b60','666b6f'),.59,'stone',1.8,.00038)
    brick=s.node('ShaderNodeTexBrick');s.connect(s.pos,brick.inputs['Vector']);brick.offset=0
    brick.inputs['Scale'].default_value=1;brick.inputs['Brick Width'].default_value=.67;brick.inputs['Row Height'].default_value=.67
    brick.inputs['Mortar Size'].default_value=.0019;brick.inputs['Mortar Smooth'].default_value=.48
    s.connect(s.mix(brick.outputs['Fac'],base,'797d7d'),s.p.inputs['Base Color'])
    finish('desk','04 · Piano scrivania grigio minerale',tones('45484a','565a5c','686c6c'),.47,'stone',2.6,.00016)
    finish('sofa','05 · Tessuto intrecciato grigio',tones('55565a','777a7b','939493'),.91,'cloth',4.4,.00060)[0].p.inputs['Sheen Weight'].default_value=.27
    finish('rug','06 · Tappeto a pelo lungo',tones('191a1d','2b2e31','424548'),.96,'pile',3.3,.0019)[0].p.inputs['Sheen Weight'].default_value=.38
    finish('speaker','07 · Maglia acustica',tones('1a1b1d','282c2e','3a3b3e'),.89,'cloth',13,.0003)
    finish('leather','08 · Similpelle nera satinata',tones('1d1e20','292b2d','37393a'),.42,'cloth',9,.00032)[0].p.inputs['Coat Weight'].default_value=.16
    finish('nylon','09 · Tela tecnica del softbox',tones('16171a','23252a','313238'),.83,'cloth',8,.00017)[0].p.inputs['Sheen Weight'].default_value=.19
    finish('mat','10 · Gomma e tessuto nero',tones('16181a','202427','2b3034'),.85,'cloth',11,.00022)
    finish('oak','11 · Faggio oliato del treppiede',tones('8c542d','bc8753','d8ac79'),.43,None,4,.00015,stretch=(35,35,.60),detail=2)
    finish('ebony','12 · Legno tinto nero',tones('1b1e20','282b2d','343639'),.43,None,4,.00013,stretch=(.54,16,6))
    finish('marble','13 · Marmo nero venato',[(.02,'1d2326'),(.35,'2b3336'),(.62,'343d40'),(.76,'495256'),(.90,'757c79'),(.99,'b1b3ac')],.245,'marble',1.9,.00008)[0].p.inputs['Coat Weight'].default_value=.32
    finish('soil','14 · Terriccio',tones('261d18','382a22','514334'),.95,None,125,.0018)
    finish('bark','15 · Steli e corteccia',tones('47382c','66523a','8a7652'),.82,None,8,.00048,stretch=(4,4,.55))
    for key,colors in [('leaf',('263924','44663a','627c46')),('leaf2',('203324','365838','698353')),('variegated',('2c4632','4e7045','91a26b')),('ivy',('293d26','52713b','799056'))]:
        s,col=finish(key,'Foglie · '+key,tones(*colors),.54,None,14,.00014,stretch=(3.3,3.8,.74),detail=2)
        s.p.inputs['Subsurface Weight'].default_value=.025
    # A thin, polished mineral vein like the one crossing the lounge table.
    s=Surface('14 · Marmo con venatura di calcite','343a3b',.225);result['marble_top']=s.mat
    sw=s.image(swatches/'marble.webp',s.scalepos((1.28,1.28,1.28)),box=True,data=True)
    base=s.ramp(sw,[(.03,'20282b'),(.38,'2d3538'),(.67,'363f40'),(.83,'505756'),(.98,'838783')]);s.tune(sw,.1)
    split=s.node('ShaderNodeSeparateXYZ');s.connect(s.pos,split.inputs[0]);u,v=split.outputs['X'],split.outputs['Y']
    f=s.math('ADD',s.math('MULTIPLY',u,1.17),s.math('MULTIPLY',v,.84))
    f=s.math('ADD',f,s.math('MULTIPLY',s.noise(4.5,3),.15)); f=s.math('PINGPONG',s.math('ADD',f,.18),.325)
    thin=s.math('MAXIMUM',0.,s.math('SUBTRACT',1.,s.math('MULTIPLY',f,225)))
    s.connect(s.mix(s.math('MULTIPLY',thin,.65),base,'a2a49e'),s.p.inputs['Base Color']);s.p.inputs['Coat Weight'].default_value=.36
    for key,title,base,r,m in [
        ('anodised','Alluminio anodizzato','383b3e',.38,.67),('steel','Inox spazzolato','92999b',.33,.81),('chrome','Cromo lucidato','c8cacc',.21,.86),('gun','Acciaio verniciato','313437',.44,.36),('satin','Laccato nero satinato','292a2c',.37,.08),('black','Policarbonato antracite','25272a',.51,.02),('rubber','Elastomero nero','1e2021',.79,.0),('ivory','Laccato grigio chiaro','b8b9b5',.41,.03),('ceramic','Ceramica avorio','c6c4b8',.36,.0),('pot','Gres grigio','797a72',.77,.0),('whitePC','Alluminio verniciato bianco','c6cace',.37,.22),('paper','Carta naturale','c3bfb0',.83,.0),('bookgray','Tela editoriale grafite','606665',.81,.0),('bookred','Dorso ruggine','985e47',.78,.0),('bookgreen','Dorso salvia','768675',.78,.0),('pcb','Circuito stampato','39413a',.53,.10),('glass','Cristallo','899598',.15,.42),('mirror','Specchio argentato','bfc8c8',.14,.86),('bottle','Vetro ambra','755139',.25,.25),('bottlegreen','Vetro verde scuro','344438',.23,.27),('tinted','Vetro fumé','333a40',.21,.49),('honey','Ottone spazzolato','ad9470',.36,.7),('leafrim','Margine sansevieria','939e5a',.52,.0),('trim','Battiscopa laccato','aeb1aa',.54,.02)]:
        constant(key,title,base,r,m)
    # The glazing of the entrance is a rear closure. The glassware stays
    # translucent in Cycles; cutaway rendering can omit the entrance as a unit.
    result['glass'].node_tree.nodes.get('Principled BSDF').inputs['Transmission Weight'].default_value=.48
    for key,title,base,emit,power,r in [
        ('shade','Lino avorio retroilluminato','d4c7a6','ffdfac',1.55,.8),('panel','Diffusore in polipropilene','e1d8c6','fff0cd',1.9,.68),('ceiling','Pannello LED bianco','c9c4b3','fff5dd',.52,.65),('tube','Tubo Good Vibes Only','ebeae4','f4fff8',2.7,.32),('led','LED lineare a luce calda','d8ba8f','ffd395',2.6,.51),('ledfloor','Diffusore battiscopa caldo','efb47e','ffac69',3.1,.52),('bias','Illuminazione posteriore TV','7c5853','c6886e',.72,.47),('ledcool','Indicatori blu ghiaccio','849ba5','afc8ed',.85,.42),('fanc','Policarbonato illuminato freddo','bdc7cd','dbedff',.63,.43),('fanw','Policarbonato illuminato ambra','805542','ff914d',.56,.43)]:
        s=constant(key,title,base,r);s.emission(emit,power)
        if key in ['shade','panel']:
            tex=s.image(swatches/'cloth.webp',s.scalepos((15,15,15)),box=True,data=True);s.bump(tex,.00019,.15)
    s=constant('soft','Softbox · diffusore con griglia','cdd2d7',.76)
    grid=s.node('ShaderNodeTexBrick');s.connect(s.pos,grid.inputs['Vector']);grid.offset=0;grid.inputs['Scale'].default_value=1
    grid.inputs['Brick Width'].default_value=.078;grid.inputs['Row Height'].default_value=.078;grid.inputs['Mortar Size'].default_value=.0028;grid.inputs['Mortar Smooth'].default_value=.42
    grid.inputs['Color1'].default_value=linear('d1d6e0');grid.inputs['Color2'].default_value=linear('d9dce2');grid.inputs['Mortar'].default_value=linear('69717a')
    s.connect(grid.outputs['Color'],s.p.inputs['Base Color']);s.emission(grid.outputs['Color'],2.0)
    s,col=finish('salt','Sale rosa dell’Himalaya',[(.13,'a74e2c'),(.31,'cc6b3f'),(.52,'ed9a65'),(.74,'ffd2a0'),(.92,'ffe2b7')],.57,None,20,.0017,stretch=(1,1,.65),detail=3)
    s.emission(col,2.1)
    for key in ('vertical','ultrawide','tv'):
        s=constant(key,'Display · '+key,'101113',.31)
        uv=s.node('ShaderNodeUVMap');uv.uv_map='UV_Display'
        image=s.image(directory/(key+'.webp'),uv.outputs['UV']);s.mat['studio_screen']=key
        s.emission(image,1.13);s.p.inputs['Specular IOR Level'].default_value=.18
    for key in ('execute','grind','hustle'):
        s=constant(key,'Stampa originale · '+key,'27282a',.73)
        uv=s.node('ShaderNodeUVMap');uv.uv_map='UV_Print'
        s.connect(s.image(swatches/('print-'+key+'.webp'),uv.outputs['UV']),s.p.inputs['Base Color'])
    return result


def mesh_islands(mesh, positions):
    """Use welded positions only to identify components, retain every source vertex."""
    parent=list(range(len(positions)))
    def root(n):
        while n!=parent[n]:
            parent[n]=parent[parent[n]]; n=parent[n]
        return n
    at={}
    for i,point in enumerate(positions):
        key=tuple(round(c,5) for c in point)
        if key in at:parent[root(i)]=root(at[key])
        else:at[key]=i
    for e in mesh.edges:
        a,b=e.vertices; parent[root(a)]=root(b)
    groups=defaultdict(list)
    for poly in mesh.polygons:groups[root(poly.vertices[0])].append(poly)
    return list(groups.values())


def panel_uv(obj, poly_ids, points, name, print_face=False):
    mesh=obj.data
    layer=mesh.uv_layers.get(name) or mesh.uv_layers.new(name=name)
    mesh.uv_layers.active=layer
    layer.active_render=True
    normals=obj.matrix_world.to_3x3().inverted().transposed()
    v=Vector((0,0,1)); n=sum(((normals@mesh.polygons[i].normal).normalized() for i in poly_ids),Vector())
    horizontal=v.cross(n).normalized()
    # Seen head-on, +X is screen right for the workstation and -X is right on the posters.
    tex={i:(points[i].dot(horizontal),points[i].z) for pi in poly_ids for i in mesh.polygons[pi].vertices}
    lo=[min(p[k] for p in tex.values()) for k in (0,1)]; hi=[max(p[k] for p in tex.values()) for k in (0,1)]
    for pi in poly_ids:
        for li in mesh.polygons[pi].loop_indices:
            at=tex[mesh.loops[li].vertex_index]
            layer.data[li].uv=((at[0]-lo[0])/(hi[0]-lo[0]),(at[1]-lo[1])/(hi[1]-lo[1]))
    return {'size_m':[round(hi[k]-lo[k],4) for k in (0,1)],'horizontal':[round(c,4) for c in horizontal]}


def apply_materials(objects, screen_dir, roles_path):
    palette=build_palette(Path(screen_dir)); roles=json.loads(Path(roles_path).read_text())
    screens={entry['sourceName']:entry['polygonIDs'] for entry in roles['screens']}
    counts=Counter(); audit={}; panel_report={}
    direct={
        'ANGOLO_CAFFE FRIGORIFERO':'satin','ANGOLO_CAFFE TAPPETINO_COFFEE':'mat',
        'BANCO_CAFFE ANGOLO_CAFFE':'ebony','BACKFACE_REVEAL PARETE':'wall','BACKFACE_REVEAL SOFFITTO':'wall',
        'polySurface15':'anodised','PEZZO_PORTA':'anodised','PORTA.001':'anodised','VETRO_PORTA':'glass',
        'LUCI_CEILING_SX':'ceiling','LUCI_CEILING_DX':'ceiling','STAND_LAMPADA_SALE':'oak',
        'CESTINI pCube2':'gun','CESTINO:Door CESTINI':'black','ENTRATA TAVOLINO_DYSON':'desk',
        'ENTRATA ZERBINO_ENTRATA':'rug','FOGLI FOGLI':'paper','FOGLI pPlane7':'paper','PARETE_DISPLAY FONDAMENTA':'wall',
        'POSTAZIONE_GIAN ALEXA':'speaker','POSTAZIONE_GIAN TAPPETINO_GIAN':'mat','POSTAZIONE_NURU TAPPETINO_NURU':'mat',
        'POSTAZIONE_NURU LAVAGNA':'satin','polySurface25':'speaker','polySurface26':'speaker',
        'POSTAZIONE_PS5_TV55 STAND_TV_55':'satin','SALOTTO TAPPETO_SALOTTO':'rug','APPENDINO ZONA_DISPENSER':'ebony',
        'polySurface5':'panel','ZONA_PROGETTAZIONE PORTA_CARTE1':'black','ZONA_PROGETTAZIONE PORTA_CARTE.001':'black',
        'ZONA_PROGETTAZIONE SOFTBOX:STANDSOFTBOX_GRPSoftbox_Arm2':'anodised','ZONA_PROGETTAZIONE SOFTBOX:STANDSOFTBOX_GRPSoftbox_Stick':'anodised',
        'TELO_SHELF':'nylon','LED_SALOTTO':'ledfloor','LED_SCRIVANIE':'led','LED_WORKSTATION':'ledfloor',
        'LUCE_FARETTO':'led','FARETTO':'anodised','LUCE_LAMPADA_PROGETTAZIONE':'panel','LUCE_SOFTBOX_PROGETTAZIONE':'soft',
        'LED_TV':'bias','LED_PS5':'ledcool','LUCI_CASSE':'ledcool','LUCE_LAMPADA_SALOTTO':'shade','TYPO_LED':'tube','LAMPADA_SALE':'salt',
    }
    for obj in objects:
        if obj.type!='MESH': continue
        name=obj.name;upper=name.upper(); mesh=obj.data
        if mesh.users>1:
            mesh=mesh.copy(); obj.data=mesh
        mesh.materials.clear(); slots={}; used=Counter()
        vertices=[obj.matrix_world@v.co for v in mesh.vertices]
        normals=obj.matrix_world.to_3x3().inverted().transposed()
        def assign(faces, key):
            if key not in slots:
                slots[key]=len(mesh.materials); mesh.materials.append(palette[key])
            idx=slots[key]
            for f in faces:f.material_index=idx
        def parts(map_part):
            for i,faces in enumerate(mesh_islands(mesh,vertices)):
                points=[vertices[k] for p in faces for k in p.vertices]
                lo=[min(p[k] for p in points) for k in range(3)];hi=[max(p[k] for p in points) for k in range(3)]
                size=[b-a for a,b in zip(lo,hi)];c=[(a+b)*.5 for a,b in zip(lo,hi)]
                assign(faces,map_part(i,c,size,len(faces)))
        if name in screens:
            assign(mesh.polygons,'black'); ids=screens[name]
            assert all(i<len(mesh.polygons) for i in ids),(name,ids)
            typ='tv' if name.endswith('TV_55') else 'vertical' if 'DISPLAY_27' in name else 'ultrawide'
            assign([mesh.polygons[i] for i in ids],typ)
            panel_report[name]={'art':typ,'polygons':len(ids),**panel_uv(obj,ids,vertices,'UV_Display')}
        elif name in direct:assign(mesh.polygons,direct[name])
        elif 'SVGMESH' in upper:
            assign(mesh.polygons,'cut')
            assign([p for p in mesh.polygons if (normals@p.normal).normalized().z>.65],'floor')
        elif 'POSTER' in upper:
            key={'POSTER pCube4':'execute','pCube3 POSTER':'grind','POSTER pCube5':'hustle'}[name]
            assign(mesh.polygons,'anodised');front=[p for p in mesh.polygons if (normals@p.normal).normalized().y>.9]
            assign(front,key);panel_uv(obj,[p.index for p in front],vertices,'UV_Print',True)
        elif 'PIANTINA' in upper or 'PLANT' in upper:
            def plant(i,c,size,faces):
                # FBX mirroring changes shell order. The ceramic shell is the
                # only dense, bulbous mesh; soil is flat, just inside the rim.
                if 'PIANTINA' in upper:
                    if faces>600:return 'ceramic'
                    if faces<=16:return 'soil'
                    return ('leaf','leaf2','ivy')[i%3]
                if faces>500:return 'pot'
                if size[2]<min(size[0],size[1])*.16:return 'soil'
                if 'PLANT4' in upper:return ('variegated','leaf2','variegated','leaf')[i%4]
                return ('leaf','leaf2','ivy','variegated')[i%4]
            parts(plant)
        elif name in ('BAR Mesh','BAR Untitled:Mesh') or 'FOGLIAME' in upper:
            parts(lambda i,c,sz,n:'bark' if max(sz)>.30 else ('ivy','leaf','leaf2')[i%3])
        elif 'POLTRONA' in upper:parts(lambda i,c,sz,n:'sofa' if i<=2 else 'ebony')
        elif 'SEDIA_BAR' in upper:parts(lambda i,c,sz,n:'leather' if c[2]>.69 else 'black' if .47<c[2]<.55 and max(sz)<.17 else 'chrome')
        elif 'CHAIR_' in upper:
            parts(lambda i,c,sz,n:'chrome' if i==3 or i in (5,7,9) else 'leather' if i in (0,1,6,10) else 'rubber' if c[2]<.07 else 'black')
        elif 'TAVOLO_SALOTTO' in upper:parts(lambda i,c,sz,n:'marble_top' if i==4 else 'marble' if i==1 else 'gun')
        elif 'TAVOLO_BAR' in upper:parts(lambda i,c,sz,n:'marble_top' if i==0 else 'marble' if i in (4,7,8) else 'gun')
        elif name=='polySurface35':
            parts(lambda i,c,sz,n:'oak' if c[2]<.77 and sz[2]>.21 else 'shade' if i in (0,64) else 'chrome' if c[2]>.52 else 'anodised')
        elif 'DESK_' in upper:
            def desk(i,c,sz,n):
                if c[2]>.71 and sz[0]>1:return 'desk'
                if sz[2]>.58 and sz[1]>.95:return 'desk'
                if sz[0]<.045 and sz[1]>.41 and sz[2]>.15:return 'ivory'
                if sz[2]>.62 and sz[0]<.1:return 'ivory'
                if sz[0]>.25 and c[2]<.65:return 'ivory'
                if sz[2]<.025 and sz[1]>.12 and sz[0]<.05:return 'anodised'
                return 'gun'
            parts(desk)
        elif name.startswith('PC_'):
            warm=name=='PC_NURU';case='anodised' if warm else 'whitePC'; led='fanw' if warm else 'fanc'
            def pc(i,c,sz,n):
                if i in (1,2,4,14,312):return case
                if i in (7,8,9,10):return 'rubber'
                if 95<=i<185:return 'anodised' if (i-95)%9<2 else led
                if 285<=i<312:return 'anodised' if (i-285)%9<2 else ('black' if warm else 'ivory')
                if i==185:return 'pcb'
                if i in (210,211,213,215,217,219):return led
                if i in (232,233,251,252,254,259,260,261,262,269,270):return 'anodised' if warm else 'steel'
                if 45<=i<=94:return case
                return 'gun' if i%4==0 else 'black'
            parts(pc)
        elif 'CONTROLLER' in upper:parts(lambda i,c,sz,n:'ivory' if i==0 else 'rubber' if i in (10,11,12,13) else 'black')
        elif name=='polySurface19':parts(lambda i,c,sz,n:'whitePC' if i in (0,2) else 'black')
        elif 'KEYBOARD_' in upper:parts(lambda i,c,sz,n:'anodised' if sz[0]>.43 else 'black' if i%3 else 'gun')
        elif 'MOUSE_' in upper:parts(lambda i,c,sz,n:'rubber' if i%4==0 else 'black')
        elif 'ANGOLO_CAFFE SPECCHIO'==name:
            assign(mesh.polygons,'ebony');assign([mesh.polygons[i] for i in (1458,1459)],'mirror')
        elif 'COFFE_MACHINE' in upper:parts(lambda i,c,sz,n:'satin' if i==0 else 'steel' if i in (1,2,5) else 'black')
        elif name=='ANGOLO_CAFFE DISPENSER':parts(lambda i,c,sz,n:'steel' if i in (2,3) else 'ebony')
        elif 'KIT_WHISKY' in upper:parts(lambda i,c,sz,n:'ebony' if i==0 else 'glass')
        elif 'MICRONDE' in upper:parts(lambda i,c,sz,n:'tinted' if i in (28,29,71) else 'satin' if i in (0,13,24,27) else 'steel' if i in (15,35,36,37,38) else 'anodised')
        elif 'CONDIZIONATORE' in upper:parts(lambda i,c,sz,n:'ivory' if sz[2]>.05 else 'anodised')
        elif 'BOTTIGLIE' in upper:parts(lambda i,c,sz,n:('bottle','bottlegreen','tinted')[i%3])
        elif 'PORTE' in upper:parts(lambda i,c,sz,n:'ebony' if max(sz)>1.3 else 'steel' if .01<max(sz)<.21 else 'satin')
        elif name=='DYSON ENTRATA':parts(lambda i,c,sz,n:'steel' if i in (0,1) else 'satin' if i==2 else 'anodised')
        elif 'SGABELLI' in upper:parts(lambda i,c,sz,n:'ebony' if sz[2]>.4 or c[2]>.45 else 'anodised')
        elif name=='polySurface6':parts(lambda i,c,sz,n:'panel' if i==5 else 'anodised')
        elif name=='polySurface8':parts(lambda i,c,sz,n:'nylon' if i<8 or i in (12,14) else 'gun')
        elif 'BOOK_SHELF' in upper:parts(lambda i,c,sz,n:('bookgray','paper','bookgray','bookgreen','bookgray','paper','bookred','paper')[i%8])
        elif name=='ZONA_PROGETTAZIONE SHELF':parts(lambda i,c,sz,n:'ebony' if sz[1]>.5 and sz[2]<.08 else 'gun')
        elif 'CASE_SHELF' in upper:parts(lambda i,c,sz,n:'black' if max(sz)>.1 else 'steel')
        elif 'SONY_FOTOCAMERA' in upper:parts(lambda i,c,sz,n:'tinted' if i in (7,10) else 'rubber' if i%5==1 else 'black')
        elif 'TRIPOD_' in upper:parts(lambda i,c,sz,n:'steel' if max(sz)>.056 and i%3==0 else 'anodised' if max(sz)>.026 else 'black')
        elif 'TAVOLO_' in upper:parts(lambda i,c,sz,n:'ebony' if c[2]>.66 and sz[2]<.05 else 'anodised')
        else:raise ValueError('Unmapped FBX mesh: '+name)
        by_idx={v:k for k,v in slots.items()}
        used.update(by_idx[p.material_index] for p in mesh.polygons)
        counts.update(used);audit[name]=dict(used)
    assert len(panel_report)==5, panel_report
    return {'mesh_count':len(audit),'used_materials':len(counts),'material_faces':dict(counts),'panels':panel_report,'meshes':audit}
