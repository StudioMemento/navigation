import {seeded,clamp} from './model.mjs';
import {triangulate} from './geometry.mjs';
export class Field{
 constructor(canvas){this.canvas=canvas;this.ctx=canvas.getContext('2d',{alpha:false});this.pulses=[];this.pointer={x:-2000,y:-2000,strength:0};this.last=0;}
 resize(l){this.l=l;const d=Math.min(devicePixelRatio||1,l.small?1.25:1.5);this.canvas.width=Math.round(l.w*d);this.canvas.height=Math.round(l.h*d);this.ctx.setTransform(d,0,0,d,0,0);const r=seeded(1467),points=[];
 const count=l.small?64:148;
 for(let i=0;i<count;i++){let x=r(),y=r();if(i<count*.8){const side=i%4;if(side===0)x=Math.pow(r(),2.2)*.27;if(side===1)x=1-Math.pow(r(),2.2)*.27;if(side===2)y=Math.pow(r(),2.2)*.21;if(side===3)y=1-Math.pow(r(),2.2)*.21;}
 points.push({x,y,phase:r()*6.28,speed:.35+r()*.4,energy:.2+r()*.8});}
 this.points=points;this.positions=points.map(()=>({x:0,y:0,value:0}));this.edges=[];const seen=new Set();
 for(const t of triangulate(points))for(let k=0;k<3;k++){let a=t[k],b=t[(k+1)%3],key=[a,b].sort((a,b)=>a-b).join('-');if(!seen.has(key)){seen.add(key);this.edges.push([a,b]);}}
 this.fragments=Array.from({length:l.small?9:19},()=>({x:r(),y:r(),phase:r()*6.28,speed:.07+r()*.08,size:.8+r()*1.4}));
 }
 touch(x,y,t){if(this.pulses.length>=3)this.pulses.shift();this.pulses.push({x,y,time:t});}
 draw(t,reduced=false){const c=this.ctx,l=this.l;if(!l)return;const time=reduced?0:t*.001;
 c.fillStyle='#070809';c.fillRect(0,0,l.w,l.h);
 this.pulses=this.pulses.filter(p=>t-p.time<1450);
 for(let i=0;i<this.points.length;i++){const p=this.points[i],q=this.positions[i];q.x=p.x*l.w+Math.sin(time*p.speed+p.phase)*(l.small?1.3:2.7);q.y=p.y*l.h+Math.cos(time*p.speed*.77+p.phase)*2;
 let strength=0;const dx=q.x-this.pointer.x,dy=q.y-this.pointer.y;
 if(this.pointer.strength){const anis=1+.26*Math.sin(p.phase+time*.4)+.15*Math.sin(q.y*.014+q.x*.009);const dist=Math.hypot(dx,dy*1.13)/anis;strength=Math.exp(-dist*dist/(l.small?16000:31000))*this.pointer.strength*(.25+.75*p.energy);}
 for(const pulse of this.pulses){const age=(t-pulse.time)*.001,dist=Math.hypot(q.x-pulse.x,q.y-pulse.y),delay=dist/(180+170*p.energy),wave=clamp(1-Math.abs(age-delay-.14)/.5);strength=Math.max(strength,wave*clamp(1-age/1.45)*.85*p.energy);}
 const border=Math.max(Math.abs(p.x-.5)*2,Math.abs(p.y-.5)*2);q.base=.012+Math.pow(border,2.5)*.13;q.value=strength;}
 c.lineWidth=.55;
 for(const [a,b]of this.edges){const A=this.positions[a],B=this.positions[b],dist=Math.hypot(A.x-B.x,A.y-B.y);if(dist>(l.small?230:440))continue;const e=(A.value+B.value)/2,base=(A.base+B.base)/2;
 c.strokeStyle=e>.025?`rgba(236,153,64,${Math.min(.63,base*.55+e*.52)})`:`rgba(157,165,170,${base})`;c.beginPath();c.moveTo(A.x,A.y);c.lineTo(B.x,B.y);c.stroke();}
 for(const q of this.positions){const e=q.value;c.fillStyle=e>.05?`rgba(255,185,95,${.25+e*.7})`:`rgba(210,213,210,${q.base*1.65})`;c.beginPath();c.arc(q.x,q.y,e>.12?1.05:.65,0,6.29);c.fill();if(e>.32){c.shadowColor='#ffb054';c.shadowBlur=5*e;c.fillRect(q.x-.7,q.y-.7,1.4,1.4);c.shadowBlur=0;}}
 for(const f of this.fragments){const x=f.x*l.w+Math.sin(time*f.speed+f.phase)*14,y=f.y*l.h+Math.cos(time*f.speed*.9+f.phase)*19,a=f.phase+time*.11,dx=x-this.pointer.x,dy=y-this.pointer.y;const e=this.pointer.strength*Math.exp(-(dx*dx+dy*dy)/35000);c.save();c.translate(x,y);c.rotate(a);c.fillStyle=e>.1?`rgba(242,171,80,${.15+e*.45})`:'rgba(201,203,196,.19)';c.beginPath();c.moveTo(0,-f.size);c.lineTo(f.size*.8,f.size);c.lineTo(-f.size,f.size*.55);c.closePath();c.fill();c.restore();}
 }
}
