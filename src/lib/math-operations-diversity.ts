import type {MathModel} from "./math-m1";
type Alternative=[number,string];
const rotate=(values:string[],seed:number)=>{const k=seed%values.length;const choices=[...values.slice(k),...values.slice(0,k)];return {choices,answerIndex:choices.indexOf(values[0])};};
export const R8_OPERATIONS={principiante:"division-producto-izquierda-derecha",intermedio:"cambio-contextual-inventario",avanzado:"distributiva-signo-negativo"} as const;
export function repairOperationDiversity(base:MathModel):MathModel{return diversity(base,false);}
export function repairOperationDiversityR9(base:MathModel):MathModel{return diversity(base,true);}
function diversity(base:MathModel,extended:boolean):MathModel{
 if(base.subtopic!=="Operaciones"||(extended?base.mode==="quiz":base.mode!=="quiz")||base.oracle.kind!=="Operaciones"||!base.id.startsWith("math-m3-"))return base;
 const slot=Number(base.id.split("-").at(-1));if(!Number.isInteger(slot)||slot<0||slot>2)return base;
 const offset=extended?(base.mode==="clasificar"?1:2):0;
 const a=8+slot*3+offset*10,b=3+slot+offset,c=2+slot+offset;
 let prompt:string,expression:string,explanation:string,label:string,result:number,step:number,inputs:number[],errors:Alternative[],stepErrors:Alternative[];
 const stage=base.cognitiveStage!;
 if(stage===1){
  const n=a*b;
  prompt=`Calcula ${n}÷${b}×${c}−${b}. ¿Cuál es el resultado?`;
  expression=`${n}÷${b}×${c}−${b}`;step=a;result=a*c-b;inputs=[n,b,c,b,1];label="Resuelve primero la división";
  explanation=`División y multiplicación tienen igual prioridad: de izquierda a derecha, ${n}÷${b}=${a}; luego ${a}×${c}=${a*c}. Finalmente resta ${b}: ${result}.`;
  errors=[[a*c,"Se omitió la resta final."],[a-b,"Se omitió multiplicar por el factor siguiente."],[a*c+b,"Se sumó el último término en vez de restarlo."]];
  stepErrors=[[n*b,"Se multiplicó en vez de dividir."],[n-b,"Se restó en vez de dividir."],[n,"Se omitió la división."]];
 }else if(stage===2){
  const boxes=a,units=b+5,removed=c,extra=2;step=boxes-removed;result=step*(units+extra);inputs=[boxes,units,removed,extra,2];label="Calcula cuántas cajas quedan";
  prompt=`Una bodega tiene ${boxes} cajas con ${units} piezas cada una. Retira ${removed} cajas completas y agrega ${extra} piezas a cada caja restante. ¿Cuántas piezas quedan en total?`;
  expression=`(${boxes}−${removed})×(${units}+${extra})`;
  explanation=`Primero cambia la cantidad de cajas: ${boxes}−${removed}=${step}. Cada caja restante contiene ${units}+${extra}=${units+extra} piezas. Multiplica las cantidades nuevas: ${result}.`;
  errors=[[boxes*(units+extra),"Se agregaron piezas también a las cajas retiradas."],[step*units,"Se omitió agregar piezas a cada caja restante."],[step*units+extra,"Se agregaron las piezas una sola vez, no a cada caja."]];
  stepErrors=[[boxes+removed,"Se sumaron las cajas retiradas."],[boxes,"Se omitió retirar cajas."],[removed,"Se confundieron las cajas retiradas con las restantes."]];
 }else{
  step=b;result=-b*c;inputs=[a,b,c,0,3];label="Identifica el sumando cuyo producto permanece con signo negativo";
  expression=`${c}×(${a}−${b})−${c}×${a}`;
  prompt=`Simplifica ${expression}. ¿Qué valor se obtiene?`;
  explanation=`Distribuye el factor sobre ambos términos: ${c}×${a}−${c}×${b}−${c}×${a}. Los productos iguales con signo opuesto se cancelan, por lo que queda −${c}×${b}=${result}. Comprueba mediante cálculo directo.`;
  errors=[[b*c,"Se perdió el signo negativo del término restante."],[0,"Se cancelaron términos que no tienen opuestos iguales."],[c*(a-b),"Se omitió la resta del producto repetido."]];
  stepErrors=[[a,"Se conservó el sumando que se cancela."],[a-b,"Se retuvo el paréntesis completo."],[0,"Se cancelaron ambos términos."]];
 }
 const alternatives=[String(result),...errors.map(([v])=>String(v))],intermediates=[String(step),...stepErrors.map(([v])=>String(v))];
 if(new Set(alternatives).size!==4||new Set(intermediates).size!==4)throw Error("R8: alternativa equivalente");
 const opts=rotate(alternatives,base.seed),mid=rotate(intermediates,base.seed+1),expected=String(result);
 let claims=[{text:`La expresión solicitada vale ${expected}.`,truth:true},{text:`El resultado es ${errors[0][0]}.`,truth:false},{text:`El resultado es ${errors[1][0]}.`,truth:false}];
 const assertionExplanations:Record<string,string>={};
 if(extended&&base.mode==="clasificar"){
  const t=slot%2===0;
  claims=[
   {text:`El resultado de la situación o expresión es ${expected}.`,truth:true},
   {text:`El valor correcto del paso «${label}» es ${t?step:stepErrors[0][0]}.`,truth:t},
   {text:`El resultado correcto es ${errors[0][0]}.`,truth:false}
  ];
  for(const [i,claim] of claims.entries())assertionExplanations[claim.text]=i===0?explanation:i===1?(t?`El paso correcto da ${step}. ${explanation}`:stepErrors[0][1]+` El paso correcto da ${step}.`):errors[0][1]+` El resultado correcto es ${expected}.`;
  const shift=base.seed%3;claims=[...claims.slice(shift),...claims.slice(0,shift)];
 }
 return {...base,prompt,expected,explanation,formula:expression+"="+expected,oracle:{kind:"Operaciones-diversidad",inputs,answer:{n:result,d:1},intermediate:{n:step,d:1}},options:opts.choices,answerIndex:opts.answerIndex,optionExplanations:Object.fromEntries(errors.map(([v,r])=>[String(v),r])),assertions:claims,...(extended?{stepOptionExplanations:Object.fromEntries(stepErrors.map(([v,r])=>[String(v),r])),assertionExplanations}:{}),steps:[{label,choices:mid.choices,answerIndex:mid.answerIndex},{label:"Resultado final",choices:opts.choices,answerIndex:opts.answerIndex}],operation:R8_OPERATIONS[base.level],family:"math-m3-operaciones-"+R8_OPERATIONS[base.level],requiredEvidence:stage===1?["orden-igual-prioridad","resta-final"]:stage===2?["interpretar-retiro","actualizar-unidades","multiplicar-cantidades"]:["distribuir","conservar-signos","cancelar-opuestos","verificar-calculo-directo"]};
}
