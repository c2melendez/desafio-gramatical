import type {Level} from "./grammar";
import type {Rational} from "./math-m1";
import type {CorePedagogy} from "./math-m1-core-pedagogy";

export const ARITHMETIC_SUBTOPICS=["Operaciones","Fracciones","Porcentajes","Proporciones","Potencias","MCD y MCM"] as const;
export type ArithmeticSubtopic=typeof ARITHMETIC_SUBTOPICS[number];
const gcd=(x:number,y:number):number=>{let a=Math.abs(x),b=Math.abs(y);while(b){const r=a%b;a=b;b=r;}return a||1;};
const q=(n:number,d=1):Rational=>{if(!Number.isInteger(n)||!Number.isInteger(d)||d===0)throw Error("Fracción inválida");const k=gcd(n,d),sign=d<0?-1:1;return {n:sign*n/k,d:Math.abs(d)/k};};
const add=(a:Rational,b:Rational)=>q(a.n*b.d+b.n*a.d,a.d*b.d);
const fmt=(v:Rational)=>v.d===1?String(v.n):v.n+"/"+v.d;
const evidence=[["leer-condiciones","aplicar-operacion-directa"],["identificar-cambio","ajustar-modelo","calcular-resultado"],["interpretar-multiples-condiciones","seleccionar-procedimiento","combinar-inferencias","comprobar-resultado"]] as const;
const desc=(subtopic:string,stage:number)=>({
 "Operaciones":["prioridad-de-operaciones","modificar-parentesis-y-factor","distributiva-y-cancelacion"],
 "Fracciones":["suma-con-denominador-comun","operacion-inversa-de-fracciones","combinacion-de-fracciones-con-signos"],
 "Porcentajes":["porcentaje-directo","porcentaje-de-restante","descuentos-consecutivos"],
 "Proporciones":["razon-directa","ajustar-cantidad-con-bonificacion","escalado-de-cantidad-y-descuento"],
 "Potencias":["calcular-potencia","producto-de-potencias-misma-base","potencia-de-potencia-y-cociente"],
 "MCD y MCM":["identificar-divisibilidad","relacion-mcd-mcm","escalado-y-relacion-mcd-mcm"]
} as Record<string,string[]>)[subtopic][stage-1];

export function arithmeticPedagogy(subtopic:string,level:Level,inputs:number[]):CorePedagogy|null{
 if(!ARITHMETIC_SUBTOPICS.some(x=>x===subtopic))return null;
 const stage:1|2|3=level==="principiante"?1:level==="intermedio"?2:3;
 let prompt="",result=q(0),intermediate=q(0),nextInputs:number[]=[],explanation="",formula="",label="",correct="",incorrect1="",incorrect2="";
 if(subtopic==="Operaciones"){
  const [a,b,c]=inputs;
  if(stage===1){nextInputs=[a,b,c];prompt=`Resuelve (${a}+${b})×${c}. ¿Cuál es el resultado?`;}
  else if(stage===2){nextInputs=[a,b+2,c-1];prompt=`La expresión original es (${a}+${b})×${c}. Si el segundo sumando aumenta 2 y el factor exterior disminuye 1, ¿cuánto vale la expresión modificada?`;}
  else {nextInputs=[0,b,c];prompt=`Sin calcular por separado los dos productos, usa la propiedad distributiva para simplificar (${a}+${b})×${c}−${a}×${c}. ¿Cuál es su valor?`;}
  const [u,v,w]=nextInputs;
  intermediate=q(u+v);result=q((u+v)*w);label="Calcula la suma que queda dentro del paréntesis";
  explanation=stage===3?`Distribuir y cancelar ${a}×${c} deja ${b}×${c}=${fmt(result)}.`:`Después de aplicar las condiciones, el paréntesis vale ${u}+${v}=${u+v}; multiplicar por ${w} da ${fmt(result)}.`;
  formula=`(${u}+${v})×${w}=${fmt(result)}`;
  correct=`Es válido resolver primero ${u}+${v} y multiplicar su resultado por ${w}.`;
  incorrect1=`Es válido multiplicar solo el primer sumando ${u} por ${w} y después sumar ${v} sin multiplicarlo.`;
  incorrect2=`Es válido sumar ${u}+${v}+${w} sin respetar el producto indicado.`;
 }else if(subtopic==="Fracciones"){
  const [x,y,u,v]=inputs;
  if(stage===1){nextInputs=[x,y,u,v];prompt=`Suma y simplifica las fracciones ${x}/${y} y ${u}/${v}.`;}
  else if(stage===2){nextInputs=[x,y,0,v];prompt=`Se obtuvo la suma S=${x}/${y}+${u}/${v}. Si a S se le resta exactamente ${u}/${v}, ¿qué fracción simplificada queda? Usa la operación inversa.`;}
  else {nextInputs=[3*x,y,-u,v];prompt=`A partir de ${x}/${y} y ${u}/${v}, calcula 3×(${x}/${y})−${u}/${v}. Primero combina las operaciones y luego simplifica la fracción.`;}
  const [A,B,C,D]=nextInputs;
  intermediate=q(B*D);result=add(q(A,B),q(C,D));
  label="Encuentra un denominador común para la expresión transformada";
  explanation=`La expresión equivalente es ${A}/${B}+${C}/${D}. El denominador común ${B}×${D}=${B*D} permite combinar los numeradores; simplificando se obtiene ${fmt(result)}.`;
  formula=`${A}/${B}+${C}/${D}=${fmt(result)}`;
  correct=`Para sumar ${A}/${B} y ${C}/${D}, se usan denominadores compatibles antes de sumar los numeradores.`;
  incorrect1="Para sumar fracciones de distinto denominador, basta sumar directamente sus dos denominadores y los numeradores.";
  incorrect2="Al sumar fracciones de diferente denominador, es válido ignorar el signo negativo del numerador.";
 }else if(subtopic==="Porcentajes"){
  const [base,pct]=inputs;
  if(stage===1){nextInputs=[base,pct];prompt=`Una compra vale L ${base}. ¿Cuánto es el ${pct}% de ese precio?`;}
  else if(stage===2){nextInputs=[base,100-pct];prompt=`Una compra vale L ${base}. Si se aplica un descuento del ${pct}%, ¿cuántos lempiras se pagan después del descuento?`;}
  else {const remaining=base*(100-pct)/100;if(!Number.isInteger(remaining))throw Error("Descuento intermedio no entero");nextInputs=[remaining,90];prompt=`Una compra vale L ${base}. Se aplica primero un descuento del ${pct}% y luego otro descuento del 10% sobre el precio ya rebajado. ¿Cuántos lempiras se pagan al final?`;}
  const [b,p]=nextInputs;
  result=q(b*p,100);intermediate=stage===3?q(base*(100-pct),100):q(p,100);
  label=stage===3?"Calcula el precio después del primer descuento":"Expresa el porcentaje aplicado como fracción de 100";
  explanation=stage===3?`Primero L ${base}×(100−${pct})/100=L ${fmt(intermediate)}. Luego se paga el 90% del precio rebajado: L ${fmt(result)}. Los porcentajes consecutivos no se suman.`:`El porcentaje relevante es ${p}% sobre L ${b}. El resultado es ${b}×${p}/100=L ${fmt(result)}.`;
  formula=`${b}×${p}/100=${fmt(result)}`;
  correct=`El porcentaje efectivo de esta etapa es ${p}% de L ${b}, no un monto fijo independiente del precio.`;
  incorrect1=`Para calcular el porcentaje de L ${b}, se multiplica por ${p} sin dividir entre 100.`;
  incorrect2="Dos descuentos sucesivos siempre equivalen a sumar sus porcentajes sobre el precio original.";
 }else if(subtopic==="Proporciones"){
  const [units,total,needed]=inputs;
  if(stage===1){nextInputs=[units,total,needed];prompt=`Si ${units} cuadernos cuestan L ${total}, ¿cuánto cuestan ${needed} cuadernos al mismo precio?`;}
  else if(stage===2){nextInputs=[units,total,needed-1];prompt=`Si ${units} cuadernos cuestan L ${total}, al pedir ${needed} cuadernos la tienda regala uno y cobra solo los otros. ¿Cuánto se paga?`;}
  else {nextInputs=[units*10,total*9,needed*2];prompt=`Si ${units} cuadernos cuestan L ${total}, se solicitan ${needed*2} unidades y se aplica un descuento del 10% al precio unitario original. ¿Cuál es el total a pagar?`;}
  const [n,t,k]=nextInputs;
  result=q(t*k,n);intermediate=q(t,n);label="Encuentra el precio unitario efectivo";
  explanation=`La relación transformada equivale a un precio unitario de L ${fmt(intermediate)}. Para ${k} unidades se calcula ${t}×${k}/${n}=L ${fmt(result)}.`;
  formula=`(${t}/${n})×${k}=${fmt(result)}`;
  correct=`La proporcionalidad directa exige dividir L ${t} entre ${n} unidades antes de multiplicar por ${k}.`;
  incorrect1="El precio total puede calcularse multiplicando el precio del lote por el número de unidades sin dividir por la cantidad original.";
  incorrect2="Al aumentar la cantidad de cuadernos, el precio unitario debe aumentar automáticamente en el mismo factor.";
 }else if(subtopic==="Potencias"){
  const [base,exp]=inputs;
  if(stage===1){nextInputs=[base,exp];prompt=`Calcula ${base}^${exp}.`;}
  else if(stage===2){nextInputs=[base,exp+2];prompt=`Sin expandir todos los factores, utiliza el producto de potencias de igual base para calcular ${base}^${exp}×${base}².`;}
  else {nextInputs=[base,2*exp-3];prompt=`Aplica potencia de una potencia y cociente de potencias de igual base: (${base}^${exp})² ÷ ${base}³. ¿Cuál es el valor?`;}
  const [b,e]=nextInputs;
  result=q(b**e);intermediate=q(b**(e-1));label="Calcula la potencia parcial anterior al último factor";
  explanation=stage===1?`La base ${b} se multiplica ${e} veces; el resultado es ${fmt(result)}.`:stage===2?`Al multiplicar potencias de base ${b} se suman exponentes: ${exp}+2=${e}. Resultado ${fmt(result)}.`:`La potencia de potencia produce exponente 2×${exp}; al dividir se resta 3, quedando ${e}. Resultado ${fmt(result)}.`;
  formula=`${b}^${e}=${fmt(result)}`;
  correct="En un producto de potencias de la misma base se suman los exponentes, sin sumar las bases.";
  incorrect1="En un producto de potencias de la misma base siempre se multiplican entre sí los exponentes.";
  incorrect2="En un cociente de potencias de la misma base, los exponentes se suman en lugar de restarse.";
 }else{
  const [a,b,flag]=inputs,complement=flag===0?1:0;
  const factor=stage===3?2:1;
  const targetFlag=stage===1?flag:complement;
  nextInputs=[factor*a,factor*b,targetFlag];
  const [A,B,F]=nextInputs,g=gcd(A,B),l=A*B/g;
  result=q(F===0?g:l);intermediate=q(g);label="Calcula el MCD de los dos valores del problema resultante";
  prompt=stage===1?`Encuentra el ${F===0?"MCD":"MCM"} de ${a} y ${b}.`:
    stage===2?`Para ${a} y ${b} se pide pasar del ${flag===0?"MCD":"MCM"} al ${F===0?"MCD":"MCM"}. Usa la relación entre ambos para encontrar el valor solicitado.`:
    `Se duplican ambos números ${a} y ${b}. Después se solicita el ${F===0?"MCD":"MCM"} de los números duplicados, no el valor original. ¿Cuál es el resultado?`;
  explanation=`Con los números ${A} y ${B}, el MCD es ${g} y el MCM se obtiene con ${A}×${B}/${g}=${l}. El valor solicitado es ${fmt(result)}.`;
  formula=`MCD(${A},${B})=${g}; MCM(${A},${B})=${l}; resultado=${fmt(result)}`;
  correct=`Para estos dos números, MCD×MCM debe ser igual a ${A}×${B}.`;
  incorrect1="El MCM siempre coincide con el producto de los dos números sin dividir por el MCD.";
  incorrect2="Duplicar ambos números deja inalterados tanto el MCD como el MCM.";
 }
 if(!Number.isInteger(intermediate.n)||!Number.isInteger(result.n))throw Error("Resultado no entero racional");
 return {prompt,result,inputs:nextInputs,intermediate,explanation,formula,
  cognitiveStage:stage,operation:desc(subtopic,stage),requiredEvidence:[...evidence[stage-1]],
  procedure:{label,value:intermediate},
  claims:[
   {text:correct,truth:true},
   {text:incorrect1,truth:false},
   {text:incorrect2,truth:false}
  ]};
}
