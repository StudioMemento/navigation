// The wall at rest: one tile of the logotype's letters, repeated over the whole document.
// The build draws it as an SVG; the live field reads the same cells, so a lit glyph resolves on the letter beneath it.
export const TILE_COLS = 23, TILE_ROWS = 29, TILE_PITCH = 12;
const LETTERS = [...'MEMENTO'];
// Index of each letter of MEMENTO in the atlas (M, E, N, T, O).
const ATLAS = {M:0, E:1, N:2, T:3, O:4};

export const tile = (() => {
  let seed = 10572;
  const next = () => {
    seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0;
    return seed / 4294967296;
  };
  const letters = new Int8Array(TILE_COLS * TILE_ROWS).fill(-1), opacity = new Float32Array(TILE_COLS * TILE_ROWS);
  const chars = [];
  for (let row = 0; row < TILE_ROWS; row++) {
    for (let col = 0; col < TILE_COLS; col++) {
      if (next() > .25) continue;
      const char = LETTERS[Math.floor(next() * LETTERS.length)];
      const i = row * TILE_COLS + col;
      letters[i] = ATLAS[char];
      opacity[i] = .08 + next() * .045;
      chars.push({col, row, char, opacity:opacity[i]});
    }
  }
  return {letters, opacity, chars};
})();

// The letter of the wall at a document cell, or -1 where the wall is empty.
export function wallLetter(col, row) {
  return tile.letters[(row % TILE_ROWS) * TILE_COLS + (col % TILE_COLS)];
}
