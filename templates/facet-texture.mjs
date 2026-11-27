// A periodic, jittered triangular mesh. Two adjacent tiles share exactly the same boundary vertices.
export function facetTexture() {
  const cells = 22;
  const step = 12;
  const side = cells * step;
  let seed = 42019;
  function random() {
    seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0;
    return seed / 4294967296;
  }
  const jitter = Array.from({length:cells * cells}, () => [(random() - .5) * 10, (random() - .5) * 10]);
  const paths = [];
  function vertex(x, y) {
    const col = (x + cells) % cells, row = (y + cells) % cells;
    const [dx, dy] = jitter[row * cells + col];
    return [(x * step + dx).toFixed(1), (y * step + dy).toFixed(1)].join(' ');
  }
  const tints = ['#fff3d4','#fff4dc','#fae6c6','#ffe9b7','#c49264','#bb8758','#dfa56a'];
  for (let y = -1; y <= cells; y++) {
    for (let x = -1; x <= cells; x++) {
      const a=vertex(x,y), b=vertex(x+1,y), c=vertex(x+1,y+1), d=vertex(x,y+1);
      const pieces=(x+y)%2 ? [[a,b,d],[b,c,d]] : [[a,b,c],[a,c,d]];
      for (const triangle of pieces) {
        if (random() > .68) continue;
        const color = tints[Math.floor(random() * tints.length)];
        const alpha = (.19 + random() * .37).toFixed(2);
        const wire = random() < .18 ? ' stroke="#fff2c9" stroke-opacity=".26" stroke-width=".45"' : '';
        paths.push(`<path d="M${triangle.join('L')}Z" fill="${color}" fill-opacity="${alpha}"${wire}/>`);
      }
    }
  }
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${side}" height="${side}" viewBox="0 0 ${side} ${side}">${paths.join('')}</svg>`;
}
