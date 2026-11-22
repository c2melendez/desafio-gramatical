import type {Level,Mode} from "./grammar";
import type {ScienceItem} from "./science-m1";
import {SOFT_TOPICS,SOFT_SUBTOPICS,SOFT_MODES,SOFT_LEVELS,softFacts,softModel} from "./soft-m1";
import {softM2Pool} from "./soft-m2";

/** Habilidades Blandas M3 — práctica COMPLEMENTARIA, no reactivos PHUMA oficiales.
 * M1 1080 + M2 1320 + M3 1200 = 3600 registros técnicos.
 * Ocho subtemas, 72 celdas, 40 anclajes de conducta sin certificación editorial
 * de independencia semántica o equivalencia psicométrica.
 */
export const SOFT_M3_LEVEL_COUNT:Record<Level,number>={principiante:30,intermedio:50,avanzado:70};
export const SOFT_M3_NEW_PER_LEVEL:Record<Level,number>={principiante:10,intermedio:15,avanzado:25};
export const SOFT_M3_NEW_TOTAL=SOFT_SUBTOPICS.length*SOFT_MODES.length*(10+15+25);
export const SOFT_M3_TOTAL=SOFT_SUBTOPICS.length*SOFT_MODES.length*(30+50+70);
const slug=(s:string)=>s.normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"");
const rotate=<T,>(items:readonly T[],offset:number)=>items.map((_,i)=>items[(i+offset)%items.length]);
type Operation="evaluar-evidencia-rival"|"priorizar-conducta"|"auditar-interpretacion"|"transferir-criterio"|"justificar-limites";
export function softM3Model(topic:string,subtopic:string,level:Level,mode:Mode,index:number):ScienceItem{
 const limit=SOFT_M3_NEW_PER_LEVEL[level];
 if(!SOFT_TOPICS.some(t=>t.name===topic&&t.subtopics.includes(subtopic))||
  !SOFT_LEVELS.includes(level)||!SOFT_MODES.includes(mode)||!Number.isInteger(index)||
  index<0||index>=limit)throw Error("Celda Habilidades Blandas M3 fuera del catálogo");
 const facts=softFacts(subtopic),k=index%5,variant=Math.floor(index/5),f=facts[k];
 const alternatives=[1,2,3].map(j=>facts[(k+1+((variant+j-1)%4))%5]),rival=alternatives[0];
 const operations:Operation[]=["evaluar-evidencia-rival","priorizar-conducta","auditar-interpretacion","transferir-criterio","justificar-limites"];
 const operation=operations[variant],stage=(SOFT_LEVELS.indexOf(level)+1) as 1|2|3;
 const context=variant===0?
  `En una evaluación de comportamientos, el caso principal relata «${f.scenario}». Otra interpretación propone «${rival.concept}». Contrasta la inferencia con los hechos observables.`:
 variant===1?
  `Durante una reflexión grupal se comparan dos conductas. En la situación A «${f.scenario}»; en la situación B «${rival.scenario}». Solo se pide evaluar el caso A, sin mezclar criterios.`:
 variant===2?
  `Un informe atribuye al episodio «${f.scenario}» el criterio «${rival.property}». Examina qué conducta puede afirmarse con la información disponible.`:
 variant===3?
  `Una persona propone aplicar la descripción «${rival.concept}» a «${f.scenario}». Identifica la habilidad pertinente y la evidencia que permite rechazar la atribución alternativa.`:
  `Un equipo presenta la situación «${f.scenario}» y discute dos posibles explicaciones. Contrasta la descripción «${rival.property}» con el comportamiento realmente registrado.`;
 const challenge=stage===1?
  "Reconoce la habilidad observada sin atribuir intenciones ocultas.":
  stage===2?
  "Aplica un criterio observable para separar conductas semejantes en escenarios distintos.":
  "Evalúa atribuciones en conflicto, identifica límites de inferencia y justifica cuál conclusión es proporcional a la evidencia.";
 const prompt=mode==="quiz"?
  `${context} ${challenge} ¿Qué criterio corresponde únicamente al comportamiento del caso principal?`:
 mode==="clasificar"?
  `${context} ${challenge} Clasifica tres afirmaciones sobre la evidencia del caso principal como verdaderas o falsas.`:
  `${context} ${challenge} Construye una conclusión defendible eligiendo la habilidad y después su criterio observable.`;
 const options=rotate([f.property,...alternatives.map(x=>x.property)],(index+stage)%4);
 const names=rotate([f.concept,...alternatives.map(x=>x.concept)],(index+stage+2)%4);
 const assertions=rotate([
  {text:`La evidencia del caso principal respalda: ${f.property}.`,truth:true},
  {text:`La evidencia del caso principal respalda: ${alternatives[0].property}.`,truth:false},
  {text:`La evidencia del caso principal respalda: ${alternatives[1].property}.`,truth:false}
 ],(index+stage)%3);
 const explanation=`La situación «${f.scenario}» ejemplifica «${f.concept}», pues ${f.property}. En contraste, «${rival.scenario}» corresponde a «${rival.concept}» porque ${rival.property}. No debe trasladarse el criterio del caso rival ni atribuir características personales que no se observaron.`;
 const old=softModel(topic,subtopic,level,mode,k);
 return {...old,
  id:"blandas-m3-"+[topic,subtopic,mode,level,index].map(x=>slug(String(x))).join("-"),
  topic,subtopic,mode,level,index,concept:f.concept,prompt,expected:f.property,explanation,
  formula:`Evidencia principal: ${f.scenario} => ${f.concept}: ${f.property}; hipótesis rival: ${rival.scenario} => ${rival.concept}: ${rival.property}`,
  family:"blandas-m3-"+slug(subtopic)+"-"+slug(f.concept)+"-"+operation,
  operation,requiredEvidence:stage===1?["observación","concepto","criterio"]:
   stage===2?["evidencia principal","criterio aplicado","alternativa descartada"]:
    ["hecho observable","atribución rival","contraste","conclusión acotada"],
  oracle:{concept:f.concept,property:f.property,scenario:f.scenario},
  options,answerIndex:options.indexOf(f.property),assertions,
  steps:[
   {label:"Habilidad sustentada por el caso principal",choices:names,answerIndex:names.indexOf(f.concept)},
   {label:"Criterio que fundamenta esa habilidad",choices:options,answerIndex:options.indexOf(f.property)}
  ]
 };
}
export function softM3NewPool(topic:string,subtopic:string,level:Level,mode:Mode):ScienceItem[]{
 return Array.from({length:SOFT_M3_NEW_PER_LEVEL[level]},(_,i)=>softM3Model(topic,subtopic,level,mode,i));
}
export function softM3Pool(topic:string,subtopic:string,level:Level,mode:Mode):ScienceItem[]{
 return [...softM2Pool(topic,subtopic,level,mode),...softM3NewPool(topic,subtopic,level,mode)];
}
