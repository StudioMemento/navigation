import React,{useEffect,useRef,useState} from 'react';
import {ArrowsOut,CaretLeft,CaretRight,X} from '@phosphor-icons/react';
import {asset} from './data';
import {Dots,useSwipe} from './Coverflow';

function ProjectBoard({project,index,expanded=false}) {
  const [image,title,,crop]=project.gallery[index];
  return <div className="chamfer"><div className={`frame-inner gallery-inner ${crop||''}`} key={index}>
    <img src={asset(image)} alt={`${project.title} — ${title.replaceAll('\n',' ')}`} loading={expanded?'eager':'lazy'} draggable="false"/>
    <div className="gallery-shade"/><h2>{title}</h2>
    {!expanded&&<span className="gallery-project-name">{project.title}</span>}
  </div></div>;
}

export function GalleryViewer({media,onClose}) {
  const {project}=media,[index,setIndex]=useState(media.index||0),dialog=useRef(null),stage=useRef(null);
  const select=next=>{
    const value=(next+project.gallery.length)%project.gallery.length;
    setIndex(value);media.onChange?.(value);
  };
  useSwipe(stage,n=>select(index+n));
  useEffect(()=>{
    const node=dialog.current,previous=document.activeElement,overflow=document.body.style.overflow;
    node.showModal();document.body.style.overflow='hidden';
    return()=>{node.close();document.body.style.overflow=overflow;previous?.focus?.({preventScroll:true})};
  },[]);
  return <dialog ref={dialog} className="media-dialog gallery-dialog" aria-label={`Tavole di ${project.title} — vista espansa`} onCancel={e=>{e.preventDefault();onClose()}} onKeyDown={e=>{
    if(e.key==='ArrowRight'){e.preventDefault();select(index+1)}
    if(e.key==='ArrowLeft'){e.preventDefault();select(index-1)}
    if(e.key==='Home'){e.preventDefault();select(0)}
    if(e.key==='End'){e.preventDefault();select(project.gallery.length-1)}
  }}>
    <div className="render-viewer">
      <button className="render-close icon-button" aria-label="Chiudi tavole" onClick={onClose}><X weight="light"/></button>
      <div ref={stage} className="gallery-stage render-stage" tabIndex={0} aria-label={`Tavola ${index+1}: ${project.gallery[index][2]}`}><ProjectBoard project={project} index={index} expanded/></div>
      <Dots items={project.gallery.map(([,title,chapter],i)=>({id:i,title:chapter||title.replaceAll('\n',' ')}))} index={index} onChange={select} label="Seleziona tavola"/>
      <span className="sr-only" aria-live="polite">{project.gallery[index][2]} · {index+1} di {project.gallery.length}</span>
    </div>
  </dialog>;
}

export default function Gallery({project,onExpand}) {
  const [index,setIndex]=useState(0),stage=useRef(null),strip=useRef(null),buttons=useRef([]);
  const items=project.gallery,[,title,chapter]=items[index];
  const panelId=`gallery-${project.id}`;
  const select=(next,focus=false)=>{
    const value=(next+items.length)%items.length;
    setIndex(value);
    if(focus)buttons.current[value]?.focus({preventScroll:true});
  };
  useSwipe(stage,n=>setIndex(i=>(i+n+items.length)%items.length));
  useEffect(()=>{
    const list=strip.current,button=buttons.current[index];
    if(!list||!button)return;
    list.scrollTo({left:button.offsetLeft-(list.clientWidth-button.clientWidth)/2,behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});
  },[index]);
  const keys=(e,focus=false)=>{
    let next;
    if(e.key==='ArrowRight')next=index+1;
    else if(e.key==='ArrowLeft')next=index-1;
    else if(e.key==='Home')next=0;
    else if(e.key==='End')next=items.length-1;
    if(next!==undefined){e.preventDefault();select(next,focus)}
  };
  return <section className="gallery-block content-width" aria-label={`Tavole di ${project.title}`}>
    <div ref={stage} id={panelId} className="gallery-stage" tabIndex={0} aria-label={`Tavola ${index+1}: ${chapter||title.replaceAll('\n',' ')}`} onKeyDown={e=>{if(e.target===e.currentTarget)keys(e)}}>
      <ProjectBoard project={project} index={index}/>
      <button className="expand-button icon-button" aria-label="Espandi tavole" onClick={()=>onExpand({type:'gallery',project,index,onChange:setIndex})}><ArrowsOut weight="light"/></button>
    </div>
    <div className="gallery-navigation" role="group" aria-label="Capitoli del progetto">
      <button className="icon-button" aria-label="Tavola precedente" onClick={()=>select(index-1)}><CaretLeft weight="light"/></button>
      <div className="thumbnail-strip" ref={strip}>
        {items.map(([src,heading,name,thumbnailCrop],i)=><button key={`${src}-${i}`} ref={el=>{buttons.current[i]=el}} className="gallery-thumbnail" aria-label={`Tavola ${i+1}: ${name||heading.replaceAll('\n',' ')}`} aria-controls={panelId} aria-pressed={index===i} onClick={()=>select(i)} onKeyDown={e=>keys(e,true)}>
          <span className={`thumbnail-image chamfer ${thumbnailCrop||''}`}><span className="frame-inner"><img src={asset(src)} alt="" loading="lazy" draggable="false"/></span></span>
          <span className="thumbnail-caption"><span>{String(i+1).padStart(2,'0')}</span>{name||`Tavola ${i+1}`}</span>
        </button>)}
      </div>
      <button className="icon-button" aria-label="Tavola successiva" onClick={()=>select(index+1)}><CaretRight weight="light"/></button>
    </div>
    <p className="sr-only" aria-live="polite">{chapter||`Tavola ${index+1}`} · {index+1} di {items.length}</p>
  </section>;
}
