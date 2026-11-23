import test from 'node:test';
import assert from 'node:assert/strict';
import { parseFragment } from 'parse5';
import { homeMarkup } from '../scripts/home-markup.mjs';
import { nativePage } from '../scripts/native-page.mjs';

const attr=(node,name)=>node.attrs.find(a=>a.name===name)?.value;
test('the first HTML paints the Studio card and all five destinations have versioned responsive photos',()=>{
  const scene=parseFragment(homeMarkup()).childNodes[0];
  const cards=scene.childNodes.filter(node=>node.tagName==='a');
  assert.equal(cards.length,5);
  assert.equal(attr(cards[0],'hidden'),undefined);
  assert.match(attr(cards[0].childNodes[0],'src'),/^\/assets\/photographs\/[a-f0-9]{12}\/studio-768.webp$/);
  for(const card of cards){
    const slug=attr(card,'data-page'),img=card.childNodes[0];
    assert.equal(attr(card,'href'),'/'+slug+'/');
    assert(Number(attr(card,'data-title-em'))>0);
    assert.match(attr(img,'data-srcset'),/768w,.*1536w$/);
  }
});
test('Studio starts its own module once while its first view is available',()=>{
  const doc=parseFragment(nativePage('<main id="experience"><div id="loading"></div></main><script type="module" src="./app.bundle.js?v=first-frame"></script>','studio'));
  const entries = doc.childNodes.filter(n => n.tagName === 'script' && attr(n,'src') === './app.bundle.js?v=first-frame');
  assert.equal(entries.length, 1);
});
