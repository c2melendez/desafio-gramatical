import type {Level,Mode} from "./grammar";
import type {ScienceItem} from "./science-m1";
import {SOCIAL_TOPICS,SOCIAL_SUBTOPICS,SOCIAL_MODES,SOCIAL_LEVELS,socialFacts} from "./social-m1";
import {socialM2Pool,SOCIAL_M2_LEVEL_COUNT} from "./social-m2";

/** Capa M3 aditiva de Sociales, sin modificar ni regenerar los 6000 registros M1/M2.
 * 20 subtemas × 3 modos × (10+15+25) = 3000 nuevos IDs técnicos.
 * Cada variante deriva de anclajes limitados y no acredita independencia semántica.
 */
export const SOCIAL_M3_LEVEL_COUNT:Record<Level,number>={principiante:30,intermedio:50,avanzado:70};
export const SOCIAL_M3_NEW_PER_LEVEL:Record<Level,number>={principiante:10,intermedio:15,avanzado:25};
export const SOCIAL_M3_NEW_TOTAL=SOCIAL_SUBTOPICS.length*SOCIAL_MODES.length*(10+15+25);
export const SOCIAL_M3_TOTAL=SOCIAL_SUBTOPICS.length*SOCIAL_MODES.length*(30+50+70);
const slug=(s:string)=>s.normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"");
const rotate=<T,>(items:readonly T[],n:number):T[]=>items.map((_,i)=>items[(i+n)%items.length]);
type Operation="distinguir-fuentes"|"examinar-atribucion"|"rechazar-generalizacion"|"inferir-desde-evidencia"|"corregir-conclusion";

export function socialM3Model(topic:string,subtopic:string,level:Level,mode:Mode,index:number):ScienceItem{
 const quota=SOCIAL_M3_NEW_PER_LEVEL[level];
 if(!SOCIAL_TOPICS.some(t=>t.name===topic&&t.subtopics.includes(subtopic))||
  !SOCIAL_LEVELS.includes(level)||!SOCIAL_MODES.includes(mode)||
  !Number.isInteger(index)||index<0||index>=quota)throw Error("Celda Sociales M3 fuera del catálogo");
 const facts=socialFacts(subtopic),k=index%facts.length,variant=Math.floor(index/facts.length);
 const base=facts[k],others=[1,2,3].map(j=>facts[(k+1+((variant+j-1)%4))%facts.length]);
 const foil=others[0],stage=(SOCIAL_LEVELS.indexOf(level)+1) as 1|2|3;
 const operations:Operation[]=["distinguir-fuentes","examinar-atribucion","rechazar-generalizacion","inferir-desde-evidencia","corregir-conclusion"];
 const operation=operations[variant];
 const premise=variant===0?
  `En un expediente de ciencias sociales aparece el caso principal «${base.scenario}». Una nota separada menciona «${foil.scenario}». Se debe evaluar solo el primer caso.`:
 variant===1?
  `En dos fuentes se registran casos diferentes. Fuente A: «${base.scenario}». Fuente B: «${foil.scenario}». Una atribución confunde las características de B con las de A.`:
 variant===2?
  `Un estudiante observa «${base.scenario}» y concluye que necesariamente corresponde a «${foil.concept}». Esa conclusión se contrasta con el caso independiente «${foil.scenario}».`:
 variant===3?
  `Se requiere justificar una inferencia basada en «${base.scenario}». Una explicación competidora utiliza «${foil.property}» para describirla, pero esa propiedad se asocia a otro hecho.`:
  `Una conclusión preliminar confunde «${base.scenario}» con «${foil.scenario}» e identifica el concepto «${foil.concept}». Corrige la atribución sin atribuir al caso inicial una evidencia ajena.`;
 const challenge=level==="principiante"?
  "Distingue la relación directa entre el caso principal, el concepto y su definición.":
  level==="intermedio"?"Aplica el concepto al caso y rechaza una atribución alternativa que carece de apoyo en la fuente principal.":
  "Contrasta hipótesis rivales, identifica la evidencia pertinente y selecciona una conclusión que no sobrepase lo descrito.";
 const prompt=mode==="quiz"?
  `${premise} ${challenge} ¿Qué propiedad describe correctamente el caso principal?`:
  mode==="clasificar"?
  `${premise} ${challenge} Clasifica tres afirmaciones sobre el caso principal como verdaderas o falsas.`:
  `${premise} ${challenge} Construye la interpretación: elige primero el concepto pertinente y después su propiedad.`;
 const options=rotate([base.property,...others.map(x=>x.property)],(index+stage)%4);
 const terms=rotate([base.concept,...others.map(x=>x.concept)],(index+stage+1)%4);
 const assertions=rotate([
  {text:`El caso principal corresponde a: ${base.property}.`,truth:true},
  {text:`El caso principal corresponde a: ${others[0].property}.`,truth:false},
  {text:`El caso principal corresponde a: ${others[1].property}.`,truth:false}
 ],(index+stage)%3);
 const explanation=`La evidencia del caso principal «${base.scenario}» respalda «${base.concept}»: ${base.property}. La fuente alternativa «${foil.scenario}» corresponde a «${foil.concept}»: ${foil.property}. La segunda asociación no permite sustituir la interpretación de la primera.`;
 return {
  id:"social-m3-"+[topic,subtopic,mode,level,index].map(x=>slug(String(x))).join("-"),
  topic,subtopic,level,mode,index,concept:base.concept,prompt,expected:base.property,
  family:"social-m3-"+slug(subtopic)+"-"+slug(base.concept)+"-"+operation,
  explanation,formula:`Evidencia: ${base.scenario} → ${base.concept} → ${base.property}; contraste: ${foil.scenario} → ${foil.concept} → ${foil.property}`,
  source:["Historia contemporánea","Geografía humana","Geografía física","Estratificación social","Origen humano"].includes(subtopic)?
   "catalogo-practica-complementaria":"GUIA-PRE-U-UNAH-2026:p10",
  reviewStatus:"editorial-draft",cognitiveStage:stage,operation,
  requiredEvidence:stage===1?["caso","concepto","criterio"]:stage===2?
   ["evidencia","concepto","contraste","criterio"]:["evidencia","hipótesis","comparación","descarte","conclusión"],
  oracle:{concept:base.concept,property:base.property,scenario:base.scenario},
  options,answerIndex:options.indexOf(base.property),assertions,
  steps:[
   {label:"Concepto que corresponde al caso principal",choices:terms,answerIndex:terms.indexOf(base.concept)},
   {label:"Propiedad que fundamenta ese concepto",choices:options,answerIndex:options.indexOf(base.property)}
  ]
 };
}
export function socialM3NewPool(topic:string,subtopic:string,level:Level,mode:Mode):ScienceItem[]{
 return Array.from({length:SOCIAL_M3_NEW_PER_LEVEL[level]},(_,i)=>socialM3Model(topic,subtopic,level,mode,i));
}
export function socialM3Pool(topic:string,subtopic:string,level:Level,mode:Mode):ScienceItem[]{
 return [...socialM2Pool(topic,subtopic,level,mode),...socialM3NewPool(topic,subtopic,level,mode)];
}
