export const CONTACT = Object.freeze({
  email: 'info@mementostudio.it',
  phone: '+393285454661',
  phoneLabel: '+39 328 5454 661',
  instagram: 'https://www.instagram.com/mementostudio.it/',
});

export const WORLDS = [
  { id: 'memento', title: 'MEMENTO', label: 'Home', color: '#d6b892', yaw: Math.PI, elevation: 1.7,
    kicker: 'Design da ricordare.', description: 'Identità, immagini ed esperienze digitali. Diamo forma a ciò che ti rende unico.', cta: 'Esplora i servizi', href: '/servizi' },
  { id: 'studio', title: 'STUDIO', label: 'Studio', color: '#b9c8c4', yaw: .2, elevation: 1.55,
    kicker: 'Dentro Memento.', description: 'Il nostro spazio. Il nostro modo di creare. Un’unica direzione, dal primo pensiero all’ultimo dettaglio.', cta: 'Conosci lo studio', href: '/studio' },
  { id: 'servizi', title: 'SERVIZI', label: 'Servizi', color: '#e99b70', yaw: .06, elevation: 2.25,
    kicker: 'Le idee prendono forma.', description: 'Dal brand al digitale. Scegli un servizio o costruisci un percorso insieme a noi.', cta: 'Esplora i servizi', href: '/servizi' },
  { id: 'portfolio', title: 'PORTFOLIO', label: 'Portfolio', color: '#b6a9dd', yaw: .13, elevation: 1.75,
    kicker: 'Progetti da esplorare.', description: 'Identità, prodotti, immagini e mondi digitali. Entra nei dettagli del nostro lavoro.', cta: 'Guarda i progetti', href: '/portfolio' },
  { id: 'level-up', title: 'LEVEL UP', label: 'Level Up', color: '#88b2d0', yaw: Math.PI, elevation: 2.1,
    kicker: 'L’hai visto. Ora provalo.', description: 'Esplora un prodotto, cambia prospettiva, entra in un’esperienza. Qui il design risponde.', cta: 'Prova le esperienze', href: '/level-up' },
  { id: 'start', title: 'START', label: 'Start', color: '#d7bd85', yaw: 0, elevation: 3.85,
    kicker: 'Facciamolo succedere.', description: 'Un’idea, un progetto da far crescere o una domanda. Partiamo da una conversazione.', cta: 'Parliamone', href: '/start' },
];

export const CATEGORY_LABELS = { all: 'Tutti', web: 'Web', '3d': '3D', design: 'Design', film: 'Film', foto: 'Fotografia', photo: 'Fotografia', print: 'Stampa' };
export const ASSET_ROOTS = { services: './sockets/servizi/assets/', portfolio: './sockets/portfolio/', demos: './sockets/level-up/' };
