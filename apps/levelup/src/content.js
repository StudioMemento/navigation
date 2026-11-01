export const START_URL = 'https://mementostudio.it/start';

export const benefits = [
  { id: 'valore', title: ['Il tuo valore,', 'a prima vista.'], copy: 'La qualità del tuo lavoro merita\nun’immagine all’altezza.', asset: 'assets/editorial/value.webp', alt: 'Libro di identità Memento e biglietti su un piano scuro' },
  { id: 'identita', title: ['Un’immagine', 'che ti somiglia.'], copy: 'Colori, parole e contenuti.\nLa stessa identità, ovunque.', asset: 'assets/editorial/identity.webp', alt: 'Packaging e shopper coordinati' },
  { id: 'coinvolgimento', title: ['Più voglia', 'di esplorarti.'], copy: 'Dalla prima impressione\nal piacere di scoprire di più.', asset: 'assets/heroes/icecream.webp', alt: 'Il mondo sensoriale di IceCream' },
  { id: 'dettagli', title: ['Ogni dettaglio,', 'più chiaro.'], copy: 'Prodotti da osservare,\nconfigurare e conoscere.', asset: 'assets/heroes/productvis.webp', alt: 'Automobile in una scena di visualizzazione prodotto' },
  { id: 'chiarezza', title: ['Capirti diventa', 'più semplice.'], copy: 'Un sito che racconta chi sei\ne aiuta a trovare ciò che conta.', asset: 'assets/editorial/website.webp', alt: 'Sito Memento su un portatile' },
];

// Public production aliases. No preview deployment URLs or legacy Memento routes.
export const experiences = [
  { id: 'fashion', title: 'Fashion', category: 'Siti web', asset: 'assets/heroes/fashion.webp', url: 'https://mementofashion.vercel.app/' },
  { id: 'auren', title: 'Auren', category: 'Esperienze digitali', asset: 'assets/heroes/auren.webp', url: 'https://mementoauren.vercel.app/' },
  { id: 'productvis', title: 'ProductVis', category: 'Configuratori 3D', asset: 'assets/heroes/productvis.webp', url: 'https://productvis.vercel.app/' },
  { id: 'icecream', title: 'IceCream', category: 'Esperienze digitali', asset: 'assets/heroes/icecream.webp', url: 'https://mementoicecream.vercel.app/?gusto=pistacchio' },
  { id: 'elite', title: 'Elite', category: 'Siti web', asset: 'assets/heroes/elite.webp', url: 'https://mementoelite.vercel.app/' },
  { id: 'knives', title: 'Knives', category: 'Configuratori 3D', asset: 'assets/heroes/knives.webp', url: 'https://knives.vercel.app/' },
  { id: 'food', title: 'Memento Food', category: 'Siti web', asset: 'assets/heroes/food.webp', url: 'https://mementofood.vercel.app/' },
  { id: 'gamma', title: 'Unfreeze', category: 'Esperienze digitali', asset: 'assets/heroes/gamma.webp', url: 'https://mementosl.vercel.app/' },
  { id: 'techref', title: 'TechRef', category: 'Siti web', asset: 'assets/heroes/techref.webp', url: 'https://techref.vercel.app/#/categoria/smartphone?set=selection&order=antutu&platform=iOS' },
  { id: 'visualref', title: 'VisualRef', category: 'Esperienze digitali', asset: 'assets/heroes/visualref.webp', url: 'https://visualref.vercel.app/' },
];

export function contactUrl(experience) {
  const url = new URL(START_URL);
  url.searchParams.set('from', 'levelup');
  if (experience) {
    url.searchParams.set('experience', experience.id);
    url.searchParams.set('idea', `Mi interessa un’esperienza come ${experience.title}.`);
  }
  return url.href;
}
