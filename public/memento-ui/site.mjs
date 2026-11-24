import { mountNav } from '/navigation/navbar.mjs';
import { navigationLink, station } from '/navigation/core.mjs';
import { mountScrollbar } from '/memento-ui/scrollbar.mjs';
// R20: the background of letters in the margins of every page (it mounts itself)
import '/memento-ui/letters.mjs';

const root = document.documentElement;
const section = station(root.dataset.mementoNative);
const pageUrl = (id, view = 'page') => view === 'world' ? '/#'+station(id).slug : station(id).path+'/';
const modalOpen = () => root.dataset.demoExpanded === 'true' || root.dataset.overlayOpen === 'true' ||
  document.body.classList.contains('modal-open') || !!document.querySelector('dialog[open],[aria-modal="true"]:not([hidden]):not([aria-hidden="true"])');
function syncOverlay() {
  const modal = modalOpen();
  if (root.hasAttribute('data-memento-modal') === modal) return;
  root.toggleAttribute('data-memento-modal', modal);
  document.dispatchEvent(new Event('memento:surface-visibility'));
}

if (section) {
  const nav = mountNav({active:section.id, mode:'host'});
  nav.setAttribute('current','page');
  function internalHref(value) {
    const target=navigationLink(value,location.href,location.origin);
    if(!target)return null;
    return target.view==='world'?pageUrl(target.id,'world'):pageUrl(target.id)+(target.search?'?'+target.search:'')+(target.hash||'');
  }
  // Existing content, including LevelUp's keyboard shortcuts, can request a native route directly.
  window.MementoNavigation = {navigate(value) {
    const href=internalHref(value);
    if(!href)return false;
    window.mementoGo(href);
    return true;
  }};
  // Let authored click handlers finish choosing the destination before the browser follows it.
  document.addEventListener('click', event => {
    if(event.defaultPrevented || event.button!==0 || event.ctrlKey || event.metaKey || event.altKey || event.shiftKey) return;
    const a=event.composedPath().find(n=>n instanceof HTMLAnchorElement);
    if(!a || a.hasAttribute('download') || !['','_self','_top','_parent'].includes(a.target) || a.getAttribute('href')?.startsWith('#')) return;
    const url=new URL(a.href);
    if(url.origin===location.origin && url.pathname===location.pathname) return;
    const href=internalHref(url.href);
    if(href && url.href!==new URL(href,location.origin).href)a.href=href;
  });
  document.addEventListener('memento:overlay-change',syncOverlay);
  document.addEventListener('toggle',event=>{if(event.target instanceof HTMLDialogElement)syncOverlay();},true);
  window.addEventListener('pageshow',syncOverlay);
  syncOverlay();
  // R18: one Memento scroll cue for every page that scrolls
  mountScrollbar();
  // Scrolling and Page Up belong to the document. Escape explicitly returns to its station.
  window.addEventListener('keydown', event => {
    if (event.key !== 'Escape' || event.defaultPrevented || modalOpen()) return;
    if (event.target?.closest?.('input,select,textarea,[contenteditable="true"]')) return;
    if (section.id === 'memento' && document.body.matches('.inside,.focused')) return;
    event.preventDefault();
    window.mementoGo(pageUrl(section.id, 'world'));
  });
}
