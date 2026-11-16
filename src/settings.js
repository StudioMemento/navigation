// Lab defaults (?lab=1). Colour, timing and density are the DNA's own (src/vfx/config.mjs) and are not tuned here.
export const DEFAULTS = Object.freeze({reach:230,bloom:1,streak:1,parallax:1,edge:1,lights:1,shards:1});
export const settings = {...DEFAULTS};
// Authored source masks in image UV (origin bottom-left). Diffuse walls,
// print stock and floor reflections are deliberately excluded from emission.
export const LIGHTS = [
 [[.50,.70,.18,.15],[.34,.52,.10,.07],[.24,.55,.045,.11],[.66,.52,.10,.07],[.75,.55,.04,.11]],
 [[.50,.72,.14,.037]],
 [[.50,.74,.14,.045],[.50,.53,.04,.08],[.71,.55,.035,.04]],
 [[.417,.558,.008,.256],[.586,.558,.008,.256],[.50,.814,.086,.009],[.50,.307,.086,.009],[.50,.52,.085,.035]],
 [[.504,.66,.052,.046]]
];
export const DEPTH = [
  [[.28,.36,.19,.25,.75],[.72,.36,.18,.25,.8],[.5,.27,.13,.25,.63]],
  [[.29,.3,.2,.28,.85],[.5,.32,.34,.18,.65],[.5,.77,.22,.19,.3]],
  [[.5,.32,.4,.16,.8],[.5,.5,.32,.18,.4]],
  [[.5,.53,.18,.44,.55],[.14,.3,.16,.25,.8]],
  [[.32,.39,.18,.27,.73],[.69,.39,.18,.27,.75],[.5,.25,.25,.12,.93]]
];
