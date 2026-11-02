// A single persistent frame. Selection is committed only after the carousel rests.
// Loading veil hides first paint; fullscreen changes presentation, never DOM parentage.
export class DemoPlayer {
  constructor({mount,loading,fallback,poster,link,panel}) {
    Object.assign(this,{mount,loading,fallback,poster,link,panel});
    this.item=null; this.frame=null; this.generation=0; this.timer=0;
  }
  load(item,force=false) {
    if(!force && this.item?.id===item.id)return;
    this.item=item;
    const token=++this.generation;
    clearTimeout(this.timer);
    this.panel.setAttribute('aria-label',item.title+' — demo interattiva');
    this.poster.src=item.asset;
    this.link.href=item.url;
    this.loading.textContent='Caricamento '+item.title+'…';
    this.loading.hidden=false; this.fallback.hidden=true;
    this.panel.setAttribute('aria-busy','true');
    const frame=document.createElement('iframe');
    frame.title=item.title+' — demo interattiva';
    frame.dataset.experience=item.id;
    frame.referrerPolicy='strict-origin-when-cross-origin';
    frame.allow='fullscreen; autoplay; xr-spatial-tracking'; frame.allowFullscreen=true;
    frame.setAttribute('sandbox','allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox allow-pointer-lock allow-downloads');
    frame.addEventListener('load',()=>{
      if(token!==this.generation)return;
      clearTimeout(this.timer);
      // The containing page cannot inspect a cross-origin app's first WebGL frame.
      // Two paint opportunities avoid exposing the iframe's initial blank surface.
      requestAnimationFrame(()=>requestAnimationFrame(()=>{
        if(token!==this.generation)return;
        frame.dataset.loaded='true';
        this.loading.hidden=true; this.fallback.hidden=true;
        this.panel.setAttribute('aria-busy','false');
      }));
    },{once:true});
    const fail=()=>{
      if(token!==this.generation)return;
      clearTimeout(this.timer);
      this.loading.hidden=true; this.fallback.hidden=false;
      this.panel.setAttribute('aria-busy','false');
    };
    frame.addEventListener('error',fail,{once:true});
    frame.src=item.url;
    this.mount.replaceChildren(frame); this.frame=frame;
    this.timer=setTimeout(fail,20000);
  }
}
