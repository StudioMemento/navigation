/**
 * R24: the distance field of a title's glyphs, off the main thread. Servizi read the painted pixels back
 * (getImageData) and ran the distance transform on the main thread whenever a title came near the viewport: about
 * 0.7 s of a 4 s scroll on a desktop, far more on a phone. The engine sends a scaled bitmap of the painted glyphs
 * and gets the encoded field back (raster.ts, distanceFieldAsync).
 */
import { encodeDistance, signedDistance } from './sdf';

interface Job { id: number; bitmap: ImageBitmap; w: number; h: number; scale: number; range: number }

const scope = self as unknown as { onmessage: ((e: MessageEvent<Job>) => void) | null; postMessage(message: unknown, transfer?: Transferable[]): void };
scope.onmessage = e => {
  const { id, bitmap, w, h, scale, range } = e.data;
  try {
    const canvas = new OffscreenCanvas(w, h), x = canvas.getContext('2d', { willReadFrequently: true })!;
    x.imageSmoothingEnabled = true; x.imageSmoothingQuality = 'high';
    x.drawImage(bitmap, 0, 0, w, h);
    bitmap.close();
    const data = encodeDistance(signedDistance(x.getImageData(0, 0, w, h).data, w, h, 4, 3), scale, range);
    scope.postMessage({ id, data, w, h }, [data.buffer]);
  } catch (error) {
    scope.postMessage({ id, error: String(error) });
  }
};
