import {createHash} from "node:crypto";
import {readFileSync} from "node:fs";
import {execFileSync} from "node:child_process";
import {performance} from "node:perf_hooks";
import {SOFT_TOPICS,SOFT_SUBTOPICS,SOFT_MODES,SOFT_LEVELS,softPool,softFacts} from "../src/lib/soft-m1.ts";
import {softM2Pool} from "../src/lib/soft-m2.ts";
import {SOFT_M3_LEVEL_COUNT,SOFT_M3_NEW_TOTAL,softM3Pool} from "../src/lib/soft-m3.ts";
import {verifyScienceCell,verifyScienceItem,scienceStimulusFingerprint} from "../src/lib/science-m1-verifier.ts";
import {countContent,coverageRows} from "../src/lib/coverage.ts";
import {AREAS,availableModule} from "../src/lib/phuma-catalog.ts";
import {DEFAULT_SOFT_SUBTOPIC,validateSoftSearch} from "../src/lib/soft-route.ts";
import {learningDescription,studyReturn} from "../src/lib/study-context.ts";
import {emptyRotation,recordRotation,parseRotation,rotationKey,selectRotation} from "../src/lib/rotation.ts";
import {inventoryItems} from "./inventory-items.mjs";

const began=performance.now(),issues=[],matrix=[],ids=new Set(),families=new Map(),anchors=new Set(),individualHashes=[];
const sha256=x=>createHash("sha256").update(typeof x==="string"?x:JSON.stringify(x)).digest("hex");
const clean=x=>String(x).normalize("NFKC").toLocaleLowerCase("es").replace(/\s+/g," ").trim();
const catalogHash=sha256(readFileSync("src/lib/phuma-catalog.ts"));
const byLevel={principiante:0,intermedio:0,avanzado:0},newByLevel={principiante:0,intermedio:0,avanzado:0};
const changeTypes=["id vacío","clave falsa","oráculo falsificado","opciones duplicadas","clasificación falsa",
 "construcción inalcanzable","explicación ausente","nivel alterado","etapa cognitiva falsa","revisión ficticia"];
const mutationRecords=[];let detected=0;
for(const topic of SOFT_TOPICS)for(const subtopic of topic.subtopics){
 const facts=softFacts(subtopic);
 if(facts.length!==5||new Set(facts.map(x=>x.concept)).size!==5||new Set(facts.map(x=>x.property)).size!==5)
  issues.push("Anclajes conductuales ausentes o repetidos "+subtopic);
 const desc=learningDescription("blandas",topic.name,subtopic);
 if(desc.length<60||desc.includes("En «"+subtopic+"»"))issues.push("Descripción de aprendizaje insuficiente "+subtopic);
 for(const mode of SOFT_MODES)for(const level of SOFT_LEVELS){
  const cell=[topic.name,subtopic,mode,level].join("/"),start=issues.length;
  const m1=softPool(topic.name,subtopic,level,mode),m2=softM2Pool(topic.name,subtopic,level,mode),bank=softM3Pool(topic.name,subtopic,level,mode);
  const expected=SOFT_M3_LEVEL_COUNT[level],deficit=Math.max(0,expected-bank.length);
  if(m1.length!==({principiante:10,intermedio:15,avanzado:20})[level]||
    m2.length!==({principiante:20,intermedio:35,avanzado:45})[level]||
    bank.length!==expected||deficit)issues.push(cell+": cuota acumulada inadecuada");
  if(countContent("blandas",topic.name,subtopic,mode,level)!==bank.length||!availableModule("blandas",topic.name,subtopic))
   issues.push(cell+": banco no accesible desde selector");
  for(let i=0;i<m1.length;i++)if(JSON.stringify(m1[i])!==JSON.stringify(bank[i]))issues.push(cell+": cambió M1 "+m1[i].id);
  for(let i=0;i<m2.length;i++)if(JSON.stringify(m2[i])!==JSON.stringify(bank[i]))issues.push(cell+": cambió M2 "+m2[i].id);
  const checker=verifyScienceCell(bank,level,mode,facts);
  for(const error of checker)issues.push(cell+": "+error);
  const cellHashes=[];
  for(const x of bank){
   if(ids.has(x.id))issues.push(cell+": colisión global "+x.id);ids.add(x.id);
   if(x.topic!==topic.name||x.subtopic!==subtopic||x.mode!==mode||x.level!==level)
    issues.push(cell+": metadatos incoherentes "+x.id);
   if(x.source!=="catalogo-practica-complementaria"||x.reviewStatus!=="editorial-draft")
    issues.push(cell+": atribución oficial o revisión ficticia "+x.id);
   if(!x.prompt.includes(x.oracle.scenario)||!x.explanation.includes(x.oracle.property)||
    !x.formula.includes(x.oracle.property)||x.explanation.trim().length<80)
    issues.push(cell+": evidencia incompleta "+x.id);
   if(x.options.length!==4||x.assertions.length!==3||x.steps.length!==2)
    issues.push(cell+": mecánica incompleta "+x.id);
   const fp=scienceStimulusFingerprint(x); // identidades textuales, no independencia semántica
   const h=sha256(x);cellHashes.push(h);individualHashes.push({id:x.id,sha256:h,cell,fingerprint:sha256(clean(fp))});
   families.set(x.family,(families.get(x.family)||0)+1);
   anchors.add([subtopic,x.oracle.concept,x.oracle.property,x.oracle.scenario].join("|"));
  }
  byLevel[level]+=bank.length;newByLevel[level]+=bank.length-m2.length;
  const key=rotationKey("blandas",topic.name,subtopic,mode,level);
  if(key===rotationKey("sociales",topic.name,subtopic,mode,level))issues.push(cell+": historial mezcla áreas");
  const first=selectRotation(bank,emptyRotation(),10,()=>0.29),history=first.reduce((state,x)=>recordRotation(state,x.id,true),emptyRotation());
  const loaded=parseRotation(JSON.stringify(history),bank.map(x=>x.id)),second=selectRotation(bank,loaded,10,()=>0.71);
  if(first.length!==10||second.length!==10||new Set(first.map(x=>x.id)).size!==10||
    new Set(second.map(x=>x.id)).size!==10||second.some(x=>first.some(y=>x.id===y.id)))
    issues.push(cell+": rotación/historial 10 rondas inválidos");
  const x=bank[0],negatives=[
   {...x,id:""}, {...x,expected:"respuesta falsa"}, {...x,oracle:{...x.oracle,scenario:"evidencia inventada"}},
   {...x,options:[x.expected,x.expected,"A","B"]},
   {...x,assertions:x.assertions.map(y=>({...y,truth:true}))},
   {...x,steps:[{...x.steps[0],answerIndex:99},x.steps[1]]},
   {...x,explanation:""},
   {...x,level:level==="avanzado"?"principiante":"avanzado"},
   {...x,cognitiveStage:level==="principiante"?3:1}, {...x,reviewStatus:"approved"}
  ];
  for(let i=0;i<negatives.length;i++){
   const killed=verifyScienceItem(negatives[i],level,mode,facts).length>0;
   if(killed)detected++;else issues.push(cell+": superviviente "+changeTypes[i]);
   mutationRecords.push({cell,source_id:x.id,kind:changeTypes[i],detected:killed});
  }
  matrix.push({topic:topic.name,subtopic,mode,level,expected,observed:bank.length,deficit,
   m1:m1.length,m2_added:m2.length-m1.length,m3_added:bank.length-m2.length,
   technical_hash:sha256(cellHashes.join("\n")),issues:issues.length-start});
 }
}
const routes=validateSoftSearch({subtema:"Célula",modo:"otro",nivel:"desconocido"});
if(JSON.stringify(routes)!==JSON.stringify({subtema:DEFAULT_SOFT_SUBTOPIC,modo:"clasificar",nivel:"principiante"}))
 issues.push("Fallback en ruta Blandas inválido");
for(const t of SOFT_TOPICS)for(const sub of t.subtopics)
 for(const mode of SOFT_MODES)for(const level of SOFT_LEVELS){
  if(JSON.stringify(validateSoftSearch({subtema:sub,modo:mode,nivel:level}))!==JSON.stringify({subtema:sub,modo,nivel:level}))
   issues.push("Ruta inalcanzable "+sub+"/"+mode+"/"+level);
  if(studyReturn(t.name,sub,mode,level,"blandas").subtema!==sub)issues.push("Retorno no contextual "+sub);
 }
const inventory=inventoryItems(),rows=coverageRows().filter(x=>x.area==="blandas");
if(inventory.summary.cells!==810||inventory.summary.observed!==40500||inventory.summary.declared!==40500||
 inventory.summary.failed_cells!==0||inventory.summary.ids_reused_between_cells!==0)
 issues.push("Inventario global incoherente "+JSON.stringify(inventory.summary));
if(rows.length!==72||rows.some(x=>!x.complete||x.available!==SOFT_M3_LEVEL_COUNT[x.level]))
 issues.push("Cobertura global de Blandas diferente al objetivo");
const summary={topics:SOFT_TOPICS.length,subtopics:SOFT_SUBTOPICS.length,modes:SOFT_MODES.length,
 levels:SOFT_LEVELS.length,cells:matrix.length,technical_records:individualHashes.length,
 unique_ids:ids.size,old_m1_m2:2400,new_m3:SOFT_M3_NEW_TOTAL,count_by_level:byLevel,
 new_by_level:newByLevel,anchor_sets:anchors.size,families:families.size,
 max_family_size:Math.max(...families.values()),deficient_cells:matrix.filter(x=>x.deficit>0).length,
 technical_record_hash:sha256(individualHashes.map(x=>x.sha256).join("\n"))};
if(summary.topics!==3||summary.subtopics!==8||summary.cells!==72||summary.technical_records!==3600||
 summary.unique_ids!==3600||summary.deficient_cells!==0||summary.anchor_sets!==40||
 byLevel.principiante!==720||byLevel.intermedio!==1200||byLevel.avanzado!==1680||
 newByLevel.principiante!==240||newByLevel.intermedio!==360||newByLevel.avanzado!==600)
 issues.push("Discrepancia en totales de área "+JSON.stringify(summary));
if(mutationRecords.length!==720||detected!==720)issues.push("Mutaciones negativas insuficientes "+detected);
const corpus={schema_version:1,area:"blandas",module:"blandas-CORTE",status:issues.length?"FAIL":"PASS",
 baseline_sha:"2a47febb7192cd9a1ca47b771625f714e8cef3d3",
 sha:execFileSync("git",["rev-parse","HEAD"],{encoding:"utf8"}).trim(),
 catalog_sha256:catalogHash,validator:"scripts/audit-soft-cut.mjs",
 source:{classification:"catalogo-practica-complementaria",official_examination:"NO_VERIFICADO_NO_ENUNCIADO_GUIA_PRE_U_2026"},
 summary,mutations:{executed:mutationRecords.length,detected,survivors:mutationRecords.length-detected,classes:changeTypes},
 inventory_global:{cells:inventory.summary.cells,technical_records:inventory.summary.observed,collisions:inventory.summary.ids_reused_between_cells},
 timing:{elapsed_ms:Math.round(performance.now()-began),rss_mb:Math.round(process.memoryUsage().rss/1048576)},
 limitations:{academic:"PENDIENTE_AUTORIZADA",semantic_independence:"NO_CERTIFICADA",psychometric:"NO_VERIFICADA",manual_visual:"NO_EJECUTADA",assistive_technology:"NO_EJECUTADA"},
 matrix,individual_hashes:individualHashes,mutation_records:mutationRecords,issues};
console.log(JSON.stringify(corpus,null,2));if(issues.length){console.error("BLANDAS CORTE FAIL",JSON.stringify({n:issues.length,examples:issues.slice(0,15)}));process.exitCode=1;}
