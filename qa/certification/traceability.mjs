/** Inventario individual reversible y oráculos de Español para CI.
 * El vínculo tema↔examen es PROVISIONAL; no acredita validez por ejercicio.
 */
import {createHash} from 'node:crypto';
import {execFileSync} from 'node:child_process';
import {mkdirSync,writeFileSync,readFileSync} from 'node:fs';
import {coverageRows} from '../../src/lib/coverage.ts';
import {pool} from '../../scripts/inventory-items.mjs';
import {validateSpanishItem,mutationEvidence} from './spanish-oracles.mjs';
const sha=execFileSync('git',['rev-parse','HEAD'],{encoding:'utf8'}).trim();
const contract=JSON.parse(readFileSync('qa/certification/exam-contracts.json','utf8'));
const rows=coverageRows(),index=[],issues=[],diagnostics={},byFamily={},seen=new Set(),examStats={PAA:0,PHUMA:0};
const mutations=mutationEvidence();
if(mutations.some(x=>!x.baseline_ok||!x.mutant_rejected))issues.push('Autopruebas negativas de Español fallaron: '+JSON.stringify(mutations.filter(x=>!x.baseline_ok||!x.mutant_rejected)));
function classifyExam(row){
 const paa=contract.exams.PAA.sections.some(s=>s.area===row.area&&s.topics.includes(row.topic));
 return paa?['PAA','PHUMA']:['PHUMA'];
}
let validatedSpanish=0,duplicateOptions=0;
for(const row of rows){
 const items=pool(row);
 for(const item of items){
  if(!item?.id||seen.has(item.id)){issues.push('ID inválido o duplicado '+String(item?.id));continue}
  seen.add(item.id);
  const exams=classifyExam(row);
  for(const exam of exams)examStats[exam]++;
  const issuesForItem=row.area==='espanol'?validateSpanishItem(item,row):[];
  if(row.area==='espanol')validatedSpanish++;
  if(issuesForItem.length){
   issues.push(item.id+': '+issuesForItem.join('; '));
   const family=row.area+'/'+row.topic+'/'+row.mode;
   byFamily[family]=(byFamily[family]??0)+1;
  }
  const answerOptions=Array.isArray(item.options)?item.options:null;
  if(answerOptions&&new Set(answerOptions).size!==answerOptions.length)duplicateOptions++;
  const sourceIds=Array.isArray(item.sourceIds)?item.sourceIds:[];
  const locator=typeof item.sourceLocator==='string'&&item.sourceLocator.trim()?item.sourceLocator:null;
  const trace={
   id:item.id,area:row.area,topic:row.topic,subtopic:row.subtopic,game:row.mode,level:row.level,
   exam_applicability:exams,
   curriculum_ref:exams.includes('PAA')?'PAA-COLLEGEBOARD-2021; PHUMA-CEI-TEST-2026':'PHUMA-CEI-TEST-2026',
   curricular_review:'REVIEW',
   curricular_review_reason:'Vínculo inferido por tema; falta evidencia independiente del ejercicio concreto frente a la competencia oficial',
   content_fingerprint:createHash('sha256').update(JSON.stringify(item)).digest('hex'),
   provenance:{source_locator:locator,origin:typeof item.origin==='string'?item.origin:null,family:typeof item.family==='string'?item.family:null,source_ids:sourceIds},
   answer_structure:row.area==='espanol'?(issuesForItem.length?'FAIL':'PASS'):'OUTSIDE_SPANISH_SCOPE',
   academic_correctness:'REVIEW'
  };
  index.push(trace);
 }
}
const expected=contract.catalog_contract;
if(index.length!==expected.technical_records)issues.push('Inventario '+index.length+' != '+expected.technical_records);
if(rows.length!==expected.cells)issues.push('Matriz '+rows.length+' != '+expected.cells);
const report={
 schema_version:1,suite:'ACADEMIA_CERT_SPANISH_TRACEABILITY_V1',sha,
 status:issues.length?'FAIL':'PASS',certified_for_exams:false,
 summary:{rows:rows.length,records:index.length,spanish_oracle_items:validatedSpanish,spanish_invalid:issues.filter(x=>x.includes(':')).length,mutation_cases:mutations.length,
 exam_links:examStats,duplicate_question_options_observed:duplicateOptions,provenance_with_source_locator:index.filter(x=>x.provenance.source_locator).length,
 curricular_individual_approved:0,curricular_individual_pending:index.length},
 mutation_evidence:mutations,errors:issues.slice(0,200),issues_total:issues.length,byFamily,
 limitations:'Un ítem con oráculo estructural PASS solo tiene respuesta seleccionable; no prueba calidad del distractor, factualidad, equivalencia oficial ni independencia semántica'
};
mkdirSync('qa/certification/evidence',{recursive:true});
writeFileSync('qa/certification/evidence/item-trace.json',JSON.stringify({sha,policy:report.limitations,items:index},null,0)+'\n');
writeFileSync('qa/certification/evidence/spanish-oracles.json',JSON.stringify(report,null,2)+'\n');
console.log(JSON.stringify({status:report.status,sha,summary:report.summary,mutation_cases:mutations.length,issues:issues.slice(0,12),issues_total:issues.length},null,2));
if(issues.length)process.exitCode=1;
