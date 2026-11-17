import {describe,expect,it} from 'vitest';
import {COHESION_CLASSIFICATION as bank} from '@/lib/grammar-classify-cohesion';
import {validateActivity,gradeClassification} from '@/lib/grammar-activities';
describe('clasificación de cohesión',()=>{
 it('tiene 45 contextos diferenciados, soluciones y cobertura por nivel',()=>{
  expect(bank).toHaveLength(45);
  expect(new Set(bank.map(x=>x.id)).size).toBe(45);
  expect(new Set(bank.map(x=>x.prompt)).size).toBe(45);
  for(const [level,n] of [['principiante',10],['intermedio',15],['avanzado',20]] as const) expect(bank.filter(x=>x.level===level)).toHaveLength(n);
  for(const q of bank){expect(validateActivity(q)).toEqual([]);expect(gradeClassification(q,{relacion:q.items[0].label})).toBe(true);expect(gradeClassification(q,{})).toBe(false);}
 });
});
