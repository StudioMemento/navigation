// Layered code-native 2.5D environment: distant stars, obsidian planes, near mist.
export class Atmosphere {
  constructor(canvas,color) {
    this.canvas=canvas;this.ctx=canvas.getContext('2d',{alpha:false});this.pointer={x:0,y:0};this.motion={x:0,y:0};this.settings={ambient:.55,depth:.6,parallax:.5};
    this.reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;this.color=this.rgb(color);this.target=[...this.color];this.last=0;
    let seed=171;const random=()=>{seed=(seed*16807)%2147483647;return(seed-1)/2147483646;};
    this.stars=Array.from({length:170},()=>({x:random(),y:random(),z:.15+random()*.85,r:.3+random()*.85,a:.15+random()*.5,phase:random()*6.28}));
    this.texture=new Image();this.texture.src='./assets/obsidian-square.webp';
    this.resize=()=>{this.w=canvas.clientWidth;this.h=canvas.clientHeight;this.dpr=Math.min(devicePixelRatio,1.5);canvas.width=this.w*this.dpr;canvas.height=this.h*this.dpr;};
    this.observer=new ResizeObserver(this.resize);this.observer.observe(canvas);this.resize();this.tick=this.tick.bind(this);this.frame=requestAnimationFrame(this.tick);
    this.visibility=()=>{cancelAnimationFrame(this.frame);if(!document.hidden)this.frame=requestAnimationFrame(this.tick);};document.addEventListener('visibilitychange',this.visibility);
  }
  rgb(hex){return [1,3,5].map(i=>parseInt(hex.slice(i,i+2),16));}
  setWorld(world){this.target=this.rgb(world.color);}
  tick(now){
    this.frame=requestAnimationFrame(this.tick);if(now-this.last<33)return;this.last=now;
    const {w,h,ctx:c,settings:s}=this;for(let i=0;i<3;i++)this.color[i]+=(this.target[i]-this.color[i])*.035;
    this.motion.x+=((this.reduced?0:this.pointer.x)-this.motion.x)*.06;this.motion.y+=((this.reduced?0:this.pointer.y)-this.motion.y)*.06;
    const rgb=this.color.map(Math.round).join(','),px=this.motion.x*s.parallax,py=this.motion.y*s.parallax;
    c.setTransform(this.dpr,0,0,this.dpr,0,0);c.fillStyle='#07090b';c.fillRect(0,0,w,h);
    if(this.texture.complete&&this.texture.naturalWidth){const size=Math.max(w,h)*1.065;c.globalAlpha=.18+s.ambient*.28;c.drawImage(this.texture,-10+px*18*s.depth,-10+py*14*s.depth,size,size);c.globalAlpha=1;}
    c.globalCompositeOperation='soft-light';c.fillStyle=`rgba(${rgb},.24)`;c.fillRect(0,0,w,h);c.globalCompositeOperation='source-over';
    let glow=c.createRadialGradient(w*.25+px*10,h*.24+py*10,0,w*.3,h*.25,Math.max(w,h)*.77);glow.addColorStop(0,`rgba(${rgb},${.045+s.ambient*.09})`);glow.addColorStop(.5,`rgba(${rgb},.016)`);glow.addColorStop(1,'transparent');c.fillStyle=glow;c.fillRect(0,0,w,h);
    for(const star of this.stars){const depth=.4+star.z*s.depth;const x=star.x*w+px*depth*35,y=star.y*h+py*depth*25;const twinkle=this.reduced?1:.84+.16*Math.sin(now*.00028+star.phase);c.fillStyle=`rgba(215,224,230,${star.a*(.45+s.ambient)*twinkle})`;c.beginPath();c.arc(x,y,star.r*(.6+s.depth*.5),0,Math.PI*2);c.fill();}
    glow=c.createRadialGradient(w*.52+px*45,h*.65+py*30,0,w*.52,h*.67,w*.47);glow.addColorStop(0,`rgba(${rgb},${.025+s.ambient*.025})`);glow.addColorStop(1,'transparent');c.fillStyle=glow;c.fillRect(0,0,w,h);
  }
  dispose(){cancelAnimationFrame(this.frame);this.observer.disconnect();document.removeEventListener('visibilitychange',this.visibility);}
}
