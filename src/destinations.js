// One place to connect the next Memento pages when they are published.
export const DESTINATIONS = [
 {slug:'home',name:'Home',description:'Scegli una direzione.',kind:'home'},
 {slug:'studio',name:'Studio',description:'Dentro il mondo Memento.',kind:'draft',eyebrow:'LO SPAZIO, LE PERSONE, LE IDEE',headline:'Dentro Memento.',intro:'Il luogo dove le idee prendono forma.',notice:'Il tour virtuale dello studio è in sviluppo. Questa sarà la porta per esplorare il nostro spazio in 3D.',links:[['portfolio','Esplora i progetti'],['start','Cominciamo']]},
 {slug:'servizi',name:'Servizi',description:'Le possibilità, per il tuo brand.',kind:'embed',url:'https://mementoservizi.vercel.app/'},
 {slug:'portfolio',name:'Portfolio',description:'Le idee diventano reali.',kind:'embed',url:'https://mementoportfolio.vercel.app/'},
 {slug:'level-up',name:'Level Up',description:'Il tuo prossimo passo.',kind:'draft',eyebrow:'DAL PRIMO SGUARDO AL PROSSIMO PASSO',headline:'Alza il livello.',intro:'Hai visto qualcosa che ti ha fatto fermare?',notice:'Stiamo costruendo il percorso dedicato alle campagne Memento: contenuti, esperienze e un primo contatto. Intanto, scopri quello che possiamo creare.',links:[['servizi','Scopri le possibilità'],['portfolio','Esplora i progetti'],['start','Cominciamo']]},
 {slug:'start',name:'Start',description:'Tutto comincia da un’idea.',kind:'draft',eyebrow:'IL PRIMO PASSO, INSIEME',headline:'Pronto a cominciare?',intro:'Raccontaci cosa hai in mente.',notice:'La pagina contatti è in sviluppo. Qui potrai scegliere il tuo canale e scriverci attraverso il modulo di contatto.',links:[['servizi','Esplora i servizi'],['portfolio','Lasciati ispirare']]}
];

export const SECTIONS = DESTINATIONS.map(page=>page.name);
const aliases = {progetti:'portfolio',contatti:'start',levelup:'level-up'};
export function destinationIndex(slug){
 const key=aliases[slug]??slug;
 return DESTINATIONS.findIndex(page=>page.slug===key);
}

export function readRoute(hash='',pathname='/'){
 let value;
 try { value=decodeURIComponent(hash.replace(/^#/, '')).toLowerCase(); }
 catch { return {view:'home',index:0}; }
 // Canonical page URLs: #/servizi. Home selection: #/home/servizi.
 // V06 fragments (#progetti, #contatti...) continue to select their slide.
 if(!value && pathname!=='/') value=pathname;
 const parts=value.replace(/^\/+|\/+$/g,'').split('/');
 if(parts[0]==='home') return {view:'home',index:Math.max(0,destinationIndex(parts[1]??'home'))};
 const index=destinationIndex(parts[0]);
 if(index<0) return {view:'home',index:0};
 return {view:value.startsWith('/')&&index>0?'page':'home',index};
}

export function routeHash(view,index){
 const page=DESTINATIONS[index]??DESTINATIONS[0];
 return view==='page'&&index>0?`#/${page.slug}`:`#/home${index>0?'/'+page.slug:''}`;
}
