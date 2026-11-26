import type {MathModel} from "./math-m1";
type Alt=[number,string];
type Design={prompt:string;label:string;key:number;step:number;formula:string;explanation:string;wrong:Alt[];mid:Alt[];kind:string;inputs:number[];evidence:string[]};
function design(x:MathModel):Design|undefined{
 if(x.subtopic!=="Operaciones"||!x.id.startsWith("math-m2-aritmetica-operaciones-")||x.mode==="clasificar")return;
 const slot=Number(x.id.split("-").at(-1)),i=slot%3+(x.mode==="construir"?3:0);
 if(x.level==="principiante"&&x.mode==="construir"&&slot===3){
  const a=252,b=7,c=11,step=b+c,key=a/step;
  return {prompt:"Calcula 252 ÷ (7 + 11). ¿Cuál es el resultado?",label:"Suma los términos del divisor",key,step,formula:"252÷18=14",explanation:"El divisor es 7+11=18. Divide 252 entre 18: 14. Comprueba 18×14=252; se divide por el grupo completo.",wrong:[[a/b+c,"Se dividió antes de resolver el paréntesis."],[key+c,"Se volvió a sumar un término del divisor."],[a-b-c,"Se sustituyó el cociente por restas."]],mid:[[b*c,"Se multiplicaron los sumandos."],[b,"Se omitió el segundo sumando."],[c,"Se omitió el primero."]],kind:"Operaciones-transferencia",inputs:[a,b,c,0,0,2],evidence:["identificar-divisor-completo","resolver-cociente"]};
 }
 if(x.level==="principiante"&&((x.mode==="quiz"&&slot===9)||(x.mode==="construir"&&slot===8))){
  const a=x.mode==="quiz"?42:60,b=x.mode==="quiz"?7:6,c=x.mode==="quiz"?11:12;
  return {prompt:"Calcula ("+a+" − "+a+") ÷ "+b+" + "+c+". ¿Cuál es el resultado?",label:"Calcula el numerador agrupado",key:c,step:0,formula:"0÷"+b+"+"+c+"="+c,explanation:"La diferencia de iguales es cero; 0 dividido por "+b+" (no nulo) es 0. La suma final da "+c+".",wrong:[[a/b+c,"Se omitió la resta del numerador."],[a-b+c,"Se omitió el segundo término y se sustituyó división por resta."],[c+b,"Se confundió el divisor con un sumando."]],mid:[[a,"Se omitió el segundo término."],[2*a,"Se sumaron los términos."],[-a,"Se omitió el primer término."]],kind:"Operaciones-contraste",inputs:[a,b,c,0,0,2],evidence:["cancelar-iguales","dividir-cero-por-no-cero","sumar"]};
 }
 if(x.level==="avanzado"&&x.mode==="construir"&&slot===13){
  const a=15,b=14,c=5,d=6,step=a*(b-c),key=a*(c+d),right=a*(b+d);
  return {prompt:"Completa la igualdad "+a+" × ("+b+" − "+c+") + □ = "+a+" × ("+b+" + "+d+"). ¿Qué número sustituye □?",label:"Calcula el producto conocido del lado izquierdo",key,step,formula:right+"−"+step+"="+key,explanation:"El producto izquierdo vale "+step+" y el derecho "+right+". Para mantener la igualdad resta "+step+" de "+right+": "+key+". Comprueba "+step+"+"+key+"="+right+".",wrong:[[right,"Se tomó todo el lado derecho sin restar el producto conocido."],[a*(c-d),"Se restaron los términos que se deben sumar."],[c+d,"Se omitió el factor común."]],mid:[[a*b-c,"Se aplicó el factor solo al primer término."],[a*(b+c),"Se sumó dentro del paréntesis."],[b-c,"Se omitió el factor exterior."]],kind:"Operaciones-avanzadas",inputs:[a,b,c,d,0,1],evidence:["identificar-equivalencia","aislar-termino-faltante","comprobar-igualdad"]};
 }
 if(x.level!=="avanzado")return;
 if(slot>=0&&slot<=2){
  const a=35+4*i,c=6+i,key=8+2*i,t=c*key,step=c;
  return {prompt:"Completa "+a+" × □ − ("+a+" − "+c+") × □ = "+t+". El mismo entero sustituye ambos cuadros. ¿Cuál es?",label:"Determina el coeficiente que queda al extraer el factor desconocido",key,step,formula:"("+a+"−("+a+"−"+c+"))×□="+t+"; □="+t+"÷"+c+"="+key,explanation:"Extrae el factor desconocido: "+a+"−("+a+"−"+c+")="+step+". La igualdad exige "+step+"×□="+t+"; divide por "+step+": "+key+". Comprueba "+(a*key)+"−"+((a-c)*key)+"="+t+".",wrong:[[t,"Se omitió dividir por el coeficiente que permanece."],[-key,"Se invirtió el signo del coeficiente restante."],[t+c,"Se sumó el coeficiente en lugar de dividir."]],mid:[[a+c,"Se sumó el término interior que debe cancelarse."],[a,"Se omitió el segundo producto."],[-c,"Se invirtió la resta exterior."]],kind:"Operaciones-inversa-r22",inputs:[1,a,c,t],evidence:["reconocer-factor-comun","cancelar-terminos","aislar-factor-desconocido","comprobar-igualdad"]};
 }
 if(slot>=3&&slot<=5){
  const a=80+5*i,b=12+i,d=18+2*i,e=3+i,key=4+i,step=key*(d-e),t=a-b+step;
  return {prompt:"Completa "+a+" − ["+b+" − □ × ("+d+" − "+e+")] = "+t+". ¿Qué entero sustituye □?",label:"Determina el valor que debe tener el producto dentro del corchete",key,step,formula:"□×("+d+"−"+e+")="+t+"−"+a+"+"+b+"="+step+"; □="+key,explanation:"La resta exterior invierte los signos: "+a+"−"+b+"+□×"+(d-e)+"="+t+". El producto debe valer "+t+"−"+a+"+"+b+"="+step+". Divide por "+(d-e)+": "+key+". Verifica en la expresión original: "+a+"−["+b+"−"+step+"]="+t+".",wrong:[[step,"Se omitió dividir por la diferencia del paréntesis."],[-key,"Se perdió el signo positivo del producto al abrir el corchete."],[step-(d-e),"Se restó el factor conocido en lugar de dividir."]],mid:[[t-a,"Se omitió sumar el término del corchete al aislar el producto."],[a-b-t,"Se invirtió la diferencia al aislar el producto."],[t+a-b,"Se sumó el término exterior en lugar de restarlo."]],kind:"Operaciones-inversa-r22",inputs:[2,a,b,d,e,t],evidence:["interpretar-agrupacion-anidada","invertir-signos","aislar-producto","comprobar-igualdad"]};
 }
 if(slot>=9&&slot<=11){
  const a=9+i,b=2+(i%3),d=5+i,e=4+i,key=10+i,step=key+d,t=(a-b)*step-e;
  return {prompt:"Completa (√"+a*a+" − "+b+") × (□ + √"+d*d+") − "+e+" = "+t+". ¿Qué entero sustituye □?",label:"Determina el valor completo del segundo paréntesis",key,step,formula:"(□+"+d+")=("+t+"+"+e+")÷"+(a-b)+"="+step+"; □="+key,explanation:"Las raíces principales son "+a+" y "+d+". El primer paréntesis vale "+(a-b)+". Deshaz la resta final y divide: ("+t+"+"+e+")÷"+(a-b)+"="+step+". Deshaz la suma de "+d+": "+key+". Comprueba "+(a-b)+"×"+step+"−"+e+"="+t+".",wrong:[[step,"Se confundió el segundo paréntesis completo con el término desconocido."],[step+d,"Se sumó la raíz en lugar de restarla al aislar el término."],[-key,"Se invirtió el signo del término desconocido."]],mid:[[t+e,"Se deshizo la resta final, pero se omitió dividir."],[t+e-(a-b),"Se sustituyó la división por una resta."],[step+e,"Se volvió a sumar el sustraendo después de dividir."]],kind:"Operaciones-inversa-r22",inputs:[3,a*a,b,d*d,e,t],evidence:["resolver-raices-principales","invertir-orden-operaciones","aislar-segundo-parentesis","comprobar-igualdad"]};
 }
}
function options(correct:number,wrong:Alt[],seed:number){
 const all=[String(correct),...wrong.map(([v])=>String(v))];if(new Set(all).size!==4)throw Error("R22 alternatives");
 const k=((seed%4)+4)%4;const choices=[...all.slice(k),...all.slice(0,k)];
 return {choices,answerIndex:choices.indexOf(String(correct))};
}
/** Disconnected candidate. Only the 22 unresolved quiz/construction IDs; preserve historical bank. */
export function repairOperationR22Candidate(x:MathModel):MathModel{
 const d=design(x);if(!d)return x;
 const final=options(d.key,d.wrong,x.seed),first=options(d.step,d.mid,x.seed+1);
 const claims=[{text:"El valor solicitado es "+d.key+".",truth:true},{text:"El valor solicitado es "+d.wrong[0][0]+".",truth:false},{text:"El valor correcto del paso «"+d.label+"» es "+d.mid[0][0]+".",truth:false}];
 return {...x,prompt:d.prompt,expected:String(d.key),formula:d.formula,explanation:d.explanation,oracle:{kind:d.kind,inputs:d.inputs,answer:{n:d.key,d:1},intermediate:{n:d.step,d:1}},options:final.choices,answerIndex:final.answerIndex,optionExplanations:Object.fromEntries(d.wrong.map(([v,s])=>[String(v),s])),stepOptionExplanations:Object.fromEntries(d.mid.map(([v,s])=>[String(v),s])),steps:[{label:d.label,...first},{label:"Resultado final",...final}],assertions:claims,assertionExplanations:Object.fromEntries(claims.map((c,j)=>[c.text,j===0?d.explanation:j===1?d.wrong[0][1]+" El valor correcto es "+d.key+".":d.mid[0][1]+" El paso correcto es "+d.step+"."])),requiredEvidence:d.evidence};
}
