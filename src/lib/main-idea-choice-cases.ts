import type {Level} from "./grammar";
export type MainIdeaChoiceCase={id:string;level:Level;subtopic:"Idea principal";title:string;passage:string;question:string;options:[string,string,string,string];answer:number;explanation:string;reviewStatus:"editorial-draft"};
/** 36 lecturas originales exclusivas del juego Verdad o inferencia, subtema Idea principal.
 * Los otros dos juegos conservan su banco; sus rondas NO se inflan con estos textos.
 * Distractores y dificultades pendientes de revisión pedagógica humana.
 */
export const MAIN_IDEA_CHOICE_CASES:MainIdeaChoiceCase[]=[
  {
    "id": "reading-main-quiz-v1-principiante-0",
    "level": "principiante",
    "subtopic": "Idea principal",
    "title": "Horario de biblioteca",
    "passage": "La biblioteca escolar anunció que abrirá tres tardes adicionales. La encargada explicó que el cambio responde a solicitudes estudiantiles, pero no prometió nuevos libros ni personal. Durante un mes se registrará cuántas visitas reciben los horarios nuevos.",
    "question": "¿Qué opción sintetiza mejor la idea central del texto?",
    "options": [
      "Una ampliación de horarios que será evaluada mediante el registro de visitas.",
      "La biblioteca abrirá tres tardes adicionales.",
      "El pasaje demuestra resultados idénticos para toda la población sin excepciones.",
      "El autor confirma una explicación causal exclusiva sin examinar otras condiciones."
    ],
    "answer": 0,
    "explanation": "La respuesta correcta integra el propósito y las limitaciones que desarrolla el texto, sin convertir un detalle en la idea central ni añadir conclusiones no demostradas.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "reading-main-quiz-v1-principiante-1",
    "level": "principiante",
    "subtopic": "Idea principal",
    "title": "El huerto de la clase",
    "passage": "Estudiantes cultivaron frijoles en seis macetas y anotaron su crecimiento. Dos recipientes quedaron cerca de la ventana y otros recibieron menos luz. La maestra pidió comparar las condiciones antes de afirmar que una sola de ellas explica las diferencias.",
    "question": "¿Qué opción sintetiza mejor la idea central del texto?",
    "options": [
      "Dos macetas estaban cerca de la ventana.",
      "El pasaje demuestra resultados idénticos para toda la población sin excepciones.",
      "El autor confirma una explicación causal exclusiva sin examinar otras condiciones.",
      "Un huerto escolar utilizado para observar plantas y comparar sus condiciones de cultivo."
    ],
    "answer": 3,
    "explanation": "La respuesta correcta integra el propósito y las limitaciones que desarrolla el texto, sin convertir un detalle en la idea central ni añadir conclusiones no demostradas.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "reading-main-quiz-v1-principiante-2",
    "level": "principiante",
    "subtopic": "Idea principal",
    "title": "Jornada del parque",
    "passage": "Vecinos recogieron residuos en un parque y colocaron recipientes para separar materiales. Varias familias propusieron repetir la actividad cada mes, pero la organización aún no fijó un calendario. Un informe destacó la colaboración sin asegurar que el problema estuviera solucionado para siempre.",
    "question": "¿Qué opción sintetiza mejor la idea central del texto?",
    "options": [
      "El pasaje demuestra resultados idénticos para toda la población sin excepciones.",
      "El autor confirma una explicación causal exclusiva sin examinar otras condiciones.",
      "Una jornada de limpieza comunitaria y la posibilidad de darle continuidad.",
      "Se colocaron recipientes de separación."
    ],
    "answer": 2,
    "explanation": "La respuesta correcta integra el propósito y las limitaciones que desarrolla el texto, sin convertir un detalle en la idea central ni añadir conclusiones no demostradas.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "reading-main-quiz-v1-principiante-3",
    "level": "principiante",
    "subtopic": "Idea principal",
    "title": "La colección de cuentos",
    "passage": "Una escuela organizó un intercambio de libros usados entre dos cursos. Los docentes verificaron el estado de los ejemplares y registraron los títulos recibidos. Al terminar, algunos estudiantes recomendaron ampliar el intercambio, aunque todavía no se anunció otra edición.",
    "question": "¿Qué opción sintetiza mejor la idea central del texto?",
    "options": [
      "El autor confirma una explicación causal exclusiva sin examinar otras condiciones.",
      "Un intercambio escolar de libros que promovió compartir lecturas entre cursos.",
      "Los docentes revisaron los ejemplares.",
      "El pasaje demuestra resultados idénticos para toda la población sin excepciones."
    ],
    "answer": 1,
    "explanation": "La respuesta correcta integra el propósito y las limitaciones que desarrolla el texto, sin convertir un detalle en la idea central ni añadir conclusiones no demostradas.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "reading-main-quiz-v1-principiante-4",
    "level": "principiante",
    "subtopic": "Idea principal",
    "title": "Aviso sobre agua",
    "passage": "La comisión escolar instaló fuentes de agua potable cerca de las canchas para reducir los desplazamientos durante el recreo. Se pidió a los estudiantes que informaran sobre fugas y desperfectos. La dirección aclaró que las nuevas fuentes necesitarán limpieza y mantenimiento periódico.",
    "question": "¿Qué opción sintetiza mejor la idea central del texto?",
    "options": [
      "La mejora del acceso al agua en el recreo acompañada de cuidados de mantenimiento.",
      "Las fuentes quedaron cerca de las canchas.",
      "El pasaje demuestra resultados idénticos para toda la población sin excepciones.",
      "El autor confirma una explicación causal exclusiva sin examinar otras condiciones."
    ],
    "answer": 0,
    "explanation": "La respuesta correcta integra el propósito y las limitaciones que desarrolla el texto, sin convertir un detalle en la idea central ni añadir conclusiones no demostradas.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "reading-main-quiz-v1-principiante-5",
    "level": "principiante",
    "subtopic": "Idea principal",
    "title": "Recuerdos en el museo",
    "passage": "Un museo invitó a vecinos de distintas edades a compartir historias sobre juegos tradicionales. Algunas personas entregaron fotografías y otras escribieron recuerdos personales. La curadora explicó que esos testimonios enriquecen la memoria local sin representar necesariamente la experiencia de todas las familias.",
    "question": "¿Qué opción sintetiza mejor la idea central del texto?",
    "options": [
      "El museo recibió fotografías y relatos.",
      "El pasaje demuestra resultados idénticos para toda la población sin excepciones.",
      "El autor confirma una explicación causal exclusiva sin examinar otras condiciones.",
      "La recopilación de recuerdos diversos para conservar la memoria de juegos tradicionales."
    ],
    "answer": 3,
    "explanation": "La respuesta correcta integra el propósito y las limitaciones que desarrolla el texto, sin convertir un detalle en la idea central ni añadir conclusiones no demostradas.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "reading-main-quiz-v1-principiante-6",
    "level": "principiante",
    "subtopic": "Idea principal",
    "title": "Ruta hacia la escuela",
    "passage": "Un comité de familias recorrió la calle que lleva a la escuela después de varias lluvias. Fotografió baches y zonas inundadas, y entregó las observaciones a las autoridades. La municipalidad anunció una inspección, aunque aún no se había definido una fecha para reparar la vía.",
    "question": "¿Qué opción sintetiza mejor la idea central del texto?",
    "options": [
      "El pasaje demuestra resultados idénticos para toda la población sin excepciones.",
      "El autor confirma una explicación causal exclusiva sin examinar otras condiciones.",
      "La documentación de problemas de acceso escolar para solicitar una solución.",
      "Las familias tomaron fotografías de la calle."
    ],
    "answer": 2,
    "explanation": "La respuesta correcta integra el propósito y las limitaciones que desarrolla el texto, sin convertir un detalle en la idea central ni añadir conclusiones no demostradas.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "reading-main-quiz-v1-intermedio-7",
    "level": "intermedio",
    "subtopic": "Idea principal",
    "title": "Nuevo conteo de visitantes",
    "passage": "Un centro cultural reportó un aumento de visitas mientras estrenaba un sistema de registro. Antes no contaba a quienes llegaban en excursiones escolares y ahora sí. El equipo técnico pidió comparar datos bajo una misma definición antes de atribuir la diferencia a un mayor interés del público.",
    "question": "¿Qué opción sintetiza mejor la idea central del texto?",
    "options": [
      "El autor confirma una explicación causal exclusiva sin examinar otras condiciones.",
      "La necesidad de interpretar el aumento de visitantes considerando cambios en la medición.",
      "El nuevo sistema incluye excursiones escolares.",
      "El pasaje demuestra resultados idénticos para toda la población sin excepciones."
    ],
    "answer": 1,
    "explanation": "La respuesta correcta integra el propósito y las limitaciones que desarrolla el texto, sin convertir un detalle en la idea central ni añadir conclusiones no demostradas.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "reading-main-quiz-v1-intermedio-8",
    "level": "intermedio",
    "subtopic": "Idea principal",
    "title": "Mapas de épocas diferentes",
    "passage": "Un grupo comparó dos mapas urbanos separados por veinte años y encontró expansión residencial. Sin embargo, los documentos usaban escalas distintas y algunas zonas carecían de registros. Los investigadores eligieron puntos de referencia comunes y evitaron calcular superficies donde los datos eran insuficientes.",
    "question": "¿Qué opción sintetiza mejor la idea central del texto?",
    "options": [
      "Una comparación histórica de mapas que reconoce límites de escala y cobertura.",
      "Los mapas utilizaban escalas distintas.",
      "El pasaje demuestra resultados idénticos para toda la población sin excepciones.",
      "El autor confirma una explicación causal exclusiva sin examinar otras condiciones."
    ],
    "answer": 0,
    "explanation": "La respuesta correcta integra el propósito y las limitaciones que desarrolla el texto, sin convertir un detalle en la idea central ni añadir conclusiones no demostradas.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "reading-main-quiz-v1-intermedio-9",
    "level": "intermedio",
    "subtopic": "Idea principal",
    "title": "Periodismo estudiantil",
    "passage": "En un taller de radio los estudiantes prepararon noticias y entrevistas para su colegio. Detectaron que dos fuentes daban fechas diferentes sobre un evento, consultaron documentos y corrigieron el guion. El programa final explicó el origen de los datos y distinguió hechos verificables de opiniones.",
    "question": "¿Qué opción sintetiza mejor la idea central del texto?",
    "options": [
      "Los jóvenes corrigieron un guion.",
      "El pasaje demuestra resultados idénticos para toda la población sin excepciones.",
      "El autor confirma una explicación causal exclusiva sin examinar otras condiciones.",
      "El aprendizaje de una comunicación responsable mediante verificación de fuentes."
    ],
    "answer": 3,
    "explanation": "La respuesta correcta integra el propósito y las limitaciones que desarrolla el texto, sin convertir un detalle en la idea central ni añadir conclusiones no demostradas.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "reading-main-quiz-v1-intermedio-10",
    "level": "intermedio",
    "subtopic": "Idea principal",
    "title": "Bicicletas compartidas",
    "passage": "Un municipio colocó estaciones de bicicletas en varios barrios. El centro registró más viajes, pero allí había más bicicletas disponibles y una población mayor. El equipo recomendó comparar préstamos por estación antes de decidir qué sector necesitaba nuevas unidades.",
    "question": "¿Qué opción sintetiza mejor la idea central del texto?",
    "options": [
      "El pasaje demuestra resultados idénticos para toda la población sin excepciones.",
      "El autor confirma una explicación causal exclusiva sin examinar otras condiciones.",
      "La interpretación de los préstamos de bicicletas mediante indicadores comparables.",
      "El barrio central registró más viajes."
    ],
    "answer": 2,
    "explanation": "La respuesta correcta integra el propósito y las limitaciones que desarrolla el texto, sin convertir un detalle en la idea central ni añadir conclusiones no demostradas.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "reading-main-quiz-v1-intermedio-11",
    "level": "intermedio",
    "subtopic": "Idea principal",
    "title": "Fotos y anuncios antiguos",
    "passage": "Una exposición reunió fotografías familiares y anuncios de periódicos para mostrar costumbres de otro tiempo. Los materiales reflejaban experiencias y objetivos diferentes. La curadora propuso explicar la procedencia de cada fuente y evitar que una sola imagen representara a toda una generación.",
    "question": "¿Qué opción sintetiza mejor la idea central del texto?",
    "options": [
      "El autor confirma una explicación causal exclusiva sin examinar otras condiciones.",
      "La integración crítica de fuentes distintas para comprender costumbres históricas.",
      "Se utilizaron fotografías y anuncios.",
      "El pasaje demuestra resultados idénticos para toda la población sin excepciones."
    ],
    "answer": 1,
    "explanation": "La respuesta correcta integra el propósito y las limitaciones que desarrolla el texto, sin convertir un detalle en la idea central ni añadir conclusiones no demostradas.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "reading-main-quiz-v1-intermedio-12",
    "level": "intermedio",
    "subtopic": "Idea principal",
    "title": "Consumo eléctrico escolar",
    "passage": "La escuela cambió sus lámparas y ofreció charlas sobre ahorro de energía. Durante los meses siguientes el consumo bajó, pero también hubo vacaciones y menos días lectivos. La dirección solicitó comparar días equivalentes antes de atribuir toda la reducción a las lámparas.",
    "question": "¿Qué opción sintetiza mejor la idea central del texto?",
    "options": [
      "La evaluación cautelosa de una reducción energética ocurrida durante varios cambios.",
      "Se realizaron charlas de ahorro eléctrico.",
      "El pasaje demuestra resultados idénticos para toda la población sin excepciones.",
      "El autor confirma una explicación causal exclusiva sin examinar otras condiciones."
    ],
    "answer": 0,
    "explanation": "La respuesta correcta integra el propósito y las limitaciones que desarrolla el texto, sin convertir un detalle en la idea central ni añadir conclusiones no demostradas.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "reading-main-quiz-v1-intermedio-13",
    "level": "intermedio",
    "subtopic": "Idea principal",
    "title": "Dos rutas de autobús",
    "passage": "Un grupo comparó los tiempos de viaje hacia el hospital por dos rutas. Una tenía recorridos más cortos, pero esperas mucho más largas. Los vecinos pidieron incluir tanto el tiempo de traslado como el de espera y las conexiones antes de recomendar una ruta para todas las personas.",
    "question": "¿Qué opción sintetiza mejor la idea central del texto?",
    "options": [
      "Una ruta tenía esperas más largas.",
      "El pasaje demuestra resultados idénticos para toda la población sin excepciones.",
      "El autor confirma una explicación causal exclusiva sin examinar otras condiciones.",
      "La necesidad de comparar rutas por el tiempo total y no solo por el trayecto."
    ],
    "answer": 3,
    "explanation": "La respuesta correcta integra el propósito y las limitaciones que desarrolla el texto, sin convertir un detalle en la idea central ni añadir conclusiones no demostradas.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "reading-main-quiz-v1-intermedio-14",
    "level": "intermedio",
    "subtopic": "Idea principal",
    "title": "Luz y crecimiento",
    "passage": "Un club científico observó plantas de distinto tamaño y sospechó que la luz era decisiva. Antes de llegar a una conclusión notó que también variaba el riego. El grupo planteó repetir el ensayo controlando el agua y midiendo la exposición luminosa de cada maceta.",
    "question": "¿Qué opción sintetiza mejor la idea central del texto?",
    "options": [
      "El pasaje demuestra resultados idénticos para toda la población sin excepciones.",
      "El autor confirma una explicación causal exclusiva sin examinar otras condiciones.",
      "La importancia de controlar variables antes de atribuir diferencias de crecimiento.",
      "El riego no había sido uniforme."
    ],
    "answer": 2,
    "explanation": "La respuesta correcta integra el propósito y las limitaciones que desarrolla el texto, sin convertir un detalle en la idea central ni añadir conclusiones no demostradas.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "reading-main-quiz-v1-intermedio-15",
    "level": "intermedio",
    "subtopic": "Idea principal",
    "title": "Encuesta de la biblioteca",
    "passage": "La biblioteca consultó preferencias lectoras a personas que seguían sus redes sociales. La mayoría de respondientes eligió novelas, pero quienes no usan internet no estaban representados. El informe propuso entrevistas presenciales para conocer opiniones de públicos distintos.",
    "question": "¿Qué opción sintetiza mejor la idea central del texto?",
    "options": [
      "El autor confirma una explicación causal exclusiva sin examinar otras condiciones.",
      "Una encuesta con resultados útiles pero limitados por la selección de participantes.",
      "Las novelas fueron populares entre quienes respondieron.",
      "El pasaje demuestra resultados idénticos para toda la población sin excepciones."
    ],
    "answer": 1,
    "explanation": "La respuesta correcta integra el propósito y las limitaciones que desarrolla el texto, sin convertir un detalle en la idea central ni añadir conclusiones no demostradas.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "reading-main-quiz-v1-intermedio-16",
    "level": "intermedio",
    "subtopic": "Idea principal",
    "title": "Turbidez de un río",
    "passage": "Voluntarios midieron la turbidez del río durante varias semanas y hallaron valores más altos tras las lluvias. No habían investigado todas las fuentes de sedimentos, así que remitieron los registros a un laboratorio. El comunicado evitó culpar sin pruebas a una actividad económica concreta.",
    "question": "¿Qué opción sintetiza mejor la idea central del texto?",
    "options": [
      "Una observación ambiental acompañada de cautela al determinar sus causas.",
      "La turbidez creció después de días lluviosos.",
      "El pasaje demuestra resultados idénticos para toda la población sin excepciones.",
      "El autor confirma una explicación causal exclusiva sin examinar otras condiciones."
    ],
    "answer": 0,
    "explanation": "La respuesta correcta integra el propósito y las limitaciones que desarrolla el texto, sin convertir un detalle en la idea central ni añadir conclusiones no demostradas.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "reading-main-quiz-v1-intermedio-17",
    "level": "intermedio",
    "subtopic": "Idea principal",
    "title": "Noticia de un torneo",
    "passage": "El periódico del instituto preparó una noticia sobre una competencia deportiva. Los redactores encontraron nombres duplicados y un marcador contradictorio, por lo que consultaron las actas antes de imprimir. La edición final incluyó una nota sobre las correcciones realizadas.",
    "question": "¿Qué opción sintetiza mejor la idea central del texto?",
    "options": [
      "La redacción consultó actas del torneo.",
      "El pasaje demuestra resultados idénticos para toda la población sin excepciones.",
      "El autor confirma una explicación causal exclusiva sin examinar otras condiciones.",
      "La verificación y corrección de datos como parte de una noticia responsable."
    ],
    "answer": 3,
    "explanation": "La respuesta correcta integra el propósito y las limitaciones que desarrolla el texto, sin convertir un detalle en la idea central ni añadir conclusiones no demostradas.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "reading-main-quiz-v1-intermedio-18",
    "level": "intermedio",
    "subtopic": "Idea principal",
    "title": "Festival de relatos",
    "passage": "Una casa cultural invitó a personas mayores y jóvenes a narrar historias del barrio. Algunos relatos coincidían en personajes, pero diferían en fechas. Los organizadores publicaron versiones con su contexto y señalaron qué detalles aún debían comprobarse con documentos.",
    "question": "¿Qué opción sintetiza mejor la idea central del texto?",
    "options": [
      "El pasaje demuestra resultados idénticos para toda la población sin excepciones.",
      "El autor confirma una explicación causal exclusiva sin examinar otras condiciones.",
      "La preservación de memorias comunitarias sin ocultar discrepancias entre relatos.",
      "Algunas narraciones discreparon sobre fechas."
    ],
    "answer": 2,
    "explanation": "La respuesta correcta integra el propósito y las limitaciones que desarrolla el texto, sin convertir un detalle en la idea central ni añadir conclusiones no demostradas.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "reading-main-quiz-v1-avanzado-19",
    "level": "avanzado",
    "subtopic": "Idea principal",
    "title": "Dos definiciones de abandono",
    "passage": "Dos programas escolares publicaron tasas de abandono diferentes. Uno contaba ausencias superiores a un mes y otro solo casos sin retorno al año siguiente. Una investigadora explicó que esas definiciones no medían exactamente el mismo fenómeno y propuso armonizar el indicador antes de comparar programas.",
    "question": "¿Qué opción sintetiza mejor la idea central del texto?",
    "options": [
      "El autor confirma una explicación causal exclusiva sin examinar otras condiciones.",
      "La necesidad de definir de forma equivalente un indicador antes de comparar tasas.",
      "Los programas contaban el abandono de manera distinta.",
      "El pasaje demuestra resultados idénticos para toda la población sin excepciones."
    ],
    "answer": 1,
    "explanation": "La respuesta correcta integra el propósito y las limitaciones que desarrolla el texto, sin convertir un detalle en la idea central ni añadir conclusiones no demostradas.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "reading-main-quiz-v1-avanzado-20",
    "level": "avanzado",
    "subtopic": "Idea principal",
    "title": "Seguimiento incompleto",
    "passage": "Un programa de tutorías comenzó con ciento veinte alumnos, pero cuarenta no completaron la medición final. Entre quienes continuaron aparecieron mejoras. Los investigadores advirtieron que las personas ausentes podían diferir de las restantes y solicitaron estudiar el sesgo de abandono.",
    "question": "¿Qué opción sintetiza mejor la idea central del texto?",
    "options": [
      "La dificultad de interpretar resultados de tutorías cuando se pierde parte de la muestra.",
      "Cuarenta alumnos no completaron el seguimiento.",
      "El pasaje demuestra resultados idénticos para toda la población sin excepciones.",
      "El autor confirma una explicación causal exclusiva sin examinar otras condiciones."
    ],
    "answer": 0,
    "explanation": "La respuesta correcta integra el propósito y las limitaciones que desarrolla el texto, sin convertir un detalle en la idea central ni añadir conclusiones no demostradas.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "reading-main-quiz-v1-avanzado-21",
    "level": "avanzado",
    "subtopic": "Idea principal",
    "title": "Escalas de bienestar",
    "passage": "Una revisión reunió estudios que llamaban bienestar a fenómenos medidos con instrumentos distintos. Unos usaban una escala breve y otros evaluaban varias dimensiones. Antes de producir una puntuación global, el equipo examinó si los cuestionarios medían constructos comparables.",
    "question": "¿Qué opción sintetiza mejor la idea central del texto?",
    "options": [
      "Los cuestionarios tenían diseños distintos.",
      "El pasaje demuestra resultados idénticos para toda la población sin excepciones.",
      "El autor confirma una explicación causal exclusiva sin examinar otras condiciones.",
      "La importancia de verificar equivalencia conceptual antes de combinar medidas de bienestar."
    ],
    "answer": 3,
    "explanation": "La respuesta correcta integra el propósito y las limitaciones que desarrolla el texto, sin convertir un detalle en la idea central ni añadir conclusiones no demostradas.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "reading-main-quiz-v1-avanzado-22",
    "level": "avanzado",
    "subtopic": "Idea principal",
    "title": "Becas y horarios",
    "passage": "Una ciudad amplió becas de transporte mientras varias escuelas cambiaban sus horarios. La asistencia aumentó después y un boletín atribuyó toda la mejora a las becas. El equipo evaluador advirtió que ambas medidas podían intervenir y solicitó comparar contextos similares antes de inferir causalidad.",
    "question": "¿Qué opción sintetiza mejor la idea central del texto?",
    "options": [
      "El pasaje demuestra resultados idénticos para toda la población sin excepciones.",
      "El autor confirma una explicación causal exclusiva sin examinar otras condiciones.",
      "La cautela necesaria para atribuir resultados cuando existen cambios simultáneos.",
      "Se ampliaron becas y cambiaron horarios."
    ],
    "answer": 2,
    "explanation": "La respuesta correcta integra el propósito y las limitaciones que desarrolla el texto, sin convertir un detalle en la idea central ni añadir conclusiones no demostradas.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "reading-main-quiz-v1-avanzado-23",
    "level": "avanzado",
    "subtopic": "Idea principal",
    "title": "Tasas regionales",
    "passage": "Dos regiones exhibieron tasas de atención médica que parecían muy diferentes. Los analistas descubrieron variaciones en la estructura de edades y en las definiciones de consulta. El informe propuso examinar ambos factores antes de ordenar las regiones por desempeño o combinar promedios.",
    "question": "¿Qué opción sintetiza mejor la idea central del texto?",
    "options": [
      "El autor confirma una explicación causal exclusiva sin examinar otras condiciones.",
      "La comparación de tasas sanitarias condicionada por diferencias demográficas y metodológicas.",
      "Las regiones tenían distintas estructuras de edad.",
      "El pasaje demuestra resultados idénticos para toda la población sin excepciones."
    ],
    "answer": 1,
    "explanation": "La respuesta correcta integra el propósito y las limitaciones que desarrolla el texto, sin convertir un detalle en la idea central ni añadir conclusiones no demostradas.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "reading-main-quiz-v1-avanzado-24",
    "level": "avanzado",
    "subtopic": "Idea principal",
    "title": "Memorias del conflicto",
    "passage": "Un archivo recibió entrevistas realizadas décadas después de un conflicto local. Varias personas recordaban fechas diferentes y algunas narraciones carecían de documentos de respaldo. Los historiadores registraron su procedencia y buscaron corroboración sin descartar automáticamente la memoria oral.",
    "question": "¿Qué opción sintetiza mejor la idea central del texto?",
    "options": [
      "La evaluación contextual de testimonios tardíos mediante comparación documental.",
      "Hubo discrepancias en las fechas recordadas.",
      "El pasaje demuestra resultados idénticos para toda la población sin excepciones.",
      "El autor confirma una explicación causal exclusiva sin examinar otras condiciones."
    ],
    "answer": 0,
    "explanation": "La respuesta correcta integra el propósito y las limitaciones que desarrolla el texto, sin convertir un detalle en la idea central ni añadir conclusiones no demostradas.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "reading-main-quiz-v1-avanzado-25",
    "level": "avanzado",
    "subtopic": "Idea principal",
    "title": "Promedios y grupos",
    "passage": "Una evaluación de lectura halló una mejora media positiva, pero ciertas escuelas no mostraron avances. En lugar de comunicar un éxito uniforme, los autores publicaron resultados por grupos y señalaron limitaciones metodológicas. Planean estudiar qué condiciones podrían explicar las diferencias observadas.",
    "question": "¿Qué opción sintetiza mejor la idea central del texto?",
    "options": [
      "Algunas escuelas no registraron progreso.",
      "El pasaje demuestra resultados idénticos para toda la población sin excepciones.",
      "El autor confirma una explicación causal exclusiva sin examinar otras condiciones.",
      "La interpretación de una mejora media junto con la heterogeneidad entre grupos."
    ],
    "answer": 3,
    "explanation": "La respuesta correcta integra el propósito y las limitaciones que desarrolla el texto, sin convertir un detalle en la idea central ni añadir conclusiones no demostradas.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "reading-main-quiz-v1-avanzado-26",
    "level": "avanzado",
    "subtopic": "Idea principal",
    "title": "Sensores más sensibles",
    "passage": "Una ciudad instaló sensores nuevos y después registró más episodios de contaminación. El equipo reconoció que una parte del aumento podría deberse a mayor capacidad de detección y propuso comparar instrumentos. Una columna había atribuido cada episodio a nuevas fábricas sin pruebas adicionales.",
    "question": "¿Qué opción sintetiza mejor la idea central del texto?",
    "options": [
      "El pasaje demuestra resultados idénticos para toda la población sin excepciones.",
      "El autor confirma una explicación causal exclusiva sin examinar otras condiciones.",
      "La necesidad de separar cambios reales de cambios en la capacidad de detección.",
      "Los sensores nuevos eran más sensibles."
    ],
    "answer": 2,
    "explanation": "La respuesta correcta integra el propósito y las limitaciones que desarrolla el texto, sin convertir un detalle en la idea central ni añadir conclusiones no demostradas.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "reading-main-quiz-v1-avanzado-27",
    "level": "avanzado",
    "subtopic": "Idea principal",
    "title": "Gastos y consumo",
    "passage": "Un informe mostró que bajó el gasto eléctrico de edificios públicos después de una remodelación. También disminuyeron las tarifas y algunos edificios cerraron varias semanas. Para medir eficiencia real, el equipo decidió comparar unidades de energía consumida por día de funcionamiento.",
    "question": "¿Qué opción sintetiza mejor la idea central del texto?",
    "options": [
      "El autor confirma una explicación causal exclusiva sin examinar otras condiciones.",
      "La diferencia entre una reducción monetaria y una mejora energética demostrada.",
      "Los edificios tuvieron cierres temporales.",
      "El pasaje demuestra resultados idénticos para toda la población sin excepciones."
    ],
    "answer": 1,
    "explanation": "La respuesta correcta integra el propósito y las limitaciones que desarrolla el texto, sin convertir un detalle en la idea central ni añadir conclusiones no demostradas.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "reading-main-quiz-v1-avanzado-28",
    "level": "avanzado",
    "subtopic": "Idea principal",
    "title": "Revisión de artículos",
    "passage": "Una revisión reunió artículos con resultados favorables y desfavorables sobre un método de enseñanza. En vez de omitir estudios discrepantes, los autores analizaron los diseños y criterios de cada trabajo. La síntesis distinguió qué hallazgos permitían asociaciones y cuáles podían apoyar inferencias causales.",
    "question": "¿Qué opción sintetiza mejor la idea central del texto?",
    "options": [
      "Una síntesis crítica que compara resultados y diseños antes de extraer conclusiones.",
      "Se analizaron trabajos favorables y desfavorables.",
      "El pasaje demuestra resultados idénticos para toda la población sin excepciones.",
      "El autor confirma una explicación causal exclusiva sin examinar otras condiciones."
    ],
    "answer": 0,
    "explanation": "La respuesta correcta integra el propósito y las limitaciones que desarrolla el texto, sin convertir un detalle en la idea central ni añadir conclusiones no demostradas.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "reading-main-quiz-v1-avanzado-29",
    "level": "avanzado",
    "subtopic": "Idea principal",
    "title": "Encuestas contradictorias",
    "passage": "Dos encuestas sobre hábitos de lectura dieron resultados distintos. Una preguntaba por novelas leídas por placer y otra por materiales escolares obligatorios. Los investigadores detectaron que las preguntas medían conductas diferentes y pidieron formularios equivalentes antes de comparar los porcentajes nacionales.",
    "question": "¿Qué opción sintetiza mejor la idea central del texto?",
    "options": [
      "Las encuestas preguntaron sobre lecturas diferentes.",
      "El pasaje demuestra resultados idénticos para toda la población sin excepciones.",
      "El autor confirma una explicación causal exclusiva sin examinar otras condiciones.",
      "El efecto de las definiciones y preguntas sobre la comparación de encuestas."
    ],
    "answer": 3,
    "explanation": "La respuesta correcta integra el propósito y las limitaciones que desarrolla el texto, sin convertir un detalle en la idea central ni añadir conclusiones no demostradas.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "reading-main-quiz-v1-avanzado-30",
    "level": "avanzado",
    "subtopic": "Idea principal",
    "title": "Exclusión de datos",
    "passage": "Antes de calcular un promedio, un equipo retiró las observaciones más altas sin explicar por qué. Después de una revisión, documentó la cantidad retirada y calculó nuevamente la media con todos los registros. El informe destacó que una exclusión selectiva puede modificar las estimaciones.",
    "question": "¿Qué opción sintetiza mejor la idea central del texto?",
    "options": [
      "El pasaje demuestra resultados idénticos para toda la población sin excepciones.",
      "El autor confirma una explicación causal exclusiva sin examinar otras condiciones.",
      "La necesidad de justificar la eliminación de datos y revisar su efecto en los resultados.",
      "Se había eliminado parte de la muestra."
    ],
    "answer": 2,
    "explanation": "La respuesta correcta integra el propósito y las limitaciones que desarrolla el texto, sin convertir un detalle en la idea central ni añadir conclusiones no demostradas.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "reading-main-quiz-v1-avanzado-31",
    "level": "avanzado",
    "subtopic": "Idea principal",
    "title": "Población futura",
    "passage": "Un organismo calculó proyecciones demográficas bajo tres escenarios migratorios. Las cifras dependían de supuestos sobre natalidad, movilidad y permanencia. El comunicado explicó que una predicción es una estimación condicionada y no equivale a contar hoy habitantes del futuro.",
    "question": "¿Qué opción sintetiza mejor la idea central del texto?",
    "options": [
      "El autor confirma una explicación causal exclusiva sin examinar otras condiciones.",
      "La naturaleza condicional de las proyecciones de población y su incertidumbre.",
      "Se contemplaron tres escenarios.",
      "El pasaje demuestra resultados idénticos para toda la población sin excepciones."
    ],
    "answer": 1,
    "explanation": "La respuesta correcta integra el propósito y las limitaciones que desarrolla el texto, sin convertir un detalle en la idea central ni añadir conclusiones no demostradas.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "reading-main-quiz-v1-avanzado-32",
    "level": "avanzado",
    "subtopic": "Idea principal",
    "title": "Avisos de incendios",
    "passage": "Tras abrir una línea de emergencias, un municipio recibió más avisos de incendios. Durante el mismo período hubo semanas calurosas y nuevas brigadas vecinales. Los técnicos plantearon distinguir avisos de incidentes comprobados antes de señalar una tendencia real y atribuir causas.",
    "question": "¿Qué opción sintetiza mejor la idea central del texto?",
    "options": [
      "La interpretación de avisos de riesgo considerando la detección y las condiciones.",
      "Se habilitó una línea de emergencias.",
      "El pasaje demuestra resultados idénticos para toda la población sin excepciones.",
      "El autor confirma una explicación causal exclusiva sin examinar otras condiciones."
    ],
    "answer": 0,
    "explanation": "La respuesta correcta integra el propósito y las limitaciones que desarrolla el texto, sin convertir un detalle en la idea central ni añadir conclusiones no demostradas.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "reading-main-quiz-v1-avanzado-33",
    "level": "avanzado",
    "subtopic": "Idea principal",
    "title": "Evaluación de becas",
    "passage": "Una comisión analizó un programa de becas y documentó beneficios en acceso a talleres. También reunió costos de transporte, materiales y personal, además de resultados aún no medidos. La recomendación fue ampliar primero en zonas comparables y seguir evaluando los gastos y limitaciones.",
    "question": "¿Qué opción sintetiza mejor la idea central del texto?",
    "options": [
      "Se registraron costos de transporte.",
      "El pasaje demuestra resultados idénticos para toda la población sin excepciones.",
      "El autor confirma una explicación causal exclusiva sin examinar otras condiciones.",
      "La necesidad de integrar beneficios, costos y límites antes de ampliar un programa."
    ],
    "answer": 3,
    "explanation": "La respuesta correcta integra el propósito y las limitaciones que desarrolla el texto, sin convertir un detalle en la idea central ni añadir conclusiones no demostradas.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "reading-main-quiz-v1-avanzado-34",
    "level": "avanzado",
    "subtopic": "Idea principal",
    "title": "Fuentes históricas distintas",
    "passage": "Un comité comparó una carta de la época, una entrevista posterior y un resumen sin autor sobre un hecho comunitario. Los tres documentos coincidían en el lugar pero diferían en participantes. La síntesis explicó cada origen y mantuvo abiertas las discrepancias que todavía no podían resolverse.",
    "question": "¿Qué opción sintetiza mejor la idea central del texto?",
    "options": [
      "El pasaje demuestra resultados idénticos para toda la población sin excepciones.",
      "El autor confirma una explicación causal exclusiva sin examinar otras condiciones.",
      "La integración cuidadosa de fuentes históricas que contienen coincidencias y desacuerdos.",
      "Las fuentes coincidían en el lugar."
    ],
    "answer": 2,
    "explanation": "La respuesta correcta integra el propósito y las limitaciones que desarrolla el texto, sin convertir un detalle en la idea central ni añadir conclusiones no demostradas.",
    "reviewStatus": "editorial-draft"
  }
];