const PITCH = 12;
const WORD = [0, 1, 0, 1, 2, 3, 4];
const range = (low, high) => low + Math.random() * (high - low);
const clamp = value => Math.max(0, Math.min(1, value));

// Stable station-to-station, including on screens whose margins have different widths.
function hash(col, row) {
  let value = Math.imul(col ^ 0x9e3779b9, 0x85ebca6b) ^ Math.imul(row + 0x632be5ab, 0xc2b2ae35);
  value ^= value >>> 15;
  value = Math.imul(value, 0x2c1b3c6d);
  value ^= value >>> 12;
  value = Math.imul(value, 0x297a2d39);
  return ((value ^ (value >>> 15)) >>> 0) / 4294967296;
}
function marginOpacity(distance, margin) {
  const start = margin * .4, end = Math.max(margin + 20, margin * 1.3);
  const t = clamp((distance - start) / (end - start));
  return 1 - t * t * t * (t * (t * 6 - 15) + 10);
}
function tear(x, y, seed) {
  const col = Math.floor(x), row = Math.floor(y);
  const u = x - col, v = y - row;
  const a = u*u*(3-2*u), b = v*v*(3-2*v);
  const top = hash(col+seed,row)*(1-a) + hash(col+seed+1,row)*a;
  const bottom = hash(col+seed,row+1)*(1-a) + hash(col+seed+1,row+1)*a;
  return top*(1-b) + bottom*b;
}

class Field {
  constructor(canvas, atlas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.atlas = atlas;
    this.time = 0;
    this.wordAt = range(7, 13);
    this.lastWave = -5;
    this.waveEnds = [];
    this.wordLight = document.createElement('canvas');
    this.wordLight.className = 'mm-word-light';
    this.wordLight.hidden = true;
    canvas.parentElement.append(this.wordLight);
    this.active = new Map();
    this.scheduled = new Map();
  }
  resize(width, height, dpr, margin) {
    const introduction = !this.base;
    this.introCells = [];
    this.dpr = dpr;
    this.word = null;
    this.wordLight.hidden = true;
    this.waveEnds.length = 0;
    this.width = width;
    this.height = height;
    this.cols = Math.ceil(width / PITCH);
    this.rows = Math.ceil(height / PITCH);
    this.origin = (width - this.cols * PITCH) / 2;
    const count = this.cols * this.rows;
    this.base = new Int8Array(count).fill(-1);
    this.mask = new Float32Array(this.cols);
    this.marginCells = [];
    this.active.clear();
    this.scheduled.clear();
    this.wordWave=null;
    this.nextBucket = Math.floor(this.time * 30);
    this.wordAt = Math.max(this.time + 2, this.wordAt);
    this.canvas.width = Math.max(1, Math.round(width * dpr));
    this.canvas.height = Math.max(1, Math.round(height * dpr));
    this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    // Reuse a device-sized sprite sheet, so partial repaints never rasterize an SVG path again.
    this.slot = Math.max(1, Math.round(PITCH * dpr));
    this.sprites = document.createElement('canvas');
    this.sprites.width = this.slot * 5;
    this.sprites.height = this.slot * 2;
    this.sprites.getContext('2d').drawImage(this.atlas, 0, 0, this.sprites.width, this.sprites.height);
    for (let col = 0; col < this.cols; col++) {
      const x = this.origin + (col + .5) * PITCH;
      const right = x >= width / 2 ? 1 : 0;
      const fromEdge = right ? this.cols - 1 - col : col;
      const mask = marginOpacity(Math.min(x, width - x), margin);
      this.mask[col] = mask;
      for (let row = 0; row < this.rows; row++) {
        const id = row * this.cols + col;
        if (hash(fromEdge * 2 + right, row) < .25) {
          this.base[id] = WORD[Math.floor(7 * hash(row, fromEdge + 911 * right))];
          if (mask > .003) {
            if (introduction) this.introCells.push({id,start:this.time + .84*hash(row+37,fromEdge*3+right),alpha:0});
            else this.draw(id, this.base[id], .1 * mask);
          }
        }
        if (mask > .12) this.marginCells.push(id);
      }
    }
  }
  draw(id, letter, alpha, hot = false) {
    const x = this.origin + (id % this.cols) * PITCH;
    const y = Math.floor(id / this.cols) * PITCH;
    const ctx = this.ctx;
    ctx.clearRect(x, y, PITCH, PITCH);
    if (letter < 0 || alpha < .003) return;
    ctx.globalAlpha = clamp(alpha);
    ctx.drawImage(this.sprites, letter * this.slot, hot ? this.slot : 0, this.slot, this.slot, x, y, PITCH, PITCH);
    ctx.globalAlpha = 1;
  }
  schedule(id, delay, strength, options) {
    if (id < 0 || id >= this.base.length) return;
    const bucket = Math.max(this.nextBucket, Math.ceil((this.time + delay) * 30));
    if (!this.scheduled.has(bucket)) this.scheduled.set(bucket, []);
    this.scheduled.get(bucket).push({id, strength, options});
  }
  ignite(id, strength, options = {}) {
    const existing = this.active.get(id);
    if (existing?.pinned && this.time < existing.until && options.letter === undefined) return;
    const pinned = options.letter !== undefined;
    this.active.set(id, {
      start:this.time, until:this.time + (options.hold ?? range(.12,.32)),
      strength:Math.max(strength, existing?.level || 0), level:0, shownLetter:-1, shownAlpha:-1,
      letter:options.letter ?? Math.floor(Math.random()*5), pinned, next:this.time + .06,
      floor:options.wave ? .45 : 0, rise:options.wave ? .1 : .045,
      fall:options.wave ? range(.38,.70) : .45, hot:pinned || (options.wave && Math.random()<.06)
    });
  }
  glitch() {
    const start = this.marginCells[Math.floor(Math.random() * this.marginCells.length)];
    if (start === undefined) return;
    const col = start % this.cols, direction = Math.random() < .5 ? -1 : 1;
    const length = 1 + Math.floor(Math.random() ** 2 * 7);
    const strength = range(.45, .95);
    for (let n = 0; n < length; n++) {
      const next = col + n * direction;
      if (next < 0 || next >= this.cols) break;
      this.schedule(start + n * direction, n * range(.05,.09), strength * (1 - n*.06));
    }
  }
  stir(x, y) {
    const angle = range(0, 2*Math.PI), radius = 360 * Math.sqrt(Math.random());
    const col = Math.floor((x + radius*Math.cos(angle) - this.origin)/PITCH);
    const row = Math.floor((y + radius*Math.sin(angle))/PITCH);
    if (col < 0 || col >= this.cols || row < 0 || row >= this.rows || this.mask[col] < .03) return;
    if (Math.random() < 1 - (radius/400)**2) this.ignite(row*this.cols+col, range(.35,.8));
  }
  impulse(x, y) {
    this.waveEnds = this.waveEnds.filter(end => end > this.time);
    if (this.time - this.lastWave < .25 || this.waveEnds.length >= 3) return;
    this.lastWave = this.time;
    const far = Math.hypot(Math.max(x,this.width-x),Math.max(y,this.height-y)) || 1;
    this.waveEnds.push(this.time + far*1.22/1150 + .05);
    const seed = Math.floor(Math.random()*65535);
    for (let id=0; id<this.base.length; id++) {
      if (Math.random() > (this.base[id] < 0 ? .2 : .62)) continue;
      const cx = this.origin + (id % this.cols + .5)*PITCH, cy = (Math.floor(id / this.cols)+.5)*PITCH;
      const distance = Math.hypot(cx-x, cy-y);
      const delay = Math.max(0,distance*(1+.22*(2*tear(cx/260,cy/260,seed)-1))+range(-12,12))/1150;
      this.schedule(id, delay, range(.28,.8)*(1-.55*distance/far), {wave:true,hold:.1});
    }
  }
  decrypt() {
    let band = 0;
    while (band < this.cols/2 && this.mask[band] > .45) band++;
    const vertical = band < 9;
    if (!band || (vertical && this.rows < 8)) return;
    const inset = Math.floor(range(0, Math.max(1,band-(vertical?0:7))));
    const col = Math.random()<.5 ? inset : this.cols-1-inset-(vertical?0:6);
    const row = Math.floor(range(this.rows*.15, Math.max(this.rows*.15,Math.min(this.rows*.85,this.rows-(vertical?7:1)))));
    const first = row*this.cols+col, step = vertical ? this.cols : 1;
    WORD.forEach((letter, n) => {
      this.schedule(first+n*step, n*.035, .78, {hold:.8});
      this.schedule(first+n*step, .85+n*.09, 1, {letter, hold:1.7+(6-n)*.09});
    });
    const pad = 12;
    const width = (vertical ? 1 : 7)*PITCH + 2*pad, height = (vertical ? 7 : 1)*PITCH + 2*pad;
    const light = this.wordLight;
    light.width=Math.ceil(width*this.dpr); light.height=Math.ceil(height*this.dpr);
    light.style.width=width+'px'; light.style.height=height+'px';
    light.style.left=(this.origin+col*PITCH-pad)+'px'; light.style.top=(row*PITCH-pad)+'px';
    this.word={start:this.time,vertical,first,step,pad}; light.hidden=false;
    const centre = first+step*3;
    this.wordWave = {at:this.time+1.4,x:this.origin+(centre%this.cols+.5)*PITCH,y:(Math.floor(centre/this.cols)+.5)*PITCH};
  }
  paintWord() {
    if (!this.word) return;
    const age=this.time-this.word.start;
    if (age>3.1) {this.wordLight.hidden=true;this.word=null;return;}
    const ctx=this.wordLight.getContext('2d');
    ctx.setTransform(this.dpr,0,0,this.dpr,0,0);
    ctx.clearRect(0,0,this.wordLight.width/this.dpr,this.wordLight.height/this.dpr);
    ctx.shadowColor='#ffa23d';ctx.shadowBlur=6*this.dpr;
    const count=Math.max(0,Math.min(7,1+Math.floor((age-.85)/.09)));
    for (let i=0;i<count;i++) {
      const {vertical,first,step,pad}=this.word;
      ctx.globalAlpha=(.55+.25*Math.sin(age*6))*this.mask[(first+i*step)%this.cols];
      ctx.drawImage(this.sprites,WORD[i]*this.slot,this.slot,this.slot,this.slot,pad+(vertical?0:i*PITCH),pad+(vertical?i*PITCH:0),PITCH,PITCH);
    }
  }
  step(dt) {
    this.time += dt;
    if (this.introCells.length) this.introCells=this.introCells.filter(cell=>{
      const t=clamp((this.time-cell.start)/.36), alpha=.1*this.mask[cell.id%this.cols]*t*t*(3-2*t);
      if ((alpha>cell.alpha+.006 || t===1) && !this.active.has(cell.id)) {
        this.draw(cell.id,this.base[cell.id],alpha);cell.alpha=alpha;
      }
      return t<1;
    });
    this.paintWord();
    for (let n = this.marginCells.length*.005*dt; n > 0; n--) if (Math.random()<n) this.glitch();
    if (this.time >= this.wordAt) {this.decrypt(); this.wordAt = this.time + range(16,30) + 3;}
    if (this.wordWave && this.time >= this.wordWave.at) {this.impulse(this.wordWave.x,this.wordWave.y); this.wordWave=null;}
    for (;this.nextBucket<=Math.floor(this.time*30);this.nextBucket++) {
      const events=this.scheduled.get(this.nextBucket);
      if (!events) continue;
      for (const event of events) this.ignite(event.id,event.strength,event.options);
      this.scheduled.delete(this.nextBucket);
    }
    for (const [id, cell] of this.active) {
      const mask=this.mask[id % this.cols];
      const base=this.base[id], idle=base<0?0:mask*.1;
      const age=this.time-cell.start;
      const level=cell.strength*clamp(age/cell.rise)*Math.exp(-Math.max(0,this.time-cell.until)/cell.fall);
      if (this.time >= cell.until && level<.012) {
        this.draw(id,base,idle); this.active.delete(id); continue;
      }
      if (!cell.pinned && this.time<cell.until && this.time>=cell.next) {
        cell.letter=Math.floor(Math.random()*5); cell.next=this.time+range(.05,.1);
      }
      cell.level=level;
      const alpha=Math.max(idle,level*Math.max(mask,cell.floor));
      if (cell.letter!==cell.shownLetter || Math.abs(alpha-cell.shownAlpha) >= (alpha > cell.shownAlpha ? .004 : .012)) {
        this.draw(id,cell.letter,alpha,cell.hot);cell.shownLetter=cell.letter;cell.shownAlpha=alpha;
      }
    }
  }
}

export function mountGlyphField(layer) {
  const motion=matchMedia('(prefers-reduced-motion: reduce)'), forced=matchMedia('(forced-colors: active)');
  const coarse=matchMedia('(pointer:coarse)'), saveData=navigator.connection?.saveData;
  const atlas=new Image();
  let field=null, timer=0, frame=0, scrollTimer=0, resizing=0, previous=0, sizeKey='';
  let tap=null, pointer=null, travelled=0;
  const still=()=>motion.matches || forced.matches || saveData;
  const blocked=()=>still() || document.hidden || scrollTimer || document.documentElement.hasAttribute('data-mm-modal');
  function stop() { clearTimeout(timer); cancelAnimationFrame(frame); timer=frame=previous=0; }
  function rest() {stop();layer.removeAttribute('data-live');}
  function tick(now) {
    frame=0;
    if (still()) {rest();return;}
    if (blocked() || !field) return;
    field.step(previous?Math.min(.1,(now-previous)/1000):0); previous=now;
    timer=setTimeout(()=>{timer=0; frame=requestAnimationFrame(tick);},1000/(coarse.matches?18:30)-8);
  }
  function start() { if (field && !blocked() && !frame && !timer) frame=requestAnimationFrame(tick); }
  function resize() {
    resizing=0;
    if (still()) {rest();return;}
    if (!atlas.complete || !atlas.naturalWidth) return;
    const width=document.documentElement.clientWidth,height=innerHeight;
    const dpr=Math.min(devicePixelRatio||1,coarse.matches||width*height>4e6?1.5:2);
    const key=[width,height,dpr].join('/');
    if (!field) field=new Field(layer.querySelector('canvas'),atlas);
    if (!field.ctx) return;
    if (sizeKey!==key || !layer.hasAttribute('data-live')) {
      const pad=width<768?.10:width>=1600&&width/height>=2.1?.30:width<1280?.15:.20;
      field.resize(width,height,dpr,width*pad); sizeKey=key; layer.setAttribute('data-live','');
    }
    start();
  }
  function requestResize() {if (!resizing) resizing=requestAnimationFrame(resize);}
  function sync() {if (still()) rest();else if (blocked()) stop();else start();}
  function changePolicy() {if (still()) rest();else resize();}
  atlas.onload=resize;
  atlas.src='/navigation/glyph-atlas.svg';
  for (const query of [motion,forced,coarse]) {
    if (query.addEventListener) query.addEventListener('change',changePolicy);
    else query.addListener(changePolicy);
  }
  window.addEventListener('resize',requestResize,{passive:true});
  window.visualViewport?.addEventListener('resize',requestResize,{passive:true});
  document.addEventListener('visibilitychange',sync);
  document.addEventListener('memento:modal-visibility',sync);
  window.addEventListener('pagehide',stop);
  window.addEventListener('pageshow',requestResize);
  document.addEventListener('scroll',()=>{
    if (!field || still()) return;
    stop(); clearTimeout(scrollTimer); scrollTimer=setTimeout(()=>{scrollTimer=0;start();},180);
  },{capture:true,passive:true});
  document.addEventListener('pointermove',event=>{
    if (!field || blocked() || event.pointerType==='touch') return;
    if (!layer.hasAttribute('data-live')) resize();
    const distance=pointer?Math.hypot(event.clientX-pointer.x,event.clientY-pointer.y):0;
    pointer={x:event.clientX,y:event.clientY};
    if (distance<200) travelled+=distance;
    while (travelled>26) {travelled-=26;field.stir(pointer.x,pointer.y);}
  },{passive:true});
  document.addEventListener('pointerdown',event=>{
    tap=null;
    if (!field || blocked() || event.button!==0 || !event.isPrimary || event.target.closest('a,button,input,textarea,select,iframe,canvas,summary,dialog')) return;
    if (event.pointerType==='mouse') field.impulse(event.clientX,event.clientY);
    else tap={id:event.pointerId,x:event.clientX,y:event.clientY,at:performance.now()};
  },{passive:true,capture:true});
  document.addEventListener('pointerup',event=>{
    if (tap?.id===event.pointerId && !blocked() && performance.now()-tap.at<450 && Math.hypot(event.clientX-tap.x,event.clientY-tap.y)<12) field.impulse(tap.x,tap.y);
    tap=null;
  },{passive:true,capture:true});
  document.addEventListener('pointercancel',()=>{tap=null;},{passive:true});
}
