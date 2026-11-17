import type { Level } from './grammar';

/** Los bancos de estas actividades se elaboran por separado para cada modalidad. */
export type ActivityBase = {
  id: string;
  subtopic: string;
  level: Level;
  prompt: string;
  explanation: string;
  reviewStatus: 'editorial-draft';
  /** La procedencia, competencia y propósito deben acompañar a cada nuevo ejercicio. */
  competence?: string;
  cognitiveGoal?: string;
  sourceLocator?: string;
  origin?: string;
  family?: string;
};
export type ClassificationActivity = ActivityBase & {
  kind: 'classification';
  labels: string[];
  items: { id: string; text: string; label: string; explanation: string }[];
};
export type ConstructionActivity = ActivityBase & {
  kind: 'construction';
  tiles: { id: string; text: string }[];
  /** Una o más secuencias aceptadas, usando IDs de fichas, no texto libre. */
  solutions: string[][];
};
export type GrammarActivity = ClassificationActivity | ConstructionActivity;

export function validateActivity(q: GrammarActivity): string[] {
  const errors: string[] = [];
  if (!q.id.trim() || !q.prompt.trim() || !q.explanation.trim()) errors.push('Faltan datos generales');
  if (q.kind === 'classification') {
    if (q.labels.length < 2 || new Set(q.labels).size !== q.labels.length) errors.push('Etiquetas inválidas');
    if (!q.items.length || new Set(q.items.map(x => x.id)).size !== q.items.length) errors.push('Elementos inválidos');
    if (q.items.some(x => !x.id.trim() || !x.text.trim() || !x.explanation.trim() || !q.labels.includes(x.label))) errors.push('Clasificación incompleta');
  } else {
    const ids = q.tiles.map(x => x.id);
    if (ids.length < 2 || new Set(ids).size !== ids.length || q.tiles.some(x => !x.id.trim() || !x.text.trim())) errors.push('Fichas inválidas');
    if (!q.solutions.length || q.solutions.some(s => !s.length || new Set(s).size !== s.length || s.some(id => !ids.includes(id)))) errors.push('Soluciones inválidas');
    if (new Set(q.solutions.map(s => JSON.stringify(s))).size !== q.solutions.length) errors.push('Soluciones duplicadas');
  }
  return errors;
}
export function gradeClassification(q: ClassificationActivity, answers: Record<string, string>): boolean {
  return q.items.every(item => answers[item.id] === item.label);
}
export function gradeConstruction(q: ConstructionActivity, chosen: string[]): boolean {
  return q.solutions.some(s => s.length === chosen.length && s.every((id, i) => id === chosen[i]));
}
