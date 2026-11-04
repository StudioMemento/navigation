import {PAGES, SETTINGS} from './config.mjs';
export const wrap = value => ((value % PAGES.length) + PAGES.length) % PAGES.length;
export function distance(index, active) {
  let d=wrap(index)-wrap(active);
  if(d>2)d-=PAGES.length;
  if(d< -2)d+=PAGES.length;
  return d;
}
export function findPage(id) { return PAGES.find(p=>p.id===id||p.slug===id); }
export function readLocation(input) {
  const u=new URL(input,'https://mementonav.vercel.app');
  const hash=u.hash.slice(1).replace(/-content$/,'');
  const slug=u.pathname.split('/').filter(Boolean)[0];
  const page=findPage(slug)||findPage(hash)||PAGES[0];
  const query=new URLSearchParams();
  for(const [k,v] of u.searchParams) if(['from','experience','idea','project','service','bundle','goal'].includes(k)&&v.length<=2000)query.set(k,v);
  return {page,index:PAGES.indexOf(page),query:query.toString(),anchor:slug&&u.hash&&/^#[a-zA-Z0-9_\-/?.=&%]*$/.test(u.hash)&&u.hash.length<512?u.hash:'',open:!!findPage(slug)||u.hash.endsWith('-content')};
}
export function embedAddress(page, query='', anchor='') {
  const u=new URL(page.embedURL);
  for(const [k,v] of new URLSearchParams(query))if(['from','experience','idea','project','service','bundle','goal'].includes(k)&&v.length<=2000)u.searchParams.set(k,v);
  u.searchParams.set('mementoEmbed','1');
  if(/^#[a-zA-Z0-9_\-/?.=&%]*$/.test(anchor)&&anchor.length<512)u.hash=anchor;
  return u.href;
}
export function validEnvelope(event, record) {
  const d=event?.data;
  return Boolean(record&&event.source===record.source&&event.origin===record.origin&&d?.channel===SETTINGS.bridgeChannel&&d.version===SETTINGS.bridgeVersion&&d.station===record.page.id&&d.sessionId===record.sessionId&&typeof d.type==='string'&&d.payload&&typeof d.payload==='object'&&!Array.isArray(d.payload));
}
export function validLegacyEnvelope(event, record) {
  const d=event?.data;
  return Boolean(record&&event.source===record.source&&event.origin===record.origin&&d?.channel==='memento:tide'&&d.version===1&&d.stageId===record.stageId&&d.sessionId===record.sessionId&&typeof d.type==='string'&&d.payload&&typeof d.payload==='object'&&!Array.isArray(d.payload));
}
