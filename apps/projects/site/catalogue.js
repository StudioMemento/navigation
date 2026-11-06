/** The same data drives the catalogue, project selector and media modules. */
export const domains = { web:'Web', '3d':'3D', video:'Video', visual:'Visual', design:'Design', branding:'Branding' };
export const aliases = { hyperknife:'hyperknife-epic', coricama:'coricama-dark' };
export const projectName = project => [project.title, project.variant].filter(Boolean).join(' — ');
export const filterProjects = (projects, domain) => domain === 'all' ? projects : projects.filter(project => project.domains.includes(domain));
export const wrapIndex = (index, length) => (index % length + length) % length;
export const modulesFor = project => (project.modules || []).filter(module => module.items?.length);
export const sliderItems = (project, id) => id === 'overview' ? project.overview : modulesFor(project).find(module => module.id === id)?.items || [];
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
        if (!['image','video','model','embed'].includes(item.type) || !(item.src || item.embed)) throw new Error(`Invalid media: ${project.id}/${module.id}`);
        if (item.type !== 'image' && !item.poster) throw new Error(`A poster is required: ${project.id}/${module.id}`);
      }
    }
  }
  return projects;
}
