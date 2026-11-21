import type {Level,Mode} from "./grammar";
import type {ScienceItem} from "./science-m1";
import {SOFT_TOPICS,SOFT_SUBTOPICS,SOFT_MODES,SOFT_LEVELS,softPool,softFacts,softModel} from "./soft-m1";

/** Habilidades Blandas M2: práctica COMPLEMENTARIA del catálogo, no un área
 * oficialmente enumerada en la guía PHUMA consultada.
 * 8 subtemas × 3 juegos × (10+20+25)=1320 registros técnicos nuevos.
 * 1080 IDs M1 preservados sin cambios: acumulado 2400 / 72 celdas.
 * Cinco hechos por subtema dan variantes, no 2400 retos independientes.
 */
export const SOFT_M2_LEVEL_COUNT:Record<Level,number>={principiante:20,intermedio:35,avanzado:45};
export const SOFT_M2_NEW_PER_LEVEL:Record<Level,number>={principiante:10,intermedio:20,avanzado:25};
export const SOFT_M2_NEW_TOTAL=SOFT_SUBTOPICS.length*SOFT_MODES.length*(10+20+25);
export const SOFT_M2_TOTAL=SOFT_SUBTOPICS.length*SOFT_MODES.length*(20+35+45);
const slug=(s:string)=>s.normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"");
const rotate=<T,>(xs:readonly T[],n:number):T[]=>xs.map((_,i)=>xs[(i+n)%xs.length]);
type Operation="verificar-evidencia"|"distinguir-casos"|"corregir-atribucion"|"evaluar-supuesto"|"fundamentar-conclusion";

export function softM2Model(topic:string,subtopic:string,level:Level,mode:Mode,index:number):ScienceItem{
 const count=SOFT_M2_NEW_PER_LEVEL[level];
 if(!SOFT_TOPICS.some(t=>t.name===topic&&t.subtopics.includes(subtopic))||
  !SOFT_LEVELS.includes(level)||!SOFT_MODES.includes(mode)||!Number.isInteger(index)||
  index<0||index>=count)throw Error("Celda Habilidades Blandas M2 fuera del catálogo");
 const facts=softFacts(subtopic),k=index%5,variant=Math.floor(index/5),f=facts[k];
 // Todos los distractores proceden de anclajes distintos del anclaje correcto.
 const other=[1,2,3].map(j=>facts[(k+1+((variant+j-1)%4))%5]),foil=other[0];
 const operations:Operation[]=["verificar-evidencia","distinguir-casos","corregir-atribucion","evaluar-supuesto","fundamentar-conclusion"];
 const operation=operations[variant],stage=(SOFT_LEVELS.indexOf(level)+1) as 1|2|3;
 const context=variant===0?
  `En un registro de comportamiento se observa «${f.scenario}». Una evaluación responsable debe fundamentarse en una acción observable, no en la personalidad de la persona.`:
 variant===1?
  `Se comparan dos decisiones, sin atribuir intenciones ocultas. Caso A: «${f.scenario}». Caso B: «${foil.scenario}». Clasifica únicamente la actuación descrita en A.`:
 variant===2?
  `Una conclusión afirma que la acción «${f.scenario}» evidencia «${foil.concept}». Se pide contrastar esa interpretación con un criterio observable y descartar la confusión.`:
 variant===3?
  `Un equipo relata «${f.scenario}» y propone describirlo con «${foil.property}». Determina si la explicación coincide con lo registrado o pertenece a otra conducta.`:
  `Un debate plantea cuál es la habilidad que muestra «${f.scenario}». Para evitar una generalización injustificada, compárala con la alternativa «${foil.scenario}» y conserva solo lo sustentado por el caso principal.`;
 const challenge=level==="principiante"?
  "Reconoce la conducta observada y su criterio directo.":
  level==="intermedio"?
  "Aplica un criterio contextual y rechaza una explicación próxima que no describe el caso principal.":
  "Contrasta las atribuciones rivales, separa hechos de inferencias y justifica una conclusión proporcional a la evidencia.";
 const prompt=mode==="quiz"?
  `${context} ${challenge} ¿Cuál criterio corresponde a la conducta del caso principal?`:
 mode==="clasificar"?
  `${context} ${challenge} Señala cuáles de las tres asociaciones se sostienen con la evidencia principal.`:
  `${context} ${challenge} Construye la interpretación: primero identifica la habilidad y luego el criterio observado.`;
 const options=rotate([f.property,...other.map(x=>x.property)],(index+stage)%4);
 const names=rotate([f.concept,...other.map(x=>x.concept)],(index+stage+2)%4);
 const assertions=rotate([
  {text:`El caso principal está sustentado por: ${f.property}.`,truth:true},
  {text:`El caso principal está sustentado por: ${other[0].property}.`,truth:false},
  {text:`El caso principal está sustentado por: ${other[1].property}.`,truth:false}
 ],(index+stage)%3);
 const explanation=`El caso «${f.scenario}» ejemplifica «${f.concept}» porque ${f.property}. En cambio, «${foil.scenario}» se asocia a «${foil.concept}» porque ${foil.property}. No es válido atribuir al caso principal la propiedad del otro ejemplo ni deducir características personales no observadas.`;
 const old=softModel(topic,subtopic,level,mode,k);
 return {...old,
  id:"blandas-m2-"+[topic,subtopic,mode,level,index].map(v=>slug(String(v))).join("-"),
  index,concept:f.concept,prompt,expected:f.property,explanation,
  formula:`Caso A: ${f.scenario} → ${f.concept} → ${f.property}; contraste B: ${foil.scenario} → ${foil.concept} → ${foil.property}`,
  family:"blandas-m2-"+slug(subtopic)+"-"+slug(f.concept)+"-"+operation,
  operation,
  requiredEvidence:level==="principiante"?["conducta principal","concepto","criterio"]:
   level==="intermedio"?["observación","concepto","criterio","atribución alternativa"]:
   ["caso principal","hipótesis rival","contraste","evidencia","conclusión"],
  oracle:{concept:f.concept,property:f.property,scenario:f.scenario},
  options,answerIndex:options.indexOf(f.property),assertions,
  steps:[
   {label:"Habilidad que explica la actuación principal",choices:names,answerIndex:names.indexOf(f.concept)},
   {label:"Criterio observable que la justifica",choices:options,answerIndex:options.indexOf(f.property)}
  ]
 };
}
export function softM2NewPool(topic:string,subtopic:string,level:Level,mode:Mode):ScienceItem[]{
 return Array.from({length:SOFT_M2_NEW_PER_LEVEL[level]},(_,i)=>softM2Model(topic,subtopic,level,mode,i));
}
export function softM2Pool(topic:string,subtopic:string,level:Level,mode:Mode):ScienceItem[]{
 return [...softPool(topic,subtopic,level,mode),...softM2NewPool(topic,subtopic,level,mode)];
}
