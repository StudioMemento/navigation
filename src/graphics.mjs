// The site's DOM and fibre still are the visual fallback when decoration would be
// rasterised on the CPU. The interactive Studio model has its own independent renderer.
export function staticArtwork(rendererName) {
  if (!/swiftshader|llvmpipe|softpipe|software|basic render|\bwarp\b/i.test(rendererName)) return false;
  const native = document.documentElement.hasAttribute('data-memento-native') || document.getElementById('hub');
  const override = new URLSearchParams(location.search).get('vfx');
  if (!native || ['low', 'medium', 'high'].includes(override)) return false;
  document.documentElement.setAttribute('data-mm-software', '');
  try { sessionStorage.setItem('memento.artwork.software', '1'); } catch {}
  return true;
}
