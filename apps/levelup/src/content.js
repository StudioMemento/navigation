export const START_URL = 'https://mementostudio.it/start';

export const benefits = [
  { id: 'web-design', domain: 'Web Design', title: ['Avere un sito che ti rappresenta.'], copy: 'Web design su misura per il tuo brand.\nChiaro da esplorare, semplice da usare.', asset: 'assets/v11/web-design.webp', alt: 'Piani di interfaccia astratti in grafite, organizzati in una struttura chiara' },
  { id: '3d-design', domain: '3D Design', title: ['Avere idee da esplorare in 3D.'], copy: 'Modelli e configuratori da vivere.\nOgni dettaglio prende forma.', asset: 'assets/v11/3d-design.webp', alt: 'Un volume astratto si trasforma da reticolo poligonale a materia' },
  { id: 'video', domain: 'Video', title: ['Avere una storia che si fa guardare.'], copy: 'Video e motion per raccontare chi sei.\nCon ritmo, carattere e una direzione.', asset: 'assets/v11/video.webp', alt: 'Una sequenza di fotogrammi scultorei suggerisce il movimento nel tempo' },
  { id: 'visual', domain: 'Visual', title: ['Avere un’immagine che lascia il segno.'], copy: 'Visual che rendono riconoscibile il tuo mondo.\nLuce, composizione e dettagli che parlano di te.', asset: 'assets/v11/visual.webp', alt: 'Un prisma scuro trasforma luce e piani in una composizione visiva' },
  { id: 'design', domain: 'Design', title: ['Avere un’idea che prende forma.'], copy: 'Dall’intuizione al design del tuo progetto.\nForme, materiali e funzione, insieme.', asset: 'assets/v11/design.webp', alt: 'Un segno progettuale si sviluppa in una struttura tridimensionale di grafite' },
  { id: 'branding', domain: 'Branding', title: ['Avere un’identità riconoscibile.'], copy: 'Branding che tiene insieme immagine e voce.\nPer raccontare chi sei, ovunque.', asset: 'assets/v11/branding.webp', alt: 'Frammenti geometrici coordinati compongono un’identità astratta' },
];

export const visions = [
  { id: 'product', title: ['Il tuo prodotto,', 'protagonista.'], copy: 'Materiali, luce e dettagli.\nLa qualità prende forma.', alt: 'Flacone di profumo senza marchio', before: 'assets/v09/product-before.webp', after: 'assets/v09/product-after.webp' },
  { id: 'brand', title: ['Il tuo brand,', 'ovunque.'], copy: 'Dal packaging al digitale.\nLa stessa identità, in ogni incontro.', alt: 'Shopper, confezione, biglietti e smartphone coordinati', before: 'assets/v09/brand-before.webp', after: 'assets/v09/brand-after.webp' },
  { id: 'collection', title: ['La tua collezione,', 'online.'], copy: 'Il tuo catalogo prende vita.\nOgni dettaglio, a portata di mano.', alt: 'Poltrona e tablet con il suo catalogo', before: 'assets/v09/collection-before.webp', after: 'assets/v09/collection-after.webp' },
];

export const steps = [
  { number: '01', title: ['Capiamo il tuo', 'obiettivo.'], copy: 'Ci racconti da dove parti.\nMettiamo a fuoco cosa vuoi ottenere.', asset: 'assets/v09/step-idea.webp' },
  { number: '02', title: ['Definiamo', 'il progetto.'], copy: 'Scegliamo insieme cosa realizzare.\nCon una direzione chiara e concreta.', asset: 'assets/v09/step-project.webp' },
  { number: '03', title: ['Prepariamo', 'l’offerta.'], copy: 'Ricevi attività, tempi e costi.\nTutto chiaro, prima di partire.', asset: 'assets/v09/step-offer.webp' },
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
