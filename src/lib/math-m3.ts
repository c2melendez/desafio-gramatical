import type {Level,Mode} from "./grammar";
import {MATH_LEVELS,MATH_MODES,MATH_SUBTOPICS,MATH_LEVEL_COUNT,MATH_TOPICS,mathModel,type MathModel} from "./math-m1";
import {mathM2Pool,MATH_M2_LEVEL_COUNT} from "./math-m2";
import {repairRationalOperation} from "./math-operations-rational";
import {repairOperationDiversityR10} from "./math-operations-diversity-r10";
import {repairOperationDiversity,repairOperationDiversityR9} from "./math-operations-diversity";
import {repairOperationAdvancedR14} from "./math-operations-advanced-r14";
import {repairOperationTransferR15} from "./math-operations-decision-r15";
import {repairOperationClassificationR16} from "./math-operations-classification-r16";
import {repairOperationTransferR13} from "./math-operations-contrast-r13";
import {repairOperationTransferR12} from "./math-operations-transfer-r12";
import {repairOperationMixedR11} from "./math-operations-mixed-r11";
import {repairOperationDistractors} from "./math-operations-distractors";
import {repairOperationClassification,isOperationClassificationR5,isOperationClassificationR6} from "./math-operations-classification";

/** Capa M3: solo agrega IDs nuevos al banco M2; no migra ni modifica el progreso anterior. */
export const MATH_M3_LEVEL_COUNT:Record<Level,number>={principiante:30,intermedio:50,avanzado:70};
export const MATH_M3_NEW_PER_LEVEL:Record<Level,number>={principiante:10,intermedio:15,avanzado:25};
const slug=(s:string)=>s.normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"");
export const mathStimulusSignature=(x:MathModel)=>x.prompt.normalize("NFKC").toLocaleLowerCase("es")
 .replace(/\(ejercicio \d+\)\.?/gi,"").replace(/\s+/g," ").trim()+"|"+(x.visual?JSON.stringify(x.visual):"");

export function mathM3NewPool(topic:string,subtopic:string,level:Level,mode:Mode):MathModel[]{
 if(!MATH_TOPICS.some(t=>t.name===topic&&t.subtopics.includes(subtopic))||!MATH_LEVELS.includes(level)||!MATH_MODES.includes(mode))
  throw Error("Celda Matemáticas M3 fuera de catálogo");
 const prior=mathM2Pool(topic,subtopic,level,mode);
 if(prior.length!==MATH_M2_LEVEL_COUNT[level])throw Error("M2 incompleto; M3 no puede reutilizar IDs");
 const seen=new Set(prior.map(mathStimulusSignature));
 const fresh:MathModel[]=[];
 const ti=MATH_SUBTOPICS.indexOf(subtopic),li=MATH_LEVELS.indexOf(level),mi=MATH_MODES.indexOf(mode);
 let seed=600001+ti*50011+li*19001+mi*30011;
 for(let i=0;i<MATH_M3_NEW_PER_LEVEL[level];i++){
  let chosen:MathModel|undefined;
  for(let tries=0;tries<2500;tries++){
   const candidate=mathModel(topic,subtopic,level,mode,i%MATH_LEVEL_COUNT[level],seed);
   seed+=131;
   const key=mathStimulusSignature(candidate);
   if(seen.has(key))continue;
   seen.add(key);chosen=candidate;break;
  }
  if(!chosen)throw Error("Variedad insuficiente M3: "+[topic,subtopic,mode,level].join("/"));
  const slot=i-(MATH_M3_NEW_PER_LEVEL[level]-3);
  // Corrective substitution only for the last three M3 variants per middle/advanced cell. Preserve IDs and quotas; old achievements are not evidence for revised content.
  if(subtopic==="Operaciones"&&level!=="principiante"&&slot>=0)chosen=repairRationalOperation(chosen,slot,mi);
  fresh.push({...chosen,id:"math-m3-"+[topic,subtopic,mode,level,i].map(x=>slug(String(x))).join("-"),
   family:"math-m3-"+slug(subtopic)+"-"+(chosen.operation??"original"),reviewStatus:"editorial-draft"});
 }
 return fresh;
}
/** R3 reproducible baseline for frozen evidence; never use for new student sessions. */
export function mathM3HistoricalPool(topic:string,subtopic:string,level:Level,mode:Mode):MathModel[]{
 return [...mathM2Pool(topic,subtopic,level,mode),...mathM3NewPool(topic,subtopic,level,mode)];
}
export function mathM3R4Pool(topic:string,subtopic:string,level:Level,mode:Mode):MathModel[]{
 return mathM3HistoricalPool(topic,subtopic,level,mode).map(repairOperationDistractors);
}
export function mathM3R5Pool(topic:string,subtopic:string,level:Level,mode:Mode):MathModel[]{
 return mathM3R4Pool(topic,subtopic,level,mode).map(x=>isOperationClassificationR5(x)?repairOperationClassification(x):x);
}
export function mathM3R6Pool(topic:string,subtopic:string,level:Level,mode:Mode):MathModel[]{
 return mathM3R5Pool(topic,subtopic,level,mode).map(x=>isOperationClassificationR6(x)?repairOperationClassification(x):x);
}
export function mathM3R8Pool(topic:string,subtopic:string,level:Level,mode:Mode):MathModel[]{
 return mathM3R6Pool(topic,subtopic,level,mode).map(repairOperationDiversity);
}
export function mathM3R9Pool(topic:string,subtopic:string,level:Level,mode:Mode):MathModel[]{
 return mathM3R8Pool(topic,subtopic,level,mode).map(repairOperationDiversityR9);
}
export function mathM3R10Pool(topic:string,subtopic:string,level:Level,mode:Mode):MathModel[]{
 return mathM3R9Pool(topic,subtopic,level,mode).map(repairOperationDiversityR10);
}
export function mathM3R11Pool(topic:string,subtopic:string,level:Level,mode:Mode):MathModel[]{
 return mathM3R10Pool(topic,subtopic,level,mode).map(repairOperationMixedR11);
}
export function mathM3R12Pool(topic:string,subtopic:string,level:Level,mode:Mode):MathModel[]{
 return mathM3R11Pool(topic,subtopic,level,mode).map(repairOperationTransferR12);
}
export function mathM3R13Pool(topic:string,subtopic:string,level:Level,mode:Mode):MathModel[]{
 return mathM3R12Pool(topic,subtopic,level,mode).map(repairOperationTransferR13);
}
export function mathM3R14Pool(topic:string,subtopic:string,level:Level,mode:Mode):MathModel[]{
 return mathM3R13Pool(topic,subtopic,level,mode).map(repairOperationAdvancedR14);
}
export function mathM3R15Pool(topic:string,subtopic:string,level:Level,mode:Mode):MathModel[]{
 return mathM3R14Pool(topic,subtopic,level,mode).map(repairOperationTransferR15);
}
export function mathM3Pool(topic:string,subtopic:string,level:Level,mode:Mode):MathModel[]{
 return mathM3R15Pool(topic,subtopic,level,mode).map(repairOperationClassificationR16);
}
export const MATH_M3_NEW_TOTAL=MATH_SUBTOPICS.length*MATH_MODES.length*(10+15+25);
export const MATH_M3_TOTAL=MATH_SUBTOPICS.length*MATH_MODES.length*(30+50+70);
