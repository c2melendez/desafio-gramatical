/** M3: auditoría cuantitativa y estructural del área completa (189 celdas).
 * No certifica independencia conceptual ni revisión docente.
 */
import {coverageRows} from '../src/lib/coverage.ts';
import {pool} from './inventory-items.mjs';
import {auditCell} from './audit-m1-technical-acceptance.mjs';
import {gradeClassification,gradeConstruction} from '../src/lib/grammar-activities.ts';
import {execFileSync} from 'node:child_process';
const target={principiante:30,intermedio:50,avanzado:70};
const expected={principiante:629,intermedio:945,avanzado:1575};
const issues=[],rows=[],ids=new Set(),signatures=new Map();
const byLevel={principiante:0,intermedio:0,avanzado:0};
const byGame={quiz:0,clasificar:0,construir:0};
let mutants=0,mutantsDetected=0,withParents=0;
for(const row of coverageRows().filter(x=>x.area==='espanol')){
 const items=pool(row),result=auditCell(row,items,ids);
 const extra=items.filter(x=>x.id.startsWith('m3-'));
 const deficit=Math.max(0,target[row.level]-result.passed.length);
 if(result.errors.length||deficit)issues.push({cell:[row.topic,row.subtopic,row.mode,row.level],deficit,errors:result.errors.slice(0,8)});
 for(const item of extra){
  byLevel[row.level]++;byGame[row.mode]++;
  if(item.reviewStatus&&item.reviewStatus!=='editorial-draft')issues.push({id:item.id,rule:'marca de revisión no sustentada'});
  if(item.sourceIds){
   withParents++;
   if(item.sourceIds.length!==3||new Set(item.sourceIds).size!==3)issues.push({id:item.id,rule:'se necesitan tres fuentes distintas'});
   const pairKey=[row.topic,row.subtopic,row.mode,row.level,...item.sourceIds].join('|');
   if(signatures.has(pairKey))issues.push({id:item.id,rule:'repetición de tripleta de fuentes',previous:signatures.get(pairKey)});
   signatures.set(pairKey,item.id);
  }else if(row.subtopic!=='Categorías gramaticales')issues.push({id:item.id,rule:'no existe trazabilidad de fuentes'});
  if(item.options){
   const unique=new Set(item.options.map(x=>String(x).normalize('NFKC').trim()));
   if(item.options.length!==4||unique.size!==4)issues.push({id:item.id,rule:'opciones no únicas'});
   if('answer' in item&&(!Number.isInteger(item.answer)||item.answer<0||item.answer>3))issues.push({id:item.id,rule:'clave inválida'});
   if(item.connector&&!item.options.includes(item.connector))issues.push({id:item.id,rule:'conector ausente'});
   if(item.correctConnector&&!item.options.includes(item.correctConnector))issues.push({id:item.id,rule:'corrección ausente'});
   mutants++;mutantsDetected+=unique.size===4?1:0;
  }
  if(item.kind==='classification'){
   const right=Object.fromEntries(item.items.map(x=>[x.id,x.label]));
   const wrong={...right,[item.items[0].id]:'etiqueta-imposible'};
   mutants++;if(gradeClassification(item,right)&&!gradeClassification(item,wrong))mutantsDetected++;
  }
  if(item.kind==='construction'){
   mutants++;if(gradeConstruction(item,item.solutions[0])&&!gradeConstruction(item,[]))mutantsDetected++;
  }
  if(item.claims&&row.mode==='clasificar'){
   mutants++;if(item.claims.length===3&&new Set(item.claims.map(x=>x.tag)).size===3)mutantsDetected++;
  }
  if(item.order&&row.mode==='construir'){
   mutants++;if(item.order.parts.length===3&&new Set(item.order.parts).size===3)mutantsDetected++;
  }
  if(item.steps&&row.mode==='construir'){
   mutants++;if(item.steps.length===3&&new Set(item.steps).size===3)mutantsDetected++;
  }
 }
 rows.push({area:row.area,topic:row.topic,subtopic:row.subtopic,mode:row.mode,level:row.level,
  target:target[row.level],recorded:items.length,verified:result.passed.length,m3_new:extra.length,deficit});
 if(items.length!==row.available)issues.push({cell:[row.topic,row.subtopic,row.mode,row.level],rule:'inventario difiere del catálogo'});
}
const summary={cells:rows.length,subtopics:new Set(rows.map(x=>x.topic+'/'+x.subtopic)).size,
 combinations:new Set(rows.map(x=>x.topic+'/'+x.subtopic+'/'+x.mode)).size,
 target:rows.reduce((a,x)=>a+x.target,0),recorded:rows.reduce((a,x)=>a+x.recorded,0),
 m3_new:Object.values(byLevel).reduce((a,b)=>a+b,0),by_level:byLevel,by_game:byGame,
 m3_with_three_parents:withParents,missing:rows.reduce((a,x)=>a+x.deficit,0),
 ids_unique:ids.size,mutants_executed:mutants,mutants_detected:mutantsDetected,mutants_survived:mutants-mutantsDetected,issues:issues.length};
if(summary.cells!==189||summary.subtopics!==21||summary.combinations!==63)issues.push({rule:'estructura de área incompleta'});
if(summary.target!==9450||summary.recorded!==9450||summary.ids_unique!==9450||summary.m3_new!==3149)issues.push({rule:'conteos fuera de objetivo',summary});
for(const [l,n] of Object.entries(expected))if(byLevel[l]!==n)issues.push({rule:'distribución M3 desigual',l,expected:n,actual:byLevel[l]});
if(summary.missing||summary.mutants_survived)issues.push({rule:'cobertura o mutantes pendientes',summary});
summary.issues=issues.length;
const report={module:'espanol-M3',version:1,sha:execFileSync('git',['rev-parse','HEAD'],{encoding:'utf8'}).trim(),
 status:issues.length?'FAIL':'PASS',summary,
 controls:{structural:'AUTO',operational_negative_cases:'AUTO',review_teaching:'PENDIENTE_AUTORIZADA',
  cognitive_independence:'NO_DEMOSTRADA',psychometric_calibration:'NO_CERTIFICADA'},
 caveat:'Composiciones originales de tres casos con IDs y rutas individuales. La verificación automática no acredita 3149 problemas conceptualmente independientes.',
 rows,issues};
console.log(JSON.stringify(report,null,2));if(issues.length)process.exitCode=1;
