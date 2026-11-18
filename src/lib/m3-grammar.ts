import type {Level,Sentence,QuizQ,BuildQ} from './grammar';
import {SENTENCES,QUIZ,BUILD} from './grammar';
import {EXTRA_SENTENCES} from './extra-sentences';
import {EXTRA_QUIZ} from './extra-quiz';
import {EXTRA_BUILD} from './extra-build';
import {GRAMMAR_ADVANCED_SENTENCES,GRAMMAR_NUCLEUS_BUILD} from './grammar-nucleus';
import {M2_GRAMMAR_ACTIVITIES,M2_CATEGORY_SENTENCES,M2_CATEGORY_QUIZ,M2_CATEGORY_BUILD,m2GrammarQuiz,M2_TOPICS} from './m2-grammar';
import {GRAMMAR_NEXT_DRAFT} from './grammar-next-draft';
import {M1_NEXT_QUIZ,M1_NEXT_ACTIVITIES} from './grammar-m1-next-activities';
import {M1_LITERATURE_QUIZ,M1_LITERATURE_ACTIVITIES} from './grammar-m1-literature';
import {GRAMMAR_M1_ACTIVITIES} from './grammar-m1-activities';
import {SYNONYM_CLASSIFICATION} from './grammar-classify-synonyms';
import {COHESION_CLASSIFICATION} from './grammar-classify-cohesion';
import {distributeAnswer} from './answer-position';
import type {GrammarDraft} from './grammar-next-draft';
import type {ClassificationActivity,ConstructionActivity} from './grammar-activities';

export const M3_TARGET:Record<Level,number>={principiante:30,intermedio:50,avanzado:70};
const LEVELS:Level[]=['principiante','intermedio','avanzado'];
const need=(level:Level)=>({principiante:10,intermedio:15,avanzado:25})[level];
const slug=(s:string)=>s.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9]+/g,'-');
const norm=(s:string)=>s.normalize('NFKC').toLocaleLowerCase('es').trim();
function triple<T extends {id:string}>(source:T[],i:number):[T,T,T]{
 if(source.length<3)throw new Error('M3 requiere tres fuentes: '+source.length);
 const a=i%source.length,b=(a+1+Math.floor(i/source.length))%source.length;
 let c=(b+1+Math.floor(i/(source.length*source.length)))%source.length;
 if(c===a||c===b)c=(b+1)%source.length;
 if(c===a||c===b)c=(c+1)%source.length;
 return [source[a],source[b],source[c]];
}
const meta=(id:string,ids:string[],goal:string)=>({
 family:id,sourceIds:ids,origin:'integracion-triple-M3-20261117',
 sourceLocator:'Guía pre-U UNAH 2026: competencias comunicativas; estímulos originales con trazabilidad',
 competence:'Competencias comunicativas — Español',cognitiveGoal:goal,
 reviewStatus:'editorial-draft' as const
});
export function m3GrammarQuiz(topic:string,level:Level):GrammarDraft[]{
 const originals=[...GRAMMAR_NEXT_DRAFT,...M1_NEXT_QUIZ,...M1_LITERATURE_QUIZ];
 if(!M2_TOPICS.some(x=>x===topic))return [];
 const sources=originals.filter(q=>q.level===level&&q.subtopic===topic);
 return Array.from({length:need(level)},(_,i)=>{
  const [a,b,c]=triple(sources,i+31*LEVELS.indexOf(level));
  const id='m3-'+slug(topic)+'-quiz-'+level+'-'+(i+1);
  const yes=[a,b,c].map(q=>q.options[q.answer]);
  const no=[a,b,c].map(q=>q.options[(q.answer+1)%4]);
  const describe=(values:string[])=>values.map((v,k)=>'Caso '+('ABC'[k])+': '+v).join('; ');
  const shuffled=distributeAnswer(id,[
   describe(yes),describe([no[0],yes[1],yes[2]]),
   describe([yes[0],no[1],yes[2]]),describe([yes[0],yes[1],no[2]])],0);
  return {id,subtopic:topic as GrammarDraft['subtopic'],level,
   passage:[a,b,c].map((q,k)=>'Caso '+('ABC'[k])+': '+q.passage).join('\n'),
   question:'Examina los tres contextos y selecciona la única combinación enteramente sustentada. '+[a,b,c].map((q,k)=>'En '+('ABC'[k])+': '+q.question).join(' '),
   options:shuffled.options as [string,string,string,string],answer:shuffled.answer as 0|1|2|3,
   explanation:[a,b,c].map((q,k)=>'Caso '+('ABC'[k])+': '+q.explanation).join(' '),
   ...meta(id,[a.id,b.id,c.id],'Resolver tres evidencias y descartar alternativas parcialmente correctas')};
 });
}
const baseActivities=[...GRAMMAR_M1_ACTIVITIES,...M1_NEXT_ACTIVITIES,...M1_LITERATURE_ACTIVITIES,...SYNONYM_CLASSIFICATION,...COHESION_CLASSIFICATION];
function m3Class(topic:string,l:Level,i:number):ClassificationActivity{
 const src=baseActivities.filter(q=>q.subtopic===topic&&q.level===l&&q.kind==='classification') as ClassificationActivity[];
 const [a,b,c]=triple(src,i+13*LEVELS.indexOf(l));
 const id='m3-'+slug(topic)+'-class-'+l+'-'+(i+1);
 const items=[a,b,c].flatMap((q,k)=>q.items.slice(0,2).map((item,j)=>({...item,id:'c'+k+'-'+j,text:'Caso '+('ABC'[k])+': '+item.text})));
 return {id,kind:'classification',level:l,subtopic:topic,
  labels:[...new Set([a,b,c].flatMap(x=>x.labels))],items,
  prompt:'Clasifica seis evidencias de tres contextos independientes. '+[a,b,c].map((q,k)=>'Caso '+('ABC'[k])+': '+q.prompt).join(' '),
  explanation:[a,b,c].map((q,k)=>'Caso '+('ABC'[k])+': '+q.explanation).join(' '),
  ...meta(id,[a.id,b.id,c.id],'Separar evidencias y etiquetas de tres fuentes')};
}
function m3Build(topic:string,l:Level,i:number):ConstructionActivity{
 const src=baseActivities.filter(q=>q.subtopic===topic&&q.level===l&&q.kind==='construction') as ConstructionActivity[];
 const [a,b,c]=triple(src,i+13*LEVELS.indexOf(l));
 const id='m3-'+slug(topic)+'-build-'+l+'-'+(i+1);
 return {id,kind:'construction',level:l,subtopic:topic,
  prompt:'Ordena un análisis justificable de tres casos: '+[a,b,c].map((q,k)=>'Caso '+('ABC'[k])+': '+q.prompt).join(' '),
  tiles:[
   {id:'a',text:'Primero, resolver A: '+a.explanation},
   {id:'b',text:'Después, comprobar B por sus propias evidencias: '+b.explanation},
   {id:'c',text:'Por último, contrastar C y limitar la conclusión: '+c.explanation},
   {id:'d',text:'La respuesta del caso A demuestra automáticamente los resultados de B y C.'}
  ],solutions:[['a','b','c']],explanation:'Se comienza por A porque '+a.explanation+' Después se contrasta B, donde '+b.explanation+' Finalmente se delimita C: '+c.explanation+' La ficha distractora es inválida porque resolver un caso no demuestra automáticamente los otros dos.',
  ...meta(id,[a.id,b.id,c.id],'Reconstruir un argumento compuesto por tres justificaciones')};
}
export const M3_GRAMMAR_ACTIVITIES:(ClassificationActivity|ConstructionActivity)[]=
 M2_TOPICS.flatMap(topic=>LEVELS.flatMap(l=>Array.from({length:need(l)},(_,i)=>[m3Class(topic,l,i),m3Build(topic,l,i)]).flat()));
const catClass=(l:Level)=>[...SENTENCES[l],...EXTRA_SENTENCES[l],...(l==='avanzado'?GRAMMAR_ADVANCED_SENTENCES:[]),...M2_CATEGORY_SENTENCES[l]];
const catQuiz=(l:Level)=>[...QUIZ[l],...EXTRA_QUIZ[l],...M2_CATEGORY_QUIZ[l]];
const catBuild=(l:Level)=>[...BUILD[l],...EXTRA_BUILD[l],...GRAMMAR_NUCLEUS_BUILD[l],...M2_CATEGORY_BUILD[l]];
export const M3_CATEGORY_SENTENCES:Record<Level,Sentence[]>=Object.fromEntries(LEVELS.map(l=>[l,
 Array.from({length:Math.max(0,M3_TARGET[l]-catClass(l).length)},(_,i)=>{
  const [a,b,c]=triple(catClass(l),i);
  return {id:'m3-categorias-class-'+l+'-'+(i+1),
   tokens:[...a.tokens,{t:';',c:null},...b.tokens,{t:';',c:null},...c.tokens].map(t=>({...t}))};
 })])) as Record<Level,Sentence[]>;
export const M3_CATEGORY_QUIZ:Record<Level,QuizQ[]>=Object.fromEntries(LEVELS.map(l=>[l,
 Array.from({length:Math.max(0,M3_TARGET[l]-catQuiz(l).length)},(_,i)=>{
  const [a,b,c]=triple(catQuiz(l),i);
  const id='m3-categorias-quiz-'+l+'-'+(i+1);
  const correct=[a,b,c].map(q=>q.options[q.answer]);
  const wrong=[a,b,c].map(q=>q.options[(q.answer+1)%q.options.length]);
  const show=(choices:string[])=>choices.map((v,j)=>('ABC'[j])+': '+v).join('; ');
  const options=distributeAnswer(id,[show(correct),show([wrong[0],correct[1],correct[2]]),show([correct[0],wrong[1],correct[2]]),show([correct[0],correct[1],wrong[2]])],0);
  return {id,q:'Resuelve conjuntamente tres preguntas de categorías gramaticales. Caso A: '+a.q+' Caso B: '+b.q+' Caso C: '+c.q,
   options:options.options,answer:options.answer,exp:'A: '+a.exp+' B: '+b.exp+' C: '+c.exp};
 })])) as Record<Level,QuizQ[]>;
export const M3_CATEGORY_BUILD:Record<Level,BuildQ[]>=Object.fromEntries(LEVELS.map(l=>[l,
 Array.from({length:Math.max(0,M3_TARGET[l]-catBuild(l).length)},(_,i)=>{
  const [a,b,c]=triple(catBuild(l),i);
  const id='m3-categorias-build-'+l+'-'+(i+1);
  const extra=[{w:'sin embargo',c:'conjuncion' as const},{w:'lentamente',c:'adverbio' as const},{w:'nuestros',c:'determinante' as const},{w:'científicas',c:'adjetivo' as const},{w:'caminan',c:'verbo' as const}];
  const extraTile=extra.find(v=>!a.tiles.some(t=>norm(t.w)===norm(v.w)))!;
  return {id,pattern:[...a.pattern],hint:'Resuelve el primer patrón y contrástalo con dos fuentes: '+a.hint+' / '+b.hint+' / '+c.hint,
   tiles:[...a.tiles.map(t=>({...t})),extraTile],solutions:a.solutions.map(x=>[...x]),
   exp:a.exp+' Contraste B: '+b.exp+' Contraste C: '+c.exp};
 })])) as Record<Level,BuildQ[]>;
