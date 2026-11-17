import type {Level} from "./grammar";
export type CriticalReconstructCase={id:string;level:Level;subtopic:"Lectura crítica";title:string;passage:string;order:{parts:[string,string,string];hint:string;explanation:string};reviewStatus:"editorial-draft"};
/** Lecturas independientes para ordenar afirmaciones, evidencias y juicios críticos. */
export const CRITICAL_RECONSTRUCT_CASES:CriticalReconstructCase[]=[
  {
    "id": "reading-critical-reconstruct-v1-principiante-0",
    "level": "principiante",
    "subtopic": "Lectura crítica",
    "title": "El aviso de la piscina",
    "passage": "Un cartel afirma que el agua de una piscina es siempre segura porque una revisión salió bien el lunes. La administración no informa sobre los análisis posteriores. Una familia pide consultar el registro actualizado antes de aceptar esa seguridad permanente.",
    "order": {
      "parts": [
        "Identificar la revisión realizada el lunes.",
        "Observar que no existen datos sobre fechas posteriores.",
        "Concluir que un análisis puntual no garantiza seguridad para siempre."
      ],
      "hint": "Ordena la afirmación, el contraste con la evidencia y el juicio crítico.",
      "explanation": "«El aviso de la piscina» requiere identificar la afirmación original, examinar sus límites y formular una evaluación proporcionada a los datos."
    },
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "reading-critical-reconstruct-v1-principiante-1",
    "level": "principiante",
    "subtopic": "Lectura crítica",
    "title": "La fotografía de la fila",
    "passage": "Una fotografía muestra una fila larga en la entrada de un museo. Un comentario afirma que el museo siempre está lleno, pero la imagen se tomó durante una inauguración excepcional. El reportero propone consultar otros días antes de generalizar.",
    "order": {
      "parts": [
        "Localizar la imagen tomada en la inauguración.",
        "Reconocer que se trata de una jornada excepcional.",
        "Concluir que una fotografía aislada no prueba ocupación permanente."
      ],
      "hint": "Ordena la afirmación, el contraste con la evidencia y el juicio crítico.",
      "explanation": "«La fotografía de la fila» requiere identificar la afirmación original, examinar sus límites y formular una evaluación proporcionada a los datos."
    },
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "reading-critical-reconstruct-v1-principiante-2",
    "level": "principiante",
    "subtopic": "Lectura crítica",
    "title": "El consejo de estudio",
    "passage": "Un compañero dice que estudiar de noche es el mejor método para todos porque a él le funciona. Su amiga prefiere estudiar temprano y recuerda que las personas tienen ritmos distintos. El grupo propone comparar experiencias antes de publicar una regla universal.",
    "order": {
      "parts": [
        "Identificar la recomendación basada en una experiencia.",
        "Reconocer preferencias diferentes de estudio.",
        "Concluir que una experiencia no demuestra un método universal."
      ],
      "hint": "Ordena la afirmación, el contraste con la evidencia y el juicio crítico.",
      "explanation": "«El consejo de estudio» requiere identificar la afirmación original, examinar sus límites y formular una evaluación proporcionada a los datos."
    },
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "reading-critical-reconstruct-v1-principiante-3",
    "level": "principiante",
    "subtopic": "Lectura crítica",
    "title": "La limpieza del arroyo",
    "passage": "Un boletín anuncia que el arroyo quedó limpio para siempre tras una jornada de recolección. Los voluntarios retiraron bolsas de residuos, pero no evaluaron las fuentes continuas de contaminación. El comité decide revisar el titular.",
    "order": {
      "parts": [
        "Reconocer la limpieza realizada durante un día.",
        "Identificar que las fuentes de residuos aún no fueron estudiadas.",
        "Concluir que una acción puntual no garantiza solución permanente."
      ],
      "hint": "Ordena la afirmación, el contraste con la evidencia y el juicio crítico.",
      "explanation": "«La limpieza del arroyo» requiere identificar la afirmación original, examinar sus límites y formular una evaluación proporcionada a los datos."
    },
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "reading-critical-reconstruct-v1-principiante-4",
    "level": "principiante",
    "subtopic": "Lectura crítica",
    "title": "El precio de los libros",
    "passage": "Un anuncio presenta una tienda como la más barata porque un libro costaba menos allí que en otra librería. No compara otros títulos ni fechas. Un cliente pide más información antes de aceptar la clasificación general.",
    "order": {
      "parts": [
        "Identificar la comparación de un solo título.",
        "Observar que no se investigaron otros productos.",
        "Concluir que un caso no demuestra precios menores en toda la tienda."
      ],
      "hint": "Ordena la afirmación, el contraste con la evidencia y el juicio crítico.",
      "explanation": "«El precio de los libros» requiere identificar la afirmación original, examinar sus límites y formular una evaluación proporcionada a los datos."
    },
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "reading-critical-reconstruct-v1-principiante-5",
    "level": "principiante",
    "subtopic": "Lectura crítica",
    "title": "Las visitas al parque",
    "passage": "Un vecino anuncia que el parque ha perdido interés porque vio pocas personas un martes lluvioso. Una profesora recuerda que el clima y el día pueden influir en la asistencia. Propone observar horarios y estaciones antes de concluir.",
    "order": {
      "parts": [
        "Identificar la visita durante un día lluvioso.",
        "Reconocer otros factores que afectan la presencia de personas.",
        "Concluir que la observación única no prueba desinterés general."
      ],
      "hint": "Ordena la afirmación, el contraste con la evidencia y el juicio crítico.",
      "explanation": "«Las visitas al parque» requiere identificar la afirmación original, examinar sus límites y formular una evaluación proporcionada a los datos."
    },
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "reading-critical-reconstruct-v1-principiante-6",
    "level": "principiante",
    "subtopic": "Lectura crítica",
    "title": "La reseña del teatro",
    "passage": "Un estudiante opina que una obra teatral es aburrida y escribe que nadie podrá disfrutarla. Su compañero explica que el gusto es personal y sugiere mencionar escenas concretas. La reseña se corrige para presentar una valoración justificada.",
    "order": {
      "parts": [
        "Identificar la opinión negativa del estudiante.",
        "Reconocer que no se ofrecen pruebas de rechazo universal.",
        "Concluir que una reseña debe distinguir gustos y hechos."
      ],
      "hint": "Ordena la afirmación, el contraste con la evidencia y el juicio crítico.",
      "explanation": "«La reseña del teatro» requiere identificar la afirmación original, examinar sus límites y formular una evaluación proporcionada a los datos."
    },
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "reading-critical-reconstruct-v1-intermedio-7",
    "level": "intermedio",
    "subtopic": "Lectura crítica",
    "title": "Informe sobre autobuses",
    "passage": "Un informe atribuye la reducción de retrasos a un nuevo recorrido. Durante las mismas semanas también se redujo el número de pasajeros por vacaciones. La comisión decide estudiar períodos comparables antes de sostener una explicación causal.",
    "order": {
      "parts": [
        "Identificar el cambio de recorrido y la caída de pasajeros.",
        "Evaluar las condiciones simultáneas de operación.",
        "Concluir que el recorrido no está demostrado como causa exclusiva."
      ],
      "hint": "Ordena la afirmación, el contraste con la evidencia y el juicio crítico.",
      "explanation": "«Informe sobre autobuses» requiere identificar la afirmación original, examinar sus límites y formular una evaluación proporcionada a los datos."
    },
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "reading-critical-reconstruct-v1-intermedio-8",
    "level": "intermedio",
    "subtopic": "Lectura crítica",
    "title": "El gráfico del salario",
    "passage": "Una publicación muestra grandes barras para una pequeña diferencia de salarios entre meses. La escala vertical se inicia cerca del valor mínimo y no en cero. Una analista revisa las cifras antes de describir el tamaño real del cambio.",
    "order": {
      "parts": [
        "Identificar los valores y la escala visual.",
        "Considerar cómo la escala modifica la percepción.",
        "Concluir que el gráfico podría magnificar una variación pequeña."
      ],
      "hint": "Ordena la afirmación, el contraste con la evidencia y el juicio crítico.",
      "explanation": "«El gráfico del salario» requiere identificar la afirmación original, examinar sus límites y formular una evaluación proporcionada a los datos."
    },
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "reading-critical-reconstruct-v1-intermedio-9",
    "level": "intermedio",
    "subtopic": "Lectura crítica",
    "title": "Una encuesta de madres",
    "passage": "Una escuela consultó a familias durante una reunión a primera hora. Las respuestas fueron mayormente favorables al nuevo menú, pero quienes trabajaban a esa hora no asistieron. El consejo propone otras vías de consulta antes de hablar por todas las familias.",
    "order": {
      "parts": [
        "Identificar el horario de la encuesta escolar.",
        "Reconocer a quienes quedaron fuera de la consulta.",
        "Concluir que la selección limita la generalización."
      ],
      "hint": "Ordena la afirmación, el contraste con la evidencia y el juicio crítico.",
      "explanation": "«Una encuesta de madres» requiere identificar la afirmación original, examinar sus límites y formular una evaluación proporcionada a los datos."
    },
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "reading-critical-reconstruct-v1-intermedio-10",
    "level": "intermedio",
    "subtopic": "Lectura crítica",
    "title": "Una carta histórica",
    "passage": "Un museo exhibe una carta sin firma que describe una celebración antigua. Una guía atribuye el documento a un alcalde, aunque no ofrece evidencia de autoría. Un investigador propone estudiar sellos, tinta y archivos relacionados antes de afirmar quién la escribió.",
    "order": {
      "parts": [
        "Identificar la ausencia de firma documental.",
        "Revisar otras evidencias posibles de procedencia.",
        "Concluir que la autoría necesita corroboración adicional."
      ],
      "hint": "Ordena la afirmación, el contraste con la evidencia y el juicio crítico.",
      "explanation": "«Una carta histórica» requiere identificar la afirmación original, examinar sus límites y formular una evaluación proporcionada a los datos."
    },
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "reading-critical-reconstruct-v1-intermedio-11",
    "level": "intermedio",
    "subtopic": "Lectura crítica",
    "title": "Calidad del agua",
    "passage": "Una nota afirma que un río mejoró después de una campaña ambiental. En ese período hubo menos lluvias y los registros fueron tomados en horarios distintos. El laboratorio pide unificar condiciones de medición antes de asignar todo el cambio a la campaña.",
    "order": {
      "parts": [
        "Identificar la campaña y la mejora registrada.",
        "Examinar lluvia y horario como variables alternativas.",
        "Concluir que la campaña no es aún la única causa demostrada."
      ],
      "hint": "Ordena la afirmación, el contraste con la evidencia y el juicio crítico.",
      "explanation": "«Calidad del agua» requiere identificar la afirmación original, examinar sus límites y formular una evaluación proporcionada a los datos."
    },
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "reading-critical-reconstruct-v1-intermedio-12",
    "level": "intermedio",
    "subtopic": "Lectura crítica",
    "title": "Datos del torneo",
    "passage": "Dos colegios informan tasas de participación deportiva. Uno divide inscritos por matrícula y otro cuenta asistentes del día de cierre. La dirección advierte que las cifras no miden el mismo hecho y propone definir un indicador compartido.",
    "order": {
      "parts": [
        "Identificar los procedimientos de conteo distintos.",
        "Comparar los denominadores y hechos registrados.",
        "Concluir que las tasas deben armonizarse antes de compararlas."
      ],
      "hint": "Ordena la afirmación, el contraste con la evidencia y el juicio crítico.",
      "explanation": "«Datos del torneo» requiere identificar la afirmación original, examinar sus límites y formular una evaluación proporcionada a los datos."
    },
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "reading-critical-reconstruct-v1-intermedio-13",
    "level": "intermedio",
    "subtopic": "Lectura crítica",
    "title": "La nota patrocinada",
    "passage": "Una reseña de teléfono informa que el fabricante pagó la publicación. El autor muestra algunos ensayos técnicos, pero también expresa gustos personales como certezas para todo el público. Un lector evalúa separadamente los datos y las opiniones.",
    "order": {
      "parts": [
        "Identificar el vínculo económico declarado.",
        "Distinguir mediciones presentadas de valoraciones personales.",
        "Concluir que conviene revisar evidencia e intereses del autor."
      ],
      "hint": "Ordena la afirmación, el contraste con la evidencia y el juicio crítico.",
      "explanation": "«La nota patrocinada» requiere identificar la afirmación original, examinar sus límites y formular una evaluación proporcionada a los datos."
    },
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "reading-critical-reconstruct-v1-intermedio-14",
    "level": "intermedio",
    "subtopic": "Lectura crítica",
    "title": "Resultados del taller",
    "passage": "Un taller de escritura anuncia que todos sus participantes mejoraron. La tabla incluye un promedio mayor, pero muestra tres estudiantes con resultados menores. La directora pide corregir la afirmación universal y presentar la distribución.",
    "order": {
      "parts": [
        "Identificar la mejora del promedio.",
        "Reconocer las excepciones en resultados individuales.",
        "Concluir que el promedio no implica mejora de todos."
      ],
      "hint": "Ordena la afirmación, el contraste con la evidencia y el juicio crítico.",
      "explanation": "«Resultados del taller» requiere identificar la afirmación original, examinar sus límites y formular una evaluación proporcionada a los datos."
    },
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "reading-critical-reconstruct-v1-intermedio-15",
    "level": "intermedio",
    "subtopic": "Lectura crítica",
    "title": "Diferencias entre mapas",
    "passage": "Dos mapas presentan dimensiones distintas de una plaza antigua. Sus escalas y proyecciones no coinciden y uno omite calles pequeñas. Un historiador decide usar referencias comparables antes de afirmar que la plaza se redujo.",
    "order": {
      "parts": [
        "Identificar diferencias de representación entre mapas.",
        "Examinar escalas, proyecciones y cobertura.",
        "Concluir que los mapas no prueban por sí solos una reducción."
      ],
      "hint": "Ordena la afirmación, el contraste con la evidencia y el juicio crítico.",
      "explanation": "«Diferencias entre mapas» requiere identificar la afirmación original, examinar sus límites y formular una evaluación proporcionada a los datos."
    },
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "reading-critical-reconstruct-v1-intermedio-16",
    "level": "intermedio",
    "subtopic": "Lectura crítica",
    "title": "La supuesta tendencia",
    "passage": "Un artículo observa una semana de temperaturas altas y anuncia que todo el clima regional ha cambiado definitivamente. Una científica explica que se necesitan series prolongadas y comparables para estudiar tendencias.",
    "order": {
      "parts": [
        "Identificar el período de observación semanal.",
        "Reconocer los datos de largo plazo que faltan.",
        "Concluir que una semana no demuestra cambio climático definitivo."
      ],
      "hint": "Ordena la afirmación, el contraste con la evidencia y el juicio crítico.",
      "explanation": "«La supuesta tendencia» requiere identificar la afirmación original, examinar sus límites y formular una evaluación proporcionada a los datos."
    },
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "reading-critical-reconstruct-v1-intermedio-17",
    "level": "intermedio",
    "subtopic": "Lectura crítica",
    "title": "Entrevistas del barrio",
    "passage": "Un documental entrevista a cinco vecinos para describir un conflicto comunitario. Todos comparten una opinión parecida, pero pertenecen a una misma asociación. La producción decide incluir voces de otros grupos antes de resumir el desacuerdo.",
    "order": {
      "parts": [
        "Identificar la afiliación compartida de entrevistados.",
        "Reconocer perspectivas ausentes en el documental.",
        "Concluir que la selección inicial no representa todas las posiciones."
      ],
      "hint": "Ordena la afirmación, el contraste con la evidencia y el juicio crítico.",
      "explanation": "«Entrevistas del barrio» requiere identificar la afirmación original, examinar sus límites y formular una evaluación proporcionada a los datos."
    },
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "reading-critical-reconstruct-v1-intermedio-18",
    "level": "intermedio",
    "subtopic": "Lectura crítica",
    "title": "Consumo en vacaciones",
    "passage": "Una empresa anuncia una gran mejora de eficiencia porque gastó menos energía en diciembre. En ese mes estuvo cerrada varios días por vacaciones y la tarifa también cambió. El equipo calcula consumo por día operativo antes de evaluar eficiencia.",
    "order": {
      "parts": [
        "Identificar el descenso monetario registrado.",
        "Examinar cierres y tarifas como explicaciones alternativas.",
        "Concluir que menor gasto no demuestra por sí solo mayor eficiencia."
      ],
      "hint": "Ordena la afirmación, el contraste con la evidencia y el juicio crítico.",
      "explanation": "«Consumo en vacaciones» requiere identificar la afirmación original, examinar sus límites y formular una evaluación proporcionada a los datos."
    },
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "reading-critical-reconstruct-v1-avanzado-19",
    "level": "avanzado",
    "subtopic": "Lectura crítica",
    "title": "Mortalidad en regiones",
    "passage": "Un estudio compara tasas brutas de mortalidad en dos regiones. Una tiene población más envejecida y servicios hospitalarios diferentes. El equipo propone ajustar por edad y describir limitaciones antes de clasificar desempeño sanitario.",
    "order": {
      "parts": [
        "Identificar diferencias de población y tasa bruta.",
        "Examinar la influencia posible de composición demográfica.",
        "Concluir que es necesario ajustar o matizar la comparación."
      ],
      "hint": "Ordena la afirmación, el contraste con la evidencia y el juicio crítico.",
      "explanation": "«Mortalidad en regiones» requiere identificar la afirmación original, examinar sus límites y formular una evaluación proporcionada a los datos."
    },
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "reading-critical-reconstruct-v1-avanzado-20",
    "level": "avanzado",
    "subtopic": "Lectura crítica",
    "title": "Serie interrumpida",
    "passage": "Un organismo publica un crecimiento de usuarios de internet. A mitad de la serie pasó de contar hogares conectados a personas que usan la red a diario. El gráfico oculta el cambio y una auditora exige separar los tramos antes de interpretar la pendiente.",
    "order": {
      "parts": [
        "Identificar la redefinición de la unidad de medida.",
        "Reconocer que la comparabilidad temporal quedó alterada.",
        "Concluir que no debe leerse como tendencia homogénea sin armonización."
      ],
      "hint": "Ordena la afirmación, el contraste con la evidencia y el juicio crítico.",
      "explanation": "«Serie interrumpida» requiere identificar la afirmación original, examinar sus límites y formular una evaluación proporcionada a los datos."
    },
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "reading-critical-reconstruct-v1-avanzado-21",
    "level": "avanzado",
    "subtopic": "Lectura crítica",
    "title": "Ensayo sin grupo comparable",
    "passage": "Una evaluación presenta un aumento de notas tras ofrecer tutorías. Los inscritos decidieron participar voluntariamente y tenían mayores notas iniciales. Un revisor solicita un análisis que considere esa selección antes de atribuir el beneficio a la intervención.",
    "order": {
      "parts": [
        "Identificar el cambio observado entre participantes.",
        "Examinar autoselección y diferencias previas.",
        "Concluir que la atribución causal requiere controles adicionales."
      ],
      "hint": "Ordena la afirmación, el contraste con la evidencia y el juicio crítico.",
      "explanation": "«Ensayo sin grupo comparable» requiere identificar la afirmación original, examinar sus límites y formular una evaluación proporcionada a los datos."
    },
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "reading-critical-reconstruct-v1-avanzado-22",
    "level": "avanzado",
    "subtopic": "Lectura crítica",
    "title": "Revisión de evidencia",
    "passage": "Un resumen reúne estudios experimentales y testimonios individuales sobre una política educativa. Los autores presentan todas las fuentes como equivalentes para demostrar un efecto único. Una evaluadora pide distinguir lo que cada diseño permite inferir.",
    "order": {
      "parts": [
        "Identificar los diseños de fuente utilizados.",
        "Distinguir experiencias narradas y comparaciones controladas.",
        "Concluir que no todas las fuentes respaldan igual certeza causal."
      ],
      "hint": "Ordena la afirmación, el contraste con la evidencia y el juicio crítico.",
      "explanation": "«Revisión de evidencia» requiere identificar la afirmación original, examinar sus límites y formular una evaluación proporcionada a los datos."
    },
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "reading-critical-reconstruct-v1-avanzado-23",
    "level": "avanzado",
    "subtopic": "Lectura crítica",
    "title": "Datos excluidos",
    "passage": "Una investigación elimina resultados extremos de una estimación sin informar cuántos ni por qué. El editor solicita calcular el indicador con y sin exclusiones y publicar los criterios completos para evaluar la sensibilidad del resultado.",
    "order": {
      "parts": [
        "Identificar la eliminación de registros extremos.",
        "Examinar la ausencia de criterios y análisis alternativos.",
        "Concluir que se necesita justificar y medir el efecto de la exclusión."
      ],
      "hint": "Ordena la afirmación, el contraste con la evidencia y el juicio crítico.",
      "explanation": "«Datos excluidos» requiere identificar la afirmación original, examinar sus límites y formular una evaluación proporcionada a los datos."
    },
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "reading-critical-reconstruct-v1-avanzado-24",
    "level": "avanzado",
    "subtopic": "Lectura crítica",
    "title": "Proyección de población",
    "passage": "Una noticia anuncia que un modelo predice con certeza cuántas personas vivirán en una región dentro de veinte años. El informe técnico ofrece tres escenarios con supuestos de migración diferentes y advierte sobre incertidumbre.",
    "order": {
      "parts": [
        "Identificar los tres escenarios condicionados.",
        "Reconocer supuestos y márgenes de incertidumbre.",
        "Concluir que una proyección no equivale a un dato futuro confirmado."
      ],
      "hint": "Ordena la afirmación, el contraste con la evidencia y el juicio crítico.",
      "explanation": "«Proyección de población» requiere identificar la afirmación original, examinar sus límites y formular una evaluación proporcionada a los datos."
    },
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "reading-critical-reconstruct-v1-avanzado-25",
    "level": "avanzado",
    "subtopic": "Lectura crítica",
    "title": "Archivo oral y oficial",
    "passage": "Un historiador contrasta entrevistas realizadas décadas después con un registro oficial contemporáneo. Las fuentes difieren en la cantidad de participantes y en algunos nombres. La síntesis identifica procedencia e intereses sin declarar automáticamente falsa una versión.",
    "order": {
      "parts": [
        "Identificar discrepancias entre tipos de documento.",
        "Evaluar fecha, propósito y posibles intereses de las fuentes.",
        "Concluir que la reconstrucción requiere corroboración adicional."
      ],
      "hint": "Ordena la afirmación, el contraste con la evidencia y el juicio crítico.",
      "explanation": "«Archivo oral y oficial» requiere identificar la afirmación original, examinar sus límites y formular una evaluación proporcionada a los datos."
    },
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "reading-critical-reconstruct-v1-avanzado-26",
    "level": "avanzado",
    "subtopic": "Lectura crítica",
    "title": "Asistencia desigual",
    "passage": "Un programa incrementa asistencia media, pero las comunidades rurales no muestran mejora. Un anuncio afirma que todas las regiones se beneficiaron por igual y omite los resultados separados. Una revisión incorpora las diferencias territoriales.",
    "order": {
      "parts": [
        "Identificar promedio positivo y resultados desiguales.",
        "Contrastar el anuncio con datos por comunidad.",
        "Concluir que el éxito medio no prueba beneficios uniformes."
      ],
      "hint": "Ordena la afirmación, el contraste con la evidencia y el juicio crítico.",
      "explanation": "«Asistencia desigual» requiere identificar la afirmación original, examinar sus límites y formular una evaluación proporcionada a los datos."
    },
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "reading-critical-reconstruct-v1-avanzado-27",
    "level": "avanzado",
    "subtopic": "Lectura crítica",
    "title": "Dos pruebas educativas",
    "passage": "Un informe compara puntuaciones de un examen de vocabulario y otro de comprensión de argumentos. Aunque ambos muestran porcentajes, las habilidades no son idénticas. El equipo se niega a sumarlos sin comprobar equivalencia conceptual.",
    "order": {
      "parts": [
        "Identificar el contenido de las dos evaluaciones.",
        "Examinar sus habilidades y escalas.",
        "Concluir que los porcentajes no son directamente intercambiables."
      ],
      "hint": "Ordena la afirmación, el contraste con la evidencia y el juicio crítico.",
      "explanation": "«Dos pruebas educativas» requiere identificar la afirmación original, examinar sus límites y formular una evaluación proporcionada a los datos."
    },
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "reading-critical-reconstruct-v1-avanzado-28",
    "level": "avanzado",
    "subtopic": "Lectura crítica",
    "title": "Un solo municipio",
    "passage": "Una propuesta afirma que una reforma municipal mejorará todas las comunidades porque produjo resultados favorables en una localidad. Los autores no describen diferencias de población, presupuesto ni infraestructura. La revisión pide valorar validez externa.",
    "order": {
      "parts": [
        "Identificar la evidencia basada en una localidad.",
        "Reconocer las diferencias de contexto no estudiadas.",
        "Concluir que el resultado local no garantiza éxito universal."
      ],
      "hint": "Ordena la afirmación, el contraste con la evidencia y el juicio crítico.",
      "explanation": "«Un solo municipio» requiere identificar la afirmación original, examinar sus límites y formular una evaluación proporcionada a los datos."
    },
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "reading-critical-reconstruct-v1-avanzado-29",
    "level": "avanzado",
    "subtopic": "Lectura crítica",
    "title": "Intervenciones simultáneas",
    "passage": "Una ciudad instala ciclovías y subsidia autobuses en el mismo semestre. Aumentan los viajes sostenibles, pero el boletín atribuye todo el cambio a las ciclovías. Los analistas piden una comparación que permita separar efectos.",
    "order": {
      "parts": [
        "Identificar las dos intervenciones realizadas.",
        "Observar el aumento sin poder aislar cada contribución.",
        "Concluir que la atribución exclusiva aún no está sustentada."
      ],
      "hint": "Ordena la afirmación, el contraste con la evidencia y el juicio crítico.",
      "explanation": "«Intervenciones simultáneas» requiere identificar la afirmación original, examinar sus límites y formular una evaluación proporcionada a los datos."
    },
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "reading-critical-reconstruct-v1-avanzado-30",
    "level": "avanzado",
    "subtopic": "Lectura crítica",
    "title": "Encuesta abierta",
    "passage": "Un portal obtiene miles de respuestas voluntarias y presenta su encuesta como retrato exacto del país. No documenta probabilidades de inclusión ni características de quienes no contestaron. La revisión advierte límites de representatividad.",
    "order": {
      "parts": [
        "Identificar el mecanismo voluntario de respuestas.",
        "Examinar la ausencia de un marco probabilístico.",
        "Concluir que el tamaño no corrige automáticamente la autoselección."
      ],
      "hint": "Ordena la afirmación, el contraste con la evidencia y el juicio crítico.",
      "explanation": "«Encuesta abierta» requiere identificar la afirmación original, examinar sus límites y formular una evaluación proporcionada a los datos."
    },
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "reading-critical-reconstruct-v1-avanzado-31",
    "level": "avanzado",
    "subtopic": "Lectura crítica",
    "title": "Cambio en sensores",
    "passage": "Un municipio instala sensores más sensibles y después recibe más alertas de inundación. También hubo lluvias fuertes en parte del período. Un equipo técnico compara instrumentos y precipitaciones antes de afirmar que los incidentes reales aumentaron igual.",
    "order": {
      "parts": [
        "Identificar los sensores nuevos y las alertas registradas.",
        "Examinar detección y lluvia como factores concurrentes.",
        "Concluir que más avisos no equivalen necesariamente a más incidentes."
      ],
      "hint": "Ordena la afirmación, el contraste con la evidencia y el juicio crítico.",
      "explanation": "«Cambio en sensores» requiere identificar la afirmación original, examinar sus límites y formular una evaluación proporcionada a los datos."
    },
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "reading-critical-reconstruct-v1-avanzado-32",
    "level": "avanzado",
    "subtopic": "Lectura crítica",
    "title": "Crítica del patrocinio",
    "passage": "Un informe favorable sobre un tratamiento está financiado por la empresa fabricante. Los autores publican un método detallado y los datos, pero su publicidad trata el patrocinio como prueba de calidad. Un comité distingue conflictos de interés y evaluación técnica.",
    "order": {
      "parts": [
        "Identificar la relación financiera declarada.",
        "Examinar transparencia metodológica y reproducibilidad.",
        "Concluir que el financiamiento no prueba ni descarta por sí solo los resultados."
      ],
      "hint": "Ordena la afirmación, el contraste con la evidencia y el juicio crítico.",
      "explanation": "«Crítica del patrocinio» requiere identificar la afirmación original, examinar sus límites y formular una evaluación proporcionada a los datos."
    },
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "reading-critical-reconstruct-v1-avanzado-33",
    "level": "avanzado",
    "subtopic": "Lectura crítica",
    "title": "Síntesis de beneficios",
    "passage": "Un plan de transporte enumera beneficios en tiempo de viaje, pero omite mantenimiento y costos laborales. El análisis final busca datos de recursos para comparar alternativas antes de recomendar una ampliación a toda la ciudad.",
    "order": {
      "parts": [
        "Identificar los beneficios descritos en la propuesta.",
        "Reconocer los costos y restricciones omitidos.",
        "Concluir que una recomendación responsable requiere balance completo."
      ],
      "hint": "Ordena la afirmación, el contraste con la evidencia y el juicio crítico.",
      "explanation": "«Síntesis de beneficios» requiere identificar la afirmación original, examinar sus límites y formular una evaluación proporcionada a los datos."
    },
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "reading-critical-reconstruct-v1-avanzado-34",
    "level": "avanzado",
    "subtopic": "Lectura crítica",
    "title": "Tasas de empleo",
    "passage": "Dos encuestas calculan empleo juvenil con edades incluidas diferentes. Un editorial publica el porcentaje mayor como señal de superioridad nacional. La auditora advierte que los denominadores deben armonizarse antes de sostener una comparación.",
    "order": {
      "parts": [
        "Identificar los rangos de edad distintos.",
        "Examinar el efecto de denominadores incompatibles.",
        "Concluir que la comparación directa no está justificada."
      ],
      "hint": "Ordena la afirmación, el contraste con la evidencia y el juicio crítico.",
      "explanation": "«Tasas de empleo» requiere identificar la afirmación original, examinar sus límites y formular una evaluación proporcionada a los datos."
    },
    "reviewStatus": "editorial-draft"
  },
  {
    "id": "reading-critical-reconstruct-v1-avanzado-35",
    "level": "avanzado",
    "subtopic": "Lectura crítica",
    "title": "Testimonio único",
    "passage": "Un reportaje atribuye los motivos de una manifestación a toda la población porque entrevistó a una sola persona. Otras fuentes muestran reivindicaciones diferentes, pero el texto no las menciona. El editor propone incluir perspectivas adicionales.",
    "order": {
      "parts": [
        "Identificar la fuente única de la conclusión.",
        "Examinar otras perspectivas omitidas.",
        "Concluir que un testimonio no representa todos los motivos del evento."
      ],
      "hint": "Ordena la afirmación, el contraste con la evidencia y el juicio crítico.",
      "explanation": "«Testimonio único» requiere identificar la afirmación original, examinar sus límites y formular una evaluación proporcionada a los datos."
    },
    "reviewStatus": "editorial-draft"
  }
];