/** Reconcilia familias de estímulos para evitar triples conteos de independencia.
 * No equivale a revisión semántica ni acredita independencia del alumnado.
 */
import {M1_NEXT_QUIZ,M1_NEXT_ACTIVITIES} from '../src/lib/grammar-m1-next-activities.ts';
import {M1_LITERATURE_QUIZ,M1_LITERATURE_ACTIVITIES} from '../src/lib/grammar-m1-literature.ts';
import {execFileSync} from 'node:child_process';
const items=[...M1_NEXT_QUIZ,...M1_NEXT_ACTIVITIES,...M1_LITERATURE_QUIZ,...M1_LITERATURE_ACTIVITIES];
export function analyzeFamilies(records){
 const groups=new Map(),issues=[];
 for(const item of records){
  if(!item.family||!item.id||!item.cognitiveGoal){issues.push({id:item.id,rule:'falta metadato de familia u objetivo'});continue}
  const arr=groups.get(item.family)||[];
  arr.push({id:item.id,subtema:item.subtopic,level:item.level,
   juego:'options' in item?'quiz':item.kind,objetivo:item.cognitiveGoal});
  groups.set(item.family,arr);
 }
 const distributions={1:0,2:0,3:0,other:0};
 const candidates=[];
 for(const [family,members] of groups){
  distributions[members.length]===undefined?distributions.other++:distributions[members.length]++;
  if(members.length>3)issues.push({family,rule:'más de tres apariciones de estímulo'});
  const games=members.map(x=>x.juego);
  if(new Set(games).size!==games.length)issues.push({family,rule:'repetición en el mismo juego'});
  if(new Set(members.map(x=>x.level)).size>1)issues.push({family,rule:'estímulo mezclado entre dificultades'});
  if(new Set(members.map(x=>x.subtema)).size>1)issues.push({family,rule:'familia mezclada entre subtemas'});
  if(new Set(members.map(x=>x.objetivo)).size!==members.length)
   candidates.push({family,reason:'objetivo cognitivo repetido entre modalidades',members});
 }
 return {families:groups.size,distribution:distributions,issues,candidates,
  records_by_family:[...groups].map(([family,members])=>({family,count:members.length,members}))};
}
const audit=analyzeFamilies(items);
const expected={families:240,records:675,distribution:{1:15,2:15,3:210,other:0}};
const problems=[...audit.issues];
if(items.length!==expected.records)problems.push({rule:'cantidad de registros distinta',actual:items.length});
if(audit.families!==expected.families)problems.push({rule:'familias distintas de la línea base reconciliada',actual:audit.families});
for(const [n,v] of Object.entries(expected.distribution))
 if(audit.distribution[n]!==v)problems.push({rule:'distribución de familias incoherente',size:n,actual:audit.distribution[n],expected:v});
if(audit.candidates.length)problems.push({rule:'algunas tareas comparten objetivo literal',count:audit.candidates.length});
const report={version:1,sha:execFileSync('git',['rev-parse','HEAD'],{encoding:'utf8'}).trim(),
 status:problems.length?'FAIL':'PASS',
 summary:{records:items.length,families:audit.families,distribution:audit.distribution,
  structure_issues:problems.length,manual_review_candidates:audit.records_by_family.filter(x=>x.count>1).length},
 independence:'INCONCLUSO',
 rationale:'Se diferencian operaciones cognitivas a nivel de etiquetas, pero los estímulos compartidos siguen requiriendo juicio semántico externo por ítem. No acreditar como unidades independientes.',
 issues:problems,candidates:audit.candidates,groups:audit.records_by_family};
console.log(JSON.stringify(report,null,2));if(problems.length)process.exitCode=1;
