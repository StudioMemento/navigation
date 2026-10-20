// Input state is independent of the renderer: touch, mouse and fallback share it.
export const SECTIONS=['Home','Studio','Servizi','Progetti','Level Up','Contatti'];
export class Navigation {
 constructor(count=6){this.count=count;this.position=0;this.target=0;this.drag=null;}
 wrap(n){return ((n%this.count)+this.count)%this.count;}
 select(index,immediate=false){const delta=this.wrap(index-this.position+this.count/2)-this.count/2;this.target=this.position+delta;this.drag=null;if(immediate)this.position=this.target;return this.wrap(Math.round(this.target));}
 begin(x,time,pixelsPerSlide){this.drag={startX:x,lastX:x,lastTime:time,velocity:0,origin:this.position,pixelsPerSlide,moved:false};this.target=this.position;}
 move(x,time){const d=this.drag;if(!d)return;const dx=x-d.startX,dt=time-d.lastTime;if(dt>0){d.velocity=d.velocity*.35+(x-d.lastX)/dt*.65;}d.lastX=x;d.lastTime=time;d.moved ||= Math.abs(dx)>7;this.target=d.origin-Math.max(-d.pixelsPerSlide*1.8,Math.min(d.pixelsPerSlide*1.8,dx))/d.pixelsPerSlide;}
 release(time,cancel=false){const d=this.drag;if(!d)return null;const offset=this.target-d.origin,velocity=time-d.lastTime<100?d.velocity:0;let next=Math.round(d.origin);if(!cancel&&d.moved){if(Math.abs(offset)>.16||Math.abs(velocity)>.32){const direction=Math.abs(offset)>.08?Math.sign(offset):-Math.sign(velocity);next+=direction*Math.max(1,Math.min(2,Math.round(Math.abs(offset))));}}this.drag=null;this.target=next;return {index:this.wrap(next),moved:d.moved,cancel};}
 update(dt,reduced=false){if(reduced){this.position=this.target;return this.position;}this.position+=(this.target-this.position)*(1-Math.exp(-Math.min(dt,.05)*(this.drag?27:10.5)));if(Math.abs(this.target-this.position)<.00005)this.position=this.target;return this.position;}
}
