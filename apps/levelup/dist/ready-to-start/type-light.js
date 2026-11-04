import {clamp} from './geometry.js';

// Canvas is used once per layout to measure ink. Visible type is ordinary HTML.
export function measureLine(ctx,text,spacing=0){
 let advance=0,min=Infinity,max=-Infinity,ascent=0,descent=0;const glyphs=[];
 for(const char of text){const m=ctx.measureText(char);glyphs.push({char,x:advance});
  if(char!==' '){min=Math.min(min,advance-m.actualBoundingBoxLeft);max=Math.max(max,advance+m.actualBoundingBoxRight);}
  ascent=Math.max(ascent,m.actualBoundingBoxAscent);descent=Math.max(descent,m.actualBoundingBoxDescent);advance+=m.width+spacing;
 }
 for(const g of glyphs)g.x-=min;
 return {glyphs,width:max-min,ascent,descent,left:min};
}

export function typeLayout(ctx,w,h){
 const pad=clamp(w*.056,24,108),desired=w<600?w-pad*2:Math.min(w*.41,h*1.36);
 ctx.font='300 100px Inter';const reference=measureLine(ctx,'READY TO',-.6);
 const font=Math.min(desired/reference.width*100,h*.108),tracking=[-.006*font,0];
 ctx.font=`300 ${font}px Inter`;const first=measureLine(ctx,'READY TO',tracking[0]);
 ctx.font=`600 ${font}px Inter`;const raw=measureLine(ctx,'START?');tracking[1]=(first.width-raw.width)/5;
 const second=measureLine(ctx,'START?',tracking[1]),inkHeight=Math.max(first.ascent+first.descent,second.ascent+second.descent);
 const height=inkHeight*2+font*.26;
 return {font,tracking,lines:[first,second],width:first.width,height,inkHeight,x:pad,y:h*.92-height};
}

export class DirectionalType{
 constructor(element){this.element=element;this.rows=[...element.children];this.ctx=document.createElement('canvas').getContext('2d');this.ready=false;this.glow=0;this.gx=.5;this.gy=.5;this.lastPaint='';this.count=0;}
 resize(w,h){
  this.w=w;this.h=h;const layout=typeLayout(this.ctx,w,h);Object.assign(this,layout);this.opticalWidths=layout.lines.map(l=>l.width);
  this.element.style.fontSize=layout.font+'px';this.element.style.width=layout.width+'px';this.element.style.height=layout.height+'px';
  for(let i=0;i<2;i++){
   const row=this.rows[i],line=layout.lines[i];
   row.dataset.text=row.textContent;row.style.letterSpacing=layout.tracking[i]+'px';
   row.style.left=-line.left+'px';row.style.top=(i*(layout.inkHeight+layout.font*.26))+'px';
   // Match a normal CSS line box to the ink top without glyph clipping.
   row.style.lineHeight=layout.font+'px';row.style.transform=`translateY(${line.ascent-layout.font*.85}px)`;
  }
  this.ready=true;this.lastPaint='';this.draw();
 }
 step(dt,pointer,staticFrame=false){
  if(!this.ready)return;
  const active=pointer.active&&!staticFrame,a=staticFrame?1:1-Math.exp(-dt/.16);
  this.gx+=(clamp(pointer.x/this.w,0,1)-this.gx)*a;this.gy+=(clamp(pointer.y/this.h,0,1)-this.gy)*a;
  this.glow+=((active?.90:0)-this.glow)*a;if(this.glow<.001)this.glow=0;
 }
 draw(){
  if(!this.ready)return;
  const key=[Math.round(this.gx*500),Math.round(this.gy*200),Math.round(this.glow*1000)].join(':');if(key===this.lastPaint)return;this.lastPaint=key;
  for(let i=0;i<2;i++){
   const row=this.rows[i],localY=this.gy*this.height-i*(this.inkHeight+this.font*.26);
   row.style.setProperty('--glow-x',(this.gx*100).toFixed(2)+'%');row.style.setProperty('--glow-y',localY.toFixed(2)+'px');
  }
  this.element.style.setProperty('--glow-angle',(105+(this.gx-.5)*55+(this.gy-.5)*25).toFixed(1)+'deg');
  this.element.style.setProperty('--type-glow',this.glow.toFixed(3));
 }
 stats(){return {textParticles:0,textMode:'HTML white / clipped amber light',textWeights:[300,600],textInkWidths:this.opticalWidths?.map(n=>+n.toFixed(3)),typeGlow:+this.glow.toFixed(3)};}
 dispose(){this.ready=false;this.element.style.removeProperty('--type-glow');this.ctx=null;}
}
