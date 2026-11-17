import { describe, expect, it } from 'vitest';
import { SYNONYM_CLASSIFICATION } from '@/lib/grammar-classify-synonyms';
import { gradeClassification, validateActivity } from '@/lib/grammar-activities';
import { selectRotation, emptyRotation } from '@/lib/rotation';

describe('clasificación de relaciones léxicas', () => {
 it('tiene un banco por nivel con IDs y contextos distintos', () => {
  expect(SYNONYM_CLASSIFICATION).toHaveLength(45);
  expect(new Set(SYNONYM_CLASSIFICATION.map(q=>q.id)).size).toBe(45);
  expect(new Set(SYNONYM_CLASSIFICATION.map(q=>q.prompt)).size).toBe(45);
  for (const [level,count] of [['principiante',10],['intermedio',15],['avanzado',20]] as const) expect(SYNONYM_CLASSIFICATION.filter(q=>q.level===level)).toHaveLength(count);
  for (const q of SYNONYM_CLASSIFICATION) {
   expect(validateActivity(q)).toEqual([]);
   expect(gradeClassification(q,{relacion:q.items[0].label})).toBe(true);
   expect(gradeClassification(q,{relacion:q.items[0].label==='Sinónimos'?'Antónimos':'Sinónimos'})).toBe(false);
  }
 });
 it('selecciona rondas sin repetir IDs', () => {
  const pool=SYNONYM_CLASSIFICATION.filter(q=>q.level==='intermedio');
  const round=selectRotation(pool,emptyRotation(),10,()=>0.5);
  expect(new Set(round.map(q=>q.id)).size).toBe(10);
 });
});
