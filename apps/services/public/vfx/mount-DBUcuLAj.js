var e=[{place:[0,0,0,0],gain:1,tint:0},{place:[1.9,-4.6,-.08,2.4],gain:.5,tint:.75},{place:[-1.05,2,.12,4.1],gain:.55,tint:.35},{place:[-2.4,-2.4,.045,6.5],gain:.38,tint:.65},{place:[2.2,3.2,-.09,8.1],gain:.34,tint:.2}],t=t=>Math.max(1,Math.min(e.length,Math.round(t)||1)),n=1600,r=5,i=2.6,a=7.5,o=.56,s=24,c={focus:0,part:1,none:2},l={dots:0,dashes:.45,lines:1},u={depth:0,along:1,across:2},d=Math.PI/180,f=1/(2*Math.tan(o/2)),p=`#version 300 es
precision highp float;
`,m=`${p}
${`
uniform float uTime;
uniform float uTwist;
uniform float uRoll;
uniform float uWaves;
uniform float uWidth;
uniform float uRibbon;
uniform mat3 uOrient;
uniform float uScale;
uniform vec4 uPlace;
uniform float uVolume;

float hash11(float n) {
  return fract(sin(n * 91.3458) * 47453.5453);
}

vec3 centerLocal(float s) {
  float t = uTime;
  float ph = uPlace.w;
  float x = s * ${s.toFixed(1)};
  float y = uWaves * (0.52 * sin(x * 0.43 + t * 0.31 + ph) + 0.26 * sin(x * 0.79 - t * 0.23 + 1.3 + ph * 0.7)) + uPlace.x + x * uPlace.z;
  float z = uWaves * 0.65 * sin(x * 0.33 + t * 0.19 + 0.7 + ph * 1.3) + uPlace.y;
  return vec3(x, y, z);
}

float twistAt(float s, float layer) {
  float x = s * ${s.toFixed(1)};
  return uTwist * 0.483 * x + uRoll + uPlace.w * 0.6 + layer * uVolume * 0.42 + 0.5 * sin(x * 0.26 + uTime * 0.27 + uPlace.w);
}

vec3 ribbonPoint(float s, float v, float n, float layer, out vec3 normal) {
  vec3 c0 = centerLocal(s);
  vec3 c1 = centerLocal(s + 0.004);
  vec3 tangent = normalize(c1 - c0);
  vec3 up = vec3(0.0, 1.0, 0.0);
  vec3 n0 = normalize(up - tangent * dot(up, tangent));
  vec3 b0 = cross(tangent, n0);
  float th = twistAt(s, layer);
  vec3 across = cos(th) * n0 + sin(th) * b0;
  vec3 sheet = -sin(th) * n0 + cos(th) * b0;
  float halfWidth = uWidth * (0.78 + 0.22 * cos(s * 3.14159));
  vec3 local = c0 + across * v * halfWidth + sheet * (n + layer * uVolume * 0.16) * halfWidth;
  normal = uOrient * sheet;
  return uOrient * (local * uScale);
}
`}
uniform mat4 uViewProj;
uniform vec3 uEye;
uniform vec2 uViewport;
uniform float uDpr;
uniform float uFibers;
uniform float uDots;
uniform float uFlow;
uniform float uSize;
uniform float uFocus;
uniform float uDof;
uniform float uMaxCoc;
uniform float uFocal;
uniform float uIntro;
uniform vec4 uPulse;
uniform vec4 uHover;
uniform float uPart;
uniform float uDotLength;
uniform float uSparkle;
uniform float uDepthSpread;
uniform float uGain;
uniform float uTips;
uniform float uTint;
uniform float uGradient;
uniform float uFold;

out vec2 vLocal;
out float vRadius;
out float vSegment;
out vec3 vLight;
out float vTint;

vec3 project(vec3 world, out float depth) {
  vec4 clip = uViewProj * vec4(world, 1.0);
  depth = clip.w;
  vec2 ndc = clip.xy / clip.w;
  return vec3((ndc * 0.5 + 0.5) * uViewport, clip.w);
}

vec2 part(vec2 px) {
  if (uPart <= 0.0 || uHover.w <= 0.0) return px;
  vec2 away = px - uHover.xy;
  float dist = length(away);
  float radius = uHover.z;
  float push = uPart * uHover.w * radius * 0.55 * exp(-dist * dist / (radius * radius));
  return px + away / max(dist, 1e-3) * push * smoothstep(0.0, radius * 0.25, dist);
}

void main() {
  int perFiber = int(uDots);
  int fiber = gl_InstanceID / perFiber;
  int bead = gl_InstanceID - fiber * perFiber;
  float fi = float(fiber);
  float fk = float(bead);

  float seed = hash11(fi * 1.731 + uRibbon * 17.0);
  float s = fract((fk + uFlow + seed * uDots) / uDots) - 0.5;
  float sNext = s + 1.0 / uDots;
  float layer = mod(fi, 3.0) - 1.0;
  float slot = floor(fi / 3.0);
  float perLayer = max(floor(uFibers / 3.0), 1.0);
  float v = ((slot + 0.5) / perLayer) * 2.0 - 1.0 + (hash11(fi * 3.113 + 4.0) - 0.5) * (1.6 / perLayer) + layer * 0.12 / perLayer;
  float depthOffset = (hash11(fi * 7.919 + 2.0) - 0.5) * uDepthSpread * (0.35 + 6.0 * s * s);

  vec3 normal;
  vec3 world = ribbonPoint(s, v, depthOffset, layer, normal);
  vec3 nextNormal;
  vec3 nextWorld = ribbonPoint(sNext, v, depthOffset, layer, nextNormal);

  float depth;
  vec3 p0 = project(world, depth);
  float nextDepth;
  vec3 p1 = project(nextWorld, nextDepth);
  vec2 px = part(p0.xy);
  vec2 pxNext = part(p1.xy);

  float baseRadius = max(0.5 * uSize * uDpr * uFocal / max(depth, 0.1), 0.45);
  float coc = min(uDof * abs(1.0 - uFocus / max(depth, 0.1)) * uViewport.y * 0.035, uMaxCoc * uDpr);
  float radius = baseRadius + coc;
  float spill = max(10.0 * uDpr, baseRadius);
  float energy = pow(baseRadius / min(radius, spill), 1.25) * pow(min(1.0, spill / radius), 2.0);

  vec3 toEye = normalize(uEye - world);
  float facing = abs(dot(normalize(normal), toEye));
  float focalPx = uViewport.y * ${f.toFixed(5)} / max(depth, 0.1);
  float widthPx = 2.0 * uWidth * uScale * focalPx;
  float stack = (widthPx * facing + 2.0 * baseRadius) / (widthPx + 2.0 * baseRadius);
  float spacingFace = length(nextWorld - world) * focalPx;
  float trail = (length(p1.xy - p0.xy) + 2.0 * baseRadius) / (spacingFace + 2.0 * baseRadius);
  float crowd = sqrt(clamp(stack * trail, 0.002, 1.0));
  float fold = pow(1.0 - facing, 6.0) * uFold;
  float endFade = smoothstep(0.5, 0.4, abs(s)) * smoothstep(1.6, 4.2, depth);
  float tipEnd = mix(0.6, 0.06 + 0.26 * hash11(fi * 9.137 + uPlace.w * 3.0), uTips);
  float tip = exp(-pow((s - tipEnd) / 0.0065, 2.0)) * uTips;
  endFade *= smoothstep(tipEnd + 0.003, tipEnd - 0.001, s);
  float appear = smoothstep(0.0, 0.12, uIntro * 1.3 - (s + 0.5) - seed * 0.12);
  float twinklePhase = hash11(fi * 13.7 + fk * 0.917 + uRibbon * 3.0);
  float twinkle = pow(max(sin(uTime * (1.2 + 2.6 * twinklePhase) * 3.0 + twinklePhase * 61.0), 0.0), 36.0) * uSparkle * (1.0 - 0.85 * uDotLength);
  float pulseGap = abs(s - uPulse.x) - uPulse.y * 0.42;
  float pulse = uPulse.z * exp(-pulseGap * pulseGap / 0.0018) * (abs(uPulse.w - uRibbon) < 0.5 ? 1.0 : 0.35);
  float strength = mix(0.45, 1.0, hash11(fi * 5.37 + 1.0)) * mix(1.0, 0.72, abs(layer) * uVolume);
  float intensity = energy * crowd * strength * endFade * appear * 0.8 * uGain * (1.0 + fold * 7.0 + twinkle * 5.0 + pulse * 4.0 + tip * 7.0);
  float highlight = clamp(fold * 0.55 + twinkle + pulse + tip, 0.0, 1.0);

  vec2 segment = (pxNext - px) * uDotLength;
  float segmentLength = length(segment);
  intensity *= mix(1.0, (2.0 * radius) / (segmentLength + 2.0 * radius) * 1.6, uDotLength);
  vec2 axis = segmentLength > 1e-3 ? segment / segmentLength : vec2(1.0, 0.0);
  vec2 perp = vec2(-axis.y, axis.x);
  vec2 corner = vec2(gl_VertexID == 1 || gl_VertexID == 3 ? 1.0 : 0.0, gl_VertexID >= 2 ? 1.0 : 0.0);
  float along = mix(-radius, segmentLength + radius, corner.x);
  float across = mix(-radius, radius, corner.y);
  vec2 position = px + axis * along + perp * across;

  vLocal = vec2(along, across);
  vRadius = radius;
  vSegment = segmentLength;
  vLight = vec3(intensity, highlight, coc / max(radius, 1e-3));
  float depthTint = clamp(uTint + smoothstep(uFocus, uFocus + 5.0, depth) * 0.5, 0.0, 1.0);
  vTint = uGradient < 0.5 ? depthTint : uGradient < 1.5 ? smoothstep(-0.42, 0.42, s) : clamp(v * 0.5 + 0.5, 0.0, 1.0);
  if (intensity < 0.0005) position = vec2(-1e4);
  gl_Position = vec4(position / uViewport * 2.0 - 1.0, 0.0, 1.0);
}`,h=`${p}
uniform mat4 uViewProj;
uniform vec2 uViewport;
uniform float uDpr;
uniform float uTime;
uniform float uSize;
uniform float uFocus;
uniform float uDof;
uniform float uMaxCoc;
uniform float uFocal;
uniform float uIntro;
uniform float uSparkle;
uniform float uScale;
uniform float uGradient;
uniform float uGain;

out vec2 vLocal;
out float vRadius;
out float vSegment;
out vec3 vLight;
out float vTint;

float hash11(float n) {
  return fract(sin(n * 91.3458) * 47453.5453);
}

void main() {
  float id = float(gl_InstanceID);
  vec3 seed = vec3(hash11(id * 1.37 + 0.3), hash11(id * 2.91 + 1.7), hash11(id * 4.17 + 2.9));
  vec3 box = vec3(9.0, 5.4, 6.0);
  vec3 p = (seed - 0.5) * box;
  p.z -= 0.6;
  p += 0.18 * vec3(sin(uTime * 0.21 + seed.x * 40.0), sin(uTime * 0.17 + seed.y * 40.0), sin(uTime * 0.13 + seed.z * 40.0));
  p *= mix(1.0, uScale, 0.5);
  vec4 clip = uViewProj * vec4(p, 1.0);
  float depth = clip.w;
  vec2 px = (clip.xy / clip.w * 0.5 + 0.5) * uViewport;
  float size = uSize * mix(0.5, 1.4, hash11(id * 7.7));
  float baseRadius = max(0.5 * size * uDpr * uFocal / max(depth, 0.1), 0.45);
  float coc = min(uDof * abs(1.0 - uFocus / max(depth, 0.1)) * uViewport.y * 0.035, uMaxCoc * uDpr * 1.6);
  float radius = baseRadius + coc;
  float spill = max(10.0 * uDpr, baseRadius);
  float energy = pow(baseRadius / min(radius, spill), 0.9) * pow(min(1.0, spill / radius), 2.0);
  float twinkle = pow(max(sin(uTime * (0.8 + 1.6 * seed.y) * 2.0 + seed.z * 50.0), 0.0), 8.0);
  float intensity = energy * (0.35 + 0.65 * twinkle) * mix(0.4, 1.0, seed.x) * smoothstep(0.3, 1.0, uIntro) * (depth > 0.2 ? 1.0 : 0.0);
  vec2 corner = vec2(gl_VertexID == 1 || gl_VertexID == 3 ? 1.0 : 0.0, gl_VertexID >= 2 ? 1.0 : 0.0) * 2.0 - 1.0;
  vec2 position = px + corner * radius;
  vLocal = corner * radius;
  vRadius = radius;
  vSegment = 0.0;
  vLight = vec3(intensity * 0.8 * uGain, 0.3 + 0.6 * twinkle * uSparkle, coc / max(radius, 1e-3));
  vTint = uGradient < 0.5 ? 0.45 + 0.55 * seed.y : seed.y;
  gl_Position = vec4(position / uViewport * 2.0 - 1.0, 0.0, 1.0);
}`,g=`${p}
uniform vec3 uGlowColor;
uniform vec3 uLineColor;
uniform vec3 uSecondaryColor;
in vec2 vLocal;
in float vRadius;
in float vSegment;
in vec3 vLight;
in float vTint;
out vec4 outColor;
void main() {
  float along = clamp(vLocal.x, 0.0, vSegment);
  float d = length(vec2(vLocal.x - along, vLocal.y));
  float rho = d / max(vRadius, 1e-3);
  if (rho > 1.0) discard;
  float soft = clamp(2.6 / max(vRadius, 1e-3), 0.14, 1.0);
  float disk = 1.0 - smoothstep(1.0 - soft, 1.0, rho);
  float bokeh = disk * (0.94 + 0.08 * smoothstep(0.55, 0.95, rho));
  float core = exp(-rho * rho * 3.2);
  float shape = mix(core, bokeh, smoothstep(0.25, 0.7, vLight.z));
  vec3 color = mix(mix(uGlowColor, uSecondaryColor, vTint), uLineColor, vLight.y);
  outColor = vec4(color * shape * vLight.x, shape * vLight.x);
}`,_=`${p}
out vec2 vUv;
void main() {
  vec2 p = vec2(gl_VertexID == 1 ? 3.0 : -1.0, gl_VertexID == 2 ? 3.0 : -1.0);
  vUv = p * 0.5 + 0.5;
  gl_Position = vec4(p, 0.0, 1.0);
}`,ee=`${p}
uniform sampler2D uSource;
uniform vec2 uTexel;
in vec2 vUv;
out vec4 outColor;
vec3 pick(vec2 uv) {
  vec3 c = texture(uSource, uv).rgb;
  float peak = max(max(c.r, c.g), c.b);
  return c * smoothstep(0.35, 1.2, peak);
}
void main() {
  vec2 o = uTexel;
  vec3 c = pick(vUv + vec2(-o.x, -o.y)) + pick(vUv + vec2(o.x, -o.y)) + pick(vUv + vec2(-o.x, o.y)) + pick(vUv + vec2(o.x, o.y));
  outColor = vec4(c * 0.25, 1.0);
}`,te=`${p}
uniform sampler2D uSource;
uniform vec2 uTexel;
in vec2 vUv;
out vec4 outColor;
void main() {
  vec2 o = uTexel;
  vec3 c = texture(uSource, vUv).rgb * 4.0;
  c += texture(uSource, vUv + vec2(-o.x, -o.y)).rgb;
  c += texture(uSource, vUv + vec2(o.x, -o.y)).rgb;
  c += texture(uSource, vUv + vec2(-o.x, o.y)).rgb;
  c += texture(uSource, vUv + vec2(o.x, o.y)).rgb;
  outColor = vec4(c / 8.0, 1.0);
}`,ne=`${p}
uniform sampler2D uSource;
uniform vec2 uTexel;
in vec2 vUv;
out vec4 outColor;
void main() {
  vec2 o = uTexel;
  vec3 c = texture(uSource, vUv + vec2(-o.x * 2.0, 0.0)).rgb;
  c += texture(uSource, vUv + vec2(-o.x, o.y)).rgb * 2.0;
  c += texture(uSource, vUv + vec2(0.0, o.y * 2.0)).rgb;
  c += texture(uSource, vUv + vec2(o.x, o.y)).rgb * 2.0;
  c += texture(uSource, vUv + vec2(o.x * 2.0, 0.0)).rgb;
  c += texture(uSource, vUv + vec2(o.x, -o.y)).rgb * 2.0;
  c += texture(uSource, vUv + vec2(0.0, -o.y * 2.0)).rgb;
  c += texture(uSource, vUv + vec2(-o.x, -o.y)).rgb * 2.0;
  outColor = vec4(c / 12.0, 1.0);
}`,re=`${p}
uniform sampler2D uScene;
uniform sampler2D uBloom;
uniform float uGlow;
uniform float uBrightness;
uniform float uLightMode;
uniform float uGrain;
uniform float uVignette;
uniform float uFrame;
uniform vec2 uView;
uniform float uDpr;
in vec2 vUv;
out vec4 outColor;

float hash(vec2 p) {
  vec3 q = fract(vec3(p.xyx) * 0.1031);
  q += dot(q, q.yzx + 33.33);
  return fract((q.x + q.y) * q.z);
}

float smoother(float x) {
  x = clamp(x, 0.0, 1.0);
  return x * x * x * (x * (x * 6.0 - 15.0) + 10.0);
}

void main() {
  vec4 scene = texture(uScene, vUv);
  vec3 bloom = texture(uBloom, vUv).rgb;
  vec3 light = (scene.rgb + bloom * uGlow) * uBrightness;
  float reach = max(uVignette * 0.3, 1e-4);
  float mask = uVignette > 0.0 ? smoother(vUv.x / reach) * smoother((1.0 - vUv.x) / reach) * smoother(vUv.y / reach) * smoother((1.0 - vUv.y) / reach) : 1.0;
  vec2 cell = floor(vUv * uView / max(uDpr, 1.0));
  float grain = hash(cell + uFrame * 17.31) + hash(cell * 1.31 + uFrame * 3.7 + 9.1) - 1.0;
  if (uLightMode > 0.5) {
    float amount = scene.a * uBrightness;
    float ink = (1.0 - exp(-amount * 1.5)) * mask;
    ink = clamp(ink * (1.0 + grain * uGrain * 2.0), 0.0, 1.0);
    vec3 hue = clamp(scene.rgb / max(scene.a, 1e-4), 0.0, 1.0);
    vec3 tone = hue * mix(1.0, 0.72, clamp(amount * 0.35, 0.0, 1.0));
    outColor = vec4(tone * ink, ink);
    return;
  }
  vec3 color = (1.0 - exp(-light * 1.25)) * mask;
  float peak = max(color.r, max(color.g, color.b));
  color = max(color + grain * uGrain * (0.25 + 0.75 * sqrt(peak)), 0.0);
  outColor = vec4(color, max(color.r, max(color.g, color.b)));
}`,ie=/* @__PURE__ */ `uTime.uTwist.uRoll.uWaves.uWidth.uRibbon.uOrient.uScale.uPlace.uVolume.uViewProj.uEye.uViewport.uDpr.uFibers.uDots.uFlow.uSize.uFocus.uDof.uMaxCoc.uFocal.uIntro.uPulse.uHover.uPart.uDotLength.uSparkle.uDepthSpread.uGain.uTips.uTint.uGradient.uFold.uGlowColor.uLineColor.uSecondaryColor`.split(`.`),ae=[`uViewProj`,`uViewport`,`uDpr`,`uTime`,`uSize`,`uFocus`,`uDof`,`uMaxCoc`,`uFocal`,`uIntro`,`uSparkle`,`uScale`,`uGradient`,`uGain`,`uGlowColor`,`uLineColor`,`uSecondaryColor`],v=[`uSource`,`uTexel`],oe=[`uScene`,`uBloom`,`uGlow`,`uBrightness`,`uLightMode`,`uGrain`,`uVignette`,`uFrame`,`uView`,`uDpr`],y=(e,t,n)=>Math.min(n,Math.max(t,e)),b=(e,t,n)=>{let r=e.createShader(t);return r?(e.shaderSource(r,n),e.compileShader(r),e.getShaderParameter(r,e.COMPILE_STATUS)?r:(e.deleteShader(r),null)):null},x=(e,t,n,r)=>{let i=b(e,e.VERTEX_SHADER,t),a=b(e,e.FRAGMENT_SHADER,n),o=e.createProgram();if(!i||!a||!o)return null;if(e.attachShader(o,i),e.attachShader(o,a),e.linkProgram(o),e.deleteShader(i),e.deleteShader(a),!e.getProgramParameter(o,e.LINK_STATUS))return e.deleteProgram(o),null;let s={};for(let t of r)s[t]=e.getUniformLocation(o,t);return{program:o,uniforms:s}},se=(e,t,n,r)=>{let i=1/Math.tan(e/2),a=1/(n-r);return[i/t,0,0,0,0,i,0,0,0,0,(r+n)*a,-1,0,0,2*r*n*a,0]},ce=(e,t)=>{let n=Array(16);for(let r=0;r<4;r+=1)for(let i=0;i<4;i+=1)n[r*4+i]=e[i]*t[r*4]+e[4+i]*t[r*4+1]+e[8+i]*t[r*4+2]+e[12+i]*t[r*4+3];return n},le=(e,t,n)=>{let r=Math.cos(e),i=Math.sin(e),a=Math.cos(t),o=Math.sin(t),s=Math.cos(n),c=Math.sin(n),l=[r,0,-i,0,1,0,i,0,r],u=[1,0,0,0,a,o,0,-o,a],d=[s,c,0,-c,s,0,0,0,1],f=(e,t)=>{let n=Array(9);for(let r=0;r<3;r+=1)for(let i=0;i<3;i+=1)n[r*3+i]=e[i]*t[r*3]+e[3+i]*t[r*3+1]+e[6+i]*t[r*3+2];return n};return f(d,f(u,l))},ue=(e,t)=>[e[0]*t[0]+e[3]*t[1]+e[6]*t[2],e[1]*t[0]+e[4]*t[1]+e[7]*t[2],e[2]*t[0]+e[5]*t[1]+e[8]*t[2]];function S(f,{glowColor:p=`#8b5cf6`,lineColor:b,secondaryColor:S,gradient:de=`depth`,speed:fe=.5,scale:pe=1,rotation:me=18,rollSpeed:he=.15,layers:ge=3,waves:_e=1,twist:ve=1.2,threads:ye=72,volume:be=.7,spread:xe=1,density:Se=1,thickness:Ce=1,flow:we=.4,fiberStyle:Te=`dots`,tips:Ee=0,foldGlow:De=1,perspective:Oe=.65,depthOfField:ke=.85,focusDepth:Ae=0,particles:je=.5,sparkle:Me=.5,glow:Ne=.8,brightness:Pe=1,vignette:Fe=.3,grain:Ie=.06,mouseInteraction:Le=!0,hoverEffect:Re=`focus`,mouseStrength:ze=1,pulseOnClick:Be=!0,intro:Ve=!0,lightMode:He=!1,paused:Ue=!1,dpr:We}={},Ge={}){let C=document.createElement(`div`);C.className=`ghost-fibers-container`;let w=document.createElement(`canvas`);w.className=`ghost-fibers-canvas`,w.setAttribute(`aria-hidden`,`true`),C.append(w),f.append(C);let T={current:{glowColor:String(p),lineColor:b?String(b):``,secondaryColor:S?String(S):``,gradient:u[de]??0,speed:Math.max(0,fe),scale:y(pe,.3,3),rotation:me*d,rollSpeed:he,layers:t(ge),waves:Math.max(0,_e),twist:Math.max(0,ve),threads:y(Math.round(ye),6,180),volume:y(be,0,2),spread:y(xe,.2,3),density:y(Se,.2,3),thickness:y(Ce,.2,4),flow:we,dotLength:l[Te]??0,tips:y(Ee,0,1),foldGlow:y(De,0,3),perspective:y(Oe,0,1),depthOfField:y(ke,0,2),focusDepth:y(Ae,-1,1),particles:y(je,0,2),sparkle:y(Me,0,2),glow:Math.max(0,Ne),brightness:Math.max(0,Pe),vignette:y(Fe,0,1),grain:Math.max(0,Ie),mouseInteraction:Le,hover:c[Re]??0,mouseStrength:Math.max(0,ze),pulseOnClick:Be,intro:Ve,lightMode:He,paused:Ue,dpr:We}},E=w.getContext(`webgl2`,{alpha:!0,premultipliedAlpha:!0,antialias:!1,depth:!1,stencil:!1});if(!E)return C.remove(),null;let Ke=!!E.getExtension(`EXT_color_buffer_float`),D=x(E,m,g,ie),O=x(E,h,g,ae),qe=x(E,_,ee,v),k=x(E,_,te,v),A=x(E,_,ne,v),j=x(E,_,re,oe);if(!D||!O||!qe||!k||!A||!j)return C.remove(),null;let Je=Ke?E.RGBA16F:E.RGBA8,Ye=()=>({texture:null,framebuffer:E.createFramebuffer(),width:0,height:0}),Xe=(e,t,n)=>{if(e.texture&&e.width===t&&e.height===n)return;e.texture&&E.deleteTexture(e.texture);let r=E.createTexture();E.bindTexture(E.TEXTURE_2D,r),E.texStorage2D(E.TEXTURE_2D,1,Je,t,n),E.texParameteri(E.TEXTURE_2D,E.TEXTURE_MIN_FILTER,E.LINEAR),E.texParameteri(E.TEXTURE_2D,E.TEXTURE_MAG_FILTER,E.LINEAR),E.texParameteri(E.TEXTURE_2D,E.TEXTURE_WRAP_S,E.CLAMP_TO_EDGE),E.texParameteri(E.TEXTURE_2D,E.TEXTURE_WRAP_T,E.CLAMP_TO_EDGE),E.bindFramebuffer(E.FRAMEBUFFER,e.framebuffer),E.framebufferTexture2D(E.FRAMEBUFFER,E.COLOR_ATTACHMENT0,E.TEXTURE_2D,r,0),e.texture=r,e.width=t,e.height=n},M=Ye(),N=Array.from({length:r},Ye),Ze=E.createVertexArray(),P=document.createElement(`canvas`);P.width=1,P.height=1;let F=P.getContext(`2d`,{willReadFrequently:!0}),I=window.matchMedia?.(`(prefers-reduced-motion: reduce)`).matches??!1,L={time:0,roll:0,flow:0,frame:0,intro:T.current.intro&&!I?0:i,width:1,height:1,fit:1,colorKey:``,glow:[.55,.36,.96],line:[1,.85,.98],secondary:[.44,.29,.77],pointer:{x:0,y:0,inside:!1},hover:{x:0,y:0,presence:0,placed:!1},look:{x:0,y:0,vx:0,vy:0},focus:a+T.current.focusDepth*3,pulse:{s:0,age:9,strength:0,ribbon:0},camera:null},R=0,z=0,B=!0,V=!0,H=!1,U=0,W=1,G=0,K=0,Qe=()=>window.__TIDE_VISIBLE__!==!1&&(Ge.active?.()??!0),q=(e,t)=>{if(!F||!e)return t;let n=/^[0-9a-f]{3,8}$/i.test(e)?`#${e}`:e;F.clearRect(0,0,1,1),F.fillStyle=`#000000`,F.fillStyle=n,F.fillRect(0,0,1,1);let[r,i,a]=F.getImageData(0,0,1,1).data;return[r/255,i/255,a/255]},$e=e=>{let t=`${e.glowColor}|${e.lineColor}|${e.secondaryColor}|${e.lightMode}`;t!==L.colorKey&&(L.colorKey=t,L.glow=q(e.glowColor,[.55,.36,.96]),L.secondary=e.secondaryColor?q(e.secondaryColor,L.glow):L.glow.map(e=>e*.8),e.lineColor?L.line=q(e.lineColor,L.glow):L.line=e.lightMode?L.glow:L.glow.map(e=>e+(1-e)*.72))},et=(t,n,r,i)=>{let a=e[r].place,o=a[3],c=t*s;return[c,i*(.52*Math.sin(c*.43+n*.31+o)+.26*Math.sin(c*.79-n*.23+1.3+o*.7))+a[0]+c*a[2],i*.65*Math.sin(c*.33+n*.19+.7+o*1.3)+a[1]]},tt=e=>{let t=L.width/Math.max(L.height,1),n=[0,0,a],r=se(o,t,.1,60),i=[1,0,0,0,0,1,0,0,0,0,1,0,-n[0],-n[1],-n[2],1],s=le(e.perspective*.85+L.look.x*.22,.12-L.look.y*.14,e.rotation);return{eye:n,viewProj:ce(r,i),orient:s}},nt=(e,t)=>{let n=e.viewProj,r=n[0]*t[0]+n[4]*t[1]+n[8]*t[2]+n[12],i=n[1]*t[0]+n[5]*t[1]+n[9]*t[2]+n[13],a=n[3]*t[0]+n[7]*t[1]+n[11]*t[2]+n[15];return{x:(r/a*.5+.5)*L.width,y:(.5-i/a*.5)*L.height,depth:a}},rt=(e,t,n)=>{let r=L.camera;if(!r)return null;let i=null;for(let a=0;a<e.layers;a+=1)for(let o=0;o<=96;o+=1){let s=o/96-.5,c=et(s,L.time,a,e.waves).map(t=>t*e.scale*L.fit),l=ue(r.orient,c),u=nt(r,l),d=Math.hypot(u.x-t,u.y-n);(!i||d<i.gap)&&(i={gap:d,s,ribbon:a,depth:u.depth})}return i},J=()=>{let e=T.current,t=Math.max(1,C.clientWidth),r=Math.max(1,C.clientHeight),i=Math.min(e.dpr||window.devicePixelRatio||1,1)*W,a=Math.max(t,r)*i,o=a>n?i*n/a:i,s=Math.max(1,Math.round(t*o)),c=Math.max(1,Math.round(r*o));(w.width!==s||w.height!==c)&&(w.width=s,w.height=c),L.width=t,L.height=r,L.fit=y(t/r/1.5,.6,1),it()},Y=(e,t,n,r)=>{E.bindFramebuffer(E.FRAMEBUFFER,t.framebuffer),E.viewport(0,0,t.width,t.height),E.useProgram(e.program),E.activeTexture(E.TEXTURE0),E.bindTexture(E.TEXTURE_2D,n.texture),E.uniform1i(e.uniforms.uSource,0),E.uniform2f(e.uniforms.uTexel,r[0],r[1]),E.drawArrays(E.TRIANGLES,0,3)},it=()=>{let t=T.current;$e(t);let n=tt(t);L.camera=n;let o=w.height/Math.max(L.height,1),s=t.paused||I?1:y(L.intro/i,0,1),c=1-(1-s)*(1-s)*(1-s);Xe(M,w.width,w.height),E.bindVertexArray(Ze),E.bindFramebuffer(E.FRAMEBUFFER,M.framebuffer),E.viewport(0,0,w.width,w.height),E.clearColor(0,0,0,0),E.clear(E.COLOR_BUFFER_BIT),E.enable(E.BLEND),E.blendFunc(E.ONE,E.ONE);let l=Math.round(260*t.density),u=22*y(Math.sqrt(56e3/(t.threads*l*t.layers)),.45,1),d=Math.max(.8*t.thickness,.45)**2/.64,f=(t.threads/72*t.density*d)**-.75;E.useProgram(D.program);let p=D.uniforms;E.uniform1f(p.uTime,L.time),E.uniform1f(p.uTwist,t.twist),E.uniform1f(p.uRoll,L.roll),E.uniform1f(p.uWaves,t.waves),E.uniform1f(p.uWidth,.62*t.spread),E.uniformMatrix3fv(p.uOrient,!1,n.orient),E.uniform1f(p.uScale,t.scale*L.fit),E.uniformMatrix4fv(p.uViewProj,!1,n.viewProj),E.uniform3f(p.uEye,n.eye[0],n.eye[1],n.eye[2]),E.uniform2f(p.uViewport,w.width,w.height),E.uniform1f(p.uDpr,o),E.uniform1f(p.uFibers,t.threads),E.uniform1f(p.uDots,l),E.uniform1f(p.uFlow,L.flow),E.uniform1f(p.uSize,1.6*t.thickness),E.uniform1f(p.uFocus,L.focus),E.uniform1f(p.uDof,t.depthOfField),E.uniform1f(p.uMaxCoc,u),E.uniform1f(p.uFocal,a),E.uniform1f(p.uIntro,c),E.uniform4f(p.uPulse,L.pulse.s,L.pulse.age,L.pulse.strength,L.pulse.ribbon),E.uniform4f(p.uHover,L.hover.x*o,(L.height-L.hover.y)*o,140*o,L.hover.presence*t.mouseStrength),E.uniform1f(p.uPart,+(t.hover===1)),E.uniform1f(p.uDotLength,t.dotLength),E.uniform1f(p.uSparkle,t.sparkle),E.uniform1f(p.uDepthSpread,.12),E.uniform1f(p.uVolume,t.volume),E.uniform3f(p.uGlowColor,L.glow[0],L.glow[1],L.glow[2]),E.uniform3f(p.uLineColor,L.line[0],L.line[1],L.line[2]),E.uniform3f(p.uSecondaryColor,L.secondary[0],L.secondary[1],L.secondary[2]),E.uniform1f(p.uTips,t.tips),E.uniform1f(p.uGradient,t.gradient),E.uniform1f(p.uFold,t.foldGlow);for(let n=0;n<t.layers;n+=1){let r=e[n].place;E.uniform1f(p.uRibbon,n),E.uniform4f(p.uPlace,r[0],r[1],r[2],r[3]),E.uniform1f(p.uGain,e[n].gain*f),E.uniform1f(p.uTint,e[n].tint),E.drawArraysInstanced(E.TRIANGLE_STRIP,0,4,t.threads*l)}let m=Math.round(420*t.particles);if(m>0){E.useProgram(O.program);let e=O.uniforms;E.uniformMatrix4fv(e.uViewProj,!1,n.viewProj),E.uniform2f(e.uViewport,w.width,w.height),E.uniform1f(e.uDpr,o),E.uniform1f(e.uTime,L.time),E.uniform1f(e.uSize,2.2*t.thickness),E.uniform1f(e.uFocus,L.focus),E.uniform1f(e.uDof,t.depthOfField),E.uniform1f(e.uMaxCoc,22),E.uniform1f(e.uFocal,a),E.uniform1f(e.uIntro,c),E.uniform1f(e.uSparkle,t.sparkle),E.uniform1f(e.uScale,t.scale*L.fit),E.uniform1f(e.uGradient,t.gradient),E.uniform1f(e.uGain,1/t.thickness),E.uniform3f(e.uGlowColor,L.glow[0],L.glow[1],L.glow[2]),E.uniform3f(e.uLineColor,L.line[0],L.line[1],L.line[2]),E.uniform3f(e.uSecondaryColor,L.secondary[0],L.secondary[1],L.secondary[2]),E.drawArraysInstanced(E.TRIANGLE_STRIP,0,4,m)}E.disable(E.BLEND);let h=t.glow>.001&&!t.lightMode;if(E.bindVertexArray(Ze),h){N.forEach((e,t)=>{Xe(e,Math.max(1,Math.round(w.width/2**(t+1))),Math.max(1,Math.round(w.height/2**(t+1))))}),Y(qe,N[0],M,[.5/M.width,.5/M.height]);for(let e=1;e<r;e+=1)Y(k,N[e],N[e-1],[1/N[e-1].width,1/N[e-1].height]);E.enable(E.BLEND),E.blendFunc(E.ONE,E.ONE);for(let e=4;e>0;--e)Y(A,N[e-1],N[e],[.5/N[e].width,.5/N[e].height]);E.disable(E.BLEND)}E.bindFramebuffer(E.FRAMEBUFFER,null),E.viewport(0,0,w.width,w.height),E.clearColor(0,0,0,0),E.clear(E.COLOR_BUFFER_BIT),E.useProgram(j.program);let g=j.uniforms;E.activeTexture(E.TEXTURE0),E.bindTexture(E.TEXTURE_2D,M.texture),E.activeTexture(E.TEXTURE1),E.bindTexture(E.TEXTURE_2D,h?N[0].texture:M.texture),E.uniform1i(g.uScene,0),E.uniform1i(g.uBloom,1),E.uniform1f(g.uGlow,h?t.glow:0),E.uniform1f(g.uBrightness,t.brightness),E.uniform1f(g.uLightMode,+!!t.lightMode),E.uniform1f(g.uGrain,t.grain),E.uniform1f(g.uVignette,t.vignette),E.uniform1f(g.uFrame,L.frame%977),E.uniform2f(g.uView,w.width,w.height),E.uniform1f(g.uDpr,o),E.drawArrays(E.TRIANGLES,0,3),E.activeTexture(E.TEXTURE1),E.bindTexture(E.TEXTURE_2D,null),E.activeTexture(E.TEXTURE0),E.bindTexture(E.TEXTURE_2D,null),E.bindVertexArray(null)},X=e=>{if(R=0,!V||!B||document.hidden||H||!Qe())return;if(U&&e-U<1e3/30-1){R=requestAnimationFrame(X);return}let t=U?e-U:1e3/30;U=e,!I&&!T.current.paused&&(G++,t>52&&K++,G>=90&&(K>48&&W>.65&&(W=Math.max(.65,W*.8),J()),G=K=0));let n=T.current,r=z?(e-z)/1e3:1/60,o=Math.min(.05,r);z=e;let s=!n.paused&&!I;s?(L.frame+=1,L.time+=o*n.speed,L.roll+=o*n.speed*n.rollSpeed,L.flow+=o*n.flow*12,L.intro+=Math.min(r,1)):L.intro<i&&(L.intro=i),L.pulse.age+=o,L.pulse.strength=Math.max(0,1-L.pulse.age/1.8)**2;let{pointer:c,hover:l,look:u}=L,d=n.mouseInteraction&&c.inside&&!I;d&&!l.placed&&(l.x=c.x,l.y=c.y,l.placed=!0),l.x+=(c.x-l.x)*(1-Math.exp(-o/.08)),l.y+=(c.y-l.y)*(1-Math.exp(-o/.08));let f=+!!d;l.presence+=(f-l.presence)*(1-Math.exp(-o/(f>l.presence?.3:.6))),!d&&l.presence<.001&&(l.placed=!1);let p=d?(c.x/L.width-.5)*.5:0,m=d?(.5-c.y/L.height)*.5:0;u.vx+=(30*(p-u.x)-11*u.vx)*o,u.vy+=(30*(m-u.y)-11*u.vy)*o,u.x+=u.vx*o,u.y+=u.vy*o;let h=a+n.focusDepth*3,g=h;if(d&&n.hover===0){let e=rt(n,l.x,l.y);e&&(g=h+(e.depth-h)*l.presence*Math.min(1,n.mouseStrength))}L.focus+=(g-L.focus)*(1-Math.exp(-o/.35)),it();let _=Math.abs(f-l.presence)>.002||Math.abs(p-u.x)>2e-4||Math.abs(m-u.y)>2e-4||Math.abs(g-L.focus)>.001||L.pulse.strength>.001;s||_?R=requestAnimationFrame(X):z=0},Z=()=>{!R&&V&&B&&!document.hidden&&!H&&Qe()&&(R=requestAnimationFrame(X))},at=e=>{let t=C.getBoundingClientRect(),n=e.clientX-t.left,r=e.clientY-t.top;L.pointer.x=n,L.pointer.y=r,L.pointer.inside=n>=0&&r>=0&&n<=t.width&&r<=t.height,Z()},ot=e=>{let t=T.current;if(!t.mouseInteraction||!t.pulseOnClick||e.button!==0||I||e.target instanceof Element&&e.target.closest(`a, button, input, textarea, select, label, [role="button"]`))return;let n=C.getBoundingClientRect(),r=e.clientX-n.left,i=e.clientY-n.top;if(r<0||i<0||r>n.width||i>n.height)return;let a=rt(t,r,i);a&&(L.pulse={s:a.s,age:0,strength:1,ribbon:a.ribbon}),Z()},Q=()=>{L.pointer.inside=!1,Z()},$=()=>{z=0,U=0,Z()},st=e=>{e.pointerType!==`mouse`&&Q()},ct=e=>{e.preventDefault(),H=!0,cancelAnimationFrame(R),R=0},lt=()=>{w.dispatchEvent(new CustomEvent(`memento:background-restore`,{bubbles:!0}))};w.addEventListener(`webglcontextlost`,ct),w.addEventListener(`webglcontextrestored`,lt),window.addEventListener(`pointerup`,st,{passive:!0}),window.addEventListener(`pointercancel`,Q,{passive:!0}),window.addEventListener(`blur`,Q),document.addEventListener(`memento:overlay-change`,$);let ut=new ResizeObserver(J);ut.observe(C);let dt=new IntersectionObserver(e=>{B=e.some(e=>e.isIntersecting),B&&(z=0,Z())});return dt.observe(C),window.addEventListener(`pointermove`,at,{passive:!0}),window.addEventListener(`pointerdown`,ot,{passive:!0}),document.documentElement.addEventListener(`pointerleave`,Q),document.addEventListener(`visibilitychange`,$),J(),Z(),()=>{V=!1,cancelAnimationFrame(R),w.removeEventListener(`webglcontextlost`,ct),w.removeEventListener(`webglcontextrestored`,lt),window.removeEventListener(`pointerup`,st),window.removeEventListener(`pointercancel`,Q),window.removeEventListener(`blur`,Q),document.removeEventListener(`memento:overlay-change`,$),ut.disconnect(),dt.disconnect(),window.removeEventListener(`pointermove`,at),window.removeEventListener(`pointerdown`,ot),document.documentElement.removeEventListener(`pointerleave`,Q),document.removeEventListener(`visibilitychange`,$),E.deleteVertexArray(Ze),[M,...N].forEach(e=>{e.texture&&E.deleteTexture(e.texture),E.deleteFramebuffer(e.framebuffer)}),[D,O,qe,k,A,j].forEach(e=>E.deleteProgram(e.program)),C.remove()}}var de={glowColor:`#ef4444`,lineColor:`#f97316`,secondaryColor:`#f97316`,gradient:`depth`,layers:5,waves:1,twist:1,volume:1.5,spread:2.5,scale:.75,rotation:25,perspective:0,fiberStyle:`dots`,threads:160,density:1,thickness:.75,tips:0,foldGlow:3,speed:.1,flow:0,rollSpeed:.5,depthOfField:2,focusDepth:0,particles:0,sparkle:.5,glow:.5,brightness:1,vignette:0,grain:0,hoverEffect:`focus`,mouseStrength:1,mouseInteraction:!0,pulseOnClick:!0,intro:!0,lightMode:!1};function fe(){let e=document.documentElement,t=document.createElement(`div`);t.className=`memento-background`,t.setAttribute(`aria-hidden`,`true`),document.body.prepend(t);let n=()=>e.dataset.demoExpanded!==`true`&&e.dataset.overlayOpen!==`true`,r=null,i=()=>{r?.(),r=S(t,{...de,dpr:1},{active:n})},a=()=>i();t.addEventListener(`memento:background-restore`,a);let o=window.setTimeout(i,350);return()=>{clearTimeout(o),t.removeEventListener(`memento:background-restore`,a),r?.(),r=null,t.remove()}}export{fe as mountGhostFibers};