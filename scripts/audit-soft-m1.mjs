import {SOFT_TOPICS,SOFT_SUBTOPICS,SOFT_LEVELS,SOFT_MODES,SOFT_LEVEL_COUNT,SOFT_M1_TOTAL,softPool,softFacts} from "../src/lib/soft-m1.ts";
import {verifyScienceCell,verifyScienceItem} from "../src/lib/science-m1-verifier.ts";
import {SOFT_M3_LEVEL_COUNT} from "../src/lib/soft-m3.ts";
import {coverageRows,countContent} from "../src/lib/coverage.ts";
import {availableModule} from "../src/lib/phuma-catalog.ts";
import {emptyRotation,selectRotation,recordRotation,parseRotation} from "../src/lib/rotation.ts";
import {execFileSync} from "node:child_process";
const errors=[],matrix=[],ids=new Set(),families=new Set(),groups={principiante:0,intermedio:0,avanzado:0};let total=0,mutants=0,detected=0;
for(const t of SOFT_TOPICS)for(const sub of t.subtopics){
 const facts=softFacts(sub);
 if(facts.length!==5||new Set(facts.map(x=>x.concept)).size!==5||new Set(facts.map(x=>x.property)).size!==5)
  errors.push(sub+": cinco anclajes diferenciados obligatorios");
 for(const mode of SOFT_MODES)for(const level of SOFT_LEVELS){
  const cell=t.name+"/"+sub+"/"+mode+"/"+level,bank=softPool(t.name,sub,level,mode),before=errors.length;
  if(bank.length!==SOFT_LEVEL_COUNT[level]||countContent("blandas",t.name,sub,mode,level)!==SOFT_M3_LEVEL_COUNT[level]||!availableModule("blandas",t.name,sub))
   errors.push(cell+": cuota/menú inválido");
  for(const problem of verifyScienceCell(bank,level,mode,facts))errors.push(cell+": "+problem);
  for(const item of bank){
   if(ids.has(item.id))errors.push(cell+": ID repetido global "+item.id);
   ids.add(item.id);families.add(item.family);
   if(item.source!=="catalogo-practica-complementaria"||item.reviewStatus!=="editorial-draft")
    errors.push(cell+": fuente o revisión académica declarada incorrectamente "+item.id);
   if(!item.prompt.includes(item.oracle.scenario)||!item.explanation.includes(item.oracle.property))
    errors.push(cell+": falta evidencia específica "+item.id);
  }
  total+=bank.length;groups[level]+=bank.length;
  const first=selectRotation(bank,emptyRotation(),10,()=>0.31);
  let state=emptyRotation();for(const x of first)state=recordRotation(state,x.id,true);
  const second=selectRotation(bank,parseRotation(JSON.stringify(state),bank.map(x=>x.id)),10,()=>0.61);
  if(first.length!==10||second.length!==10||new Set(first.map(x=>x.id)).size!==10||
   new Set(second.map(x=>x.id)).size!==10||second.filter(x=>first.some(y=>x.id===y.id)).length!==Math.max(0,20-bank.length))
   errors.push(cell+": rotación 10/10 o persistencia rota");
  const item=bank[0];
  const tests=[
   {...item,expected:"clave falsa"},
   {...item,oracle:{...item.oracle,scenario:"escenario inventado"}},
   {...item,options:[item.expected,item.expected,"A","B"]},
   {...item,assertions:item.assertions.map(a=>({...a,truth:true}))},
   {...item,steps:[{...item.steps[0],answerIndex:10},item.steps[1]]},
   {...item,explanation:""},
   {...item,cognitiveStage:level==="principiante"?3:1},
   {...item,reviewStatus:"approved"},
  ];
  for(const bad of tests){mutants++;if(verifyScienceItem(bad,level,mode,facts).length)detected++;}
  matrix.push({topic:t.name,subtopic:sub,mode,level,expected:SOFT_LEVEL_COUNT[level],observed:bank.length,deficit:Math.max(0,SOFT_LEVEL_COUNT[level]-bank.length),errors:errors.length-before,academic:"PENDIENTE"});
 }
}
const social=coverageRows().filter(x=>x.area==="blandas");
if(SOFT_SUBTOPICS.length!==8||SOFT_TOPICS.length!==3||matrix.length!==72||social.length!==72||total!==SOFT_M1_TOTAL||ids.size!==1080||
 groups.principiante!==240||groups.intermedio!==360||groups.avanzado!==480||mutants!==576||detected!==576)
 errors.push("totales o mutaciones incorrectos "+JSON.stringify({cells:matrix.length,total,ids:ids.size,groups,mutants,detected}));
const report={area:"blandas",module:"blandas-M1",status:errors.length?"FAIL":"PASS",
 sha:execFileSync("git",["rev-parse","HEAD"],{encoding:"utf8"}).trim(),
 scope:{topics:SOFT_TOPICS.length,subtopics:SOFT_SUBTOPICS.length,cells:matrix.length,records:total,unique_ids:ids.size,families:families.size,counts:groups},
 mutations:{executed:mutants,detected,survived:mutants-detected},
 curriculum:{origin:"catalogo de practica complementaria",official_guide_listing:false,conceptual_anchors:40,independent_items_certified:0},
 pending:{academic:"AUTORIZADA_PENDIENTE",visual_manual:"NO_EJECUTADA",psychometric:"NO_VERIFICADA"},matrix,errors};
console.log(JSON.stringify(report,null,2));if(errors.length){console.error("BLANDAS M1 ERROR",errors.slice(0,15));process.exitCode=1;}
