import { describe, expect, it } from 'vitest';
import { gradeClassification, gradeConstruction, validateActivity, type ClassificationActivity, type ConstructionActivity } from '@/lib/grammar-activities';

const common = { id: 'test-1', subtopic: 'Cohesión y coherencia', level: 'principiante' as const, prompt: 'Clasifica las relaciones.', explanation: 'La causa explica el motivo.', reviewStatus: 'editorial-draft' as const };
const classification: ClassificationActivity = { ...common, kind: 'classification', labels: ['Causa', 'Contraste'], items: [{ id: 'a', text: 'porque', label: 'Causa', explanation: 'Introduce un motivo.' }, { id: 'b', text: 'pero', label: 'Contraste', explanation: 'Contrapone ideas.' }] };
const construction: ConstructionActivity = { ...common, kind: 'construction', tiles: [{ id: 'a', text: 'Primero' }, { id: 'b', text: 'después' }, { id: 'c', text: 'distractor' }], solutions: [['a', 'b'], ['b', 'a']] };

describe('actividades gramaticales', () => {
  it('comprueba cada elemento clasificado y rechaza respuestas incompletas', () => {
    expect(validateActivity(classification)).toEqual([]);
    expect(gradeClassification(classification, { a: 'Causa', b: 'Contraste' })).toBe(true);
    expect(gradeClassification(classification, { a: 'Causa' })).toBe(false);
    expect(gradeClassification(classification, { a: 'Contraste', b: 'Causa' })).toBe(false);
  });
  it('admite las secuencias documentadas y rechaza fichas extra o repetidas', () => {
    expect(validateActivity(construction)).toEqual([]);
    expect(gradeConstruction(construction, ['a', 'b'])).toBe(true);
    expect(gradeConstruction(construction, ['b', 'a'])).toBe(true);
    expect(gradeConstruction(construction, ['a', 'b', 'c'])).toBe(false);
    expect(gradeConstruction(construction, ['a', 'a'])).toBe(false);
  });
  it('detecta etiquetas inexistentes, fichas desconocidas y soluciones duplicadas', () => {
    expect(validateActivity({ ...classification, items: [{ ...classification.items[0], label: 'Otra' }] })).toContain('Clasificación incompleta');
    expect(validateActivity({ ...construction, solutions: [['a', 'desconocida']] })).toContain('Soluciones inválidas');
    expect(validateActivity({ ...construction, solutions: [['a', 'b'], ['a', 'b']] })).toContain('Soluciones duplicadas');
  });
});
