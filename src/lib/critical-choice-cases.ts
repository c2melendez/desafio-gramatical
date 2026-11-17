import type {Level} from "./grammar";
export type CriticalChoiceCase={id:string;level:Level;subtopic:"Lectura crítica";title:string;passage:string;question:string;options:[string,string,string,string];answer:number;explanation:string;reviewStatus:"editorial-draft"};
/** Evaluaciones críticas contextuales de fiabilidad, sesgo y alcance argumentativo. */
export const CRITICAL_CHOICE_CASES:CriticalChoiceCase[]=[
  {
    "id": "reading-critical-choice-v1-principiante-0",
    "level": "principiante",
    "subtopic": "Lectura crítica",
    "title": "Horario del mercado",
    "passage": "Un aviso dice que el mercado tendrá horario extendido el sábado. Añade que algunos vendedores atenderán por la tarde, pero no informa si todos los puestos abrirán. Un comentario afirma que cada negocio trabajará hasta la noche.",
    "question": "¿Cuál es la evaluación crítica mejor sustentada por la lectura?",
    "options": [
      "El comentario exagera lo anunciado, pues el aviso no confirma el horario de todos los puestos.",
      "El mercado abrirá el sábado por la tarde.",
      "Todos los puestos abrirán hasta la medianoche.",
      "El aviso garantiza que los precios bajarán."
    ],
    "answer": 0,
    "explanation": "«El comentario exagera lo anunciado, pues el aviso no confirma el horario de todos los puestos.» es la evaluación respaldada por el pasaje. «El mercado abrirá el sábado por la tarde.» describe un dato, pero no valora la solidez de la conclusión; las otras alternativas exceden la evidencia.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "reading-critical-choice-v1-principiante-1",
    "level": "principiante",
    "subtopic": "Lectura crítica",
    "title": "Opinión sobre el parque",
    "passage": "Una niña escribe que el nuevo parque es maravilloso porque le gustan los columpios. Su hermana recuerda que una opinión puede ser válida sin convertirse en un hecho compartido por todas las personas. La nota no incluye una encuesta de visitantes.",
    "question": "¿Cuál es la evaluación crítica mejor sustentada por la lectura?",
    "options": [
      "La niña aprecia los columpios.",
      "Todos los habitantes consideran perfecto el parque.",
      "Nadie ha visitado todavía el parque.",
      "La valoración expresa un gusto personal y no demuestra una preferencia universal."
    ],
    "answer": 3,
    "explanation": "«La valoración expresa un gusto personal y no demuestra una preferencia universal.» es la evaluación respaldada por el pasaje. «La niña aprecia los columpios.» describe un dato, pero no valora la solidez de la conclusión; las otras alternativas exceden la evidencia.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "reading-critical-choice-v1-principiante-2",
    "level": "principiante",
    "subtopic": "Lectura crítica",
    "title": "Afiche de lectura",
    "passage": "Un afiche escolar asegura que leer veinte minutos cada día garantiza aprobar todos los exámenes. Solo cita el testimonio de un estudiante que mejoró sus notas. La profesora propone retirar la promesa absoluta.",
    "question": "¿Cuál es la evaluación crítica mejor sustentada por la lectura?",
    "options": [
      "Todo lector aprobará cada examen.",
      "El estudiante obtuvo siempre la nota máxima.",
      "Un testimonio individual no permite garantizar resultados académicos para todos.",
      "El afiche menciona un testimonio."
    ],
    "answer": 2,
    "explanation": "«Un testimonio individual no permite garantizar resultados académicos para todos.» es la evaluación respaldada por el pasaje. «El afiche menciona un testimonio.» describe un dato, pero no valora la solidez de la conclusión; las otras alternativas exceden la evidencia.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "reading-critical-choice-v1-principiante-3",
    "level": "principiante",
    "subtopic": "Lectura crítica",
    "title": "Fotografía del recreo",
    "passage": "Una imagen muestra el patio escolar vacío durante la primera hora. El texto que la acompaña dice que los estudiantes ya no disfrutan del recreo. La directora pide comprobar a qué hora se tomó antes de aceptar esa conclusión.",
    "question": "¿Cuál es la evaluación crítica mejor sustentada por la lectura?",
    "options": [
      "La fotografía muestra el edificio abandonado.",
      "Una fotografía de un momento no describe los recreos de todos los días.",
      "El patio aparece vacío en la imagen.",
      "Todos los alumnos dejaron de asistir a clases."
    ],
    "answer": 1,
    "explanation": "«Una fotografía de un momento no describe los recreos de todos los días.» es la evaluación respaldada por el pasaje. «El patio aparece vacío en la imagen.» describe un dato, pero no valora la solidez de la conclusión; las otras alternativas exceden la evidencia.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "reading-critical-choice-v1-principiante-4",
    "level": "principiante",
    "subtopic": "Lectura crítica",
    "title": "La voz del vendedor",
    "passage": "Un vendedor asegura que sus panes son los preferidos de la ciudad porque cinco clientes le dijeron que estaban deliciosos. El cartel no identifica una encuesta ni describe a los demás consumidores.",
    "question": "¿Cuál es la evaluación crítica mejor sustentada por la lectura?",
    "options": [
      "Los cinco comentarios no justifican presentar una preferencia de toda la ciudad.",
      "Cinco clientes elogiaron el pan.",
      "Todos los habitantes compran en esa panadería.",
      "Las ventas se duplicaron durante un año."
    ],
    "answer": 0,
    "explanation": "«Los cinco comentarios no justifican presentar una preferencia de toda la ciudad.» es la evaluación respaldada por el pasaje. «Cinco clientes elogiaron el pan.» describe un dato, pero no valora la solidez de la conclusión; las otras alternativas exceden la evidencia.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "reading-critical-choice-v1-principiante-5",
    "level": "principiante",
    "subtopic": "Lectura crítica",
    "title": "El folleto de senderos",
    "passage": "Un folleto recomienda caminar por un sendero al amanecer, pero su mapa está fechado hace seis años. Los guardaparques explican que algunas rutas cambiaron y aconsejan consultar un plano reciente.",
    "question": "¿Cuál es la evaluación crítica mejor sustentada por la lectura?",
    "options": [
      "El folleto recomienda un horario.",
      "Todos los caminos siguen intactos desde hace seis años.",
      "El parque está cerrado definitivamente.",
      "La antigüedad del mapa exige comprobar la información antes de seguir la ruta."
    ],
    "answer": 3,
    "explanation": "«La antigüedad del mapa exige comprobar la información antes de seguir la ruta.» es la evaluación respaldada por el pasaje. «El folleto recomienda un horario.» describe un dato, pero no valora la solidez de la conclusión; las otras alternativas exceden la evidencia.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "reading-critical-choice-v1-principiante-6",
    "level": "principiante",
    "subtopic": "Lectura crítica",
    "title": "Encuesta del salón",
    "passage": "Diez estudiantes respondieron qué juego preferían durante el recreo. Seis escogieron ajedrez. El representante escribió que todo el colegio quiere jugar ajedrez; la docente le pidió mencionar a quiénes consultó.",
    "question": "¿Cuál es la evaluación crítica mejor sustentada por la lectura?",
    "options": [
      "Cada alumno del colegio prefiere ajedrez.",
      "El ajedrez se volvió obligatorio.",
      "La conclusión debe limitarse a los diez estudiantes consultados.",
      "Seis estudiantes eligieron ajedrez."
    ],
    "answer": 2,
    "explanation": "«La conclusión debe limitarse a los diez estudiantes consultados.» es la evaluación respaldada por el pasaje. «Seis estudiantes eligieron ajedrez.» describe un dato, pero no valora la solidez de la conclusión; las otras alternativas exceden la evidencia.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "reading-critical-choice-v1-intermedio-7",
    "level": "intermedio",
    "subtopic": "Lectura crítica",
    "title": "Nota sobre transporte",
    "passage": "Una nota informa un aumento de pasajeros después de cambiar rutas de bus, pero también se redujeron las tarifas. El titular atribuye el incremento exclusivamente a las rutas. El editor compara el titular con los detalles del informe.",
    "question": "¿Cuál es la evaluación crítica mejor sustentada por la lectura?",
    "options": [
      "Ningún pasajero utilizó el servicio anteriormente.",
      "El titular presenta como causa única algo que los datos no permiten aislar.",
      "Las tarifas bajaron en el período.",
      "La modificación de rutas fue la única causa demostrada."
    ],
    "answer": 1,
    "explanation": "«El titular presenta como causa única algo que los datos no permiten aislar.» es la evaluación respaldada por el pasaje. «Las tarifas bajaron en el período.» describe un dato, pero no valora la solidez de la conclusión; las otras alternativas exceden la evidencia.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "reading-critical-choice-v1-intermedio-8",
    "level": "intermedio",
    "subtopic": "Lectura crítica",
    "title": "Gráfico de asistencia",
    "passage": "Una gráfica muestra un salto grande en asistencia porque el eje vertical comienza en 95, aunque los datos pasan de 96 a 99. La periodista aclara que el diseño visual puede magnificar cambios pequeños.",
    "question": "¿Cuál es la evaluación crítica mejor sustentada por la lectura?",
    "options": [
      "La escala gráfica puede exagerar el tamaño aparente de una variación real.",
      "Los valores pasan de 96 a 99.",
      "La asistencia aumentó cien veces.",
      "Los registros originales carecen de valor."
    ],
    "answer": 0,
    "explanation": "«La escala gráfica puede exagerar el tamaño aparente de una variación real.» es la evaluación respaldada por el pasaje. «Los valores pasan de 96 a 99.» describe un dato, pero no valora la solidez de la conclusión; las otras alternativas exceden la evidencia.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "reading-critical-choice-v1-intermedio-9",
    "level": "intermedio",
    "subtopic": "Lectura crítica",
    "title": "Testimonio de una beca",
    "passage": "Un artículo sobre becas entrevista solo a dos beneficiarios satisfechos. La autora concluye que el programa ayudó a todas las familias. No ofrece datos de quienes no recibieron becas ni resultados generales.",
    "question": "¿Cuál es la evaluación crítica mejor sustentada por la lectura?",
    "options": [
      "Se entrevistó a dos beneficiarios.",
      "No existen familias con necesidades diferentes.",
      "La beca eliminó la pobreza regional.",
      "Dos experiencias favorables no justifican una conclusión sobre todas las familias."
    ],
    "answer": 3,
    "explanation": "«Dos experiencias favorables no justifican una conclusión sobre todas las familias.» es la evaluación respaldada por el pasaje. «Se entrevistó a dos beneficiarios.» describe un dato, pero no valora la solidez de la conclusión; las otras alternativas exceden la evidencia.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "reading-critical-choice-v1-intermedio-10",
    "level": "intermedio",
    "subtopic": "Lectura crítica",
    "title": "El mapa comercial",
    "passage": "Una publicación compara tiendas abiertas en dos mapas antiguos y afirma que desaparecieron la mitad de los comercios. El segundo mapa no muestra negocios pequeños, como aclara su leyenda, y utiliza una escala distinta.",
    "question": "¿Cuál es la evaluación crítica mejor sustentada por la lectura?",
    "options": [
      "La mitad exacta de comercios cerró.",
      "Todos los comercios pequeños dejaron de existir.",
      "Los mapas no permiten ese cálculo sin corregir diferencias de cobertura.",
      "Las leyendas de los mapas difieren."
    ],
    "answer": 2,
    "explanation": "«Los mapas no permiten ese cálculo sin corregir diferencias de cobertura.» es la evaluación respaldada por el pasaje. «Las leyendas de los mapas difieren.» describe un dato, pero no valora la solidez de la conclusión; las otras alternativas exceden la evidencia.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "reading-critical-choice-v1-intermedio-11",
    "level": "intermedio",
    "subtopic": "Lectura crítica",
    "title": "Reseña patrocinada",
    "passage": "Una crítica de audífonos revela que el autor recibió un pago del fabricante. Incluye mediciones de sonido, pero algunas opiniones no tienen datos de respaldo. La lectora propone evaluar el método y el interés comercial.",
    "question": "¿Cuál es la evaluación crítica mejor sustentada por la lectura?",
    "options": [
      "El producto supera todos los modelos del mercado.",
      "El patrocinio exige examinar la evidencia sin asumir que todo es falso o verdadero.",
      "La reseña declara el pago.",
      "La reseña es necesariamente fraudulenta en cada dato."
    ],
    "answer": 1,
    "explanation": "«El patrocinio exige examinar la evidencia sin asumir que todo es falso o verdadero.» es la evaluación respaldada por el pasaje. «La reseña declara el pago.» describe un dato, pero no valora la solidez de la conclusión; las otras alternativas exceden la evidencia.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "reading-critical-choice-v1-intermedio-12",
    "level": "intermedio",
    "subtopic": "Lectura crítica",
    "title": "Datos de un torneo",
    "passage": "Dos escuelas publican tasas de participación. Una divide participantes entre alumnos matriculados y otra entre asistentes ese día. Un artículo las compara directamente sin explicar los denominadores utilizados.",
    "question": "¿Cuál es la evaluación crítica mejor sustentada por la lectura?",
    "options": [
      "La comparación necesita denominadores equivalentes para sostener una conclusión.",
      "Las escuelas usaron bases distintas.",
      "La escuela con mayor tasa es siempre mejor.",
      "Ambas tasas tienen exactamente el mismo sentido."
    ],
    "answer": 0,
    "explanation": "«La comparación necesita denominadores equivalentes para sostener una conclusión.» es la evaluación respaldada por el pasaje. «Las escuelas usaron bases distintas.» describe un dato, pero no valora la solidez de la conclusión; las otras alternativas exceden la evidencia.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "reading-critical-choice-v1-intermedio-13",
    "level": "intermedio",
    "subtopic": "Lectura crítica",
    "title": "Un titular sobre riego",
    "passage": "Un reportaje afirma que una tecnología aumentó cosechas durante la primavera. Su tabla revela que los terrenos también recibieron más fertilizante, pero el titular anuncia una causa exclusiva.",
    "question": "¿Cuál es la evaluación crítica mejor sustentada por la lectura?",
    "options": [
      "Se modificó la fertilización.",
      "Solo la tecnología puede afectar las cosechas.",
      "Todas las parcelas obtuvieron el mismo incremento.",
      "El titular omite un factor relevante para interpretar el resultado."
    ],
    "answer": 3,
    "explanation": "«El titular omite un factor relevante para interpretar el resultado.» es la evaluación respaldada por el pasaje. «Se modificó la fertilización.» describe un dato, pero no valora la solidez de la conclusión; las otras alternativas exceden la evidencia.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "reading-critical-choice-v1-intermedio-14",
    "level": "intermedio",
    "subtopic": "Lectura crítica",
    "title": "Entrevista histórica",
    "passage": "Un documental presenta una entrevista recogida cincuenta años después de un suceso. La voz recuerda nombres que no aparecen en las actas consultadas. El narrador advierte que el testimonio requiere contraste documental.",
    "question": "¿Cuál es la evaluación crítica mejor sustentada por la lectura?",
    "options": [
      "Toda memoria oral es falsa por definición.",
      "Las actas explican de forma definitiva todos los detalles.",
      "La entrevista puede ser útil, pero sus discrepancias exigen verificar las fuentes.",
      "La entrevista es posterior al suceso."
    ],
    "answer": 2,
    "explanation": "«La entrevista puede ser útil, pero sus discrepancias exigen verificar las fuentes.» es la evaluación respaldada por el pasaje. «La entrevista es posterior al suceso.» describe un dato, pero no valora la solidez de la conclusión; las otras alternativas exceden la evidencia.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "reading-critical-choice-v1-intermedio-15",
    "level": "intermedio",
    "subtopic": "Lectura crítica",
    "title": "Argumento circular",
    "passage": "Un estudiante escribe que el equipo es el mejor porque no existe ningún equipo mejor. La profesora explica que ambas expresiones repiten la afirmación en lugar de ofrecer resultados, criterios o pruebas.",
    "question": "¿Cuál es la evaluación crítica mejor sustentada por la lectura?",
    "options": [
      "Todos los equipos obtuvieron resultados iguales.",
      "El razonamiento repite la tesis sin aportar evidencia independiente.",
      "El estudiante afirma una superioridad.",
      "La repetición constituye una demostración estadística."
    ],
    "answer": 1,
    "explanation": "«El razonamiento repite la tesis sin aportar evidencia independiente.» es la evaluación respaldada por el pasaje. «El estudiante afirma una superioridad.» describe un dato, pero no valora la solidez de la conclusión; las otras alternativas exceden la evidencia.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "reading-critical-choice-v1-intermedio-16",
    "level": "intermedio",
    "subtopic": "Lectura crítica",
    "title": "Notas de una encuesta",
    "passage": "Un blog afirma que nueve de cada diez usuarios prefieren una plataforma. En la sección metodológica reconoce que pidió respuestas dentro del propio sitio, donde participaron usuarios frecuentes. La conclusión no explica esa selección.",
    "question": "¿Cuál es la evaluación crítica mejor sustentada por la lectura?",
    "options": [
      "La muestra de usuarios del sitio limita la generalización al conjunto del público.",
      "Respondieron personas del sitio.",
      "La cifra representa a todas las personas que usan internet.",
      "La participación fue aleatoria y universal."
    ],
    "answer": 0,
    "explanation": "«La muestra de usuarios del sitio limita la generalización al conjunto del público.» es la evaluación respaldada por el pasaje. «Respondieron personas del sitio.» describe un dato, pero no valora la solidez de la conclusión; las otras alternativas exceden la evidencia.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "reading-critical-choice-v1-intermedio-17",
    "level": "intermedio",
    "subtopic": "Lectura crítica",
    "title": "Una carta de denuncia",
    "passage": "Una carta vecinal describe tres accidentes en un cruce y pide señalización. Un comentarista dice que toda calle sin semáforo es peligrosa. La carta se refiere a un punto concreto y no compara otras vías.",
    "question": "¿Cuál es la evaluación crítica mejor sustentada por la lectura?",
    "options": [
      "Se mencionan tres accidentes.",
      "Cada calle sin semáforo produce accidentes diarios.",
      "El cruce ya está totalmente reparado.",
      "El dato localizado respalda estudiar el cruce, no condenar todas las calles."
    ],
    "answer": 3,
    "explanation": "«El dato localizado respalda estudiar el cruce, no condenar todas las calles.» es la evaluación respaldada por el pasaje. «Se mencionan tres accidentes.» describe un dato, pero no valora la solidez de la conclusión; las otras alternativas exceden la evidencia.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "reading-critical-choice-v1-intermedio-18",
    "level": "intermedio",
    "subtopic": "Lectura crítica",
    "title": "Dos escalas",
    "passage": "Un informe mezcla una encuesta de satisfacción del 1 al 5 y otra del 0 al 100. Las tablas tienen porcentajes y promedios, pero no muestran si las preguntas evalúan lo mismo. El analista pide definir el indicador.",
    "question": "¿Cuál es la evaluación crítica mejor sustentada por la lectura?",
    "options": [
      "Las puntuaciones pueden sumarse directamente sin validación.",
      "Las preguntas idénticas quedaron confirmadas.",
      "Antes de integrar cifras debe comprobarse la equivalencia de los instrumentos.",
      "Los cuestionarios usan escalas diferentes."
    ],
    "answer": 2,
    "explanation": "«Antes de integrar cifras debe comprobarse la equivalencia de los instrumentos.» es la evaluación respaldada por el pasaje. «Los cuestionarios usan escalas diferentes.» describe un dato, pero no valora la solidez de la conclusión; las otras alternativas exceden la evidencia.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "reading-critical-choice-v1-avanzado-19",
    "level": "avanzado",
    "subtopic": "Lectura crítica",
    "title": "Correlación escolar",
    "passage": "Un artículo encuentra una asociación entre lectura y notas escolares. El título dice que leer causa exactamente diez puntos más en cada estudiante. No se examinaron variables familiares ni conocimientos previos.",
    "question": "¿Cuál es la evaluación crítica mejor sustentada por la lectura?",
    "options": [
      "La lectura no tiene ninguna relación posible con aprendizaje.",
      "El título presenta causalidad y precisión no respaldadas por el estudio descrito.",
      "Se observó una asociación.",
      "El efecto exacto está probado para cada persona."
    ],
    "answer": 1,
    "explanation": "«El título presenta causalidad y precisión no respaldadas por el estudio descrito.» es la evaluación respaldada por el pasaje. «Se observó una asociación.» describe un dato, pero no valora la solidez de la conclusión; las otras alternativas exceden la evidencia.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "reading-critical-choice-v1-avanzado-20",
    "level": "avanzado",
    "subtopic": "Lectura crítica",
    "title": "Revisión incompleta",
    "passage": "Una síntesis de investigaciones solo incluye artículos publicados en una revista. Los autores reconocen que podrían existir resultados en otros repositorios y estudios no publicados. El comunicado dice que toda la ciencia está de acuerdo.",
    "question": "¿Cuál es la evaluación crítica mejor sustentada por la lectura?",
    "options": [
      "El comunicado exagera el consenso frente al alcance limitado de la búsqueda.",
      "Se consultó una revista.",
      "No existe investigación fuera de esa publicación.",
      "Todos los experimentos produjeron el mismo resultado."
    ],
    "answer": 0,
    "explanation": "«El comunicado exagera el consenso frente al alcance limitado de la búsqueda.» es la evaluación respaldada por el pasaje. «Se consultó una revista.» describe un dato, pero no valora la solidez de la conclusión; las otras alternativas exceden la evidencia.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "reading-critical-choice-v1-avanzado-21",
    "level": "avanzado",
    "subtopic": "Lectura crítica",
    "title": "Ensayo y selección",
    "passage": "Una evaluación compara alumnos voluntarios de tutorías con quienes no participaron, sin ajustar notas iniciales. La conclusión afirma que toda la diferencia final se debe a las tutorías. El método informa que los voluntarios ya tenían mejores resultados.",
    "question": "¿Cuál es la evaluación crítica mejor sustentada por la lectura?",
    "options": [
      "Los participantes tenían notas iniciales distintas.",
      "Las tutorías demostraron un efecto exclusivo.",
      "Los grupos se asignaron aleatoriamente.",
      "La selección previa impide atribuir sin más la diferencia final al programa."
    ],
    "answer": 3,
    "explanation": "«La selección previa impide atribuir sin más la diferencia final al programa.» es la evaluación respaldada por el pasaje. «Los participantes tenían notas iniciales distintas.» describe un dato, pero no valora la solidez de la conclusión; las otras alternativas exceden la evidencia.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "reading-critical-choice-v1-avanzado-22",
    "level": "avanzado",
    "subtopic": "Lectura crítica",
    "title": "Mortalidad regional",
    "passage": "Un reportaje ordena hospitales según tasas brutas de mortalidad. Uno atiende muchos pacientes mayores y casos de mayor complejidad. El texto no ajusta las diferencias entre poblaciones atendidas.",
    "question": "¿Cuál es la evaluación crítica mejor sustentada por la lectura?",
    "options": [
      "La mayor tasa demuestra peor cuidado clínico siempre.",
      "La edad nunca afecta tasas sanitarias.",
      "Las tasas brutas no bastan para comparar desempeño sin considerar la población.",
      "Los hospitales atienden poblaciones diferentes."
    ],
    "answer": 2,
    "explanation": "«Las tasas brutas no bastan para comparar desempeño sin considerar la población.» es la evaluación respaldada por el pasaje. «Los hospitales atienden poblaciones diferentes.» describe un dato, pero no valora la solidez de la conclusión; las otras alternativas exceden la evidencia.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "reading-critical-choice-v1-avanzado-23",
    "level": "avanzado",
    "subtopic": "Lectura crítica",
    "title": "Reforma simultánea",
    "passage": "Una ciudad inaugura ciclovías y reduce pasajes de autobús en el mismo trimestre. Aumentan los viajes en transporte sostenible, pero una nota atribuye todos los viajes nuevos a las ciclovías.",
    "question": "¿Cuál es la evaluación crítica mejor sustentada por la lectura?",
    "options": [
      "No cambió ningún otro factor.",
      "La coincidencia de intervenciones impide identificar una causa única con esos datos.",
      "Las tarifas de autobús bajaron.",
      "Las ciclovías generaron todos los cambios sin excepción."
    ],
    "answer": 1,
    "explanation": "«La coincidencia de intervenciones impide identificar una causa única con esos datos.» es la evaluación respaldada por el pasaje. «Las tarifas de autobús bajaron.» describe un dato, pero no valora la solidez de la conclusión; las otras alternativas exceden la evidencia.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "reading-critical-choice-v1-avanzado-24",
    "level": "avanzado",
    "subtopic": "Lectura crítica",
    "title": "Fuente secundaria",
    "passage": "Una autora atribuye una frase textual a un acta histórica, pero su bibliografía solo cita un libro reciente que la parafrasea. La editora solicita revisar el original antes de presentarla como cita literal.",
    "question": "¿Cuál es la evaluación crítica mejor sustentada por la lectura?",
    "options": [
      "Una paráfrasis secundaria no verifica una cita textual de la fuente primaria.",
      "La bibliografía menciona un libro posterior.",
      "Las palabras exactas del acta ya fueron comprobadas.",
      "Todas las actas antiguas carecen de valor."
    ],
    "answer": 0,
    "explanation": "«Una paráfrasis secundaria no verifica una cita textual de la fuente primaria.» es la evaluación respaldada por el pasaje. «La bibliografía menciona un libro posterior.» describe un dato, pero no valora la solidez de la conclusión; las otras alternativas exceden la evidencia.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "reading-critical-choice-v1-avanzado-25",
    "level": "avanzado",
    "subtopic": "Lectura crítica",
    "title": "Sesgo por deserción",
    "passage": "Un seguimiento sanitario informa una mejora entre quienes completaron el estudio. Cuarenta por ciento de participantes abandonaron las mediciones, pero el resumen presenta el resultado como beneficio seguro para toda la muestra.",
    "question": "¿Cuál es la evaluación crítica mejor sustentada por la lectura?",
    "options": [
      "El seguimiento tuvo abandonos.",
      "Quienes salieron mejoraron exactamente igual.",
      "Ninguna característica inicial pudo influir.",
      "La pérdida de participantes limita la generalización de resultados a la muestra original."
    ],
    "answer": 3,
    "explanation": "«La pérdida de participantes limita la generalización de resultados a la muestra original.» es la evaluación respaldada por el pasaje. «El seguimiento tuvo abandonos.» describe un dato, pero no valora la solidez de la conclusión; las otras alternativas exceden la evidencia.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "reading-critical-choice-v1-avanzado-26",
    "level": "avanzado",
    "subtopic": "Lectura crítica",
    "title": "Promedio y subgrupos",
    "passage": "Un programa de alfabetización presenta mejora media, aunque algunas comunidades registran retrocesos. La publicidad publica todos mejoran y omite los resultados separados que figuran en el informe.",
    "question": "¿Cuál es la evaluación crítica mejor sustentada por la lectura?",
    "options": [
      "Cada comunidad obtuvo la misma mejora.",
      "El promedio demuestra ausencia de excepciones.",
      "El lema oculta heterogeneidad documentada y afirma un beneficio universal falso.",
      "Hubo comunidades con retrocesos."
    ],
    "answer": 2,
    "explanation": "«El lema oculta heterogeneidad documentada y afirma un beneficio universal falso.» es la evaluación respaldada por el pasaje. «Hubo comunidades con retrocesos.» describe un dato, pero no valora la solidez de la conclusión; las otras alternativas exceden la evidencia.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "reading-critical-choice-v1-avanzado-27",
    "level": "avanzado",
    "subtopic": "Lectura crítica",
    "title": "Cambio en la medición",
    "passage": "Una serie de accidentes de tráfico aumenta después de instalar un sistema que registra incidentes menores antes omitidos. Un artículo atribuye toda la subida a más conductores imprudentes.",
    "question": "¿Cuál es la evaluación crítica mejor sustentada por la lectura?",
    "options": [
      "Los sistemas de registro nunca afectan estadísticas.",
      "La nueva regla de registro puede explicar parte del aumento aparente.",
      "Se incluyeron incidentes menores.",
      "La imprudencia aumentó exactamente en la misma proporción."
    ],
    "answer": 1,
    "explanation": "«La nueva regla de registro puede explicar parte del aumento aparente.» es la evaluación respaldada por el pasaje. «Se incluyeron incidentes menores.» describe un dato, pero no valora la solidez de la conclusión; las otras alternativas exceden la evidencia.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "reading-critical-choice-v1-avanzado-28",
    "level": "avanzado",
    "subtopic": "Lectura crítica",
    "title": "Predicción de sequía",
    "passage": "Una gráfica presenta un escenario de sequía futura como si ya se hubiera observado. El documento técnico aclara que es una proyección dependiente de emisiones y temperatura. La crítica solicita distinguir pronóstico y medición.",
    "question": "¿Cuál es la evaluación crítica mejor sustentada por la lectura?",
    "options": [
      "Una proyección condicional no debe presentarse como observación empírica.",
      "El modelo depende de supuestos.",
      "La sequía futura ya ocurrió exactamente como indica la gráfica.",
      "Las hipótesis no afectan resultados."
    ],
    "answer": 0,
    "explanation": "«Una proyección condicional no debe presentarse como observación empírica.» es la evaluación respaldada por el pasaje. «El modelo depende de supuestos.» describe un dato, pero no valora la solidez de la conclusión; las otras alternativas exceden la evidencia.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "reading-critical-choice-v1-avanzado-29",
    "level": "avanzado",
    "subtopic": "Lectura crítica",
    "title": "Escalas incompatibles",
    "passage": "Un informe suma indicadores de hogares con electricidad y personas que utilizan aparatos digitales. El resumen no explica que una cifra cuenta viviendas y otra individuos, y se refiere a la suma como usuarios.",
    "question": "¿Cuál es la evaluación crítica mejor sustentada por la lectura?",
    "options": [
      "Un indicador cuenta hogares y otro personas.",
      "Las unidades son equivalentes automáticamente.",
      "El resultado describe exactamente a usuarios únicos.",
      "La suma combina unidades de análisis diferentes sin una transformación válida."
    ],
    "answer": 3,
    "explanation": "«La suma combina unidades de análisis diferentes sin una transformación válida.» es la evaluación respaldada por el pasaje. «Un indicador cuenta hogares y otro personas.» describe un dato, pero no valora la solidez de la conclusión; las otras alternativas exceden la evidencia.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "reading-critical-choice-v1-avanzado-30",
    "level": "avanzado",
    "subtopic": "Lectura crítica",
    "title": "Ensayos heterogéneos",
    "passage": "Una revisión combina estudios aleatorizados y testimonios como pruebas de un mismo efecto causal. Aunque ambos aportan información, sus métodos permiten inferencias diferentes. La conclusión afirma una causalidad indiscutible.",
    "question": "¿Cuál es la evaluación crítica mejor sustentada por la lectura?",
    "options": [
      "Cada testimonio demuestra causalidad experimental.",
      "Los diseños no modifican el alcance de las inferencias.",
      "La síntesis debería diferenciar los alcances de cada fuente antes de afirmar causalidad.",
      "Los métodos de las fuentes difieren."
    ],
    "answer": 2,
    "explanation": "«La síntesis debería diferenciar los alcances de cada fuente antes de afirmar causalidad.» es la evaluación respaldada por el pasaje. «Los métodos de las fuentes difieren.» describe un dato, pero no valora la solidez de la conclusión; las otras alternativas exceden la evidencia.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "reading-critical-choice-v1-avanzado-31",
    "level": "avanzado",
    "subtopic": "Lectura crítica",
    "title": "Financiamiento y evidencia",
    "passage": "Una firma financia una investigación sobre su propio producto. El método incluye datos y controles, pero la publicidad afirma que el patrocinio prueba la calidad del estudio. Una revisora señala que financiación y rigor son cuestiones distintas.",
    "question": "¿Cuál es la evaluación crítica mejor sustentada por la lectura?",
    "options": [
      "Todo estudio financiado es necesariamente inválido.",
      "El patrocinio no sustituye la evaluación crítica del método y de los resultados.",
      "El estudio fue financiado por la firma.",
      "El financiamiento demuestra precisión científica."
    ],
    "answer": 1,
    "explanation": "«El patrocinio no sustituye la evaluación crítica del método y de los resultados.» es la evaluación respaldada por el pasaje. «El estudio fue financiado por la firma.» describe un dato, pero no valora la solidez de la conclusión; las otras alternativas exceden la evidencia.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "reading-critical-choice-v1-avanzado-32",
    "level": "avanzado",
    "subtopic": "Lectura crítica",
    "title": "Tasas por edad",
    "passage": "Dos regiones usan denominadores de edades distintas para calcular una tasa de empleo juvenil. Un analista identifica que la comparación directa podría confundir composición de población con participación laboral.",
    "question": "¿Cuál es la evaluación crítica mejor sustentada por la lectura?",
    "options": [
      "Los denominadores deben armonizarse antes de contrastar tasas regionales.",
      "Las edades incluidas en las tasas difieren.",
      "La tasa mayor siempre revela mejor mercado laboral.",
      "La composición demográfica nunca importa."
    ],
    "answer": 0,
    "explanation": "«Los denominadores deben armonizarse antes de contrastar tasas regionales.» es la evaluación respaldada por el pasaje. «Las edades incluidas en las tasas difieren.» describe un dato, pero no valora la solidez de la conclusión; las otras alternativas exceden la evidencia.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "reading-critical-choice-v1-avanzado-33",
    "level": "avanzado",
    "subtopic": "Lectura crítica",
    "title": "Un solo caso",
    "passage": "Un ensayo describe una escuela que mejoró tras modificar su biblioteca y concluye que la misma medida funcionará con idéntico éxito en cualquier país. La evidencia proviene de un centro sin comparadores.",
    "question": "¿Cuál es la evaluación crítica mejor sustentada por la lectura?",
    "options": [
      "Solo se estudió una escuela.",
      "El cambio producirá idénticos resultados universalmente.",
      "Se investigaron miles de centros seleccionados al azar.",
      "Un caso no justifica extrapolar efectos idénticos a contextos distintos."
    ],
    "answer": 3,
    "explanation": "«Un caso no justifica extrapolar efectos idénticos a contextos distintos.» es la evaluación respaldada por el pasaje. «Solo se estudió una escuela.» describe un dato, pero no valora la solidez de la conclusión; las otras alternativas exceden la evidencia.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "reading-critical-choice-v1-avanzado-34",
    "level": "avanzado",
    "subtopic": "Lectura crítica",
    "title": "Variación de gasto",
    "passage": "Un organismo anuncia eficiencia energética porque bajó su factura. Ese período también tuvo tarifas reducidas y menos días operativos. La conclusión no presenta kilovatios consumidos por jornada comparable.",
    "question": "¿Cuál es la evaluación crítica mejor sustentada por la lectura?",
    "options": [
      "El consumo físico disminuyó en igual porcentaje con certeza.",
      "Se mantuvieron iguales todas las condiciones.",
      "Menor gasto no demuestra menor consumo si cambian tarifas y actividad.",
      "Las tarifas y los días cambiaron."
    ],
    "answer": 2,
    "explanation": "«Menor gasto no demuestra menor consumo si cambian tarifas y actividad.» es la evaluación respaldada por el pasaje. «Las tarifas y los días cambiaron.» describe un dato, pero no valora la solidez de la conclusión; las otras alternativas exceden la evidencia.",
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "reading-critical-choice-v1-avanzado-35",
    "level": "avanzado",
    "subtopic": "Lectura crítica",
    "title": "Indicadores redefinidos",
    "passage": "Un observatorio publica una serie de participación juvenil. A mitad del período cambió el criterio de participante, pasando de asistentes efectivos a personas inscritas. La noticia habla de crecimiento constante sin mencionar ese cambio metodológico. Un auditor pide explicar la ruptura antes de interpretar la tendencia.",
    "question": "¿Cuál es la evaluación crítica mejor sustentada por la lectura?",
    "options": [
      "La serie demuestra crecimiento real ininterrumpido.",
      "Las cifras miden exactamente el mismo hecho.",
      "Las diferencias de definición impiden interpretar la variación sin armonizar las series.",
      "La noticia prueba que ningún joven asistió."
    ],
    "answer": 2,
    "explanation": "«Las diferencias de definición impiden interpretar la variación sin armonizar las series.» señala la ruptura metodológica que el titular oculta; las demás alternativas no se desprenden de los datos.",
    "reviewStatus": "editorial-draft"
  }
];