import { content, escape, link, list, picture, filterControl, ready, sections } from './html.mjs';

export const catalogue = content('services');
const items = new Map([...catalogue.services, ...catalogue.bundles].map(item => [item.id, item]));
export const itemPath = item => '/services/' + (item.kind === 'bundle' ? 'bundle' : 'servizio') + '/' + item.id + '/';
const medium = { digital: 'Digitale', physical: 'Fisico' };

function artwork(name, alt, small = 216, large = small) {
  const isBoard = name.includes('/');
  const widths = !isBoard || name.endsWith('/hero') ? [320, 640, 1536] : [768, 1536];
  const base = '/services/assets/';
  const variants = widths.map(width => {
    const file = isBoard ? name + '-' + width : width === 1536 ? name : 'responsive/' + name + '-' + width;
    return [base + file + '.webp', width];
  });
  return picture({ src: variants[0][0], alt, ratio: 1.5, variants, small, large });
}

function itemLink(id) {
  const item = items.get(id);
  return link(itemPath(item), item.title);
}

function bundleCard(item) {
  return `<article id="percorso-${item.id}">
  <h3><a id="bundle/${item.id}" href="${itemPath(item)}">${escape(item.title)}</a></h3>
  ${artwork(item.cover, '', 216, 360)}
  <p>${escape(item.slides[0].copy.join(' '))}</p>
  <p>${escape(item.includes)}</p>
  ${list(item.covers, itemLink)}
</article>`;
}

export function servicesIndex() {
  const groups = catalogue.categories.map(category => {
    const services = category.services.map(id => items.get(id));
    const entries = services.map(item => `  <li data-tags="${item.medium}"><a id="servizio/${item.id}" href="${itemPath(item)}">${artwork(item.cover, '', 96)} ${escape(item.title)}</a></li>`);
    return `<section data-filter-group><h3>${escape(category.label)}</h3><ul>\n${entries.join('\n')}\n</ul></section>`;
  }).join('\n');
  const categories = catalogue.categories.map(category => `<section id="${category.id}">
  <h3>${escape(category.label)}</h3>
  ${list(category.featured, id => {
    const item = items.get(id);
    return `${itemLink(id)} — ${escape(item.slides[0].copy.join(' '))}`;
  })}
</section>`).join('\n');
  return `<h1 id="inizio">${escape(sections.services.heading)}</h1>
<p>${link('#catalogo', 'Vai al catalogo completo')}</p>
<section id="bundles"><h2>Bundle di servizi</h2>
${catalogue.bundles.map(bundleCard).join('\n')}
</section>
<section id="catalogo"><h2>Servizi di design.</h2>
${filterControl('Tipo di servizio', { all: 'Tutti', ...medium }, 'catalogue-groups', 'digital')}
<div id="catalogue-groups">${groups}</div>
</section>
<section><h2>Categorie</h2>
${categories}
</section>
<p id="levelup">${link('/services/richiesta/', 'LevelUp — Da dove cominciamo?')}</p>
<section id="finale" aria-label="Ready to start?">${ready(catalogue.config.startUrl)}</section>`;
}

function scene(item, slide, index) {
  const out = [];
  if (slide.image) out.push(artwork(slide.image, '', 216, 448));
  if (slide.copy) out.push(`<p>${escape(slide.copy.join(' '))}</p>`);
  if (slide.list) out.push(list(slide.list, escape));
  if (slide.includes) out.push(list(slide.includes, itemLink));
  if (slide.intro) out.push(`<p>${escape(slide.intro)}</p>`);
  if (slide.components) out.push(list(slide.components, entry => `${itemLink(entry.id)} — ${escape(entry.role)}`));
  if (slide.scope) out.push(`<p>${escape(slide.scope)}</p>`);
  if (slide.steps) out.push('<dl>' + slide.steps.map(step => `<dt>${escape(step.title)}</dt><dd>${escape(step.copy)}</dd>`).join('\n') + '</dl>');
  if (slide.action === 'start') out.push(`<p>${link(catalogue.config.startUrl, slide.cta)}</p>`);
  const heading = slide.title.join(' ');
  return `<section id="${escape(slide.key)}">
  <h2>${escape(slide.label)}</h2>
  ${index === 0 && heading === item.title ? '' : `<h3>${escape(heading)}</h3>`}
  ${out.join('\n  ')}
</section>`;
}

export function serviceDetail(item) {
  const isBundle = item.kind === 'bundle';
  const related = isBundle ? [] : catalogue.bundles.filter(bundle => bundle.covers.includes(item.id));
  const category = catalogue.categories.find(group => group.services.includes(item.id));
  const back = isBundle ? link('/services/#bundles', 'Tutti i bundle') : link('/services/#catalogo', 'Tutti i servizi');
  return `<p>${back}</p>
<h1>${escape(item.title)}</h1>
<p>${isBundle ? 'Bundle di servizi' : link('/services/#' + category.id, category.label) + ' · ' + medium[item.medium]}</p>
${item.slides.map((slide, i) => scene(item, slide, i)).join('\n')}
${related.length ? '<h2>Bundle di servizi</h2>' + list(related, bundle => itemLink(bundle.id)) : ''}`;
}

export function leadPage() {
  return `<p>${link('/services/', 'Tutti i servizi')}</p>
<h1>Da dove cominciamo?</h1>
<p>Raccontaci cosa vuoi far crescere.</p>
<form id="lead-form" data-email="${escape(catalogue.config.email)}" hidden>
  <p><label for="lead-goal">Il tuo obiettivo</label><br>
  <select id="lead-goal" name="goal" required>
    <option value="" selected disabled>Scegli un punto di partenza</option>
    <option>Costruire la mia identità</option><option>Lanciare un prodotto o un’attività</option>
    <option>Migliorare la mia presenza online</option><option>Creare nuovi contenuti</option>
    <option>Esplorare un’idea insieme</option>
  </select></p>
  <p><label>Il tuo nome<br><input name="name" autocomplete="name" maxlength="100" pattern=".*\\S.*" required></label></p>
  <p><label>La tua email<br><input name="email" type="email" autocomplete="email" maxlength="200" required></label></p>
  <p><label>Qualcosa in più sul progetto<br><textarea name="note" rows="3" maxlength="2000" placeholder="La tua attività, un’idea, quello che hai in mente…"></textarea></label></p>
  <p id="lead-context" hidden></p>
  <button type="submit">Prepara email</button>
  <p>La richiesta si apre nella tua app email. L’invio lo confermi tu.</p>
</form>
<section id="lead-result" hidden>
  <h2>La tua richiesta è pronta.</h2>
  <p>Aprila nella tua app email, oppure copia il testo e scrivici a ${link('mailto:' + catalogue.config.email, catalogue.config.email)}.</p>
  <p><a id="email-link">Apri email</a> <button id="copy-request" type="button">Copia richiesta</button></p>
  <p id="copy-status" role="status"></p>
  <p><label>La tua richiesta<br><textarea id="request-preview" rows="9" readonly></textarea></label></p>
  <button id="edit-request" type="button">Modifica richiesta</button>
</section>
<noscript><p>Scrivici a ${link('mailto:' + catalogue.config.email, catalogue.config.email)}.</p></noscript>`;
}
