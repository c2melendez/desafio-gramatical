/** Contrato de independencia operativa entre juegos.
 * Una tarea de opción, dos asignaciones y una explicación construida son
 * salidas diferentes. No certifica independencia conceptual ni originalidad.
 */
import {M1_NEXT_QUIZ,M1_NEXT_ACTIVITIES} from '../src/lib/grammar-m1-next-activities.ts';
import {M1_LITERATURE_QUIZ,M1_LITERATURE_ACTIVITIES} from '../src/lib/grammar-m1-literature.ts';
import {READING_BANK} from '../src/lib/reading.ts';
import {WRITING_BANK} from '../src/lib/writing.ts';
import {execFileSync} from 'node:child_process';
const items=[...M1_NEXT_QUIZ,...M1_NEXT_ACTIVITIES,...M1_LITERATURE_QUIZ,...M1_LITERATURE_ACTIVITIES];
export function checkOperations(family){
 const errors=[],kinds=new Set();
 for(const item of family){
  const kind='options' in item?'quiz':item.kind;
  if(kinds.has(kind))errors.push('misma operación/forma de respuesta en una familia');
  kinds.add(kind);
  if(kind==='quiz'&&(!Array.isArray(item.options)||item.options.length!==4))errors.push('selección sin cuatro alternativas');
  if(kind==='classification'&&(!Array.isArray(item.items)||item.items.length<2||
   new Set(item.items.map(x=>x.label)).size<2))errors.push('clasificación sin dos decisiones diferentes');
  if(kind==='construction'&&(!Array.isArray(item.solutions)||!item.solutions.length||
   item.tiles.length<=item.solutions[0].length))errors.push('construcción sin composición y descarte de distractor');
  if(!item.cognitiveGoal||!item.explanation)errors.push('falta objetivo o justificación cognitiva');
 }
 const goals=family.map(x=>x.cognitiveGoal);
 if(new Set(goals).size!==goals.length)errors.push('operaciones sin objetivo diferenciado');
 return errors;
}
const groups=new Map(),issues=[];
for(const item of items){const g=groups.get(item.family)||[];g.push(item);groups.set(item.family,g)}
for(const [family,members] of groups)for(const error of checkOperations(members))issues.push({family,error,ids:members.map(x=>x.id)});
for(const r of READING_BANK){
 if(r.claims.length!==3||new Set(r.claims.map(x=>x.tag)).size!==3||r.options.length!==4||
 r.order.parts.length!==3||!r.question||r.question===r.order.hint)
 issues.push({id:r.id,error:'lectura sin operaciones distintas en sus tres juegos'});
}
for(const r of WRITING_BANK){
 if(!r.flawed||!r.errorType||!r.correction||!r.gap.includes('___')||
 !r.connector||r.steps.length!==3||!r.steps.every(Boolean))
 issues.push({id:r.id,error:'redacción sin operaciones distintas en sus tres juegos'});
}
const report={version:1,sha:execFileSync('git',['rev-parse','HEAD'],{encoding:'utf8'}).trim(),status:issues.length?'FAIL':'PASS',
 summary:{new_records:items.length,new_families:groups.size,legacy_reading_seeds:READING_BANK.length,legacy_writing_seeds:WRITING_BANK.length,operational_issues:issues.length},
 criteria:{new_families_with_same_operation:'DETECTADO_COMO_ERROR',new_families_without_distinct_goals:'DETECTADO_COMO_ERROR',
 reading:'distintas tareas de juicio de evidencia, selección y ordenación',
 writing:'distintas tareas de diagnóstico, elección de conector y secuencia',
 technical_operation_independence:issues.length?'RECHAZADA':'VERIFICADA',
 semantic_independence:'REQUIERE_REVISION_ACADEMICA',external_teacher:'PENDIENTE'},
 limitations:'Este control verifica operaciones y artefactos de respuesta diferentes, pero no demuestra que todos los reactivos representen conocimientos conceptualmente independientes.',
 issues};console.log(JSON.stringify(report,null,2));if(issues.length)process.exitCode=1;
