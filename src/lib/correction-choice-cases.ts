import type {Level} from "./grammar";
export type CorrectionChoiceCase={
 id:string;level:Level;subtopic:"Corrección";gap:string;connector:string;
 options:[string,string,string,string];explanation:string;reviewStatus:"editorial-draft";
};
/** Cuestionarios originales de corrección ortográfica y morfosintáctica.
 * No se reutilizan los enunciados del juego de detección de errores.
 * Revisión especializada pendiente.
 */
export const CORRECTION_CHOICE_CASES:CorrectionChoiceCase[]=[
  {
    "id": "writing-correction-quiz-v1-principiante-0",
    "level": "principiante",
    "subtopic": "Corrección",
    "gap": "Mis compañeros ___ cada tarde en la biblioteca.",
    "connector": "estudian",
    "options": [
      "estudian",
      "estudia",
      "estudiar",
      "estudiamos"
    ],
    "explanation": "El sujeto plural requiere «estudian» en tercera persona plural.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-correction-quiz-v1-principiante-1",
    "level": "principiante",
    "subtopic": "Corrección",
    "gap": "Ayer, mi papá ___ temprano del trabajo.",
    "connector": "llegó",
    "options": [
      "llego",
      "llegaron",
      "llegaré",
      "llegó"
    ],
    "explanation": "El pretérito de tercera persona singular «llegó» lleva tilde.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-correction-quiz-v1-principiante-2",
    "level": "principiante",
    "subtopic": "Corrección",
    "gap": "La niña dejó el libro ___ de la mesa.",
    "connector": "encima",
    "options": [
      "en sima",
      "encíma",
      "encima",
      "ensima"
    ],
    "explanation": "«Encima» se escribe con c y no lleva tilde.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-correction-quiz-v1-principiante-3",
    "level": "principiante",
    "subtopic": "Corrección",
    "gap": "Nosotras ___ las instrucciones antes de empezar.",
    "connector": "leímos",
    "options": [
      "leeremos",
      "leímos",
      "leimos",
      "leyó"
    ],
    "explanation": "En pretérito, «leímos» lleva tilde para señalar el hiato.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-correction-quiz-v1-principiante-4",
    "level": "principiante",
    "subtopic": "Corrección",
    "gap": "___ está la respuesta correcta en el texto.",
    "connector": "Ahí",
    "options": [
      "Ahí",
      "Hay",
      "Ay",
      "Ahi"
    ],
    "explanation": "«Ahí» es el adverbio de lugar que señala dónde está algo.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-correction-quiz-v1-principiante-5",
    "level": "principiante",
    "subtopic": "Corrección",
    "gap": "Los estudiantes ___ sus trabajos ayer.",
    "connector": "entregaron",
    "options": [
      "entregó",
      "entregamos",
      "entregar",
      "entregaron"
    ],
    "explanation": "El sujeto plural «los estudiantes» exige «entregaron» en pasado.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-correction-quiz-v1-principiante-6",
    "level": "principiante",
    "subtopic": "Corrección",
    "gap": "El árbol creció ___ durante las últimas semanas.",
    "connector": "mucho",
    "options": [
      "muchos",
      "muchas",
      "mucho",
      "mucha"
    ],
    "explanation": "«Mucho» funciona como adverbio invariable que modifica a «creció».",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-correction-quiz-v1-intermedio-7",
    "level": "intermedio",
    "subtopic": "Corrección",
    "gap": "No sé ___ eligieron esa alternativa sin revisar los datos.",
    "connector": "por qué",
    "options": [
      "por que",
      "por qué",
      "porque",
      "porqué"
    ],
    "explanation": "En una interrogativa indirecta se usa «por qué», separado y con tilde.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-correction-quiz-v1-intermedio-8",
    "level": "intermedio",
    "subtopic": "Corrección",
    "gap": "El docente pidió que todos ___ presentes al iniciar la evaluación.",
    "connector": "estuvieran",
    "options": [
      "estuvieran",
      "estaban",
      "estuvo",
      "están"
    ],
    "explanation": "«Pidió que» requiere aquí el subjuntivo imperfecto «estuvieran».",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-correction-quiz-v1-intermedio-9",
    "level": "intermedio",
    "subtopic": "Corrección",
    "gap": "La conclusión se redactó con ___ para no exagerar los hallazgos.",
    "connector": "cautela",
    "options": [
      "cauteloso",
      "cautelosamente",
      "cautelas",
      "cautela"
    ],
    "explanation": "La preposición «con» admite el sustantivo «cautela» en esta construcción.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-correction-quiz-v1-intermedio-10",
    "level": "intermedio",
    "subtopic": "Corrección",
    "gap": "El equipo investigó ___ se produjo el cambio observado.",
    "connector": "cómo",
    "options": [
      "cómos",
      "comó",
      "cómo",
      "como"
    ],
    "explanation": "La interrogativa indirecta exige el adverbio tónico «cómo».",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-correction-quiz-v1-intermedio-11",
    "level": "intermedio",
    "subtopic": "Corrección",
    "gap": "Los investigadores ya ___ revisado los registros cuando llegó el aviso.",
    "connector": "habían",
    "options": [
      "habría",
      "habían",
      "había",
      "hubo"
    ],
    "explanation": "Con sujeto plural «los investigadores» corresponde el auxiliar «habían».",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-correction-quiz-v1-intermedio-12",
    "level": "intermedio",
    "subtopic": "Corrección",
    "gap": "___ la muestra fue pequeña, el estudio describió resultados útiles.",
    "connector": "Aunque",
    "options": [
      "Aunque",
      "Porque",
      "Por tanto",
      "Además"
    ],
    "explanation": "«Aunque» introduce una concesión entre la muestra reducida y la utilidad de los resultados.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-correction-quiz-v1-intermedio-13",
    "level": "intermedio",
    "subtopic": "Corrección",
    "gap": "La propuesta debe responder ___ necesidades específicas del vecindario.",
    "connector": "a las",
    "options": [
      "las",
      "al las",
      "a los",
      "a las"
    ],
    "explanation": "El verbo «responder» se construye con «a» y el sustantivo plural femenino lleva «las».",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-correction-quiz-v1-intermedio-14",
    "level": "intermedio",
    "subtopic": "Corrección",
    "gap": "La autora explicó que el artículo había sido ___ en la revista escolar.",
    "connector": "publicado",
    "options": [
      "publicaron",
      "publicando",
      "publicado",
      "publicada"
    ],
    "explanation": "La perífrasis pasiva «había sido» requiere el participio concordante con «artículo».",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-correction-quiz-v1-intermedio-15",
    "level": "intermedio",
    "subtopic": "Corrección",
    "gap": "Los dos documentos tienen autores distintos; ___, coinciden en algunas fechas.",
    "connector": "sin embargo",
    "options": [
      "además",
      "sin embargo",
      "por eso",
      "porque"
    ],
    "explanation": "La coincidencia se presenta como contraste con las distintas autorías.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-correction-quiz-v1-intermedio-16",
    "level": "intermedio",
    "subtopic": "Corrección",
    "gap": "Las preguntas, así como las respuestas, ___ archivadas al final de la sesión.",
    "connector": "fueron",
    "options": [
      "fueron",
      "fue",
      "era",
      "será"
    ],
    "explanation": "El núcleo plural «las preguntas» exige «fueron archivadas».",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-correction-quiz-v1-intermedio-17",
    "level": "intermedio",
    "subtopic": "Corrección",
    "gap": "Se evaluó la hipótesis ___ obtener información adicional del experimento.",
    "connector": "para",
    "options": [
      "por",
      "sin",
      "desde",
      "para"
    ],
    "explanation": "«Para» expresa finalidad: se buscó obtener información adicional.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-correction-quiz-v1-intermedio-18",
    "level": "intermedio",
    "subtopic": "Corrección",
    "gap": "La científica señaló que ___ más pruebas antes de aceptar la conclusión.",
    "connector": "hacían falta",
    "options": [
      "hizo falta",
      "haría falta",
      "hacían falta",
      "hacía falta"
    ],
    "explanation": "«Pruebas» es plural y la construcción exige «hacían falta».",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-correction-quiz-v1-avanzado-19",
    "level": "avanzado",
    "subtopic": "Corrección",
    "gap": "La investigadora sostuvo que los resultados no ___ generalizarse sin más controles.",
    "connector": "debían",
    "options": [
      "debería",
      "debían",
      "debía",
      "debemos"
    ],
    "explanation": "El plural «resultados» exige «debían» con sujeto de tercera persona plural.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-correction-quiz-v1-avanzado-20",
    "level": "avanzado",
    "subtopic": "Corrección",
    "gap": "Una correlación no permite afirmar, ___, que un factor haya causado al otro.",
    "connector": "por sí sola",
    "options": [
      "por sí sola",
      "de sí solo",
      "por si solas",
      "a sí solo"
    ],
    "explanation": "«Por sí sola» concuerda con «una correlación» y expresa insuficiencia causal.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-correction-quiz-v1-avanzado-21",
    "level": "avanzado",
    "subtopic": "Corrección",
    "gap": "El informe ofreció una síntesis ___ los alcances y las limitaciones del método.",
    "connector": "de",
    "options": [
      "entre",
      "hacia",
      "desde",
      "de"
    ],
    "explanation": "«Síntesis de» introduce los elementos integrados en el resumen.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-correction-quiz-v1-avanzado-22",
    "level": "avanzado",
    "subtopic": "Corrección",
    "gap": "El equipo revisó las fuentes, ___ procedencias eran diferentes.",
    "connector": "cuyas",
    "options": [
      "cuya",
      "cuyo",
      "cuyas",
      "cuyos"
    ],
    "explanation": "El relativo posesivo «cuyas» concuerda con «procedencias», femenino plural.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-correction-quiz-v1-avanzado-23",
    "level": "avanzado",
    "subtopic": "Corrección",
    "gap": "El resultado se comunicó como provisional ___ todavía faltaban datos representativos.",
    "connector": "porque",
    "options": [
      "por tanto",
      "porque",
      "sin embargo",
      "además"
    ],
    "explanation": "«Porque» introduce el motivo de calificar el resultado como provisional.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-correction-quiz-v1-avanzado-24",
    "level": "avanzado",
    "subtopic": "Corrección",
    "gap": "El autor no identificó la población ___ se referían sus conclusiones.",
    "connector": "a la que",
    "options": [
      "a la que",
      "por la cual",
      "desde que",
      "a los que"
    ],
    "explanation": "«Referirse a» exige la preposición a y el relativo femenino singular «la que».",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-correction-quiz-v1-avanzado-25",
    "level": "avanzado",
    "subtopic": "Corrección",
    "gap": "Las variaciones observadas fueron ___ entre las escuelas evaluadas.",
    "connector": "heterogéneas",
    "options": [
      "heterogéneo",
      "heterogeneidad",
      "heterogéneos",
      "heterogéneas"
    ],
    "explanation": "El atributo concuerda en femenino plural con «variaciones».",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-correction-quiz-v1-avanzado-26",
    "level": "avanzado",
    "subtopic": "Corrección",
    "gap": "La reseña omitió información sin ___ claramente ese recorte de fuentes.",
    "connector": "justificar",
    "options": [
      "justificación",
      "justificó",
      "justificar",
      "justificado"
    ],
    "explanation": "«Sin» ante un verbo exige el infinitivo «justificar».",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-correction-quiz-v1-avanzado-27",
    "level": "avanzado",
    "subtopic": "Corrección",
    "gap": "El informe distinguió ___ evidencia observacional y prueba experimental.",
    "connector": "entre",
    "options": [
      "hacia",
      "entre",
      "de",
      "desde"
    ],
    "explanation": "«Distinguir entre» expresa separación conceptual de las dos clases de evidencia.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-correction-quiz-v1-avanzado-28",
    "level": "avanzado",
    "subtopic": "Corrección",
    "gap": "Las conclusiones se formularon con cautela, ___ la selección de casos era voluntaria.",
    "connector": "ya que",
    "options": [
      "ya que",
      "por tanto",
      "aunque",
      "además"
    ],
    "explanation": "«Ya que» introduce la razón metodológica para la cautela.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-correction-quiz-v1-avanzado-29",
    "level": "avanzado",
    "subtopic": "Corrección",
    "gap": "La autora sugirió comparar los porcentajes solo después de ___ las escalas.",
    "connector": "armonizar",
    "options": [
      "armonizado",
      "armonicen",
      "armonización",
      "armonizar"
    ],
    "explanation": "«Después de» requiere aquí el infinitivo «armonizar».",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-correction-quiz-v1-avanzado-30",
    "level": "avanzado",
    "subtopic": "Corrección",
    "gap": "Cada fuente tiene un contexto ___ conviene considerar antes de interpretarla.",
    "connector": "que",
    "options": [
      "cuyo",
      "donde",
      "que",
      "quien"
    ],
    "explanation": "«Que» es el relativo adecuado con antecedente «contexto» y función de objeto.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-correction-quiz-v1-avanzado-31",
    "level": "avanzado",
    "subtopic": "Corrección",
    "gap": "Los datos no respaldan la afirmación, ___ se presente con lenguaje convincente.",
    "connector": "aunque",
    "options": [
      "además",
      "aunque",
      "porque",
      "por tanto"
    ],
    "explanation": "«Aunque» introduce una concesión: la forma convincente no suple la evidencia.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-correction-quiz-v1-avanzado-32",
    "level": "avanzado",
    "subtopic": "Corrección",
    "gap": "El grupo solicitó que los resultados ___ acompañados por sus límites metodológicos.",
    "connector": "fueran",
    "options": [
      "fueran",
      "eran",
      "fueron",
      "serán"
    ],
    "explanation": "«Solicitó que» exige aquí el imperfecto de subjuntivo «fueran».",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-correction-quiz-v1-avanzado-33",
    "level": "avanzado",
    "subtopic": "Corrección",
    "gap": "Un promedio puede ocultar diferencias, ___ debe examinarse la distribución de los datos.",
    "connector": "por eso",
    "options": [
      "aunque",
      "porque",
      "además",
      "por eso"
    ],
    "explanation": "«Por eso» presenta la necesidad de revisión como consecuencia de la limitación del promedio.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-correction-quiz-v1-avanzado-34",
    "level": "avanzado",
    "subtopic": "Corrección",
    "gap": "La conclusión inicial se mantuvo ___ nuevas fuentes contradijeron parte de la evidencia.",
    "connector": "aunque",
    "options": [
      "además",
      "por tanto",
      "aunque",
      "porque"
    ],
    "explanation": "«Aunque» introduce el hecho contrario que no impidió mantener la conclusión.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-correction-quiz-v1-avanzado-35",
    "level": "avanzado",
    "subtopic": "Corrección",
    "gap": "La crítica insistió en que el análisis fuera ___ y susceptible de revisión.",
    "connector": "verificable",
    "options": [
      "verificables",
      "verificable",
      "verificación",
      "verificarse"
    ],
    "explanation": "«Verificable» es un adjetivo singular que concuerda con «análisis».",
    "reviewStatus": "editorial-draft"
  }
];
