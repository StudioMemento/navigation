// Conservative starting budgets; pixel count, never geometry fidelity, adapts at runtime.
export function renderProfile({coarse=false,width=1440,cores=8,memory=8,saveData=false,hover=true}={}){
 const mobile=coarse||width<700,limited=cores<=4||memory<=4||saveData;
 return {mobile,light:mobile||limited,hover:hover&&!mobile,
  dprCap:mobile?(limited?1:1.2):(limited?1.2:1.5),
  pixelBudget:mobile?(limited?420000:650000):(limited?1100000:1900000)};
}

export function pixelRatio(profile,width,height,dpr,level=0){
 const scale=[1,.86,.72,.60][level];
 return Math.min(dpr||1,profile.dprCap,Math.sqrt(profile.pixelBudget/(width*height)))*scale;
}

// A 60 Hz ceiling avoids doubling the GPU workload on 120 Hz phones.
export class FramePacer {
 constructor(){this.next=0;}
 reset(){this.next=0;}
 accept(now){
  const period=1000/60;
  if(!this.next){this.next=now+period;return true;}
  if(now+.5<this.next)return false;
  const late=Math.max(0,now-this.next);
  this.next=now+period-late%period;
  return true;
 }
}

export class AdaptiveQuality {
 constructor(){this.level=0;this.cooldown=0;this.stable=0;this.resetWindow();this.meanMs=1000/60;}
 resetWindow(){this.count=0;this.sum=0;this.late=0;this.severe=0;}
 observe(ms){
  if(!Number.isFinite(ms)||ms<=0||ms>250)return false;
  if(this.cooldown>0){this.cooldown--;return false;}
  this.count++;this.sum+=ms;if(ms>25)this.late++;if(ms>34)this.severe++;
  if(this.count<45&&this.severe<10)return false;
  this.meanMs=this.sum/this.count;
  const slow=this.meanMs>21||this.late/this.count>.22;
  const stable=this.meanMs<17.8&&this.late===0;
  this.stable=stable?this.stable+this.count:0;
  let changed=false;
  if(slow&&this.level<3){this.level++;this.cooldown=45;this.stable=0;changed=true;}
  // Restore only after sustained headroom, avoiding resize oscillation.
  else if(this.stable>=600&&this.level>0){this.level--;this.cooldown=180;this.stable=0;changed=true;}
  this.resetWindow();return changed;
 }
}
