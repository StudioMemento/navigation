export const START_URL = 'https://mementostudio.it/start';
export const SERVICES_URL = 'https://mementoservizi.vercel.app/';

export const benefits = [
  { id: 'web', domain: 'WEB', title: ['Un sito che parla di te.'], copy: 'Racconta ciò che fai.\nRendi semplice il prossimo passo.', asset: 'assets/v12/web.webp', alt: 'Piani incompleti di grafite emergono da scie di particelle, con luce ambra da destra' },
  { id: '3d', domain: '3D', title: ['Ogni dettaglio, da esplorare.'], copy: 'Dai forma ai tuoi prodotti.\nLasciali scoprire, ruotare, personalizzare.', asset: 'assets/v12/3d.webp', alt: 'Un volume astratto sospeso tra materia, reticolo e polvere di carbone' },
  { id: 'video', domain: 'VIDEO', title: ['La tua storia, in movimento.'], copy: 'Dai ritmo al tuo messaggio.\nDal primo sguardo all’ultimo frame.', asset: 'assets/v12/video.webp', alt: 'Frammenti scuri e scie di polvere suggeriscono una sequenza in movimento' },
  { id: 'visual', domain: 'VISUAL', title: ['Immagini che parlano per te.'], copy: 'Mostra ciò che ti distingue.\nCon luce, atmosfera e dettagli.', asset: 'assets/v12/visual.webp', alt: 'Luce ambra attraversa una forma indefinita di grafite e vetro scuro' },
  { id: 'design', domain: 'DESIGN', title: ['Il tuo messaggio prende forma.'], copy: 'Dai ordine alle tue idee.\nGrafiche chiare, dal digitale alla stampa.', asset: 'assets/v12/design.webp', alt: 'Superfici astratte e frammenti di carbone compongono una forma in divenire' },
  { id: 'branding', domain: 'BRANDING', title: ['Un’identità che si riconosce.'], copy: 'Esprimi il carattere del tuo brand.\nCon coerenza, in ogni incontro.', asset: 'assets/v12/branding.webp', alt: 'Tracce intrecciate di grafite si raccolgono in un’identità astratta' },
];

export const serviceUrl = item => `${SERVICES_URL}#${item.id}`;

export const visions = [
  { id: 'product', title: ['Il tuo prodotto, protagonista.'], copy: 'Materiali e dettagli che raccontano il suo valore.', alt: 'Flacone di profumo', before: 'assets/v12/product-before.webp', after: 'assets/v12/product-after.webp' },
  { id: 'brand', title: ['La tua identità, ovunque.'], copy: 'Dal packaging allo schermo. Lo stesso carattere.', alt: 'Shopper, confezione, biglietti e smartphone coordinati', before: 'assets/v12/brand-before.webp', after: 'assets/v12/brand-after.webp' },
  { id: 'collection', title: ['La tua collezione, da scoprire.'], copy: 'Prodotti da esplorare, anche prima di averli davanti.', alt: 'Poltrona e tablet con il suo catalogo', before: 'assets/v12/collection-before.webp', after: 'assets/v12/collection-after.webp' },
];

export const steps = [
  { number: '01', title: ['Capiamo', 'il tuo obiettivo.'], copy: 'Da dove parti, dove vuoi arrivare.\nCominciamo da qui.', asset: 'assets/v09/step-idea.webp' },
  { number: '02', title: ['Definiamo', 'il progetto.'], copy: 'Scegliamo insieme cosa realizzare.\nE come farlo funzionare per te.', asset: 'assets/v09/step-project.webp' },
  { number: '03', title: ['Prepariamo', 'l’offerta.'], copy: 'Attività, tempi e costi.\nTutto chiaro, prima di iniziare.', asset: 'assets/v09/step-offer.webp' },
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
