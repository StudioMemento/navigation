import React,{useEffect,useRef,useState} from 'react';
import {Play,Pause,ArrowsOut,ArrowsIn,SpeakerSlash,SpeakerHigh,ArrowClockwise} from '@phosphor-icons/react';
import {asset} from './data';

const time=value=>`${Math.floor((value||0)/60)}:${String(Math.floor((value||0)%60)).padStart(2,'0')}`;

export default function VideoPlayer({project,active,setActive}) {
  const video=useRef(null),player=useRef(null),fullscreenButton=useRef(null),id=`video-${project.id}`;
  const [playing,setPlaying]=useState(false),[ended,setEnded]=useState(false),[buffering,setBuffering]=useState(false);
  const [duration,setDuration]=useState(0),[position,setPosition]=useState(0),[muted,setMuted]=useState(true);
  const [error,setError]=useState(''),[fullscreen,setFullscreen]=useState(false),[expanded,setExpanded]=useState(false);
  const film=project.video;

  useEffect(()=>{if(active!==id)video.current?.pause()},[active,id]);
  useEffect(()=>{
    const v=video.current,node=player.current;
    const observer=new IntersectionObserver(([entry])=>{if(!entry.isIntersecting)v.pause()},{threshold:.1});
    observer.observe(node);
    const hide=()=>{if(document.hidden)v.pause()};
    const resize=()=>setFullscreen(document.fullscreenElement===node);
    document.addEventListener('visibilitychange',hide);
    document.addEventListener('fullscreenchange',resize);
    return()=>{v.pause();observer.disconnect();document.removeEventListener('visibilitychange',hide);document.removeEventListener('fullscreenchange',resize)};
  },[]);
  useEffect(()=>{
    if(!expanded)return;
    const previous=document.activeElement,overflow=document.body.style.overflow;
    document.body.style.overflow='hidden';fullscreenButton.current?.focus();
    const escape=e=>{
      if(e.key==='Escape'){e.preventDefault();e.stopPropagation();setExpanded(false)}
      if(e.key==='Tab'){
        const controls=[...player.current.querySelectorAll('button:not([disabled]),input:not([disabled])')];
        const first=controls[0],last=controls.at(-1);
        if(e.shiftKey&&document.activeElement===first){e.preventDefault();last?.focus()}
        if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first?.focus()}
      }
    };
    window.addEventListener('keydown',escape,true);
    return()=>{document.body.style.overflow=overflow;window.removeEventListener('keydown',escape,true);previous?.focus?.({preventScroll:true})};
  },[expanded]);
  const toggle=async()=>{
    const v=video.current;
    if(!v.paused){v.pause();return}
    if(v.ended)v.currentTime=0;
    setError('');setActive(id);
    try{await v.play()}catch{setError('La riproduzione non è disponibile. Riprova.')}
  };
  const seek=value=>{
    const v=video.current;if(!Number.isFinite(v.duration))return;
    const next=Math.max(0,Math.min(v.duration,Number(value)));
    v.currentTime=next;setPosition(next);setEnded(next>=v.duration);
  };
  const toggleFullscreen=async()=>{
    if(expanded){setExpanded(false);return}
    try{
      if(document.fullscreenElement){await document.exitFullscreen();return}
      if(player.current.requestFullscreen){await player.current.requestFullscreen();return}
      if(video.current.webkitEnterFullscreen){video.current.webkitEnterFullscreen();return}
    }catch{/* Older browsers and restricted embeds use the same player in an expanded view. */}
    setExpanded(true);
  };
  const keyboard=e=>{
    if(e.target.closest('button,input'))return;
    if(e.key===' '||e.key.toLowerCase()==='k'){e.preventDefault();toggle()}
    if(e.key==='ArrowRight'){e.preventDefault();seek(video.current.currentTime+5)}
    if(e.key==='ArrowLeft'){e.preventDefault();seek(video.current.currentTime-5)}
    if(e.key.toLowerCase()==='f'){e.preventDefault();toggleFullscreen()}
  };
  return <section className="media-section video-section content-width" aria-label={`Film di ${project.title}`}>
    <div className="block-caption"><h2>{film.heading}</h2></div>
    <div ref={player} className={`video-player ${expanded?'is-expanded':''}`} tabIndex={0} role={expanded?'dialog':'group'} aria-modal={expanded||undefined} aria-label={`Player video ${project.title}`} onKeyDown={keyboard}>
      <div className="chamfer video-frame"><div className="frame-inner">
        <div className="video-stage">
          <video ref={video} src={film.src} poster={asset(film.poster)} playsInline muted={muted} preload="metadata" onClick={toggle}
            onLoadedMetadata={e=>setDuration(Number.isFinite(e.currentTarget.duration)?e.currentTarget.duration:0)}
            onDurationChange={e=>setDuration(Number.isFinite(e.currentTarget.duration)?e.currentTarget.duration:0)}
            onTimeUpdate={e=>setPosition(e.currentTarget.currentTime)}
            onPlay={()=>{setPlaying(true);setEnded(false);setActive(id)}} onPlaying={()=>setBuffering(false)}
            onPause={()=>{setPlaying(false);setBuffering(false)}} onEnded={()=>{setPlaying(false);setEnded(true)}}
            onWaiting={()=>setBuffering(true)} onSeeked={()=>setBuffering(false)} onError={()=>setError('Video non disponibile. Riprova.')}
            aria-label={`Film dimostrativo di ${project.title}${film.hasAudio?'':', senza audio'}`}/>
          {!playing&&!error&&<button className="video-play-overlay" aria-label={ended?`Rivedi il film di ${project.title}`:`Riproduci il film di ${project.title}`} onClick={toggle}>{ended?<ArrowClockwise weight="light"/>:<Play weight="fill"/>}</button>}
          {buffering&&playing&&<span className="video-loading" role="status">Caricamento…</span>}
          {error&&<div className="video-error" role="alert"><p>{error}</p><button className="under-link" onClick={()=>{setError('');video.current.load();toggle()}}>Riprova</button></div>}
        </div>
        <div className="video-controls">
          <button className="icon-button" aria-label={playing?'Pausa':'Riproduci'} onClick={toggle}>{playing?<Pause weight="fill"/>:<Play weight="fill"/>}</button>
          <input className="video-timeline" type="range" min="0" max={duration||1} step="0.1" value={position} disabled={!duration||!!error} aria-label="Posizione del video" aria-valuetext={`${time(position)} di ${time(duration)}`} style={{'--progress':`${duration?position/duration*100:0}%`}} onChange={e=>seek(e.target.value)}/>
          <output className="video-time" aria-live="off">{time(position)} <span>/ {duration?time(duration):'–:–'}</span></output>
          {film.hasAudio?<button className="icon-button" aria-label={muted?'Attiva audio':'Disattiva audio'} onClick={()=>setMuted(m=>!m)}>{muted?<SpeakerSlash weight="light"/>:<SpeakerHigh weight="light"/>}</button>:<span className="silent-indicator" role="img" aria-label="Video senza audio" title="Video senza audio"><SpeakerSlash weight="light"/></span>}
          <button ref={fullscreenButton} className="icon-button" aria-label={fullscreen||expanded?'Esci dallo schermo intero':'Schermo intero'} onClick={toggleFullscreen}>{fullscreen||expanded?<ArrowsIn weight="light"/>:<ArrowsOut weight="light"/>}</button>
        </div>
      </div></div>
    </div>
    <div className="video-caption"><span>{project.title} — film</span><span>Studio motion · demo</span></div>
  </section>;
}
