export { CINEMATIC_SHOTS as VIEWS } from './shots.js';
export const EYE_HEIGHT=1.48;
export const ease=t=>t*t*t*(t*(t*6-15)+10);
export const damp=(a,b,s,dt)=>a+(b-a)*(1-Math.exp(-s*dt));
export const MATERIALS={
 ARCHITECTURE:{color:0x38383a,roughness:.86,metalness:.10},FURNITURE:{color:0x343538,roughness:.57,metalness:.32},
 FOLIAGE:{color:0x353c33,roughness:.76,metalness:.06},HARDWARE:{color:0x34383d,roughness:.35,metalness:.66},
 LIGHTING:{color:0x353332,roughness:.38,metalness:.58},SCREEN:{color:0x111519,roughness:.20,metalness:.42},
 POLYMER:{color:0x24272b,roughness:.48,metalness:.18},TEXTILE:{color:0x444145,roughness:.92,metalness:.04}
};
