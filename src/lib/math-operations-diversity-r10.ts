import type {MathModel} from "./math-m1";
type Alt=[number,string];
const rotate=(values:string[],seed:number)=>{const k=seed%values.length;const choices=[...values.slice(k),...values.slice(0,k)];return {choices,answerIndex:choices.indexOf(values[0])};};
export const R10_OPERATIONS={
 principiante:["enteros-desplazamiento-signos","precedencia-sin-parentesis"],
 intermedio:["inventario-flujos-independientes","reparto-neto-exacto"],
 avanzado:["factor-comun-dos-grupos","diferencia-productos-no-identicos"]
} as const;
export function repairOperationDiversityR10(base:MathModel):MathModel{
 if(base.subtopic!=="Operaciones"||base.oracle.kind!=="Operaciones"||!base.id.startsWith("math-m3-"))return base;
 const slot=Number(base.id.split("-").at(-1));if(!Number.isInteger(slot)||slot<3||slot>8)return base;
 const mode=["quiz","clasificar","construir"].indexOf(base.mode);
 const i=slot%3,group=slot<6?0:1,stage=base.cognitiveStage!,kind=3+2*(stage-1)+group+1;
 const a=12+mode*12+i*3,b=5+mode*2+i,c=2+i,d=3+mode+i;
 let prompt:string,formula:string,explanation:string,label:string,step:number,key:number,inputs:number[],wrong:Alt[],midWrong:Alt[],evidence:string[];
 if(kind===4){
  step=-a+b;key=step-c;inputs=[a,b,c,0,kind];
  prompt=`Un ascensor parte del nivel −${a}, sube ${b} niveles y baja ${c}. ¿En qué nivel termina?`;
  formula=`−${a}+${b}−${c}=${key}`;label="Determina el nivel después de subir";
  explanation=`Subir suma y bajar resta, aun si la posición es negativa. −${a}+${b}=${step}; ${step}−${c}=${key}. El resultado es el nivel final, no la distancia recorrida.`;
  wrong=[[step+c,"Se sumó el descenso en lugar de restarlo."],[a+b-c,"Se perdió el signo del nivel inicial."],[step,"Se omitió el descenso."]];
  midWrong=[[-a-b,"Se restó la subida."],[a+b,"Se perdió el signo inicial."],[-a,"Se omitió la subida."]];evidence=["interpretar-posicion-y-desplazamiento","aplicar-signos"];
 }else if(kind===5){
  step=b*c;key=a+step;inputs=[a,b,c,0,kind];
  prompt=`Calcula ${a}+${b}×${c}. ¿Cuál es el resultado?`;formula=`${a}+${b}×${c}=${key}`;label="Calcula el producto antes de sumar";
  explanation=`Sin paréntesis, la multiplicación tiene prioridad sobre la suma. ${b}×${c}=${step}; luego ${a}+${step}=${key}.`;
  wrong=[[(a+b)*c,"Se sumó antes de multiplicar."],[a+b+c,"Se sustituyó el producto por una suma."],[step,"Se omitió el primer sumando."]];
  midWrong=[[b+c,"Se sumaron los factores."],[b,"Se omitió el segundo factor."],[c,"Se omitió el primer factor."]];evidence=["identificar-prioridad","sumar-producto"];
 }else if(kind===6){
  step=a*b;key=step-c*d;inputs=[a,b,c,d,kind];
  prompt=`Entran ${a} paquetes de ${b} unidades y salen ${c} paquetes de ${d} unidades. ¿Cuál es el aumento neto de unidades?`;formula=`${a}×${b}−${c}×${d}=${key}`;label="Calcula las unidades que entran";
  explanation=`Las entradas son ${a}×${b}=${step}; las salidas son ${c}×${d}=${c*d}. Resta unidades, no paquetes: ${step}−${c*d}=${key}.`;
  wrong=[[step+c*d,"Se sumaron las salidas."],[(a-c)*b,"Se supuso que todos los paquetes contienen las mismas unidades."],[step-c,"Se restó el número de paquetes y no sus unidades."]];
  midWrong=[[a+b,"Se sumaron paquetes y unidades por paquete."],[a,"Se confundió paquetes con unidades."],[b,"Se contó solo un paquete."]];evidence=["traducir-dos-flujos","calcular-productos","diferencia-neta"];
 }else if(kind===7){
  const k=d+2;step=2*a*k-c*k;key=step/k;inputs=[a,k,c,0,kind];
  prompt=`Hay ${a} cajas con ${2*k} piezas cada una. Se retiran ${c} grupos de ${k} piezas y se reparte el resto entre ${k} personas por igual. ¿Cuántas piezas recibe cada persona?`;formula=`(${a}×${2*k}−${c}×${k})÷${k}=${key}`;label="Calcula el total de piezas después de retirar los grupos";
  explanation=`El total inicial es ${2*a*k} y se retiran ${c*k} piezas. Quedan ${step}; repartir por igual entre ${k} da ${key} piezas por persona.`;
  wrong=[[2*a+c,"Se sumaron los grupos retirados."],[2*a,"Se omitieron los retiros."],[2*(a-c),"Se retiraron cajas completas en vez de grupos."]];
  midWrong=[[2*a*k,"Se omitió el retiro."],[2*a*k+c*k,"Se sumaron las piezas retiradas."],[2*a*k-c,"Se restó el número de grupos, no sus piezas."]];evidence=["traducir-cantidades","calcular-resto","repartir-en-partes-iguales"];
 }else if(kind===8){
  const p=b+4;step=p-c;key=(a+d)*step;inputs=[a,p,c,d,kind];
  prompt=`Simplifica ${a}×${p}−${a}×${c}+${d}×${p}−${d}×${c}. ¿Cuál es el valor?`;formula=`(${a}+${d})×(${p}−${c})=${key}`;label="Identifica la diferencia común de los dos grupos";
  explanation=`Agrupa cada par: ${a}×(${p}−${c})+${d}×(${p}−${c}). Extrae la diferencia común ${step}: (${a}+${d})×${step}=${key}. La expansión directa verifica el resultado.`;
  wrong=[[(a-d)*step,"Se restaron los factores de los grupos que se suman."],[(a+d)*(p+c),"Se cambió la diferencia común por una suma."],[a*step,"Se omitió el segundo grupo."]];
  midWrong=[[p+c,"Se sumaron los términos de la diferencia."],[p,"Se omitió el término sustraído."],[c,"Se confundió el sustraendo con la diferencia."]];evidence=["agrupar-productos","extraer-factor-comun","combinar-factores","comprobar-expansion"];
 }else{
  const p=b+6;step=a*(p-c);key=step-d*(p+c);inputs=[a,p,c,d,kind];
  prompt=`Calcula ${a}×(${p}−${c})−${d}×(${p}+${c}). ¿Cuál es el valor?`;formula=`${a}×(${p}−${c})−${d}×(${p}+${c})=${key}`;label="Calcula el primer producto completo";
  explanation=`Los grupos no son idénticos y no se pueden cancelar. El primero vale ${step}; el segundo vale ${d*(p+c)}. Resta el segundo producto completo: ${key}.`;
  wrong=[[step+d*(p+c),"Se cambió la resta exterior por suma."],[step-d*(p-c),"Se trató el segundo paréntesis como si fuera el primero."],[step-d*p+c,"Se omitió distribuir la resta y el factor sobre el segundo sumando."]];
  midWrong=[[a*p-c,"Se multiplicó únicamente el primer término."],[a*(p+c),"Se cambió la resta interior por suma."],[a*p,"Se omitió el segundo término."]];evidence=["distinguir-grupos","resolver-productos","restar-producto-completo","comprobar-equivalencia"];
 }
 const options=rotate([String(key),...wrong.map(x=>String(x[0]))],base.seed),mid=rotate([String(step),...midWrong.map(x=>String(x[0]))],base.seed+1);
 if(new Set(options.choices).size!==4||new Set(mid.choices).size!==4)throw Error("R10: alternativas equivalentes "+base.id);
 const t=base.mode==="clasificar"&&slot%2===0,claims=[{text:`El resultado solicitado es ${key}.`,truth:true},{text:`El valor correcto del paso «${label}» es ${t?step:midWrong[0][0]}.`,truth:t},{text:`El resultado solicitado es ${wrong[0][0]}.`,truth:false}];
 const assertionExplanations=Object.fromEntries([[claims[0].text,explanation],[claims[1].text,t?`El paso correcto da ${step}. ${explanation}`:midWrong[0][1]+` El paso correcto da ${step}.`],[claims[2].text,wrong[0][1]+` El resultado correcto es ${key}.`]]);
 const shift=base.seed%3,operation=R10_OPERATIONS[base.level][group];
 return {...base,prompt,formula,expected:String(key),explanation,oracle:{kind:"Operaciones-diversidad",inputs,answer:{n:key,d:1},intermediate:{n:step,d:1}},options:options.choices,answerIndex:options.answerIndex,optionExplanations:Object.fromEntries(wrong.map(([v,r])=>[String(v),r])),stepOptionExplanations:Object.fromEntries(midWrong.map(([v,r])=>[String(v),r])),assertionExplanations,assertions:[...claims.slice(shift),...claims.slice(0,shift)],steps:[{label,choices:mid.choices,answerIndex:mid.answerIndex},{label:"Resultado final",choices:options.choices,answerIndex:options.answerIndex}],operation,family:"math-m3-operaciones-"+operation,requiredEvidence:evidence};
}
