const form = document.getElementById('lead-form');
const result = document.getElementById('lead-result');
const preview = document.getElementById('request-preview');
const mail = document.getElementById('email-link');
const copyStatus = document.getElementById('copy-status');
const context = (new URLSearchParams(location.search).get('context') || '').slice(0, 200);
if (context) {
  const note = document.getElementById('lead-context');
  note.textContent = 'Ti interessa: ' + context;
  note.hidden = false;
}
form.hidden = false;

form.addEventListener('submit', event => {
  event.preventDefault();
  const values = new FormData(form);
  const name = values.get('name').trim();
  const goal = values.get('goal');
  const note = values.get('note').trim();
  const email = values.get('email').trim();
  const draft = [
    'Ciao Memento,', '', `sono ${name}.`, '', `Il mio obiettivo: ${goal}.`,
    ...(context ? ['Mi interessa: ' + context + '.'] : []),
    ...(note ? ['', note] : []), '', `Potete rispondermi a ${email}.`, '', 'Grazie!', name
  ].join('\n');
  mail.href = 'mailto:' + form.dataset.email + '?subject=' + encodeURIComponent('LevelUp — ' + (context || goal)) + '&body=' + encodeURIComponent(draft);
  preview.value = draft;
  copyStatus.textContent = '';
  form.hidden = true;
  result.hidden = false;
  mail.focus();
});

document.getElementById('edit-request').addEventListener('click', () => {
  result.hidden = true;
  form.hidden = false;
  form.elements.goal.focus();
});

document.getElementById('copy-request').addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText(preview.value);
    copyStatus.textContent = 'Richiesta copiata';
  } catch {
    preview.focus();
    preview.select();
    copyStatus.textContent = 'Seleziona e copia il testo qui sotto';
  }
});
