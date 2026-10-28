import * as THREE from 'three';

// One HDR resolve: a small highlight halo, restrained vignette and final AgX output.
export function createCinematicPass(renderer){
  const target=new THREE.WebGLRenderTarget(1,1,{type:THREE.HalfFloatType,depthBuffer:true});
  target.texture.name='TIDE_Cinematic_Linear';target.texture.colorSpace=THREE.LinearSRGBColorSpace;
  target.samples=Math.min(4,renderer.capabilities.maxSamples);
  const uniforms={source:{value:target.texture},pixel:{value:new THREE.Vector2(1,1)}};
  const material=new THREE.ShaderMaterial({depthTest:false,depthWrite:false,uniforms,
    vertexShader:'varying vec2 vUv;void main(){vUv=position.xy*.5+.5;gl_Position=vec4(position.xy,0.,1.);}',
    fragmentShader:`uniform sampler2D source;uniform vec2 pixel;varying vec2 vUv;
      vec3 lightAt(vec2 uv){vec3 c=texture2D(source,clamp(uv,vec2(.001),vec2(.999))).rgb;return c*smoothstep(.85,2.8,max(c.r,max(c.g,c.b)));}
      void main(){vec3 c=texture2D(source,vUv).rgb;vec2 d=pixel*5.;
        vec3 halo=lightAt(vUv)*.20+(lightAt(vUv+vec2(d.x,0.))+lightAt(vUv-vec2(d.x,0.))+lightAt(vUv+vec2(0.,d.y))+lightAt(vUv-vec2(0.,d.y)))*.12;
        halo+=(lightAt(vUv+d)+lightAt(vUv-d)+lightAt(vUv+vec2(d.x,-d.y))+lightAt(vUv+vec2(-d.x,d.y)))*.08;
        c+=halo*.16;vec2 p=(vUv-.5)*vec2(1.,.85);c*=1.-.16*smoothstep(.15,.65,length(p));gl_FragColor=vec4(c,1.);
        #include <tonemapping_fragment>
        #include <colorspace_fragment>
        float grain=fract(sin(dot(gl_FragCoord.xy,vec2(12.9898,78.233)))*43758.5453)-.5;gl_FragColor.rgb+=grain/450.;
      }`});
  const geometry=new THREE.BufferGeometry();geometry.setAttribute('position',new THREE.Float32BufferAttribute([-1,-1,0,3,-1,0,-1,3,0],3));
  const screen=new THREE.Scene();screen.add(new THREE.Mesh(geometry,material));const camera=new THREE.Camera();
  return{render(scene,view){renderer.setRenderTarget(target);renderer.render(scene,view);renderer.setRenderTarget(null);renderer.render(screen,camera);},resize(width,height){const dpr=renderer.getPixelRatio();target.setSize(Math.round(width*dpr),Math.round(height*dpr));uniforms.pixel.value.set(1/(width*dpr),1/(height*dpr));},dispose(){target.dispose();geometry.dispose();material.dispose();}};
}
