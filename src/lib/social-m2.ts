import type {Level,Mode} from "./grammar";
import type {ScienceItem} from "./science-m1";
import {SOCIAL_TOPICS,SOCIAL_SUBTOPICS,SOCIAL_MODES,SOCIAL_LEVELS,socialPool,socialFacts,socialModel} from "./social-m1";

/** Expansión acumulativa e idempotente de Ciencias Sociales M2.
 * 20 subtemas × 3 juegos × (10+20+25) = 3300 registros nuevos.
 * Los 2700 registros de M1 y todos sus IDs permanecen intactos.
 * Cinco hechos por subtema sustentan variantes técnicas, NO 6000 tareas independientes.
 */
export const SOCIAL_M2_LEVEL_COUNT:Record<Level,number>={principiante:20,intermedio:35,avanzado:45};
export const SOCIAL_M2_NEW_PER_LEVEL:Record<Level,number>={principiante:10,intermedio:20,avanzado:25};
export const SOCIAL_M2_NEW_TOTAL=SOCIAL_SUBTOPICS.length*SOCIAL_MODES.length*(10+20+25);
export const SOCIAL_M2_TOTAL=SOCIAL_SUBTOPICS.length*SOCIAL_MODES.length*(20+35+45);
const slug=(s:string)=>s.normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"");
const rotate=<T,>(xs:readonly T[],n:number):T[]=>xs.map((_,i)=>xs[(i+n)%xs.length]);
type Challenge="reconocer-evidencia"|"comparar-fuentes"|"cuestionar-generalizacion"|"evaluar-causa"|"refutar-confusion";
export function socialM2Model(topic:string,subtopic:string,level:Level,mode:Mode,index:number):ScienceItem{
 const count=SOCIAL_M2_NEW_PER_LEVEL[level];
 if(!SOCIAL_TOPICS.some(t=>t.name===topic&&t.subtopics.includes(subtopic))||
   !SOCIAL_LEVELS.includes(level)||!SOCIAL_MODES.includes(mode)||
   !Number.isInteger(index)||index<0||index>=count)throw Error("Celda Sociales M2 fuera del catálogo");
 const facts=socialFacts(subtopic),k=index%5,variant=Math.floor(index/5),f=facts[k];
 const other=[1,2,3].map(j=>facts[(k+1+((variant+j-1)%4))%5]);
 const foil=other[0];
 const challenges:Challenge[]=["reconocer-evidencia","comparar-fuentes","cuestionar-generalizacion","evaluar-causa","refutar-confusion"];
 const task=challenges[variant];
 const point=variant===0?
  `Un informe describe esta situación observable: «${f.scenario}». Determina qué concepto del tema explica específicamente la observación, en lugar de una categoría próxima.`:
  variant===1?
  `Fuente A: «${f.scenario}». Fuente B: «${foil.scenario}». Se pregunta exclusivamente por A; contrasta los dos casos sin mezclar sus propiedades.`:
  variant===2?
  `Al estudiar «${f.scenario}», una persona generaliza erróneamente que se trata de «${foil.concept}». Revisa qué dato permite sostener una interpretación mejor.`:
  variant===3?
  `Se analiza un proceso social: «${f.scenario}». Frente a una interpretación alternativa sobre «${foil.concept}», distingue la relación que efectivamente apoya la descripción inicial.`:
  `Una explicación atribuye «${f.scenario}» a «${foil.concept}» y propone «${foil.property}». Identifica el concepto y criterio que sí explican el hecho original.`;
 const stage=SOCIAL_LEVELS.indexOf(level)+1 as 1|2|3;
 const instruction=level==="principiante"?"Reconoce la asociación entre evidencia y concepto.":
  level==="intermedio"?"Aplica el concepto al caso y discrimina una explicación alternativa.":
  "Compara los supuestos y evalúa por qué una conclusión se sustenta en la evidencia y otra no.";
 const prompt=mode==="clasificar"?
  `${point} ${instruction} Evalúa las tres asociaciones y marca cada una verdadera o falsa.`:
  mode==="quiz"?
  `${point} ${instruction} Selecciona la descripción que responde a la fuente principal.`:
  `${point} ${instruction} Reconstruye el argumento: elige el concepto y luego la propiedad que lo fundamenta.`;
 const choices=rotate([f.property,...other.map(x=>x.property)],(index+stage)%4);
 const names=rotate([f.concept,...other.map(x=>x.concept)],(index+stage+2)%4);
 const assertions=rotate([
  {text:`Para la fuente principal corresponde: ${f.property}.`,truth:true},
  {text:`Para la fuente principal corresponde: ${other[0].property}.`,truth:false},
  {text:`Para la fuente principal corresponde: ${other[1].property}.`,truth:false}
 ],(index+stage)%3);
 const context=`La evidencia «${f.scenario}» describe «${f.concept}» porque ${f.property}. No fundamenta «${foil.concept}», asociado a «${foil.scenario}» y a esta otra característica: ${foil.property}.`;
 const old=socialModel(topic,subtopic,level,mode,k);
 return {...old,id:"social-m2-"+[topic,subtopic,mode,level,index].map(v=>slug(String(v))).join("-"),
  index,concept:f.concept,prompt,expected:f.property,explanation:context,
  formula:`Fuente A: ${f.scenario} → ${f.concept} → ${f.property}; contraste B: ${foil.scenario} → ${foil.concept} → ${foil.property}`,
  family:"social-m2-"+slug(subtopic)+"-"+slug(f.concept)+"-"+task,
  operation:task,
  requiredEvidence:level==="principiante"?["fuente principal","concepto","criterio"]:
   level==="intermedio"?["observación","concepto","criterio","contraste"]:
   ["fuente principal","supuesto rival","evidencia","contraste","conclusión"],
  oracle:{concept:f.concept,property:f.property,scenario:f.scenario},
  options:choices,answerIndex:choices.indexOf(f.property),assertions,
  steps:[
   {label:"Reconoce el concepto que explica la fuente A",choices:names,answerIndex:names.indexOf(f.concept)},
   {label:"Elige el criterio que fundamenta la fuente A",choices,answerIndex:choices.indexOf(f.property)}
  ]};
}
export function socialM2NewPool(topic:string,subtopic:string,level:Level,mode:Mode):ScienceItem[]{
 return Array.from({length:SOCIAL_M2_NEW_PER_LEVEL[level]},(_,i)=>socialM2Model(topic,subtopic,level,mode,i));
}
export function socialM2Pool(topic:string,subtopic:string,level:Level,mode:Mode):ScienceItem[]{
 return [...socialPool(topic,subtopic,level,mode),...socialM2NewPool(topic,subtopic,level,mode)];
}
