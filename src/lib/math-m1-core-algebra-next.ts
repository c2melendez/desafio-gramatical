import type {Level} from "./grammar";
import type {CorePedagogy} from "./math-m1-core-pedagogy";
import type {Rational} from "./math-m1";

const q=(n:number):Rational=>({n,d:1});
const baseEvidence=["identificar-datos","aplicar-regla"];
const stageEvidence=["interpretar-modelo","aplicar-transformacion","calcular-resultado"];
const advancedEvidence=["interpretar-modelo","combinar-transformaciones","comprobar-signo-o-relacion","evaluar-resultado"];
export const NEXT_ALGEBRA_SUBTOPICS=[
 "Ecuaciones cuadráticas","Inecuaciones","Funciones","Patrones algebraicos"
] as const;
export type NextAlgebraSubtopic=typeof NEXT_ALGEBRA_SUBTOPICS[number];
export function nextAlgebraPedagogy(subtopic:string,level:Level,inputs:number[]):CorePedagogy|null{
 if(!NEXT_ALGEBRA_SUBTOPICS.some(x=>x===subtopic))return null;
 const stage:1|2|3=level==="principiante"?1:level==="intermedio"?2:3;
 const requiredEvidence=stage===1?baseEvidence:stage===2?stageEvidence:advancedEvidence;
 let prompt="",answer=0,intermediate=0,formula="",explanation="",nextInputs:number[]=[];
 let label="",operation="",trueClaim="",wrongA="",wrongB="";
 if(subtopic==="Ecuaciones cuadráticas"){
  const [S,P]=inputs,delta=S*S-4*P,r=Math.sqrt(delta),r1=(S-r)/2,r2=(S+r)/2;
  if(!Number.isInteger(r1)||r1>=r2||r1<=0)throw Error("Raíces cuadráticas inconsistentes");
  const shift=stage===1?0:stage===2?2:1,scale=stage===3?2:1;
  const left=scale*r1+shift,right=scale*r2+shift;
  const sum=left+right,product=left*right;
  nextInputs=[sum,product];answer=right;intermediate=sum;
  prompt=stage===1?`La ecuación x² − ${S}x + ${P}=0 tiene dos raíces positivas. ¿Cuál es la mayor?`:
   stage===2?`La ecuación original es x² − ${S}x + ${P}=0. Si la gráfica de la función se traslada 2 unidades a la derecha, ¿cuál es la raíz mayor de la ecuación transformada?`:
   `La ecuación original es x² − ${S}x + ${P}=0. Una nueva función es g(x)=f((x−1)/2), donde f(x)=x²−${S}x+${P}. ¿Cuál es la raíz mayor de g(x)=0?`;
  label="Determina la suma de las dos raíces del modelo transformado";
  formula=`Raíces: ${left} y ${right}; suma=${sum}; producto=${product}; mayor=${answer}`;
  explanation=`La ecuación transformada tiene raíces ${left} y ${right}. Se comprueba mediante suma ${sum} y producto ${product}, por tanto su raíz mayor es ${answer}.`;
  operation=stage===1?"factorizar-cuadratica":stage===2?"trasladar-raices-y-factorizar":"componer-escala-horizontal-y-traslacion-de-raices";
  trueClaim=`Se pueden verificar las raíces del modelo transformado usando suma ${sum} y producto ${product}.`;
  wrongA=`La suma de las raíces del modelo transformado es ${product}, porque equivale al término independiente.`;
  wrongB=`La raíz mayor se obtiene sumando ${sum} y ${product} sin resolver la ecuación.`;
 }else if(subtopic==="Inecuaciones"){
  const [a,k,b]=inputs,x0=(b-k)/a;
  if(a<=0||!Number.isInteger(x0))throw Error("Inecuación de origen inválida");
  const coef=stage===3?-a:a,constant=stage===3?k+2*a:k;
  const bound=stage===2?b+2*a:b;
  const delta=bound-constant;
  answer=delta/coef;intermediate=delta;
  nextInputs=[coef,constant,bound];
  const sign=stage===3?"<":">";
  prompt=stage===1?`Al resolver ${a}x + ${k} > ${b}, se obtiene x > ___. Completa el límite.`:
   stage===2?`La inecuación original es ${a}x + ${k} > ${b}. Si se aumenta el lado derecho en ${2*a}, manteniendo los demás términos, ¿cuál es el nuevo límite de la solución x > ___?`:
   `La inecuación original es ${a}x + ${k} > ${b}. Sustituye el coeficiente por ${coef} y el término independiente por ${constant}, sin cambiar el lado derecho. Al resolver se obtiene x < ___. ¿Cuál es el límite?`;
  label="Calcula el lado derecho luego de restar el término independiente";
  formula=`${coef}x+${constant}>${bound}; x ${sign} ${answer}`;
  explanation=`Restar ${constant} deja ${coef}x>${delta}. Al dividir por ${coef}${coef<0?", que es negativo, se invierte la desigualdad":""}. Resultado: x ${sign} ${answer}.`;
  operation=stage===1?"resolver-inecuacion-positiva":stage===2?"modificar-cota-y-recalcular":"transformar-coeficiente-negativo-e-invertir-inecuacion";
  trueClaim=`Al dividir por ${coef}, ${coef<0?"debe invertirse":"se conserva"} el signo de la desigualdad.`;
  wrongA=`Al dividir por ${coef}, ${coef<0?"se conserva":"debe invertirse"} el signo de la desigualdad.`;
  wrongB=`Para aislar x debe sumarse ${constant} al lado derecho en lugar de restarlo.`;
 }else if(subtopic==="Funciones"){
  const [m,b,x]=inputs;
  const operationType=stage===1?"direct":stage===2?"shift":"compose";
  const adjusted=stage===1?b:stage===2?b+2*m:b+3*m;
  answer=m*x+adjusted;
  intermediate=answer-b;
  nextInputs=[m,adjusted,x];
  prompt=stage===1?`La gráfica muestra f(x)=${m}x+${b}. Calcula f(${x}).`:
   stage===2?`A partir de la recta f dibujada, se define g(x)=f(x+2). ¿Cuál es g(${x})?`:
   `A partir de la recta f dibujada, se define g(x)=2f(x+1)−f(x−1). ¿Cuál es g(${x})?`;
  label="Determina la contribución de los términos con pendiente, antes de sumar la ordenada al origen";
  formula=stage===1?`f(${x})=${m}×${x}+${b}=${answer}`:
   stage===2?`g(${x})=f(${x+2})=${m}×${x+2}+${b}=${answer}`:
   `g(${x})=2f(${x+1})−f(${x-1})=${answer}`;
  explanation=stage===1?`En la gráfica f(0)=${b} y la pendiente es ${m}. Se evalúa f(${x})=${answer}.`:
   stage===2?`La traslación horizontal implica evaluar f en ${x+2}, no en ${x}. Resultado: ${answer}.`:
   `Al componer, 2[${m}(${x+1})+${b}]−[${m}(${x-1})+${b}]=${answer}. Se conservan correctamente los signos y la ordenada original.`;
  operation=stage===1?"evaluar-funcion-lineal":stage===2?"interpretar-traslacion-horizontal-y-evaluar":"componer-dos-evaluaciones-con-coeficientes";
  trueClaim=`La regla transformada que permite calcular la respuesta tiene pendiente efectiva ${m} y ordenada ${adjusted}.`;
  wrongA=`Es válido calcular el valor usando pendiente ${m} y ordenada ${adjusted+1} sin modificar la respuesta.`;
  wrongB=`La regla transformada tiene pendiente efectiva ${-m} y ordenada ${adjusted}, porque todo desplazamiento invierte la pendiente.`;
  // The visual displays source f, NOT transformed g. This flag is consumed by MathVisual.
  void operationType;
 }else{
  const [m,b,n]=inputs;
  if(!Number.isInteger(n)||n<=1)throw Error("Patrón sin suficientes índices");
  const coefficient=stage===3?2*m:m;
  const constant=stage===3?2*b+m:b;
  const target=stage===2?n+2:n;
  answer=coefficient*target+constant;
  intermediate=coefficient*target;
  nextInputs=[coefficient,constant,target];
  prompt=stage===1?`Un patrón cumple aₙ=${m}n+${b}. ¿Cuál es el término a_${n}?`:
   stage===2?`La sucesión tiene regla aₙ=${m}n+${b}. Si se avanza DOS posiciones desde a_${n}, ¿qué valor tiene a_${n+2}?`:
   `La sucesión tiene regla aₙ=${m}n+${b}. Define bₙ=a_(n+2)+a_(n−1). ¿Cuál es b_${n}? Interpreta primero los dos índices.`;
  label="Calcula la parte que depende del índice en la nueva expresión";
  formula=stage===3?`bₙ=2(${m})n+(2×${b}+${m}); b_${n}=${answer}`:`a_${target}=${m}×${target}+${b}=${answer}`;
  explanation=stage===1?`Se sustituye n=${n} en la regla y se obtiene ${answer}.`:
   stage===2?`El índice solicitado es ${n}+2=${target}; al evaluar a_${target} se obtiene ${answer}.`:
   `Al combinar a_(n+2)+a_(n−1) resulta 2×${m}×n+2×${b}+${m}. Para n=${n}, b_${n}=${answer}.`;
  operation=stage===1?"evaluar-termino-lineal":stage===2?"trasladar-indice-y-evaluar":"combinar-dos-terminos-algebraicos-y-evaluar";
  trueClaim=`El término solicitado se calcula con coeficiente ${coefficient}, índice ${target} y constante ${constant}.`;
  wrongA=`Se puede omitir la constante ${constant} y el resultado será exactamente el mismo.`;
  wrongB=`Es equivalente reemplazar el índice ${target} por ${target+1} sin variar el valor final.`;
 }
 if(!Number.isInteger(answer)||!Number.isInteger(intermediate))throw Error("Resultado no entero en progresión");
 return {prompt,result:q(answer),inputs:nextInputs,intermediate:q(intermediate),
  explanation,formula,cognitiveStage:stage,operation,requiredEvidence,
  procedure:{label,value:q(intermediate)},
  claims:[
   {text:trueClaim,truth:true},
   {text:wrongA,truth:false},
   {text:wrongB,truth:false}
  ]};
}
