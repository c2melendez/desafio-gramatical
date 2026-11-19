import type {Level} from "./grammar";

/** Original supplementary practice: functional analysis is not separately itemized
 * in the 2026 UNAH PHUMA topic outline (p. 6). Every answer follows from the plotted data. */
export type GraphSkill="domain"|"range"|"increasing"|"decreasing"|"y-intercept"|"x-intercept";
export const GRAPH_SKILLS:GraphSkill[]=["domain","range","increasing","decreasing","y-intercept","x-intercept"];
export const GRAPH_SKILL_NAMES:Record<GraphSkill,string>={
 domain:"Dominio",range:"Rango",increasing:"Intervalos de crecimiento",
 decreasing:"Intervalos de decrecimiento","y-intercept":"Intersección con el eje y",
 "x-intercept":"Intersección con el eje x"};
export type GraphData={xs:[number,number,number];ys:[number,number,number];closed:true};
export type GraphTask={
 id:string;skill:GraphSkill;level:Level;graph:GraphData;
 prompt:string;options:string[];answerIndex:number;answer:string;explanation:string;
 source:"practica-complementaria-analisis-funciones";visualRequirement:"essential";
};
const profiles:[number,number,number][]=[
 [-4,-1,3],[4,2,-2],[-3,4,1],[4,-3,2],[-4,0,4],[4,0,-4],
 [3,0,3],[-3,0,-3],[-4,-1,-3],[4,1,3],[-2,2,-4],[2,-2,4]
];
export function makeGraph(index:number,level:Level,skill:GraphSkill):GraphData{
 if(!Number.isInteger(index)||index<0||index>=72)throw Error("Índice de gráfica inválido");
 const variant=Math.floor(index/6);
 const degree=level==="principiante"?0:level==="intermedio"?1:2;
 // A known zero vertex makes the x-axis intersection exact, unique and testable.
 if(skill==="x-intercept"){
  const mid=(variant+degree)%5-2;
  const left=2+(variant+degree)%3,right=2+(variant*3+degree)%4;
  const sign=variant%2?-1:1;
  return {xs:[mid-4,mid,mid+4],ys:[sign*left,0,sign*right],closed:true};
 }
 const mid=skill==="y-intercept"?0:degree===0?0:(variant+degree)%5-2;
 const original=profiles[(variant+degree*3)%profiles.length];
 return {xs:[mid-4,mid,mid+4],ys:[...original] as [number,number,number],closed:true};
}
export function graphY(g:GraphData,x:number):number|undefined{
 const [a,b,c]=g.xs,[u,v,w]=g.ys;
 if(x<a||x>c)return undefined;
 if(x<=b)return u+(v-u)*(x-a)/(b-a);
 return v+(w-v)*(x-b)/(c-b);
}
const interval=(a:number,b:number)=>`[${a}, ${b}]`;
const point=(x:number,y:number)=>`(${x}, ${y})`;
export function graphCorrectAnswer(g:GraphData,skill:GraphSkill):string {
 const [a,b,c]=g.xs,[u,v,w]=g.ys;
 switch(skill){
 case "domain":return interval(a,c);
 case "range":return interval(Math.min(u,v,w),Math.max(u,v,w));
 case "increasing":return v>u&&w>v?interval(a,c):v>u?interval(a,b):w>v?interval(b,c):"Ninguno";
 case "decreasing":return v<u&&w<v?interval(a,c):v<u?interval(a,b):w<v?interval(b,c):"Ninguno";
 case "y-intercept":return point(0,graphY(g,0)!);
 case "x-intercept":{
  if(v!==0||u*w<=0)throw Error("La intersección con el eje x no es única");
  return point(b,0);
 }
 }
}
function distractors(g:GraphData,skill:GraphSkill):string[]{
 const [a,b,c]=g.xs,[u,v,w]=g.ys;
 switch(skill){
 case "domain":return [interval(a,c),`(${a}, ${c})`,interval(a+1,c-1),interval(Math.min(u,v,w),Math.max(u,v,w))];
 case "range":{
  const lo=Math.min(u,v,w),hi=Math.max(u,v,w);
  return [interval(lo,hi),`(${lo}, ${hi})`,interval(lo+1,hi+1),interval(a,c)];
 }
 case "increasing":case "decreasing":return [graphCorrectAnswer(g,skill),interval(a,b),interval(b,c),interval(a,c),"Ninguno"];
 case "y-intercept":return [point(0,graphY(g,0)!),point(0,v+1),point(0,v-1),point(0,v+2)];
 case "x-intercept":return [point(b,0),point(b+1,0),point(b-1,0),point(a,0)];
 }
}
function choices(g:GraphData,skill:GraphSkill,seed:number){
 const answer=graphCorrectAnswer(g,skill);
 const candidates=[answer,...distractors(g,skill)];
 // Alternatives remain distinct even if domain and range happen to coincide.
 for(let n=1;n<8;n++)candidates.push(skill==="domain"||skill==="range"?interval(g.xs[0]-n,g.xs[2]+n):skill==="increasing"||skill==="decreasing"?`(${g.xs[0]-n}, ${g.xs[2]+n})`:point(0,graphY(g,0)!+n));
 const options=[...new Set(candidates)].slice(0,4);
 if(options.length!==4)throw Error("Distractores insuficientes: "+skill);
 const shift=seed%4;
 const rotated=[...options.slice(shift),...options.slice(0,shift)];
 return {answer,options:rotated,answerIndex:rotated.indexOf(answer)};
}
const prompts:Record<GraphSkill,string>={
 domain:"¿Cuál es el dominio de la función representada, considerando los extremos dibujados?",
 range:"¿Cuál es el rango de valores de y de la función representada?",
 increasing:"¿En qué intervalo es estrictamente creciente la función? Si no hay, elige «Ninguno».",
 decreasing:"¿En qué intervalo es estrictamente decreciente la función? Si no hay, elige «Ninguno».",
 "y-intercept":"¿En qué punto corta esta gráfica el eje vertical (y)?",
 "x-intercept":"¿En qué punto corta esta gráfica el eje horizontal (x)?"};
export function graphTask(index:number,level:Level):GraphTask{
 const skill=GRAPH_SKILLS[index%GRAPH_SKILLS.length];
 const graph=makeGraph(index,level,skill),{answer,options,answerIndex}=choices(graph,skill,index+GRAPH_SKILLS.indexOf(skill));
 const [a,b,c]=graph.xs,[u,v,w]=graph.ys;
 let reason="";
 if(skill==="domain")reason=`El trazo comienza en x=${a} y termina en x=${c}; ambos extremos están rellenos, así que se incluyen.`;
 if(skill==="range")reason=`La gráfica conecta segmentos continuos: la menor altura es ${Math.min(u,v,w)} y la mayor es ${Math.max(u,v,w)}; se alcanzan en vértices incluidos.`;
 if(skill==="increasing"||skill==="decreasing"){
  reason=`De x=${a} a x=${b}, y pasa de ${u} a ${v}; de x=${b} a x=${c}, pasa de ${v} a ${w}. Se compara la dirección de ambos tramos y se combinan si conservan el mismo sentido.`;
 }
 if(skill==="y-intercept")reason=`El eje vertical corresponde a x=0. La función toma y=${graphY(graph,0)} en ese punto; la intersección se expresa como par ordenado.`;
 if(skill==="x-intercept")reason=`El eje horizontal corresponde a y=0. La gráfica toca el eje en x=${b}; ambos segmentos restantes tienen altura de igual signo y no ofrecen otros cortes.`;
 return {id:`math-graph-v1-${level}-${index}`,skill,level,graph,prompt:prompts[skill],answer,options,answerIndex,
  explanation:reason+` Por tanto, la respuesta correcta es ${answer}.`,
  source:"practica-complementaria-analisis-funciones",visualRequirement:"essential"};
}
export function graphPool(level:Level):GraphTask[]{return Array.from({length:72},(_,i)=>graphTask(i,level))}
