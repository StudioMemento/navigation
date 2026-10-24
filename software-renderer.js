import * as T from './vendor/three.module.min.js';
// Software projection of the same scene and camera for browsers without WebGL.
// Projects both the initial blocking and the actual exported Blender mesh.
// Lighting is a compatibility approximation, using the same navigation camera.
export class SoftwareRenderer {
  constructor(canvas){this.canvas=canvas;this.ctx=canvas.getContext('2d');this.ratio=1;this.shadowMap={};this.info={render:{calls:1,triangles:0}};this.w=1;this.h=1;}
  setPixelRatio(r){this.ratio=Math.min(r,1.4);}
  setSize(w,h){this.w=w;this.h=h;this.canvas.width=w*this.ratio;this.canvas.height=h*this.ratio;}
  render(scene,camera){
    if(!this.ctx)return;const ctx=this.ctx,w=this.w,h=this.h;ctx.setTransform(this.ratio,0,0,this.ratio,0,0);
    const bg=ctx.createLinearGradient(0,0,0,h);bg.addColorStop(0,'#1a242c');bg.addColorStop(.58,'#27333b');bg.addColorStop(1,'#10171c');ctx.fillStyle=bg;ctx.fillRect(0,0,w,h);
    scene.updateMatrixWorld(true);camera.updateMatrixWorld(true);
    const vp=new T.Matrix4().multiplyMatrices(camera.projectionMatrix,camera.matrixWorldInverse),faces=[],temp=new T.Matrix4(),wm=new T.Matrix4();
    const corners=[[-.5,-.5,-.5],[.5,-.5,-.5],[.5,.5,-.5],[-.5,.5,-.5],[-.5,-.5,.5],[.5,-.5,.5],[.5,.5,.5],[-.5,.5,.5]];
    const sides=[[4,5,6,7],[1,0,3,2],[0,4,7,3],[5,1,2,6],[3,7,6,2],[0,1,5,4]];
    const sun=new T.Vector3(-.45,.82,.55).normalize();
    const project=v=>{const q=new T.Vector4(v.x,v.y,v.z,1).applyMatrix4(vp);return {x:(q.x/q.w*.5+.5)*w,y:(-.5*q.y/q.w+.5)*h,z:q.w,valid:q.w>.1};};
    function addBox(matrix,material){const verts=corners.map(v=>new T.Vector3(...v).applyMatrix4(matrix)),screen=verts.map(project);for(const s of sides){const points=s.map(i=>screen[i]);if(points.some(p=>!p.valid))continue;const a=verts[s[0]],b=verts[s[1]],c=verts[s[2]];const normal=b.clone().sub(a).cross(c.clone().sub(a)).normalize();const center=a.clone().add(c).multiplyScalar(.5);if(normal.dot(camera.position.clone().sub(center))<=0)continue;const z=points.reduce((n,p)=>n+p.z,0)/4;if(z>110)continue;const base=material.color.clone();const emissive=material.emissiveIntensity>1;const shade=emissive?1.7:.42+Math.max(0,normal.dot(sun))*.85;const fog=Math.min(.93,1-Math.exp(-Math.pow(z*.018,2)));const color=base.multiplyScalar(shade).lerp(new T.Color('#26323a'),fog);faces.push({points,z,color:'#'+color.getHexString(),glow:emissive});}}
    function addMesh(mesh){
      const a=mesh.geometry.attributes.position,index=mesh.geometry.index,material=Array.isArray(mesh.material)?mesh.material[0]:mesh.material;
      if(!a||!material.color)return;
      const verts=[],screen=[];for(let i=0;i<a.count;i++){const v=new T.Vector3().fromBufferAttribute(a,i).applyMatrix4(mesh.matrixWorld);verts.push(v);screen.push(project(v));}
      const n=index?index.count:a.count,normal=new T.Vector3(),edge=new T.Vector3(),center=new T.Vector3(),view=new T.Vector3(),fogColor=new T.Color('#26323a');
      for(let i=0;i<n;i+=3){const ia=index?index.getX(i):i,ib=index?index.getX(i+1):i+1,ic=index?index.getX(i+2):i+2;
        const points=[screen[ia],screen[ib],screen[ic]];if(points.some(p=>!p.valid))continue;
        if(points.every(p=>p.x<0)||points.every(p=>p.x>w)||points.every(p=>p.y<0)||points.every(p=>p.y>h))continue;
        normal.copy(verts[ib]).sub(verts[ia]);edge.copy(verts[ic]).sub(verts[ia]);normal.cross(edge).normalize();center.copy(verts[ia]).add(verts[ib]).add(verts[ic]).multiplyScalar(1/3);
        if(normal.dot(view.copy(camera.position).sub(center))<=0)continue;
        const z=(points[0].z+points[1].z+points[2].z)/3;if(z>110)continue;
        const emissive=material.emissiveIntensity>1,shade=emissive?1.7:.42+Math.max(0,normal.dot(sun))*.85;
        const fog=Math.min(.94,1-Math.exp(-z*(.008+Math.exp(-Math.max(center.y+.7,0)*.62)*.017)));
        const color=material.color.clone().multiplyScalar(shade).lerp(fogColor,fog);
        faces.push({points,z,color:'#'+color.getHexString(),glow:emissive});
      }
    }
    scene.traverseVisible(mesh=>{if(!mesh.isMesh)return;if(mesh.geometry.type==='BoxGeometry'){if(mesh.isInstancedMesh){for(let i=0;i<mesh.count;i++){mesh.getMatrixAt(i,temp);wm.multiplyMatrices(mesh.matrixWorld,temp);addBox(wm,mesh.material);}}else addBox(mesh.matrixWorld,mesh.material);}else if(mesh.userData.routePoints){const ps=mesh.userData.routePoints.map(project);for(let i=1;i<ps.length;i++)if(ps[i].valid&&ps[i-1].valid)faces.push({points:[ps[i-1],ps[i]],z:(ps[i-1].z+ps[i].z)/2,color:'#e88558',line:true});}else addMesh(mesh);});
    faces.sort((a,b)=>b.z-a.z);for(const f of faces){ctx.beginPath();f.points.forEach((p,i)=>i?ctx.lineTo(p.x,p.y):ctx.moveTo(p.x,p.y));if(f.line){ctx.strokeStyle=f.color;ctx.lineWidth=Math.max(.7,26/f.z);ctx.stroke();}else{ctx.closePath();ctx.fillStyle=f.color;ctx.fill();ctx.strokeStyle=f.points.length===3?f.color:(f.glow?f.color:'#4b565c22');ctx.lineWidth=.45;ctx.stroke();}}
    this.info.render.triangles=faces.length*2;
  }
}
