import {SOCIAL_TOPICS,SOCIAL_SUBTOPICS,SOCIAL_LEVELS,SOCIAL_MODES,socialFacts} from "../src/lib/social-m1.ts";
import {socialM2Pool} from "../src/lib/social-m2.ts";
import {SOCIAL_M3_LEVEL_COUNT,SOCIAL_M3_NEW_PER_LEVEL,SOCIAL_M3_NEW_TOTAL,SOCIAL_M3_TOTAL,socialM3Pool,socialM3NewPool} from "../src/lib/social-m3.ts";
import {verifyScienceCell,verifyScienceItem,scienceStimulusFingerprint} from "../src/lib/science-m1-verifier.ts";
import {emptyRotation,selectRotation,recordRotation} from "../src/lib/rotation.ts";
import {execFileSync} from "node:child_process";

const errors=[],matrix=[],seen=new Set(),families=new Set();let prior=0,added=0,cumulative=0,mutants=0,detected=0;
for(const topic of SOCIAL_TOPICS)for(const subtopic of topic.subtopics){
 const facts=socialFacts(subtopic);
 for(const mode of SOCIAL_MODES)for(const level of SOCIAL_LEVELS){
  const cell=[topic.name,subtopic,mode,level].join("/");
  const old=socialM2Pool(topic.name,subtopic,level,mode);
  const fresh=socialM3NewPool(topic.name,subtopic,level,mode);
  const all=socialM3Pool(topic.name,subtopic,level,mode);
  const before=errors.length;prior+=old.length;added+=fresh.length;cumulative+=all.length;
  if(fresh.length!==SOCIAL_M3_NEW_PER_LEVEL[level]||all.length!==SOCIAL_M3_LEVEL_COUNT[level])errors.push(cell+": cuota inesperada");
  for(let i=0;i<old.length;i++)if(JSON.stringify(all[i])!==JSON.stringify(old[i]))errors.push(cell+": alteración retroactiva "+old[i].id);
  const oldStems=new Set(old.map(scienceStimulusFingerprint));
  for(const x of fresh){
   if(!x.id.startsWith("social-m3-")||!x.prompt.includes(x.oracle.scenario)||!x.explanation.includes(x.oracle.property))
    errors.push(cell+": evidencia o procedencia incorrecta "+x.id);
   if(oldStems.has(scienceStimulusFingerprint(x)))errors.push(cell+": estímulo idéntico heredado "+x.id);
   if(x.reviewStatus!=="editorial-draft")errors.push(cell+": revisión académica declarada sin prueba");
  }
  for(const error of verifyScienceCell(all,level,mode,facts))errors.push(cell+": "+error);
  for(const item of all){
   if(seen.has(item.id))errors.push(cell+": ID duplicado global "+item.id);
   seen.add(item.id);families.add(item.family);
  }
  const x=fresh[0];const mutations=[
   {...x,expected:"clave inválida"},
   {...x,oracle:{...x.oracle,scenario:"observación falsificada"}},
   {...x,options:[x.expected,x.expected,"x","y"]},
   {...x,cognitiveStage:level==="principiante"?3:1},
   {...x,steps:[{...x.steps[0],answerIndex:8},x.steps[1]]}
  ];
  for(const m of mutations){mutants++;if(verifyScienceItem(m,level,mode,facts).length)detected++;}
  const first=selectRotation(all,emptyRotation(),10,()=>0.31);
  let history=emptyRotation();for(const item of first)history=recordRotation(history,item.id,true);
  const second=selectRotation(all,history,10,()=>0.57);
  if(first.length!==10||second.length!==10||new Set(first.map(x=>x.id)).size!==10||
    new Set(second.map(x=>x.id)).size!==10||second.some(x=>first.some(y=>x.id===y.id)))
   errors.push(cell+": fallo de diez rondas o repetición");
  matrix.push({topic:topic.name,subtopic,mode,level,prior:old.length,added:fresh.length,cumulative:all.length,issues:errors.length-before,academic:"PENDIENTE_DOCENTE"});
 }
}
if(SOCIAL_SUBTOPICS.length!==20||matrix.length!==180||prior!==6000||added!==SOCIAL_M3_NEW_TOTAL||
 cumulative!==SOCIAL_M3_TOTAL||seen.size!==9000||mutants!==900||detected!==900)
 errors.push("totales o mutaciones fuera de objetivo "+JSON.stringify({cells:matrix.length,prior,added,cumulative,ids:seen.size,mutants,detected}));
const result={module:"sociales-M3",status:errors.length?"FAIL":"PASS",sha:execFileSync("git",["rev-parse","HEAD"],{encoding:"utf8"}).trim(),
 scope:{topics:SOCIAL_TOPICS.length,subtopics:SOCIAL_SUBTOPICS.length,cells:matrix.length,prior,added,cumulative,unique_ids:seen.size,families:families.size,targets:SOCIAL_M3_LEVEL_COUNT,increments:SOCIAL_M3_NEW_PER_LEVEL},
 mutations:{tested:mutants,detected,surviving:mutants-detected},
 evidence:{curriculum:"GUIA-PRE-U-UNAH-2026:p10; categorías ampliadas identificadas como complementarias",structural_audit:"automated",academic:"PENDIENTE_AUTORIZADA",semantic_independence:"NO_CERTIFICADA",visual_browser:"NO_EJECUTADA"},
 matrix,errors};
console.log(JSON.stringify(result,null,2));if(errors.length){console.error("SOCIALES M3 AUDIT FAILURE",JSON.stringify({total:errors.length,samples:errors.slice(0,18)}));process.exitCode=1;}
