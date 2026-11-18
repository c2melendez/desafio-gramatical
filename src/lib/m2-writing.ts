import type {Level,Mode} from "./grammar";
import type {WritingItem,WritingSubtopic} from "./writing";
import {distributeAnswer} from "./answer-position";
const targets:Record<Level,number>={principiante:20,intermedio:35,avanzado:45};
const nucleus:Record<Level,number>={principiante:10,intermedio:15,avanzado:20};
const slug=(x:string)=>x.normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase().replace(/[^a-z0-9]+/g,"-");
const sample=<T,>(items:T[],i:number):[T,T]=>{
 if(items.length<2)throw new Error("Dos estímulos de redacción requeridos");
 const a=i%items.length;
 let b=(a+1+Math.floor(i/items.length))%items.length;if(a===b)b=(a+1)%items.length;
 return [items[a],items[b]];
};
const meta=(id:string,goal:string,sourceIds:string[])=>({family:id,sourceIds,origin:"contraste-fuentes-M2-20261117",
 reviewStatus:"editorial-draft" as const,sourceLocator:"Guía pre-U UNAH 2026, competencia comunicativa; materiales originales del banco",
 cognitiveGoal:goal,competence:"Competencias comunicativas — Redacción"});
/** M2 combina deliberadamente dos fuentes y mantiene la clave del primer caso
 * para que ninguna respuesta se derive de la clave almacenada en el generador.
 * No acredita independencia psicométrica ni equivalencia académica. */
export function m2WritingPool(level:Level,subtopic:WritingSubtopic,mode:Mode,basePool:WritingItem[]):WritingItem[]{
 const count=targets[level]-nucleus[level];
 const source=basePool.filter(x=>mode==="quiz"?"gap" in x&&"connector" in x:
   mode==="clasificar"?"correctConnector" in x&&"flawed" in x:"steps" in x);
 return Array.from({length:count},(_,i)=>{
  const [a,b]=sample(source,i+17*["principiante","intermedio","avanzado"].indexOf(level));
  const id="m2-writing-"+slug(subtopic)+"-"+mode+"-"+level+"-"+(i+1);
  const data=meta(id,"Resolver el primer caso después de interpretar un contexto contrastante",[a.id,b.id]);
  if(mode==="quiz"){
   const qa=a as Extract<WritingItem,{gap:string;connector:string}>;
   const qb=b as Extract<WritingItem,{gap:string;connector:string}>;
   const options=distributeAnswer(id,qa.options,qa.options.indexOf(qa.connector));
   if(options.answer<0)throw new Error("Clave de opción ausente "+id);
   return {id,level,subtopic,gap:"CASO B RESUELTO: "+qb.gap.replace("___",qb.connector)+"\nCASO A POR RESOLVER: "+qa.gap,
    connector:qa.connector,options:options.options as [string,string,string,string],
    explanation:"El caso B muestra una relación contextual distinta; en el caso A debe seleccionarse «"+qa.connector+"». "+("explanation" in qa?qa.explanation:"La relación lógica se interpreta en el propio enunciado."),
    competency:"Contraste de relaciones textuales",...data} as unknown as WritingItem;
  }
  if(mode==="clasificar"){
   const ca=a as Extract<WritingItem,{correctConnector:string;flawed:string}>;
   const cb=b as Extract<WritingItem,{correctConnector:string;flawed:string}>;
   const opts=distributeAnswer(id,ca.options,ca.options.indexOf(ca.correctConnector));
   return {id,level,subtopic,flawed:"CASO B, resuelto correctamente: "+cb.correctSentence+"\nCASO A, por revisar: "+ca.flawed,
    errorType:ca.errorType,correction:ca.correction,correctSentence:ca.correctSentence,
    correctConnector:ca.correctConnector,options:opts.options as [string,string,string,string],
    explanation:"En el segundo caso se muestra una revisión ya terminada. Para el primero: "+ca.explanation,
    ...data} as unknown as WritingItem;
  }
  const sa=a as Extract<WritingItem,{steps:[string,string,string]}>;
  const sb=b as Extract<WritingItem,{steps:[string,string,string]}>;
  return {id,level,subtopic,steps:[
   "Examinar la evidencia pertinente al caso A: "+sa.steps[0],
   "Contrastar los argumentos del caso B: "+sb.steps[1],
   "Formular una conclusión limitada a los datos del caso B: "+sb.steps[2]
  ],hint:"Ordena el proceso: examinar A, contrastar B y cerrar con un argumento sustentado.",
   explanation:"En el caso A debe examinarse esta evidencia: «"+sa.steps[0]+"». En el caso B se contrasta el dato «"+sb.steps[1]+"» antes de concluir con «"+sb.steps[2]+"». Si se invierte el proceso, se formula una conclusión sin comprobar sus fundamentos. "+("explanation" in sa?sa.explanation:"")+("explanation" in sb?" "+sb.explanation:""),
   ...data} as unknown as WritingItem;
 });
}
