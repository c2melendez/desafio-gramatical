import type {Level,Mode} from "./grammar";
import {scienceFacts,type ScienceItem,type ScienceFact} from "./science-m1";

const norm=(s:string)=>String(s??"").normalize("NFKC").toLocaleLowerCase("es").replace(/\s+/g," ").trim();
export const scienceStimulusFingerprint=(x:ScienceItem)=>norm(x.prompt).replace(/caso [0-9]+\./gi,"").trim()+"|"+norm(x.concept);
export function verifyScienceItem(item:ScienceItem,level:Level,mode:Mode,sourceFacts:readonly ScienceFact[]):string[]{
 const issues:string[]=[];
 if(!item||!item.id?.trim())return ["ID ausente"];
 if(item.level!==level||item.mode!==mode)issues.push("Celda incorrecta");
 if(item.prompt.trim().length<45||!item.explanation?.includes(item.oracle.property)||!item.formula?.includes(item.oracle.property))
  issues.push("Explicación o enunciado incompleto");
 if(item.expected!==item.oracle.property||item.concept!==item.oracle.concept)issues.push("Respuesta distinta al oráculo");
 if(!sourceFacts.some(f=>f.concept===item.oracle.concept&&f.property===item.oracle.property&&f.scenario===item.oracle.scenario))
  issues.push("Afirmación sin anclaje en hechos curados");
 if(!Array.isArray(item.options)||item.options.length!==4||new Set(item.options.map(norm)).size!==4||
  item.options[item.answerIndex]!==item.expected)issues.push("Distractores o clave de selección inválida");
 if(!Array.isArray(item.assertions)||item.assertions.length!==3||
  item.assertions.filter(a=>a.truth).length!==1||
  new Set(item.assertions.map(a=>norm(a.text))).size!==3||
  !item.assertions.some(a=>a.truth&&a.text.includes(item.oracle.property))||
  item.assertions.some(a=>!a.truth&&a.text.includes(item.oracle.property)))
   issues.push("Clasificación ambigua o sin clave");
 if(!Array.isArray(item.steps)||item.steps.length!==2||
  item.steps.some(st=>st.choices.length!==4||new Set(st.choices.map(norm)).size!==4||
   st.answerIndex<0||st.answerIndex>=4||!Number.isInteger(st.answerIndex))||
  item.steps[0]?.choices[item.steps[0].answerIndex]!==item.concept||
  item.steps[1]?.choices[item.steps[1].answerIndex]!==item.expected)
   issues.push("Construcción incorrecta");
 const stage=({principiante:1,intermedio:2,avanzado:3} as const)[level];
 if(item.cognitiveStage!==stage||!item.operation||!item.requiredEvidence?.length||
  item.requiredEvidence.length<stage+1)issues.push("Metadatos cognitivos insuficientes");
 if(!item.family||!item.source||item.reviewStatus!=="editorial-draft")issues.push("Trazabilidad incompleta");
 return issues;
}
export function verifyScienceCell(bank:ScienceItem[],level:Level,mode:Mode,facts:readonly ScienceFact[]){
 const errors:string[]=[],ids=new Set<string>(),stems=new Set<string>();
 for(const item of bank){
  if(ids.has(item.id))errors.push("ID duplicado: "+item.id);
  ids.add(item.id);
  const fp=scienceStimulusFingerprint(item);
  if(stems.has(fp))errors.push("Estímulo duplicado: "+item.id);
  stems.add(fp);
  for(const bad of verifyScienceItem(item,level,mode,facts))errors.push(item.id+": "+bad);
 }
 return errors;
}
