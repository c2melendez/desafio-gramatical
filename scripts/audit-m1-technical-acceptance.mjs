/** Cierre técnico por celda: separa registros estructuralmente aprobados,
 * tareas en distintos juegos, revisión docente y equivalencia psicométrica.
 * Aceptación automática ≠ aval académico independiente.
 */
import {coverageRows} from '../src/lib/coverage.ts';
import {pool} from './inventory-items.mjs';
import {auditItem} from './audit-m0-baseline-quality.mjs';
import {validateActivity,gradeClassification,gradeConstruction} from '../src/lib/grammar-activities.ts';
import {execFileSync} from 'node:child_process';
const norm=s=>String(s??'').normalize('NFKC').toLocaleLowerCase('es').replace(/\s+/g,' ').trim();
export function contentFingerprint(item,row){
 const fields=['passage','text','context','gap','prompt','question','flawed','correctSentence','sentence','title',
  'options','claims','steps','tiles','items','order','segments','labels','tokens','parts','answer','connector','correctConnector'];
 const relevant=fields.map(k=>item[k]).filter(x=>x!==undefined);
 // Compara contenido cognitivo real, no solo un enunciado genérico que
 // se repite con distinta información en fichas y preguntas.
 return norm(JSON.stringify({subtopic:row.subtopic,mode:row.mode,level:row.level,relevant}));
}
export function auditCell(row,items,seenGlobal){
 const errors=[],ids=new Set(),fingerprints=new Map(),passed=[];
 for(const item of items){
  const id=item?.id;
  const itemIssues=auditItem(item,row);
  if(typeof id!=='string'||!id.trim())itemIssues.push('ID inválido');
  if(ids.has(id)||seenGlobal.has(id))itemIssues.push('ID duplicado en banco completo');
  ids.add(id);seenGlobal.add(id);
  if(item?.kind==='classification'){
   itemIssues.push(...validateActivity(item));
   const correct=Object.fromEntries(item.items.map(x=>[x.id,x.label]));
   if(!gradeClassification(item,correct)||gradeClassification(item,{}))itemIssues.push('evaluación de clasificación inconsistente');
  }else if(item?.kind==='construction'){
   itemIssues.push(...validateActivity(item));
   if(!gradeConstruction(item,item.solutions[0]))itemIssues.push('solución de construcción rechazada');
  }
  const fingerprint=contentFingerprint(item,row);
  if(!fingerprint||fingerprint.length<18)itemIssues.push('huella de contenido insuficiente');
  else if(fingerprints.has(fingerprint))itemIssues.push('contenido exacto repetido en la misma celda: '+fingerprints.get(fingerprint));
  else fingerprints.set(fingerprint,id);
  if(itemIssues.length)errors.push({id,details:itemIssues});
  else passed.push(id);
 }
 return {passed,errors};
}
export function auditM1(){
 const rows=coverageRows().filter(r=>r.area==='espanol');
 const globalIds=new Set(),cells=[],errors=[];
 for(const row of rows){
  const original=pool(row);
  const out=auditCell(row,original,globalIds);
  const required=row.stageOne;
  const deficit=Math.max(0,required-out.passed.length);
  const result={topic:row.topic,subtopic:row.subtopic,mode:row.mode,level:row.level,
   required,recorded:original.length,verified_technical:out.passed.length,deficit,
   human_review:'PENDIENTE',psychometrics:'NO_CALIBRADO',issues:out.errors};
  cells.push(result);
  if(out.errors.length||deficit>0)errors.push(result);
 }
 return {version:1,sha:execFileSync('git',['rev-parse','HEAD'],{encoding:'utf8'}).trim(),
  state:errors.length?'FAIL':'PASS',
  summary:{cells:cells.length,subtopics:new Set(cells.map(c=>c.topic+'|'+c.subtopic)).size,
    required:cells.reduce((n,c)=>n+c.required,0),
    recorded:cells.reduce((n,c)=>n+c.recorded,0),
    verified_technical:cells.reduce((n,c)=>n+c.verified_technical,0),
    remaining_technical:cells.reduce((n,c)=>n+c.deficit,0),
    invalid_cells:errors.length,global_ids:globalIds.size},
  source_consistency:'Verificación fuente de 855 y selección 225 en etapas separadas obligatorias de CI',
  conceptual_independence:'NO_DEMOSTRADA — único por celda e ID global comprobado; operaciones entre juegos diferenciadas, juicio sustancial pendiente',
  human_editorial_review:'PENDIENTE_AUTORIZADA',counts_are:'registros técnicos por juego y nivel, no certificación de originalidad cognitiva',
  cells,errors};
}
if(process.argv[1]?.endsWith('audit-m1-technical-acceptance.mjs')){const r=auditM1();console.log(JSON.stringify(r,null,2));if(r.state!=='PASS')process.exitCode=1;}
