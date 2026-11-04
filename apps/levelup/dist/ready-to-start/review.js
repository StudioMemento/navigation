// Explicit QA mode only (?review=1). Records the real renderer, never a replay/mock animation.
export function installReview(component){
 const panel=document.createElement('aside');panel.className='memento-review';panel.style.cssText='position:fixed;z-index:10;left:16px;top:16px;background:#181818ee;color:white;padding:10px;font:12px Inter';
 panel.innerHTML='<button type="button">Registra scena 3D · 15 s</button><span role="status"></span>';document.body.append(panel);
 panel.querySelector('button').onclick=()=>{
  const video=document.createElement('canvas'),w=Math.round(component.w),h=Math.round(component.h);video.width=w;video.height=h;const ctx=video.getContext('2d'),stream=video.captureStream(30),mime=MediaRecorder.isTypeSupported('video/webm;codecs=vp9')?'video/webm;codecs=vp9':'video/webm',recorder=new MediaRecorder(stream,{mimeType:mime,videoBitsPerSecond:4800000}),chunks=[];
  panel.querySelector('button').hidden=true;panel.querySelector('span').textContent='Registrazione in corso';
  const started=performance.now();
  component.options.onAfterDraw=()=>{
   ctx.fillStyle='#030405';ctx.fillRect(0,0,w,h);ctx.drawImage(component.canvas,0,0,w,h);ctx.drawImage(component.edgesCanvas,0,0,w,h);
   ctx.strokeStyle='rgba(184,184,174,.38)';ctx.lineWidth=1;ctx.beginPath();component.polygon.forEach((p,i)=>i?ctx.lineTo(...p):ctx.moveTo(...p));ctx.closePath();ctx.stroke();
   if(component.pointer.active){const p=component.pointer;ctx.fillStyle='#fff';ctx.strokeStyle='#080808';ctx.lineWidth=1;ctx.beginPath();ctx.moveTo(p.x,p.y);ctx.lineTo(p.x+5,p.y+15);ctx.lineTo(p.x+8,p.y+9);ctx.lineTo(p.x+14,p.y+7);ctx.closePath();ctx.fill();ctx.stroke();}
   if(performance.now()-started>15000&&recorder.state==='recording')recorder.stop();
  };
  recorder.ondataavailable=e=>{if(e.data.size)chunks.push(e.data);};
  recorder.onstop=()=>{component.options.onAfterDraw=null;stream.getTracks().forEach(t=>t.stop());const blob=new Blob(chunks,{type:mime}),reader=new FileReader();reader.onload=()=>{panel.innerHTML='<a download="memento-interaction.webm">Scarica registrazione</a>';panel.querySelector('a').href=reader.result;panel.dataset.recorded='true';};reader.readAsDataURL(blob);};recorder.start();
 };
 return ()=>{component.options.onAfterDraw=null;panel.remove();};
}
