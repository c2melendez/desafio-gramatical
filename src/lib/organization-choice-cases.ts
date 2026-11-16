import type {Level} from "./grammar";
export type OrganizationChoiceCase={id:string;level:Level;subtopic:"Organización textual";gap:string;connector:string;options:[string,string,string,string];explanation:string;reviewStatus:"editorial-draft"};
/** Preguntas de continuación de textos en contextos diferentes a los de Cazador y Editor.
 * Cada alternativa es una frase; los distractores incumplen continuidad, pertinencia o alcance.
 */
export const ORGANIZATION_CHOICE_CASES:OrganizationChoiceCase[]=[
  {
    "id": "writing-organization-quiz-v1-principiante-0",
    "level": "principiante",
    "subtopic": "Organización textual",
    "gap": "El curso organizó una visita al museo. ___",
    "connector": "Primero, la docente explicó el horario y el lugar de reunión.",
    "options": [
      "Primero, la docente explicó el horario y el lugar de reunión.",
      "Finalmente, volvió a empezar la excursión que aún no se había anunciado.",
      "Los estudiantes recordaron una receta de pan sin relación con la visita.",
      "Las conclusiones de la visita no requerían conocer su destino."
    ],
    "explanation": "La explicación inicial de horario precede a la salida y mantiene el tema del museo.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-organization-quiz-v1-principiante-1",
    "level": "principiante",
    "subtopic": "Organización textual",
    "gap": "El cartel invita a separar residuos reciclables. ___",
    "connector": "A continuación, indica dónde colocar papel, plástico y vidrio.",
    "options": [
      "Sin embargo, cuenta el resultado de un partido sin conexión.",
      "Al final, vuelve a invitar sin dar indicaciones.",
      "En cambio, suprime toda referencia a los residuos.",
      "A continuación, indica dónde colocar papel, plástico y vidrio."
    ],
    "explanation": "Un aviso instructivo introduce su propósito antes de explicar acciones concretas.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-organization-quiz-v1-principiante-2",
    "level": "principiante",
    "subtopic": "Organización textual",
    "gap": "La biblioteca anuncia una jornada de lectura. ___",
    "connector": "Después, informa la fecha, el lugar y la forma de inscribirse.",
    "options": [
      "Los árboles del patio tienen hojas verdes y abundantes.",
      "Por tanto, no es necesario indicar cómo participar.",
      "Después, informa la fecha, el lugar y la forma de inscribirse.",
      "La actividad terminó ayer aunque todavía no se ha convocado."
    ],
    "explanation": "Los datos de fecha y participación desarrollan el anuncio inicial.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-organization-quiz-v1-principiante-3",
    "level": "principiante",
    "subtopic": "Organización textual",
    "gap": "Ana decidió preparar un huerto escolar. ___",
    "connector": "Primero, reunió tierra, macetas y semillas para comenzar.",
    "options": [
      "Después, afirmó que las plantas crecieron sin haberlas sembrado.",
      "Primero, reunió tierra, macetas y semillas para comenzar.",
      "Al terminar, explicó que nunca había pensado en sembrar.",
      "En otro lugar, el autobús cambió su ruta habitual."
    ],
    "explanation": "El proceso debe presentar la preparación antes de sus resultados.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-organization-quiz-v1-principiante-4",
    "level": "principiante",
    "subtopic": "Organización textual",
    "gap": "El equipo redactó una carta de agradecimiento. ___",
    "connector": "Luego, revisó el saludo, el mensaje y la despedida.",
    "options": [
      "Luego, revisó el saludo, el mensaje y la despedida.",
      "Sin haberla leído, la envió y después empezó a redactarla.",
      "El patio necesita pintura y una cerca nueva.",
      "Por eso, cambió el tema de la carta a un evento desconocido."
    ],
    "explanation": "Una revisión posterior a la redacción mantiene el orden temporal.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-organization-quiz-v1-principiante-5",
    "level": "principiante",
    "subtopic": "Organización textual",
    "gap": "En la feria se exhibieron modelos del sistema solar. ___",
    "connector": "Los visitantes observaron cada modelo y preguntaron por los planetas.",
    "options": [
      "El texto pasa a describir una carrera deportiva sin transición.",
      "Antes de construirlos, todos los modelos ya habían sido desmontados.",
      "Los autores eliminaron la explicación de cada maqueta.",
      "Los visitantes observaron cada modelo y preguntaron por los planetas."
    ],
    "explanation": "El desarrollo debe ampliar la información sobre los modelos presentados.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-organization-quiz-v1-principiante-6",
    "level": "principiante",
    "subtopic": "Organización textual",
    "gap": "Un aviso explica cómo solicitar un libro prestado. ___",
    "connector": "Primero, el estudiante debe consultar el catálogo disponible.",
    "options": [
      "El informe inicia otra historia sobre el clima en el barrio.",
      "El estudiante devuelve un libro que aún no ha elegido.",
      "Primero, el estudiante debe consultar el catálogo disponible.",
      "La conclusión sostiene que nadie puede leer ningún libro."
    ],
    "explanation": "La primera instrucción lógica es localizar el material que se solicitará.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-organization-quiz-v1-intermedio-7",
    "level": "intermedio",
    "subtopic": "Organización textual",
    "gap": "El informe comparará la asistencia a dos talleres. ___",
    "connector": "Para ello, utilizará el porcentaje de inscritos que asistieron en cada caso.",
    "options": [
      "Por último, elimina la definición de participante para abreviar.",
      "Para ello, utilizará el porcentaje de inscritos que asistieron en cada caso.",
      "En consecuencia, uno fue mejor sin haber definido criterios.",
      "El autor menciona un festival no relacionado con la asistencia."
    ],
    "explanation": "Antes de comparar se necesita precisar una métrica común.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-organization-quiz-v1-intermedio-8",
    "level": "intermedio",
    "subtopic": "Organización textual",
    "gap": "La investigación describe un aumento de préstamos de libros. ___",
    "connector": "Sin embargo, todavía no permite atribuir ese cambio únicamente al nuevo horario.",
    "options": [
      "Sin embargo, todavía no permite atribuir ese cambio únicamente al nuevo horario.",
      "Por eso, el horario demuestra por sí mismo todas las causas posibles.",
      "En otra sección, el narrador recuerda su primera bicicleta.",
      "Se afirma que la biblioteca ya no presta libros."
    ],
    "explanation": "La salvedad distingue el resultado observado de una explicación causal no demostrada.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-organization-quiz-v1-intermedio-9",
    "level": "intermedio",
    "subtopic": "Organización textual",
    "gap": "El ensayo propone reducir el desperdicio de agua. ___",
    "connector": "Como evidencia, presenta pérdidas registradas en tuberías del barrio.",
    "options": [
      "Después, describe el uniforme de un equipo de fútbol.",
      "En conclusión, no es necesario explicar por qué ahorrar agua.",
      "Antes de exponer el problema, declara que todas las soluciones son iguales.",
      "Como evidencia, presenta pérdidas registradas en tuberías del barrio."
    ],
    "explanation": "Una evidencia pertinente debe referirse al desperdicio de agua que plantea la tesis.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-organization-quiz-v1-intermedio-10",
    "level": "intermedio",
    "subtopic": "Organización textual",
    "gap": "La reseña compara dos narraciones sobre una misma fecha histórica. ___",
    "connector": "En primer lugar, identifica a los autores y el momento de producción de cada fuente.",
    "options": [
      "Por eso, describe las rutinas de lectura de un estudiante.",
      "Ambas versiones deben descartarse solo por ser distintas.",
      "En primer lugar, identifica a los autores y el momento de producción de cada fuente.",
      "Finalmente, acepta una versión sin revisar el contexto de la otra."
    ],
    "explanation": "La comparación histórica comienza ubicando la procedencia de las fuentes.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-organization-quiz-v1-intermedio-11",
    "level": "intermedio",
    "subtopic": "Organización textual",
    "gap": "El texto presenta los beneficios del transporte público. ___",
    "connector": "A continuación, examina sus limitaciones de frecuencia y cobertura.",
    "options": [
      "El texto termina antes de examinar los argumentos anunciados.",
      "A continuación, examina sus limitaciones de frecuencia y cobertura.",
      "Como los beneficios son importantes, nunca habrá desventajas.",
      "Se inicia una explicación sobre la fotosíntesis sin relación alguna."
    ],
    "explanation": "Un desarrollo equilibrado considera también las limitaciones del tema discutido.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-organization-quiz-v1-intermedio-12",
    "level": "intermedio",
    "subtopic": "Organización textual",
    "gap": "Se registraron diferencias en el uso de energía entre hogares. ___",
    "connector": "Antes de explicarlas, el informe distingue tamaño y cantidad de habitantes de cada hogar.",
    "options": [
      "Antes de explicarlas, el informe distingue tamaño y cantidad de habitantes de cada hogar.",
      "Por consiguiente, todas las diferencias se deben a una sola causa.",
      "Los hogares desaparecen de la investigación y aparecen varias novelas.",
      "La conclusión se presenta sin mencionar datos ni variables."
    ],
    "explanation": "Las características de los hogares deben considerarse antes de atribuir causas.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-organization-quiz-v1-intermedio-13",
    "level": "intermedio",
    "subtopic": "Organización textual",
    "gap": "El artículo revisa los resultados de una encuesta voluntaria. ___",
    "connector": "Debe señalar, por tanto, las restricciones para generalizar a quienes no participaron.",
    "options": [
      "Así queda demostrada la opinión de todas las personas del país.",
      "De inmediato comienza una narración sobre un torneo de ajedrez.",
      "La muestra deja de importar porque las respuestas son numerosas.",
      "Debe señalar, por tanto, las restricciones para generalizar a quienes no participaron."
    ],
    "explanation": "El carácter voluntario limita la inferencia sobre el conjunto de la población.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-organization-quiz-v1-intermedio-14",
    "level": "intermedio",
    "subtopic": "Organización textual",
    "gap": "El instructivo explica la instalación de un programa educativo. ___",
    "connector": "Después de descargarlo, se debe comprobar que el archivo corresponda a la versión indicada.",
    "options": [
      "El texto cambia sin motivo a la historia del ferrocarril.",
      "Primero se desinstala una versión que no se menciona previamente.",
      "Después de descargarlo, se debe comprobar que el archivo corresponda a la versión indicada.",
      "En conclusión, se elimina el archivo antes de iniciar la instalación."
    ],
    "explanation": "Las instrucciones requieren pasos pertinentes y en una secuencia practicable.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-organization-quiz-v1-intermedio-15",
    "level": "intermedio",
    "subtopic": "Organización textual",
    "gap": "Una exposición contrasta mapas de distintas décadas. ___",
    "connector": "Primero, aclara las escalas y símbolos que utiliza cada mapa.",
    "options": [
      "El grupo omite todas las referencias geográficas del análisis.",
      "Primero, aclara las escalas y símbolos que utiliza cada mapa.",
      "Por tanto, las superficies pueden compararse sin conocer las escalas.",
      "La presentación se convierte en una lista de autores literarios."
    ],
    "explanation": "Las escalas y convenciones deben introducirse antes del contraste.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-organization-quiz-v1-intermedio-16",
    "level": "intermedio",
    "subtopic": "Organización textual",
    "gap": "La argumentación señala que los parques favorecen espacios de encuentro. ___",
    "connector": "Para respaldarlo, describe actividades comunitarias observadas en esos espacios.",
    "options": [
      "Para respaldarlo, describe actividades comunitarias observadas en esos espacios.",
      "Se concluye que los parques resuelven todo problema urbano sin límites.",
      "El texto cambia a explicar únicamente la velocidad de los vehículos.",
      "No se ofrecen pruebas porque la tesis se considera evidente."
    ],
    "explanation": "La observación de actividades sociales respalda de forma pertinente la tesis.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-organization-quiz-v1-intermedio-17",
    "level": "intermedio",
    "subtopic": "Organización textual",
    "gap": "El reporte compara la duración de dos rutas de autobús. ___",
    "connector": "Debe especificar si incluye o excluye las esperas antes de presentar el promedio.",
    "options": [
      "En consecuencia, la ruta más corta es siempre la más rápida.",
      "Después comienza una descripción de monumentos sin relación.",
      "Una cifra se considera válida sin explicar qué representa.",
      "Debe especificar si incluye o excluye las esperas antes de presentar el promedio."
    ],
    "explanation": "Definir el alcance de la duración medida permite interpretar las comparaciones.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-organization-quiz-v1-intermedio-18",
    "level": "intermedio",
    "subtopic": "Organización textual",
    "gap": "La propuesta escolar reconoce una dificultad de convivencia. ___",
    "connector": "Luego, describe situaciones concretas y su frecuencia antes de sugerir medidas.",
    "options": [
      "Se presenta una recomendación sin relación con el problema.",
      "Todos los conflictos son idénticos porque ocurren en una escuela.",
      "Luego, describe situaciones concretas y su frecuencia antes de sugerir medidas.",
      "Por eso, elimina los testimonios para hacer más breve el diagnóstico."
    ],
    "explanation": "Las acciones deben sustentarse en un diagnóstico concreto del problema.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-organization-quiz-v1-avanzado-19",
    "level": "avanzado",
    "subtopic": "Organización textual",
    "gap": "El informe compara resultados anteriores y posteriores a una reforma. ___",
    "connector": "Antes de interpretar cambios, examina diferencias iniciales entre los grupos observados.",
    "options": [
      "La comparación se considera causal por el mero paso del tiempo.",
      "Antes de interpretar cambios, examina diferencias iniciales entre los grupos observados.",
      "De esta manera se demuestra causalidad exclusivamente por la diferencia final.",
      "Se reemplazan los datos por impresiones sobre la decoración escolar."
    ],
    "explanation": "Las diferencias basales pueden distorsionar la atribución de efectos.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-organization-quiz-v1-avanzado-20",
    "level": "avanzado",
    "subtopic": "Organización textual",
    "gap": "Dos investigaciones usan definiciones distintas de «participación». ___",
    "connector": "En consecuencia, sus porcentajes no deben integrarse sin armonizar el indicador.",
    "options": [
      "En consecuencia, sus porcentajes no deben integrarse sin armonizar el indicador.",
      "La diferencia conceptual confirma que ambas tasas son idénticas.",
      "La discusión pasa a tratar especies vegetales no relacionadas.",
      "Es suficiente calcular un promedio simple de los valores publicados."
    ],
    "explanation": "Los indicadores solo pueden fusionarse tras verificar equivalencia conceptual.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-organization-quiz-v1-avanzado-21",
    "level": "avanzado",
    "subtopic": "Organización textual",
    "gap": "Una revisión integra estudios observacionales y ensayos controlados. ___",
    "connector": "Por rigor, distingue qué inferencias permite cada diseño antes de sintetizar resultados.",
    "options": [
      "Todos los estudios demuestran causas con exactamente la misma fuerza.",
      "El autor sustituye los métodos por una lista de lugares turísticos.",
      "Se ignora la metodología porque las cifras parecen similares.",
      "Por rigor, distingue qué inferencias permite cada diseño antes de sintetizar resultados."
    ],
    "explanation": "La síntesis metodológica requiere diferenciar tipos y fuerza de evidencia.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-organization-quiz-v1-avanzado-22",
    "level": "avanzado",
    "subtopic": "Organización textual",
    "gap": "El documento reconoce que varias fuentes discrepan sobre un acontecimiento. ___",
    "connector": "A continuación, contrasta autoría, época y registros independientes para precisar las diferencias.",
    "options": [
      "El texto describe un objeto cotidiano sin relación con las fuentes.",
      "Se acepta automáticamente la versión de la institución más antigua.",
      "A continuación, contrasta autoría, época y registros independientes para precisar las diferencias.",
      "Por eso declara falsa toda fuente posterior a la fecha del suceso."
    ],
    "explanation": "Un contraste de fuentes necesita criterios de procedencia y corroboración.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-organization-quiz-v1-avanzado-23",
    "level": "avanzado",
    "subtopic": "Organización textual",
    "gap": "El análisis encuentra una mejora en el promedio general. ___",
    "connector": "No obstante, revisa la distribución porque algunos subgrupos empeoraron.",
    "options": [
      "El resultado se considera universal sin revisar excepciones.",
      "No obstante, revisa la distribución porque algunos subgrupos empeoraron.",
      "Por tanto, cada participante mejoró en la misma proporción.",
      "El informe sustituye los datos por una opinión de un solo testigo."
    ],
    "explanation": "Una media global puede ocultar variaciones importantes.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-organization-quiz-v1-avanzado-24",
    "level": "avanzado",
    "subtopic": "Organización textual",
    "gap": "La propuesta anuncia una inversión pública de gran alcance. ___",
    "connector": "Antes de recomendarla, evalúa beneficios, costos y riesgos verificables.",
    "options": [
      "Antes de recomendarla, evalúa beneficios, costos y riesgos verificables.",
      "En conclusión, los costos no importan si el título es convincente.",
      "Se incorpora un argumento sobre música tradicional sin relación.",
      "La recomendación debe anteceder necesariamente a cualquier examen."
    ],
    "explanation": "La evaluación de una propuesta debe preceder a una recomendación responsable.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-organization-quiz-v1-avanzado-25",
    "level": "avanzado",
    "subtopic": "Organización textual",
    "gap": "El informe presenta un incremento de alertas de inundación. ___",
    "connector": "Para interpretarlo, distingue cambios reales del evento y mejoras en el sistema de detección.",
    "options": [
      "El aumento de avisos equivale siempre al mismo aumento de inundaciones.",
      "La sección central describe hábitos de lectura de adolescentes.",
      "Se elimina la información sobre el sistema de registro.",
      "Para interpretarlo, distingue cambios reales del evento y mejoras en el sistema de detección."
    ],
    "explanation": "La frecuencia de reportes depende tanto del fenómeno como de la medición.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-organization-quiz-v1-avanzado-26",
    "level": "avanzado",
    "subtopic": "Organización textual",
    "gap": "Una investigación describe una muestra con abandono de participantes. ___",
    "connector": "Después, evalúa cómo esa pérdida puede afectar la representatividad de los resultados.",
    "options": [
      "El documento introduce una comparación de recetas sin contexto.",
      "La falta de participantes no requiere mencionarse en la discusión.",
      "Después, evalúa cómo esa pérdida puede afectar la representatividad de los resultados.",
      "La deserción garantiza que quienes quedaron representan a todos."
    ],
    "explanation": "La deserción debe interpretarse como una posible fuente de sesgo.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-organization-quiz-v1-avanzado-27",
    "level": "avanzado",
    "subtopic": "Organización textual",
    "gap": "La síntesis compara tasas procedentes de regiones con distinta estructura de edad. ___",
    "connector": "Antes de interpretarlas, considera si corresponde ajustar por composición demográfica.",
    "options": [
      "Las diferencias se atribuyen siempre a la intervención estudiada.",
      "Antes de interpretarlas, considera si corresponde ajustar por composición demográfica.",
      "Se concluye que ambas poblaciones son idénticas por definición.",
      "El análisis presenta una biografía que no aborda las tasas."
    ],
    "explanation": "La composición poblacional puede influir en tasas y requiere examen.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-organization-quiz-v1-avanzado-28",
    "level": "avanzado",
    "subtopic": "Organización textual",
    "gap": "La argumentación cita una fuente secundaria sobre un documento histórico. ___",
    "connector": "Antes de presentarla como prueba directa, verifica qué afirmaba realmente el documento original.",
    "options": [
      "Antes de presentarla como prueba directa, verifica qué afirmaba realmente el documento original.",
      "La interpretación secundaria reemplaza de forma automática la fuente primaria.",
      "El texto describe un método de clasificación de plantas sin vínculo.",
      "La cita se declara exacta aunque nadie consultó el original."
    ],
    "explanation": "La fidelidad documental exige comprobar el contenido de la fuente citada.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-organization-quiz-v1-avanzado-29",
    "level": "avanzado",
    "subtopic": "Organización textual",
    "gap": "El estudio incorpora respuestas de estudiantes elegidos voluntariamente. ___",
    "connector": "En la discusión, limita sus conclusiones a la población realmente observada.",
    "options": [
      "La voluntariedad demuestra representatividad de todos los estudiantes.",
      "Se inserta una anécdota personal sobre otra institución.",
      "Se omiten los criterios de selección para acortar el documento.",
      "En la discusión, limita sus conclusiones a la población realmente observada."
    ],
    "explanation": "La selección voluntaria restringe las generalizaciones a poblaciones mayores.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-organization-quiz-v1-avanzado-30",
    "level": "avanzado",
    "subtopic": "Organización textual",
    "gap": "El ensayo sostiene una hipótesis apoyada en varios testimonios. ___",
    "connector": "Sin embargo, reconoce que esos relatos no prueban por sí solos una causa exclusiva.",
    "options": [
      "La exposición cambia a describir instrumentos musicales.",
      "Los relatos no necesitan situarse en el contexto en que surgieron.",
      "Sin embargo, reconoce que esos relatos no prueban por sí solos una causa exclusiva.",
      "Por tanto, los testimonios garantizan ausencia de otras explicaciones."
    ],
    "explanation": "Los testimonios aportan perspectivas pero no necesariamente una demostración causal.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-organization-quiz-v1-avanzado-31",
    "level": "avanzado",
    "subtopic": "Organización textual",
    "gap": "Un reporte mezcla mediciones expresadas en unidades incompatibles. ___",
    "connector": "En primer lugar, convierte las magnitudes a unidades comparables y documenta el procedimiento.",
    "options": [
      "Las unidades se ignoran porque los números tienen igual cantidad de dígitos.",
      "En primer lugar, convierte las magnitudes a unidades comparables y documenta el procedimiento.",
      "Después declara equivalentes las cifras sin transformación.",
      "Se abandona el tema para reseñar un cuento escolar."
    ],
    "explanation": "Las comparaciones cuantitativas requieren unidades compatibles.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-organization-quiz-v1-avanzado-32",
    "level": "avanzado",
    "subtopic": "Organización textual",
    "gap": "El escrito reconoce incertidumbre en sus proyecciones climáticas. ___",
    "connector": "Por ello, explicita los supuestos y distingue los escenarios posibles.",
    "options": [
      "Por ello, explicita los supuestos y distingue los escenarios posibles.",
      "Esto prueba que existe un único futuro inevitable y exacto.",
      "La discusión se desvía hacia un catálogo de animales domésticos.",
      "Se borran todos los intervalos para aparentar certeza."
    ],
    "explanation": "Las proyecciones deben comunicar supuestos y límites de precisión.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-organization-quiz-v1-avanzado-33",
    "level": "avanzado",
    "subtopic": "Organización textual",
    "gap": "Un artículo atribuye el resultado a un programa iniciado durante otros cambios simultáneos. ___",
    "connector": "La discusión examina esas intervenciones paralelas antes de sostener una explicación causal.",
    "options": [
      "La coincidencia temporal demuestra el efecto exclusivo del programa.",
      "Se introduce un inventario de útiles escolares sin relación.",
      "Se elimina toda referencia al período de observación.",
      "La discusión examina esas intervenciones paralelas antes de sostener una explicación causal."
    ],
    "explanation": "Las modificaciones simultáneas pueden explicar resultados y deben considerarse.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-organization-quiz-v1-avanzado-34",
    "level": "avanzado",
    "subtopic": "Organización textual",
    "gap": "El análisis descubre que varios indicadores fueron redefinidos entre períodos. ___",
    "connector": "En consecuencia, segmenta las series que no son comparables y lo explica al lector.",
    "options": [
      "El documento comienza a narrar una competición atlética.",
      "Las definiciones se omiten porque complican el texto.",
      "En consecuencia, segmenta las series que no son comparables y lo explica al lector.",
      "La redefinición garantiza continuidad numérica perfecta."
    ],
    "explanation": "La claridad exige separar series cuando sus indicadores cambian.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "writing-organization-quiz-v1-avanzado-35",
    "level": "avanzado",
    "subtopic": "Organización textual",
    "gap": "La conclusión propone una política basada en un solo caso excepcional. ___",
    "connector": "Para evaluar su alcance, examina primero si el caso representa situaciones habituales.",
    "options": [
      "Se elimina el análisis de variaciones entre contextos.",
      "Para evaluar su alcance, examina primero si el caso representa situaciones habituales.",
      "Un caso atípico es automáticamente universal cuando resulta llamativo.",
      "Se incorpora una sección sobre el calendario de la biblioteca."
    ],
    "explanation": "La validez de una propuesta general requiere valorar representatividad y alternativas.",
    "reviewStatus": "editorial-draft"
  }
];
