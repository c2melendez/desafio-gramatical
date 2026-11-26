import type {MathModel} from "./math-m1";
type Alt=[number,string];
export const R12_OPERATIONS={"principiante":["resta-de-entero-negativo","cociente-con-agrupacion"],"intermedio":["presupuesto-dos-compras","reconstruir-inventario-inicial"],"avanzado":["factor-comun-diferencia-compuesta","resta-anidada-distributiva"]} as const;
// Replace only redundant M2 original variants at the cumulative boundary. OP-01/02/03, contract R3, plan MAT-ARIT-01.
function design(level:MathModel['level'],mode:number,slot:number,override?:{divisorSecond:number;quotient:number}){
 const i=slot%3,g=slot<3?0:1,m=mode;
 let a:number,b:number,c:number,d:number,e:number,step:number,key:number,prompt:string,label:string,formula:string,explanation:string,wrong:Alt[],mid:Alt[],operation:string,evidence:string[],inputs:number[],kind:number;
 if(level==="principiante"&&g===0){
 kind=1;a=23+15*m+i;b=7+i;c=3+m;step=a+b;key=step-c;operation="resta-de-entero-negativo";
 prompt=`Calcula ${a} − (−${b}) − ${c}. ¿Cuál es el resultado?`;label="Calcula la resta del entero negativo";formula=`${a}+${b}−${c}=${key}`;explanation=`Restar un entero negativo equivale a sumar su opuesto: ${a}+${b}=${step}. Después resta ${c}; resultado ${key}.`;
 wrong=[[a-b-c,"Se restó un positivo en vez de un negativo."],[step+c,"Se sumó el último término."],[step,"Se omitió la última resta."]];mid=[[a-b,"Se ignoró el signo negativo."],[-a+b,"Se cambió el signo del primer término."],[a,"Se omitió la resta del negativo."]];inputs=[a,b,c,0,0,kind];evidence=["restar-opuesto","aplicar-resta-final"];
 }else if(level==="principiante"){
 kind=2;b=3+i;c=override?.divisorSecond??6+m;d=override?.quotient??b*(2+m);a=(b+c)*d;step=b+c;key=d;operation="cociente-con-agrupacion";
 prompt=`Calcula ${a} ÷ (${b} + ${c}). ¿Cuál es el resultado?`;label="Suma los términos del divisor";formula=`${a}÷${step}=${key}`;explanation=`El divisor completo es ${b}+${c}=${step}. Divide ${a} entre ${step}: resultado ${key}. No se puede dividir solo por el primer sumando.`;
 wrong=[[a/b+c,"Se dividió antes de resolver el paréntesis."],[d+c,"Se volvió a sumar un término ya incluido en el divisor."],[a-b-c,"Se sustituyó el cociente por restas."]];mid=[[b*c,"Se multiplicaron los sumandos."],[b,"Se omitió el segundo sumando."],[c,"Se omitió el primero."]];inputs=[a,b,c,0,0,kind];evidence=["identificar-divisor-completo","resolver-cociente"];
 }else if(level==="intermedio"&&g===0){
 kind=3;a=150+80*m+11*i;b=8+i;c=5+m;d=13+3*i;step=b*c;key=a-step-d;operation="presupuesto-dos-compras";
 prompt=`Una persona tiene L ${a}. Compra ${b} artículos a L ${c} cada uno y otro artículo por L ${d}. ¿Cuánto dinero le queda, en lempiras?`;label="Calcula el costo de los artículos de igual precio";formula=`${a}−${b}×${c}−${d}=${key}`;explanation=`El primer costo es ${b}×${c}=${step}. El otro costo es ${d}; ambos se restan del presupuesto: ${a}−${step}−${d}=${key} lempiras.`;
 wrong=[[a-step+d,"Se sumó el segundo gasto."],[a-b-c-d,"Se sumaron cantidad y precio en vez de multiplicarlos."],[a-step,"Se omitió el segundo gasto."]];mid=[[b+c,"Se sumaron cantidad y precio unitario."],[b,"Se confundió cantidad con costo."],[c,"Se consideró un solo artículo."]];inputs=[a,b,c,d,0,kind];evidence=["traducir-precio-unitario","combinar-costos","calcular-saldo"];
 }else if(level==="intermedio"){
 kind=4;a=90+45*m+7*i;b=6+i;c=3+m;d=11+2*i;step=b*c;key=a-step+d;operation="reconstruir-inventario-inicial";
 prompt=`Un depósito termina con ${a} unidades tras recibir ${b} cajas de ${c} unidades y retirar ${d} unidades. ¿Cuántas unidades tenía antes de esos movimientos?`;label="Calcula las unidades recibidas";formula=`${a}−${b}×${c}+${d}=${key}`;explanation=`Se recibieron ${step} unidades. Para reconstruir el inicio desde el final, deshaz los movimientos: resta la entrada y suma la salida. ${a}−${step}+${d}=${key}. Comprobación: ${key}+${step}−${d}=${a}.`;
 wrong=[[a+step-d,"Se aplicaron los movimientos en el sentido original."],[a-step-d,"No se invirtió el retiro."],[a-b-c+d,"Se sumaron cajas y unidades por caja."]];mid=[[b+c,"Se sumaron cantidad y contenido."],[b,"Se contó el número de cajas."],[c,"Se consideró una sola caja."]];inputs=[a,b,c,d,0,kind];evidence=["inferir-estado-inicial","invertir-movimientos","comprobar-estado-final"];
 }else if(g===0){
 kind=5;a=31+17*m+5*i;b=4+m+i;c=7+i;step=a-c;key=c*b;operation="factor-comun-diferencia-compuesta";
 prompt=`Simplifica ${a} × ${b} − (${a} − ${c}) × ${b}. ¿Cuál es el valor?`;label="Calcula el factor dentro del paréntesis";formula=`[${a}−(${a}−${c})]×${b}=${key}`;explanation=`Extrae el factor común ${b}. Queda ${a}−(${a}−${c})=${c}, pues la resta exterior invierte ambos signos. Por tanto ${c}×${b}=${key}. Comprobación directa: ${a*b}−${step*b}=${key}.`;
 wrong=[[a*b-step,"Se omitió el factor del segundo producto."],[(a+c)*b,"Se sumó el término que debía cancelarse."],[a*b+step*b,"Se sumaron los dos productos."]];mid=[[a+c,"Se sumó dentro del paréntesis."],[a,"Se omitió el sustraendo."],[c,"Se confundió el sustraendo con la diferencia."]];inputs=[a,b,c,0,0,kind];evidence=["reconocer-factor-comun","invertir-signos","cancelar-terminos","comprobar-por-expansion"];
 }else{
 kind=6;a=40+17*m+5*i;b=17+i;c=3+m;d=12+m+i;e=3+i;step=d-e;key=a-b+c*step;operation="resta-anidada-distributiva";
 prompt=`Calcula ${a} − [${b} − ${c} × (${d} − ${e})]. ¿Cuál es el resultado?`;label="Resuelve el paréntesis interior";formula=`${a}−${b}+${c}×${step}=${key}`;explanation=`El paréntesis vale ${step} y el producto ${c*step}. El corchete vale ${b-c*step}. Restar el corchete equivale a restar ${b} y sumar ${c*step}: ${formula}.`;
 wrong=[[a-b-c*step,"No se invirtió el signo del producto al quitar el corchete."],[a-b+c*d-e,"Se omitió distribuir el factor al sustraendo interior."],[a+b-c*step,"Se invirtió el signo del corchete de manera incorrecta."]];mid=[[d+e,"Se sumó en vez de restar."],[d,"Se omitió el sustraendo."],[e,"Se confundió el sustraendo con la diferencia."]];inputs=[a,b,c,d,e,kind];evidence=["resolver-agrupacion-anidada","aplicar-prioridad","invertir-signos","verificar-equivalencia"];
 }
 return {step,key,prompt,label,formula,explanation,wrong,mid,operation,evidence,inputs};
}
function rotate(values:string[],seed:number){const k=seed%values.length;const choices=[...values.slice(k),...values.slice(0,k)];return {choices,answerIndex:choices.indexOf(values[0])};}
export function repairOperationTransferR12(base:MathModel,override?:{divisorSecond:number;quotient:number}):MathModel{
 if(base.subtopic!=="Operaciones"||base.oracle.kind!=="Operaciones"||!base.id.startsWith("math-m2-"))return base;
 const slot=Number(base.id.split("-").at(-1));if(!Number.isInteger(slot)||slot<0||slot>5)return base;
 const mode=["quiz","clasificar","construir"].indexOf(base.mode);
 const x=design(base.level,mode,slot,override),{key,step,label,explanation,wrong,mid}=x;
 const opts=rotate([String(key),...wrong.map(([v])=>String(v))],base.seed),inter=rotate([String(step),...mid.map(([v])=>String(v))],base.seed+1);
 if(new Set(opts.choices).size!==4||new Set(inter.choices).size!==4)throw Error("R12: alternativas equivalentes "+base.id);
 const t=base.mode==="clasificar"&&slot%2===0;
 const claims=[{text:"El resultado solicitado es "+key+".",truth:true},{text:"El valor correcto del paso «"+label+"» es "+(t?step:mid[0][0])+".",truth:t},{text:"El resultado solicitado es "+wrong[0][0]+".",truth:false}];
 const assertionExplanations=Object.fromEntries([[claims[0].text,explanation],[claims[1].text,t?"El paso correcto da "+step+". "+explanation:mid[0][1]+" El paso correcto da "+step+"."],[claims[2].text,wrong[0][1]+" El resultado correcto es "+key+"."]]);
 const shift=base.seed%3;
 return {...base,prompt:x.prompt,formula:x.formula,expected:String(key),explanation,oracle:{kind:"Operaciones-transferencia",inputs:x.inputs,answer:{n:key,d:1},intermediate:{n:step,d:1}},options:opts.choices,answerIndex:opts.answerIndex,optionExplanations:Object.fromEntries(wrong.map(([v,reason])=>[String(v),reason])),stepOptionExplanations:Object.fromEntries(mid.map(([v,reason])=>[String(v),reason])),assertions:[...claims.slice(shift),...claims.slice(0,shift)],assertionExplanations,steps:[{label,choices:inter.choices,answerIndex:inter.answerIndex},{label:"Resultado final",choices:opts.choices,answerIndex:opts.answerIndex}],operation:x.operation,family:"math-m2-operaciones-"+x.operation,requiredEvidence:x.evidence,modeOperation:base.mode==="clasificar"?"evaluar-afirmaciones-de-transferencia":base.mode==="construir"?"resolver-paso-y-resultado":"resolver-expresion-o-contexto"};
}
