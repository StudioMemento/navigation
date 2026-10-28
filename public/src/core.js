export const clamp = (value, low=0, high=1) => Math.min(high, Math.max(low, value));
export const smooth = value => { const t=clamp(value); return t*t*t*(10+t*(-15+6*t)); };
export const remap = (value, start, end) => clamp((value-start)/(end-start));

export class RipplePool {
  constructor(capacity=8) {
    this.capacity=capacity; this.data=new Float32Array(8*4); this.cursor=0;
    this.lastTime=-100; this.lastX=Infinity; this.lastZ=Infinity; this.total=0;
    for(let i=0;i<8;i++) this.data[i*4+2]=-100;
  }
  inject(x,z,time,{force=false,amplitude=.019}={}) {
    if(!Number.isFinite(x+z+time)) return false;
    if(!force && (time-this.lastTime<1/12 || Math.hypot(x-this.lastX,z-this.lastZ)<.08)) return false;
    const i=(this.cursor++%this.capacity)*4;
    this.data[i]=x;this.data[i+1]=z;this.data[i+2]=time;this.data[i+3]=amplitude;
    this.lastTime=time;this.lastX=x;this.lastZ=z;this.total++;
    return true;
  }
  active(time) { let count=0; for(let i=0;i<this.capacity;i++) if(time-this.data[i*4+2]>=0 && time-this.data[i*4+2]<2.4) count++; return count; }
}

export function validEnvelope(event, origin, source, sessionId, allowed) {
  const d=event.data;
  return event.origin===origin && event.source===source && d && typeof d==='object' &&
    d.channel==='memento:tide' && d.version===1 && d.sessionId===sessionId &&
    d.stageId==='s01_services' && allowed.includes(d.type) && d.payload && typeof d.payload==='object';
}

export function journeyPhase(scroll, entry, contentHeight, exit) {
  if(scroll<=0) return {state:'FOCUSED',entry:0,exit:0};
  if(scroll<entry) return {state:'ENTERING',entry:clamp(scroll/entry),exit:0};
  const exitStart=entry+contentHeight;
  if(scroll<exitStart) return {state:'CONTENT',entry:1,exit:0};
  return {state:'EXITING',entry:1,exit:clamp((scroll-exitStart)/exit)};
}
