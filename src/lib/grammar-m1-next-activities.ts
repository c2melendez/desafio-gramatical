import {distributeAnswer} from "./answer-position";
import type {Level} from "./grammar";
import type {ClassificationActivity,ConstructionActivity} from "./grammar-activities";
import {HOMO_CONTEXTS} from "./m1-homonimia-contexts";
import {HYPER_CONTEXTS} from "./m1-hiperonimia-contexts";
import {ADEQ_CONTEXTS} from "./m1-adecuacion-contexts";
import {REFERENT_CONTEXTS} from "./m1-referentes-contexts";

/** Banco M1 adicional: 405 registros técnicos basados en 135 escenarios originales.
 * Un escenario compartido entre juegos NO demuestra independencia conceptual.
 * Mantener revisión editorial y de equivalencias pendientes.
 */
type NewTopic="Homonimia y polisemia"|"Hiperonimia"|"Adecuación y referente";
export type NextQuiz={
 id:string;subtopic:NewTopic;level:Level;passage:string;question:string;
 options:[string,string,string,string];answer:0|1|2|3;explanation:string;
 reviewStatus:"editorial-draft";competence:string;cognitiveGoal:string;
 sourceLocator:string;origin:string;family:string;
};
const tier=(i:number):Level=>i<10?"principiante":i<25?"intermedio":"avanzado";
const source="Guía pre-U PHUMA UNAH 2026 — Competencias comunicativas (referencia de competencia, no pregunta copiada)";
const shared=(family:string,cognitiveGoal:string)=>({
 competence:"Competencias comunicativas — Español",cognitiveGoal,
 sourceLocator:source,origin:"original-M1-20261117",family,reviewStatus:"editorial-draft" as const
});
function canonicalFamily(id:string):string{
 const family=id.replace(/-(quiz|class|build)-/,"-").replace(/-(principiante|intermedio|avanzado)-/,"-");
 const index=Number(family.split("-").at(-1));
 // Los referentes no usan el estímulo de adecuación de la clasificación.
 return family.startsWith("m1-adeq-")&&index>=31&&!id.includes("-class-")
  ?family.replace("m1-adeq-","m1-referent-"):family;
}
const cards=(parts:string[],wrong:string)=>[...parts.map((text,i)=>({id:"t"+i,text})),{id:"d",text:wrong}];
function makeBuild(id:string,subtopic:NewTopic,level:Level,prompt:string,parts:string[],wrong:string,explanation:string,goal:string):ConstructionActivity{
 return {id,subtopic,level,kind:"construction",prompt,explanation,
 ...shared(canonicalFamily(id),goal),
 tiles:cards(parts,wrong),solutions:[["t0","t1","t2"]]};
}
function quiz(id:string,subtopic:NewTopic,level:Level,passage:string,question:string,options:[string,string,string,string],explanation:string,goal:string):NextQuiz{
 const ordered=distributeAnswer(id,options,0);
 return {id,subtopic,level,passage,question,options:ordered.options as [string,string,string,string],answer:ordered.answer as 0|1|2|3,explanation,
 ...shared(canonicalFamily(id),goal)};
}
function classify(id:string,subtopic:NewTopic,level:Level,prompt:string,
 labels:string[],entries:{text:string;label:string;explanation:string}[],explanation:string,goal:string,index:number):ClassificationActivity{
 const items=entries.map((x,j)=>({id:"f"+j,...x}));
 // Evita filtrar respuestas por la posición de los fragmentos frente a las etiquetas.
 if(index>=0)items.reverse();
 return {id,subtopic,level,kind:"classification",prompt,labels,items,explanation,
 ...shared(canonicalFamily(id),goal)};
}
const count=45;
function otherOptions(correct:string,wrong:string,alternates:string[]):[string,string,string,string]{
 const out=[correct,wrong];
 for(const alt of alternates)if(!out.some(x=>x.trim().toLocaleLowerCase("es")===alt.trim().toLocaleLowerCase("es")))out.push(alt);
 if(out.length<4)throw new Error("Alternativas insuficientes o duplicadas");
 return out.slice(0,4) as [string,string,string,string];
}

export const HOMO_QUIZ:NextQuiz[]=HOMO_CONTEXTS.map(([word,a,ma,b,mb],i)=>quiz(
 "m1-homo-quiz-"+tier(i)+"-"+(i+1),"Homonimia y polisemia",tier(i),a,
 "¿Qué significa «"+word+"» en este contexto?",
 otherOptions(ma,mb,[HOMO_CONTEXTS[(i+11)%count][2],HOMO_CONTEXTS[(i+17)%count][4],HOMO_CONTEXTS[(i+29)%count][2]]),
 "El contexto «"+a+"» utiliza «"+word+"» con el sentido de «"+ma+"», no con el de «"+mb+"».",
 "Desambiguar sentidos de una palabra en contexto"));
export const HOMO_CLASS:ClassificationActivity[]=HOMO_CONTEXTS.map(([word,a,ma,b,mb],i)=>classify(
 "m1-homo-class-"+tier(i)+"-"+(i+1),"Homonimia y polisemia",tier(i),
 "Relaciona cada uso de «"+word+"» con su significado contextual.",
 [ma,mb],
 [{text:a,label:ma,explanation:"Aquí «"+word+"» significa «"+ma+"»."},
 {text:b,label:mb,explanation:"Aquí «"+word+"» significa «"+mb+"»."}],
 "La misma forma «"+word+"» presenta sentidos diferentes según su contexto, sin que este ejercicio determine necesariamente su origen etimológico.",
 "Clasificar acepciones según la evidencia del enunciado",i));
export const HOMO_BUILD:ConstructionActivity[]=HOMO_CONTEXTS.map(([word,a,ma,b,mb],i)=>makeBuild(
 "m1-homo-build-"+tier(i)+"-"+(i+1),"Homonimia y polisemia",tier(i),
 "Construye una explicación del segundo uso de «"+word+"». Primer contexto: "+a,
 ["En «"+b+"»","la palabra «"+word+"» significa","«"+mb+"»."],
 "«"+ma+"».",
 "El segundo contexto «"+b+"» usa «"+word+"» como «"+mb+"». La ficha alternativa corresponde al primer contexto.",
 "Explicar un cambio de sentido según el contexto"));

export const HYPER_QUIZ:NextQuiz[]=HYPER_CONTEXTS.map(([category,a,b],i)=>quiz(
 "m1-hyper-quiz-"+tier(i)+"-"+(i+1),"Hiperonimia",tier(i),
 "Se consideran dos ejemplos: «"+a+"» y «"+b+"».",
 "¿Cuál es el hiperónimo que engloba correctamente ambos ejemplos?",
 otherOptions(category,HYPER_CONTEXTS[(i+1)%count][0],[HYPER_CONTEXTS[(i+11)%count][0],HYPER_CONTEXTS[(i+23)%count][0]]),
 "«"+category+"» es una categoría general que contiene los casos «"+a+"» y «"+b+"».",
 "Reconocer una categoría de nivel superior"));
export const HYPER_CLASS:ClassificationActivity[]=HYPER_CONTEXTS.map(([category,a,b],i)=>{
 const other=HYPER_CONTEXTS[(i+1)%count];
 return classify("m1-hyper-class-"+tier(i)+"-"+(i+1),"Hiperonimia",tier(i),
 "Clasifica dos elementos según la categoría general que los incluye.",
 [category,other[0]],
 [{text:"«"+a+"»",label:category,explanation:"«"+a+"» pertenece a la categoría «"+category+"»."},
 {text:"«"+other[1]+"»",label:other[0],explanation:"«"+other[1]+"» pertenece a la categoría «"+other[0]+"»."}],
 "Los hiperónimos reúnen términos más específicos en una clase semántica común.",
 "Distinguir clases y subclases de vocabulario",i);
});
export const HYPER_BUILD:ConstructionActivity[]=HYPER_CONTEXTS.map(([category,a,b],i)=>makeBuild(
 "m1-hyper-build-"+tier(i)+"-"+(i+1),"Hiperonimia",tier(i),
 "Construye una proposición que relacione dos elementos con una categoría más amplia.",
 ["«"+a+"» y «"+b+"»","son ejemplos de","«"+category+"»."],
 "«"+HYPER_CONTEXTS[(i+1)%count][0]+"».",
 "«"+category+"» incluye a «"+a+"» y «"+b+"»; una categoría distinta no describe ambos casos.",
 "Relacionar miembros y categoría en una proposición"));

const formal=(parts:string[])=>parts.join(" ");
export const ADEQ_QUIZ:NextQuiz[]=ADEQ_CONTEXTS.map(([scenario,p1,p2,p3,informal],i)=>{
 const message=formal([p1,p2,p3]);
 const other=ADEQ_CONTEXTS[(i+1)%count];
 if(i>=30){
  const [passage,pronoun,answer,wrong1,wrong2,reason]=REFERENT_CONTEXTS[i-30];
  return quiz("m1-adeq-quiz-"+tier(i)+"-"+(i+1),"Adecuación y referente",tier(i),passage,
   "¿A qué antecedente se refiere «"+pronoun+"» en el contexto?",
   otherOptions(answer,wrong1,[wrong2,"Un elemento que no aparece en el pasaje"]),
   reason,"Identificar el referente de una expresión anafórica");
 }
 return quiz("m1-adeq-quiz-"+tier(i)+"-"+(i+1),"Adecuación y referente",tier(i),
 "Situación: "+scenario+". El mensaje se dirigirá a una institución.",
 "¿Qué redacción es apropiada para el destinatario formal y el propósito indicado?",
 otherOptions(message,informal,[formal(other.slice(1,4)),ADEQ_CONTEXTS[(i+17)%count][4]]),
 "«"+message+"» utiliza registro formal y corresponde a la solicitud o comunicación descrita.",
 "Seleccionar registro y propósito comunicativo");
});
export const ADEQ_CLASS:ClassificationActivity[]=ADEQ_CONTEXTS.map(([scenario,p1,p2,p3,informal],i)=>{
 const message=formal([p1,p2,p3]);
 return classify("m1-adeq-class-"+tier(i)+"-"+(i+1),"Adecuación y referente",tier(i),
 "Distingue el registro de estos mensajes en la situación «"+scenario+"».",
 ["Registro formal","Registro coloquial"],
 [{text:message,label:"Registro formal",explanation:"Se dirige a la institución con fórmulas y precisión adecuadas."},
 {text:informal,label:"Registro coloquial",explanation:"Emplea expresiones propias de una conversación cercana."}],
 "La adecuación depende del destinatario, el canal y el propósito del mensaje; los dos enunciados no tienen el mismo registro.",
 "Clasificar el registro según destinatario",i);
});
export const ADEQ_BUILD:ConstructionActivity[]=ADEQ_CONTEXTS.map(([scenario,p1,p2,p3,informal],i)=>{
 if(i>=30){
  const [passage,pronoun,answer,wrong1,,reason]=REFERENT_CONTEXTS[i-30];
  return makeBuild("m1-adeq-build-"+tier(i)+"-"+(i+1),"Adecuación y referente",tier(i),
  "Construye una explicación de la referencia anafórica en «"+passage+"».",
  ["En «"+passage+"»","el pronombre «"+pronoun+"» retoma a","«"+answer+"»."],
  "«"+wrong1+"».",reason,"Justificar el antecedente de un pronombre según el contexto");
 }
 return makeBuild("m1-adeq-build-"+tier(i)+"-"+(i+1),"Adecuación y referente",tier(i),
  "Organiza una comunicación con registro formal para «"+scenario+"».",
  [p1,p2,p3],informal,
  "La construcción formal «"+formal([p1,p2,p3])+"» mantiene un tratamiento adecuado y solicita o comunica un asunto definido.",
  "Redactar mensajes coherentes para un destinatario formal");
});

export const M1_NEXT_QUIZ:NextQuiz[]=[...HOMO_QUIZ,...HYPER_QUIZ,...ADEQ_QUIZ];
export const M1_NEXT_ACTIVITIES:(ClassificationActivity|ConstructionActivity)[]=[
 ...HOMO_CLASS,...HOMO_BUILD,...HYPER_CLASS,...HYPER_BUILD,...ADEQ_CLASS,...ADEQ_BUILD];
