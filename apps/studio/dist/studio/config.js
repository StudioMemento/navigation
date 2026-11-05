export const SHADERS = [
 {id:0,key:'carbon',name:'Carbone vivo',detail:'Venature di luce',accent:'#d3936f'},
 {id:1,key:'cel',name:'Cel studio',detail:'Facce, inchiostro, retino',accent:'#e9cba6'},
 {id:2,key:'voxel',name:'Voxel noir',detail:'Cubi in risonanza',accent:'#c6b5a5'},
 {id:3,key:'shards',name:'Frammenti',detail:'Scomposizione ciclica',accent:'#efc7ab'},
 {id:4,key:'nebula',name:'Nebulosa',detail:'Materia in particelle',accent:'#bdcddd'},
 {id:5,key:'glitch',name:'Glitch',detail:'Interferenze digitali',accent:'#b0e4e5'},
 {id:6,key:'hologram',name:'Ologramma',detail:'Scansione luminosa',accent:'#80cad6'},
 {id:7,key:'blueprint',name:'Blueprint',detail:'Disegno in costruzione',accent:'#7eacdf'},
 {id:8,key:'contour',name:'Topografia',detail:'Onde di livello',accent:'#dbc9ab'},
 {id:9,key:'ink',name:'Inchiostro',detail:'Tratti in espansione',accent:'#e4e1d8'},
 {id:10,key:'liquid',name:'Cromo fluido',detail:'Riflessi in movimento',accent:'#bbc9d8'},
 {id:11,key:'aurora',name:'Aurora',detail:'Flussi iridescenti',accent:'#b5a5e0'},
 {id:12,key:'ember',name:'Braci',detail:'Fratture incandescenti',accent:'#ff996b'},
 {id:13,key:'crystal',name:'Cristallo',detail:'Risonanza prismatica',accent:'#bedde4'},
 {id:14,key:'xray',name:'Raggi X',detail:'Strutture traslucide',accent:'#9dc8b8'}
];
export const VIEWS=[
 {id:'overview',name:'Esterno',title:'Lo spazio delle idee.',copy:'Uno studio. Infinite forme.',position:[7.682,5.498,8.664],target:[-.05,1.12,-.55],fov:28},
 {id:'workspace',name:'Postazioni',title:'Due visioni. Uno studio.',copy:'Idee che si incontrano, ogni giorno.',position:[.37,1.48,-.62],target:[.37,1.12,-2.60],fov:78},
 {id:'gian',name:'Gian',title:'Workstation Gian',copy:'Dall’intuizione alla forma.',position:[1.25,1.48,-.94],target:[1.42,1.05,-2.40],fov:76},
 {id:'nuru',name:'Nuru',title:'Workstation Nuru',copy:'Un altro sguardo. Nuove possibilità.',position:[-.5,1.48,-1.55],target:[-.85,1.05,-2.42],fov:76},
 {id:'lounge',name:'Salotto',title:'Lasciamo spazio alle idee.',copy:'Le conversazioni migliori iniziano qui.',position:[.45,1.44,-.42],target:[1.57,.62,1.08],fov:78},
 {id:'project',name:'Progetto',title:'Le idee prendono forma.',copy:'Prove, materia, nuove prospettive.',position:[-.58,1.48,.11],target:[-1.44,1.16,-.93],fov:78},
 {id:'coffee',name:'Caffè',title:'Una pausa. Un nuovo inizio.',copy:'Anche il prossimo progetto parte da qui.',position:[-2.04,1.48,.37],target:[-2.68,1.03,1.32],fov:78}
];
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
