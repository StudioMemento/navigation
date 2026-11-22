// The three contours come exclusively from V_E_C in DEV_20_Icon.svg.
// A transient triangle field carries pixels from the real page into the transparent mark.
export function createMaterial() {
  const layer=document.createElement('div'),screen=document.createElement('canvas'),plate=document.createElement('canvas');
  layer.className='mm-weave';layer.setAttribute('aria-hidden','true');
  // The handoff has no WebGL context. A bounded software surface avoids a GPU texture/readback
  // on every frame, including on devices that are already rendering the studio or its background.
  const ctx=screen.getContext('2d',{alpha:true,willReadFrequently:true}),base=plate.getContext('2d',{alpha:false,willReadFrequently:true});
  const image=new Image();
  const outline = [
    [[49.61,49.60],[106.30,106.30],[95.67,116.93],[63.78,85.04],[63.78,148.82],[49.61,162.99]],
    [[49.61,170.08],[49.61,191.34],[170.08,70.87],[170.08,49.61]],
    [[170.08,191.34],[113.39,134.64],[124.02,124.01],[155.91,155.91],[155.91,92.12],[170.08,77.95]]
  ];
  const contour = outline.map(points => 'M' + points.join('L') + 'Z').join('');
  const colors = ['#9f4b24','#ce6830','#ed9050','#f4ac68','#ffd398','#ffe6b5'];
  layer.innerHTML=`<i class="mm-glow"></i><svg class="mm-seal" viewBox="44 44 131.69 152.94" aria-hidden="true" focusable="false"><defs><linearGradient id="mm-metal" x2=".7" y2="1"><stop stop-color="#ffe8b5"/><stop offset=".43" stop-color="#f8ad65"/><stop offset=".78" stop-color="#dd6933"/><stop offset="1" stop-color="#eaa05d"/></linearGradient></defs><path d="${contour}" fill="none" stroke="url(#mm-metal)" stroke-width=".92"/></svg>`;
  layer.prepend(screen);
  const seal=layer.querySelector('.mm-seal'),glow=layer.querySelector('.mm-glow');
  const clamp = n => Math.max(0, Math.min(1, n));
  const ease = n => { n = clamp(n); return n*n*(3-2*n); };
  const fract = x => x-Math.floor(x);
  const noise = n => fract(Math.sin(n*127.1+311.7)*43758.5453);
  const midpoint = (a,b) => [(a[0]+b[0])/2,(a[1]+b[1])/2];
  const markCells = [];
  function split(a,b,c) {
    const length = (p,q) => (p[0]-q[0])**2+(p[1]-q[1])**2;
    const ab=length(a,b), bc=length(b,c), ca=length(c,a);
    if(Math.max(ab,bc,ca)<24**2){markCells.push([a,b,c]);return;}
    if(bc>ab && bc>=ca){[a,b,c]=[b,c,a];}
    else if(ca>ab){[a,b,c]=[c,a,b];}
    const m=midpoint(a,b);split(a,m,c);split(m,b,c);
  }
  outline.forEach((face,i)=>{
    const pieces=i===1 ? [[0,1,2],[0,2,3]] : [[0,1,2],[0,2,3],[0,3,5],[3,4,5]];
    pieces.forEach(t=>split(...t.map(index=>face[index])));
  });
  let w=0,h=0,unit=1,boxes=[],tiles=[],shards=[],lastP=0;
  function paintPlate(){
    if(!base || !plate.width || !plate.height)return;
    const pw=plate.width,ph=plate.height;
    base.fillStyle='#0a0603';base.fillRect(0,0,pw,ph);
    if(image.complete && image.naturalWidth){
      const cover=Math.max(pw/image.naturalWidth,ph/image.naturalHeight);
      const iw=image.naturalWidth*cover,ih=image.naturalHeight*cover;
      base.globalAlpha=.21;base.drawImage(image,(pw-iw)/2,(ph-ih)/2,iw,ih);base.globalAlpha=1;
    }
  }
  image.onload=()=>{paintPlate();if(lastP>0)draw(lastP);};
  function layout() {
    w=document.documentElement.clientWidth || innerWidth;
    h=Math.round(window.visualViewport?.height || innerHeight);
    // The moving facets can be softly sampled; their final contour stays a sharp vector.
    const ratio=Math.min(window.devicePixelRatio||1,1.1,Math.sqrt(320000/(w*h)));
    screen.width=Math.max(1,Math.round(w*ratio));screen.height=Math.max(1,Math.round(h*ratio));
    const ps=Math.min(1,560/Math.max(w,h));plate.width=Math.max(1,Math.round(w*ps));plate.height=Math.max(1,Math.round(h*ps));
    ctx?.setTransform(screen.width/w,0,0,screen.height/h,0,0);
    const src=getComputedStyle(document.documentElement).getPropertyValue('--mm-fibres').trim().match(/^url\(["']?(.*?)["']?\)$/);
    if(src && image.getAttribute('src')!==src[1])image.src=src[1];
    paintPlate();
    unit=Math.max(.82,Math.min(1.40,Math.min(w,h)*.00177));
    seal.style.width=(131.69*unit)+'px';seal.style.height=(152.94*unit)+'px';
    glow.style.width=(380*unit)+'px';glow.style.height=(368*unit)+'px';
    const cols=Math.min(17,Math.max(7,Math.round(w/76))), rows=Math.min(14,Math.max(6,Math.round(h/78)));
    const grid=Array.from({length:rows+1},(_,y)=>Array.from({length:cols+1},(_,x)=>{
      const n=y*99+x;
      return [(x+((x===0||x===cols)?0:(noise(n)-.5)*.64))*w/cols,(y+((y===0||y===rows)?0:(noise(n+237)-.5)*.64))*h/rows];
    }));
    tiles=[];
    function tile(points){
      const x=points.reduce((s,p)=>s+p[0],0)/3,y=points.reduce((s,p)=>s+p[1],0)/3;
      const d=Math.min(1,Math.hypot((x/w-.5)*1.6,(y/h-.5)*1.6));
      const delay=.40*(1-d)+.17*noise(tiles.length+31)+.07*(1-y/h);
      tiles.push({points,x,y,delay});
    }
    for(let y=0;y<rows;y++)for(let x=0;x<cols;x++){
      const a=grid[y][x],b=grid[y][x+1],c=grid[y+1][x],d=grid[y+1][x+1];
      if(noise(y*cols+x)>.5){tile([a,b,c]);tile([b,d,c]);}else{tile([a,b,d]);tile([a,d,c]);}
    }
    placeShards();
  }
  function placeShards(){
    const at = p => [w/2+(p[0]-109.845)*unit,h/2+(p[1]-120.47)*unit];
    const source=boxes.length?boxes:[[.06,.18,.88,.68]];
    shards=markCells.map((cell,i)=>{
      const rect=source[Math.floor(noise(i+480)*source.length)],u=.05+noise(i+2)*.90,v=.10+noise(i+22)*.80;
      const origin=[(rect[0]+rect[2]*u)*w,(rect[1]+rect[3]*v)*h];
      const target=cell.map(at),center=target.reduce((s,p)=>[s[0]+p[0]/3,s[1]+p[1]/3],[0,0]);
      const delay=.06+.27*noise(i+110);
      return {origin,target,center,delay,bend:(noise(i+86)-.5)*Math.min(w,h)*.19,rotation:(noise(i+64)-.5)*2.6,
        color:Math.min(colors.length-1,Math.max(0,Math.floor(1.25+(1-(center[1]-h/2)/(142*unit))*1.1+noise(i+51)*2.1-.85)))};
    });
  }
  function sources(value){boxes=value;if(w)placeShards();else layout();}
  function draw(p) {
    lastP=p;
    if(!w)layout();
    layer.style.opacity=p<=0?'0':'1';if(p<=0)return;
    glow.style.opacity=String(ease((p-.27)/.65));seal.style.opacity=String(ease((p-.79)/.18));
    if(!ctx){layer.style.backgroundColor='rgba(12,7,3,'+p+')';return;}
    ctx.clearRect(0,0,w,h);ctx.drawImage(plate,0,0,w,h);
    const holes=new Path2D(),rim=new Path2D();
    for(const t of tiles){
      // A correlated threshold shrinks the visible cells, like the site's loading shader.
      const k=ease((p-t.delay)/.36),scale=1-k;
      if(k>=1)continue;
      const edge=k>.13&&k<.75;
      for(let j=0;j<3;j++){
        const point=t.points[j],x=t.x+(point[0]-t.x)*scale,y=t.y+(point[1]-t.y)*scale;
        if(j){holes.lineTo(x,y);if(edge)rim.lineTo(x,y);}
        else{holes.moveTo(x,y);if(edge)rim.moveTo(x,y);}
      }
      holes.closePath();if(edge)rim.closePath();
    }
    ctx.globalCompositeOperation='destination-out';ctx.fillStyle='#000';ctx.fill(holes);
    ctx.globalCompositeOperation='source-over';ctx.lineWidth=.68;ctx.strokeStyle='rgba(248,168,91,.56)';ctx.stroke(rim);
    const paths=colors.map(()=>new Path2D());
    for(const s of shards){
      const u=ease((p-s.delay)/(.96-s.delay));if(u<=0)continue;
      const wave=4*u*(1-u),dx=s.center[0]-s.origin[0],dy=s.center[1]-s.origin[1],len=Math.hypot(dx,dy)||1;
      const x=s.origin[0]+dx*u-dy/len*s.bend*wave, y=s.origin[1]+dy*u+dx/len*s.bend*wave;
      const size=ease(u*4)*(.38+.62*u),ang=s.rotation*(1-u),cos=Math.cos(ang)*size,sin=Math.sin(ang)*size,path=paths[s.color];
      for(let j=0;j<3;j++){
        const a=s.target[j][0]-s.center[0],b=s.target[j][1]-s.center[1],px=x+a*cos-b*sin,py=y+a*sin+b*cos;
        if(j)path.lineTo(px,py);else path.moveTo(px,py);
      }
      path.closePath();
    }
    ctx.lineWidth=.52*unit;ctx.strokeStyle='rgba(112,53,24,.70)';
    paths.forEach((path,i)=>{ctx.fillStyle=colors[i];ctx.fill(path);ctx.stroke(path);});
  }
  function resize(){layout();draw(lastP);}
  document.body.append(layer);window.addEventListener('resize',resize,{passive:true});
  return {sources,draw,remove(){window.removeEventListener('resize',resize);image.onload=null;layer.remove();screen.width=plate.width=1;}};
}
