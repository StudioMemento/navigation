import {mountReadyToStart} from './ready-to-start.js';
const cards=mountReadyToStart();
// BFCache keeps the instance; normal page disposal releases all observers and GPU resources.
addEventListener('pagehide',e=>{if(e.persisted)cards.forEach(card=>card.pause());else cards.forEach(card=>card.destroy());});
addEventListener('pageshow',e=>{if(e.persisted)cards.forEach(card=>card.resume());});
// Local development tools are not present in the public UI.
if(location.search.includes('dev=1')&&!location.hostname.endsWith('.chatgpt.site'))import('./development.js').then(m=>m.installDevelopmentPanel(cards[0]));

if(new URLSearchParams(location.search).get('review')==='1')import('./review.js').then(m=>m.installReview(cards[0]));
if(new URLSearchParams(location.search).get('perf')==='1')import('./performance.js').then(m=>m.installPerformance(cards[0]));
