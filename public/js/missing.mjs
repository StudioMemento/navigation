// The 404: the number written by the wall itself. Each pixel of the three digits is a small block of glyphs of the
// same grid as the background; at the opening they scramble and settle, left to right, on the letters of MΞMΞNTO.
// The pointer scrambles them in amber and they settle again; a click sends a ripple through the number.
const PITCH = 12, WORD = [0, 1, 0, 1, 2, 3, 4];
const DIGITS = {
  4:['10010','10010','10010','11111','00010','00010','00010'],
  0:['01110','10001','10011','10101','11001','10001','01110']
};
const TONE = {warm:0, hot:1, grey:2, light:3};
const range = (a, b) => a + Math.random() * (b - a);

export function mountMissing(canvas) {
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const ctx = canvas.getContext('2d');
  const atlas = new Image();
  let cells = [], cols = 0, rows = 0, block = 2, dpr = 1, sprites = null, slot = 12, frame = 0, previous = 0, time = 0;
  let pointer = null;

  function layout() {
    const room = canvas.parentElement.clientWidth || innerWidth;
    block = Math.max(1, Math.min(3, Math.floor(room * .92 / (17 * PITCH))));
    cols = 17 * block; rows = 7 * block;
    dpr = Math.min(devicePixelRatio || 1, 2);
    canvas.width = cols * PITCH * dpr; canvas.height = rows * PITCH * dpr;
    canvas.style.width = cols * PITCH + 'px'; canvas.style.height = rows * PITCH + 'px';
    slot = Math.round(PITCH * dpr);
    sprites = document.createElement('canvas');
    sprites.width = slot * 5; sprites.height = slot * 4;
    sprites.getContext('2d').drawImage(atlas, 0, 0, sprites.width, sprites.height);
    const pattern = [DIGITS[4], DIGITS[0], DIGITS[4]];
    cells = [];
    for (let row = 0; row < rows; row++) for (let col = 0; col < cols; col++) {
      const digit = Math.floor(col / (6 * block)), x = Math.floor((col % (6 * block)) / block), y = Math.floor(row / block);
      const on = digit < 3 && x < 5 && pattern[digit][y][x] === '1';
      const target = WORD[(col + row * 3) % 7];
      cells.push({col, row, on, target, letter:Math.floor(Math.random() * 5), level:0, goal:on ? .92 : .07,
        steps:reduced ? 0 : Math.round(range(5, 9)), next:reduced ? 0 : col * .028 + range(.1, .45), tempo:[.06, .09], warm:0});
    }
    if (reduced) for (const cell of cells) {cell.letter = cell.target; cell.level = cell.goal;}
    paint(true);
  }
  function scramble(cell, warm) {
    cell.steps = Math.max(cell.steps, Math.round(range(3, 5)));
    cell.tempo = [.11, .15];
    cell.next = Math.min(cell.next, time + range(0, .08));
    if (warm) cell.warm = 1;
  }
  function step(dt) {
    time += dt;
    let busy = false;
    for (const cell of cells) {
      if (cell.steps > 0 && time >= cell.next) {
        cell.letter = cell.steps === 1 ? cell.target : (cell.letter + 1 + Math.floor(Math.random() * 4)) % 5;
        cell.steps--;
        cell.next = time + range(...cell.tempo);
        cell.dirty = true;
      }
      const goal = time >= cell.next - .3 || cell.steps === 0 ? cell.goal : cell.goal * .55;
      const level = cell.level + (goal - cell.level) * (1 - Math.exp(-dt / .12));
      if (Math.abs(level - cell.level) > .004) {cell.level = level; cell.dirty = true;}
      if (cell.warm) {cell.warm = Math.max(0, cell.warm - dt / .9); cell.dirty = true;}
      if (cell.steps > 0 || cell.warm || Math.abs(cell.goal - cell.level) > .01) busy = true;
    }
    // At rest the number breathes: now and then one of its glyphs decodes again, in grey.
    if (!reduced && Math.random() < dt * 2.2) {
      const lit = cells.filter(cell => cell.on && !cell.steps);
      const cell = lit[Math.floor(Math.random() * lit.length)];
      if (cell) {cell.steps = 3; cell.tempo = [.14, .2]; cell.next = time;}
    }
    return busy;
  }
  function paint(all) {
    if (!sprites) return;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    if (all) ctx.clearRect(0, 0, cols * PITCH, rows * PITCH);
    for (const cell of cells) {
      if (!all && !cell.dirty) continue;
      cell.dirty = false;
      const x = cell.col * PITCH, y = cell.row * PITCH;
      ctx.clearRect(x, y, PITCH, PITCH);
      const tone = cell.warm > .5 ? (cell.on ? TONE.hot : TONE.warm) : cell.on ? TONE.light : TONE.grey;
      ctx.globalAlpha = Math.min(1, cell.level + (cell.on ? 0 : cell.warm * .5));
      ctx.drawImage(sprites, cell.letter * slot, tone * slot, slot, slot, x, y, PITCH, PITCH);
    }
    ctx.globalAlpha = 1;
  }
  function tick(now) {
    frame = 0;
    const dt = previous ? Math.min(.1, (now - previous) / 1000) : 1 / 30;
    previous = now;
    if (pointer) {
      for (const cell of cells) {
        const d = Math.hypot((cell.col + .5) * PITCH - pointer.x, (cell.row + .5) * PITCH - pointer.y);
        if (d < 70 && Math.random() < .5 * (1 - d / 70)) scramble(cell, true);
      }
      pointer = null;
    }
    step(dt);
    paint(false);
    if (!document.hidden) frame = setTimeout(() => requestAnimationFrame(tick), 1000 / 30 - 8);
  }
  function start() { if (!frame && !reduced) {previous = 0; frame = requestAnimationFrame(tick);} }
  canvas.addEventListener('pointermove', event => {
    if (event.pointerType === 'touch') return;
    const box = canvas.getBoundingClientRect();
    pointer = {x:event.clientX - box.left, y:event.clientY - box.top};
  }, {passive:true});
  canvas.addEventListener('pointerdown', event => {
    const box = canvas.getBoundingClientRect(), x = event.clientX - box.left, y = event.clientY - box.top;
    for (const cell of cells) {
      const d = Math.hypot((cell.col + .5) * PITCH - x, (cell.row + .5) * PITCH - y);
      if (cell.on || Math.random() < .2) {scramble(cell, true); cell.next = time + d / 600;}
    }
  }, {passive:true});
  document.addEventListener('visibilitychange', () => { if (!document.hidden) start(); });
  let width = 0;
  new ResizeObserver(() => {
    const room = canvas.parentElement.clientWidth;
    if (room !== width && atlas.complete && atlas.naturalWidth) {width = room; layout();}
  }).observe(canvas.parentElement);
  atlas.onload = () => {width = canvas.parentElement.clientWidth; layout(); start();};
  atlas.src = '/navigation/glyph-atlas.svg?v=28';
}

const canvas = document.querySelector('.mm-missing-code');
if (canvas) mountMissing(canvas);
