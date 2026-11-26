import { content, escape, link, list, picture } from './html.mjs';

const data = content('start');
const faq = data.questions;
const image = (name, small, ratio) => picture({ src: '/start/assets/images/' + name + '.webp', ratio, small });
const outside = url => /^https:\/\//.test(url);

function channel(id, url, label, asset, ratio = 1) {
  return `<a id="${id}" href="${escape(url)}"${outside(url) ? ' target="_blank" rel="noopener noreferrer"' : ''}>${image(asset, 80, ratio)} ${escape(label)}</a>`;
}

function policies() {
  const labels = { privacy: 'Privacy policy', cookies: 'Cookie policy', preferences: 'Preferenze cookie', studio: 'Dati dello studio' };
  const urls = { privacy: data.privacyUrl, cookies: data.cookiePolicyUrl, studio: data.legalUrl };
  function row(kind) {
    if (urls[kind]) return `<p>${link(urls[kind], labels[kind], true)}</p>`;
    const item = data.policies[kind];
    const parts = item.paragraphs.map(text => `<p>${escape(text)}</p>`);
    if (kind === 'preferences') parts.push('<label data-map-pref hidden><input type="checkbox" id="map-enabled"> Google Maps</label>');
    if (kind === 'studio') parts.push(`<p>${escape(data.addressLine)} · ${escape(data.addressCity)}</p><p>${escape(data.phoneLabel)}</p>`);
    if (item.subject) parts.push(`<p>${link('mailto:' + data.email + '?subject=' + encodeURIComponent(item.subject), data.email)}</p>`);
    return `<details id="${kind}"><summary>${labels[kind]}</summary>
  ${labels[kind] === item.title ? '' : '<h4>' + escape(item.title) + '</h4>'}
  ${parts.join('\n  ')}
</details>`;
  }
  return `<section><h2 id="legal-title">Privacy &amp; legal</h2>
<h3>Privacy e cookie</h3>
${['privacy', 'cookies', 'preferences'].map(row).join('\n')}
<h3>Studio</h3><p>Memento Design Studio</p>
<p>${link('mailto:' + data.email, data.email)}</p>
${row('studio')}
</section>`;
}

export function start() {
  const contacts = [
    channel('mm-email-project', 'mailto:' + data.projectEmail, data.projectEmail, 'email-project', 1.5),
    channel('mm-email-studio', 'mailto:' + data.email, data.email, 'email-studio', 1.5),
    channel('mm-phone-link', 'tel:' + data.phone, data.phoneLabel, 'channel-phone'),
    channel('mm-whatsapp-link', 'https://wa.me/' + data.whatsapp + '?text=' + encodeURIComponent(data.whatsappMessage), 'WhatsApp', 'channel-whatsapp'),
    channel('mm-instagram-link', data.instagramUrl, 'Instagram', 'channel-instagram'),
    channel('mm-fiverr-link', data.fiverrUrl, 'Fiverr', 'channel-fiverr')
  ];
  const map = `<iframe title="Google Maps — Studio Memento, Maniago" src="${escape(data.mapsEmbedUrl)}" width="256" height="192" loading="lazy" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`;
  const questions = faq.map((q, index) => `<details name="faq" id="question-${escape(q.id)}"${index === 0 ? ' open' : ''}>
  <summary>${escape(q.q)}</summary><p>${escape(q.a)}</p>${image(q.image, 160, 1.5)}
</details>`);
  return `<h1 id="start-title">LET’S WORK TOGETHER</h1>
<p>${link('#contatti', 'Vai ai contatti')}</p>
<section id="contatti"><h2>Scrivici</h2>
${list(contacts, value => value)}
</section>
<section><h2 id="location-title">SIAMO QUI</h2>
<address><a id="mm-map-link" href="${escape(data.mapsUrl)}" target="_blank" rel="noopener noreferrer">${escape(data.addressLine)}<br>${escape(data.addressCity)}</a></address>
<p>${image('location-address', 120, 1)}</p>
<dl><dt>Lunedì — Venerdì</dt><dd><time datetime="14:00">14:00</time> — <time datetime="18:00">18:00</time></dd></dl>
<p>${image('location-hours', 120, 1)}</p>
<template id="map-template">${map}</template>
<div id="mm-map-area"></div>
<button type="button" id="mm-load-map" hidden>Mostra Google Maps</button>
<noscript><p>${link(data.mapsUrl, 'Mostra Google Maps', true)}</p></noscript>
</section>
<section id="faq"><h2>Frequently Asked Questions</h2>
${questions.join('\n')}
</section>
${policies()}
<p id="esplora">${link(data.hubUrl, 'CONTINUA IL VIAGGIO!')}</p>`;
}
