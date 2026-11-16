import type {Level} from "./grammar";
export type ConnectorEditorCase={
 id:string;level:Level;subtopic:"Conectores";steps:[string,string,string];
 hint:string;explanation:string;reviewStatus:"editorial-draft";
};
/** 36 secuencias originales, no generadas mediante permutaciones de las mismas
 * oraciones, para Editor experto. Revisión editorial humana pendiente.
 */
export const CONNECTOR_EDITOR_CASES:ConnectorEditorCase[]=[
  {
    "id": "writing-conectores-editor-v2-principiante-0",
    "level": "principiante",
    "subtopic": "Conectores",
    "steps": [
      "Al inicio, la clase eligió un cuento para leer.",
      "Después, los estudiantes identificaron a sus personajes.",
      "Al final, comentaron el mensaje del cuento."
    ],
    "hint": "Reconstruye la progresión argumentativa y sus enlaces lógicos.",
    "explanation": "La secuencia sitúa la elección, la lectura analítica y el comentario final.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-conectores-editor-v2-principiante-1",
    "level": "principiante",
    "subtopic": "Conectores",
    "steps": [
      "Primero, Luis plantó una semilla en una maceta.",
      "Una semana después, observó un pequeño brote.",
      "Finalmente, registró el crecimiento en su cuaderno."
    ],
    "hint": "Reconstruye la progresión argumentativa y sus enlaces lógicos.",
    "explanation": "El texto sigue la secuencia temporal de sembrar, observar y registrar.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-conectores-editor-v2-principiante-2",
    "level": "principiante",
    "subtopic": "Conectores",
    "steps": [
      "En primer lugar, el equipo escogió un tema para investigar.",
      "Después, buscó información en la biblioteca.",
      "Por último, elaboró una breve presentación."
    ],
    "hint": "Reconstruye la progresión argumentativa y sus enlaces lógicos.",
    "explanation": "Se ordenan las etapas básicas de investigación y presentación.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-conectores-editor-v2-principiante-3",
    "level": "principiante",
    "subtopic": "Conectores",
    "steps": [
      "Primero, la maestra explicó las instrucciones del juego.",
      "A continuación, los participantes formaron equipos.",
      "Al terminar, compartieron los resultados."
    ],
    "hint": "Reconstruye la progresión argumentativa y sus enlaces lógicos.",
    "explanation": "Las acciones siguen instrucciones, ejecución y cierre.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-conectores-editor-v2-principiante-4",
    "level": "principiante",
    "subtopic": "Conectores",
    "steps": [
      "Por la mañana, el grupo preparó los materiales.",
      "Más tarde, visitó el centro comunitario.",
      "Al regresar, redactó un informe de la actividad."
    ],
    "hint": "Reconstruye la progresión argumentativa y sus enlaces lógicos.",
    "explanation": "El reporte comienza con preparación y finaliza con una síntesis posterior.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-conectores-editor-v2-principiante-5",
    "level": "principiante",
    "subtopic": "Conectores",
    "steps": [
      "Antes de escribir, Ana hizo una lista de ideas.",
      "A continuación, redactó un primer párrafo con esas ideas.",
      "Finalmente, revisó la ortografía del texto."
    ],
    "hint": "Reconstruye la progresión argumentativa y sus enlaces lógicos.",
    "explanation": "La redacción se organiza como planificación, borrador y revisión.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-conectores-editor-v2-principiante-6",
    "level": "principiante",
    "subtopic": "Conectores",
    "steps": [
      "Primero, la biblioteca anunció una nueva actividad.",
      "Ese mismo día, los vecinos se inscribieron.",
      "Al finalizar el encuentro, expresaron sus opiniones."
    ],
    "hint": "Reconstruye la progresión argumentativa y sus enlaces lógicos.",
    "explanation": "La secuencia conecta anuncio, participación y evaluación.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-conectores-editor-v2-intermedio-7",
    "level": "intermedio",
    "subtopic": "Conectores",
    "steps": [
      "El equipo formuló una pregunta sobre el consumo de agua.",
      "A continuación, recopiló los registros de varios días.",
      "Finalmente, explicó qué conclusiones respaldaban los datos."
    ],
    "hint": "Reconstruye la progresión argumentativa y sus enlaces lógicos.",
    "explanation": "Una investigación ordenada parte de la pregunta y termina con una conclusión proporcional.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-conectores-editor-v2-intermedio-8",
    "level": "intermedio",
    "subtopic": "Conectores",
    "steps": [
      "Primero, se identificaron los problemas de coherencia del borrador.",
      "Luego, se reorganizaron los argumentos en párrafos.",
      "Por último, se comprobó que cada conclusión tuviera respaldo."
    ],
    "hint": "Reconstruye la progresión argumentativa y sus enlaces lógicos.",
    "explanation": "La edición exige diagnosticar, reorganizar y verificar.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-conectores-editor-v2-intermedio-9",
    "level": "intermedio",
    "subtopic": "Conectores",
    "steps": [
      "Antes de comparar los informes, se definieron los indicadores comunes.",
      "Después, se organizaron los resultados en una tabla.",
      "Al terminar, se explicaron coincidencias y diferencias."
    ],
    "hint": "Reconstruye la progresión argumentativa y sus enlaces lógicos.",
    "explanation": "Comparar exige criterios previos y un análisis posterior.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-conectores-editor-v2-intermedio-10",
    "level": "intermedio",
    "subtopic": "Conectores",
    "steps": [
      "El grupo reconoció que las instrucciones eran ambiguas.",
      "En respuesta, las reescribió con verbos precisos.",
      "Finalmente, aplicó una prueba para comprobar su claridad."
    ],
    "hint": "Reconstruye la progresión argumentativa y sus enlaces lógicos.",
    "explanation": "Se expone un problema, una corrección y su verificación.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-conectores-editor-v2-intermedio-11",
    "level": "intermedio",
    "subtopic": "Conectores",
    "steps": [
      "Primero, los estudiantes identificaron la tesis del artículo.",
      "Después, distinguieron los datos de las opiniones.",
      "Finalmente, evaluaron si las evidencias apoyaban la tesis."
    ],
    "hint": "Reconstruye la progresión argumentativa y sus enlaces lógicos.",
    "explanation": "El orden permite analizar una afirmación a partir de sus pruebas.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-conectores-editor-v2-intermedio-12",
    "level": "intermedio",
    "subtopic": "Conectores",
    "steps": [
      "Se detectó que faltaban fuentes en varios párrafos.",
      "A continuación, se contrastaron las afirmaciones con documentos consultables.",
      "Por último, se incorporaron referencias verificables."
    ],
    "hint": "Reconstruye la progresión argumentativa y sus enlaces lógicos.",
    "explanation": "La revisión documental requiere detectar carencias y justificar las afirmaciones.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-conectores-editor-v2-intermedio-13",
    "level": "intermedio",
    "subtopic": "Conectores",
    "steps": [
      "Primero, se revisaron los tiempos verbales de la narración.",
      "Después, se corrigieron las rupturas injustificadas de tiempo.",
      "Finalmente, se leyó el relato completo para comprobar su continuidad."
    ],
    "hint": "Reconstruye la progresión argumentativa y sus enlaces lógicos.",
    "explanation": "La coherencia temporal exige revisión y lectura posterior.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-conectores-editor-v2-intermedio-14",
    "level": "intermedio",
    "subtopic": "Conectores",
    "steps": [
      "El informe presentó el objetivo y las preguntas iniciales.",
      "A continuación, describió el método empleado.",
      "En el cierre, delimitó los resultados según sus restricciones."
    ],
    "hint": "Reconstruye la progresión argumentativa y sus enlaces lógicos.",
    "explanation": "Un informe coherente plantea objetivo, explica el método y delimita resultados.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-conectores-editor-v2-intermedio-15",
    "level": "intermedio",
    "subtopic": "Conectores",
    "steps": [
      "Se localizó una afirmación demasiado general en el resumen.",
      "Después, se examinaron los casos que podían sustentarla.",
      "Por último, se sustituyó por una formulación de alcance limitado."
    ],
    "hint": "Reconstruye la progresión argumentativa y sus enlaces lógicos.",
    "explanation": "La reescritura parte de reconocer una generalización y corregirla.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-conectores-editor-v2-intermedio-16",
    "level": "intermedio",
    "subtopic": "Conectores",
    "steps": [
      "Al comenzar, se definió el público destinatario del aviso.",
      "Luego, se seleccionó un vocabulario apropiado para ese público.",
      "Finalmente, se comprobó que el mensaje pudiera comprenderse sin ambigüedades."
    ],
    "hint": "Reconstruye la progresión argumentativa y sus enlaces lógicos.",
    "explanation": "La adecuación se evalúa desde destinatario hasta prueba de comprensión.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-conectores-editor-v2-intermedio-17",
    "level": "intermedio",
    "subtopic": "Conectores",
    "steps": [
      "Primero, la clase organizó dos versiones de un mismo acontecimiento.",
      "Más adelante, contrastó fechas y autores de cada fuente.",
      "Al cerrar, señaló acuerdos y dudas que seguían abiertos."
    ],
    "hint": "Reconstruye la progresión argumentativa y sus enlaces lógicos.",
    "explanation": "La comparación de fuentes necesita identificar procedencia antes de concluir.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-conectores-editor-v2-intermedio-18",
    "level": "intermedio",
    "subtopic": "Conectores",
    "steps": [
      "El equipo observó una diferencia entre los datos recogidos.",
      "Antes de atribuirle una causa, revisó factores alternativos.",
      "Solo entonces formuló una explicación provisional y cautelosa."
    ],
    "hint": "Reconstruye la progresión argumentativa y sus enlaces lógicos.",
    "explanation": "El orden evita pasar de observación a causalidad sin examen crítico.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-conectores-editor-v2-avanzado-19",
    "level": "avanzado",
    "subtopic": "Conectores",
    "steps": [
      "El informe definió operativamente qué mediría como «participación».",
      "Después, comparó los registros usando esa misma definición.",
      "Finalmente, explicó qué no podía deducirse de las diferencias encontradas."
    ],
    "hint": "Reconstruye la progresión argumentativa y sus enlaces lógicos.",
    "explanation": "La comparación válida exige definición consistente y límites interpretativos.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-conectores-editor-v2-avanzado-20",
    "level": "avanzado",
    "subtopic": "Conectores",
    "steps": [
      "Los investigadores identificaron una diferencia inicial entre grupos.",
      "Luego, analizaron cómo podía afectar la comparación final.",
      "Por último, evitaron presentar esa diferencia como efecto demostrado del programa."
    ],
    "hint": "Reconstruye la progresión argumentativa y sus enlaces lógicos.",
    "explanation": "Los grupos no comparables requieren ajustar el razonamiento causal.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-conectores-editor-v2-avanzado-21",
    "level": "avanzado",
    "subtopic": "Conectores",
    "steps": [
      "Primero, el artículo distinguió correlación de causalidad.",
      "Después, revisó los factores que podrían producir asociaciones espurias.",
      "Finalmente, limitó su conclusión a la evidencia del diseño observacional."
    ],
    "hint": "Reconstruye la progresión argumentativa y sus enlaces lógicos.",
    "explanation": "Se evita atribuir causalidad al pasar de conceptos a controles y límites.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-conectores-editor-v2-avanzado-22",
    "level": "avanzado",
    "subtopic": "Conectores",
    "steps": [
      "Se detectó que dos estudios definían el éxito de manera diferente.",
      "A continuación, se compararon sus indicadores y escalas de medida.",
      "Solo después se decidió que sus porcentajes no podían fusionarse sin ajustes."
    ],
    "hint": "Reconstruye la progresión argumentativa y sus enlaces lógicos.",
    "explanation": "Las medidas incompatibles impiden una síntesis numérica inmediata.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-conectores-editor-v2-avanzado-23",
    "level": "avanzado",
    "subtopic": "Conectores",
    "steps": [
      "El equipo identificó que algunos participantes abandonaron el seguimiento.",
      "Después, evaluó si las bajas alteraban la composición de la muestra.",
      "Finalmente, presentó los resultados con una advertencia sobre ese sesgo posible."
    ],
    "hint": "Reconstruye la progresión argumentativa y sus enlaces lógicos.",
    "explanation": "El análisis de deserción precede a la generalización responsable.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-conectores-editor-v2-avanzado-24",
    "level": "avanzado",
    "subtopic": "Conectores",
    "steps": [
      "Primero, se verificó la fecha y procedencia del decreto histórico.",
      "Luego, se contrastaron sus afirmaciones con testimonios y archivos independientes.",
      "Por último, se comunicaron coincidencias y discrepancias sin invalidar automáticamente ninguna fuente."
    ],
    "hint": "Reconstruye la progresión argumentativa y sus enlaces lógicos.",
    "explanation": "Una lectura histórica rigurosa compara fuentes antes de concluir.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-conectores-editor-v2-avanzado-25",
    "level": "avanzado",
    "subtopic": "Conectores",
    "steps": [
      "Se identificó una afirmación sustentada solamente en un caso particular.",
      "Después, se examinó si el caso era representativo de la población.",
      "Finalmente, se sustituyó la afirmación universal por una conclusión contextual."
    ],
    "hint": "Reconstruye la progresión argumentativa y sus enlaces lógicos.",
    "explanation": "La representatividad limita las generalizaciones de un caso aislado.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-conectores-editor-v2-avanzado-26",
    "level": "avanzado",
    "subtopic": "Conectores",
    "steps": [
      "Al inicio, se especificaron los criterios de inclusión en la muestra.",
      "A continuación, se describió cómo podían producir sesgo de selección.",
      "En el cierre, se limitó la interpretación a los participantes observados."
    ],
    "hint": "Reconstruye la progresión argumentativa y sus enlaces lógicos.",
    "explanation": "El método de selección determina el alcance de las inferencias.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-conectores-editor-v2-avanzado-27",
    "level": "avanzado",
    "subtopic": "Conectores",
    "steps": [
      "El informe detectó que el instrumento cambió durante la medición.",
      "Después, documentó los posibles efectos del cambio sobre la serie.",
      "Finalmente, separó los períodos que no podían compararse directamente."
    ],
    "hint": "Reconstruye la progresión argumentativa y sus enlaces lógicos.",
    "explanation": "Se debe examinar la comparabilidad antes de sintetizar datos temporales.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-conectores-editor-v2-avanzado-28",
    "level": "avanzado",
    "subtopic": "Conectores",
    "steps": [
      "Primero, la revisión catalogó las fuentes por método y procedencia.",
      "Después, separó opiniones, correlaciones y resultados experimentales.",
      "Finalmente, elaboró una síntesis que respetaba la fuerza diferente de cada evidencia."
    ],
    "hint": "Reconstruye la progresión argumentativa y sus enlaces lógicos.",
    "explanation": "La integración crítica exige distinguir la naturaleza de las pruebas.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-conectores-editor-v2-avanzado-29",
    "level": "avanzado",
    "subtopic": "Conectores",
    "steps": [
      "El autor planteó una tesis sobre los efectos de una política educativa.",
      "Luego, presentó evidencias que respaldaban y cuestionaban esa tesis.",
      "Por último, formuló una conclusión matizada en vez de omitir los resultados contrarios."
    ],
    "hint": "Reconstruye la progresión argumentativa y sus enlaces lógicos.",
    "explanation": "La argumentación crítica considera pruebas favorables y adversas.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-conectores-editor-v2-avanzado-30",
    "level": "avanzado",
    "subtopic": "Conectores",
    "steps": [
      "El análisis mostró una mejora en el promedio de rendimiento.",
      "Después, examinó si la mejora ocurría en todos los grupos por igual.",
      "Finalmente, explicó las diferencias internas en lugar de ocultarlas en una cifra global."
    ],
    "hint": "Reconstruye la progresión argumentativa y sus enlaces lógicos.",
    "explanation": "Un promedio no sustituye el estudio de heterogeneidad.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-conectores-editor-v2-avanzado-31",
    "level": "avanzado",
    "subtopic": "Conectores",
    "steps": [
      "El equipo detectó que las categorías utilizadas se superponían.",
      "A continuación, redefinió los criterios para que fueran mutuamente excluyentes.",
      "Por último, volvió a clasificar los datos con reglas consistentes."
    ],
    "hint": "Reconstruye la progresión argumentativa y sus enlaces lógicos.",
    "explanation": "Una clasificación válida requiere categorías claras antes de contar registros.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-conectores-editor-v2-avanzado-32",
    "level": "avanzado",
    "subtopic": "Conectores",
    "steps": [
      "Se localizaron contradicciones entre una reseña y el documento original.",
      "Después, se examinó el contexto de cada afirmación cuestionada.",
      "Finalmente, se corrigió la reseña citando de forma verificable el documento."
    ],
    "hint": "Reconstruye la progresión argumentativa y sus enlaces lógicos.",
    "explanation": "La fidelidad documental requiere contrastar interpretaciones con la fuente.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-conectores-editor-v2-avanzado-33",
    "level": "avanzado",
    "subtopic": "Conectores",
    "steps": [
      "Primero, el texto distinguió el resultado observado de una predicción futura.",
      "Después, explicitó los supuestos que necesitaba la predicción.",
      "Finalmente, reconoció qué escenarios podían invalidar esos supuestos."
    ],
    "hint": "Reconstruye la progresión argumentativa y sus enlaces lógicos.",
    "explanation": "La inferencia prospectiva exige reconocer condiciones y límites.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-conectores-editor-v2-avanzado-34",
    "level": "avanzado",
    "subtopic": "Conectores",
    "steps": [
      "El equipo identificó una mejora después de la intervención.",
      "A continuación, analizó si otros cambios simultáneos podían explicar parte del resultado.",
      "Por último, evitó atribuir toda la mejora a una única causa."
    ],
    "hint": "Reconstruye la progresión argumentativa y sus enlaces lógicos.",
    "explanation": "La secuencia examina confusores antes de establecer una atribución.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-conectores-editor-v2-avanzado-35",
    "level": "avanzado",
    "subtopic": "Conectores",
    "steps": [
      "Primero, se definieron las variables centrales de la comparación regional.",
      "Después, se armonizaron las unidades y períodos de las estadísticas.",
      "Finalmente, se señalaron las diferencias que permanecían tras hacer comparables los datos."
    ],
    "hint": "Reconstruye la progresión argumentativa y sus enlaces lógicos.",
    "explanation": "Una comparación regional exige unificar métodos de medición antes de inferir.",
    "reviewStatus": "editorial-draft"
  }
];
