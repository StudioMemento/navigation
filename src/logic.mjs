import {PAGES} from './config.mjs';
export const wrap=value=>((value%PAGES.length)+PAGES.length)%PAGES.length;
export function distance(index,active){
  let d=wrap(index)-wrap(active);
  if(d>2)d-=PAGES.length;
  if(d< -2)d+=PAGES.length;
  return d;
}
export const findPage=id=>PAGES.find(p=>p.id===id||p.slug===id);
const contextKeys=['from','experience','idea','project','service','bundle','goal'];
function safeQuery(input){
  const q=new URLSearchParams();
  for(const [k,v] of new URLSearchParams(input))if(contextKeys.includes(k)&&v.length<=2000)q.set(k,v);
  return q.toString();
}
function safeAnchor(hash){return /^#[a-zA-Z0-9_\-/?.=&%]*$/.test(hash)&&hash.length<512?hash:'';}
export function readLocation(input){
  const u=new URL(input,'https://mementonav.vercel.app');
  const slug=u.pathname.split('/').filter(Boolean)[0];
  const page=findPage(slug)||findPage(u.hash.slice(1).replace(/-content$/,''))||PAGES[0];
  return {page,index:PAGES.indexOf(page),query:safeQuery(u.searchParams),anchor:findPage(slug)?safeAnchor(u.hash):''};
}
export function pageAddress(page,query='',anchor=''){
  const u=new URL(page.publicURL);u.search=safeQuery(query);u.hash=safeAnchor(anchor);return u.href;
}
