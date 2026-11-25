/**
 * GLSL (ES 3.0) for the single WebGL context of the navigation.
 * The language is the START's (memento-start V23, src/vfx/shaders.ts): content is monochrome structure, overlays carry
 * the energy (amber light of a chain reaction), with particles, a selective bloom and one final grade. What changes is
 * the frame: every surface lives on a card, and every card is a plane in perspective. Card px (origin top-left, y down)
 * are placed on the plane by `place`; antialiasing reads screen derivatives, so edges stay one pixel under any tilt.
 * There is no background: the frame starts from true black.
 */
const COMMON = /* glsl */ `
precision highp float;
precision highp int;
uniform float uTime;
uniform float uMotion;        // 0 with prefers-reduced-motion
uniform vec3 uAmb[4];         // amber scale: deep, mid, hot, core
uniform float uEmissive;      // 1 while rendering the emission-only pass that feeds the bloom
/* R16: the pointer's light on a scene: strength of the highlight (screen blend) and its radius (card px) */
#define PHOTO_SPOT .5
#define PHOTO_SPOT_R 230.
/* R17: share of the still hover lattice (cells near the pointer, without a reaction): 0, the lattice is only live */
#define HOVER_LATTICE 0.
/* R18: strength of the cells the hover and touch waves light (facets and seams): R16–R17 drew them at 1 */
#define HOVER_CELLS 1.6
float h11(float p){ p=fract(p*.1031); p*=p+33.33; p*=p+p; return fract(p); }
float h21(vec2 p){ vec3 p3=fract(vec3(p.xyx)*.1031); p3+=dot(p3,p3.yzx+33.33); return fract((p3.x+p3.y)*p3.z); }
float vnoise(vec2 p){
  vec2 i=floor(p), f=fract(p); f=f*f*(3.-2.*f);
  return mix(mix(h21(i),h21(i+vec2(1,0)),f.x), mix(h21(i+vec2(0,1)),h21(i+vec2(1,1)),f.x), f.y);
}
vec3 ramp(float x){
  x=clamp(x,0.,1.);
  vec3 c=mix(uAmb[0],uAmb[1],smoothstep(0.,.36,x));
  c=mix(c,uAmb[2],smoothstep(.36,.72,x));
  return mix(c,uAmb[3],smoothstep(.76,1.,x));
}
`;

const AA = /* glsl */ `
float aa(float b){ float w=fwidth(b); return 1.-smoothstep(w*.4,w*1.4,b); }
float hair(float b){ float w=fwidth(b); return 1.-smoothstep(0.,w*.85,b); }
`;

const SIZE = /* glsl */ `uniform vec2 uSize;            // card, px`;

/* Card px onto the card's plane in the scene (1 world unit = 1 CSS px at the reading depth). */
const PLACE = /* glsl */ `
uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;
vec4 place(vec2 p){ return projectionMatrix*modelViewMatrix*vec4(p.x-uSize.x*.5,uSize.y*.5-p.y,0.,1.); }
`;

/*
 * Structure: mirrors structure.mjs. The viewport has three bands, as on every page: 15% exit at the top, 70% reading,
 * 15% entry at the bottom. In the edge bands the cards come apart in cells, as a function of their position on screen
 * only: the next section arrives already fragmented, the previous one leaves through the top, reversing replays it.
 */
const STRUCT = /* glsl */ `
uniform float uLoad;
uniform vec2 uView;           // viewport, CSS px
uniform float uBand;          // px
uniform vec2 uBandK;          // top, bottom enable (0 with reduced motion)
uniform vec3 uDrift;          // s since the carousel stopped (0 while it moves), drift speed (px/s), fade time (s)
uniform vec2 uNoise;          // per-card offset of the loading noise
float screenY(vec4 clip){ return (1.-clip.y/clip.w)*.5*uView.y; }
float fragAt(float sy){
  float eT=clamp(1.-sy/uBand,0.,1.)*uBandK.x, eB=clamp(1.-(uView.y-sy)/uBand,0.,1.)*uBandK.y;
  return pow(max(eT,eB),1.25);
}
float delayAt(vec2 cd, float seed){ return clamp(mix(seed,vnoise((cd+uNoise)/250.+3.7),.64)*1.16-.08,0.,1.); }
float loadAbs(float delay){ return 1.-smoothstep(delay-.09,delay+.09,uLoad*1.3-.15); }
`;

const PANEL = /* glsl */ `
uniform vec2 uCut;            // top-left, bottom-right
float sdTab(vec2 p){
  vec2 h=uSize*.5, q=p-h, d=abs(q)-h;
  float box=length(max(d,0.))+min(max(d.x,d.y),0.);
  float tl=(uCut.x-p.x-p.y)*.7071, br=(uCut.y-(uSize.x-p.x)-(uSize.y-p.y))*.7071;
  return max(box,max(tl,br));
}
/* Position 0..1 along the outline, clockwise from the top-left corner (mirrors border.mjs). */
float outlineAt(vec2 p){
  float w=uSize.x, h=uSize.y;
  vec2 q=clamp(p,vec2(0.),uSize);
  float dT=q.y, dR=w-q.x, dB=h-q.y, dL=q.x, m=min(min(dT,dR),min(dB,dL));
  float s=m==dT?q.x:(m==dR?w+q.y:(m==dB?w+h+(w-q.x):2.*w+h+(h-q.y)));
  return s/(2.*(w+h));
}
`;

/*
 * The scene photograph: cover fit, the 2.5D parallax of its painted depth regions (R11), the title's quiet legibility
 * shade at the base, and a fade of a few percent at its box, so the image lights the void panel and no edge shows.
 */
const PHOTO = /* glsl */ `
uniform sampler2D uImage;
uniform float uPhotoColor;    // devices without hover show the scenes in colour at rest (V25)
uniform float uHasImg;
uniform vec2 uTextureSize;
uniform vec2 uTilt;
uniform float uParallax;
uniform vec4 uDepth[4];
uniform vec4 uDepthPower;
vec3 phRGB=vec3(0.); vec3 phRaw=vec3(0.); vec2 phUV=vec2(0.);
vec2 cover(vec2 p){ float ia=uTextureSize.x/uTextureSize.y, pa=uSize.x/uSize.y; vec2 s=vec2(min(pa/ia,1.),min(ia/pa,1.)); return (p-.5)*s+.5; }
/* x: luminance, y: coverage. phRGB keeps the colour (texture uv: origin bottom-left) */
vec2 photo(vec2 p, float inside){
  if(uHasImg<.5) return vec2(0.);
  vec2 q=p/uSize;
  vec2 uv=cover((vec2(q.x,1.-q.y)-.5)*.955+.5);
  float depth=.16+.30*(1.-uv.y);
  for(int i=0;i<4;i++){ vec2 r=(uv-uDepth[i].xy)/max(uDepth[i].zw,vec2(.001)); depth+=exp(-dot(r,r)*2.8)*uDepthPower[i]*.65; }
  phUV=clamp(uv+uTilt*mix(.002,.016,depth)*uParallax,.004,.996);
  phRaw=texture(uImage,phUV).rgb;
  phRGB=phRaw*mix(.52,1.,smoothstep(.08,.37,1.-q.y));
  float inBox=smoothstep(0.,.05,q.x)*(1.-smoothstep(.95,1.,q.x))*smoothstep(0.,.06,q.y)*(1.-smoothstep(.94,1.,q.y));
  return vec2(dot(phRGB,vec3(.299,.587,.114)),inside*inBox);
}
`;

/* The title painted from its DOM layout (idle gradient), mapped onto the card: uv = (p + xy) * zw. */
const INK = /* glsl */ `
uniform sampler2D uInk;
uniform float uHasInk;
uniform vec4 uInkMap;
uniform float uTitleAlpha;    // the title belongs to the card in the reading position
vec2 inkUv(vec2 p){ return (p+uInkMap.xy)*uInkMap.zw; }
vec4 inkAt(vec2 p){
  vec2 uv=inkUv(p);
  return uHasInk*uTitleAlpha*texture(uInk,clamp(uv,0.,1.))*step(0.,uv.x)*step(uv.x,1.)*step(0.,uv.y)*step(uv.y,1.);
}
`;

/* Warmth of the title (its hover state, breathing): the content pass hands that share of the type to the overlay. */
const WARMTH = /* glsl */ `
uniform float uTitleWarm;
float warmth(vec2 p){ return clamp(uTitleWarm,0.,1.)*(.96+.04*sin(uTime*.8+p.x*.0025)*uMotion); }
`;

/* Micro-lattice inside glyphs: stable ids from position, mixed sizes through 1:4 subdivision. */
const LATTICE = /* glsl */ `
struct Tri { vec3 b; vec2 c; float id; float edge; };
const mat2 ROT=mat2(.9455,.3256,-.3256,.9455);
vec2 toL(vec2 p,float S){ p=ROT*p; float qy=p.y/.866; return vec2(p.x-.5*qy,qy)/S; }
Tri tri(vec2 q, vec2 sub){
  vec2 i=floor(q), f=fract(q);
  bool up=f.x+f.y>1.;
  vec2 v0,v1,v2; vec3 b;
  if(!up){ v0=i; v1=i+vec2(1,0); v2=i+vec2(0,1); b=vec3(1.-f.x-f.y,f.x,f.y); }
  else { v0=i+vec2(1,1); v1=i+vec2(0,1); v2=i+vec2(1,0); b=vec3(f.x+f.y-1.,1.-f.x,1.-f.y); }
  float id=h21(i+(up?vec2(.37,.61):vec2(0.))+vec2(17.3,5.9));
  float scale=1.;
  for(int l=0;l<2;l++){
    if(h11(id*91.7+float(l)*3.1)>=sub[l]) break;
    vec2 A=v0,B=v1,C=v2; float k;
    if(b.x>.5){ v1=(A+B)*.5; v2=(A+C)*.5; b=vec3(2.*b.x-1.,2.*b.y,2.*b.z); k=1.; }
    else if(b.y>.5){ v0=(A+B)*.5; v2=(B+C)*.5; b=vec3(2.*b.x,2.*b.y-1.,2.*b.z); k=2.; }
    else if(b.z>.5){ v0=(A+C)*.5; v1=(B+C)*.5; b=vec3(2.*b.x,2.*b.y,2.*b.z-1.); k=3.; }
    else { v0=(B+C)*.5; v1=(A+C)*.5; v2=(A+B)*.5; b=vec3(1.)-2.*b; k=4.; }
    id=h11(id*57.3+k*13.7); scale*=.5;
  }
  Tri t; t.b=b; t.c=(v0+v1+v2)/3.; t.id=id; t.edge=min(b.x,min(b.y,b.z))*scale;
  return t;
}
`;

/* ------------------------------------------------------------------ content: monochrome, structure only */

const EXIT = /* glsl */ `
/* R17 · page exit: the real interface comes apart. Each cell leaves in order of its distance from the touched point
   (a little shuffled), flies to the seal at the centre of the screen on a bowed path, shrinking and turning, heats up
   and fades as it arrives. uExit: progress (0 = none), origin (clip x, y), aspect of the canvas (w / h). */
uniform vec4 uExit;
/* R24: the column between the margins in clip x (left, right): a cell outside it goes out in place, it never flies over
   the margins, the background and the wordmark. Inside it, two cells in five fly (at about the size of the change's
   fragments: they shrink little); the others go out in place too. It read as dust spread over the whole screen. */
uniform vec2 uExitCol;
float exitStays(vec4 cc, float seed){
  float x=cc.x/cc.w;
  return (x<uExitCol.x||x>uExitCol.y||h11(seed*61.)>.4)?1.:0.;
}
/* how far a leaving cell is gone: a flying one as it arrives, one that stays soon after it starts */
float exitGone(vec4 cc, float seed, float k){
  return mix(smoothstep(.62,1.,k),smoothstep(.06,.62,k),exitStays(cc,seed));
}
float exitOf(vec4 cc, float seed){
  if(uExit.x<=0.) return 0.;
  vec2 q=(cc.xy/cc.w-uExit.yz)*vec2(uExit.w,1.);
  // normalised by the farthest corner of the screen: every exit uses the whole movement, wherever it starts
  float d=clamp(length(q)/length(vec2((1.+abs(uExit.y))*uExit.w,1.+abs(uExit.z))),0.,1.);
  float s=.02+.46*d+.16*(seed-.5);
  return smoothstep(s,s+.42,uExit.x);
}
vec4 exitTo(vec4 vc, vec4 cc, float k, float seed){
  if(k<=0.) return vc;
  float e=k*k*(3.-2.*k);
  if(exitStays(cc,seed)>.5){
    // in place: the cell shrinks a little about its centre and goes out
    vec2 c0=cc.xy/cc.w, n0=vc.xy/vc.w;
    return vec4((c0+(n0-c0)*(1.-.35*e))*vc.w,vc.z,vc.w);
  }
  // R18: toward the line where the page's name composes (the middle of the screen, across most of its width)
  vec2 c=cc.xy/cc.w, n=vc.xy/vc.w, to=vec2(-.45*c.x,-c.y);
  vec2 side=vec2(-to.y,to.x)*(h11(seed*29.)-.5)*1.2*sin(3.1416*e);
  float a=(h11(seed*43.)-.5)*5.*e, ca=cos(a), sa=sin(a);
  vec2 v=(n-c)*vec2(uExit.w,1.);
  v=vec2(ca*v.x-sa*v.y,sa*v.x+ca*v.y)/vec2(uExit.w,1.);
  vec2 m=c+v*(1.-.45*e)+(to+side)*e;
  return vec4(m*vc.w,vc.z,vc.w);
}
`;

export const CARD_VERT = /* glsl */ `
${COMMON}
${SIZE}
${PLACE}
${STRUCT}
${EXIT}
in vec2 position;             // rest position, card px
in vec2 cellCenter;
in float seed;
in vec3 bary;
uniform float uPush;
out vec2 vLocal; out vec3 vBary; out float vGone; out float vTrans; out float vOv; out float vHeat;
vec2 curlAt(vec2 p){
  float e=.35, a=vnoise(p+vec2(0.,e)), b=vnoise(p-vec2(0.,e)), c=vnoise(p+vec2(e,0.)), d=vnoise(p-vec2(e,0.));
  vec2 v=vec2(a-b,-(c-d));
  return v/(length(v)+1e-4);
}
void main(){
  vec2 cd=cellCenter;
  float sy=screenY(place(cd));
  // structure = f(position on screen): a stop keeps the phase reached, reversing replays it
  float F=fragAt(sy);
  float th=.14+.7*seed;
  float aS=smoothstep(th-.13,th+.13,F);
  float aL=loadAbs(delayAt(cd,seed));
  float a=max(aS,aL);
  float eT=clamp(1.-sy/uBand,0.,1.)*uBandK.x, eB=clamp(1.-(uView.y-sy)/uBand,0.,1.)*uBandK.y;
  float dir=eT>eB?-1.:1.;
  // dispersal: the cell shrinks, turns and drifts outward carrying its own piece of content
  vec2 off=vec2((h11(seed*91.)-.5)*1.5,dir*(.45+h11(seed*37.)))*uPush*aS*aS
          +(vec2(h11(seed*53.),h11(seed*71.))-.5)*uPush*.9*aL*aL;
  // a light curl swirl on cells in transition; once the carousel stops, the cells on their way out become particles:
  // they leave along the curl field and fade, while the cells that stay keep the place the position gave them
  vec2 flow=curlAt(cd*.006+vec2(uTime*.04,0.))*.85+vec2(0.,dir)*.5;
  float leaving=smoothstep(.05,.3,aS);
  float tau=uDrift.x*leaving;
  off+=flow*(tau*uDrift.y*(.6+.8*h11(seed*13.))+aS*7.*uMotion);
  float gone=max(a,leaving*smoothstep(.1,uDrift.z,uDrift.x));
  float rot=(h11(seed*17.)-.5)*(1.3*a+tau*.9);
  vec2 dv=position-cellCenter;
  dv=mat2(cos(rot),sin(rot),-sin(rot),cos(rot))*dv*(1.-.72*a)*(1.-.65*leaving*smoothstep(0.,uDrift.z,uDrift.x));
  vLocal=position; vBary=bary; vGone=gone; vTrans=4.*a*(1.-a);
  // how present the overlay is at this point (the same formula as OVERLAY_VERT's vFade, at the rest position)
  vOv=(1.-smoothstep(.02,.3,fragAt(screenY(place(position)))))*(1.-loadAbs(delayAt(position,.5)));
  vec4 cc=place(cd+off), vc=place(cd+dv+off);
  float ke=exitOf(cc,seed);
  vGone=max(vGone,exitGone(cc,seed,ke)); vHeat=ke*(1.-.6*exitStays(cc,seed));
  gl_Position=exitTo(vc,cc,ke,seed);
}`;

export const CARD_FRAG = /* glsl */ `
${COMMON}
${AA}
${SIZE}
${PANEL}
${PHOTO}
${INK}
${WARMTH}
uniform vec4 uPanelCol;
uniform float uActive;        // 1 in the reading position, 0 as a secondary
in vec2 vLocal; in vec3 vBary; in float vGone; in float vTrans; in float vOv; in float vHeat;
out vec4 o;
void main(){
  vec2 p=vLocal;
  float sd=sdTab(p), w=max(fwidth(sd),1e-3);
  float inside=1.-smoothstep(-.7*w,.3*w,sd);
  vec4 col=vec4(uPanelCol.rgb,1.)*uPanelCol.a*inside;
  // the scene lights the void panel
  vec2 ph=photo(p,inside);
  // R22: at rest the scene keeps half its colour (all of it on devices without hover)
  col.rgb=max(col.rgb,mix(vec3(ph.x),phRGB,max(uPhotoColor,.5))*ph.y*mix(.21,1.,uActive));
  // the thin frame with its sheen
  float frame=1.-smoothstep(0.,w,abs(sd+.7*w)-.15*w);
  float k=(p.x/uSize.x+p.y/uSize.y)*.5;
  float g=mix(mix(.74,.3,smoothstep(.1,.9,k)),.62,smoothstep(.75,1.,k))*mix(.35,1.,uActive);
  col=mix(col,vec4(vec3(g),1.),frame*.62);
  // large type: as the block warms, the overlay draws that share of the type with the same coverage. The content pass
  // gives it up instead of being covered, so nothing behind the anti-aliased edge is erased (no dark rim)
  vec4 ink=inkAt(p);
  ink*=1.-warmth(p)*vOv;
  col=ink+col*(1.-ink.a);
  // structure stays monochrome: a cell in transition shows its own seams in grey, nothing lights up
  float seam=aa(min(vBary.x,min(vBary.y,vBary.z)));
  col.rgb=col.rgb*(1.-vTrans*.28)+vec3(.62)*seam*vTrans*col.a*.35;
  // R17 exit: a leaving cell heats up on its way to the seal (it glows in the bloom too)
  if(vHeat>0.){ float lum=dot(col.rgb,vec3(.299,.587,.114)); col.rgb=mix(col.rgb,ramp(.3+.6*lum)*(.35+1.3*lum)*col.a,smoothstep(.15,.8,vHeat)*.8); }
  float present=1.-smoothstep(.5,.98,vGone);
  if(col.a*present<.002) discard;
  if(uEmissive>.5){ o=vec4(col.rgb*smoothstep(.25,.75,vHeat)*.7*present,col.a*present); return; }
  o=col*present;
}`;

/* ------------------------------------------------------------------ overlays: energy */

export const OVERLAY_VERT = /* glsl */ `
${COMMON}
${SIZE}
${PLACE}
${STRUCT}
${EXIT}
in vec2 position;             // px of the network (card or title block), with its margin
in vec3 bary;
in vec4 cell;                 // seed, zone, sheen edge, nearness to the outline
in vec2 energy;               // face, smoothed vertex
in vec2 centre;
uniform vec2 uOffset;         // network origin in card px
out vec2 vLocal; out vec3 vBary; flat out vec4 vCell; flat out float vE; out float vEv; out float vFade; flat out vec2 vCentre;
void main(){
  vec2 p=position+uOffset;
  vec4 clip=place(p);
  // light belongs to content that is present: it fades where the bands or the loading take the structure apart
  vFade=(1.-smoothstep(.02,.3,fragAt(screenY(clip))))*(1.-loadAbs(delayAt(p,.5)));
  vLocal=p; vBary=bary; vCell=cell; vE=energy.x; vEv=energy.y; vCentre=centre+uOffset;
  // R17 exit: the light (and the title drawn here) leaves with its cells and goes out on the way
  vec4 cc=place(centre+uOffset);
  float ke=exitOf(cc,cell.x);
  vFade*=1.-mix(smoothstep(.5,.95,ke),smoothstep(.06,.62,ke),exitStays(cc,cell.x));
  gl_Position=exitTo(clip,cc,ke,cell.x);
}`;

export const OVERLAY_CARD_FRAG = /* glsl */ `
${COMMON}
${AA}
${SIZE}
${PANEL}
${PHOTO}
${INK}
uniform float uHover;         // 0..1, eased
uniform float uGain;          // 1 primary, lower for neighbours in range
uniform float uNear;          // a neighbour in range (or a secondary under the pointer): nearness, eased
uniform float uTopo;          // density of the topology: lower on a large panel (amber is an event)
uniform float uActive;
uniform float uEdge;          // lab: outline light
uniform float uLights;        // lab: the scene's own light sources in the bloom, on hover
uniform vec4 uBins[24];       // light along the outline, 96 segments
uniform vec3 uPointer;        // card px
uniform vec4 uWake;           // reach over the cells: under the pointer, from outside; share lit across; strength from outside
uniform vec4 uLightRegions[6];
in vec2 vLocal; in vec3 vBary; flat in vec4 vCell; flat in float vE; in float vEv; in float vFade; flat in vec2 vCentre;
out vec4 o;
float binAt(int i){ i=i<0?i+96:(i>95?i-96:i); return uBins[i/4][i-(i/4)*4]; }
float bins(float s){ float x=s*96.-.5, f=fract(x); int i=int(floor(x)); return mix(binAt(i),binAt(i+1),f); }
/* The lamps, screens and portal of each scene (authored masks, R11), chromatic and luminous threshold in linear light. */
float lampAt(vec2 uv, vec3 srgb){
  vec3 c=pow(srgb,vec3(2.2));
  float warm=smoothstep(.04,.25,c.r-c.b)*smoothstep(.05,.22,c.r-c.g);
  float source=smoothstep(.24,.64,c.r)*warm, region=0.;
  for(int j=0;j<6;j++){ vec4 z=uLightRegions[j]; float d=length((uv-z.xy)/max(z.zw,vec2(.0001))); region=max(region,1.-smoothstep(.65,1.,d)); }
  return source*region*smoothstep(.12,.23,uv.x)*smoothstep(.12,.23,1.-uv.x);
}
void main(){
  vec2 p=vLocal;
  float sd=sdTab(p), w=max(fwidth(sd),1e-3);
  float inside=1.-smoothstep(-.7*w,.3*w,sd);
  float E=vE, Ev=vEv, seed=vCell.x;
  float h=h11(seed*7.1), h2=h11(seed*3.3), h3=h11(seed*11.9);
  vec4 ink=inkAt(p);
  vec2 ph=photo(p,inside);
  float lum=ph.x, ia=ph.y;
  float be=vCell.z<.5?vBary.x:(vCell.z<1.5?vBary.y:vBary.z);
  float sweep=exp(-be*3.4);
  vec2 dp=p-uPointer.xy;

  // 1 · R16: the scene in its own colours, whole (they are already warm: no extra amber). Under the pointer a soft
  //     highlight, a light and not a tint (the colour screened with itself). Black stays black: no image box shows
  float lift=clamp(uHover+Ev*.8,0.,1.)*uGain+uNear*.32*exp(-dot(dp,dp)/(uWake.x*uWake.x*2.6));
  float gA=ia*min(lift,1.)*smoothstep(.015,.12,lum);
  float spot=exp(-dot(dp,dp)/(PHOTO_SPOT_R*PHOTO_SPOT_R))*uHover*uGain;
  vec3 graded=mix(phRGB,1.-(1.-phRGB)*(1.-phRGB),PHOTO_SPOT*spot)*(1.+.06*E*sweep)*mix(.21,1.,uActive);

  // 2 · one set of cells of one scale, gathered along the outline, each with its own visibility. The pointer wakes
  //     them where it is (from outside too, on the side facing it); the reaction travels through the same cells
  float edgeK=vCell.w;
  float r=h11(seed*17.3+1.7), dens=mix(.32,1.,edgeK);
  float vis=r<dens*.14?1.:(r<dens*.36?.46:(r<dens*.64?.16:0.));
  vec2 dc=vCentre-uPointer.xy;
  float wake=uHover*uGain*(uWake.z+(1.-uWake.z)*exp(-dot(dc,dc)/(uWake.x*uWake.x)))+uNear*uWake.w*exp(-dot(dc,dc)/(uWake.y*uWake.y));
  float beat=.62+.38*sin(uTime*(.22+.3*h)+h2*6.283)*uMotion;
  // R17: no still lattice under the pointer: only the cells the reaction reaches light, and it travels
  float L=clamp(vis*wake*beat*uTopo*HOVER_LATTICE+E*(.45+.8*max(vis,.35)),0.,1.);
  float sat=.3+.7*h2;
  // R16: over the photograph the cells stay light and close to neutral; the amber lives on the black and the outline
  float fA=inside*L*(.05+.24*h)*HOVER_CELLS*(.3+.7*sweep)*(1.-ia*.5*smoothstep(.04,.3,lum));
  vec3 facet=ramp(.24+.44*L*sweep);
  facet=mix(vec3(dot(facet,vec3(.3333))),facet,sat*(1.-.6*ia))*(.45+.9*sweep);
  // the seams: hairlines (under half a pixel per side), never summed at a corner
  float edges=max(max(hair(vBary.x)*step(.45,h2),hair(vBary.y)*step(.45,h3)),hair(vBary.z)*step(.45,h));
  vec3 wc=ramp(.6+.32*L);
  vec3 wire=mix(vec3(dot(wc,vec3(.3333))),wc,sat)*edges*L*(.34+.42*edgeK)*HOVER_CELLS*inside;

  // 3 · the outline lights by segment: a thin bright core and a soft local halo
  float Eb=bins(outlineAt(p))*uEdge;
  float core=1.-smoothstep(0.,1.25*w,abs(sd+.6*w));
  float halo=sd>0.?exp(-sd/7.5):exp(sd/16.)*.35;
  vec3 glow=ramp(.5+.36*min(Eb,1.))*(core*Eb*1.7+halo*Eb*.9)*vFade;

  vec4 c=vec4(graded*gA,gA);
  c=vec4(facet*fA+c.rgb*(1.-fA),fA+c.a*(1.-fA));
  c.rgb+=wire;
  // the title is drawn once, by the content pass and its own overlay: light never covers it
  c*=(1.-ink.a)*vFade;
  if(uEmissive>.5){
    float lamp=lampAt(phUV,phRaw)*ia*min(lift,1.)*uLights*uActive;
    // the scene glows only a little, where the pointer lights it; its lamps keep a softer halo (R16)
    o=vec4((graded*gA*smoothstep(.45,.95,lum)*(.04+.16*spot)+facet*fA*.7+wire+phRGB*lamp*.2)*(1.-ink.a)*vFade+glow,0.);
    return;
  }
  o=vec4(c.rgb+glow,c.a);
}`;

export const OVERLAY_TITLE_FRAG = /* glsl */ `
${COMMON}
${AA}
${LATTICE}
${SIZE}
${INK}
${WARMTH}
uniform sampler2D uDist;      // signed distance to the letters (0.5 on the outline, ±uRange px at 0 and 1), mapped like the ink
uniform float uRange;         // px
uniform float uEm;            // px, font size
uniform vec2 uGray;           // luminance of the idle gradient at the base and at the top of the block
uniform vec4 uTitle[6];       // the amber gradient, top to base: colour, luminance of its desaturated (idle) version
uniform vec3 uHot[3];         // where the range reaches: top, middle, base
uniform float uMicro;         // px, micro-lattice inside the glyphs
uniform float uLoad;
uniform float uTouch;         // a touch reaction: local, short-lived; never warms the whole title by itself
in vec2 vLocal; in vec3 vBary; flat in vec4 vCell; flat in float vE; in float vEv; in float vFade;
out vec4 o;
float sdAt(vec2 p){
  vec2 uv=inkUv(p), q=clamp(uv,0.,1.);
  return (texture(uDist,q).r-.5)*2.*uRange+length((uv-q)/uInkMap.zw);
}
vec3 amberOf(float lum){
  vec3 c=uTitle[0].rgb;
  for(int i=1;i<6;i++){
    float hi=uTitle[i-1].w, lo=uTitle[i].w;
    if(lum<hi) c=mix(uTitle[i-1].rgb,uTitle[i].rgb,clamp((hi-lum)/max(hi-lo,1e-4),0.,1.));
  }
  return c;
}
void main(){
  vec2 p=vLocal;
  // two levels: on the card the whole block takes its amber gradient (base) and a golden lattice inside the letters;
  // the cells the range reaches and the reaction they start go warm yellow (local). Never a disc
  float base=warmth(p);
  float local=clamp(vEv*1.12+vE*.32,0.,1.15);
  float W0=max(base,local*clamp((1.-uLoad)*3.,0.,1.)*.8)*uTitleAlpha;
  float W=max(W0,clamp(local,0.,1.)*uTouch*uTitleAlpha);
  if(W<.004) discard;
  float sd=sdAt(p);
  if(sd>uRange) discard;
  vec4 ink=inkAt(p);
  float a=uTitleAlpha>.001?ink.a/uTitleAlpha:0.;
  float lum=a>.003?dot(ink.rgb/ink.a,vec3(.299,.587,.114)):1.;
  float t=clamp((lum-uGray.x)/(uGray.y-uGray.x),0.,1.);
  // R22: at rest the type already holds a little of its colour (30% of the amber gradient); hover brings the rest
  vec3 idle=mix(vec3(lum),amberOf(lum),.3), amber=amberOf(lum);
  float fill=smoothstep(t-.3,t+.06,local*1.05);
  vec3 hot=t>.5?mix(uHot[1],uHot[0],(t-.5)*2.):mix(uHot[2],uHot[1],t*2.);
  float reach=max(local,base*.5);
  Tri m=tri(toL(p,uMicro),vec2(.62,.42));
  float mh=h11(m.id*5.1), mh2=h11(m.id*9.7);
  float th=.18+.6*mh*mh+.05*sin(uTime*(.16+.4*mh2)+mh*40.)*uMotion;
  float lit=smoothstep(th,th+.16,reach)*step(.2,mh2);
  vec3 facet=mix(ramp(.4+.22*reach*mh),hot,.25+.3*h11(m.id*2.7))*(.8+.35*h11(m.id*4.3)-.15*m.b.y);
  float wire=(1.-smoothstep(0.,1.,m.edge*uMicro*.8))*step(.45,h11(m.id*11.3));
  vec3 col=amber;
  col=mix(col,hot,fill);
  col=mix(col,facet,lit*mix(.4,.55,clamp(local,0.,1.)));
  col=mix(col,vec3(1.,.9,.75),wire*lit*.3);
  // the overlay takes over the share W of the type with its own coverage: the content pass has given up exactly that
  float k=vFade;
  float cov=a*k*W0;
  // warm light that follows each letter: a rim just inside the outline where the energy is, a soft glow outside.
  // Both are light only (added, no coverage): they never darken what is around the letters
  float g=clamp(local*1.1+base*.4,0.,1.)*vFade*W;
  float rim=a*exp(-max(-sd,0.)/(uEm*.02));
  float outer=(1.-a)*exp(-max(sd,0.)/(uEm*.045))*(1.-smoothstep(uRange*.5,uRange,sd));
  vec3 rimC=ramp(.56+.2*g)*rim*local*vFade*.6*W;
  vec3 glow=ramp(.42+.2*g)*outer*(.04+.17*g)*vFade*W;
  if(uEmissive>.5){ o=vec4(((hot*a*fill*.09+facet*a*lit*.07)*vFade+rimC*.24+glow*.3)*W,0.); return; }
  // touch changes the existing ink by its colour delta, preserving its anti-aliased coverage (V26)
  o=vec4(col*cov+(col-idle)*a*k*(W-W0)+rimC*k+glow,cov);
}`;

/* ------------------------------------------------------------------ particles (screen px) */

export const PART_VERT = /* glsl */ `
precision highp float;
uniform vec2 uView;
in vec2 corner;
in vec3 cbary;
in vec4 aP;                   // x, y (screen px), size, rotation
in vec3 aL;                   // life 1..0, heat, opacity
out float vLife; out float vHeat; out float vOp; out vec3 vB;
void main(){
  float s=sin(aP.w), c=cos(aP.w);
  vec2 n=(aP.xy+mat2(c,s,-s,c)*corner*aP.z)/uView*2.-1.;
  gl_Position=vec4(n.x,-n.y,0.,1.);
  vLife=aL.x; vHeat=aL.y; vOp=aL.z; vB=cbary;
}`;

export const PART_FRAG = /* glsl */ `
${COMMON}
${AA}
in float vLife; in float vHeat; in float vOp; in vec3 vB;
out vec4 o;
void main(){
  float a=smoothstep(0.,.3,vLife)*(1.-smoothstep(.85,1.,vLife))*vOp;
  float rim=aa(min(min(vB.x,vB.y),vB.z));
  float body=vOp<.99?mix(.55,1.5,rim):1.;
  vec3 c=ramp(.4+.6*vHeat)*a*body*1.3;
  o=vec4(c,uEmissive>.5?0.:a*.3);
}`;

/* ------------------------------------------------------------------ post */

export const FS_VERT = /* glsl */ `
precision highp float;
in vec2 position;
out vec2 vUv;
void main(){ vUv=position*.5+.5; gl_Position=vec4(position,0.,1.); }`;

export const BLUR_FRAG = /* glsl */ `
precision highp float;
uniform sampler2D uTex;
uniform vec2 uStep;
in vec2 vUv; out vec4 o;
void main(){
  vec4 c=texture(uTex,vUv)*.2270;
  c+=(texture(uTex,vUv+uStep*1.385)+texture(uTex,vUv-uStep*1.385))*.3162;
  c+=(texture(uTex,vUv+uStep*3.231)+texture(uTex,vUv-uStep*3.231))*.0703;
  o=c;
}`;

export const DOWNSAMPLE_FRAG = /* glsl */ `
precision highp float;
uniform sampler2D uTex;
uniform vec2 uTexel;
in vec2 vUv; out vec4 o;
void main(){
  o=(texture(uTex,vUv+uTexel)+texture(uTex,vUv-uTexel)+texture(uTex,vUv+vec2(uTexel.x,-uTexel.y))+texture(uTex,vUv+vec2(-uTexel.x,uTexel.y)))*.25;
}`;

/**
 * The final grade: one pass from the HDR frame to the screen, over a transparent canvas (the background lives on its
 * own canvas behind). The navigation's progressive blur of the outer 20% (R11: in WebGL, not eight filtered CSS
 * layers); bloom and a warm horizontal streak where there is energy; highlights roll off above the shoulder (the type
 * below it keeps its exact colour); a slight chromatic aberration toward the frame and the vignette at the corners.
 * V25: no film grain and no animated dithering.
 */
export const GRADE_FRAG = /* glsl */ `
precision highp float;
uniform sampler2D uScene;
uniform sampler2D uBloom;
uniform sampler2D uStreak;
uniform sampler2D uSoft;
uniform vec2 uRes;            // drawing buffer, px
uniform vec4 uMix;            // bloom, streak, vignette, (grain: 0 since V25)
uniform vec3 uLens;           // chromatic aberration at the corners (px), shoulder, edge blur
in vec2 vUv; out vec4 o;
vec3 shoulder(vec3 c){
  float k=uLens.y;
  vec3 over=max(c-k,0.);
  return min(c,vec3(k))+(1.-k)*(1.-exp(-over/(1.-k)));
}
void main(){
  vec2 c=vUv-.5, asp=vec2(uRes.x/uRes.y,1.);
  float r=length(c*asp)/length(.5*asp);
  vec4 s=texture(uScene,vUv);
  if(uLens.x>0.){
    vec2 off=normalize(c+1e-6)*uLens.x*smoothstep(.45,1.,r)*r/uRes;
    s.r=texture(uScene,vUv+off).r; s.b=texture(uScene,vUv-off).b;
  }
  vec3 col=s.rgb;
  float band=smoothstep(.60,1.,abs(vUv.y-.5)*2.)*uLens.z;
  if(band>0.){ vec4 soft=texture(uSoft,vUv); col=mix(col,soft.rgb,band); s.a=mix(s.a,soft.a,band); }
  if(uMix.x>0.) col+=texture(uBloom,vUv).rgb*uMix.x;
  if(uMix.y>0.) col+=texture(uStreak,vUv).rgb*vec3(1.,.84,.55)*uMix.y;
  col=shoulder(col);
  col*=1.-uMix.z*smoothstep(.42,1.05,r)*smoothstep(.42,1.05,r);
  // premultiplied over the background: panels are opaque, light added over the void keeps its own coverage
  // R18: a fixed dither under one 8-bit step (the same pattern every frame: no grain, nothing moves) turns the steps of
  // long dark gradients into an even tone. Pure black stays black.
  vec2 g=gl_FragCoord.xy;
  col+=(fract(52.9829189*fract(dot(g,vec2(.06711056,.00583715))))+fract(52.9829189*fract(dot(g+vec2(41.,23.),vec2(.06711056,.00583715))))-1.)/255.*step(.5/255.,max(col.r,max(col.g,col.b)));
  float a=s.a;
  if(a<1.) a=clamp(max(a,max(col.r,max(col.g,col.b))),0.,1.);
  o=vec4(max(col,0.),a);
}`;
