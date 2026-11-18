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
    "La clase eligió un cuento para leer.",
    "Los estudiantes identificaron a sus personajes.",
    "Comentaron el mensaje del cuento."
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
    "Luis plantó una semilla en una maceta.",
    "Una semana después, observó un pequeño brote.",
    "Registró el crecimiento en su cuaderno."
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
    "El equipo escogió un tema para investigar.",
    "Buscó información en la biblioteca.",
    "Elaboró una breve presentación."
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
    "La maestra explicó las instrucciones del juego.",
    "Los participantes formaron equipos.",
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
    "Visitó el centro comunitario.",
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
    "Redactó un primer párrafo con esas ideas.",
    "Revisó la ortografía del texto."
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
    "La biblioteca anunció una nueva actividad.",
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
    "Recopiló los registros de varios días.",
    "Explicó qué conclusiones respaldaban los datos."
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
    "Se identificaron los problemas de coherencia del borrador.",
    "Se reorganizaron los argumentos en párrafos.",
    "Se comprobó que cada conclusión tuviera respaldo."
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
    "Se organizaron los resultados en una tabla.",
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
    "Aplicó una prueba para comprobar su claridad."
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
    "Los estudiantes identificaron la tesis del artículo.",
    "Distinguieron los datos de las opiniones.",
    "Evaluaron si las evidencias apoyaban la tesis."
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
    "Se contrastaron las afirmaciones con documentos consultables.",
    "Se incorporaron referencias verificables."
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
    "Se revisaron los tiempos verbales de la narración.",
    "Se corrigieron las rupturas injustificadas de tiempo.",
    "Se leyó el relato completo para comprobar su continuidad."
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
    "Describió el método empleado.",
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
    "Se examinaron los casos que podían sustentarla.",
    "Se sustituyó por una formulación de alcance limitado."
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
    "Se seleccionó un vocabulario apropiado para ese público.",
    "Se comprobó que el mensaje pudiera comprenderse sin ambigüedades."
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
    "La clase organizó dos versiones de un mismo acontecimiento.",
    "Más adelante, contrastó fechas y autores de cada fuente.",
    "Señaló acuerdos y dudas que seguían abiertos."
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
    "Comparó los registros usando esa misma definición.",
    "Explicó qué no podía deducirse de las diferencias encontradas."
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
    "Analizaron cómo podía afectar la comparación final.",
    "Evitaron presentar esa diferencia como efecto demostrado del programa."
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
    "El artículo distinguió correlación de causalidad.",
    "Revisó los factores que podrían producir asociaciones espurias.",
    "Limitó su conclusión a la evidencia del diseño observacional."
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
    "Se compararon sus indicadores y escalas de medida.",
    "Se decidió que sus porcentajes no podían fusionarse sin ajustes."
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
    "Evaluó si las bajas alteraban la composición de la muestra.",
    "Presentó los resultados con una advertencia sobre ese sesgo posible."
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
    "Se verificó la fecha y procedencia del decreto histórico.",
    "Se contrastaron sus afirmaciones con testimonios y archivos independientes.",
    "Se comunicaron coincidencias y discrepancias sin invalidar automáticamente ninguna fuente."
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
    "Se examinó si el caso era representativo de la población.",
    "Se sustituyó la afirmación universal por una conclusión contextual."
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
    "Se especificaron los criterios de inclusión en la muestra.",
    "Se describió cómo podían producir sesgo de selección.",
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
    "Documentó los posibles efectos del cambio sobre la serie.",
    "Separó los períodos que no podían compararse directamente."
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
    "La revisión catalogó las fuentes por método y procedencia.",
    "Separó opiniones, correlaciones y resultados experimentales.",
    "Elaboró una síntesis que respetaba la fuerza diferente de cada evidencia."
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
    "Presentó evidencias que respaldaban y cuestionaban esa tesis.",
    "Formuló una conclusión matizada en vez de omitir los resultados contrarios."
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
    "Examinó si la mejora ocurría en todos los grupos por igual.",
    "Explicó las diferencias internas en lugar de ocultarlas en una cifra global."
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
    "Redefinió los criterios para que fueran mutuamente excluyentes.",
    "Volvió a clasificar los datos con reglas consistentes."
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
    "Se examinó el contexto de cada afirmación cuestionada.",
    "Se corrigió la reseña citando de forma verificable el documento."
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
    "El texto distinguió el resultado observado de una predicción futura.",
    "Explicitó los supuestos que necesitaba la predicción.",
    "Reconoció qué escenarios podían invalidar esos supuestos."
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
    "Analizó si otros cambios simultáneos podían explicar parte del resultado.",
    "Evitó atribuir toda la mejora a una única causa."
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
    "Se definieron las variables centrales de la comparación regional.",
    "Se armonizaron las unidades y períodos de las estadísticas.",
    "Se señalaron las diferencias que permanecían tras hacer comparables los datos."
    ],
    "hint": "Reconstruye la progresión argumentativa y sus enlaces lógicos.",
    "explanation": "Una comparación regional exige unificar métodos de medición antes de inferir.",
    "reviewStatus": "editorial-draft"
  }
];
