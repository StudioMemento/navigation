import {build} from 'esbuild';
await build({entryPoints:['dist/main.js'],outfile:'dist/app.bundle.js',bundle:true,minify:true,format:'esm',target:['es2022'],legalComments:'eof',logLevel:'info'});
