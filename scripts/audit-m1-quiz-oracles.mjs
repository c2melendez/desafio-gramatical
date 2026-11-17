/** Auditor de selección M1 con oráculos obtenidos de los contextos fuente,
 * no de q.answer. Semántica y dificultad humana continúan INCONCLUSAS.
 */
import {HOMO_CONTEXTS} from '../src/lib/m1-homonimia-contexts.ts';
import {HYPER_CONTEXTS} from '../src/lib/m1-hiperonimia-contexts.ts';
import {ADEQ_CONTEXTS} from '../src/lib/m1-adecuacion-contexts.ts';
import {REFERENT_CONTEXTS} from '../src/lib/m1-referentes-contexts.ts';
import {FIGURE_CONTEXTS} from '../src/lib/m1-figuras-contexts.ts';
import {GENRE_CONTEXTS} from '../src/lib/m1-generos-contexts.ts';
import {HOMO_QUIZ,HYPER_QUIZ,ADEQ_QUIZ} from '../src/lib/grammar-m1-next-activities.ts';
import {FIGURE_QUIZ,GENRE_QUIZ} from '../src/lib/grammar-m1-literature.ts';
import {execFileSync} from 'node:child_process';
const blocks=[
 ['homonimia',HOMO_QUIZ,HOMO_CONTEXTS.map(x=>x[2])],
 ['hiperonimia',HYPER_QUIZ,HYPER_CONTEXTS.map(x=>x[0])],
 ['adecuacion_referente',ADEQ_QUIZ,ADEQ_CONTEXTS.map((x,i)=>i<30?x.slice(1,4).join(' '):REFERENT_CONTEXTS[i-30][2])],
 ['figuras',FIGURE_QUIZ,FIGURE_CONTEXTS.map(x=>x[1])],
 ['generos',GENRE_QUIZ,GENRE_CONTEXTS.map(x=>x[1])]
];
export function verifyExpected(q,expected){
 const norm=x=>String(x??'').normalize('NFKC').trim().toLocaleLowerCase('es');
 if(!q||!Array.isArray(q.options)||q.options.length!==4)return false;
 return Number.isInteger(q.answer)&&q.answer>=0&&q.answer<4
 &&norm(q.options[q.answer])===norm(expected)
 &&q.options.filter(x=>norm(x)===norm(expected)).length===1
 &&new Set(q.options.map(norm)).size===4;
}
export function exerciseMutants(q,expected){
 const wrong={...q,answer:(q.answer+1)%4};
 const dup={...q,options:[...q.options]};dup.options[(q.answer+1)%4]=expected;
 const absent={...q,options:q.options.slice(0,3)};
 return [wrong,dup,absent].map(m=>!verifyExpected(m,expected));
}
const issues=[],histogram=[0,0,0,0],ids=new Set();
for(const [group,items,keys] of blocks){
 if(items.length!==45||keys.length!==45)issues.push({group,rule:'número de ítems/oráculos distinto de 45'});
 items.forEach((q,i)=>{
  if(ids.has(q.id))issues.push({group,id:q.id,rule:'ID duplicado'});
  ids.add(q.id);
  if(!verifyExpected(q,keys[i]))issues.push({group,id:q.id,rule:'clave no concuerda con fuente independiente del campo answer'});
  histogram[q.answer]=(histogram[q.answer]??0)+1;
  if(!exerciseMutants(q,keys[i]).every(Boolean))issues.push({group,id:q.id,rule:'mutante crítico sobrevivió'});
 });
}
const report={
 version:1,sha:execFileSync('git',['rev-parse','HEAD'],{encoding:'utf8'}).trim(),
 scope:'225 preguntas M1 en cinco grupos, claves comparadas contra bancos de contexto originales',
 status:issues.length?'FAIL':'PASS',
 counts:{questions:ids.size,groups:blocks.length,mutants_executed:ids.size*3,
 mutants_detected:issues.filter(x=>x.rule==='mutante crítico sobrevivió').length?null:ids.size*3,
 answer_distribution:histogram,issues:issues.length},
 review:{source_based_oracle:'VERIFICADO',semantic_ambiguity:'INCONCLUSO',conceptual_independence:'INCONCLUSO',human_editorial:'PENDIENTE'},
 note:'Los bancos de contexto del propio repositorio son oráculos distintos de q.answer pero no equivalen a dictamen docente externo.',
 issues
};
console.log(JSON.stringify(report,null,2));
if(issues.length)process.exitCode=1;
