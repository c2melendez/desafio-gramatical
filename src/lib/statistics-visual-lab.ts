import type {Level} from "./grammar";

/** Datos originales y sus oráculos. La guía PHUMA 2026, pág. 6, incluye
 * dispersión e interpretación de tablas, gráficas y figuras. Probabilidad
 * de un espacio muestral es complemento explícitamente identificado. */
export type StatsSkill="bar-difference"|"line-change"|"frequency-mode"|"frequency-range"|"frequency-median"|"sample-probability";
export const STATS_SKILLS:StatsSkill[]=["bar-difference","line-change","frequency-mode","frequency-range","frequency-median","sample-probability"];
export const STATS_SKILL_NAMES:Record<StatsSkill,string>={
 "bar-difference":"Comparar barras",
 "line-change":"Variación en gráfico de líneas",
 "frequency-mode":"Moda en tabla de frecuencias",
 "frequency-range":"Rango de datos agrupados en tabla",
 "frequency-median":"Mediana desde tabla de frecuencias",
 "sample-probability":"Probabilidad con espacio muestral"};
export type BarStimulus={kind:"bars";labels:["Lunes","Martes","Miércoles","Jueves"];values:[number,number,number,number];unit:"libros"};
export type LineStimulus={kind:"line";labels:["Enero","Febrero","Marzo","Abril"];values:[number,number,number,number];unit:"unidades"};
export type FrequencyStimulus={kind:"frequency";values:[number,number,number,number];frequencies:[number,number,number,number];unit:"puntos"};
export type SampleStimulus={kind:"sample";colors:("rojo"|"azul")[];unit:"fichas"};
export type StatsStimulus=BarStimulus|LineStimulus|FrequencyStimulus|SampleStimulus;
export type StatsTask={
 id:string;skill:StatsSkill;level:Level;stimulus:StatsStimulus;
 prompt:string;options:string[];answerIndex:number;answer:string;
 explanation:string;visualRequirement:"essential";
 source:"phuma-estadistica"|"complemento-probabilidad";
};
export function statsStimulus(index:number,level:Level,skill:StatsSkill):StatsStimulus{
 if(!Number.isInteger(index)||index<0||index>=72)throw Error("Índice estadístico inválido");
 const variant=Math.floor(index/6),difficulty=level==="principiante"?0:level==="intermedio"?1:2;
 if(skill==="bar-difference"){
  const a=8+((variant*3+difficulty)%11),delta=3+((variant+difficulty)%8);
  return {kind:"bars",labels:["Lunes","Martes","Miércoles","Jueves"],values:[a,a+delta,a+2,a+delta+3],unit:"libros"};
 }
 if(skill==="line-change"){
  const a=12+((variant*4+difficulty)%10),delta=2+((variant+difficulty)%7);
  return {kind:"line",labels:["Enero","Febrero","Marzo","Abril"],values:[a,a+delta,a+delta+4,a+delta+1],unit:"unidades"};
 }
 if(skill==="sample-probability"){
  const total=8+(variant%3)*2;
  const reds=2+((variant+difficulty)%4);
  const colors:Array<"rojo"|"azul">=Array.from({length:total},(_,i)=>i<reds?"rojo":"azul");
  return {kind:"sample",colors,unit:"fichas"};
 }
 const first=2+(variant+difficulty)%5,step=2+(difficulty%2);
 const values:[number,number,number,number]=[first,first+step,first+2*step,first+3*step];
 const m=3+(variant%4);
 const frequencies:[number,number,number,number]=[2,m+2,3,1];
 return {kind:"frequency",values,frequencies,unit:"puntos"};
}
function gcd(a:number,b:number):number{return b===0?a:gcd(b,a%b)}
function median(s:FrequencyStimulus):number{
 const sorted=s.values.flatMap((v,i)=>Array.from({length:s.frequencies[i]},()=>v));
 const n=sorted.length;
 return n%2?sorted[(n-1)/2]:(sorted[n/2-1]+sorted[n/2])/2;
}
export function statsOracle(s:StatsStimulus,skill:StatsSkill):string{
 switch(skill){
 case "bar-difference":
  if(s.kind!=="bars")break;
  return `${Math.abs(s.values[3]-s.values[0])} libros`;
 case "line-change":
  if(s.kind!=="line")break;
  return `${s.values[2]-s.values[1]} unidades`;
 case "frequency-mode":
  if(s.kind!=="frequency")break;
  return `${s.values[s.frequencies.indexOf(Math.max(...s.frequencies))]} puntos`;
 case "frequency-range":
  if(s.kind!=="frequency")break;
  return `${s.values[3]-s.values[0]} puntos`;
 case "frequency-median":
  if(s.kind!=="frequency")break;
  return `${median(s)} puntos`;
 case "sample-probability":
  if(s.kind!=="sample")break;
  const r=s.colors.filter(x=>x==="rojo").length,div=gcd(r,s.colors.length);
  return `${r/div}/${s.colors.length/div}`;
 }
 throw Error("Formato incompatible con competencia");
}
const prompts:Record<StatsSkill,string>={
 "bar-difference":"¿Cuántos libros más se registraron el jueves que el lunes? Usa las alturas de las barras.",
 "line-change":"¿Cuánto cambió la cantidad entre febrero y marzo? Interpreta los dos puntos de la línea.",
 "frequency-mode":"¿Cuál es la moda de los datos de la tabla? La moda es el valor que más se repite.",
 "frequency-range":"¿Cuál es el rango (máximo menos mínimo) de los datos de la tabla?",
 "frequency-median":"¿Cuál es la mediana de los datos representados por la tabla de frecuencias?",
 "sample-probability":"Se extrae una ficha al azar, todas igualmente probables. ¿Cuál es la probabilidad de que sea roja?"};
export function statsTask(index:number,level:Level):StatsTask{
 const skill=STATS_SKILLS[index%STATS_SKILLS.length],stimulus=statsStimulus(index,level,skill),answer=statsOracle(stimulus,skill);
 let candidates:string[]=[];
 if(stimulus.kind==="bars")candidates=[answer,`${stimulus.values[3]} libros`,`${stimulus.values[0]} libros`,`${Math.abs(stimulus.values[2]-stimulus.values[0])} libros`];
 if(stimulus.kind==="line")candidates=[answer,`${stimulus.values[2]} unidades`,`${stimulus.values[1]} unidades`,`${Math.abs(stimulus.values[3]-stimulus.values[2])} unidades`];
 if(stimulus.kind==="frequency"){
  const v=stimulus.values;
  candidates=[answer,...v.map(n=>`${n} puntos`),`${v[3]+v[0]} puntos`,`${v[3]-v[0]+2} puntos`];
 }
 if(stimulus.kind==="sample"){
  const r=stimulus.colors.filter(x=>x==="rojo").length,n=stimulus.colors.length;
  candidates=[answer,`${n-r}/${n}`,`${n}/${r}`,`${r+1}/${n}`,`${r+2}/${n}`];
 }
 const unit=stimulus.kind==="bars"?" libros":stimulus.kind==="line"?" unidades":stimulus.kind==="frequency"?" puntos":"";
 for(let k=1;k<12;k++)candidates.push(stimulus.kind==="sample"?`${k}/${k+11}`:`${k+17}${unit}`);
 const unique=[...new Set(candidates)].slice(0,4);
 if(unique.length!==4)throw Error("Faltan distractores distintos");
 const offset=index%4,options=[...unique.slice(offset),...unique.slice(0,offset)];
 let explanation="";
 if(stimulus.kind==="bars")explanation=`El lunes hay ${stimulus.values[0]} libros y el jueves ${stimulus.values[3]}; restamos la primera cantidad de la última.`;
 if(stimulus.kind==="line")explanation=`La gráfica señala febrero = ${stimulus.values[1]} y marzo = ${stimulus.values[2]}; la variación es marzo menos febrero.`;
 if(stimulus.kind==="frequency")explanation=`Los valores son ${stimulus.values.join(", ")} y sus frecuencias son ${stimulus.frequencies.join(", ")}. Para la moda elegimos la frecuencia máxima; para el rango restamos valores extremos; para la mediana ordenamos mentalmente las observaciones repetidas.`;
 if(stimulus.kind==="sample")explanation=`El dibujo contiene ${stimulus.colors.filter(x=>x==="rojo").length} fichas rojas de ${stimulus.colors.length}; se divide casos favorables entre posibles y se simplifica la fracción.`;
 return {id:`math-stats-v1-${level}-${index}`,skill,level,stimulus,prompt:prompts[skill],
  options,answer,answerIndex:options.indexOf(answer),explanation:`${explanation} Respuesta: ${answer}.`,
  visualRequirement:"essential",
  source:skill==="sample-probability"?"complemento-probabilidad":"phuma-estadistica"};
}
export function statsPool(level:Level):StatsTask[]{return Array.from({length:72},(_,i)=>statsTask(i,level))}
