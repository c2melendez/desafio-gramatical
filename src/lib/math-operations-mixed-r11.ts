import type {MathModel} from "./math-m1";
type Alt=[number,string];
const rotate=(values:string[],seed:number)=>{const k=seed%values.length;const choices=[...values.slice(k),...values.slice(0,k)];return {choices,answerIndex:choices.indexOf(values[0])};};
export const R11_OPERATIONS={intermedio:"raiz-producto-suma-resta",avanzado:"raiz-producto-cociente-agrupado"} as const;
/**
 * Corrective R11: 18 redundant legacy M3 variants (slots 9–11, middle and advanced).
 * Original prompts; RDG R3 T5 teaches integrated precedence, A6 teaches principal roots.
 * PHUMA UNAH 2026, printed pp. 57 and 60 (physical 58 and 61), anchor items 39/50.
 * https://admisiones.unah.edu.hn/assets/Uploads/GUIA-PRE-U-UNAH-2026.pdf
 * Complementary qualitative contrast: Pronasa simulator, Khan Academy order of operations,
 * and https://matematicaphuma.wordpress.com/aritmetica/; no psychometric equivalence claimed.
 */
export function repairOperationMixedR11(base:MathModel):MathModel{
 if(base.subtopic!=="Operaciones"||base.level==="principiante"||base.oracle.kind!=="Operaciones"||!base.id.startsWith("math-m3-"))return base;
 const slot=Number(base.id.split("-").at(-1));if(!Number.isInteger(slot)||slot<9||slot>11)return base;
 const mode=["quiz","clasificar","construir"].indexOf(base.mode),i=slot-9;
 const p=4+i+3*mode,a=7+i+3*mode,b=3+i,d=2+mode,e=3+i,q=2+mode+i;
 const advanced=base.level==="avanzado",c=advanced?d+e*q:2*p+3+i;
 let prompt:string,formula:string,explanation:string,label:string,step:number,key:number,wrong:Alt[],middle:Alt[],requiredEvidence:string[];
 if(!advanced){
  step=p;key=p+a*b-c;
  prompt="Calcula √"+(p*p)+" + "+a+" × "+b+" − "+c+". ¿Cuál es el resultado?";
  formula=p+" + "+(a*b)+" − "+c+" = "+key;label="Determina la raíz cuadrada principal";
  explanation="La raíz principal es "+p+" porque "+p+"² = "+(p*p)+". El producto "+a+"×"+b+" = "+(a*b)+" se resuelve antes de sumar y restar. Finalmente "+formula+".";
  wrong=[[-p+a*b-c,"Se eligió la raíz negativa, pero la raíz principal es no negativa."],[p+a+b-c,"Se sumaron los factores en vez de multiplicarlos."],[p+a*b+c,"Se sumó el término que debía restarse."]];
  middle=[[-p,"La raíz principal no es negativa."],[p*p,"Se confundió el radicando con su raíz."],[p+1,"El cuadrado de ese número no coincide con el radicando."]];
  requiredEvidence=["raiz-principal","prioridad-producto","combinar-suma-resta"];
 }else{
  step=p*b;key=a-step+q;
  prompt="Calcula "+a+" − √"+(p*p)+" × "+b+" + ("+c+" − "+d+") ÷ "+e+". ¿Cuál es el resultado?";
  formula=a+" − "+step+" + "+q+" = "+key;label="Calcula el producto de la raíz principal por el factor";
  explanation="Primero √"+(p*p)+" = "+p+" y el paréntesis "+c+"−"+d+" = "+(c-d)+". Luego el producto "+p+"×"+b+" = "+step+" y la división "+(c-d)+"÷"+e+" = "+q+". Respeta los signos al combinar: "+formula+".";
  wrong=[[a+step+q,"Se sumó el producto que debía restarse."],[(a-p)*b+q,"Se efectuó la resta antes del producto sin que existiera agrupación."],[a-step+c-d,"Se omitió dividir el contenido del paréntesis."]];
  middle=[[-step,"Se incorporó la resta exterior al producto pedido."],[p+b,"Se sumaron los factores."],[p,"Se omitió multiplicar la raíz por el factor."]];
  requiredEvidence=["resolver-raiz-principal","resolver-agrupacion","prioridad-producto-cociente","combinar-signos"];
 }
 const opts=rotate([String(key),...wrong.map(([v])=>String(v))],base.seed);
 const mid=rotate([String(step),...middle.map(([v])=>String(v))],base.seed+1);
 if(new Set(opts.choices).size!==4||new Set(mid.choices).size!==4)throw Error("R11: opciones equivalentes "+base.id);
 const t=base.mode==="clasificar"&&slot%2===0;
 const claims=[{text:"El resultado solicitado es "+key+".",truth:true},{text:"El valor correcto del paso «"+label+"» es "+(t?step:middle[0][0])+".",truth:t},{text:"El resultado solicitado es "+wrong[0][0]+".",truth:false}];
 const assertionExplanations=Object.fromEntries([[claims[0].text,explanation],[claims[1].text,t?"El paso correcto da "+step+". "+explanation:middle[0][1]+" El paso correcto da "+step+"."],[claims[2].text,wrong[0][1]+" El resultado correcto es "+key+"."]]);
 const shift=base.seed%3,operation=R11_OPERATIONS[base.level];
 return {...base,prompt,formula,expected:String(key),explanation,oracle:{kind:"Operaciones-mixtas",inputs:[p,a,b,c,d,e,advanced?3:2],answer:{n:key,d:1},intermediate:{n:step,d:1}},
 options:opts.choices,answerIndex:opts.answerIndex,optionExplanations:Object.fromEntries(wrong.map(([v,reason])=>[String(v),reason])),
 stepOptionExplanations:Object.fromEntries(middle.map(([v,reason])=>[String(v),reason])),assertions:[...claims.slice(shift),...claims.slice(0,shift)],assertionExplanations,
 steps:[{label,choices:mid.choices,answerIndex:mid.answerIndex},{label:"Resultado final",choices:opts.choices,answerIndex:opts.answerIndex}],operation,family:"math-m3-operaciones-"+operation,requiredEvidence,
 modeOperation:base.mode==="clasificar"?"evaluar-afirmaciones-de-jerarquia":base.mode==="construir"?"resolver-paso-y-resultado":"resolver-expresion-mixta"};
}
