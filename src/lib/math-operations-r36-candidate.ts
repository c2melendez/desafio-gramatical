import type {MathModel} from "./math-m1";
import {r21Mask} from "./math-operations-classification-r21-candidate";

/** R36: isolated candidate, not part of the live bank. Each claim evaluates a
 * different expression, with its own numbers and grouping. Preserve OP-03.
 * Never promote from this module; frozen hashes, auditors and C09 need reconciliation. */
export const R36_IDS: readonly string[] = [
  "math-m1-aritmetica-operaciones-clasificar-avanzado-0",
  "math-m1-aritmetica-operaciones-clasificar-avanzado-1",
  "math-m1-aritmetica-operaciones-clasificar-avanzado-2",
  "math-m1-aritmetica-operaciones-clasificar-avanzado-3",
  "math-m1-aritmetica-operaciones-clasificar-avanzado-4",
  "math-m1-aritmetica-operaciones-clasificar-avanzado-5",
  "math-m1-aritmetica-operaciones-clasificar-avanzado-6",
  "math-m1-aritmetica-operaciones-clasificar-avanzado-7",
  "math-m1-aritmetica-operaciones-clasificar-avanzado-8",
  "math-m1-aritmetica-operaciones-clasificar-avanzado-9",
  "math-m1-aritmetica-operaciones-clasificar-avanzado-10",
  "math-m1-aritmetica-operaciones-clasificar-avanzado-11",
  "math-m1-aritmetica-operaciones-clasificar-avanzado-12",
  "math-m1-aritmetica-operaciones-clasificar-avanzado-13",
  "math-m1-aritmetica-operaciones-clasificar-avanzado-14",
  "math-m1-aritmetica-operaciones-clasificar-avanzado-15",
  "math-m1-aritmetica-operaciones-clasificar-avanzado-16",
  "math-m1-aritmetica-operaciones-clasificar-avanzado-17",
  "math-m1-aritmetica-operaciones-clasificar-avanzado-18",
  "math-m1-aritmetica-operaciones-clasificar-avanzado-19",
  "math-m2-aritmetica-operaciones-clasificar-avanzado-24",
  "math-m3-aritmetica-operaciones-clasificar-avanzado-12",
  "math-m3-aritmetica-operaciones-clasificar-avanzado-13",
  "math-m3-aritmetica-operaciones-clasificar-avanzado-14",
  "math-m3-aritmetica-operaciones-clasificar-avanzado-15",
  "math-m3-aritmetica-operaciones-clasificar-avanzado-16",
  "math-m3-aritmetica-operaciones-clasificar-avanzado-17",
  "math-m3-aritmetica-operaciones-clasificar-avanzado-18",
  "math-m3-aritmetica-operaciones-clasificar-avanzado-19",
  "math-m3-aritmetica-operaciones-clasificar-avanzado-20",
  "math-m3-aritmetica-operaciones-clasificar-avanzado-21"
];
type ErrorChoice={value:number;reason:string};
type Expression={text:string;family:string;answer:number;mid:number;midText:string;rule:string;wrong:ErrorChoice[]};
const err=(value:number,reason:string):ErrorChoice=>({value,reason});
function design(slot:number,claim:number):Expression{
 const a=11+slot*3+claim,b=4+(slot+claim*2)%9,c=b+2+(slot+claim)%5,d=2+(slot*2+claim)%6,e=3+(slot+claim)%7;
 const g=(slot+[0,2,5][claim])%6;
 switch(g){
 case 0:{const t=b-c,v=(a-d)*t;return {family:"factor-comun-diferencia",text:`${a}×(${b}−${c})−${d}×(${b}−${c})`,answer:v,mid:t,midText:`${b}−${c}`,rule:`Extrae el factor común ${b}−${c}=${t}; la diferencia de factores es ${a}−${d}. Por tanto (${a}−${d})×(${t})=${v}.`,wrong:[err((a+d)*t,"Se sumaron los factores en vez de restarlos."),err(a*t,"Se omitió el segundo producto."),err(-v,"Se invirtió el signo de la diferencia."),err((a-d)*(b+c),"Se sumó dentro del grupo.")]};}
 case 1:{const t=b-c,u=d-e,v=a*(t-u);return {family:"resta-de-grupos-distributiva",text:`${a}×(${b}−${c})−${a}×(${d}−${e})`,answer:v,mid:u,midText:`${d}−${e}`,rule:`Los grupos valen ${t} y ${u}. Al restarlos, se conserva el signo del segundo grupo completo: ${a}×(${t}−(${u}))=${v}.`,wrong:[err(a*(t+u),"Se sumó el segundo grupo en vez de restarlo."),err(a*(b-c-d-e),"No se invirtió el signo del último término."),err(t-u,"Se omitió el factor común."),err(a*t,"Se omitió el segundo grupo."),err(a*(b+c-u),"Se sumaron los términos del primer grupo en vez de restarlos.")]};}
 case 2:{const t=b+c,v=a*t-(a+1)*b;return {family:"cancelacion-parcial",text:`${a}×(${b}+${c})−(${a}+1)×${b}`,answer:v,mid:t,midText:`${b}+${c}`,rule:`Distribuye ambos productos: ${a}×${b}+${a}×${c}−${a}×${b}−${b}. Solo se cancelan los productos iguales; queda ${a}×${c}−${b}=${v}.`,wrong:[err(a*c,"Se canceló también el término adicional."),err(a*c+b,"Se invirtió el signo del término adicional."),err(a*t,"Se omitió el sustraendo completo."),err(c-b,"Se perdió el factor del término restante.")]};}
 case 3:{const t=b-c,v=a-(d-e*t);return {family:"resta-exterior-producto-negativo",text:`${a}−(${d}−${e}×(${b}−${c}))`,answer:v,mid:t,midText:`${b}−${c}`,rule:`Primero ${b}−${c}=${t}. Después ${d}−${e}×(${t})=${d-e*t}; resta ese valor completo de ${a} y resulta ${v}.`,wrong:[err(a-d-e*t,"No se invirtió el signo del producto al eliminar el grupo."),err(a-(d-e)*t,"Se restó antes de multiplicar."),err(a+d-e*t,"Se sumó el grupo exterior."),err(a-d,"Se omitió el producto.")]};}
 case 4:{const k=d*e,t=b-c,v=(a*t-a*(b-c-1)+k)/d;const n=a*t-a*(b-c-1)+k;return {family:"diferencia-productos-y-cociente",text:`(${a}×(${b}−${c})−${a}×(${b}−${c+1})+${k})÷${d}`,answer:v,mid:n,midText:"numerador completo",rule:`Los grupos difieren en una unidad; al restar los productos queda ${a}. Suma ${k} y divide todo el numerador por ${d}: ${n}÷${d}=${v}.`,wrong:[err(n,"Se omitió dividir el numerador."),err((a+k)/d+a,"Se añadió el primer factor otra vez."),err((-a+k)/d,"Se invirtió la diferencia entre los productos."),err(a+k/d,"Se dividió solo el último sumando.")]};}
 default:{const t=b-c,u=d+e,v=a*t-(a-1)*u;return {family:"grupos-no-cancelables",text:`${a}×(${b}−${c})−(${a}−1)×(${d}+${e})`,answer:v,mid:u,midText:`${d}+${e}`,rule:`Los factores y los grupos no son iguales, así que no se cancelan. Evalúa ${a}×(${t})−(${a}−1)×${u}=${v}.`,wrong:[err(a*t-a*u,"Se ignoró la disminución del segundo factor."),err(a*t+(a-1)*u,"Se sumaron los productos."),err(t-u,"Se eliminaron factores distintos."),err(a*t,"Se omitió el segundo producto.")]};}
 }
}
const gcd=(a:number,b:number):number=>b?gcd(b,a%b):Math.abs(a)||1;
function rational(x:number){for(let d=1;d<=10;d++){const n=Math.round(x*d);if(Math.abs(n/d-x)<1e-10){const k=gcd(n,d);return {n:n/k,d:d/k};}}throw Error("R36 rational domain");}
function fmt(x:number){const {n,d}=rational(x);return d===1?String(n):n+"/"+d;}
function alternatives(x:Expression){const used=new Set([fmt(x.answer)]);return x.wrong.filter(q=>{const k=fmt(q.value);if(used.has(k))return false;used.add(k);return true;});}
function rotated(values:string[],seed:number){const k=seed%values.length,choices=[...values.slice(k),...values.slice(0,k)];return {choices,answerIndex:choices.indexOf(values[0])};}
export function repairOperationR36Candidate(item:MathModel):MathModel{
 const slot=R36_IDS.indexOf(item.id);if(slot<0)return item;
 if(item.level!=="avanzado"||item.mode!=="clasificar"||item.subtopic!=="Operaciones"||item.modeOperation!=="evaluar-tres-decisiones-operaciones-r21")throw Error("R36 invalid predecessor "+item.id);
 const mask=r21Mask(item.id);if(!mask)throw Error("R36 mask");
 const ds=[0,1,2].map(j=>design(slot,j)),primary=ds[0],answer=fmt(primary.answer);
 const claims=ds.map((x,j)=>{const wrong=alternatives(x)[0];if(!wrong)throw Error("R36 no distractor");
 const val=mask[j]?x.answer:wrong.value;return {text:`La expresión ${x.text} vale ${fmt(val)}.`,truth:mask[j],reason:x.rule+(mask[j]?" El valor afirmado es correcto.":" "+wrong.reason+" El valor afirmado no coincide.")};});
 const wrong=alternatives(primary).slice(0,3);if(wrong.length!==3)throw Error("R36 insufficient alternatives "+item.id);
 const opts=rotated([answer,...wrong.map(q=>fmt(q.value))],item.seed);
 const mid=primary.mid,step=rotated([fmt(mid),fmt(mid+1),fmt(mid-1),fmt(mid+2)],item.seed+1);
 const shift=item.seed%3,ordered=[...claims.slice(shift),...claims.slice(0,shift)];
 return {...item,prompt:`Clasifica las tres afirmaciones sobre distributividad, signos y agrupación. Para el cálculo de referencia: ${primary.text}.`,expected:answer,formula:primary.text+"="+answer,explanation:primary.rule,
 oracle:{kind:"Operaciones-R36-candidate",inputs:[slot],answer:rational(primary.answer),intermediate:rational(mid)},
 options:opts.choices,answerIndex:opts.answerIndex,optionExplanations:Object.fromEntries(wrong.map(q=>[fmt(q.value),q.reason])),
 steps:[{label:"Calcula "+primary.midText,choices:step.choices,answerIndex:step.answerIndex},{label:"Resultado final",choices:opts.choices,answerIndex:opts.answerIndex}],
 stepOptionExplanations:Object.fromEntries(step.choices.filter(v=>v!==fmt(mid)).map(v=>[v,"Revisa la agrupación y los signos; el valor correcto es "+fmt(mid)+"."])),
 assertions:ordered.map(q=>({text:q.text,truth:q.truth})),assertionExplanations:Object.fromEntries(ordered.map(q=>[q.text,q.reason])),
 operation:primary.family,family:"math-operaciones-r36-"+primary.family,requiredEvidence:["reconocer-estructura-distributiva","evaluar-grupos-con-signos","distinguir-cancelacion-valida","contrastar-tres-expresiones-independientes"],modeOperation:"contrastar-expresiones-independientes-r36-candidate"};
}
