import {fragmentShader,screenFragment} from './atlas/shaders.js';
// Original Atlas equations stay versioned in atlas/. This adapter replaces the
// workstation's baked textures and fixed key with the real Studio AO and rig.
let body=fragmentShader.slice(fragmentShader.indexOf('float hash('),fragmentShader.indexOf('void main(){'));
let surface=fragmentShader.slice(fragmentShader.indexOf(' float facet=0.;'));
surface=surface.replace(/ float grain=noise[\s\S]*?vec3 col=base\*light;/,' float grain=noise(vP*230.)-.5;vec3 col=base*light;');
surface=surface.replace('n=normalize(mix(n,fn,facet));','n=normalize(mix(n,fn,facet));float fg=mix(1.,clamp((.25+max(0.,dot(n,uKeyDir)))/(.25+max(0.,dot(normalize(vN),uKeyDir))),.3,2.),facet);light*=fg;shade*=fg;').replaceAll('vN','vStudioNormal');
surface=surface.replace('gl_FragColor=vec4(max(col,vec3(0)),alpha);','return vec4(max(col,vec3(0)),alpha);');
surface=surface.replace(' if(uMode!=14.)col+=emit*uEmission;',`
 if(uMode==23.){float hatch=lines((vP.x+vP.y*.6)*75.,.12);col=vec3(.52,.22,.09)*shade*(1.-hatch*.28)+studio(reflect(-view,n),.45)*(.035+fres*.2);}
 if(uMode==24.){col=vec3(.25+dot(base,vec3(.2126,.7152,.0722))*.6)*shade;}
 if(uMode==25.){vec3 iridescence=.5+.5*cos(vec3(.1,2.2,4.4)+fres*7.+vP.y*.3);col=vec3(.35,.34,.32)*shade+studio(reflect(-view,n),.32)*(.04+fres*.16)+iridescence*fres*uA*.7;}
 if(uMode==26.){col=vec3(.3+dot(base,vec3(.2126,.7152,.0722))*.7)*shade;}
 if(uMode==27.){float brushing=noise(vec3(vP.x*550.,vP.y*5.,vP.z*8.));n=normalize(n+vec3((brushing-.5)*.08,0.,0.));col=vec3(.10,.13,.17)*shade+studio(reflect(-view,n),.35)*(.24+fres*.25)*(1.-brushing*.16);}
 if(uMode==28.){float relief=lines((vP.y+noise(vP*5.)*.012)*95.,.18);col=vec3(.32,.30,.27)*shade*(.82+relief*.16)+studio(reflect(-view,n),.26)*(.055+fres*.2);}
 // Reflective and emissive families retain the chosen lighting's intensity/tint.
 if(uMode==13.||uMode==15.||uMode>=16.&&uMode<=22.||uMode==25.||uMode==27.||uMode==28.)col*=mix(vec3(1.),uRigTint,.65)*clamp(uRigEnergy,.28,1.7);
 if(uMode!=14.)col+=emit*uEmission;
`);
export const atlasSurface=(body+`vec4 atlasSurface(float uMode,float uA,float uB,float uC,vec3 base,vec3 emit,vec3 n,vec3 light,float shade){
 vec3 fn=normalize(cross(dFdx(vP),dFdy(vP)));if(dot(fn,n)<0.)fn=-fn;
`+surface).replaceAll('vP','vStudio').replaceAll('vBary','vStudioBary').replace(/\bhash\(/g,'atlasHash(').replace(/\bnoise\(/g,'atlasNoise(').replace(/\bstudio\(/g,'atlasReflections(').replace(/\blines\(/g,'atlasLines(');

// Postprocess the original source with a coverage mask: black stays exactly black.
export const atlasPost=screenFragment
 .replace('uniform sampler2D uScene;','uniform sampler2D uScene;uniform float uFade;')
 .replace('void main(){vec2 uv=vUv;', 'void main(){vec2 uv=vUv;')
 .replace('vec4 raw=texture2D(uScene,uv);','vec4 raw=texture2D(uScene,uv);if(raw.a<.001){gl_FragColor=vec4(0.,0.,0.,1.);return;}')
 .replace(' gl_FragColor=vec4(clamp(col,0.,1.),raw.a);',`
 if(uMode==24.){float l=lum(col);vec2 p=gl_FragCoord.xy/uDpr;float h=step(.75,fract((p.x+p.y)/5.));l*=1.-h*(1.-l)*.32;col=mix(vec3(.015,.055,.15),vec3(.80,.90,.94),smoothstep(.05,.95,l));}
 if(uMode==26.){float l=lum(col);vec2 p=fract(gl_FragCoord.xy/(uA*uDpr))-.5;float dotMask=1.-smoothstep(sqrt(max(.01,1.-l))*.48,sqrt(max(.01,1.-l))*.48+.07,length(p));col=mix(vec3(.85,.82,.76),vec3(.022,.025,.03),dotMask);}
 gl_FragColor=vec4(clamp(col*uFade,0.,1.)*smoothstep(0.,.65,raw.a),1.);
`);
