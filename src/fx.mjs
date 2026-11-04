import {SETTINGS} from './config.mjs';
const NS='http://www.w3.org/2000/svg';
const reduced=matchMedia('(prefers-reduced-motion: reduce)');
function random(seed=19){return()=>{seed=(seed*1664525+1013904223)>>>0;return seed/4294967296;};}
export function meshMarkup(id,cell=21){
  const rng=random(9), n=8, points=[];let faces='';
  for(let y=0;y<=n;y++){points[y]=[];for(let x=0;x<=n;x++)points[y][x]=[x*cell+(x&&x<n?(rng()-.5)*cell*.6:0),y*cell+(y&&y<n?(rng()-.5)*cell*.6:0)];}
  for(let y=0;y<n;y++)for(let x=0;x<n;x++){
    const a=points[y][x],b=points[y][x+1],c=points[y+1][x],d=points[y+1][x+1];
    for(const t of rng()>.5?[[a,b,c],[b,d,c]]:[[a,b,d],[a,d,c]]){
      const alpha=rng()>.73?.24+rng()*.3:.025+rng()*.06;
      faces+=`<polygon points="${t.map(p=>p.join(',')).join(' ')}" fill="rgba(255,188,93,${alpha.toFixed(3)})" stroke="#ffd39a" stroke-opacity=".65" stroke-width=".75"/>`;
    }
  }
  return `<pattern id="${id}" patternUnits="userSpaceOnUse" width="${n*cell}" height="${n*cell}">${faces}</pattern>`;
}
export function cardEdgeMarkup(id){
  return `<svg class="slide-border" viewBox="0 0 600 338" preserveAspectRatio="none" aria-hidden="true"><path d="M20 .6H599.4V318L580 337.4H.6V20Z"/></svg><svg class="slide-fx" viewBox="0 0 600 338" preserveAspectRatio="none" aria-hidden="true"><defs>${meshMarkup(`edge-mesh-${id}`,13)}<mask id="edge-band-${id}"><path d="M20 0H600V318L580 338H0V20Z" style="fill:white;stroke:none"/><path d="M26 13H587V312L574 325H13V26Z" style="fill:black;stroke:none"/></mask></defs><g mask="url(#edge-band-${id})"><rect width="600" height="338" fill="url(#edge-mesh-${id})"/><path d="M20 1H599V318L580 337H1V20Z" style="fill:none;stroke:#ffbf80;stroke-width:1.5"/></g></svg>`;
}
export function createEffects({titleSVG, titleAccessible, cards, stage, dust}){
  const controller=new AbortController(), {signal}=controller;
  const pointer={x:-1000,y:-1000,tx:-1000,ty:-1000,presence:0,target:0,touch:false};
  let raf=0,last=0,titleWidth=1000,titleTracking=5,titleText='',field=null,glow=null,boxes=[],titleBox=null,invalid=true,shardRaf=0,enabled=new URLSearchParams(location.search).get('fx')!=='off',visible=true;
  const ctx=document.createElement('canvas').getContext('2d');
  function syncEdges(){
    for(const card of cards){
      const w=card.offsetWidth,h=card.offsetHeight,cut=parseFloat(getComputedStyle(card).getPropertyValue('--cut'))||20,inset=10;
      const outer=`M${cut} .5H${w-.5}V${h-cut}L${w-cut} ${h-.5}H.5V${cut}Z`;
      const inner=`M${cut+4} ${inset}H${w-inset}V${h-cut-4}L${w-cut-4} ${h-inset}H${inset}V${cut+4}Z`;
      for(const svg of card.querySelectorAll('.slide-border,.slide-fx'))svg.setAttribute('viewBox',`0 0 ${w} ${h}`);
      card.querySelector('.slide-border path').setAttribute('d',outer);
      const maskPaths=card.querySelectorAll('.slide-fx mask path');maskPaths[0].setAttribute('d',outer);maskPaths[1].setAttribute('d',inner);
      card.querySelector('.slide-fx g>path').setAttribute('d',outer);
      const rect=card.querySelector('.slide-fx g>rect');rect.setAttribute('width',w);rect.setAttribute('height',h);
    }
  }
  const titleNode=(id,text)=>`<text ${id?`id="${id}"`:''} x="1" y="194" style="letter-spacing:${titleTracking}px">${text}</text>`;
  function setTitle(text){
    titleText=text;titleAccessible.textContent=text;
    ctx.font='350 200px Inter';const rawWidth=ctx.measureText(text).width;titleWidth=Math.max(1000,rawWidth+Math.max(0,text.length-1)*5+7);titleTracking=(titleWidth-rawWidth-7)/Math.max(1,text.length-1);
    titleSVG.setAttribute('viewBox',`0 0 ${titleWidth} 219`);
    titleSVG.innerHTML=`<defs><linearGradient id="type-base" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fffdf8"/><stop offset=".46" stop-color="#f1dfc6"/><stop offset=".8" stop-color="#dfad73"/><stop offset="1" stop-color="#ff7950"/></linearGradient>${meshMarkup('type-mesh',18)}<mask id="glyph-mask" maskUnits="userSpaceOnUse" x="-10" y="-10" width="${titleWidth+20}" height="240"><g fill="white">${titleNode('',text)}</g></mask><radialGradient id="pointer-gradient" gradientUnits="userSpaceOnUse" cx="-999" cy="-999" r="260"><stop offset="0" stop-color="white"/><stop offset=".18" stop-color="white"/><stop offset=".6" stop-color="white" stop-opacity=".55"/><stop offset="1" stop-color="white" stop-opacity="0"/></radialGradient><mask id="field-mask" maskUnits="userSpaceOnUse" x="-20" y="-20" width="${titleWidth+40}" height="270"><rect x="-20" y="-20" width="${titleWidth+40}" height="270" fill="url(#pointer-gradient)"/></mask><filter id="edge-glow" x="-10%" y="-30%" width="120%" height="160%" color-interpolation-filters="sRGB"><feGaussianBlur stdDeviation="2.1"/></filter></defs><g fill="url(#type-base)">${titleNode('',text)}</g><g id="type-light" mask="url(#field-mask)" opacity="0"><g fill="none" stroke="#ffb865" stroke-width="2" filter="url(#edge-glow)">${titleNode('',text)}</g><g mask="url(#glyph-mask)"><rect width="${titleWidth}" height="219" fill="#ffbe6c" opacity=".13"/><rect width="${titleWidth}" height="219" fill="url(#type-mesh)"/></g><g fill="none" stroke="#ffe3b4" stroke-width=".85">${titleNode('',text)}</g></g>`;
    field=titleSVG.querySelector('#pointer-gradient');glow=titleSVG.querySelector('#type-light');invalid=true;wake();
  }
  function measure(){
    titleBox=titleSVG.getBoundingClientRect();boxes=cards.map(el=>({el,rect:el.getBoundingClientRect(),fx:el.querySelector('.slide-fx')}));invalid=false;
  }
  function draw(now){
    raf=0;
    if(!enabled||!visible||document.hidden)return;
    const dt=Math.min(40,now-(last||now-16));last=now;
    const follow=reduced.matches?1:1-Math.exp(-dt/70);
    pointer.x+=(pointer.tx-pointer.x)*follow;pointer.y+=(pointer.ty-pointer.y)*follow;
    pointer.presence+=(pointer.target-pointer.presence)*(reduced.matches?1:1-Math.exp(-dt/(pointer.target?85:100)));
    if(invalid)measure();
    const radius=pointer.touch?SETTINGS.touchRadius:SETTINGS.desktopRadius;
    if(titleBox?.width&&field){
      const ratio=titleWidth/titleBox.width;
      field.setAttribute('cx',(pointer.x-titleBox.left)*ratio);field.setAttribute('cy',(pointer.y-titleBox.top)*ratio);field.setAttribute('r',radius*ratio);glow.setAttribute('opacity',pointer.presence.toFixed(3));
    }
    for(const {rect,el,fx} of boxes){
      const localX=(pointer.x-rect.left)*(el.offsetWidth/rect.width),localY=(pointer.y-rect.top)*(el.offsetHeight/rect.height);
      fx.style.setProperty('--fx-x',`${localX}px`);fx.style.setProperty('--fx-y',`${localY}px`);fx.style.setProperty('--fx-r',`${radius*(el.offsetWidth/rect.width)}px`);fx.style.opacity=String(pointer.presence*.8);
    }
    if(Math.abs(pointer.target-pointer.presence)>.003||Math.abs(pointer.tx-pointer.x)+Math.abs(pointer.ty-pointer.y)>.15)raf=requestAnimationFrame(draw);
  }
  function wake(){if(!raf&&enabled&&visible&&!document.hidden)raf=requestAnimationFrame(draw);}
  function leave(){pointer.target=0;wake();}
  window.addEventListener('pointermove',event=>{
    if(!event.isPrimary)return;
    pointer.touch=event.pointerType==='touch';pointer.tx=event.clientX;pointer.ty=event.clientY;pointer.target=1;wake();
  },{passive:true,signal});
  window.addEventListener('pointerdown',event=>{if(!event.isPrimary)return;pointer.touch=event.pointerType==='touch';pointer.x=pointer.tx=event.clientX;pointer.y=pointer.ty=event.clientY;pointer.target=1;wake();},{passive:true,signal});
  window.addEventListener('pointerup',event=>{if(event.pointerType!=='mouse')leave();},{passive:true,signal});
  window.addEventListener('pointercancel',leave,{passive:true,signal});
  document.documentElement.addEventListener('pointerleave',leave,{signal});
  document.querySelector('#frame-slot').addEventListener('pointerenter',leave,{signal});
  window.addEventListener('blur',leave,{signal});
  window.addEventListener('scroll',()=>{invalid=true;wake();},{passive:true,signal});
  window.addEventListener('resize',()=>{invalid=true;wake();},{passive:true,signal});
  document.addEventListener('visibilitychange',()=>{if(document.hidden){cancelAnimationFrame(raf);raf=0;leave();}else{invalid=true;wake();}},{signal});
  const observer=new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;if(visible){invalid=true;wake();}else{cancelAnimationFrame(raf);raf=0;}});observer.observe(stage.closest('.hub'));
  const resize=new ResizeObserver(()=>{syncEdges();invalid=true;wake();});resize.observe(titleSVG);resize.observe(stage);resize.observe(cards[0]);syncEdges();
  function burst(direction=1){
    if(!enabled||reduced.matches||document.hidden)return;
    cancelAnimationFrame(shardRaf);
    const box=stage.getBoundingClientRect(),w=box.width,h=box.height,dpr=Math.min(devicePixelRatio,1.5),c=dust.getContext('2d');
    dust.width=Math.round(w*dpr);dust.height=Math.round(h*dpr);c.setTransform(dpr,0,0,dpr,0,0);
    const rng=random(40),shards=Array.from({length:26},()=>({x:rng(),y:rng(),s:1+rng()*3,a:.15+rng()*.45}));const start=performance.now();
    function frame(now){
      const t=(now-start)/950;c.clearRect(0,0,w,h);
      if(t>=1){shardRaf=0;return;}
      for(const p of shards){
        const travel=(p.x*.65+t*.45),x=direction>0?w*(.15+travel*.7):w*(.85-travel*.7),y=h*(.86-travel*.7)+(p.y-.5)*30;
        const opacity=Math.sin(Math.PI*t)*p.a;c.beginPath();c.moveTo(x,y-p.s);c.lineTo(x+p.s*.8,y+p.s*.5);c.lineTo(x-p.s*.8,y+p.s*.5);c.closePath();c.fillStyle=`rgba(239,170,99,${opacity})`;if(p.x>.65)c.fill();else{c.strokeStyle=c.fillStyle;c.lineWidth=.65;c.stroke();}
      }
      shardRaf=requestAnimationFrame(frame);
    }shardRaf=requestAnimationFrame(frame);
  }
  document.fonts.ready.then(()=>{if(titleText)setTitle(titleText);});
  return {setTitle,burst,invalidate(){invalid=true;wake();},destroy(){controller.abort();observer.disconnect();resize.disconnect();cancelAnimationFrame(raf);cancelAnimationFrame(shardRaf);}};
}
