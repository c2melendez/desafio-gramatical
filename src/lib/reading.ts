import {m2ReadingPool} from "./m2-reading";
import type {Level,Mode} from "./grammar";
import {MAIN_IDEA_CHOICE_CASES,type MainIdeaChoiceCase} from "./main-idea-choice-cases";
import {MAIN_IDEA_DETECTIVE_CASES,type MainIdeaDetectiveCase} from "./main-idea-detective-cases";
import {MAIN_IDEA_RECONSTRUCT_CASES,type MainIdeaReconstructCase} from "./main-idea-reconstruct-cases";
import {INFERENCE_DETECTIVE_CASES,type InferenceDetectiveCase} from "./inference-detective-cases";
import {INFERENCE_CHOICE_CASES,type InferenceChoiceCase} from "./inference-choice-cases";
import {INFERENCE_RECONSTRUCT_CASES,type InferenceReconstructCase} from "./inference-reconstruct-cases";
import {CRITICAL_DETECTIVE_CASES,type CriticalDetectiveCase} from "./critical-detective-cases";
import {CRITICAL_CHOICE_CASES,type CriticalChoiceCase} from "./critical-choice-cases";
import {CRITICAL_RECONSTRUCT_CASES,type CriticalReconstructCase} from "./critical-reconstruct-cases";
import {VOCAB_DETECTIVE_CASES,VOCAB_CHOICE_CASES,VOCAB_RECONSTRUCT_CASES,type NewReadingDetective,type NewReadingChoice,type NewReadingReconstruct} from "./reading-vocabulary-block";
import {ANALYSIS_DETECTIVE_CASES,ANALYSIS_CHOICE_CASES,ANALYSIS_RECONSTRUCT_CASES,type AnalysisDetective,type AnalysisChoice,type AnalysisReconstruct} from "./reading-analysis-block";
import {COMPARISON_DETECTIVE_CASES,COMPARISON_CHOICE_CASES,COMPARISON_RECONSTRUCT_CASES,type CompareDetective,type CompareChoice,type CompareReconstruct} from "./reading-comparison-block";
import {FIGURATIVE_DETECTIVE_CASES,FIGURATIVE_CHOICE_CASES,FIGURATIVE_RECONSTRUCT_CASES,type FigurativeDetectiveCase,type FigurativeChoiceCase,type FigurativeReconstructCase} from "./reading-figurative-block";
import {readRotation,rotationKey,selectRotation,writeRotation,type RotationState} from "./rotation";
export const READING_SUBTOPICS = ["Idea principal","Inferencias","Lectura crítica","Vocabulario en contexto","Análisis de textos","Lectura comparada","Lenguaje figurado"] as const;
export type ReadingSubtopic = typeof READING_SUBTOPICS[number];
export type EvidenceTag="explicit"|"inference"|"unsupported";
export const EVIDENCE_LABEL:Record<EvidenceTag,string>={explicit:"Dato explícito",inference:"Inferencia razonable",unsupported:"No sustentado"};
export type ReadingChallenge={
 id:string;level:Level;subtopic:ReadingSubtopic;title:string;passage:string;
 claims:{text:string;tag:EvidenceTag;explanation:string}[];
 question:string;options:[string,string,string,string];answer:number;explanation:string;
 order:{parts:[string,string,string];hint:string;explanation:string};
};
type Seed={level:Level;title:string;passage:string;explicit:string;inference:string;unsupported:string;main:string;word:string;wordMeaning:string;figure:string;figureMeaning:string;comparison:string;steps:[string,string,string]};
const SEEDS:Seed[]=[
  {
    "level": "principiante",
    "title": "La biblioteca del barrio",
    "passage": "La biblioteca del barrio ampliará su horario de dos a cinco tardes a partir del lunes. Un grupo de voluntarios ayudará a ordenar libros, pero el préstamo seguirá a cargo de la bibliotecaria. El aviso informa que el nuevo horario facilitará las visitas de estudiantes. En otra nota, varios vecinos solicitaron más mesas de lectura; aún no hay una decisión sobre esa petición. Un cartel resumió el propósito así: «abrió una puerta al conocimiento».",
    "explicit": "La biblioteca amplía de dos a cinco tardes su horario.",
    "inference": "Más estudiantes podrán visitar la biblioteca si aprovechan el horario.",
    "unsupported": "La biblioteca ya compró mesas nuevas.",
    "main": "La ampliación del horario para facilitar las visitas",
    "word": "dos a cinco tardes",
    "wordMeaning": "La biblioteca abrirá cinco tardes semanales en lugar de dos.",
    "figure": "abrió una puerta al conocimiento",
    "figureMeaning": "presentó nuevas oportunidades para aprender",
    "comparison": "El aviso confirma la ampliación, mientras la otra nota expresa una solicitud sin respuesta.",
    "steps": [
      "Identificar el cambio de horario",
      "Distinguir la solicitud de mesas del anuncio",
      "Concluir qué se sabe y qué falta comprobar"
    ]
  },
  {
    "level": "principiante",
    "title": "El huerto escolar",
    "passage": "Tres grupos de estudiantes sembraron frijoles en macetas similares. Durante cuatro semanas registraron altura y cantidad de agua. Los docentes pidieron usar la misma tierra. El informe final menciona que algunas macetas recibieron más sol, por lo que las diferencias no permiten atribuir el crecimiento únicamente al riego. Otro equipo propuso repetir el experimento con la misma exposición a luz. La docente escribió que esta actividad «sembraron curiosidad» entre los estudiantes.",
    "explicit": "Las macetas recibieron distinta cantidad de sol.",
    "inference": "La luz podría influir en los resultados de crecimiento.",
    "unsupported": "El grupo con más agua creció necesariamente el doble.",
    "main": "Reconocer que no se aisló el efecto del riego",
    "word": "cuatro semanas",
    "wordMeaning": "Un período de cuatro semanas consecutivas de observación.",
    "figure": "sembraron curiosidad",
    "figureMeaning": "despertaron interés por investigar",
    "comparison": "El primer informe observa una diferencia no controlada; el segundo propone controlarla.",
    "steps": [
      "Registrar las condiciones de las plantas",
      "Detectar diferencias de luz entre grupos",
      "Proponer una comparación controlada"
    ]
  },
  {
    "level": "principiante",
    "title": "La feria de ciencias",
    "passage": "La feria de ciencias abrió el viernes con puestos de física, biología y reciclaje. La organización informó que el puesto de reciclaje recibió 60 visitas y el de biología 45. No publicó el registro de física. Un estudiante escribió que todas las actividades fueron interesantes, una apreciación personal. El boletín escolar señaló que falta reunir los registros para calcular la asistencia total. Una reseña destacó que «los experimentos encendieron preguntas» entre los visitantes.",
    "explicit": "Reciclaje registró 60 visitas y biología 45.",
    "inference": "Reciclaje recibió al menos 15 visitas más que biología.",
    "unsupported": "La feria recibió exactamente 105 visitantes únicos.",
    "main": "Interpretar registros parciales de una feria",
    "word": "registros",
    "wordMeaning": "Un registro es una anotación sistemática de datos, no una opinión.",
    "figure": "los experimentos encendieron preguntas",
    "figureMeaning": "motivaron la curiosidad del público",
    "comparison": "El informe ofrece cifras parciales; la opinión del estudiante es una valoración, no un conteo.",
    "steps": [
      "Localizar los dos conteos publicados",
      "Reconocer el registro que falta",
      "Evitar calcular un total sin todos los datos"
    ]
  },
  {
    "level": "intermedio",
    "title": "Clubes voluntarios de lectura",
    "passage": "Dos centros incorporaron clubes voluntarios de lectura. En el centro A, el promedio pasó de 60 a 72 puntos; en B, de 64 a 70. Los profesores aplicaron instrumentos distintos y no se asignaron participantes al azar. Un comunicado celebró las mejoras, mientras un informe técnico advirtió que los datos no establecen la causa exclusiva de los cambios. Tampoco se reportaron tasas de abandono. Los investigadores explicaron que «las cifras abrieron una ventana» para observar cambios.",
    "explicit": "El promedio del centro A pasó de 60 a 72 y el de B de 64 a 70.",
    "inference": "El centro A registró una mejora absoluta mayor, pero no necesariamente comparable en una misma escala.",
    "unsupported": "Los clubes causaron por sí solos todas las mejoras.",
    "main": "Interpretar mejoras observadas con cautela metodológica",
    "word": "instrumentos",
    "wordMeaning": "Son medios de evaluación y pueden diferir entre centros.",
    "figure": "las cifras abrieron una ventana",
    "figureMeaning": "permitieron observar cambios sin explicar todas sus causas",
    "comparison": "El comunicado resalta el éxito; el informe técnico enfatiza límites de comparación.",
    "steps": [
      "Calcular los cambios respecto del inicio",
      "Examinar instrumentos y selección de participantes",
      "Distinguir asociación observada de causalidad demostrada"
    ]
  },
  {
    "level": "intermedio",
    "title": "Agua en tres sectores",
    "passage": "Una municipalidad registró consumos de agua antes y después de instalar dispositivos ahorradores. Norte pasó de 100 a 85 unidades, Centro de 80 a 72 y Sur de 120 a 114. Durante el período también hubo campañas de sensibilización y cambios en el clima. El titular de prensa afirmó que los dispositivos solucionaron el desperdicio; el informe técnico pidió observar varios meses para separar factores. La campaña celebró que «el ahorro echó raíces» en los hábitos de consumo.",
    "explicit": "Norte pasó de 100 a 85, Centro de 80 a 72 y Sur de 120 a 114.",
    "inference": "Los dispositivos pueden haber contribuido, pero no se aisló su efecto.",
    "unsupported": "En los tres sectores el consumo se redujo exactamente un 15 %.",
    "main": "Analizar reducciones y límites de atribución",
    "word": "sensibilización",
    "wordMeaning": "Consiste en promover conciencia y cambios de conducta.",
    "figure": "el ahorro echó raíces",
    "figureMeaning": "las prácticas de ahorro comenzaron a consolidarse",
    "comparison": "La nota atribuye un éxito definitivo; el informe reconoce varias causas posibles.",
    "steps": [
      "Comparar el consumo inicial con el final",
      "Identificar factores simultáneos",
      "Formular una conclusión limitada a la evidencia"
    ]
  },
  {
    "level": "intermedio",
    "title": "Memoria regional",
    "passage": "Un museo recopiló fotografías, testimonios y documentos sobre una celebración histórica. Dos relatos orales situaban el acontecimiento en fechas diferentes. La curadora explicó que una discrepancia no significa que ambos testimonios carezcan de valor: hace falta comparar registros cercanos a los hechos. Una reseña del museo destacó la diversidad de memorias; una columna de opinión sostuvo que solo un relato podía aceptarse sin discusión. La curadora señaló que «las fotografías dieron voz al pasado» de la comunidad.",
    "explicit": "Dos testimonios discrepan en la fecha del mismo acontecimiento.",
    "inference": "Contrastar documentos de época puede ayudar a aclarar la diferencia.",
    "unsupported": "El museo ya demostró que uno de los testimonios era inventado.",
    "main": "Evaluar procedencia y contraste de fuentes",
    "word": "discrepancia",
    "wordMeaning": "Es una diferencia entre informaciones o versiones.",
    "figure": "las fotografías dieron voz al pasado",
    "figureMeaning": "las imágenes ayudaron a representar experiencias pasadas",
    "comparison": "La reseña reconoce diversidad; la opinión descarta versiones sin mostrar contraste documental.",
    "steps": [
      "Identificar las versiones discrepantes",
      "Buscar fuentes cercanas al acontecimiento",
      "Separar comprobaciones de interpretaciones"
    ]
  },
  {
    "level": "avanzado",
    "title": "Tutorías y sesgo de selección",
    "passage": "En una investigación con 240 estudiantes, quienes eligieron tutorías voluntarias promediaban 75 puntos al inicio y 81 al final. Quienes no asistieron pasaron de 71 a 74. El equipo publicó las medias y reconoció que los grupos diferían antes de la intervención. Tampoco se midieron todas las condiciones de estudio doméstico. Un boletín atribuyó los ocho puntos de diferencia final exclusivamente a las tutorías; los autores del estudio rechazaron esa conclusión causal. Un comentario crítico advirtió que «la cifra final proyectó una sombra» sobre las diferencias iniciales. El informe llamó confusores a las condiciones previas que podían distorsionar la estimación.",
    "explicit": "El grupo con tutorías pasó de 75 a 81 puntos y el otro de 71 a 74.",
    "inference": "La diferencia de cambios es de 3 puntos, aunque no basta para estimar un efecto causal sin controlar confusores.",
    "unsupported": "Las tutorías explican necesariamente los ocho puntos de diferencia final.",
    "main": "Evaluar cambios y confusión entre grupos",
    "word": "confusores",
    "wordMeaning": "Son variables asociadas al tratamiento y al resultado que pueden distorsionar una conclusión causal.",
    "figure": "la cifra final proyectó una sombra",
    "figureMeaning": "ocultó parte de las diferencias que existían desde el inicio",
    "comparison": "El boletín simplifica una diferencia final; el estudio muestra líneas de base y límites de atribución.",
    "steps": [
      "Comparar las líneas de base de ambos grupos",
      "Calcular los cambios, no solo las medias finales",
      "Reconocer los límites causales del diseño"
    ]
  },
  {
    "level": "avanzado",
    "title": "Riesgo de inundaciones",
    "passage": "Un municipio costero registró más avisos de inundación tras ampliar el sistema de alertas. También aumentaron viviendas cerca de la desembocadura y hubo años con lluvias intensas. El equipo técnico advirtió que un incremento de avisos no demuestra por sí solo un aumento equivalente de inundaciones reales. Solicitó series históricas con definiciones comparables. Un editorial interpretó cada aviso adicional como prueba directa de que toda la expansión urbana causaba nuevas inundaciones. El equipo indicó que «el registro iluminó zonas ciegas» y recordó que la incidencia real todavía debía estudiarse.",
    "explicit": "El número de avisos aumentó después de ampliar el sistema de alertas.",
    "inference": "Parte del aumento puede deberse a mejor detección, a más eventos reales o a ambos.",
    "unsupported": "Cada aviso adicional demuestra una inundación causada exclusivamente por nuevas viviendas.",
    "main": "Distinguir cambios de incidencia y de medición",
    "word": "incidencia",
    "wordMeaning": "Frecuencia con la que ocurre un evento en una población o período determinado.",
    "figure": "el registro iluminó zonas ciegas",
    "figureMeaning": "hizo visibles eventos antes poco documentados",
    "comparison": "El informe separa medición e incidencia; el editorial los confunde y afirma causalidad total.",
    "steps": [
      "Identificar cambios en el sistema de registro",
      "Contrastar lluvia, uso del suelo y series comparables",
      "Evitar atribuir una sola causa sin controles"
    ]
  },
  {
    "level": "avanzado",
    "title": "Tres fuentes sobre un acontecimiento",
    "passage": "Un equipo analizó un decreto redactado el año de un suceso, una entrevista tomada cuarenta años después y un resumen anónimo sin fecha. El decreto aporta proximidad temporal, pero puede reflejar los intereses institucionales del autor. La entrevista conserva memorias personales, susceptibles de reelaboración. El resumen carece de datos para verificar procedencia. En su informe, los investigadores no eligieron automáticamente la fuente más antigua: contrastaron detalles con registros independientes. La curadora señaló que «el documento habló desde su época» y por ello debía situarse en contexto.",
    "explicit": "Se examinaron un decreto, una entrevista tardía y un resumen sin autor ni fecha.",
    "inference": "La combinación de procedencia y contraste independiente ofrece más rigor que elegir solo por antigüedad.",
    "unsupported": "El resumen anónimo es la fuente más confiable porque no revela su autor.",
    "main": "Evaluar validez contextual de fuentes diferentes",
    "word": "procedencia",
    "wordMeaning": "Es el origen documentable de una fuente, incluyendo autoría y circunstancias de creación.",
    "figure": "el documento habló desde su época",
    "figureMeaning": "reflejó la perspectiva institucional de su momento",
    "comparison": "El decreto aporta cercanía temporal; la entrevista, memoria; el resumen, incertidumbre de procedencia.",
    "steps": [
      "Examinar origen, fecha e intereses de cada fuente",
      "Corroborar afirmaciones con registros externos",
      "Formular conclusiones según su grado de evidencia"
    ]
  }
];
function skill(seed:Seed,subtopic:ReadingSubtopic){
 const {explicit,inference,unsupported,main,word,wordMeaning,figure,figureMeaning,comparison}=seed;
 const result:Record<ReadingSubtopic,{q:string;a:string;wrong:[string,string,string];why:string}>={
 "Idea principal":{q:"¿Qué resume mejor la idea central del pasaje?",a:main,wrong:[unsupported,wordMeaning,"El texto afirma lo contrario de lo que describe."],why:"La idea principal integra los hechos relevantes y su contexto, sin convertir una inferencia en certeza."},
 "Inferencias":{q:"¿Cuál conclusión es una inferencia razonable, pero no un dato afirmado literalmente?",a:inference,wrong:[explicit,unsupported,"Ninguna conclusión puede derivarse de la lectura."],why:"Una inferencia se apoya en pistas del texto y se diferencia de una afirmación literal o de una invención."},
 "Lectura crítica":{q:"¿Qué afirmación sobrepasa la evidencia disponible?",a:unsupported,wrong:[explicit,inference,"El texto reconoce límites de información."],why:"La afirmación escogida atribuye un hecho o una causalidad que el texto no demuestra."},
 "Vocabulario en contexto":{q:'En el texto, ¿qué sentido tiene la expresión «'+word+'»?',a:wordMeaning,wrong:["Es una secuencia de números sin interpretación.","Es el nombre propio de una persona no mencionada.","Es una contradicción que vuelve falsa toda la lectura."],why:"El significado se obtiene del contexto semántico donde aparece el término, no de una acepción aislada."},
 "Análisis de textos":{q:"¿Qué información está afirmada de manera explícita?",a:explicit,wrong:[inference,unsupported,"El autor ofrece una conclusión general válida para toda situación."],why:"Un dato explícito puede localizarse directamente en el pasaje, mientras que otras opciones agregan supuestos."},
 "Lectura comparada":{q:"¿Qué relación establece mejor la comparación de las dos posturas o fuentes descritas?",a:comparison,wrong:[unsupported,"Ambas fuentes demuestran exactamente lo mismo sin matices.","La segunda fuente cancela la existencia de la primera."],why:"La lectura comparada contrasta diferencias de perspectiva, evidencia y alcance sin inventar datos."},
 "Lenguaje figurado":{q:'¿Qué expresa la imagen «'+figure+'» en este contexto?',a:figureMeaning,wrong:["Describe literalmente un objeto con voz humana.","Indica necesariamente una medida física exacta.","Demuestra por sí sola una relación causal."],why:"La expresión funciona en sentido figurado; comunica una idea mediante imagen o personificación."}
 };
 return result[subtopic];
}
export const READING_BANK:ReadingChallenge[]=SEEDS.flatMap((seed,seedIndex)=>READING_SUBTOPICS.map((subtopic,topicIndex)=>{
 const def=skill(seed,subtopic);
 const plain=[def.a,...def.wrong] as [string,string,string,string];
 const offset=(seedIndex+topicIndex)%4;
 const options=[...plain.slice(offset),...plain.slice(0,offset)] as [string,string,string,string];
 return {id:`reading-${seed.level}-${seedIndex}-${topicIndex}`,level:seed.level,subtopic,title:seed.title,passage:seed.passage,
 claims:[
 {text:seed.explicit,tag:"explicit",explanation:"El texto declara este hecho."},
 {text:seed.inference,tag:"inference",explanation:"Es una conclusión plausible apoyada en la información, no una afirmación literal."},
 {text:seed.unsupported,tag:"unsupported",explanation:"Los datos disponibles no prueban esta afirmación."}
 ],question:def.q,options,answer:options.indexOf(def.a),explanation:def.why,
 order:{parts:seed.steps,hint:"Organiza un razonamiento: observa, contrasta y concluye.",explanation:"Un análisis sólido comienza localizando los datos, examina sus limitaciones y termina con una conclusión justificada."}
 };
}));
export type ReadingItem=ReadingChallenge|MainIdeaChoiceCase|MainIdeaDetectiveCase|MainIdeaReconstructCase|InferenceDetectiveCase|InferenceChoiceCase|InferenceReconstructCase|CriticalDetectiveCase|CriticalChoiceCase|CriticalReconstructCase|NewReadingDetective|NewReadingChoice|NewReadingReconstruct|AnalysisDetective|AnalysisChoice|AnalysisReconstruct|CompareDetective|CompareChoice|CompareReconstruct|FigurativeDetectiveCase|FigurativeChoiceCase|FigurativeReconstructCase;
export function readingPool(level:Level,subtopic:ReadingSubtopic,mode:Mode):ReadingItem[]{
 if(!READING_SUBTOPICS.includes(subtopic))return [];
 const items:ReadingItem[]=READING_BANK.filter(q=>q.level===level&&q.subtopic===subtopic).map(q=>({...q,id:q.id+"--"+mode}));
 if(subtopic==="Idea principal"){
  if(mode==="quiz")items.push(...MAIN_IDEA_CHOICE_CASES.filter(q=>q.level===level));
  if(mode==="clasificar")items.push(...MAIN_IDEA_DETECTIVE_CASES.filter(q=>q.level===level));
  if(mode==="construir")items.push(...MAIN_IDEA_RECONSTRUCT_CASES.filter(q=>q.level===level));
 }
 if(subtopic==="Inferencias"){
  if(mode==="clasificar")items.push(...INFERENCE_DETECTIVE_CASES.filter(q=>q.level===level));
  if(mode==="quiz")items.push(...INFERENCE_CHOICE_CASES.filter(q=>q.level===level));
  if(mode==="construir")items.push(...INFERENCE_RECONSTRUCT_CASES.filter(q=>q.level===level));
 }
 if(subtopic==="Lectura crítica"){
  if(mode==="clasificar")items.push(...CRITICAL_DETECTIVE_CASES.filter(q=>q.level===level));
  if(mode==="quiz")items.push(...CRITICAL_CHOICE_CASES.filter(q=>q.level===level));
  if(mode==="construir")items.push(...CRITICAL_RECONSTRUCT_CASES.filter(q=>q.level===level));
 }
 if(subtopic==="Vocabulario en contexto"){
  if(mode==="clasificar")items.push(...VOCAB_DETECTIVE_CASES.filter(q=>q.level===level));
  if(mode==="quiz")items.push(...VOCAB_CHOICE_CASES.filter(q=>q.level===level));
  if(mode==="construir")items.push(...VOCAB_RECONSTRUCT_CASES.filter(q=>q.level===level));
 }
 if(subtopic==="Análisis de textos"){
  if(mode==="clasificar")items.push(...ANALYSIS_DETECTIVE_CASES.filter(q=>q.level===level));
  if(mode==="quiz")items.push(...ANALYSIS_CHOICE_CASES.filter(q=>q.level===level));
  if(mode==="construir")items.push(...ANALYSIS_RECONSTRUCT_CASES.filter(q=>q.level===level));
 }
 if(subtopic==="Lectura comparada"){
  if(mode==="clasificar")items.push(...COMPARISON_DETECTIVE_CASES.filter(q=>q.level===level));
  if(mode==="quiz")items.push(...COMPARISON_CHOICE_CASES.filter(q=>q.level===level));
  if(mode==="construir")items.push(...COMPARISON_RECONSTRUCT_CASES.filter(q=>q.level===level));
 }
 if(subtopic==="Lenguaje figurado"){
  if(mode==="clasificar")items.push(...FIGURATIVE_DETECTIVE_CASES.filter(q=>q.level===level));
  if(mode==="quiz")items.push(...FIGURATIVE_CHOICE_CASES.filter(q=>q.level===level));
  if(mode==="construir")items.push(...FIGURATIVE_RECONSTRUCT_CASES.filter(q=>q.level===level));
 }

 items.push(...m2ReadingPool(level,subtopic,mode,items));
 return items;
}
/** Migración no destructiva: los 63 reactivos semilla antes compartían el mismo ID en 3 juegos.
 * Se conserva su historial por la clave de rotación específica del modo.
 */
export function migrateReadingState(state:RotationState,ids:readonly string[],mode:Mode):RotationState {
 const valid=new Set(ids);
 const convert=(old:string)=>valid.has(old)?old:
  valid.has(old+"--"+mode)?old+"--"+mode:null;
 const mapIds=(xs:string[])=>[...new Set(xs.map(convert).filter((x):x is string=>x!==null))];
 return {version:1,seen:mapIds(state.seen),incorrect:mapIds(state.incorrect),last:mapIds(state.last)};
}
export function readingItems(level:Level,subtopic:ReadingSubtopic,mode:Mode):ReadingItem[]{
 const items=readingPool(level,subtopic,mode);
 const key=rotationKey("espanol","Comprensión lectora",subtopic,mode,level);
 const ids=items.map(q=>q.id);
 const legacyIds=items.filter(q=>q.id.endsWith("--"+mode)).map(q=>q.id.slice(0,-(mode.length+2)));
 const raw=readRotation(key,[...ids,...legacyIds]);
 const migrated=migrateReadingState(raw,ids,mode);
 if(JSON.stringify(migrated)!==JSON.stringify(raw))writeRotation(key,migrated);
 return selectRotation(items,migrated,Math.min(10,items.length));
}
export function checkReadingOrder(parts:readonly string[],chosen:readonly number[]):boolean{
 return chosen.length===parts.length&&new Set(chosen).size===parts.length&&chosen.every((n,i)=>n===i&&n>=0&&n<parts.length);
}
