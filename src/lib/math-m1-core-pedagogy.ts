import type {Level} from "./grammar";
import type {Rational} from "./math-m1";

/** Genuine level- and mode-specific assessment in the original M1 bank.
 * Keep numerical oracle inputs equivalent to the visible transformed equation,
 * so the separate CLI arithmetic audit can independently verify each result. */
export type AlgebraCoreSubtopic="Ecuaciones"|"Sistemas de ecuaciones";
export type CorePedagogy={
 prompt:string;result:Rational;inputs:number[];intermediate:Rational;
 explanation:string;formula:string;
 cognitiveStage:1|2|3;operation:string;requiredEvidence:string[];
 procedure:{label:string;value:Rational};
 claims:[{text:string;truth:true},{text:string;truth:false},{text:string;truth:false}];
};
const rational=(n:number):Rational=>({n,d:1});
export function corePedagogy(subtopic:string,level:Level,inputs:number[]):CorePedagogy|null{
 if(subtopic!=="Ecuaciones"&&subtopic!=="Sistemas de ecuaciones")return null;
 const stage:1|2|3=level==="principiante"?1:level==="intermedio"?2:3;
 if(subtopic==="Ecuaciones"){
  const [a,k,total]=inputs,root=(total-k)/a;
  if(!Number.isInteger(root)||a<=0)throw Error("Ecuación original inconsistente");
  const coefficient=stage===3?-a:a;
  const constant=stage===3?k+2*a:k;
  const rhs=stage===2?total+3*a:total;
  const subtraction=rhs-constant,answer=subtraction/coefficient;
  if(!Number.isInteger(answer))throw Error("Solución transformada inconsistente");
  const prompt=stage===1?`Resuelve para x: ${a}x + ${k} = ${total}.`:
   stage===2?`La ecuación original es ${a}x + ${k} = ${total}. Si el lado derecho aumenta en ${3*a} sin cambiar coeficiente ni término independiente, ¿cuál es la nueva solución de x?`:
   `Partiendo de ${a}x + ${k} = ${total}, cambia el coeficiente de x a ${coefficient} y aumenta el término independiente a ${constant}, conservando el lado derecho. ¿Cuál es la nueva solución de x?`;
  const explanation=stage===1?`Se resta ${k} de ambos miembros y se divide entre ${a}. x=${answer}.`:
   stage===2?`La ecuación transformada es ${a}x+${k}=${rhs}. Al restar ${k} queda ${a}x=${subtraction}; al dividir entre ${a}, x=${answer}. Esto representa un aumento de 3 respecto de la raíz original ${root}.`:
   `La nueva ecuación es (${coefficient})x+${constant}=${rhs}. Restar ${constant} deja (${coefficient})x=${subtraction}; dividir por el coeficiente NEGATIVO da x=${answer}. No se puede conservar el signo del coeficiente anterior.`;
  const correct=`El procedimiento válido es restar ${constant} de ${rhs} y después dividir entre ${coefficient}.`;
  return {prompt,result:rational(answer),inputs:[coefficient,constant,rhs],intermediate:rational(subtraction),
   explanation,formula:`x=(${rhs}-${constant})/(${coefficient})=${answer}`,
   cognitiveStage:stage,operation:stage===1?"resolver-ecuacion-directa":stage===2?"modelar-cambio-de-termino-derecho":"transformar-coeficiente-y-termino-independiente",
   requiredEvidence:stage===1?["aislar-incognita","calcular-raiz"]:stage===2?
    ["interpretar-ecuacion-original","transformar-lado-derecho","resolver-y-comparar"]:
    ["interpretar-dos-transformaciones","sustituir-coeficiente-negativo","aislar-incognita","comprobar-signos"],
   procedure:{label:stage===1?"Aísla el término con x":"Calcula el resultado de restar el término independiente del nuevo lado derecho",value:rational(subtraction)},
   claims:[
    {text:correct,truth:true},
    {text:`Es válido restar ${constant} y dividir entre ${-coefficient}, sin cambiar la igualdad.`,truth:false},
    {text:`Es válido sumar ${constant} a ${rhs} antes de dividir entre ${coefficient}.`,truth:false}
   ]};
 }
 const [sum,diff]=inputs;
 const s=stage===3?sum+4:sum;
 const d=stage===2?-diff:stage===3?diff-2:diff;
 const doubled=s+d,answer=doubled/2;
 if(!Number.isInteger(answer))throw Error("Sistema transformado inconsistente");
 const prompt=stage===1?`En el sistema x+y=${sum} y x−y=${diff}, encuentra x.`:
  stage===2?`El sistema original es x+y=${sum} y x−y=${diff}. Si se invierte el signo del lado derecho de la segunda ecuación, manteniendo la primera, ¿cuál es el nuevo valor de x?`:
  `El sistema original es x+y=${sum} y x−y=${diff}. Si el lado derecho de la primera ecuación aumenta en 4 y el de la segunda disminuye en 2, ¿cuál es la nueva solución de x?`;
 const explanation=`El nuevo sistema tiene x+y=${s} y x−y=${d}. Sumando las ecuaciones se elimina y: 2x=${doubled}. La solución es x=${answer}. `+
   (stage===2?"Cambiar el signo de la segunda ecuación no equivale a mantener la solución anterior.":stage===3?"Se deben aplicar AMBOS cambios antes de eliminar y.":"Se elimina y por suma de ecuaciones.");
 return {prompt,result:rational(answer),inputs:[s,d],intermediate:rational(doubled),
  explanation,formula:`2x=(${s})+(${d})=${doubled}; x=${answer}`,
  cognitiveStage:stage,operation:stage===1?"eliminar-incognita-por-suma":stage===2?"invertir-restriccion-y-recalcular-sistema":"transformar-dos-ecuaciones-y-eliminar",
  requiredEvidence:stage===1?["leer-dos-ecuaciones","eliminar-y"]:stage===2?
   ["interpretar-sistema-original","invertir-segunda-restriccion","sumar-ecuaciones"]:
   ["cambiar-primera-restriccion","cambiar-segunda-restriccion","eliminar-y","verificar-nueva-solucion"],
  procedure:{label:stage===1?"Suma las dos ecuaciones para eliminar y":"Después de aplicar los cambios, suma las dos ecuaciones para obtener 2x",value:rational(doubled)},
  claims:[
   {text:`Al sumar las ecuaciones transformadas, se elimina y y resulta 2x=${doubled}.`,truth:true},
   {text:`Al restar la segunda ecuación de la primera se elimina y y resulta 2x=${doubled}.`,truth:false},
   {text:`Se debe dividir el resultado de sumar ambas ecuaciones entre 3 para obtener x.`,truth:false}
  ]};
}
