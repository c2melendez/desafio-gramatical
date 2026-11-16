import type {Level} from "./grammar";
export type OrganizationErrorCase={id:string;level:Level;subtopic:"Organización textual";title:string;flawed:string;correctConnector:string;correctSentence:string;options:[string,string,string,string];explanation:string;reviewStatus:"editorial-draft"};
/** 36 escenarios originales de estructura y coherencia; se elige la mejor
 * reparación editorial. Las alternativas y la calidad requieren revisión humana. */
export const ORGANIZATION_ERROR_CASES:OrganizationErrorCase[]=[
  {
    "id": "writing-organization-hunter-v1-principiante-0",
    "level": "principiante",
    "subtopic": "Organización textual",
    "title": "Invitación escolar",
    "flawed": "El aviso agradece la asistencia antes de anunciar cuándo será la reunión.",
    "correctConnector": "Presentar la fecha y el lugar antes del agradecimiento.",
    "correctSentence": "Presentar la fecha y el lugar antes del agradecimiento.",
    "options": [
      "Presentar la fecha y el lugar antes del agradecimiento.",
      "Agradecer dos veces antes de explicar el evento.",
      "Eliminar la fecha para abreviar el mensaje.",
      "Abrir con el nombre del organizador y omitir la invitación."
    ],
    "explanation": "La invitación debe anunciar primero el evento y sus datos; el agradecimiento corresponde al cierre.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-organization-hunter-v1-principiante-1",
    "level": "principiante",
    "subtopic": "Organización textual",
    "title": "Receta de pan",
    "flawed": "Las instrucciones indican hornear la mezcla y solo después añadir los ingredientes.",
    "correctConnector": "Indicar que se mezclan los ingredientes antes de hornear.",
    "correctSentence": "Indicar que se mezclan los ingredientes antes de hornear.",
    "options": [
      "Repetir la temperatura antes de enumerar ingredientes.",
      "Quitar todas las instrucciones anteriores al horneado.",
      "Añadir un saludo entre la mezcla y el horneado.",
      "Indicar que se mezclan los ingredientes antes de hornear."
    ],
    "explanation": "Una secuencia de instrucciones necesita presentar la preparación antes de la cocción.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-organization-hunter-v1-principiante-2",
    "level": "principiante",
    "subtopic": "Organización textual",
    "title": "Informe de visita",
    "flawed": "El texto comienza por las conclusiones de una visita sin contar dónde ocurrió.",
    "correctConnector": "Describir primero el lugar y la actividad realizada.",
    "correctSentence": "Describir primero el lugar y la actividad realizada.",
    "options": [
      "Concluir de nuevo sin introducir el contexto.",
      "Iniciar con una opinión sobre una visita distinta.",
      "Describir primero el lugar y la actividad realizada.",
      "Eliminar el nombre del sitio para evitar detalles."
    ],
    "explanation": "El lector necesita contexto sobre el lugar y la actividad antes de interpretar las conclusiones.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-organization-hunter-v1-principiante-3",
    "level": "principiante",
    "subtopic": "Organización textual",
    "title": "Cuidado de plantas",
    "flawed": "La explicación comienza diciendo que las plantas crecieron sin contar cómo fueron cuidadas.",
    "correctConnector": "Presentar primero las condiciones de riego y luz.",
    "correctSentence": "Presentar primero las condiciones de riego y luz.",
    "options": [
      "Repetir únicamente que las plantas crecieron.",
      "Presentar primero las condiciones de riego y luz.",
      "Añadir una descripción de otras especies lejanas.",
      "Terminar el escrito sin explicar las condiciones."
    ],
    "explanation": "Los resultados se comprenden mejor cuando se presenta antes el procedimiento.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-organization-hunter-v1-principiante-4",
    "level": "principiante",
    "subtopic": "Organización textual",
    "title": "Cartel de reciclaje",
    "flawed": "Un cartel alterna consejos de reciclaje con una historia sin relación sobre fútbol.",
    "correctConnector": "Agrupar los consejos ambientales y retirar el tema ajeno.",
    "correctSentence": "Agrupar los consejos ambientales y retirar el tema ajeno.",
    "options": [
      "Agrupar los consejos ambientales y retirar el tema ajeno.",
      "Agregar más anécdotas deportivas entre consejos.",
      "Trasladar los consejos al final sin título.",
      "Omitir las acciones concretas de reciclaje."
    ],
    "explanation": "Mantener un tema central evita saltos que dificultan comprender las instrucciones.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-organization-hunter-v1-principiante-5",
    "level": "principiante",
    "subtopic": "Organización textual",
    "title": "Relato de excursión",
    "flawed": "La narración sitúa el regreso a casa antes de la salida del autobús.",
    "correctConnector": "Narrar la salida antes del regreso.",
    "correctSentence": "Narrar la salida antes del regreso.",
    "options": [
      "Eliminar cualquier mención del trayecto.",
      "Comenzar con una opinión sobre otro viaje.",
      "Repetir el regreso al inicio y al cierre.",
      "Narrar la salida antes del regreso."
    ],
    "explanation": "El orden cronológico facilita seguir los acontecimientos de una excursión.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-organization-hunter-v1-principiante-6",
    "level": "principiante",
    "subtopic": "Organización textual",
    "title": "Campaña de lectura",
    "flawed": "El afiche anuncia los premios sin explicar primero en qué consiste el concurso.",
    "correctConnector": "Explicar el concurso antes de detallar los premios.",
    "correctSentence": "Explicar el concurso antes de detallar los premios.",
    "options": [
      "Colocar los premios en todas las líneas.",
      "Describir una campaña diferente sin relación.",
      "Explicar el concurso antes de detallar los premios.",
      "Quitar las reglas y mostrar únicamente fotografías."
    ],
    "explanation": "El propósito y las condiciones de participación deben preceder a los incentivos.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-organization-hunter-v1-intermedio-7",
    "level": "intermedio",
    "subtopic": "Organización textual",
    "title": "Reporte de consumo",
    "flawed": "El informe compara barrios sin aclarar si mide litros por hogar o litros totales.",
    "correctConnector": "Definir la unidad de medida antes de contrastar barrios.",
    "correctSentence": "Definir la unidad de medida antes de contrastar barrios.",
    "options": [
      "Agregar opiniones sin explicar la magnitud usada.",
      "Definir la unidad de medida antes de contrastar barrios.",
      "Eliminar la sección que explica las mediciones.",
      "Presentar primero una conclusión sobre otro municipio."
    ],
    "explanation": "Una comparación necesita criterios y unidades consistentes antes de interpretar diferencias.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-organization-hunter-v1-intermedio-8",
    "level": "intermedio",
    "subtopic": "Organización textual",
    "title": "Argumento de transporte",
    "flawed": "El párrafo afirma que debe ampliarse una ruta, pero solo contiene ejemplos sobre los colores de los buses.",
    "correctConnector": "Sustituir los ejemplos por datos sobre demanda y tiempos de viaje.",
    "correctSentence": "Sustituir los ejemplos por datos sobre demanda y tiempos de viaje.",
    "options": [
      "Sustituir los ejemplos por datos sobre demanda y tiempos de viaje.",
      "Presentar más colores de vehículos como prueba suficiente.",
      "Eliminar la tesis sin introducir otra cuestión.",
      "Añadir la biografía del conductor más antiguo."
    ],
    "explanation": "Las evidencias deben ser pertinentes para respaldar la tesis sobre la ampliación de una ruta.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-organization-hunter-v1-intermedio-9",
    "level": "intermedio",
    "subtopic": "Organización textual",
    "title": "Reseña histórica",
    "flawed": "Una reseña introduce una fecha decisiva en la última línea sin explicar los eventos previos.",
    "correctConnector": "Situar la fecha en una cronología que prepare el desenlace.",
    "correctSentence": "Situar la fecha en una cronología que prepare el desenlace.",
    "options": [
      "Eliminar los antecedentes y conservar solo una fecha.",
      "Abrir con una afirmación sobre otra época.",
      "Repetir varias veces la fecha sin contexto.",
      "Situar la fecha en una cronología que prepare el desenlace."
    ],
    "explanation": "La cronología histórica requiere antecedentes que permitan interpretar el suceso final.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-organization-hunter-v1-intermedio-10",
    "level": "intermedio",
    "subtopic": "Organización textual",
    "title": "Informe de encuesta",
    "flawed": "La conclusión afirma que todos están satisfechos aunque el desarrollo solo menciona cinco entrevistas.",
    "correctConnector": "Limitar la conclusión a las cinco personas entrevistadas.",
    "correctSentence": "Limitar la conclusión a las cinco personas entrevistadas.",
    "options": [
      "Omitir el tamaño de la muestra sin cambiar la conclusión.",
      "Añadir otra conclusión universal sin datos.",
      "Limitar la conclusión a las cinco personas entrevistadas.",
      "Afirmar que las cinco personas representan a toda la ciudad."
    ],
    "explanation": "La conclusión debe ajustarse al alcance de los datos presentados en el desarrollo.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-organization-hunter-v1-intermedio-11",
    "level": "intermedio",
    "subtopic": "Organización textual",
    "title": "Comparación de métodos",
    "flawed": "El texto mezcla ventajas y costos de dos métodos sin emplear un criterio común.",
    "correctConnector": "Comparar primero la eficacia y después los costos de ambos métodos.",
    "correctSentence": "Comparar primero la eficacia y después los costos de ambos métodos.",
    "options": [
      "Cerrar afirmando superioridad sin indicadores.",
      "Comparar primero la eficacia y después los costos de ambos métodos.",
      "Describir todas las ventajas de uno y omitir el otro.",
      "Eliminar los costos para que la comparación parezca mejor."
    ],
    "explanation": "El contraste es más claro cuando se aplican los mismos criterios a cada opción.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-organization-hunter-v1-intermedio-12",
    "level": "intermedio",
    "subtopic": "Organización textual",
    "title": "Resumen científico",
    "flawed": "El resumen repite tres veces la misma observación, pero nunca presenta su interpretación.",
    "correctConnector": "Conservar una observación y añadir la interpretación sustentada.",
    "correctSentence": "Conservar una observación y añadir la interpretación sustentada.",
    "options": [
      "Conservar una observación y añadir la interpretación sustentada.",
      "Repetir la observación dos veces más para reforzarla.",
      "Eliminar los resultados y dejar solo una opinión.",
      "Agregar citas sin relación con el experimento."
    ],
    "explanation": "Evitar redundancias deja espacio para explicar qué significan los datos.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-organization-hunter-v1-intermedio-13",
    "level": "intermedio",
    "subtopic": "Organización textual",
    "title": "Propuesta comunitaria",
    "flawed": "El proyecto presenta una solución antes de describir el problema que desea resolver.",
    "correctConnector": "Explicar primero la necesidad y luego justificar la solución.",
    "correctSentence": "Explicar primero la necesidad y luego justificar la solución.",
    "options": [
      "Suprimir la justificación de la propuesta.",
      "Agregar objetivos que no corresponden al problema.",
      "Cambiar el orden de palabras sin explicar la necesidad.",
      "Explicar primero la necesidad y luego justificar la solución."
    ],
    "explanation": "En una propuesta persuasiva, la solución debe responder a una necesidad descrita.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-organization-hunter-v1-intermedio-14",
    "level": "intermedio",
    "subtopic": "Organización textual",
    "title": "Crónica deportiva",
    "flawed": "El texto pasa del resultado final a la primera jugada sin marcas temporales.",
    "correctConnector": "Agregar referencias temporales que indiquen el retroceso narrativo.",
    "correctSentence": "Agregar referencias temporales que indiquen el retroceso narrativo.",
    "options": [
      "Cambiar los nombres de los jugadores sin ordenar hechos.",
      "Repetir el resultado final como si fuera otra jugada.",
      "Agregar referencias temporales que indiquen el retroceso narrativo.",
      "Eliminar cualquier referencia al inicio del partido."
    ],
    "explanation": "Los saltos temporales requieren marcas para que el lector reconozca el orden narrativo.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-organization-hunter-v1-intermedio-15",
    "level": "intermedio",
    "subtopic": "Organización textual",
    "title": "Informe de biblioteca",
    "flawed": "El texto incluye una tabla de préstamos sin explicar cómo se relaciona con el argumento.",
    "correctConnector": "Introducir la tabla y explicar qué dato respalda la idea principal.",
    "correctSentence": "Introducir la tabla y explicar qué dato respalda la idea principal.",
    "options": [
      "Añadir una tabla de tema no relacionado.",
      "Introducir la tabla y explicar qué dato respalda la idea principal.",
      "Quitar los encabezados de la tabla para reducir espacio.",
      "Presentar cifras sin identificar el período medido."
    ],
    "explanation": "Los recursos visuales deben introducirse e interpretarse dentro del razonamiento.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-organization-hunter-v1-intermedio-16",
    "level": "intermedio",
    "subtopic": "Organización textual",
    "title": "Explicación de erosión",
    "flawed": "La redacción atribuye el desgaste de la costa al oleaje antes de indicar qué observaciones apoyan esa causa.",
    "correctConnector": "Presentar observaciones y luego discutir causas posibles.",
    "correctSentence": "Presentar observaciones y luego discutir causas posibles.",
    "options": [
      "Presentar observaciones y luego discutir causas posibles.",
      "Eliminar los registros de observación disponibles.",
      "Convertir una hipótesis en un hecho absoluto sin pruebas.",
      "Añadir una consecuencia no relacionada con el fenómeno."
    ],
    "explanation": "La explicación debe distinguir primero datos y después interpretaciones causales.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-organization-hunter-v1-intermedio-17",
    "level": "intermedio",
    "subtopic": "Organización textual",
    "title": "Ensayo sobre hábitos",
    "flawed": "La tesis propone reducir residuos, pero el desarrollo solo explica el origen del plástico.",
    "correctConnector": "Incorporar medidas concretas de reducción vinculadas a la tesis.",
    "correctSentence": "Incorporar medidas concretas de reducción vinculadas a la tesis.",
    "options": [
      "Repetir el origen del plástico sin conectar propuestas.",
      "Finalizar con otro tema, como transporte público.",
      "Eliminar todos los ejemplos sobre residuos.",
      "Incorporar medidas concretas de reducción vinculadas a la tesis."
    ],
    "explanation": "El desarrollo debe sostener la tesis mediante argumentos conectados con la reducción.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-organization-hunter-v1-intermedio-18",
    "level": "intermedio",
    "subtopic": "Organización textual",
    "title": "Reporte de asistencia",
    "flawed": "El documento define el objetivo, presenta cifras y luego vuelve a enunciar el objetivo como si fuera una conclusión.",
    "correctConnector": "Cerrar con lo que muestran las cifras y sus límites.",
    "correctSentence": "Cerrar con lo que muestran las cifras y sus límites.",
    "options": [
      "Mover las cifras a un anexo sin mencionarlas.",
      "Concluir con una opinión sin relación con la asistencia.",
      "Cerrar con lo que muestran las cifras y sus límites.",
      "Repetir el objetivo sin interpretar ningún resultado."
    ],
    "explanation": "Una conclusión integra los resultados del desarrollo en lugar de repetir la introducción.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-organization-hunter-v1-avanzado-19",
    "level": "avanzado",
    "subtopic": "Organización textual",
    "title": "Estudio de tutorías",
    "flawed": "El texto atribuye una mejora a tutorías sin mencionar diferencias iniciales entre quienes participaron y quienes no.",
    "correctConnector": "Examinar primero diferencias de partida antes de inferir efectos.",
    "correctSentence": "Examinar primero diferencias de partida antes de inferir efectos.",
    "options": [
      "Atribuir toda la mejora al programa sin reconocer confusores.",
      "Examinar primero diferencias de partida antes de inferir efectos.",
      "Omitir las diferencias iniciales para simplificar la comparación.",
      "Presentar solo la nota final del grupo más alto."
    ],
    "explanation": "La argumentación causal debe situar el diseño y las diferencias iniciales antes de la conclusión.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-organization-hunter-v1-avanzado-20",
    "level": "avanzado",
    "subtopic": "Organización textual",
    "title": "Debate de política",
    "flawed": "Un artículo cita una opinión como prueba definitiva de la eficacia universal de una medida.",
    "correctConnector": "Separar las valoraciones de los resultados empíricos disponibles.",
    "correctSentence": "Separar las valoraciones de los resultados empíricos disponibles.",
    "options": [
      "Separar las valoraciones de los resultados empíricos disponibles.",
      "Presentar opiniones adicionales como estadísticas equivalentes.",
      "Eliminar la procedencia de las afirmaciones.",
      "Aumentar la certeza de la tesis sin datos."
    ],
    "explanation": "La estructura argumentativa debe distinguir evidencia comprobable de valoraciones.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-organization-hunter-v1-avanzado-21",
    "level": "avanzado",
    "subtopic": "Organización textual",
    "title": "Comparación regional",
    "flawed": "Se promedian cifras de dos regiones sin advertir que las mediciones corresponden a años diferentes.",
    "correctConnector": "Aclarar períodos y comparabilidad antes de calcular un promedio.",
    "correctSentence": "Aclarar períodos y comparabilidad antes de calcular un promedio.",
    "options": [
      "Eliminar las fechas para que los datos parezcan actuales.",
      "Sumar todas las cifras sin explicar unidades.",
      "Concluir que ambas regiones son idénticas.",
      "Aclarar períodos y comparabilidad antes de calcular un promedio."
    ],
    "explanation": "Una síntesis regional requiere uniformidad temporal y metodológica o reconocer límites.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-organization-hunter-v1-avanzado-22",
    "level": "avanzado",
    "subtopic": "Organización textual",
    "title": "Revisión documental",
    "flawed": "La conclusión acepta una fuente anónima y descarta otra fechada sin analizar su procedencia.",
    "correctConnector": "Contrastar autoría, fechas y contenido antes de jerarquizar fuentes.",
    "correctSentence": "Contrastar autoría, fechas y contenido antes de jerarquizar fuentes.",
    "options": [
      "Eliminar las referencias de los documentos restantes.",
      "Usar solo la antigüedad como criterio absoluto de verdad.",
      "Contrastar autoría, fechas y contenido antes de jerarquizar fuentes.",
      "Ubicar la fuente anónima al inicio como prueba definitiva."
    ],
    "explanation": "La evaluación de fuentes exige criterios explícitos de procedencia y corroboración.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-organization-hunter-v1-avanzado-23",
    "level": "avanzado",
    "subtopic": "Organización textual",
    "title": "Informe epidemiológico",
    "flawed": "El apartado de resultados incluye recomendaciones normativas antes de presentar los datos observados.",
    "correctConnector": "Separar resultados descriptivos y discusión de recomendaciones.",
    "correctSentence": "Separar resultados descriptivos y discusión de recomendaciones.",
    "options": [
      "Confundir una tasa observada con una obligación legal.",
      "Separar resultados descriptivos y discusión de recomendaciones.",
      "Mantener recomendaciones como si fueran mediciones.",
      "Omitir los datos para dar prioridad a propuestas."
    ],
    "explanation": "Separar resultados y discusión permite diferenciar hechos y juicios de actuación.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-organization-hunter-v1-avanzado-24",
    "level": "avanzado",
    "subtopic": "Organización textual",
    "title": "Análisis longitudinal",
    "flawed": "Una serie combina dos indicadores redefinidos en distintas fechas sin señalar el cambio conceptual.",
    "correctConnector": "Explicitar la redefinición y segmentar series no comparables.",
    "correctSentence": "Explicitar la redefinición y segmentar series no comparables.",
    "options": [
      "Explicitar la redefinición y segmentar series no comparables.",
      "Ocultar la redefinición del indicador.",
      "Afirmar continuidad perfecta sin comprobarla.",
      "Mezclar valores numéricos como si fueran idénticos."
    ],
    "explanation": "Una comparación longitudinal necesita definiciones estables o ajustes transparentes.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-organization-hunter-v1-avanzado-25",
    "level": "avanzado",
    "subtopic": "Organización textual",
    "title": "Reseña literaria",
    "flawed": "La crítica presenta un símbolo como hecho literal y después lo usa para demostrar una conclusión histórica.",
    "correctConnector": "Separar interpretación simbólica y afirmaciones históricas verificables.",
    "correctSentence": "Separar interpretación simbólica y afirmaciones históricas verificables.",
    "options": [
      "Convertir cada imagen en una fecha histórica.",
      "Eliminar las citas del texto literario.",
      "Sustituir el argumento por otra metáfora no explicada.",
      "Separar interpretación simbólica y afirmaciones históricas verificables."
    ],
    "explanation": "El análisis debe distinguir el plano figurado del referente comprobable.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-organization-hunter-v1-avanzado-26",
    "level": "avanzado",
    "subtopic": "Organización textual",
    "title": "Análisis de equidad",
    "flawed": "Se afirma que el promedio mejoró y se omiten diferencias negativas entre subgrupos ya descritas.",
    "correctConnector": "Integrar el promedio con la distribución y sus excepciones.",
    "correctSentence": "Integrar el promedio con la distribución y sus excepciones.",
    "options": [
      "Repetir el promedio sin discutir variaciones.",
      "Afirmar que todas las personas mejoraron por igual.",
      "Integrar el promedio con la distribución y sus excepciones.",
      "Eliminar los datos de los subgrupos que empeoraron."
    ],
    "explanation": "Una conclusión equilibrada no debe ocultar heterogeneidad relevante.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-organization-hunter-v1-avanzado-27",
    "level": "avanzado",
    "subtopic": "Organización textual",
    "title": "Metaanálisis escolar",
    "flawed": "Se mezclan efectos experimentales y asociaciones observacionales como si tuvieran idéntica fuerza causal.",
    "correctConnector": "Clasificar diseños antes de integrar sus resultados.",
    "correctSentence": "Clasificar diseños antes de integrar sus resultados.",
    "options": [
      "Afirmar causalidad general con independencia de los métodos.",
      "Clasificar diseños antes de integrar sus resultados.",
      "Calcular una cifra única sin distinguir métodos.",
      "Eliminar el diseño de cada estudio."
    ],
    "explanation": "La síntesis debe reconocer el distinto alcance causal de los diseños.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-organization-hunter-v1-avanzado-28",
    "level": "avanzado",
    "subtopic": "Organización textual",
    "title": "Informe de riesgos",
    "flawed": "La discusión combina número de avisos y número de incidentes como si fueran una misma variable.",
    "correctConnector": "Definir y presentar avisos e incidentes por separado.",
    "correctSentence": "Definir y presentar avisos e incidentes por separado.",
    "options": [
      "Definir y presentar avisos e incidentes por separado.",
      "Eliminar las definiciones para ahorrar espacio.",
      "Atribuir cada aviso a un incidente confirmado.",
      "Sumar avisos e incidentes para estimar daños."
    ],
    "explanation": "Los indicadores no equivalentes deben tratarse por separado antes de relacionarlos.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-organization-hunter-v1-avanzado-29",
    "level": "avanzado",
    "subtopic": "Organización textual",
    "title": "Protocolo de selección",
    "flawed": "La sección de resultados menciona un sesgo de muestreo que debió describirse en el método.",
    "correctConnector": "Explicar los criterios de inclusión en métodos y discutir su efecto después.",
    "correctSentence": "Explicar los criterios de inclusión en métodos y discutir su efecto después.",
    "options": [
      "Ocultar los criterios de selección dentro de anexos.",
      "Reinterpretar la muestra como aleatoria sin pruebas.",
      "Omitir toda referencia a posibles sesgos.",
      "Explicar los criterios de inclusión en métodos y discutir su efecto después."
    ],
    "explanation": "Los criterios de selección pertenecen al método y sus consecuencias a la interpretación.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-organization-hunter-v1-avanzado-30",
    "level": "avanzado",
    "subtopic": "Organización textual",
    "title": "Análisis histórico",
    "flawed": "El cierre introduce una interpretación que contradice las fuentes descritas y no explica el desacuerdo.",
    "correctConnector": "Presentar la discrepancia y justificar la lectura alternativa con pruebas.",
    "correctSentence": "Presentar la discrepancia y justificar la lectura alternativa con pruebas.",
    "options": [
      "Afirmar que la conclusión es cierta por autoridad.",
      "Cambiar el título sin discutir la contradicción.",
      "Presentar la discrepancia y justificar la lectura alternativa con pruebas.",
      "Eliminar de la sección central las fuentes contrarias."
    ],
    "explanation": "Cuando la conclusión difiere de la evidencia presentada, debe justificarse esa interpretación.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-organization-hunter-v1-avanzado-31",
    "level": "avanzado",
    "subtopic": "Organización textual",
    "title": "Reporte presupuestario",
    "flawed": "Se atribuye una reducción de gasto a una política sin separar cambios de precios y de consumo.",
    "correctConnector": "Distinguir las variaciones de precio y cantidad antes de atribuir el ahorro.",
    "correctSentence": "Distinguir las variaciones de precio y cantidad antes de atribuir el ahorro.",
    "options": [
      "Cerrar asegurando un efecto exclusivo sin controles.",
      "Distinguir las variaciones de precio y cantidad antes de atribuir el ahorro.",
      "Omitir los cambios de precio documentados.",
      "Tratar gasto y consumo como la misma magnitud."
    ],
    "explanation": "Una conclusión financiera debe separar factores que pueden explicar el resultado.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-organization-hunter-v1-avanzado-32",
    "level": "avanzado",
    "subtopic": "Organización textual",
    "title": "Síntesis de testimonios",
    "flawed": "Se ordenan declaraciones por intensidad emotiva y se infiere que las últimas son más confiables.",
    "correctConnector": "Presentar criterios de evaluación de fuentes antes de contrastar versiones.",
    "correctSentence": "Presentar criterios de evaluación de fuentes antes de contrastar versiones.",
    "options": [
      "Presentar criterios de evaluación de fuentes antes de contrastar versiones.",
      "Usar emotividad como única medida de validez.",
      "Suprimir testimonios menos expresivos.",
      "Atribuir mayor certeza a quien habló más tiempo."
    ],
    "explanation": "El orden argumentativo exige criterios de fiabilidad distintos de la carga emocional.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-organization-hunter-v1-avanzado-33",
    "level": "avanzado",
    "subtopic": "Organización textual",
    "title": "Evaluación de programa",
    "flawed": "La recomendación de ampliar un programa aparece antes de discutir sus costos y riesgos.",
    "correctConnector": "Examinar beneficios, costos y limitaciones antes de recomendar su expansión.",
    "correctSentence": "Examinar beneficios, costos y limitaciones antes de recomendar su expansión.",
    "options": [
      "Eliminar los riesgos para hacer más convincente la propuesta.",
      "Trasladar todo el análisis a un título.",
      "Repetir la recomendación en cada párrafo.",
      "Examinar beneficios, costos y limitaciones antes de recomendar su expansión."
    ],
    "explanation": "La recomendación debe apoyarse en una evaluación previa de ventajas y limitaciones.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-organization-hunter-v1-avanzado-34",
    "level": "avanzado",
    "subtopic": "Organización textual",
    "title": "Comparación de encuestas",
    "flawed": "El análisis concluye que la opinión cambió sin considerar que las preguntas fueron redactadas de forma distinta.",
    "correctConnector": "Revisar equivalencia de preguntas antes de comparar las respuestas.",
    "correctSentence": "Revisar equivalencia de preguntas antes de comparar las respuestas.",
    "options": [
      "Omitir las formulaciones originales de la encuesta.",
      "Atribuir diferencias al tiempo sin estudiar el cuestionario.",
      "Revisar equivalencia de preguntas antes de comparar las respuestas.",
      "Suponer que todas las preguntas miden exactamente lo mismo."
    ],
    "explanation": "Las comparaciones de opinión exigen instrumentos equivalentes o reconocer el sesgo de redacción.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-organization-hunter-v1-avanzado-35",
    "level": "avanzado",
    "subtopic": "Organización textual",
    "title": "Reporte climático",
    "flawed": "El informe introduce proyecciones futuras dentro de los resultados observados sin distinguir escenarios.",
    "correctConnector": "Separar las observaciones históricas de las proyecciones y sus supuestos.",
    "correctSentence": "Separar las observaciones históricas de las proyecciones y sus supuestos.",
    "options": [
      "Suprimir el período de referencia del estudio.",
      "Separar las observaciones históricas de las proyecciones y sus supuestos.",
      "Eliminar supuestos para presentar certezas absolutas.",
      "Combinar predicciones con datos como si ambos hubieran ocurrido."
    ],
    "explanation": "Las proyecciones deben distinguirse de los datos registrados y explicitar sus condiciones.",
    "reviewStatus": "editorial-draft"
  }
];
