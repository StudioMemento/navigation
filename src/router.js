/** Hash routes keep Vercel static hosting and shared deep links equally simple. */
export function parseRoute(hash = '') {
  const url = new URL(hash.replace(/^#/, '') || '/', 'https://memento.local');
  return { path: url.pathname.replace(/\/$/, '') || '/', parts: url.pathname.split('/').filter(Boolean), query: url.searchParams };
}

export function routeUrl(path, values = {}) {
  const query = new URLSearchParams(Object.entries(values).filter(([, value]) => value != null && value !== ''));
  return `#${path}${query.size ? `?${query}` : ''}`;
}

export function createRouter(onChange) {
  let current = location.hash || '#/';
  const scrollPositions = new Map();
  history.scrollRestoration = 'manual';
  const update = () => {
    scrollPositions.set(current, window.scrollY);
    current = location.hash || '#/';
    onChange(parseRoute(current), scrollPositions.get(current) || 0);
  };
  window.addEventListener('hashchange', update);
  onChange(parseRoute(current), 0);
  return { navigate(path, query) { location.hash = routeUrl(path, query); }, dispose() { window.removeEventListener('hashchange', update); } };
}
