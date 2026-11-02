export const START_URL = 'https://mementostudio.it/start';

export const benefits = [
  { id: 'immagine', title: ['Avere un’immagine', 'chiara.'], copy: 'Il valore del tuo lavoro, riconoscibile\nfin dal primo sguardo.', asset: 'assets/editorial/value.webp', alt: 'Libro di identità Memento e biglietti su un piano scuro' },
  { id: 'comunicazione', title: ['Avere una comunicazione', 'coerente.'], copy: 'Parole, immagini e contenuti\nche raccontano la stessa storia.', asset: 'assets/editorial/identity.webp', alt: 'Packaging e shopper coordinati' },
  { id: 'direzione', title: ['Avere vision e mission', 'chiare.'], copy: 'Sapere chi sei e dove vuoi arrivare.\nE renderlo visibile a chi ti sceglie.', asset: 'assets/editorial/website.webp', alt: 'Identità e sito Memento presentati insieme' },
  { id: 'prodotto', title: ['Avere un prodotto', 'che si fa capire.'], copy: 'Dettagli da esplorare, qualità da vedere.\nAnche prima di averlo tra le mani.', asset: 'assets/heroes/productvis.webp', alt: 'Automobile in una scena di visualizzazione prodotto' },
  { id: 'esperienza', title: ['Avere un’esperienza', 'che ti somiglia.'], copy: 'Un mondo digitale che parla di te.\nE invita le persone a scoprirti.', asset: 'assets/heroes/icecream.webp', alt: 'Il mondo sensoriale di IceCream' },
];

export const visions = [
  { id: 'product', title: ['Il tuo prodotto,', 'protagonista.'], copy: 'Materiali, luce e dettagli.\nLa qualità prende forma.', alt: 'Flacone di profumo senza marchio', before: 'assets/v09/product-before.webp', after: 'assets/v09/product-after.webp' },
  { id: 'brand', title: ['Il tuo brand,', 'ovunque.'], copy: 'Dal packaging al digitale.\nLa stessa identità, in ogni incontro.', alt: 'Shopper, confezione, biglietti e smartphone coordinati', before: 'assets/v09/brand-before.webp', after: 'assets/v09/brand-after.webp' },
  { id: 'collection', title: ['La tua collezione,', 'online.'], copy: 'Il tuo catalogo prende vita.\nOgni dettaglio, a portata di mano.', alt: 'Poltrona e tablet con il suo catalogo', before: 'assets/v09/collection-before.webp', after: 'assets/v09/collection-after.webp' },
];

export const steps = [
  { number: '01', title: ['Raccontaci', 'la tua idea.'], copy: 'Da dove parti.\nCosa vorresti realizzare.', asset: 'assets/v09/step-idea.webp' },
  { number: '02', title: ['Definiamo', 'il progetto.'], copy: 'Mettiamo a fuoco insieme\nobiettivi e direzione.', asset: 'assets/v09/step-project.webp' },
  { number: '03', title: ['Ti presentiamo', 'l’offerta.'], copy: 'Attività, tempi e costi.\nTutto chiaro, fin dall’inizio.', asset: 'assets/v09/step-offer.webp' },
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
