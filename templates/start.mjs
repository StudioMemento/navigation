const escape = text => String(text).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'})[c]);
const icon = name => `<span class="icon ${name}" aria-hidden="true"></span>`;
const art = (name,cls='',size=800) => `<img class="${cls}" src="assets/images/${name}.webp" width="${size}" height="${size===1536?1024:size}" alt="" loading="lazy" decoding="async">`;
const shade = '<span class="card-legibility" aria-hidden="true"></span>';
const external = ' target="_blank" rel="noopener noreferrer"';
export function startPage(data) {
  function email(id, address) {
    return `<a id="mm-email-${id}" class="email-card cut-frame" href="mailto:${escape(address)}" aria-label="Scrivi a ${escape(address)}">
      ${art('email-'+id,'email-photo',1536)}${shade}${icon('chevron-down card-chevron')}
      <span class="contact-copy">${icon('mail')}<span class="email-address contact-title">${escape(address)}</span></span></a>`;
  }
  const channels = [
    ['phone','tel:'+data.phone,data.phoneLabel,'Chiama '+data.phoneLabel],
    ['whatsapp','https://wa.me/'+data.whatsapp+'?text='+encodeURIComponent(data.whatsappMessage),'WhatsApp','Scrivici su WhatsApp'],
    ['instagram',data.instagramUrl,'Instagram','Apri il profilo Instagram di Memento Studio'],
    ['fiverr',data.fiverrUrl,'Fiverr','Apri il profilo Fiverr di Memento Studio']
  ];
  const policyNames = {privacy:'Privacy policy',cookies:'Cookie policy',preferences:'Preferenze cookie',studio:'Dati dello studio'};
  function policyLink(key) {
    return `<button type="button" aria-haspopup="dialog" data-policy="${key}">${policyNames[key]} ${icon('arrow-up-right')}</button>`;
  }
  return `<a class="skip-link" href="#contatti">Vai ai contatti</a>
    <main id="start"><header class="hero content-width" aria-labelledby="start-title"><h1 class="hero-title" id="start-title"><span class="hero-line">LET’S WORK</span> <span class="hero-line">TOGETHER</span></h1></header>
    <section class="contact-section content-width" id="contatti" tabindex="-1" aria-labelledby="contact-title">
      <h2 class="sr-only" id="contact-title">Scrivici</h2><div class="email-grid">${email('project',data.projectEmail)}${email('studio',data.email)}</div>
      <nav class="channels" aria-label="Altri modi per contattarci">${channels.map(([id,url,label,access])=>`<a class="channel cut-frame" id="mm-${id}-link" href="${escape(url)}" aria-label="${escape(access)}"${id==='phone'?'':external}>
        ${art('channel-'+id)}${shade}${icon('chevron-down card-chevron')}<span class="contact-copy channel-copy">${icon(id)}<span class="channel-labels"><span class="channel-title contact-title">${escape(label)}</span></span></span></a>`).join('')}</nav>
    </section>
    <section class="location-section content-width" aria-labelledby="location-title">
      <h2 class="section-heading fit-heading" id="location-title">SIAMO QUI</h2><div class="location-board">
      <div class="map-area location-map cut-frame"><div id="mm-map-area" class="map-frame"></div><div class="map-intro" id="map-intro"><p>Maniago.</p><button class="quiet-link" id="mm-load-map" type="button">Mostra Google Maps ${icon('arrow-up-right')}</button></div></div>
      <template id="map-template"><iframe title="Studio Memento su Google Maps" src="${escape(data.mapsEmbedUrl)}" loading="lazy" referrerpolicy="no-referrer-when-downgrade" allowfullscreen></iframe></template>
      <a class="location-card location-address-card cut-frame" id="mm-map-link" href="${escape(data.mapsUrl)}"${external}>${art('location-address','location-photo')}${shade}${icon('map-pin')}<address class="location-address">${escape(data.addressLine)}<span>${escape(data.addressCity)}</span></address></a>
      <div class="location-card location-hours-card cut-frame">${art('location-hours','location-photo')}${shade}${icon('clock')}<dl class="hours"><div><dt>Lunedì — Venerdì</dt><dd><time datetime="14:00">14:00</time><span>—</span><time datetime="18:00">18:00</time></dd></div></dl></div></div>
    </section>
    <section class="faq-section content-width" id="faq" aria-labelledby="faq-title"><div class="faq-panel cut-frame">
      <div class="faq-visual" aria-hidden="true">${data.questions.map((q,i)=>`<img class="faq-photo${i===0?' is-active':''}" data-question="${q.id}" src="assets/images/${q.image}.webp" loading="lazy" decoding="async" alt="">`).join('')}</div>
      <h2 class="faq-title" id="faq-title"><span>Frequently Asked</span> <span>Questions</span></h2>
      <div class="faq-list">${data.questions.map(q=>`<details class="faq-item" name="faq" id="faq-${q.id}"><summary>${escape(q.q)}<span class="faq-toggle" aria-hidden="true">${icon('plus')}${icon('minus')}</span></summary><div class="faq-answer"><p>${escape(q.a)}</p></div></details>`).join('')}</div></div></section>
    <section class="legal-section content-width" aria-labelledby="legal-title"><div class="legal-card cut-frame"><h2 class="board-title" id="legal-title">Privacy &amp; legal</h2>
      <div class="legal-layout"><nav class="legal-group" aria-label="Privacy e cookie"><h3>Privacy e cookie</h3>${policyLink('privacy')}${policyLink('cookies')}${policyLink('preferences')}</nav>
      <div class="legal-group legal-studio"><h3>Studio</h3><p>Memento Design Studio</p><a class="legal-email" href="mailto:${escape(data.email)}">${escape(data.email)}</a>${policyLink('studio')}</div></div></div></section>
    <footer class="explore-section content-width"><a class="explore-link" id="mm-explore" href="/#start" aria-label="Continua il viaggio!"><span class="explore-words"><span class="explore-line">CONTINUA</span> <span class="explore-line">IL VIAGGIO!</span></span>${icon('chevron-down explore-chevron')}</a></footer>
    </main>
    <dialog id="mm-dialog" aria-label="Informazioni sullo studio"><div class="dialog-wrap"><button class="dialog-close" id="mm-dialog-close" type="button" aria-label="Chiudi">${icon('close')}</button><div class="dialog-card cut-frame">
    ${Object.entries(data.policies).map(([id,policy])=>`<section id="policy-${id}" hidden><h2 class="board-title" tabindex="-1">${escape(policy.title)}</h2><div class="policy-body">
      ${policy.paragraphs.map(p=>`<p>${escape(p)}</p>`).join('')}
      ${id==='studio'?`<p>${escape(data.addressLine)} · ${escape(data.addressCity)}</p><p>${escape(data.phoneLabel)}</p>`:''}
      ${id==='preferences'?'<label class="preference-row"><span>Google Maps</span><input id="map-enabled" type="checkbox"></label>':''}
      ${policy.subject?`<a class="action cut-frame" href="mailto:${escape(data.email)}?subject=${encodeURIComponent(policy.subject)}">${escape(data.email)}</a>`:''}</div></section>`).join('')}
    </div></div></dialog>`;
}
