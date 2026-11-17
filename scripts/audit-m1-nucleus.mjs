// Informe reproducible de M1: verificación técnica separada de revisión editorial humana.
import {GRAMMAR_M1_ACTIVITIES} from '../src/lib/grammar-m1-activities.ts';
import {validateActivity,gradeClassification,gradeConstruction} from '../src/lib/grammar-activities.ts';
import {countContent} from '../src/lib/coverage.ts';
import {execFileSync} from 'node:child_process';
const key=x=>[x.subtopic,x.kind,x.level].join('|');
const levels={principiante:10,intermedio:15,avanzado:20};
const groups=[
 ['Sinónimos y antónimos','construction'],
 ['Cohesión y coherencia','construction'],
 ['Morfosintaxis','classification'],
 ['Morfosintaxis','construction']
];
const issues=[],perCell=[],seen=new Set(),fingerprints=new Map(),similar=[];
for(const item of GRAMMAR_M1_ACTIVITIES){
 if(seen.has(item.id))issues.push({id:item.id,reason:'ID duplicado'});
 seen.add(item.id);
 for(const reason of validateActivity(item))issues.push({id:item.id,reason});
 if(!item.competence||!item.cognitiveGoal||!item.origin||!item.sourceLocator||!item.family)issues.push({id:item.id,reason:'trazabilidad incompleta'});
 if(item.kind==='classification'){
  const answers=Object.fromEntries(item.items.map(x=>[x.id,x.label]));
  if(item.items.map(x=>x.label).every((x,i)=>x===item.labels[i]))issues.push({id:item.id,reason:'clave inferible por posición de presentación'});
  if(!gradeClassification(item,answers)||gradeClassification(item,{}))issues.push({id:item.id,reason:'oráculo estructural clasificación'});
 }else{
  const candidate=item.solutions[0];
  if(item.tiles.length!==4||candidate.length!==3||!item.tiles.some(x=>x.id==="d"))issues.push({id:item.id,reason:"construcción carece de distractor evaluable"});
  if(gradeConstruction(item,[...candidate.slice(0,2),"d"]))issues.push({id:item.id,reason:"oráculo admite distractor incompatible"});
  if(!gradeConstruction(item,candidate)||gradeConstruction(item,candidate.slice(0,-1)))issues.push({id:item.id,reason:'oráculo estructural construcción'});
 }
 const fingerprint=[item.subtopic,item.kind,item.prompt].join('|').normalize('NFKC').toLocaleLowerCase('es').replace(/\s+/g,' ').trim();
 if(fingerprints.has(fingerprint))similar.push({id:item.id,similar_to:fingerprints.get(fingerprint)});
 else fingerprints.set(fingerprint,item.id);
}
for(const [subtopic,kind] of groups){
 for(const [level,target] of Object.entries(levels)){
  const items=GRAMMAR_M1_ACTIVITIES.filter(x=>x.subtopic===subtopic&&x.kind===kind&&x.level===level);
  const mode=kind==='construction'?'construir':'clasificar';
  const available=countContent('espanol','Gramática y semántica',subtopic,mode,level);
  perCell.push({subtema:subtopic,juego:mode,nivel:level,nuevos:items.length,meta:target,disponibles_en_codigo:available});
  if(items.length!==target||available<target)issues.push({cell:key({subtopic,kind,level}),reason:'cuota y ruta incoherentes'});
 }
}
if(GRAMMAR_M1_ACTIVITIES.length!==180)issues.push({reason:'cantidad total distinta de 180'});
const report={
 version:1,module:'espanol-M1',scope:'Primer bloque técnico de Gramática y semántica, no todo el módulo M1 del área',
 sha:execFileSync('git',['rev-parse','HEAD'],{encoding:'utf8'}).trim(),
 status:issues.length?'FAIL':'PASS',
 summary:{new_records:GRAMMAR_M1_ACTIVITIES.length,cells:perCell.length,new_basic:40,new_intermediate:60,new_advanced:80,
 issues:issues.length,similar_exact_prompts:similar.length},
 contracts:{structure:issues.length?'RECHAZADO':'VERIFICADO',automated_answer_structure:issues.length?'RECHAZADO':'VERIFICADO',
 semantic_independence:'INCONCLUSO',human_editorial_review:'PENDIENTE',psychometrics:'NO_CALIBRADO',
 production_integration:'NO_VERIFICADA'},
 limitations:'Las pruebas de claves son estructurales; no sustituyen oráculo semántico externo, revisión docente, accesibilidad real o Render Live.',
 perCell,similar,issues
};
console.log(JSON.stringify(report,null,2));
if(issues.length)process.exitCode=1;
