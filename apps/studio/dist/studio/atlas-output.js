import * as T from 'three';
import {ShaderPass} from 'three/addons/postprocessing/ShaderPass.js';
import {screenVertex} from './atlas/shaders.js';
import {atlasPost} from './atlas-adapter.js';
export class AtlasOutputPass extends ShaderPass {
 constructor(shared){super({uniforms:{...shared,uScene:{value:null},uResolution:{value:new T.Vector2(1,1)},uDpr:{value:1},uTransparent:{value:0}},vertexShader:screenVertex,fragmentShader:atlasPost},'uScene');
 // ShaderPass clones initial uniforms: reconnect live material/lighting state.
 Object.assign(this.uniforms,shared);this.material.depthWrite=false;this.material.depthTest=false;
 }
 setSize(w,h){this.uniforms.uResolution.value.set(w,h);}
}
