import * as T from 'three';
import {damp,ease} from './config.js';
export const LIGHT_GROUPS=[['lamps','Lampade'],['shelf','Libreria'],['softbox','Softbox'],['ceiling','Soffitto'],['screens','Monitor'],['tv','TV']];
export function fixtureFor(name){if(name==='TV_55')return{group:'tv',kind:2};if(/DISPLAY|ULTRAWIDE|MONITOR/.test(name)&&!/^PARETE/.test(name))return{group:'screens',kind:2};if(name==='SOFTBOX1')return{group:'softbox',kind:4};if(name==='LUCI_SOFFITTO')return{group:'ceiling',kind:3};if(/^LAMPADA_/.test(name))return{group:'lamps',kind:name==='LAMPADA_SALE'?3:1};return null;}
export class StudioLighting{
 constructor(scene,renderer,mobile){this.scene=scene;this.renderer=renderer;this.day=0;this.dayTarget=0;this.dayFrom=0;this.dayProgress=1;this.dayPulse=0;this.bindings=[];this.sources=[];this.emitters=[];this.lastShadowDay=-1;this.groups=Object.fromEntries(LIGHT_GROUPS.map(([id])=>[id,{target:1,value:1}]));
 this.hemi=new T.HemisphereLight(0xa6bed8,0x24160e,.45);scene.add(this.hemi);
 this.key=new T.DirectionalLight(0xdce5f4,1.8);this.key.position.set(-2.5,7,4);this.key.castShadow=true;this.key.shadow.mapSize.setScalar(mobile?1024:2048);Object.assign(this.key.shadow.camera,{left:-5,right:5,top:5,bottom:-5,near:.1,far:20});this.key.shadow.bias=-.00035;this.key.shadow.normalBias=.018;this.key.shadow.radius=3;scene.add(this.key);
 this.rim=new T.DirectionalLight(0xffa269,1.4);this.rim.position.set(4,4,-4);scene.add(this.rim);this.fill=new T.DirectionalLight(0xb2c8e3,.45);this.fill.position.set(-4,2,-1);scene.add(this.fill);
 const point=(group,pos,color,intensity,distance)=>{const light=new T.PointLight(color,intensity,distance,2);light.position.set(...pos);scene.add(light);this.sources.push({group,light,base:intensity});};
 point('lamps',[2.055,.90,1.39],0xffae6c,3.0,3);point('lamps',[-1.86,1.45,-.09],0xffb777,1.3,2.3);point('lamps',[-.20,1.19,1.79],0xff9647,.40,1.4);
 point('shelf',[-1.63,1.15,-.62],0xffc08a,.85,1.7);point('softbox',[-1.05,1.50,-.94],0xffdfba,3.4,3.2);
 point('ceiling',[-.9,2.48,-1.8],0xffe5ce,3.2,4.8);point('ceiling',[1.25,2.48,-1.8],0xffe5ce,3.2,4.8);point('ceiling',[.1,2.48,.15],0xffe5ce,2,4.2);
 point('screens',[-.9,1.12,-2.35],0xa6c2cf,.55,1.6);point('screens',[1.45,1.12,-2.35],0xa6c2cf,.55,1.6);point('tv',[.37,1.75,-2.78],0xffc49b,.75,1.9);
 }
 addEmitter(group,geometry,position,color,power=3.5){const material=new T.MeshBasicMaterial({color,side:T.DoubleSide});const mesh=new T.Mesh(geometry,material);mesh.position.set(...position);mesh.name=`EMITTER_${group}_${this.emitters.length}`;mesh.userData.lightGroup=group;this.scene.add(mesh);this.emitters.push({mesh,group,power,color:new T.Color(color)});return mesh;}
 createEmitters(){const disk=(group,position,r,color,power)=>{const m=this.addEmitter(group,new T.CircleGeometry(r,40),position,color,power);m.rotation.x=-Math.PI/2;return m;};
 disk('lamps',[2.055,.943,1.39],.193,0xffb678,4.2);disk('lamps',[2.055,1.193,1.39],.115,0xffcc96,2.0);
 disk('lamps',[-1.865,1.487,-.094],.105,0xffc18b,3.6);disk('softbox',[-1.052,1.573,-.943],.515,0xffe5c5,3.2);
 for(const z of [-.99,-.255])this.addEmitter('shelf',new T.BoxGeometry(.007,1.73,.007),[-1.727,.91,z],0xffc18e,4.8);
 for(const y of [.055,.61,1.17,1.79])this.addEmitter('shelf',new T.BoxGeometry(.007,.007,.735),[-1.727,y,-.622],0xffc18e,4.8);
 }
 bind(mesh,fixture){if(fixture){mesh.userData.lightGroup=fixture.group;this.bindings.push({material:mesh.material,...fixture});}if(mesh.name==='SHELF')mesh.userData.lightGroup='shelf';}
 toggle(id){if(this.groups[id])this.groups[id].target=1-this.groups[id].target;}
 setDay(day){this.dayFrom=this.day;this.dayTarget=day?1:0;this.dayProgress=0;}
 update(dt,shell,reduced=false){this.dayProgress=reduced?1:Math.min(1,this.dayProgress+dt/4.2);this.day=T.MathUtils.lerp(this.dayFrom,this.dayTarget,ease(this.dayProgress));this.dayPulse=this.dayProgress<1?Math.sin(this.dayProgress*Math.PI)*Math.abs(this.dayTarget-this.dayFrom):0;
 for(const g of Object.values(this.groups))g.value=damp(g.value,g.target,reduced?100:4,dt);const sourcePower=T.MathUtils.lerp(1,.42,this.day);
 for(const b of this.bindings)b.material.userData.local.uFixture.value=this.groups[b.group].value*sourcePower*(b.kind===3&&b.group==='lamps'?.35:1);
 for(const s of this.sources)s.light.intensity=s.base*this.groups[s.group].value*(s.group==='ceiling'?shell:1)*sourcePower;
 for(const e of this.emitters)e.mesh.material.color.copy(e.color).multiplyScalar(.02+e.power*this.groups[e.group].value*sourcePower);
 this.hemi.intensity=T.MathUtils.lerp(.34,1.5,this.day);this.hemi.color.set(0xa6bed8).lerp(new T.Color(0xe7eef1),this.day);
 this.key.intensity=T.MathUtils.lerp(1.9,3.4,this.day);this.key.position.set(T.MathUtils.lerp(3,-3.5,this.day),T.MathUtils.lerp(4,6.7,this.day),T.MathUtils.lerp(-2,4.5,this.day));this.key.color.set(0xb0c3e2).lerp(new T.Color(0xffe2bd),this.day).lerp(new T.Color(0xff8d4a),this.dayPulse*.55);
 this.rim.intensity=T.MathUtils.lerp(1.45,.6,this.day);this.fill.intensity=T.MathUtils.lerp(.40,.75,this.day);this.renderer.toneMappingExposure=T.MathUtils.lerp(1.02,.98,this.day);this.scene.environmentIntensity=T.MathUtils.lerp(.38,.64,this.day);
 if(this.scene.fog)this.scene.fog.color.set(0x080d16).lerp(new T.Color(0x9eabb0),this.day);
 if(Math.abs(this.day-this.lastShadowDay)>.035||this.dayProgress===1&&this.lastShadowDay!==this.day){this.renderer.shadowMap.needsUpdate=true;this.lastShadowDay=this.day;}
 }
}
