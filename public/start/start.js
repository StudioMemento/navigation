const preferenceKey = 'memento.maps.enabled';
const checkbox = document.getElementById('map-enabled');
const outlet = document.getElementById('mm-map-area');
const loadMap = document.getElementById('mm-load-map');

function setMap(enabled) {
  checkbox.checked = enabled;
  document.querySelector("#map-intro").hidden = enabled;
  if (enabled && !outlet.firstElementChild) {
    outlet.append(document.getElementById('map-template').content.cloneNode(true));
  } else if (!enabled) {
    outlet.textContent = '';
  }
}

function chooseMap(enabled) {
  setMap(enabled);
  try { sessionStorage.setItem(preferenceKey, String(enabled)); } catch {}
}

let enabled = true;
try { enabled = sessionStorage.getItem(preferenceKey) !== 'false'; } catch {}
setMap(enabled);
checkbox.closest('label').hidden = false;
checkbox.addEventListener('change', () => chooseMap(checkbox.checked));
loadMap.addEventListener('click', () => chooseMap(true));

// Keep the selected LevelUp experience in the draft opened by the project contact.
const params = new URLSearchParams(location.search);
const idea = (params.get('idea') || '').trim().slice(0, 2000);
if (params.get('from') === 'levelup' && idea) {
  const contact = document.getElementById('mm-email-project');
  contact.href += '?body=' + encodeURIComponent(idea);
}
const dialog = document.querySelector('#mm-dialog');
let opener;
for (const button of document.querySelectorAll('[data-policy]')) {
  button.addEventListener('click', () => {
    opener = button;
    const target = document.getElementById('policy-'+button.dataset.policy);
    for (const section of dialog.querySelectorAll('section')) section.hidden = section!==target;
    const heading=target.querySelector('h2');
    dialog.setAttribute('aria-label',heading.textContent);
    dialog.showModal();
    document.body.classList.add('modal-open');
    heading.focus();
  });
}
document.querySelector('#mm-dialog-close').addEventListener('click',()=>dialog.close());
dialog.addEventListener('close',()=>{document.body.classList.remove('modal-open');opener?.focus({preventScroll:true});});
dialog.addEventListener('click',event=>{if(event.target===dialog)dialog.close();});
for (const question of document.querySelectorAll('.faq-item')) {
  question.addEventListener('toggle',()=>{
    if(!question.open)return;
    for(const item of document.querySelectorAll('.faq-item')) if(item!==question)item.open=false;
    for(const img of document.querySelectorAll('.faq-photo')) img.classList.toggle('is-active',question.id==='faq-'+img.dataset.question);
  });
}
const fontProbe = document.createElement('canvas').getContext('2d');
const titles = [...document.querySelectorAll('.hero-line,.explore-line,.fit-heading')];
function fitTitles() {
  if(!fontProbe) return;
  for (const item of titles) {
    const css=getComputedStyle(item), unit=Number.parseFloat(css.letterSpacing)||0;
    fontProbe.font='350 100px Inter';
    const width=fontProbe.measureText(item.textContent).width/100;
    const spacing=unit/Number.parseFloat(css.fontSize)*(item.textContent.length-1);
    item.style.fontSize=Math.min(260,Math.max(14,item.clientWidth*.98/(width+spacing)))+'px';
  }
}
new ResizeObserver(fitTitles).observe(document.querySelector('.hero'));
document.fonts.ready.then(fitTitles);
fitTitles();
