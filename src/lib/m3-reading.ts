import type {Level,Mode} from './grammar';
import type {ReadingChallenge,ReadingItem,ReadingSubtopic} from './reading';
import {distributeAnswer} from './answer-position';
const count:Record<Level,number>={principiante:10,intermedio:15,avanzado:25};
const slug=(s:string)=>s.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9]+/g,'-');
const tri=<T,>(xs:T[],i:number):[T,T,T]=>{
 if(xs.length<3)throw Error('M3 lectura requiere tres fuentes');
 const a=i%xs.length,b=(a+1+Math.floor(i/xs.length))%xs.length;
 let c=(b+1)%xs.length;if(c===a)c=(c+1)%xs.length;
 return [xs[a],xs[b],xs[c]];
};
export function m3ReadingPool(level:Level,subtopic:ReadingSubtopic,mode:Mode,existing:ReadingItem[]):ReadingChallenge[]{
 const sources=existing.filter(x=>x.id.startsWith('m2-reading-')) as ReadingChallenge[];
 return Array.from({length:count[level]},(_,i)=>{
  const [a,b,c]=tri(sources,i+19*['principiante','intermedio','avanzado'].indexOf(level));
  const id='m3-reading-'+slug(subtopic)+'-'+mode+'-'+level+'-'+(i+1);
  const sourceIds=[a.id,b.id,c.id];
  const meta={origin:'integracion-triple-M3-20261117',sourceIds,reviewStatus:'editorial-draft' as const,family:id,
   sourceLocator:'Guía pre-U UNAH 2026; textos originales de M2',
   competence:'Competencias comunicativas — Comprensión lectora',cognitiveGoal:'Integrar y evaluar tres fuentes contextualizadas'};
  const passage='FUENTE A: '+a.passage+'\n\nFUENTE B: '+b.passage+'\n\nFUENTE C: '+c.passage;
  const common={id,level,subtopic,title:'Integración crítica: '+a.title+' / '+b.title+' / '+c.title,passage,...meta};
  if(mode==='quiz'){
   const right=[a,b,c].map(q=>q.options[q.answer]),wrong=[a,b,c].map(q=>q.options[(q.answer+1)%4]);
   const show=(arr:string[])=>arr.map((v,k)=>'Fuente '+('ABC'[k])+': '+v).join('; ');
   const shuffled=distributeAnswer(id,[show(right),show([wrong[0],right[1],right[2]]),show([right[0],wrong[1],right[2]]),show([right[0],right[1],wrong[2]])],0);
   return {...common,question:'Según cada fuente, ¿cuál opción resuelve simultáneamente estas tres tareas? A: '+a.question+' B: '+b.question+' C: '+c.question,
    options:shuffled.options as [string,string,string,string],answer:shuffled.answer,
    explanation:'A: '+a.explanation+' B: '+b.explanation+' C: '+c.explanation,
    claims:a.claims,order:a.order};
  }
  if(mode==='clasificar'){
   const pick=(q:ReadingChallenge,tag:'explicit'|'inference'|'unsupported')=>q.claims.find(x=>x.tag===tag)!;
   return {...common,question:'Clasifica las evidencias en las tres fuentes sin intercambiar sus alcances.',
    claims:[
     {...pick(a,'explicit'),text:'Fuente A: '+pick(a,'explicit').text},
     {...pick(b,'inference'),text:'Fuente B: '+pick(b,'inference').text},
     {...pick(c,'unsupported'),text:'Fuente C: '+pick(c,'unsupported').text}
    ],options:['Dato explícito','Inferencia','No sustentado','No aplica'],answer:0,
    explanation:'Cada afirmación se revisa contra la fuente de origen.',
    order:a.order};
  }
  return {...common,
   question:'Ordena un análisis de tres fuentes con evidencia, contraste y conclusión.',
   order:{parts:[
    'Primero localizar la evidencia en A: '+a.order.parts[0],
    'Después contrastar B con A: '+b.order.parts[1],
    'Finalmente delimitar conclusiones sobre C: '+c.order.parts[2]
   ],hint:'Distingue dato de conclusión y evita extrapolaciones.',explanation:'A: '+a.order.explanation+' B: '+b.order.explanation+' C: '+c.order.explanation},
   claims:a.claims,options:['Analizar A','Contrastar B','Delimitar C','Ignorar datos'],answer:0,
   explanation:'Las tres fuentes tienen alcances distintos y requieren comprobar evidencias.'};
 });
}
