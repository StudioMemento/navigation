import { photos } from './home-photos.mjs';

export function mediaAssets() {
  const files=new Map();
  for (const {url,file} of photos.values())files.set(url,file);
  return {
    name:'memento-first-view-media',
    generateBundle(){for(const [url,source] of files)this.emitFile({type:'asset',fileName:url.slice(1),source});},
    configureServer(server){server.middlewares.use((request,response,next)=>{
      const file=files.get(request.url?.split('?')[0]);
      if(!file)return next();
      response.setHeader('content-type','image/webp');response.end(file);
    });}
  };
}
