/** The same data drives the catalogue, the archive at the end of a project, the selector and the project sections. */
export const domains = { web:'Web', '3d':'3D', video:'Video', visual:'Visual', design:'Design', branding:'Branding' };
export const aliases = { hyperknife:'hyperknife-epic', coricama:'coricama-dark' };
export const projectName = project => [project.title, project.variant].filter(Boolean).join(' — ');
export const filterProjects = (projects, domain) => domain === 'all' ? projects : projects.filter(project => project.domains.includes(domain));
export const wrapIndex = (index, length) => (index % length + length) % length;
export const modulesFor = project => (project.modules || []).filter(module => module.items?.length);

const MEDIA = ['image', 'video', 'model', 'embed'];
const EXPERIENCE = ['web', 'video', 'model'];
const isUrl = value => typeof value === 'string' && /^(https:\/\/|assets\/)/.test(value);

/**
 * Optional fields for the integration of each case study (see LEGGIMI):
 *   gallery     [{type:'image', src, thumb?, alt?}]       default: the images of the modules (then the overview)
 *   experience  {type:'web'|'video'|'model', url?, embed?, src?, poster?, title?, ratio?} | false
 *   vision      {copy, title?} | false
 */
export function validateProjects(projects) {
  const ids = new Set();
  if (!Array.isArray(projects) || !projects.length) throw new Error('Empty portfolio');
  for (const project of projects) {
    if (!/^[a-z0-9-]+$/.test(project.id) || ids.has(project.id)) throw new Error('Invalid or duplicate project ID');
    ids.add(project.id);
    if (!project.title || !project.cover || !project.domains?.length || project.domains.some(domain => !domains[domain])) throw new Error(`Invalid project: ${project.id}`);
    const moduleIds = new Set(['overview']);
    for (const module of modulesFor(project)) {
      if (!/^[a-z0-9-]+$/.test(module.id) || moduleIds.has(module.id)) throw new Error(`Invalid module: ${project.id}/${module.id}`);
      moduleIds.add(module.id);
      for (const item of module.items) {
        if (!MEDIA.includes(item.type) || !(item.src || item.embed)) throw new Error(`Invalid media: ${project.id}/${module.id}`);
        if (item.type !== 'image' && !item.poster) throw new Error(`A poster is required: ${project.id}/${module.id}`);
      }
    }
    if (project.gallery !== undefined) {
      if (!Array.isArray(project.gallery) || project.gallery.some(item => item?.type !== 'image' || !isUrl(item.src))) throw new Error(`Invalid gallery: ${project.id}`);
    }
    const x = project.experience;
    if (x !== undefined && x !== null && x !== false) {
      if (!EXPERIENCE.includes(x.type)) throw new Error(`Invalid experience type: ${project.id}`);
      if (x.type === 'web' && !isUrl(x.embed || x.url)) throw new Error(`An experience URL is required: ${project.id}`);
      if (x.type === 'video' && !isUrl(x.embed || x.src)) throw new Error(`A video embed or file is required: ${project.id}`);
      if (x.type === 'model' && !isUrl(x.src)) throw new Error(`A 3D model file is required: ${project.id}`);
      if (x.poster && !isUrl(x.poster)) throw new Error(`Invalid experience poster: ${project.id}`);
    }
    const v = project.vision;
    if (v !== undefined && v !== null && v !== false && (typeof v !== 'object' || typeof v.copy !== 'string')) throw new Error(`Invalid vision: ${project.id}`);
  }
  return projects;
}
