import * as T from 'three';
import {MATERIALS,ease} from './config.js';
export const commonNoise=/*glsl*/`
float hash31(vec3 p){p=fract(p*.1031);p+=dot(p,p.yzx+33.33);return fract((p.x+p.y)*p.z);}
float noise3(vec3 x){vec3 i=floor(x),f=fract(x);f=f*f*(3.-2.*f);return mix(mix(mix(hash31(i),hash31(i+vec3(1,0,0)),f.x),mix(hash31(i+vec3(0,1,0)),hash31(i+vec3(1,1,0)),f.x),f.y),mix(mix(hash31(i+vec3(0,0,1)),hash31(i+vec3(1,0,1)),f.x),mix(hash31(i+vec3(0,1,1)),hash31(i+vec3(1,1,1)),f.x),f.y),f.z);}
float fbm(vec3 p){return noise3(p)*.57+noise3(p*2.13)*.28+noise3(p*4.37)*.15;}
float isStyle(float a,float b){return 1.-step(.2,abs(a-b));}
`;
export const vertexPrelude=/*glsl*/`
uniform float uTime,uStyleFrom,uStyleTo,uStyleMix,uShellObject;
attribute vec3 aShardCenter,aBary;varying vec3 vStudio,vStudioNormal,vBary;varying float vShard;
${commonNoise}
vec3 deform(float id,vec3 p,vec3 n,vec3 center){
 float t=uTime,seed=hash31(floor(center*4.));
 if(id>2.5&&id<3.5){float wave=pow(.5+.5*sin(t*.73+length(center.xz)*1.4+center.y*1.7),4.);vec3 dir=normalize(center-vec3(0.,1.,-.5)+n*.5);p=mix(p,center,.08*wave)+dir*wave*(.11+seed*.14);}
 if(id>4.5&&id<5.5){float event=smoothstep(.91,.99,sin(t*1.65));float slab=floor(p.y*14.);p.x+=(hash31(vec3(slab,floor(t*7.),0.))-.5)*event*.19;p.z+=sin(slab*7.)*event*.035;}
 if(id>10.5&&id<11.5)p+=n*sin(p.y*3.+t*.7+p.x)*.014;
 if(id>12.5&&id<13.5)p+=(p-center)*sin(t*.7+seed*6.28)*.04+n*pow(.5+.5*sin(t*.85+center.y*3.),5.)*.025;
 return p;}
`;
export const shaderPrelude=/*glsl*/`
uniform float uTime,uReveal,uStyleFrom,uStyleTo,uStyleMix,uShell,uShellObject,uContact,uRadius,uTravel,uFixture,uFixtureKind,uScreenBase,uDay,uDayPulse;
uniform vec3 uCursor,uObjectMin,uObjectMax;
varying vec3 vStudio,vStudioNormal,vBary;varying float vShard;
${commonNoise}
float revealField(vec3 p){return clamp(length((p.xz-vec2(.25,-.8))*vec2(.75,1.))*.127+p.y*.075,0.,.88);}
struct Surface{vec3 color;float rough;float metal;float facet;float alpha;vec3 emission;};
Surface surface(float id,vec3 base,float rough,float metal,vec3 p,vec3 n,float rim,float wire){
 Surface s;s.color=base;s.rough=rough;s.metal=metal;s.facet=0.;s.alpha=1.;s.emission=vec3(0.);float t=uTime;
 float grain=noise3(p*115.),cloud=fbm(p*3.6),flow=fbm(p*2.+vec3(0.,t*.16,t*.08));vec3 warm=vec3(1.,.27,.085);
 if(id<.5){float veins=pow(1.-abs(sin(p.y*6.+p.x*3.+flow*12.)),22.);float pulse=pow(.5+.5*sin(t*.6-length(p.xz)*1.5),3.);s.color*=.88+cloud*.25;s.rough=clamp(rough+(grain-.5)*.07,.18,1.);s.emission=warm*veins*(.018+pulse*.13)+warm*rim*.025;}
 else if(id<1.5){s.color=mix(base*3.,vec3(.45,.36,.24),.35);s.rough=1.;s.metal=0.;s.facet=1.;float hatch=step(.73,fract((p.x+p.z+p.y)*42.+sin(t*.6)*.35));s.color*=1.-hatch*.18;float sweep=pow(.5+.5*sin(p.y*2.-t*.65),8.);s.emission=vec3(.09,.065,.03)*sweep;}
 else if(id<2.5){s.color=vec3(.045,.052,.06);s.rough=.83;s.metal=.12;s.alpha=0.;s.emission=vec3(.012,.016,.02);}
 else if(id<3.5){float h=vShard;s.color=mix(vec3(.055,.075,.095),vec3(.20,.18,.15),h);s.facet=1.;s.metal=.55;s.rough=.29;float pulse=pow(.5+.5*sin(t*.73+length(p.xz)*1.4+p.y*1.7),4.);s.emission=vec3(.65,.73,.85)*wire*(.035+pulse*.35);}
 else if(id<4.5){s.color=vec3(.012,.021,.03);s.metal=.1;s.rough=.8;s.alpha=0.;s.emission=vec3(.08,.17,.23)*rim*.2;}
 else if(id<5.5){float slab=floor(p.y*24.);float event=smoothstep(.85,.99,sin(t*1.65));float scan=step(.94,fract(p.y*35.-t*.12));s.color=base*.8;float split=hash31(vec3(slab,floor(t*7.),2.));s.emission=mix(vec3(.1,.8,.9),vec3(1.,.2,.25),split)*event*step(.68,split)*.8+vec3(.07,.11,.13)*scan;}
 else if(id<6.5){float scan=pow(.5+.5*sin(p.y*150.-t*2.),18.);float head=exp(-pow(p.y-mod(t*.30,3.2),2.)*120.);s.color=vec3(.004,.015,.023);s.metal=.2;s.rough=.65;s.alpha=.42+scan*.4;s.emission=vec3(.08,.60,.8)*(rim*.8+scan*.24+head*.9+wire*.06);}
 else if(id<7.5){float plot=1.-smoothstep(.0,.055,abs(fract((p.x+p.y+p.z)*.65-t*.14)-.5));vec2 uv=p.xz+p.yy;vec2 q=abs(fract(uv*12.)-.5);float grid=step(.485,max(q.x,q.y));s.color=vec3(.005,.018,.07);s.metal=0.;s.rough=1.;s.emission=vec3(.19,.42,.90)*(wire*.5+rim*.7+grid*.075+plot*.45);}
 else if(id<8.5){float contour=pow(.5+.5*sin((p.y+flow*.13)*80.-t*.9),16.);s.color=vec3(.065,.072,.075);s.metal=.25;s.rough=.65;s.emission=vec3(.75,.60,.40)*contour*(.23+.35*flow)+vec3(.12,.15,.17)*rim;}
 else if(id<9.5){float ink=pow(1.-abs(sin((p.x+p.y+p.z)*4.+flow*8.)),18.)*.85;ink+=smoothstep(.60,.85,fbm(p*3.+vec3(t*.13,0.,t*.05)))*.3;float hatch=step(.73,fract((p.x+p.y+p.z)*65.));s.color=mix(vec3(.64,.59,.48),vec3(.012,.018,.022),ink);s.color*=1.-hatch*.25;s.rough=1.;s.metal=0.;s.facet=.7;s.emission=vec3(.04,.032,.02)*(1.-ink);}
 else if(id<10.5){float ribbon=.5+.5*sin(p.x*4.+p.y*5.+flow*9.-t*.48);s.color=mix(vec3(.14,.19,.23),vec3(.76,.82,.88),ribbon);s.metal=1.;s.rough=.07+.12*cloud;s.emission=vec3(.035,.055,.08)*pow(ribbon,12.);}
 else if(id<11.5){vec3 spectrum=.5+.5*cos(vec3(0.,2.1,4.2)+p.y*2.+flow*5.+t*.35+rim*3.);s.color=.04+spectrum*.2;s.metal=.65;s.rough=.23;s.emission=spectrum*(.18+rim*.55)*(.5+.5*sin(p.x*2.+p.z*2.-t*.6));}
 else if(id<12.5){vec3 an=abs(n);vec2 uv=(an.y>.55?p.xz:an.x>.55?p.zy:p.xy)*5.;vec2 cell=floor(uv),f=fract(uv);float d1=9.,d2=9.;for(int ix=-1;ix<=1;ix++)for(int iy=-1;iy<=1;iy++){vec2 g=vec2(float(ix),float(iy));vec2 offset=vec2(hash31(vec3(cell+g,1.)),hash31(vec3(cell+g,4.)));vec2 q=g+offset-f;float dist=dot(q,q);if(dist<d1){d2=d1;d1=dist;}else d2=min(d2,dist);}float edge=sqrt(d2)-sqrt(d1);float cracks=1.-smoothstep(.01,.045+flow*.025,edge);float heat=pow(.5+.5*sin(t*.9+flow*7.+p.y*1.8),3.);s.color=vec3(.025,.019,.016);s.rough=.86;s.metal=.12;s.emission=warm*cracks*(.06+heat*1.9)+warm*rim*.05;}
 else if(id<13.5){float crystal=vShard*.55+noise3(p*1.7)*.45;s.color=mix(vec3(.035,.10,.15),vec3(.24,.40,.49),crystal);s.metal=.62;s.rough=.13;s.facet=1.;float resonance=pow(.5+.5*sin(t*.85+p.y*3.+p.x),6.);s.emission=vec3(.25,.65,.75)*(wire*.28+rim*.28)*(.3+resonance);}
 else{float scan=pow(.5+.5*sin(length(p-vec3(0.,1.,-.5))*9.-t*1.1),18.);s.color=vec3(.006,.018,.015);s.metal=0.;s.rough=.7;s.alpha=.06+rim*.36+wire*.12;s.emission=vec3(.30,.85,.66)*(rim*.85+wire*.22+scan*.18);}
 return s;}
`;
export function makeUniforms(){return {uPerspective:{value:0},uProjectionDistance:{value:12},uTime:{value:0},uReveal:{value:0},uStyleFrom:{value:0},uStyleTo:{value:0},uStyleMix:{value:1},uShell:{value:0},uCursor:{value:new T.Vector3(99,99,99)},uContact:{value:0},uRadius:{value:.55},uTravel:{value:0},uDay:{value:0},uDayPulse:{value:0}};}
export class MaterialSystem{
 constructor(shared){this.u=shared;this.materials=[];this.from=0;this.to=0;this.progress=1;this.queued=null;this.selected=0;}
 create(category,{shell=false,fixtureKind=0,bounds=null,screenBase=.24}={}){const props=MATERIALS[category]||MATERIALS.FURNITURE;const mat=new T.MeshStandardMaterial({...props,vertexColors:true,side:category==='FOLIAGE'||shell?T.DoubleSide:T.FrontSide,envMapIntensity:category==='HARDWARE'?1.1:category==='SCREEN'?.2:category==='ARCHITECTURE'?.4:.8,transparent:shell,depthWrite:!shell});mat.name=category;
 const local={uShellObject:{value:shell?1:0},uFixture:{value:0},uFixtureKind:{value:fixtureKind},uScreenBase:{value:screenBase},uObjectMin:{value:bounds?.min.clone()||new T.Vector3()},uObjectMax:{value:bounds?.max.clone()||new T.Vector3(1,1,1)}};mat.userData.local=local;
 mat.onBeforeCompile=shader=>{Object.assign(shader.uniforms,this.u,local);shader.vertexShader=vertexPrelude+'\n'+shader.vertexShader;
 shader.vertexShader=shader.vertexShader.replace('#include <begin_vertex>',`#include <begin_vertex>
 vStudio=(modelMatrix*vec4(position,1.)).xyz;vStudioNormal=normalize(mat3(modelMatrix)*normal);vBary=aBary;vShard=hash31(floor(aShardCenter*4.));
 vec3 oldP=deform(uStyleFrom,transformed,normal,aShardCenter),newP=deform(uStyleTo,transformed,normal,aShardCenter);
 transformed=mix(oldP,newP,uStyleMix);
 `);
 shader.fragmentShader=shaderPrelude+'\n'+shader.fragmentShader;
 shader.fragmentShader=shader.fragmentShader.replace('#include <clipping_planes_fragment>',`#include <clipping_planes_fragment>
 float field=revealField(vStudio);float coverage=smoothstep(field-.07,field+.09,uReveal*1.1);if(coverage<hash31(floor(vStudio*180.)))discard;
 float heat=exp(-dot(vStudio-uCursor,vStudio-uCursor)/(uRadius*uRadius))*uContact;
 float styleBlend=smoothstep(field*.20,field*.20+.80,uStyleMix);
 vec3 wn=normalize(vStudioNormal);vec3 eye=normalize(cameraPosition-vStudio);float rim=pow(1.-abs(dot(wn,eye)),3.);
 vec3 d=fwidth(vBary);vec3 bary=smoothstep(vec3(0.),d*1.0,vBary);float detailFade=1.-smoothstep(.08,.28,max(max(d.x,d.y),d.z));float meshWire=(1.-min(min(bary.x,bary.y),bary.z))*detailFade;
 Surface next=surface(uStyleTo,diffuse,roughness,metalness,vStudio,wn,rim,meshWire);Surface previous=next;if(uStyleMix<.999&&abs(uStyleFrom-uStyleTo)>.2)previous=surface(uStyleFrom,diffuse,roughness,metalness,vStudio,wn,rim,meshWire);
 float alphaFX=mix(previous.alpha,next.alpha,styleBlend);if(uFixtureKind<.5&&alphaFX<.002)discard;
 float styleFacet=mix(previous.facet,next.facet,styleBlend);
 `);
 shader.fragmentShader=shader.fragmentShader.replace('#include <color_fragment>',`#include <color_fragment>
 vec3 vertexAO=diffuseColor.rgb/max(diffuse,vec3(.0001));diffuseColor.rgb=mix(previous.color,next.color,styleBlend)*vertexAO;
 diffuseColor.a*=mix(1.,uShell,uShellObject)*mix(alphaFX,1.,step(.5,uFixtureKind));
 `);
 shader.fragmentShader=shader.fragmentShader.replace('#include <roughnessmap_fragment>','#include <roughnessmap_fragment>\nroughnessFactor=mix(previous.rough,next.rough,styleBlend);');
 shader.fragmentShader=shader.fragmentShader.replace('#include <metalnessmap_fragment>','#include <metalnessmap_fragment>\nmetalnessFactor=mix(previous.metal,next.metal,styleBlend);');
 shader.fragmentShader=shader.fragmentShader.replace('#include <normal_fragment_maps>',`#include <normal_fragment_maps>
 vec3 facetNormal=normalize(cross(dFdx(-vViewPosition),dFdy(-vViewPosition)));normal=normalize(mix(normal,facetNormal,styleFacet));
 float liquid=mix(isStyle(uStyleFrom,10.),isStyle(uStyleTo,10.),styleBlend);
 normal=normalize(normal+vec3(sin(vStudio.y*13.+uTime*.7),cos(vStudio.x*12.-uTime*.6),sin(vStudio.z*11.+uTime*.5))*.16*liquid);
 `);
 shader.fragmentShader=shader.fragmentShader.replace('#include <emissivemap_fragment>',`#include <emissivemap_fragment>
 vec3 amber=vec3(1.,.25,.075);vec3 worldNormal=normalize(vStudioNormal);float fresnel=pow(1.-abs(dot(normal,normalize(vViewPosition))),3.);
 vec3 absN=abs(worldNormal);vec2 planar=absN.y>.55?vStudio.xz:absN.x>.55?vStudio.zy:vStudio.xy;planar+=vec2(noise3(vec3(planar*2.8,2.1)),noise3(vec3(planar*2.8,7.4)))*.12;
 vec2 cell=fract(planar*7.);float edge=min(min(min(cell.x,1.-cell.x),min(cell.y,1.-cell.y)),abs(cell.x-cell.y)*.707);float wire=1.-smoothstep(0.,max(.012,fwidth(edge)*1.15),edge);
 float revealBand=(1.-smoothstep(.0,.08,abs(field-uReveal*1.1)))*(1.-step(.99,uReveal));float changeBand=sin(uStyleMix*3.14159)*(1.-smoothstep(.0,.12,abs(field-uStyleMix)));
 totalEmissiveRadiance+=mix(previous.emission,next.emission,styleBlend);
 totalEmissiveRadiance+=amber*(heat*(fresnel*.8+wire*.18)+(revealBand*.6+changeBand*.6)*(wire*.5+fresnel*.5));
 totalEmissiveRadiance+=vec3(1.,.38,.12)*uDayPulse*(fresnel*.14+wire*.025);
 if(uFixtureKind>1.5&&uFixtureKind<2.5){vec3 uvw=(vStudio-uObjectMin)/max(uObjectMax-uObjectMin,vec3(.001));float front=smoothstep(.25,.78,worldNormal.z);float border=smoothstep(.015,.035,uvw.x)*(1.-smoothstep(.965,.99,uvw.x))*smoothstep(uScreenBase,uScreenBase+.02,uvw.y)*(1.-smoothstep(.975,.995,uvw.y));float wave=.53+sin(uvw.x*5.+uTime*.15)*.12;float band=exp(-abs(uvw.y-wave)*35.);vec3 screen=vec3(.016,.026,.035)+vec3(.80,.26,.08)*band+vec3(.20,.36,.43)*pow(.5+.5*sin(uvw.x*5.-uvw.y*4.+uTime*.12),8.)*.24;totalEmissiveRadiance+=screen*front*border*uFixture*2.6;}
 if(uFixtureKind>.5&&uFixtureKind<1.5){float down=smoothstep(0.,.55,-worldNormal.y);float height=(vStudio.y-uObjectMin.y)/max(.001,uObjectMax.y-uObjectMin.y);totalEmissiveRadiance+=vec3(1.8,.85,.30)*uFixture*down*smoothstep(.65,.74,height);}
 if(uFixtureKind>2.5&&uFixtureKind<3.5)totalEmissiveRadiance+=vec3(2.4,1.3,.55)*uFixture;
 if(uFixtureKind>3.5){float bottom=1.-smoothstep(uObjectMin.y+.05,uObjectMin.y+.17,vStudio.y);totalEmissiveRadiance+=vec3(2.6,2.0,1.25)*uFixture*bottom;}
 `);
 shader.fragmentShader=shader.fragmentShader.replace('#include <opaque_fragment>',`float toonWeight=mix(isStyle(uStyleFrom,1.),isStyle(uStyleTo,1.),styleBlend);if(toonWeight>.001){float luminance=dot(outgoingLight,vec3(.2126,.7152,.0722));float band=floor(luminance*4.)/4.;vec3 toon=outgoingLight*(band+.06)/max(luminance,.04);float ink=pow(1.-abs(dot(normal,normalize(vViewPosition))),6.);outgoingLight=mix(outgoingLight,toon*(1.-ink*.85),toonWeight);}
 #include <opaque_fragment>`);
 };mat.customProgramCacheKey=()=>'memento-v4-fx';this.materials.push(mat);return mat;}
 choose(id){if(!Number.isInteger(id)||id<0||id>14)return;this.selected=id;if(this.progress<1){this.queued=id;return;}if(id===this.to)return;this.from=this.to;this.to=id;this.progress=0;this.u.uStyleFrom.value=this.from;this.u.uStyleTo.value=this.to;}
 update(dt,reduced=false){if(this.progress<1){this.progress=reduced?1:Math.min(1,this.progress+dt/1.8);this.u.uStyleMix.value=ease(this.progress);if(this.progress===1&&this.queued!==null){const next=this.queued;this.queued=null;this.choose(next);}}const transparentStyles=[2,4,6,14];const fxTransparent=transparentStyles.includes(this.to)||this.progress<1&&transparentStyles.includes(this.from);for(const m of this.materials){const shell=!!m.userData.local.uShellObject.value;const transparent=shell||fxTransparent;if(m.transparent!==transparent){m.transparent=transparent;m.needsUpdate=true;}m.depthWrite=shell?this.u.uShell.value>.985&&!fxTransparent:!fxTransparent;if(shell)m.visible=this.u.uShell.value>.001;}}
}
