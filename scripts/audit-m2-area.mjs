/** Auditor M2 de alcance íntegro: reconcilia las 189 celdas de Español
 * y controla estructura, identidad, claves y variantes entre fuentes.
 * VERIFICADO_AUTOMATICO no significa independencia conceptual ni revisión docente.
 */
import {coverageRows} from '../src/lib/coverage.ts';
import {pool} from './inventory-items.mjs';
import {auditCell,contentFingerprint} from './audit-m1-technical-acceptance.mjs';
import {gradeClassification,gradeConstruction} from '../src/lib/grammar-activities.ts';
import {execFileSync} from 'node:child_process';
const target={principiante:20,intermedio:35,avanzado:45};
const starting={principiante:614,intermedio:1253,avanzado:1573};
const norm=x=>String(x??'').normalize('NFKC').toLocaleLowerCase('es').trim().replace(/\s+/g,' ');
const issues=[],globalIds=new Set(),rows=[];
const newByLevel={principiante:0,intermedio:0,avanzado:0};
const modeKinds={quiz:0,clasificar:0,construir:0};
let structurallyVerified=0,negativeControls=0,withParents=0,duplicateParents=0;
for(const row of coverageRows().filter(x=>x.area==='espanol')){
 const items=pool(row),found=auditCell(row,items,globalIds);
 const technical=found.passed.length;
 const deficit=Math.max(0,target[row.level]-technical);
 const m2=items.filter(x=>x.id.startsWith('m2-'));
 const parentPairs=new Set();
 for(const item of m2){
  newByLevel[row.level]++;modeKinds[row.mode]++;
  const id=item.id;
  if(item.reviewStatus&&item.reviewStatus!=='editorial-draft')issues.push({id,rule:'estado editorial elevado sin evidencia'});
  const sourceIds=item.sourceIds;
  if(sourceIds){
   withParents++;
   if(sourceIds.length!==2||new Set(sourceIds).size!==2)issues.push({id,rule:'dos fuentes distintas obligatorias'});
   const fingerprint=sourceIds.join('|');
   if(parentPairs.has(fingerprint)){duplicateParents++;issues.push({id,rule:'par idéntico a otro caso de la misma celda'})}
   parentPairs.add(fingerprint);
  }else if(row.subtopic!=='Categorías gramaticales')issues.push({id,rule:'falta el par de fuentes originales'});
  if(item.options){
   const optNorm=row.subtopic==="Corrección"?(x=>String(x??"").normalize("NFKC").trim()):norm;
   const options=item.options.map(optNorm);
   if(options.length!==4||new Set(options).size!==4)issues.push({id,rule:'selección no tiene cuatro alternativas distintas'});
   if(item.answer!==undefined&&(item.answer<0||item.answer>3||!Number.isInteger(item.answer)))
    issues.push({id,rule:'índice de clave inválido'});
   if(item.connector&&options.filter(x=>x===optNorm(item.connector)).length!==1)
    issues.push({id,rule:'conector correcto ausente o repetido'});
   if(item.correctConnector&&options.filter(x=>x===optNorm(item.correctConnector)).length!==1)
    issues.push({id,rule:'corrección correcta ausente o repetida'});
   negativeControls++;
  }
  if(item.kind==='classification'){
   const expected=Object.fromEntries(item.items.map(x=>[x.id,x.label]));
   if(!gradeClassification(item,expected)||gradeClassification(item,{}))issues.push({id,rule:'clasificación no distingue respuestas'});
   negativeControls++;
  }
  if(item.kind==='construction'){
   if(!gradeConstruction(item,item.solutions[0])||gradeConstruction(item,[]))issues.push({id,rule:'construcción no distingue solución'});
   negativeControls++;
  }
  if(item.claims&&row.mode==='clasificar'){
   const kinds=item.claims.map(x=>x.tag);
   if(item.claims.length!==3||new Set(kinds).size!==3||!['explicit','inference','unsupported'].every(x=>kinds.includes(x)))
    issues.push({id,rule:'inferencia/dato/no sustentado incompletos'});
   negativeControls++;
  }
  if(item.steps&&row.mode==='construir'){
   if(item.steps.length!==3||new Set(item.steps.map(norm)).size!==3)issues.push({id,rule:'pasos repetidos o incompletos'});
   negativeControls++;
  }
  if(item.order&&row.mode==='construir'){
   if(item.order.parts.length!==3||new Set(item.order.parts.map(norm)).size!==3)issues.push({id,rule:'pasos de lectura repetidos'});
   negativeControls++;
  }
  if(item.tiles&&row.subtopic==='Categorías gramaticales'&&row.mode==='construir'&&item.solutions.some(x=>!x))
   issues.push({id,rule:'soluciones clásicas ausentes'});
 }
 if(items.length!==row.available)issues.push({cell:[row.topic,row.subtopic,row.mode,row.level],rule:'conteo de ruta distinto de catálogo'});
 const cell={area:row.area,topic:row.topic,subtopic:row.subtopic,mode:row.mode,level:row.level,
  target:target[row.level],recorded:items.length,verified_automatic:technical,m2_new:m2.length,
  deficit,issue_ids:found.errors.slice(0,8)};
 if(deficit>0||found.errors.length)issues.push({cell:[row.topic,row.subtopic,row.mode,row.level],rule:'celda insuficiente o con error',details:cell});
 structurallyVerified+=technical;rows.push(cell);
}
const summary={
 cells:rows.length,subtopics:new Set(rows.map(x=>x.topic+'/'+x.subtopic)).size,
 combinations:new Set(rows.map(x=>x.topic+'/'+x.subtopic+'/'+x.mode)).size,
 target:rows.reduce((n,r)=>n+r.target,0),recorded:rows.reduce((n,r)=>n+r.recorded,0),
 verified_automatic:structurallyVerified,
 m2_new:Object.values(newByLevel).reduce((a,b)=>a+b,0),
 levels:newByLevel,game_modes:modeKinds,
 missing:rows.reduce((n,r)=>n+r.deficit,0),issue_cells:rows.filter(x=>x.deficit||x.issue_ids.length).length,
 ids_global:globalIds.size,source_pairs_checked:withParents,
 duplicate_pairs:duplicateParents,negative_controls:negativeControls,issues:issues.length
};
if(summary.cells!==189||summary.subtopics!==21||summary.combinations!==63)issues.push({rule:'catálogo Español cambiado sin reconciliar'});
if(summary.target!==6300||summary.recorded!==6301||summary.ids_global!==6301||summary.m2_new!==3440)
 issues.push({rule:'totales no coinciden con base M1 más M2',summary});
for(const [l,n] of Object.entries(starting))if(newByLevel[l]!==n)issues.push({rule:'cuota M2 por nivel incorrecta',level:l,expected:n,actual:newByLevel[l]});
if(summary.missing)issues.push({rule:'persisten déficits técnicos',value:summary.missing});
summary.issues=issues.length;
const report={version:1,module:'espanol-M2',sha:execFileSync('git',['rev-parse','HEAD'],{encoding:'utf8'}).trim(),
 status:issues.length?'FAIL':'PASS',summary,controls:{
 unit_technical:'VERIFICADO_AUTOMATICO',global_identity:'VERIFICADO',
 answer_keys:'VERIFICADO_ESTRUCTURALMENTE',source_pair_integrity:'VERIFICADO_ESTRUCTURALMENTE',
 pedagogical_independence:'INCONCLUSO',editorial_teaching_review:'PENDIENTE_AUTORIZADA',
 psychometrics:'SIN_CERTIFICACION'},
 caveat:'3440 registros de composición entre pares de fuentes; no hay evidencia de 3440 problemas conceptualmente independientes. Los reportes cuantitativos no cuentan como validación docente.',
 rows,issues};
console.log(JSON.stringify(report,null,2));if(issues.length)process.exitCode=1;
