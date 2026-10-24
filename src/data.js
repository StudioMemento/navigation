let cached;

export async function loadContent() {
  if (cached) return cached;
  const names = ['catalog', 'projects', 'experiences'];
  const values = await Promise.all(names.map(async name => {
    const response = await fetch(`./content/${name}.json`);
    if (!response.ok) throw new Error(`Impossibile caricare ${name}`);
    return response.json();
  }));
  cached = Object.fromEntries(names.map((name, index) => [name, values[index]]));
  return cached;
}
