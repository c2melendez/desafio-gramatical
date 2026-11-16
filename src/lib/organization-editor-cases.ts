import type {Level} from "./grammar";
export type OrganizationEditorCase={id:string;level:Level;subtopic:"Organización textual";steps:[string,string,string];explanation:string;hint:string;reviewStatus:"editorial-draft"};
/** Secuencias originales de organización y cohesión: exposición, comparación y
 * argumentación. Requieren revisión editorial especializada. */
export const ORGANIZATION_EDITOR_CASES:OrganizationEditorCase[]=[
  {
    "id": "writing-organization-editor-v1-principiante-0",
    "level": "principiante",
    "subtopic": "Organización textual",
    "steps": [
      "La escuela anunció que organizaría un torneo de ajedrez.",
      "Después, cada grado inscribió a sus participantes interesados.",
      "Finalmente, se realizó el torneo y se entregaron reconocimientos."
    ],
    "explanation": "La convocatoria precede a la inscripción y a la celebración del torneo.",
    "hint": "Ordena un texto con estructura lógica y conclusiones respaldadas.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-organization-editor-v1-principiante-1",
    "level": "principiante",
    "subtopic": "Organización textual",
    "steps": [
      "Una familia decidió reparar una bicicleta vieja.",
      "Primero, examinó las piezas que necesitaban mantenimiento.",
      "Al terminar la reparación, probó la bicicleta en un lugar seguro."
    ],
    "explanation": "El diagnóstico de la bicicleta sucede antes de la reparación y su comprobación.",
    "hint": "Ordena un texto con estructura lógica y conclusiones respaldadas.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-organization-editor-v1-principiante-2",
    "level": "principiante",
    "subtopic": "Organización textual",
    "steps": [
      "La clase recibió una invitación para visitar el jardín botánico.",
      "A continuación, preparó preguntas sobre las plantas de la zona.",
      "Después de la visita, compartió lo que había aprendido."
    ],
    "explanation": "La preparación y la visita preceden a la síntesis del aprendizaje.",
    "hint": "Ordena un texto con estructura lógica y conclusiones respaldadas.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-organization-editor-v1-principiante-3",
    "level": "principiante",
    "subtopic": "Organización textual",
    "steps": [
      "Un grupo encontró basura acumulada cerca de una quebrada.",
      "Los estudiantes organizaron una jornada de limpieza con adultos responsables.",
      "Al concluir, colocaron avisos para fomentar el cuidado del lugar."
    ],
    "explanation": "El problema da lugar a una intervención y a una medida preventiva posterior.",
    "hint": "Ordena un texto con estructura lógica y conclusiones respaldadas.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-organization-editor-v1-principiante-4",
    "level": "principiante",
    "subtopic": "Organización textual",
    "steps": [
      "La biblioteca anunció la llegada de nuevos cuentos infantiles.",
      "Después, organizó los títulos por autor y género.",
      "Por último, los lectores pudieron consultarlos en el catálogo actualizado."
    ],
    "explanation": "Un catálogo se actualiza después de recibir y clasificar los libros.",
    "hint": "Ordena un texto con estructura lógica y conclusiones respaldadas.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-organization-editor-v1-principiante-5",
    "level": "principiante",
    "subtopic": "Organización textual",
    "steps": [
      "Los vecinos solicitaron pintar las bancas del parque.",
      "Primero, se acordó un día para realizar el trabajo comunitario.",
      "Finalmente, las bancas pintadas quedaron disponibles para el público."
    ],
    "explanation": "La solicitud y la organización preceden al resultado del trabajo.",
    "hint": "Ordena un texto con estructura lógica y conclusiones respaldadas.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-organization-editor-v1-principiante-6",
    "level": "principiante",
    "subtopic": "Organización textual",
    "steps": [
      "La profesora presentó un documental sobre los volcanes.",
      "Luego, los estudiantes anotaron tres ideas importantes del video.",
      "En el cierre, compararon sus notas y formularon preguntas."
    ],
    "explanation": "La secuencia integra presentación, registro y discusión de ideas.",
    "hint": "Ordena un texto con estructura lógica y conclusiones respaldadas.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-organization-editor-v1-intermedio-7",
    "level": "intermedio",
    "subtopic": "Organización textual",
    "steps": [
      "Un periódico local investigó los retrasos del transporte escolar.",
      "El reportaje comparó horarios anunciados con llegadas observadas.",
      "La conclusión identificó diferencias registradas sin atribuir causas no verificadas."
    ],
    "explanation": "La investigación pasa de una pregunta a los registros y después a una conclusión limitada.",
    "hint": "Ordena un texto con estructura lógica y conclusiones respaldadas.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-organization-editor-v1-intermedio-8",
    "level": "intermedio",
    "subtopic": "Organización textual",
    "steps": [
      "Una asociación evaluó la asistencia a sus talleres de formación.",
      "Primero, definió qué contaría como participante presente.",
      "A continuación, comparó las cifras de cada taller usando el mismo criterio."
    ],
    "explanation": "Un indicador común debe definirse antes de comparar observaciones.",
    "hint": "Ordena un texto con estructura lógica y conclusiones respaldadas.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-organization-editor-v1-intermedio-9",
    "level": "intermedio",
    "subtopic": "Organización textual",
    "steps": [
      "Un ensayo propuso ampliar los espacios de lectura de la escuela.",
      "El desarrollo presentó datos sobre la ocupación actual de las salas.",
      "Finalmente, recomendó estudiar horarios y necesidades antes de invertir."
    ],
    "explanation": "La tesis requiere evidencia pertinente y una recomendación derivada de ella.",
    "hint": "Ordena un texto con estructura lógica y conclusiones respaldadas.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-organization-editor-v1-intermedio-10",
    "level": "intermedio",
    "subtopic": "Organización textual",
    "steps": [
      "Los alumnos observaron diferencias de crecimiento entre plantas.",
      "Después, advirtieron que los recipientes no recibían igual cantidad de luz.",
      "El informe concluyó que no podía atribuir las diferencias únicamente al riego."
    ],
    "explanation": "La presencia de una variable alternativa condiciona la conclusión del experimento.",
    "hint": "Ordena un texto con estructura lógica y conclusiones respaldadas.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-organization-editor-v1-intermedio-11",
    "level": "intermedio",
    "subtopic": "Organización textual",
    "steps": [
      "Un museo presentó dos testimonios sobre una celebración antigua.",
      "La guía explicó quiénes eran los testigos y cuándo hablaron.",
      "En el cierre, destacó acuerdos y discrepancias que faltaba corroborar."
    ],
    "explanation": "La procedencia de los testimonios permite contrastarlos sin invalidar versiones automáticamente.",
    "hint": "Ordena un texto con estructura lógica y conclusiones respaldadas.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-organization-editor-v1-intermedio-12",
    "level": "intermedio",
    "subtopic": "Organización textual",
    "steps": [
      "Un boletín anunció una disminución del consumo de papel.",
      "Luego, precisó el período y la cantidad de hojas utilizadas.",
      "Finalmente, señaló que los registros aún no explicaban por sí solos todas las causas."
    ],
    "explanation": "El dato observado se contextualiza antes de discutir posibles explicaciones.",
    "hint": "Ordena un texto con estructura lógica y conclusiones respaldadas.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-organization-editor-v1-intermedio-13",
    "level": "intermedio",
    "subtopic": "Organización textual",
    "steps": [
      "La comisión escolar detectó desacuerdos sobre el uso del laboratorio.",
      "Primero, escuchó las necesidades de los diferentes grupos.",
      "Después, redactó reglas comunes y estableció una revisión de su aplicación."
    ],
    "explanation": "Una solución colectiva exige recoger perspectivas antes de acordar reglas.",
    "hint": "Ordena un texto con estructura lógica y conclusiones respaldadas.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-organization-editor-v1-intermedio-14",
    "level": "intermedio",
    "subtopic": "Organización textual",
    "steps": [
      "Un texto divulgativo presentó los principales tipos de nubes.",
      "A continuación, explicó sus características con ejemplos cotidianos.",
      "Por último, resumió sus diferencias sin agregar otra clasificación nueva."
    ],
    "explanation": "La síntesis debe integrar lo desarrollado en lugar de introducir contenido ajeno.",
    "hint": "Ordena un texto con estructura lógica y conclusiones respaldadas.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-organization-editor-v1-intermedio-15",
    "level": "intermedio",
    "subtopic": "Organización textual",
    "steps": [
      "Un municipio publicó mapas de crecimiento urbano de dos décadas.",
      "El informe aclaró la escala de ambos mapas y sus fuentes.",
      "Después, describió cambios visibles en las zonas comparables."
    ],
    "explanation": "Los mapas requieren referencias equivalentes antes de la comparación.",
    "hint": "Ordena un texto con estructura lógica y conclusiones respaldadas.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-organization-editor-v1-intermedio-16",
    "level": "intermedio",
    "subtopic": "Organización textual",
    "steps": [
      "Una profesora pidió preparar un resumen crítico de dos artículos.",
      "El grupo identificó primero la tesis y las evidencias de cada uno.",
      "Finalmente, comparó sus enfoques y señaló lo que ambos omitían."
    ],
    "explanation": "Un contraste riguroso comienza examinando cada fuente antes de integrarlas.",
    "hint": "Ordena un texto con estructura lógica y conclusiones respaldadas.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-organization-editor-v1-intermedio-17",
    "level": "intermedio",
    "subtopic": "Organización textual",
    "steps": [
      "El consejo estudiantil propuso un nuevo calendario de actividades.",
      "La propuesta expuso restricciones de tiempo y recursos disponibles.",
      "El acuerdo final priorizó actividades compatibles con esas condiciones."
    ],
    "explanation": "Las propuestas viables conectan objetivos, recursos y decisiones.",
    "hint": "Ordena un texto con estructura lógica y conclusiones respaldadas.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-organization-editor-v1-intermedio-18",
    "level": "intermedio",
    "subtopic": "Organización textual",
    "steps": [
      "El artículo afirmaba que una campaña había aumentado la participación.",
      "Después, reconoció que también cambió la forma de registrar asistentes.",
      "La conclusión distinguió el crecimiento real del posible efecto de mejor registro."
    ],
    "explanation": "La interpretación debe considerar si un cambio de medición explica parte de los datos.",
    "hint": "Ordena un texto con estructura lógica y conclusiones respaldadas.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-organization-editor-v1-avanzado-19",
    "level": "avanzado",
    "subtopic": "Organización textual",
    "steps": [
      "Un informe comparó efectos de dos programas aplicados en centros diferentes.",
      "Primero, describió las características y diferencias iniciales de cada grupo.",
      "Finalmente, evitó atribuir toda la diferencia final a un solo programa."
    ],
    "explanation": "La comparación debe reconocer condiciones basales antes de sostener efectos causales.",
    "hint": "Ordena un texto con estructura lógica y conclusiones respaldadas.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-organization-editor-v1-avanzado-20",
    "level": "avanzado",
    "subtopic": "Organización textual",
    "steps": [
      "Un análisis histórico planteó que dos decretos respondían a problemas distintos.",
      "La sección central contrastó sus fechas, autores y destinatarios documentados.",
      "En el cierre, acotó la interpretación a lo respaldado por esas fuentes."
    ],
    "explanation": "La contextualización documental precede a una conclusión histórica razonada.",
    "hint": "Ordena un texto con estructura lógica y conclusiones respaldadas.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-organization-editor-v1-avanzado-21",
    "level": "avanzado",
    "subtopic": "Organización textual",
    "steps": [
      "Una revisión encontró resultados favorables y desfavorables de una intervención.",
      "Después, examinó si los estudios utilizaban indicadores comparables.",
      "Solo entonces sintetizó los hallazgos e indicó sus diferencias de alcance."
    ],
    "explanation": "La integración debe valorar compatibilidad metodológica y heterogeneidad.",
    "hint": "Ordena un texto con estructura lógica y conclusiones respaldadas.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-organization-editor-v1-avanzado-22",
    "level": "avanzado",
    "subtopic": "Organización textual",
    "steps": [
      "El equipo detectó que las tasas de dos regiones usaban bases poblacionales distintas.",
      "Primero, documentó las definiciones y los denominadores empleados.",
      "Después, presentó tasas comparables o explicó por qué no podían equipararse."
    ],
    "explanation": "La comparación exige examinar definiciones y denominadores antes del resultado.",
    "hint": "Ordena un texto con estructura lógica y conclusiones respaldadas.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-organization-editor-v1-avanzado-23",
    "level": "avanzado",
    "subtopic": "Organización textual",
    "steps": [
      "Una investigación longitudinal observó cambios en la cantidad de denuncias.",
      "El método explicó cuándo cambió el sistema de registro institucional.",
      "La discusión distinguió variaciones de incidencia y variaciones de detección."
    ],
    "explanation": "Las variaciones de registro pueden influir en tendencias aparentes.",
    "hint": "Ordena un texto con estructura lógica y conclusiones respaldadas.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-organization-editor-v1-avanzado-24",
    "level": "avanzado",
    "subtopic": "Organización textual",
    "steps": [
      "Un ensayo sostuvo que una política pública beneficiaba a toda la población.",
      "El cuerpo del texto examinó grupos con resultados desiguales y condiciones diferentes.",
      "El cierre reformuló la tesis para reconocer beneficios no uniformes."
    ],
    "explanation": "Las evidencias heterogéneas obligan a matizar una afirmación universal.",
    "hint": "Ordena un texto con estructura lógica y conclusiones respaldadas.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-organization-editor-v1-avanzado-25",
    "level": "avanzado",
    "subtopic": "Organización textual",
    "steps": [
      "La investigación presentó una relación entre acceso a internet y rendimiento escolar.",
      "El análisis consideró también recursos familiares y condiciones de estudio.",
      "En la conclusión, evitó convertir una asociación en una causa exclusiva."
    ],
    "explanation": "Considerar variables de confusión protege de inferencias causales injustificadas.",
    "hint": "Ordena un texto con estructura lógica y conclusiones respaldadas.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-organization-editor-v1-avanzado-26",
    "level": "avanzado",
    "subtopic": "Organización textual",
    "steps": [
      "Una síntesis reunió textos de filosofía y sociología sobre la desigualdad.",
      "Primero, definió los conceptos centrales usados por cada disciplina.",
      "A continuación, distinguió coincidencias y tensiones sin borrar sus diferencias."
    ],
    "explanation": "Un análisis interdisciplinario necesita precisar definiciones antes de integrar enfoques.",
    "hint": "Ordena un texto con estructura lógica y conclusiones respaldadas.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-organization-editor-v1-avanzado-27",
    "level": "avanzado",
    "subtopic": "Organización textual",
    "steps": [
      "Un reporte escolar mostró que la nota promedio había aumentado.",
      "Después, describió la dispersión y los resultados de subgrupos previamente definidos.",
      "Finalmente, explicó por qué la mejora media no representaba a todos por igual."
    ],
    "explanation": "La media necesita interpretarse con la distribución y sus excepciones.",
    "hint": "Ordena un texto con estructura lógica y conclusiones respaldadas.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-organization-editor-v1-avanzado-28",
    "level": "avanzado",
    "subtopic": "Organización textual",
    "steps": [
      "Un historiador comparó relatos orales obtenidos décadas después de un suceso.",
      "Para evaluarlos, reconstruyó el contexto de las entrevistas y contrastó fechas.",
      "La síntesis mantuvo las discrepancias que no pudieron verificarse."
    ],
    "explanation": "La credibilidad de fuentes orales requiere contexto y contraste documental.",
    "hint": "Ordena un texto con estructura lógica y conclusiones respaldadas.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-organization-editor-v1-avanzado-29",
    "level": "avanzado",
    "subtopic": "Organización textual",
    "steps": [
      "Un análisis de costos estimó un ahorro tras modernizar instalaciones públicas.",
      "Luego, desagregó cambios de tarifas y de cantidad consumida.",
      "Finalmente, distinguió los factores observados de los efectos todavía no demostrados."
    ],
    "explanation": "Un cambio en el gasto puede mezclar variaciones de precio y consumo.",
    "hint": "Ordena un texto con estructura lógica y conclusiones respaldadas.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-organization-editor-v1-avanzado-30",
    "level": "avanzado",
    "subtopic": "Organización textual",
    "steps": [
      "Un texto científico propuso un modelo para predecir las lluvias futuras.",
      "Después, explicó los supuestos, los datos de entrenamiento y la incertidumbre.",
      "En la discusión, señaló escenarios en los que el modelo podría fallar."
    ],
    "explanation": "La presentación de predicciones exige documentar supuestos y límites.",
    "hint": "Ordena un texto con estructura lógica y conclusiones respaldadas.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-organization-editor-v1-avanzado-31",
    "level": "avanzado",
    "subtopic": "Organización textual",
    "steps": [
      "El informe sobre desplazamientos mencionó múltiples razones para dejar una región.",
      "La sección analítica separó factores económicos, climáticos y familiares.",
      "Finalmente, evitó atribuir todos los casos a una causa única."
    ],
    "explanation": "La explicación de fenómenos multicausales debe reconocer diversidad de factores.",
    "hint": "Ordena un texto con estructura lógica y conclusiones respaldadas.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-organization-editor-v1-avanzado-32",
    "level": "avanzado",
    "subtopic": "Organización textual",
    "steps": [
      "Una evaluación comunitaria examinó un programa de becas.",
      "El método describió quiénes cumplían requisitos y cómo fueron seleccionados.",
      "En el cierre, limitó los resultados a la población que realmente pudo participar."
    ],
    "explanation": "Los criterios de selección condicionan el alcance de los resultados.",
    "hint": "Ordena un texto con estructura lógica y conclusiones respaldadas.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-organization-editor-v1-avanzado-33",
    "level": "avanzado",
    "subtopic": "Organización textual",
    "steps": [
      "Dos reseñas interpretaron de forma opuesta un personaje de una novela.",
      "El análisis citó pasajes del relato y explicó el contexto de cada lectura.",
      "La conclusión distinguió interpretaciones sustentadas de afirmaciones sin evidencia."
    ],
    "explanation": "En crítica literaria se justifican interpretaciones mediante referencias textuales.",
    "hint": "Ordena un texto con estructura lógica y conclusiones respaldadas.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-organization-editor-v1-avanzado-34",
    "level": "avanzado",
    "subtopic": "Organización textual",
    "steps": [
      "El texto describió resultados obtenidos antes y después de instalar nuevos sensores.",
      "La sección metodológica precisó las diferencias de precisión entre instrumentos.",
      "La discusión evitó considerar todo aumento de registros como un aumento real del fenómeno."
    ],
    "explanation": "Un cambio de dispositivo puede afectar la comparabilidad de los registros.",
    "hint": "Ordena un texto con estructura lógica y conclusiones respaldadas.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-organization-editor-v1-avanzado-35",
    "level": "avanzado",
    "subtopic": "Organización textual",
    "steps": [
      "Una investigación evaluó la evolución de un indicador redefinido durante el período.",
      "Primero, identificó las fechas y el alcance de los cambios conceptuales.",
      "Por último, presentó segmentos comparables sin esconder las interrupciones de la serie."
    ],
    "explanation": "La reorganización temporal de indicadores requiere transparentar cambios de definición.",
    "hint": "Ordena un texto con estructura lógica y conclusiones respaldadas.",
    "reviewStatus": "editorial-draft"
  }
];
