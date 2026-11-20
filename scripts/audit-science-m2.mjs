import {
 SCIENCE_LEVEL_COUNT,SCIENCE_LEVELS,SCIENCE_MODES,SCIENCE_TOPICS,SCIENCE_SUBTOPICS,
 scienceFacts,sciencePool
} from "../src/lib/science-m1.ts";
import {
 SCIENCE_M2_LEVEL_COUNT,SCIENCE_M2_NEW_PER_LEVEL,SCIENCE_M2_NEW_TOTAL,SCIENCE_M2_TOTAL,
 scienceM2Pool,scienceM2NewPool
} from "../src/lib/science-m2.ts";
import {verifyScienceCell,verifyScienceItem,scienceStimulusFingerprint} from "../src/lib/science-m1-verifier.ts";
import {emptyRotation,selectRotation,recordRotation} from "../src/lib/rotation.ts";
import {execFileSync} from "node:child_process";

const errors=[],rows=[],ids=new Set();
let oldCount=0,newCount=0,verified=0;
for(const topic of SCIENCE_TOPICS)for(const subtopic of topic.subtopics){
 const facts=scienceFacts(subtopic);
 for(const mode of SCIENCE_MODES)for(const level of SCIENCE_LEVELS){
  const cell=[topic.name,subtopic,mode,level].join("/");
  const old=sciencePool(topic.name,subtopic,level,mode);
  const fresh=scienceM2NewPool(topic.name,subtopic,level,mode);
  const all=scienceM2Pool(topic.name,subtopic,level,mode);
  const priorIssues=errors.length;
  oldCount+=old.length;newCount+=fresh.length;
  if(old.length!==SCIENCE_LEVEL_COUNT[level]||fresh.length!==SCIENCE_M2_NEW_PER_LEVEL[level]||
     all.length!==SCIENCE_M2_LEVEL_COUNT[level])errors.push(cell+": cuota acumulada incorrecta");
  if(all.slice(0,old.length).some((item,i)=>item.id!==old[i].id||
   JSON.stringify(item)!==JSON.stringify(old[i])))errors.push(cell+": modificación del histórico M1");
  for(const issue of verifyScienceCell(all,level,mode,facts))errors.push(cell+": "+issue);
  const seen=new Set(),previousSignatures=new Set(old.map(scienceStimulusFingerprint));
  for(const item of all){
   if(ids.has(item.id))errors.push(cell+": ID global duplicado "+item.id);
   ids.add(item.id);seen.add(scienceStimulusFingerprint(item));
   const itemIssues=verifyScienceItem(item,level,mode,facts);
   if(!itemIssues.length)verified++;
   if(item.reviewStatus!=="editorial-draft")errors.push(cell+": revisión docente no declarada");
  }
  for(const item of fresh){
   if(!item.id.startsWith("science-m2-"))errors.push(cell+": prefijo de ID incorrecto");
   if(previousSignatures.has(scienceStimulusFingerprint(item)))
     errors.push(cell+": estímulo M2 duplicado de M1 "+item.id);
   if(!item.prompt.includes(facts[item.index%facts.length].scenario))
     errors.push(cell+": falta evidencia en situación "+item.id);
   if(!item.explanation.includes("alternativa")||
      !item.explanation.includes("observación")||item.requiredEvidence.length<3)
     errors.push(cell+": explicación insuficiente "+item.id);
  }
  // El selector debe exponer diez IDs distintos, tanto en M2 como tras una ronda previa.
  const first=selectRotation(all,emptyRotation(),10,()=>0.19);
  let state=emptyRotation();
  for(const item of first)state=recordRotation(state,item.id,true);
  const second=selectRotation(all,state,10,()=>0.37);
  if(first.length!==10||second.length!==10||new Set(first.map(x=>x.id)).size!==10||
   new Set(second.map(x=>x.id)).size!==10||second.some(x=>first.some(y=>y.id===x.id)))
   errors.push(cell+": rotación 10/10 o historial defectuoso");
  rows.push({topic:topic.name,subtopic,mode,level,before:old.length,added:fresh.length,after:all.length,
   technical_verified:all.length,conceptual_independence:"NO_CERTIFICADA",
   review:"PENDIENTE_DOCENTE",issues:errors.length-priorIssues});
 }
}
if(SCIENCE_SUBTOPICS.length!==19||rows.length!==171||oldCount!==2565||
 newCount!==SCIENCE_M2_NEW_TOTAL||oldCount+newCount!==SCIENCE_M2_TOTAL||
 ids.size!==SCIENCE_M2_TOTAL||verified!==SCIENCE_M2_TOTAL)
 errors.push("Totales globales incorrectos "+JSON.stringify({subtopics:SCIENCE_SUBTOPICS.length,
  cells:rows.length,oldCount,newCount,total:oldCount+newCount,ids:ids.size,verified}));
const report={module:"naturales-M2",status:errors.length?"FAIL":"PASS",
 sha:execFileSync("git",["rev-parse","HEAD"],{encoding:"utf8"}).trim(),
 scope:{topics:SCIENCE_TOPICS.length,subtopics:SCIENCE_SUBTOPICS.length,cells:rows.length,
  old:oldCount,added:newCount,cumulative:oldCount+newCount,unique_ids:ids.size,
  automated_structural_verified:verified,targets:SCIENCE_M2_LEVEL_COUNT,
  increments:SCIENCE_M2_NEW_PER_LEVEL},
 limitations:{independence:"NO_CERTIFICADA; 190 anclajes curriculares parametrizados",
  external_fact_check:"NO_CERTIFICADO; revisión científica humana pendiente",
  difficulty:"NO_CALIBRADA_PSIComETRICAMENTE",
  visual_manual_review:"PENDIENTE",
  source:"Guía PRE-U UNAH 2026, páginas impresas 7-9; catálogo complementario diferenciado"},
 checks:"Oráculos anclados, niveles, clasificación, selección, construcción, respuesta, evidencia, M1 inalterado, IDs y huellas normalizados, 10/10, regresión",
 matrix:rows,failures:errors};
console.log(JSON.stringify(report,null,2));
if(errors.length)process.exitCode=1;
