import type {Level} from "./grammar";
import {advancedFunctionChallenge} from "./function-advanced-cognitive-challenges";
import type {CognitiveStage} from "./math-cognitive-progression";

/** Additional original practice; not a claim of official PHUMA item frequency.
 * Models are finite: a quadratic on a closed domain, or two linear pieces
 * meeting at x=0 with an open left endpoint and a closed right endpoint. */
export type ExtendedSkill =
 "vertex"|"quadratic-range"|"quadratic-roots"|"quadratic-growth"|
 "jump-value"|"jump-left-limit"|"jump-continuity"|"jump-range";
export const EXTENDED_SKILLS:ExtendedSkill[]=[
 "vertex","quadratic-range","quadratic-roots","quadratic-growth",
 "jump-value","jump-left-limit","jump-continuity","jump-range"];
export const EXTENDED_SKILL_LABEL:Record<ExtendedSkill,string>={
 vertex:"Vértice de parábola",
 "quadratic-range":"Rango de parábola",
 "quadratic-roots":"Múltiples intersecciones",
 "quadratic-growth":"Crecimiento de parábola",
 "jump-value":"Valor en una discontinuidad",
 "jump-left-limit":"Límite por la izquierda",
 "jump-continuity":"Continuidad en un punto",
 "jump-range":"Rango con extremos abiertos"};
export type QuadraticGraph={kind:"quadratic";h:number;a:number;k:number;radius:3};
export type JumpGraph={kind:"jump";leftIntercept:number;rightIntercept:number;leftOpen:true;rightClosed:true};
export type ExtendedGraph=QuadraticGraph|JumpGraph;
export type ExtendedTask={
 id:string;level:Level;skill:ExtendedSkill;graph:ExtendedGraph;
 cognitiveStage:CognitiveStage;operation:string;requiredEvidence:string[];
 prompt:string;options:string[];answer:string;answerIndex:number;explanation:string;
 source:"practica-complementaria-analisis-funciones";
 visualRequirement:"essential";
};
const number=(n:number)=>Number.isInteger(n)?String(n):String(Number(n.toFixed(2)));
const pair=(x:number,y:number)=>`(${number(x)}, ${number(y)})`;
const interval=(a:number,b:number,end:"]"|")"="]")=>`[${number(a)}, ${number(b)}${end}`;

export function extendedGraph(index:number,level:Level,skill:ExtendedSkill):ExtendedGraph {
 if(!Number.isInteger(index)||index<0||index>=96)throw Error("Índice del laboratorio II inválido");
 const variant=Math.floor(index/8),degree=level==="principiante"?0:level==="intermedio"?1:2;
 if(skill.startsWith("quadratic")||skill==="vertex"){
  const h=(variant+degree)%5-2,sign=(variant+degree)%2===0?1:-1;
  const a=sign*(variant%3===0?0.5:1),k=-4*a;
  return {kind:"quadratic",h,a,k,radius:3};
 }
 const leftIntercept=2+(variant+degree)%2;
 const rightIntercept=(variant+degree)%3===0?leftIntercept:-2-(variant%2);
 return {kind:"jump",leftIntercept,rightIntercept,leftOpen:true,rightClosed:true};
}
export function extendedOracle(graph:ExtendedGraph,skill:ExtendedSkill):string {
 if(graph.kind==="quadratic"){
  const {h,a,k,radius}=graph,end=k+a*radius*radius;
  switch(skill){
   case "vertex":return pair(h,k);
   case "quadratic-range":return interval(Math.min(k,end),Math.max(k,end));
   case "quadratic-roots":return `${pair(h-2,0)} y ${pair(h+2,0)}`;
   case "quadratic-growth":return a>0?interval(h,h+radius):interval(h-radius,h);
   default:throw Error("Habilidad incompatible con parábola");
  }
 }
 const p=graph.leftIntercept,q=graph.rightIntercept;
 switch(skill){
 case "jump-value":return number(q);
 case "jump-left-limit":return number(p);
 case "jump-continuity":return p===q?"Sí, es continua":"No, tiene un salto";
 case "jump-range":{
  const low=Math.min(p-4,q),leftHigh=p,rightHigh=q+4;
  return interval(low,Math.max(leftHigh,rightHigh),rightHigh>=leftHigh?"]":")");
 }
 default:throw Error("Habilidad incompatible con función por tramos");
 }
}
const prompts:Record<ExtendedSkill,string>={
 vertex:"¿Cuáles son las coordenadas del vértice de la parábola?",
 "quadratic-range":"¿Qué intervalo de valores de y alcanza esta parábola en el dominio dibujado?",
 "quadratic-roots":"¿Cuáles son todos los puntos donde la parábola corta el eje x?",
 "quadratic-growth":"¿En qué intervalo de su dominio la parábola es estrictamente creciente?",
 "jump-value":"¿Cuál es el valor de f(0)? Presta atención al punto lleno.",
 "jump-left-limit":"¿A qué valor se acerca f(x) cuando x se aproxima a 0 por la izquierda?",
 "jump-continuity":"¿Es continua la función en x=0, considerando los límites y el valor definido?",
 "jump-range":"¿Cuál es el rango completo de la función, considerando círculos abiertos y cerrados?"};
function distractors(graph:ExtendedGraph,skill:ExtendedSkill,correct:string):string[]{
 if(graph.kind==="quadratic"){
  const {h,a,k,radius}=graph,end=k+a*radius*radius;
  if(skill==="vertex")return [pair(h+1,k),pair(h,k+1),pair(-h,k)];
  if(skill==="quadratic-range")return [interval(Math.min(k,end),Math.max(k,end),")"),
    interval(h-radius,h+radius),interval(Math.min(k,end)-1,Math.max(k,end))];
  if(skill==="quadratic-roots")return [pair(h-2,0),pair(h+2,0),
    `${pair(h-1,0)} y ${pair(h+1,0)}`];
  if(skill==="quadratic-growth")return [a>0?interval(h-radius,h):interval(h,h+radius),
    interval(h-radius,h+radius),interval(h-1,h+1)];
 }
 if(graph.kind==="jump"){
  const {leftIntercept:p,rightIntercept:q}=graph;
  if(skill==="jump-value")return [number(p),number(q+1),number(q-1)];
  if(skill==="jump-left-limit")return [number(q),number(p+1),number(p-1)];
  if(skill==="jump-continuity")return ["Sí, es continua","No, tiene un salto",
    "No está definida en x=0","No tiene límite por la derecha"];
  if(skill==="jump-range"){
   const low=Math.min(p-4,q),hi=Math.max(p,q+4);
   return [interval(low,hi,")"),interval(low,hi),interval(low+1,hi)];
  }
 }
 throw Error("No hay distractores para "+skill);
}
function makeOptions(graph:ExtendedGraph,skill:ExtendedSkill,index:number){
 const answer=extendedOracle(graph,skill);
 const candidates=[answer,...distractors(graph,skill,answer)];
 for(let n=1;n<8;n++)candidates.push(
  graph.kind==="quadratic"?(skill==="quadratic-roots"?pair(graph.h+n,0):
  skill==="vertex"?pair(graph.h+n,graph.k+n):interval(-n,n)):
  skill==="jump-range"?interval(-n,n):skill==="jump-continuity"?"No se puede determinar":number(n+6));
 const distinct=[...new Set(candidates)].slice(0,4);
 if(distinct.length!==4)throw Error("No hay cuatro distractores únicos: "+skill);
 const offset=index%4;
 const options=[...distinct.slice(offset),...distinct.slice(0,offset)];
 return {answer,options,answerIndex:options.indexOf(answer)};
}
export function extendedTask(index:number,level:Level):ExtendedTask{
 const skill=EXTENDED_SKILLS[index%8],graph=extendedGraph(index,level,skill);
 const baseline=makeOptions(graph,skill,index),challenge=advancedFunctionChallenge(graph,skill,level);
 const answer=challenge?.answer??baseline.answer;
 const alternatives=challenge?[answer,...challenge.distractors]:baseline.options;
 const shift=index%4,options=challenge?[...alternatives.slice(shift),...alternatives.slice(0,shift)]:baseline.options;
 const answerIndex=options.indexOf(answer);
 const explanation=graph.kind==="quadratic"
  ?`La parábola tiene vértice ${pair(graph.h,graph.k)}, extremos definidos en x=${graph.h-3} y x=${graph.h+3}, y corta el eje x en ${graph.h-2} y ${graph.h+2}. Su concavidad es ${graph.a>0?"hacia arriba":"hacia abajo"}. La respuesta es ${answer}.`
  :`En x=0 el punto izquierdo (${pair(0,graph.leftIntercept)}) está abierto y el punto derecho (${pair(0,graph.rightIntercept)}) está cerrado. Se distingue valor de función, límite lateral y rango de los dos segmentos. La respuesta es ${answer}.`;
 return {id:`math-graph-v2-${level}-${index}`,skill,level,graph,prompt:challenge?.prompt??prompts[skill],
   answer,options,answerIndex,explanation:challenge?challenge.explanation+` Respuesta correcta: ${answer}.`:explanation,
   cognitiveStage:challenge?.stage??1,operation:challenge?.operation??skill,
   requiredEvidence:challenge?.requiredEvidence??["interpretar-representacion","reconocer-propiedad"],
   source:"practica-complementaria-analisis-funciones",
   visualRequirement:"essential"};
}
export function extendedPool(level:Level):ExtendedTask[]{
 return Array.from({length:96},(_,i)=>extendedTask(i,level));
}
