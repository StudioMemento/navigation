import React, {useRef, useState, useEffect} from 'react';
import {CaretLeft, CaretRight, CaretRight as CaretUpRight} from '@phosphor-icons/react';
import {asset} from './data';

export function Dots({items,index,onChange,label}) {
  return <div className="dots" role="group" aria-label={label}>{items.map((p,i)=><button key={p.id||i} aria-label={p.title||`Tavola ${i+1}`} aria-pressed={i===index} onClick={()=>onChange(i)}><span/><span className="dot-tooltip">{p.title}</span></button>)}</div>;
}

function CenteredPagination({items,index,onChange,label}) {
  const buttons=useRef([]);
  return <div className="centered-pagination" role="group" aria-label={label} onKeyDown={e=>{
    const direction=e.key==='ArrowRight'?1:e.key==='ArrowLeft'?-1:0;
    if(!direction)return;
    e.preventDefault();
    const next=(index+direction+items.length)%items.length;
    onChange(next);buttons.current[next]?.focus({preventScroll:true});
  }}>
    {items.map((item,i)=>{
      let offset=(i-index+items.length)%items.length;
      if(offset>items.length/2)offset-=items.length;
      const visible=Math.abs(offset)<=3;
      return <button key={item.id} ref={el=>{buttons.current[i]=el}} className={`rail-dot ${Math.abs(offset)>2?'rail-outer':''}`} style={{'--rail-offset':offset,opacity:visible?1:0,visibility:visible?'visible':'hidden'}} aria-label={item.title} aria-pressed={i===index} tabIndex={i===index?0:-1} onClick={()=>onChange(i)}><span/></button>;
    })}
    <span className="rail-current" aria-hidden="true"/>
  </div>;
}

export function useSwipe(ref,onStep) {
  const gesture=useRef(null), blockClick=useRef(false), callback=useRef(onStep);
  callback.current=onStep;
  useEffect(()=>{
    const node=ref.current;if(!node)return;
    const finish=(e,cancel=false)=>{
      const g=gesture.current;if(!g)return;gesture.current=null;
      node.style.removeProperty('--drag');node.classList.remove('dragging');
      if(!g.horizontal)return;
      blockClick.current=true;
      const dx=e.clientX-g.x, speed=Math.abs(dx)/Math.max(1,performance.now()-g.t);
      const active=node.querySelector('.is-active');
      const width=active?.getBoundingClientRect().width||node.clientWidth;
      if(!cancel && (Math.abs(dx)>width*.18 || (speed>.35&&Math.abs(dx)>18)))callback.current(dx<0?1:-1);
      window.setTimeout(()=>{blockClick.current=false},180);
    };
    const down=e=>{if(e.button!==0||e.target.closest('button'))return;gesture.current={x:e.clientX,y:e.clientY,t:performance.now(),horizontal:false,pointer:e.pointerId};};
    const move=e=>{const g=gesture.current;if(!g)return;const dx=e.clientX-g.x,dy=e.clientY-g.y;if(!g.horizontal){if(Math.abs(dy)>12&&Math.abs(dy)>Math.abs(dx)){gesture.current=null;return;}if(Math.abs(dx)<8||Math.abs(dx)<Math.abs(dy)*1.25)return;g.horizontal=true;node.setPointerCapture(e.pointerId);node.classList.add('dragging');}node.style.setProperty('--drag',`${Math.max(-260,Math.min(260,dx*.55))}px`);};
    const up=e=>finish(e),cancel=e=>finish(e,true);
    const click=e=>{if(blockClick.current){e.preventDefault();e.stopPropagation();}};
    node.addEventListener('pointerdown',down);node.addEventListener('pointermove',move);node.addEventListener('pointerup',up);node.addEventListener('pointercancel',cancel);node.addEventListener('click',click,true);
    return()=>{node.removeEventListener('pointerdown',down);node.removeEventListener('pointermove',move);node.removeEventListener('pointerup',up);node.removeEventListener('pointercancel',cancel);node.removeEventListener('click',click,true);};
  },[ref]);
}

export function Coverflow({items,index,onChange,onActivate,variant='project',label}) {
  const ref=useRef(null);const [announce,setAnnounce]=useState('');
  const step=n=>onChange((index+n+items.length)%items.length);
  useSwipe(ref,step);
  useEffect(()=>{setAnnounce(items[index]?.title||'')},[index,items]);
  return <div className={`coverflow ${variant}`} role="region" aria-roledescription="carosello" aria-label={label}>
    <div ref={ref} className="deck" tabIndex={0} onKeyDown={e=>{if(e.target!==e.currentTarget)return;if(e.key==='ArrowRight'){e.preventDefault();step(1)}if(e.key==='ArrowLeft'){e.preventDefault();step(-1)}}}>
      {items.map((item,i)=>{let distance=(i-index+items.length)%items.length;if(distance>items.length/2)distance-=items.length;const visible=Math.abs(distance)<=2;const active=distance===0;
        return <a key={item.id} href={variant==='category'?`/?categoria=${item.id}#progetti`:`/progetti/${item.id}`} className={`flow-card ${active?'is-active':''}`} data-side={distance>0?'right':'left'} tabIndex={active?0:-1} aria-hidden={!visible} aria-label={variant==='category'?`Esplora i progetti ${item.title}`:`${active?'Apri il contenuto di':'Seleziona'} ${item.title}`} style={{'--offset':distance,'--abs':Math.abs(distance),visibility:visible?'visible':'hidden',zIndex:10-Math.abs(distance)}} draggable="false" onClick={e=>{if(e.metaKey||e.ctrlKey||e.shiftKey||e.altKey)return;e.preventDefault();active?onActivate(item):onChange(i)}}>
          <div className="chamfer"><div className="frame-inner">
            <img className="card-image" src={asset(item.image||item.cover)} alt="" draggable="false" loading={Math.abs(distance)<2?'eager':'lazy'} decoding="async"/>
            <div className="card-shade"/>
            {variant==='category'?<><p className="category-description">{item.description}</p><span className="category-cta">Esplora i<br/>progetti</span></>:<span className="project-card-name">{item.title}</span>}
            <CaretUpRight className="open-caret" weight="light" aria-hidden="true"/>
          </div></div>
          <div className="card-reflection" aria-hidden="true"><div className="reflection-inner"><img className="card-image" src={asset(item.image||item.cover)} alt="" draggable="false" loading="lazy" decoding="async"/></div></div>
        </a>;
      })}
      {variant==='category'&&<><button className="deck-arrow previous" aria-label="Precedente" onClick={()=>step(-1)}><CaretLeft weight="light"/></button><button className="deck-arrow next" aria-label="Successivo" onClick={()=>step(1)}><CaretRight weight="light"/></button></>}
    </div>
    <div className="flow-controls">
      {variant==='project'&&<button className="icon-button" aria-label="Progetto precedente" onClick={()=>step(-1)}><CaretLeft weight="light"/></button>}
      {variant==='project'?<CenteredPagination items={items} index={index} onChange={onChange} label={`Selezione ${label.toLowerCase()}`}/>:<Dots items={items} index={index} onChange={onChange} label={`Selezione ${label.toLowerCase()}`}/>}
      {variant==='project'&&<button className="icon-button" aria-label="Progetto successivo" onClick={()=>step(1)}><CaretRight weight="light"/></button>}
    </div>
    <span className="sr-only" aria-live="polite">{announce}</span>
  </div>;
}
