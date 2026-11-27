// All catalogue artwork is 3:2. The variants follow one checked asset convention.
export function media(name) {
  const board = name.includes('/');
  const widths = !board || name.endsWith('/hero') ? [320, 640, 1536] : [768, 1536];
  const variant = (width) =>
    board
      ? `assets/${name}-${width}.webp`
      : width === 1536
        ? `assets/${name}.webp`
        : `assets/responsive/${name}-${width}.webp`;
  return {
    src: variant(1536),
    srcset: widths.map((width) => `${variant(width)} ${width}w`).join(', '),
    width: 1536,
    height: 1024,
  };
}
