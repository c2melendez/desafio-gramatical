import type {Level} from "./grammar";
import type {MathModel} from "./math-m1";
import {expectedOperationClassificationTruthCount} from "./math-operations-classification";

const fmt=(x:{n:number;d:number})=>x.d===1?String(x.n):x.n+"/"+x.d;
/** Validación estructural pura, además del oráculo numérico independiente del auditor M3. */
export function verifyMathM3Record(item:MathModel,level:Level):string[]{
 const issues:string[]=[];
 if(!item?.id?.trim())issues.push("id-ausente");
 if(item?.level!==level)issues.push("nivel-incorrecto");
 if(!item?.prompt?.trim()||!item.explanation?.trim()||!item.formula?.trim())issues.push("contenido-ausente");
 if(!item?.oracle||item.expected!==fmt(item.oracle.answer))issues.push("clave-distinta-oraculo");
 if(!item.options||item.options.length!==4||new Set(item.options).size!==4||
   item.options[item.answerIndex]!==item.expected)issues.push("seleccion-invalida");
 if(!item.assertions||item.assertions.length!==3||item.assertions.filter(x=>x.truth).length!==expectedOperationClassificationTruthCount(item)||
   new Set(item.assertions.map(x=>x.text)).size!==3)issues.push("clasificacion-invalida");
 if(!item.steps||item.steps.length!==2||item.steps.some(x=>x.choices.length!==4||
   new Set(x.choices).size!==4||!Number.isInteger(x.answerIndex)||x.answerIndex<0||x.answerIndex>=4))
  issues.push("construccion-invalida");
 if(!item.visual&&item.visualRequirement==="essential"||item.visual&&item.visualRequirement!=="essential")
  issues.push("integracion-visual-invalida");
 if(!item.cognitiveStage||item.cognitiveStage!==({principiante:1,intermedio:2,avanzado:3} as const)[level]||
   !item.operation||!item.requiredEvidence?.length)issues.push("evidencia-cognitiva-invalida");
 return issues;
}
export function verifyMathM3Cell(items:MathModel[],level:Level):string[]{
 const ids=new Set<string>(),problems:string[]=[];
 for(const item of items){
  if(ids.has(item.id))problems.push("id-duplicado");
  ids.add(item.id);
  for(const issue of verifyMathM3Record(item,level))problems.push(item.id+":"+issue);
 }
 return problems;
}
