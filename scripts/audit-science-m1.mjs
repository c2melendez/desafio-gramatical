import {SCIENCE_LEVEL_COUNT,SCIENCE_LEVELS,SCIENCE_MODES,SCIENCE_TOPICS,SCIENCE_SUBTOPICS,SCIENCE_M1_TOTAL,scienceFacts,sciencePool} from "../src/lib/science-m1.ts";
import {verifyScienceCell} from "../src/lib/science-m1-verifier.ts";
import {emptyRotation,selectRotation,recordRotation} from "../src/lib/rotation.ts";
import {execFileSync} from "node:child_process";
const problems=[],rows=[],ids=new Set(),families=new Set();
let count=0;
for(const topic of SCIENCE_TOPICS)for(const subtopic of topic.subtopics){
 const facts=scienceFacts(subtopic);
 if(facts.length<10)problems.push(subtopic+": menos de 10 conceptos base verificados");
 if(new Set(facts.map(f=>f.concept)).size!==facts.length)problems.push(subtopic+": conceptos repetidos");
 if(new Set(facts.map(f=>f.property)).size!==facts.length)problems.push(subtopic+": propiedades duplicadas");
 for(const mode of SCIENCE_MODES)for(const level of SCIENCE_LEVELS){
  const bank=sciencePool(topic.name,subtopic,level,mode);
  const before=problems.length,cell=[topic.name,subtopic,mode,level].join("/");
  if(bank.length!==SCIENCE_LEVEL_COUNT[level])problems.push(cell+": cuota incorrecta");
  for(const issue of verifyScienceCell(bank,level,mode,facts))problems.push(cell+": "+issue);
  for(const item of bank){
   count++;
   if(ids.has(item.id))problems.push(cell+": ID global duplicado "+item.id);
   ids.add(item.id);families.add(item.family);
   const named=topic.name==="Biología"?
    ["Ecología"].includes(subtopic)?"catalogo-practica-complementaria":
    ["Método científico","Cuerpo humano"].includes(subtopic)?"GUIA-PRE-U-UNAH-2026:p8":"GUIA-PRE-U-UNAH-2026:p7":
    ["Tabla periódica","Materia","Reacciones"].includes(subtopic)?"catalogo-practica-complementaria":"GUIA-PRE-U-UNAH-2026:p9";
   if(item.source!==named)problems.push(cell+": origen curricular mal atribuido "+item.id);
  }
  // Ensayo de dos partidas: 10 IDs únicos, la siguiente prioriza elementos inéditos.
  const first=selectRotation(bank,emptyRotation(),10,()=>0.41);
  let history=emptyRotation();
  for(const item of first)history=recordRotation(history,item.id,true);
  const second=selectRotation(bank,history,10,()=>0.63);
  if(first.length!==10||second.length!==10||
   new Set(first.map(x=>x.id)).size!==10||new Set(second.map(x=>x.id)).size!==10)
   problems.push(cell+": número de rondas/rotación inválido");
  if(bank.length>=15&&second.every(x=>first.some(y=>y.id===x.id)))
   problems.push(cell+": no prioriza ejercicios inéditos");
  rows.push({topic:topic.name,subtopic,mode,level,count:bank.length,concept_families:new Set(bank.map(x=>x.family)).size,
   review:"PENDIENTE_DOCENTE",automation:"STRUCTURAL",issues:problems.length-before});
 }
}
if(SCIENCE_SUBTOPICS.length!==19||rows.length!==171||SCIENCE_M1_TOTAL!==2565||count!==SCIENCE_M1_TOTAL||ids.size!==count)
 problems.push("Inventario incompleto "+JSON.stringify({subtopics:SCIENCE_SUBTOPICS.length,cells:rows.length,count,ids:ids.size,total:SCIENCE_M1_TOTAL}));
const report={module:"naturales-M1",status:problems.length?"FAIL":"PASS",
 sha:execFileSync("git",["rev-parse","HEAD"],{encoding:"utf8"}).trim(),
 scope:{topics:SCIENCE_TOPICS.length,subtopics:SCIENCE_SUBTOPICS.length,combinations:SCIENCE_SUBTOPICS.length*SCIENCE_MODES.length,cells:rows.length,technical_records:count,unique_ids:ids.size,semantic_families:families.size,targets:SCIENCE_LEVEL_COUNT},
 evidence:{source:"GUIA-PRE-U-UNAH-2026.pdf páginas impresas 7-9; práctica complementaria separada",
 independent_factual_verification:"INCONCLUSA; revisión científica experta pendiente",
 independence:"NO_CERTIFICADA; la misma familia conceptual puede aparecer en tres modalidades y diversos casos",
 checks:"cuotas, unicidad, estructura, respuestas, etiquetas de origen, explicación, rotación, diez rondas",
 academic_review:"PENDIENTE_AUTORIZADA",human_interface_review:"NO_EJECUTADO"},
 matrix:rows,failures:problems};
console.log(JSON.stringify(report,null,2));
if(problems.length)process.exitCode=1;
