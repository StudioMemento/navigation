import { STATIONS } from '../src/kit/core.mjs';
import { nativePage } from '../scripts/native-page.mjs';

// Each section owns its content and deployment. Cache only the normalized public HTML, never visitor context.
export default async function section(request, response) {
  const page = STATIONS.find(station => station.slug === request.query.station);
  if (!page) return response.status(404).end();
  if (request.method !== 'GET' && request.method !== 'HEAD') return response.setHeader('Allow','GET, HEAD').status(405).end();
  try {
    const upstream = await fetch(page.url, {signal:AbortSignal.timeout(8000),redirect:'error'});
    if (!upstream.ok || !upstream.headers.get('content-type')?.includes('text/html')) throw Error('section unavailable');
    const html = nativePage(await upstream.text(), page.slug);
    response.setHeader('Content-Type','text/html; charset=utf-8');
    response.setHeader('Cache-Control','public, max-age=0, must-revalidate');
    response.setHeader('Vercel-CDN-Cache-Control','public, s-maxage=60, stale-while-revalidate=120, stale-if-error=3600');
    return response.status(200).end(request.method === 'HEAD' ? undefined : html);
  } catch {
    response.setHeader('Cache-Control','no-store');
    response.setHeader('Retry-After','5');
    response.setHeader('Content-Type','text/html; charset=utf-8');
    return response.status(503).end('<!doctype html><html lang="it"><meta name="viewport" content="width=device-width"><title>Sezione temporaneamente non disponibile — Memento</title><body><main><h1>Questa sezione si sta ricaricando.</h1><p><a href="">Riprova</a> · <a href="/">Torna alla Home</a></p></main></body></html>');
  }
}
