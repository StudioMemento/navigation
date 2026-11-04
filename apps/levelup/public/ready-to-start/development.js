// Optional, local-only diagnostics. Activate with ?dev=1 on the development preview.
export function installDevelopmentPanel(component){
 const panel=document.createElement('aside');panel.style.cssText='position:fixed;top:10px;left:10px;z-index:100;background:#151718ed;color:#eee;padding:16px;font:12px/1.5 monospace;max-width:280px;border:1px solid #444';
 panel.innerHTML='<strong>MEMENTO · development</strong><br><label><input type="checkbox" data-static> Static / reduced motion</label><br><label>Visible particles <input type="range" min="4096" max="16384" step="1024" value="16384" data-count></label><pre></pre><button type="button">Close</button>';
 document.body.append(panel);
 panel.querySelector('[data-count]').max=component.simulation.count;panel.querySelector('[data-count]').value=component.drawCount;
 panel.querySelector('[data-static]').onchange=e=>{component.reduced=e.target.checked;component.pause();if(component.reduced)component.renderStatic();else component.resume();};
 panel.querySelector('[data-count]').oninput=e=>{component.drawCount=+e.target.value;};
 component.options.onStats=stats=>{panel.querySelector('pre').textContent=JSON.stringify({...stats,rendered:component.drawCount},null,2);};
 panel.querySelector('button').onclick=()=>{panel.remove();component.options.onStats=null;};
}
