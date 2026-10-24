import { CONTACT } from './config.js';
import { detailBar, escapeHtml as e, eyebrow, icon, link } from './ui.js';

/** Draft stays only in memory for this tab. No tracking, database or background send. */
export const contactDraft = { name: '', email: '', phone: '', message: '', subject: '' };

export function emailBody(draft) {
  return `Ciao Memento,\n\n${draft.message}\n\nNome: ${draft.name}\nEmail: ${draft.email}${draft.phone ? `\nTelefono: ${draft.phone}` : ''}`;
}

export function mailtoUrl(draft) {
  const params = new URLSearchParams({ subject: draft.subject || 'Un nuovo progetto con Memento', body: emailBody(draft) });
  // mailto parsers need percent-encoded spaces, not form-encoded plus signs.
  return `mailto:${CONTACT.email}?${params.toString().replace(/\+/g, '%20')}`;
}

export function renderContact(route) {
  const context = route.query.get('oggetto') || contactDraft.subject;
  if (context) contactDraft.subject = context;
  const review = route.parts[1] === 'bozza' && contactDraft.name && contactDraft.email && contactDraft.message;
  return `<section class="contact-slide page-width">${detailBar('Esplora Memento', '#/', '04 / Start')}
    <div class="contact-grid"><div class="contact-intro">${eyebrow('Un’idea è un buon inizio.')}<h1 tabindex="-1">Facciamolo<br><em>succedere.</em></h1><p class="lead">Un progetto da costruire, un’attività da far crescere o una domanda. Partiamo da qui.</p><img class="contact-diorama" src="./assets/dioramas/start.webp" alt="" width="320" height="320"><div class="contact-channels"><a href="mailto:${CONTACT.email}"><span>Email</span><strong>${CONTACT.email}</strong>${icon()}</a><a href="https://wa.me/${CONTACT.phone.replace('+', '')}${context ? `?text=${encodeURIComponent(`Ciao Memento, mi interessa: ${context}`)}` : ''}" target="_blank" rel="noopener noreferrer"><span>WhatsApp</span><strong>${CONTACT.phoneLabel}</strong>${icon()}</a><a href="tel:${CONTACT.phone}"><span>Telefono</span><strong>Facciamo due parole</strong>${icon()}</a><a href="${CONTACT.instagram}" target="_blank" rel="noopener noreferrer"><span>Instagram</span><strong>@mementostudio.it</strong>${icon()}</a></div></div>
    <div class="contact-form-panel">${review ? renderReview() : renderForm()}</div></div>
  </section>`;
}

function renderForm() {
  return `${eyebrow('Raccontaci il tuo progetto')}<h2>Da dove partiamo?</h2><p class="form-note">Prepara il messaggio e invialo dalla tua app email.</p><form id="contact-form">
    <div class="form-row"><div class="field"><label for="contact-name">Nome <span>Obbligatorio</span></label><input id="contact-name" name="name" autocomplete="name" required maxlength="120" value="${e(contactDraft.name)}" placeholder="Come ti chiami?"></div><div class="field"><label for="contact-email">Email <span>Obbligatoria</span></label><input id="contact-email" name="email" type="email" autocomplete="email" required maxlength="254" value="${e(contactDraft.email)}" placeholder="nome@azienda.it"></div></div>
    <div class="field"><label for="contact-phone">Telefono <span>Facoltativo</span></label><input id="contact-phone" name="phone" type="tel" autocomplete="tel" maxlength="40" value="${e(contactDraft.phone)}" placeholder="Il tuo numero"></div>
    <div class="field"><label for="contact-subject">Di cosa parliamo?</label><input id="contact-subject" name="subject" maxlength="160" value="${e(contactDraft.subject)}" placeholder="Un sito, un’identità, una nuova idea…"></div>
    <div class="field"><label for="contact-message">Il tuo progetto <span>Obbligatorio</span></label><textarea id="contact-message" name="message" rows="5" maxlength="4000" required placeholder="Raccontaci cosa hai in mente e a che punto sei.">${e(contactDraft.message)}</textarea></div>
    <button class="button button-primary" type="submit">Prepara il messaggio ${icon()}</button><p class="form-note">Potrai rileggerlo prima di aprire la tua app email. Nulla viene inviato da questa pagina.</p>
  </form>`;
}

function renderReview() {
  return `${eyebrow('La tua bozza')}<h2>Rileggi.<br>Poi scrivici.</h2><p class="form-note">Il messaggio è pronto. Apri la tua app email per inviarlo a ${CONTACT.email}.</p><div class="email-review"><dl><dt>A</dt><dd>${CONTACT.email}</dd><dt>Oggetto</dt><dd>${e(contactDraft.subject || 'Un nuovo progetto con Memento')}</dd></dl><pre>${e(emailBody(contactDraft))}</pre></div><div class="form-actions"><a class="button button-primary" href="${e(mailtoUrl(contactDraft))}">Apri email ${icon()}</a><button class="button button-secondary" data-action="copy-message">Copia messaggio</button></div><p id="copy-status" role="status" class="form-note"></p>${link('Modifica la bozza', '/start', { className: 'edit-draft' })}`;
}

export function captureDraft(form) {
  const values = new FormData(form);
  for (const key of Object.keys(contactDraft)) contactDraft[key] = String(values.get(key) || '').trim();
}
