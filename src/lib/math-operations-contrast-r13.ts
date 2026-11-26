import type {MathModel} from "./math-m1";
type Alt=[number,string];
export const R13_OPERATIONS={principiante:["producto-negativo-y-suma","cero-dividido-por-no-cero"],intermedio:["comparar-cambios-compensados","reconstruir-cantidad-por-grupo"],avanzado:["cancelacion-cruzada-de-productos","dos-raices-en-producto-agrupado"]} as const;
// Target only redundant original M2 records. R3 plan OP-01/02/03/04, no curricular expansion.
export function repairOperationTransferR13(base:MathModel,override?:{zeroAddend:number}):MathModel{
 if(base.subtopic!=="Operaciones"||base.oracle.kind!=="Operaciones"||!base.id.startsWith("math-m2-"))return base;
 const slot=Number(base.id.split("-").at(-1)),basic=base.level==="principiante";
 if(!Number.isInteger(slot)||slot<6||slot>=(basic?10:12))return base;
 const m=["quiz","clasificar","construir"].indexOf(base.mode),i=(slot-6)%(basic?2:3),g=slot<(basic?8:9)?0:1;
 let a:number,b:number,c:number,d:number,e:number,step:number,key:number,prompt:string,label:string,formula:string,explanation:string,wrong:Alt[],mid:Alt[],inputs:number[],evidence:string[];
 if(basic&&g===0){
 a=4+m*3+i;b=3+i;c=2+m;step=-a*b;key=step+c;
 prompt=`Calcula −${a} × ${b} + ${c}. ¿Cuál es el resultado?`;label="Calcula el producto con signo";formula=`−${a*b}+${c}=${key}`;explanation=`Un factor negativo por uno positivo da un producto negativo: −${a*b}. El producto va primero; luego suma ${c}, resultado ${key}.`;
 wrong=[[a*b+c,"Se perdió el signo negativo del producto."],[-a*(b+c),"Se agrupó una suma sin paréntesis."],[step-c,"Se restó el último sumando."]];mid=[[a*b,"Se ignoró el signo negativo."],[-a-b,"Se restaron los factores."],[-a,"Se omitió el segundo factor."]];inputs=[a,b,c,0,0,1];evidence=["signo-del-producto","precedencia-y-suma"];
 }else if(basic){
 b=3+m;c=override?.zeroAddend??7+i+m;a=b*(5+i+2*m);step=0;key=c;
 prompt=`Calcula (${a} − ${a}) ÷ ${b} + ${c}. ¿Cuál es el resultado?`;label="Calcula el numerador agrupado";formula=`0÷${b}+${c}=${key}`;explanation=`La diferencia de números iguales es cero. Cero dividido por ${b}, que no es cero, da cero. Después suma ${c}; resultado ${key}.`;
 wrong=[[a/b+c,"Se omitió la resta del numerador."],[a-b+c,"Se omitió el segundo término y se sustituyó división por resta."],[c+b,"Se confundió el divisor con un sumando."]];mid=[[a,"Se omitió el segundo término."],[2*a,"Se sumaron los términos."],[-a,"Se omitió el primer término."]];inputs=[a,b,c,0,0,2];evidence=["cancelar-iguales","dividir-cero-por-no-cero","sumar"];
 }else if(base.level==="intermedio"&&g===0){
 a=12+m*7+i;b=7+i;c=5+m;d=3+i;e=2;step=a+b;key=(step+d)*(c-e)-step*c;
 prompt=`Una expresión vale (${a} + ${b}) × ${c}. Se aumenta el primer sumando en ${d} y se reduce el factor en ${e}. ¿Cuál es la diferencia (valor nuevo menos valor original)?`;label="Calcula la suma de los operandos originales";formula=`(${a}+${b}+${d})×(${c}−${e})−(${a}+${b})×${c}=${key}`;explanation=`El valor original es ${step*c}; el nuevo es ${step+d}×${c-e}=${(step+d)*(c-e)}. La diferencia pedida es nuevo menos original, ${key}; un valor negativo significa disminución.`;
 wrong=[[-key,"Se invirtió el orden de la diferencia."],[(step+d)*c-step*c,"Se omitió reducir el factor."],[d-e,"Se confundieron los cambios de operandos con cambios del resultado."]];mid=[[a+b+d,"Se usó el sumando modificado."],[a-b,"Se restaron los sumandos."],[a,"Se omitió el segundo sumando."]];inputs=[a,b,c,d,e,3];evidence=["comparar-dos-estados","reconocer-cambios-compensados","calcular-diferencia-orientada"];
 }else if(base.level==="intermedio"){
 a=4+m+i;c=13+3*m+i;d=5+i;b=a*c-d;step=b+d;key=c;
 prompt=`Se vaciaron ${a} cajas con igual cantidad de piezas. Después de retirar ${d} piezas del total, quedan ${b}. ¿Cuántas piezas tenía cada caja?`;label="Reconstruye el total anterior al retiro";formula=`(${b}+${d})÷${a}=${key}`;explanation=`Deshaz el retiro: ${b}+${d}=${step} piezas en total. Como las ${a} cajas tenían la misma cantidad, divide ${step}÷${a}=${key}. Comprueba: ${a}×${key}−${d}=${b}.`;
 wrong=[[key-d,"Se restó el retiro a la cantidad por caja."],[step,"Se confundió el total con la cantidad por caja."],[key+a,"Se añadió el número de cajas al cociente."]];mid=[[b-d,"Se volvió a retirar en lugar de invertir el cambio."],[b,"Se omitió el retiro."],[b+d+a,"Se sumaron cajas a piezas."]];inputs=[a,b,d,0,0,4];evidence=["invertir-retiro","reconstruir-total","dividir-por-grupos","comprobar-condicion"];
 }else if(g===0){
 a=17+7*m+i;b=6+m+i;c=3+i;d=4+i;step=b*d;key=step-a*c;
 prompt=`Simplifica ${a} × (${b} − ${c}) − ${b} × (${a} − ${d}). ¿Cuál es el valor?`;label="Calcula el producto del segundo factor exterior por el último sustraendo";formula=`${b}×${d}−${a}×${c}=${key}`;explanation=`Al distribuir, ${a}×${b}−${a}×${c}−${b}×${a}+${b}×${d}. Los productos ${a}×${b} y ${b}×${a} se cancelan por conmutatividad. Queda ${step}−${a*c}=${key}.`;
 wrong=[[step+a*c,"Se sumaron los términos restantes."],[-step-a*c,"No se invirtió el signo del último producto."],[a*c-step,"Se invirtió el orden de la resta restante."]];mid=[[b+d,"Se sumaron los factores."],[b,"Se omitió el sustraendo como factor."],[d,"Se omitió el factor exterior."]];inputs=[a,b,c,d,0,5];evidence=["distribuir-dos-grupos","invertir-signos","reconocer-conmutatividad","cancelar-y-comprobar"];
 }else{
 a=7+3*m+i;b=2+i;c=5+m;d=4+i+m;e=3+i;step=a-b;key=step*(c+d)-e;
 prompt=`Calcula (√${a*a} − ${b}) × (${c} + √${d*d}) − ${e}. ¿Cuál es el resultado?`;label="Resuelve el primer paréntesis con su raíz principal";formula=`(${a}−${b})×(${c}+${d})−${e}=${key}`;explanation=`Las raíces principales son ${a} y ${d}. Los paréntesis valen ${step} y ${c+d}; el producto vale ${step*(c+d)}. Después resta ${e}: ${key}.`;
 wrong=[[(a+b)*(c+d)-e,"Se sumó en el primer paréntesis."],[step*(c-d)-e,"Se eligió la raíz negativa del segundo radical."],[step*(c+d)+e,"Se sumó el sustraendo final."]];mid=[[a+b,"Se sumó en lugar de restar."],[-a-b,"Se eligió la raíz negativa."],[a*a-b,"Se confundió el radicando con la raíz."]];inputs=[a,b,c,d,e,6];evidence=["resolver-dos-raices","respetar-dos-agrupaciones","calcular-producto","combinar-signos"];
 }
 const rotate=(v:string[],seed:number)=>{const k=seed%v.length;const choices=[...v.slice(k),...v.slice(0,k)];return {choices,answerIndex:choices.indexOf(v[0])};};
 const opts=rotate([String(key),...wrong.map(([v])=>String(v))],base.seed),inter=rotate([String(step),...mid.map(([v])=>String(v))],base.seed+1);
 if(new Set(opts.choices).size!==4||new Set(inter.choices).size!==4)throw Error("R13 opciones equivalentes "+base.id);
 const mask=base.mode==="clasificar"?slot%3:2;
 const final1=mask===0?key:wrong[0][0],middle=mask===2?mid[0][0]:step,final2=mask===2?key:wrong[mask===0?0:1][0];
 const claims=[{text:"El resultado solicitado es "+final1+".",truth:final1===key},{text:"El valor correcto del paso «"+label+"» es "+middle+".",truth:middle===step},{text:"El resultado solicitado es "+final2+".",truth:final2===key}];
 const assertionExplanations=Object.fromEntries(claims.map((cl,j)=>[cl.text,cl.truth?explanation:(j===1?mid[0][1]+" El paso correcto da "+step+".":wrong.find(([v])=>v===(j===0?final1:final2))![1]+" El resultado correcto es "+key+".")]));
 const shift=base.seed%3,operation=R13_OPERATIONS[base.level][g];
 return {...base,prompt,formula,expected:String(key),explanation,oracle:{kind:"Operaciones-contraste",inputs,answer:{n:key,d:1},intermediate:{n:step,d:1}},options:opts.choices,answerIndex:opts.answerIndex,optionExplanations:Object.fromEntries(wrong.map(([v,reason])=>[String(v),reason])),stepOptionExplanations:Object.fromEntries(mid.map(([v,reason])=>[String(v),reason])),assertions:[...claims.slice(shift),...claims.slice(0,shift)],assertionExplanations,steps:[{label,choices:inter.choices,answerIndex:inter.answerIndex},{label:"Resultado final",choices:opts.choices,answerIndex:opts.answerIndex}],operation,family:"math-m2-operaciones-"+operation,requiredEvidence:evidence,modeOperation:base.mode==="clasificar"?"contrastar-afirmaciones":base.mode==="construir"?"resolver-paso-y-resultado":"resolver-expresion-o-contexto"};
}
