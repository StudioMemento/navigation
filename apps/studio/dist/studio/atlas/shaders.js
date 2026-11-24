export const vertexShader = /* glsl */`
uniform float uMode,uTime,uA,uB,uC,uPointScale;
varying vec3 vP,vN,vBary;
varying vec2 vUv;
varying vec3 vAffine;
attribute vec3 barycentric;
void main(){
 vec3 p=position;
 if(uMode==8.){float t=floor(uTime*8.)/8.;p+=normal*sin(p.y*55.+p.x*23.+t*2.)*.0028*uB;}
 vec4 world=modelMatrix*vec4(p,1.);vP=world.xyz;vN=mat3(modelMatrix)*normal;
 vUv=uv;vBary=barycentric;
 vec4 clip=projectionMatrix*viewMatrix*world;
 vAffine=vec3(uv*clip.w,clip.w);
 if(uMode==7.){float res=mix(1200.,140.,uA);clip.xy=floor(clip.xy/clip.w*res+.5)/res*clip.w;}
 gl_Position=clip;
 gl_PointSize=clamp(uA*uPointScale/max(.3,clip.w),1.,12.);
}`;
export const fragmentShader = /* glsl */`
uniform sampler2D uMap,uEmit;
uniform float uMode,uTime,uA,uB,uC,uEmission,uCell;
uniform vec3 uOrigin;
varying vec3 vP,vN,vBary;
varying vec2 vUv;
varying vec3 vAffine;
float hash(vec3 p){return fract(sin(dot(p,vec3(127.1,311.7,74.7)))*43758.5453);}
float noise(vec3 p){vec3 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);return mix(mix(mix(hash(i),hash(i+vec3(1,0,0)),f.x),mix(hash(i+vec3(0,1,0)),hash(i+vec3(1,1,0)),f.x),f.y),mix(mix(hash(i+vec3(0,0,1)),hash(i+vec3(1,0,1)),f.x),mix(hash(i+vec3(0,1,1)),hash(i+vec3(1,1,1)),f.x),f.y),f.z);}
vec3 studio(vec3 r,float rough){
 float top=pow(max(0.,dot(r,normalize(vec3(-.5,1.,.5)))),mix(80.,3.,rough));
 float strip=pow(max(0.,1.-abs(r.x-.45)),mix(120.,8.,rough))*smoothstep(-.6,.1,r.y);
 float side=pow(max(0.,dot(r,normalize(vec3(-1.,.2,.3)))),mix(100.,5.,rough));
 float panel=exp(-pow((r.x-.25)/mix(.14,.6,rough),4.)-pow((r.y-.15)/.8,4.))*smoothstep(.1,.6,r.z);
 float opposite=exp(-pow((r.x+.6)/mix(.12,.5,rough),4.)-pow((r.y+.1)/.6,4.))*smoothstep(.1,.5,r.z);
 return mix(vec3(.008,.012,.02),vec3(.09,.12,.15),r.y*.5+.5)+top*vec3(2.8,2.7,2.5)+strip*vec3(1.8,2.1,2.5)+side*vec3(2.,1.1,.5)+panel*vec3(2.2,2.2,2.15)+opposite*vec3(1.4,.8,.4);
}
float lines(float x,float width){float d=abs(fract(x)-.5);return 1.-smoothstep(width,width+fwidth(x),d);}
void main(){
 vec2 uv=vUv;if(uMode==7.)uv=mix(uv,vAffine.xy/vAffine.z,uC);
 vec3 base=texture2D(uMap,uv).rgb;vec3 emit=texture2D(uEmit,uv).rgb;
 vec3 n=normalize(vN);vec3 fn=normalize(cross(dFdx(vP),dFdy(vP)));if(dot(fn,n)<0.)fn=-fn;
 float facet=0.;if(uMode==1.||uMode==21.)facet=uA;if(uMode==5.||uMode==7.)facet=1.;if(uMode==18.)facet=uC;
 n=normalize(mix(n,fn,facet));
 vec3 view=normalize(cameraPosition-vP);float fres=pow(1.-abs(dot(n,view)),3.);
 float grain=noise(vP*230.)-.5;float key=max(0.,dot(n,normalize(vec3(-2.,3.,4.))));float fill=max(0.,dot(n,normalize(vec3(3.,2.,1.))));
 float shade=.2+key*.88+fill*.24;
 vec3 light=vec3(.17,.19,.23)+key*vec3(1.05,.86,.69)+fill*vec3(.24,.31,.48);
 vec3 col=base*light;float alpha=1.;float shine=pow(max(0.,dot(n,normalize(view+normalize(vec3(-2.,3.,4.))))),45.);
 if(uMode==1.){col=base*mix(vec3(shade),light*vec3(1.25,.88,.57),uB)*(1.+grain*uC*.3);}
 if(uMode==2.){float cavity=.76+.24*pow(max(.001,dot(base,vec3(.2126,.7152,.0722))),.22);base=mix(vec3(.28,.3,.31),vec3(.48,.4,.3),uA);col=base*(mix(shade,.18+shade*.65,uB)+grain*uC*.15)*cavity;emit*=0.;}
 if(uMode==3.){vec3 q=(vP-uOrigin)/uCell;vec3 an=abs(n);vec2 g=an.y>max(an.x,an.z)?q.xz:an.x>an.z?q.yz:q.xy;vec2 edge=min(fract(g),1.-fract(g));float fw=max(fwidth(g.x),fwidth(g.y));float seam=(1.-smoothstep(.025,.025+fw*.5,min(edge.x,edge.y)))*(1.-smoothstep(.48,1.3,fw));col*=1.-seam*uA*.7;col*=mix(vec3(1),vec3(1.18,.86,.65),uB);col+=fres*uC*vec3(.35,.2,.1);emit*=1.-seam*uA*.5;}
 if(uMode==4.){float band=floor(clamp(shade,0.,1.)*uA)/max(1.,uA-1.);float l=dot(base,vec3(.2126,.7152,.0722));col=mix(vec3(l),base,uC)*(.25+band*.85);}
 if(uMode==5.){vec3 paper=vec3(.72,.57,.38);col=mix(paper,base*.8+paper*.25,uC)*shade*(1.+grain*uB*.5);vec3 aa=fwidth(vBary);float edge=1.-min(min(smoothstep(vec3(0),aa*1.2,vBary).x,smoothstep(vec3(0),aa*1.2,vBary).y),smoothstep(vec3(0),aa*1.2,vBary).z);col*=1.-edge*uA*.32;emit*=.5;}
 if(uMode==8.){float rings=sin((vP.x+vP.y*.4+noise(vP*9.)*.1)*240.);vec3 clay=mix(base,vec3(.4,.26,.14),.15+uC*.15);col=clay*(shade+grain*.2+rings*.035*uA);emit*=.65;}
 if(uMode==9.||uMode==10.){float l=dot(base,vec3(.2126,.7152,.0722));col=uMode==10.?vec3(.35+l*.5)*shade:mix(vec3(l),base,uC)*shade;}
 if(uMode==11.){col=mix(vec3(.6,.52,.4),base,.7)*(.55+shade*.5)*(1.+(noise(vP*25.)-.5)*uA*.55);emit*=.55;}
 if(uMode==12.){col=base*shade;}
 if(uMode==13.){vec3 aa=fwidth(vBary)*uA;vec3 e=smoothstep(vec3(0),aa,vBary);float line=1.-min(e.x,min(e.y,e.z));col=vec3(1.,.32,.035)*line*(1.+uB*3.)+base*uC*.2;alpha=max(line,uC);emit*=0.;}
 if(uMode==14.){float d=length(gl_PointCoord-.5)*2.;if(d>1.)discard;vec3 split=mix(vec3(.04,.3,.9),vec3(1.,.4,.06),smoothstep(-.7,.6,vP.x));col=mix(base*.9+emit*2.,split,uC)*1.3;alpha=(1.-smoothstep(.45,1.,d))*.85;}
 if(uMode==15.){float scan=.5+.5*sin(vP.y*480.);float beam=pow(.5+.5*sin(vP.y*7.-uTime*(.3+uC*2.)),18.);col=vec3(.02,.65,1.1)*(.13+fres*uB*3.+scan*uA*.3+beam*.6);alpha=.24+fres*.65;emit*=.12;}
 if(uMode==16.){vec3 env=studio(reflect(-view,n),.3+uA*.7);vec3 tint=mix(vec3(.7,.74,.76),vec3(.3,.65,.8),uC);col=tint*(.08+shade*.18)+env*(.12+fres*.55);alpha=clamp(1.-uB*.7+fres*.5,.25,1.);emit*=.35;}
 if(uMode==17.){vec3 ripple=vec3(sin(vP.y*25.+uTime*uC),sin(vP.z*30.+uTime*uC*1.3),cos(vP.x*22.+uTime*uC));n=normalize(n+ripple*uB*.08);col=studio(reflect(-view,n),uA)*(.65+fres*.4);emit*=.6;}
 if(uMode==18.){float vein=pow(1.-abs(sin((vP.y+noise(vP*5.)*.4)*95.)),18.);col=vec3(.008,.012,.017)*shade+studio(reflect(-view,n),.2)*(fres*.13+.012)*uA+vec3(.24,.17,.1)*vein*uB*.3;}
 if(uMode==19.){vec3 porcelain=mix(vec3(.65,.61,.5),base*.7+vec3(.15),uC);float crack=pow(1.-abs(sin((vP.x+vP.y+noise(vP*35.)*.04)*480.)),25.);col=porcelain*shade*(1.-crack*uB*.25)+studio(reflect(-view,n),.12)*(fres*.35+.035)*uA;emit*=.5;}
 if(uMode==20.){float pulse=1.+sin(uTime*1.7)*uC*.25;col=base*vec3(.16,.08,.3)*shade+fres*mix(vec3(.02,.8,1.),vec3(1.,.015,.5),smoothstep(-.6,.6,vP.x))*uA*2.*pulse;emit=mix(emit*vec3(1.4,.1,.9),vec3(.02,.5,.8)*length(emit),step(vP.x,0.))*pulse;}
 if(uMode==21.){col=vec3(.022,.024,.027)*shade+studio(reflect(-view,n),.55)*(fres*.11+.015)*uB;col*=mix(vec3(1),vec3(1.3,.91,.58),uC);}
 if(uMode==22.){col=vec3(.009+uC*.028)*shade+studio(reflect(-view,n),.2+uB*.55)*(fres*.1+.022)*uA;}
 if(uMode!=14.)col+=emit*uEmission;
 gl_FragColor=vec4(max(col,vec3(0)),alpha);
}`;
export const screenVertex=`varying vec2 vUv;void main(){vUv=uv;gl_Position=vec4(position.xy,0.,1.);}`;
export const screenFragment=/* glsl */`
uniform sampler2D uScene;uniform vec2 uResolution;uniform float uDpr,uMode,uA,uB,uC,uExposure,uTransparent;
varying vec2 vUv;
float hash(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
vec3 tone(vec3 c){c*=uExposure;return pow(clamp((c*(2.51*c+.03))/(c*(2.43*c+.59)+.14),0.,1.),vec3(1./2.2));}
float lum(vec3 c){return dot(c,vec3(.2126,.7152,.0722));}
vec3 sampleColor(vec2 p){return tone(texture2D(uScene,p).rgb);}
void main(){vec2 uv=vUv;vec2 px=1./uResolution;float pixel=uMode==6.?uA*uDpr:uMode==7.?max(1.,uDpr*2.):1.;if(pixel>1.)uv=(floor(uv*uResolution/pixel)+.5)*pixel/uResolution;
 vec4 raw=texture2D(uScene,uv);vec3 col=tone(raw.rgb);float grain=hash(gl_FragCoord.xy)-.5;
 float edge=0.;if(uMode==4.||uMode==9.||uMode==10.||uMode==11.){vec3 l=sampleColor(uv-vec2(px.x,0)*1.4*uDpr),r=sampleColor(uv+vec2(px.x,0)*1.4*uDpr),t=sampleColor(uv+vec2(0,px.y)*1.4*uDpr),b=sampleColor(uv-vec2(0,px.y)*1.4*uDpr);edge=length(l-r)+length(t-b);}
 if(uMode==4.)col*=1.-clamp(edge*uB*2.5,0.,.9);
 if(uMode==6.||uMode==7.){float levels=uMode==6.?uB:mix(32.,5.,uB);vec2 ip=floor(uv*uResolution/pixel);float d=mod(ip.x+mod(ip.y,2.)*2.,4.)/4.-.375;col=floor(clamp(col+d/levels*(uMode==6.?uC:.65),0.,1.)*levels+.5)/levels;}
 if(uMode==9.||uMode==10.){vec2 p=gl_FragCoord.xy/uDpr;float l=lum(col);float h1=step(.63,fract((p.x+p.y)/5.)),h2=step(.72,fract((p.x-p.y)/6.));float hatch=h1*(1.-smoothstep(.25,.85,l))+h2*(1.-smoothstep(.1,.55,l));float ink=uMode==9.?uA:uA*.75;col*=1.-clamp(edge*ink*2.5,0.,.94);col*=1.-hatch*uB*.55;if(uMode==10.)col=mix(vec3(.94,.92,.87),vec3(.16,.15,.14),clamp((1.-lum(col))*(.65+uA*.7),0.,1.));col+=grain*(uMode==10.?uC:.3)*.12;}
 if(uMode==11.){vec2 d=vec2(px.x,px.y)*(1.+uB*5.)*uDpr;vec3 bleed=(sampleColor(uv+d)+sampleColor(uv-d)+sampleColor(uv+vec2(d.x,-d.y))+sampleColor(uv+vec2(-d.x,d.y)))*.25;col=mix(col,bleed,uB*.5);col=mix(col,vec3(.94,.9,.8),.17);col*=1.-clamp(edge*uA*.4,0.,.25);col+=grain*uC*.14;}
 if(uMode==12.){vec3 shifted=sampleColor(uv+vec2(uB*5.*uDpr,0)*px);float orange=clamp((shifted.r-shifted.b)*2.,0.,1.);float dark=1.-lum(col);vec2 p=fract(gl_FragCoord.xy/(uA*uDpr))-.5;float dotMask=1.-smoothstep(sqrt(max(.01,dark))*.48,sqrt(max(.01,dark))*.48+.06,length(p));vec3 paper=vec3(.92,.86,.73),blue=vec3(.07,.17,.28),warm=vec3(.86,.28,.09);col=mix(paper,mix(blue,warm,orange),dotMask*(.35+uC*.65));col+=grain*.05;}
 if(uMode==3.||uMode==13.||uMode==14.||uMode==15.||uMode==20.){vec3 bloom=vec3(0);for(int x=-1;x<=1;x++){for(int y=-1;y<=1;y++){vec3 s=texture2D(uScene,uv+vec2(float(x),float(y))*px*4.*uDpr).rgb;bloom+=max(s-vec3(.75),vec3(0));}}col+=bloom/9.*.055*(uTransparent>.5?0.:1.);}
 gl_FragColor=vec4(clamp(col,0.,1.),raw.a);
}`;
export const floorVertex=`varying vec3 vP;void main(){vec4 w=modelMatrix*vec4(position,1.);vP=w.xyz;gl_Position=projectionMatrix*viewMatrix*w;}`;
export const floorFragment=`uniform vec3 uBg;uniform float uMode,uB;varying vec3 vP;void main(){float shadow=exp(-vP.x*vP.x*1.8-vP.z*vP.z*5.);vec3 col=uBg*(1.-shadow*.8);if(uMode==20.){vec2 q=vP.xz*7.;vec2 d=abs(fract(q-.5)-.5)/max(fwidth(q),vec2(.001));float line=1.-min(min(d.x,d.y),1.);col+=vec3(.32,.012,.42)*line*uB*exp(-length(vP.xz)*.2);}if(uMode==3.||uMode==1.||uMode==18.)col+=vec3(.16,.035,.002)*exp(-vP.x*vP.x*3.-vP.z*vP.z*16.);float fog=1.-exp(-dot(vP.xz,vP.xz)*.08);gl_FragColor=vec4(mix(col,uBg,fog),1.);}`;
