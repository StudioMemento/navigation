// Each physical display gets a deterministic composition; no video decoder,
// texture uploads or canvas allocations in the frame loop.
export function displaySeed(name){let h=2166136261;for(const c of name){h^=c.charCodeAt(0);h=Math.imul(h,16777619);}return (h>>>0)%1000/97;}
export const screenGLSL=/*glsl*/`
vec3 displayArt(vec2 uv,float seed){
 float t=uTime*.20+seed;vec2 p=uv*2.-1.;p.x*=1.7;
 float field=sin(p.x*2.2+sin(p.y*2.6+t)*.8+t*.7);
 float contour=abs(fract(field*2.5+p.y*.8)-.5);
 float fw=max(fwidth(contour),.008);float contourInk=1.-smoothstep(.012,.012+fw,contour);
 float orb=1.-smoothstep(.29,.32,length(p-vec2(sin(t*.7)*.48,cos(t*.9)*.2)));
 float ring=1.-smoothstep(.012,.025,abs(length(p-vec2(-.35,.08))-(.48+sin(t)*.06)));
 float scan=exp(-pow((p.y-sin(p.x*.8+t)*.3)*9.,2.));
 float design=mod(floor(seed),3.);float pattern=design<1.?contourInk*.5+orb*.8:design<2.?ring*.9+scan*.55:contourInk*.22+scan*.8+orb*.25;
 vec3 primary=uAccent,secondary=mix(vec3(.05,.35,.65),primary,.35);
 if(uMode==9.||uMode==10.||uMode==26.){primary=vec3(.94,.9,.81);secondary=vec3(.27,.3,.32);}
 if(uMode==24.){primary=vec3(.65,.84,1.);secondary=vec3(.025,.1,.33);}
 if(uMode==20.){primary=vec3(1.,.035,.5);secondary=vec3(.02,.7,1.);}
 if(uMode==2.||uMode==5.||uMode==11.||uMode==19.)primary=mix(primary,vec3(1.,.84,.64),.65);
 vec3 color=mix(secondary,primary,.5+.5*sin(field+t*.4))*pattern;
 float vignette=smoothstep(1.6,.25,length(p*vec2(.55,.9)));
 return (vec3(.004,.006,.009)+color*vignette)*2.4;
}
float screenMask(vec3 p,vec3 n){
 vec3 q=(p-uObjectMin)/max(uObjectMax-uObjectMin,vec3(.001));
 float front=smoothstep(.4,.85,n.z);
 return front*smoothstep(.018,.04,q.x)*(1.-smoothstep(.96,.985,q.x))*smoothstep(uScreenBase,uScreenBase+.025,q.y)*(1.-smoothstep(.97,.995,q.y));
}
`;
