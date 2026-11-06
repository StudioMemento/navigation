export const clamp=(n,a,b)=>Math.max(a,Math.min(b,n));
export function verticalIntent(dx,dy){return Math.abs(dy)>8&&Math.abs(dy)>Math.abs(dx)*1.15;}
export function dragDestination(startIndex,dy,elapsed,height){
 const travel=Math.abs(dy),velocity=travel/Math.max(elapsed,1);
 if(travel<18)return startIndex;
 if(travel>height*.1||velocity>.4)return startIndex+(dy<0?1:-1);
 return startIndex;
}
export function slotAt(top,height,count=5){return clamp(Math.round(top/Math.max(height,1)),0,count*3-1);}
export function centerSlot(slot,count=5){return count+((slot%count)+count)%count;}
export function nearestSlot(index,current,count=5){
 const targets=[index,index+count,index+2*count];
 return targets.reduce((best,n)=>Math.abs(n-current)<Math.abs(best-current)?n:best,targets[0]);
}
export function isModified(event){return Boolean(event.button!==0||event.metaKey||event.ctrlKey||event.shiftKey||event.altKey);}
export function shouldSuppressClick(now,until,dragging,leaving){return now<until||Boolean(dragging)||leaving;}
