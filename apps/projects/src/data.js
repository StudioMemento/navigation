export const asset = name => `/assets/${name}.webp`;
export const categories = [
  {id:'web',title:'WEB',description:'Spazi digitali da esplorare.',image:'hero-web'},
  {id:'3d',title:'3D',description:'Dall’idea, alla materia.',image:'hero-3d'},
  {id:'video',title:'VIDEO',description:'Immagini che si muovono.',image:'hero-video'},
  {id:'visual',title:'VISUAL',description:'Immagini, materia e luce.',image:'foto-prodotti'},
  {id:'grafica',title:'GRAFICA',description:'Forma alle idee.',image:'hero-stampa'},
  {id:'branding',title:'BRANDING',description:'Un’identità che lascia il segno.',image:'hero-branding'},
];
export const projects = [
  {id:'auren',title:'Auren',categories:['visual','3d','video','web'],cover:'foto-prodotti',opening:'foto-prodotti',wide:true,concept:'L’essenza.\nIn ogni dettaglio.',description:'Una fragranza immaginaria, raccontata attraverso il vetro, la luce e il movimento.',gallery:[['foto-prodotti','Materia.\nLuce.','Identità'],['foto-prodotti','Materia.\nLuce.\nCarattere.','Dettagli','gallery-macro'],['render-animazione','Ogni parte.\nUn insieme.','Struttura'],['foto-creativa','La forma\ndell’essenza.','Ricerca'],['hero-fotografia','Un’altra\natmosfera.','Atmosfera']],video:{src:'/assets/studio-motion.mp4',poster:'hero-fotografia',heading:'Dentro l’aura.',hasAudio:false},model:true,experience:true},
  {id:'forma',title:'Forma',categories:['3d','visual'],cover:'hero-3d',opening:'hero-3d',tall:true,concept:'Proporzioni.\nSensazioni.',description:'Uno studio di prodotto tra superfici morbide, volumi e luce.',gallery:[['hero-3d','Una forma.\nMolti punti di vista.','Forma'],['configuratore','Da guardare.\nDa esplorare.','Interazione']]},
  {id:'habitat',title:'Habitat',categories:['visual','web'],cover:'foto-spazi',opening:'foto-spazi',concept:'Lo spazio.\nDa vivere.',description:'Un racconto visivo di ambienti, materiali e atmosfere.',gallery:[['foto-spazi','Luce\nabitata.','Spazi'],['hero-web','Lo spazio\ndiventa digitale.','Digitale']]},
  {id:'tavola',title:'Tavola',categories:['visual','web'],cover:'foto-food',opening:'foto-food',concept:'Il gusto.\nA prima vista.',description:'Fotografia e presenza digitale per un’esperienza dedicata al food.',gallery:[['foto-food','Il dettaglio\nche invita.','Food'],['menu-digitale','Scoprire.\nScegliere.','Menu']]},
  {id:'etere',title:'Etere',categories:['3d','video','visual'],cover:'foto-creativa',opening:'foto-creativa',concept:'Una forma.\nNessun confine.',description:'Uno studio visivo di materia, movimento e riflessi.',gallery:[['foto-creativa','Materia\nin movimento.','Materia'],['hero-fotografia','Il colore\ndella luce.','Luce']]},
  {id:'segno',title:'Segno',categories:['branding','grafica'],cover:'b-identita',opening:'b-identita',concept:'Un’identità.\nOgni giorno.',description:'Un sistema visivo immaginario, dal primo segno agli oggetti quotidiani.',gallery:[['b-identita','Il segno\ndiventa sistema.','Sistema'],['hero-branding','La stessa\nidentità.','Identità'],['branding','Ogni punto\ndi contatto.','Applicazioni']]},
  {id:'spazio',title:'Spazio',categories:['web','3d'],cover:'hero-web',opening:'hero-web',wide:true,concept:'Un luogo.\nAnche digitale.',description:'Un percorso dimostrativo per scoprire uno spazio attraverso lo schermo.',gallery:[['hero-web','Dentro\nl’esperienza.','Digitale'],['foto-spazi','Un invito\na restare.','Spazi']]},
  {id:'frame',title:'Frame',categories:['video','grafica'],cover:'hero-video',opening:'hero-video',concept:'Il momento.\nChe rimane.',description:'Una direzione visiva dedicata all’immagine e al suo ritmo.',gallery:[['hero-video','Uno sguardo.\nUna storia.','Racconto'],['teaser','Prima\ndel prossimo frame.','Teaser']]},
];
export const projectById = id => projects.find(p=>p.id===id);
