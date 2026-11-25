import type {MathModel} from "./math-m1";

type ErrorChoice = [number,string];
function choices(correct:number, errors:ErrorChoice[], seed:number){
 const unique=new Map<number,string>();
 for(const [value,reason] of errors)if(value!==correct&&!unique.has(value))unique.set(value,reason);
 if(unique.size<3)throw Error("Operaciones: distractores conceptuales insuficientes");
 const selected=[...unique].slice(0,3);
 const values=[String(correct),...selected.map(([value])=>String(value))];
 const shift=seed%4;
 const ordered=[...values.slice(shift),...values.slice(0,shift)];
 return {choices:ordered,answerIndex:ordered.indexOf(String(correct)),reasons:Object.fromEntries(selected.map(([v,r])=>[String(v),r]))};
}

export function operationStepErrors(item:MathModel):ErrorChoice[]{
 if(item.oracle.kind!=="Operaciones"||item.subtopic!=="Operaciones")return [];
 const [u,v]=item.oracle.inputs,advanced=item.level==="avanzado";
 const match=item.prompt.match(/\((\d+)\+(\d+)\)×(\d+)/);
 if(!match)return [];
 const a=Number(match[1]),b=Number(match[2]);
 return advanced?[
  [-b,"Cancelar el primer producto no invierte el signo del segundo."],
  [a+b,"Se conservaron ambos sumandos aunque el primero debe cancelarse."],
  [0,"Se cancelaron ambos sumandos sin justificación."],
  [a,"Se retuvo el sumando que debía cancelarse."]
 ]:[
  [u-v,"Se restaron los sumandos en vez de sumarlos."],
  [u*v,"Se multiplicaron los sumandos dentro del paréntesis."],
  [u,"Se omitió el segundo sumando."],
  [v,"Se omitió el primer sumando."]
 ];

}
export function operationStepReason(item:MathModel,chosen:string):string|undefined{
 if(chosen===String(item.oracle.intermediate.n))return undefined;
 return operationStepErrors(item).find(([n])=>String(n)===chosen)?.[1];
}

/** P2 corrective overlay: preserve original stimulus, ID, seed, oracle and claims.
 * Only the quiz and construction modalities consume numeric alternatives.
 * OP-04 already has misconception-driven final alternatives and is out of scope. */
export function repairOperationDistractors(item:MathModel):MathModel{
 if(item.subtopic!=="Operaciones"||item.oracle.kind!=="Operaciones"||item.mode==="clasificar")return item;
 const [u,v,w]=item.oracle.inputs;
 const advanced=item.level==="avanzado";
 const match=item.prompt.match(/\((\d+)\+(\d+)\)×(\d+)/);
 if(!match)throw Error("Operaciones: estímulo no reconocido");
 const a=Number(match[1]),b=Number(match[2]),c=Number(match[3]);
 const result=Number(item.expected),intermediate=item.oracle.intermediate.n;
 const finalErrors:ErrorChoice[]=advanced?[
  [-v*w,"Cambiar el signo del producto restante no es una cancelación válida."],
  [0,"Se canceló también el segundo producto, aunque no tiene un término opuesto."],
  [(a+b)*c,"Se calculó el primer producto, pero se omitió restar el producto repetido."],
  [a*c,"Se conservó el producto que debía cancelarse."]
 ]:[
  [u*w+v,"Se multiplicó únicamente el primer sumando; la distributiva exige multiplicar ambos."],
  [u+v+w,"Se sumó el factor en lugar de multiplicar por él."],
  [u*w,"Se omitió el segundo sumando."],
  [v*w,"Se omitió el primer sumando."],
  [(u-v)*w,"Se sustituyó la suma del paréntesis por una resta."],
  ...(item.level==="intermedio"?[[ (a+b)*c,"Se mantuvieron ambos operandos originales sin aplicar los cambios."]] as ErrorChoice[]:[])
 ];
 const stepErrors=operationStepErrors(item);
 const final=choices(result,finalErrors,item.seed),step=choices(intermediate,stepErrors,item.seed+1);
 return {...item,options:final.choices,answerIndex:final.answerIndex,optionExplanations:final.reasons,
  steps:[{...item.steps[0],choices:step.choices,answerIndex:step.answerIndex},{...item.steps[1],choices:final.choices,answerIndex:final.answerIndex}]};
}
