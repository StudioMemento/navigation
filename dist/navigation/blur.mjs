// Four overlapping blur bands per edge; transparent, with no painted black fade.
export const FRAMER_BLUR_RADII=Object.freeze([.65,1.8,3.8,7]);
const MASKS=Object.freeze([
 'linear-gradient(to bottom,transparent 0%,#000 16%,#000 30%,transparent 60%)',
 'linear-gradient(to bottom,transparent 18%,#000 42%,#000 54%,transparent 82%)',
 'linear-gradient(to bottom,transparent 42%,#000 66%,#000 79%,transparent 100%)',
 'linear-gradient(to bottom,transparent 62%,#000 92%,#000 100%)'
]);
export function blurMask(index){if(!Number.isInteger(index)||index<0||index>=MASKS.length)throw new RangeError('Blur level: 0–3');return MASKS[index];}
export function edgeMarkup(edge){
 if(!['top','bottom'].includes(edge))throw new TypeError('Unknown edge');
 const layers=FRAMER_BLUR_RADII.map((radius,index)=>{const mask=blurMask(index);return `<div class="mm-filter" style="z-index:${index+1};--mm-radius:calc(var(--memento-overlay-blur,7px) * ${radius/7});-webkit-mask-image:${mask};mask-image:${mask}"></div>`;}).join('');
 return `<div class="mm-edge mm-edge--${edge}" aria-hidden="true">${layers}</div>`;
}
