import type {Level} from "./grammar";
export type CorrectionErrorCase={
 id:string;level:Level;subtopic:"Corrección";flawed:string;correctConnector:string;
 correctSentence:string;options:[string,string,string,string];explanation:string;
 reviewStatus:"editorial-draft";
};
/** Casos originales de corrección ortográfica, concordancia, precisión y alcance.
 * En la interfaz se selecciona el reemplazo concreto del tramo marcado.
 * Requieren revisión humana especializada antes de afirmar validez evaluativa.
 */
export const CORRECTION_ERROR_CASES:CorrectionErrorCase[]=[
  {
    "id": "writing-correction-hunter-v1-principiante-0",
    "level": "principiante",
    "subtopic": "Corrección",
    "flawed": "La niña «corren» al patio durante el recreo.",
    "correctConnector": "corre",
    "correctSentence": "La niña corre al patio durante el recreo.",
    "options": [
      "corre",
      "corren",
      "corrió",
      "correr"
    ],
    "explanation": "El sujeto singular «la niña» requiere la forma verbal singular «corre».",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-correction-hunter-v1-principiante-1",
    "level": "principiante",
    "subtopic": "Corrección",
    "flawed": "Nosotros «estudia» para la prueba de mañana.",
    "correctConnector": "estudiamos",
    "correctSentence": "Nosotros estudiamos para la prueba de mañana.",
    "options": [
      "estudian",
      "estudia",
      "estudiar",
      "estudiamos"
    ],
    "explanation": "El pronombre «nosotros» exige una forma verbal de primera persona plural.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-correction-hunter-v1-principiante-2",
    "level": "principiante",
    "subtopic": "Corrección",
    "flawed": "El libro está «ensima» de la mesa.",
    "correctConnector": "encima",
    "correctSentence": "El libro está encima de la mesa.",
    "options": [
      "ensima",
      "enzima",
      "encima",
      "en cima"
    ],
    "explanation": "El adverbio de lugar «encima» se escribe con c, no con s.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-correction-hunter-v1-principiante-3",
    "level": "principiante",
    "subtopic": "Corrección",
    "flawed": "Mi hermana «termino» el informe ayer.",
    "correctConnector": "terminó",
    "correctSentence": "Mi hermana terminó el informe ayer.",
    "options": [
      "terminen",
      "terminó",
      "termino",
      "terminas"
    ],
    "explanation": "La forma de pasado «terminó» lleva tilde para distinguirse de «termino».",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-correction-hunter-v1-principiante-4",
    "level": "principiante",
    "subtopic": "Corrección",
    "flawed": "Los alumnos «llegó» temprano al salón.",
    "correctConnector": "llegaron",
    "correctSentence": "Los alumnos llegaron temprano al salón.",
    "options": [
      "llegaron",
      "llegó",
      "llegaremos",
      "llegar"
    ],
    "explanation": "El sujeto plural «los alumnos» necesita una forma verbal plural en pasado.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-correction-hunter-v1-principiante-5",
    "level": "principiante",
    "subtopic": "Corrección",
    "flawed": "¿«Porque» llegaste después de la clase?",
    "correctConnector": "Por qué",
    "correctSentence": "¿Por qué llegaste después de la clase?",
    "options": [
      "Porqué",
      "Porque",
      "Por que",
      "Por qué"
    ],
    "explanation": "En una pregunta directa se usa «por qué» separado y con tilde.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-correction-hunter-v1-principiante-6",
    "level": "principiante",
    "subtopic": "Corrección",
    "flawed": "Ayer «haci» la tarea en casa.",
    "correctConnector": "hice",
    "correctSentence": "Ayer hice la tarea en casa.",
    "options": [
      "hizo",
      "hacemos",
      "hice",
      "haci"
    ],
    "explanation": "La primera persona de pretérito de «hacer» es «hice», escrita con c.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-correction-hunter-v1-intermedio-7",
    "level": "intermedio",
    "subtopic": "Corrección",
    "flawed": "Las conclusiones del estudio «demuestra» un cambio moderado.",
    "correctConnector": "demuestran",
    "correctSentence": "Las conclusiones del estudio demuestran un cambio moderado.",
    "options": [
      "demostrar",
      "demuestran",
      "demuestra",
      "demostró"
    ],
    "explanation": "El sujeto plural «las conclusiones» requiere el verbo plural «demuestran».",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-correction-hunter-v1-intermedio-8",
    "level": "intermedio",
    "subtopic": "Corrección",
    "flawed": "El grupo «a» realizado tres entrevistas esta semana.",
    "correctConnector": "ha",
    "correctSentence": "El grupo ha realizado tres entrevistas esta semana.",
    "options": [
      "ha",
      "a",
      "ah",
      "han"
    ],
    "explanation": "El auxiliar del pretérito perfecto es «ha» con h, del verbo haber.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-correction-hunter-v1-intermedio-9",
    "level": "intermedio",
    "subtopic": "Corrección",
    "flawed": "Aunque se registraron nuevos datos. «Estos» requieren una revisión cuidadosa.",
    "correctConnector": "estos",
    "correctSentence": "Aunque se registraron nuevos datos. estos requieren una revisión cuidadosa.",
    "options": [
      "Estos",
      "Éstos",
      "estas",
      "estos"
    ],
    "explanation": "La secuencia inicial es una subordinada inconclusa; es preferible integrarla: «Aunque se registraron nuevos datos, estos requieren una revisión cuidadosa».",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-correction-hunter-v1-intermedio-10",
    "level": "intermedio",
    "subtopic": "Corrección",
    "flawed": "El informe «está» completo, «mas» falta revisar las referencias.",
    "correctConnector": "pero",
    "correctSentence": "El informe pero completo, «mas» falta revisar las referencias.",
    "options": [
      "y",
      "porque",
      "pero",
      "más"
    ],
    "explanation": "Para expresar un contraste claro en este contexto, «pero» conecta la conclusión con la revisión pendiente.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-correction-hunter-v1-intermedio-11",
    "level": "intermedio",
    "subtopic": "Corrección",
    "flawed": "La propuesta permitió «preveer» los gastos de la actividad.",
    "correctConnector": "prever",
    "correctSentence": "La propuesta permitió prever los gastos de la actividad.",
    "options": [
      "previsión",
      "prever",
      "preveer",
      "prevé"
    ],
    "explanation": "El infinitivo correcto es «prever», sin duplicación de e.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-correction-hunter-v1-intermedio-12",
    "level": "intermedio",
    "subtopic": "Corrección",
    "flawed": "Se entregaron los resultados a «el» director ayer.",
    "correctConnector": "al",
    "correctSentence": "Se entregaron los resultados a al director ayer.",
    "options": [
      "al",
      "el",
      "él",
      "a el"
    ],
    "explanation": "La combinación de la preposición a y el artículo el se contrae a «al».",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-correction-hunter-v1-intermedio-13",
    "level": "intermedio",
    "subtopic": "Corrección",
    "flawed": "«Hubieron» varias dudas durante la conferencia.",
    "correctConnector": "Hubo",
    "correctSentence": "Hubo varias dudas durante la conferencia.",
    "options": [
      "Habían",
      "Hubieron",
      "Habrán",
      "Hubo"
    ],
    "explanation": "El verbo haber impersonal se usa en singular: «hubo varias dudas».",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-correction-hunter-v1-intermedio-14",
    "level": "intermedio",
    "subtopic": "Corrección",
    "flawed": "Los docentes explicaron «como» resolver el problema.",
    "correctConnector": "cómo",
    "correctSentence": "Los docentes explicaron cómo resolver el problema.",
    "options": [
      "comó",
      "cóma",
      "cómo",
      "como"
    ],
    "explanation": "En una interrogativa indirecta, «cómo» lleva tilde.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-correction-hunter-v1-intermedio-15",
    "level": "intermedio",
    "subtopic": "Corrección",
    "flawed": "La lectura permitió comprender mejor «el porque» de la decisión.",
    "correctConnector": "el porqué",
    "correctSentence": "La lectura permitió comprender mejor el porqué de la decisión.",
    "options": [
      "el por qué",
      "el porqué",
      "el porque",
      "el por que"
    ],
    "explanation": "Como sustantivo precedido por artículo, «porqué» se escribe junto y con tilde.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-correction-hunter-v1-intermedio-16",
    "level": "intermedio",
    "subtopic": "Corrección",
    "flawed": "Los participantes llegaron «tarde», sin embargo iniciaron a tiempo.",
    "correctConnector": "tarde;",
    "correctSentence": "Los participantes llegaron tarde;, sin embargo iniciaron a tiempo.",
    "options": [
      "tarde;",
      "tarde,",
      "tarde:",
      "tarde y"
    ],
    "explanation": "El conector «sin embargo» exige separar adecuadamente dos proposiciones; un punto y coma permite hacerlo.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-correction-hunter-v1-intermedio-17",
    "level": "intermedio",
    "subtopic": "Corrección",
    "flawed": "Se recomienda redactar las conclusiones de manera «clara y conciso».",
    "correctConnector": "clara y concisa",
    "correctSentence": "Se recomienda redactar las conclusiones de manera clara y concisa.",
    "options": [
      "claro y concisa",
      "claras y concisa",
      "claros y conciso",
      "clara y concisa"
    ],
    "explanation": "Los dos adjetivos deben concordar con «manera», femenino singular.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-correction-hunter-v1-intermedio-18",
    "level": "intermedio",
    "subtopic": "Corrección",
    "flawed": "La autora mencionó «tres hipótesis que es diferentes».",
    "correctConnector": "tres hipótesis que son diferentes",
    "correctSentence": "La autora mencionó tres hipótesis que son diferentes.",
    "options": [
      "tres hipótesis que fue diferente",
      "tres hipótesis que está diferentes",
      "tres hipótesis que son diferentes",
      "tres hipótesis que es diferente"
    ],
    "explanation": "El relativo «que» remite a un antecedente plural, por lo que corresponde «son».",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-correction-hunter-v1-avanzado-19",
    "level": "avanzado",
    "subtopic": "Corrección",
    "flawed": "«La mayoría de los encuestados coincidieron» en la respuesta, según el análisis.",
    "correctConnector": "La mayoría de las personas encuestadas coincidió",
    "correctSentence": "La mayoría de las personas encuestadas coincidió en la respuesta, según el análisis.",
    "options": [
      "La mayoría de personas coincidieron",
      "La mayoría de las personas encuestadas coincidió",
      "La mayoría de encuestados coincidieron",
      "Los encuestados coincidió"
    ],
    "explanation": "Con el núcleo singular «mayoría», la concordancia singular «coincidió» es una alternativa clara y evita vacilación.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-correction-hunter-v1-avanzado-20",
    "level": "avanzado",
    "subtopic": "Corrección",
    "flawed": "La comisión analizó el informe de las tutoras «que era incompleto».",
    "correctConnector": "que estaba incompleto",
    "correctSentence": "La comisión analizó el informe de las tutoras que estaba incompleto.",
    "options": [
      "que estaba incompleto",
      "que fueron incompletas",
      "que eran incompletos",
      "cuyas incompletas"
    ],
    "explanation": "La redacción debe precisar que se refiere al informe: «La comisión analizó el informe, que estaba incompleto, de las tutoras».",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-correction-hunter-v1-avanzado-21",
    "level": "avanzado",
    "subtopic": "Corrección",
    "flawed": "«En base a» los resultados, se propuso repetir la medición.",
    "correctConnector": "Con base en",
    "correctSentence": "Con base en los resultados, se propuso repetir la medición.",
    "options": [
      "En torno a",
      "En base a",
      "En las bases a",
      "Con base en"
    ],
    "explanation": "«Con base en» es una formulación precisa y ampliamente aceptada para indicar fundamento.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-correction-hunter-v1-avanzado-22",
    "level": "avanzado",
    "subtopic": "Corrección",
    "flawed": "El equipo atribuyó el cambio «a causa de debido a» la lluvia.",
    "correctConnector": "a",
    "correctSentence": "El equipo atribuyó el cambio a la lluvia.",
    "options": [
      "a causa de debido",
      "en causa a",
      "a",
      "por debido a"
    ],
    "explanation": "La doble construcción causal es redundante; «atribuyó el cambio a la lluvia» es gramatical y suficiente.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-correction-hunter-v1-avanzado-23",
    "level": "avanzado",
    "subtopic": "Corrección",
    "flawed": "La síntesis describe una tendencia, «en cambio, por lo tanto,» presenta una conclusión.",
    "correctConnector": "y luego",
    "correctSentence": "La síntesis describe una tendencia, y luego presenta una conclusión.",
    "options": [
      "o bien, por consiguiente,",
      "y luego",
      "sin embargo, por tanto,",
      "porque, no obstante,"
    ],
    "explanation": "La acumulación de conectores con relaciones incompatibles altera la coherencia; conviene un enlace explícito de continuación.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-correction-hunter-v1-avanzado-24",
    "level": "avanzado",
    "subtopic": "Corrección",
    "flawed": "El estudio reportó un incremento «significativo», aunque no presentó pruebas estadísticas.",
    "correctConnector": "observado",
    "correctSentence": "El estudio reportó un incremento observado, aunque no presentó pruebas estadísticas.",
    "options": [
      "observado",
      "garantizado",
      "demostrado causalmente",
      "estadísticamente probado"
    ],
    "explanation": "«Observado» informa del aumento sin insinuar significación estadística no documentada.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-correction-hunter-v1-avanzado-25",
    "level": "avanzado",
    "subtopic": "Corrección",
    "flawed": "La explicación «explica claramente» las causas principales del cambio.",
    "correctConnector": "presenta",
    "correctSentence": "La explicación presenta las causas principales del cambio.",
    "options": [
      "describe explicando",
      "explica explicando",
      "justifica garantizando",
      "presenta"
    ],
    "explanation": "Evitar repetir «explicación» y «explica» mejora la precisión: «La explicación presenta claramente…».",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-correction-hunter-v1-avanzado-26",
    "level": "avanzado",
    "subtopic": "Corrección",
    "flawed": "Se comparó «la tasa y el porcentaje» como si fueran medidas equivalentes.",
    "correctConnector": "una tasa con un porcentaje",
    "correctSentence": "Se comparó una tasa con un porcentaje como si fueran medidas equivalentes.",
    "options": [
      "las tasas idénticas",
      "el porcentaje con el igual",
      "una tasa con un porcentaje",
      "la misma tasa porcentual"
    ],
    "explanation": "Deben explicitarse las magnitudes y denominadores antes de equiparar tasas y porcentajes.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-correction-hunter-v1-avanzado-27",
    "level": "avanzado",
    "subtopic": "Corrección",
    "flawed": "El informe afirmó «todos» los participantes mejoraron, pese a registrar varias excepciones.",
    "correctConnector": "que algunos",
    "correctSentence": "El informe afirmó que algunos los participantes mejoraron, pese a registrar varias excepciones.",
    "options": [
      "que cada uno",
      "que algunos",
      "que ninguno",
      "que absolutamente todos"
    ],
    "explanation": "Las excepciones invalidan el cuantificador universal «todos»; se requiere una formulación limitada.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-correction-hunter-v1-avanzado-28",
    "level": "avanzado",
    "subtopic": "Corrección",
    "flawed": "El texto señala «éste» resultado sin referencia clara en el párrafo anterior.",
    "correctConnector": "este",
    "correctSentence": "El texto señala este resultado sin referencia clara en el párrafo anterior.",
    "options": [
      "este",
      "éste",
      "esté",
      "éste mismo"
    ],
    "explanation": "El demostrativo «este» no lleva tilde según la ortografía actual; además, la revisión debe identificar su referente.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-correction-hunter-v1-avanzado-29",
    "level": "avanzado",
    "subtopic": "Corrección",
    "flawed": "El grupo «ratificó» los resultados antes de verificar los instrumentos utilizados.",
    "correctConnector": "presentó",
    "correctSentence": "El grupo presentó los resultados antes de verificar los instrumentos utilizados.",
    "options": [
      "certificó",
      "validó plenamente",
      "garantizó",
      "presentó"
    ],
    "explanation": "«Presentó» no presupone una comprobación ya realizada, a diferencia de «ratificó».",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-correction-hunter-v1-avanzado-30",
    "level": "avanzado",
    "subtopic": "Corrección",
    "flawed": "La autora concluyó «se demuestra» que las entrevistas causaron el resultado.",
    "correctConnector": "se observa",
    "correctSentence": "La autora concluyó se observa que las entrevistas causaron el resultado.",
    "options": [
      "se confirma definitivamente",
      "se verifica causalmente",
      "se observa",
      "se prueba"
    ],
    "explanation": "«Se observa» evita inferir causalidad a partir de testimonios sin un diseño que la establezca.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-correction-hunter-v1-avanzado-31",
    "level": "avanzado",
    "subtopic": "Corrección",
    "flawed": "La muestra «representa a toda la población» porque incluyó quince voluntarios.",
    "correctConnector": "describe a los participantes entrevistados",
    "correctSentence": "La muestra describe a los participantes entrevistados porque incluyó quince voluntarios.",
    "options": [
      "incluye todos los casos posibles",
      "describe a los participantes entrevistados",
      "es representativa por definición",
      "demuestra universalidad"
    ],
    "explanation": "El número de voluntarios no garantiza representatividad; se limita la afirmación a quienes participaron.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-correction-hunter-v1-avanzado-32",
    "level": "avanzado",
    "subtopic": "Corrección",
    "flawed": "Dos fuentes «coincidieron exactamente» aunque discrepan en la fecha.",
    "correctConnector": "coincidieron en algunos aspectos",
    "correctSentence": "Dos fuentes coincidieron en algunos aspectos aunque discrepan en la fecha.",
    "options": [
      "coincidieron en algunos aspectos",
      "coincidieron sin excepción",
      "demostraron la misma fecha",
      "fueron idénticas"
    ],
    "explanation": "La discrepancia impide hablar de coincidencia exacta; debe precisarse el alcance.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-correction-hunter-v1-avanzado-33",
    "level": "avanzado",
    "subtopic": "Corrección",
    "flawed": "La reseña «descartó» una fuente por ser posterior al acontecimiento.",
    "correctConnector": "evaluó críticamente",
    "correctSentence": "La reseña evaluó críticamente una fuente por ser posterior al acontecimiento.",
    "options": [
      "eliminó sin revisión",
      "invalidó necesariamente",
      "desestimó por completo",
      "evaluó críticamente"
    ],
    "explanation": "Una fuente tardía no carece automáticamente de valor: exige evaluar contexto y corroboración.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-correction-hunter-v1-avanzado-34",
    "level": "avanzado",
    "subtopic": "Corrección",
    "flawed": "Las conclusiones se presentaron «igual para todos» pese a diferencias metodológicas entre centros.",
    "correctConnector": "según las condiciones de cada centro",
    "correctSentence": "Las conclusiones se presentaron según las condiciones de cada centro pese a diferencias metodológicas entre centros.",
    "options": [
      "universales sin reservas",
      "idénticas por definición",
      "según las condiciones de cada centro",
      "invariables entre centros"
    ],
    "explanation": "Las diferencias de método exigen matizar conclusiones y evitar la generalización uniforme.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-correction-hunter-v1-avanzado-35",
    "level": "avanzado",
    "subtopic": "Corrección",
    "flawed": "La discusión «confirmó» una explicación aunque los datos permitían varias hipótesis.",
    "correctConnector": "consideró",
    "correctSentence": "La discusión consideró una explicación aunque los datos permitían varias hipótesis.",
    "options": [
      "certificó en exclusiva",
      "consideró",
      "probó",
      "verificó sin dudas"
    ],
    "explanation": "Los datos compatibles con varias hipótesis exigen distinguir posibilidades de demostraciones concluyentes.",
    "reviewStatus": "editorial-draft"
  }
];
