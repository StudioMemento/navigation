/* Same-origin integration layer. Original modules own content and interactions;
   the shell owns worlds, framing and the persistent cube. No form data crosses it. */
(() => {
  if(parent===window)return;
  const world=document.documentElement.dataset.socket;
  const send=(type,extra={})=>parent.postMessage({type:'memento:socket:'+type,...extra},location.origin);
  let expanded=false,pendingSection=null;
  let engaged=false,engagedAt=0,quietUntil=0,previousHash='';
  const scrollRoot=document.querySelector('#viewport')||document.scrollingElement;
  function engage(){if(!engaged&&Date.now()>quietUntil){engaged=true;engagedAt=Date.now();send('engage');setTimeout(inspect,1100);}}
  function overview(){if(engaged){engaged=false;send('overview');}}
  function inspect(){
    if(Date.now()<quietUntil)return;
    const modal=Boolean(document.querySelector('dialog[open]'));
    const project=world==='portfolio'&&!document.querySelector('#project-view')?.hidden;
    const compose=world==='start'&&!document.querySelector('#mm-compose')?.hidden;
    const hash=location.hash.slice(1);
    if(hash!==previousHash){previousHash=hash;send('route-changed',{hash});}
    const chapter=world==='servizi'&&hash&&hash!=='inizio';
    if(modal||project||compose||chapter)engage();
    else if(!expanded&&scrollRoot.scrollTop<8&&Date.now()-engagedAt>900)overview();
  }
  function pause(){
    document.querySelectorAll('video,audio').forEach(v=>v.pause());
    document.querySelector('#close-player')?.click();
    document.querySelector('[data-action="close-media"]')?.click();
  }
  function reset(){
    quietUntil=Date.now()+1200;engaged=false;expanded=false;pendingSection=null;
    pause();
    document.querySelector('#close-contact')?.click();
    if(world==='servizi'){
      document.querySelectorAll('dialog[open]').forEach(d=>d.dispatchEvent(new Event('cancel',{cancelable:true})));
      location.hash='inizio';window.scrollTo({top:0,behavior:'instant'});
      setTimeout(()=>window.scrollTo({top:0,behavior:'instant'}),950);
    }
    if(world==='portfolio'){location.hash='catalogo';setTimeout(()=>scrollRoot.scrollTo({top:0,behavior:'instant'}),50);}
    if(world==='studio'){location.hash='studio';}
    if(world==='start'){document.querySelector('#mm-back')?.click();window.scrollTo({top:0,behavior:'instant'});}
    setTimeout(inspect,1250);
  }
  addEventListener('message',e=>{
    if(e.origin!==location.origin||e.source!==parent)return;
    const d=e.data||{};
    if(d.type==='memento:socket:theme'&&/^#[0-9a-f]{6}$/i.test(d.accent)){document.documentElement.style.setProperty('--section-accent',d.accent);if(['gate','hub','detail'].includes(d.mode))document.documentElement.dataset.mode=d.mode;}
    if(d.type==='memento:socket:settled'&&d.mode==='detail'&&pendingSection){const id=pendingSection;pendingSection=null;document.dispatchEvent(new CustomEvent('memento:socket:framed-section',{detail:id}));}
    if(d.type==='memento:socket:expand'){expanded=true;engage();}
    if(d.type==='memento:socket:pause')pause();
    if(d.type==='memento:socket:reset')reset();
    if(d.type==='memento:socket:route'&&typeof d.hash==='string')location.hash=d.hash;
  });
  document.addEventListener('memento:socket:open-section',e=>{if(world!=='servizi'||!['web','3d','video','visual','branding'].includes(e.detail))return;pendingSection=e.detail;quietUntil=0;engage();send('request-framing');});
  document.addEventListener('click',e=>{
    const el=e.target.closest('a,button');if(!el)return;
    const action=el.dataset.action;
    let destination=null;
    if(el.id==='home-link')destination='home';
    if(world==='servizi'&&action==='levelup')destination='level-up';
    if(world==='level-up'&&['contact-cta','player-contact'].includes(el.id))destination='start';
    if(world==='portfolio'&&el.closest('.footer'))destination='start';
    if(destination){e.preventDefault();e.stopImmediatePropagation();send('navigate',{world:destination});return;}
    if(world==='servizi'&&el.closest('#hero-controls')){quietUntil=Date.now()+800;window.scrollTo({top:0,behavior:'instant'});}
    if(world==='studio'&&el.matches('.nav-item,.next-button')){expanded=true;engage();}
    if(el.matches('.hero-card,.showcase-card,.project-tile,.preview-card,#mm-email-button'))engage();
    setTimeout(inspect,50);
  },true);
  document.addEventListener('pointerdown',e=>{if(world==='studio'&&e.target.matches('canvas')){expanded=true;engage();}},{passive:true});
  document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!document.querySelector('dialog[open]')&&engaged){reset();send('overview');}});
  document.addEventListener('wheel',e=>{if(Math.abs(e.deltaY)>20&&Math.abs(e.deltaY)>Math.abs(e.deltaX))engage();},{passive:true});
  let touchStart=null;
  document.addEventListener('touchstart',e=>{touchStart=e.touches[0]?.clientY;},{passive:true});
  document.addEventListener('touchmove',e=>{if(touchStart!==null&&Math.abs(e.touches[0].clientY-touchStart)>35)engage();},{passive:true});
  document.addEventListener('scroll',inspect,{passive:true,capture:true});
  window.addEventListener('hashchange',()=>setTimeout(inspect,50));
  new MutationObserver(inspect).observe(document.body,{subtree:true,attributes:true,attributeFilter:['open','hidden']});
  send('ready');setTimeout(()=>{inspect();const id=location.hash.slice(1);if(world==='servizi'&&['web','3d','video','visual','branding'].includes(id))document.dispatchEvent(new CustomEvent('memento:socket:open-section',{detail:id}));},150);
})();
