// One identity for the scene, navigation, theme and content socket.
export const WORLDS = [
  {id:'memento',title:'MEMENTO',label:'Home',color:'#d6b892',yaw:Math.PI,elevation:1.7},
  {id:'studio',title:'STUDIO',label:'Studio',color:'#b9c8c4',yaw:.20,elevation:1.55,source:'https://mementostudio.vercel.app/'},
  {id:'servizi',title:'SERVIZI',label:'Servizi',color:'#e99b70',yaw:.06,elevation:2.25,source:'https://mementoservizi.vercel.app/'},
  {id:'portfolio',title:'PORTFOLIO',label:'Portfolio',color:'#b6a9dd',yaw:.13,elevation:1.75,source:'https://mementoportfolio.vercel.app/'},
  {id:'level-up',title:'LEVEL UP',label:'Level Up',color:'#88b2d0',yaw:Math.PI,elevation:2.1,source:'https://mementolevelup.vercel.app/'},
  {id:'start',title:'START',label:'Start',color:'#d7bd85',yaw:0,elevation:3.85,source:'https://mementostart.vercel.app/'}
];
export const ICONS = {
  memento:'<path d="m12 3 8 4.5v9L12 21l-8-4.5v-9zM4 7.5l8 4.5 8-4.5M12 12v9"/>',
  studio:'<path d="M3 21V9l9-6 9 6v12M8 21V11h8v10M3 16h5m8 0h5"/>',
  servizi:'<path d="m12 2 1.9 7.1L21 11l-7.1 1.9L12 20l-1.9-7.1L3 11l7.1-1.9zM20 3v4m-2-2h4"/>',
  portfolio:'<rect x="3" y="5" width="18" height="13" rx="1"/><path d="M9 21h6M12 18v3m-5-8 3-3 3 3 2-2 3 3"/>',
  'level-up':'<path d="m5 16 7-7 7 7M5 9l7-7 7 7M12 10v12"/>',
  start:'<path d="M4 5h16v12H9l-5 4zM8 9h8M8 13h5"/>',
  up:'<path d="m5 15 7-7 7 7"/>',down:'<path d="m5 9 7 7 7-7"/>',
  tune:'<path d="M4 7h8m4 0h4M4 17h2m4 0h10M12 4v6M6 14v6"/>',
  expand:'<path d="M14 4h6v6M20 4l-7 7M10 20H4v-6M4 20l7-7"/>'
};
export const icon=name=>`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.35" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS[name]||''}</svg>`;
