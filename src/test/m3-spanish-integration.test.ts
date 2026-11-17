import {describe,it,expect} from 'vitest';
import {coverageRows} from '@/lib/coverage';
import {grammarPilotPool} from '@/lib/grammar-next-draft';
import {grammarM1Pool} from '@/components/games/GrammarM1Play';
import {readingPool} from '@/lib/reading';
import {writingPool} from '@/lib/writing';
import {M3_CATEGORY_BUILD,M3_GRAMMAR_ACTIVITIES} from '@/lib/m3-grammar';
const targets={principiante:30,intermedio:50,avanzado:70} as const;
describe('M3 Español — validación completa del área',()=>{
 it('completa 189 celdas con 9450 registros únicos',()=>{
  const rows=coverageRows().filter(r=>r.area==='espanol');
  expect(rows).toHaveLength(189);
  expect(rows.reduce((n,r)=>n+r.available,0)).toBe(9450);
  for(const r of rows)expect(r.available, r.subtopic+'/'+r.mode+'/'+r.level).toBeGreaterThanOrEqual(targets[r.level]);
 });
 it('amplía las ocho áreas de Gramática/Literatura sin modificar IDs de M2',()=>{
  for(const sub of ['Sinónimos y antónimos','Cohesión y coherencia','Morfosintaxis','Homonimia y polisemia','Hiperonimia','Adecuación y referente','Figuras retóricas','Géneros literarios']){
   for(const lev of ['principiante','intermedio','avanzado'] as const){
    expect(grammarPilotPool(sub,lev)).toHaveLength(targets[lev]);
    expect(grammarM1Pool(sub,'clasificar',lev)).toHaveLength(targets[lev]);
    expect(grammarM1Pool(sub,'construir',lev)).toHaveLength(targets[lev]);
   }
  }
 });
 it('añade contrastes tripartitos de lectura y redacción en cada juego',()=>{
  const reading=['Idea principal','Inferencias','Lectura crítica','Vocabulario en contexto','Análisis de textos','Lectura comparada','Lenguaje figurado'] as const;
  const writing=['Conectores','Corrección','Organización textual','Elisión y adición','Generalización e integración'] as const;
  for(const sub of reading)for(const lev of ['principiante','intermedio','avanzado'] as const)
   for(const mode of ['quiz','clasificar','construir'] as const){
    const all=readingPool(lev,sub,mode);
    expect(all).toHaveLength(targets[lev]);
    const m3=all.filter(q=>q.id.startsWith('m3-'));
    expect(m3).toHaveLength(lev==='principiante'?10:lev==='intermedio'?15:25);
    for(const item of m3)expect(new Set(item.sourceIds).size).toBe(3);
   }
  for(const sub of writing)for(const lev of ['principiante','intermedio','avanzado'] as const)
   for(const mode of ['quiz','clasificar','construir'] as const){
    const all=writingPool(lev,sub,mode);
    expect(all).toHaveLength(targets[lev]);
    const m3=all.filter(q=>q.id.startsWith('m3-'));
    expect(m3).toHaveLength(lev==='principiante'?10:lev==='intermedio'?15:25);
    for(const item of m3)expect(new Set(item.sourceIds).size).toBe(3);
   }
 });
 it('retiene la posición adicional del banco original sin compensarla en otra celda',()=>{
  expect(M3_CATEGORY_BUILD.avanzado).toHaveLength(25);
  expect(M3_GRAMMAR_ACTIVITIES).toHaveLength(800);
 });
});
