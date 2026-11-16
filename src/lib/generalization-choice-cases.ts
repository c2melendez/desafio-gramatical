import type {Level} from "./grammar";
export type GeneralizationChoiceCase={id:string;level:Level;subtopic:"Generalización e integración";gap:string;connector:string;options:[string,string,string,string];explanation:string;reviewStatus:"editorial-draft"};
/** Casos originales de integración argumentativa; decisión guiada por evidencia y alcance. */
export const GENERALIZATION_CHOICE_CASES:GeneralizationChoiceCase[]=[
  {
    "id": "writing-generalization-choice-v1-principiante-0",
    "level": "principiante",
    "subtopic": "Generalización e integración",
    "gap": "En una clase de 25 alumnos, siete prefieren leer cuentos de misterio. La conclusión adecuada es ___.",
    "connector": "Siete estudiantes de esa clase manifestaron esa preferencia.",
    "options": [
      "Siete estudiantes de esa clase manifestaron esa preferencia.",
      "afirmar que el resultado es universal sin nuevos datos.",
      "atribuir todas las diferencias a una única causa no contrastada.",
      "prescindir del contexto de población y medición."
    ],
    "explanation": "La cifra describe una parte de un grupo concreto, no todos los jóvenes.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-generalization-choice-v1-principiante-1",
    "level": "principiante",
    "subtopic": "Generalización e integración",
    "gap": "Cuatro familias visitaron el museo durante una mañana. El resumen correcto es ___.",
    "connector": "Se registró la visita de cuatro familias en esa mañana.",
    "options": [
      "afirmar que el resultado es universal sin nuevos datos.",
      "atribuir todas las diferencias a una única causa no contrastada.",
      "prescindir del contexto de población y medición.",
      "Se registró la visita de cuatro familias en esa mañana."
    ],
    "explanation": "No hay información para afirmar visitas durante otros días.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-generalization-choice-v1-principiante-2",
    "level": "principiante",
    "subtopic": "Generalización e integración",
    "gap": "Una biblioteca prestó 12 libros el lunes y 18 el martes. La conclusión es ___.",
    "connector": "Se prestaron seis libros más el martes que el lunes.",
    "options": [
      "atribuir todas las diferencias a una única causa no contrastada.",
      "prescindir del contexto de población y medición.",
      "Se prestaron seis libros más el martes que el lunes.",
      "afirmar que el resultado es universal sin nuevos datos."
    ],
    "explanation": "La diferencia entre dos días no implica tendencia permanente.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-generalization-choice-v1-principiante-3",
    "level": "principiante",
    "subtopic": "Generalización e integración",
    "gap": "De ocho semillas sembradas, cinco germinaron. Se puede afirmar que ___.",
    "connector": "Germinaron cinco de las ocho semillas observadas.",
    "options": [
      "prescindir del contexto de población y medición.",
      "Germinaron cinco de las ocho semillas observadas.",
      "afirmar que el resultado es universal sin nuevos datos.",
      "atribuir todas las diferencias a una única causa no contrastada."
    ],
    "explanation": "El resultado no demuestra el éxito de todas las semillas futuras.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-generalization-choice-v1-principiante-4",
    "level": "principiante",
    "subtopic": "Generalización e integración",
    "gap": "En una votación de 15 estudiantes, nueve eligieron fútbol. El resumen fiel es ___.",
    "connector": "Nueve de los quince estudiantes votaron por fútbol.",
    "options": [
      "Nueve de los quince estudiantes votaron por fútbol.",
      "afirmar que el resultado es universal sin nuevos datos.",
      "atribuir todas las diferencias a una única causa no contrastada.",
      "prescindir del contexto de población y medición."
    ],
    "explanation": "No se conocen las preferencias de otros grupos.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-generalization-choice-v1-principiante-5",
    "level": "principiante",
    "subtopic": "Generalización e integración",
    "gap": "Un equipo encontró dos errores en un cartel. La conclusión justificada es ___.",
    "connector": "El equipo identificó al menos dos errores en ese cartel.",
    "options": [
      "afirmar que el resultado es universal sin nuevos datos.",
      "atribuir todas las diferencias a una única causa no contrastada.",
      "prescindir del contexto de población y medición.",
      "El equipo identificó al menos dos errores en ese cartel."
    ],
    "explanation": "La revisión de un cartel no describe todos los textos.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-generalization-choice-v1-principiante-6",
    "level": "principiante",
    "subtopic": "Generalización e integración",
    "gap": "Una jornada reunió a 20 voluntarios de un barrio. Lo correcto es decir ___.",
    "connector": "Participaron veinte voluntarios en esa jornada.",
    "options": [
      "atribuir todas las diferencias a una única causa no contrastada.",
      "prescindir del contexto de población y medición.",
      "Participaron veinte voluntarios en esa jornada.",
      "afirmar que el resultado es universal sin nuevos datos."
    ],
    "explanation": "No se puede deducir que todo el barrio acudió.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-generalization-choice-v1-intermedio-7",
    "level": "intermedio",
    "subtopic": "Generalización e integración",
    "gap": "Una encuesta por redes sociales obtiene 300 respuestas voluntarias. El alcance adecuado es ___.",
    "connector": "Los resultados describen a quienes respondieron y pueden sufrir autoselección.",
    "options": [
      "prescindir del contexto de población y medición.",
      "Los resultados describen a quienes respondieron y pueden sufrir autoselección.",
      "afirmar que el resultado es universal sin nuevos datos.",
      "atribuir todas las diferencias a una única causa no contrastada."
    ],
    "explanation": "El procedimiento no garantiza inferencia a toda la población.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-generalization-choice-v1-intermedio-8",
    "level": "intermedio",
    "subtopic": "Generalización e integración",
    "gap": "Dos cursos mejoraron su promedio en períodos diferentes. Antes de comparar, conviene ___.",
    "connector": "verificar criterios de evaluación y períodos equivalentes.",
    "options": [
      "verificar criterios de evaluación y períodos equivalentes.",
      "afirmar que el resultado es universal sin nuevos datos.",
      "atribuir todas las diferencias a una única causa no contrastada.",
      "prescindir del contexto de población y medición."
    ],
    "explanation": "Las condiciones distintas pueden afectar el contraste de resultados.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-generalization-choice-v1-intermedio-9",
    "level": "intermedio",
    "subtopic": "Generalización e integración",
    "gap": "Un programa registró mayor asistencia tras ampliar horarios. La interpretación prudente es ___.",
    "connector": "La asistencia aumentó, pero la atribución causal requiere más evidencia.",
    "options": [
      "afirmar que el resultado es universal sin nuevos datos.",
      "atribuir todas las diferencias a una única causa no contrastada.",
      "prescindir del contexto de población y medición.",
      "La asistencia aumentó, pero la atribución causal requiere más evidencia."
    ],
    "explanation": "Otras condiciones podrían haber cambiado al mismo tiempo.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-generalization-choice-v1-intermedio-10",
    "level": "intermedio",
    "subtopic": "Generalización e integración",
    "gap": "Dos documentos difieren sobre una fecha histórica. La síntesis apropiada es ___.",
    "connector": "señalar la discrepancia y contrastar fuentes adicionales.",
    "options": [
      "atribuir todas las diferencias a una única causa no contrastada.",
      "prescindir del contexto de población y medición.",
      "señalar la discrepancia y contrastar fuentes adicionales.",
      "afirmar que el resultado es universal sin nuevos datos."
    ],
    "explanation": "La existencia de versiones diferentes no demuestra una mentira.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-generalization-choice-v1-intermedio-11",
    "level": "intermedio",
    "subtopic": "Generalización e integración",
    "gap": "Una encuesta reporta 60% de satisfacción sin definir a quién se preguntó. Se debe agregar ___.",
    "connector": "la población consultada y el método de selección.",
    "options": [
      "prescindir del contexto de población y medición.",
      "la población consultada y el método de selección.",
      "afirmar que el resultado es universal sin nuevos datos.",
      "atribuir todas las diferencias a una única causa no contrastada."
    ],
    "explanation": "El porcentaje carece de contexto representativo sin esa información.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-generalization-choice-v1-intermedio-12",
    "level": "intermedio",
    "subtopic": "Generalización e integración",
    "gap": "Tres municipios informan tasas con denominadores diferentes. La decisión correcta es ___.",
    "connector": "armonizar los denominadores antes de agregar las cifras.",
    "options": [
      "armonizar los denominadores antes de agregar las cifras.",
      "afirmar que el resultado es universal sin nuevos datos.",
      "atribuir todas las diferencias a una única causa no contrastada.",
      "prescindir del contexto de población y medición."
    ],
    "explanation": "Las tasas no son directamente comparables sin definiciones comunes.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-generalization-choice-v1-intermedio-13",
    "level": "intermedio",
    "subtopic": "Generalización e integración",
    "gap": "En un estudio se observan mejoras y retrocesos individuales. La conclusión es ___.",
    "connector": "describir ambos tipos de resultado junto con el promedio.",
    "options": [
      "afirmar que el resultado es universal sin nuevos datos.",
      "atribuir todas las diferencias a una única causa no contrastada.",
      "prescindir del contexto de población y medición.",
      "describir ambos tipos de resultado junto con el promedio."
    ],
    "explanation": "El valor medio no representa a cada participante.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-generalization-choice-v1-intermedio-14",
    "level": "intermedio",
    "subtopic": "Generalización e integración",
    "gap": "Una noticia usa dos entrevistas para explicar un cambio nacional. Se recomienda ___.",
    "connector": "identificar el alcance testimonial y buscar evidencias poblacionales.",
    "options": [
      "atribuir todas las diferencias a una única causa no contrastada.",
      "prescindir del contexto de población y medición.",
      "identificar el alcance testimonial y buscar evidencias poblacionales.",
      "afirmar que el resultado es universal sin nuevos datos."
    ],
    "explanation": "Los relatos ayudan, pero no bastan para medir una tendencia nacional.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-generalization-choice-v1-intermedio-15",
    "level": "intermedio",
    "subtopic": "Generalización e integración",
    "gap": "Un informe contiene solo resultados positivos de cinco ensayos. Antes de concluir, debe ___.",
    "connector": "aclarar los criterios de selección y buscar resultados contrarios pertinentes.",
    "options": [
      "prescindir del contexto de población y medición.",
      "aclarar los criterios de selección y buscar resultados contrarios pertinentes.",
      "afirmar que el resultado es universal sin nuevos datos.",
      "atribuir todas las diferencias a una única causa no contrastada."
    ],
    "explanation": "La omisión de resultados negativos puede crear un sesgo.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-generalization-choice-v1-intermedio-16",
    "level": "intermedio",
    "subtopic": "Generalización e integración",
    "gap": "Una campaña de lectura coincide con apertura de nuevas bibliotecas. La conclusión cauta es ___.",
    "connector": "considerar ambas intervenciones al explicar cualquier aumento de lectura.",
    "options": [
      "considerar ambas intervenciones al explicar cualquier aumento de lectura.",
      "afirmar que el resultado es universal sin nuevos datos.",
      "atribuir todas las diferencias a una única causa no contrastada.",
      "prescindir del contexto de población y medición."
    ],
    "explanation": "La coincidencia impide una atribución exclusiva inmediata.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-generalization-choice-v1-intermedio-17",
    "level": "intermedio",
    "subtopic": "Generalización e integración",
    "gap": "Una comparación de precios omite informar la inflación. Conviene ___.",
    "connector": "distinguir variaciones nominales y reales antes de interpretar tendencias.",
    "options": [
      "afirmar que el resultado es universal sin nuevos datos.",
      "atribuir todas las diferencias a una única causa no contrastada.",
      "prescindir del contexto de población y medición.",
      "distinguir variaciones nominales y reales antes de interpretar tendencias."
    ],
    "explanation": "El valor monetario puede cambiar sin igual variación de poder adquisitivo.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-generalization-choice-v1-intermedio-18",
    "level": "intermedio",
    "subtopic": "Generalización e integración",
    "gap": "Una reseña reúne opiniones de lectores de distintas edades. Una síntesis rigurosa debe ___.",
    "connector": "distinguir preferencias y contextos de los grupos entrevistados.",
    "options": [
      "atribuir todas las diferencias a una única causa no contrastada.",
      "prescindir del contexto de población y medición.",
      "distinguir preferencias y contextos de los grupos entrevistados.",
      "afirmar que el resultado es universal sin nuevos datos."
    ],
    "explanation": "Las perspectivas pueden variar por población.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-generalization-choice-v1-avanzado-19",
    "level": "avanzado",
    "subtopic": "Generalización e integración",
    "gap": "Un análisis mezcla estudios transversales y longitudinales sin distinguirlos. Antes de integrar debe ___.",
    "connector": "clasificar diseños y precisar qué inferencias permite cada uno.",
    "options": [
      "prescindir del contexto de población y medición.",
      "clasificar diseños y precisar qué inferencias permite cada uno.",
      "afirmar que el resultado es universal sin nuevos datos.",
      "atribuir todas las diferencias a una única causa no contrastada."
    ],
    "explanation": "El tiempo de observación condiciona el alcance analítico.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-generalization-choice-v1-avanzado-20",
    "level": "avanzado",
    "subtopic": "Generalización e integración",
    "gap": "Un informe compara mortalidad entre regiones con estructuras de edad desiguales. Conviene ___.",
    "connector": "considerar tasas ajustadas o discutir el efecto de la edad.",
    "options": [
      "considerar tasas ajustadas o discutir el efecto de la edad.",
      "afirmar que el resultado es universal sin nuevos datos.",
      "atribuir todas las diferencias a una única causa no contrastada.",
      "prescindir del contexto de población y medición."
    ],
    "explanation": "Las tasas brutas pueden confundir composición con riesgo.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-generalization-choice-v1-avanzado-21",
    "level": "avanzado",
    "subtopic": "Generalización e integración",
    "gap": "Un grupo experimental empezó con resultados superiores al control. La evaluación debe ___.",
    "connector": "examinar diferencias basales antes de atribuir la brecha final al programa.",
    "options": [
      "afirmar que el resultado es universal sin nuevos datos.",
      "atribuir todas las diferencias a una única causa no contrastada.",
      "prescindir del contexto de población y medición.",
      "examinar diferencias basales antes de atribuir la brecha final al programa."
    ],
    "explanation": "Una ventaja preexistente puede explicar parte de la diferencia.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-generalization-choice-v1-avanzado-22",
    "level": "avanzado",
    "subtopic": "Generalización e integración",
    "gap": "Un documento fusiona tasas estimadas sobre bases distintas. Una síntesis válida requiere ___.",
    "connector": "verificar denominadores y realizar transformaciones justificadas.",
    "options": [
      "atribuir todas las diferencias a una única causa no contrastada.",
      "prescindir del contexto de población y medición.",
      "verificar denominadores y realizar transformaciones justificadas.",
      "afirmar que el resultado es universal sin nuevos datos."
    ],
    "explanation": "Las medidas deben compartir un marco compatible.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-generalization-choice-v1-avanzado-23",
    "level": "avanzado",
    "subtopic": "Generalización e integración",
    "gap": "Se observó una correlación robusta entre dos variables. La conclusión apropiada es ___.",
    "connector": "la asociación no demuestra por sí sola una relación causal única.",
    "options": [
      "prescindir del contexto de población y medición.",
      "la asociación no demuestra por sí sola una relación causal única.",
      "afirmar que el resultado es universal sin nuevos datos.",
      "atribuir todas las diferencias a una única causa no contrastada."
    ],
    "explanation": "Pueden intervenir confusores y causalidad inversa.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-generalization-choice-v1-avanzado-24",
    "level": "avanzado",
    "subtopic": "Generalización e integración",
    "gap": "Una revisión usa solamente investigaciones publicadas con hallazgos favorables. Debe ___.",
    "connector": "examinar sesgo de publicación y declarar criterios de inclusión.",
    "options": [
      "examinar sesgo de publicación y declarar criterios de inclusión.",
      "afirmar que el resultado es universal sin nuevos datos.",
      "atribuir todas las diferencias a una única causa no contrastada.",
      "prescindir del contexto de población y medición."
    ],
    "explanation": "La literatura disponible puede presentar selección sistemática.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-generalization-choice-v1-avanzado-25",
    "level": "avanzado",
    "subtopic": "Generalización e integración",
    "gap": "Un estudio pierde a numerosos participantes durante el seguimiento. La discusión debe ___.",
    "connector": "analizar el abandono y el riesgo de sesgo de deserción.",
    "options": [
      "afirmar que el resultado es universal sin nuevos datos.",
      "atribuir todas las diferencias a una única causa no contrastada.",
      "prescindir del contexto de población y medición.",
      "analizar el abandono y el riesgo de sesgo de deserción."
    ],
    "explanation": "La muestra final puede diferir de la inicial.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-generalization-choice-v1-avanzado-26",
    "level": "avanzado",
    "subtopic": "Generalización e integración",
    "gap": "Dos escalas de habilidades usan rangos 0–10 y 0–100. Antes de combinar, hay que ___.",
    "connector": "validar equivalencia conceptual y una transformación apropiada.",
    "options": [
      "atribuir todas las diferencias a una única causa no contrastada.",
      "prescindir del contexto de población y medición.",
      "validar equivalencia conceptual y una transformación apropiada.",
      "afirmar que el resultado es universal sin nuevos datos."
    ],
    "explanation": "La conversión aritmética sola no garantiza medir el mismo constructo.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-generalization-choice-v1-avanzado-27",
    "level": "avanzado",
    "subtopic": "Generalización e integración",
    "gap": "Una investigación atribuye el cambio a una ley que se implementó junto con otra reforma. Hay que ___.",
    "connector": "considerar ambas medidas y evitar afirmar una causa exclusiva.",
    "options": [
      "prescindir del contexto de población y medición.",
      "considerar ambas medidas y evitar afirmar una causa exclusiva.",
      "afirmar que el resultado es universal sin nuevos datos.",
      "atribuir todas las diferencias a una única causa no contrastada."
    ],
    "explanation": "Las intervenciones simultáneas no quedan diferenciadas.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-generalization-choice-v1-avanzado-28",
    "level": "avanzado",
    "subtopic": "Generalización e integración",
    "gap": "Una síntesis histórica privilegia el testimonio más cercano en fecha sin evaluar intereses. Debe ___.",
    "connector": "contrastar contexto, propósito y evidencia corroborable de cada fuente.",
    "options": [
      "contrastar contexto, propósito y evidencia corroborable de cada fuente.",
      "afirmar que el resultado es universal sin nuevos datos.",
      "atribuir todas las diferencias a una única causa no contrastada.",
      "prescindir del contexto de población y medición."
    ],
    "explanation": "La cercanía temporal no elimina sesgos de autoría.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-generalization-choice-v1-avanzado-29",
    "level": "avanzado",
    "subtopic": "Generalización e integración",
    "gap": "Un informe agrega 10 estudios que miden «éxito» de modo diferente. La interpretación correcta exige ___.",
    "connector": "identificar las definiciones antes de producir una estimación conjunta.",
    "options": [
      "afirmar que el resultado es universal sin nuevos datos.",
      "atribuir todas las diferencias a una única causa no contrastada.",
      "prescindir del contexto de población y medición.",
      "identificar las definiciones antes de producir una estimación conjunta."
    ],
    "explanation": "El mismo nombre de variable no implica equivalencia operacional.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-generalization-choice-v1-avanzado-30",
    "level": "avanzado",
    "subtopic": "Generalización e integración",
    "gap": "Una proyección económica se presenta como cifra garantizada. Es preferible ___.",
    "connector": "comunicar supuestos, escenarios e incertidumbre del modelo.",
    "options": [
      "atribuir todas las diferencias a una única causa no contrastada.",
      "prescindir del contexto de población y medición.",
      "comunicar supuestos, escenarios e incertidumbre del modelo.",
      "afirmar que el resultado es universal sin nuevos datos."
    ],
    "explanation": "La predicción depende de hipótesis futuras.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-generalization-choice-v1-avanzado-31",
    "level": "avanzado",
    "subtopic": "Generalización e integración",
    "gap": "Un ensayo cita un caso excepcional como regla sobre todas las comunidades. Debe ___.",
    "connector": "examinar representatividad y limitar el alcance de la generalización.",
    "options": [
      "prescindir del contexto de población y medición.",
      "examinar representatividad y limitar el alcance de la generalización.",
      "afirmar que el resultado es universal sin nuevos datos.",
      "atribuir todas las diferencias a una única causa no contrastada."
    ],
    "explanation": "Un caso atípico no prueba una norma universal.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-generalization-choice-v1-avanzado-32",
    "level": "avanzado",
    "subtopic": "Generalización e integración",
    "gap": "Una evaluación omite efectos adversos reportados por ciertos grupos. La síntesis debe ___.",
    "connector": "incorporar los resultados negativos pertinentes y explicar la heterogeneidad.",
    "options": [
      "incorporar los resultados negativos pertinentes y explicar la heterogeneidad.",
      "afirmar que el resultado es universal sin nuevos datos.",
      "atribuir todas las diferencias a una única causa no contrastada.",
      "prescindir del contexto de población y medición."
    ],
    "explanation": "Las excepciones pueden cambiar la interpretación global.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-generalization-choice-v1-avanzado-33",
    "level": "avanzado",
    "subtopic": "Generalización e integración",
    "gap": "Un documento compara gastos de dos años sin diferenciar precios y cantidades. Conviene ___.",
    "connector": "separar el efecto de tarifas del cambio en consumo.",
    "options": [
      "afirmar que el resultado es universal sin nuevos datos.",
      "atribuir todas las diferencias a una única causa no contrastada.",
      "prescindir del contexto de población y medición.",
      "separar el efecto de tarifas del cambio en consumo."
    ],
    "explanation": "El gasto combina los efectos de los precios y de las cantidades consumidas; ambos deben examinarse.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-generalization-choice-v1-avanzado-34",
    "level": "avanzado",
    "subtopic": "Generalización e integración",
    "gap": "Un reporte elimina casos extremos antes de calcular su promedio. Se necesita ___.",
    "connector": "documentar el criterio y evaluar el efecto de las exclusiones.",
    "options": [
      "atribuir todas las diferencias a una única causa no contrastada.",
      "prescindir del contexto de población y medición.",
      "documentar el criterio y evaluar el efecto de las exclusiones.",
      "afirmar que el resultado es universal sin nuevos datos."
    ],
    "explanation": "La selección de observaciones modifica las estimaciones y exige examinar cuánto cambian los resultados.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-generalization-choice-v1-avanzado-35",
    "level": "avanzado",
    "subtopic": "Generalización e integración",
    "gap": "Una serie longitudinal redefine un indicador en el año intermedio. Debe ___.",
    "connector": "explicar la ruptura y no atribuirla automáticamente a un cambio real.",
    "options": [
      "prescindir del contexto de población y medición.",
      "explicar la ruptura y no atribuirla automáticamente a un cambio real.",
      "afirmar que el resultado es universal sin nuevos datos.",
      "atribuir todas las diferencias a una única causa no contrastada."
    ],
    "explanation": "Una redefinición afecta la comparabilidad de los períodos.",
    "reviewStatus": "editorial-draft"
  }
];