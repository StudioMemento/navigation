import {
  AdditiveBlending,
  BufferGeometry,
  Color,
  Float32BufferAttribute,
  Group,
  LineSegments,
  Points,
  ShaderMaterial,
} from 'three';

// Height in metres with a radial delay on the floor. Every surface shares the
// same front so furniture, screens and walls form one continuous volume.
const frontier = `
float surfaceLevel(vec3 p) {
  return p.y + .096 * length((p.xz - vec2(-.06, -.46)) * vec2(.93, 1.))
    + .018 * sin(p.x*3.1 + p.z*2.7) + .008 * sin(p.z*11. - p.x*5.);
}
`;
export function installReveal(material, state) {
  const prior = material.onBeforeCompile;
  material.onBeforeCompile = function (shader, renderer) {
    prior.call(this, shader, renderer);
    Object.assign(shader.uniforms, { uSweep: state.sweep, uExit: state.finished, uAmber: state.amber });
    shader.vertexShader =
      'varying vec3 vStudioPosition;\n' +
      shader.vertexShader.replace(
        '#include <project_vertex>',
        '#include <project_vertex>\n vStudioPosition = (modelMatrix * vec4(transformed, 1.)).xyz;',
      );
    shader.fragmentShader =
      `varying vec3 vStudioPosition; uniform float uSweep; uniform float uExit; uniform vec3 uAmber; ${frontier}\n` +
      shader.fragmentShader.replace(
        '#include <opaque_fragment>',
        `
        if (uExit < .5) {
          float delta = uSweep - surfaceLevel(vStudioPosition);
          if (delta < 0.) discard;
          float edge = 1. - smoothstep(.003,.051,delta);
          float halo = exp(-12. * delta);
          float ribs = .5 + .5 * sin(vStudioPosition.y*195. + vStudioPosition.x*2.);
          outgoingLight = mix(outgoingLight * .65, outgoingLight, smoothstep(.012,.30,delta));
          outgoingLight += uAmber * (edge * 1.35 + halo * (.20 + .19*ribs));
        }
        #include <opaque_fragment>
      `,
      );
  };
  material.customProgramCacheKey = () => 'studioweb-formation-1';
}

function scanMaterial(uniforms, vertex, fragment) {
  return new ShaderMaterial({
    uniforms,
    vertexShader: vertex,
    fragmentShader: fragment,
    transparent: true,
    depthWrite: false,
    depthTest: true,
    blending: AdditiveBlending,
    toneMapped: false,
  });
}
const common = `
  uniform float uTime, uSweep, uDpr;
  uniform vec3 uAmber;
  varying float vLight;
  float seed(vec3 a) { return fract(sin(dot(a, vec3(27.419,51.271,85.197))) * 23451.621); }
  ${frontier}
`;

export function createFormation(samples, state, coarse) {
  const group = new Group();
  const materials = [];
  const uniforms = { uTime: state.progress, uSweep: state.sweep, uDpr: state.dpr, uAmber: state.amber };
  const randomInt = (() => {
    let n = 18791;
    return () => (n = (n * 16807) % 2147483647);
  })();
  const add = (geometry, material, Type) => {
    const node = new Type(geometry, material);
    node.frustumCulled = false;
    node.renderOrder = 5;
    group.add(node);
    materials.push(material);
  };
  const positions = new Float32Array(samples.length);
  for (let i = 0; i < positions.length; i++) positions[i] = samples[i] * 0.001;
  const dust = new BufferGeometry();
  dust.setAttribute('position', new Float32BufferAttribute(positions, 3));
  dust.setDrawRange(0, coarse ? Math.min(5800, positions.length / 3) : positions.length / 3);
  add(
    dust,
    scanMaterial(
      uniforms,
      `${common}
    void main() {
      float h = seed(position);
      float delta = surfaceLevel(position) - uSweep;
      float crest = exp(-abs(delta)*7.5);
      float ash = exp(-abs(delta - .19)*3.2) * smoothstep(.54,.91,h);
      float trailing = .09 * (1.-smoothstep(.0,.32,abs(delta + .45)));
      vLight = (crest + ash*.58 + trailing) * (.44 + .55*h) * smoothstep(.08,.2,uTime) * (1.-smoothstep(.88,1.,uTime));
      vec3 p = position;
      float loose = max(0.,delta) * ash;
      p += vec3((h-.5)*.49, .43 + h*.34, sin(h*19.)*.16) * loose;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(p,1.);
      gl_PointSize = uDpr * (1.25 + .78*h + crest*.9);
    }`,
      `${common}
    void main(){
      float d = dot(gl_PointCoord-.5,gl_PointCoord-.5);
      float a = (1.-smoothstep(.012,.25,d))*vLight;
      if (a<.009) discard;
      gl_FragColor=vec4(mix(uAmber,vec3(1.,.55,.28),.38),clamp(a,0.,1.));
    }`,
    ),
    Points,
  );

  const lines = [],
    ends = [],
    traits = [];
  const count = coarse ? 108 : 208;
  for (let i = 0; i < count; i++) {
    const index = (randomInt() % (positions.length / 3)) * 3;
    const xyz = positions.subarray(index, index + 3);
    lines.push(...xyz, ...xyz);
    ends.push(0, 1);
    const k = randomInt() / 2147483647;
    traits.push(k, k);
  }
  const wire = new BufferGeometry();
  wire.setAttribute('position', new Float32BufferAttribute(lines, 3));
  wire.setAttribute('end', new Float32BufferAttribute(ends, 1));
  wire.setAttribute('aSeed', new Float32BufferAttribute(traits, 1));
  add(
    wire,
    scanMaterial(
      uniforms,
      `${common}
    attribute float end, aSeed;
    void main() {
      vec3 centre = vec3(-.06,-.035,-.46);
      float angle = aSeed * 62.832;
      float collect = 1.-smoothstep(.09,.27,uTime);
      float knot = smoothstep(.005,.09,uTime) * collect;
      float delta = surfaceLevel(position) - uSweep;
      float slice = exp(-abs(delta)*9.) * smoothstep(.13,.25,uTime) * (1.-smoothstep(.83,.99,uTime));
      vec3 root = mix(position,centre,collect);
      vec3 ray = vec3(cos(angle)*1.25,.25+2.55*aSeed,sin(angle)*1.25);
      float length = (.12+.55*aSeed)*slice;
      vec3 p = root + end * ray * (knot*(.32+.8*aSeed) + length);
      vLight = (knot*.25 + slice*.51) * (1.-end*.83);
      gl_Position=projectionMatrix*modelViewMatrix*vec4(p,1.);
    }`,
      `${common}
    void main(){ if(vLight<.008)discard; gl_FragColor=vec4(uAmber,vLight); }`,
    ),
    LineSegments,
  );
  return {
    group,
    dispose() {
      for (const n of group.children) n.geometry.dispose();
      for (const m of materials) m.dispose();
    },
  };
}
export function revealState() {
  return {
    progress: { value: 0 },
    sweep: { value: -0.2 },
    finished: { value: 0 },
    dpr: { value: 1 },
    amber: { value: new Color('#ff7d00') },
  };
}
