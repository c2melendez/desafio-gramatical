import type {Level} from "./grammar";
import {graphY,type GraphData,type GraphSkill} from "./function-graph-lab";
import type {CognitiveChallenge} from "./math-cognitive-progression";

const num=(n:number)=>String(Number(n.toFixed(3)));
const interval=(a:number,b:number)=>`[${num(a)}, ${num(b)}]`;
const point=(x:number,y:number)=>`(${num(x)}, ${num(y)})`;
function slopeInterval(g:GraphData,direction:"up"|"down",transform:(x:number)=>number):string{
 const [a,b,c]=g.xs,[u,v,w]=g.ys;
 const first=direction==="up"?v>u:v<u;
 const second=direction==="up"?w>v:w<v;
 if(first&&second)return interval(transform(a),transform(c));
 if(first)return interval(transform(a),transform(b));
 if(second)return interval(transform(b),transform(c));
 return "Ninguno";
}
/** Stage 2: single graph transformation. Stage 3: composition of
 * horizontal scaling/translation, vertical reflection or evaluation. */
export function functionChallenge(g:GraphData,skill:GraphSkill,level:Level):CognitiveChallenge|null{
 if(level==="principiante")return null;
 const advanced=level==="avanzado";
 const stage:2|3=advanced?3:2;
 const [a,,c]=g.xs,lo=Math.min(...g.ys),hi=Math.max(...g.ys);
 const evidence=advanced?["interpretar-grafica","identificar-transformaciones","componer-transformaciones","verificar-propiedad"]:["interpretar-grafica","aplicar-transformacion","inferir-propiedad"];
 let answer="",prompt="",explanation="",distractors:string[]=[];
 let operation="";
 if(skill==="domain"){
  operation=advanced?"dominio-transformacion-afin":"dominio-traslacion";
  answer=advanced?interval((a+2)/2,(c+2)/2):interval(a+2,c+2);
  prompt=advanced?"Si g(x)=f(2x−2), ¿cuál es el dominio de g?":"Si g(x)=f(x−2), ¿cuál es el dominio de g?";
  explanation=advanced?`Se exige ${a} ≤ 2x−2 ≤ ${c}; al despejar, el dominio es ${answer}.`:`El argumento x−2 recorre [${a}, ${c}] cuando x recorre ${answer}.`;
  distractors=[interval(a,c),interval(a-2,c-2),interval(a+2,c+2),interval((a+2)/2,(c+2)/2)];
 }
 if(skill==="range"){
  operation=advanced?"rango-reflexion-escala":"rango-traslacion-vertical";
  answer=advanced?interval(3-2*hi,3-2*lo):interval(lo+3,hi+3);
  prompt=advanced?"Si g(x)=3−2f(x), ¿cuál es su rango?":"Si g(x)=f(x)+3, ¿cuál es su rango?";
  explanation=advanced?`El factor negativo invierte los extremos: el mínimo es 3−2(${hi}) y el máximo 3−2(${lo}). Rango ${answer}.`:`Sumar 3 a todas las alturas traslada ambos extremos: ${answer}.`;
  distractors=[interval(lo,hi),interval(lo+3,hi+3),interval(3-2*lo,3-2*hi),interval(-hi,-lo)];
 }
 if(skill==="increasing"||skill==="decreasing"){
  const direction=skill==="increasing"?"up":"down";
  operation=advanced?"monotonia-reflexion-y-escala":"monotonia-traslacion";
  const mapped=(x:number)=>advanced?(x+2)/2:x+2;
  answer=slopeInterval(g,advanced?(direction==="up"?"down":"up"):direction,mapped);
  prompt=advanced?`Para g(x)=−f(2x−2), ¿en qué intervalo g es estrictamente ${direction==="up"?"creciente":"decreciente"}?`:`Para g(x)=f(x−2), ¿en qué intervalo g es estrictamente ${direction==="up"?"creciente":"decreciente"}?`;
  explanation=advanced?`La reflexión vertical invierte crecimiento y decrecimiento; 2x−2 desplaza y comprime los intervalos en x. Resultado: ${answer}.`:`Trasladar horizontalmente dos unidades conserva la dirección de los tramos y desplaza sus intervalos. Resultado: ${answer}.`;
  distractors=[slopeInterval(g,direction,x=>x),slopeInterval(g,direction,x=>x+2),slopeInterval(g,direction,x=>(x+2)/2),slopeInterval(g,direction==="up"?"down":"up",x=>x+2),interval(a,c),"Ninguno"];
 }
 if(skill==="y-intercept"){
  operation=advanced?"interseccion-evaluacion-compuesta":"interseccion-traslacion-vertical";
  const y=advanced?2*graphY(g,-1)!+3:graphY(g,0)!+3;
  answer=point(0,y);
  prompt=advanced?"Si g(x)=2f(x−1)+3, ¿en qué punto g corta el eje Y?":"Si g(x)=f(x)+3, ¿en qué punto g corta el eje Y?";
  explanation=advanced?`Para cortar el eje Y usamos x=0: g(0)=2f(−1)+3=${num(y)}. Punto ${answer}.`:`g(0)=f(0)+3=${num(y)}. La intersección es ${answer}.`;
  distractors=[point(0,graphY(g,0)!),point(0,graphY(g,0)!+3),point(0,2*graphY(g,0)!+3),point(0,graphY(g,-1)!),point(0,y+2)];
 }
 if(skill==="x-intercept"){
  const root=g.xs[1];
  operation=advanced?"raiz-transformacion-afin":"raiz-traslacion-horizontal";
  answer=advanced?point((root+2)/2,0):point(root+2,0);
  prompt=advanced?"Si g(x)=−2f(2x−2), ¿cuál es el punto de intersección de g con el eje X?":"Si g(x)=f(x−2), ¿cuál es su punto de intersección con el eje X?";
  explanation=advanced?`El factor vertical −2 no cambia las raíces. Se resuelve 2x−2=${root}; resulta ${answer}.`:`Se resuelve x−2=${root}; la nueva raíz es ${answer}.`;
  distractors=[point(root,0),point(root+2,0),point((root+2)/2,0),point(root-2,0),point((root-2)/2,0)];
 }
 // Numeric alternatives use the same coordinate/interval type as the answer.
 const extra:string[]=[];
 for(let k=1;k<12;k++){
  if(skill==="domain"||skill==="range")extra.push(interval(a-9-k,c+9+k));
  else if(skill==="increasing"||skill==="decreasing")extra.push(interval(a-9-k,c+9+k));
  else if(skill==="y-intercept")extra.push(point(0,20+k));
  else extra.push(point(15+k,0));
 }
 const unique=[...new Set(distractors.filter(x=>x!==answer).concat(extra))].slice(0,3);
 if(unique.length!==3)throw Error("Distractores insuficientes: "+skill);
 return {stage,operation,requiredEvidence:evidence,prompt,answer,distractors:unique,explanation};
}
