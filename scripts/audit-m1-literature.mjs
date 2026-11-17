import {M1_LITERATURE_QUIZ,M1_LITERATURE_ACTIVITIES} from '../src/lib/grammar-m1-literature.ts';
import {coverageRows} from '../src/lib/coverage.ts';
import {gradeClassification,gradeConstruction,validateActivity} from '../src/lib/grammar-activities.ts';
import {execFileSync} from 'node:child_process';
const tasks=[...M1_LITERATURE_QUIZ,...M1_LITERATURE_ACTIVITIES],failures=[],seen=new Set(),checks=[];
for(const item of tasks){
 if(seen.has(item.id))failures.push({id:item.id,reason:'ID duplicado'});
 seen.add(item.id);
 if(!item.origin||!item.sourceLocator||!item.cognitiveGoal||!item.family)failures.push({id:item.id,reason:'procedencia incompleta'});
 if(item.reviewStatus!=='editorial-draft')failures.push({id:item.id,reason:'revisión docente afirmada sin evidencia'});
 if('options' in item){
  if(item.options.length!==4||new Set(item.options.map(x=>x.toLocaleLowerCase('es').trim())).size!==4||!item.options[item.answer])
   failures.push({id:item.id,reason:'opciones sin clave inequívoca por estructura'});
 }else{
  for(const reason of validateActivity(item))failures.push({id:item.id,reason});
  if(item.kind==='classification'){
   const answers=Object.fromEntries(item.items.map(x=>[x.id,x.label]));
   if(!gradeClassification(item,answers)||gradeClassification(item,{}))failures.push({id:item.id,reason:'oráculo clasificación'});
   if(item.items.map(x=>x.label).every((x,i)=>x===item.labels[i]))failures.push({id:item.id,reason:'clave evidente por posición'});
  }else if(item.tiles.length!==4||!gradeConstruction(item,item.solutions[0])||gradeConstruction(item,[...item.solutions[0].slice(0,2),'d']))
   failures.push({id:item.id,reason:'distractor o secuencia inválidos'});
 }
 checks.push({id:item.id,family:item.family,nivel:item.level,subtema:item.subtopic,
 verificacion_estructura:'VERIFICADO',oraculo_semantico:'INCONCLUSO',independencia:'INCONCLUSO',revision_docente:'PENDIENTE'});
}
const rows=coverageRows().filter(x=>x.area==='espanol'&&x.topic==='Literatura');
for(const x of rows)if(x.available<x.stageOne)failures.push({subtema:x.subtopic,juego:x.mode,nivel:x.level,reason:'cuota técnica núcleo incompleta'});
const report={version:1,module:'espanol-M1',scope:'Núcleo técnico Literatura, 270 registros en 18 celdas',
 sha:execFileSync('git',['rev-parse','HEAD'],{encoding:'utf8'}).trim(),
 status:failures.length?'FAIL':'PASS',records:tasks.length,cells:rows.length,
 criteria:{estructura:failures.length?'RECHAZADO':'VERIFICADO',respuestas_formato:failures.length?'RECHAZADO':'VERIFICADO',
 juicio_semantico:'INCONCLUSO',calibracion_dificultad:'INCONCLUSO',revision_docente:'PENDIENTE',publicacion:'NO_VERIFICADA'},
 warning:'Familias de microtextos compartidas entre tres mecánicas; independencia no demostrada. No constituye cierre de M1.',
 failures,items:checks};
console.log(JSON.stringify(report,null,2));if(failures.length)process.exitCode=1;
