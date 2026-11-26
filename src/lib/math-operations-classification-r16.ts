import type {MathModel} from "./math-m1";
type Auxiliary={label:string;correct:string;incorrect:string;reason:string};
function fraction(n:number,d:number){let a=Math.abs(n),b=d;while(b){const t=a%b;a=b;b=t}const g=a||1;return d/g===1?String(n/g):n/g+"/"+d/g;}
function auxiliary(item:MathModel):Auxiliary{
 const [a,b,c,d,e,k]=item.oracle.inputs;
 if(item.oracle.kind==="Operaciones-contraste"){
 switch(k){
 case 1:return {label:"El producto de los valores absolutos de los factores es ",correct:String(a*b),incorrect:String(a+b),reason:`Los valores absolutos son ${a} y ${b}; su producto es ${a*b}, no su suma.`};
 case 2:return {label:"El cociente antes de sumar el último término vale ",correct:"0",incorrect:String(a/b),reason:`La resta de dos números iguales da cero; 0 ÷ ${b}=0, porque el divisor no es cero.`};
 case 3:return {label:"El factor después del cambio es ",correct:String(c-e),incorrect:String(c+e),reason:`El factor disminuye en ${e}: ${c}−${e}=${c-e}.`};
 case 4:return {label:"Para deshacer el retiro se debe agregar al total la cantidad ",correct:String(c),incorrect:String(-c),reason:`Deshacer el retiro significa sumar ${c}, no volver a restarlo.`};
 case 5:return {label:"El producto común que se cancela tiene valor ",correct:String(a*b),incorrect:String(a*c),reason:`Por conmutatividad, ${a}×${b} y ${b}×${a} valen ${a*b}; son los términos opuestos que se cancelan.`};
 case 6:return {label:"El segundo paréntesis vale ",correct:String(c+d),incorrect:String(c-d),reason:`La segunda raíz principal vale ${d}; por tanto, el segundo paréntesis es ${c}+${d}=${c+d}.`};
 }
 }
 if(item.oracle.kind==="Operaciones-avanzadas"){
 switch(k){
 case 1:return {label:"El valor completo del lado derecho es ",correct:String(a*(b+d)),incorrect:String(a*b+d),reason:`El factor ${a} multiplica ambos sumandos del lado derecho: ${a}×(${b}+${d})=${a*(b+d)}.`};
 case 2:return {label:"El producto que aparece con signos opuestos y se cancela vale ",correct:String(a*b),incorrect:String(a*(b+c)),reason:`Al distribuir el lado izquierdo aparecen ${a}×${b} y su opuesto; ambos tienen magnitud ${a*b}.`};
 case 3:case 4:return {label:"La raíz cuadrada principal del radical es ",correct:fraction(a,b),incorrect:fraction(-a,b),reason:`La raíz principal es no negativa: ${fraction(a,b)}, cuyo cuadrado reproduce el radicando.`};
 }
 }
 throw Error("R16 auxiliary unsupported "+item.id+" "+e);
}
export function repairOperationClassificationR16(item:MathModel):MathModel{
 if(item.subtopic!=="Operaciones"||item.mode!=="clasificar"||!["Operaciones-contraste","Operaciones-avanzadas"].includes(item.oracle.kind))return item;
 const indices=item.assertions.map((x,i)=>x.text.startsWith("El resultado solicitado es ")?i:-1).filter(i=>i>=0);
 if(indices.length!==2)throw Error("R16 expected redundant result claims "+item.id);
 const index=indices[1],old=item.assertions[index],aux=auxiliary(item);
 if(aux.correct===aux.incorrect)throw Error("R16 equivalent claims "+item.id);
 const text=aux.label+(old.truth?aux.correct:aux.incorrect)+".";
 const assertions=item.assertions.map((x,i)=>i===index?{text,truth:old.truth}:x);
 const reasons={...item.assertionExplanations};delete reasons[old.text];reasons[text]=aux.reason;
 return {...item,assertions,assertionExplanations:reasons,modeOperation:"contrastar-tres-decisiones-distintas"};
}
