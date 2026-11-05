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
export function createEffects({titleSVG,titleBase,titleAccessible,cards,stage}){
  const controller=new AbortController(),{signal}=controller;
  const pointer={x:-1000,y:-1000,tx:-1000,ty:-1000,presence:0,target:0,touch:false};
  let raf=0,last=0,titleText='',titleSignature='',boxes=[],titleBox=null,invalid=true,visible=true;
  const enabled=new URLSearchParams(location.search).get('fx')!=='off';
  const ctx=document.createElement('canvas').getContext('2d');
  function syncEdges(){
    for(const card of cards){
      const w=card.offsetWidth,h=card.offsetHeight,cut=parseFloat(getComputedStyle(card).getPropertyValue('--cut'))||20,inset=10;
      const outer=`M${cut} .5H${w-.5}V${h-cut}L${w-cut} ${h-.5}H.5V${cut}Z`;
      const inner=`M${cut+4} ${inset}H${w-inset}V${h-cut-4}L${w-cut-4} ${h-inset}H${inset}V${cut+4}Z`;
      for(const svg of card.querySelectorAll('.slide-border,.slide-fx'))svg.setAttribute('viewBox',`0 0 ${w} ${h}`);
      card.querySelector('.slide-border path').setAttribute('d',outer);
      const paths=card.querySelectorAll('.slide-fx mask path');paths[0].setAttribute('d',outer);paths[1].setAttribute('d',inner);
      card.querySelector('.slide-fx g>path').setAttribute('d',outer);
      const rect=card.querySelector('.slide-fx g>rect');rect.setAttribute('width',w);rect.setAttribute('height',h);
    }
  }
  function fitTitle(){
    if(!titleText)return;
    const width=titleBase.clientWidth;if(!width)return;
    ctx.font='350 200px Inter';ctx.fontKerning='normal';
    const nominal=ctx.measureText(titleText).width;
    const size=Number((200*width/Math.max(1000,nominal+titleText.length*5)).toFixed(3));
    ctx.font=`350 ${size}px Inter`;const metrics=ctx.measureText(titleText);
    const tracking=Math.max(0,(width-metrics.width)/Math.max(1,titleText.length-1));
    const signature=`${titleText}:${width}:${size}:${tracking.toFixed(3)}`;
    if(signature===titleSignature)return;
    titleSignature=signature;
    titleBase.style.setProperty('--title-size',`${size}px`);
    titleBase.style.setProperty('--title-tracking',`${tracking.toFixed(3)}px`);
    const height=titleBase.getBoundingClientRect().height;
    const ascent=metrics.fontBoundingBoxAscent??size*.97,descent=metrics.fontBoundingBoxDescent??size*.24;
    const baseline=(height-ascent-descent)/2+ascent;
    titleSVG.setAttribute('viewBox',`0 0 ${width} ${height}`);
    // The real HTML text above is retained; this subtree is only rebuilt on a new label/size.
    titleSVG.innerHTML=`<defs>${meshMarkup('type-mesh',18)}<text id="type-glyph" x="0" y="${baseline}" style="font-size:${size}px;letter-spacing:${tracking.toFixed(3)}px">${titleText}</text><mask id="glyph-mask" maskUnits="userSpaceOnUse" x="-5" y="-5" width="${width+10}" height="${height+10}"><use href="#type-glyph" fill="white"/></mask><filter id="edge-glow" x="-10%" y="-30%" width="120%" height="160%" color-interpolation-filters="sRGB"><feGaussianBlur stdDeviation="1.3"/></filter></defs><use href="#type-glyph" fill="none" stroke="#ffb865" stroke-width="1.4" filter="url(#edge-glow)"/><g mask="url(#glyph-mask)"><rect width="${width}" height="${height}" fill="#ffbe6c" opacity=".10"/><rect width="${width}" height="${height}" fill="url(#type-mesh)"/></g><use href="#type-glyph" fill="none" stroke="#ffe3b4" stroke-width=".65"/>`;
    invalid=true;wake();
  }
  function setTitle(text){
    if(text===titleText)return;
    titleText=text;titleAccessible.textContent=text;titleBase.textContent=text;
    fitTitle();
  }
  function measure(){
    titleBox=titleSVG.getBoundingClientRect();
    boxes=cards.map(el=>({el,rect:el.getBoundingClientRect(),fx:el.querySelector('.slide-fx')}));invalid=false;
  }
  function draw(now){
    raf=0;if(!enabled||!visible||document.hidden)return;
    const dt=Math.min(40,now-(last||now-16));last=now;
    const follow=reduced.matches?1:1-Math.exp(-dt/70);
    pointer.x+=(pointer.tx-pointer.x)*follow;pointer.y+=(pointer.ty-pointer.y)*follow;
    pointer.presence+=(pointer.target-pointer.presence)*(reduced.matches?1:1-Math.exp(-dt/(pointer.target?85:100)));
    if(invalid)measure();
    const radius=pointer.touch?SETTINGS.touchRadius:SETTINGS.desktopRadius;
    if(titleBox?.width){
      titleSVG.style.setProperty('--fx-x',`${pointer.x-titleBox.left}px`);titleSVG.style.setProperty('--fx-y',`${pointer.y-titleBox.top}px`);titleSVG.style.setProperty('--fx-r',`${radius}px`);titleSVG.style.opacity=pointer.presence.toFixed(3);
    }
    for(const {rect,el,fx} of boxes){
      if(!rect.width||!rect.height)continue;
      const ratio=el.offsetWidth/rect.width;
      fx.style.setProperty('--fx-x',`${(pointer.x-rect.left)*ratio}px`);fx.style.setProperty('--fx-y',`${(pointer.y-rect.top)*(el.offsetHeight/rect.height)}px`);fx.style.setProperty('--fx-r',`${radius*ratio}px`);fx.style.opacity=String(pointer.presence*.75);
    }
    if(Math.abs(pointer.target-pointer.presence)>.003||Math.abs(pointer.tx-pointer.x)+Math.abs(pointer.ty-pointer.y)>.15)raf=requestAnimationFrame(draw);
  }
  function wake(){if(!raf&&enabled&&visible&&!document.hidden)raf=requestAnimationFrame(draw);}
  function leave(){pointer.target=0;wake();}
  window.addEventListener('pointermove',event=>{if(!event.isPrimary)return;pointer.touch=event.pointerType==='touch';pointer.tx=event.clientX;pointer.ty=event.clientY;pointer.target=1;wake();},{passive:true,signal});
  window.addEventListener('pointerdown',event=>{if(!event.isPrimary)return;pointer.touch=event.pointerType==='touch';pointer.x=pointer.tx=event.clientX;pointer.y=pointer.ty=event.clientY;pointer.target=1;wake();},{passive:true,signal});
  window.addEventListener('pointerup',event=>{if(event.pointerType!=='mouse')leave();},{passive:true,signal});
  window.addEventListener('pointercancel',leave,{passive:true,signal});
  document.documentElement.addEventListener('pointerleave',leave,{signal});
  window.addEventListener('blur',leave,{signal});
  window.addEventListener('scroll',()=>{invalid=true;wake();},{passive:true,signal});
  window.addEventListener('resize',()=>{invalid=true;wake();},{passive:true,signal});
  document.addEventListener('visibilitychange',()=>{if(document.hidden){cancelAnimationFrame(raf);raf=0;leave();}else{invalid=true;wake();}},{signal});
  const observer=new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;if(visible){invalid=true;wake();}else{cancelAnimationFrame(raf);raf=0;}});observer.observe(stage.closest('.hub'));
  const resize=new ResizeObserver(()=>{syncEdges();fitTitle();invalid=true;wake();});
  resize.observe(titleBase.parentElement);resize.observe(stage);resize.observe(cards[0]);syncEdges();
  document.fonts.ready.then(fitTitle);
  return {setTitle,invalidate(){invalid=true;wake();},destroy(){controller.abort();observer.disconnect();resize.disconnect();cancelAnimationFrame(raf);}};
}
