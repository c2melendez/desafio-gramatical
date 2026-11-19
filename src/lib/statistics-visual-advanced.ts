import type {Level} from "./grammar";
import {cognitiveChallenge,type CognitiveStage} from "./math-cognitive-progression";

/** Competencia de interpretación y dispersión, guía PRE-U UNAH 2026, p.6.
 * Todos los modelos son originales y describen conjuntos de datos íntegros. */
export type Stats2Skill="quartile-range"|"compare-spread"|"pie-proportion"|"cross-table";
export const STATS2_SKILLS:Stats2Skill[]=["quartile-range","compare-spread","pie-proportion","cross-table"];
export const STATS2_NAMES:Record<Stats2Skill,string>={
 "quartile-range":"Rango intercuartílico en un diagrama de puntos",
 "compare-spread":"Comparación de dispersión entre dos conjuntos",
 "pie-proportion":"Interpretación de un gráfico de sectores",
 "cross-table":"Porcentaje condicionado en tabla cruzada"};
export type DotPlot={kind:"dots";groups:[number[],number[]];};
export type PiePlot={kind:"pie";counts:[number,number,number];labels:["Lectura","Deportes","Arte"]};
export type CrossTable={kind:"cross";a:[number,number];b:[number,number];};
export type Stats2Stimulus=DotPlot|PiePlot|CrossTable;
export type Stats2Task={
 id:string;level:Level;skill:Stats2Skill;stimulus:Stats2Stimulus;
 cognitiveStage:CognitiveStage;operation:string;requiredEvidence:string[];
 prompt:string;options:string[];answer:string;answerIndex:number;
 explanation:string;visualRequirement:"essential";
 source:"phuma-dispersion-graficos"|"ampliacion-tablas-cruzadas";
};
const fmt=(n:number)=>Number.isInteger(n)?String(n):n.toFixed(1);
const sorted=(data:number[])=>[...data].sort((a,b)=>a-b);
export function iqr(data:number[]):number{
 if(data.length!==8)throw Error("El modelo exige ocho datos");
 const s=sorted(data);return (s[5]+s[6]-s[1]-s[2])/2;
}
export function stats2Stimulus(index:number,level:Level,skill:Stats2Skill):Stats2Stimulus{
 if(!Number.isInteger(index)||index<0||index>=72)throw Error("Índice inválido");
 const variant=Math.floor(index/4),d=level==="principiante"?0:level==="intermedio"?1:2;
 if(skill==="quartile-range"||skill==="compare-spread"){
  const base=2+(variant+d)%6,wide=2+(variant*2+d)%4;
  // Two symmetric eight-observation groups; group A deliberately has wider middle half.
  const a=[base,base+1,base+1,base+2,base+wide+3,base+wide+4,base+wide+4,base+wide+5];
  const b=[base+1,base+2,base+2,base+3,base+4,base+5,base+5,base+6];
  return {kind:"dots",groups:[a,b]};
 }
 if(skill==="pie-proportion"){
  const a=2+(variant+d)%5,b=3+(variant*2+d)%5,c=3+(variant+d*2)%5;
  return {kind:"pie",counts:[a*2,b*2,c*2],labels:["Lectura","Deportes","Arte"]};
 }
 const a: [number,number]=[4+(variant+d)%7,3+(variant*2+d)%6];
 const b: [number,number]=[2+(variant*3+d)%7,4+(variant+d)%6];
 return {kind:"cross",a,b};
}
export function stats2Oracle(s:Stats2Stimulus,skill:Stats2Skill):string{
 if(s.kind==="dots"){
  if(skill==="quartile-range")return `${fmt(iqr(s.groups[0]))} puntos`;
  if(skill==="compare-spread")return iqr(s.groups[0])>iqr(s.groups[1])?"Grupo A":"Grupo B";
 }
 if(s.kind==="pie"&&skill==="pie-proportion"){
  return `${fmt(100*s.counts[0]/s.counts.reduce((a,b)=>a+b,0))}%`;
 }
 if(s.kind==="cross"&&skill==="cross-table"){
  return `${fmt(100*s.a[0]/(s.a[0]+s.b[0]))}%`;
 }
 throw Error("Incompatibilidad");
}
const prompt:Record<Stats2Skill,string>={
 "quartile-range":"En el diagrama de puntos, ¿cuál es el rango intercuartílico del Grupo A? Utiliza la mediana de las mitades inferiores y superiores (8 observaciones).",
 "compare-spread":"¿Qué grupo tiene mayor dispersión según su rango intercuartílico? Compara la mitad central de cada distribución.",
 "pie-proportion":"¿Qué porcentaje del total corresponde al sector Lectura? Interpreta el tamaño relativo y el número de casos.",
 "cross-table":"Entre los estudiantes que prefieren Lectura, ¿qué porcentaje pertenece al Grupo A? Calcula el porcentaje condicionado por la columna Lectura."};
export function stats2Task(index:number,level:Level):Stats2Task{
 const skill=STATS2_SKILLS[index%4],stimulus=stats2Stimulus(index,level,skill);
 const challenge=cognitiveChallenge(stimulus,skill,level);
 const answer=challenge?challenge.answer:stats2Oracle(stimulus,skill);
 const candidates:string[]=[answer];
 let explanation="";
 if(stimulus.kind==="dots"){
  const a=iqr(stimulus.groups[0]),b=iqr(stimulus.groups[1]);
  explanation=`Ordenamos cada grupo y dividimos ocho observaciones en dos mitades de cuatro. Los rangos intercuartílicos son A = ${fmt(a)} y B = ${fmt(b)} puntos.`;
  if(skill==="quartile-range")candidates.push(...[b,a+1,a+2,a+3].map(n=>`${fmt(n)} puntos`));
  else candidates.push("Grupo A","Grupo B","Ambos tienen la misma dispersión","No puede determinarse");
 }
 if(stimulus.kind==="pie"){
  const total=stimulus.counts.reduce((a,b)=>a+b,0),n=stimulus.counts[0];
  explanation=`Lectura representa ${n} de ${total} casos; porcentaje = 100 × ${n} ÷ ${total}.`;
  candidates.push(...[1,2].map(i=>`${fmt(100*stimulus.counts[i]/total)}%`));
  candidates.push(`${fmt(n)}%`,`${fmt(100*(total-n)/total)}%`);
 }
 if(stimulus.kind==="cross"){
  const n=stimulus.a[0],column=n+stimulus.b[0];
  explanation=`Entre quienes prefieren Lectura hay ${column} estudiantes, de los cuales ${n} pertenecen al Grupo A. Porcentaje condicionado = 100 × ${n} ÷ ${column}.`;
  candidates.push(`${fmt(100*n/(stimulus.a[0]+stimulus.a[1]))}%`);
  candidates.push(`${fmt(100*stimulus.b[0]/column)}%`);
  candidates.push(`${fmt(100*n/(column+stimulus.a[1]+stimulus.b[1]))}%`);
 }
 if(challenge){
  candidates.length=1;
  candidates.push(...challenge.distractors);
  explanation=challenge.explanation;
 }
 // Numeric distractors must not become duplicate correct answers through rounding.
 for(let z=1;z<=14;z++)candidates.push(skill==="compare-spread"?"No se proporcionan datos suficientes":skill==="quartile-range"?`${z+15} puntos`:`${z+70}%`);
 const unique=[...new Set(candidates)].slice(0,4);
 if(unique.length!==4)throw Error("Cuatro alternativas únicas obligatorias");
 const shift=index%4,options=[...unique.slice(shift),...unique.slice(0,shift)];
 return {id:`math-stats-v2-${level}-${index}`,level,skill,stimulus,
  prompt:challenge?.prompt??prompt[skill],options,answer,answerIndex:options.indexOf(answer),
  cognitiveStage:challenge?.stage??1,operation:challenge?.operation??skill,
  requiredEvidence:challenge?.requiredEvidence??["leer-representacion","aplicar-operacion-directa"],
  explanation:`${explanation} Respuesta correcta: ${answer}.`,
  visualRequirement:"essential",source:skill==="cross-table"?"ampliacion-tablas-cruzadas":"phuma-dispersion-graficos"};
}
export function stats2Pool(level:Level):Stats2Task[]{return Array.from({length:72},(_,i)=>stats2Task(i,level))}
