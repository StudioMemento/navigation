export function percentile(values,q){if(!values.length)return null;const v=[...values].sort((a,b)=>a-b);return v[Math.min(v.length-1,Math.floor(q*(v.length-1)))];}
export class Telemetry {
  constructor(renderer){
    this.renderer=renderer;this.samples=[];this.gpu=[];this.pending=[];this.errors=[];this.started=null;this.result=null;this.last=null;
    const gl=renderer.getContext();this.gl=gl;this.ext=gl.getExtension('EXT_disjoint_timer_query_webgl2');
    const debug=gl.getExtension('WEBGL_debug_renderer_info');
    this.hardware={userAgent:navigator.userAgent,renderer:debug?gl.getParameter(debug.UNMASKED_RENDERER_WEBGL):gl.getParameter(gl.RENDERER),vendor:debug?gl.getParameter(debug.UNMASKED_VENDOR_WEBGL):gl.getParameter(gl.VENDOR),hardwareConcurrency:navigator.hardwareConcurrency,deviceMemoryGiB:navigator.deviceMemory??null};
    this.longTasks=[];try{new PerformanceObserver(l=>this.longTasks.push(...l.getEntries().map(x=>({start:x.startTime,duration:x.duration})))).observe({type:'longtask',buffered:true});}catch{}
  }
  start(seconds=12){this.pending.forEach(q=>this.gl.deleteQuery(q));this.pending=[];this.samples=[];this.gpu=[];this.started=performance.now();this.until=this.started+seconds*1000;this.last=this.started;this.result=null;}
  begin(){
    this.cpuStart=performance.now();this.currentQuery=null;
    if(this.started&&this.ext&&this.pending.length<8){const q=this.gl.createQuery();this.gl.beginQuery(this.ext.TIME_ELAPSED_EXT,q);this.currentQuery=q;}
  }
  end(now,state){
    const cpu=performance.now()-this.cpuStart;
    if(this.currentQuery){this.gl.endQuery(this.ext.TIME_ELAPSED_EXT);this.pending.push(this.currentQuery);}
    if(this.ext){const disjoint=this.gl.getParameter(this.ext.GPU_DISJOINT_EXT);while(this.pending.length&&this.gl.getQueryParameter(this.pending[0],this.gl.QUERY_RESULT_AVAILABLE)){const q=this.pending.shift();if(!disjoint&&this.started)this.gpu.push(this.gl.getQueryParameter(q,this.gl.QUERY_RESULT)/1e6);this.gl.deleteQuery(q);}}
    if(!this.started)return;
    if(this.last!==null)this.samples.push({interval:now-this.last,cpu,state,calls:this.renderer.info.render.calls,triangles:this.renderer.info.render.triangles});this.last=now;
    if(now>=this.until)this.finish(now);
  }
  finish(now=performance.now()){
    const a=this.samples,dt=a.map(x=>x.interval),cpu=a.map(x=>x.cpu),sum=dt.reduce((s,x)=>s+x,0);
    this.result={windowSeconds:(now-this.started)/1000,frames:a.length,meanFps:1000*a.length/(now-this.started),firstFrameLatencyMs:dt[0]??null,medianFrameMs:percentile(dt,.5),p95FrameMs:percentile(dt,.95),p99FrameMs:percentile(dt,.99),worstFrameMs:Math.max(0,...dt),framesOver33ms:dt.filter(x=>x>33.34).length,cpuSubmissionMedianMs:percentile(cpu,.5),cpuSubmissionP95Ms:percentile(cpu,.95),gpuMedianMs:percentile(this.gpu,.5),gpuP95Ms:percentile(this.gpu,.95),gpuSamples:this.gpu.length,maxDrawCalls:Math.max(0,...a.map(x=>x.calls)),maxTriangles:Math.max(0,...a.map(x=>x.triangles)),states:[...new Set(a.map(x=>x.state))],longTasks:this.longTasks.filter(x=>x.start>=this.started).length,method:'v2: frames / full wall-clock window including first-frame latency; requestAnimationFrame intervals; CPU measures submission, GPU via non-blocking timer queries; local HTTP; no CPU/network throttling'};
    this.started=null;return this.result;
  }
  resources(){
    const entries=performance.getEntriesByType('resource');
    return {count:entries.length,transferBytes:entries.reduce((s,x)=>s+x.transferSize,0),encodedBytes:entries.reduce((s,x)=>s+x.encodedBodySize,0),decodedBytes:entries.reduce((s,x)=>s+x.decodedBodySize,0),items:entries.map(x=>({name:new URL(x.name).pathname,durationMs:x.duration,transferBytes:x.transferSize,encodedBytes:x.encodedBodySize}))};
  }
}
