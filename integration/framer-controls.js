// Import into your Framer overlay integration; pass the actual TIDE iframe.
// No UI is rendered by this helper. Existing overlay buttons call select/open/back.
export function connectTide(frame,onState=()=>{}){
  const origin=new URL(frame.src,location.href).origin;
  const send=(type,slug)=>frame.contentWindow?.postMessage({channel:'memento:tide:control',version:1,type,slug},origin);
  const listener=event=>{if(event.source===frame.contentWindow&&event.origin===origin&&event.data?.channel==='memento:tide:scene'&&event.data.version===1)onState(event.data);};
  addEventListener('message',listener);
  return{select:slug=>send('SELECT',slug),open:slug=>send('OPEN',slug),back:()=>send('RETURN'),dispose:()=>removeEventListener('message',listener)};
}
