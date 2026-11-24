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

test('Food keeps its poster and mounts its first demo near the panel', async () => {
  const html=await readFile('index.html','utf8'),app=await readFile('src/app.js','utf8');
  assert.match(html,/id="demo-poster" src="assets\/heroes\/food.webp"/);
  assert.match(html,/id="fallback-link"[^>]+href="https:\/\/mementofood.vercel.app\/"/);
  const startup=app.slice(app.indexOf('portfolio.render(); updateSelection(selected,false);'),app.indexOf("$('#portfolio').addEventListener('keydown'"));
  assert.match(startup,/new IntersectionObserver\(entries=>/);
  assert.match(startup,/if\(!entries\.some\(entry=>entry\.isIntersecting\)\)return;[\s\S]*?player\.load\(selectedExperience\(\)\)/);
  assert.match(startup,/nearDemo\.observe\(panel\)/);
});
