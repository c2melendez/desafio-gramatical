import {mainIdeaCompositeOrder} from "./main-idea-composite-order";
import type {Level,Mode} from "./grammar";
import type {ReadingChallenge,ReadingItem,ReadingSubtopic,EvidenceTag} from "./reading";
import {distributeAnswer} from "./answer-position";
const targets:Record<Level,number>={principiante:20,intermedio:35,avanzado:45};
const base:Record<Level,number>={principiante:10,intermedio:15,avanzado:20};
const slug=(x:string)=>x.normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase().replace(/[^a-z0-9]+/g,"-");
const pair=<T,>(items:T[],i:number):[T,T]=>{
 if(items.length<2)throw new Error("Lecturas insuficientes para contraste");
 const a=i%items.length;
 let b=(a+1+Math.floor(i/items.length))%items.length;
 if(a===b)b=(a+1)%items.length;
 return [items[a],items[b]];
};
const tagged=(id:string,objective:string,sourceIds:string[])=>({sourceIds,
 reviewStatus:"editorial-draft" as const,origin:"composicion-comparativa-M2-20261117",
 family:id,sourceLocator:"Guía pre-U UNAH 2026; pasajes originales del banco de Español",
 competence:"Competencias comunicativas — Comprensión lectora",cognitiveGoal:objective
});
/** Segundo ciclo: las tareas comparan dos lecturas; el valor académico independiente
 * de cada composición queda pendiente de evaluación docente. */
export function m2ReadingPool(level:Level,subtopic:ReadingSubtopic,mode:Mode,basePool:ReadingItem[]):ReadingChallenge[]{
 const count=targets[level]-base[level];
 const source=basePool.filter(q=>mode==="quiz"?"options" in q:mode==="clasificar"?"claims" in q:"order" in q);
 return Array.from({length:count},(_,i)=>{
  const [a,b]=pair(source,i+17*["principiante","intermedio","avanzado"].indexOf(level));
  const id="m2-reading-"+slug(subtopic)+"-"+mode+"-"+level+"-"+(i+1);
  const title="Contraste de fuentes: "+a.title+" / "+b.title;
  const passage="LECTURA A — "+a.passage+"\n\nLECTURA B — "+b.passage;
  const metadata=tagged(id,"Comparar pruebas y razonamientos en dos pasajes",[a.id,b.id]);
  if(mode==="quiz"){
   const qa=a as ReadingChallenge,qb=b as ReadingChallenge;
   const x0=qa.options[qa.answer],y0=qb.options[qb.answer];
   const x1=qa.options[(qa.answer+1)%4],y1=qb.options[(qb.answer+1)%4];
   const options=distributeAnswer(id,[
    "Lectura A: "+x0+"; lectura B: "+y0,
    "Lectura A: "+x1+"; lectura B: "+y0,
    "Lectura A: "+x0+"; lectura B: "+y1,
    "Lectura A: "+x1+"; lectura B: "+y1],0);
   return {id,level,subtopic,title,passage,
    question:"Resuelve las dos preguntas basándote en su texto respectivo. A: "+qa.question+" B: "+qb.question+" ¿Qué alternativa responde correctamente ambas?",
    options:options.options as [string,string,string,string],answer:options.answer,
    explanation:"Texto A: "+qa.explanation+" Texto B: "+qb.explanation+" Una respuesta parcial no basta.",
    claims:[{text:"Las dos lecturas aportan información que debe comprobarse en cada una.",tag:"inference" as EvidenceTag,explanation:"Cada lectura debe evaluarse en su propio contexto."}],
    order:{parts:["Leer A","Leer B","Contrastar"],hint:"Contrasta ambas lecturas.",explanation:"Leer las fuentes antes de compararlas."},
    ...metadata};
  }
  if(mode==="clasificar"){
   const ca=a as ReadingChallenge,cb=b as ReadingChallenge;
   const find=(q:ReadingChallenge,tag:EvidenceTag)=>q.claims.find(c=>c.tag===tag)!;
   const tags:EvidenceTag[]=["explicit","inference","unsupported"];
   const ta=tags[i%3],tb=tags[(i+1)%3],tc=tags[(i+2)%3];
   const items=[
    {...find(ca,ta),text:"Según la lectura A: "+find(ca,ta).text},
    {...find(cb,tb),text:"Según la lectura B: "+find(cb,tb).text},
    {...find(ca,tc),text:"Se afirma sobre A: "+find(ca,tc).text}
   ] as ReadingChallenge["claims"];
   const permutations=[[0,1,2],[1,2,0],[2,0,1],[0,2,1],[2,1,0],[1,0,2]];
   const claims=permutations[i%6].map(index=>items[index]);
   return {id,level,subtopic,title,passage,claims,
    question:"¿Qué afirmaciones son explícitas, inferencias o no sustentadas al comparar los dos textos?",
    options:["Dato explícito","Inferencia","No sustentado","No aplica"],
    answer:0,explanation:"Las afirmaciones se interpretan solo dentro de la lectura indicada.",
    order:{parts:["Ubicar datos en A","Ubicar indicios en B","Evaluar afirmaciones"],hint:"Clasifica sin confundir fuentes.",explanation:"Un indicio de B no se transforma en hecho explícito de A."},
    ...metadata};
  }
  if(subtopic==="Idea principal"){
   const order=mainIdeaCompositeOrder([a as ReadingChallenge,b as ReadingChallenge]);
   return {id,level,subtopic,title,passage, ...metadata,
    cognitiveGoal:"Organizar argumentos completos de dos fuentes sin transferir evidencias",
    order,claims:[{text:"Cada conclusión depende de las evidencias de su propia lectura.",tag:"inference",explanation:order.explanation}],
    question:"Ordena las etapas del análisis de ambas lecturas sin mezclar sus evidencias.",
    options:["Examinar datos","Relacionar datos","Sintetizar","Ignorar fuentes"],answer:0,explanation:order.explanation};
  }
  const ra=a as ReadingChallenge,rb=b as ReadingChallenge;
  return {id,level,subtopic,title,passage,
   order:{parts:[
     "Ubicar evidencias en la lectura A: "+ra.order.parts[0],
     "Examinar las relaciones del texto B: "+rb.order.parts[1],
     "Formular una conclusión prudente sobre B: "+rb.order.parts[2]
    ],hint:"Primero analiza la evidencia A, después compara con B y finalmente sintetiza los alcances.",
    explanation:"Caso A: "+ra.order.explanation+" Caso B: "+rb.order.explanation},
   claims:[{text:"Ambos textos requieren interpretar evidencias.",tag:"inference",explanation:"El contraste evita transferir supuestos de A a B."}],
   question:"Ordena un razonamiento intertextual con hechos, contraste y conclusión.",
   options:["Examinar A","Examinar B","Concluir sobre B","Ignorar las fuentes"],answer:0,
   explanation:"Se compara la evidencia de ambas lecturas antes de concluir.",
   ...metadata};
 });
}
