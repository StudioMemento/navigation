// Analytic v008 path consumer. Web Y-up; no Blender-axis conversion here.
// Arc tables are reconstructed once from the exact authored control points.
const clamp=u=>Math.max(0,Math.min(1,u));
const ease=u=>{u=clamp(u);return u*u*u*(10+u*(-15+6*u));};
const mix=(a,b,u)=>a+(b-a)*u;
const delta=(a,b)=>a.map((v,i)=>b[i]-v);
const norm=a=>Math.hypot(...a);
const look=pose=>{const d=delta(pose.slice(0,3),pose.slice(3,6));return [Math.atan2(d[0],d[2]),Math.atan2(d[1],Math.hypot(d[0],d[2])),norm(d)];};

function bezier(segments,parameter){
  const scaled=clamp(parameter)*segments.length,index=Math.min(Math.floor(scaled),segments.length-1),u=clamp(scaled-index),v=1-u,c=segments[index];
  return [0,1,2].map(i=>v**3*c[0][i]+3*v*v*u*c[1][i]+3*v*u*u*c[2][i]+u**3*c[3][i]);
}
function arcTable(segments,samplesPerSegment){
  const count=segments.length*samplesPerSegment,parameters=[0],distances=[0];
  let old=bezier(segments,0),distance=0;
  for(let i=1;i<=count;i++){
    const u=i/count,point=bezier(segments,u),step=norm(delta(old,point));
    distance+=step;old=point;
    if(step>1e-12){parameters.push(u);distances.push(distance);}
  }
  return {parameters,distances,length:distance};
}
function parameterAt(arc,fraction){
  const value=fraction*arc.length,a=arc.distances,p=arc.parameters;
  if(value<=a[0])return p[0];if(value>=a.at(-1))return p.at(-1);
  let low=0,high=a.length-1;
  while(high-low>1){const middle=(low+high)>>1;if(a[middle]<=value)low=middle;else high=middle;}
  return mix(p[low],p[high],(value-a[low])/(a[high]-a[low]));
}

export function createWorldRouteSampler(data){
  if(data.coordinateSystem!=='web_y_up'||data.arcSamplesPerSegment!==512)throw new Error('Unsupported TIDE route data');
  const routes=data.routes,arcs=new Map(),looks=new Map();
  for(const [id,route] of Object.entries(routes))if(route.segments){arcs.set(id,arcTable(route.segments,data.arcSamplesPerSegment));looks.set(id,[look(route.start),look(route.end)]);}
  function sampleById(id,u){
    if(!Number.isFinite(u))throw new Error('Route progress must be finite');
    const route=routes[id];if(!route)throw new Error('Unknown TIDE route: '+id);
    u=clamp(u);
    if(route.reverse)return {...sampleById(route.reverse,1-u),duration:route.duration,routeId:id};
    if(route.kind==='exit_to_overview'){
      let result;
      if(u<=route.split)result={...sampleById(route.hidden,u/route.split),maskFog:1};
      else{const v=(u-route.split)/(1-route.split);result={...sampleById(route.reveal,v),maskFog:1-ease((v-.04)/.86)};}
      return {...result,duration:route.duration,routeId:id};
    }
    const e=ease(u),arc=arcs.get(id),[l0,l1]=looks.get(id);
    let position=arc.length<1e-8?[...route.segments[0][0]]:bezier(route.segments,parameterAt(arc,e));
    const yawDelta=((l1[0]-l0[0]+Math.PI)%(2*Math.PI)+2*Math.PI)%(2*Math.PI)-Math.PI;
    const yaw=l0[0]+e*yawDelta,pitch=mix(l0[1],l1[1],e),distance=mix(l0[2],l1[2],e);
    const direction=[Math.sin(yaw)*Math.cos(pitch),Math.sin(pitch),Math.cos(yaw)*Math.cos(pitch)];
    let target=position.map((v,i)=>v+direction[i]*distance);
    if(u===0||u===1){const pose=u===0?route.start:route.end;position=pose.slice(0,3);target=pose.slice(3,6);}
    const yaws=Object.fromEntries(data.stageIds.map((sid,i)=>[sid,mix(route.yawStart[i],route.yawEnd[i],e)]));
    return {position,target,fov:mix(route.start[6],route.end[6],e),maskFog:route.fullyOccluded?1:route.kind==='enter_content'?ease((u-.35)/.65):0,yaws,duration:route.duration,routeId:id};
  }
  function routeId(kind,fromId,toId,format){
    if(!data.formats.includes(format))throw new Error('Unknown TIDE format: '+format);
    const stage=toId||fromId;
    let id;
    if(kind==='focus')id=fromId?'focus_'+fromId+'_to_'+toId:'overview_to_'+toId;
    else if(kind==='overview')id=fromId+'_to_overview';
    else if(kind==='entry')id='enter_'+stage;
    else if(kind==='reverse-entry')id='reverse_enter_'+stage;
    else if(kind==='exit')id='exit_'+stage+'_to_overview';
    else throw new Error('Unknown TIDE route kind: '+kind);
    id+='_'+format;if(!routes[id])throw new Error('Unknown TIDE route: '+id);return id;
  }
  return Object.freeze({
    version:data.version,sourceSha256:data.sourceSha256,routeCount:Object.keys(routes).length,
    sample:(kind,fromId,toId,format,u)=>sampleById(routeId(kind,fromId,toId,format),u),
    duration:(kind,fromId,toId,format)=>routes[routeId(kind,fromId,toId,format)].duration,
    sampleById,
  });
}

let cached;
export function loadWorldRoutes(){
  cached??=fetch('/data/world-routes.json').then(response=>{if(!response.ok)throw new Error('TIDE camera routes unavailable');return response.json();}).then(createWorldRouteSampler);
  return cached;
}
