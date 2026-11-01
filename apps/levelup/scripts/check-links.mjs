import { experiences, START_URL } from '../src/content.js';
import {writeFile,mkdir}from'node:fs/promises';import{fileURLToPath}from'node:url';import{resolve,dirname}from'node:path';
const root=resolve(dirname(fileURLToPath(import.meta.url)),'..');
const results=await Promise.all([...experiences,{id:'start',url:START_URL}].map(async e=>{try{const r=await fetch(e.url,{signal:AbortSignal.timeout(20000)});const body=await r.text();const xfo=r.headers.get('x-frame-options'),csp=r.headers.get('content-security-policy');const blocked=e.id!=='start'&&(!!xfo||!!csp?.match(/frame-ancestors\s+(?!\*)/));return{id:e.id,url:e.url,finalUrl:r.url,status:r.status,html:/<!doctype|<html/i.test(body),xFrameOptions:xfo,contentSecurityPolicy:csp,embeddingBlocked:blocked};}catch(error){return{id:e.id,url:e.url,error:error.message};}}));
await mkdir(resolve(root,'qa'),{recursive:true});await writeFile(resolve(root,'qa/link-check.json'),JSON.stringify({checkedAt:new Date().toISOString(),results},null,2)+'\n');
for(const r of results)console.log(`${r.id}: ${r.status??r.error}${r.embeddingBlocked?' — framing header review required':''}`);
if(results.some(r=>r.status!==200||!r.html||r.embeddingBlocked)){process.exitCode=1;}else console.log('LEVELUP_LINKS_OK — 10 demos + Start, HTML responses and framing headers checked');
