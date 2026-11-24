const paths={camera:'M3 7h4l2-3h6l2 3h4v13H3Z M16 13a4 4 0 1 1-8 0 4 4 0 0 1 8 0',light:'M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5m11 11L19 19M5 19l1.5-1.5m11-11L19 5 M16 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0',magic:'m12 3 2.5 6.5L21 12l-6.5 2.5L12 21l-2.5-6.5L3 12l6.5-2.5Z M21 2v4m-2-2h4',exit:'m15 4-8 8 8 8M7 12h14',close:'m6 6 12 12M6 18 18 6',pause:'M9 5v14M15 5v14',play:'m8 5 11 7-11 7Z',retry:'M20 8a8 8 0 1 0 0 8M20 3v5h-5'};
export const icon=name=>`<svg viewBox="0 0 24 24" aria-hidden="true"><path d="${paths[name]}"/></svg>`;
export function setupUI(actions){
 const $=id=>document.getElementById(id),status=$('status');
 for(const [id,symbol,action] of [['views-toggle','camera','camera'],['lights','light','lighting'],['shaders','magic','shader']]){
 const button=$(id);button.innerHTML=icon(symbol);button.addEventListener('click',()=>{const result=actions[action]();if(!result)return;if(action==='lighting')button.setAttribute('aria-busy','true');button.dataset.result=result.key||String(result.id);button.setAttribute('aria-description',result.name);status.textContent=result.name;button.getAnimations().forEach(a=>a.cancel());
 if(!matchMedia('(prefers-reduced-motion: reduce)').matches){button.animate([{transform:'translateY(0)'},{transform:'translateY(2px)',background:'#ff7950aa',offset:.2},{transform:'translateY(-2px)',offset:.65},{transform:'translateY(0)'}],{duration:420,easing:'cubic-bezier(.2,.7,.2,1)'});button.querySelector('svg').animate([{transform:'translateY(0)',opacity:1},{transform:'translateY(-12px)',opacity:0,offset:.25},{transform:'translateY(12px) scale(.85)',opacity:0,offset:.45},{transform:'translateY(0)',opacity:1}],{duration:420});}
 });
 }
 $('exit').innerHTML=icon('exit');$('exit').onclick=()=>actions.exit();$('motion').onclick=()=>actions.motion();$('focus-close').innerHTML=icon('close');$('focus-close').onclick=()=>actions.unfocus();$('retry').innerHTML=icon('retry');$('retry').onclick=()=>location.reload();
 document.addEventListener('keydown',e=>{if(e.code==='Escape')actions.escape();});
 return {
 progress(v){$('load-bar').style.transform=`scaleX(${Math.max(0,Math.min(1,v))})`;},
 ready(){this.progress(1);$('controls').hidden=false;document.body.classList.add('ready');for(const id of ['views-toggle','lights','shaders'])$(id).disabled=false;},
 error(message){$('error').hidden=false;$('loading').hidden=true;status.textContent=message;$('error').setAttribute('aria-label',message);},
 navigation(nav){$('exit').hidden=nav.state==='exterior';document.body.classList.toggle('inside',nav.state!=='exterior');$('views-toggle').setAttribute('aria-busy',String(!!nav.transition));},
 focus(object){document.body.classList.toggle('focused',!!object);$('focus-close').hidden=!object;},
 shader(id){$('shaders').dataset.requested=String(id);$('shaders').setAttribute('aria-busy','true');},
 rendered(id,busy,lightReady){if($('shaders').dataset.active!==String(id))$('shaders').dataset.active=String(id);const state=String(busy);if($('shaders').getAttribute('aria-busy')!==state)$('shaders').setAttribute('aria-busy',state);const lightingState=String(!lightReady);if($('lights').getAttribute('aria-busy')!==lightingState)$('lights').setAttribute('aria-busy',lightingState);},
 motion(paused){document.body.classList.toggle('paused',paused);$('motion').setAttribute('aria-pressed',String(paused));$('motion').setAttribute('aria-label',paused?'Riprendi le animazioni':'Metti in pausa le animazioni');$('motion').innerHTML=icon(paused?'play':'pause');},
 announce(message){status.textContent=message;}
 };
}
