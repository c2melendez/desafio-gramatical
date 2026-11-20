import type {Level,Mode} from "./grammar";
import {
 SCIENCE_TOPICS,SCIENCE_SUBTOPICS,SCIENCE_MODES,SCIENCE_LEVELS,SCIENCE_LEVEL_COUNT,
 sciencePool,scienceModel,scienceFacts,type ScienceFact,type ScienceItem
} from "./science-m1";

/**
 * Capa M2 aditiva; no reescribe ninguna clave o ID de M1.
 * 19 subtemas × 3 juegos × (10+20+25) = 3135 registros técnicos nuevos.
 * Cada caso se construye desde hechos originales, no se acredita independencia
 * conceptual ni validez científica externa por el mero cambio de contexto.
 */
export const SCIENCE_M2_LEVEL_COUNT:Record<Level,number>={principiante:20,intermedio:35,avanzado:45};
export const SCIENCE_M2_NEW_PER_LEVEL:Record<Level,number>={principiante:10,intermedio:20,avanzado:25};
const slug=(s:string)=>s.normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"");
const rotate=<T,>(xs:readonly T[],n:number)=>xs.map((_,i)=>xs[(i+n)%xs.length]);
type Challenge="observacion"|"comparacion"|"contraejemplo";
function buildItem(topic:string,subtopic:string,level:Level,mode:Mode,index:number):ScienceItem{
 const quota=SCIENCE_M2_NEW_PER_LEVEL[level];
 if(!SCIENCE_TOPICS.some(t=>t.name===topic&&t.subtopics.includes(subtopic))||
  !SCIENCE_LEVELS.includes(level)||!SCIENCE_MODES.includes(mode)||
  !Number.isInteger(index)||index<0||index>=quota)throw Error("Celda Naturales M2 fuera de catálogo");
 const facts=scienceFacts(subtopic);
 const k=index%facts.length,iteration=Math.floor(index/facts.length);
 const fact=facts[k],foil=facts[(k+iteration+3)%facts.length];
 const foils=[1,2,3].map(j=>facts[(k+iteration+j+3)%facts.length]);
 const prior=scienceModel(topic,subtopic,level,mode,k);
 const levelStage=SCIENCE_LEVELS.indexOf(level)+1 as 1|2|3;
 const challenge:Challenge=iteration===0?"observacion":iteration===1?"comparacion":"contraejemplo";
 const point=iteration===0?
  `Durante una investigación se registra la siguiente observación: «${fact.scenario}». Se busca la explicación biológica o física específica, y no una característica relacionada pero distinta.`:
  iteration===1?
  `Compara estas dos situaciones: A) «${fact.scenario}»; B) «${foil.scenario}». La pregunta se refiere solamente a A; evita atribuir a A el mecanismo propio de B.`:
  `Un estudiante propone explicar «${fact.scenario}» mediante el mecanismo de «${foil.concept}». Revisa el error: el mecanismo citado describe «${foil.scenario}», que no es la observación examinada.`;
 const task=level==="principiante"?
  `Reconoce el concepto preciso vinculado a la observación y su función.`:
  level==="intermedio"?
  `Relaciona la observación con una función específica y descarta la alternativa próxima.`:
  `Contrasta las dos explicaciones, identifica cuál se ajusta a la observación original y fundamenta el descarte.`;
 const prompt=mode==="clasificar"?
  `${point} ${task} Indica si cada una de las tres relaciones entre observación y propiedad es verdadera o falsa.`:
  mode==="quiz"?
  `${point} ${task} ¿Cuál de estas funciones corresponde inequívocamente a la situación indicada?`:
  `${point} ${task} Reconstruye la explicación científica: selecciona primero el concepto y después su función correspondiente.`;
 // Escoge únicamente otros conceptos de ese mismo subtema; no inventa propiedades.
 const propertyCandidates=[fact.property,...foils.map(f=>f.property)];
 const conceptCandidates=[fact.concept,...foils.map(f=>f.concept)];
 const options=rotate(propertyCandidates,(index+levelStage)%4);
 const names=rotate(conceptCandidates,(index+levelStage+2)%4);
 const assertions=rotate([
  {text:`En la observación A, la función relevante es: ${fact.property}.`,truth:true},
  {text:`En la observación A, la función relevante es: ${foils[0].property}.`,truth:false},
  {text:`En la observación A, la función relevante es: ${foils[1].property}.`,truth:false}
 ],(index+levelStage)%3);
 const steps=[
  {label:"Identifica el concepto respaldado por la observación original",choices:names,answerIndex:names.indexOf(fact.concept)},
  {label:"Selecciona la función que explica la observación sin confundirla con otra",choices:options,answerIndex:options.indexOf(fact.property)}
 ];
 const id="science-m2-"+[topic,subtopic,mode,level,index].map(x=>slug(String(x))).join("-");
 const explanation=`La observación «${fact.scenario}» corresponde a «${fact.concept}»: ${fact.property}. La alternativa «${foil.concept}» describe «${foil.scenario}» y cumple otra función: ${foil.property}. La explicación correcta se apoya en la observación original, no en la semejanza del vocabulario.`;
 return {...prior,id,index,concept:fact.concept,prompt,expected:fact.property,explanation,
  formula:`Caso original: ${fact.scenario} → ${fact.concept} → ${fact.property}; contraste: ${foil.concept} → ${foil.property}`,
  family:"science-m2-"+slug(subtopic)+"-"+slug(fact.concept)+"-"+challenge,
  operation:challenge==="observacion"?"reconocer-evidencia":challenge==="comparacion"?"comparar-situaciones":"refutar-hipotesis",
  requiredEvidence:level==="principiante"?["situación","concepto","función"]:
   level==="intermedio"?["observación","mecanismo","contraste","criterio"]:["observación","mecanismo","alternativa","descarte","conclusión"],
  oracle:{concept:fact.concept,property:fact.property,scenario:fact.scenario},
  options,answerIndex:options.indexOf(fact.property),assertions,steps};
}
export function scienceM2NewPool(topic:string,subtopic:string,level:Level,mode:Mode):ScienceItem[]{
 return Array.from({length:SCIENCE_M2_NEW_PER_LEVEL[level]},(_,i)=>buildItem(topic,subtopic,level,mode,i));
}
export function scienceM2Pool(topic:string,subtopic:string,level:Level,mode:Mode):ScienceItem[]{
 return [...sciencePool(topic,subtopic,level,mode),...scienceM2NewPool(topic,subtopic,level,mode)];
}
export const SCIENCE_M2_NEW_TOTAL=SCIENCE_SUBTOPICS.length*SCIENCE_MODES.length*(10+20+25);
export const SCIENCE_M2_TOTAL=SCIENCE_SUBTOPICS.length*SCIENCE_MODES.length*(20+35+45);
