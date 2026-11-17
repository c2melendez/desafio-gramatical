import type {Level,Mode,QuizQ,BuildQ,Sentence,Cat} from "./grammar";
import {QUIZ,BUILD,SENTENCES} from "./grammar";
import {EXTRA_QUIZ} from "./extra-quiz";
import {EXTRA_BUILD} from "./extra-build";
import {EXTRA_SENTENCES} from "./extra-sentences";
import {GRAMMAR_ADVANCED_SENTENCES,GRAMMAR_NUCLEUS_BUILD} from "./grammar-nucleus";
import type {GrammarDraft} from "./grammar-next-draft";
import {GRAMMAR_M1_ACTIVITIES} from "./grammar-m1-activities";
import {M1_NEXT_ACTIVITIES} from "./grammar-m1-next-activities";
import {M1_LITERATURE_ACTIVITIES} from "./grammar-m1-literature";
import {SYNONYM_CLASSIFICATION} from "./grammar-classify-synonyms";
import {COHESION_CLASSIFICATION} from "./grammar-classify-cohesion";
import {distributeAnswer} from "./answer-position";
import type {ClassificationActivity,ConstructionActivity} from "./grammar-activities";

/** M2: tareas de contraste entre dos estímulos previos, con claves derivadas por fuente.
 * No confundir variantes de composición con independencia conceptual acreditada. */
const levels:Level[]=["principiante","intermedio","avanzado"];
export const M2_TARGET:Record<Level,number>={principiante:20,intermedio:35,avanzado:45};
const NUC:Record<Level,number>={principiante:10,intermedio:15,avanzado:20};
const quota=(level:Level)=>M2_TARGET[level]-NUC[level];
export const M2_TOPICS=["Sinónimos y antónimos","Cohesión y coherencia","Morfosintaxis","Homonimia y polisemia","Hiperonimia","Adecuación y referente","Figuras retóricas","Géneros literarios"] as const;
const slug=(x:string)=>x.normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase().replace(/[^a-z0-9]+/g,"-");
const key=(topic:string,l:Level,kind:string,n:number)=>"m2-"+slug(topic)+"-"+kind+"-"+l+"-"+(n+1);
const meta=(id:string,goal:string,sourceIds:string[])=>({family:id,sourceIds,origin:"composicion-contextual-M2-20261117",
 competence:"Competencias comunicativas — Español",cognitiveGoal:goal,
 sourceLocator:"Guía pre-U UNAH 2026, competencias comunicativas; composición de estímulos originales de M1",
 reviewStatus:"editorial-draft" as const});
function pair<T>(items:readonly T[],i:number):[T,T]{
 if(items.length<2)throw new Error("Faltan dos ejemplos independientes");
 const a=i%items.length;
 let b=(a+1+Math.floor(i/items.length))%items.length;
 if(b===a)b=(a+1)%items.length;
 return [items[a],items[b]];
}
export function m2GrammarQuiz(topic:string,level:Level,base:readonly GrammarDraft[]):GrammarDraft[]{
 if(!M2_TOPICS.some(x=>x===topic))return [];
 const items=base.filter(q=>q.level===level&&q.subtopic===topic);
 return Array.from({length:quota(level)},(_,i)=>{
  const [a,b]=pair(items,i+levels.indexOf(level)*17);
  const id=key(topic,level,"quiz",i),a0=a.options[a.answer],b0=b.options[b.answer];
  const a1=a.options[(a.answer+1)%4],b1=b.options[(b.answer+1)%4];
  const opts=distributeAnswer(id,["En A: "+a0+"; en B: "+b0,"En A: "+a1+"; en B: "+b0,"En A: "+a0+"; en B: "+b1,"En A: "+a1+"; en B: "+b1],0);
  return {id,subtopic:topic as GrammarDraft["subtopic"],level,
   passage:"Contexto A: "+a.passage+"\nContexto B: "+b.passage,
   question:"Evalúa simultáneamente los dos contextos. Caso A: "+a.question+" Caso B: "+b.question+" ¿Qué alternativa resuelve ambos?",
   options:opts.options as [string,string,string,string],answer:opts.answer as 0|1|2|3,
   explanation:"Para A, "+a.explanation+" Para B, "+b.explanation+" Una respuesta es válida solo si ambas afirmaciones son correctas.",
   ...meta(id,"Resolver conjuntamente dos interpretaciones a partir de textos diferentes",[a.id,b.id])};
 });
}
const cases=[...GRAMMAR_M1_ACTIVITIES,...M1_NEXT_ACTIVITIES,...M1_LITERATURE_ACTIVITIES,...SYNONYM_CLASSIFICATION,...COHESION_CLASSIFICATION];
const from=(topic:string,l:Level,kind:"classification"|"construction")=>cases.filter(x=>x.subtopic===topic&&x.level===l&&x.kind===kind);
function makeClass(topic:string,l:Level,i:number):ClassificationActivity{
 const [a,b]=pair(from(topic,l,"classification") as ClassificationActivity[],i+levels.indexOf(l)*17);
 const id=key(topic,l,"class",i);
 const items=[...a.items.map((x,j)=>({...x,id:"a"+j})),...b.items.map((x,j)=>({...x,id:"b"+j}))];
 return {id,subtopic:topic,level:l,kind:"classification",labels:[...new Set(items.map(x=>x.label))],items,
  prompt:"Estudia dos situaciones diferentes de "+topic+". Primer caso: "+a.prompt+" Segundo caso: "+b.prompt+" Clasifica cada evidencia en su propio contexto.",
  explanation:"Las etiquetas dependen de cada caso. En A: "+a.explanation+" En B: "+b.explanation,
  ...meta(id,"Discriminar cuatro evidencias entre dos situaciones diferentes",[a.id,b.id])};
}
function makeBuild(topic:string,l:Level,i:number):ConstructionActivity{
 const [a,b]=pair(from(topic,l,"construction") as ConstructionActivity[],i+levels.indexOf(l)*17);
 const id=key(topic,l,"build",i);
 return {id,subtopic:topic,level:l,kind:"construction",
  prompt:"Organiza en orden un análisis que resuelva estos dos casos. CASO A: "+a.prompt+" CASO B: "+b.prompt,
  tiles:[
   {id:"t0",text:"El caso A se resuelve así: "+a.explanation},
   {id:"t1",text:"En cambio, el caso B se fundamenta en: "+b.explanation},
   {id:"t2",text:"La conclusión debe conservar los indicios de cada caso sin intercambiarlos."},
   {id:"d",text:"Todas las soluciones son válidas sin comprobar el contexto ni el propósito."}],
  solutions:[["t0","t1","t2"]],
  explanation:"Primero se justifica A, después B y finalmente se distinguen las fuentes. La afirmación distractora carece de fundamento.",
  ...meta(id,"Jerarquizar dos justificaciones y distinguir sus fuentes",[a.id,b.id])};
}
export const M2_GRAMMAR_ACTIVITIES:(ClassificationActivity|ConstructionActivity)[]=
 M2_TOPICS.flatMap(topic=>levels.flatMap(l=>Array.from({length:quota(l)},(_,i)=>[makeClass(topic,l,i),makeBuild(topic,l,i)]).flat()));

/** Modalidades del juego clásico, sin cambiar contratos de interfaz. */
const category={
 clasificar:(l:Level)=>[...SENTENCES[l],...EXTRA_SENTENCES[l],...(l==="avanzado"?GRAMMAR_ADVANCED_SENTENCES:[])],
 quiz:(l:Level)=>[...QUIZ[l],...EXTRA_QUIZ[l]],
 construir:(l:Level)=>[...BUILD[l],...EXTRA_BUILD[l],...GRAMMAR_NUCLEUS_BUILD[l]]
};
const needed=(l:Level,m:Mode)=>Math.max(0,M2_TARGET[l]-category[m](l).length);
export const M2_CATEGORY_SENTENCES:Record<Level,Sentence[]>=Object.fromEntries(levels.map(l=>[l,
 Array.from({length:needed(l,"clasificar")},(_,i)=>{
  const [a,b]=pair(category.clasificar(l),i);
  return {id:key("Categorías gramaticales",l,"class",i),tokens:[...a.tokens,{t:";",c:null},...b.tokens].map(x=>({...x}))};
 })])) as Record<Level,Sentence[]>;
export const M2_CATEGORY_QUIZ:Record<Level,QuizQ[]>=Object.fromEntries(levels.map(l=>[l,
 Array.from({length:needed(l,"quiz")},(_,i)=>{
  const [a,b]=pair(category.quiz(l),i);
  const id=key("Categorías gramaticales",l,"quiz",i);
  const options=distributeAnswer(id,[
    "A: "+a.options[a.answer]+"; B: "+b.options[b.answer],
    "A: "+a.options[(a.answer+1)%a.options.length]+"; B: "+b.options[b.answer],
    "A: "+a.options[a.answer]+"; B: "+b.options[(b.answer+1)%b.options.length],
    "A: "+a.options[(a.answer+1)%a.options.length]+"; B: "+b.options[(b.answer+1)%b.options.length]
  ],0);
  return {id,q:"Resuelve los dos casos. Caso A: "+a.q+" Caso B: "+b.q,options:options.options,answer:options.answer,exp:"A: "+a.exp+" B: "+b.exp};
 })])) as Record<Level,QuizQ[]>;
export const M2_CATEGORY_BUILD:Record<Level,BuildQ[]>=Object.fromEntries(levels.map(l=>[l,
 Array.from({length:needed(l,"construir")},(_,i)=>{
  const a=category.construir(l)[i%category.construir(l).length];
  const id=key("Categorías gramaticales",l,"build",i);
  const extra:{w:string,c:Cat}[]=[{w:"aunque",c:"conjuncion"},{w:"rápidamente",c:"adverbio"},{w:"de",c:"preposicion"},{w:"también",c:"adverbio"},{w:"aquellas",c:"determinante"},{w:"investigaciones",c:"sustantivo"},{w:"fácilmente",c:"adverbio"},{w:"siempre",c:"adverbio"},{w:"observa",c:"verbo"},{w:"clara",c:"adjetivo"}];
  const distractor=extra.find((x,k)=>k>=i%extra.length&&!a.tiles.some(t=>t.w.toLocaleLowerCase("es")===x.w.toLocaleLowerCase("es")))??extra.find(x=>!a.tiles.some(t=>t.w===x.w))!;
  return {id,pattern:[...a.pattern],hint:"Examina la concordancia y el patrón: "+a.hint,
   tiles:[...a.tiles.map(t=>({...t})),distractor],solutions:[...a.solutions],
   exp:a.exp+" Identifica la forma adecuada y descarta una ficha adicional de categoría distractora."};
 })])) as Record<Level,BuildQ[]>;
