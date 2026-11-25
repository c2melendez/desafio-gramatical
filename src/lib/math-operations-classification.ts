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
 // Archived M1/M2 objects still use their original assertions. Current R6
 // records are identified by the revised claim schema, not by a relaxed count.
 return isOperationClassificationR5(item)||isOperationClassificationR6(item)&&item.assertions.some(a=>a.text.startsWith("El valor de la expresión solicitada es "))?maskFor(item).filter(Boolean).length:1;
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
