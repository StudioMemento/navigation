import * as T from 'three';
import {damp} from './config.js';
import {LIGHT_PRESETS} from './light-presets.js';
export {LIGHT_PRESETS};
export const LIGHT_GROUPS=[['lamps','Lampade'],['shelf','Libreria'],['softbox','Softbox'],['ceiling','Soffitto'],['screens','Monitor'],['tv','TV']];
export function fixtureFor(name){if(name==='TV_55')return{group:'tv',kind:2};if(/DISPLAY|ULTRAWIDE|MONITOR/.test(name)&&!/^PARETE/.test(name))return{group:'screens',kind:2};if(name==='SOFTBOX1')return{group:'softbox',kind:4};if(name==='LUCI_SOFFITTO')return{group:'ceiling',kind:3};if(/^LAMPADA_/.test(name))return{group:'lamps',kind:name==='LAMPADA_SALE'?3:1};return null;}
export class StudioLighting {
 constructor(scene,renderer,mobile,shared){this.scene=scene;this.renderer=renderer;this.u=shared;this.bindings=[];this.sources=[];this.emitters=[];this.groups=Object.fromEntries(LIGHT_GROUPS.map(([id])=>[id,{target:1,value:1}]));this.selected=13;this.target=LIGHT_PRESETS[12];this.rig=structuredClone(this.target);this.age=9;this.shadowAge=0;
 this.hemi=new T.HemisphereLight(0xd0d9e4,0x30271f,.45);scene.add(this.hemi);
 this.key=new T.DirectionalLight(0xffe2c0,2.4);this.fill=new T.DirectionalLight(0xb8cce7,1.6);this.rim=new T.DirectionalLight(0xffae77,.8);scene.add(this.key,this.fill,this.rim);
 this.key.castShadow=true;this.key.shadow.mapSize.setScalar(mobile?1024:2048);Object.assign(this.key.shadow.camera,{left:-4.5,right:4.5,top:4,bottom:-4,near:.1,far:22});this.key.shadow.bias=-.0003;this.key.shadow.normalBias=.016;this.key.shadow.radius=3;
 this.spot=new T.SpotLight(0xffe6c5,0,10,.55,.8,2);scene.add(this.spot,this.spot.target);
 const point=(group,pos,power,distance,color)=>{const light=new T.PointLight(color,power,distance,2);light.position.set(...pos);scene.add(light);this.sources.push({group,light,power});};
 point('lamps',[2.055,.91,1.39],3,3,0xffbd86);point('lamps',[-1.76,1.5,-.09],1.4,2.5,0xffbe88);
 point('shelf',[-1.63,1.15,-.62],.9,1.7,0xffc58f);point('softbox',[-1.05,1.66,-.84],3.5,3.1,0xffe5c9);
 point('screens',[.32,1.4,-2.55],1.8,3.2,0x93baff);
 const geometry=new T.ConeGeometry(.9,3,32,1,true);geometry.translate(0,-1.5,0);
 const material=new T.ShaderMaterial({uniforms:{uColor:{value:new T.Color(0xffdfb5)},uPower:{value:0}},vertexShader:'varying vec3 vP,vN;void main(){vP=(modelMatrix*vec4(position,1.)).xyz;vN=normalize(mat3(modelMatrix)*normal);gl_Position=projectionMatrix*viewMatrix*vec4(vP,1.);}',fragmentShader:'uniform vec3 uColor;uniform float uPower;varying vec3 vP,vN;void main(){float side=pow(abs(dot(normalize(vN),normalize(cameraPosition-vP))),1.5);float ground=smoothstep(0.,.35,vP.y);gl_FragColor=vec4(uColor,uPower*.075*side*ground);}',transparent:true,depthWrite:false,side:T.DoubleSide,blending:T.AdditiveBlending});
 this.beam=new T.Mesh(geometry,material);this.beam.name='VOLUMETRIC_LIGHT';this.beam.visible=false;scene.add(this.beam);
 this.tint=new T.Color();this.temporary=new T.Color();this.beamDirection=new T.Vector3();this.down=new T.Vector3(0,-1,0);
 }
 // No auxiliary discs or planes: only the actual imported fixtures emit.
 createEmitters(){}
 bind(mesh,fixture){if(fixture){mesh.userData.lightGroup=fixture.group;this.bindings.push({material:mesh.material,...fixture});}if(mesh.name==='SHELF')mesh.userData.lightGroup='shelf';}
 toggle(id){if(this.groups[id])this.groups[id].target=1-this.groups[id].target;}
 choose(id){const next=LIGHT_PRESETS.find(p=>p.id===id);if(!next)return;this.target=next;this.selected=id;this.age=0;this.u.uGobo.value=next.gobo;}
 update(dt,shell,reduced=false,time=0){
 this.age+=dt;this.shadowAge+=dt;const speed=reduced?100:3.8;
 for(const key of ['key','fill','rim','ambient','practicals','screens','softbox','spot','angle','penumbra','volume'])this.rig[key]=damp(this.rig[key],this.target[key],speed,dt);
 for(const key of ['keyPos','fillPos','rimPos','spotPos','spotTarget'])for(let i=0;i<3;i++)this.rig[key][i]=damp(this.rig[key][i],this.target[key][i],speed,dt);
 for(const g of Object.values(this.groups))g.value=damp(g.value,g.target,speed,dt);
 let pulse=1;const motion=reduced?0:this.target.motion;
 if(motion===1)pulse=.83+.1*Math.sin(time*5.3)+.07*Math.sin(time*9.7);
 // One restrained exposure pulse every 2.8 seconds, frozen when motion is paused.
 if(motion===4)pulse=.28+.72*Math.exp(-Math.pow(Math.sin(time*Math.PI/2.8)*5.,2.));
 for(const key of ['key','fill','rim']){const light=this[key];light.intensity=this.rig[key]*(key==='key'?pulse:1);light.color.lerp(this.temporary.set(this.target[key+'Color']),1-Math.exp(-speed*dt));light.position.set(...this.rig[key+'Pos']);}
 if(motion===3)this.key.position.x+=Math.sin(time*.42)*4.8;
 this.hemi.intensity=this.rig.ambient;this.hemi.color.copy(this.fill.color).lerp(this.temporary.set(0xffffff),.5);
 this.spot.intensity=this.rig.spot;this.spot.color.lerp(this.temporary.set(this.target.spotColor),1-Math.exp(-speed*dt));this.spot.position.set(...this.rig.spotPos);this.spot.target.position.set(...this.rig.spotTarget);this.spot.angle=this.rig.angle;this.spot.penumbra=this.rig.penumbra;
 for(const b of this.bindings){const power=b.kind===2?this.rig.screens:b.group==='softbox'?this.rig.softbox:b.group==='ceiling'?this.rig.practicals*shell*.6:this.rig.practicals;b.material.userData.local.uFixture.value=this.groups[b.group].value*power;}
 for(const s of this.sources){const power=s.group==='screens'?this.rig.screens:s.group==='softbox'?this.rig.softbox:this.rig.practicals;s.light.intensity=s.power*power*this.groups[s.group].value*(s.group==='lamps'?pulse:1);if(s.group==='screens')s.light.color.copy(this.u.uAccent.value).lerp(this.temporary.set(0xa5caff),.55);}
 this.u.uScreenPower.value=this.rig.screens;this.u.uGoboTime.value=time;this.u.uGoboMix.value=damp(this.u.uGoboMix.value,this.target.gobo?1:0,speed,dt);
 this.u.uRigEnergy.value=Math.min(1.7,.23+(this.rig.key+this.rig.fill+this.rig.rim)*.2+this.rig.practicals*.12)*pulse;
 // Color has no vector addition API in older Three releases.
 this.tint.copy(this.key.color).multiplyScalar(this.rig.key).add(this.temporary.copy(this.fill.color).multiplyScalar(this.rig.fill)).add(this.temporary.copy(this.rim.color).multiplyScalar(this.rig.rim));
 const max=Math.max(this.tint.r,this.tint.g,this.tint.b,.001);this.u.uRigTint.value.copy(this.tint).multiplyScalar(1/max);
 this.u.uKeyDir.value.copy(this.key.position).normalize();
 this.beam.visible=this.rig.volume>.005;this.beam.material.uniforms.uPower.value=this.rig.volume;this.beam.material.uniforms.uColor.value.copy(this.spot.color);this.beam.position.copy(this.spot.position);this.beamDirection.copy(this.spot.target.position).sub(this.spot.position).normalize();this.beam.quaternion.setFromUnitVectors(this.down,this.beamDirection);
 const moving=this.age<2||motion===3;if(this.shadowAge>.12&&moving){this.renderer.shadowMap.needsUpdate=true;this.shadowAge=0;}
 }
}
