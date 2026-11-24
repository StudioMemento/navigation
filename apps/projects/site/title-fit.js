/** Balance at word boundaries; measure the loaded font, never stretch glyphs. */
export function titleLayout(value, width, maximum, measure) {
  const text = String(value || '').trim().toLocaleUpperCase('it');
  const explicit = text.split(/\n+/).map(line => line.trim()).filter(Boolean);
  const sizeFor = lines => Math.min(maximum, ...lines.map(line => width / Math.max(.001, measure(line))));
  if (explicit.length > 1) return { lines: explicit, size: sizeFor(explicit) };
  const words = text.split(/\s+/), one = { lines: [text], size: sizeFor([text]) };
  if (words.length < 2) {
    if (one.size >= maximum * .55) return one;
    const letters = [...text];let best = one;
    for (let split = 1; split < letters.length; split++) {
      const lines = [letters.slice(0, split).join(''), letters.slice(split).join('')];
      const size = sizeFor(lines);if (size > best.size) best = { lines, size };
    }
    return best;
  }
  if (one.size >= maximum * .68) return one;
  let best = one;
  for (let split = 1; split < words.length; split++) {
    const lines = [words.slice(0, split).join(' '), words.slice(split).join(' ')];
    const size = sizeFor(lines);
    if (size > best.size) best = { lines, size };
  }
  return best;
}

const canvas = typeof document === 'undefined' ? null : document.createElement('canvas');
export function fitProjectTitle(title, value) {
  if (!title || !canvas) return;
  const style = getComputedStyle(title), context = canvas.getContext('2d');
  if (!context) return;
  const width = title.clientWidth - 8;
  if (width <= 0) return;
  context.font = `${style.fontWeight} 100px ${style.fontFamily}`;
  const tracking = -.035;
  const measure = text => {
    const metrics = context.measureText(text);
    const ink = (metrics.actualBoundingBoxLeft || 0) + (metrics.actualBoundingBoxRight || metrics.width);
    return (Math.max(metrics.width, ink) + Math.max(0, [...text].length - 1) * tracking * 100) / 100;
  };
  const result = titleLayout(value, width, Math.min(300, width * .26), measure);
  title.style.fontSize = `${Math.floor(result.size * 10) / 10}px`;
  title.dataset.lines = String(result.lines.length);
  title.replaceChildren(...result.lines.map(line => {
    const span = document.createElement('span'); span.className = 'title-line'; span.textContent = line; return span;
  }));
  // Font engines can round kerning differently: check actual line boxes too.
  const measured = Math.max(...[...title.children].map(line => line.getBoundingClientRect().width));
  if (measured > width) title.style.fontSize = `${result.size * width / measured}px`;
}
