import type {MathModel,Rational} from "./math-m1";
type Alt=[Rational,string];
export const R15_OPERATIONS=["comparar-ofertas-con-cargos-fijos","cociente-de-diferencia-racional-con-raiz"] as const;
const q=(n:number,d=1):Rational=>{let a=Math.abs(n),b=d;while(b){const t=a%b;a=b;b=t}return {n:n/(a||1),d:d/(a||1)};};
const fmt=(x:Rational)=>x.d===1?String(x.n):x.n+"/"+x.d;
function rotate(v:string[],seed:number){const k=seed%v.length;const choices=[...v.slice(k),...v.slice(0,k)];return {choices,answerIndex:choices.indexOf(v[0])};}
function design(m:number,i:number,g:number){
 let key:Rational,step:Rational,aux:Rational,auxWrong:Rational,prompt:string,label:string,auxLabel:string,auxReason:string,formula:string,explanation:string,wrong:Alt[],mid:Alt[],inputs:number[];
 if(g===0){
 const n=8+2*m+i,p=14+m,f=20+3*i,v=p+3,h=5+i,A=n*p+f,B=n*v+h;
 step=q(A);key=q(B-A);aux=q(h-f);auxWrong=q(f-h);
 prompt=`Para comprar ${n} cuadernos, la tienda A cobra L ${p} por cuaderno más L ${f} por el pedido; la B cobra L ${v} por cuaderno más L ${h} por el pedido. ¿Cuál es el costo de B menos el costo de A, en lempiras?`;
 label="Calcula el costo completo en la tienda A";auxLabel="La diferencia de los cargos fijos (B menos A) es ";auxReason=`Los cargos fijos se restan en el orden B menos A: ${h}−${f}=${fmt(aux)}.`;
 formula=`(${n}×${v}+${h})−(${n}×${p}+${f})=${fmt(key)}`;explanation=`A cuesta ${n}×${p}+${f}=${A}; B cuesta ${n}×${v}+${h}=${B}. Compara los costos completos, no solo el precio unitario. B menos A es ${B}−${A}=${fmt(key)} lempiras.`;
 wrong=[[q(B),"Se tomó el costo de B sin restar el de A."],[q(n*(v-p)),"Se comparó solo el precio por cuaderno y se omitieron ambos cargos fijos."],[q(A-B),"Se invirtió el orden de la diferencia."]];
 mid=[[q(n*p),"Se omitió el cargo fijo."],[q((n+f)*p),"Se trató el cargo fijo como cantidad de cuadernos."],[q(n+p+f),"Se sumaron cantidad y precio unitario en vez de multiplicarlos."]];inputs=[n,p,f,v,h,1];
 }else{
 const a=4+i+m,b=7+2*m+i,c=a+1,d=3+i;
 step=q(2*a-c,2*b);key=q(2*a-c,2*b*d);aux=q(a,b);auxWrong=q(-a,b);
 prompt=`Calcula (√(${a*a}/${b*b}) − ${c}/${2*b}) ÷ ${d}. Expresa una fracción simplificada.`;
 label="Resuelve la diferencia dentro del paréntesis";auxLabel="La raíz cuadrada principal es ";auxReason=`La raíz principal es no negativa: ${fmt(aux)}, porque al cuadrarla se obtiene ${a*a}/${b*b}.`;
 formula=`(${2*a}−${c})/(${2*b}×${d})=${fmt(key)}`;explanation=`La raíz principal es ${fmt(aux)}. Con denominador ${2*b}, el paréntesis vale ${fmt(step)}. Dividir por ${d} equivale a multiplicar por 1/${d}; resulta ${formula}.`;
 wrong=[[step,"Se omitió dividir por el último número."],[q((2*a-c)*d,2*b),"Se multiplicó por el divisor en lugar de dividir."],[q(-2*a-c,2*b*d),"Se eligió la raíz negativa."]];
 mid=[[q(2*a+c,2*b),"Se sumaron las fracciones en vez de restarlas."],[q(-2*a-c,2*b),"Se tomó la raíz negativa."],[q(a-c,3*b),"Se restaron numeradores y se sumaron denominadores sin convertir a unidades comunes."]];inputs=[a,b,c,d,0,2];
 }
 return {key,step,aux,auxWrong,prompt,label,auxLabel,auxReason,formula,explanation,wrong,mid,inputs};
}
export function repairOperationTransferR15(base:MathModel):MathModel{
 if(base.subtopic!=="Operaciones"||base.level!=="intermedio"||base.oracle.kind!=="Operaciones"||!base.id.startsWith("math-m2-"))return base;
 const slot=Number(base.id.split("-").at(-1));if(!Number.isInteger(slot)||slot<12||slot>17)return base;
 const g=slot<15?0:1,i=(slot-12)%3,m=["quiz","clasificar","construir"].indexOf(base.mode),x=design(m,i,g);
 const answer=fmt(x.key),intermediate=fmt(x.step),opts=rotate([answer,...x.wrong.map(([v])=>fmt(v))],base.seed),inter=rotate([intermediate,...x.mid.map(([v])=>fmt(v))],base.seed+1);
 if(new Set(opts.choices).size!==4||new Set(inter.choices).size!==4)throw Error("R15 alternativas equivalentes "+base.id);
 const mask=base.mode==="clasificar"?slot%3:2;
 const values=[mask===0?answer:fmt(x.wrong[0][0]),mask===2?fmt(x.mid[0][0]):intermediate,mask===2?fmt(x.aux):fmt(x.auxWrong)];
 const claims=[{text:"El resultado solicitado es "+values[0]+".",truth:mask===0},{text:"El valor correcto del paso «"+x.label+"» es "+values[1]+".",truth:mask!==2},{text:x.auxLabel+values[2]+".",truth:mask===2}];
 const assertionExplanations=Object.fromEntries(claims.map((cl,j)=>[cl.text,j===2?x.auxReason:cl.truth?x.explanation:(j===0?x.wrong[0][1]+" El resultado correcto es "+answer+".":x.mid[0][1]+" El paso correcto da "+intermediate+".")]));
 const shift=base.seed%3,operation=R15_OPERATIONS[g];
 return {...base,prompt:x.prompt,formula:x.formula,expected:answer,explanation:x.explanation,oracle:{kind:"Operaciones-decision",inputs:x.inputs,answer:x.key,intermediate:x.step},options:opts.choices,answerIndex:opts.answerIndex,optionExplanations:Object.fromEntries(x.wrong.map(([v,reason])=>[fmt(v),reason])),stepOptionExplanations:Object.fromEntries(x.mid.map(([v,reason])=>[fmt(v),reason])),assertions:[...claims.slice(shift),...claims.slice(0,shift)],assertionExplanations,steps:[{label:x.label,choices:inter.choices,answerIndex:inter.answerIndex},{label:"Resultado final",choices:opts.choices,answerIndex:opts.answerIndex}],operation,family:"math-m2-operaciones-"+operation,requiredEvidence:g===0?["traducir-dos-costos-completos","distinguir-cargo-fijo-de-precio-unitario","comparar-diferencia-orientada"]:["identificar-raiz-principal","homogeneizar-denominadores","dividir-por-entero-no-cero"],modeOperation:base.mode==="clasificar"?"contrastar-tres-decisiones-distintas":base.mode==="construir"?"resolver-paso-y-resultado":"resolver-contexto-o-expresion"};
}
