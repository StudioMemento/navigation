import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, access, readdir } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';
import { experiences } from '../src/content.js';

test('V15 preserves the existing catalogue and the requested sequence', () => {
  assert.deepEqual(experiences.map(item => item.id), ['food','viaroma','elite','icecream','auren','fashion','gamma','knives','productvis','visualref','techref']);
  assert.deepEqual(experiences.slice(0,6).map(item => item.url), [
    'https://mementofood.vercel.app/', 'https://pizzeriaviaroma.vercel.app/',
    'https://mementoelite.vercel.app/', 'https://mementoicecream.vercel.app/',
    'https://mementoauren.vercel.app/', 'https://mementofashion.vercel.app/'
  ]);
  assert.deepEqual(experiences[1].categories, ['Menù interattivo','Vetrina digitale']);
});

test('The standalone navigation initializes once as LevelUp and every module and icon resolves in the build', async () => {
  const html=await readFile('dist/index.html','utf8');
  assert.equal((html.match(/src="navigation\/bootstrap.js"/g)||[]).length,1);
  assert.match(html,/src="navigation\/bootstrap.js" data-memento-page="levelup"/);
  const modules=(await readdir('dist/navigation')).filter(name=>/\.(mjs|js)$/.test(name));
  for(const name of modules) {
    const file=resolve('dist/navigation',name),text=await readFile(file,'utf8');
    const refs=[...text.matchAll(/(?:from\s*|new URL\()['"](\.\/[^'"]+)['"]/g)];
    for(const [,ref] of refs)await access(resolve(dirname(file),ref.split('?')[0]));
  }
  for(const name of ['child.mjs','host.mjs','assets/levelup-thumb.webp'])await access('dist/navigation/'+name);
  const styles=await readFile('dist/styles.css','utf8');
  assert.match(styles,/html\[data-demo-expanded=true\] memento-nav\{visibility:hidden\}/);
});

test('The initial player markup and synchronous startup agree on Food', async () => {
  const html=await readFile('index.html','utf8'),app=await readFile('src/app.js','utf8');
  assert.match(html,/id="demo-poster" src="assets\/heroes\/food.webp"/);
  assert.match(html,/id="fallback-link"[^>]+href="https:\/\/mementofood.vercel.app\/"/);
  assert.match(app,/portfolio\.render\(\); updateSelection\(selected,false\);[\s\S]*?\nplayer\.load\(selectedExperience\(\)\);/);
});
