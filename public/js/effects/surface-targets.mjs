const SLIDE='.home-card,.flow-card,.showcase-card[data-slide],.carousel-card[data-slide]';

export function acceptsLight(el) {
  if (!el?.isConnected || el.closest('[hidden],[inert],dialog:not([open]),.is-moving,.is-dragging')) return false;
  const slide=el.closest(SLIDE);
  return !slide || (slide.tabIndex===0 && slide.dataset.active!=='false' && slide.getAttribute('aria-hidden')!=='true');
}

// Track actual cards, including decks inserted by a dialog. Proximity is continuous within
// the viewport margin, independent of how many pointer samples happen to hit a card.
export function surfaceIndex(onDeckChange) {
  const visible=new Set(), slides=new Set();
  const io='IntersectionObserver' in window ? new IntersectionObserver(entries=>{
    for (const entry of entries) {
      if (entry.isIntersecting && entry.target.isConnected) visible.add(entry.target);
      else visible.delete(entry.target);
    }
  },{rootMargin:'210px'}) : null;
  const decks=new MutationObserver(records=>{
    if (records.some(r=>r.target.getAttribute(r.attributeName)!==r.oldValue)) onDeckChange();
  });
  function watchSlide(card) {
    const host=card.closest('#hub,.carousel,.coverflow') || card.parentElement?.parentElement;
    if (host) decks.observe(host,{attributes:true,attributeFilter:['class'],attributeOldValue:true});
    decks.observe(card,{attributes:true,attributeFilter:[card.matches('.home-card')?'aria-hidden':'data-active'],attributeOldValue:true});
  }
  function add(card) {
    visible.add(card);io?.observe(card);
    if (card.matches(SLIDE)) {slides.add(card);watchSlide(card);}
  }
  function visit(node,each) {
    if (node.nodeType!==1) return;
    if (node.matches('.mm-tab')) each(node);
    node.querySelectorAll('.mm-tab').forEach(each);
  }
  function drop(card) {visible.delete(card);slides.delete(card);io?.unobserve(card);}
  function watchDecks() {
    // Removed dialog decks must not be kept alive by the observer.
    decks.disconnect();
    for (const slide of slides) if (slide.isConnected) watchSlide(slide);
  }
  const changes=new MutationObserver(records=>{
    let removedDeck=false;
    for (const r of records) {
      for (const n of r.removedNodes) visit(n,card=>{removedDeck=slides.has(card)||removedDeck;drop(card);});
      for (const n of r.addedNodes) visit(n,add);
    }
    if (removedDeck) {watchDecks();onDeckChange();}
  });
  document.querySelectorAll('.mm-tab').forEach(add);
  changes.observe(document.body,{subtree:true,childList:true});
  return visible;
}
