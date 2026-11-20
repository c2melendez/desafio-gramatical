import {SCIENCE_LEVELS,SCIENCE_MODES,SCIENCE_TOPICS,SCIENCE_SUBTOPICS,scienceFacts} from "../src/lib/science-m1.ts";
import {SCIENCE_M2_LEVEL_COUNT,scienceM2Pool} from "../src/lib/science-m2.ts";
import {SCIENCE_M3_LEVEL_COUNT,SCIENCE_M3_NEW_PER_LEVEL,SCIENCE_M3_NEW_TOTAL,SCIENCE_M3_TOTAL,scienceM3Pool,scienceM3NewPool} from "../src/lib/science-m3.ts";
import {verifyScienceCell,scienceStimulusFingerprint} from "../src/lib/science-m1-verifier.ts";
import {emptyRotation,selectRotation,recordRotation} from "../src/lib/rotation.ts";
import {execFileSync} from "node:child_process";
const errors=[],matrix=[],globalIds=new Set(),families=new Set();
let previous=0,added=0,technical=0;
const key=s=>String(s).normalize("NFKC").toLocaleLowerCase("es").replace(/\s+/g," ").trim();
for(const topic of SCIENCE_TOPICS)for(const subtopic of topic.subtopics){
 const facts=scienceFacts(subtopic);
 for(const mode of SCIENCE_MODES)for(const level of SCIENCE_LEVELS){
  const cell=[topic.name,subtopic,mode,level].join("/");
  const before=errors.length;
  const old=scienceM2Pool(topic.name,subtopic,level,mode),fresh=scienceM3NewPool(topic.name,subtopic,level,mode);
  const all=scienceM3Pool(topic.name,subtopic,level,mode);
  previous+=old.length;added+=fresh.length;technical+=all.length;
  if(old.length!==SCIENCE_M2_LEVEL_COUNT[level]||fresh.length!==SCIENCE_M3_NEW_PER_LEVEL[level]||
     all.length!==SCIENCE_M3_LEVEL_COUNT[level])errors.push(cell+": cuota incorrecta");
  for(let i=0;i<old.length;i++)if(JSON.stringify(all[i])!==JSON.stringify(old[i]))errors.push(cell+": contenido M1/M2 modificado "+old[i].id);
  for(const finding of verifyScienceCell(all,level,mode,facts))errors.push(cell+": "+finding);
  const prior=new Set(old.map(scienceStimulusFingerprint));
  for(const item of all){
   if(globalIds.has(item.id))errors.push(cell+": ID global duplicado "+item.id);
   globalIds.add(item.id);
   families.add(item.family);
   if(item.topic!==topic.name||item.subtopic!==subtopic)errors.push(cell+": catálogo diferente "+item.id);
   if(!item.prompt.includes(item.oracle.scenario))errors.push(cell+": no refleja evidencia base "+item.id);
   if(!item.explanation.includes(item.oracle.property))errors.push(cell+": explicación ajena al oráculo "+item.id);
  }
  for(const item of fresh){
   if(!item.id.startsWith("science-m3-"))errors.push(cell+": prefijo M3 erróneo "+item.id);
   if(prior.has(scienceStimulusFingerprint(item)))errors.push(cell+": M3 duplica M1/M2 "+item.id);
   if(!["discriminar-observacion","contrastacion-mecanismos","corregir-inferencia"].includes(item.operation))
    errors.push(cell+": operación cognitiva ajena a M3 "+item.id);
   if(item.requiredEvidence.length<({principiante:3,intermedio:4,avanzado:5})[level])
    errors.push(cell+": evidencia cognitiva insuficiente "+item.id);
   if(item.reviewStatus!=="editorial-draft")errors.push(cell+": estado editorial erróneo");
   const good=item.assertions.find(x=>x.truth);
   if(!good||!key(good.text).includes(key(item.oracle.property)))errors.push(cell+": afirmación verdadera no explicada "+item.id);
  }
  const first=selectRotation(all,emptyRotation(),10,()=>0.21);
  let history=emptyRotation();for(const item of first)history=recordRotation(history,item.id,true);
  const second=selectRotation(all,history,10,()=>0.57);
  if(first.length!==10||second.length!==10||
   new Set(first.map(x=>x.id)).size!==10||new Set(second.map(x=>x.id)).size!==10||
   second.some(x=>first.some(y=>y.id===x.id)))errors.push(cell+": rotación 10/10 inválida");
  matrix.push({area:"naturales",topic:topic.name,subtopic,mode,level,before:old.length,added:fresh.length,after:all.length,
    unique_families:new Set(all.map(x=>x.family)).size,issues:errors.length-before,
    structural:"VERIFICADO",academic:"PENDIENTE_AUTORIZADA",independence:"NO_CERTIFICADA"});
 }
}
if(SCIENCE_SUBTOPICS.length!==19||matrix.length!==171||previous!==5700||added!==SCIENCE_M3_NEW_TOTAL||
   technical!==SCIENCE_M3_TOTAL||globalIds.size!==SCIENCE_M3_TOTAL)
 errors.push("Totales incompletos "+JSON.stringify({subtopics:SCIENCE_SUBTOPICS.length,cells:matrix.length,previous,added,technical,ids:globalIds.size}));
const report={module:"naturales-M3",stage:"CORTE_AREA",status:errors.length?"FAIL":"PASS",
 sha:execFileSync("git",["rev-parse","HEAD"],{encoding:"utf8"}).trim(),
 scope:{areas:1,topics:SCIENCE_TOPICS.length,subtopics:SCIENCE_SUBTOPICS.length,combinations:SCIENCE_SUBTOPICS.length*3,
  cells:matrix.length,previous,new:added,cumulative:technical,unique_ids:globalIds.size,families:families.size,
  per_level:SCIENCE_M3_LEVEL_COUNT,added_per_level:SCIENCE_M3_NEW_PER_LEVEL},
 coverage:{automated_structure:technical,academic_approved:0,semantic_independent_verified:0,technical_quarantine:errors.length?null:0},
 limitations:{academic:"PENDIENTE_AUTORIZADA",semantic_independence:"NO_CERTIFICADA",source:"Guía PRE-U UNAH 2026 páginas impresas 7-9 y práctica complementaria",visual_browser:"REQUIERE PRUEBA MANUAL",psychometrics:"NO_CERTIFICADA"},
 matrix,errors};
console.log(JSON.stringify(report,null,2));
if(errors.length)process.exitCode=1;
