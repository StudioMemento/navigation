// Orthographic textured rasterizer. Used only on devices where a WebGL context
// cannot be created. All geometry and light maps come from the production GLB.
@inline function channel(p: u32, shift: i32): f32 { return f32((p >> shift) & 255); }
@inline function byte(v: f32): u32 { return u32(Mathf.min(255,Mathf.max(0,v))+.5); }
@inline function blend(a:f32,b:f32,t:f32):f32 {return a+(b-a)*t;}
@inline function component(a:u32,b:u32,c:u32,d:u32,s:i32,fx:f32,fy:f32):f32 {
  return blend(blend(channel(a,s),channel(b,s),fx),blend(channel(c,s),channel(d,s),fx),fy);
}
export function clearFrame(color:usize,depth:usize,count:i32):void {
  memory.fill(color,0,count<<2);
  for(let i=0;i<count;i++)store<f32>(depth+(i<<2),-1e9);
}
export function project(positions:usize,projected:usize,count:i32,camera:usize):void {
  const rx=load<f32>(camera),ry=load<f32>(camera+4),rz=load<f32>(camera+8);
  const ux=load<f32>(camera+12),uy=load<f32>(camera+16),uz=load<f32>(camera+20);
  const fx=load<f32>(camera+24),fy=load<f32>(camera+28),fz=load<f32>(camera+32);
  const scale=load<f32>(camera+36),cx=load<f32>(camera+40),cy=load<f32>(camera+44);
  for(let i=0;i<count;i++){
    const source=positions+(i<<4),dest=projected+(i<<4);
    const x=load<f32>(source),y=load<f32>(source+4),z=load<f32>(source+8);
    store<f32>(dest,cx+(rx*x+ry*y+rz*z)*scale);
    store<f32>(dest+4,cy-(ux*x+uy*y+uz*z)*scale);
    store<f32>(dest+8,fx*x+fy*y+fz*z);
    store<f32>(dest+12,load<f32>(source+12));
  }
}
export function drawBatch(color:usize,depth:usize,width:i32,height:i32,projected:usize,uv:usize,
  indices:usize,indexCount:i32,levels:usize,levelCount:i32,sweep:f32):void {
  const texWidth=f32(load<i32>(levels+4)), texHeight=f32(load<i32>(levels+8));
  const complete=sweep>5;
  for(let t=0;t<indexCount;t+=3){
    const tri=indices+(t<<2);
    const i0=load<u32>(tri),i1=load<u32>(tri+4),i2=load<u32>(tri+8);
    const a=projected+(i0<<4), b=projected+(i1<<4), c=projected+(i2<<4);
    const ax=load<f32>(a),ay=load<f32>(a+4), bx=load<f32>(b),by=load<f32>(b+4), cx=load<f32>(c),cy=load<f32>(c+4);
    const h0=load<f32>(a+12),h1=load<f32>(b+12),h2=load<f32>(c+12);
    if(!complete&&h0>sweep&&h1>sweep&&h2>sweep)continue;
    const x1=bx-ax,y1=by-ay,x2=cx-ax,y2=cy-ay;
    const area=x1*y2-x2*y1;
    if(Mathf.abs(area)<.028)continue;
    const left=max(0,i32(Mathf.ceil(Mathf.min(ax,Mathf.min(bx,cx))-.5)));
    const right=min(width-1,i32(Mathf.floor(Mathf.max(ax,Mathf.max(bx,cx))-.5)));
    const top=max(0,i32(Mathf.ceil(Mathf.min(ay,Mathf.min(by,cy))-.5)));
    const bottom=min(height-1,i32(Mathf.floor(Mathf.max(ay,Mathf.max(by,cy))-.5)));
    if(left>right||top>bottom)continue;
    const inv=<f32>1/area, w1x=y2*inv,w1y=-x2*inv,w2x=-y1*inv,w2y=x1*inv;
    const ua=uv+(i0<<3),ub=uv+(i1<<3),uc=uv+(i2<<3);
    const u0=load<f32>(ua),v0=load<f32>(ua+4),du1=load<f32>(ub)-u0,du2=load<f32>(uc)-u0,dv1=load<f32>(ub+4)-v0,dv2=load<f32>(uc+4)-v0;
    const z0=load<f32>(a+8), dz1=load<f32>(b+8)-z0, dz2=load<f32>(c+8)-z0;
    const footprint=Mathf.max(Mathf.max(Mathf.abs(du1*w1x+du2*w2x),Mathf.abs(du1*w1y+du2*w2y))*texWidth,
      Mathf.max(Mathf.abs(dv1*w1x+dv2*w2x),Mathf.abs(dv1*w1y+dv2*w2y))*texHeight);
    // Select a mip from the exponent; derivatives are constant in an ortho projection.
    const lod=min(levelCount-1,max(0,i32((reinterpret<u32>(footprint) >> 23) & 255)-127));
    const level=levels+lod*12, texture=load<u32>(level), tw=load<i32>(level+4),th=load<i32>(level+8);
    const dx=f32(left)+.5-ax;
    for(let y=top;y<=bottom;y++){
      const dy=f32(y)+.5-ay;
      let w1=dx*w1x+dy*w1y,w2=dx*w2x+dy*w2y;
      let dest=(y*width+left)<<2;
      for(let x=left;x<=right;x++,dest+=4,w1+=w1x,w2+=w2x){
        if(w1 < -.00003 || w2 < -.00003 || w1+w2>1.00003)continue;
        const z=z0+dz1*w1+dz2*w2;
        if(z<=load<f32>(depth+dest))continue;
        const delta=sweep-(h0+(h1-h0)*w1+(h2-h0)*w2);
        if(!complete && delta<0)continue;
        const tx=Mathf.max(0,Mathf.min(f32(tw-1), (u0+du1*w1+du2*w2)*f32(tw)-.5));
        const ty=Mathf.max(0,Mathf.min(f32(th-1), (v0+dv1*w1+dv2*w2)*f32(th)-.5));
        const ix=i32(tx), iy=i32(ty), fracX=tx-f32(ix), fracY=ty-f32(iy);
        const lp=texture+((iy*tw+ix)<<2), rp=lp+(ix<tw-1?4:0), row=iy<th-1?tw<<2:0;
        const p=load<u32>(lp),q=load<u32>(rp),r=load<u32>(lp+row),s=load<u32>(rp+row);
        let red=component(p,q,r,s,0,fracX,fracY),green=component(p,q,r,s,8,fracX,fracY),blue=component(p,q,r,s,16,fracX,fracY);
        if(!complete && delta<.30){
          const band=Mathf.exp(-delta*19.);
          red=blend(red,255.,band);green=blend(green,133.,band);blue=blend(blue,76.,band);
        }
        store<f32>(depth+dest,z);
        store<u32>(color+dest,0xff000000|(byte(blue)<<16)|(byte(green)<<8)|byte(red));
      }
    }
  }
}
