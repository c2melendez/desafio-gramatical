import {SOCIAL_TOPICS,SOCIAL_SUBTOPICS,SOCIAL_LEVELS,SOCIAL_MODES,socialFacts,socialPool} from "../src/lib/social-m1.ts";
import {SOCIAL_M2_LEVEL_COUNT,SOCIAL_M2_NEW_PER_LEVEL,SOCIAL_M2_NEW_TOTAL,SOCIAL_M2_TOTAL,socialM2NewPool,socialM2Pool} from "../src/lib/social-m2.ts";
import {verifyScienceItem,verifyScienceCell,scienceStimulusFingerprint} from "../src/lib/science-m1-verifier.ts";
import {emptyRotation,selectRotation,recordRotation} from "../src/lib/rotation.ts";
import {execFileSync} from "node:child_process";
const issues=[],matrix=[],ids=new Set(),families=new Set();let before=0,added=0,total=0,mutants=0,detected=0;
for(const topic of SOCIAL_TOPICS)for(const subtopic of topic.subtopics){
 const facts=socialFacts(subtopic);
 for(const mode of SOCIAL_MODES)for(const level of SOCIAL_LEVELS){
  const cell=[topic.name,subtopic,mode,level].join("/");
  const previous=socialPool(topic.name,subtopic,level,mode),fresh=socialM2NewPool(topic.name,subtopic,level,mode),all=socialM2Pool(topic.name,subtopic,level,mode);
  const start=issues.length;before+=previous.length;added+=fresh.length;total+=all.length;
  if(all.length!==SOCIAL_M2_LEVEL_COUNT[level]||fresh.length!==SOCIAL_M2_NEW_PER_LEVEL[level])issues.push(cell+": cuota incorrecta");
  for(let i=0;i<previous.length;i++)if(JSON.stringify(all[i])!==JSON.stringify(previous[i]))issues.push(cell+": registro M1 modificado "+previous[i].id);
  const oldFingerprints=new Set(previous.map(scienceStimulusFingerprint));
  for(const x of fresh){
   if(!x.id.startsWith("social-m2-"))issues.push(cell+": prefijo incorrecto "+x.id);
   if(oldFingerprints.has(scienceStimulusFingerprint(x)))issues.push(cell+": estímulo histórico duplicado "+x.id);
   if(!x.prompt.includes(x.oracle.scenario)||!x.explanation.includes(x.oracle.property))issues.push(cell+": ausencia de evidencia/retroalimentación "+x.id);
   if(x.reviewStatus!=="editorial-draft")issues.push(cell+": revisión declarada sin evidencia "+x.id);
  }
  for(const err of verifyScienceCell(all,level,mode,facts))issues.push(cell+": "+err);
  for(const x of all){if(ids.has(x.id))issues.push(cell+": colisión global "+x.id);ids.add(x.id);families.add(x.family);}
  const x=fresh[0];
  const mutations=[
   {...x,expected:"clave falsa"},
   {...x,oracle:{...x.oracle,scenario:"escenario inexistente"}},
   {...x,options:[x.expected,x.expected,"x","y"]},
   {...x,cognitiveStage:level==="principiante"?3:1},
   {...x,steps:[{...x.steps[0],answerIndex:9},x.steps[1]]},
  ];
  for(const m of mutations){mutants++;if(verifyScienceItem(m,level,mode,facts).length)detected++;}
  let state=emptyRotation();const first=selectRotation(all,state,10,()=>0.23);
  for(const x of first)state=recordRotation(state,x.id,true);
  const second=selectRotation(all,state,10,()=>0.61);
  if(first.length!==10||second.length!==10||new Set(first.map(x=>x.id)).size!==10||
   new Set(second.map(x=>x.id)).size!==10||second.some(x=>first.some(y=>y.id===x.id)))
   issues.push(cell+": rotación 10/10 repetida");
  matrix.push({topic:topic.name,subtopic,mode,level,before:previous.length,new:fresh.length,cumulative:all.length,issues:issues.length-start,academic:"PENDIENTE_AUTORIZADA"});
 }
}
if(SOCIAL_SUBTOPICS.length!==20||matrix.length!==180||before!==2700||added!==SOCIAL_M2_NEW_TOTAL||total!==SOCIAL_M2_TOTAL||ids.size!==6000||mutants!==900||detected!==mutants)
 issues.push("totales o mutaciones incorrectas "+JSON.stringify({subtopics:SOCIAL_SUBTOPICS.length,cells:matrix.length,before,added,total,ids:ids.size,mutants,detected}));
const report={module:"sociales-M2",status:issues.length?"FAIL":"PASS",sha:execFileSync("git",["rev-parse","HEAD"],{encoding:"utf8"}).trim(),
 scope:{topics:SOCIAL_TOPICS.length,subtopics:SOCIAL_SUBTOPICS.length,cells:matrix.length,previous:before,new:added,cumulative:total,unique_ids:ids.size,families:families.size,per_level:SOCIAL_M2_LEVEL_COUNT,added_per_level:SOCIAL_M2_NEW_PER_LEVEL},
 mutations:{generated:mutants,detected,survived:mutants-detected},
 limitations:{anchors:100,independent_semantic_tasks:"NO_CERTIFICADAS",academic:"PENDIENTE_AUTORIZADA",visual_manual:"NO_EJECUTADA"},
 matrix,issues};
console.log(JSON.stringify(report,null,2));
if(issues.length){console.error("SOCIALES M2 FAILED",JSON.stringify({errors:issues.length,sample:issues.slice(0,12)}));process.exitCode=1;}
