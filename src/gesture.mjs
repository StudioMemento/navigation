// Mouse, touch and pen share one recognizer. A vertical scroll never selects a slide.
export const isHorizontalSwipe=(dx,dy)=>Math.abs(dx)>10&&Math.abs(dx)>Math.abs(dy)*1.25;
export function swipeStep(dx,dy,elapsed,width){
  if(!isHorizontalSwipe(dx,dy))return 0;
  const travel=Math.abs(dx),threshold=Math.min(55,width*.12);
  const flick=travel>=24&&travel/Math.max(1,elapsed)>=.45;
  return travel>=threshold||flick?(dx<0?1:-1):0;
}
