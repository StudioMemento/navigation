// Opt-in local measurements. No analytics, remote storage or background work.
export function summarizeFrames(frames){
 if(!frames.length)return {frames:0};
 const sorted=key=>frames.map(f=>f[key]).sort((a,b)=>a-b),intervals=sorted('interval'),cpu=sorted('cpu');
 const q=(a,p)=>+a[Math.min(a.length-1,Math.floor((a.length-1)*p))].toFixed(2),duration=frames.reduce((n,f)=>n+f.interval,0);
 return {frames:frames.length,measuredSeconds:+(duration/1000).toFixed(2),averageFps:+(frames.length*1000/duration).toFixed(1),frameMedianMs:q(intervals,.5),frameP95Ms:q(intervals,.95),cpuMedianMs:q(cpu,.5),cpuP95Ms:q(cpu,.95),over33ms:frames.filter(f=>f.interval>33.34).length,over50ms:frames.filter(f=>f.interval>50).length};
}
export function installPerformance(component){
 if(!component)return;
 const panel=document.createElement('aside');panel.className='memento-perf';panel.setAttribute('aria-label','Misurazione performance');
 panel.innerHTML='<strong>MEMENTO · DEVICE TEST</strong><p>30 s visibili: prova idle e interazione.<br>I dati restano su questo device.</p><output>Pronto</output><div><button type="button" data-record>Registra 30 s</button><button type="button" data-save disabled>Salva JSON</button><button type="button" data-close aria-label="Chiudi misurazione">×</button></div>';
 const style=document.createElement('style');style.textContent='.memento-perf{position:fixed;right:16px;bottom:16px;z-index:20;max-width:calc(100vw - 32px);width:310px;padding:16px;background:#101112f5;color:#f5f4ee;border:1px solid #7e6745;font:12px/1.5 Inter,Arial,sans-serif;box-sizing:border-box}.memento-perf p{margin:8px 0;color:#bbb}.memento-perf output{display:block;white-space:pre-line;font:11px/1.5 monospace;min-height:48px}.memento-perf div{display:flex;gap:8px;margin-top:12px}.memento-perf button{background:#24231f;color:#fff;border:1px solid #62543d;padding:8px;font:inherit;cursor:pointer}.memento-perf button:disabled{opacity:.4}.memento-perf button:focus-visible{outline:2px solid #ffba76}';
 document.head.append(style);document.body.append(panel);
 let frames=[],recording=false,duration=0,report=null,lastUi=0;const record=panel.querySelector('[data-record]'),save=panel.querySelector('[data-save]'),output=panel.querySelector('output');
 const before=component.options.onFrame;
 component.options.onFrame=sample=>{
  before?.(sample);if(!recording)return;
  // The first frame after resume is only a scheduler seed, not a measured interval.
  if(!sample.valid||!Number.isFinite(sample.interval+sample.cpu)||sample.interval<=0)return;
  frames.push(sample);duration+=sample.interval;
  if(duration-lastUi>500){lastUi=duration;output.textContent=`${Math.min(30,duration/1000).toFixed(1)} / 30 s\n${component.drawCount} sparkle · ${component.universe.count} ambiente\nDPR ${component.dpr} · qualità ${component.qualityStep}`;}
  if(duration>=30000){
   recording=false;record.disabled=false;save.disabled=false;
   report={version:'cinematic-v1',timestamp:new Date().toISOString(),userAgent:navigator.userAgent,viewport:{width:innerWidth,height:innerHeight,devicePixelRatio},reducedMotion:component.reduced,renderer:component.card.dataset.renderer,summary:summarizeFrames(frames),qualityTransitions:frames.filter((f,i)=>i===0||f.quality!==frames[i-1].quality).map(f=>({atMs:f.at,quality:f.quality,icon:f.icon,ambient:f.ambient,dpr:f.dpr})),diagnostics:JSON.parse(component.card.dataset.diagnostics||'{}'),note:'FPS uses actual visible rAF intervals. CPU excludes asynchronous GPU work. Desktop viewport emulation is not physical-device measurement.'};
   const s=report.summary;output.textContent=`${s.averageFps} FPS medi · frame p95 ${s.frameP95Ms} ms\nCPU mediana ${s.cpuMedianMs} ms\n${s.over50ms} frame oltre 50 ms`;
  }
 };
 record.onclick=()=>{if(component.reduced||!component.renderer){output.textContent='Animazione disattivata o WebGL non disponibile.';return;}frames=[];duration=lastUi=0;report=null;recording=true;record.disabled=true;save.disabled=true;output.textContent='Registrazione…';};
 save.onclick=()=>{if(!report)return;const url=URL.createObjectURL(new Blob([JSON.stringify(report,null,2)],{type:'application/json'})),a=document.createElement('a');a.href=url;a.download='MEMENTO_DEVICE_PERFORMANCE.json';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);};
 panel.querySelector('[data-close]').onclick=()=>{recording=false;component.options.onFrame=before;panel.remove();style.remove();};
}
