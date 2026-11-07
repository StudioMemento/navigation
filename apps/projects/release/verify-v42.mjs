import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { detailFor, detailMarkup, galleryStage, processDeck } from '../site/project-layout.js';
import { validateProjects, wrapIndex } from '../site/catalogue.js';
import { titleLayout } from '../site/title-fit.js';

const projects=validateProjects(JSON.parse(await readFile(new URL('../site/projects.json',import.meta.url))));
const prohibited=/Tutti i progetti|Continua a esplorare|class="(?:rail-dot|process-dot|slide-count|pagination)"/;
assert(prohibited.test('<span class="slide-count">01 / 05</span>'));
assert(prohibited.test('Tutti i progetti'));
const visibleText=html=>html.replace(/<[^>]*>/g,'').trim();
assert.equal(visibleText('<div>Immagine / render 01</div>'),'Immagine / render 01');
for(const project of projects){
  const detail=detailFor(project),html=detailMarkup(project);
  assert(!prohibited.test(html),project.id);
  let last=-1;
  for(const id of ['project-overview','project-experience','project-vision','project-process']){
    const next=html.indexOf(`id="${id}"`);assert(next>last,project.id+'/'+id);last=next;
  }
  for(let index=0;index<detail.gallery.length;index++){
    assert.equal(visibleText(galleryStage(detail.gallery[index])),'');
    const changed=detailMarkup(project,index,index);
    assert(changed.includes(`data-index="${index}" aria-label="Mostra contenuto ${index+1}" aria-pressed="true"`));
    const deck=processDeck(detail.process,index);
    assert.equal((deck.match(/data-visible="true"/g)||[]).length,3);
    assert.equal((deck.match(/data-active="true"/g)||[]).length,1);
  }
  assert.equal(wrapIndex(-1,detail.gallery.length),detail.gallery.length-1);
  assert.equal(wrapIndex(detail.gallery.length,detail.gallery.length),0);
  assert(html.includes('vision-frame'));
}
const source=await readFile(new URL('../site/app.js',import.meta.url),'utf8');
const index=await readFile(new URL('../site/index.html',import.meta.url),'utf8');
assert(!prohibited.test(source+index));
assert.equal((source.match(/\$\{coverflowMarkup\(/g)||[]).length,2);
assert(!source.includes('else goStart()'));
// Fitting is tested independently of a browser with nonuniform glyph metrics.
const measure=text=>[...text].reduce((sum,char)=>sum+('MW'.includes(char)?.95:'I '.includes(char)?.28:.65),0);
for(const width of [240,280,343,675,901,1199,1720])for(const text of ['A','Coricama','Memento Design Studio','Architetture digitali per esperienze memorabili','UnTitoloLunghissimoSenzaSpaziDiSeparazione','Memento\nDesign Studio']){
  const layout=titleLayout(text,width,Math.min(300,width*.26),measure);
  assert(layout.lines.every(line=>measure(line)*layout.size<=width+.001));
  assert(layout.size>0);
  if(text.includes('\n'))assert.equal(layout.lines.length,2);
  else assert(layout.lines.length<=2);
}
console.log(`PORTFOLIO_V42_VERIFIED: ${projects.length} projects, all gallery/process states, wrap navigation and title widths.`);
