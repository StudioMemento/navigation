import * as T from 'three';
import {ShaderPass} from 'three/addons/postprocessing/ShaderPass.js';
export const focusShader={
 uniforms:{inverseProjection:{value:new T.Matrix4()},tDiffuse:{value:null},tDepth:{value:null},resolution:{value:new T.Vector2(1,1)},focusDistance:{value:2},focusRange:{value:.12},amount:{value:0},nearClip:{value:.025},farClip:{value:90},maxRadius:{value:14}},
 vertexShader:'varying vec2 vUv;void main(){vUv=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}',
 fragmentShader:/*glsl*/`
 #include <packing>
 varying vec2 vUv;uniform mat4 inverseProjection;uniform sampler2D tDiffuse,tDepth;uniform vec2 resolution;uniform float focusDistance,focusRange,amount,nearClip,farClip,maxRadius;
 float depthAt(vec2 uv){vec4 p=inverseProjection*vec4(uv*2.-1.,textureLod(tDepth,uv,0.).r*2.-1.,1.);return -p.z/p.w;}
 float coc(float z){return min(maxRadius,max(0.,abs(z-focusDistance)-focusRange)/max(z,.1)*maxRadius*2.8)*amount;}
 void main(){float depth=depthAt(vUv);float radius=coc(depth);vec4 center=textureLod(tDiffuse,vUv,0.);if(radius<.3){gl_FragColor=center;return;}vec3 color=center.rgb;float total=1.;
 for(int i=0;i<18;i++){float f=float(i)+.5;float a=f*2.39996323;vec2 off=vec2(cos(a),sin(a))*sqrt(f/18.)*radius/resolution;vec2 uv=clamp(vUv+off,vec2(.001),vec2(.999));float other=depthAt(uv);float weight=other<depth-.15&&coc(other)<radius*.35?.06:1.;color+=textureLod(tDiffuse,uv,0.).rgb*weight;total+=weight;}
 gl_FragColor=vec4(color/total,center.a);}`
};
export class FocusPass extends ShaderPass{constructor(){super(focusShader);this.enabled=false;}render(renderer,write,read,dt,mask){this.uniforms.tDepth.value=read.depthTexture;super.render(renderer,write,read,dt,mask);}}
