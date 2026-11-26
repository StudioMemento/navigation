// Old bookmarks used fragments for sheets that now have their own documents.
function followBookmark() {
  const [section, id] = location.hash.slice(1).split('/');
  const services = document.getElementById('catalogue-groups');
  const categories = { stampa: 'design', grafica: 'design', rd: 'design', fotografia: 'visual' };
  let target;
  if (services) {
    if (section === 'levelup' || id === 'levelup') {
      target = '/services/richiesta/';
    } else if (id && (['servizio', 'bundle'].includes(section) || document.getElementById(Object.hasOwn(categories, section) ? categories[section] : section))) {
      const record = document.getElementById('servizio/' + id) || document.getElementById('bundle/' + id);
      target = record?.getAttribute('href');
    } else if (Object.hasOwn(categories, section)) {
      target = '#' + categories[section];
    }
  } else if (id && ['slideshow', 'progetto'].includes(section)) {
    const aliases = { hyperknife: 'hyperknife-epic', coricama: 'coricama-dark' };
    const record = document.getElementById('slideshow/' + (Object.hasOwn(aliases, id) ? aliases[id] : id));
    target = record?.getAttribute('href');
  }
  if (target) {
    const destination = new URL(target, location.href);
    destination.search = location.search;
    location.replace(destination.href);
  }
}

followBookmark();
window.addEventListener('hashchange', followBookmark);

for (const control of document.querySelectorAll('[data-filter-control]')) {
  const select = control.querySelector('select');
  const list = document.getElementById(select.getAttribute('aria-controls'));
  const rows = [...list.querySelectorAll('[data-tags]')];
  const groups = list.querySelectorAll('[data-filter-group]');
  const status = control.querySelector('output');

  function update() {
    let count = 0;
    for (const row of rows) {
      row.hidden = select.value !== 'all' && !row.dataset.tags.split(' ').includes(select.value);
      if (!row.hidden) count++;
    }
    for (const group of groups) group.hidden = !group.querySelector('[data-tags]:not([hidden])');
    status.value = count + (list.id === 'project-grid' ? (count === 1 ? ' progetto' : ' progetti') : (count === 1 ? ' servizio' : ' servizi'));
  }

  update();
  control.hidden = false;
  select.addEventListener('change', update);
  window.addEventListener('pageshow', update);
}
