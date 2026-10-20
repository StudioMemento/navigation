export function transitionPulse(position){
 const phase=position-Math.floor(position);
 return Math.sin(Math.PI*phase)**2;
}

// Monotonic yaw: entering and leaving focus turn in the same direction.
export function focusYaw(offset){return .26*Math.tanh(offset*1.5);}
export function focusLife(offset){
 const t=Math.max(0,Math.min(1,(Math.abs(offset)-.12)/.88));
 return 1-t*t*(3-2*t);
}

export class TransitionMotion {
 constructor(){this.previous=0;this.direction=1;this.phase=0;this.strength=0;}
 update(position,dt=1/60){
  const delta=position-this.previous;
  if(Math.abs(delta)>.00001)this.direction+=(Math.sign(delta)-this.direction)*(1-Math.exp(-Math.min(dt,.05)*12));
  this.phase=position-Math.floor(position);this.strength=transitionPulse(position);this.previous=position;
  return this;
 }
}
