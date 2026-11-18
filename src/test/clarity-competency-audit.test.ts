import {describe,it,expect} from 'vitest';
import {readingPool,READING_SUBTOPICS} from '@/lib/reading';
import {writingPool,WRITING_SUBTOPICS} from '@/lib/writing';
import {M3_GRAMMAR_ACTIVITIES} from '@/lib/m3-grammar';
import {M2_GRAMMAR_ACTIVITIES} from '@/lib/m2-grammar';
const LEVELS=['principiante','intermedio','avanzado'] as const;
const orderingCue=/^(primero|después|finalmente|por último|en primer lugar|en segundo lugar|en tercer lugar)[,: ]/i;
describe('Auditoría editorial: claridad y competencia',()=>{
 it('identifica sin colisión los seis textos de cada ejercicio M3 de lectura',()=>{
  for(const subtopic of READING_SUBTOPICS)for(const level of LEVELS)
   for(const mode of ['quiz','clasificar','construir'] as const){
    const generated=readingPool(level,subtopic,mode).filter(x=>x.id.startsWith('m3-reading-'));
    expect(generated.length).toBeGreaterThan(0);
    for(const item of generated){
     for(const token of ['BLOQUE A','BLOQUE B','BLOQUE C','Texto A1','Texto A2','Texto B1','Texto B2','Texto C1','Texto C2'])
      expect(item.passage,item.id+' '+token).toContain(token);
     expect(item.title).toBe('Análisis comparativo de tres bloques de lectura');
    }
   }
 });
 it('no incluye numeradores ordinales que revelen el orden en actividades compuestas',()=>{
  for(const item of M3_GRAMMAR_ACTIVITIES.filter(x=>x.kind==='construction')){
   const correct=item.solutions[0].map(id=>item.tiles.find(tile=>tile.id===id)!.text);
   for(const text of correct)expect(text,item.id).not.toMatch(orderingCue);
  }
  for(const subtopic of READING_SUBTOPICS)for(const level of LEVELS){
   const all=readingPool(level,subtopic,'construir');
   for(const item of all.filter(x=>x.id.startsWith('m3-reading-')))
    for(const text of item.order.parts)expect(text,item.id).not.toMatch(orderingCue);
  }
  for(const subtopic of WRITING_SUBTOPICS)for(const level of LEVELS){
   const all=writingPool(level,subtopic,'construir');
   for(const item of all.filter(x=>x.id.startsWith('m2-writing-')||x.id.startsWith('m3-writing-')))
    for(const text of item.steps)expect(text,item.id).not.toMatch(orderingCue);
  }
 });
 it('conserva las soluciones comprobables e independencia de IDs tras editar las consignas',()=>{
  const ids=new Set();
  for(const item of [...M2_GRAMMAR_ACTIVITIES,...M3_GRAMMAR_ACTIVITIES]){
   expect(ids.has(item.id)).toBe(false);
   ids.add(item.id);
   if(item.kind==='classification')expect(item.items.every(x=>item.labels.includes(x.label))).toBe(true);
   else expect(item.solutions.every(solution=>solution.every(id=>item.tiles.some(t=>t.id===id)))).toBe(true);
  }
 });
});
