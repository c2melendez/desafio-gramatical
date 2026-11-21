import type {Level,Mode} from "./grammar";
import {AREAS} from "./phuma-catalog";
import type {ScienceItem,ScienceFact} from "./science-m1";

/** Habilidades Blandas M1: práctica complementaria NO incluida como dominio de
 * la guía PRE-U PHUMA 2026 verificada en este proyecto. No son ítems oficiales.
 * 8 subtemas × 3 modalidades × (10+15+20) = 1080 posiciones técnicas,
 * basadas en 40 anclajes; no son 1080 preguntas independientes certificadas.
 */
export const SOFT_LEVEL_COUNT:Record<Level,number>={principiante:10,intermedio:15,avanzado:20};
export const SOFT_LEVELS:Level[]=["principiante","intermedio","avanzado"];
export const SOFT_MODES:Mode[]=["clasificar","quiz","construir"];
export const SOFT_TOPICS=AREAS.find(a=>a.id==="blandas")!.topics;
export const SOFT_SUBTOPICS=SOFT_TOPICS.flatMap(t=>t.subtopics);
export const SOFT_M1_TOTAL=SOFT_SUBTOPICS.length*SOFT_MODES.length*(10+15+20);
const RAW:Record<string,[string,string,string][]> = {"Pensamiento crítico":[["distinguir hechos y opiniones","separa afirmaciones comprobables de valoraciones subjetivas","un equipo identifica qué afirmaciones del informe pueden contrastarse con datos"],["verificar la fuente","compara procedencia, fecha y evidencia antes de compartir información","una estudiante comprueba el autor y los datos de un mensaje viral"],["reconocer sesgo de confirmación","busca evidencia contraria a la idea inicial para evitar conclusiones parciales","un compañero busca argumentos que cuestionen su primera hipótesis"],["distinguir correlación y causalidad","no atribuye automáticamente causa a dos hechos que ocurren juntos","una clase observa dos tendencias simultáneas sin asumir que una produce la otra"],["formular una conclusión prudente","limita la afirmación a lo que los datos disponibles realmente permiten inferir","un grupo presenta resultados de una muestra pequeña sin generalizar a toda la población"]],"Resolución de problemas":[["definir el problema","describe la dificultad y sus límites antes de proponer soluciones","un equipo precisa qué impide terminar una tarea y qué recursos tiene"],["identificar causas verificables","contrasta información antes de atribuir la dificultad a un factor concreto","un grupo revisa tiempos y materiales para localizar el origen de un retraso"],["generar alternativas","considera varias opciones viables antes de seleccionar un procedimiento","un estudiante propone tres maneras diferentes de organizar el trabajo pendiente"],["evaluar consecuencias","compara costos, riesgos y beneficios de las alternativas disponibles","un comité contrasta el tiempo y los recursos requeridos por cada opción"],["verificar resultados","comprueba mediante indicadores si la intervención resolvió la dificultad","un equipo vuelve a medir los tiempos después de cambiar el procedimiento"]],"Colaboración":[["objetivo compartido","acuerda una meta común verificable para coordinar esfuerzos","un equipo define el producto que debe entregar y el criterio de éxito"],["distribución equitativa de tareas","asigna responsabilidades considerando capacidades y cargas de trabajo","un grupo reparte actividades y revisa que ninguna persona acumule toda la carga"],["interdependencia positiva","coordina aportes de distintas personas para completar una tarea común","dos integrantes combinan sus partes y verifican su coherencia"],["retroalimentación constructiva","describe el trabajo observado y propone ajustes concretos sin descalificar","una compañera señala una mejora específica en el borrador del equipo"],["responsabilidad compartida","revisa el progreso colectivo y ayuda a resolver obstáculos comunes","el equipo identifica un retraso y acuerda cómo recuperar el calendario"]],"Comunicación asertiva":[["mensaje en primera persona","expresa necesidades propias sin acusar ni atribuir intenciones ajenas","una estudiante explica cómo le afecta una interrupción y pide turno"],["escucha activa","resume lo escuchado y pregunta antes de responder o interpretar","un compañero confirma con sus palabras lo que otra persona quiso comunicar"],["petición concreta y respetuosa","formula una solicitud observable sin amenazas ni descalificaciones","un integrante propone acordar horarios específicos para reunirse"],["desacuerdo argumentado","expone razones y reconoce el derecho de otra persona a discrepar","dos colegas contrastan propuestas sin insultarse ni descalificar ideas"],["límites personales claros","expresa con respeto qué conducta acepta y qué alternativa propone","una persona comunica que no puede asumir otra tarea y ofrece otra fecha"]],"Respeto":[["trato digno","reconoce el valor de cada persona sin burlas ni humillaciones","un grupo escucha la intervención de alguien sin ridiculizar su acento"],["no discriminación","evita excluir a alguien por características personales o culturales","un equipo distribuye oportunidades sin prejuicios hacia sus integrantes"],["respeto de turnos","permite intervenciones ordenadas y escucha sin interrupciones","en una reunión cada participante espera su turno para hablar"],["cuidado de acuerdos","cumple las reglas de convivencia construidas con el grupo","una clase respeta el acuerdo para usar y devolver materiales comunes"],["reparación del daño","reconoce consecuencias de una conducta e impulsa acciones reparadoras","una persona se disculpa por un comentario ofensivo y corrige su conducta"]],"Responsabilidad":[["cumplimiento de compromisos","organiza acciones para entregar lo acordado dentro del plazo","una estudiante distribuye el trabajo semanal y entrega su parte a tiempo"],["asumir errores","reconoce una equivocación propia y toma medidas para corregirla","un integrante informa de inmediato que registró mal un dato y lo rectifica"],["priorización de tareas","distingue actividades urgentes e importantes para planificar","una persona ordena pendientes según fecha y consecuencias de retraso"],["seguimiento del progreso","compara avances reales con metas y ajusta el plan","un alumno revisa cada día si cumplió los hitos programados"],["uso cuidadoso de recursos","emplea materiales y tiempo evitando desperdicios innecesarios","un grupo controla el consumo de materiales para completar el proyecto"]],"Regulación emocional":[["identificación emocional","reconoce y nombra lo que siente antes de actuar impulsivamente","una estudiante reconoce frustración después de recibir una crítica"],["pausa consciente","toma un momento para responder deliberadamente en vez de reaccionar","una persona respira lentamente antes de contestar durante una discusión"],["reevaluación de pensamientos","considera interpretaciones alternativas de una situación incierta","un alumno evita asumir un rechazo personal por un mensaje sin respuesta"],["solicitar apoyo adecuado","pide orientación a una persona de confianza cuando no logra manejar una situación","una estudiante consulta a su orientadora cuando el malestar interfiere con sus actividades"],["comunicar emociones con respeto","expresa el malestar sin agredir ni imponer culpa a otras personas","un compañero comunica que está preocupado y pide conversar en privado"]],"Ética":[["honestidad académica","reconoce autoría y evita presentar trabajo ajeno como propio","un equipo identifica sus fuentes y señala qué partes citó"],["confidencialidad responsable","protege información privada salvo situaciones que requieran ayuda o protección","una persona evita divulgar datos de un compañero sin consentimiento"],["manejo de conflictos de interés","declara vínculos que podrían afectar la imparcialidad de una decisión","una representante informa que una empresa candidata pertenece a un familiar"],["equidad en las decisiones","aplica criterios transparentes y consistentes al evaluar a otras personas","un comité usa los mismos indicadores para revisar todas las propuestas"],["responsabilidad por consecuencias","anticipa efectos sobre otras personas y corrige daños previsibles","un grupo identifica impactos de su proyecto y modifica un plan riesgoso"]]};
export function softFacts(subtopic:string):ScienceFact[]{
 const items=RAW[subtopic];
 if(!SOFT_SUBTOPICS.includes(subtopic)||!items||items.length!==5)throw Error("Subtema Habilidades Blandas desconocido: "+subtopic);
 return items.map(([concept,property,scenario])=>({concept,property,scenario}));
}
export function softTopic(subtopic:string):string{
 const t=SOFT_TOPICS.find(x=>x.subtopics.includes(subtopic));if(!t)throw Error("Subtema Habilidades Blandas inválido: "+subtopic);return t.name;
}
const slug=(s:string)=>s.normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"");
const rotate=<T,>(xs:readonly T[],n:number):T[]=>xs.map((_,i)=>xs[(i+n)%xs.length]);
export function softModel(topic:string,subtopic:string,level:Level,mode:Mode,index:number):ScienceItem{
 if(!SOFT_TOPICS.some(t=>t.name===topic&&t.subtopics.includes(subtopic))||
  !SOFT_LEVELS.includes(level)||!SOFT_MODES.includes(mode)||!Number.isInteger(index)||
  index<0||index>=SOFT_LEVEL_COUNT[level])throw Error("Celda Habilidades Blandas M1 fuera de catálogo");
 const facts=softFacts(subtopic),k=index%5,variant=Math.floor(index/5),f=facts[k],stage=(SOFT_LEVELS.indexOf(level)+1) as 1|2|3;
 const other=[1,2,3].map(j=>facts[(k+j)%5]),foil=other[variant%3];
 const premise=variant===0?
  `Situación observada: «${f.scenario}». La tarea consiste en identificar la habilidad manifestada por la acción.`:
  variant===1?
  `Dos decisiones son distintas. Caso A: «${f.scenario}». Caso B: «${foil.scenario}». Analiza solamente el comportamiento del caso A.`:
  variant===2?
  `Una persona describe «${f.scenario}» y lo confunde con «${foil.concept}». Revisa qué conducta concreta sustenta mejor la clasificación.`:
  `Para evaluar el caso «${f.scenario}» se propone usar el criterio «${foil.property}». Contrasta el criterio propuesto con la evidencia del caso.`;
 const levelTask=level==="principiante"?"Reconoce la conducta observable y la habilidad asociada.":
 level==="intermedio"?"Distingue la acción específica de otra alternativa plausible usando el contexto.":
 "Evalúa una atribución alternativa y selecciona la conclusión proporcional a la evidencia conductual.";
 const prompt=mode==="quiz"?`${premise} ${levelTask} ¿Qué criterio justifica la conducta observada?`:
  mode==="clasificar"?`${premise} ${levelTask} Marca tres asociaciones como verdaderas o falsas según el caso A.`:
  `${premise} ${levelTask} Construye la interpretación en dos decisiones: habilidad y justificación.`;
 const options=rotate([f.property,...other.map(x=>x.property)],(index+stage)%4);
 const names=rotate([f.concept,...other.map(x=>x.concept)],(index+stage+1)%4);
 const assertions=rotate([{text:`El comportamiento del caso A corresponde a: ${f.property}.`,truth:true},
  ...other.slice(0,2).map(x=>({text:`El comportamiento del caso A corresponde a: ${x.property}.`,truth:false}))],(index+stage)%3);
 return {id:"blandas-m1-"+[topic,subtopic,mode,level,index].map(x=>slug(String(x))).join("-"),
  topic,subtopic,level,mode,index,concept:f.concept,prompt,expected:f.property,
  explanation:`En el caso «${f.scenario}» se observa «${f.concept}» porque ${f.property}. No se debe confundir con «${foil.concept}», que se caracteriza por: ${foil.property}.`,
  formula:`Evidencia: ${f.scenario}; habilidad: ${f.concept}; criterio: ${f.property}`,
  family:"blandas-m1-"+slug(subtopic)+"-"+slug(f.concept),
  source:"catalogo-practica-complementaria",reviewStatus:"editorial-draft",cognitiveStage:stage,
  operation:stage===1?"identificar-conducta":stage===2?"aplicar-criterio":"evaluar-atribucion",
  requiredEvidence:stage===1?["conducta","criterio"]:stage===2?["conducta","criterio","contraste"]:
   ["conducta","atribucion","alternativa","justificacion"],
  oracle:{concept:f.concept,property:f.property,scenario:f.scenario},
  options,answerIndex:options.indexOf(f.property),assertions,
  steps:[{label:"Identifica la habilidad que explica el caso",choices:names,answerIndex:names.indexOf(f.concept)},
    {label:"Selecciona la conducta o criterio que la justifica",choices:options,answerIndex:options.indexOf(f.property)}]};
}
export function softPool(topic:string,subtopic:string,level:Level,mode:Mode):ScienceItem[]{
 return Array.from({length:SOFT_LEVEL_COUNT[level]},(_,i)=>softModel(topic,subtopic,level,mode,i));
}
