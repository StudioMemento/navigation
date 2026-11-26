const preferenceKey = 'memento.maps.enabled';
const checkbox = document.getElementById('map-enabled');
const outlet = document.getElementById('mm-map-area');
const loadMap = document.getElementById('mm-load-map');

function setMap(enabled) {
  checkbox.checked = enabled;
  loadMap.hidden = enabled;
  if (enabled && !outlet.firstElementChild) {
    outlet.append(document.getElementById('map-template').content.cloneNode(true));
  } else if (!enabled) {
    outlet.replaceChildren();
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
