import { content, escape, link, list, picture, ready, previewButton, previewDialog, sections } from './html.mjs';

const level = content('levelup');
function photo(asset, alt = '', ratio = 1, step = false) {
  const src = '/levelup/' + asset;
  const width = step ? 768 : 640;
  const largeWidth = step || asset.startsWith('assets/heroes/') ? 1536 : 1280;
  return picture({
    src, alt, ratio, large: 384,
    variants: [[src.replace('.webp', '-' + width + '.webp'), width], [src, largeWidth]]
  });
}

function experienceCard(item) {
  const query = new URLSearchParams({
    from: 'levelup', experience: item.id, idea: 'Mi interessa un’esperienza come ' + item.title + '.'
  });
  const startUrl = '/start/?' + query.toString();
  return `<article id="esperienza-${escape(item.id)}">
  <h3><a href="${escape(item.url)}" data-start="${escape(startUrl)}" target="_blank" rel="noopener noreferrer">${escape(item.title)}</a></h3>
  ${photo(item.asset, '', item.ratio || 1.5)}
  <p>${escape(item.categories.join(' · '))}</p>
  ${previewButton({ title: item.title, url: item.url, startUrl })}
</article>`;
}

export function levelup() {
  const benefits = level.benefits.map(item => `<article>
  <h2>${escape(item.title.join(' '))}</h2>
  ${photo(item.asset, item.alt)}
  <p>${escape(item.copy)}</p>
  <p>${link('/services/#' + item.id, item.domain)}</p>
</article>`);
  const visions = level.visions.map(item => `<article>
  <h3>${escape(item.title.join(' '))}</h3>
  <p>${escape(item.copy)}</p>
  <figure>${photo(item.before, 'Lo stesso soggetto come modello di base')}<figcaption>Modello di base</figcaption></figure>
  <figure>${photo(item.after, item.alt)}<figcaption>Materiali e finiture</figcaption></figure>
</article>`);
  return `<h1 id="page-title">${escape(sections.levelup.heading)}</h1>
<p>${link('#contatto', 'Vai al contatto')}</p>
<section id="benefits" aria-label="Come valorizzare il tuo brand">
${benefits.join('\n')}
</section>
<section id="portfolio"><h2 id="experiences-title">Esplora le esperienze!</h2>
${level.experiences.map(experienceCard).join('\n')}
</section>
<section><h2 id="vision-title">Immaginalo per il tuo brand.</h2>
${visions.join('\n')}
</section>
<section><h2 id="steps-title">Partiamo dalla tua idea.</h2>
${list(level.steps, item => `<h3>${escape(item.title.join(' '))}</h3>${photo(item.asset, '', 1.5, true)}<p>${escape(item.copy)}</p>`, true)}
</section>
<section id="contatto" aria-label="Ready to start?">${ready('/start/?from=levelup')}</section>
${previewDialog}`;
}
