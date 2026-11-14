# Memento LevelUp · V19 — VFX di START e Ready to start da VisualFX

Pacchetto completo per Vercel, sulla base della V18 (navbar V12, caroselli, demo, confronti, step). Include sorgenti, asset locali, font Inter, il motore VFX già compilato e la build pronta in `dist/`. Il deploy non richiede dipendenze npm né variabili d'ambiente.

## Cosa cambia rispetto alla V18

1. **VFX di START V23 su tutta la pagina.** Lo stesso motore (Three.js + GSAP, un solo canvas WebGL dietro il contenuto), le stesse costanti e lo stesso materiale della pagina START: tassellazione monocromatica legata allo scroll, reazione a catena ambra su puntatore, tocco e focus, glow e bloom dei titoli, particelle, caricamento a celle. Il DOM resta la fonte di verità per layout, testi, focus e click; quando il motore è pronto aggiunge `html.vfx-live` e il DOM smette di dipingere le superfici registrate.
2. **Ready to start da VisualFX.** La tab non contiene più la distribuzione cinematic locale: incorpora la pagina pubblicata https://visualfx.vercel.app/ in un iframe. Il click sull'effetto porta a Start nella finestra principale, con il contesto della visita (esperienza selezionata), come prima.
3. **Sfondo nero vero (`#000`), nessuna scena di sfondo** (sarà sviluppata in seguito). Anche `theme-color` è `#000000`. Con il nero vero la sfocatura progressiva della navbar non produce bande.

## Superfici VFX

| Superficie | Tipo | Note |
| --- | --- | --- |
| I quattro titoli di sezione | `title` | Gradiente monocromo a riposo, ambra in hover; dopo il fit del font il motore rimisura (`invalidate`) |
| Board dei domini e del portfolio | `card` | Disegnati attraverso la stessa trasformazione 3D del carosello (prospettiva, rotazione, scala), ritagliati e sfumati dal carosello, attenuati con `--slide-focus`; ogni frame del carosello avvisa il motore (`motion`) |
| Card "Immaginalo per il tuo brand" | `card` | Prima/dopo diviso dal range; la linea è del motore, la maniglia resta DOM (`data-vfx-dom`) |
| Card degli step | `card` | Maschera dell'immagine letta dal CSS |

Restano DOM: demo con iframe, punti dei caroselli, navbar, scrollbar, Ready to start (è una pagina a sé). Le superfici sono dichiarate nel markup con attributi `data-vfx*` (elenco in `vfx/src/index.ts`).

Avvio: `bootstrap.js` nasconde il contenuto (`vfx-boot`) finché il motore non disegna il primo frame, al massimo 3 s. Senza WebGL2, con *reduced motion* o *forced colors* la pagina DOM compare subito; qualsiasi errore o la perdita del contesto tolgono `vfx-live` e torna la pagina DOM. Il motore si ferma mentre una demo è espansa.

## Aggiornamento su Vercel

Usare il contenuto dello ZIP come root del progetto, sostituendo il pacchetto precedente (così spariscono i file della distribuzione cinematic locale).

| Impostazione | Valore |
| --- | --- |
| Framework | Other |
| Build command | `npm run build` |
| Output directory | `dist` |
| Install command | Vuoto |
| Node.js | 20 o successivo |

## Sviluppo e verifica

```sh
npm run dev      # http://localhost:4173
npm run build
npm test         # 18 test + verifica delle risorse di dist/
```

Il motore VFX è in `vfx/` (TypeScript) ed è già compilato in `public/vfx/`. Va ricompilato solo se si modifica il motore:

```sh
cd vfx
npm install
npm test         # 29 test (catena, struttura, proiezione delle board)
npm run build    # → ../public/vfx/
```

`?vfxdebug` nell'URL espone il motore in console (`window.__vfx`).

## File da aggiornare in futuro

- `vfx/src/`: motore VFX (sincronizzarlo con START quando cambia il DNA VFX; le estensioni LevelUp sono marcate `LevelUp` nel codice e in `projective.ts`).
- `src/vfx.css`: stato a riposo e regole `vfx-live`.
- `public/ready-to-start/embed.html` e `src/ready-to-start.js`: incorporamento di VisualFX (vedi `READY_TO_START.md`).
- `public/navigation/`: kit navbar completo.
- `src/content.js`: contenuti ed esperienze.

Verifica e limiti noti in `design-qa.md`. La consegna è uno ZIP: non aggiorna automaticamente il deploy pubblico.
