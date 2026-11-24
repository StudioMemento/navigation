import {presets,defaults} from './atlas/presets.js';
export const SHADERS = presets.map(p=>({id:p.mode,key:p.id,name:p.name,accent:p.accent,values:defaults(p),source:'atlas'}));
SHADERS.find(p=>p.key==='graphite').values={a:1,b:.49,c:.2,exposure:1,emission:1.1};
SHADERS.push(
 {id:23,key:'copper-etch',name:'Copper etching',accent:'#e6a275',values:{a:.65,b:.5,c:.35,exposure:1,emission:1.1}},
 {id:24,key:'cyanotype',name:'Cyanotype',accent:'#76b7e8',values:{a:.7,b:.6,c:.25,exposure:1,emission:1.1}},
 {id:25,key:'pearl',name:'Iridescent porcelain',accent:'#d1bdf0',values:{a:.65,b:.5,c:.4,exposure:1,emission:1.2}},
 {id:26,key:'halftone-noir',name:'Halftone noir',accent:'#d9d3c7',values:{a:4,b:.6,c:.7,exposure:1,emission:1.1}},
 {id:27,key:'titanium',name:'Brushed titanium',accent:'#c5d1df',values:{a:.6,b:.65,c:.35,exposure:1,emission:1.2}},
 {id:28,key:'silver-relief',name:'Silver relief',accent:'#c6b7a7',values:{a:.7,b:.5,c:.35,exposure:1,emission:1.1}}
);
export const shaderById=Object.fromEntries(SHADERS.map(s=>[s.id,s]));
export {CINEMATIC_SHOTS as VIEWS} from './shots.js';
export const EYE_HEIGHT=1.48;
export const MATERIALS={
 ARCHITECTURE:{color:0x38383a,roughness:.86,metalness:.10},FURNITURE:{color:0x343538,roughness:.57,metalness:.32},
 FOLIAGE:{color:0x353c33,roughness:.76,metalness:.06},HARDWARE:{color:0x34383d,roughness:.35,metalness:.66},
 LIGHTING:{color:0x353332,roughness:.38,metalness:.58},SCREEN:{color:0x111519,roughness:.20,metalness:.42},
 POLYMER:{color:0x24272b,roughness:.48,metalness:.18},TEXTILE:{color:0x444145,roughness:.92,metalness:.04}
};
export const LABELS={DYSON:'Dyson',SOFTBOX1:'Softbox',LAMPADA_SALOTTO:'Lampada',LAMPADA_SHELF:'Lampada',LAMPADA_SALE:'Luce bar',LUCI_SOFFITTO:'Luci soffitto',TV_55:'TV',DESK_GIAN:'Postazione Gian',DESK_NURU:'Postazione Nuru',POLTRONA_ONE:'Poltrona',POLTRONA_TWO:'Poltrona',TAVOLO_SALOTTO:'Tavolino',COFFE_MACHINE:'Caffè',BANCO_CAFFE:'Angolo caffè',SHELF:'Libreria',TAVOLO_DISPENSA:'Zona progetto'};
export function objectLabel(name){if(LABELS[name])return LABELS[name];if(/DISPLAY|ULTRAWIDE/.test(name))return 'Monitor';if(/CHAIR|SEDIA/.test(name))return 'Sedia';if(/PLANT|PIANTINA/.test(name))return 'Pianta';if(/PC_/.test(name))return 'Workstation';if(/KEYBOARD/.test(name))return 'Tastiera';return 'Dettaglio';}
export const ease=t=>t*t*t*(t*(t*6-15)+10);
export const damp=(a,b,s,dt)=>a+(b-a)*(1-Math.exp(-s*dt));
export function dysonAngle(seconds){return -Math.PI*.5*Math.cos(seconds*Math.PI/18);}
