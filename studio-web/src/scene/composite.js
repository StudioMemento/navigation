import {
  BufferGeometry,
  Camera,
  Float32BufferAttribute,
  Mesh,
  NearestFilter,
  NoBlending,
  Scene,
  ShaderMaterial,
  SRGBColorSpace,
  Vector2,
  WebGLRenderTarget,
} from 'three';

const screenVertex = `varying vec2 vUv;
void main() { vUv = position.xy * .5 + .5; gl_Position = vec4(position.xy,0.,1.); }`;

// The alpha channel of the actual render is the silhouette, including thin
// furniture and plants. The same image drives the local rim and background hits.
export class StudioComposite {
  constructor(renderer) {
    this.gl = renderer;
    this.camera = new Camera();
    const geometry = new BufferGeometry();
    geometry.setAttribute('position', new Float32BufferAttribute([-1, -1, 0, 3, -1, 0, -1, 3, 0], 3));
    this.geometry = geometry;
    this.target = new WebGLRenderTarget(1, 1, { depthBuffer: true, stencilBuffer: false });
    this.target.texture.colorSpace = SRGBColorSpace;
    this.target.samples = Math.min(4, renderer.capabilities.maxSamples);
    this.mask = new WebGLRenderTarget(1, 1, {
      depthBuffer: false,
      minFilter: NearestFilter,
      magFilter: NearestFilter,
    });
    this.uniforms = {
      tFrame: { value: this.target.texture },
      uCss: { value: new Vector2(1, 1) },
      uSpot: { value: new Vector2(-1e4, -1e4) },
      uAmount: { value: 0 },
    };
    this.presentScene = new Scene();
    this.maskScene = new Scene();
    const make = (fragmentShader, scene) => {
      const material = new ShaderMaterial({
        uniforms: this.uniforms,
        vertexShader: screenVertex,
        fragmentShader,
        depthTest: false,
        depthWrite: false,
        blending: NoBlending,
        toneMapped: false,
      });
      const mesh = new Mesh(geometry, material);
      mesh.frustumCulled = false;
      scene.add(mesh);
      return material;
    };
    this.pass = make(
      `
      uniform sampler2D tFrame; uniform vec2 uCss,uSpot; uniform float uAmount; varying vec2 vUv;
      void main(){
        vec4 pixel=texture2D(tFrame,vUv);
        float a=pixel.a;
        vec3 rgb=pixel.rgb;
        vec2 screen=vec2(vUv.x,1.-vUv.y)*uCss;
        float proximity=1.-smoothstep(8.,85.,distance(screen,uSpot));
        if (proximity*uAmount>.003){
          vec2 off=1.65/uCss;
          float neighbor=max(max(texture2D(tFrame,vUv+vec2(off.x,0.)).a,texture2D(tFrame,vUv-vec2(off.x,0.)).a),
                             max(texture2D(tFrame,vUv+vec2(0.,off.y)).a,texture2D(tFrame,vUv-vec2(0.,off.y)).a));
          float edge=clamp(neighbor-a,0.,1.)*proximity*uAmount*.93;
          rgb+=vec3(1.,.3,.03)*edge;
          a=clamp(a+edge,0.,1.);
        }
        gl_FragColor=vec4(rgb/max(a,.0001),a);
        #include <colorspace_fragment>
      }`,
      this.presentScene,
    );
    this.maskPass = make(
      `uniform sampler2D tFrame; varying vec2 vUv;
      void main(){float a=texture2D(tFrame,vUv).a; gl_FragColor=vec4(a,a,a,1.);}`,
      this.maskScene,
    );
    this.edges = [];
    this.reading = false;
    this.revision = 0;
  }
  resize(width, height, dpr) {
    this.revision++;
    this.uniforms.uCss.value.set(width, height);
    this.target.setSize(Math.max(1, Math.round(width * dpr)), Math.max(1, Math.round(height * dpr)));
    const factor = Math.min(1, 230 / Math.max(width, height));
    this.mask.setSize(
      Math.max(12, Math.round(width * factor)),
      Math.max(12, Math.round(height * factor)),
    );
    this.edges = [];
  }
  renderModel(scene, camera) {
    this.gl.setRenderTarget(this.target);
    this.gl.render(scene, camera);
    this.gl.setRenderTarget(null);
  }
  present(x, y, amount) {
    this.uniforms.uSpot.value.set(x, y);
    this.uniforms.uAmount.value = amount;
    this.gl.render(this.presentScene, this.camera);
  }
  async sampleEdges() {
    if (this.reading || this.disposed) return false;
    this.reading = true;
    const revision = this.revision;
    const { width: w, height: h } = this.mask;
    const css = this.uniforms.uCss.value.clone();
    const rgba = new Uint8Array(w * h * 4);
    try {
      this.gl.setRenderTarget(this.mask);
      this.gl.render(this.maskScene, this.camera);
      this.gl.setRenderTarget(null);
      await this.gl.readRenderTargetPixelsAsync(this.mask, 0, 0, w, h, rgba);
      if (this.disposed || revision !== this.revision) return false;
      const points = [];
      for (let y = 1; y < h - 1; y++)
        for (let x = 1; x < w - 1; x++) {
          const i = (y * w + x) * 4;
          if (rgba[i] < 110) continue;
          if (rgba[i - 4] < 110 || rgba[i + 4] < 110 || rgba[i - 4 * w] < 110 || rgba[i + 4 * w] < 110) {
            points.push(((x + 0.5) * css.x) / w, (1 - (y + 0.5) / h) * css.y);
          }
        }
      this.edges = points;
      return true;
    } finally {
      this.reading = false;
    }
  }
  closest(x, y, maxDistance) {
    let distance2 = maxDistance * maxDistance,
      index = -1;
    for (let i = 0; i < this.edges.length; i += 2) {
      const dx = this.edges[i] - x,
        dy = this.edges[i + 1] - y;
      const d = dx * dx + dy * dy;
      if (d < distance2) {
        distance2 = d;
        index = i;
      }
    }
    return index < 0
      ? null
      : { x: this.edges[index], y: this.edges[index + 1], distance: Math.sqrt(distance2) };
  }
  dispose() {
    this.disposed = true;
    this.geometry.dispose();
    this.pass.dispose();
    this.maskPass.dispose();
    this.target.dispose();
    this.mask.dispose();
  }
}
