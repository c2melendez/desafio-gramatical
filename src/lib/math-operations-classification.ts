import type {MathModel} from "./math-m1";

// R5: M3 non-rational classification. R6 extends this to M1/M2 at the cumulative runtime boundary.
export function isOperationClassificationR5(item:MathModel):boolean{
 return item.subtopic==="Operaciones"&&item.mode==="clasificar"&&item.oracle.kind==="Operaciones"&&item.id.startsWith("math-m3-");
}
export function isOperationClassificationR6(item:MathModel):boolean{
 return item.subtopic==="Operaciones"&&item.mode==="clasificar"&&item.oracle.kind==="Operaciones"&&/^math-m[12]-/.test(item.id);
}
const masks=[[true,true,false],[false,true,false],[true,false,true],[false,false,true],[true,false,false],[false,true,true]];
function maskFor(item:MathModel){
 const index=Number(item.id.split("-").at(-1));
 if(!Number.isInteger(index)||index<0)throw Error("R5: invalid index");
 return masks[index%masks.length];
}
export function expectedOperationClassificationTruthCount(item:MathModel):number{
 if((item.oracle.kind==="Operaciones-diversidad"||item.oracle.kind==="Operaciones-mixtas")&&item.mode==="clasificar")return Number(item.id.split("-").at(-1))%2===0?2:1;
 return isOperationClassificationR5(item)||isOperationClassificationR6(item)?maskFor(item).filter(Boolean).length:1;
}
export function repairOperationClassification(item:MathModel):MathModel{
 if(!isOperationClassificationR5(item)&&!isOperationClassificationR6(item))return item;
 const [u,v,w]=item.oracle.inputs;
 const advanced=item.level==="avanzado";
 const result=(u+v)*w,step=u+v;
 const [finalTrue,stepTrue,equivalenceTrue]=maskFor(item);
 const label=advanced?"Después de distribuir y cancelar el producto repetido, el sumando restante es":item.level==="intermedio"?"Después de los cambios, la suma dentro del paréntesis es":"La suma dentro del paréntesis es";
 const claims=[
  {text:"El valor de la expresión solicitada es "+(finalTrue?result:advanced?-result:u*w)+".",truth:finalTrue},
  {text:label+" "+(stepTrue?step:advanced?-v:u-v)+".",truth:stepTrue},
  {text:"La expresión solicitada equivale a "+(advanced?(equivalenceTrue?v:-v)+"×"+w:u+"×"+w+"+"+v+"×"+(equivalenceTrue?w:0))+".",truth:equivalenceTrue}
 ];
 const shift=item.seed%3;
 return {...item,assertions:[...claims.slice(shift),...claims.slice(0,shift)]};
}

/** Feedback for the revised assertion schema; legacy and rational claims retain their own explanations. */
export function operationClassificationReason(item:MathModel,text:string):string|undefined{
 if(item.subtopic!=="Operaciones"||item.oracle.kind!=="Operaciones")return undefined;
 const [u,v,w]=item.oracle.inputs,answer=item.expected,step=item.oracle.intermediate.n;
 if(text.startsWith("El valor de la expresión solicitada es ")){
  const claimed=text.match(/(-?\d+)\.$/)?.[1];
  if(claimed===undefined)return undefined;
  const procedure=item.level==="avanzado"?`Al cancelar los productos iguales queda ${v}×${w}=${answer}.`:`Al respetar el paréntesis, (${u}+${v})×${w}=${answer}.`;
  return procedure+` El valor afirmado es ${claimed}; ${claimed===answer?"coincide":"no coincide"} con el valor correcto.`;
 }
 if(text.startsWith("La expresión solicitada equivale a ")){
  const m=text.match(/a (-?\d+)×(\d+)(?:\+(\d+)×(\d+))?\.$/);
  if(!m)return undefined;
  const value=Number(m[1])*Number(m[2])+(m[3]?Number(m[3])*Number(m[4]):0);
  return `La expresión propuesta vale ${value} y la solicitada vale ${answer}; ${String(value)===answer?"son equivalentes porque conservan":"no son equivalentes porque alteran"} el resultado. `+(item.level==="avanzado"?"Cancelar términos opuestos no cambia el signo del término restante.":"La distributiva exige multiplicar ambos sumandos por el factor común.");
 }
 if(text.startsWith("La suma dentro del paréntesis es ")||text.startsWith("Después de los cambios, la suma dentro del paréntesis es ")||text.startsWith("Después de distribuir y cancelar el producto repetido, el sumando restante es ")){
  const claimed=text.match(/(-?\d+)\.$/)?.[1];
  if(claimed===undefined)return undefined;
  return (item.level==="avanzado"?`Solo se cancela el primer producto; el sumando restante es ${step}.`:`Se deben sumar los dos operandos vigentes: ${u}+${v}=${step}.`)+` El valor afirmado es ${claimed}; ${claimed===String(step)?"coincide":"no coincide"} con el paso correcto.`;
 }
 return undefined;
}
