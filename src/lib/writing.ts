import {m2WritingPool} from "./m2-writing";
import {m3WritingPool} from "./m3-writing";
import type {Level,Mode} from "./grammar";
import {CONNECTOR_CASES,type ConnectorCase} from "./connector-cases";
import {CONNECTOR_ERROR_CASES,type ConnectorErrorCase} from "./connector-error-cases";
import {CONNECTOR_EDITOR_CASES,type ConnectorEditorCase} from "./connector-editor-cases";
import {CORRECTION_ERROR_CASES,type CorrectionErrorCase} from "./correction-error-cases";
import {CORRECTION_CHOICE_CASES,type CorrectionChoiceCase} from "./correction-choice-cases";
import {CORRECTION_EDITOR_CASES,type CorrectionEditorCase} from "./correction-editor-cases";
import {ORGANIZATION_ERROR_CASES,type OrganizationErrorCase} from "./organization-error-cases";
import {ORGANIZATION_CHOICE_CASES,type OrganizationChoiceCase} from "./organization-choice-cases";
import {ORGANIZATION_EDITOR_CASES,type OrganizationEditorCase} from "./organization-editor-cases";
import {ELISION_ERROR_CASES,type ElisionErrorCase} from "./elision-error-cases";
import {ELISION_CHOICE_CASES,type ElisionChoiceCase} from "./elision-choice-cases";
import {ELISION_EDITOR_CASES,type ElisionEditorCase} from "./elision-editor-cases";
import {GENERALIZATION_ERROR_CASES,type GeneralizationErrorCase} from "./generalization-error-cases";
import {GENERALIZATION_CHOICE_CASES,type GeneralizationChoiceCase} from "./generalization-choice-cases";
import {GENERALIZATION_EDITOR_CASES,type GeneralizationEditorCase} from "./generalization-editor-cases";
import {readRotation,rotationKey,selectRotation,writeRotation,type RotationState} from "./rotation";
export const WRITING_SUBTOPICS = ["Corrección","Conectores","Organización textual","Elisión y adición","Generalización e integración"] as const;
export type WritingSubtopic = typeof WRITING_SUBTOPICS[number];
export const ERROR_TYPES=["Concordancia","Redundancia","Acentuación","Precisión","Ortografía","Ambigüedad","Generalización injustificada","Puntuación","Conector inadecuado","Relación lógica inválida","Inferencia injustificada","Orden temporal","Coherencia temática","Estructura argumentativa","Organización de la comparación","Contradicción argumentativa","Jerarquización de evidencias","Referencia ambigua","Información omitida","Sesgo de selección","Integración imprecisa"] as const;
export type WritingChallenge={
 id:string; level:Level; subtopic:WritingSubtopic;
 flawed:string; errorType:string; correction:string;
 gap:string; connector:string; options:[string,string,string,string];
 steps:[string,string,string];
};
type Seed={level:Level;subtopic:WritingSubtopic;cases:[string,string,string,string,string,string,string,string][]};
const SEEDS:Seed[]=[
  {
    "level": "principiante",
    "subtopic": "Corrección",
    "cases": [
      [
        "Las alumnas estudia para la prueba.",
        "Concordancia",
        "El sujeto plural «Las alumnas» exige un verbo plural: «estudian».",
        "La clase leyó el texto, ___ respondió las preguntas.",
        "y",
        "La clase leyó el texto.",
        "Respondió las preguntas.",
        "Revisó las soluciones."
      ],
      [
        "Ayer compramos un cuaderno y lo escribimos en el cuaderno.",
        "Redundancia",
        "La repetición de «cuaderno» puede evitarse con «escribimos en él».",
        "La estudiante revisó su tarea ___ la entregara.",
        "antes de que",
        "La estudiante terminó su borrador.",
        "Revisó las respuestas.",
        "Entregó el trabajo."
      ],
      [
        "El informe esta listo para entregar.",
        "Acentuación",
        "«Está» lleva tilde cuando es una forma del verbo «estar».",
        "Prepararon la exposición ___ practicaron juntos.",
        "y",
        "Los integrantes escogieron un tema.",
        "Prepararon materiales de apoyo.",
        "Presentaron su trabajo en clase."
      ]
    ]
  },
  {
    "level": "intermedio",
    "subtopic": "Corrección",
    "cases": [
      [
        "El resultado del experimento demuestran una diferencia.",
        "Concordancia",
        "El núcleo singular «resultado» requiere «demuestra», aunque aparezca un complemento plural.",
        "Se planificó una segunda medición ___ los resultados iniciales eran insuficientes.",
        "porque",
        "El equipo detectó una diferencia.",
        "Repitió las mediciones con controles.",
        "Comparó los nuevos resultados con los anteriores."
      ],
      [
        "La investigación concluyó definitivamente que quizá existe una relación.",
        "Precisión",
        "«Definitivamente» contradice la incertidumbre expresada por «quizá»; debe matizarse la certeza.",
        "El grupo registró los datos; ___, no pudo controlar la temperatura.",
        "sin embargo",
        "Se definió una hipótesis.",
        "Se recogieron observaciones.",
        "Se explicaron las limitaciones del estudio."
      ],
      [
        "Revisaron los datos porqué eran inconsistentes.",
        "Ortografía",
        "La conjunción causal es «porque», escrita sin tilde y en una palabra.",
        "La propuesta es prometedora, ___ requiere recursos adicionales.",
        "aunque",
        "Se identificó una necesidad comunitaria.",
        "Se evaluaron opciones de solución.",
        "Se eligió una alternativa factible."
      ]
    ]
  },
  {
    "level": "avanzado",
    "subtopic": "Corrección",
    "cases": [
      [
        "La coordinadora explicó a la tutora que su propuesta sería revisada.",
        "Ambigüedad",
        "El posesivo «su» no permite determinar de quién es la propuesta sin reescritura o información adicional.",
        "El estudio detectó asociación entre variables; ___, no demostró causalidad.",
        "no obstante",
        "El informe definió la población y las variables.",
        "Describió el procedimiento de muestreo.",
        "Delimitó las conclusiones a la evidencia disponible."
      ],
      [
        "Las cifras prueban que todos los participantes aprendieron más, aunque solo se evaluó a una muestra.",
        "Generalización injustificada",
        "No se puede extrapolar a la totalidad una conclusión absoluta sobre una muestra sin condiciones que la respalden.",
        "El indicador mejoró; ___, la ausencia de un grupo de control limita la interpretación.",
        "sin embargo",
        "Se identificó el resultado inicial y final.",
        "Se evaluaron factores alternativos.",
        "Se formuló una conclusión limitada a lo observado."
      ],
      [
        "Aunque los textos ofrecen explicaciones distintas. Los dos deben compararse.",
        "Puntuación",
        "La subordinada introducida por «aunque» queda aislada; debe integrarse en un enunciado completo.",
        "Los testimonios discrepan en la fecha; ___, conviene contrastar documentos contemporáneos.",
        "por eso",
        "Se registraron las versiones de cada testigo.",
        "Se contrastaron con otras fuentes independientes.",
        "Se comunicó el grado de certeza alcanzado."
      ]
    ]
  },
  {
    "level": "principiante",
    "subtopic": "Conectores",
    "cases": [
      [
        "Los estudiantes leyeron el cuento pero también dibujaron escenas.",
        "Puntuación",
        "En una oposición con «pero» suele emplearse coma antes de la conjunción: «leyeron el cuento, pero...».",
        "María trajo lápices ___ cuadernos.",
        "y",
        "El grupo eligió el texto.",
        "Lo leyó en voz alta.",
        "Comentó su significado."
      ],
      [
        "El camino estaba mojado por tanto había llovido.",
        "Puntuación",
        "El conector «por tanto» debe delimitarse con puntuación y su conclusión requiere evidencia suficiente.",
        "El autobús llegó tarde; ___, la clase comenzó después.",
        "por eso",
        "Se anunció el horario.",
        "Se produjo un retraso en el transporte.",
        "La actividad inició más tarde."
      ],
      [
        "No llevó paraguas sin embargo la lluvia era intensa.",
        "Puntuación",
        "«Sin embargo» requiere signos que separen claramente las dos proposiciones.",
        "Estudió mucho; ___, estaba nerviosa antes del examen.",
        "sin embargo",
        "Ana organizó un calendario de estudio.",
        "Practicó con ejercicios.",
        "Presentó la prueba."
      ]
    ]
  },
  {
    "level": "intermedio",
    "subtopic": "Conectores",
    "cases": [
      [
        "Se estudió el problema. Por ejemplo, se decidió aplicar la solución.",
        "Conector inadecuado",
        "«Por ejemplo» introduce casos ilustrativos, no expresa la consecuencia de un estudio.",
        "El informe presenta datos parciales; ___, sus conclusiones son provisionales.",
        "por tanto",
        "Se registraron los datos observables.",
        "Se identificó qué información faltaba.",
        "Se describieron conclusiones provisionales."
      ],
      [
        "La encuesta tuvo una respuesta alta. Además, sus resultados pueden tener sesgo por selección.",
        "Conector inadecuado",
        "«Sin embargo» expresa mejor el contraste entre participación alta y posible sesgo.",
        "El proyecto es viable; ___, su costo requiere evaluación.",
        "no obstante",
        "El equipo delimitó la pregunta inicial.",
        "Comparó dos alternativas metodológicas.",
        "Explicó cuál resultaba más adecuada."
      ],
      [
        "El cultivo creció menos. En cambio, recibió menos agua.",
        "Conector inadecuado",
        "«Porque» o «ya que» explican la causa posible; «en cambio» plantea contraste, no causalidad.",
        "Los datos se recogieron tarde ___ hubo un corte de energía.",
        "porque",
        "Se detectó una falla en el equipo.",
        "Se documentó el problema técnico.",
        "Se reorganizó el calendario de registro."
      ]
    ]
  },
  {
    "level": "avanzado",
    "subtopic": "Conectores",
    "cases": [
      [
        "El estudio es observacional; por tanto, queda demostrada una causa exclusiva.",
        "Relación lógica inválida",
        "El conector de consecuencia no convierte una asociación observacional en demostración causal.",
        "Se identificó una asociación; ___, todavía faltan controles para sostener una explicación causal.",
        "sin embargo",
        "Se precisó el alcance del estudio.",
        "Se distinguieron asociación y causalidad.",
        "Se plantearon análisis de comprobación posteriores."
      ],
      [
        "Los dos documentos discrepan; es decir, uno de ellos necesariamente miente.",
        "Inferencia injustificada",
        "La discrepancia puede surgir de memoria, fecha o perspectiva; «es decir» no permite equipararla a una mentira.",
        "Una fuente es contemporánea; ___, aún puede presentar sesgos institucionales.",
        "aun así",
        "Se identificó la autoría del documento.",
        "Se analizó el propósito de producción.",
        "Se comparó el relato con registros externos."
      ],
      [
        "La muestra es pequeña; además, las conclusiones serán válidas para toda la población.",
        "Relación lógica inválida",
        "La conclusión general es incompatible con una muestra pequeña no representativa.",
        "Los resultados coinciden entre instrumentos; ___, la comparación requiere escalas equivalentes.",
        "no obstante",
        "Se revisaron los métodos de medición.",
        "Se compararon las escalas utilizadas.",
        "Se expusieron límites para interpretar los resultados."
      ]
    ]
  },
  {
    "level": "principiante",
    "subtopic": "Organización textual",
    "cases": [
      [
        "Los estudiantes concluyeron el proyecto antes de escoger el tema.",
        "Orden temporal",
        "La conclusión del proyecto ocurre después de seleccionar un tema y realizar el trabajo.",
        "Primero se escribió una idea; ___, se revisó la ortografía.",
        "después",
        "El grupo eligió un tema.",
        "Buscó información básica.",
        "Redactó un párrafo de presentación."
      ],
      [
        "El párrafo pasa de los libros a la lluvia sin explicar su relación.",
        "Coherencia temática",
        "Las ideas deben mantener un hilo conductor o señalar con claridad la relación entre temas.",
        "El museo tenía fotografías; ___, exhibía mapas antiguos.",
        "además",
        "Se presentó el lugar y su historia.",
        "Se describieron los objetos expuestos.",
        "Se cerró con una invitación a visitarlo."
      ],
      [
        "El aviso comienza diciendo «Gracias por asistir» antes de anunciar el evento.",
        "Orden temporal",
        "En una invitación se presenta el acontecimiento antes del agradecimiento final.",
        "Los equipos acordaron las reglas ___ empezara el juego.",
        "antes de que",
        "Se anunció la fecha de la actividad.",
        "Se informó el horario y lugar.",
        "Se invitó a participar a la comunidad."
      ]
    ]
  },
  {
    "level": "intermedio",
    "subtopic": "Organización textual",
    "cases": [
      [
        "La conclusión presenta datos nuevos que no aparecen en el desarrollo.",
        "Estructura argumentativa",
        "Una conclusión debe derivarse de las pruebas discutidas y no incorporar datos centrales sin justificar.",
        "Se identificó la pregunta de investigación; ___, se seleccionó el método.",
        "a continuación",
        "El informe formuló una pregunta.",
        "Presentó los resultados de la observación.",
        "Explicó sus alcances y limitaciones."
      ],
      [
        "El texto compara dos métodos, pero describe el segundo antes de definir qué criterio usará.",
        "Organización de la comparación",
        "Es más claro establecer criterios comparables antes de contrastar los métodos.",
        "Ambos métodos tuvieron ventajas; ___, uno requirió más recursos.",
        "sin embargo",
        "Se definieron criterios de evaluación.",
        "Se describió el rendimiento de cada método.",
        "Se compararon resultados bajo los mismos criterios."
      ],
      [
        "El argumento ofrece un ejemplo y luego afirma una regla general sin exponer sus límites.",
        "Generalización injustificada",
        "Un ejemplo aislado no demuestra una regla universal; se requieren más evidencias y alcance delimitado.",
        "La muestra incluyó pocas personas; ___, no puede representar automáticamente a toda la población.",
        "por ello",
        "Se definió la población de interés.",
        "Se explicó cómo se eligió la muestra.",
        "Se formularon conclusiones acordes con su alcance."
      ]
    ]
  },
  {
    "level": "avanzado",
    "subtopic": "Organización textual",
    "cases": [
      [
        "La tesis rechaza la causalidad, pero la conclusión presenta la relación como causal sin nueva evidencia.",
        "Contradicción argumentativa",
        "La conclusión contradice la tesis y el desarrollo sin que se justifique un cambio de interpretación.",
        "La muestra inicial era desigual; ___, la comparación final exige controlar diferencias previas.",
        "en consecuencia",
        "Se planteó una hipótesis susceptible de contraste.",
        "Se examinaron resultados y explicaciones alternativas.",
        "Se expuso una conclusión proporcional a la evidencia."
      ],
      [
        "Una revisión de fuentes usa un testimonio tardío para invalidar un documento contemporáneo sin evaluarlos.",
        "Jerarquización de evidencias",
        "La proximidad temporal no hace infalible al documento, y un testimonio tardío no lo invalida sin corroboración.",
        "La fuente más antigua aporta contexto; ___, no garantiza ausencia de sesgos.",
        "sin embargo",
        "Se describió el origen de cada fuente.",
        "Se comparó el contenido y sus posibles sesgos.",
        "Se sintetizaron hallazgos corroborados e incertidumbres."
      ],
      [
        "El ensayo introduce en la última línea un concepto decisivo que no había definido ni discutido.",
        "Estructura argumentativa",
        "Una conclusión no debe depender de un concepto nuevo que el razonamiento anterior nunca fundamentó.",
        "Se detectaron resultados heterogéneos; ___, conviene revisar el análisis antes de generalizar.",
        "por tanto",
        "Se delimitó el significado de los conceptos utilizados.",
        "Se justificó la interpretación con ejemplos pertinentes.",
        "Se sintetizó el argumento sin sumar premisas inéditas."
      ]
    ]
  },
  {
    "level": "principiante",
    "subtopic": "Elisión y adición",
    "cases": [
      [
        "El estudiante volvió a regresar otra vez a la biblioteca.",
        "Redundancia",
        "«Volvió», «regresar» y «otra vez» repiten la idea de retorno; puede decirse «Regresó a la biblioteca».",
        "Llegó a la biblioteca, ___ pidió un libro prestado.",
        "luego",
        "El estudiante fue a la biblioteca.",
        "Pidió el libro que necesitaba.",
        "Lo devolvió en la fecha indicada."
      ],
      [
        "Subieron arriba al segundo piso para buscar el aula.",
        "Redundancia",
        "«Subir» ya implica desplazarse hacia arriba; «arriba» resulta innecesario.",
        "La sala estaba ocupada, ___ esperaron afuera.",
        "por eso",
        "El grupo consultó el número del aula.",
        "Subió al piso correcto.",
        "Ingresó cuando inició la sesión."
      ],
      [
        "Se reunieron juntos todos los integrantes del equipo.",
        "Redundancia",
        "«Se reunieron» ya expresa un encuentro conjunto; «juntos» no aporta información nueva aquí.",
        "Ana llevó papel ___ Carlos llevó marcadores.",
        "y",
        "Los estudiantes acordaron reunirse.",
        "Distribuyeron las tareas.",
        "Terminaron el cartel entre todos."
      ]
    ]
  },
  {
    "level": "intermedio",
    "subtopic": "Elisión y adición",
    "cases": [
      [
        "La encuesta preguntó a los alumnos. Respondieron que era útil.",
        "Referencia ambigua",
        "Sin precisar qué era útil, «era útil» puede referirse a distintos elementos del contexto; debe identificarse el referente.",
        "El cuestionario fue breve; ___, algunas preguntas causaron confusión.",
        "sin embargo",
        "Se diseñó una encuesta con preguntas claras.",
        "Se aplicó a los participantes.",
        "Se revisaron respuestas e incidencias."
      ],
      [
        "El informe afirma que hubo un aumento significativo, pero omite indicar de qué variable.",
        "Información omitida",
        "Es necesario nombrar la variable medida y la magnitud, no basta «un aumento significativo».",
        "La asistencia creció; ___, no se registró la causa.",
        "no obstante",
        "Se definió el indicador que se mediría.",
        "Se registraron los valores antes y después.",
        "Se explicó qué conclusiones permiten los datos."
      ],
      [
        "En el resumen se indica «El primer grupo superó al segundo», sin mencionar en qué medida.",
        "Información omitida",
        "Se debe agregar el indicador y la magnitud o criterio relevante para interpretar la comparación.",
        "El primer grupo mejoró; ___, ambos centros conservaron diferencias iniciales.",
        "sin embargo",
        "Se especificó la medida de comparación.",
        "Se consignaron los resultados de cada grupo.",
        "Se matizó el alcance de la diferencia observada."
      ]
    ]
  },
  {
    "level": "avanzado",
    "subtopic": "Elisión y adición",
    "cases": [
      [
        "El artículo elimina la definición de «eficacia» y luego compara dos métodos por su eficacia.",
        "Información omitida",
        "La comparación pierde precisión cuando no se define operativamente la variable central.",
        "Los instrumentos midieron aspectos distintos; ___, no es válido equiparar sus puntuaciones sin ajuste.",
        "por consiguiente",
        "Se definió qué se entendería por eficacia.",
        "Se verificó si los instrumentos medían lo mismo.",
        "Se interpretaron resultados dentro de sus límites."
      ],
      [
        "La síntesis omite las limitaciones de selección, pero declara que el programa sirve para todos.",
        "Generalización injustificada",
        "Excluir límites muestrales y afirmar validez universal distorsiona la conclusión.",
        "Hubo participantes voluntarios; ___, los resultados podrían estar sesgados por selección.",
        "por ello",
        "Se caracterizó a los participantes voluntarios.",
        "Se identificaron factores de selección.",
        "Se delimitaron las conclusiones a la muestra observada."
      ],
      [
        "Una revisión suprime el antecedente del pronombre «esta» y conserva «esta demostró el cambio».",
        "Referencia ambigua",
        "Sin un antecedente identificable, el pronombre «esta» deja indeterminado qué demostró el cambio.",
        "Se compararon dos hipótesis; ___, solo una recibió respaldo empírico suficiente.",
        "sin embargo",
        "Se presentaron ambas hipótesis con claridad.",
        "Se contrastaron las evidencias de cada una.",
        "Se formuló una conclusión con referentes explícitos."
      ]
    ]
  },
  {
    "level": "principiante",
    "subtopic": "Generalización e integración",
    "cases": [
      [
        "Dos alumnos aprobaron; por lo tanto, todos los alumnos de la ciudad aprobarán.",
        "Generalización injustificada",
        "Dos observaciones no permiten concluir resultados para todos los estudiantes de una ciudad.",
        "Leer ayuda a aprender vocabulario ___ comprender textos.",
        "y",
        "La lectura amplía el vocabulario.",
        "También permite explorar nuevas ideas.",
        "Por estas razones, favorece varias habilidades."
      ],
      [
        "Un equipo recicló durante una semana; por eso, toda la comunidad recicla.",
        "Generalización injustificada",
        "La conducta de un equipo y una semana no representa automáticamente a toda la comunidad.",
        "La biblioteca ofrece libros; ___, organiza actividades de lectura.",
        "además",
        "La biblioteca presta materiales.",
        "Organiza encuentros para compartir lecturas.",
        "En conjunto, facilita diferentes formas de aprendizaje."
      ],
      [
        "Un vecino plantó árboles y el parque mejoró; por tanto, plantar árboles resuelve cualquier problema ambiental.",
        "Generalización injustificada",
        "Una experiencia aislada no justifica una solución universal para problemas diferentes.",
        "El huerto mejora el entorno ___ permite observar plantas.",
        "y",
        "El huerto ofrece un espacio verde.",
        "También ayuda a aprender sobre plantas.",
        "Ambos aportes favorecen la comunidad escolar."
      ]
    ]
  },
  {
    "level": "intermedio",
    "subtopic": "Generalización e integración",
    "cases": [
      [
        "El informe resume tres casos positivos y concluye que el programa siempre funciona.",
        "Sesgo de selección",
        "Elegir solo casos favorables sin describir la población completa no permite estimar la eficacia general.",
        "Hubo avances en dos grupos; ___, todavía faltan datos para hablar de una tendencia general.",
        "sin embargo",
        "Se registraron resultados positivos en grupos concretos.",
        "Se identificaron limitaciones en la selección de casos.",
        "Se formuló una conclusión circunscrita a esos casos."
      ],
      [
        "Se integra bajo «rendimiento» la asistencia, la satisfacción y los resultados académicos sin diferenciarlos.",
        "Integración imprecisa",
        "Las tres medidas son distintas; una síntesis rigurosa debe explicar cómo se relacionan y evitar tratarlas como equivalentes.",
        "La asistencia fue alta; ___, no se midió el aprendizaje.",
        "sin embargo",
        "Se describieron indicadores distintos.",
        "Se evaluó su relación y sus diferencias.",
        "Se sintetizó qué aspectos quedaron realmente medidos."
      ],
      [
        "Tres escuelas obtuvieron resultados distintos, y el texto afirma que una política tiene el mismo efecto en todos los centros.",
        "Generalización injustificada",
        "Los resultados heterogéneos exigen reconocer variaciones de contexto y alcance.",
        "La medida favoreció a algunos grupos; ___, sus efectos no fueron uniformes.",
        "no obstante",
        "Se observaron resultados de varias escuelas.",
        "Se compararon diferencias y condiciones de aplicación.",
        "Se concluyó que los efectos variaban según contexto."
      ]
    ]
  },
  {
    "level": "avanzado",
    "subtopic": "Generalización e integración",
    "cases": [
      [
        "Una revisión mezcla correlaciones, opiniones y experimentos como si ofrecieran igual evidencia causal.",
        "Integración imprecisa",
        "La síntesis debe diferenciar la fuerza y el tipo de evidencia antes de generalizar conclusiones.",
        "Los estudios coinciden en una asociación; ___, su causalidad sigue sin resolverse.",
        "sin embargo",
        "Se distinguieron diseños observacionales y experimentales.",
        "Se evaluó la calidad y el alcance de cada evidencia.",
        "Se sintetizaron hallazgos sin afirmar más de lo justificado."
      ],
      [
        "Un metaanálisis informa un promedio favorable y omite que los efectos variaron notablemente entre grupos.",
        "Información omitida",
        "El promedio debe interpretarse junto con heterogeneidad, incertidumbre y diferencias entre grupos.",
        "El promedio fue positivo; ___, existió una variación considerable entre grupos.",
        "no obstante",
        "Se cuantificó el efecto promedio.",
        "Se examinaron diferencias entre estudios o grupos.",
        "Se comunicó la variabilidad junto con la estimación central."
      ],
      [
        "Una síntesis combina dos fuentes con definiciones incompatibles de «éxito» y anuncia un porcentaje único.",
        "Integración imprecisa",
        "Los resultados no deben agregarse sin comprobar que el indicador se defina y mida de manera comparable.",
        "Ambos reportes emplearon criterios distintos; ___, sus porcentajes no son directamente comparables.",
        "por tanto",
        "Se identificaron las definiciones de éxito de cada fuente.",
        "Se evaluó si sus indicadores podían equipararse.",
        "Se presentaron los resultados separados cuando no eran comparables."
      ]
    ]
  }
];
const connectorGroups:Record<string,string>={
 "y":"addition","además":"addition",
 "porque":"cause",
 "por tanto":"consequence","por eso":"consequence","por ello":"consequence","por consiguiente":"consequence","en consecuencia":"consequence",
 "sin embargo":"contrast","no obstante":"contrast","aunque":"contrast","aun así":"contrast","en cambio":"contrast",
 "después":"time","luego":"time","a continuación":"time","antes de que":"prior"
};
const distractorByGroup:Record<string,[string,string,string]>={
 addition:["sin embargo","porque","por tanto"],
 cause:["sin embargo","además","por tanto"],
 consequence:["sin embargo","además","porque"],
 contrast:["por tanto","además","porque"],
 time:["sin embargo","porque","por tanto"],
 prior:["sin embargo","además","porque"]
};
export const WRITING_BANK:WritingChallenge[]=SEEDS.flatMap((seed,s)=>{
 return seed.cases.map((entry,i)=>{
  const [flawed,errorType,correction,gap,connector,a,b,c]=entry;
  const group=connectorGroups[connector];
  if(!group)throw new Error("Conector sin clase lógica: "+connector);
  const unique=[connector,...distractorByGroup[group]];
  const rotate=(s+i)%4;
  return {id:`writing-${seed.level}-${s}-${i}`,level:seed.level,subtopic:seed.subtopic,
   flawed,errorType,correction,gap,connector,
   options:[...unique.slice(rotate),...unique.slice(0,rotate)] as [string,string,string,string],
   steps:[a,b,c] as [string,string,string]};
 });
});
export type WritingItem=WritingChallenge|ConnectorCase|ConnectorErrorCase|ConnectorEditorCase|CorrectionErrorCase|CorrectionChoiceCase|CorrectionEditorCase|OrganizationErrorCase|OrganizationChoiceCase|OrganizationEditorCase|ElisionErrorCase|ElisionChoiceCase|ElisionEditorCase|GeneralizationErrorCase|GeneralizationChoiceCase|GeneralizationEditorCase;
export function writingPool(level:Level,subtopic:WritingSubtopic,mode:Mode):WritingItem[]{
 const initial:WritingItem[]=WRITING_BANK.filter(q=>q.level===level&&q.subtopic===subtopic).map(q=>({...q,id:q.id+"--"+mode}));
 if(subtopic==="Conectores"){
  if(mode==="quiz")initial.push(...CONNECTOR_CASES.filter(q=>q.level===level));
  if(mode==="clasificar")initial.push(...CONNECTOR_ERROR_CASES.filter(q=>q.level===level));
  if(mode==="construir")initial.push(...CONNECTOR_EDITOR_CASES.filter(q=>q.level===level));
 }
 if(subtopic==="Corrección"){
  if(mode==="quiz")initial.push(...CORRECTION_CHOICE_CASES.filter(q=>q.level===level));
  if(mode==="clasificar")initial.push(...CORRECTION_ERROR_CASES.filter(q=>q.level===level));
  if(mode==="construir")initial.push(...CORRECTION_EDITOR_CASES.filter(q=>q.level===level));
 }
 if(subtopic==="Organización textual"){
  if(mode==="quiz")initial.push(...ORGANIZATION_CHOICE_CASES.filter(q=>q.level===level));
  if(mode==="clasificar")initial.push(...ORGANIZATION_ERROR_CASES.filter(q=>q.level===level));
  if(mode==="construir")initial.push(...ORGANIZATION_EDITOR_CASES.filter(q=>q.level===level));
 }
 if(subtopic==="Elisión y adición"){
  if(mode==="quiz")initial.push(...ELISION_CHOICE_CASES.filter(q=>q.level===level));
  if(mode==="clasificar")initial.push(...ELISION_ERROR_CASES.filter(q=>q.level===level));
  if(mode==="construir")initial.push(...ELISION_EDITOR_CASES.filter(q=>q.level===level));
 }
 if(subtopic==="Generalización e integración"){
  if(mode==="quiz")initial.push(...GENERALIZATION_CHOICE_CASES.filter(q=>q.level===level));
  if(mode==="clasificar")initial.push(...GENERALIZATION_ERROR_CASES.filter(q=>q.level===level));
  if(mode==="construir")initial.push(...GENERALIZATION_EDITOR_CASES.filter(q=>q.level===level));
 }
 initial.push(...m2WritingPool(level,subtopic,mode,initial));
 initial.push(...m3WritingPool(level,subtopic,mode,initial));
 return initial;
}
/** Convierte identificadores compartidos de los casos semilla sin perder rotaciones guardadas. */
export function migrateWritingState(state:RotationState,ids:readonly string[],mode:Mode):RotationState{
 const valid=new Set(ids);
 const convert=(old:string)=>valid.has(old)?old:valid.has(old+"--"+mode)?old+"--"+mode:null;
 const clean=(items:string[])=>[...new Set(items.map(convert).filter((x):x is string=>x!==null))];
 return {version:1,seen:clean(state.seen),incorrect:clean(state.incorrect),last:clean(state.last)};
}
export function writingItems(level:Level,subtopic:WritingSubtopic,mode:Mode):WritingItem[]{
 const pool=writingPool(level,subtopic,mode);
 const key=rotationKey("espanol","Redacción",subtopic,mode,level);
 const ids=pool.map(q=>q.id);
 const legacyIds=pool.filter(q=>q.id.endsWith("--"+mode)).map(q=>q.id.slice(0,-(mode.length+2)));
 const raw=readRotation(key,[...ids,...legacyIds]);
 const migrated=migrateWritingState(raw,ids,mode);
 if(JSON.stringify(raw)!==JSON.stringify(migrated))writeRotation(key,migrated);
 return selectRotation(pool,migrated,Math.min(10,pool.length));
}
export function checkWritingSequence(parts:readonly string[],sequence:readonly number[]){
 return sequence.length===parts.length&&new Set(sequence).size===parts.length&&sequence.every((id,i)=>id===i);
}
