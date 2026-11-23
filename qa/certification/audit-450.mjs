/**
 * C01/C02/C03/C04 certification — one deterministic batch of 450 records.
 * Runs the selected batch, not 40,500 independent semantic reviews.
 * Future batches require advancing batch-state.json only after CI SUCCESS.
 */
import {readFileSync,writeFileSync,mkdirSync} from 'node:fs';
import {execFileSync} from 'node:child_process';
import {createHash} from 'node:crypto';
import {coverageRows} from '../../src/lib/coverage.ts';
import {pool} from '../../scripts/inventory-items.mjs';
import {validateSpanishItem} from './spanish-oracles.mjs';
const policy=JSON.parse(readFileSync('qa/certification/batch-state.json','utf8'));
const contract=JSON.parse(readFileSync('qa/certification/exam-contracts.json','utf8'));
const sha=execFileSync('git',['rev-parse','HEAD'],{encoding:'utf8'}).trim();
const allRows=coverageRows(),areas=contract.catalog_contract.areas;
const areaItems=new Map(areas.map(a=>[a,[]]));
for(const row of allRows)for(const item of pool(row))areaItems.get(row.area)?.push({row,item});
const total=[...areaItems.values()].reduce((n,x)=>n+x.length,0);
const problems=[],reviewCounts={},byArea={},byLevel={},byGame={},results=[];
function issue(name){problems.push(name);}
if(policy.batch_size!==450||total!==40500||policy.expected_batches!==90)issue('La política de 450/40500/90 no coincide con el inventario');
if(!Number.isInteger(policy.current_batch)||policy.current_batch<0||policy.current_batch>=90)issue('Índice de lote fuera de 0..89');
if(areas.length!==5||areaItems.size!==areas.length)issue('Distribución de áreas incompatible');
const order=[];
let position=0;
while(order.length<total){
 let appended=false;
 for(const area of areas){const row=areaItems.get(area)?.[position];if(row){order.push(row);appended=true;}}
 if(!appended)break;
 position++;
}
if(order.length!==total)issue('Orden global no cubre todo el inventario');
const ids=order.map(({item})=>item?.id),unique=new Set(ids);
if(unique.size!==total)issue('IDs no únicos entre registros');
const start=policy.current_batch*policy.batch_size,selected=order.slice(start,start+policy.batch_size);
if(selected.length!==450)issue('Selección distinta de 450');
const canon=x=>String(x??'').normalize('NFKC').trim();
const noSpace=x=>canon(x).replace(/\s+/g,' ').toLocaleLowerCase('es');
const getKey=(item,mode)=>mode==='quiz'?(item?.answerIndex??item?.answer):undefined;
const candidates=selected.map(({row,item},i)=>{
 const errors=[],warnings=[];
 const options=Array.isArray(item.options)?item.options:null;
 if(!item?.id||!canon(item.id))errors.push('ID no válido');
 if(row.area==='espanol')errors.push(...validateSpanishItem(item,row));
 else if(row.mode==='quiz'){
  if(!options||options.length!==4||options.some(x=>!canon(x)))errors.push('Quiz sin cuatro alternativas');
  if(!Number.isInteger(item.answerIndex)||item.answerIndex<0||item.answerIndex>=4)errors.push('Clave no elegible');
 }else if(row.mode==='clasificar'){
  if(!Array.isArray(item.assertions)||item.assertions.length!==3||item.assertions.some(a=>!canon(a.text)||typeof a.truth!=='boolean'))errors.push('Afirmaciones imposibles de clasificar');
 }else if(row.mode==='construir'){
  if(!Array.isArray(item.steps)||item.steps.length!==2||item.steps.some(s=>!Array.isArray(s.choices)||!Number.isInteger(s.answerIndex)||s.answerIndex<0||s.answerIndex>=s.choices.length))errors.push('Construcción inválida');
 }
 if(options){
  const values=options.map(noSpace);
  if(new Set(values).size<values.length)warnings.push('OPCIONES_EQUIVALENTES_NORMALIZADAS');
  const withoutMarks=values.map(x=>x.normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^\p{L}\p{N}]/gu,''));
  if(new Set(withoutMarks).size<values.length&&new Set(values).size===values.length)
   warnings.push('DIFERENCIA_SOLO_TILDE_O_PUNTUACION_REVIEW');
 }
 const explanation=item.explanation??item.exp??item.order?.explanation;
 if(typeof explanation!=='string'||!canon(explanation))warnings.push('EXPLICACION_AUSENTE');
 if(item.sourceIds?.length){
  if(!Array.isArray(item.sourceIds)||item.sourceIds.some(x=>typeof x!=='string'||!canon(x)))errors.push('Referencias fuente inválidas');
  else warnings.push('LINAGE_ACADEMICO_REQUIERE_VERIFICACION');
 }
 if(!item.cognitiveGoal&&!item.competence)warnings.push('OBJETIVO_COGNITIVO_NO_EXPLICITO');
 if(!item.sourceLocator)warnings.push('FUENTE_CURRICULAR_NO_ESPECIFICA');
 for(const w of warnings)reviewCounts[w]=(reviewCounts[w]??0)+1;
 byArea[row.area]=(byArea[row.area]??0)+1;
 byLevel[row.level]=(byLevel[row.level]??0)+1;
 byGame[row.mode]=(byGame[row.mode]??0)+1;
 const record={batch_position:i,global_position:start+i,id:item.id,area:row.area,topic:row.topic,subtopic:row.subtopic,level:row.level,game:row.mode,
  content_sha256:createHash('sha256').update(JSON.stringify(item)).digest('hex'),
  technical_status:errors.length?'FAIL':'PASS',
  curricular_status:'REVIEW',semantic_status:'REVIEW',difficulty_status:'REVIEW',
  issues:errors,editorial_flags:warnings,
  provenance:{sourceIds:item.sourceIds??[],origin:item.origin??null,sourceLocator:item.sourceLocator??null}};
 if(errors.length)issue(item.id+': '+errors.join('; '));
 return record;
});
results.push(...candidates);
const target=new Set(selected.map(x=>x.item.id));
if(target.size!==450)issue('IDs repetidos en lote');
if(new Set(selected.map(({item})=>JSON.stringify(item))).size<450)reviewCounts['POSIBLE_REPETICION_ESTRUCTURAL']=(reviewCounts['POSIBLE_REPETICION_ESTRUCTURAL']??0)+1;
// Independent selection controls: the first and last ID in this batch must be exactly those in stable global order.
if(results[0]?.id!==ids[start]||results.at(-1)?.id!==ids[start+449])issue('El cursor no coincide con el orden de inventario');
const output={schema_version:1,suite:'ACADEMIA_CERTIFICATION_450_V1',sha,batch_index:policy.current_batch,batch_number:policy.current_batch+1,batch_size:450,expected_batches:90,
 status:problems.length?'FAIL':'PASS',academic_certification:'PENDIENTE',
 scanned_records:total,exam_scope:'PAA/PHUMA sin Inglés',
 selection:'round robin por área, orden estable por tema, subtema, modo y nivel',
 range:{from:start,to_exclusive:start+450},
 summary:{evaluated:results.length,technical_failures:results.filter(x=>x.technical_status==='FAIL').length,
 semantic_approved:0,semantic_review:results.length,by_area:byArea,by_level:byLevel,by_game:byGame,editorial_flags:reviewCounts},
 problems,items:results,
 limitations:'450 auditorías técnicas individuales, NO 450 aprobaciones académicas. Los flags de distractores necesitan lectura contextual; CI PASS no certifica validez, originalidad, dificultad ni transferencia al examen.'};
mkdirSync('qa/certification/evidence',{recursive:true});
writeFileSync('qa/certification/evidence/batch-450.json',JSON.stringify(output,null,2)+'\n');
console.log(JSON.stringify({sha,number:output.batch_number,status:output.status,summary:output.summary,range:output.range,problems:problems.slice(0,12)},null,2));
if(problems.length)process.exitCode=1;
