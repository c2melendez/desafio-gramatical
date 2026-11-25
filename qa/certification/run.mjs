/**
 * Certificación Academia PHUMA Play: primera versión automatizada.
 * Evalúa contratos verificables, no validez psicométrica ni equivalencia con el examen.
 * Ejecutar: node --import ./scripts/ts-resolve.mjs qa/certification/run.mjs
 */
import {readFileSync,writeFileSync,mkdirSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {execFileSync} from 'node:child_process';
import {coverageRows} from '../../src/lib/coverage.ts';
import {AREAS} from '../../src/lib/phuma-catalog.ts';
import {pool} from '../../scripts/inventory-items.mjs';
import {validateSpanishItem,mutationEvidence} from './spanish-oracles.mjs';
const contract=JSON.parse(readFileSync('qa/certification/exam-contracts.json','utf8'));
const gates=[],failures=[],reviews=[];
function gate(id,name,checks,issues,scope){
 gates.push({id,name,status:issues.length?'FAIL':'PASS',checks,issues,scope});
 failures.push(...issues.map(issue=>id+': '+issue));
}
function isValidChoiceIndex(index,arr){return Number.isInteger(index)&&index>=0&&index<arr.length;}
/** Oráculo de estructura independiente del cálculo de puntuación en la UI. */
export function validateDecisionShape(item,mode){
 const errors=[];
 if(mode==='quiz'){
  if(!Array.isArray(item.options)||item.options.length!==4||item.options.some(x=>typeof x!=='string'||!x.trim()))
   errors.push('quiz: exactamente cuatro opciones textuales');
  if(!isValidChoiceIndex(item.answerIndex,item.options??[]))errors.push('quiz: índice correcto inválido');
 }else if(mode==='clasificar'){
  if(!Array.isArray(item.assertions)||item.assertions.length!==3)errors.push('clasificar: tres afirmaciones');
  else if(item.assertions.some(a=>typeof a.text!=='string'||!a.text.trim()||typeof a.truth!=='boolean'))
   errors.push('clasificar: afirmación sin texto o valor booleano');
 }else if(mode==='construir'){
  if(!Array.isArray(item.steps)||item.steps.length!==2)errors.push('construir: dos pasos');
  else if(item.steps.some(s=>typeof s.label!=='string'||!s.label.trim()||!Array.isArray(s.choices)||s.choices.length<2||s.choices.some(x=>typeof x!=='string'||!x.trim())||!isValidChoiceIndex(s.answerIndex,s.choices)))
   errors.push('construir: paso o respuesta inválida');
 }else errors.push('modalidad desconocida');
 return errors;
}
/** Oráculo negativo: cada modalidad debe rechazar una respuesta estructuralmente mutada. */
function mutationSelfTest(){
 const cases=[
  ['quiz',{options:['A','B','C','D'],answerIndex:1},x=>{x.answerIndex=99;}],
  ['clasificar',{assertions:[1,2,3].map(n=>({text:'Afirmación '+n,truth:true}))},x=>{x.assertions[1].truth=null;}],
  ['construir',{steps:[1,2].map(n=>({label:'Paso '+n,choices:['A','B'],answerIndex:0}))},x=>{x.steps[1].answerIndex=-1;}]
 ];
 return cases.map(([mode,model,mutate])=>{
  const good=validateDecisionShape(model,mode).length===0;
  const changed=structuredClone(model);mutate(changed);
  const rejected=validateDecisionShape(changed,mode).length>0;
  return {mode,good,rejected};
 });
}
const self=mutationSelfTest();
const spanishSelf=mutationEvidence();
gate('C00','oraculos_negativos',self.length*2+spanishSelf.length*2,
 [...self.flatMap(x=>x.good&&x.rejected?[]:['Mutación no detectada en '+x.mode]),...spanishSelf.flatMap(x=>x.baseline_ok&&x.mutant_rejected?[]:['Mutación Español no detectada en '+x.fixture])],
 'Tres mutantes estructurales generales y nueve mutantes específicos de Español');
const exam=contract.exams,required=contract.catalog_contract;
const blueprintIssues=[];
const ph=exam.PHUMA,pa=exam.PAA;
if(ph.duration_minutes!==170||ph.question_count!==120||ph.response_format!=='single_choice_four_options')
 blueprintIssues.push('PHUMA no mantiene el contrato 120/170/4');
if(ph.sections.reduce((n,x)=>n+x.count,0)!==120)blueprintIssues.push('Secciones PHUMA no suman 120');
const expectedPhumaSections={espanol:30,matematicas:30,naturales:20,sociales:20,blandas:20};
if(ph.sections.length!==Object.keys(expectedPhumaSections).length ||
 new Set(ph.sections.map(s=>s.area)).size!==ph.sections.length ||
 ph.sections.some(s=>expectedPhumaSections[s.area]!==s.count))
 blueprintIssues.push('Distribución PHUMA incorrecta: 30/30/20/20/20');
if(pa.duration_minutes_without_english!==140||pa.question_count_without_english!==null)
 blueprintIssues.push('PAA sin Inglés no mantiene el contrato documentado y total no inferido');
if(!pa.response_formats.includes('math_supplied_response'))blueprintIssues.push('PAA sin respuestas matemáticas producidas');
if(JSON.stringify(exam).toLowerCase().includes('"area":"ingles"'))blueprintIssues.push('Inglés incluido indebidamente');
const map=new Map(AREAS.map(area=>[area.id,area]));
for(const sect of [...ph.sections,...pa.sections]){
 const cat=map.get(sect.area);
 if(!cat)blueprintIssues.push('Área curricular no existe: '+sect.area);
 for(const name of sect.topics)if(!cat?.topics.some(t=>t.name===name))blueprintIssues.push('Tema no enlazado: '+sect.area+'/'+name);
}
gate('C05_BLUEPRINT','contratos_simulacion',6+ph.sections.length+pa.sections.length,blueprintIssues,
 'Verifica únicamente el diseño del examen');
gates.push({id:'C05',name:'simulador_integral',status:'NOT_IMPLEMENTED',checks:0,issues:[],scope:'Sin prueba ejecutada de simulador integral; no acredita implementación'});

const rows=coverageRows(),cells=[],allIds=new Set();
const areaCount={},topicGroups=new Map();
let checkedDecisions=0,missedModels=0,missingExplanations=0,examStyleQuestions=0,checkedSpanish=0;
for(const row of rows){
 const items=pool(row);
 areaCount[row.area]=(areaCount[row.area]??0)+items.length;
 const idKey=row.area+'/'+row.topic+'/'+row.subtopic;
 topicGroups.set(idKey,(topicGroups.get(idKey)??0)+items.length);
 const perCellIssues=[];
 if(items.length!==row.target)perCellIssues.push('cuota '+items.length+'/'+row.target);
 for(const it of items){
  if(!it||typeof it.id!=='string'||!it.id.trim()){perCellIssues.push('ID ausente');continue;}
  if(allIds.has(it.id))perCellIssues.push('ID duplicado '+it.id);
  allIds.add(it.id);
  if(row.area!=='espanol'){
   const problems=validateDecisionShape(it,row.mode);
   checkedDecisions++;
   if(problems.length)perCellIssues.push(it.id+': '+problems.join(', '));
  }else {
   const problems=validateSpanishItem(it,row);
   checkedSpanish++;
   if(problems.length)perCellIssues.push(it.id+': '+problems.join(', '));
  }
  const explanation=it.explanation??it.exp??it.order?.explanation;
  if(typeof explanation!=='string'||!explanation.trim())missingExplanations++;
  if(row.mode==='quiz'&&Array.isArray(it.options)&&it.options.length===4)examStyleQuestions++;
 }
 if(perCellIssues.length)cells.push({cell:[row.area,row.topic,row.subtopic,row.mode,row.level],problems:perCellIssues.slice(0,12)});
}
const inventoryIssues=[];
if(rows.length!==required.cells)inventoryIssues.push('Celdas: '+rows.length);
if(allIds.size!==required.technical_records)inventoryIssues.push('IDs únicos: '+allIds.size);
if(Object.values(areaCount).reduce((a,b)=>a+b,0)!==required.technical_records)
 inventoryIssues.push('Total de registros distinto al contrato');
for(const area of required.areas)if(!areaCount[area])inventoryIssues.push('Área ausente '+area);
inventoryIssues.push(...cells.slice(0,40).map(x=>x.cell.join('/')+': '+x.problems.join(' | ')));
gate('C01','inventario_y_mapeo_curricular',rows.length+allIds.size,inventoryIssues,
 '810 celdas y enlace por tema; correspondencia individual competencia-ejercicio requiere dictamen docente');
gate('C02','oraculos_estructurales_y_mutacion',checkedDecisions+checkedSpanish+6+spanishSelf.length*2,
 cells.flatMap(x=>x.problems.filter(p=>p.includes(':')).slice(0,4)).slice(0,60),
 'Oráculos de índice y forma para cuatro áreas; no prueba respuesta académica con fuentes independientes');
const mechanicsPaths=['scripts/audit-game-progression.mjs','scripts/audit-spanish-navigation.mjs'];
const mechanicMissing=mechanicsPaths.filter(p=>{try{return !readFileSync(p,'utf8').includes('Continuar')&&!readFileSync(p,'utf8').includes('Siguiente')}catch{return true;}});
gate('C03','existencia_regresiones_navegacion',mechanicsPaths.length,mechanicMissing,
 'Pruebas E2E instrumentadas en otro job; los PASS reales se verifican en Actions por SHA');
const pedagogyIssues=[];
if(missingExplanations>0)reviews.push({gate:'C04',kind:'EXPLANATIONS_MISSING',count:missingExplanations});
reviews.push({gate:'C02',kind:'SPANISH_SEMANTIC_ORACLE_REVIEW_PENDING',count:checkedSpanish,status:'REQUIRES_REVIEW'});
reviews.push({gate:'C04',kind:'COGNITIVE_DIFFICULTY_AND_DISTRACTOR_VALIDATION',status:'REQUIRES_REVIEW'});
reviews.push({gate:'C05',kind:'FULL_TIMED_SIMULATOR_PAA_PHUMA',status:'NOT_IMPLEMENTED'});
gate('C04','diagnostico_pedagogico_reproducible',rows.length,
 pedagogyIssues,
 'Se registran explicaciones faltantes; profundidad, calidad y transferencia todavía sin certificar');
const sha=execFileSync('git',['rev-parse','HEAD'],{encoding:'utf8'}).trim();
for(const id of ['C06','C07','C08','C09','C10','C11']) {
 if(!gates.some(g=>g.id===id)) gates.push({id,name:'evidencia pendiente',status:'NOT_RUN',checks:0,issues:[],scope:'No ejecutado por esta suite; no acredita cierre'});
}
const technical=failures.length?'FAIL':'PASS';
const report={version:1,suite:'ACADEMIA_PAA_PHUMA_CERT_V1',sha,
 generated_at:new Date().toISOString(),technical_status:technical,
 certified_for_exams:false,educational_certification:'PENDIENTE',
 policy:'PASS técnico no acredita validez académica ni psicométrica',
 source_contract_sha256:createHash('sha256').update(readFileSync('qa/certification/exam-contracts.json')).digest('hex'),
 totals:{cells:rows.length,unique_ids:allIds.size,technical_records:Object.values(areaCount).reduce((a,b)=>a+b,0),areas:areaCount,
 structural_oracle_items:checkedDecisions,spanish_structural_oracle_items:checkedSpanish,spanish_items_without_this_oracle:missedModels,
 questions_with_four_options:examStyleQuestions,missing_explanations:missingExplanations,topic_groups:topicGroups.size},
 gates,issues:failures,reviews,scope_limits:{
 PAA:'Sin Inglés; no se atribuye total universal de preguntas de esta edición',
 PHUMA:'120 preguntas de selección única, cuatro opciones, 170 min según guía CEI-TEST',
 semantics:'Sin independencia semántica certificada',real_exams:'No son exámenes oficiales ni reproducción literal'}
};
mkdirSync('qa/certification/evidence',{recursive:true});
writeFileSync('qa/certification/evidence/latest.json',JSON.stringify(report,null,2)+'\n');
console.log(JSON.stringify({technical_status:technical,sha,totals:report.totals,gates:gates.map(g=>({id:g.id,status:g.status,checks:g.checks,issues:g.issues.length})),reviews:reviews.length},null,2));
if(failures.length)process.exitCode=1;
