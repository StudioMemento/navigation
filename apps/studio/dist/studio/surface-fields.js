import * as T from 'three';
export async function loadSurfaceFields(scene,shared,mobile,materials){
 async function read(path){const r=await fetch(path);if(!r.ok)throw new Error('Surface asset unavailable');const b=await r.arrayBuffer();return new Float32Array(await new Response(new Blob([b]).stream().pipeThrough(new DecompressionStream('gzip'))).arrayBuffer());}
 const [src,voxels]=await Promise.all([read('./assets/surface-v4.bin.gz'),read(`./assets/voxels-v4-${mobile?'mobile':'desktop'}.bin.gz`)]);
 const stride=mobile?2:1,count=Math.floor(src.length/8/stride),positions=new Float32Array(count*3),seeds=new Float32Array(count);
 for(let i=0;i<count;i++){const j=i*stride*8;positions.set(src.subarray(j,j+3),i*3);seeds[i]=src[j+6];}
 const geometry=new T.BufferGeometry();geometry.setAttribute('position',new T.BufferAttribute(positions,3));geometry.setAttribute('aSeed',new T.BufferAttribute(seeds,1));
 const pointMaterial=new T.ShaderMaterial({uniforms:shared,transparent:true,depthWrite:true,vertexShader:`uniform float uA,uB,uPointScale,uPerspective,uProjectionDistance;attribute float aSeed;varying vec3 vP;varying float vSeed;void main(){vP=(modelMatrix*vec4(position,1.)).xyz;vSeed=aSeed;vec4 mv=viewMatrix*vec4(vP,1.);gl_Position=projectionMatrix*mv;gl_PointSize=clamp(uA*uPointScale/max(.3,mix(uProjectionDistance,-mv.z,uPerspective)),1.,8.);}`,fragmentShader:`uniform float uB,uC,uRigEnergy;uniform vec3 uRigTint;varying vec3 vP;varying float vSeed;void main(){if(vSeed>uB)discard;float d=length(gl_PointCoord-.5)*2.;if(d>1.)discard;vec3 split=mix(vec3(.04,.3,.9),vec3(1.,.4,.06),smoothstep(-.7,.6,vP.x));vec3 col=mix(vec3(.32),split,uC)*1.3*mix(vec3(1.),uRigTint,.35)*clamp(uRigEnergy,.45,1.5);gl_FragColor=vec4(col,(1.-smoothstep(.45,1.,d))*.85);}`});
 const points=new T.Points(geometry,pointMaterial);points.frustumCulled=false;points.visible=false;scene.add(points);
 const info=await fetch('./assets/studio-v4-info.json').then(r=>r.json());const screens=info.objects.filter(o=>o.name==='TV_55'||/^(DISPLAY_27|ULTRAWIDE)_/.test(o.name));const kept=[];for(let i=0;i<voxels.length;i+=8){const p=voxels.subarray(i,i+3);if(!screens.some(s=>p.every((v,axis)=>v>s.min[axis]-.09&&v<s.max[axis]+.09)))kept.push(...p);}
 const size=mobile?.09:.065,box=new T.BoxGeometry(size,size,size).toNonIndexed(),vg=new T.InstancedBufferGeometry().copy(box),bary=new Float32Array(box.attributes.position.count*3);
 for(let i=0;i<box.attributes.position.count;i++)bary[i*3+i%3]=1;vg.setAttribute('aBary',new T.BufferAttribute(bary,3));vg.instanceCount=kept.length/3;const offsets=new Float32Array(kept);vg.setAttribute('aOffset',new T.InstancedBufferAttribute(offsets,3));
 const voxel=new T.Mesh(vg,materials.create('FURNITURE',{voxel:true}));voxel.frustumCulled=false;voxel.visible=false;scene.add(voxel);shared.uCell.value=size;
 return {points,voxel,update(){points.visible=shared.uMode.value===14;voxel.visible=shared.uMode.value===3;},resize(h,dpr){shared.uPointScale.value=h*dpr*.019;}};
}
