import {SOCIAL_LEVEL_COUNT,SOCIAL_LEVELS,SOCIAL_MODES,SOCIAL_TOPICS,SOCIAL_SUBTOPICS,SOCIAL_M1_TOTAL,socialFacts,socialPool} from "../src/lib/social-m1.ts";
import {verifyScienceCell,verifyScienceItem} from "../src/lib/science-m1-verifier.ts";
import {selectRotation,emptyRotation,recordRotation} from "../src/lib/rotation.ts";
import {execFileSync} from "node:child_process";
const issues=[],rows=[],ids=new Set(),families=new Set();
let count=0,mutants=0,detected=0;
for(const topic of SOCIAL_TOPICS)for(const subtopic of topic.subtopics){
 const facts=socialFacts(subtopic);
 if(facts.length!==5||new Set(facts.map(x=>x.property)).size!==5||new Set(facts.map(x=>x.concept)).size!==5)
  issues.push(subtopic+": anclajes sin unicidad");
 for(const mode of SOCIAL_MODES)for(const level of SOCIAL_LEVELS){
  const cell=topic.name+"/"+subtopic+"/"+mode+"/"+level;
  const before=issues.length,bank=socialPool(topic.name,subtopic,level,mode);
  if(bank.length!==SOCIAL_LEVEL_COUNT[level])issues.push(cell+": cuota");
  for(const error of verifyScienceCell(bank,level,mode,facts))issues.push(cell+": "+error);
  for(const x of bank){
   count++;families.add(x.family);
   if(ids.has(x.id))issues.push(cell+": ID duplicado global "+x.id);ids.add(x.id);
   if(!x.prompt.includes(x.oracle.scenario))issues.push(cell+": evidencia ausente del caso "+x.id);
   if(!x.explanation.includes(x.oracle.property))issues.push(cell+": retroalimentación sin criterio "+x.id);
   if(x.source!=="GUIA-PRE-U-UNAH-2026:p10"&&x.source!=="catalogo-practica-complementaria")
    issues.push(cell+": fuente sin procedencia "+x.id);
  }
  const x=bank[0];
  for(const mutation of [
   {...x,expected:"respuesta incorrecta"},
   {...x,oracle:{...x.oracle,scenario:"escenario ajeno"}},
   {...x,options:[x.expected,x.expected,"otro","distinto"]},
   {...x,cognitiveStage:1},
   {...x,steps:[{...x.steps[0],answerIndex:10},x.steps[1]]}
  ]){
   mutants++;if(verifyScienceItem(mutation,level,mode,facts).length)detected++;
  }
  const first=selectRotation(bank,emptyRotation(),10,()=>0.31);
  let history=emptyRotation();for(const x of first)history=recordRotation(history,x.id,true);
  const second=selectRotation(bank,history,10,()=>0.61);
  if(first.length!==10||second.length!==10||
    new Set(first.map(x=>x.id)).size!==10||new Set(second.map(x=>x.id)).size!==10)
   issues.push(cell+": rotación incorrecta");
  if(bank.length>10&&second.every(x=>first.some(y=>y.id===x.id)))issues.push(cell+": segunda partida sin novedades");
  rows.push({topic:topic.name,subtopic,mode,level,count:bank.length,issues:issues.length-before});
 }
}
if(SOCIAL_SUBTOPICS.length!==20||rows.length!==180||count!==2700||ids.size!==2700||
 SOCAL_FALSE()||mutants!==900||detected!==mutants)
 issues.push("totales o mutaciones inválidos "+JSON.stringify({cells:rows.length,count,ids:ids.size,mutants,detected}));
function SOCAL_FALSE(){return SOCIAL_M1_TOTAL!==2700;}
const report={module:"sociales-M1",status:issues.length?"FAIL":"PASS",
 sha:execFileSync("git",["rev-parse","HEAD"],{encoding:"utf8"}).trim(),
 scope:{topics:5,subtopics:SOCIAL_SUBTOPICS.length,cells:rows.length,technical_records:count,ids_unique:ids.size,concept_families:families.size,targets:SOCIAL_LEVEL_COUNT},
 negative:{mutants,detected,survivors:mutants-detected},
 limits:{source:"Guía PRE-U UNAH 2026 página impresa 10 y catálogo complementario",anchors:100,
 semantic_independence:"NO_CERTIFICADA",human_review:"PENDIENTE_AUTORIZADA",browser_visual:"NO_EJECUTADA"},
 matrix:rows,issues};
console.log(JSON.stringify(report,null,2));if(issues.length)process.exitCode=1;
