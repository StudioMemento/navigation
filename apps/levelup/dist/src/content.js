export const START_URL = 'https://mementostudio.it/start';
export const SERVICES_URL = 'https://mementoservizi.vercel.app/';

export const benefits = [
  { id: 'web', domain: 'WEB DESIGN', title: ['Un sito che parla di te.'], copy: 'Racconta ciò che fai.\nRendi semplice il prossimo passo.', asset: 'assets/v14/web.webp', alt: 'Superfici astratte di grafite con griglie di interfaccia, layout e margini tra scie di particelle' },
  { id: '3d', domain: '3D DESIGN', title: ['Ogni dettaglio, da esplorare.'], copy: 'Dai forma ai tuoi prodotti.\nLasciali scoprire, ruotare, personalizzare.', asset: 'assets/v14/3d.webp', alt: 'Superfici di grafite che si dissolvono in wireframe, edge e vertici di modellazione' },
  { id: 'video', domain: 'VIDEO', title: ['La tua storia, in movimento.'], copy: 'Dai ritmo al tuo messaggio.\nDal primo sguardo all’ultimo frame.', asset: 'assets/v14/video.webp', alt: 'Framing e tracce di timeline integrati in membrane astratte e particelle di carbone' },
  { id: 'visual', domain: 'VISUAL', title: ['Immagini che parlano per te.'], copy: 'Mostra ciò che ti distingue.\nCon luce, atmosfera e dettagli.', asset: 'assets/v14/visual.webp', alt: 'Ottica fotografica, diaframma e triangolo di esposizione tra superfici astratte e particelle' },
  { id: 'design', domain: 'DESIGN', title: ['Il tuo messaggio prende forma.'], copy: 'Dai ordine alle tue idee.\nGrafiche chiare, dal digitale alla stampa.', asset: 'assets/v14/design.webp', alt: 'Crocini di registro, matita e griglie editoriali incisi in superfici astratte' },
  { id: 'branding', domain: 'BRANDING', title: ['Un’identità che si riconosce.'], copy: 'Esprimi il carattere del tuo brand.\nCon coerenza, in ogni incontro.', asset: 'assets/v14/branding.webp', alt: 'Identità coordinata e confezioni evocate da superfici astratte con il segno Memento' },
];

export const serviceUrl = item => `${SERVICES_URL}#${item.id}`;

export const visions = [
  { id: 'product', title: ['Il tuo prodotto, protagonista.'], copy: 'Materiali e dettagli che raccontano\nil\u00a0suo\u00a0valore.', alt: 'Cuffie premium con materiali e dettagli di prodotto', before: 'assets/v14/product-before.webp', after: 'assets/v14/product-after.webp' },
  { id: 'brand', title: ['La tua identità, ovunque.'], copy: 'Dal packaging allo schermo.\nLo\u00a0stesso\u00a0carattere.', alt: 'Packaging per caffetteria e pagina mobile con la stessa composizione grafica', before: 'assets/v14/brand-before.webp', after: 'assets/v14/brand-after.webp' },
  { id: 'collection', title: ['La tua collezione, da scoprire.'], copy: 'Prodotti da esplorare,\nanche\u00a0prima\u00a0di averli davanti.', alt: 'Poltrona, lampada e catalogo digitale della collezione', before: 'assets/v14/collection-before.webp', after: 'assets/v14/collection-after.webp' },
];

export const steps = [
  { number: '01', title: ['Capiamo', 'il tuo obiettivo.'], copy: 'Da dove parti, dove vuoi arrivare.\nCominciamo da qui.', asset: 'assets/v09/step-idea.webp' },
  { number: '02', title: ['Definiamo', 'il progetto.'], copy: 'Scegliamo insieme cosa realizzare.\nE come farlo funzionare per te.', asset: 'assets/v09/step-project.webp' },
  { number: '03', title: ['Prepariamo', 'l’offerta.'], copy: 'Attività, tempi e costi.\nTutto chiaro, prima di iniziare.', asset: 'assets/v09/step-offer.webp' },
];

// Public production aliases. No preview deployment URLs or legacy Memento routes.
export const experiences = [
  { id: 'fashion', title: 'Fashion', categories: ['Ecommerce', 'Vetrina digitale'], asset: 'assets/heroes/fashion.webp', url: 'https://mementofashion.vercel.app/' },
  { id: 'elite', title: 'Elite', categories: ['Vetrina digitale', 'Landing page'], asset: 'assets/heroes/elite.webp', url: 'https://mementoelite.vercel.app/' },
  { id: 'food', title: 'Memento Food', categories: ['Vetrina digitale', 'Menù interattivo'], asset: 'assets/heroes/food.webp', url: 'https://mementofood.vercel.app/' },
  { id: 'auren', title: 'Auren', categories: ['Esperienza digitale', 'Landing page'], asset: 'assets/heroes/auren.webp', url: 'https://mementoauren.vercel.app/' },
  { id: 'icecream', title: 'IceCream', categories: ['Vetrina digitale', 'Showroom digitale'], asset: 'assets/heroes/icecream.webp', url: 'https://mementoicecream.vercel.app/?gusto=pistacchio' },
  { id: 'gamma', title: 'MementoSL', categories: ['Vetrina digitale', 'Showroom digitale'], asset: 'assets/heroes/gamma.webp', url: 'https://mementosl.vercel.app/' },
  { id: 'knives', title: 'Knives', categories: ['Showroom digitale', 'Configuratore 3D'], asset: 'assets/heroes/knives.webp', url: 'https://knives.vercel.app/' },
  { id: 'productvis', title: 'ProductVis', categories: ['Player 3D', 'Configuratore 3D'], asset: 'assets/heroes/productvis.webp', url: 'https://productvis.vercel.app/' },
  { id: 'techref', title: 'TechRef', categories: ['Comparatore', 'Vetrina digitale'], asset: 'assets/heroes/techref.webp', url: 'https://techref.vercel.app/' },
  { id: 'visualref', title: 'VisualRef', categories: ['Editor 3D', 'DCC'], asset: 'assets/heroes/visualref.webp', url: 'https://visualref.vercel.app/' },
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
