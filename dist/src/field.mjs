// One bounded canvas owns the background, card material, glyph light and touch waves.
const TAU=Math.PI*2;
const clamp=(v,a=0,b=1)=>Math.max(a,Math.min(b,v));
function seeded(seed=73){return()=>{seed=(seed*1664525+1013904223)>>>0;return seed/4294967296;};}
function lattice(w,h,cell,seed=73){
 const random=seeded(seed),cols=Math.ceil(w/cell)+1,rows=Math.ceil(h/cell)+1,points=[],edges=[],faces=[];
 for(let y=0;y<=rows;y++)for(let x=0;x<=cols;x++)points.push({x:(x-.5)*cell+(random()-.5)*cell*.82,y:(y-.5)*cell+(random()-.5)*cell*.82,seed:random()});
 const id=(x,y)=>y*(cols+1)+x;
 for(let y=0;y<rows;y++)for(let x=0;x<cols;x++){
  const a=id(x,y),b=id(x+1,y),c=id(x,y+1),d=id(x+1,y+1),flip=random()>.5;
  edges.push([a,b],[a,c],flip?[a,d]:[b,c]);
  faces.push(...(flip?[[a,b,d],[a,d,c]]:[[a,b,c],[b,d,c]]));
 }
 return {points,edges,faces};
}
function noise(x,y,t=0){
 return .53+.2*Math.sin(x*.021+y*.013+t)*Math.cos(y*.027-x*.008)+.12*Math.sin(x*.044-y*.031)+.09*Math.cos(x*.007+y*.051);
}
function inside(x,y,b){return x>=b.left&&x<=b.right&&y>=b.top&&y<=b.bottom;}
function edgeDistance(x,y,b){return Math.min(x-b.left,b.right-x,y-b.top,b.bottom-y);}
export function createField({canvas,viewport,cards,reduced}){
 const ctx=canvas.getContext('2d',{alpha:true,desynchronized:true});
 if(!ctx)return {resize(){},scroll(){},wake(){},enter(){},exit(){},pause(){}};
 const coarse=matchMedia('(pointer:coarse)'),off=matchMedia('(forced-colors:active)');
 const disabled=new URLSearchParams(location.search).get('fx')==='off';
 const abort=new AbortController(),{signal}=abort;
 let width=1,height=1,dpr=1,mesh,boxes=[],slot=5,top=0,pageHeight=1,raf=0,last=0,lastInput=0;
 let pulses=[],particles=[],intro=0,exitAt=0,paused=false,slow=0,quality=1;
 const pointer={x:-999,y:-999,tx:-999,ty:-999,presence:0,target:0};
 const fineCache=new Map(),glyphCache=new Map();
 function measure(){
  boxes=[];
  for(let i=Math.max(0,slot-1);i<=Math.min(cards.length-1,slot+1);i++){
   const rect=cards[i].getBoundingClientRect();
   if(rect.bottom<0||rect.top>height)continue;
   const title=cards[i].querySelector('.title'),tr=title.getBoundingClientRect(),font=getComputedStyle(title).font;
   const letters=[...title.children].map(span=>{const r=span.getBoundingClientRect();return {text:span.textContent,x:r.left-tr.left,w:r.width};});
   const b={...{left:rect.left,right:rect.right,top:rect.top,bottom:rect.bottom,width:rect.width,height:rect.height},index:i,progress:(i*pageHeight-top)/pageHeight,title:{left:tr.left,top:tr.top,width:tr.width,height:tr.height,font,letters}};
   boxes.push(b);
  }
 }
 function resize(){
  width=viewport.clientWidth;height=viewport.clientHeight;
  dpr=Math.min(devicePixelRatio||1,coarse.matches?1.25:1.5)*quality;
  canvas.width=Math.round(width*dpr);canvas.height=Math.round(height*dpr);
  ctx.setTransform(dpr,0,0,dpr,0,0);
  mesh=lattice(width,height,coarse.matches?104:122);fineCache.clear();glyphCache.clear();measure();wake();
 }
 function wake(){if(!raf&&!document.hidden&&!paused&&!disabled&&!off.matches)raf=requestAnimationFrame(draw);}
 function pause(){paused=true;cancelAnimationFrame(raf);raf=0;}
 function activation(x,y,now){
  let a=0;
  if(pointer.presence>.002){
   const dx=x-pointer.x,dy=y-pointer.y,r=Math.min(290,Math.max(155,width*.2));
   // Broad stochastic falloff: no hard radial mask and no visible circular rim.
   a=Math.exp(-(dx*dx+dy*dy)/(r*r*.54))*pointer.presence*clamp(noise(x,y,now*.00013)*1.2+.1);
  }
  for(const p of pulses){
   const age=now-p.time,life=age/1450;if(life>1)continue;
   const dx=x-p.x,dy=y-p.y,distance=Math.hypot(dx,dy);
   if(reduced.matches){a=Math.max(a,Math.exp(-distance*distance/16000)*clamp(1-age/240));continue;}
   const angle=Math.atan2(dy,dx),radius=age*.42;
   const warp=(Math.sin(angle*3+p.seed)+.6*Math.sin(angle*7-p.seed))*radius*.13;
   const spread=36+age*.044,wave=Math.exp(-(((distance-radius-warp)/spread)**2));
   const disperse=clamp(noise(x+age*.027,y-age*.012,p.seed)*1.45);
   const core=Math.exp(-distance*distance/(16000+age*120))*.23;
   a=Math.max(a,(wave*.8+core)*Math.pow(1-life,1.7)*disperse);
  }
  return clamp(a);
 }
 function path(points,ids,ox=0,oy=0,context=ctx){
  context.beginPath();ids.forEach((id,j)=>{const p=points[id];j?context.lineTo(p.x+ox,p.y+oy):context.moveTo(p.x+ox,p.y+oy);});
 }
 function triangle(x,y,size,rotation,alpha,amber=true){
  ctx.save();ctx.translate(x,y);ctx.rotate(rotation);ctx.beginPath();ctx.moveTo(0,-size);ctx.lineTo(size*.8,size*.65);ctx.lineTo(-size*.8,size*.65);ctx.closePath();
  ctx.fillStyle=amber?`rgba(255,177,92,${alpha})`:`rgba(224,229,232,${alpha})`;ctx.fill();ctx.restore();
 }
 function background(now){
  const {points,edges}=mesh;
  ctx.lineWidth=.55;
  for(const [a,b] of edges){
   const p=points[a],q=points[b],x=(p.x+q.x)/2,y=(p.y+q.y)/2;
   const card=boxes.find(b=>inside(x,y,b)),hot=activation(x,y,now);
   const margin=Math.pow(Math.abs(x-width/2)/(width/2),.7);
   const neutral=card?0:(.045+.11*margin)*(.65+p.seed*.7);
   const gain=card?(.035+.7*Math.exp(-Math.max(0,edgeDistance(x,y,card))/12)):1;
   ctx.strokeStyle=`rgba(184,194,202,${neutral})`;path(points,[a,b]);ctx.stroke();
   if(hot>.012){ctx.strokeStyle=`rgba(246,155,77,${hot*.55*gain})`;ctx.lineWidth=.55+hot*.36;path(points,[a,b]);ctx.stroke();ctx.lineWidth=.55;}
  }
  for(const p of points){
   const card=boxes.find(b=>inside(p.x,p.y,b));if(card)continue;
   const a=activation(p.x,p.y,now),alpha=.12+p.seed*.12;
   ctx.beginPath();ctx.arc(p.x,p.y,a>.35?1.25:.72,0,TAU);ctx.fillStyle=a>.05?`rgba(255,183,106,${alpha+a*.65})`:`rgba(205,212,218,${alpha})`;ctx.fill();
   if(a>.56){const g=ctx.createRadialGradient(p.x,p.y,0,p.x,p.y,12);g.addColorStop(0,`rgba(255,169,88,${a*.22})`);g.addColorStop(1,'rgba(255,169,88,0)');ctx.fillStyle=g;ctx.fillRect(p.x-12,p.y-12,24,24);}
   if(p.seed>.975)triangle(p.x+9,p.y+15,1.6,p.seed*3,.18+a*.45,a>.05);
  }
 }
 function fineMesh(b){
  const key=`${Math.round(b.width)}:${Math.round(b.height)}`;
  if(!fineCache.has(key)){if(fineCache.size>8)fineCache.clear();fineCache.set(key,lattice(b.width,b.height,coarse.matches?28:32,21));}
  return fineCache.get(key);
 }
 function material(b,now){
  const {points,faces}=fineMesh(b),p=b.progress,transition=reduced.matches?0:Math.sin(clamp(Math.abs(p))*Math.PI);
  const entry=(!reduced.matches&&intro)?clamp(1-(now-intro)/1100):0;
  const cut=Math.max(10,Math.min(22,width*.015)),x=b.left,y=b.top,w=b.width,h=b.height;
  ctx.save();ctx.beginPath();ctx.moveTo(x+cut,y);ctx.lineTo(x+w,y);ctx.lineTo(x+w,y+h-cut);ctx.lineTo(x+w-cut,y+h);ctx.lineTo(x,y+h);ctx.lineTo(x,y+cut);ctx.closePath();ctx.clip();
  for(const f of faces){
   const a=points[f[0]],q=points[f[1]],c=points[f[2]],mx=(a.x+q.x+c.x)/3+x,my=(a.y+q.y+c.y)/3+y;
   const edge=Math.max(0,edgeDistance(mx,my,b));
   const hot=activation(mx,my,now);
   const bandY=p>0?y+p*.22*h:y+h+p*.22*h;
   const trail=transition*Math.exp(-(((my-bandY)/38)**2))*(.3+noise(mx,my));
   const appear=entry*Math.exp(-(((my-y-(1-entry)*h)/43)**2))*.6;
   const strength=hot*(.065+.8*Math.exp(-edge/18))+trail*.7+appear;
   if(strength<.006)continue;
   path(points,f,x,y);ctx.closePath();
   ctx.strokeStyle=`rgba(255,179,104,${strength*.7})`;ctx.lineWidth=.65;ctx.stroke();
   if(a.seed>.58){ctx.fillStyle=`rgba(246,155,77,${strength*.13})`;ctx.fill();}
  }
  // The same proximity value illuminates every edge inside range.
  const corners=[[x+cut,y],[x+w,y],[x+w,y+h-cut],[x+w-cut,y+h],[x,y+h],[x,y+cut],[x+cut,y]];
  for(let j=1;j<corners.length;j++){
   const a=corners[j-1],q=corners[j],len=Math.hypot(q[0]-a[0],q[1]-a[1]),steps=Math.ceil(len/20);
   for(let k=0;k<steps;k++){
    const t=k/steps,u=(k+1)/steps,mx=a[0]+(q[0]-a[0])*(t+u)/2,my=a[1]+(q[1]-a[1])*(t+u)/2;
    const hot=activation(mx,my,now);if(hot<.018)continue;
    ctx.beginPath();ctx.moveTo(a[0]+(q[0]-a[0])*t,a[1]+(q[1]-a[1])*t);ctx.lineTo(a[0]+(q[0]-a[0])*u,a[1]+(q[1]-a[1])*u);
    ctx.strokeStyle=`rgba(255,201,137,${hot*.8})`;ctx.lineWidth=1;ctx.stroke();
   }
  }
  ctx.restore();typeLight(b,now,transition+entry*.55);
 }
 function typeLight(b,now,transition){
  const t=b.title;if(!t.width||t.top>height||t.top+t.height<0)return;
  const key=`${cards[b.index].querySelector('.title').textContent}:${Math.round(t.width)}:${t.font}`;
  let cached=glyphCache.get(key);
  if(!cached){
   if(glyphCache.size>8)glyphCache.clear();
   const mask=document.createElement('canvas'),layer=document.createElement('canvas');
   mask.width=layer.width=Math.ceil(t.width*dpr);mask.height=layer.height=Math.ceil(t.height*dpr);
   const m=mask.getContext('2d');m.scale(dpr,dpr);m.font=t.font;m.textBaseline='alphabetic';
   const metrics=m.measureText('M'),size=parseFloat(t.font.match(/([\d.]+)px/)?.[1]||40),ascent=metrics.fontBoundingBoxAscent||size*.97,descent=metrics.fontBoundingBoxDescent||size*.24;
   const baseline=(t.height-ascent-descent)/2+ascent;
   m.fillStyle='white';for(const letter of t.letters)m.fillText(letter.text,letter.x,baseline);
   cached={mask,layer,baseline,mesh:lattice(t.width,t.height,17,51)};glyphCache.set(key,cached);
  }
  const l=cached.layer.getContext('2d');l.setTransform(1,0,0,1,0,0);l.clearRect(0,0,cached.layer.width,cached.layer.height);l.setTransform(dpr,0,0,dpr,0,0);
  const {points,faces}=cached.mesh;
  for(const f of faces){
   const p=points[f[0]],q=points[f[1]],r=points[f[2]],x=(p.x+q.x+r.x)/3,y=(p.y+q.y+r.y)/3;
   const hot=activation(t.left+x,t.top+y,now),power=hot+transition*.25*noise(x,y);
   if(power<.012)continue;
   path(points,f,0,0,l);l.closePath();l.fillStyle=`rgba(255,163,70,${power*(.12+p.seed*.25)})`;l.fill();l.strokeStyle=`rgba(255,198,128,${power*.9})`;l.lineWidth=.7;l.stroke();
  }
  l.globalCompositeOperation='destination-in';l.drawImage(cached.mask,0,0,cached.mask.width,cached.mask.height,0,0,t.width,t.height);l.globalCompositeOperation='source-over';
  ctx.drawImage(cached.layer,0,0,cached.layer.width,cached.layer.height,t.left,t.top,t.width,t.height);
  ctx.save();ctx.font=t.font;ctx.textBaseline='alphabetic';ctx.lineWidth=.55;
  for(const letter of t.letters){
   const a=activation(t.left+letter.x+letter.w/2,t.top+t.height/2,now);
   if(a<.02)continue;
   ctx.strokeStyle=`rgba(255,204,141,${a*.8})`;ctx.shadowColor=`rgba(255,147,58,${a*.5})`;ctx.shadowBlur=3;
   ctx.strokeText(letter.text,t.left+letter.x,t.top+cached.baseline);
  }
  ctx.restore();
 }
 function burst(direction=1,full=false){
  if(reduced.matches)return;
  const now=performance.now(),b=boxes.find(b=>b.index===slot);if(!b)return;
  const random=seeded(Math.floor(now)),count=coarse.matches?12:25;
  for(let j=0;j<count;j++){
   particles.push({x:b.left+random()*b.width,y:full?b.top+random()*b.height:(direction>0?b.bottom:b.top),vx:(random()-.5)*.034,vy:direction*(.018+random()*.055),life:540+random()*480,time:now,size:.7+random()*1.5,rotation:random()*TAU,seed:random()});
  }
  if(particles.length>72)particles.splice(0,particles.length-72);
 }
 function draw(now){
  raf=0;if(document.hidden||paused||disabled||off.matches)return;
  if(now-last<(coarse.matches?31:15)){wake();return;}
  const begin=performance.now(),dt=Math.min(now-(last||now),50);last=now;
  const ease=reduced.matches?1:1-Math.exp(-dt/65);
  pointer.x+=(pointer.tx-pointer.x)*ease;pointer.y+=(pointer.ty-pointer.y)*ease;pointer.presence+=(pointer.target-pointer.presence)*(1-Math.exp(-dt/100));
  pulses=pulses.filter(p=>now-p.time<(reduced.matches?260:1450));particles=particles.filter(p=>now-p.time<p.life);
  ctx.clearRect(0,0,width,height);background(now);for(const b of boxes)material(b,now);
  for(const p of particles){const age=now-p.time,t=age/p.life;triangle(p.x+p.vx*age,p.y+p.vy*age,p.size*(1-t*.6),p.rotation+t,.6*Math.sin(Math.PI*t)*(1-t));}
  const duration=performance.now()-begin;
  if(duration>16)slow++;else slow=Math.max(0,slow-1);
  if(slow>12&&quality===1){quality=.8;slow=0;resize();}
  const unsettled=Math.abs(pointer.presence-pointer.target)>.004||Math.abs(pointer.x-pointer.tx)+Math.abs(pointer.y-pointer.ty)>.3;
  if(unsettled||pulses.length||particles.length||now-lastInput<220||(intro&&now-intro<1150)||(exitAt&&now-exitAt<400))wake();
 }
 window.addEventListener('pointermove',event=>{
  if(event.pointerType==='touch')return;
  paused=false;pointer.tx=event.clientX;pointer.ty=event.clientY;pointer.target=1;lastInput=performance.now();wake();
 },{passive:true,signal});
 window.addEventListener('pointerdown',event=>{
  paused=false;const now=performance.now();lastInput=now;
  if(event.pointerType==='touch'||event.pointerType==='pen'){
   pointer.target=0;pulses.push({x:event.clientX,y:event.clientY,time:now,seed:now*.001%TAU});if(pulses.length>4)pulses.shift();
  }else{pointer.x=pointer.tx=event.clientX;pointer.y=pointer.ty=event.clientY;pointer.target=1;}
  wake();
 },{passive:true,signal});
 function leave(){pointer.target=0;lastInput=performance.now();wake();}
 document.documentElement.addEventListener('pointerleave',leave,{signal});window.addEventListener('blur',leave,{signal});
 document.addEventListener('visibilitychange',()=>{if(document.hidden)pause();else{paused=false;measure();wake();}},{signal});
 reduced.addEventListener('change',()=>{pulses=[];particles=[];resize();},{signal});
 coarse.addEventListener('change',resize,{signal});off.addEventListener('change',()=>{ctx.clearRect(0,0,width,height);wake();},{signal});
 resize();
 return {
  resize,wake(){paused=false;wake();},pause,
  scroll(y,h,index){const old=slot;top=y;pageHeight=h;slot=index;measure();if(old!==slot)burst(index>old?1:-1);lastInput=performance.now();wake();},
  enter(){intro=performance.now();burst(-1,true);wake();},
  exit(){exitAt=performance.now();burst(-1,true);wake();},
  destroy(){pause();abort.abort();fineCache.clear();glyphCache.clear();}
 };
}
