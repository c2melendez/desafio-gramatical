import {createHash} from "node:crypto";
import {readFileSync} from "node:fs";
import {execFileSync} from "node:child_process";
import {performance} from "node:perf_hooks";
import {SOCIAL_TOPICS,SOCIAL_SUBTOPICS,SOCIAL_LEVELS,SOCIAL_MODES,socialPool,socialFacts} from "../src/lib/social-m1.ts";
import {socialM2Pool} from "../src/lib/social-m2.ts";
import {SOCIAL_M3_LEVEL_COUNT,socialM3Pool,SOCIAL_M3_NEW_TOTAL} from "../src/lib/social-m3.ts";
import {verifyScienceItem,verifyScienceCell} from "../src/lib/science-m1-verifier.ts";
import {countContent,coverageRows} from "../src/lib/coverage.ts";
import {availableModule} from "../src/lib/phuma-catalog.ts";
import {validateSocialSearch,DEFAULT_SOCIAL_SUBTOPIC} from "../src/lib/social-route.ts";
import {learningDescription,studyReturn} from "../src/lib/study-context.ts";
import {emptyRotation,recordRotation,parseRotation,rotationKey,selectRotation} from "../src/lib/rotation.ts";
import {inventoryItems} from "./inventory-items.mjs";

const began=performance.now(),issues=[],matrix=[],items=[],ids=new Set(),families=new Map(),anchorKeys=new Set(),fullHashes=[];
const sha256=(v)=>createHash("sha256").update(typeof v==="string"?v:JSON.stringify(v)).digest("hex");
const baselineSha="db347499687a68b4ec405cdf34ad88d15588a915";
const catalogHash=sha256(readFileSync("src/lib/phuma-catalog.ts"));
const curriculum={source:"GUIA-PRE-U-UNAH-2026(9).pdf",page:11,printed_page:10,
 topics:["Historia de Honduras","Historia universal","Geografía","Civismo","Ciencias sociales"],
 complements:["Historia contemporánea","Geografía humana","Geografía física","Estratificación social","Origen humano"],
 independent_semantic_count:"NO_VERIFICADO"};
const countByLevel={principiante:0,intermedio:0,avanzado:0},newByLevel={principiante:0,intermedio:0,avanzado:0};
let mutants=0,detected=0;
const mutate=(a,bad,level,mode,facts,label)=>{
 mutants++;
 const killed=verifyScienceItem(bad,level,mode,facts).length>0;
 if(killed)detected++;else issues.push("Mutación superviviente "+a.id+" "+label);
};
for(const topic of SOCIAL_TOPICS)for(const subtopic of topic.subtopics){
 const facts=socialFacts(subtopic);
 if(facts.length!==5||new Set(facts.map(f=>f.concept)).size!==5||new Set(facts.map(f=>f.property)).size!==5)issues.push("Anclajes incorrectos "+subtopic);
 const description=learningDescription("sociales",topic.name,subtopic);
 if(description.length<65||description.includes("En «"+subtopic+"»"))issues.push("Descripción de aprendizaje no curada "+subtopic);
 for(const mode of SOCIAL_MODES)for(const level of SOCIAL_LEVELS){
  const cell=topic.name+"/"+subtopic+"/"+mode+"/"+level,start=issues.length;
  const old1=socialPool(topic.name,subtopic,level,mode),old2=socialM2Pool(topic.name,subtopic,level,mode),all=socialM3Pool(topic.name,subtopic,level,mode);
  const expected=SOCIAL_M3_LEVEL_COUNT[level],deficit=Math.max(0,expected-all.length);
  if(deficit||all.length!==expected||old1.length!==({principiante:10,intermedio:15,avanzado:20})[level]||old2.length!==({principiante:20,intermedio:35,avanzado:45})[level])
   issues.push(cell+": cuotas incorrectas");
  if(countContent("sociales",topic.name,subtopic,mode,level)!==all.length||!availableModule("sociales",topic.name,subtopic))
   issues.push(cell+": no integrado en selector");
  for(let i=0;i<old1.length;i++)if(JSON.stringify(all[i])!==JSON.stringify(old1[i]))issues.push(cell+": cambió M1");
  for(let i=0;i<old2.length;i++)if(JSON.stringify(all[i])!==JSON.stringify(old2[i]))issues.push(cell+": cambió M2");
  for(const error of verifyScienceCell(all,level,mode,facts))issues.push(cell+": "+error);
  const keys=[];
  for(const x of all){
   if(ids.has(x.id))issues.push(cell+": ID repetido "+x.id);
   ids.add(x.id);
   if(!x.prompt.includes(x.oracle.scenario)||!x.explanation.includes(x.oracle.property)||
      x.explanation.trim().length<80||!x.formula.includes(x.oracle.property))issues.push(cell+": fundamentación ausente "+x.id);
   if(!["GUIA-PRE-U-UNAH-2026:p10","catalogo-practica-complementaria"].includes(x.source))issues.push(cell+": procedencia inválida "+x.id);
   if(x.reviewStatus!=="editorial-draft")issues.push(cell+": revisión no justificada "+x.id);
   if(!x.assertions||!x.steps||x.options.length!==4)issues.push(cell+": mecanismo incompleto "+x.id);
   const h=sha256(x);keys.push(h);
   fullHashes.push({id:x.id,sha256:h,cell});
   const count=families.get(x.family)||0;families.set(x.family,count+1);
   anchorKeys.add([subtopic,x.oracle.concept,x.oracle.property,x.oracle.scenario].join("|"));
   items.push(x);
  }
  countByLevel[level]+=all.length;newByLevel[level]+=all.length-old2.length;
  // Actualiza diez rondas y reanuda desde IDs previos, sin perder ni reutilizar una ronda reciente.
  const rotationId=rotationKey("sociales",topic.name,subtopic,mode,level);
  if(rotationId===rotationKey("naturales",topic.name,subtopic,mode,level))issues.push(cell+": historial no aislado");
  let state=emptyRotation();const first=selectRotation(all,state,10,()=>0.27);
  for(const x of first)state=recordRotation(state,x.id,true);
  const restored=parseRotation(JSON.stringify(state),all.map(x=>x.id));
  const second=selectRotation(all,restored,10,()=>0.73);
  if(first.length!==10||second.length!==10||new Set(first.map(x=>x.id)).size!==10||
   new Set(second.map(x=>x.id)).size!==10||second.some(x=>first.some(y=>x.id===y.id)))
   issues.push(cell+": partidas 10/10, historial o persistencia");
  const x=all[0];
  mutate(x,{...x,id:""},level,mode,facts,"id vacio");
  mutate(x,{...x,expected:"respuesta falsa"},level,mode,facts,"clave falsa");
  mutate(x,{...x,oracle:{...x.oracle,scenario:"fuente no registrada"}},level,mode,facts,"fuente falsa");
  mutate(x,{...x,options:[x.expected,x.expected,"A","B"]},level,mode,facts,"alternativas duplicadas");
  mutate(x,{...x,assertions:x.assertions.map(a=>({...a,truth:true}))},level,mode,facts,"clasificacion falsa");
  mutate(x,{...x,steps:[{...x.steps[0],answerIndex:99},x.steps[1]]},level,mode,facts,"construccion no alcanzable");
  mutate(x,{...x,explanation:""},level,mode,facts,"explicacion ausente");
  mutate(x,{...x,level:level==="avanzado"?"principiante":"avanzado"},level,mode,facts,"nivel incorrecto");
  mutate(x,{...x,cognitiveStage:level==="principiante"?3:1},level,mode,facts,"etapa cognitiva falsa");
  mutate(x,{...x,reviewStatus:"approved"},level,mode,facts,"revision ficticia");
  matrix.push({topic:topic.name,subtopic,mode,level,expected,observed:all.length,deficit,
   m1:old1.length,m2_added:old2.length-old1.length,m3_added:all.length-old2.length,
   min_rounds:10,source:curriculum.complements.includes(subtopic)?"catalogo-complementario":"guia-tematica-orientativa",
   hash:sha256(keys.join("\n")),issues:issues.length-start});
 }
}
const summary={cells:matrix.length,topics:SOCIAL_TOPICS.length,subtopics:SOCIAL_SUBTOPICS.length,
 modes:SOCIAL_MODES.length,levels:SOCIAL_LEVELS.length,technical_records:items.length,ids_unique:ids.size,
 countByLevel,newByLevel,prior_m1_m2:6000,added_m3:SOCIAL_M3_NEW_TOTAL,
 families:families.size,max_family_size:Math.max(...families.values()),anchor_sets:anchorKeys.size,
 deficiencies:matrix.filter(m=>m.deficit>0).length,technical_record_hash:sha256(fullHashes.map(x=>x.sha256).join("\n"))};
if(matrix.length!==180||items.length!==9000||ids.size!==9000||summary.deficiencies!==0||
 countByLevel.principiante!==1800||countByLevel.intermedio!==3000||countByLevel.avanzado!==4200||
 newByLevel.principiante!==600||newByLevel.intermedio!==900||newByLevel.avanzado!==1500||
 anchorKeys.size!==100)issues.push("Totales globales fuera de especificación "+JSON.stringify(summary));
if(mutants!==1800||detected!==1800)issues.push("Falló el corte de mutaciones "+JSON.stringify({mutants,detected}));
const badParams=validateSocialSearch({subtema:"Célula",modo:"incorrecto",nivel:"x"});
if(badParams.subtema!==DEFAULT_SOCIAL_SUBTOPIC||badParams.modo!=="clasificar"||badParams.nivel!=="principiante")
 issues.push("Fallback de ruta Sociales incorrecto");
for(const x of SOCIAL_SUBTOPICS)if(validateSocialSearch({subtema:x,modo:"construir",nivel:"avanzado"}).subtema!==x)issues.push("Ruta subtema inválida: "+x);
if(studyReturn("Geografía","Husos horarios","quiz","avanzado","sociales").area!=="sociales")issues.push("Regreso no contextual");
const global=inventoryItems();
for(const group of global.shared_ids.filter(x=>x.where.some(p=>p.startsWith("sociales/"))))issues.push("Colisión interárea/celda "+group.id);
const socialRows=coverageRows().filter(x=>x.area==="sociales");
if(socialRows.length!==180||socialRows.some(x=>!x.complete||x.available!==SOCIAL_M3_LEVEL_COUNT[x.level]))issues.push("Conteo de rutas difiere del banco");
const result={schema_version:1,area:"sociales",module:"sociales-CORTE",status:issues.length?"FAIL":"PASS",
 baseline_sha:baselineSha,sha:execFileSync("git",["rev-parse","HEAD"],{encoding:"utf8"}).trim(),
 catalog_sha256:catalogHash,validator:"scripts/audit-social-cut.mjs",evaluation_scope:"100% del banco; revisión estructural automática, NO revisión docente",
 source:curriculum,summary,mutations:{executed:mutants,detected,survivors:mutants-detected,classes:10},
 timing:{elapsed_ms:Math.round(performance.now()-began),rss_mb:Math.round(process.memoryUsage().rss/1048576)},
 limitations:{academic:"PENDIENTE_AUTORIZADA",semantic_independence:"NO_VERIFICADA",reviewed_independent_items:null,
  psychometric_equivalence:"NO_VERIFICADA",visual_mobile_desktop:"NO_EJECUTADA",browser_a11y:"NO_EJECUTADA"},
 matrix,individual_hashes:fullHashes,issues};
console.log(JSON.stringify(result,null,2));
if(issues.length){console.error("SOCIALES CORTE AUDIT FAIL",JSON.stringify({n:issues.length,samples:issues.slice(0,20)}));process.exitCode=1;}
