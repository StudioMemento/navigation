import test from 'node:test';
import assert from 'node:assert/strict';
import http from 'node:http';
import {createPreviewServer,resolvePublicPath} from './serve.mjs';

test('The static preview confines all paths to public',()=>{
  for(const path of ['/../package.json','/%2e%2e/package.json','/src/../app.js','/.git/config','/%5c..%5cpackage.json','/%ZZ'])assert.equal(resolvePublicPath(path),null,path);
  assert.ok(resolvePublicPath('/services/assets/fonts/InterVariable.woff2'));
});
test('Static preview matches Services, asset, redirect and missing-file behavior',async()=>{
  const server=createPreviewServer();await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
  const port=server.address().port;
  async function request(route,method='GET'){return new Promise((resolve,reject)=>{const req=http.request({hostname:'127.0.0.1',port,path:route,method},res=>{const chunks=[];res.on('data',chunk=>chunks.push(chunk));res.on('end',()=>resolve({status:res.statusCode,headers:res.headers,body:Buffer.concat(chunks)}));});req.on('error',reject);req.end();});}
  try{
    const home=await request('/');assert.equal(home.status,200);assert.match(home.body.toString(),/Memento|MEMENTO/);
    const services=await request('/services/');assert.equal(services.status,307);assert.equal(services.headers.location,'https://mementoservizi.vercel.app/');
    const font=await request('/fonts/InterVariable.woff2','HEAD');assert.equal(font.status,200);assert.equal(font.headers['content-type'],'font/woff2');assert.equal(font.body.length,0);
    const glb=await request('/world_v008/optimized/environment.glb');assert.equal(glb.status,200);assert.equal(glb.headers['content-type'],'model/gltf-binary');assert.equal(glb.body.readUInt32LE(0),0x46546c67);
    const studio=await request('/studio');assert.equal(studio.status,307);assert.equal(studio.headers.location,'https://mementostudio.vercel.app/');
    assert.equal((await request('/services')).status,307);
    assert.equal((await request('/does-not-exist.js')).status,404);
    assert.equal((await request('/%2e%2e/package.json')).status,403);
    assert.equal((await request('/','POST')).status,405);
  }finally{await new Promise(resolve=>server.close(resolve));}
});
