import type {Level,Mode} from "./grammar";
import {
 SCIENCE_TOPICS,SCIENCE_SUBTOPICS,SCIENCE_MODES,SCIENCE_LEVELS,
 scienceFacts,type ScienceItem
} from "./science-m1";
import {scienceM2Pool,SCIENCE_M2_LEVEL_COUNT} from "./science-m2";

/** Capa de cierre de Ciencias Naturales: aditiva, preserva absolutamente los M1/M2.
 * 57 combinaciones × 50 registros nuevos = 2850 IDs técnicos, 8550 en total.
 * No equivale a 2850 preguntas independientes ni a certificación docente.
 */
export const SCIENCE_M3_LEVEL_COUNT:Record<Level,number>={principiante:30,intermedio:50,avanzado:70};
export const SCIENCE_M3_NEW_PER_LEVEL:Record<Level,number>={principiante:10,intermedio:15,avanzado:25};
export const SCIENCE_M3_NEW_TOTAL=SCIENCE_SUBTOPICS.length*SCIENCE_MODES.length*(10+15+25);
export const SCIENCE_M3_TOTAL=SCIENCE_SUBTOPICS.length*SCIENCE_MODES.length*(30+50+70);
const slug=(s:string)=>s.normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"");
const rotate=<T,>(items:readonly T[],n:number):T[]=>items.map((_,i)=>items[(i+n)%items.length]);
type Operation="discriminar-observacion"|"contrastacion-mecanismos"|"corregir-inferencia";
function scienceM3Item(topic:string,subtopic:string,level:Level,mode:Mode,index:number):ScienceItem{
 const quota=SCIENCE_M3_NEW_PER_LEVEL[level];
 if(!SCIENCE_TOPICS.some(t=>t.name===topic&&t.subtopics.includes(subtopic))||
  !SCIENCE_LEVELS.includes(level)||!SCIENCE_MODES.includes(mode)||
  !Number.isInteger(index)||index<0||index>=quota)throw Error("Celda Naturales M3 fuera de catálogo");
 const facts=scienceFacts(subtopic);
 const base=facts[index%facts.length];
 const variant=Math.floor(index/facts.length);
 const shift=(variant+index)%facts.length;
 const comparisons=[facts[(index+3+variant)%facts.length],facts[(index+5+variant)%facts.length],facts[(index+7+variant)%facts.length]];
 const contrast=facts[(index+3+variant)%facts.length];
 const stage=(SCIENCE_LEVELS.indexOf(level)+1) as 1|2|3;
 const operation:Operation=variant===0?"discriminar-observacion":variant===1?"contrastacion-mecanismos":"corregir-inferencia";
 const scenario=variant===0?
  `Se recibe este registro de laboratorio: «${base.scenario}». Otras situaciones del mismo capítulo pueden parecer relacionadas: «${contrast.scenario}».`:
  variant===1?
  `Dos informes describen fenómenos diferentes. Informe principal: «${base.scenario}». Informe alternativo: «${contrast.scenario}». Debes justificar únicamente el principal.`:
  `Una explicación preliminar asocia «${base.scenario}» a «${contrast.concept}». Para evaluar la propuesta, compárala con «${contrast.scenario}» y determina qué concepto realmente corresponde al primer registro.`;
 const challenge=level==="principiante"?
  "Relaciona evidencia, concepto y función sin confundir el fenómeno alternativo.":
  level==="intermedio"?
  "Usa la observación como evidencia y descarta la función que describe el fenómeno alternativo.":
  "Contrasta hipótesis rivales, localiza el error de atribución y justifica la relación observación-concepto-función.";
 const instruction=mode==="quiz"?
  `${scenario} ${challenge} ¿Qué propiedad explica el informe principal?`:
  mode==="clasificar"?
  `${scenario} ${challenge} Evalúa tres atribuciones de función al informe principal como verdaderas o falsas.`:
  `${scenario} ${challenge} Construye la conclusión seleccionando el concepto defendible y la función que lo respalda.`;
 const expected=base.property;
 const props=rotate([expected,...comparisons.map(f=>f.property)],(index+stage)%4);
 const terms=rotate([base.concept,...comparisons.map(f=>f.concept)],(index+stage+1)%4);
 const assertions=rotate([
  {text:`El informe principal se explica mediante: ${base.property}.`,truth:true},
  {text:`El informe principal se explica mediante: ${comparisons[0].property}.`,truth:false},
  {text:`El informe principal se explica mediante: ${comparisons[1].property}.`,truth:false}
 ],(index+stage)%3);
 const steps=[
  {label:"Concepto respaldado por los datos del informe principal",choices:terms,answerIndex:terms.indexOf(base.concept)},
  {label:"Función que justifica el concepto elegido",choices:props,answerIndex:props.indexOf(expected)}
 ];
 const explanation=`El informe principal indica «${base.scenario}»; la explicación respaldada es «${base.concept}», cuya función es ${base.property}. El informe alternativo indica «${contrast.scenario}», correspondiente a «${contrast.concept}»: ${contrast.property}. La evidencia del fenómeno alternativo no demuestra el mecanismo del principal.`;
 const provenance=SCIENCE_TOPICS.find(t=>t.name===topic)!;
 void provenance;
 const source:ScienceItem["source"]=["Ecología","Tabla periódica","Materia","Reacciones"].includes(subtopic)?"catalogo-practica-complementaria":
  topic==="Biología"?(["Método científico","Cuerpo humano"].includes(subtopic)?"GUIA-PRE-U-UNAH-2026:p8":"GUIA-PRE-U-UNAH-2026:p7"):
  "GUIA-PRE-U-UNAH-2026:p9";
 return {
  id:"science-m3-"+[topic,subtopic,mode,level,index].map(x=>slug(String(x))).join("-"),
  topic,subtopic,level,mode,index,
  family:"science-m3-"+slug(subtopic)+"-"+slug(base.concept)+"-"+operation,
  concept:base.concept,prompt:instruction,expected,
  explanation,formula:`Observación: ${base.scenario} → ${base.concept} → ${base.property}; contraejemplo: ${contrast.concept} → ${contrast.property}`,
  source,reviewStatus:"editorial-draft",cognitiveStage:stage,operation,
  requiredEvidence:stage===1?["registro","concepto","función"]:stage===2?
   ["observación","concepto","función","descarte"]:["observación","hipótesis","contraejemplo","criterio","conclusión"],
  oracle:{concept:base.concept,property:base.property,scenario:base.scenario},
  options:props,answerIndex:props.indexOf(expected),assertions,steps
 };
}
export function scienceM3NewPool(topic:string,subtopic:string,level:Level,mode:Mode):ScienceItem[]{
 return Array.from({length:SCIENCE_M3_NEW_PER_LEVEL[level]},(_,i)=>scienceM3Item(topic,subtopic,level,mode,i));
}
export function scienceM3Pool(topic:string,subtopic:string,level:Level,mode:Mode):ScienceItem[]{
 return [...scienceM2Pool(topic,subtopic,level,mode),...scienceM3NewPool(topic,subtopic,level,mode)];
}
