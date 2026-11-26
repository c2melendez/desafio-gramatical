import type {MathModel,Rational} from "./math-m1";
type Alt=[Rational,string];
export const R14_OPERATIONS=["completar-igualdad-distributiva","factor-desconocido-tras-cancelar","raiz-racional-resta-agrupada","distribuir-sobre-raiz-racional"] as const;
// Correct only dominant advanced M2 variants; OP-03/04, existing R3 plan. Exact rational keys.
function design(m:number,i:number,g:number,override?:{rightAddend:number}){
 let a:number,b:number,c:number,d:number,e:number,step:Rational,key:Rational,prompt:string,label:string,formula:string,explanation:string,wrong:Alt[],mid:Alt[],inputs:number[],operation:string;
 const q=(n:number,d=1)=>{let a=Math.abs(n),b=d;while(b){const t=a%b;a=b;b=t}return {n:n/(a||1),d:d/(a||1)}};
 const fmt=(x:Rational)=>x.d===1?String(x.n):x.n+"/"+x.d;
 if(g===0){
 a=8+3*m+i;b=13+i;c=4+i;d=override?.rightAddend??2+m;step=q(a*(b-c));key=q(a*(c+d));operation="completar-igualdad-distributiva";
 prompt=`Completa la igualdad ${a} × (${b} − ${c}) + □ = ${a} × (${b} + ${d}). ¿Qué número sustituye □?`;label="Calcula el producto conocido del lado izquierdo";formula=`${a}×(${b}+${d})−${a}×(${b}−${c})=${fmt(key)}`;explanation=`El producto izquierdo vale ${fmt(step)} y el derecho ${a*(b+d)}. Para conservar la igualdad, el número faltante es su diferencia: ${formula}. Comprueba sumándolo al producto izquierdo.`;
 wrong=[[q(a*(b+d)),"Se tomó todo el lado derecho sin restar el producto conocido."],[q(a*(c-d)),"Se restaron los términos que se deben sumar al deshacer la diferencia."],[q(c+d),"Se omitió multiplicar por el factor común."]];mid=[[q(a*b-c),"Se aplicó el factor solo al primer término."],[q(a*(b+c)),"Se sumó dentro del paréntesis."],[q(b-c),"Se omitió el factor exterior."]];inputs=[a,b,c,d,0,1];
 }else if(g===1){
 a=9+4*m+i;b=16+i;d=3+m;e=4+i;c=d*e;step=q(a*c);key=q(a*e);operation="factor-desconocido-tras-cancelar";
 prompt=`Completa la igualdad ${a} × (${b} + ${c}) − ${a} × ${b} = ${d} × □. ¿Qué número sustituye □?`;label="Simplifica el lado izquierdo";formula=`${a}×${c}÷${d}=${fmt(key)}`;explanation=`Al distribuir se cancelan los productos ${a}×${b}. Queda ${a}×${c}=${fmt(step)}. Como ${d}×□ debe valer ${fmt(step)}, divide por ${d}: ${fmt(key)}.`;
 wrong=[[step,"Se omitió dividir por el factor del lado derecho."],[q(e),"Se dividió el sumando sin conservar el factor común."],[q(a),"Se perdió el cociente entre el sumando y el factor derecho."]];mid=[[q(a*(b+c)),"Se omitió la cancelación."],[q(c),"Se omitió el factor exterior."],[q(-a*c),"Se invirtió el signo del término que permanece."]];inputs=[a,b,c,d,e,2];
 }else if(g===2){
 a=3+i;b=17+5*m+i;c=a+4;d=3+i;step=q(2*c-d,2*b);key=q(2*a-2*c+d,2*b);operation="raiz-racional-resta-agrupada";
 prompt=`Calcula √(${a*a}/${b*b}) − (${c}/${b} − ${d}/${2*b}). Expresa una fracción simplificada.`;label="Resuelve la diferencia dentro del paréntesis";formula=`(${2*a}−${2*c}+${d})/${2*b}=${fmt(key)}`;explanation=`La raíz principal es ${fmt(q(a,b))}. El paréntesis vale ${fmt(step)} al convertir a denominador ${2*b}. La resta exterior invierte los dos signos internos: ${formula}.`;
 wrong=[[q(-2*a-2*c+d,2*b),"Se eligió la raíz negativa."],[q(2*a-2*c-d,2*b),"No se invirtió el signo del último término al restar el grupo."],[q(2*a-2*c+d,4*b),"Se sumaron denominadores en lugar de conservar la unidad común."]];mid=[[q(2*c+d,2*b),"Se sumaron los términos del paréntesis."],[q(c-d,3*b),"Se restaron numeradores y se sumaron denominadores."],[q(c,b),"Se omitió el sustraendo."]];inputs=[a,b,c,d,0,3];
 }else{
 a=4+i;b=19+6*m+i;c=2*a+3;d=5+i;step=q(2*a-c,2*b);key=q(2*a-c+d,b);operation="distribuir-sobre-raiz-racional";
 prompt=`Calcula 2 × (√(${a*a}/${b*b}) − ${c}/${2*b}) + ${d}/${b}. Expresa una fracción simplificada.`;label="Resuelve el paréntesis antes de multiplicar";formula=`(${2*a}−${c}+${d})/${b}=${fmt(key)}`;explanation=`La raíz principal es ${fmt(q(a,b))}. El paréntesis vale ${fmt(step)}. Multiplicarlo por 2 da ${fmt(q(2*a-c,b))}; al sumar ${d}/${b} se obtiene ${formula}.`;
 wrong=[[q(2*a-c+2*d,2*b),"Se omitió multiplicar por 2."],[q(2*a+c+d,b),"Se cambió la resta interior por suma."],[q(2*a-c-d,b),"Se restó el último sumando."]];mid=[[q(2*a+c,2*b),"Se sumó dentro del paréntesis."],[q(a-c,3*b),"Se restaron numeradores y se sumaron denominadores."],[q(a,b),"Se omitió el sustraendo."]];inputs=[a,b,c,d,0,4];
 }
 return {step,key,prompt,label,formula,explanation,wrong,mid,inputs,operation};
}
const fmt=(x:Rational)=>x.d===1?String(x.n):x.n+"/"+x.d;
function rotate(v:string[],seed:number){const k=seed%v.length;const choices=[...v.slice(k),...v.slice(0,k)];return {choices,answerIndex:choices.indexOf(v[0])};}
export function repairOperationAdvancedR14(base:MathModel,override?:{rightAddend:number}):MathModel{
 if(base.subtopic!=="Operaciones"||base.level!=="avanzado"||base.oracle.kind!=="Operaciones"||!base.id.startsWith("math-m2-"))return base;
 const slot=Number(base.id.split("-").at(-1));if(!Number.isInteger(slot)||slot<12||slot>23)return base;
 const g=Math.floor((slot-12)/3),i=(slot-12)%3,m=["quiz","clasificar","construir"].indexOf(base.mode),x=design(m,i,g,override);
 const {key,step,wrong,mid,label,explanation}=x,answer=fmt(key),intermediate=fmt(step);
 const opts=rotate([answer,...wrong.map(([v])=>fmt(v))],base.seed),inter=rotate([intermediate,...mid.map(([v])=>fmt(v))],base.seed+1);
 if(new Set(opts.choices).size!==4||new Set(inter.choices).size!==4)throw Error("R14 alternativas equivalentes "+base.id);
 const mask=base.mode==="clasificar"?slot%3:2;
 const values=[mask===0?answer:fmt(wrong[0][0]),mask===2?fmt(mid[0][0]):intermediate,mask===2?answer:fmt(wrong[mask===0?0:1][0])];
 const claims=values.map((v,j)=>({text:j===1?"El valor correcto del paso «"+label+"» es "+v+".":"El resultado solicitado es "+v+".",truth:v===(j===1?intermediate:answer)}));
 const assertionExplanations=Object.fromEntries(claims.map((cl,j)=>[cl.text,cl.truth?explanation:(j===1?mid[0][1]+" El paso correcto da "+intermediate+".":wrong.find(([v])=>fmt(v)===values[j])![1]+" El resultado correcto es "+answer+".")]));
 const shift=base.seed%3;
 return {...base,prompt:x.prompt,formula:x.formula,expected:answer,explanation,oracle:{kind:"Operaciones-avanzadas",inputs:x.inputs,answer:key,intermediate:step},options:opts.choices,answerIndex:opts.answerIndex,optionExplanations:Object.fromEntries(wrong.map(([v,reason])=>[fmt(v),reason])),stepOptionExplanations:Object.fromEntries(mid.map(([v,reason])=>[fmt(v),reason])),assertions:[...claims.slice(shift),...claims.slice(0,shift)],assertionExplanations,steps:[{label,choices:inter.choices,answerIndex:inter.answerIndex},{label:"Resultado final",choices:opts.choices,answerIndex:opts.answerIndex}],operation:x.operation,family:"math-m2-operaciones-"+x.operation,requiredEvidence:g<2?["identificar-equivalencia","distribuir-o-cancelar","aislar-termino-faltante","comprobar-igualdad"]:["resolver-raiz-principal","compatibilizar-denominadores","aplicar-signos-y-agrupacion","simplificar-y-comprobar"],modeOperation:base.mode==="clasificar"?"contrastar-afirmaciones":base.mode==="construir"?"resolver-paso-y-resultado":"resolver-igualdad-o-expresion"};
}
