import React,{useState,useEffect,useRef,useLayoutEffect,lazy,Suspense} from 'react';
import {CaretLeft,CaretRight as CaretUpRight,X,ArrowsOut,ArrowUpRight,Cube,ArrowClockwise,SlidersHorizontal} from '@phosphor-icons/react';
import {categories,projects,projectById,asset} from './data';
import {Coverflow} from './Coverflow';
import Gallery,{GalleryViewer} from './Gallery';
import VideoPlayer from './VideoPlayer';
const ModelViewer=lazy(()=>import('./ModelViewer'));
const readRoute=()=>{const m=location.pathname.match(/^\/progetti\/([^/]+)\/?$/);return m?{page:'project',id:decodeURIComponent(m[1])}:{page:'home'}};
const initialFilter=()=>categories.some(c=>c.id===new URLSearchParams(location.search).get('categoria'))?new URLSearchParams(location.search).get('categoria'):'all';
const reduced=()=>window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const scrollToEl=id=>document.getElementById(id)?.scrollIntoView({behavior:reduced()?'instant':'smooth',block:'start'});

function ModelBlock({project,active,setActive,onExpand}) {
  const id=`model-${project.id}`,[reset,setReset]=useState(0);
  return <section className="media-section content-width"><div className="block-caption"><h2>Ogni prospettiva.</h2><span>Studio 3D · demo</span></div><div className="chamfer model-frame"><div className="frame-inner">
    {active===id?<><Suspense fallback={<p className="media-loading">Preparazione del modello…</p>}><ModelViewer reset={reset}/></Suspense><div className="viewer-controls"><button onClick={()=>setReset(n=>n+1)} className="icon-button" aria-label="Ripristina vista 3D"><ArrowClockwise weight="light"/></button><button className="icon-button" aria-label="Espandi modello 3D" onClick={()=>{setActive(null);onExpand({type:'model',title:project.title})}}><ArrowsOut weight="light"/></button><button onClick={()=>setActive(null)} className="text-link">Esci</button></div><span className="orbit-hint">Trascina per ruotare</span></>:<><img src={asset('modello-3d')} alt="Studio di un flacone in 3D" loading="lazy"/><button className="media-activate" onClick={()=>{if(matchMedia('(max-width: 700px)').matches){setActive(null);onExpand({type:'model',title:project.title})}else setActive(id)}}><Cube weight="light"/><span>Esplora in 3D</span></button></>}
  </div></div></section>;
}

function ExperienceBlock({project,active,setActive,onExpand}) {
  const id=`experience-${project.id}`;
  return <section className="media-section content-width"><div className="block-caption"><h2>Entra nell’esperienza.</h2><span>Esperienza dimostrativa</span></div><div className="chamfer experience-frame"><div className="frame-inner">
    {active===id?<><iframe src="/experience.html" title="Esperienza interattiva dimostrativa"/><div className="viewer-controls"><a className="icon-button" href="/experience.html" target="_blank" rel="noreferrer" aria-label="Apri esperienza in un’altra scheda"><ArrowUpRight weight="light"/></a><button onClick={()=>setActive(null)} className="text-link">Torna al progetto</button></div></>:<><img src={asset('hero-fotografia')} loading="lazy" alt="Atmosfera della fragranza"/><button className="media-activate" onClick={()=>{if(matchMedia('(max-width:700px)').matches){setActive(null);onExpand({type:'experience',title:project.title})}else setActive(id)}}><ArrowUpRight weight="light"/><span>Esplora</span></button></>}
  </div></div></section>;
}

function ExpandedMedia({media,onClose}) {
  const ref=useRef(null),[reset,setReset]=useState(0);
  useEffect(()=>{const dialog=ref.current,previous=document.activeElement,overflow=document.body.style.overflow;dialog.showModal();document.body.style.overflow='hidden';return()=>{dialog.close();document.body.style.overflow=overflow;previous?.focus?.({preventScroll:true})}},[]);
  return <dialog className="media-dialog" aria-label={`${media.title} — media espanso`} ref={ref} onCancel={e=>{e.preventDefault();onClose()}}><div className="media-dialog-bar"><span>{media.title}</span><div>{media.type==='model'&&<button className="icon-button" aria-label="Ripristina vista 3D" onClick={()=>setReset(n=>n+1)}><ArrowClockwise weight="light"/></button>}<button className="text-link" onClick={onClose}>Esci <X weight="light"/></button></div></div><div className="expanded-content">
    {media.type==='image'&&<img src={asset(media.image)} alt={media.title}/>}
    {media.type==='model'&&<Suspense fallback={<p className="media-loading">Preparazione del modello…</p>}><ModelViewer reset={reset}/></Suspense>}
    {media.type==='experience'&&<iframe src="/experience.html" title="Esperienza interattiva dimostrativa"/>}
  </div></dialog>;
}

function ProjectSheet({project,onSelect,onClose,onExpand,active,setActive}) {
  const index=projects.indexOf(project),topRef=useRef(null);
  useEffect(()=>{topRef.current?.focus({preventScroll:true})},[]);
  const selector=locationName=><Coverflow items={projects} index={index} onChange={i=>onSelect(projects[i].id)} onActivate={()=>scrollToEl('project-content')} label={locationName}/>;
  return <article className="project-sheet" aria-label={`Progetto ${project.title}`}>
    <header className="project-topbar"><a href="/#progetti" onClick={e=>{e.preventDefault();onClose()}}><CaretLeft weight="light"/><span>Progetti</span></a><button className="icon-button" onClick={onClose} aria-label="Chiudi progetto"><X weight="light"/></button></header>
    <div className="project-intro"><div className="project-selector-band">{selector('Tutti i progetti')}</div><div className="project-title-band content-width"><h1 style={{'--title-scale':Math.min(.305,1.5/project.title.length)}} ref={topRef} tabIndex={-1}>{project.title}</h1></div></div>
    <div id="project-content" className="project-body" key={project.id}>
      <div className={`opening opening-${project.id}`}><div className="opening-visual"><img src={asset(project.opening)} alt={`${project.title}, immagine di apertura`} fetchPriority="high"/></div></div>
      <section className="project-intent content-width"><h2>{project.concept}</h2><div><p>{project.description}</p><span className="project-tags">{project.categories.map(id=>categories.find(c=>c.id===id).title).join(' / ')}</span></div></section>
      <Gallery key={project.id} project={project} onExpand={onExpand}/>
      {project.video&&<VideoPlayer project={project} active={active} setActive={setActive}/>}
      {project.model&&<ModelBlock project={project} active={active} setActive={setActive} onExpand={onExpand}/>}
      {project.experience&&<ExperienceBlock project={project} active={active} setActive={setActive} onExpand={onExpand}/>}
      <section className="loop-bridge" aria-label="Continua a esplorare"><div className="loop-heading content-width"><p>Un altro punto di vista.</p><a href="/#progetti" className="text-link" onClick={e=>{e.preventDefault();onClose()}}>Tutti i progetti <CaretUpRight weight="light"/></a></div>{selector('Continua con un progetto')}<div className="content-width loop-title" aria-hidden="true">{project.title}</div></section>
    </div>
  </article>;
}

function Home({category,setCategory,filter,onFilter,onOpen}) {
  const [filtersOpen,setFiltersOpen]=useState(false);
  const current=categories[category],filtered=filter==='all'?projects:projects.filter(p=>p.categories.includes(filter));
  return <>
    <section className="category-hero" aria-label="Aree del portfolio"><h1 className={`category-title ${current.title.length>6?'long':''}`} key={current.id}>{current.title}</h1><Coverflow items={categories} index={category} onChange={setCategory} onActivate={item=>onFilter(item.id,true)} variant="category" label="Categorie"/><div className="hero-bottom"><a className="under-link" href="/#progetti" onClick={e=>{e.preventDefault();onFilter('all',true)}}>Tutti i progetti</a></div></section>
    <section className="catalog content-width" id="progetti" aria-labelledby="catalog-title"><div className="catalog-heading"><h2 id="catalog-title" tabIndex={-1}>Progetti</h2><div className="catalog-actions"><button className="catalog-filter-toggle" aria-label="Mostra filtri progetti" aria-expanded={filtersOpen} aria-controls="catalog-filters" onClick={()=>setFiltersOpen(value=>!value)}>{filter!=='all'&&<span>{categories.find(c=>c.id===filter)?.title}</span>}<SlidersHorizontal weight="light"/></button><a className="quiet-link" href="#" aria-label="Torna alle categorie" onClick={e=>{e.preventDefault();window.scrollTo({top:0,behavior:reduced()?'instant':'smooth'})}}><CaretUpRight weight="light"/></a></div></div>
      <div id="catalog-filters" className="filters" hidden={!filtersOpen} role="group" aria-label="Filtra progetti">{[{id:'all',title:'Tutti'},...categories].map(c=><button key={c.id} className={filter===c.id?'selected':''} aria-pressed={filter===c.id} onClick={()=>onFilter(c.id,false)}>{c.title}</button>)}<span className="results-count" aria-live="polite">{filtered.length.toString().padStart(2,'0')}</span></div>
      <div className="project-grid">{filtered.map(p=><a className={`project-tile ${p.wide?'wide':''} ${p.tall?'tall':''}`} key={p.id} id={`tile-${p.id}`} href={`/progetti/${p.id}`} aria-label={`Apri progetto ${p.title}`} onClick={e=>{if(e.metaKey||e.ctrlKey||e.shiftKey)return;e.preventDefault();onOpen(p.id)}}><div className="chamfer"><div className="frame-inner"><img src={asset(p.cover)} alt="" loading="lazy" decoding="async"/><div className="tile-shade"/><span className="tile-title">{p.title}</span><CaretUpRight className="open-caret" weight="light"/></div></div></a>)}</div>
      <p className="demo-note">Selezione dimostrativa · immagini e contenuti provvisori.</p>
    </section>
    <footer className="portfolio-footer content-width"><p>Il prossimo progetto.</p><a href="mailto:info@mementostudio.it">Parliamone <ArrowUpRight weight="light"/></a><div><a href="https://mementoservizi.vercel.app/" target="_blank" rel="noreferrer">Esplora i servizi <ArrowUpRight weight="light"/></a><button onClick={()=>window.scrollTo({top:0,behavior:reduced()?'instant':'smooth'})}>Torna all’inizio</button></div></footer>
  </>;
}

export function App() {
  const [route,setRoute]=useState(readRoute),[category,setCategory]=useState(3),[filter,setFilter]=useState(initialFilter),[media,setMedia]=useState(null),[active,setActive]=useState(null);
  const restore=useRef(null),context=useRef(history.state?.returnContext||null),project=projectById(route.id);
  useEffect(()=>{history.scrollRestoration='manual';const pop=()=>{setMedia(null);setActive(null);const next=readRoute();if(next.page==='home'){const ctx=history.state?.context||context.current;if(ctx){setFilter(ctx.filter);setCategory(ctx.category);restore.current=ctx;}else restore.current={anchor:location.hash==='#progetti'};}setRoute(next)};window.addEventListener('popstate',pop);return()=>window.removeEventListener('popstate',pop)},[]);
  useLayoutEffect(()=>{if(route.page==='project'){window.scrollTo({top:0,behavior:'instant'});document.title=`${project?.title||'Progetto'} — Memento`;}else{document.title='Memento — Portfolio';const ctx=restore.current;restore.current=null;requestAnimationFrame(()=>{if(ctx?.anchor||(!ctx&&location.hash==='#progetti'))scrollToEl('progetti');else if(ctx){window.scrollTo({top:ctx.scrollY||0,behavior:'instant'});document.getElementById(`tile-${ctx.focusId}`)?.focus({preventScroll:true})}})}},[route]);
  const onFilter=(id,scroll)=>{setFilter(id);history.replaceState({kind:'home'},'',`/${id!=='all'?`?categoria=${id}`:''}#progetti`);if(scroll)requestAnimationFrame(()=>{scrollToEl('progetti');document.getElementById('catalog-title')?.focus({preventScroll:true})});};
  const open=id=>{context.current={filter,category,scrollY:window.scrollY,focusId:id};history.replaceState({kind:'home',context:context.current},'');history.pushState({kind:'project',fromCatalog:true,returnContext:context.current},'',`/progetti/${id}`);setRoute({page:'project',id});};
  const select=id=>{setActive(null);setMedia(null);history.replaceState({...history.state,kind:'project'},'',`/progetti/${id}`);setRoute({page:'project',id});};
  const close=()=>{setActive(null);setMedia(null);if(history.state?.fromCatalog){history.back()}else{restore.current={anchor:true};history.replaceState({kind:'home'},'',`/${filter!=='all'?`?categoria=${filter}`:''}#progetti`);setRoute({page:'home'})}};
  useEffect(()=>{const escape=e=>{if(e.defaultPrevented||document.fullscreenElement)return;if(e.key==='Escape'&&route.page==='project'&&!media){if(active)setActive(null);else close()}};window.addEventListener('keydown',escape);return()=>window.removeEventListener('keydown',escape)},[route,media,active,filter]);
  const expand=m=>{setActive(null);setMedia(m)};
  return <main data-memento-root><a className="skip-link" href={route.page==='home'?'#progetti':'#project-content'}>Vai al contenuto</a>
    <div hidden={route.page!=='home'}><Home category={category} setCategory={setCategory} filter={filter} onFilter={onFilter} onOpen={open}/></div>
    {route.page==='project'&&(project?<ProjectSheet project={project} onSelect={select} onClose={close} onExpand={expand} active={active} setActive={setActive}/>:<div className="missing-project content-width"><h1>Progetto non disponibile.</h1><button className="under-link" onClick={close}>Torna ai progetti</button></div>)}
    {media&&(media.type==='gallery'?<GalleryViewer media={media} onClose={()=>setMedia(null)}/>:<ExpandedMedia media={media} onClose={()=>setMedia(null)}/>)}
  </main>;
}
