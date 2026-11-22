import {execFileSync} from "node:child_process";
import {createHash} from "node:crypto";
import {performance} from "node:perf_hooks";
import {SOFT_TOPICS,SOFT_SUBTOPICS,SOFT_LEVELS,SOFT_MODES,SOFT_LEVEL_COUNT,softFacts,softPool} from "../src/lib/soft-m1.ts";
import {SOFT_M2_LEVEL_COUNT,SOFT_M2_NEW_PER_LEVEL,SOFT_M2_NEW_TOTAL,SOFT_M2_TOTAL,softM2Pool,softM2NewPool} from "../src/lib/soft-m2.ts";
import {SOFT_M3_LEVEL_COUNT,SOFT_M3_NEW_PER_LEVEL,SOFT_M3_NEW_TOTAL,SOFT_M3_TOTAL,softM3Pool,softM3NewPool} from "../src/lib/soft-m3.ts";
import {verifyScienceCell,verifyScienceItem,scienceStimulusFingerprint} from "../src/lib/science-m1-verifier.ts";
import {coverageRows,countContent} from "../src/lib/coverage.ts";
import {availableModule} from "../src/lib/phuma-catalog.ts";
import {emptyRotation,recordRotation,parseRotation,selectRotation,rotationKey} from "../src/lib/rotation.ts";
import {inventoryItems} from "./inventory-items.mjs";
const start=performance.now(),errors=[],matrix=[],globalIds=new Set(),familyCounts=new Map(),itemHashes=[];
const hash=s=>createHash("sha256").update(s).digest("hex");
let oldCount=0,newCount=0,totalCount=0,mutants=0,killed=0,sourceStatus={complementary:0,nonComplementary:0};
const levelTotals={principiante:0,intermedio:0,avanzado:0},addedTotals={principiante:0,intermedio:0,avanzado:0};
for(const topic of SOFT_TOPICS)for(const subtopic of topic.subtopics){
 const facts=softFacts(subtopic);
 if(facts.length!==5||new Set(facts.map(x=>x.concept)).size!==5||new Set(facts.map(x=>x.property)).size!==5)
  errors.push("Fuentes conductuales no distinguidas: "+subtopic);
 for(const mode of SOFT_MODES)for(const level of SOFT_LEVELS){
  const label=[topic.name,subtopic,mode,level].join("/");
  const issuesBefore=errors.length,old=softM2Pool(topic.name,subtopic,level,mode);
  const added=softM3NewPool(topic.name,subtopic,level,mode);
  const bank=softM3Pool(topic.name,subtopic,level,mode);
  oldCount+=old.length;newCount+=added.length;totalCount+=bank.length;
  levelTotals[level]+=bank.length;addedTotals[level]+=added.length;
  if(old.length!==SOFT_M2_LEVEL_COUNT[level]||added.length!==SOFT_M3_NEW_PER_LEVEL[level]||
   bank.length!==SOFT_M3_LEVEL_COUNT[level]||countContent("blandas",topic.name,subtopic,mode,level)!==SOFT_M3_LEVEL_COUNT[level]||
   !availableModule("blandas",topic.name,subtopic))errors.push(label+": cuota/menú incongruentes");
  for(let i=0;i<old.length;i++)if(JSON.stringify(old[i])!==JSON.stringify(bank[i]))errors.push(label+": alteración M1 "+old[i].id);
  for(const issue of verifyScienceCell(bank,level,mode,facts))errors.push(label+": "+issue);
  const existingStems=new Set(old.map(scienceStimulusFingerprint));
  for(const x of added)if(existingStems.has(scienceStimulusFingerprint(x)))
   errors.push(label+": duplicación textual heredada "+x.id);
  for(const x of bank){
   if(globalIds.has(x.id))errors.push(label+": colisión global "+x.id);
   globalIds.add(x.id);
   if(!x.prompt.includes(x.oracle.scenario)||!x.explanation.includes(x.oracle.property)||
    !x.formula.includes(x.oracle.property))errors.push(label+": fundamento sin evidencia "+x.id);
   if(x.reviewStatus!=="editorial-draft"||x.source!=="catalogo-practica-complementaria")
    errors.push(label+": fuente oficial o revisión no acreditada "+x.id);
   sourceStatus.complementary++;
   const familySize=familyCounts.get(x.family)||0;familyCounts.set(x.family,familySize+1);
   itemHashes.push({id:x.id,sha256:hash(JSON.stringify(x)),cell:label});
  }
  const first=selectRotation(bank,emptyRotation(),10,()=>0.31);
  let history=emptyRotation();for(const x of first)history=recordRotation(history,x.id,true);
  const second=selectRotation(bank,parseRotation(JSON.stringify(history),bank.map(x=>x.id)),10,()=>0.63);
  if(first.length!==10||second.length!==10||new Set(first.map(x=>x.id)).size!==10||
   new Set(second.map(x=>x.id)).size!==10||second.some(x=>first.some(y=>x.id===y.id))||
   rotationKey("blandas",topic.name,subtopic,mode,level)===rotationKey("sociales",topic.name,subtopic,mode,level))
   errors.push(label+": dos sesiones de diez rondas, no repetición o historial aislado");
  const x=added[0],changes=[
   ["id vacio",{...x,id:""}],
   ["clave falsa",{...x,expected:"respuesta falsa"}],
   ["oraculo falso",{...x,oracle:{...x.oracle,scenario:"conducta sin evidencia"}}],
   ["alternativas duplicadas",{...x,options:[x.expected,x.expected,"A","B"]}],
   ["clasificacion falsa",{...x,assertions:x.assertions.map(a=>({...a,truth:true}))}],
   ["construccion imposible",{...x,steps:[{...x.steps[0],answerIndex:99},x.steps[1]]}],
   ["explicacion eliminada",{...x,explanation:""}],
   ["capa cognitiva errada",{...x,cognitiveStage:level==="principiante"?3:1}],
   ["celda errada",{...x,mode:mode==="quiz"?"clasificar":"quiz"}],
   ["revision falsa",{...x,reviewStatus:"approved"}],
  ];
  for(const [kind,bad] of changes){
   mutants++;const detected=verifyScienceItem(bad,level,mode,facts).length>0;
   if(detected)killed++;else errors.push(label+": mutante superviviente "+kind);
  }
  matrix.push({topic:topic.name,subtopic,mode,level,previous:old.length,added:added.length,observed:bank.length,
   expected:SOFT_M3_LEVEL_COUNT[level],deficit:Math.max(0,SOFT_M3_LEVEL_COUNT[level]-bank.length),
   issue_count:errors.length-issuesBefore,source:"catalogo-practica-complementaria",academic:"PENDIENTE_AUTORIZADA"});
 }
}
const inventory=inventoryItems();if(inventory.summary.declared!==40500||inventory.summary.observed!==40500||
 inventory.summary.failed_cells!==0||inventory.summary.ids_reused_between_cells!==0)
 errors.push("Regresión de inventario global "+JSON.stringify(inventory.summary));
const coverage=coverageRows().filter(x=>x.area==="blandas");
if(coverage.length!==72||coverage.some(x=>!x.stageOneComplete||!x.complete||
 x.available!==SOFT_M3_LEVEL_COUNT[x.level]))errors.push("Cobertura Blandas inadecuada");
if(SOFT_TOPICS.length!==3||SOFT_SUBTOPICS.length!==8||matrix.length!==72||oldCount!==SOFT_M2_TOTAL||
 newCount!==SOFT_M3_NEW_TOTAL||totalCount!==SOFT_M3_TOTAL||globalIds.size!==3600||
 levelTotals.principiante!==720||levelTotals.intermedio!==1200||levelTotals.avanzado!==1680||
 addedTotals.principiante!==240||addedTotals.intermedio!==360||addedTotals.avanzado!==600||
 mutants!==720||killed!==720)errors.push("Totales globales y control de mutación incorrectos");
const report={
 schema_version:1,module:"blandas-M3",status:errors.length?"FAIL":"PASS",
 sha:execFileSync("git",["rev-parse","HEAD"],{encoding:"utf8"}).trim(),
 baseline_sha:"202ab1b73b155c7fd55bef86058b208e079684d3",
 scope:{topics:3,subtopics:8,cells:72,prior:oldCount,added:newCount,cumulative:totalCount,
  unique_ids:globalIds.size,per_level:levelTotals,added_per_level:addedTotals,
  families:familyCounts.size,max_family_size:Math.max(...familyCounts.values()),
  global_technical_records:inventory.summary.observed,
  sha256_corpus:hash(itemHashes.map(x=>x.sha256).join("\n"))},
 mutations:{tested:mutants,detected:killed,surviving:mutants-killed,classes:10},
 methodology:{audit:"structural N1",real_session_rotation:"N1",independent_human_review:"NOT_DONE",
  semantic_independence:"NOT_CERTIFIED",visual_mobile_desktop:"NOT_DONE",source:"complementary, not official PHUMA area"},
 duration_ms:Math.round(performance.now()-start),matrix,record_hashes:itemHashes,errors};
console.log(JSON.stringify(report,null,2));if(errors.length){console.error("BLANDAS M3 FAIL",JSON.stringify({n:errors.length,first:errors.slice(0,15)}));process.exitCode=1;}
