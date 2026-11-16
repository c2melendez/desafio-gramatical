import type {Level} from "./grammar";
import type {WritingSubtopic} from "./writing";
export type ConnectorCase={
 id:string;level:Level;subtopic:WritingSubtopic;gap:string;connector:string;
 explanation:string;options:[string,string,string,string];competency:string;reviewStatus:"editorial-draft";
};
/** 36 casos originales, distintos de los 9 casos previos de Conectores.
 * Las clases lógicas de los distractores difieren de la respuesta esperada.
 * Su revisión docente sigue pendiente; no se afirma calibración PHUMA.
 */
export const CONNECTOR_CASES:ConnectorCase[]=[
  {
    "id": "writing-conectores-quiz-v2-principiante-0",
    "level": "principiante",
    "subtopic": "Conectores",
    "gap": "El cuaderno estaba completo; ___, pudo entregarlo a tiempo.",
    "connector": "por eso",
    "explanation": "La segunda idea es una consecuencia de haber completado el cuaderno.",
    "options": [
      "por eso",
      "sin embargo",
      "además",
      "porque"
    ],
    "reviewStatus": "editorial-draft",
    "competency": "consequence"
  },
  {
    "id": "writing-conectores-quiz-v2-principiante-1",
    "level": "principiante",
    "subtopic": "Conectores",
    "gap": "La niña practicó la lectura ___ mejoró su pronunciación.",
    "connector": "y",
    "explanation": "Se agregan dos acciones; la conjunción copulativa enlaza hechos sin atribuir necesariamente causalidad.",
    "options": [
      "y",
      "sin embargo",
      "porque",
      "por tanto"
    ],
    "reviewStatus": "editorial-draft",
    "competency": "addition"
  },
  {
    "id": "writing-conectores-quiz-v2-principiante-2",
    "level": "principiante",
    "subtopic": "Conectores",
    "gap": "Cerraron las ventanas ___ empezó a llover.",
    "connector": "porque",
    "explanation": "El inicio de la lluvia explica la causa de cerrar las ventanas.",
    "options": [
      "porque",
      "sin embargo",
      "además",
      "por tanto"
    ],
    "reviewStatus": "editorial-draft",
    "competency": "cause"
  },
  {
    "id": "writing-conectores-quiz-v2-principiante-3",
    "level": "principiante",
    "subtopic": "Conectores",
    "gap": "El ejercicio parecía sencillo; ___, requería leer con atención.",
    "connector": "sin embargo",
    "explanation": "La necesidad de cuidado contrasta con la apariencia de sencillez.",
    "options": [
      "sin embargo",
      "por tanto",
      "además",
      "porque"
    ],
    "reviewStatus": "editorial-draft",
    "competency": "contrast"
  },
  {
    "id": "writing-conectores-quiz-v2-principiante-4",
    "level": "principiante",
    "subtopic": "Conectores",
    "gap": "Primero observaron las plantas; ___, anotaron sus cambios.",
    "connector": "después",
    "explanation": "Se ordenan dos acciones consecutivas en el tiempo.",
    "options": [
      "después",
      "sin embargo",
      "porque",
      "por tanto"
    ],
    "reviewStatus": "editorial-draft",
    "competency": "time"
  },
  {
    "id": "writing-conectores-quiz-v2-principiante-5",
    "level": "principiante",
    "subtopic": "Conectores",
    "gap": "El estudiante consultó la biblioteca ___ encontró el dato que necesitaba.",
    "connector": "y",
    "explanation": "La conjunción añade una segunda acción sin forzar una conclusión causal.",
    "options": [
      "y",
      "sin embargo",
      "porque",
      "por tanto"
    ],
    "reviewStatus": "editorial-draft",
    "competency": "addition"
  },
  {
    "id": "writing-conectores-quiz-v2-principiante-6",
    "level": "principiante",
    "subtopic": "Conectores",
    "gap": "No asistió a la reunión ___ tenía una cita médica.",
    "connector": "porque",
    "explanation": "La cita constituye el motivo de la ausencia.",
    "options": [
      "porque",
      "sin embargo",
      "además",
      "por tanto"
    ],
    "reviewStatus": "editorial-draft",
    "competency": "cause"
  },
  {
    "id": "writing-conectores-quiz-v2-intermedio-7",
    "level": "intermedio",
    "subtopic": "Conectores",
    "gap": "Los resultados eran preliminares; ___, se recomendó repetir las mediciones.",
    "connector": "por tanto",
    "explanation": "La recomendación se deriva del carácter provisional de los datos.",
    "options": [
      "por tanto",
      "sin embargo",
      "además",
      "porque"
    ],
    "reviewStatus": "editorial-draft",
    "competency": "consequence"
  },
  {
    "id": "writing-conectores-quiz-v2-intermedio-8",
    "level": "intermedio",
    "subtopic": "Conectores",
    "gap": "La propuesta reducía los costos; ___, exigía más personal especializado.",
    "connector": "sin embargo",
    "explanation": "Se introduce una limitación que contrasta con el beneficio económico.",
    "options": [
      "sin embargo",
      "por tanto",
      "además",
      "porque"
    ],
    "reviewStatus": "editorial-draft",
    "competency": "contrast"
  },
  {
    "id": "writing-conectores-quiz-v2-intermedio-9",
    "level": "intermedio",
    "subtopic": "Conectores",
    "gap": "La muestra fue pequeña; ___, las conclusiones deben presentarse con cautela.",
    "connector": "por ello",
    "explanation": "La escasa muestra fundamenta la cautela de las conclusiones.",
    "options": [
      "por ello",
      "sin embargo",
      "además",
      "porque"
    ],
    "reviewStatus": "editorial-draft",
    "competency": "consequence"
  },
  {
    "id": "writing-conectores-quiz-v2-intermedio-10",
    "level": "intermedio",
    "subtopic": "Conectores",
    "gap": "La encuesta incluyó estudiantes ___ docentes del centro.",
    "connector": "y",
    "explanation": "Se añaden dos grupos distintos de participantes.",
    "options": [
      "y",
      "sin embargo",
      "porque",
      "por tanto"
    ],
    "reviewStatus": "editorial-draft",
    "competency": "addition"
  },
  {
    "id": "writing-conectores-quiz-v2-intermedio-11",
    "level": "intermedio",
    "subtopic": "Conectores",
    "gap": "Los visitantes llevaron paraguas ___ el pronóstico anunciaba lluvia.",
    "connector": "porque",
    "explanation": "La previsión es la causa de la decisión de llevar paraguas.",
    "options": [
      "porque",
      "sin embargo",
      "además",
      "por tanto"
    ],
    "reviewStatus": "editorial-draft",
    "competency": "cause"
  },
  {
    "id": "writing-conectores-quiz-v2-intermedio-12",
    "level": "intermedio",
    "subtopic": "Conectores",
    "gap": "El equipo registró las observaciones; ___, comparó los resultados.",
    "connector": "después",
    "explanation": "Se expresa el orden temporal de registro y comparación.",
    "options": [
      "después",
      "sin embargo",
      "porque",
      "por tanto"
    ],
    "reviewStatus": "editorial-draft",
    "competency": "time"
  },
  {
    "id": "writing-conectores-quiz-v2-intermedio-13",
    "level": "intermedio",
    "subtopic": "Conectores",
    "gap": "El primer texto presenta cifras; ___, el segundo aporta testimonios.",
    "connector": "en cambio",
    "explanation": "Se contraponen los tipos de evidencia de dos documentos.",
    "options": [
      "en cambio",
      "por tanto",
      "además",
      "porque"
    ],
    "reviewStatus": "editorial-draft",
    "competency": "contrast"
  },
  {
    "id": "writing-conectores-quiz-v2-intermedio-14",
    "level": "intermedio",
    "subtopic": "Conectores",
    "gap": "El informe estaba bien organizado; ___, faltaban referencias para verificar los datos.",
    "connector": "no obstante",
    "explanation": "Se reconoce una carencia pese a la buena organización.",
    "options": [
      "no obstante",
      "por tanto",
      "además",
      "porque"
    ],
    "reviewStatus": "editorial-draft",
    "competency": "contrast"
  },
  {
    "id": "writing-conectores-quiz-v2-intermedio-15",
    "level": "intermedio",
    "subtopic": "Conectores",
    "gap": "El experimento carecía de control; ___, no permitía aislar el efecto observado.",
    "connector": "por consiguiente",
    "explanation": "La ausencia de control conduce a una limitación metodológica.",
    "options": [
      "por consiguiente",
      "sin embargo",
      "además",
      "porque"
    ],
    "reviewStatus": "editorial-draft",
    "competency": "consequence"
  },
  {
    "id": "writing-conectores-quiz-v2-intermedio-16",
    "level": "intermedio",
    "subtopic": "Conectores",
    "gap": "Los alumnos revisaron la bibliografía ___ prepararon la exposición.",
    "connector": "y",
    "explanation": "Se coordinan acciones que integran la preparación del trabajo.",
    "options": [
      "y",
      "sin embargo",
      "porque",
      "por tanto"
    ],
    "reviewStatus": "editorial-draft",
    "competency": "addition"
  },
  {
    "id": "writing-conectores-quiz-v2-intermedio-17",
    "level": "intermedio",
    "subtopic": "Conectores",
    "gap": "El equipo aplazó la salida ___ se esperaba una tormenta.",
    "connector": "porque",
    "explanation": "El pronóstico es el motivo que explica el aplazamiento.",
    "options": [
      "porque",
      "sin embargo",
      "además",
      "por tanto"
    ],
    "reviewStatus": "editorial-draft",
    "competency": "cause"
  },
  {
    "id": "writing-conectores-quiz-v2-intermedio-18",
    "level": "intermedio",
    "subtopic": "Conectores",
    "gap": "Los datos estaban incompletos; ___, no calcularon una tasa general.",
    "connector": "por eso",
    "explanation": "La imposibilidad de calcular una tasa se deriva de la información insuficiente.",
    "options": [
      "por eso",
      "sin embargo",
      "además",
      "porque"
    ],
    "reviewStatus": "editorial-draft",
    "competency": "consequence"
  },
  {
    "id": "writing-conectores-quiz-v2-avanzado-19",
    "level": "avanzado",
    "subtopic": "Conectores",
    "gap": "La asociación persistió en varios grupos; ___, no puede inferirse causalidad sin controlar los factores de confusión.",
    "connector": "sin embargo",
    "explanation": "La consistencia observada contrasta con la imposibilidad de atribuir una causa exclusiva.",
    "options": [
      "sin embargo",
      "por tanto",
      "además",
      "porque"
    ],
    "reviewStatus": "editorial-draft",
    "competency": "contrast"
  },
  {
    "id": "writing-conectores-quiz-v2-avanzado-20",
    "level": "avanzado",
    "subtopic": "Conectores",
    "gap": "Se usaron escalas diferentes; ___, las medias brutas no son directamente comparables.",
    "connector": "en consecuencia",
    "explanation": "La incompatibilidad de escalas explica la limitación en la comparación.",
    "options": [
      "en consecuencia",
      "sin embargo",
      "además",
      "porque"
    ],
    "reviewStatus": "editorial-draft",
    "competency": "consequence"
  },
  {
    "id": "writing-conectores-quiz-v2-avanzado-21",
    "level": "avanzado",
    "subtopic": "Conectores",
    "gap": "El decreto es contemporáneo al suceso; ___, debe examinarse su posible sesgo institucional.",
    "connector": "no obstante",
    "explanation": "La cercanía temporal es una ventaja que no elimina los sesgos de autoría.",
    "options": [
      "no obstante",
      "por tanto",
      "además",
      "porque"
    ],
    "reviewStatus": "editorial-draft",
    "competency": "contrast"
  },
  {
    "id": "writing-conectores-quiz-v2-avanzado-22",
    "level": "avanzado",
    "subtopic": "Conectores",
    "gap": "Una parte de la muestra abandonó el estudio; ___, es indispensable analizar el posible sesgo de deserción.",
    "connector": "por ello",
    "explanation": "El abandono puede afectar la representatividad de los resultados.",
    "options": [
      "por ello",
      "sin embargo",
      "además",
      "porque"
    ],
    "reviewStatus": "editorial-draft",
    "competency": "consequence"
  },
  {
    "id": "writing-conectores-quiz-v2-avanzado-23",
    "level": "avanzado",
    "subtopic": "Conectores",
    "gap": "La hipótesis no fue refutada por estos datos; ___, tampoco quedó demostrada definitivamente.",
    "connector": "sin embargo",
    "explanation": "La ausencia de refutación no equivale a una prueba concluyente.",
    "options": [
      "sin embargo",
      "por tanto",
      "además",
      "porque"
    ],
    "reviewStatus": "editorial-draft",
    "competency": "contrast"
  },
  {
    "id": "writing-conectores-quiz-v2-avanzado-24",
    "level": "avanzado",
    "subtopic": "Conectores",
    "gap": "El informe separa correlación ___ causalidad para evitar confundir conceptos.",
    "connector": "y",
    "explanation": "Se enumeran dos conceptos diferentes que deben distinguirse.",
    "options": [
      "y",
      "sin embargo",
      "porque",
      "por tanto"
    ],
    "reviewStatus": "editorial-draft",
    "competency": "addition"
  },
  {
    "id": "writing-conectores-quiz-v2-avanzado-25",
    "level": "avanzado",
    "subtopic": "Conectores",
    "gap": "Los técnicos compararon registros históricos ___ querían distinguir cambios reales de problemas de medición.",
    "connector": "porque",
    "explanation": "El objetivo de separar explicaciones constituye el motivo de comparar series.",
    "options": [
      "porque",
      "sin embargo",
      "además",
      "por tanto"
    ],
    "reviewStatus": "editorial-draft",
    "competency": "cause"
  },
  {
    "id": "writing-conectores-quiz-v2-avanzado-26",
    "level": "avanzado",
    "subtopic": "Conectores",
    "gap": "El muestreo fue voluntario; ___, los participantes pueden diferir sistemáticamente de quienes no participaron.",
    "connector": "por tanto",
    "explanation": "La selección voluntaria justifica advertir diferencias potenciales entre grupos.",
    "options": [
      "por tanto",
      "sin embargo",
      "además",
      "porque"
    ],
    "reviewStatus": "editorial-draft",
    "competency": "consequence"
  },
  {
    "id": "writing-conectores-quiz-v2-avanzado-27",
    "level": "avanzado",
    "subtopic": "Conectores",
    "gap": "Dos fuentes discrepan sobre la fecha; ___, ninguna puede descartarse sin contrastación adicional.",
    "connector": "por consiguiente",
    "explanation": "La discrepancia motiva una comprobación documental antes de aceptar o rechazar versiones.",
    "options": [
      "por consiguiente",
      "sin embargo",
      "además",
      "porque"
    ],
    "reviewStatus": "editorial-draft",
    "competency": "consequence"
  },
  {
    "id": "writing-conectores-quiz-v2-avanzado-28",
    "level": "avanzado",
    "subtopic": "Conectores",
    "gap": "El promedio general subió; ___, algunos grupos registraron retrocesos.",
    "connector": "aun así",
    "explanation": "Se contrapone la tendencia global a experiencias particulares divergentes.",
    "options": [
      "aun así",
      "por tanto",
      "además",
      "porque"
    ],
    "reviewStatus": "editorial-draft",
    "competency": "contrast"
  },
  {
    "id": "writing-conectores-quiz-v2-avanzado-29",
    "level": "avanzado",
    "subtopic": "Conectores",
    "gap": "Se identificó la población objetivo; ___, se definieron los criterios de selección de la muestra.",
    "connector": "a continuación",
    "explanation": "Se marca el paso siguiente dentro del proceso de investigación.",
    "options": [
      "a continuación",
      "sin embargo",
      "porque",
      "por tanto"
    ],
    "reviewStatus": "editorial-draft",
    "competency": "time"
  },
  {
    "id": "writing-conectores-quiz-v2-avanzado-30",
    "level": "avanzado",
    "subtopic": "Conectores",
    "gap": "La prueba mostró precisión en laboratorio; ___, falta evaluar su desempeño fuera de condiciones controladas.",
    "connector": "no obstante",
    "explanation": "La validez en un ambiente restringido no asegura resultados en contextos reales.",
    "options": [
      "no obstante",
      "por tanto",
      "además",
      "porque"
    ],
    "reviewStatus": "editorial-draft",
    "competency": "contrast"
  },
  {
    "id": "writing-conectores-quiz-v2-avanzado-31",
    "level": "avanzado",
    "subtopic": "Conectores",
    "gap": "Los resultados parecen favorables ___ se excluyeron sistemáticamente los casos abandonados.",
    "connector": "aunque",
    "explanation": "La subordinada expresa una salvedad que debilita la valoración inicial.",
    "options": [
      "aunque",
      "por tanto",
      "además",
      "porque"
    ],
    "reviewStatus": "editorial-draft",
    "competency": "contrast"
  },
  {
    "id": "writing-conectores-quiz-v2-avanzado-32",
    "level": "avanzado",
    "subtopic": "Conectores",
    "gap": "Los datos provienen de dos períodos con definiciones distintas; ___, no deben fusionarse sin armonización.",
    "connector": "por eso",
    "explanation": "La diferencia en criterios de medida impide unir las series sin ajustes.",
    "options": [
      "por eso",
      "sin embargo",
      "además",
      "porque"
    ],
    "reviewStatus": "editorial-draft",
    "competency": "consequence"
  },
  {
    "id": "writing-conectores-quiz-v2-avanzado-33",
    "level": "avanzado",
    "subtopic": "Conectores",
    "gap": "Se registraron los conflictos y sus contextos; ___, se compararon las interpretaciones de distintas fuentes.",
    "connector": "después",
    "explanation": "Se establece la secuencia de registro y contraste interpretativo.",
    "options": [
      "después",
      "sin embargo",
      "porque",
      "por tanto"
    ],
    "reviewStatus": "editorial-draft",
    "competency": "time"
  },
  {
    "id": "writing-conectores-quiz-v2-avanzado-34",
    "level": "avanzado",
    "subtopic": "Conectores",
    "gap": "No se aplicó asignación aleatoria ___ el estudio se diseñó como observacional.",
    "connector": "porque",
    "explanation": "El diseño observacional permite explicar por qué no se asignaron tratamientos al azar.",
    "options": [
      "porque",
      "sin embargo",
      "además",
      "por tanto"
    ],
    "reviewStatus": "editorial-draft",
    "competency": "cause"
  },
  {
    "id": "writing-conectores-quiz-v2-avanzado-35",
    "level": "avanzado",
    "subtopic": "Conectores",
    "gap": "Los investigadores midieron las diferencias iniciales ___ documentaron los factores de confusión.",
    "connector": "y",
    "explanation": "La conjunción añade un segundo control metodológico a la medición inicial.",
    "options": [
      "y",
      "sin embargo",
      "porque",
      "por tanto"
    ],
    "reviewStatus": "editorial-draft",
    "competency": "addition"
  }
];
